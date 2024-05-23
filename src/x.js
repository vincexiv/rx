const Rx = require('rx')

// Observables 
function p(){
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve("Promise resolved")
        }, 3000)
    })
}

const pr =  p();
pr.then(data => console.log(data))

const ob = Rx.Observable.create(function(observer){
    pr.then(data => {
        observer.onNext(data + " from observer")
    })
})

const subscription1 = ob.subscribe(
    function onNext(x) { console.log(x + " 1") }
)

const subscription2 = ob.subscribe(
    function onNext(x) { console.log(x + " 2") }
)

setTimeout(() => subscription2.dispose(), 2000)
