let a = 0
let sponge = []

function setup() {
    createCanvas(400, 400, WEBGL)
    let b = new Box(0, 0, 0, 200)
    sponge.push(b)
}

function draw() {
    background(51)
    stroke(255)
    noFill()
    lights()

    // translate(width / 2, height / 2)
    rotateX(a)
    rotateY(a * 0.4)
    rotateZ(a * 0.2)
    for (var i = 0; i < sponge.length; i++) {
        sponge[i].show()
    }

    a += 0.01
}

function mousePressed() {
    var next = []
    for (let i = 0; i < sponge.length; i++) {
        var b = sponge[i]
        var newBoxes = b.generate()
        next = next.concat(newBoxes)
    }
    sponge = next
}

function Box(x, y, z, r) {
    this.pos = createVector(x, y, z)
    this.r = r

    this.show = function () {
        push()
        fill(255)
        noStroke()
        translate(this.pos.x, this.pos.y, this.pos.z)
        box(this.r)
        pop()
    }

    this.generate = function () {
        const boxes = []
        for (let x = -1; x < 2; x++) {
            for (let y = -1; y < 2; y++) {
                for (let z = -1; z < 2; z++) {
                    let sum = abs(x) + abs(y) + abs(z)

                    let newR = r / 3
                    if (sum > 1) {
                        let b = new Box(this.pos.x + x * newR, this.pos.y + y * newR, this.pos.z + z * newR, newR)
                        boxes.push(b)
                    }
                }
            }
        }
        return boxes
    }
}
