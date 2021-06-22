# DR Animate
This project is about my experiments on web animation.

## Initialize the project

The good old 
```sh
cd <to this project folder>
npm i
```
in your terminal.

## Visualize Blocks (visualize-blocks.js)
This script is meant to visualize data about the commits on the [Homeday's Homeday Blocks](https://github.com/homeday-de/homeday-blocks) project.

[Demo](http://www.danielerapisarda.com/visualizeblocks/)

This is my fork for my Workshop outcome during the **Homeday's Product Engineering Week Q2 2021** and it's based on my outcomes from the Matt DesLauriers' workshop **[Creative Coding with Canvas & WebGL](https://frontendmasters.com/courses/canvas-webgl/)** .


### How to start it
To lunch this script, after the project initialization, use this on your terminal

```sh
canvas-sketch src/visualize-blocks.js
```

then visit `http://192.168.0.3:9966/` on your browser.

### What you will see
You're going to see some spheroids going around your page. Each one of them represents one of the commits on Homeday Blocks in this way:
* Color:
  * Green spheroids: a commit with more line insertions than deletions
  * Red spheroids: a commit with more or equal number of line deletion over insertions
* Radius: is based on the proportion between the number of inserted and deleted lines
* Segments: the amount of spheroid segments represents the amount of files changed

### Technologies
In this project are mainly used:
* [canvas-sketch](https://github.com/mattdesl/canvas-sketch): a loose collection of tools, modules and resources for creating generative art in JavaScript and the browser.
* [three.js](https://threejs.org/): easy to use, lightweight, cross-browser, general purpose 3D library