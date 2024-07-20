import * as THREE from "three";

export default class Splash {
  scene;
  camera;
  height;
  width;
  renderer;

  constructor() {
    this.height = window.innerHeight;
    this.width = window.innerWidth;

    this.scene = new THREE.Scene();

    this.camera = new THREE.PerspectiveCamera(
      75,
      this.width / this.height,
      0.1,
      1000
    );
    this.camera.position.z = 15;

    this.renderer = new THREE.WebGLRenderer();
    this.renderer.render(this.scene, this.camera);
    document.getElementById("app")?.appendChild(this.renderer.domElement);
  }

  middle = (): void => {
    const texture = new THREE.TextureLoader().load("/logo.png");
    const geometry = new THREE.BoxGeometry(1, 1, 1);
    const material = new THREE.MeshBasicMaterial({
      map: texture,
      transparent: true,
    });

    const box = new THREE.Mesh(geometry, material);
    this.scene.add(box);
  };

  animate = (): void => {
    requestAnimationFrame(this.animate);

    this.height = window.innerHeight;
    this.width = window.innerWidth;

    this.renderer.setSize(this.width, this.height);
    this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    this.renderer.render(this.scene, this.camera);
    this.renderer.setClearColor(new THREE.Color(0x161616));
  };
}
