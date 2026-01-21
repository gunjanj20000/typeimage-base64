# 🎯 Feature Template: Convert & Upload Pattern

## Overview
This template captures the complete architecture and patterns used in the Convert & Upload feature. Use this as a reference for building similar features in future projects.

---

## 📋 Feature Architecture

### Core Pattern
```
Input Processing
    ↓
Utility Functions (Pure logic)
    ↓
Modal Component (UI)
    ↓
Page Integration (Settings.tsx)
    ↓
Storage Integration (Save to app)
```

### File Structure
```
src/
├── lib/
│   └── [featureName]Converter.ts ........... Utility functions
├── components/
│   └── [FeatureName]Modal.tsx ............. Modal UI
└── pages/
    └── Settings.tsx ....................... Integration point
```

---

## 🔧 Step-by-Step Implementation Guide

### Step 1: Create Utility Functions File
**Location**: `src/lib/[featureName]Converter.ts`

**Template Structure**:
```typescript
// ============================================
// UTILITY FUNCTIONS - Pure Logic Only
// ============================================

// Export interfaces for type safety
export interface ConvertedItem {
  [key: string]: any;
  // Define your data structure
}

export interface ProcessingOptions {
  // Define configuration options
  option1?: number;
  option2?: number;
}

// Core processing function
export async function processInput(
  input: any,
  options?: ProcessingOptions
): Promise<ConvertedItem> {
  // Pure logic - no UI side effects
  // Return data structure
}

// Helper functions
export function validateInput(input: any): boolean {
  // Input validation logic
}

export function formatOutput(data: any): string {
  // Format for export/download
}

export function downloadFile(
  content: string,
  filename: string
): void {
  // File download logic
}
```

**Key Principles**:
- ✅ Pure functions (no side effects)
- ✅ TypeScript interfaces for all data
- ✅ Comprehensive error handling
- ✅ Well-documented with comments
- ✅ Unit testable

---

### Step 2: Create Modal Component
**Location**: `src/components/[FeatureName]Modal.tsx`

**Template Structure**:
```typescript
import { useState, useRef } from "react";
import { Loader2 } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";

interface [FeatureName]ModalProps {
  isOpen: boolean;
  onClose: () => void;
  onUpload?: (data: any[]) => Promise<void>;
}

export function [FeatureName]Modal({
  isOpen,
  onClose,
  onUpload,
}: [FeatureName]ModalProps) {
  // State management
  const [input, setInput] = useState("");
  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState("");
  const [converted, setConverted] = useState<any[]>([]);
  const [isProcessing, setIsProcessing] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Handlers
  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (!selectedFile) return;

    setFile(selectedFile);
    // Create preview if needed
  };

  const handleConvert = async () => {
    if (!input.trim()) {
      toast.error("Input required");
      return;
    }

    try {
      setIsProcessing(true);
      // Call utility function
      // Add to converted list
      toast.success("Converted successfully!");
      setInput("");
      setFile(null);
      setPreview("");
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Failed");
    } finally {
      setIsProcessing(false);
    }
  };

  const handleDownload = () => {
    if (converted.length === 0) {
      toast.error("Nothing to download");
      return;
    }
    try {
      // Call utility download function
      toast.success("Downloaded!");
    } catch (error) {
      toast.error("Download failed");
    }
  };

  const handleUpload = async () => {
    if (!onUpload) return;
    try {
      setIsProcessing(true);
      await onUpload(converted);
      toast.success("Uploaded successfully!");
      handleClose();
    } catch (error) {
      toast.error("Upload failed");
    } finally {
      setIsProcessing(false);
    }
  };

  const handleClose = () => {
    setInput("");
    setFile(null);
    setPreview("");
    setConverted([]);
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle>[Feature Name]</DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          {/* Input Section */}
          <div className="space-y-4">
            <div>
              <Label htmlFor="input">Input</Label>
              <Input
                id="input"
                placeholder="Enter input"
                value={input}
                onChange={(e) => setInput(e.target.value)}
              />
            </div>

            <div>
              <Label htmlFor="file">File</Label>
              <input
                id="file"
                type="file"
                ref={fileInputRef}
                onChange={handleFileSelect}
                className="hidden"
              />
              <Button
                variant="outline"
                onClick={() => fileInputRef.current?.click()}
              >
                Select File
              </Button>
            </div>

            <Button
              onClick={handleConvert}
              disabled={isProcessing}
              className="w-full"
            >
              {isProcessing && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              Process
            </Button>
          </div>

          {/* Results Section */}
          {converted.length > 0 && (
            <div className="space-y-2">
              <Label>Processed Items ({converted.length})</Label>
              <div className="border rounded p-2 max-h-40 overflow-y-auto">
                {converted.map((item, i) => (
                  <div key={i} className="text-sm p-1">
                    {JSON.stringify(item)}
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        <DialogFooter className="flex gap-2">
          <Button variant="outline" onClick={handleClose}>
            Close
          </Button>
          <Button
            variant="outline"
            onClick={handleDownload}
            disabled={converted.length === 0}
          >
            Download
          </Button>
          <Button
            onClick={handleUpload}
            disabled={converted.length === 0 || !onUpload}
          >
            Upload
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
```

