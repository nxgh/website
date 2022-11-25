import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'

const rawUrl = 'https://raw.githubusercontent.com/nxgh/nxgh.github.io/main/public/assets/texture'
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
        const light = new THREE.PointLight(0xFFFFFF, 1);
        light.position.set(0, 5, 0);
        scene.add(light);
        const helper = new THREE.PointLightHelper(light)
        scene.add(helper);
    }

    let materials = [
        new THREE.MeshBasicMaterial({ color: '#55a9fe' }),
        new THREE.MeshLambertMaterial({ color: '#55a9fe' }),
        new THREE.MeshPhongMaterial({ color: '#55a9fe', shininess: 100 }),
        new THREE.MeshToonMaterial({ color: '#55a9fe', }),
    ]

    {

        [-5, -2, 2, 5].forEach((item, index) => {
            const geometry = new THREE.SphereGeometry(1, 100, 100);
            const mesh = new THREE.Mesh(geometry, materials[index])
            mesh.position.x = item
            mesh.position.y = 1
            mesh.castShadow = true
            scene.add(mesh)
        })

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
