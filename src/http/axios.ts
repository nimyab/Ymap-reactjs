import Axios from "axios";
import userStore from "../store/userStore";

const axios = Axios.create({
    baseURL: "localhost:8000/api",
    withCredentials: true,
});

axios.interceptors.request.use((config) => {
    config.headers.Authorization = `Bearer ${localStorage.getItem(
        "accessToken"
    )}`;
    return config;
});

axios.interceptors.response.use(
    (config) => config,
    async (error) => {
        const originalConfig = error.config;
        //обрабатываем ошибку авторизации
        if (error.response.status === 401 && !originalConfig._retry) {
            originalConfig._retry = true;
            try {
                const data = (
                    await Axios.get("http://localhost:5000/auth/refresh", {
                        withCredentials: true,
                    })
                ).data;
                localStorage.setItem("token", data.accessToken);
                originalConfig.headers.Authorization = `Bearer ${data.accessToken}`;
                return axios(originalConfig);
            } catch (error) {
                localStorage.removeItem("token");
                userStore.isAuth = false;
            }
        }
        //если что-то другое то просто пробрасываем дальше
        return Promise.reject(error);
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

    async getUser() {
        return await axios.get("/user/current");
    }
}

export default new AxiosHttp();
