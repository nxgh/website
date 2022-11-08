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

// focus(1:10)
function createBox() {
    const boxWidth = 1
    const boxHeight = 1
    const boxDepth = 1
    const geometry = new THREE.BoxGeometry(boxWidth, boxHeight, boxDepth)
    const material = new THREE.MeshBasicMaterial({ color: 0x44aa88 })
    cube = new THREE.Mesh(geometry, material)
    scene.add(cube)
    renderer.render(scene, camera)
}

init()
createBox()