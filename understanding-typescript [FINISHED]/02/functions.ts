function add(a: number, b: number) {
    return a + b
}

function log(message: string): void {
    console.log(message)
}

function logAndThrow(errorMessage: string): never {
    console.log(errorMessage)
    throw new Error(errorMessage)
}

function performJob(cb: (msg: string) => void) {
    cb('Job done!')
}

performJob(log)

type User = {
    name: string
    age: number
    greet: () => string
}

let user: User = {
    name: 'Olha',
    age: 28,
    greet() {
        console.log('hello')
        return this.name
    },
}

user.greet()
