let polys = []
let angle = 60
let delta = 10

let deltaSlider
let angleSlider

function setup() {
    createCanvas(400, 400)
    background(51)
    deltaSlider = createSlider(0, 25, 0)
    angleSlider = createSlider(0, 90, 0)

    let inc = 100

    for (let x = 0; x < width; x += inc) {
        for (let y = 0; y < height; y += inc) {
            let poly = new Polygon(4)
            poly.addVertex(x, y)
            poly.addVertex(x + inc, y)
            poly.addVertex(x + inc, y + inc)
            poly.addVertex(x, y + inc)
            poly.close()
            polys.push(poly)
        }
    }
}

function draw() {
    background(51)
    angle = angleSlider.value()
    delta = deltaSlider.value()

    for (let x = 0; x < polys.length; x++) {
        polys[x].hankin()
        polys[x].show()
    }
}
