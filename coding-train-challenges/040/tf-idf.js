let txt = []
let counts = {}
let keys = []
let allwords = []

let files = ['rainbow.txt', 'fish.txt', 'eclipse.txt', 'sports.txt']

function preload() {
    for (let i = 0; i < files.length; i++) {
        txt[i] = loadStrings('files/' + files[i])
    }
}

function setup() {
    for (let i = 0; i < txt.length; i++) {
        allwords[i] = txt[i].join('\n')
    }

    let tokens = allwords[0].split(/\W+/)
    // console.log(tokens)
    for (let i = 0; i < tokens.length; i++) {
        let word = tokens[i].toLowerCase()
        if (!/\d+/.test(word)) {
            if (counts[word] === undefined) {
                counts[word] = {
                    tf: 1,
                    df: 1,
                }
                keys.push(word)
            } else {
                counts[word].tf = counts[word].tf + 1
            }
        }
    }

    let othercounts = []

    for (let j = 1; j < allwords.length; j++) {
        let tempcounts = {}
        let tokens = allwords[j].split(/\W+/)
        for (let k = 0; k < tokens.length; k++) {
            let w = tokens[k].toLowerCase()
            if (tempcounts[w] === undefined) {
                tempcounts[w] = true
            }
        }
        othercounts.push(tempcounts)
    }

    for (let i = 0; i < keys.length; i++) {
        let word = keys[i]

        for (let j = 0; j < othercounts.length; j++) {
            let tempcounts = othercounts[j]
            if (tempcounts[word]) {
                counts[word].df++
            }
        }
    }

    for (let i = 0; i < keys.length; i++) {
        let word = keys[i]
        let wordobj = counts[word]
        wordobj.tfidf = wordobj.tf * Math.log(files.length / wordobj.df)
        // wordobj.tfidf = wordobj.tf * log(files.length / wordobj.df)
    }

    keys.sort(compare)

    function compare(a, b) {
        let countA = counts[a].tfidf
        let countB = counts[b].tfidf
        return countB - countA
    }

    for (let i = 0; i < keys.length; i++) {
        let key = keys[i]
        createDiv(key + ' ' + counts[key].tfidf)
    }

    noCanvas()
}
