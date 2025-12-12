let sum
let cum

function setup() {
    createCanvas(600, 600, WEBGL)

    cam = createEasyCam({ distance: 500 })
    sun = new Planet(50, 0, 0)
    sun.spawnMoons(4, 1)
}

function draw() {
    background(0)
    lights()
    sun.show()
    sun.orbit()
}
