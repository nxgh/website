import * as THREE from 'three'

function main() {
    const scene = new THREE.Scene()
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000)
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
        // focus
        const material = new THREE.MeshPhongMaterial({ color: 0x44aa88 })
        cube = new THREE.Mesh(geometry, material)
        scene.add(cube)
        camera.position.z = 5
    }

    {
        // focus(1:5) 
        const color = 0xffffff
        const intensity = 1
        const light = new THREE.DirectionalLight(color, intensity)
        light.position.set(-1, 2, 4)
        scene.add(light)
    }

    function render(time) {
        time *= 0.001 // 将时间单位变为秒
        cube.rotation.x = time
        cube.rotation.y = time
        renderer.render(scene, camera)
        requestAnimationFrame(render)
    }
    requestAnimationFrame(render)
}

main()