import { observer } from "mobx-react-lite";
import "../index.css";
import LoginInput from "../components/LoginInput";
import userStore from "../store/userStore";
import { Link, useNavigate } from "react-router-dom";
import notification from "../store/notification";

const LoginPage = observer(() => {
    const navigate = useNavigate();

    async function login(login: string, password: string) {
        userStore.login(login, password).then((flag) => {
            if (!flag) {
                notification.setNotification("Неверные данные", "error");
                return;
            }
            notification.setNotification('Вход успешно совешён', 'success');
            navigate("/map", { replace: true });
        });
    }

    return (
        <>
            <div className="login-page">
                <LoginInput userLogin={login} text="Войти" />
                <Link to={"/auth/registration"}>Зарегистрироваться</Link>
            </div>
        </>
    );
});

export default LoginPage;
