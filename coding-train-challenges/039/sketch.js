let data

let txt =
    '$$Exclamation$$! they said $$Adverb$$ as they jumped into their $$Noun$$ and flew off with their $$Adjective$$ $$PluralNoun$$.'

function setup() {
    noCanvas()

    Papa.parse(
        'https://docs.google.com/spreadsheets/d/e/2PACX-1vSiJDczupcvlAJxd70RJ9hZina9cqweCiTj1EkYrH_17FhFBjdMFTEY2TOMmhwGBHGR05y7QRXLNbo6/pub?output=csv',
        {
            download: true,
            header: true,
            complete: function (results) {
                var stuff = results.data
                data = stuff
            },
        },
    )

    let button = createButton('generate madlib')
    button.mousePressed(generate)
}

function replacer(match, pos) {
    let entry = random(data)
    return entry[pos]
}

function generate() {
    // console.log('generate')
    let madlib = txt.replace(/\$\$(.*?)\$\$/g, replacer)
    createP(madlib)
}
