class Producer {
    listeners = []
}

Producer.prototype.add = function(listener){
    this.listeners.push(listener)
}

Producer.prototype.remove = function(listener){
    const index = this.listeners.indexOf(listener)
    this.listeners.splice(index, 1)
}

Producer.prototype.notify = function(message){
    this.listeners.forEach(listener => {
        listener.update(message)
    })
}

const listener1 = {
    update: function(message){
        console.log("Listener 1 received: ", message)
    }
}

const listener2 = {
    update: function(message){
        console.log("Listener 2 received: ", message)
    }
}

const notifier = new Producer()
notifier.add(listener1)
notifier.add(listener2)

notifier.notify('Hello world!')