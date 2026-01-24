class Walker {
    constructor(x, y) {
        if (arguments.length == 2) {
            this.pos = createVector(x, y)
            this.stuck = true
        } else {
            this.pos = randomPoint()
            this.stuck = false
        }
        this.r = radius
    }

    walk() {
        let vel = p5.Vector.random2D()
        // let vel = createVector(random(-1, 1), random(-0.5, 1))
        this.pos.add(vel)
        this.pos.x = constrain(this.pos.x, 0, width)
        this.pos.y = constrain(this.pos.y, 0, height)
    }

    isStuck() {}

    checkStuck(tree) {
        for (let i = 0; i < tree.length; i++) {
            let d = distSq(this.pos, tree[i].pos)
            if (d < this.r * tree[i].r * 4) {
                // if (random(1) < 0.1) {
                this.stuck = true
                return true
                // }
            }
        }
        return false
    }

    show() {
        noStroke()
        // stroke(255, 100)
        // if (this.stuck) {
        //     fill(255, 0, 100, 200)
        // } else {
        //     fill(255, 100)
        // }
        let hu = map(this.r, 0, 8, 0, 360)
        fill(hu, 255, 255)
        ellipse(this.pos.x, this.pos.y, this.r * 2, this.r * 2)
    }
}

function randomPoint() {
    let i = floor(random(4))

    if (i === 0) {
        let x = random(width)
        return createVector(x, 0)
    } else if (i === 1) {
        let x = random(width)
        return createVector(x, height)
    } else if (i === 2) {
        let y = random(height)
        return createVector(0, y)
    } else {
        let y = random(height)
        return createVector(width, y)
    }
}

function distSq(a, b) {
    let dx = b.x - a.x
    let dy = b.y - a.y
    return dx * dx + dy * dy
}
