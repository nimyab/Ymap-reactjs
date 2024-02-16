import { Link, useNavigate } from "react-router-dom";
import LoginInput from "../components/LoginInput";
import "../index.css";
import userStore from "../store/userStore";

const RegistrationPage = () => {
    const navigate = useNavigate();

    async function registration(login: string, password: string) {
        await userStore.registration(login, password);
        navigate("/auth/login", { replace: true });
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
