let font
let vehicles = []

function preload() {
    font = loadFont('AvenirNextLTPro-Demi.otf')
}

function setup() {
    createCanvas(640, 300)
    background(51)

    let points = font.textToPoints('train', 100, 200, 192)

    for (let i = 0; i < points.length; i++) {
        let pt = points[i]
        let vehicle = new Vehicle(pt.x, pt.y)
        vehicles.push(vehicle)
    }
}

function draw() {
    background(51)

    for (let i = 0; i < vehicles.length; i++) {
        let v = vehicles[i]
        v.behaviors()
        v.update()
        v.show()
    }
}
