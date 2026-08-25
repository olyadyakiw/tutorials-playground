const cols = 40
const rows = 50
const w = 10

const poleX = 100
const poleTop = 10
const poleWidth = 10
const dragRadius = 20

const particles = make2DArray(cols, rows)
const springs = []

let physics
let gravityBehavior
let flagTexture
let draggedParticle = null
let lastWindUpdate = 0

function preload() {
    flagTexture = loadImage("assets/unikitty.jpg")
}

function setup() {
    createCanvas(600, 600, WEBGL)
    textureMode(NORMAL)

    physics = new VerletPhysics2D()
    gravityBehavior = new GravityBehavior(new Vec2D(0, 1))
    physics.addBehavior(gravityBehavior)
    updateWind()

    let x = poleX
    for (let i = 0; i < cols; i++) {
        let y = poleTop
        for (let j = 0; j < rows; j++) {
            const p = new Particle(x, y)
            particles[i][j] = p
            physics.addParticle(p)
            y += w
        }
        x += w
    }

    for (let i = 0; i < cols; i++) {
        for (let j = 0; j < rows; j++) {
            const a = particles[i][j]

            if (i !== cols - 1) {
                const horizontalSpring = new Spring(a, particles[i + 1][j])
                springs.push(horizontalSpring)
                physics.addSpring(horizontalSpring)
            }

            if (j !== rows - 1) {
                const verticalSpring = new Spring(a, particles[i][j + 1])
                springs.push(verticalSpring)
                physics.addSpring(verticalSpring)
            }
        }
    }

    for (let j = 0; j < rows; j++) {
        particles[0][j].lock()
    }
}

function draw() {
    background("skyblue")
    translate(-width / 2, -height / 2)

    if (millis() - lastWindUpdate >= 1000) {
        updateWind()
    }

    moveDraggedParticle()
    physics.update()

    drawPole()
    drawFlag()
}

function drawPole() {
    push()
    fill(51)
    noStroke()
    rect(
        poleX - poleWidth,
        poleTop - 5,
        poleWidth,
        (rows - 1) * w + 20,
        4
    )
    pop()
}

function drawFlag() {
    noStroke()

    for (let j = 0; j < rows - 1; j++) {
        const v1 = map(j, 0, rows - 1, 0, 1)
        const v2 = map(j + 1, 0, rows - 1, 0, 1)

        beginShape(TRIANGLE_STRIP)
        texture(flagTexture)

        for (let i = 0; i < cols; i++) {
            const u = map(i, 0, cols - 1, 0, 1)
            const top = particles[i][j]
            const bottom = particles[i][j + 1]

            vertex(top.x, top.y, 1, u, v1)
            vertex(bottom.x, bottom.y, 1, u, v2)
        }

        endShape()
    }
}

function updateWind() {
    const windX = random(0.31, 0.6)
    const windY = random(0.01, 0.3)
    gravityBehavior.setForce(new Vec2D(windX, windY))
    lastWindUpdate = millis()
}

function mousePressed() {
    if (mouseX < 0 || mouseX > width || mouseY < 0 || mouseY > height) {
        return
    }

    draggedParticle = findClosestMovableParticle(mouseX, mouseY)

    if (draggedParticle) {
        draggedParticle.lock()
        moveDraggedParticle()
        return false
    }
}

function mouseDragged() {
    if (draggedParticle) {
        moveDraggedParticle()
        return false
    }
}

function mouseReleased() {
    if (draggedParticle) {
        draggedParticle.clearVelocity()
        draggedParticle.unlock()
        draggedParticle = null
        return false
    }
}

function findClosestMovableParticle(x, y) {
    let closest = null
    let closestDistanceSquared = dragRadius * dragRadius

    // Column 0 is permanently attached to the pole.
    for (let i = 1; i < cols; i++) {
        for (let j = 0; j < rows; j++) {
            const particle = particles[i][j]
            const dx = particle.x - x
            const dy = particle.y - y
            const distanceSquared = dx * dx + dy * dy

            if (distanceSquared < closestDistanceSquared) {
                closest = particle
                closestDistanceSquared = distanceSquared
            }
        }
    }

    return closest
}

function moveDraggedParticle() {
    if (!draggedParticle) {
        return
    }

    draggedParticle.set(mouseX, mouseY)
    draggedParticle.clearVelocity()
}

function make2DArray(cols, rows) {
    const arr = new Array(cols)
    for (let i = 0; i < arr.length; i++) {
        arr[i] = new Array(rows)
    }
    return arr
}
