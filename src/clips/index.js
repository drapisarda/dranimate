const xPoints = 70;
const yPoints = 70;
let pointSize = 5;
const noiseScale = 0.1;
let a = 0;
const canvasSize = 700;
const stepX = Math.floor(canvasSize / xPoints);
const stepY = Math.floor(canvasSize / yPoints);

const drawer = (s, invert = false) => {
  s.clear();
  s.fill(255);
  for (let i = 0; i < xPoints; i++) {
    a += s.radians(noiseScale);

    for (let j = 0; j < yPoints; j++) {
      const noise = s.noise(s.cos(a), s.sin(a));
      const mark = s.lerp(xPoints * 0.25, xPoints * 0.75, noise);
      let xPos = i * stepX + pointSize / 2;
      let yPos = j * stepY + pointSize / 2;
      let fillColor = Math.abs(j - mark) / xPoints * 255 * 3;
      if (invert) fillColor = Math.abs(fillColor-255);
      s.fill(fillColor);

      s.circle(xPos, yPos, pointSize);
    }
  }
}

const sketch = (s) => {
  s.setup = () => {
    s.createCanvas(canvasSize, canvasSize);

    s.frameRate(10)
    s.background(0);
  }

  s.draw = () => {
    drawer(s);
  }
}

const sketchNegative = (s) => {
  s.setup = () => {
    s.createCanvas(canvasSize, canvasSize);

    s.frameRate(10)
    s.background(0);
  }

  s.draw = () => {
    drawer(s, true);
  }
}

new p5(sketch, 'positive');
new p5(sketchNegative, 'negative');