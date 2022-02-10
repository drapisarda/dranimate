const xPoints = 70;
const yPoints = 70;
let pointSize = 5;
const noiseScale = 0.1;
let customFrame = 0;
let forward = true;
const totCustomFrames = 2000;
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


const sketch = (s) => {
  const squaresMatched = (xPos, yPos) => {
    return squareSizes.reduce((acc, squareSize, i) => {
      const squarePosition = canvasSize / 2 - squareSize / 2;

      const collides = s.collidePointRect(xPos, yPos, squarePosition, squarePosition, squareSize, squareSize);
      if (collides) return acc = acc + 1;

      return acc;
    }, 0)
  }

  const isToInvert = (xPos, yPos) => squaresMatched(xPos, yPos) % 2 > 0;

  let angle = 0;
  const fillCache = Array(totCustomFrames).fill().map((value, fillIndex) => {
    angle += s.radians(noiseScale);
    return Array(xPoints).fill().map((value, xIndex) => {
      return Array(yPoints).fill().map((value, yIndex) => {
        const noise = s.noise(s.cos(angle), s.sin(angle));
        const mark = s.lerp(0, xPoints, noise);
        let xPos = xIndex * stepX + pointSize / 2;
        let yPos = yIndex * stepY + pointSize / 2;
        let fillColor = Math.abs(yIndex - mark) / xPoints * 255 * 2;
        if (isToInvert(xPos, yPos)) fillColor = Math.abs(fillColor - 255);
        return fillColor;
      });
    });
  });

  s.setup = () => {
    const container = s.select('.canvas');
    const canvas = s.createCanvas(canvasSize, canvasSize);
    canvas.parent(container);

    s.frameRate(15);
    s.background(0);
  }

  s.draw = () => {
    s.fill(255);
    for (let i = 0; i < xPoints; i++) {
      if (customFrame === (totCustomFrames - 1)) forward = false;
      if (customFrame === 0) forward = true;

      if (forward) customFrame++;
      else customFrame--;

      for (let j = 0; j < yPoints; j++) {
        // BELLA VARIANTE MA FISSA const noise = s.noise(s.cos(i*j), s.sin(i*j));
        let xPos = i * stepX + pointSize / 2;
        let yPos = j * stepY + pointSize / 2;
        s.fill(fillCache[customFrame][i][j]);
        
        s.circle(xPos, yPos, pointSize);
      }
    }
  }
}

const sketchInstance = new p5(sketch);
