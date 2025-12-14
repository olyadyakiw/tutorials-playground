let cols, rows
let scl = 40
let w = 2000
let h = 1600

let flying = 0

let terrain = []

function setup() {
    createCanvas(600, 600, WEBGL)
    cols = w / scl
    rows = h / scl
}

function draw() {
    flying -= 0.1

    let xoff = 0
    for (let x = 0; x < cols; x++) {
        terrain[x] = []
        let yoff = flying
        for (let y = 0; y < cols; y++) {
            terrain[x][y] = map(noise(xoff, yoff), 0, -1, -100, 100)
            yoff += 0.2
        }
        xoff += 0.2
    }

    background(0)
    stroke(255)
    noFill()
    translate(0, 50)
    rotateX(PI / 3)
    translate(-w / 2, -h / 2)

    for (let y = 0; y < rows - 2; y++) {
        beginShape(TRIANGLE_STRIP)
        for (let x = 0; x < cols; x++) {
            vertex(x * scl, y * scl, terrain[x][y])
            vertex(x * scl, (y + 1) * scl, terrain[x][y])
            // rect(x * scl, y * scl, scl, scl)
        }
        endShape()
    }
}
