import { observer } from "mobx-react-lite";
import "../index.css";
import LoginInput from "../components/LoginInput";
import userStore from "../store/userStore";
import { Link, useNavigate } from "react-router-dom";

const LoginPage = observer(() => {
    const navigate = useNavigate();

    async function login(login: string, password: string) {
        //await userStore.login(login, password);
        window.alert('Вы вошли!');
        userStore.isAuth = true;
        console.log(login, password);
        navigate("/", { replace: true });
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
