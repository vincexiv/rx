const Rx = require('rx')

const quakes = Rx.Observable.create(function(observer) {
        window.eqfeed_callback = function(response) {
            observer.onNext(response);
            observer.onCompleted();
        };
        loadJSONP(QUAKE_URL);
    }).flatMap(response => {
        return Rx.Observable.from(response.response.features)
    })

quakes.subscribe(function(quake) {
        const coords = quake.geometry.coordinates;
        const size = quake.properties.mag * 10000;
        L.circle([coords[1], coords[0]], size).addTo(map);
    });