class StorageService {
    constructor () {

    }

    save = (key, value) => {
        const existingItem = localStorage.getItem(key);
        if (existingItem) throw Error("Key already exist");

        value = typeof value == "object" ? JSON.stringify(value) : value;
        localStorage.setItem(key, JSON.stringify(value))
    }

    retrieve = (key) => {
        return JSON.parse(localStorage.getItem(key))
    }

    remove = (key) => {
        localStorage.removeItem(key);
    }
}