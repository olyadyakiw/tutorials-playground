let ship
let flowers = []
let drops = []

function setup() {
    createCanvas(600, 400)
    ship = new Ship()
    // drop = new Drop(width / 2, height / 2)
    for (let i = 0; i < 6; i++) {
        flowers[i] = new Flower(i * 80 + 80, 60)
    }
}

function draw() {
    background(51)
    // drop.show()
    // drop.move()
    for (let i = 0; i < drops.length; i++) {
        drops[i].show()
        drops[i].move()
        for (let j = 0; j < flowers.length; j++) {
            if (drops[i].hits(flowers[j])) {
                flowers[j].grow()
                drops[i].evaporate()
            }
        }
    }

    let edge = false

    for (let i = 0; i < flowers.length; i++) {
        flowers[i].show()
        flowers[i].move()

        if (flowers[i].x > width || flowers[i].x < 0) {
            edge = true
        }
    }

    if (edge) {
        for (let i = 0; i < flowers.length; i++) {
            flowers[i].shiftDown()
        }
    }

    for (let i = drops.length - 1; i >= 0; i--) {
        if (drops[i].toDelete) {
            drops.splice(i, 1)
        }
    }

    ship.show()
    ship.move()
}

function keyReleased() {
    if (key != ' ') {
        ship.setDir(0)
    }
}

function keyPressed() {
    if (keyCode === RIGHT_ARROW) {
        ship.setDir(1)
    } else if (keyCode === LEFT_ARROW) {
        ship.setDir(-1)
    } else if (key === ' ') {
        let drop = new Drop(ship.x, height)
        drops.push(drop)
    }
}
