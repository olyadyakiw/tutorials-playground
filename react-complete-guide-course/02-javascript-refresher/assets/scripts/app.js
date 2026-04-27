// import { apiKEY } from './util.js'
// import apiKEY from './util.js'
// import * as util from './util.js'

// console.log(apiKEY)
// console.log(util.apiKey)

// let userMessage = 'hello world'
// console.log(userMessage)

// const userMessage = 'hello world'
// userMessage = 'new value'

// console.log(10 === 10)
// console.log(10 === 5)

// function createGreeting(userName, message) {
//     // console.log(userName, message)
//     return 'hi I am' + userName + '.' + message
// }

// const greeting = createGreeting('ol', 'hello')
// console.log(greeting)

// export default function(userName, message) {
//     return 'hi I am' + userName + '.' + message
// }

// Exercices

// function combine(a, b, c) {
//     return (a * b) / c
// }

// describe('combine() function', function () {
//     it('be callable', function () {
//         expect(() => combine()).not.toThrow()
//     })
//     it('return the correct result', function () {
//         const result = combine(2, 10, 2)
//         expect(result).toBe(10)
//     })
// })

// const user = {
//     name: 'Olha',
//     age: 28,
//     greet() {
//         console.log('hello')
//         console.log(this.age)
//     },
// }
// console.log(user.name)
// user.greet()

// class User {
//     constructor(name, age) {
//         this.name = name
//         this.age = age
//     }
//     greet() {
//         console.log('hi')
//     }
// }

// const user1 = new User('man', 45)
// console.log(user1)
// user1.greet()

// const hobbies = ['sports', 'cooking', 'reading']
// console.log(hobbies[0])

// hobbies.push('working')
// console.log(hobbies)

// const index = hobbies.findIndex(item => {
//     return item === 'sports'
// })

// console.log(index)

// const editedHobbies = hobbies.map(item => item + '!')
// console.log(editedHobbies)

// const [firstName, lastName] = ['Olha', 'Diakiv']

// // const firstName = userNameData[0]
// // const lastName = userNameData[1]
// console.log(firstName)

// const { name: userName, age } = {
//     name: 'Olha',
//     age: 28,
// }

// function transformToObjects(arr) {
//     return arr.map(item => ({ val: item }))
// }
// const data = transformToObjects([1, 2, 3])
// console.log(data)

// const hobbies = ['sports', 'cooking', 'reading']
// const user = {
//     name: 'Olha',
//     age: 28,
// }
// const newHobbies = 'writing'
// const mergedHobbies = [...hobbies, ...newHobbies]
// console.log(mergedHobbies)

// const extendedUser = {
//     isAdmin: true,
//     ...user,
// }
// console.log(extendedUser)

// const password = prompt('Your password')

// if (password === 10) {
//     console.log(10)
// } else if (password === 5) {
//     console.log(5)
// } else {
//     console.log('wrong')
// }

// const hobbies = ['sports', 'cooking', 'reading']
// for (const hobby of hobbies) {
//     console.log(hobby)
// }

// function handleTimeout() {
//     console.log('times out')
// }

// const handleTimeout2 = () => {
//     console.log('times out again')
// }

// setTimeout(handleTimeout, 2000)
// setTimeout(handleTimeout2, 3000)

// function greeter(greetFn) {
//     greetFn()
// }

// greeter(() => console.log('hi'))

// function init() {
//     function greet() {
//         console.log('hi')
//     }

//     greet()
// }

// init()

// let userMessage = 'hello'
// userMessage = 'hello there'

// const hobbies = ['sports', 'cooking', 'reading']
// hobbies.push('working')
// console.log(hobbies)

