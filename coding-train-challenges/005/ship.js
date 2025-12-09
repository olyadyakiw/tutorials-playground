class Ship {
    constructor() {
        this.x = width / 2
        this.xdir = 0
    }

    show() {
        fill(255)
        rectMode(CENTER)
        rect(this.x, height - 20, 20, 40)
    }

    setDir(dir) {
        this.xdir = dir
    }

    move(dir) {
        this.x += this.xdir * 5
    }
}
