import "./style.scss";
import * as THREE from "three";

// the scene is a container that holds all objects, cameras and lights
const scene = new THREE.Scene();

// in order to look at things inside the scene we need a camera
const camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);

// the renderer makes the magic happen, it renders the graphics to the scene
const renderer = new THREE.WebGLRenderer({
  canvas: document.querySelector("#background") as HTMLCanvasElement,
});

renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(window.innerWidth, window.innerHeight);
camera.position.setZ(30);

renderer.render(scene, camera);
