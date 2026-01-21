# Convert & Upload Feature - UI Guide

## Visual Overview

### 1. Settings Page - Your Words Section

```
┌─────────────────────────────────────────────────────┐
│  Your Words                                         │
│  ┌──────────────────────┬────────────────────────┐ │
│  │                      │ [Convert & Upload] ▼   │ │
│  │                      │ [Import]          ▼   │ │
│  └──────────────────────┴────────────────────────┘ │
│                                                     │
│  [List of words with images below...]             │
└─────────────────────────────────────────────────────┘
```

**Location**: In the "Your Words" card header, right side
**Button Style**: Secondary outline button
**Size**: Small (sm)
**Icon**: Upload icon before text

---

### 2. Convert & Upload Modal - Main View

```
┌─────────────────────────────────────────────────────┐
│  Convert & Upload Images                        [×] │
├─────────────────────────────────────────────────────┤
│                                                     │
│  ┌──────────────────────────────────────────────┐ │
│  │ Add Image                                    │ │
│  ├──────────────────────────────────────────────┤ │
│  │                                              │ │
│  │  Word:   [___________________]               │ │
│  │                                              │ │
│  │  Image:  [  Select Image  📤]               │ │
│  │                                              │ │
│  │  Preview: ┌──────┐                          │ │
│  │           │      │                          │ │
│  │           │[IMG] │                          │ │
│  │           │      │                          │ │
│  │           └──────┘                          │ │
│  │                                              │ │
│  │  [        Convert Image        ]             │ │
│  │                                              │ │
│  └──────────────────────────────────────────────┘ │
│                                                     │
│  ┌──────────────────────────────────────────────┐ │
│  │ Converted Images (0)                         │ │
│  ├──────────────────────────────────────────────┤ │
│  │                                              │ │
│  │  (No images yet - add some above)            │ │
│  │                                              │ │
│  └──────────────────────────────────────────────┘ │
│                                                     │
├─────────────────────────────────────────────────────┤
│  [Close]  [Download JSON]  [Upload]               │
└─────────────────────────────────────────────────────┘
```

---

### 3. With Images Added

```
┌─────────────────────────────────────────────────────┐
│  Convert & Upload Images                        [×] │
├─────────────────────────────────────────────────────┤
│                                                     │
│  ┌──────────────────────────────────────────────┐ │
│  │ Add Image                                    │ │
│  ├──────────────────────────────────────────────┤ │
│  │  Word: [___________________]                 │ │
│  │  Image: [  Select Image  📤]                │ │
│  │  Preview: ┌──────┐                          │ │
│  │           │      │                          │ │
│  │           │[IMG] │                          │ │
│  │           │      │                          │ │
│  │           └──────┘                          │ │
│  │  [    Convert Image    ]                     │ │
│  └──────────────────────────────────────────────┘ │
│                                                     │
│  ┌──────────────────────────────────────────────┐ │
│  │ Converted Images (2)                         │ │
│  ├──────────────────────────────────────────────┤ │
│  │  ┌────┐ apple              [🗑]              │ │
│  │  │IMG │                                      │ │
│  │  └────┘                                      │ │
│  │                                              │ │
│  │  ┌────┐ banana             [🗑]              │ │
│  │  │IMG │                                      │ │
│  │  └────┘                                      │ │
│  │                                              │ │
│  └──────────────────────────────────────────────┘ │
│                                                     │
├─────────────────────────────────────────────────────┤
│  [Close]  [Download JSON]  [Upload ✓]             │
└─────────────────────────────────────────────────────┘
```

---

## Step-by-Step UI Flow

### Step 1: Click "Convert & Upload" Button

**Before:**
```
Settings Page
  ↓ (click Convert & Upload button)
Modal appears
```

**UI Changes:**
- Modal becomes visible
- Background darkens (overlay)
- Focus moves to modal

### Step 2: Enter Word

**UI:**
```
Word input field:  [apple______] (cursor here)
```

**Actions:**
- Type word name (e.g., "apple")
- Can press Tab to move to next field
- Input validates when blurred

### Step 3: Select Image

**UI:**
```
Button before click: [ Select Image 📤 ]
Button after click: [ apple.jpg 📤 ] (filename shown)
```

**Actions:**
- Opens system file picker
- User selects image
- Button text updates with filename
- Preview appears below

### Step 4: Image Preview

**UI:**
```
Before selection:
  Preview: (nothing shown)

After selection:
  Preview:  ┌──────────┐
            │ apple.jpg│
            │   IMG    │
            │ resized  │
            └──────────┘
```

**Details:**
- Preview is 128x128px
- Rounded corners
- Bordered style
- Maintains aspect ratio

