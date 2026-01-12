const globe = []
let total = 20
let r = 200
let angleX = 0
let angleY = 0

function setup() {
    createCanvas(600, 600, WEBGL)
    noFill()
    strokeWeight(2)
    stroke(200)

    for (let i = 0; i < total + 1; i++) {
        globe[i] = []
        let lat = map(i, 0, total, 0, PI)
        for (let j = 0; j < 100; j++) {
            let lon = map(j, 0, total, 0, TWO_PI)
            let x = r * sin(lon) * cos(lat)
            let y = r * sin(lon) * sin(lat)
            let z = r * cos(lon)
            // stroke(255)
            // point(x, y, z)
            globe[i][j] = createVector(x, y, z)
        }
    }
}

function draw() {
    background(0)
    rotateX(angleX)
    rotateY(angleY)

    for (let i = 0; i < total; i++) {
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
