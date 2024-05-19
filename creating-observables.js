// import Rx from 'rx'
const Rx = require('rx')

Rx.Observable.just('Hello World').subscribe(function(value){
    console.log(value)
})