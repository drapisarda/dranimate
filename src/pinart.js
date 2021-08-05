import { create3dGrid } from './tools';
// Ensure ThreeJS is in global scope for the 'examples/'
global.THREE = require("three");

// Include any additional ThreeJS examples below
require("three/examples/js/controls/OrbitControls");

const canvasSketch = require("canvas-sketch");

const xElements = 32;
const yElements = 64;

const settings = {
  // Make the loop animated
  animate: true,
  // Get a WebGL canvas rather than 2D
  context: "webgl"
};

const sketch = ({ context }) => {
  // Create a renderer
  const renderer = new THREE.WebGLRenderer({
    canvas: context.canvas
  });

  // WebGL background color
  renderer.setClearColor("#000", 1);

  // Setup a camera
  const camera = new THREE.PerspectiveCamera(150, 1, 0.01, 100);
  camera.position.set(0, 0, 20);
  camera.lookAt(new THREE.Vector3());

  // Setup camera controller
  const controls = new THREE.OrbitControls(camera, context.canvas);

  // Setup your scene
  const scene = new THREE.Scene();

  const axesHelper = new THREE.AxesHelper(5);
  scene.add(axesHelper);

  const light = new THREE.DirectionalLight('white', 1);
  light.position.set(0, 0, 10);
  scene.add(light);

  // Setup a material
  // const material = new THREE.MeshBasicMaterial({
  //   color: "red",
  //   wireframe: true
  // });

  const material = new THREE.MeshPhongMaterial({ color: 'black', emissive: 'grey', shininess: 100});

  // Setup a mesh with geometry + material
  const points = create3dGrid(xElements, yElements, 1);
  console.log(points)
  points.forEach((point, key)  => {
    // Setup a geometry
    // const geometry = new THREE.BoxGeometry(1, 1, 5);
    const geometry = new THREE.CylinderGeometry(1, 1, 5, 5);
    const {position} = points[key];
    const mesh = new THREE.Mesh(geometry, material);
    mesh.rotation.x = Math.PI/2;
    mesh.position.set(position[0] * 32 - xElements/2, position[1] * 64 - yElements/2, position[2])
    scene.add(mesh);
  })

  // draw each frame
  return {
    // Handle resize events here
    resize({ pixelRatio, viewportWidth, viewportHeight }) {
      renderer.setPixelRatio(pixelRatio);
      renderer.setSize(viewportWidth, viewportHeight, false);
      camera.aspect = viewportWidth / viewportHeight;
      camera.updateProjectionMatrix();
    },
    // Update & render your scene here
    render({ time }) {
      controls.update();
      renderer.render(scene, camera);
    },
    // Dispose of events & renderer for cleaner hot-reloading
    unload() {
      controls.dispose();
      renderer.dispose();
    }
  };
};

canvasSketch(sketch, settings);
