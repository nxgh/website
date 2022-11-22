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

    camera.position.set(0, 25, 0)
    camera.up.set(0, 0, 1)
    camera.lookAt(0, 0, 0)

    const controls = new OrbitControls(camera, renderer.domElement)
    controls.update()

    // focus(1:3)
    const loader = new THREE.TextureLoader();
    const bgTexture = loader.load(`${rawUrl}/StarsMap.jpg`);
    scene.background = bgTexture;

    let objects = []
    let sphereGeometry, solarSystem, earthOrbit, moonOrbit
    {
        const radius = 1;  // ui: radius
        const widthSegments = 50 // ui: widthSegments
        const heightSegments = 50;  // ui: heightSegments
        sphereGeometry = new THREE.SphereGeometry(radius, widthSegments, heightSegments);
    }

    {
        solarSystem = new THREE.Object3D();
        scene.add(solarSystem);
        objects.push(solarSystem);
        // focus
        const sunMaterial = new THREE.MeshBasicMaterial({ map: loader.load(`${rawUrl}/sun.jpg`) })
        const sunMesh = new THREE.Mesh(sphereGeometry, sunMaterial);
        sunMesh.scale.set(5, 5, 5); // 扩大太阳的大小
        solarSystem.add(sunMesh);
        objects.push(sunMesh);
    }

    {
        earthOrbit = new THREE.Object3D();
        earthOrbit.position.x = 10;
        solarSystem.add(earthOrbit);
        objects.push(earthOrbit);
        const earthMaterial = new THREE.MeshBasicMaterial({ map: loader.load(`${rawUrl}/earth.jpg`) })
        const earthMesh = new THREE.Mesh(sphereGeometry, earthMaterial);
        earthOrbit.add(earthMesh)
        objects.push(earthMesh);
    }

    {
        moonOrbit = new THREE.Object3D();
        moonOrbit.position.x = 2;
        earthOrbit.add(moonOrbit);
        const moonMaterial = new THREE.MeshBasicMaterial({ map: loader.load(`${rawUrl}/moon.jpg`) })
        const moonMesh = new THREE.Mesh(sphereGeometry, moonMaterial);
        moonMesh.scale.set(.5, .5, .5);
        moonOrbit.add(moonMesh);
        objects.push(moonMesh);
    }

    {
        const color = 0xffffff
        const intensity = 1
        const light = new THREE.PointLight(color, intensity)
        scene.add(light)
        const helper = new THREE.PointLightHelper(light)
        scene.add(helper)
    }

    function render(time) {
        objects.forEach((obj) => {
            obj.rotation.y = time * 0.001;
        });
        renderer.render(scene, camera)
        requestAnimationFrame(render)
    }
    requestAnimationFrame(render)
}

main()

