import "./style.scss";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import { MeshBasicMaterial } from "three";

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
pointLight.position.set(5, 5, 5);

const ambientLight = new THREE.AmbientLight(0xffffff);
scene.add(pointLight, ambientLight);

const lightHelper = new THREE.PointLightHelper(pointLight);
const gridHelper = new THREE.GridHelper(200, 50);
scene.add(lightHelper, gridHelper);

const controls = new OrbitControls(camera, renderer.domElement);

// adds a star in a random space (-100, 100) for x, y, z
function addStar() {
  // const geometry = new THREE.SphereGeometry(0.25, 24, 24);
  // const material = new THREE.MeshStandardMaterial({ color: 0xffffff });
  // const star = new THREE.Mesh(geometry, material);
  const tsTexture = new THREE.TextureLoader().load("typescript.svg");
  const ts = new THREE.Mesh(
    new THREE.BoxGeometry(3, 3, 3),
    new MeshBasicMaterial({ map: tsTexture })
  );

  const [x, y, z] = Array(3)
    .fill(0)
    .map(() => THREE.MathUtils.randFloatSpread(25));

  ts.position.set(x, y, z);
  scene.add(ts);
}

Array(10).fill(0).forEach(addStar);

const moonTexture = new THREE.TextureLoader().load("moon.jpeg");
const normalTexture = new THREE.TextureLoader().load("normal.jpeg");
const moon = new THREE.Mesh(
  new THREE.SphereGeometry(3, 32, 32),
  new THREE.MeshStandardMaterial({ map: moonTexture, normalMap: normalTexture })
);
moon.position.z = 30;
moon.position.x = 10;

scene.add(moon);

const spaceTexture = new THREE.TextureLoader().load("sky.jpeg");
scene.background = spaceTexture;

function animate() {
  torus.rotation.x += 0.01;
  torus.rotation.y += 0.002;
  torus.rotation.z += 0.001;

  controls.update();

  requestAnimationFrame(animate);
  renderer.render(scene, camera);
}

animate();

function moveCamera() {
  const t = document.body.getBoundingClientRect().top;

  moon.rotation.x += 0.01;
  moon.rotation.y += 0.005;
  moon.rotation.z += 0.01;

  camera.position.z = t * -0.01;
  camera.position.x = t * -0.0002;
  camera.position.y = t * -0.0002;
  console.log(camera.position);
}

document.body.onscroll = moveCamera;
