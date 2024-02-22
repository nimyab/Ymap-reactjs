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
        try {
            const locData = await AxiosHttp.addLocation(
                name,
                latitude,
                longitude
            );
            const location = locData.data;
            this.myLocations = [...this.myLocations, location as MyLocation];
            return true;
        } catch (error) {
            return false;
        }
    }

    async updateLocation(data: MyLocation) {
        try {
            const locData = await axios.updateLocation(data);
            
            const updatedLocation = locData.data;
            const newLocation = this.myLocations.map((loc) => {
                if (loc.id === updatedLocation.id) {
                    return updatedLocation as MyLocation;
                }
                return loc;
            });
            this.myLocations = newLocation;
            return true;
        } catch (error) {
            return false;
        }
    }

    async deleteLocation(id: number) {
        try {
            const locData = await axios.deleteLocation(id);
            

            this.myLocations = this.myLocations.filter((loc) => loc.id != id);
            return true;
        } catch (error) {
            return false;
        }
    }

    async getAllLocation() {
        try {
            const locData = await AxiosHttp.getAllLocation();
            const locations = locData.data;
            this.myLocations = locations.map((location: any) => {
                return location as MyLocation;
            });
            return true;
        } catch (error) {
            return false;
        }
    }
}

export default new MyLocations();
