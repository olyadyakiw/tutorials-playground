class Flower {
    constructor(x, y) {
        this.x = x
        this.y = y
        this.r = 30

        this.xdir = 1
    }

    show() {
        noStroke()
        fill(255, 0, 200)
        ellipse(this.x, this.y, this.r * 2, this.r * 2)
    }

    grow() {
        this.r = this.r + 2
    }

    move() {
        this.x = this.x + this.xdir
    }

    shiftDown() {
        this.xdir *= -1
        this.y += this.r
    }
}
