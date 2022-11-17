/**
 * from Bruno Simon https://www.bruno-simon.com/
 * raycaster 案例,
 */

import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'

let renderer, scene, camera
let controls

const app = document.querySelector('#app')

function init() {
    scene = new THREE.Scene()
    const cameraAspect = window.innerWidth / window.innerHeight
    camera = new THREE.PerspectiveCamera(75, cameraAspect, 0.1, 100)
    camera.position.z = 5
    renderer = new THREE.WebGLRenderer({ antialias: true })
    renderer.setSize(window.innerWidth, window.innerHeight)
    renderer.render(scene, camera)

    controls = new OrbitControls(camera, renderer.domElement)
    app.appendChild(renderer.domElement)
}

init()

const line = new THREE.Line(
    new THREE.BufferGeometry().setFromPoints([new THREE.Vector3(-5, 0, 0), new THREE.Vector3(5, 0, 0)]),
    new THREE.LineBasicMaterial({ color: 0x00ff00 })
)
scene.add(line)

const createMeshObject = () => new THREE.Mesh(new THREE.SphereGeometry(0.5, 16, 16), new THREE.MeshBasicMaterial({ color: '#ff0000' }))

const [object1, object2, object3] = [...Array(3)].map(i => createMeshObject())

object1.position.x = -2
object2.position.x = 0
object3.position.x = 2

scene.add(object1, object2, object3)

const tick = time => {
    const raycaster = new THREE.Raycaster()
    const rayOrigin = new THREE.Vector3(-3, 0, 0)
    const rayDirOrigin = new THREE.Vector3(1, 0, 0)

    object1.position.y = Math.sin(time * 0.001)
    object2.position.y = Math.sin(time * 0.002)
    object3.position.y = Math.sin(time * 0.003)

    rayDirOrigin.normalize()
    raycaster.set(rayOrigin, rayDirOrigin)

    const objectsToTest = [object1, object2, object3]
    const intersects = raycaster.intersectObjects(objectsToTest)

    objectsToTest.forEach(item => item.material.color.set('#ff0000'))
    intersects.forEach(item => item.object.material.color.set('#00ff00'))
}

function render(time) {
    tick(time)
    requestAnimationFrame(render)
    renderer.render(scene, camera)
}
requestAnimationFrame(render)
