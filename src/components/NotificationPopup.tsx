import notificationStore from "../store/notification";
import { observer } from "mobx-react-lite";

const NotificationPopup = observer(() => {
    return (
        <>
            <div
                className={`alert ${notificationStore.type} ${
                    notificationStore.isVisible ? "visible" : "hidden"
                }`}
            >
                {notificationStore.message}
            </div>
        </>
    );
});

export default NotificationPopup;
