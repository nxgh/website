import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import { GUI } from 'three/examples/jsm/libs/lil-gui.module.min.js'

const { innerWidth, innerHeight } = window

function main() {
    const app = document.querySelector('#app')
    const scene = new THREE.Scene()
    const camera = new THREE.PerspectiveCamera(45, innerWidth / innerHeight, 1, 1000);

    const renderer = new THREE.WebGLRenderer({ antialias: true })
    camera.position.set(80, 30, 80)
    renderer.setClearColor(new THREE.Color(0x000000));
    renderer.setSize(innerWidth, innerHeight)
    app.appendChild(renderer.domElement)

    let orbitControls = new OrbitControls(camera, renderer.domElement)

    function updateCamera() {
        camera.updateProjectionMatrix();
    }
    const gui = new GUI();
    gui.add(camera, 'fov', 1, 180).onChange(updateCamera);
    gui.add(camera, 'near', 1, 180, 0.1).onChange(updateCamera);
    gui.add(camera, 'far', 1, 1000).onChange(updateCamera);



    {
        const PlaneGeometryWidth = 180
        const planeGeometry = new THREE.PlaneGeometry(PlaneGeometryWidth, PlaneGeometryWidth);
        const planeMaterial = new THREE.MeshLambertMaterial({ color: 0xffffff });
        const plane = new THREE.Mesh(planeGeometry, planeMaterial);
        plane.rotation.x = -0.5 * Math.PI;
        plane.position.set(0, 0, 0)
        scene.add(plane);

        const cubeGeometry = new THREE.BoxGeometry(4, 4, 4);
        for (let j = 0; j < (PlaneGeometryWidth / 5); j++) {
            for (let i = 0; i < PlaneGeometryWidth / 5; i++) {
                const rnd = Math.random() * 0.75 + 0.25;
                let cubeMaterial = new THREE.MeshBasicMaterial();
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

    const cameraHelper = new THREE.CameraHelper(camera);
    scene.add(cameraHelper);

    const splitDiv = document.createElement('div')

    splitDiv.style = `position: fixed; right: 0; bottom: 0; width: 100%; height: 100%; display: flex;`

    const view1 = document.createElement('div')
    view1.id = 'view1'
    view1.tabIndex = '1'
    view1.style = ` width: 100%; height: 100%;`
    const view2 = document.createElement('div')
    view2.id = 'view2'
    view2.tabIndex = '2'
    view2.style = ` width: 100%; height: 100%;`

    splitDiv.appendChild(view1)
    splitDiv.appendChild(view2)
    app.appendChild(splitDiv)


    orbitControls = new OrbitControls(camera, view1)

    const camera2 = new THREE.PerspectiveCamera(70, 2, 0.1, 1000);
    camera2.position.set(140, 110, 130);
    camera2.lookAt(0, 5, 0);

    const controls2 = new OrbitControls(camera2, view2);
    controls2.target.set(0, 5, 0);
    controls2.update();



    function setScissorForElement(elem) {
        const canvas = document.querySelector('canvas');
        const canvasRect = canvas.getBoundingClientRect();
        const elemRect = elem.getBoundingClientRect();

        // 计算canvas的尺寸
        const right = Math.min(elemRect.right, canvasRect.right) - canvasRect.left;
        const left = Math.max(0, elemRect.left - canvasRect.left);
        const bottom = Math.min(elemRect.bottom, canvasRect.bottom) - canvasRect.top;
        const top = Math.max(0, elemRect.top - canvasRect.top);

        const width = Math.min(canvasRect.width, right - left);
        const height = Math.min(canvasRect.height, bottom - top);

        // 设置剪函数以仅渲染一部分场景
        const positiveYUpBottom = canvasRect.height - bottom;
        renderer.setScissor(left, positiveYUpBottom, width, height);
        renderer.setViewport(left, positiveYUpBottom, width, height);

        // 返回aspect
        return width / height;
    }

    function renderCameraWithHelper() {
        // 启用剪刀函数
        renderer.setScissorTest(true);

        // 渲染主视野
        {
            const aspect = setScissorForElement(view1);
            // 用计算出的aspect修改摄像机参数
            camera.aspect = aspect;
            camera.updateProjectionMatrix();
            cameraHelper.update();
            // 来原视野中不要绘制cameraHelper
            cameraHelper.visible = false;
            // 渲染
            renderer.render(scene, camera);
        }

        // 渲染第二台摄像机
        {
            const aspect = setScissorForElement(view2);
            // 调整aspect
            camera2.aspect = aspect;
            camera2.updateProjectionMatrix();
            // 在第二台摄像机中绘制cameraHelper
            cameraHelper.visible = true;
            renderer.render(scene, camera2);
        }
    }


    function render(time) {
        renderCameraWithHelper()
        requestAnimationFrame(render)
    }
    requestAnimationFrame(render)
}

main()
