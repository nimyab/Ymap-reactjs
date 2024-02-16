import { Navigate } from "react-router-dom";
import userStore from "../store/userStore";

const Logout = () => {
    userStore.logout();

    return <Navigate to={"/"} replace={true} />;
};

export default Logout;
