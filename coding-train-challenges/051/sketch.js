let cols = 5
let rows = 5
let grid = new Array(cols)

let openSet = []
let closedSet = []
let start
let end
let w, h

function removeFromArray(arr, el) {
    for (let i = arr.length - 1; i >= 0; i--) {
        if ((arr[i] = el)) {
            arr.splice(i, 1)
        }
    }
}

class Spot {
    constructor(i, j) {
        this.i = i
        this.j = j
        this.f = 0
        this.g = 0
        this.h = 0
        this.neighbours = []
    }

    show(col) {
        fill(col)
        stroke(0)
        rect(this.i * w, this.j * h, w - 1, h - 1)
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

        let current = openSet[winner]

        if (openSet[winner] === end) {
            console.log('done')
        }

        removeFromArray(openSet, current)
        closedSet.push(current)
    } else {
    }

    for (let i = 0; i < cols; i++) {
        for (let j = 0; j < rows; j++) {
            grid[i][j].show(color(255))
        }
    }

    for (let i = 0; i < closedSet.length; i++) {
        closedSet[i].show(color(255, 0, 0))
    }

    for (let i = 0; i < openSet.length; i++) {
        openSet[i].show(color(0, 255, 0))
    }
}
