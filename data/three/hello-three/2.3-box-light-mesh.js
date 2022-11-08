import * as THREE from 'three'

let renderer, scene, camera
let cube

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
    // focus
    const material = new THREE.MeshPhongMaterial({ color: 0x44aa88 })
    cube = new THREE.Mesh(geometry, material)
    scene.add(cube)
}

// focus(1:7)
function createLight() {
    const color = 0xffffff
    const intensity = 1
    const light = new THREE.DirectionalLight(color, intensity)
    light.position.set(-1, 2, 4)
    scene.add(light)
}

init()
createBox()
createLight()

function render(time) {
    time *= 0.001 // 将时间单位变为秒
    cube.rotation.x = time
    cube.rotation.y = time
    renderer.render(scene, camera)
    requestAnimationFrame(render)
}
requestAnimationFrame(render)
