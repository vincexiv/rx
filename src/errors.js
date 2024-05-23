const Rx = require("rx")

const arr = [
    '{"1": 1, "2": 2}',
    '{"success: true}', // Invalid JSON string
    '{"enabled": true}'
    ]

function getJSON(arr){
    return Rx.Observable.fromArray(arr)
        .map(item => JSON.parse(item))
        .catch(
            Rx.Observable.return({error: "Some error man"})
        )
}

const parsed = getJSON(arr)

parsed.subscribe(
    function onNext(x) { console.log(x) },
    function onError(err) { console.log("An error occurred") },
    function onCompleted() { console.log("Completed")}
)