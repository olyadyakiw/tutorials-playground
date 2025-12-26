let tree
let max_dist = 100
let min_dist = 1

function setup() {
    createCanvas(800, 800)
    tree = new Tree()
}

function draw() {
    background(51)
    tree.show()
    tree.grow()
}
