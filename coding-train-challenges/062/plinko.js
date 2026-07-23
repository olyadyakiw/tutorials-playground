class Plinko {
    constructor(x, y, r) {
        let options = {
            isStatic: true,
            restitution: 1,
            friction: 0,
        }
        this.r = r
        this.body = Bodies.circle(x, y, r, options)
        World.add(world, this.body)
    }
    show() {
        fill(0, 255, 0)
        stroke(0, 255, 0)
        let pos = this.body.position
        push()
        translate(pos.x, pos.y)
        ellipse(0, 0, this.r * 2)
        pop()
    }
}
