# Convert & Upload Feature Documentation

## Overview

The "Convert & Upload" feature allows users to convert local images into a JSON file format with base64-encoded data, and then upload them directly to the web app. This streamlines the process of adding multiple word-image pairs from external sources.

## Features

### 1. Image Conversion
- **Automatic Resizing**: Images are automatically resized to fit within 384x384 pixels while maintaining aspect ratio
- **JPEG Compression**: JPEG images are compressed with quality level 60 for optimal file size
- **Format Support**: Supports PNG, JPEG, WebP, and SVG formats
- **Base64 Encoding**: Images are converted to base64 data URIs for embedding in JSON

### 2. JSON Format
The generated JSON file follows this structure:
```json
[
  {
    "word": "apple",
    "image": "data:image/jpeg;base64,/9j/4AAQSkZJRg..."
  },
  {
    "word": "banana",
    "image": "data:image/png;base64,iVBORw0KGgoAAAANS..."
  }
]
```

### 3. Upload to Web App
- Convert multiple images and words in batch
- Download as JSON file for manual use
- Upload directly to the web app with one click
- Automatic error handling for failed uploads
- Success/failure count reporting

## Usage

### Step-by-Step Guide

1. **Open Settings Page**
   - Navigate to the Settings page in your app

2. **Click "Convert & Upload" Button**
   - Located in the "Your Words" card header

3. **Add Images**
   - Enter the word/text in the "Word" input field
   - Click "Select Image" to choose an image from your device
   - A preview will be displayed
   - Click "Convert Image" to add to the list

4. **Manage Converted Images**
   - View all converted images in the "Converted Images" list
   - Remove any image using the trash icon if needed

5. **Download or Upload**
   - **Download JSON**: Save the JSON file for external use or backup
   - **Upload**: Directly upload all converted images to your web app

### API Integration

The `onUpload` callback function receives an array of converted images:

```typescript
interface ConvertedImage {
  word: string;
  image: string; // data URI with base64 encoding
}

type OnUpload = (convertedImages: ConvertedImage[]) => Promise<void>;
```

## Technical Details

### Image Converter Functions

#### `fileToBase64(file: File): Promise<string>`
Converts a File object to a data URL string.

#### `resizeImage(file: File, options?: ImageConversionOptions): Promise<string>`
Resizes an image while maintaining aspect ratio and returns as data URL.

**Options:**
- `maxWidth`: Maximum width in pixels (default: 384)
- `maxHeight`: Maximum height in pixels (default: 384)
- `jpegQuality`: JPEG quality 0-100 (default: 60)

#### `convertToJsonFormat(word: string, imageFile: File, options?: ImageConversionOptions): Promise<ConvertedImage>`
Combines word and image into the JSON format.

#### `createJsonFile(images: ConvertedImage[]): string`
Creates JSON string from array of converted images.

#### `downloadJsonFile(content: string, filename?: string): void`
Triggers browser download of JSON file.

#### `parseJsonFile(content: string): ConvertedImage[]`
Parses JSON string back to ConvertedImage array.

## Settings

### Conversion Options
Located in `src/components/ConvertAndUploadModal.tsx`:

```typescript
const conversionOptions: ImageConversionOptions = {
  maxWidth: 384,
  maxHeight: 384,
  jpegQuality: 60,
};
```

You can modify these values to adjust:
- Image dimensions
- JPEG compression quality
- File size vs quality trade-off

## Error Handling

The feature includes robust error handling:
- Validates word input (non-empty required)
- Validates image file (must be valid image format)
- Handles base64 conversion failures
- Reports individual upload failures while continuing with others
- Shows success/failure counts at the end

## Browser Compatibility

- Chrome/Edge 90+
- Firefox 88+
- Safari 14+
- Mobile browsers (iOS Safari, Chrome Mobile)

## File Structure

```
src/
├── lib/
│   └── imageConverter.ts          # Image conversion utilities
├── components/
│   └── ConvertAndUploadModal.tsx  # Modal UI component
└── pages/
    └── Settings.tsx               # Settings page with integration
```

## Component Props

### ConvertAndUploadModal

```typescript
interface ConvertAndUploadModalProps {
  isOpen: boolean;                           // Modal visibility
  onClose: () => void;                      // Callback when modal closes
  onUpload?: (jsonData: ConvertedImage[]) => Promise<void>; // Upload handler
}
```

## Customization

### Change Default Image Size
Edit `src/components/ConvertAndUploadModal.tsx`:
```typescript
const conversionOptions: ImageConversionOptions = {
  maxWidth: 512,    // Change this
  maxHeight: 512,   // And this
  jpegQuality: 80,  // And this
};
```

### Modify Download Filename
In the download button click handler:
```typescript
downloadJsonFile(jsonContent, "my-custom-name.json");
```

### Customize Modal Styling
Edit the Dialog and Card components in `ConvertAndUploadModal.tsx` using Tailwind classes.

## Troubleshooting

### Images not converting
- Ensure the image file is in a supported format (PNG, JPEG, WebP, SVG)
- Check browser console for specific error messages
- Try with a smaller file size

### Upload failing silently
- Check that `onUpload` callback is properly configured
- Verify network connectivity
- Check browser console for error details

### JSON file is too large
- Reduce the `maxWidth` and `maxHeight` values
- Increase JPEG compression by reducing `jpegQuality`
- Use PNG instead of JPEG for smaller file sizes on simple images

## Performance Notes

- Resizing happens client-side (fast, no server needed)
- Base64 encoding increases file size by ~33% compared to binary
- Large batches (100+ images) may take a few seconds
- Browser memory usage scales with image count

## Security Considerations

- All image processing happens in the browser (no server upload during conversion)
- Base64 data URIs are text and can be inspected in the JSON file
- No sensitive data should be embedded in images
- Keep JSON files secure if they contain sensitive word-image pairs
