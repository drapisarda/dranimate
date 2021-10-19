const xPoints = 70;
const yPoints = 70;
let pointSize = 5;
const noiseScale = 0.1;
let a = 0;
const canvasSize = 700;
const stepX = Math.floor(canvasSize / xPoints);
const stepY = Math.floor(canvasSize / yPoints);
const squareSizes = [
  600,
  500,
  400,
  300,
  200,
  100,
  10
];

const squaresMatched = (xPos, yPos, s) => {
  return squareSizes.reduce((acc, squareSize, i) => {
    const squarePosition = canvasSize / 2 - squareSize / 2;

    const collides = s.collidePointRect(xPos, yPos, squarePosition, squarePosition, squareSize, squareSize);
    if (collides) return acc = acc + 1;

    return acc;
  }, 0)
}

const invert = (xPos, yPos, s) => squaresMatched(xPos, yPos, s) % 2;

const sketch = (s) => {
  s.setup = () => {
    const container = s.select('.canvas');
    const canvas = s.createCanvas(canvasSize, canvasSize);
    canvas.parent(container);

    s.frameRate(10)
    s.background(0);
  }

  s.draw = () => {
    s.fill(255);
    for (let i = 0; i < xPoints; i++) {
      a += s.radians(noiseScale);

      for (let j = 0; j < yPoints; j++) {
        const noise = s.noise(s.cos(a), s.sin(a));
        const mark = s.lerp(0, xPoints, noise);
        let xPos = i * stepX + pointSize / 2;
        let yPos = j * stepY + pointSize / 2;
        let fillColor = Math.abs(j - mark) / xPoints * 255 * 2;
        if (invert(xPos, yPos, s)) fillColor = Math.abs(fillColor-255);
        s.fill(fillColor);
        
        s.circle(xPos, yPos, pointSize);
      }
    }
  }
}

const sketchInstance = new p5(sketch);