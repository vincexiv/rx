const Rx = require('rx')

function get(url){
    return Rx.Observable.create(function(observer){
        fetch(url)
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
        }).catch(error => {
            observer.onError(error)
        })
    })
}

const test = get('https://catfact.ninja/fact')
test.subscribe(
    function onNext(x){ console.log("Next " + JSON.stringify(x))},
    function onCompleted() { console.log("Completed")},
    function onError(error) { console.log("Error " + JSON.stringify(error))}
)

console.log("\n\n")
// Another way for DOM (There's always an operator with Rx)
Rx.Request.get('https://catfact.ninja/fact').subscribe(
    function onNext(x) { console.log(JSON.stringify(x))},
    function onError(error) { console.log(JSON.stringify(error)) },
    function onCompleted() { console.log("Completed")}
)
