import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'

const { innerWidth, innerHeight } = window

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

    let objects = []
    let sphereGeometry, sunMesh, earthMesh
    {
        const radius = 1;  // ui: radius
        const widthSegments = 6 // ui: widthSegments
        const heightSegments = 6;  // ui: heightSegments
        sphereGeometry = new THREE.SphereGeometry(radius, widthSegments, heightSegments);
    }

    {
        const sunMaterial = new THREE.MeshPhongMaterial({ emissive: 0xffff00 });
        sunMesh = new THREE.Mesh(sphereGeometry, sunMaterial);
        sunMesh.scale.set(5, 5, 5); // 扩大太阳的大小
        scene.add(sunMesh);
        objects.push(sunMesh);
    }

    {
        // focus(1:8)
        const earthMaterial = new THREE.MeshPhongMaterial({
            color: 0x2233ff,
            emissive: 0x112244,
        });
        earthMesh = new THREE.Mesh(sphereGeometry, earthMaterial);
        earthMesh.position.x = 10;
        scene.add(earthMesh);
        objects.push(earthMesh);
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

