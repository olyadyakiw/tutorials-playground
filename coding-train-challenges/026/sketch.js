const globe = []
let total = 25
let r = 200
let angleX = 0
let angleY = 0

let offset = 0

let a = 1
let b = 1

let m = 0
let mchange = 0

function supershape(theta, m, n1, n2, n3) {
    let t1 = abs((1 / a) * cos((m * theta) / 4))
    t1 = pow(t1, n2)
    let t2 = abs((1 / b) * sin((m * theta) / 4))
    t2 = pow(t2, n3)
    let t3 = t1 + t2
    let r = pow(t3, -1 / n1)

    return r
}

function setup() {
    createCanvas(600, 600, WEBGL)
    colorMode(HSB, 255)
    noFill()
    strokeWeight(2)
    stroke(200)
}

function draw() {
    m = map(sin(mchange), -1, 1, 0, 7)
    mchange += 0.05

    background(0)
    // fill(255)
    rotateX(angleX)
    rotateY(angleY)

    for (let i = 0; i < total + 1; i++) {
        globe[i] = []
        let lat = map(i, 0, total, -HALF_PI, HALF_PI)
        // let r2 = supershape(lat, 2, 10, 10, 10)
        let r2 = supershape(lat, m, 0.2, 1.7, 1.7)
        for (let j = 0; j < 100; j++) {
            let lon = map(j, 0, total, -PI, PI)
            // let r1 = supershape(lon, 8, 60, 100, 30)
            let r1 = supershape(lon, m, 0.2, 1.7, 1.7)
            let x = r * r1 * cos(lon) * r2 * cos(lat)
            let y = r * r1 * sin(lon) * r2 * cos(lat)
            let z = r * r2 * sin(lat)
            // stroke(255)
            // point(x, y, z)
            globe[i][j] = createVector(x, y, z)
        }
    }

    offset += 5

    for (let i = 0; i < total; i++) {
        let hu = map(i, 0, total, 0, 255 * 6)
        fill((hu + offset) % 255, 255, 255)
        beginShape(TRIANGLE_STRIP)
        for (let j = 0; j < total + 1; j++) {
            const v1 = globe[i][j]
            vertex(v1.x, v1.y, v1.z)
            const v2 = globe[i + 1][j]
            vertex(v2.x, v2.y, v2.z)
        }
        endShape()
    }

    angleX += 0.005
    angleY += 0.006
}
