let n1 = 1
let n2 = 1
let n3 = 1
let m = 5
let a = 1
let b = 1
let slider

function setup() {
    createCanvas(600, 600)
    slider = createSlider(0, 10, 5, 1)
}

function supershape(theta) {
    let part1 = (1 / a) * cos((theta * m) / 4)
    part1 = abs(part1)
    part1 = pow(part1, n2)

    let part2 = (1 / b) * sin((theta * m) / 4)
    part2 = abs(part2)
    part2 = pow(part2, n3)

    let part3 = n1 * pow(part1 + part2, 1 / n1)

    if (part3 === 0) return 0

    return 1 / part3
}

function draw() {
    m = slider.value()
    background(51)
    translate(width / 2, height / 2)

    stroke(255)
    noFill()

    let radius = 100

    let total = 500

    let increment = TWO_PI / total

    beginShape()
    for (let angle = 0; angle < TWO_PI; angle += increment) {
        let r = supershape(angle)
        let x = radius * r * cos(angle)
        let y = radius * r * sin(angle)
        vertex(x, y)
    }
    endShape(CLOSE)
}
