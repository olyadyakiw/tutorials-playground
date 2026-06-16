let on = false

function setup() {
    createCanvas(600, 400)
}

function draw() {
    if (on) {
        background(0, 255, 0)
    } else {
        background(0)
    }

    stroke(255)
    strokeWeight(4)
    noFill()

    // if (mouseX > 250 && mouseX < 350 && mouseY > 150 && mouseY < 250) {
    //     if (mouseIsPressed) {
    //         background(0, 255, 0)
    //     }
    //     fill(255, 0, 0)
    // }

    rectMode(CENTER)
    rect(300, 200, 100, 100)
}

function mousePressed() {
    if (mouseX > 250 && mouseX < 350 && mouseY > 150 && mouseY < 250) {
        on = !on
    }
}

// let x = 0
// let speed = 3

// function setup() {
//     createCanvas(600, 400)
// }

// function draw() {
//     background(0)
//     stroke(255)
//     strokeWeight(4)
//     noFill()
//     ellipse(x, 200, 100, 100)
//     if (x > width || x < 0) {
//         speed = speed * -1
//     }

//     x = x + speed
// }
