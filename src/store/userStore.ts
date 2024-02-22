import { makeAutoObservable } from "mobx";
import { User } from "../utils/types";
import AxiosHttp from "../http/axios";

class UserStore {
    user = {} as User;
    isAuth = false;

    constructor() {
        makeAutoObservable(this);
    }

    async login(login: string, password: string) {
        try {
            const dataUser = await AxiosHttp.login(login, password);
            const user = dataUser.data;
            localStorage.setItem("token", user.token);
            this.isAuth = true;
            this.user = user as User;
            return true;
        } catch (error) {
            return false;
        }
    }

    async registration(login: string, password: string) {
        try {
            await AxiosHttp.registration(login, password);
            return true;
        } catch (error) {
            return false;
        }
    }

    async getUserFromServer() {
        try {
            const dataUser = await AxiosHttp.getUser();
            this.isAuth = true;
            this.user = dataUser.data as User;
            return true;
        } catch (error) {
            return false;
        }
    }

    async logout() {
        try {
            await AxiosHttp.logout();
            this.user = {} as User;
            this.isAuth = false;
            localStorage.removeItem("token");
            return true;
        } catch (error) {
            return false;
        }
    }
}

export default new UserStore();
