function iterateOnMultiples(arr, divisor){
    this.cursor = 0
    this.array = arr
    this.divisor = divisor || 0
}

iterateOnMultiples.prototype.next = function(){
    while(this.cursor < this.array.length){
        const val = this.array[this.cursor++]
        if(val % this.divisor === 0){
            return val
        }
    }
}

iterateOnMultiples.prototype.hasNext = function(){
    let cur = this.cursor
    while(cur < this.array.length){
        const val = this.array[cur++]
        if(val % this.divisor === 0){
            return true
        }
    }

    return false
}

const myArr = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
const consumer = new iterateOnMultiples(myArr, 3)

console.log(consumer.next(), consumer.hasNext()); // 3 true
console.log(consumer.next(), consumer.hasNext()); // 6 true
console.log(consumer.next(), consumer.hasNext()); // 9 false