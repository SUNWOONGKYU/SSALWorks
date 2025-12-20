# Patent Drawing Conversion Guide

The drawings have been prepared as high-quality SVG (Scalable Vector Graphics) files.
For KIPO (Korean Intellectual Property Office) submission, you typically need **TIFF (Tag Image File Format)** or **JPEG** files, often in black and white (1-bit or grayscale) at 300 DPI.

## Files
The following files are located in the `drawings` folder:
- `Fig01.svg` (SAL 3D Grid)
- `Fig02.svg` (SAL ID Schema)
- `Fig03.svg` (Parser Flow)
- `Fig04.svg` (Graph Builder)
- `Fig05.svg` (Scheduler)
- `Fig06.svg` (Renderer/UI)
- `Fig07.svg` (ID Chain)
- `Fig08.svg` (Reporting)
- `Fig09.svg` (Domain Examples)
- `Fig10.svg` (Incremental Computation)

## How to Convert to TIFF

Since ImageMagick is not currently installed in this environment, you can convert them using one of the following methods:

### Option 1: Online Converter
Use a site like [CloudConvert](https://cloudconvert.com/svg-to-tiff) or [Ezgif](https://ezgif.com/svg-to-jpg).
- Upload all `.svg` files.
- Set output format to **TIFF**.
- Set resolution/density to **300 DPI**.
- Download the converted files.

### Option 2: Using Inkscape (Free Software)
If you have Inkscape installed:
1. Open each SVG.
2. File > Export.
3. Choose "TIFF" as the format.
4. Set DPI to 300.
5. Export.

### Option 3: Using Python (if libraries installed)
If you have `cairosvg` or `wand` installed locally:
```python
import cairosvg
cairosvg.svg2png(url='Fig01.svg', write_to='Fig01.png', dpi=300)
# Then convert PNG to TIFF
```

## Submission Checklist
- [ ] Check that all text in the drawings is legible.
- [ ] Ensure lines are clear and not too thin (minimum 0.3mm usually recommended).
- [ ] Verify that drawing numbers (【도 1】, etc.) match the specification.
