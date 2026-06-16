class ListNode<T> {
    next?: ListNode<T> | undefined

    constructor(public value: T) {}
}

class LinkedList<T> {
    private root?: ListNode<T> | undefined
    private tail?: ListNode<T> | undefined
    private length = 0

    add(value: T) {
        const node = new ListNode(value)
        if (!this.root || !this.tail) {
            this.root = node
            this.tail = node
            // } else {
            //     let current = this.root
            //     while (current.next) {
            //         current = current.next
            //     }
            //     current.next = node
            // }
        } else {
            this.tail.next = node
            this.tail = node
        }
        this.length++
    }

    insertAt(value: T, pos: number) {
        if (pos > -1 && pos < this.length && this.root) {
            let current = this.root
            let index = 0
            let previous = current
            let node = new ListNode(value)

            if (pos === 0) {
                node.next = this.root
                this.root = node
            } else {
                while (index++ < pos && current.next) {
                    previous = current
                    current = current.next
                }
                node.next = current
                previous.next = node
            }
            this.length++
            return true
        } else {
            return false
        }
    }

    removeAt(pos: number) {
        if (pos > -1 && pos < this.length && this.root) {
            let current = this.root
            let previous: ListNode<T> | undefined = current
            let index = 0

            if (pos === 0) {
                this.root = current.next
                if (this.length === 1) {
                    this.tail = undefined
                }
            } else {
                while (index++ < pos && current.next) {
                    previous = current
                    current = current.next
                }

                previous.next = current.next

                if (pos === this.length - 1) {
                    this.tail = previous
                }
            }

            this.length--
            return current
        }

        return null
    }

    getNumberOfElements() {
        return this.length
    }

    print() {
        let current = this.root
        while (current) {
            console.log(current.value)
            current = current.next
        }
    }
}

const numberList = new LinkedList<number>()
const nameList = new LinkedList<string>()
