// // let words = ['rainbow', 'heart', 'purple', 'cat', 'love']

// // let nums = [100, 25, 46, 72]

// // let num = 23

// // let index = 0

// // function setup() {
// //     createCanvas(500, 400)
// // }

// // function draw() {
// //     background(0)
// //     // ellipse(100, 200, num, num)

// //     // ellipse(100, 200, nums[0], nums[0])
// //     // ellipse(200, 200, nums[1], nums[1])
// //     // ellipse(300, 200, nums[2], nums[2])
// //     // ellipse(400, 200, nums[3], nums[3])

// //     for (let i = 0; i < 4; i++) {
// //         stroke(255)
// //         fill(51)
// //         ellipse(i * 100 + 100, 200, nums[i], nums[i])
// //     }

// //     // fill(255)
// //     // textSize(32)
// //     // text(words[index], 12, 200)
// // }

// // // function mousePressed() {
// // //     index++

// // //     if (index == words.length) {
// // //         index = 0
// // //     }
// // // }

// // let bubbles = []
// // let bubble

// // function setup() {
// //     createCanvas(600, 400)

// //     for (let i = 0; i < 10; i++) {
// //         let x = random(width)
// //         let y = random(height)
// //         let r = random(10, 50)
// //         let b = new Bubble(x, y, r)
// //         bubbles.push(b)
// //     }
// // }

// // // function mousePressed() {
// // //     let r = random(10, 50)
// // //     let b = new Bubble(mouseX, mouseY, r)
// // //     bubbles.push(b)
// // // }

// // function mousePressed() {
// //     for (let i = bubbles.length - 1; i >= 0; i--) {
// //         if (bubbles[i].contains(mouseX, mouseY)) {
// //             bubbles.splice(i, 1)
// //         }
// //     }
// // }

// // function draw() {
// //     background(0)
// //     for (let i = 0; i < bubbles.length; i++) {
// //         // bubbles[i].move()
// //         // bubbles[i].show()
// //         if (bubbles[i].contains(mouseX, mouseY)) {
// //             bubbles[i].changeColor(255)
// //         } else {
// //             bubbles[i].changeColor(0)
// //         }
// //         bubbles[i].move()
// //         bubbles[i].show()
// //     }

// //     // bubble.move()
// //     // bubble.show()
// // }

// // class Bubble {
// //     constructor(x, y, r) {
// //         this.x = x
// //         this.y = y
// //         this.r = r
// //         this.brightness = 0
// //     }

// //     clicked(x, y) {
// //         let d = dist(x, y, this.x, this.y)
// //         if (d < this.r) {
// //             // console.log('cl')
// //             this.brightness = 255
// //         }
// //     }

// //     changeColor(bright) {
// //         this.brightness = bright
// //     }

// //     contains(px, py) {
// //         let d = dist(px, py, this.x, this.y)
// //         if (d < this.r) {
// //             return true
// //         } else {
// //             return false
// //         }
// //     }

// //     move() {
// //         this.x = this.x + random(-5, 5)
// //         this.y = this.y + random(-5, 5)
// //     }

// //     show() {
// //         stroke(255)
// //         strokeWeight(4)
// //         fill(this.brightness, 125)
// //         ellipse(this.x, this.y, this.r * 2)
// //     }
// // }

// // let bubble1
// // let bubble2

// // function setup() {
// //     createCanvas(600, 400)
// //     bubble1 = new Bubble(200, 200)
// //     bubble2 = new Bubble(300, 200, 100)
// // }

// // function draw() {
// //     background(0)
// //     let d = dist(bubble1.x, bubble2.y, bubble2.x, bubble2.y)

// //     if (bubble1.intersects(bubble2)) {
// //         background(200, 0, 100)
// //     }
// //     bubble1.show()
// //     bubble1.move()
// //     bubble2.show()
// //     // bubble2.move()
// //     bubble2.x = mouseX
// //     bubble2.y = mouseY
// // }

// let bubbles = []
// // let unicorn

