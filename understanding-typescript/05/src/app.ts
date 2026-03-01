// const userName = 'Olha'
// // userName = "OOlha"
// let age = 30
// age = 29

// function add(a: number, b: number) {
//     var result = a + b
//     return result
// }

// console.log(result)

// if (age > 20) {
//     var isOld = true
// }

// // console.log(isOld)

// const add = (a: number, b: number = 1) => a + b

// console.log(add(2, 5))

// const printOutput: (a: number | string) => void = output => console.log(output)

// const button = document.querySelector('button')

// if (button) {
//     button.addEventListener('click', event => console.log(event))
// }

// console.log(add(5))

const hobbies = ['sports', 'cooking']
// const activeHobbies = ['Hiking']

// activeHobbies.push(...hobbies)

const person = {
    firstName: 'Olha',
    age: 28,
}

// const copiedPerson = { ...person }

const add = (...numbers: number[]) => {
    return numbers.reduce((curResult, curValue) => curResult + curValue, 0)
}

const addedNumbers = add(5, 10, 2, 3.7)
console.log(addedNumbers)

const [hobb1, hobby2, ...remainingHobbies] = hobbies

const { firstName: userName, age } = person

console.log(userName, age)
