import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'

const rawUrl = 'https://raw.githubusercontent.com/nxgh/nxgh.github.io/main/public/'

function rand(min, max) {
    if (max === undefined) {
        max = min;
        min = 0;
    }
    return min + (max - min) * Math.random();
}

function randomColor() {
    return `hsl(${rand(360) | 0}, ${rand(50, 100) | 0}%, 50%)`;
}

const { innerWidth, innerHeight } = window

function main() {
    const scene = new THREE.Scene()
    const camera = new THREE.PerspectiveCamera(75, innerWidth / innerHeight, 0.1, 1000)
    camera.position.set(0, 0, 10)

    const renderer = new THREE.WebGLRenderer({ antialias: true })
    renderer.setSize(innerWidth, innerHeight)

    const controls = new OrbitControls(camera, renderer.domElement)
    controls.update()

    const app = document.querySelector('#app')
    app.appendChild(renderer.domElement)


    const light = new THREE.AmbientLight()
    scene.add(light)
    const axesHelper = new THREE.AxesHelper(5)
    scene.add(axesHelper)

    const loader = new THREE.TextureLoader();
    const texture = loader.load(`${rawUrl}/assets/texture/frame.png`);
    const geometry = new THREE.BoxGeometry(2, 2, 2);

    // focus(1,2)
    const pickingScene = new THREE.Scene();
    pickingScene.background = new THREE.Color(0);

    const idToObject = {}

    function createInvisibleMesh(id, cube) {
        const pickingMaterial = new THREE.MeshPhongMaterial({
            emissive: new THREE.Color(id),
            color: new THREE.Color(0, 0, 0),
            specular: new THREE.Color(0, 0, 0),
            map: texture,
            transparent: true,
            side: THREE.DoubleSide,
            alphaTest: 0.5,
            blending: THREE.NoBlending,
        });
        const pickingCube = new THREE.Mesh(geometry, pickingMaterial);
        pickingScene.add(pickingCube);
        pickingCube.position.copy(cube.position);
        pickingCube.rotation.copy(cube.rotation);
        pickingCube.scale.copy(cube.scale);

    }
    const cubes = [
        [-1, 0, 1,], [1, 0, 1], [-1, 0, -1], [1, 0, -1],
        [-1, 2, 1,], [1, 2, 1], [-1, 2, -1], [1, 2, -1],

    ].map((pos, id) => {
        const material = new THREE.MeshPhongMaterial({
            color: randomColor(),
            map: texture,
            transparent: true,
            side: THREE.DoubleSide,
            alphaTest: 0.1,
        });

        const cube = new THREE.Mesh(geometry, material);
        cube.position.set(...pos)
        idToObject[id] = cube
        createInvisibleMesh(id, cube)
        scene.add(cube);
        return cube;
    })


    {
        const pickingTexture = new THREE.WebGLRenderTarget(1, 1)
        const pixelBuffer = new Uint8Array(4)

        function setPointer(event) {
            const pointer = new THREE.Vector3()
            // focus(1,2)
            pointer.x = event.clientX
            pointer.y = event.clientY
            return pointer
        }
        function onPointerDown(event) {
            const pointer = setPointer(event)
            // focus(1:15)
            const pixelRatio = renderer.getPixelRatio();

            const { drawingBufferWidth, drawingBufferHeight } = renderer.getContext()
            const [rectX, rectY] = [pointer.x * pixelRatio | 0, pointer.y * pixelRatio | 0]
            camera.setViewOffset(drawingBufferWidth, drawingBufferHeight, rectX, rectY, 1, 1,);

            renderer.setRenderTarget(pickingTexture)
            renderer.render(pickingScene, camera);
            renderer.setRenderTarget(null);

            camera.clearViewOffset();
            renderer.readRenderTargetPixels(pickingTexture, 0, 0, 1, 1, pixelBuffer);

            const id = (pixelBuffer[0] << 16) | (pixelBuffer[1] << 8) | (pixelBuffer[2]);

            const intersectedObject = idToObject[id];
            if (intersectedObject) {
                intersectedObject.material.color.set(`#${Math.floor(Math.random() * 16777215).toString(16)}`)
            }
        }

        document.addEventListener('pointerdown', onPointerDown)
    }

    function render(time) {
        renderer.render(scene, camera)
        requestAnimationFrame(render)
    }
    requestAnimationFrame(render)
}

main()
