let obama
let scl = 16
let w, h
let smaller

function preload() {
    obama = loadImage('obama.jpg')
}

function setup() {
    createCanvas(600, 749)

    w = floor(obama.width / scl)
    h = floor(obama.height / scl)

    smaller = createImage(w, h)
    smaller.copy(obama, 0, 0, obama.width, obama.height, 0, 0, w, h)

    noLoop()
}

function draw() {
    background(0)
    smaller.loadPixels()

    for (let x = 0; x < w; x++) {
        for (let y = 0; y < h; y++) {
            let index = (x + y * w) * 4

            let r = smaller.pixels[index]
            let g = smaller.pixels[index + 1]
            let b = smaller.pixels[index + 2]

            fill(r, g, b)
            noStroke()
            rect(x * scl, y * scl, scl, scl)
        }
    }
}
