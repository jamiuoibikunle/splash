import * as THREE from "three";

export default class Splash {
  scene;
  camera;
  height;
  width;
  renderer;
  uTime;
  initial: {
    horizontal: number;
    vertical: number;
  };
  completed: {
    horizontal: boolean;
  };

  constructor() {
    this.height = window.innerHeight;
    this.width = window.innerWidth;
    this.initial = {
      horizontal: 0,
      vertical: 0,
    };
    this.completed = { horizontal: false };
    this.renderer = new THREE.WebGLRenderer();

    this.scene = new THREE.Scene();

    this.camera = new THREE.PerspectiveCamera(
      75,
      this.width / this.height,
      0.1,
      1000
    );

    this.uTime = new THREE.Clock();

    this.initializeRenderer();
  }

  start = () => {
    this.animate();
    this.setupCamera();
    this.middle();
    this.horizontal();
    this.vertical();
  };

  initializeRenderer = () => {
    this.renderer.render(this.scene, this.camera);
    this.renderer.setSize(this.width, this.height);
    document.getElementById("app")?.appendChild(this.renderer.domElement);
  };

  setupCamera = () => {
    this.camera.position.z = 50;
  };

  animate = () => {
    requestAnimationFrame(this.animate);

    this.height = window.innerHeight;
    this.width = window.innerWidth;

    this.renderer.setSize(this.width, this.height);
    this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    this.renderer.render(this.scene, this.camera);
    this.renderer.setClearColor(new THREE.Color(0x161616));
  };

  addResizeListener = () => {
    window.addEventListener("resize", () => {
      this.onWindowResize();
    });
  };

  onWindowResize = () => {
    this.width = window.innerWidth;
    this.height = window.innerHeight;

    this.camera.aspect = this.width / this.height;
    this.camera.updateProjectionMatrix();

    this.renderer.setSize(this.width, this.height);
  };

  middle = () => {
    const texture = new THREE.TextureLoader().load("/logo.png");
    const geometry = new THREE.BoxGeometry(3, 3, 3);
    const material = new THREE.MeshBasicMaterial({
      map: texture,
      transparent: true,
    });

    const box = new THREE.Mesh(geometry, material);
    this.scene.add(box);
  };

  horizontal = () => {
    requestAnimationFrame(this.horizontal);

    if (this.initial.horizontal < 200)
      this.initial.horizontal +=
        this.uTime.getElapsedTime() * Math.sin(1.75) * 1.5;

    const material = new THREE.MeshBasicMaterial({
      color: new THREE.Color(0xf5f5f5),
    });

    for (let i = -2; i <= 2; i += 4) {
      const points = [];
      points.push(new THREE.Vector3(0, i, 0));
      points.push(new THREE.Vector3(this.initial.horizontal, i, 0));

      const geometry = new THREE.BufferGeometry().setFromPoints(points);

      const line = new THREE.Line(geometry, material);

      line.position.x = -85;
      this.scene.add(line);
    }
  };

  vertical = () => {
    requestAnimationFrame(this.vertical);

    if (this.initial.vertical > -100)
      this.initial.vertical -=
        this.uTime.getElapsedTime() * Math.sin(1.75) * 1.5;

    const material = new THREE.MeshBasicMaterial({
      color: new THREE.Color(0xf5f5f5),
    });

    for (let i = -2; i <= 2; i += 4) {
      const points = [];
      points.push(new THREE.Vector3(i, 0, 0));
      points.push(new THREE.Vector3(i, this.initial.vertical, 0));

      const geometry = new THREE.BufferGeometry().setFromPoints(points);

      const line = new THREE.Line(geometry, material);

      line.position.y = 50;
      this.scene.add(line);
    }
  };
}
