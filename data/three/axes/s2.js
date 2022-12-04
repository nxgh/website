import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import gsap from "gsap";

const { innerWidth, innerHeight } = window

function main() {
    const scene = new THREE.Scene()
    const camera = new THREE.PerspectiveCamera(75, innerWidth / innerHeight, 0.1, 1000)
    const renderer = new THREE.WebGLRenderer({ antialias: true })
    renderer.setSize(innerWidth, innerHeight)
    camera.position.z = 5

    const controls = new OrbitControls(camera, renderer.domElement)
    controls.update()
    const axesHelper = new THREE.AxesHelper(5)
    scene.add(axesHelper)

    const app = document.querySelector('#app')
    app.appendChild(renderer.domElement)

    const cube = new THREE.Mesh(
        new THREE.BoxGeometry(1, 1, 1),
        new THREE.MeshBasicMaterial({ color: 0x44aa88 })
    )
    scene.add(cube)

    gsap.to(cube.position, { x: 5, duration: 5, repeat: -1, yoyo: 1 })

    
    function NDC(worldPosition) {
        // focus(1:6)
        const standardVec3 = worldPosition.project(camera);
        const centerX = innerWidth / 2
        const centerY = innerHeight / 2

        const canvasX = Math.round(centerX * standardVec3.x + centerX);//标准设备坐标转屏幕坐标
        const canvasY = Math.round(-centerY * standardVec3.y + centerY);//标准设备坐标转屏幕坐标

        return [canvasX, canvasY]
    }


    function updateTooltip() {
        const { x, y, z } = cube.position
        // 世界坐标转标准设备坐标
        const [canvasX, canvasY] = NDC(new THREE.Vector3(x, y, z))
        const id = 'tool-tip'
        let div = document.querySelector(`#${id}`)
        if (!div) {
            div = document.createElement('div')
            div.id = id
            app.appendChild(div)
            return
        }
        div.innerHTML = `${canvasX}, ${canvasY}`
        div.style = `position: fixed; left: ${canvasX}px; top: ${canvasY}px; color: white`
    }

    function render(time) {
        updateTooltip()
        renderer.render(scene, camera)
        requestAnimationFrame(render)
    }
    requestAnimationFrame(render)
}

main()