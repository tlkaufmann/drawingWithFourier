# Drawing user-made drawing with a 2D Fourier series
User created drawing are recreated using circle of constant rotation utilizing a Fourier series.
This project was created using the p5.js library.
It should work on any browser (simply by accessing the `index.html` file) but looks best on Firefox.

## Example
![Example GIF](https://media.giphy.com/media/cO9MHPvp8tlpNEmDHe/giphy.gif)


## Functionality
See [Wikipedia on Fourier Series](https://en.wikipedia.org/wiki/Fourier_series).

Start/stop to draw a sketch using `Enter`. Start/stop the animation using `Space`.
The maximum degree of the Fourier series as well as the playback speed (through the timestep $\Delta t$) can be adjusted using the sliders.


## Files

* `sketch.js`: This is the actual code for the project
* `fourierTrafo.js`: Code for creating the Fourier series
* `index.html`: Main HTML page
* `style.css`: CSS-stylesheet for stling the sliders
* `p5.js`: Source file for p5.js
* `p5.dom.js`: Extra source file necessary for the sliders
