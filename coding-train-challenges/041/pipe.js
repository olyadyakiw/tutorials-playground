class Pipe {
    constructor() {
        let spacing = random(20, height / 2)
        let centery = random(spacing, height - spacing)

        this.top = centery - spacing / 2
        this.bottom = height - (centery + spacing / 2)
        this.x = width
        this.w = 20
        this.speed = 5

        this.highlight = false
    }

    show() {
        noStroke()
        fill(255)
        if (this.highlight) {
            fill(255, 0, 0)
        }
        rect(this.x, 0, this.w, this.top)
        rect(this.x, height - this.bottom, this.w, this.bottom)
    }

    update() {
        this.x -= this.speed
    }

    offscreen() {
        if (this.x < -this.w) {
            return true
        } else {
            return false
        }
    }

    hits(bird) {
        if (bird.y < this.top || bird.y > height - this.bottom) {
            if (bird.x > this.x && bird.x < this.x + this.w) {
                this.highlight = true
                return true
            }
        }
        this.highlight = false
        return false
    }
}
