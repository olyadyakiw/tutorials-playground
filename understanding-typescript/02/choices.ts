// enum Role {
//     Admin,
//     Editor,
//     Guest,
// }

type Role = 'admin' | 'editor' | 'guest' | 'reader'
type User = {
    name: string
    age: number
    role: Role
    permissions: string[]
}

let userRole: Role = 'admin'

// let userRole: Role = Role.Admin
userRole = 'guest'

let possibleResults: [1 | -1, number]
possibleResults = [1, -1]

function access(role: Role) {}
