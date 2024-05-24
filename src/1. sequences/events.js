const Rx = require('rx')

const allMoves = Rx.Observable.fromEvent(document, 'mousemove')
allMoves.subscribe(
    function onNext(e) { console.log(e)}
)

var fs = require('fs'); // Load Node.js Filesystem module
// Create an Observable from the readdir method
var readdir = Rx.Observable.fromNodeCallback(fs.readdir);
// Send a delayed message
var source = readdir('/');
var subscription = source.subscribe(
    function(res) { console.log('List of directories: ' + res); },
    function(err) { console.log('Error: ' + err) }
)