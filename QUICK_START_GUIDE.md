# Convert & Upload Feature - Quick Start Guide

## What It Does

This feature allows you to:
1. Select images from your computer
2. Name each image with a word
3. Convert them to an optimized JSON format
4. Either download the JSON file or upload directly to the web app

## Quick Start (5 Steps)

### Step 1: Go to Settings
Click on your Settings page in the app.

### Step 2: Click "Convert & Upload" Button
Look in the "Your Words" section at the top right and click the blue "Convert & Upload" button.

### Step 3: Add Your First Image
- Type a word in the "Word" field (e.g., "apple")
- Click "Select Image" and pick an image from your computer
- You'll see a preview of the image
- Click "Convert Image"

### Step 4: Repeat for More Images
Add as many word-image pairs as you want. Each one gets added to the list below.

### Step 5: Upload or Download
- **Upload**: Click the "Upload" button to add all images to your web app immediately
- **Download JSON**: Click "Download JSON" to save the file for later use

## Example JSON Output

When you convert images, they become a JSON file like this:

```json
[
  {
    "word": "apple",
    "image": "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAgGBgcGBQgHBwcJCQgKDBQNDAsLDBkSEw8UHRofHh0aHBwgJC4nICIsIxwcKDcpLDAxNDQ0Hyc5PTgyPC4zNDL/2wBDAQkJCQwLDBgNDRgyIRwhMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjL/wAARCABkAGQDASIAAhEBAxEB/8QAHwAAAQUBAQEBAQEAAAAAAAAAAAECAwQFBgcICQoL/8QAtRAAAgEDAwIEAwUFBAQAAAF9AQIDAAQRBRIhMUEGE1FhByJxFDKBkaEII0KxwRVS0fAkM2JyggkKFhcYGRolJicoKSo0NTY3ODk6Q0RFRkdISUpTVFVWV1hZWmNkZWZnaGlqc3R1dnd4eXqDhIWGh4iJipKTlJWWm5ybnJ2eoqOkpaanqKmqsrO0tba2uLm6wsPExcbHyMnK0tPU1dbX2Nna4uPk5ebn6Onq8vP09fb3+Pn6/8QAHwEAAwEBAQEBAQAAAAAAAAECAwQFBgcICQoL/8QAtREAAgECBAQDBAcFBAQAAQJ3AAECAxEEBSExBhJBUQdhcRMiMoEIFEKRobHBCSMzUvAVYnLRChYkNOEl8RcYGRomJygpKjU2Nzg5OkNERUZHSElKU1RVVldYWVpjZGVmZ2hpanN0dXZ3eHl6goOEhYaHiImKkpOUlbaWmJmaoqOkpaanqKmqsrO0tba2uLm6wsPExcbHyMnK0tPU1dbX2Nna4uPk5ebn6Onq8vP09fb3+Pn6/9oADAMBAAIRAxEAPwD3+iiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigD/9k="
  },
  {
    "word": "banana",
    "image": "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAGQAAABkCAYAAABw5pVXAAAA..."
  }
]
```

## Image Optimization

Your images are automatically optimized:
- **Resized** to fit 384x384 pixels
- **Compressed** (especially JPEG images)
- **Converted** to base64 for embedding in JSON
- **Result**: Smaller file sizes, faster uploads

## Tips & Tricks

### Multiple Images at Once
You don't need to upload one by one! Add all your images first, then click Upload once.

### Remove Mistakes
If you add the wrong image or word, just click the trash icon next to it to remove it before uploading.

### Download for Backup
Click "Download JSON" to save your converted images as a backup file. You can import this file later using the "Import" button.

### Supported Image Formats
- JPG / JPEG
- PNG
- WebP
- SVG

### Image Size Recommendations
- Smaller images (under 1MB) work best
- Square or nearly square images work better (384x384)
- Complex images take longer to resize

## What Happens When You Upload

1. Each image is automatically saved to the app's storage
2. A new word entry is created with that image
3. All your uploaded words appear in "Your Words" list
4. They're now ready to use in the Learning section

## Common Issues & Solutions

| Issue | Solution |
|-------|----------|
| "Image not supported" | Make sure it's PNG, JPEG, WebP, or SVG |
| Upload seems slow | Large images take longer to process. This is normal. |
| Downloaded file is empty | Make sure you converted at least one image first |
| Upload failed silently | Check your internet connection and browser console |
| Word appears lowercase | The app automatically converts words to lowercase |

## Differences: Convert & Upload vs Import

| Feature | Convert & Upload | Import |
|---------|------------------|--------|
| What it does | Converts fresh images to JSON format | Loads previously created JSON files |
| File source | Local images on your computer | JSON files (from Convert & Upload) |
| Best for | Adding new images | Restoring backups or sharing sets |
| Speed | Slightly slower (resizing involved) | Faster (files already optimized) |

## Example Workflow

**Scenario**: You have 10 fruit images and want to add them to your app.

1. Organize images in a folder on your computer
2. Open Settings → Click "Convert & Upload"
3. For each image:
   - Type the fruit name
   - Select the image
   - Click "Convert Image"
4. Once all images are in the list, click "Upload"
5. All fruits are now in your "Your Words" list!

**Alternative**: If you want to save these for later:
1. After converting all images, click "Download JSON"
2. Save the file somewhere safe (e.g., Documents)
3. Later, you can use the "Import" button to reload them

## Technical Details (For Developers)

### Image Processing Pipeline

```
Local Image File
    ↓
Read as Blob
    ↓
Load into Canvas
    ↓
Resize (max 384x384, maintain aspect ratio)
    ↓
Compress JPEG (quality: 60)
    ↓
Convert to Base64 Data URI
    ↓
Add to JSON with Word
    ↓
Save to App Storage
    ↓
Display in Word List
```

### Compression Settings

Can be adjusted in `src/components/ConvertAndUploadModal.tsx`:
```typescript
const conversionOptions: ImageConversionOptions = {
  maxWidth: 384,        // Pixel width
  maxHeight: 384,       // Pixel height
  jpegQuality: 60,      // 0-100 (lower = smaller file)
};
```

### File Size Examples

- Original JPEG (full size): ~5MB
- After resize to 384x384: ~150KB
- After JPEG compression (quality 60): ~50-80KB
- As base64 in JSON: ~70-110KB

## Need Help?

- Check the browser's developer console (F12) for error messages
- Verify image files are not corrupted
- Try with a different image if one fails
- Ensure your internet connection is stable
