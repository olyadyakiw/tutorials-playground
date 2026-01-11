// let xoff1 = 0
// let xoff2 = 10000
let inc = 0.1
let scl = 10
let cols
let rows

let parcticles = []
let flowField = []

let zoff = 0

let fr

function setup() {
    createCanvas(200, 200)
    cols = floor(width / scl)
    rows = floor(height / scl)
    fr = createP()

    flowField = new Array(cols * rows)

    for (let i = 0; i < 200; i++) {
        parcticles[i] = new Particle()
    }

    background(255)
}

function draw() {
    // background(51)
    // stroke(255)
    // noFill()
    // beginShape()
    // for (let x = 0; x < width; x++) {
    //     for (let y = 0; x < height; y++) {}
    //     // stroke(255)
    //     // // let y = noise(xoff) * height
    //     // let n = map(noise(xoff), 0, 1, 0, height)
    //     // let s = map(sin(xoff), -1, 1, -50, 50)
    //     // let y = s + n
    //     // vertex(x, y)
    //     // xoff += inc
    // }

    // endShape()

    let yoff = 0

    for (let y = 0; y < rows; y++) {
        let xoff = 0
        for (let x = 0; x < cols; x++) {
            let index = x + y * cols
            let angle = noise(xoff, yoff, zoff) * TWO_PI * 4
            let v = p5.Vector.fromAngle(angle)
            v.setMag(1)
            flowField[index] = v
            xoff += inc
            // rect(x * scl, y * scl, scl, scl)
            stroke(0, 50)
            // push()
            // translate(x * scl, y * scl)
            // rotate(v.heading())
            // line(0, 0, scl, 0)
            // pop()
        }
        yoff += inc

        zoff += 0.0003
    }

    for (let i = 0; i < parcticles.length; i++) {
        parcticles[i].follow(flowField)
        parcticles[i].edges()
        parcticles[i].show()
        parcticles[i].update()
    }

    fr.html(floor(frameRate()))

    // noLoop()

    // start += inc

    // noLoop()

    // let x = random(width)
    // let x = map(noise(xoff1), 0, 1, 0, width)
    // let y = map(noise(xoff2), 0, 1, 0, height)
    // xoff1 += 0.02
    // xoff2 += 0.02

    // ellipse(x, y, 24, 24)
}
