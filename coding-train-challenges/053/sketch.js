let pos
let previous

function setup() {
    createCanvas(400, 400)
    background(51)
    pos = createVector(200, 200)
    previous = pos.copy()
}

function draw() {
    stroke(255)
    strokeWeight(2)
    // point(pos.x, pos.y)
    line(pos.x, pos.y, previous.x, previous.y)
    previous.set(pos)

    let step = p5.Vector.random2D()
    let r = random(100)
    if (r < 1) {
        step.mult(random(25, 100))
    } else {
        step.setMag(2)
    }
    // pos = pos + step
    pos.add(step)
}
