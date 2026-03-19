let txt
let counts = {}
let keys = []

function preload() {
    txt = loadStrings('rainbow.txt')
}

function setup() {
    let allwords = txt.join('\n')
    let tokens = allwords.split(/\W+/)
    // console.log(tokens)
    for (let i = 0; i < tokens.length; i++) {
        let word = tokens[i].toLowerCase()
        if (!/\d+/.test(word)) {
            if (counts[word] === undefined) {
                counts[word] = 1
                keys.push(word)
            } else {
                counts[word] = counts[word] + 1
            }
        }
    }

    keys.sort(compare)

    function compare(a, b) {
        let countA = counts[a]
        let countB = counts[b]
        return countB - countA
    }

    for (let i = 0; i < keys.length; i++) {
        let key = keys[i]
        createDiv(key + ' ' + counts[key])
    }

    noCanvas()
}
