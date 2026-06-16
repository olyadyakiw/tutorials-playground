class User {
    protected _firstName: string = ''
    private _lastName: string = ''

    set firstName(name: string) {
        if (name.trim() === '') {
            throw new Error('Invalid name')
        }
        this._firstName = name
    }

    set lastName(name: string) {
        if (name.trim() === '') {
            throw new Error('Invalid name')
        }
        this._lastName = name
    }

    get fullName() {
        return this._firstName + ' ' + this._lastName
    }

    static eid = 'USER'

    static greet() {
        console.log('Hello!')
    }
}

console.log(User.eid)
User.greet()

const max = new User()
max.firstName = 'max'
max.lastName = 'surname'
console.log(max.fullName)

class Employee extends User {
    constructor(public jobTitle: string) {
        super()
    }

    work() {}
}

abstract class UIElement {
    constructor(public identifier: string) {}

    clone(targetLocation: string) {}
}

class SideDrawerElement extends UIElement {
    constructor(
        public indentifier: string,
        public position: 'left' | 'right',
    ) {
        super(indentifier)
    }
}
