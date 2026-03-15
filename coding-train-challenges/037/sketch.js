function diastic(seed, words) {
    let phrase = ''
    let currentWord = 0

    for (let i = 0; i < seed.length; i++) {
        let c = seed.charAt(i)

        for (let j = currentWord; j < words.length; j++) {
            if (words[j].charAt(i) === c) {
                phrase += words[j]
                phrase += ' '
                currentWord = j + 1
                break
            }
        }
    }
    return phrase
}

let srctext
let words

function preload() {
    srctext = loadStrings('rainbow.txt')
}

function setup() {
    noCanvas()
    srctext = join(srctext, ' ')
    words = splitTokens(srctext, ' ,!.?')

    let seed = select('#seed')
    let submit = select('#submit')
    submit.mousePressed(function () {
        // createP(seed.value())
        // createP(srctext)

        let phrase = diastic(seed.value(), words)
        createP(phrase)
    })
}
