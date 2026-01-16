let rocket
let population
let lifespan = 400
let count = 0
let target
let maxforce = 0.2

let lifeP

let rx = 100
let ry = 150
let rw = 200
let rh = 10

function setup() {
    createCanvas(400, 300)
    rocket = new Rocket()
    population = new Population()
    lifeP = createP()
    target = createVector(width / 2, 50)
}

function draw() {
    background(0)
    population.run()
    lifeP.html(count)
    count++
    if (count == lifespan) {
        population.evaluate()
        population.selection()
        // population = new Population()
        count = 0
    }

    fill(255)
    rect(100, 150, 200, 10)

    ellipse(target.x, target.y, 16, 16)
}

class Population {
    constructor() {
        this.rockets = []
        this.popsize = 25
        this.matingpoll = []

        for (let i = 0; i < this.popsize; i++) {
            this.rockets[i] = new Rocket()
        }
    }

    evaluate() {
        let maxfit = 0
        for (let i = 0; i < this.popsize; i++) {
            this.rockets[i].calculateFitness()
            if (this.rockets[i].fitness > maxfit) {
                maxfit = this.rockets[i].fitness
            }
        }

        for (let i = 0; i < this.popsize; i++) {
            this.rockets[i].fitness /= maxfit
        }

        this.matingpoll = []

        for (let i = 0; i < this.popsize; i++) {
            let n = this.rockets[i].fitness * 100

            for (let j = 0; j < n; j++) {
                this.matingpoll.push(this.rockets[i])
            }
        }
    }

    selection() {
        let newRockets = []
        for (let i = 0; i < this.rockets.length; i++) {
            let parentA = random(this.matingpoll).dna
            let parentB = random(this.matingpoll).dna
            let child = parentA.crossover(parentB)
            child.mutation()
            newRockets[i] = new Rocket(child)
        }
        this.rockets = newRockets
    }

    run() {
        for (let i = 0; i < this.popsize; i++) {
            this.rockets[i].update()
            this.rockets[i].show()
        }
    }
}

class DNA {
    constructor(genes) {
        if (genes) {
            this.genes = genes
        } else {
            this.genes = []
            for (let i = 0; i < lifespan; i++) {
                this.genes[i] = p5.Vector.random2D()
                this.genes[i].setMag(0.1)
            }
        }
    }

    crossover(partner) {
        let newgenes = []
        let mid = floor(random(this.genes.length))
        for (let i = 0; i < this.genes.length; i++) {
            if (i > mid) {
                newgenes[i] = this.genes[i]
            } else {
                newgenes[i] = partner.genes[i]
            }
        }
        return new DNA(newgenes)
    }

    mutation() {
        for (let i = 0; i < this.genes.length; i++) {
            if (random(1) < 0.01) {
                this.genes[i] = p5.Vector.random2D()
                this.genes[i].setMag(0.1)
            }
        }
    }
}

class Rocket {
    constructor(dna) {
        this.pos = createVector(width / 2, height)
        this.vel = createVector()
        this.acc = createVector()
        this.completed = false
        this.crashed = false
        if (dna) {
            this.dna = dna
        } else {
            this.dna = new DNA()
        }
        this.fitness = 0
    }

    applyForce(force) {
        this.acc.add(force)
    }

    calculateFitness() {
        let d = dist(this.pos.x, this.pos.y, target.x, target.y)
        this.fitness = map(d, 0, width, width, 0)
        if (this.completed) {
            this.fitness *= 10
        }
        if (this.crashed) {
            this.fitness /= 10
        }
    }

    update() {
        let d = dist(this.pos.x, this.pos.y, target.x, target.y)
        if (d < 10) {
            this.completed = true
            this.pos = target.copy()
        }

        if (this.pos.x > rx && this.pos.x < rx + rw && this.pos.y > ry && this.pos.y < ry + rh) {
            this.crashed = true
        }
        if (this.pos.x > width || this.pos.x < 0) {
            this.crashed = true
        }

        if (this.pos.y > height || this.pos.y < 0) {
            this.crashed = true
        }

        this.applyForce(this.dna.genes[count])

        if (!this.completed && !this.crashed) {
            this.vel.add(this.acc)
            this.pos.add(this.vel)
            this.acc.mult(0)
            this.vel.limit(4)
        }
    }

    show() {
        push()
        noStroke()
        fill(255, 150)
        translate(this.pos.x, this.pos.y)
        rotate(this.vel.heading())
        rectMode(CENTER)
        rect(0, 0, 25, 5)
        pop()
    }
}
