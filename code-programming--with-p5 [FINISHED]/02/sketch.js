let x = 200
let y = 200
let extraCanvas

function setup() {
    createCanvas(400, 400)
    extraCanvas = createGraphics(400, 400)
    extraCanvas.clear()
    background(0)
}

function draw() {
    background(0)
    x += random(-5, 5)
    y += random(-5, 5)

    if (mouseIsPressed) {
        extraCanvas.fill(255, 150)
        extraCanvas.noStroke()
        extraCanvas.ellipse(mouseX, mouseY, 60, 60)
    }

    image(extraCanvas, 0, 0)
    fill(255, 0, 0)
    stroke(255)
    rectMode(CENTER)
    rect(x, y, 20, 20)
}

// let r = 0
// let b = 255

// function setup() {
//     createCanvas(600, 400)
// }

// function draw() {
//     r = map(mouseX, 0, 600, 0, 255)
//     b = map(mouseX, 0, 600, 255, 0)
//     background(r, 0, b)

//     fill(250, 118, 222)
//     ellipse(mouseX, 200, 64, 64)
// }

// let x, y, r, g, b

// function setup() {
//     createCanvas(windowWidth, windowHeight)
//     background(0)
// }

// function draw() {
//     r = random(255)
//     g = 0
//     b = random(255)
//     x = random(width)
//     y = random(height)
//     noStroke()
//     fill(r, g, b, 100)
//     circle(x, y, 24)
// }

// let squareSize
// let lineWidth

// function setup() {
//     createCanvas(400, 300)
//     background(100)
//     lineWidth = random(2, 10)
// }

// function draw() {
//     squareSize = random(5, 250)

//     rectMode(CENTER)
//     strokeWeight(lineWidth)
//     stroke(0, 0, 255)
//     fill(0, 255, 0, 10)
//     square(200, 150, squareSize)
// }

// let circleX = 100

// function setup() {
//     createCanvas(400, 400)
// }

// function mousePressed() {
//     circleX = 0
// }

// function draw() {
//     background(0)
//     noStroke()
//     fill(255)
//     circle(circleX, 150, 64)
//     circleX += 5
// }

// function draw() {
//     noStroke()
//     fill(mouseX, mouseY, mouseX, 50)
//     circle(mouseX, mouseY, 24)
// }

// function mousePressed() {
//     background(0)
// }
