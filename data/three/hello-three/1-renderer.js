import * as THREE from 'three'

let renderer, scene, camera

function init() {
    scene = new THREE.Scene()
    camera = new THREE.PerspectiveCamera(75, 2, 0.1, 1000)
    camera.position.z = 2

    renderer = new THREE.WebGLRenderer({ antialias: true })
    renderer.setSize(window.innerWidth, window.innerHeight)
    renderer.render(scene, camera)

    const app = document.querySelector('#app')
    app.appendChild(renderer.domElement)
}

init()



