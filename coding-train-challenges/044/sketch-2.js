let afinn

function preload() {
    afinn = loadJSON('afinn111.json')
}

function setup() {
    noCanvas()

    let txt = select('#txt')
    txt.input(typing)

    function typing() {
        let textinput = txt.value()
        let words = textinput.split(/\W/)
        console.log(words)
        let scoredWords = []
        let totalScore = 0
        for (let i = 0; i < words.length; i++) {
            let word = words[i].toLowerCase()
            if (afinn.hasOwnProperty(word)) {
                let score = afinn[word]
                totalScore += Number(score)
                scoredWords.push(word + ': ' + score + ' ')
            }
        }
        let scoreP = select('#scoreP')
        scoreP.html('score: ' + totalScore)
        let comp = select('#comparativeP')
        comp.html('compartive: ' + totalScore / words.length)
        let wordlist = select('#wordlistP')
        wordlist.html(scoredWords)
    }
}

function draw() {}