**Key Principles**:
- ✅ Controlled by props (isOpen, onClose, onUpload)
- ✅ Local state for UI only
- ✅ Clear separation of concerns
- ✅ All callbacks optional
- ✅ User feedback via toast

---

### Step 3: Integrate with Settings Page
**Location**: `src/pages/Settings.tsx`

**Changes to Make**:
```typescript
// 1. Add import at top
import { [FeatureName]Modal } from "@/components/[FeatureName]Modal";

// 2. Add state in component
const [[featureName]ModalOpen, set[FeatureName]ModalOpen] = useState(false);

// 3. Add handler function
const handle[FeatureName]Upload = async (data: any[]) => {
  // Process and save data to app
  // Use existing storage functions
  // Example: saveWord(), saveImageFile()
};

// 4. Add button in JSX (typically in Your Words section)
<Button
  size="sm"
  variant="outline"
  onClick={() => set[FeatureName]ModalOpen(true)}
  title="[Feature description]"
>
  <Upload className="h-4 w-4 mr-2" />
  [Feature Name]
</Button>

// 5. Add modal component at end of JSX
<[FeatureName]Modal
  isOpen={[featureName]ModalOpen}
  onClose={() => set[FeatureName]ModalOpen(false)}
  onUpload={handle[FeatureName]Upload}
/>
```

**Key Principles**:
- ✅ Minimal changes to existing page
- ✅ Clear state management
- ✅ Reuse existing storage functions
- ✅ Follow existing patterns

---

## 🎯 Configuration Pattern

### Settings Approach
**Location**: `src/components/[FeatureName]Modal.tsx`

```typescript
const processingOptions = {
  option1: 384,           // Configurable value
  option2: 60,           // Configurable value
  option3: "default",    // String option
};
```

**To Change Settings**:
1. Edit the constants in the modal component
2. Or pass as props for maximum flexibility

---

## 📝 Documentation Pattern

### File Structure
```
docs/
├── FEATURE_README.md ................. Quick overview
├── QUICK_START_GUIDE.md ............. User guide
├── TECHNICAL_DOCS.md ................ Developer docs
├── UI_GUIDE.md ....................... Visual guide
├── TROUBLESHOOTING.md ............... Common issues
└── API_REFERENCE.md ................. Function reference
```

### Documentation Content Checklist
- [x] What it does (overview)
- [x] How to use (step-by-step)
- [x] How it works (technical)
- [x] Visual diagrams
- [x] Code examples
- [x] Troubleshooting
- [x] API reference
- [x] Configuration options

---

## 🔄 Integration Checklist

### Before Integration
- [ ] Utility functions created
- [ ] Utility functions tested
- [ ] Modal component created
- [ ] Modal styled with Tailwind
- [ ] TypeScript types defined
- [ ] Error handling implemented

### Integration Steps
- [ ] Import modal in Settings.tsx
- [ ] Add state for modal visibility
- [ ] Create upload handler
- [ ] Add button to open modal
- [ ] Add modal component
- [ ] Test opening/closing
- [ ] Test full workflow

### After Integration
- [ ] No TypeScript errors
- [ ] No console errors
- [ ] Build passes
- [ ] Mobile responsive
- [ ] Keyboard accessible
- [ ] Documentation complete

---

## 🧪 Testing Template

### Unit Tests (Utilities)
```typescript
// src/lib/__tests__/[featureName]Converter.test.ts

describe("[FeatureName]Converter", () => {
  test("processInput validates correctly", () => {
    // Test validation
  });

  test("formatOutput creates valid JSON", () => {
    // Test formatting
  });

  test("handles errors gracefully", () => {
    // Test error handling
  });
});
```

### Integration Tests (Modal)
- [ ] Modal opens on button click
- [ ] Input accepts text
- [ ] File picker works
- [ ] Process button functions
- [ ] Results display correctly
- [ ] Download button works
- [ ] Upload button calls handler
- [ ] Error messages display

---

## 🚀 Deployment Checklist

