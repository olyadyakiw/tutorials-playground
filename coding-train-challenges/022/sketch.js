let minxval = -0.5
let maxval = 0.5

let minSlider
let maxSlider

let angle = 0

function setup() {
    createCanvas(360, 360)
    colorMode(HSB, 1)
    pixelDensity(1)

    minSlider = createSlider(-2.5, 0, -2.5, 0.01)
    maxSlider = createSlider(0, 2.5, 2.5, 0.01)
}

function draw() {
    let maxiterations = 100
    loadPixels()
    // let ca = sin(angle)
    // let cb = 0
    // let ca = cos(angle + 3.233)
    // let cb = sin(angle)

    angle += 0.02

    for (let x = 0; x < width; x++) {
        for (let y = 0; y < height; y++) {
            let a = map(x, 0, width, minSlider.value(), maxSlider.value())
            let b = map(y, 0, height, minSlider.value(), maxSlider.value())

            // let ca = -0.70176
            // let cb = -0.3842

            // let ca = map(mouseX, 0, width, -1, 1)
            // let cb = map(mouseX, 0, height, -1, 1)

            let ca = -0.8
            let cb = 0.156

            let n = 0

            while (n < maxiterations) {
                let aa = a * a
                let bb = b * b
                if (abs(aa + bb) > 4) {
                    break
                }
                let twoab = 2 * a * b
                a = aa - bb + ca
                b = twoab + cb
                n++
            }

            // let bright = map(n, 0, maxiterations, 0, 255)
            // let bright = (n * 16) % 255
            let bright = map(n, 0, maxiterations, 0, 1)
            bright = map(sqrt(bright), 0, 1, 0, 255)

            if (n === maxiterations) {
                bright = 0
            }

            let pix = (x + y * width) * 4
            pixels[pix + 0] = bright
            pixels[pix + 1] = bright
            pixels[pix + 2] = bright
            pixels[pix + 3] = 255
        }
    }
    updatePixels()
}
