function fourierTrafo(input) {
  
  let mean = createVector(0, 0);
  for (let i=0;i<input.length;i++){
    mean.add(createVector(input[i].x, input[i].y))}
  
  let amplitude = [createVector(mean.x / input.length, mean.y / input.length)];
  let phase = [0];

  for (let n = 1; n<input.length; n++){
    
    let k = n <= input.length/2 ? n : n - input.length;
    let re = 0;
    let im = 0; 

    for (let i=0; i<input.length; i++){
      let phi = -2*Math.PI * k * i / input.length;
      let cos = Math.cos(phi)
      let sin = Math.sin(phi);
      re += input[i].x * cos - input[i].y * sin;
      im += input[i].y * cos + input[i].x * sin;
    }
    re/= input.length;
    im/= input.length;
    
    amplitude.push(Math.sqrt(re*re + im*im));
    phase.push(Math.atan2(im, re));
  }

    let indices = [...Array(amplitude.length).keys()];
    indices.sort((a, b) => amplitude[b] - amplitude[a]);
  
  let fourier = {amplitude: amplitude, phase: phase, indices: indices};
  return fourier;
}