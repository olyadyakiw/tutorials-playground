let blob
let blobs = []
let zoom = 1

function setup() {
    createCanvas(600, 600)
    blob = new Blob(0, 0, 64)
    for (let i = 0; i < 200; i++) {
        let x = random(-width, width)
        let y = random(-height, height)
        blobs[i] = new Blob(x, y, 16)
    }
}

function draw() {
    background(51)

    translate(width / 2, height / 2)
    // translate(-blob.pos.x, -blob.pos.y)
    var newzoom = 64 / blob.r
    zoom = lerp(zoom, newzoom, 0.1)
    scale(zoom)
    translate(-blob.pos.x, -blob.pos.y)

    for (let i = blobs.length - 1; i >= 0; i--) {
        blobs[i].show()
        if (blob.eats(blobs[i])) {
            blobs.splice(i, 1)
        }
    }

    blob.show()
    blob.update()
}
