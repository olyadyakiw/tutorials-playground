let tree = []
let walkers = []
// let r = 4
let maxWalkers = 50
let iterations = 1000
let radius = 8
let hue

function setup() {
    createCanvas(400, 400)
    colorMode(HSB)

    // for (let x = 0; x < width; x += r * 2) {
    //     tree.push(new Walker(x, height))
    // }

    tree[0] = new Walker(width / 2, height / 2)
    radius *= 0.99

    for (let i = 0; i < maxWalkers; i++) {
        walkers[i] = new Walker()
        radius *= 0.99
    }
}

function draw() {
    background(0)

    for (let i = 0; i < tree.length; i++) {
        tree[i].show()
    }

    for (let i = 0; i < walkers.length; i++) {
        walkers[i].show()
    }

    for (let n = 0; n < iterations; n++) {
        for (let i = 0; i < walkers.length; i++) {
            walkers[i].walk()
            if (walkers[i].checkStuck(tree)) {
                tree.push(walkers[i])
                walkers.splice(i, 1)
            }
        }
    }

    let r = walkers[walkers.length - 1].r
    while (walkers.length < maxWalkers && radius > 1) {
        radius *= 0.99
        if (radius > 1) {
            walkers.push(new Walker())
        }
    }
}
