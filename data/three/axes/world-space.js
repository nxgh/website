import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'

const { innerWidth, innerHeight } = window

function main() {
    const scene = new THREE.Scene()
    const camera = new THREE.PerspectiveCamera(75, innerWidth / innerHeight, 0.1, 1000)
    const renderer = new THREE.WebGLRenderer({ antialias: true })
    renderer.setSize(innerWidth, innerHeight)
    const controls = new OrbitControls(camera, renderer.domElement)
    controls.update()

    const app = document.querySelector('#app')
    app.appendChild(renderer.domElement)

    let cube
    {
        cube = new THREE.Mesh(
            new THREE.BoxGeometry(1, 1, 1),
            new THREE.MeshBasicMaterial({ color: 0x44aa88 })
        )
        scene.add(cube)
        // focus(1,2)
        camera.position.set(1, 2, 10)
        cube.position.set(1, 1, 1)
        renderer.render(scene, camera)
    }

    {
        const axesHelper = new THREE.AxesHelper(5)
        scene.add(axesHelper)
        const origin = new THREE.Vector3(0, 0, 0);
        const hex = [0xff0000, 0x00ff00, 0x0000ff];
        [...Array(3).keys()].forEach((item) => {
            const [x, y, z] = [0, 0, 0].map((_, idx) => idx === item ? 1 : 0)
            const dir = new THREE.Vector3(x, y, z);
            dir.normalize();
            const arrowHelper = new THREE.ArrowHelper(dir, origin, 1, hex[item]);
            cube.add(arrowHelper);
        })
    }

    function render(time) {
        renderer.render(scene, camera)
        requestAnimationFrame(render)
    }
    requestAnimationFrame(render)
}

main()