class Leaf {
    constructor() {
        this.pos = createVector(random(width), random(height - 100), random(-200, 200))
        this.reached = false
    }

    show() {
        fill(255)
        noStroke()
        push()
        translate(this.pos.x, this.pos.y, this.pos.z)
        ellipse(0, 0, 4, 4)
        pop()
    }
}
