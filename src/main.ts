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

const geometry = new THREE.TorusGeometry(8, 2.5, 16, 100);
const material = new THREE.MeshStandardMaterial({
  color: 0xff6347,
});
const torus = new THREE.Mesh(geometry, material);

scene.add(torus);

const pointLight = new THREE.PointLight(0xffffff);
pointLight.position.set(20, 20, 20);

const ambientLight = new THREE.AmbientLight(0xffffff);
scene.add(pointLight, ambientLight);

function animate() {
  torus.rotation.x += 0.01;
  torus.rotation.y += 0.005;
  torus.rotation.z += 0.01;

  requestAnimationFrame(animate);
  renderer.render(scene, camera);
}

animate();
