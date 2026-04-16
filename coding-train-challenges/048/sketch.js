let potus
let counts = {}

let ignore = {
    the: 'true',
    to: 'true',
    we: 'true',
    of: 'true',
    http: 'true',
    https: 'true',
}

function preload() {
    potus = loadJSON('flotus.json')
}

function setup() {
    createCanvas(600, 400)
    let tweets = potus.tweets
    for (let i = 0; i < tweets.length; i++) {
        let date = new Date(tweets[i].timestamp)
        let month = date.getMonth()
        let year = date.getFullYear()
        let key = month + '/' + year

        if (counts.hasOwnProperty(key)) {
            counts[key].total++
        } else {
            counts[key] = {
                total: 1,
                words: {},
            }
        }

        let txt = tweets[i].text
        let words = txt.split(/\W+/)

        for (let j = 0; j < words.length; j++) {
            let word = words[j].toLowerCase()
            if (word.length > 0) {
                if (counts[key].words.hasOwnProperty(word)) {
                    counts[key].words[word]++
                } else {
                    counts[key].words[word] = 1
                }
            }
        }
    }
    background(0)
    let months = Object.keys(counts)
    months.reverse()

    let maxtweets = 0
    for (let i = 0; i < months.length; i++) {
        let num = counts[months[i]].total
        if (num > maxtweets) {
            maxtweets = num
        }
    }

    let w = width / months.length

    for (let i = 0; i < months.length; i++) {
        let num = counts[months[i]].total
        let h = map(num, 0, maxtweets, 0, 300)
        fill(200)
        rect(i * w, height - h, w - 1, h)

        let wordCounts = counts[months[i]].words
        let words = Object.keys(wordCounts)
        let biggest = 0
        let biggestWord = ''
        for (let j = 0; j < words.length; j++) {
            let word = words[j]
            if (wordCounts[word] > biggest && !ignore[word] && word.length > 3) {
                biggest = wordCounts[word]
                biggestWord = word
            }
        }
        console.log(months[i], biggestWord, biggest)
        fill(255)
        text(biggestWord, i * w + 2, height - h - 5)
    }
}
