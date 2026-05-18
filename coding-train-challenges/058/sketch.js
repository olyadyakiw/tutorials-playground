let angle = 0

let table
let r = 200

let earth

function preload() {
    earth = loadImage('earth.jpg')
    table = loadTable('https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/4.5_month.csv', 'header')
}

function setup() {
    createCanvas(600, 600, WEBGL)
}

function draw() {
    background(51)
    rotateY(angle)
    angle += 0.01

    lights()
    fill(200)
    noStroke()
    texture(earth)
    sphere(r)
    for (let row of table.rows) {
        let lat = row.getNum('latitude')
        let lon = row.getNum('longitude')
        let mag = row.getNum('mag')

        let theta = radians(lat)

        let phi = radians(lon) + PI

        let x = r * cos(theta) * cos(phi)
        let y = -r * sin(theta)
        let z = -r * cos(theta) * sin(phi)

        let pos = createVector(x, y, z)

        let h = pow(10, mag)
        let maxh = pow(10, 7)
        h = map(h, 0, maxh, 10, 100)
        let xaxis = createVector(1, 0, 0)

        let angleb = abs(xaxis.angleBetween(pos))

        let raxis = xaxis.cross(pos)

        push()
        translate(x, y, z)
        rotate(angleb, raxis)
        fill(255)
        box(h, 5, 5)
        pop()
    }
}
