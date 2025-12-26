class Branch {
    constructor(parent, pos, dir) {
        this.pos = pos
        this.parent = parent
        this.dir = dir
        this.origDir = dir.copy()
        this.count = 0
        this.len = 5

        this.reset = function () {
            this.dir = this.origDir.copy()
            this.count = 0
        }
    }

    next() {
        let nextDir = p5.Vector.mult(this.dir, this.len)
        let nextPos = p5.Vector.add(this.pos, this.dir)
        let nextBranch = new Branch(this, nextPos, this.dir.copy())

        return nextBranch
    }

    show() {
        if (this.parent != null) {
            stroke(255)
            strokeWeight(5)
            line(this.pos.x, this.pos.y, this.parent.pos.x, this.parent.pos.y)
        }
    }
}
