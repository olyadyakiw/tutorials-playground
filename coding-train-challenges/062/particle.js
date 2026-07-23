class Particle {
    constructor(x, y, r) {
        let options = {
            restitution: 0.8,
            friction: 0,
        }
        this.r = r
        this.body = Bodies.circle(x, y, r, options)
        World.add(world, this.body)
    }
    show() {
        fill(255)
        stroke(255)
        let pos = this.body.position
        push()
        translate(pos.x, pos.y)
        ellipse(0, 0, this.r * 2)
        pop()
    }
}
