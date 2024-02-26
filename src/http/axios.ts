import Axios from "axios";
import userStore from "../store/userStore";
import { MyLocation, User } from "../utils/types";

const axios = Axios.create({
    baseURL: "http://localhost:8000/api",
    withCredentials: true,
});

axios.interceptors.request.use((config) => {
    config.headers.Authorization = `Bearer ${localStorage.getItem("token")}`;
    config.headers.Accept = "application/json";
    return config;
});

axios.interceptors.response.use(
    (config) => config,
    (error) => {
        if (error.response.status === 401) {
            localStorage.removeItem("token");
            userStore.isAuth = false;
            userStore.user = {} as User;
        }
        throw error;
    }
);

class AxiosHttp {
    async login(login: string, password: string) {
        return await axios.post("/auth/login", {
            login,
            password,
        });
    }
    async registration(login: string, password: string) {
        return await axios.post("/auth/registration", {
            login,
            password,
        });
    }
    async logout() {
        return await axios.post("/auth/logout");
    }

    async getUser() {
        return await axios.get("/user/current");
    }

    async getAllUsers() {
        return await axios.get("/admin/users");
    }
    // async giveAdminRole(id: number) {
    //     return await axios.patch(`/admin/giveAdminRole/${id}`);
    // }

    async getAllLocation() {
        return await axios.get("/location/getAll");
    }
    async addLocation(name: string, latitude: number, longitude: number) {
        return await axios.post("/location/create", {
            name,
            latitude,
            longitude,
        });
    }
    async updateLocation(data: MyLocation) {
        return await axios.patch("location/update", {
            ...data,
        });
    }
    async deleteLocation(id: number) {
        return await axios.delete(`location/delete/${id}`);
    }
}

export default new AxiosHttp();