### Step 5: Convert Image

**UI:**
```
Before click: [Convert Image] (enabled)
             or
             [Convert Image 🔄] (if loading)

After click: 🎉 Image added to list!
             List now shows 1 image
             "apple" with thumbnail
```

**Actions:**
- Validates word (non-empty)
- Validates image (proper format)
- Shows loading spinner if slow
- Adds to converted list
- Clears form for next image

### Step 6: Add More Images (Optional)

**UI:**
```
Step 2-5 repeat for each image:

Word input field:  [banana____]
Button:            [banana.jpg 📤]
Preview:           ┌──────────┐
                   │banana.jpg│
                   └──────────┘
[Convert Image]

→ List now shows 2 images
```

### Step 7: Review Converted List

**UI:**
```
Converted Images (3)
┌────────────────────────────────┐
│ [IMG] apple       [🗑 delete]  │
├────────────────────────────────┤
│ [IMG] banana      [🗑 delete]  │
├────────────────────────────────┤
│ [IMG] cherry      [🗑 delete]  │
└────────────────────────────────┘

Each item shows:
- Thumbnail (30x30px)
- Word name
- Delete button
- Scroll if many images
```

### Step 8a: Download JSON

**UI:**
```
[Close]  [Download JSON]  [Upload]
              ↓ (click)
         File downloads: images.json
         Toast: "JSON file downloaded!"
```

**File Created:**
```json
[
  {
    "word": "apple",
    "image": "data:image/jpeg;base64,/9j/4AAQ..."
  },
  {
    "word": "banana",
    "image": "data:image/png;base64,iVBORw0KGgo..."
  },
  {
    "word": "cherry",
    "image": "data:image/jpeg;base64,/9j/4AAQ..."
  }
]
```

### Step 8b: Upload

**UI:**
```
[Close]  [Download JSON]  [Upload]
                           ↓ (click)
                    Processing... 🔄
                    
Toast (bottom):
  ✅ Successfully uploaded 3 words
  
Modal closes (optional after)
Words now appear in "Your Words" list
```

---

## Button States

### Convert & Upload Button (In Settings)

```
Default:    [Convert & Upload] 📤
Hover:      [Convert & Upload] 📤 (darker background)
Active:     [Convert & Upload] 📤 (pressed effect)
```

### Modal Buttons

**Convert Image:**
```
Idle:       [Convert Image]
Hover:      [Convert Image] (highlight)
Loading:    [Convert Image 🔄] (spinner)
Disabled:   [Convert Image] (grayed out)
```

**Download JSON:**
```
No items:   [Download JSON] (disabled/grayed)
With items: [Download JSON] (enabled/clickable)
Loading:    [Download JSON ⬇] (processing)
```

**Upload:**
```
No items:   [Upload] (disabled)
With items: [Upload] (enabled)
Uploading:  [Upload 🔄] (processing)
No callback: [Upload] (disabled if onUpload missing)
```

**Close:**
```
Always:     [Close] (enabled)
During op:  [Close] (disabled while uploading)
```

---

## Responsive Design

### Desktop (Wide Screen)

```
┌──────────────────────────────────────────┐
│         Convert & Upload Modal           │
├──────────────────────────────────────────┤
│  Add Image            Converted Images   │
│  ┌────────────┐      ┌────────────────┐  │
│  │ Word:      │      │ apple    [×]   │  │
│  │ Image:     │      ├────────────────┤  │
│  │ Preview: . │      │ banana   [×]   │  │
│  │ Convert    │      └────────────────┘  │
│  └────────────┘                          │
├──────────────────────────────────────────┤
│     [Close] [Download] [Upload]          │
└──────────────────────────────────────────┘
```

### Mobile (Narrow Screen)

```
┌──────────────────────┐
│ Convert & Upload     │
├──────────────────────┤
│  Add Image           │
│  ┌────────────────┐  │
│  │ Word:          │  │
│  │ Image:         │  │
│  │ Preview: [IMG] │  │
│  │ Convert Image  │  │
│  └────────────────┘  │
│                      │
│  Converted Images(2) │
│  ┌────────────────┐  │
│  │ [IMG] apple    │  │
│  │ [×]            │  │
│  ├────────────────┤  │
│  │ [IMG] banana   │  │
│  │ [×]            │  │
│  └────────────────┘  │
│                      │
├──────────────────────┤
│  [Close]             │
│  [Download JSON]     │
│  [Upload]            │
└──────────────────────┘
```

---

## Toast Notifications

### Success Messages

```
✅ Image converted successfully!
✅ Successfully uploaded 3 words
✅ JSON file downloaded!
```

### Error Messages

