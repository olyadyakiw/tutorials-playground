let cols = 100
let rows = 100
let grid = new Array(cols)

let openSet = []
let closedSet = []
let start
let end
let w, h
let path = []

function removeFromArray(arr, el) {
    for (let i = arr.length - 1; i >= 0; i--) {
        if (arr[i] === el) {
            arr.splice(i, 1)
        }
    }
}

function heuristic(a, b) {
    let d = dist(a.i, a.j, b.i, b.j)
    // let d = abs(a.i - b.i) + abs(a.j - b.j)
    return d
}

class Spot {
    constructor(i, j) {
        this.i = i
        this.j = j
        this.f = 0
        this.g = 0
        this.h = 0
        this.neighbours = []
        this.previous = undefined
        this.wall = false

        if (random(1) < 0.4) {
            this.wall = true
        }
    }

    show(col) {
        fill(col)
        if (this.wall) {
            fill(112, 50, 126)
            noStroke()
            ellipse(this.i * w + w / 2, this.j * h + h / 2, w / 2, h / 2)
        } else if (col) {
            fill(col)
            rect(this.i * w, this.j * h, w, h)
        }
    }

    addNeighbours(grid) {
        let i = this.i
        let j = this.j
        if (i < cols - 1) {
            this.neighbours.push(grid[i + 1][j])
        }
        if (i > 0) {
            this.neighbours.push(grid[i - 1][j])
        }
        if (j < rows - 1) {
            this.neighbours.push(grid[i][j + 1])
        }
        if (j > 0) {
            this.neighbours.push(grid[i][j - 1])
        }
        if (i > 0 && j > 0) {
            this.neighbours.push(grid[i - 1][j - 1])
        }
        if (i < cols - 1 && j > 0) {
            this.neighbours.push(grid[i + 1][j - 1])
        }
        if (i > 0 && j < rows - 1) {
            this.neighbours.push(grid[i - 1][j + 1])
        }
        if (i < cols - 1 && j < rows - 1) {
            this.neighbours.push(grid[i + 1][j + 1])
        }
    }
}

function setup() {
    createCanvas(400, 400)

    w = width / cols
    h = height / rows

    for (let i = 0; i < cols; i++) {
        grid[i] = new Array(rows)
    }

    for (let i = 0; i < cols; i++) {
        for (let j = 0; j < rows; j++) {
            grid[i][j] = new Spot(i, j)
        }
    }

    for (let i = 0; i < cols; i++) {
        for (let j = 0; j < rows; j++) {
            grid[i][j].addNeighbours(grid)
        }
    }

    start = grid[0][0]
    end = grid[cols - 1][rows - 1]
    start.wall = false
    end.wall = false

    openSet.push(start)
}

function draw() {
    if (openSet.length > 0) {
        let winner = 0
        for (let i = 0; i < openSet.length; i++) {
            if (openSet[i].f < openSet[winner].f) {
                winner = i
            }
        }

        var current = openSet[winner]

        if (openSet[winner] === end) {
            noLoop()
            console.log('done')
        }

        removeFromArray(openSet, current)
        closedSet.push(current)

        let neighbours = current.neighbours
        for (let i = 0; i < neighbours.length; i++) {
            let neigbour = neighbours[i]
            if (!closedSet.includes(neigbour) && !neigbour.wall) {
                let tempG = current.g + 1

                let newPath = false
                if (openSet.includes(neigbour)) {
                    if (tempG < neigbour.g) {
                        neigbour.g = tempG
                        newPath = true
                    }
                } else {
                    neigbour.g = tempG
                    newPath = true
                    openSet.push(neigbour)
                }
                if (newPath) {
                    neigbour.h = heuristic(neigbour, end)
                    neigbour.f = neigbour.g + neigbour.h
                    neigbour.previous = current
                }
            }
        }
    } else {
        console.log('no solution')
        noLoop()
        return
    }

    background(255)

    for (let i = 0; i < cols; i++) {
        for (let j = 0; j < rows; j++) {
            grid[i][j].show(color(255))
        }
    }

    // for (let i = 0; i < closedSet.length; i++) {
    //     closedSet[i].show(color(255, 0, 0))
    // }

    // for (let i = 0; i < openSet.length; i++) {
    //     openSet[i].show(color(0, 255, 0))
    // }

    path = []
    let temp = current
    path.push(temp)
    while (temp.previous) {
        path.push(temp.previous)
        temp = temp.previous
    }

    for (let i = 0; i < path.length; i++) {
        // path[i].show(color(0, 0, 255))
    }

    noFill()
    stroke(255, 0, 200)
    strokeWeight(w / 2)
    beginShape()
    for (let i = 0; i < path.length; i++) {
        vertex(path[i].i * w, path[i].j * h)
    }
    endShape()
}
