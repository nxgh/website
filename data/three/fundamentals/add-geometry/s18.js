import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import { GUI } from 'three/examples/jsm/libs/lil-gui.module.min.js'
import Stats from 'three/examples/jsm//libs/stats.module.js'

const { innerWidth, innerHeight } = window

function main() {
  const scene = new THREE.Scene()
  const camera = new THREE.PerspectiveCamera(75, innerWidth / innerHeight, 0.1, 1000)
  const renderer = new THREE.WebGLRenderer({ antialias: true })
  renderer.setSize(innerWidth, innerHeight)
  renderer.shadowMap.enabled = true
  renderer.render(scene, camera)

  const app = document.querySelector('#app')
  app.appendChild(renderer.domElement)
  // focus(1,2)
  const stats = new Stats();
  app.appendChild(stats.dom);

  let cube
  {
    const boxWidth = 1
    const boxHeight = 1
    const boxDepth = 1
    const geometry = new THREE.BoxGeometry(boxWidth, boxHeight, boxDepth)
    const material = new THREE.MeshPhongMaterial({ color: 0x44aa88 })
    cube = new THREE.Mesh(geometry, material)
    cube.position.y = 1
    cube.castShadow = true
    scene.add(cube)
    renderer.render(scene, camera)
  }

  let light, helper
  {
    const color = 0xffffff
    const intensity = 1
    light = new THREE.DirectionalLight(color, intensity)
    light.position.set(1, 3, 3)
    light.castShadow = true
    light.shadow.mapSize = new THREE.Vector2(2048, 2048)
    scene.add(light)
    helper = new THREE.DirectionalLightHelper(light)
    scene.add(helper)
  }

  {
    const mesh = new THREE.Mesh(
      new THREE.PlaneGeometry(10, 10),
      new THREE.MeshLambertMaterial({ color: 0xffffff })
    )
    mesh.receiveShadow = true
    mesh.rotation.x = -Math.PI / 2
    scene.add(mesh)
  }

  {
    const controls = new OrbitControls(camera, renderer.domElement)
    controls.update()
  }

  {
    const axesHelper = new THREE.AxesHelper(5)
    scene.add(axesHelper)
    const gridHelper = new THREE.GridHelper(10, 10)
    scene.add(gridHelper)
    camera.position.set(0, 3, 9)
  }

  {
    const settings = {
      type: true,
      'cube x': 1,
      'cube y': 1,
      'cube z': 1,

      'light x': 1,
      'light y': 1,
      'light z': 1,
    }
    const gui = new GUI()

    gui.add(settings, 'cube x', -4.5, 4.5, 0.5).onChange((v) => (cube.position.x = v)) 
    gui.add(settings, 'cube y', -4.5, 4.5, 0.5).onChange((v) => (cube.position.y = v))
    gui.add(settings, 'cube z', -4.5, 4.5, 0.5).onChange((v) => (cube.position.z = v))

    const lightFolder = gui.addFolder('light')
    function updateLight(axes, value) {
      light.position[axes] = value
      helper.update()
    }
    lightFolder.add(settings, 'light x', -5, 5, 0.5).onChange((v) => updateLight('x', v)) 
    lightFolder.add(settings, 'light y', 1, 5, 0.5).onChange((v) => updateLight('y', v)) 
    lightFolder.add(settings, 'light z', -4.5, 4.5, 0.5).onChange((v) => updateLight('z', v))
  }

  function render(time) {
    stats.update()
    renderer.render(scene, camera)
    requestAnimationFrame(render)
  }
  requestAnimationFrame(render)
}

main()
