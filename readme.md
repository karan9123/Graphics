# CSCI-610: FinalExams

This is a web application that demonstrates various shapes using WebGL.

## Dependencies

- `gl-matrix-min.js`: Matrix library and code for standard transformations.
- `cgIShape.js`: Shape creation functions.
- `myShapes-min.js`: Definition of standard shapes.
- `finalMain.js`: Main tessellation functions.

## Usage

1. Open the `index.html` file in a web browser.
2. The web page will display a canvas with a shape.
3. Use the following controls to interact with the shape:
   - Press `x`, `y`, or `z` keys to rotate the shape forward about the x, y, or z axis, respectively.
   - Press `X`, `Y`, or `Z` keys to rotate the shape backward about the x, y, or z axis, respectively.

## Textures

The web page uses the following textures:

- `world-texture`: Texture image for the shape (globe texture).
- `abstract-texture`: Texture image for an abstract pattern (currently commented out).

To change the texture, use the following keys:

- Press `1` key to switch to the globe texture.
- Press `2` key to switch to a custom image texture.
- Press `3` key to switch to a procedural texture (a combination of two colors).

## Key Functions

- `gotKey(event)`: Function to handle key presses and perform corresponding actions. The function changes the displayed shape, texture, and performs incremental rotations based on the pressed keys.
