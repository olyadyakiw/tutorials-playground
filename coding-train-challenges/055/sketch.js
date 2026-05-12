let sliderD
let sliderN
let d = 8
let n = 5

function setup() {
    createCanvas(400, 400)
    sliderD = createSlider(1, 20, 10, 1)
    sliderN = createSlider(1, 20, 10, 1)
    sliderD.input(draw)
    sliderN.input(draw)
}

function draw() {
    d = sliderD.value()
    n = sliderN.value()
    let k = n / d
    background(51)
    push()
    translate(width / 2, height / 2)

    beginShape()
    stroke(255)
    noFill()
    strokeWeight(1)
    for (let a = 0; a < TWO_PI * reduceDenominator(n, d); a += 0.02) {
        let r = cos(k * a) * 200
        let x = r * cos(a)
        let y = r * sin(a)
        vertex(x, y)
    }
    endShape(CLOSE)
    pop()
    noLoop()
}

function reduceDenominator(numerator, denominator) {
    function rec(a, b) {
        return b ? rec(b, a % b) : a
    }
    return denominator / rec(numerator, denominator)
}
