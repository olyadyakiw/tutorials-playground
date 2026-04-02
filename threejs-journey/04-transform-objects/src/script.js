import * as THREE from 'three'

// Canvas
const canvas = document.querySelector('canvas.webgl')

// Scene
const scene = new THREE.Scene()

const group = new THREE.Group()
group.position.y = -1
group.position.z = -3
group.scale.x = 2
group.rotation.z = Math.PI * 0.25
group.rotation.y = Math.PI * 0.25
scene.add(group)

const group2 = new THREE.Group()
group2.position.y = -1
group2.position.z = -3
group2.position.x = 3
group2.scale.x = 2
group2.rotation.z = Math.PI * 0.25
group2.rotation.y = Math.PI * 0.25
scene.add(group2)

const cube1 = new THREE.Mesh(new THREE.BoxGeometry(1, 1, 1), new THREE.MeshBasicMaterial({ color: 0xff0000 }))
group.add(cube1)
const cube2 = new THREE.Mesh(new THREE.BoxGeometry(1, 1, 1), new THREE.MeshBasicMaterial({ color: 0x00ff00 }))
group.add(cube2)
const cube3 = new THREE.Mesh(new THREE.BoxGeometry(1, 1, 1), new THREE.MeshBasicMaterial({ color: 0x0000ff }))
group.add(cube3)

const cube11 = new THREE.Mesh(new THREE.BoxGeometry(1, 1, 1), new THREE.MeshBasicMaterial({ color: 0xff0000 }))
group2.add(cube11)
const cube22 = new THREE.Mesh(new THREE.BoxGeometry(1, 1, 1), new THREE.MeshBasicMaterial({ color: 0x00ff00 }))
group2.add(cube22)
const cube33 = new THREE.Mesh(new THREE.BoxGeometry(1, 1, 1), new THREE.MeshBasicMaterial({ color: 0x0000ff }))
group2.add(cube33)

cube2.position.x = -2
cube3.position.x = 2

cube22.position.x = -2
cube33.position.x = 2

/**
 * Objects
 */
const geometry = new THREE.BoxGeometry(1, 1, 1)
const material = new THREE.MeshBasicMaterial({ color: 0xff0000 })
const mesh = new THREE.Mesh(geometry, material)
// mesh.position.x = 1
// mesh.position.y = -1
// mesh.position.z = 1
mesh.position.set(1, -1, 1)
// scene.add(mesh)
// console.log(mesh.position.length())
mesh.position.normalize()

mesh.scale.x = 2
mesh.scale.y = 0.5
mesh.scale.z = 0.5

// mesh.rotation.y = 0.5
mesh.rotation.reorder('YXZ')
mesh.rotation.x = Math.PI * 0.25
mesh.rotation.y = Math.PI * 0.25

/**
 * Sizes
 */
const sizes = {
    width: 800,
    height: 600,
}

/**
 * Camera
 */
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height)
camera.position.z = 3
// camera.position.x = 1
// camera.position.y = 1
scene.add(camera)

// camera.lookAt(mesh.position)

// console.log(mesh.position.distanceTo(camera.position))

// Axes
const axesHelper = new THREE.AxesHelper(2)
scene.add(axesHelper)

/**
 * Renderer
 */
const renderer = new THREE.WebGLRenderer({
    canvas: canvas,
})
renderer.setSize(sizes.width, sizes.height)
renderer.render(scene, camera)
