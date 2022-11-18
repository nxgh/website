import * as THREE from 'three'
const { innerWidth, innerHeight } = window

function main() {
    const scene = new THREE.Scene()
    const camera = new THREE.PerspectiveCamera(75, innerWidth / innerHeight, 0.1, 1000)
    const renderer = new THREE.WebGLRenderer({ antialias: true })
    renderer.setSize(innerWidth, innerHeight)
    renderer.render(scene, camera)

    const app = document.querySelector('#app')
    app.appendChild(renderer.domElement)

    {
        const boxWidth = 1
        const boxHeight = 1
        const boxDepth = 1
        const geometry = new THREE.BoxGeometry(boxWidth, boxHeight, boxDepth)
        const material = new THREE.MeshBasicMaterial({ color: 0x44aa88 })
        // focus(1:3)
        const cube = new THREE.Mesh(geometry, material)
        scene.add(cube)
        renderer.render(scene, camera)
    }
}

main()