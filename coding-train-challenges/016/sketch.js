let axiom = 'F'
let sentence = axiom
let len = 200
let angle

let rules = []

rules[0] = {
    a: 'F',
    b: 'FF+[+F-F-F]-[-F+F+F]',
}

function generate() {
    len *= 0.5
    let nextSentence = ''
    for (let i = 0; i < sentence.length; i++) {
        let current = sentence.charAt(i)
        let found = false
        for (let j = 0; j < rules.length; j++) {
            if (current === rules[j].a) {
                nextSentence += rules[j].b
                found = true
                break
            }
        }
        if (!found) nextSentence += current
    }

    sentence = nextSentence
    createP(sentence)
    turtle()
}

function turtle() {
    background(51)
    resetMatrix()
    translate(width / 2, height)
    stroke(255, 255, 255, 100)
    for (let i = 0; i < sentence.length; i++) {
        let current = sentence.charAt(i)

        if (current == 'F') {
            line(0, 0, 0, -len)
            translate(0, -len)
        } else if (current == '+') {
            rotate(angle)
        } else if (current == '-') {
            rotate(-angle)
        } else if (current == '[') {
            push()
        } else if (current == ']') {
            pop()
        }
    }
}

function setup() {
    createCanvas(800, 800)
    angle = radians(25)
    background(51)
    createP(axiom)
    turtle()
    let button = createButton('Generate')
    button.mousePressed(generate)
}
