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

    // focus
    let objects = []
    let sphereGeometry
    {
        const radius = 1;  // ui: radius
        const widthSegments = 6 // ui: widthSegments
        const heightSegments = 6;  // ui: heightSegments
        sphereGeometry = new THREE.SphereGeometry(radius, widthSegments, heightSegments);
    }

    {
        // focus(1:5)
        const sunMaterial = new THREE.MeshPhongMaterial({ emissive: 0xffff00 });
        const sunMesh = new THREE.Mesh(sphereGeometry, sunMaterial);
        sunMesh.scale.set(5, 5, 5); // 扩大太阳的大小
        scene.add(sunMesh);
        objects.push(sunMesh);
    }

    function render(time) {
        renderer.render(scene, camera)
        requestAnimationFrame(render)
    }
    requestAnimationFrame(render)
}

main()

