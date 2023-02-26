import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'

const { innerWidth, innerHeight } = window

function main() {
    const scene = new THREE.Scene()
    const camera = new THREE.PerspectiveCamera(75, innerWidth / innerHeight, 0.1, 1000)
    camera.position.z = 3

    const renderer = new THREE.WebGLRenderer({ antialias: true })
    renderer.setSize(innerWidth, innerHeight)
    renderer.shadowMap.enabled = true
    renderer.render(scene, camera)
    const controls = new OrbitControls(camera, renderer.domElement)
    controls.update()

    const app = document.querySelector('#app')
    app.appendChild(renderer.domElement)

    const objects = [-2, 0, 2].map(i => {
        const mesh = new THREE.Mesh(
            new THREE.SphereGeometry(0.5, 16, 16),
            new THREE.MeshBasicMaterial({ color: '#ff0000' })
        )
        mesh.position.x = i
        scene.add(mesh)
        return mesh
    })


    let raycaster
    {
        raycaster = new THREE.Raycaster()
        const rayOrigin = new THREE.Vector3(-3, 0, 0)
        const rayDirOrigin = new THREE.Vector3(1, 0, 0)
        rayDirOrigin.normalize()
        raycaster.set(rayOrigin, rayDirOrigin)
    }

    {
        // focus(1:5)
        const line = new THREE.Line(
            new THREE.BufferGeometry().setFromPoints([new THREE.Vector3(-3, 0, 0), new THREE.Vector3(3, 0, 0)]),
            new THREE.LineBasicMaterial({ color: 0x00ff00 })
        )
        scene.add(line)
    }

    // focus(1:4)
    function tick(time) {
        time = time * 0.001
        objects.forEach((item, index) => item.position.y = Math.sin(time * (index + 1)))
    }

    function render(time) {
        tick(time)
        renderer.render(scene, camera)
        requestAnimationFrame(render)
    }
    requestAnimationFrame(render)
}

main()
