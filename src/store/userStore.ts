import { makeAutoObservable } from "mobx";
import { User } from "../utils/types";
import AxiosHttp from "../http/axios";

class UserStore {
    user = {
        id: 1,
        login: "user_login",
        role: "ADMIN",
    } as User;
    isAuth = true;

    constructor() {
        makeAutoObservable(this);
    }

    async login(login: string, password: string) {
        const dataUser = (await AxiosHttp.login(login, password)).data;
        console.log(dataUser);
    }

    async registration(login: string, password: string) {
        const dataUser = (await AxiosHttp.registration(login, password)).data;
        console.log(dataUser);
    }

    async getUserFromServer() {
        const dataUser = (await AxiosHttp.getUser()).data;
        console.log(dataUser);
    }
}

export default new UserStore();
