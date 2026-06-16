type User = { name: string; age: number }
type UserKeys = keyof User

let validKey: UserKeys

validKey = 'name'
validKey = 'age'

function getProp<T extends object, U extends keyof T>(obj: T, key: U) {
    const val = obj[key]
    if (val === undefined || val === null) {
        throw new Error('Accessing undedined or null value')
    }

    return val
}

const data = { id: 1, isStored: false, values: [1, -5, 10] }

const user = { name: 'Max', age: 35 }

const val = getProp(user, 'age')
