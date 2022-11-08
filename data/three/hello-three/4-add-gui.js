import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import { GUI } from 'three/examples/jsm/libs/lil-gui.module.min.js'

let renderer, scene, camera
let cube
let controls

// focus(1:10)
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

function init() {
    scene = new THREE.Scene()
    camera = new THREE.PerspectiveCamera(75, 2, 0.1, 1000)
    camera.position.z = 5
    renderer = new THREE.WebGLRenderer({ antialias: true })
    renderer.setSize(window.innerWidth, window.innerHeight)
    renderer.render(scene, camera)

    const app = document.querySelector('#app')
    app.appendChild(renderer.domElement)
}

function createBox() {
    const boxWidth = 1
    const boxHeight = 1
    const boxDepth = 1
    const geometry = new THREE.BoxGeometry(boxWidth, boxHeight, boxDepth)
    const material = new THREE.MeshPhongMaterial({ color: 0x44aa88 })
    cube = new THREE.Mesh(geometry, material)
    scene.add(cube)
}

function createLight() {
    const color = 0xffffff
    const intensity = 1
    const light = new THREE.DirectionalLight(color, intensity)
    light.position.set(-1, 2, 4)
    scene.add(light)
}

function addHelper() {
    controls = new OrbitControls(camera, renderer.domElement)
    controls.update();
    const axesHelper = new THREE.AxesHelper(5)
    scene.add(axesHelper)
    const gridHelper = new THREE.GridHelper(10, 10)
    scene.add(gridHelper)
}

init()
createBox()
createLight()
addHelper()

function render(time) {
    requestAnimationFrame(render)
    renderer.render(scene, camera)
    controls.update();
}
requestAnimationFrame(render)
