let hobbies = ['sports', 'cooking']

// hobbies.push(10)

// let users: (string | number)[]
let users: Array<string | number>

users = [1, 'Olha']
users = [5, 1]

let possibleResults: [number, number] // [1, -1]
possibleResults = [1, -1]
// possibleResults = [5, 10, 12]

let user: {
    name: string
    age: number
    hobbies: string[]
    role: {
        description: string
        id: number
    }
} = {
    name: 'Olha',
    age: 38,
    hobbies: ['sports', 'cooking'],
    role: {
        description: 'admin',
        id: 5,
    },
}

let val: {} = 'some text'
// let val: {} = null
// let val: {} = undefined

const someObj = {
    name: 'Olha',
}
let data: Record<string, number | string>

data = {
    entry1: 1,
    entry2: 'some string',
}
