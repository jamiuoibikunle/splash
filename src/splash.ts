import * as THREE from "three";

export default class Splash {
  scene;
  camera;
  height;
  width;
  renderer;
  container;
  uTime;
  initial: {
    horizontal: number;
    vertical: number;
  };
  meshArray: THREE.BufferGeometry<THREE.NormalBufferAttributes>[];

  constructor() {
    this.height = window.innerHeight;
    this.width = window.innerWidth;
    this.initial = {
      horizontal: 0,
      vertical: 0,
    };
    this.meshArray = [];
    this.renderer = new THREE.WebGLRenderer();
    this.container = document.getElementById("app");

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
    this.zoom();
  };

  initializeRenderer = () => {
    this.renderer.render(this.scene, this.camera);
    this.renderer.setSize(this.width, this.height);
    this.container?.appendChild(this.renderer.domElement);
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
    requestAnimationFrame(this.middle);

    let visible = false;

    if (this.uTime.getElapsedTime() > 1 && this.uTime.getElapsedTime() < 2) {
      visible = true;
    } else {
      visible = false;
    }

    const texture = new THREE.TextureLoader().load("/logo.png");
    const geometry = new THREE.BoxGeometry(2, 2, 2);
    const material = new THREE.MeshBasicMaterial({
      map: texture,
      transparent: true,
    });

    const box = new THREE.Mesh(geometry, material);

    this.scene.add(box);
  };

  horizontal = () => {
    if (this.initial.horizontal < 170) {
      requestAnimationFrame(this.horizontal);
      this.initial.horizontal += Math.sin(1.75) * 1.5;
    }

    const material = new THREE.MeshBasicMaterial({
      color: new THREE.Color(0xd4d4d4),
    });

    for (let i = -2; i <= 2; i += 4) {
      const points = [];
      points.push(new THREE.Vector3(0, i, 0));
      points.push(new THREE.Vector3(this.initial.horizontal, i, 0));

      const geometry = new THREE.BufferGeometry().setFromPoints(points);

      const line = new THREE.Line(geometry, material);

      this.meshArray.push(geometry);

      line.position.x = -85;
      this.scene.add(line);
    }
  };

  vertical = () => {
    requestAnimationFrame(this.vertical);

    if (this.initial.vertical > -80 && this.uTime.getElapsedTime() > 1)
      this.initial.vertical -= Math.sin(1.75) * 1.5;

    const material = new THREE.MeshBasicMaterial({
      color: new THREE.Color(0xd4d4d4),
    });

    for (let i = -2; i <= 2; i += 4) {
      const points = [];
      points.push(new THREE.Vector3(i, 0, 0));
      points.push(new THREE.Vector3(i, this.initial.vertical, 0));

      const geometry = new THREE.BufferGeometry().setFromPoints(points);

      const line = new THREE.Line(geometry, material);

      line.position.y = 40;
      this.scene.add(line);
    }
  };

  zoom = () => {
    requestAnimationFrame(this.zoom);
    if (this.uTime.getElapsedTime() > 2 && this.camera.position.z > 1) {
      this.camera.position.z -= 1;
    }

    if (this.camera.position.z == 1) this.unmount();
  };

  unmount = () => {
    this.container?.removeChild(this.renderer.domElement);

    this.renderer.dispose();
    this.scene.clear();
  };
}
