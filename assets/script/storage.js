class StorageService {
    constructor () {
        this.showAlert = new ShowAlert();
    }

    save = (key, value) => {
        
        try {
            // const existingItem = localStorage.getItem(key);
            // if (existingItem) throw Error("Key already exist");
    
            value = typeof value == "object" ? JSON.stringify(value) : value;
            localStorage.setItem(key, value);
        } catch (error) {
            this.showAlert.error("We encountered some issues while saving your blog");
        }
    }

    retrieve = (key) => {

        return JSON.parse(localStorage.getItem(key));
    }

    remove = (key) => {
        localStorage.removeItem(key);
    }
}