### Pre-Deployment
- [ ] TypeScript: 0 errors
- [ ] ESLint: 0 warnings
- [ ] Build: Passes
- [ ] Tests: Pass
- [ ] Documentation: Complete
- [ ] Mobile: Tested
- [ ] Accessibility: Verified

### Deployment
- [ ] Run `npm run build`
- [ ] Verify build succeeds
- [ ] Deploy using normal process
- [ ] Test in production

---

## 📊 Code Pattern Examples

### Pattern 1: Input → Process → Output
```typescript
// Utilities
export async function process(input) {
  validate(input);
  const result = transform(input);
  return format(result);
}

// Modal
const handleConvert = async () => {
  const result = await process(input);
  setConverted([...converted, result]);
};

// Settings
const handleUpload = async (data) => {
  for (const item of data) {
    await save(item);
  }
};
```

### Pattern 2: File → Process → Save
```typescript
// Utilities
export async function processFile(file) {
  const content = await file.text();
  const parsed = JSON.parse(content);
  return validate(parsed);
}

// Modal
const handleFileSelect = (e) => {
  const file = e.target.files[0];
  setFile(file);
};

// Settings
const handleUpload = async (files) => {
  for (const file of files) {
    const data = await processFile(file);
    await save(data);
  }
};
```

---

## 🎨 UI Component Pattern

### Standard Modal Layout
```
┌─────────────────────────────────┐
│ Title                        [×] │
├─────────────────────────────────┤
│                                 │
│  ┌─────────────────────────┐   │
│  │ Input Section           │   │
│  │  [Input field]          │   │
│  │  [File picker]          │   │
│  │  [Process button]       │   │
│  └─────────────────────────┘   │
│                                 │
│  ┌─────────────────────────┐   │
│  │ Results Section         │   │
│  │  [Results list]         │   │
│  └─────────────────────────┘   │
│                                 │
├─────────────────────────────────┤
│ [Close] [Download] [Upload]    │
└─────────────────────────────────┘
```

---

## 🔑 Key Principles Summary

### Architecture
✅ Separation of concerns (utils → component → page)
✅ Pure utility functions
✅ Modal for isolated UI
✅ Clean integration point
✅ No breaking changes to existing features

### State Management
✅ Modal state in page (isOpen)
✅ UI state in modal (input, results)
✅ Upload handler in page (integration)

### User Feedback
✅ Toast notifications
✅ Loading states
✅ Error messages
✅ Success confirmations

### Documentation
✅ User guides
✅ Technical docs
✅ Visual guides
✅ Code examples
✅ Troubleshooting

---

## 🎯 Reusable Components List

### Utilities Module
- `processInput()` - Core processing
- `validateInput()` - Validation
- `formatOutput()` - Formatting
- `downloadFile()` - Download logic
- `parseFile()` - File parsing (if needed)

### Modal Component
- Input field
- File picker
- Preview (if applicable)
- Results list
- Action buttons
- Error handling
- Toast feedback

### Integration Points
- Button in Settings
- State management
- Upload handler
- Storage integration

---

## 📚 Documentation Templates

### Quick Start
```markdown
## How to Use

1. Click the button
2. Enter information
3. Select file (if needed)
4. Click process
5. Review results
6. Click upload
```

### Technical Setup
```markdown
## Configuration

Edit `src/components/[FeatureName]Modal.tsx`:

const options = {
  setting1: value,
  setting2: value,
};
```

### API Reference
```markdown
## Functions

### processInput(input, options)
Description
- Parameter: type
- Returns: type
- Throws: errors
```

---

## 🔄 Workflow for Future Projects

### When Building Similar Feature:

1. **Copy this template** to your new project
2. **Replace [FeatureName]** with your feature name
3. **Customize utility functions** for your logic
4. **Customize modal UI** for your inputs
5. **Create documentation** using templates
6. **Integrate into Settings** (or other page)
7. **Test and verify**
8. **Deploy**

### Time Estimate:
- Utilities: 1-2 hours
- Modal: 1-2 hours
- Integration: 30 minutes
- Testing: 1 hour
- Documentation: 2-3 hours
- **Total: 6-9 hours for complete feature**

---

## ✅ Ready to Use!

This template encodes the complete pattern used in Convert & Upload feature. For your next project:

1. Copy this file
2. Replace placeholders with your feature name
3. Customize logic for your needs
4. Follow the checklist
5. You'll have a complete, well-structured feature!

---

*Template Version*: 1.0
*Based on*: Convert & Upload Feature
*Created*: January 20, 2026
*Status*: Ready to Use ✅
