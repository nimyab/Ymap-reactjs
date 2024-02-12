import { makeAutoObservable } from "mobx";
import { MyLocation } from "../utils/types";

class MyLocations {
    myLocations = [
        {
            id: 1,
            name: "my houseaaaaaaaaaaaaaaaaaaaaaaaaa", //30 symbols
            latitude: 100.123,
            longitude: 123.1,
        },
        {
            id: 2,
            name: "my school",
            latitude: 11.123,
            longitude: 12.1,
        },
        {
            id: 3,
            name: "anything",
            latitude: 1.123,
            longitude: 13.1,
        },
    ] as MyLocation[];

    constructor() {
        makeAutoObservable(this);
    }

    async addLoction(loc: MyLocation) {
        this.myLocations.push(loc);
    }
}

export default new MyLocations();
