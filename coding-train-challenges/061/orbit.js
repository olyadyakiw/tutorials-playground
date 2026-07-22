let k = -4

class Orbit {
    constructor(x_, y_, r_, n, p) {
        this.x = x_
        this.y = y_
        this.r = r_
        this.n = n
        this.parent = p
        this.child = null
        this.speed = radians(pow(k, n - 1)) / resolution
        this.angle = -PI / 2
    }

    show = function () {
        stroke(255, 100)
        strokeWeight(2)
        noFill()
        ellipse(this.x, this.y, this.r * 2, this.r * 2)
    }

    addChild() {
        let newr = this.r / 3.0
        let newx = this.x + this.r + newr
        let newy = this.y
        this.child = new Orbit(newx, newy, newr, this.n + 1, this)
        return this.child
    }

    update() {
        let parent = this.parent
        if (parent != null) {
            this.angle += this.speed
            let rsum = this.r + parent.r
            this.x = parent.x + rsum * cos(this.angle)
            this.y = parent.y + rsum * sin(this.angle)
        }
    }
}
