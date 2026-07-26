class Plinko {
    constructor(x, y, r) {
        let options = {
            isStatic: true,
            restitution: 1,
            friction: 0,
        }
        this.r = r
        this.body = Bodies.circle(x, y, r, options)
        this.body.label = 'plinko'
        World.add(world, this.body)
    }
    show() {
        fill(127)
        noStroke()
        let pos = this.body.position
        push()
        translate(pos.x, pos.y)
        ellipse(0, 0, this.r * 2)
        pop()
    }
}
