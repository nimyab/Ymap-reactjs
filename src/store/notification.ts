import { makeAutoObservable } from "mobx";

class NotificationStore {
    isVisible = false;
    type = "";
    message = "";

    constructor() {
        makeAutoObservable(this);
    }

    setNotification(message: string, type: string) {
        this.isVisible = true;
        this.type = type;
        this.message = message;

        setTimeout(() => {
            this.isVisible = false;
        }, 3500);
    }
}

export default new NotificationStore();
