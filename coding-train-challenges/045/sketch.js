let database

let drawing = []
let currentPath = []
let isDrawing = false

function setup() {
    canvas = createCanvas(200, 200)

    canvas.mousePressed(startPath)
    canvas.parent('canvascontainer')
    canvas.mouseReleased(endPath)

    let saveButton = select('#saveButton')
    saveButton.mousePressed(saveDrawing)

    let clearButton = select('#clearButton')
    clearButton.mousePressed(clearDrawing)

    const config = {
        apiKey: 'AIzaSyDIEGhss6P1_F54FtWStaexVcaZlTqIUv0',
        authDomain: 'drawing-canvas-987f0.firebaseapp.com',
        projectId: 'drawing-canvas-987f0',
        storageBucket: 'drawing-canvas-987f0.firebasestorage.app',
        messagingSenderId: '551839301476',
        appId: '1:551839301476:web:d25eeace45dab274b00471',
        measurementId: 'G-FD8TEKR1EJ',
        databaseURL: 'https://drawing-canvas-987f0-default-rtdb.firebaseio.com',
    }
    firebase.initializeApp(config)
    database = firebase.database()

    let params = getURLParams()
    console.log(params)
    if (params.id) {
        console.log(params.id)
        showDrawing(params.id)
    }

    let ref = database.ref('drawings')
    ref.on('value', gotData, errData)
}

function startPath() {
    isDrawing = true
    currentPath = []
    drawing.push(currentPath)
}

function endPath() {
    isDrawing = false
}

function draw() {
    background(0)

    if (isDrawing) {
        let point = {
            x: mouseX,
            y: mouseY,
        }
        currentPath.push(point)
    }

    stroke(255)
    strokeWeight(4)
    noFill()
    for (let i = 0; i < drawing.length; i++) {
        let path = drawing[i]
        beginShape()
        for (let j = 0; j < path.length; j++) {
            vertex(path[j].x, path[j].y)
        }
        endShape()
    }
}

function saveDrawing() {
    let ref = database.ref('drawings')
    let data = {
        name: 'Ol',
        drawing: drawing,
    }
    let result = ref.push(data, dataSent)
    console.log(result.key)

    function dataSent(err, status) {
        console.log(status)
    }
}

function gotData(data) {
    let elts = selectAll('.listing')
    for (let i = 0; i < elts.length; i++) {
        elts[i].remove()
    }

    let drawings = data.val()
    let keys = Object.keys(drawings)
    for (let i = 0; i < keys.length; i++) {
        let key = keys[i]
        let li = createElement('li', '')
        li.class('listing')
        let ahref = createA('#', key)
        ahref.mousePressed(showDrawing)
        ahref.parent(li)

        let perma = createA('?id=' + key, 'permalink')
        perma.parent(li)
        perma.style('padding', '4px')

        li.parent('drawinglist')
    }
}

function errData(err) {
    console.log(err)
}

function showDrawing(key) {
    if (key instanceof MouseEvent) {
        key = this.html()
    }

    var ref = database.ref('drawings/' + key)
    ref.once('value', oneDrawing, errData)

    function oneDrawing(data) {
        var dbdrawing = data.val()
        drawing = dbdrawing.drawing
    }
}

function clearDrawing() {
    drawing = []
}

function saveDrawing() {
    let ref = database.ref('drawings')
    let data = {
        name: 'Ol',
        drawing: drawing,
    }
    let result = ref.push(data, dataSent)
    console.log(result.key)

    function dataSent(status) {
        console.log(status)
    }
}
