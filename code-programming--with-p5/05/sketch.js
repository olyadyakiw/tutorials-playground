// let ball = {
//     x: 300,
//     y: 200,
//     xspeed: 4,
//     yspeed: -3,
// }

// function setup() {
//     createCanvas(600, 400)
// }

// function draw() {
//     background(0)

//     move()
//     bounce()
//     display()
// }

// function move() {
//     ball.x = ball.x + ball.xspeed
//     ball.y = ball.y + ball.yspeed
// }

// function bounce() {
//     if (ball.x > width || ball.x < 0) {
//         ball.xspeed = ball.xspeed * -1
//     }
//     if (ball.y > height || ball.y < 0) {
//         ball.yspeed = ball.yspeed * -1
//     }
// }

// function display() {
//     stroke(255)
//     strokeWeight(4)
//     noFill()
//     ellipse(ball.x, ball.y, 24, 24)
// }

// function setup() {
//     createCanvas(600, 400)
// }

// function draw() {
//     background(50)

//     lolipop(100, 100, 50)
//     lolipop(300, 200, 150)
//     lolipop(400, 400, 50)
// }

// function lolipop(x, y, size) {
//     fill(0, 200, 255)
//     rect(x - 10, y, 20, 150)

//     fill(255, 0, 200)
//     ellipse(x, y, size, size)
// }

function setup() {
    let km = milesToKm(26.3)
    createCanvas(600, 400)
    let km2 = milesToKm(100)
    console.log(km, km2)
}

function milesToKm(miles) {
    let km = miles * 1.6
    return km
}

function draw() {
    background(50)
}
