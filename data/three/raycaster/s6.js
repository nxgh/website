
import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'

const rawUrl = 'https://raw.githubusercontent.com/nxgh/nxgh.github.io/main/public/'

function rand(min, max) {
    if (max === undefined) {
        max = min;
        min = 0;
    }
    return min + (max - min) * Math.random();
}

function randomColor() {
    return `hsl(${rand(360) | 0}, ${rand(50, 100) | 0}%, 50%)`;
}

const { innerWidth, innerHeight } = window

function main() {
    const scene = new THREE.Scene()
    const camera = new THREE.PerspectiveCamera(75, innerWidth / innerHeight, 0.1, 1000)
    camera.position.set(0, 0, 10)

    const renderer = new THREE.WebGLRenderer({ antialias: true })
    renderer.setSize(innerWidth, innerHeight)

    const controls = new OrbitControls(camera, renderer.domElement)
    controls.update()

    const app = document.querySelector('#app')
    app.appendChild(renderer.domElement)

    const light = new THREE.AmbientLight()
    scene.add(light)
    const axesHelper = new THREE.AxesHelper(5)
    scene.add(axesHelper)

    const loader = new THREE.TextureLoader();
    const texture = loader.load(`${rawUrl}/assets/texture/frame.png`);

    const geometry = new THREE.BoxGeometry(2, 2, 2);
    const cubes = [
        [-1, 0, 1,], [1, 0, 1], [-1, 0, -1], [1, 0, -1],
        [-1, 2, 1,], [1, 2, 1], [-1, 2, -1], [1, 2, -1],

    ].map((pos) => {
        const material = new THREE.MeshPhongMaterial({
            color: randomColor(),
            map: texture,
            transparent: true,
            side: THREE.DoubleSide,
            alphaTest: 0.1,
        });

        const cube = new THREE.Mesh(geometry, material);
        cube.position.set(...pos)
        scene.add(cube);
        return cube;
    })


    {
        const raycaster = new THREE.Raycaster()

        function setPointer(event) {
            const pointer = new THREE.Vector3()
            pointer.x = (event.clientX / window.innerWidth) * 2 - 1
            pointer.y = -(event.clientY / window.innerHeight) * 2 + 1
            return pointer
        }
        function onPointerDown(event) {
            const pointer = setPointer(event)
            raycaster.setFromCamera(pointer, camera)
            const intersectedObjects = raycaster.intersectObjects(cubes)
            if (intersectedObjects.length) {
                intersectedObjects[0].object.material.color.set(`#${Math.floor(Math.random() * 16777215).toString(16)}`)
            }
        }

        document.addEventListener('pointerdown', onPointerDown)
    }

    function render(time) {
        renderer.render(scene, camera)
        requestAnimationFrame(render)
    }
    requestAnimationFrame(render)
}

main()
