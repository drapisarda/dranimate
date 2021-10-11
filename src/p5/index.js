import './style.scss';
import p5 from 'p5';
import createLoop from 'p5.createloop';

const xPoints = 70;
const yPoints = 70;
let stepX;
let stepY;
let minDistX;
let minDistY;
let pointSize = 5;
const noiseRate = 0.002;

const sketch = (s) => {
  s.setup = () => {
    s.createCanvas(s.windowWidth/2, s.windowHeight/2);
    stepX = s.floor(s.width / xPoints);
    stepY = s.floor(s.height / yPoints);
    // minDistX = stepX/2;
    // minDistY = stepY/2;
    s.frameRate(10)
    // pointsDistance = (stepX**2 + stepY**2)**0.5;
    console.log(typeof createLoop)
    // createLoop({ duration: 15, gif: true })
  }

  s.draw = () => {
    s.background(0);
    const { mouseX, mouseY, frameCount} = s;
    
    for (let i = 0; i < xPoints; i++) {
      for (let j = 0; j < yPoints; j++) {
        const mark = Math.ceil(s.noise(Math.sin(frameCount * i * noiseRate), Math.sin(frameCount * j * noiseRate)) * yPoints);
        // const fillColor = Math.abs(( xPos * s.noise(xPos) + yPos * s.noise(yPos) + s.frameCount * animationRate) % 256);
        const fillColor = Math.abs(i - mark) / xPoints * 256;
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