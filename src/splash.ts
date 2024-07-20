import * as THREE from "three";

export default class Splash {
  scene;
  camera;
  height;
  width;
  renderer;
  uTime;
  horizontalPosition;

  constructor() {
    this.height = window.innerHeight;
    this.width = window.innerWidth;
    this.horizontalPosition = 0;

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

    this.uTime = new THREE.Clock();
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

  horizontal = (): void => {
    requestAnimationFrame(this.horizontal);

    if (this.horizontalPosition < 50)
      this.horizontalPosition +=
        this.uTime.getElapsedTime() * Math.sin(0.75) * 2;

    const material = new THREE.MeshBasicMaterial({
      color: new THREE.Color(0xf5f5f5),
    });

    for (let i = -1; i <= 1; i += 2) {
      const points = [];
      points.push(new THREE.Vector3(0, i, 0));
      points.push(new THREE.Vector3(this.horizontalPosition, i, 0));

      const geometry = new THREE.BufferGeometry().setFromPoints(points);

      const line = new THREE.Line(geometry, material);

      line.position.x = -25;
      this.scene.add(line);
    }
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
