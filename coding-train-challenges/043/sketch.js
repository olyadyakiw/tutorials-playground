let rules = {
    S: [['The', 'N', 'V']],
    N: [['cat'], ['dog']],
    V: [['meows'], ['barks']],
}

function expand(start, expansion) {
    if (rules[start]) {
        let pick = random(rules[start])
        for (let i = 0; i < pick.length; i++) {
            expand(pick[i], expansion)
        }
    } else {
        expansion.push(start)
    }
    return expansion.join(' ')
}

function setup() {
    noCanvas()

    for (let i = 0; i < 10; i++) {
        let start = 'S'
        let expansion = []
        let result = expand(start, expansion)
        createP(result)
    }
}
