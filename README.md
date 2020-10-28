# Drawing user-made drawing with a 2D Fourier series
**Start the programm here: https://tlkaufmann.github.io/drawingWithFourier**

User created drawings are recreated using circles of constant rotation utilizing Fourier series.
This project was created using the [p5.js library](https://p5js.org).

## Example
![Example GIF](https://media.giphy.com/media/cO9MHPvp8tlpNEmDHe/giphy.gif)


## Functionality
See [Wikipedia on Fourier Series](https://en.wikipedia.org/wiki/Fourier_series).

Start drawing by pressing left mouse button. Start/stop the animation using `Space`.
The maximum degree of the Fourier series as well as the playback speed (through the timestep *dt*) can be adjusted using the sliders.


## Files

* `sketch.js`: This is the actual code for the project
* `fourierTrafo.js`: Code for creating the Fourier series
* `index.html`: Main HTML page
* `style.css`: CSS-stylesheet for styling the sliders
* `p5.js`: Source file for p5.js
* `p5.dom.js`: Extra source file necessary for the sliders
