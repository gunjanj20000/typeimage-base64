import { useState, useRef } from "react";
import { Loader2, Upload, Trash2 } from "lucide-react";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";

import {
  convertToJsonFormat,
  createJsonFile,
  downloadJsonFile,
  type ConvertedImage,
  type ImageConversionOptions,
} from "@/lib/imageConverter";

interface ConvertAndUploadModalProps {
  isOpen: boolean;
  onClose: () => void;
  onUpload?: (jsonData: ConvertedImage[]) => Promise<void>;
}

export function ConvertAndUploadModal({
  isOpen,
  onClose,
  onUpload,
}: ConvertAndUploadModalProps) {
  const [word, setWord] = useState("");
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string>("");
  const [convertedImages, setConvertedImages] = useState<ConvertedImage[]>([]);
  const [isConverting, setIsConverting] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const conversionOptions: ImageConversionOptions = {
    maxWidth: 384,
    maxHeight: 384,
    jpegQuality: 60,
  };

  const handleImageSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.match(/^image\//)) {
      toast.error("Please select a valid image file");
      return;
    }

    setImageFile(file);

    const reader = new FileReader();
    reader.onload = (event) => {
      setPreview(event.target?.result as string);
    };
    reader.readAsDataURL(file);
  };

  const handleConvert = async () => {
    const cleanWord = word.trim(); // ✅ FIX (CRITICAL)

    if (!cleanWord) {
      toast.error("Please enter a word");
      return;
    }

    if (!imageFile) {
      toast.error("Please select an image");
      return;
    }

    try {
      setIsConverting(true);

      const converted = await convertToJsonFormat(
        cleanWord,          // ✅ always trimmed
        imageFile,
        conversionOptions
      );

      setConvertedImages([...convertedImages, converted]);
      toast.success("Image converted successfully!");

      setWord("");
      setImageFile(null);
      setPreview("");
      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }
    } catch (error) {
      toast.error(
        error instanceof Error ? error.message : "Failed to convert image"
      );
    } finally {
      setIsConverting(false);
    }
  };

  const handleRemoveImage = (index: number) => {
    setConvertedImages(convertedImages.filter((_, i) => i !== index));
  };

  const handleDownload = () => {
    if (convertedImages.length === 0) {
      toast.error("No images to download");
      return;
    }

    try {
      const jsonContent = createJsonFile(convertedImages);
      downloadJsonFile(jsonContent, "images.json");
      toast.success("JSON file downloaded!");
    } catch {
      toast.error("Failed to download JSON file");
    }
  };

  const handleUpload = async () => {
    if (convertedImages.length === 0) {
      toast.error("No images to upload");
      return;
    }

    if (!onUpload) {
      toast.error("Upload functionality not configured");
      return;
    }

    try {
      setIsUploading(true);
      await onUpload(convertedImages);
      toast.success("Images uploaded successfully!");
      handleClose();
    } catch (error) {
      toast.error(
        error instanceof Error ? error.message : "Failed to upload images"
      );
    } finally {
      setIsUploading(false);
    }
  };

  const handleClose = () => {
    setWord("");
    setImageFile(null);
    setPreview("");
    setConvertedImages([]);
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Convert & Upload Images</DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Add Image</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="convert-word-input">Word</Label>
                <Input
                  id="convert-word-input"
                  placeholder="Enter word"
                  value={word}
                  onChange={(e) => setWord(e.target.value)}
                  onKeyPress={(e) => {
                    if (e.key === "Enter") handleConvert();
                  }}
                />
              </div>

              <div>
                <Label htmlFor="convert-image-input">Image</Label>
                <input
                  id="convert-image-input"
                  type="file"
                  ref={fileInputRef}
                  onChange={handleImageSelect}
                  accept="image/*"
                  className="hidden"
                />
                <Button
                  type="button"
                  variant="outline"
                  className="w-full"
                  onClick={() => fileInputRef.current?.click()}
                >
                  <Upload size={16} className="mr-2" />
                  {imageFile ? imageFile.name : "Select Image"}
                </Button>
              </div>

              {preview && (
                <div className="w-32 h-32 rounded border overflow-hidden bg-muted">
                  <img
                    src={preview}
                    alt="Preview"
                    className="w-full h-full object-cover"
                  />
                </div>
              )}

              <Button
                onClick={handleConvert}
                disabled={isConverting}
                className="w-full"
              >
                {isConverting && (
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                )}
                Convert Image
              </Button>
            </CardContent>
          </Card>

          {convertedImages.length > 0 && (
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">
                  Converted Images ({convertedImages.length})
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2 max-h-80 overflow-y-auto">
                  {convertedImages.map((item, index) => (
                    <div
                      key={index}
                      className="flex items-center justify-between p-3 border rounded bg-slate-50 dark:bg-slate-900"
                    >
                      <div className="flex items-center gap-3 flex-1 min-w-0">
                        <img
                          src={item.image}
                          alt={item.word}
                          className="w-10 h-10 rounded object-cover flex-shrink-0"
                        />
                        <span className="font-medium truncate">
                          {item.word}
                        </span>
                      </div>
                      <Button
                        size="icon"
                        variant="ghost"
                        onClick={() => handleRemoveImage(index)}
                      >
                        <Trash2 className="h-4 w-4 text-red-500" />
                      </Button>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}
        </div>

        <DialogFooter className="flex gap-2">
          <Button variant="outline" onClick={handleClose} disabled={isUploading}>
            Close
          </Button>

          <Button
            variant="outline"
            onClick={handleDownload}
            disabled={convertedImages.length === 0}
          >
            Download JSON
          </Button>

          <Button
            onClick={handleUpload}
            disabled={convertedImages.length === 0 || isUploading || !onUpload}
          >
            {isUploading && (
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            )}
            Upload
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
