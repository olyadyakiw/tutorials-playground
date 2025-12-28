let slider

function setup() {
    createCanvas(600, 600)
    slider = createSlider(0, 10, 2, 0.01)
}

function sgn(val) {
    if (val > 0) {
        return 1
    } else if (val < 0) {
        return -1
    } else {
        return 0
    }
}

function draw() {
    background(51)
    translate(width / 2, height / 2)

    // let r = 100
    let a = 100
    let b = 100
    let n = slider.value()

    stroke(255)
    noFill()

    beginShape()
    for (let angle = 0; angle < TWO_PI; angle += 0.1) {
        // let x = r * cos(a)
        // let y = r * sin(a)
        // vertex(x, y)

        let na = 2 / n
        let x = pow(abs(cos(angle)), na) * a * sgn(cos(angle))
        let y = pow(abs(sin(angle)), na) * b * sgn(sin(angle))
        vertex(x, y)
    }
    endShape(CLOSE)
}
