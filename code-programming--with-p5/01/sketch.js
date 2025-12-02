function setup() {
    createCanvas(400, 300)
}

function draw() {
    background(100, 100, 100)

    // line(0, 50, 400, 400)
    rectMode(CENTER)
    fill(0, 0, 255)
    stroke(0, 255, 0)
    rect(200, 150, 150, 150)

    fill(255, 0, 0, 50)
    // noFill()
    stroke(255)
    ellipse(150, 200, 100, 75)
}