```
❌ Please enter a word
❌ Please select an image
❌ Failed to convert image
❌ No images to download
❌ No images to upload
❌ Failed to upload images
```

### Status Messages

```
⚠️  No images to download
⚠️  Upload functionality not configured
```

---

## Color Scheme

### Light Mode

```
Background:     White (#FFFFFF)
Card Background: Light Gray (#F8FAFB)
Borders:        Light Gray (#E5E7EB)
Text:           Dark Gray (#1F2937)
Primary Button: Blue (#3B82F6)
Delete Button:  Red (#EF4444)
Success:        Green (#10B981)
```

### Dark Mode

```
Background:     Dark Gray (#0F172A)
Card Background: Slate (#1E293B)
Borders:        Slate (#475569)
Text:           Light (#E2E8F0)
Primary Button: Blue (#3B82F6)
Delete Button:  Red (#EF4444)
Success:        Green (#10B981)
```

---

## Accessibility Features

### Keyboard Navigation

```
Tab:        Move between fields
Enter:      Submit (in word field)
Escape:     Close modal
Space:      Press button
Delete/DEL: Click delete icon (when focused)
```

### Screen Reader

```
<Dialog role="alertdialog">
  <h2>Convert & Upload Images</h2>
  <form>
    <label htmlFor="word">Word</label>
    <input id="word" aria-required="true" />
    <label htmlFor="image">Image</label>
    <input id="image" aria-required="true" />
  </form>
</Dialog>
```

### Focus Management

- Focus trap within modal
- Initial focus on word input
- Tab order: Word → Image → Preview → Convert
- Return focus to button when modal closes

---

## Loading States

### Image Conversion

```
Before:  [ Convert Image ]
Loading: [ ⟳ Convert Image ]  (spinner)
Done:    ✅ Toast shows "successfully converted"
         List updates immediately
```

### Upload Process

```
Before:   [ Upload ]
          [ Close ]
Uploading:[ ⟳ Upload ]  (disabled)
          [ Close ]    (disabled)
Done:     ✅ Toast shows count
          Modal closes
          Words appear in list
```

---

## Empty States

### No Images Selected

```
Converted Images (0)

(Empty gray area with text)
"No images yet - add some above"
```

### After Upload

```
Modal closes automatically
Words appear in Your Words list

Example view after upload:
┌────────────────────────────┐
│ Your Words                 │
│                            │
│ [IMG] apple    [✏] [🗑]   │
│ [IMG] banana   [✏] [🗑]   │
│ [IMG] cherry   [✏] [🗑]   │
└────────────────────────────┘
```

---

## Error States

### Invalid Word Input

```
Word field shows error state:
[___________] ⚠️  Word required

Button disabled: [Convert Image] (grayed)
```

### Invalid Image

```
After attempting convert:
❌ Toast: "Please select an image"

Or: "Failed to convert image"
```

### Upload Error

```
❌ Toast: "Failed to upload images"
   (details in console)

Modal remains open for retry
User can:
- Remove problematic images
- Try upload again
```

---

## Animation/Transitions

### Modal Open/Close

```
Modal opens:    Fade in + Scale up
                Duration: 200ms
                Easing: ease-out

Modal closes:   Fade out + Scale down
                Duration: 150ms
                Easing: ease-in
```

### List Updates

```
New image added: Fade in
                 Duration: 300ms

Image removed:   Fade out + Slide left
                 Duration: 200ms
```

### Loading Spinner

```
Rotation:       360 degrees
Duration:       1 second
Easing:         linear
Infinite:       true
```

---

## Print & Export

### JSON File (Downloaded)

```
Filename: images.json
Format:   UTF-8 Plain Text
Content:  Pretty-printed JSON (2-space indent)
Size:     ~30-100KB (depends on images)
```

### Screenshots (For Documentation)

```
Mobile view shows:
- Stack layout
- Full-width inputs
- Scrollable list
- Touch-friendly buttons

Desktop view shows:
- Side-by-side layout
- Compact inputs
- List with proper sizing
```

---

## Summary: Key UI Elements

| Element | Type | Function |
|---------|------|----------|
| "Convert & Upload" | Button | Opens modal |
| Word input | Text field | Enter word name |
| Image picker | File input (hidden) | Select image |
| "Select Image" | Button | Trigger file picker |
| Image preview | Image element | Show selected image |
| "Convert Image" | Button | Process and add |
| Converted list | Scrollable list | Show added images |
| Delete icons | Icon button | Remove from list |
| "Download JSON" | Button | Save file |
| "Upload" | Button | Submit to app |
| "Close" | Button | Dismiss modal |
| Toast messages | Toast notification | Feedback |

---

This UI guide provides a complete visual reference for the Convert & Upload feature!
