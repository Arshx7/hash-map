class Node {
    constructor(value, key) {
        this.value = value;
        this.key = key;
        this.next = null;
    }
}

class LinkedList {
    constructor() {
        this.head = null;
    }

    append(key, value) {
        if(this.head === null) {
            this.head = new Node(value, key);
        } else {
            let currentNode = this.head;
            while(currentNode.next) {
                currentNode = currentNode.next;
            }
            currentNode.next = new Node(value, key);
        }
    }


    retrieve(key) {
        let currentNode = this.head;
        while(currentNode) {
            if(currentNode.key === key) {
                return currentNode.value;
            }
            currentNode = currentNode.next;
        }
        return null;
    }

    find(key) {
        let currentNode = this.head;
        while(currentNode) {
            if(currentNode.key === key) {
                return true;
            }
            currentNode = currentNode.next;
        }
        return false;
    }
    
    remove(key) {
        if (key === this.head.key) {
            this.head = this.head.next;
            return true;
        }
        let currentNode = this.head;
        while(currentNode.next) {
            if(currentNode.next.key === key) {
                currentNode.next = currentNode.next.next;
                return true; 

            }
            currentNode = currentNode.next;
        }
        return false;
    }
 
}
class HashMap {
    constructor() {
        this.size = 16;
        this.bucket = new Array(this.size);
        this.count = 0;
        this.loadFactor = 0.75;
        
    }

    hash(key) {
        let hashCode = 0
        const primeNumber = 47;
        for(let i = 0; i < key.length; i++) {
            hashCode = primeNumber * hashCode + key.charCodeAt(i);
        }
        return hashCode % this.size;
    }
    reHash() {
        const oldBucket = this.bucket;
        this.size *= 2;
        this.bucket = new Array(this.size);

        for(let list of oldBucket) {
            if(list) {
                let currentNode = list.head;
                while(currentNode) {
                    this.set(currentNode.key, currentNode.value);
                    currentNode = currentNode.next;
                }
            }
        }
    }

    set(key, value) {
        const index = this.hash(key);
        if(this.bucket[index] === undefined) {
            this.bucket[index] = new LinkedList();
        }
        if (this.bucket[index].find(key)) {
            
            this.bucket[index].remove(key); 
        }
        this.bucket[index].append(key, value);
        this.count++;

        if(this.count / this.size > this.loadFactor){
            this.reHash();
        }
    }

    get(key) {
        const index = this.hash(key);
        if(this.bucket[index]) {
            return this.bucket[index].retrieve(key);
        }
        return null;
        
    }

    has(key) {
        const index = this.hash(key);
        if(this.bucket[index]) {
            return this.bucket[index].find(key);
        }
        return false;
    }

    remove(key) {

        const index = this.hash(key);
        if(this.bucket[index]) {
            return this.bucket[index].remove(key);
        }
        return false
    }
    clear() {
        for (let i = 0; i < this.size; i++) {
            this.bucket[i] = undefined;
        }
    }

    keys() {
        let keys = [];
        for(const list of this.bucket){
            if(list){
                let currentNode = list.head;
                while(currentNode){
                    keys.push(currentNode.key)
                    currentNode = currentNode.next;
                }
            }
        }
        return keys;
    }

    values() {
        let values = [];
        for (const list of this.bucket) {
            if (list) {
                let currentNode = list.head;
                while (currentNode) {
                    values.push(currentNode.value);
                    currentNode = currentNode.next;
                }
            }
        }
        return values;
    }

    entries() {
        let entries = [];
        for (const list of this.bucket) {
            if (list) {
                let currentNode = list.head;
                while (currentNode) {
                    entries.push([currentNode.key, currentNode.value]);
                    currentNode = currentNode.next;
                }
            }
        }
        return entries;
    }
}

const test = new HashMap()
test.set('apple', 'red')
test.set('banana', 'yellow')
test.set('carrot', 'orange')
test.set('dog', 'brown')
test.set('elephant', 'gray')
test.set('frog', 'green')
test.set('grape', 'purple')
test.set('hat', 'black')
test.set('ice cream', 'white')
test.set('jacket', 'blue')
test.set('kite', 'pink')
test.set('lion', 'golden')
//test.set('moon', 'silver')
console.log(test.entries())