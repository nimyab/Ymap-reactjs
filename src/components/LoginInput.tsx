import { useState } from "react";

type LoginInput = {
    userLogin: (login: string, password: string) => any;
    text: string;
};

const LoginInput = ({ userLogin, text }: LoginInput) => {
    const [login, setLogin] = useState("");
    const [password, setPassword] = useState("");

    function fnLogin() {
        if(login.trim().length !== 0 && password.trim().length !==0){
            userLogin(login, password);
            setLogin("");
            setPassword("");
        }
        else{
            setLogin("");
            setPassword("");
        }
    }

    return (
        <div className="login-form">
            <input
                type="text"
                placeholder="login"
                value={login}
                onChange={(e) => setLogin(e.target.value)}
            />
            <input
                type="password"
                placeholder="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
            />
            <button onClick={() => fnLogin()}>{text}</button>
        </div>
    );
};

export default LoginInput;
