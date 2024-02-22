import { Navigate } from "react-router-dom";
import userStore from "../store/userStore";
import notification from "../store/notification";

const Logout = () => {
    userStore.logout().then(()=>{
        notification.setNotification('Вы успешно вышли', 'success');
    })

    return <Navigate to={"/"} replace={true} />;
};

export default Logout;
