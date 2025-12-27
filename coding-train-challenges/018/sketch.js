let tree
let max_dist = 200
let min_dist = 5
let cam

function setup() {
    createCanvas(600, 600, WEBGL)
    cam = createEasyCam({ distance: 600 })
    translate(-width / 2, -height / 2)
    // frameRate(5)
    tree = new Tree()
}

function draw() {
    background(51)
    push()
    translate(-width / 2, -height / 2)
    tree.show()
    tree.grow()
    pop()
}
