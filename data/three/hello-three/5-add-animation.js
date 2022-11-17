import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import { GUI } from 'three/examples/jsm/libs/lil-gui.module.min.js'
import gsap from 'gsap'

function main() {
    const scene = new THREE.Scene()
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000)
    const renderer = new THREE.WebGLRenderer({ antialias: true })
    renderer.setSize(window.innerWidth, window.innerHeight)

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
        scene.add(cube)
        camera.position.z = 5
    }

    {
        let type = 'scale'
        const gui = new GUI()
        const settings = {
            type: type,
            X: 1,
            Y: 1,
            Z: 1,
        }
        gui.add(settings, 'type', ['scale', 'position', 'rotation']).onChange(v => (type = v))
        gui.add(settings, 'X', -5, 10, 1).onChange(v => (cube[type].y = v)) // min, max, step
        gui.add(settings, 'Y', -5, 10, 1).onChange(v => (cube[type].z = v))
        gui.add(settings, 'Z', -5, 5, 0.1).onChange(v => (cube[type].x = v))
    }

    {
        const color = 0xffffff
        const intensity = 1
        const light = new THREE.DirectionalLight(color, intensity)
        light.position.set(-1, 2, 4)
        scene.add(light)
    }

    const controls = new OrbitControls(camera, renderer.domElement)
    controls.update();

    {
        const axesHelper = new THREE.AxesHelper(5)
        scene.add(axesHelper)
        const gridHelper = new THREE.GridHelper(10, 10)
        scene.add(gridHelper)
    }

    {
        // focus(1:2)
        gsap.to(cube.position, { x: 5, duration: 5, ease: 'power1.inOut', repeat: -1, yoyo: true })
        gsap.to(cube.rotation, { x: 2 * Math.PI, duration: 5, ease: 'power1.inOut' })
    }

    function render(time) {
        renderer.render(scene, camera)
        requestAnimationFrame(render)
    }
    requestAnimationFrame(render)
}

main()




