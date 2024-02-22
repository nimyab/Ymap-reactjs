import { Link, useNavigate } from "react-router-dom";
import LoginInput from "../components/LoginInput";
import "../index.css";
import userStore from "../store/userStore";
import notification from "../store/notification";

const RegistrationPage = () => {
    const navigate = useNavigate();

    async function registration(login: string, password: string) {
        userStore.registration(login, password).then((flag) => {
            if (!flag) {
                notification.setNotification("Неверные данные, либо такой пользователь уже есть", "error");
                return;
            }
            notification.setNotification("Успешная регистрация", "success");
            navigate("/auth/login", { replace: true });
        });
    }

    return (
        <>
            <div className="login-page">
                <LoginInput userLogin={registration} text="Регистрация" />
                <Link to={"/auth/login"}>Залогиниться</Link>
            </div>
        </>
    );
};

export default RegistrationPage;
