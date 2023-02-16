import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'

function main() {
    const scene = new THREE.Scene()
    const camera = new THREE.PerspectiveCamera(75, 2, 0.1, 1000)
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
        // focus(1:21)
        const raycaster = new THREE.Raycaster()
        const pointer = new THREE.Vector3()

        function setPointer(event) {
            pointer.x = (event.clientX / window.innerWidth) * 2 - 1
            pointer.y = -(event.clientY / window.innerHeight) * 2 + 1
        }
        function onPointerDown(event) {
            setPointer(event)
            raycaster.setFromCamera(pointer, camera)
            const intersectedObjects = raycaster.intersectObjects(scene.children)
            if (intersectedObjects.length) {
                intersectedObjects.forEach(item => {
                    if (item.object.uuid === cube.uuid)
                        item.object.material.color.set(`#${Math.floor(Math.random() * 16777215).toString(16)}`)
                })
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

