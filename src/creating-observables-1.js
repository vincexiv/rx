const Rx = require('rx')

const observable = Rx.Observable.create(observer => {
    observer.onNext('First')
    observer.onNext('Second')
    observer.onNext('Third')
    observer.onCompleted()
})

const observer = Rx.Observer.create(
    function onNext(x) { console.log("Next " + x) },
    function onError(err) { console.log("Error " + err)},
    function onCompleted() { console.log("Completed ")}
)

observable.subscribe(
    function onNext(x) { console.log("Next " + x) },
    function onError(err) { console.log("Error " + err)},
    function onCompleted() { console.log("Completed ")} 
)