// function setup() {
//     createCanvas(600, 400)
//     // unicorn = new Bubble(400, 200, 10)
//     for (let i = 0; i < 1000; i++) {
//         let x = random(width)
//         let y = random(height)
//         let r = random(5, 8)
//         bubbles[i] = new Bubble(x, y, r)
//     }
// }

// // function draw() {
// //     background(0)
// //     for (let i = 0; i < bubbles.length; i++) {
// //         bubbles[i].show()
// //         bubbles[i].move()
// //         if (unicorn.intersects(bubbles[i])) {
// //             bubbles[i].changeColor(100)
// //         } else {
// //             bubbles[i].changeColor(0)
// //         }
// //     }

// //     // unicorn.x = mouseX
// //     // unicorn.y = mouseY
// //     // unicorn.show()
// //     // unicorn.move()
// // }

// function draw() {
//     background(0)
//     for (let b of bubbles) {
//         b.show()
//         b.move()
//         let overlapping = false
//         // for (let other of bubbles) {
//         //     if (b !== other && b.intersects(other)) {
//         //         b.changeColor(255)
//         //         overlapping = true
//         //     }
//         //     if (overlapping) {
//         //         b.changeColor(255)
//         //     } else {
//         //         b.changeColor(0)
//         //     }
//         // }
//     }
// }

// class Bubble {
//     constructor(x, y, r = 50) {
//         this.x = x
//         this.y = y
//         this.r = r
//         this.brightness = 0
//     }

//     intersects(other) {
//         let d = dist(this.x, this.y, other.x, other.y)
//         return d < this.r + other.r
//         // if (d < this.r + other.r) {
//         //     return true
//         // } else {
//         //     return false
//         // }
//     }

//     clicked(x, y) {
//         let d = dist(x, y, this.x, this.y)
//         if (d < this.r) {
//             // console.log('cl')
//             this.brightness = 255
//         }
//     }

//     changeColor(bright) {
//         this.brightness = bright
//     }

//     contains(px, py) {
//         let d = dist(px, py, this.x, this.y)
//         if (d < this.r) {
//             return true
//         } else {
//             return false
//         }
//     }

//     move() {
//         this.x = this.x + random(-5, 5)
//         this.y = this.y + random(-5, 5)
//     }

//     show() {
//         stroke(255)
//         strokeWeight(4)
//         fill(this.brightness, 125)
//         ellipse(this.x, this.y, this.r * 2)
//     }
// }

let bubbles = []

let flower
let kittens = []

function preload() {
    flower = loadImage('kittens/flower.png')
    for (let i = 0; i < 5; i++) {
        kittens[i] = loadImage(`kittens/kitten${i}.jpg`)
    }
}

function setup() {
    createCanvas(600, 400)
    for (let i = 0; i < 10; i++) {
        let x = random(width)
        let y = random(height)
        let r = random(50, 150)
        // let kitten = random(kittens);
        let b = new Bubble(x, y, r)
        bubbles.push(b)
    }
}

function mousePressed() {
    for (let i = 0; i < bubbles.length; i++) {
        bubbles[i].clicked(mouseX, mouseY)
    }
}

function draw() {
    background(0)
    for (let i = 0; i < bubbles.length; i++) {
        bubbles[i].move()
        bubbles[i].show()
    }
}

class Bubble {
    constructor(x, y, r, kitten) {
        this.x = x
        this.y = y
        this.r = r
        this.kitten = random(kittens)
    }

    clicked(px, py) {
        //let d = dist(px, py, this.x, this.y);
        //if (d < this.r) {
        if (px > this.x && px < this.x + this.r && py > this.y && py < this.y + this.r) {
            this.kitten = random(kittens)
        }
    }

    move() {
        this.x = this.x + random(-2, 2)
        this.y = this.y + random(-2, 2)
    }

    show() {
        image(this.kitten, this.x, this.y, this.r, this.r)
        // stroke(255);
        // strokeWeight(4);
        // fill(this.brightness, 125);
        // ellipse(this.x, this.y, this.r * 2);
    }
}
