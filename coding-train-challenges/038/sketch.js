let textfield
let output
let input
let submit

function setup() {
    noCanvas()
    textfield = select('#input')
    output = select('#output')
    submit = select('#submit')
    submit.mousePressed(newText)
}

function highlight() {
    console.log(this.html)
    this.html('rainbow')
    let c = color(random(255), random(255), random(255))
    this.style('background-color', c)
}

function newText() {
    let s = textfield.value()

    let words = s.split(/(\W+)/)
    for (let i = 0; i < words.length; i++) {
        let span = createSpan(words[i])
        span.parent(output)
        if (!/\W+/.test(words[i])) {
            // span.style('background-color', color(random(255), 0, random(255)))
            span.mouseOver(highlight)
        }
    }
}
