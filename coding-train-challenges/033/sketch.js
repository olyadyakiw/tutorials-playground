let r = 2
let k = 30
let grid = []
let w = r / Math.sqrt(2)
let cols, rows
let active = []
let ordered = []

function setup() {
    createCanvas(400, 400)
    background(0)
    strokeWeight(4)
    colorMode(HSB)

    cols = floor(width / w)
    rows = floor(height / w)
    for (let i = 0; i < cols * rows; i++) {
        grid[i] = undefined
    }

    let x = width / 2
    let y = height / 2
    let i = floor(x / w)
    let j = floor(y / w)
    let pos = createVector(x, y)
    grid[i + j + cols] = pos
    active.push(pos)
}

function draw() {
    background(0)

    for (let total = 0; total < 25; total++) {
        if (active.length > 0) {
            let randIndex = floor(random(active.length))
            let pos = active[randIndex]
            let found = false
            for (let n = 0; n < k; n++) {
                let sample = p5.Vector.random2D()
                let m = random(r, 2 * r)
                sample.setMag(m)
                sample.add(pos)

                let col = floor(sample.x / w)
                let row = floor(sample.y / w)

                if (col > -1 && rows > -1 && col < cols && row < rows && !grid[col + row * cols]) {
                    let ok = true
                    for (let i = -1; i <= 1; i++) {
                        for (let j = -1; j <= 1; j++) {
                            let index = col + i + (row + j) * cols
                            let neighbour = grid[index]
                            if (neighbour) {
                                let d = p5.Vector.dist(sample, neighbour)
                                if (d < r) {
                                    ok = false
                                }
                            }
                        }
                    }
                    if (ok) {
                        found = true
                        grid[col + row * cols] = sample
                        active.push(sample)
                        ordered.push(sample)
                        break
                    }
                }
            }

            if (!found) {
                active.splice(randIndex, 1)
            }
        }
    }

    for (let i = 0; i < ordered.length; i++) {
        if (ordered[i]) {
            stroke(i % 360, 100, 100)
            strokeWeight(r / 2)
            point(ordered[i].x, ordered[i].y)
        }
    }

    // for (let i = 0; i < active.length; i++) {
    //     stroke(255, 0, 255)
    //     strokeWeight(1)
    //     point(active[i].x, active[i].y)
    // }
}
