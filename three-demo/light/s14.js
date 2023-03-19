import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import { GUI } from 'three/examples/jsm/libs/lil-gui.module.min.js'

const rawUrl = 'https://raw.githubusercontent.com/nxgh/nxgh.github.io/main/public/assets/texture'
const { innerWidth, innerHeight } = window

class ColorGUIHelper {
    constructor(object, prop) {
        this.object = object;
        this.prop = prop;
    }
    get value() {
        return `#${this.object[this.prop].getHexString()}`;
    }
    set value(hexString) {
        this.object[this.prop].set(hexString);
    }
}

function makeXYZGUI(gui, vector3, name, onChangeFn) {
    const folder = gui.addFolder(name);
    folder.add(vector3, 'x', -10, 10).onChange(onChangeFn);
    folder.add(vector3, 'y', 0, 10).onChange(onChangeFn);
    folder.add(vector3, 'z', -10, 10).onChange(onChangeFn);
    folder.open();
}

function main() {
    const scene = new THREE.Scene()
    const camera = new THREE.PerspectiveCamera(75, innerWidth / innerHeight, 0.1, 1000)
    const renderer = new THREE.WebGLRenderer({ antialias: true })
    renderer.setSize(innerWidth, innerHeight)
    renderer.shadowMap.enabled = true
    renderer.render(scene, camera)

    renderer.physicallyCorrectLights = true;
    const app = document.querySelector('#app')
    app.appendChild(renderer.domElement)

    let light
    {
        const color = 0xFFFFFF;
        const intensity = 1;
        // focus(1:4)
        light = new THREE.PointLight(color, intensity);
        light.power = 800;
        light.decay = 2;
        light.distance = Infinity;
        light.position.set(0, 10, 0);
        scene.add(light);
    }

    {
        const helper = new THREE.PointLightHelper(light);
        scene.add(helper);
        function updateLight() {
            helper.update();
        }
        const gui = new GUI();
        gui.addColor(new ColorGUIHelper(light, 'color'), 'value').name('color');
        gui.add(light, 'decay', 0, 4, 0.01);
        gui.add(light, 'power', 0, 2000);

        makeXYZGUI(gui, light.position, 'position');
    }

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
            new THREE.MeshPhongMaterial({ map: texture, side: THREE.DoubleSide })
        )
        mesh.receiveShadow = true
        mesh.rotation.x = -Math.PI / 2
        scene.add(mesh)
    }
    {
        const cubeSize = 4;
        const cubeGeo = new THREE.BoxGeometry(cubeSize, cubeSize, cubeSize);
        const cubeMat = new THREE.MeshPhongMaterial({ color: '#8AC' });
        const mesh = new THREE.Mesh(cubeGeo, cubeMat);
        mesh.position.set(cubeSize + 1, cubeSize / 2, 0);
        scene.add(mesh);
    }
    {
        const sphereRadius = 3;
        const sphereWidthDivisions = 32;
        const sphereHeightDivisions = 16;
        const sphereGeo = new THREE.SphereGeometry(sphereRadius, sphereWidthDivisions, sphereHeightDivisions);
        const sphereMat = new THREE.MeshPhongMaterial({ color: '#CA8' });
        const mesh = new THREE.Mesh(sphereGeo, sphereMat);
        mesh.position.set(-sphereRadius - 1, sphereRadius + 2, 0);
        scene.add(mesh);
    }

    {
        const controls = new OrbitControls(camera, renderer.domElement)
        controls.update()
        const axesHelper = new THREE.AxesHelper(5)
        scene.add(axesHelper)
        camera.position.set(0, 3, 9)
    }

    function render(time) {
        renderer.render(scene, camera)
        requestAnimationFrame(render)
    }
    requestAnimationFrame(render)
}

main()
