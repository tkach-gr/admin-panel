class Event {
    constructor() {
        this.subscribers = [];
        this.informants = [];
    }

    subscribe(subscriber) {
        this.subscribers.push(subscriber);
    }

    notify(...args) {
        this.subscribers.map(item => item(...args))
    }

    setInformant(informant) {
        this.informants.push(informant)
    }

    getInfo() {
        let info = null;
        this.informants.map(item => info = item());
        return info;
    }
}

export default Event;