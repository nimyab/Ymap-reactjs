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
        const dataUser = await AxiosHttp.login(login, password);
        if (dataUser.status === 200) {
            const user = dataUser.data;
            localStorage.setItem("token", user.token);
            this.isAuth = true;
            this.user = {
                id: user.id,
                login: user.login,
                role: user.role,
            };
        } else {
            window.alert(`error ${dataUser.data.message}`);
        }
    }

    async registration(login: string, password: string) {
        const dataUser = await AxiosHttp.registration(login, password);
        window.alert(dataUser.data.message);
    }

    async getUserFromServer() {
        const dataUser = await AxiosHttp.getUser();
        if (dataUser.status === 200) {
            const user = dataUser.data;
            this.isAuth = true;
            this.user = {
                id: user.id,
                login: user.login,
                role: user.role,
            };
        }
    }

    async logout() {
        const dataUser = await AxiosHttp.logout();
        if (dataUser.status === 200) {
            this.user = {} as User;
            this.isAuth = false;
            localStorage.removeItem("token");
        }
    }
}

export default new UserStore();
