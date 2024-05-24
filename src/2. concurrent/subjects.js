const Rx = require('rx')


// SIMPLE SUBJECT
const source = Rx.Observable.interval(300)
    .map(i => "Interval # " + i)
    .take(5)

const subject = new Rx.Subject();
source.subscribe(subject)

subject.subscribe(
    function onNext(x) { console.log("onNext: ", x)},
    function onCompleted() { console.log("Completed")}
)

subject.onNext('Our message #1')
subject.onNext('Our message #2')

setTimeout(() => {
    subject.onCompleted()
}, 1000)

// ASYNC SUBJECT
function getCatFacts(url){
    return Rx.Observable.create(observer => {
        const asyncSubject = new Rx.AsyncSubject()
        const ob = Rx.Observable.create(observer => {
            fetch(url).then(res => {
                if(res.ok){
                    res.json().then(data => {
                        observer.onNext(data)
                        observer.onCompleted()
                    })
                } else {
                    observer.onError(res)
                }
            }).catch(err => {
                observer.onError(err.message)
            })
        })
        ob.subscribe(asyncSubject)
        return asyncSubject.subscribe(observer)
    })
}

const catFacts = getCatFacts('https://catfact.ninja/fact')
catFacts.subscribe(
    function onNext(x) { console.log("Result 1: ", JSON.stringify(x))}
)

setTimeout(() => {
    catFacts.subscribe(
        function onNext(x) { console.log("Result 2: ", JSON.stringify(x))}
    )
}, 1000)


// BEHAVIOR SUBJECT
const x = Rx.Observable.create(observer => {
    const subject = new Rx.BehaviorSubject('First value')
    const obs = Rx.Observable.create(observer => {
        fetch('https://catfact.ninja/fact')
        .then(res => {
            if(res.ok){
                res.json()
                .then(data => {
                    observer.onNext(data)
                    observer.onCompleted()
                })
            } else {
                observer.onError(res)
            }
        }).catch(err => observer.onError(err.message))
    })
    obs.subscribe(subject)
    return subject.subscribe(observer)
})
x.subscribe(
    function onNext(x) { console.log(x)}
)