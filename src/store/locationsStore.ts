import { makeAutoObservable } from "mobx";
import { MyLocation } from "../utils/types";
import AxiosHttp from "../http/axios";
import axios from "../http/axios";

class MyLocations {
    myLocations = [] as MyLocation[];

    constructor() {
        makeAutoObservable(this);
    }

    async addLocation(name: string, latitude: number, longitude: number) {
        const locData = await AxiosHttp.addLocation(name, latitude, longitude);
        console.log(locData);
        if (locData.status === 200) {
            const location = locData.data;
            this.myLocations = [
                ...this.myLocations,
                {
                    id: location.id,
                    name: location.name,
                    latitude: location.latitude,
                    longitude: location.longitude,
                } as MyLocation,
            ];
        }
    }

    async updateLocation(data: MyLocation) {
        const locData = await axios.updateLocation(data);
        console.log(locData);
        if (locData.status === 200) {
            const updatedLocation = locData.data;
            const newLocation = this.myLocations.map((loc) => {
                if (loc.id === updatedLocation.id) {
                    return {
                        id: updatedLocation.id,
                        name: updatedLocation.name,
                        latitude: updatedLocation.latitude,
                        longitude: updatedLocation.longitude,
                    } as MyLocation;
                }
                return loc;
            });
            this.myLocations = [...newLocation];
        }
    }

    async deleteLocation(id: number) {
        const locData = await axios.deleteLocation(id);
        console.log(locData);
        if (locData.status === 200) {
            this.myLocations = this.myLocations.filter((loc) => loc.id != id);
        }
    }

    async getAllLocation() {
        const locData = await AxiosHttp.getAllLocation();
        if (locData.status === 200) {
            const locations = locData.data;
            this.myLocations = locations.map((location: any) => {
                return {
                    id: location.id,
                    name: location.name,
                    latitude: location.latitude,
                    longitude: location.longitude,
                } as MyLocation;
            });
        }
    }
}

export default new MyLocations();
