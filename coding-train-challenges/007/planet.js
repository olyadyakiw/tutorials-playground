class Planet {
    constructor(radius, distance, orbitSpeed, angle) {
        this.radius = radius
        this.distance = distance
        this.angle = angle
        this.planets = []
        this.orbitSpeed = orbitSpeed
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
        for (let i = 0; i < total; i++) {
            let r = this.radius / (level * 2)
            let d = random(50, 150)
            let a = random(TWO_PI)
            let o = random(-0.1, 0.1)
            this.planets.push(new Planet(r, d / level, o, a))
            if (level < 3) {
                let num = Math.floor(random(0, 4))
                this.planets[i].spawnMoons(num, level + 1)
            }
        }
    }

    show() {
        push()
        fill(255, 100)
        rotate(this.angle)
        translate(this.distance, 0)
        ellipse(0, 0, this.radius * 2, this.radius * 2)
        for (let i = 0; i < this.planets.length; i++) {
            this.planets[i].show()
        }
        pop()
    }
}
