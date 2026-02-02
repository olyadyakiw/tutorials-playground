let cities = []
let totalCities = 5
let popSize = 10
let population = []
let fitness = []

let recordDistance = Infinity
let bestEver

function setup() {
    createCanvas(600, 600)
    let order = []
    for (let i = 0; i < totalCities; i++) {
        let v = createVector(random(width), random(height / 2))
        cities[i] = v
        order[i] = i
    }

    for (let i = 0; i < popSize; i++) {
        population[i] = shuffle(order)
    }

    // let d = calcDistance(cities, order)
    // recordDistance = d
    // bestEver = order.slice()

    // totalPermutations = factorial(totalCities)
    // console.log(totalPermutations)
}

function draw() {
    background(0)

    calculateFitness()
    normalizeFitness()
    nextGeneration()

    stroke(255, 255, 255)
    strokeWeight(4)
    noFill()
    beginShape()
    for (let i = 0; i < bestEver.length; i++) {
        let n = bestEver[i]
        vertex(cities[n].x, cities[n].y)
    }
    endShape()
}

// function shuffle(a, num) {
//     for (let i = 0; i < num; i++) {
//         let indexA = floor(random(a.length))
//         let indexB = floor(random(a.length))
//         swap(a, indexA, indexB)
//     }
// }

function swap(a, i, j) {
    let temp = a[i]
    a[i] = a[j]
    a[j] = temp
}

function calcDistance(points, order) {
    let sum = 0
    for (let i = 0; i < order.length - 1; i++) {
        let cityAIndex = order[i]
        let cityA = points[cityAIndex]

        let cityBIndex = order[i + 1]
        let cityB = points[cityBIndex]

        let d = dist(cityA.x, cityA.y, cityB.x, cityB.y)
        sum += d
    }
    return sum
}
