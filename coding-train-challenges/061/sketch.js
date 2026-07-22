let angle
let path = []
let resolution = 50

let sun
let end

function setup() {
    createCanvas(600, 600)
    sun = new Orbit(width / 2, height / 2, width / 4, 0)
    let next = sun
    for (let i = 0; i < 10; i++) {
        next = next.addChild()
    }
    end = next
}

function draw() {
    background(51)

    for (let i = 0; i < resolution; i++) {
        let next = sun
        while (next != null) {
            next.update()
            next = next.child
        }
        path.push(createVector(end.x, end.y))
    }

    let next = sun
    while (next != null) {
        next.show()
        next = next.child
    }

    beginShape()
    stroke(255, 0, 255)
    noFill()
    for (let pos of path) {
        vertex(pos.x, pos.y)
    }
    endShape()
}
