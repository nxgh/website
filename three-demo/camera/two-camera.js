import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import { GUI } from 'three/examples/jsm/libs/lil-gui.module.min.js'

const { innerWidth, innerHeight } = window

function main() {
    const scene = new THREE.Scene()
    let camera = new THREE.PerspectiveCamera(95, innerWidth / innerHeight, 0.1, 1000)

    const renderer = new THREE.WebGLRenderer({ antialias: true })
    renderer.setClearColor(new THREE.Color(0xeeeeee));
    renderer.setSize(innerWidth, innerHeight)
    renderer.render(scene, camera)

    const app = document.querySelector('#app')
    app.appendChild(renderer.domElement)

    let orbitControls = new OrbitControls(camera, renderer.domElement)

    camera.position.set(80, 30, 80)

    const gui = new GUI();
    class GUIHelper {
        constructor(perspective) {
            this.perspective = perspective
        }
        switchCamera() {
            if (camera instanceof THREE.PerspectiveCamera) {
                camera = new THREE.OrthographicCamera(innerWidth / -16, innerWidth / 16, innerHeight / 16, innerHeight / -16, -200, 500);
                this.perspective = "Orthographic"
            } else {
                camera = new THREE.PerspectiveCamera(45, innerWidth / innerHeight, 0.1, 1000);
                this.perspective = "Perspective"
            }
            camera.position.set(80, 30, 80)
            camera.lookAt(scene.position);
            orbitControls = new OrbitControls(camera, renderer.domElement)
        }
    }

    const controls = new GUIHelper("Perspective")

    gui.add(controls, 'switchCamera');
    gui.add(controls, 'perspective').listen();

    const PlaneGeometryWidth = 180
    {
        const planeGeometry = new THREE.PlaneGeometry(PlaneGeometryWidth, PlaneGeometryWidth);
        const planeMaterial = new THREE.MeshLambertMaterial({ color: 0xffffff });
        const plane = new THREE.Mesh(planeGeometry, planeMaterial);
        plane.rotation.x = -0.5 * Math.PI;
        plane.position.set(0, 0, 0)
        scene.add(plane);
    }
    {
        const cubeGeometry = new THREE.BoxGeometry(4, 4, 4);
        for (let j = 0; j < (PlaneGeometryWidth / 5); j++) {
            for (let i = 0; i < PlaneGeometryWidth / 5; i++) {
                const rnd = Math.random() * 0.75 + 0.25;
                let cubeMaterial = new THREE.MeshLambertMaterial();
                cubeMaterial.color = new THREE.Color(rnd, 0, 0);
                let cube = new THREE.Mesh(cubeGeometry, cubeMaterial);
                cube.position.z = -(PlaneGeometryWidth / 2) + 2 + (j * 5);
                cube.position.x = -(PlaneGeometryWidth / 2) + 2 + (i * 5);
                cube.position.y = 2;
                scene.add(cube);
            }
        }

        const directionalLight = new THREE.DirectionalLight(0xffffff, 0.7);
        directionalLight.position.set(-20, 40, 60);
        scene.add(directionalLight);
    }

    function render(time) {
        renderer.render(scene, camera)
        requestAnimationFrame(render)
        orbitControls.update()
    }
    requestAnimationFrame(render)
}

main()

