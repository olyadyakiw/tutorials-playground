type DataStore = {
    [prop: string]: boolean
}

let someObj: Record<string, number | boolean>

let store: DataStore = {}

store.id = true

let roles = ['admin', 'editor', 'user'] as const
// roles.push('max')
const firstRole = roles[0]

let dataEntries = {
    entry1: 0.51,
    entry2: -1.23,
} satisfies Record<string, number>
