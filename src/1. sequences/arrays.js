const Rx = require('rx')

Rx.Observable.from([1, 2, 3, 4, 5]).subscribe(
    function onNext(x) { console.log(x) },
    function onCompleted() { console.log("Completed")}
)