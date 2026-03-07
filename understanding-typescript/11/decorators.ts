function logger<T extends new (...args: any[]) => any>(target: T, ctx: ClassDecoratorContext) {
    console.log('logger decorator')
    console.log(target)
    console.log(ctx)

    return class extends target {
        constructor(...args: any[]) {
            super(...args)
            console.log('class constructor')
            console.log(this)
        }
    }
}

function autobind(target: (...args: any[]) => any, ctx: ClassMemberDecoratorContext) {
    ctx.addInitializer(function (this: any) {
        this[ctx.name] = this[ctx.name].bind(this)
    })

    return function (this: any) {
        console.log('original function')
        target.apply(this)
    }
}

function replacer<T>(initValue: T) {
    return function replacerDecorator(target: undefined, ctx: ClassFieldDecoratorContext) {
        console.log(target)
        console.log(ctx)

        return (initalValue: any) => {
            console.log(initalValue)
            return initValue
        }
    }
}

@logger
class Person {
    @replacer('')
    name = 'Max'

    constructor() {
        this.greet = this.greet.bind(this)
    }

    @autobind
    greet() {
        console.log('hi i am ' + this.name)
    }
}

const max = new Person()
const greet = max.greet
greet()
