/* =========================================================
   IMAGE TO BASE64 CONVERTER
   - Resize images while maintaining aspect ratio
   - Compress JPEG images
   - Support for multiple formats (PNG, JPEG, WebP, SVG)
========================================================= */

export interface ImageConversionOptions {
  maxWidth?: number;
  maxHeight?: number;
  jpegQuality?: number;
}

export interface ConvertedImage {
  word: string;
  image: string; // data URI with base64 encoding
}

const DEFAULT_OPTIONS: ImageConversionOptions = {
  maxWidth: 384,
  maxHeight: 384,
  jpegQuality: 60,
};

/**
 * Convert File to base64 with optional resizing
 */
export async function fileToBase64(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => {
      const result = reader.result as string;
      resolve(result);
    };
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
}

/**
 * Resize image while maintaining aspect ratio
 */
export async function resizeImage(
  file: File,
  options: ImageConversionOptions = {}
): Promise<string> {
  const opts = { ...DEFAULT_OPTIONS, ...options };

  // For SVG, return as-is (no resize)
  if (file.type === "image/svg+xml") {
    return fileToBase64(file);
  }

  return new Promise((resolve, reject) => {
    const reader = new FileReader();

    reader.onload = (e) => {
      const img = new Image();

      img.onload = () => {
        // Calculate new size (keep aspect ratio)
        const maxSize = Math.max(opts.maxWidth || 384, opts.maxHeight || 384);
        const ratio = Math.min(maxSize / img.width, maxSize / img.height, 1);

        const newWidth = Math.round(img.width * ratio);
        const newHeight = Math.round(img.height * ratio);

        // Create canvas and draw resized image
        const canvas = document.createElement("canvas");
        canvas.width = newWidth;
        canvas.height = newHeight;

        const ctx = canvas.getContext("2d");
        if (!ctx) {
          reject(new Error("Failed to get canvas context"));
          return;
        }

        ctx.drawImage(img, 0, 0, newWidth, newHeight);

        // Convert to appropriate format
        const mime = file.type || "image/png";
        let dataUrl: string;

        if (mime === "image/jpeg" && opts.jpegQuality) {
          dataUrl = canvas.toDataURL("image/jpeg", opts.jpegQuality / 100);
        } else {
          dataUrl = canvas.toDataURL(mime);
        }

        resolve(dataUrl);
      };

      img.onerror = () => {
        reject(new Error("Failed to load image"));
      };

      img.src = e.target?.result as string;
    };

    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
}

/**
 * Convert image and word to JSON format
 */
export async function convertToJsonFormat(
  word: string,
  imageFile: File,
  options: ImageConversionOptions = {}
): Promise<ConvertedImage> {
  if (!word.trim()) {
    throw new Error("Word cannot be empty");
  }

  if (!imageFile) {
    throw new Error("Image file is required");
  }

  const base64Image = await resizeImage(imageFile, options);

  return {
    word: word.trim(),
    image: base64Image,
  };
}

/**
 * Create JSON file content from image array
 */
export function createJsonFile(images: ConvertedImage[]): string {
  return JSON.stringify(images, null, 2);
}

/**
 * Download JSON file to browser
 */
export function downloadJsonFile(
  content: string,
  filename: string = "images.json"
): void {
  const blob = new Blob([content], { type: "application/json" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}

/**
 * Convert JSON string back to ConvertedImage array
 */
export function parseJsonFile(content: string): ConvertedImage[] {
  return JSON.parse(content) as ConvertedImage[];
}
