class Planet {
    constructor(r, d, o, img) {
        this.radius = r
        this.distance = d
        this.angle = random(TWO_PI)
        this.planets = null
        this.orbitSpeed = o
        this.v = p5.Vector.random3D()
        this.v.mult(this.distance)

        this.texture = img
    }

    orbit() {
        this.angle = this.angle + this.orbitSpeed
        if (this.planets != null) {
            for (let i = 0; i < this.planets.length; i++) {
                this.planets[i].orbit()
            }
        }
    }

    spawnMoons(total, level) {
        this.planets = []
        for (let i = 0; i < total; i++) {
            let r = this.radius / (level * 2)
            let d = random(this.radius + r, (this.radius + r) * 2)
            let o = random(-0.1, 0.1)
            let index = int(random(0, textures.length))
            this.planets[i] = new Planet(r, d, o, textures[index])
            if (level < 2) {
                let num = Math.floor(random(0, 4))
                // let num = 1
                this.planets[i].spawnMoons(num, level + 1)
            }
        }
    }

    show() {
        push()
        noStroke()
        let v2 = createVector(1, 0, 1)
        let p = this.v.cross(v2)
        if (p.x != 0 || p.y != 0 || p.z != 0) {
            rotate(this.angle, p)
        }
        // stroke(255)
        // line(0, 0, 0, this.v.x, this.v.y, this.v.z)
        // line(0, 0, 0, p.x, p.y, p.z)

        translate(this.v.x, this.v.y, this.v.z)
        fill(255)
        texture(this.texture)
        sphere(this.radius)
        // ellipse(0, 0, this.radius * 2, this.radius * 2)
        if (this.planets != null) {
            for (let i = 0; i < this.planets.length; i++) {
                this.planets[i].show()
            }
        }
        pop()
    }
}
