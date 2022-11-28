import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import { GUI } from 'three/examples/jsm/libs/lil-gui.module.min.js'

const { innerWidth, innerHeight } = window

function main() {
    const scene = new THREE.Scene()
    const camera = new THREE.PerspectiveCamera(75, innerWidth / innerHeight, 0.1, 1000)
    camera.position.set(4, 4, 10)
    camera.lookAt(new THREE.Vector3(3, 3, 0))

    const renderer = new THREE.WebGLRenderer({ antialias: true })
    renderer.setSize(innerWidth, innerHeight)
    renderer.shadowMap.enabled = true
    renderer.render(scene, camera)

    const app = document.querySelector('#app')
    app.appendChild(renderer.domElement)

    let light
    {
        light = new THREE.PointLight(0xFFFFFF, 1);
        light.position.set(4, 4, 20);
        scene.add(light);
    }

    const gui = new GUI()
    {
        const lights = ['AmbientLight', 'PointLight', 'SpotLight', 'DirectionalLight', 'HemisphereLight']
        class LightGuiHelper {
            constructor(scene, light) {
                this.scene = scene
                this.light = light
                this.name = 'PointLight'
            }
            get value() {
                return this.name
            }
            set value(v) {
                this.name = v
                this.scene.remove(this.light)
                this.light = new THREE[v](0xFFFFFF, 1)
                this.light.position.set(4, 4, 50);
                this.scene.add(this.light)
            }
        }
        gui.add(new LightGuiHelper(scene, light), 'value', lights).name('light')
    }

    {
        class PhysicalHelper {
            constructor(scene, attr) {
                this.scene = scene
                this.attr = attr
                this.value = 0
            }
            get modify() {
                return this.value
            }
            set modify(v) {
                this.value = v
                this.scene.children.forEach(item => {
                    if (item.type === 'Mesh') {
                        item.material[this.attr] = v
                    }
                })
            }
        }
        gui.add(new PhysicalHelper(scene, 'clearcoat'), 'modify', 0, 1, 0.01).name('clearcoat')
        gui.add(new PhysicalHelper(scene, 'clearcoatRoughness'), 'modify', 0, 1, 0.01).name('clearcoatRoughness')
    }


    {
        ;[...Array(5).keys()].reduce((arr, item) => {
            [...Array(5).keys()].forEach(i => {
                arr.push([item * 2, i * 2])
            })
            return arr
        }, []).forEach(([x, y], index) => {
            const geometry = new THREE.SphereGeometry(1, 100, 100);
            const mesh = new THREE.Mesh(geometry, new THREE.MeshPhysicalMaterial({
                color: '#4ee580',
                roughness: x * 0.125,
                metalness: 1 - y * 0.125
            }))
            mesh.position.x = x
            mesh.position.y = y
            scene.add(mesh)
        })

    }

    {
        const controls = new OrbitControls(camera, renderer.domElement)
        controls.target.set(4, 4, 0)
        controls.update()
    }
    function render(time) {
        renderer.render(scene, camera)
        requestAnimationFrame(render)
    }
    requestAnimationFrame(render)
}

main()
