import './style.scss';
import p5 from 'p5';

const xPoints = 70;
const yPoints = 70;
let stepX;
let stepY;
let minDistX;
let minDistY;
let pointSize = 5;
const noiseScale = 0.1;
let a = 0;

const sketch = (s) => {
  s.setup = () => {
    // s.createCanvas(Math.max(500, s.windowWith), Math.max(500, s.windowHeight));
    s.createCanvas(500, 500);
    stepX = s.floor(s.width / xPoints);
    stepY = s.floor(s.height / yPoints);
    // minDistX = stepX/2;
    // minDistY = stepY/2;
    s.frameRate(10)
    // pointsDistance = (stepX**2 + stepY**2)**0.5;
  }

  s.draw = () => {
    s.background(0);
    const { mouseX, mouseY, frameCount, ceil, lerp} = s;
    // const mark = ceil(s.noise(frameCount * noiseRate * s.random()) * xPoints);
    for (let i = 0; i < xPoints; i++) {
      a += s.radians(noiseScale);
      const noise = s.noise(s.cos(a), s.sin(a));
      const mark = lerp(0, xPoints, noise);
      if (frameCount < 10) console.log(noise)
      
      for (let j = 0; j < yPoints; j++) {
        // const mark = s.noise(Math.sin(frameCount * i * noiseRate), Math.sin(frameCount * j * noiseRate)) * yPoints;
        // const fillColor = Math.abs(( xPos * s.noise(xPos) + yPos * s.noise(yPos) + s.frameCount * animationRate) % 256);
        const fillColor = Math.abs(j - mark) / xPoints * 255 *2;
        s.fill(fillColor);

        let xPos = i * stepX + pointSize / 2;
        let yPos = j * stepY + pointSize / 2;
        
        // const xDist = Math.abs(xPos - mouseX);
        // const yDist = Math.abs(yPos - mouseY);
        // if (xDist <= minDistX && yDist <= minDistY) {
        //   if (mouseX > xPos) xPos = mouseX - minDistX;
        //   if (mouseX < xPos) xPos = minDistX + mouseX;
        //   if (mouseY > yPos) yPos = mouseY - minDistY;
        //   if (mouseY < yPos) yPos = minDistY + mouseY;
        // }

        s.circle(xPos, yPos, pointSize);
      }
    }
  }

}

const sketchInstance = new p5(sketch);