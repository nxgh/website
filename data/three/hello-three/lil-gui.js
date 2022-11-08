import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import { GUI } from 'three/examples/jsm/libs/lil-gui.module.min.js'

let renderer, scene, camera
let cube
let controls

// focus(1:26)
const obj = {
  boolean: true,
  string: 'lil-gui',
  number: 1,
  slider: 1,
  func: function () {
    alert('hi')
  },
  select: ['Medium'],
  color: '#AA00FF',
  x: 0,
  y: 0,
  z: 0,
}

const gui = new GUI()
gui.add(obj, 'boolean') // 单选
gui.add(obj, 'string') // 文本
gui.add(obj, 'number') // 数字
gui.add(obj, 'func') // 按钮
gui.add(obj, 'mySlider', 0, 10, 1) // 滑块， min, max, step
gui.add(obj, 'select', ['Small', 'Medium', 'Large']) // 选择器
// 可以是 rgb 对象('rgb(170, 0, 255)')，十六进制字符串('#AA00FF' 或 '#a0f)，十六进制整数(0xaa00ff)
gui.addColor(obj, 'color') // 颜色值，
const folder = gui.addFolder('Position')
folder.add(obj, 'x')
folder.add(obj, 'y', 0, 100).onChange((v) => console.log('y', v))

function init() {
  scene = new THREE.Scene()
  camera = new THREE.PerspectiveCamera(75, 2, 0.1, 1000)
  camera.position.z = 5
  renderer = new THREE.WebGLRenderer({ antialias: true })
  renderer.setSize(window.innerWidth, window.innerHeight)
  renderer.render(scene, camera)

  const app = document.querySelector('#app')
  app.appendChild(renderer.domElement)
}

function createBox() {
  const boxWidth = 1
  const boxHeight = 1
  const boxDepth = 1
  const geometry = new THREE.BoxGeometry(boxWidth, boxHeight, boxDepth)
  const material = new THREE.MeshPhongMaterial({ color: 0x44aa88 })
  cube = new THREE.Mesh(geometry, material)
  scene.add(cube)
}

function createLight() {
  const color = 0xffffff
  const intensity = 1
  const light = new THREE.DirectionalLight(color, intensity)
  light.position.set(-1, 2, 4)
  scene.add(light)
}

function addHelper() {
  controls = new OrbitControls(camera, renderer.domElement)
  controls.update();
  const axesHelper = new THREE.AxesHelper(5)
  scene.add(axesHelper)
  const gridHelper = new THREE.GridHelper(10, 10)
  scene.add(gridHelper)
}

init()
createBox()
createLight()
addHelper()

function render(time) {
  requestAnimationFrame(render)
  renderer.render(scene, camera)
  controls.update();
}
requestAnimationFrame(render)
