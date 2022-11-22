import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'

const { innerWidth, innerHeight } = window

const rawUrl = 'https://raw.githubusercontent.com/nxgh/nxgh.github.io/main/public/assets/scene'

function main() {
    const scene = new THREE.Scene()
    const camera = new THREE.PerspectiveCamera(75, innerWidth / innerHeight, 0.1, 1000)
    const renderer = new THREE.WebGLRenderer({ antialias: true })
    renderer.setSize(innerWidth, innerHeight)
    renderer.render(scene, camera)

    const app = document.querySelector('#app')
    app.appendChild(renderer.domElement)

    const controls = new OrbitControls(camera, renderer.domElement)
    controls.update()

    camera.position.set(0, 25, 0);
    camera.up.set(0, 0, 1)
    camera.lookAt(0, 0, 0)

    let solarSystem, earthOrbit, moonOrbit
    let sphereGeometry, sun
    const objects = []

    {
        const radius = 1;  // ui: radius
        const widthSegments = 100 // ui: widthSegments
        const heightSegments = 100;  // ui: heightSegments
        sphereGeometry = new THREE.SphereGeometry(radius, widthSegments, heightSegments);
    }

    const loader = new THREE.TextureLoader();

    {
        solarSystem = new THREE.Object3D();
        scene.add(solarSystem);
        objects.push(solarSystem);

        const material = new THREE.MeshBasicMaterial({ map: loader.load(`${rawUrl}/sun.jpg`) })
        sun = new THREE.Mesh(sphereGeometry, material)
        sun.name = 'sun'
        sun.scale.set(5, 5, 5); // 扩大太阳的大小
        solarSystem.add(sun)
        objects.push(sun)
    }

    {
        earthOrbit = new THREE.Object3D();
        earthOrbit.position.x = 10;
        solarSystem.add(earthOrbit);
        objects.push(earthOrbit);
        const materials = new THREE.MeshBasicMaterial({ map: loader.load(`${rawUrl}/earth.jpg`) })
        const earthMesh = new THREE.Mesh(sphereGeometry, materials);
        earthMesh.position.x = 10;
        solarSystem.add(earthMesh);
        objects.push(earthMesh);
    }

    {
        moonOrbit = new THREE.Object3D();
        moonOrbit.position.x = 2;
        earthOrbit.add(moonOrbit);
        const moonMaterial = new THREE.MeshBasicMaterial({ map: loader.load(`${rawUrl}/moon.jpg`) })
        const moonMesh = new THREE.Mesh(sphereGeometry, moonMaterial);
        moonMesh.scale.set(.5, .5, .5);
        moonMesh.name = 'moon';
        moonOrbit.add(moonMesh);
        objects.push(moonMesh);
    }

    objects.forEach((node) => {
        const axes = new THREE.AxesHelper();
        axes.material.depthTest = false;
        axes.renderOrder = 1;
        node.add(axes);
    });

    {
        const color = 0xffffff
        const intensity = 1
        const light = new THREE.PointLight(color, intensity)
        scene.add(light)
        const helper = new THREE.PointLightHelper(light)
        scene.add(helper)
    }

    function render(time) {
        time *= 0.001

        objects.forEach((obj) => {
            obj.rotation.y = time;
        });

        renderer.render(scene, camera)
        requestAnimationFrame(render)
    }
    requestAnimationFrame(render)
}

main()

