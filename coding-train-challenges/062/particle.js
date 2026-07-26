class Particle {
    constructor(x, y, r) {
        this.hue = random(360)
        let options = {
            restitution: 0.5,
            friction: 0,
            density: 1,
        }
        x += random(1, -1)
        this.r = r
        this.body = Bodies.circle(x, y, r, options)
        this.body.label = 'particle'
        World.add(world, this.body)
    }
    show() {
        fill(this.hue, 255, 255)
        noStroke()
        let pos = this.body.position
        push()
        translate(pos.x, pos.y)
        ellipse(0, 0, this.r * 2)
        pop()
    }

    isOffscreen() {
        let x = this.body.position.x
        let y = this.body.position.y
        return x < -50 || x > width + 50
    }
}
