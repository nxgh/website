import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'

const { innerWidth, innerHeight } = window

function main() {
    const scene = new THREE.Scene()
    const camera = new THREE.PerspectiveCamera(75, innerWidth / innerHeight, 0.1, 1000)
    camera.position.set(0, 2, 4)

    const renderer = new THREE.WebGLRenderer({ antialias: true })
    renderer.setSize(innerWidth, innerHeight)
    renderer.shadowMap.enabled = true
    renderer.render(scene, camera)

    const app = document.querySelector('#app')
    app.appendChild(renderer.domElement)

    {
        const planeSize = 40;
        const rawUrl = 'https://raw.githubusercontent.com/nxgh/nxgh.github.io/main/public/assets/texture'
        const loader = new THREE.TextureLoader();
        const texture = loader.load(`${rawUrl}/checker.png`);
        texture.wrapS = THREE.RepeatWrapping;
        texture.wrapT = THREE.RepeatWrapping;
        texture.magFilter = THREE.NearestFilter;
        const repeats = planeSize / 2;
        texture.repeat.set(repeats, repeats);

        const mesh = new THREE.Mesh(
            new THREE.PlaneGeometry(planeSize, planeSize),
            new THREE.MeshPhongMaterial({ map: texture, side: THREE.DoubleSide, })
        )
        mesh.receiveShadow = true
        mesh.rotation.x = -Math.PI / 2
        scene.add(mesh)
    }
    {

        const light = new THREE.DirectionalLight(0xFFFFFF, 1);
        light.position.set(0, 10, 0);
        scene.add(light);
        const helper = new THREE.DirectionalLightHelper(light)
        scene.add(helper);
    }

    // focus(1:4)
    const m1 = new THREE.MeshPhongMaterial({ color: 'red', flatShading: true })
    const m2 = new THREE.MeshPhongMaterial({ color: 'hsl(0, 100%, 50%)', flatShading: true, })
    const m3 = new THREE.MeshPhongMaterial()
    m3.color.setRGB(1, 0, 0)

    {

        const geometry = new THREE.ConeGeometry(1, 1, 4);
        const mesh = new THREE.Mesh(geometry, m1)
        mesh.position.x = -3
        mesh.position.y = 1
        mesh.castShadow = true
        scene.add(mesh)
    }

    {
        const geometry = new THREE.SphereGeometry(1, 50, 50);
        const mesh = new THREE.Mesh(geometry, m2)
        mesh.position.x = 3
        mesh.position.y = 1
        mesh.castShadow = true
        scene.add(mesh)

    }
    {
        const geometry = new THREE.BoxGeometry(1, 1, 1)
        const mesh = new THREE.Mesh(geometry, m3)
        mesh.position.y = 1
        mesh.castShadow = true
        scene.add(mesh)
    }

    {
        const controls = new OrbitControls(camera, renderer.domElement)
        controls.update()
        const axesHelper = new THREE.AxesHelper(5)
        scene.add(axesHelper)
        const gridHelper = new THREE.GridHelper(10, 10)
        scene.add(gridHelper)
    }

    function render(time) {
        renderer.render(scene, camera)
        requestAnimationFrame(render)
    }
    requestAnimationFrame(render)
}

main()
