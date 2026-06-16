// let offset = 0

// function setup() {
//     createCanvas(600, 400)
// }

// function draw() {
//     background(0)
//     strokeWeight(4)
//     stroke(255)

//     let x = 0
//     while (x <= width) {
//         fill(0, 200, 255)
//         ellipse(x, 100, 25, 25)
//         x += 50
//     }

//     for (let x = 0; x <= width; x += 50) {
//         fill(random(255), 0, random(255))
//         ellipse(x + offset, 300, 25, 25)
//     }

//     offset++

//     // ellipse(0, 200, 25, 25)
//     // ellipse(50, 200, 25, 25)
//     // ellipse(100, 200, 25, 25)
//     // ellipse(150, 200, 25, 25)
//     // ellipse(200, 200, 25, 25)
//     // ellipse(250, 200, 25, 25)
// }

function setup() {
    createCanvas(600, 400)
}

function draw() {
    background(0)
    strokeWeight(4)
    stroke(255)

    for (let x = 0; x <= mouseX; x += 50) {
        for (let y = 0; y <= mouseY; y += 50) {
            fill(random(255), 0, random(255))
            ellipse(x, y, 25, 25)
        }
    }
}
