import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'

const { innerWidth, innerHeight } = window

function main() {
    const scene = new THREE.Scene()
    const camera = new THREE.PerspectiveCamera(75, innerWidth / innerHeight, 0.1, 1000)
    const renderer = new THREE.WebGLRenderer({ antialias: true })
    renderer.setSize(innerWidth, innerHeight)
    // focus
    renderer.shadowMap.enabled = true;
    renderer.render(scene, camera)

    const app = document.querySelector('#app')
    app.appendChild(renderer.domElement)

    let cube
    {
        const boxWidth = 1
        const boxHeight = 1
        const boxDepth = 1
        const geometry = new THREE.BoxGeometry(boxWidth, boxHeight, boxDepth)
        const material = new THREE.MeshPhongMaterial({ color: 0x44aa88 })
        cube = new THREE.Mesh(geometry, material)
        cube.position.y = 1
        scene.add(cube)
        camera.position.z = 5
        renderer.render(scene, camera)
    }

    {
        const color = 0xffffff
        const intensity = 1
        const light = new THREE.DirectionalLight(color, intensity)
        light.position.set(1, 3, 3)
        scene.add(light)
        const helper = new THREE.DirectionalLightHelper(light)
        scene.add(helper)
    }

    {
        const mesh = new THREE.Mesh(
            new THREE.PlaneGeometry(10, 10),
            new THREE.MeshLambertMaterial({ color: 0xffffff, })
        );
        mesh.rotation.x = - Math.PI / 2;
        scene.add(mesh);
    }


    {
        const controls = new OrbitControls(camera, renderer.domElement)
        controls.update()
    }

    {
        const axesHelper = new THREE.AxesHelper(5)
        scene.add(axesHelper)
        const gridHelper = new THREE.GridHelper(10, 10)
        scene.add(gridHelper)
        camera.position.y = 2
    }

    function render(time) {
        renderer.render(scene, camera)
        requestAnimationFrame(render)
    }
    requestAnimationFrame(render)
}

main()