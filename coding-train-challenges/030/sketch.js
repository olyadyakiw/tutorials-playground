let n = 0
let c = 4

function setup() {
    createCanvas(600, 600)
    angleMode(DEGREES)
    background(51)
    colorMode(HSB)
}

function draw() {
    let a = n * 137.5
    let r = c * sqrt(n)

    let x = r * cos(a) + width / 2
    let y = r * sin(a) + height / 2

    fill((a - r) % 255, 255, 255)
    noStroke()
    ellipse(x, y, 4, 4)

    n++
}
