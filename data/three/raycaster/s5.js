
import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'

const { innerWidth, innerHeight } = window

function main() {
    const scene = new THREE.Scene()
    const camera = new THREE.PerspectiveCamera(75, innerWidth / innerHeight, 0.1, 1000)
    const renderer = new THREE.WebGLRenderer({ antialias: true })
    renderer.setSize(window.innerWidth, window.innerHeight)

    const app = document.querySelector('#app')
    app.appendChild(renderer.domElement)

    const cubes = []
    {
        ;[...Array(5).keys()].reduce((arr, item) => {
            [...Array(5).keys()].forEach(i => {
                arr.push([item * 2, i * 2])
            })
            return arr
        }, []).forEach(([x, y], index) => {
            const geometry = new THREE.SphereGeometry(1, 100, 100);
            const mesh = new THREE.Mesh(geometry, new THREE.MeshBasicMaterial({
                color: '#4ee580',
            }))
            mesh.position.x = x
            mesh.position.y = y
            cubes.push(mesh)
            scene.add(mesh)
        })

        camera.position.set(4, 4, 10)
        camera.lookAt(new THREE.Vector3(3, 3, 0))


    }

    const controls = new OrbitControls(camera, renderer.domElement)
    controls.target.set(4, 4, 0)
    controls.update();

    {
        // focus(1:21)
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

