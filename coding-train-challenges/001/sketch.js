const stars = []
let speed

function setup() {
    createCanvas(800, 800)
    for (let i = 0; i < 5000; i++) {
        stars[i] = new Star()
    }
}

function draw() {
    speed = map(mouseX, 0, width, 0, 20)
    background(0)
    translate(width / 2, height / 2)
    for (let i = 0; i < stars.length; i++) {
        stars[i].update()
        stars[i].show()
    }
}

class Star {
    constructor() {
        this.x = random(-width, width)
        this.y = random(-height, height)
        this.z = random(width)
        this.pz = this.z
    }

    update() {
        this.z = this.z - speed
        if (this.z < 1) {
            this.z = width
            this.x = random(-width, width)
            this.y = random(-height, height)
            this.pz = this.z
        }
    }

    show() {
        fill(255)
        noStroke()

        let sx = map(this.x / this.z, 0, 1, 0, width)
        let sy = map(this.y / this.z, 0, 1, 0, height)

        let r = map(this.z, 0, width, 4, 0)
        ellipse(sx, sy, r, r)

        let px = map(this.x / this.pz, 0, 1, 0, width)
        let py = map(this.y / this.pz, 0, 1, 0, height)

        this.pz = this.z

        stroke(255)
        strokeWeight(r)
        line(px, py, sx, sy)
    }
}
