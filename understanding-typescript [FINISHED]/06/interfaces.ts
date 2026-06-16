interface Authenticatable {
    email: string
    password: string

    login(): void
    logout(): void
}

interface AuthenticatableAdmin extends Authenticatable {
    role: 'admin' | 'superadmin'
}

class AuthenticatableUser implements Authenticatable {
    constructor(
        public userName: string,
        public email: string,
        public password: string,
    ) {}

    login() {}

    logout() {}
}

function authenticate(user: Authenticatable) {}

// interface Authenticatable {
//     role: string
// }

let user: Authenticatable

user = {
    email: 'email123@fjkd.com',
    password: 'abc1',
    role: 'role',

    login() {},

    logout() {},
}
