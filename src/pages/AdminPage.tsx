import { useEffect, useState } from "react";
import AxiosHttp from "../http/axios";
import "../index.css";
import { User } from "../utils/types";
import notification from "../store/notification";

const AdminPage = () => {
    const [users, setUsers] = useState<User[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    useEffect(() => {
        AxiosHttp.getAllUsers()
            .then((dataUser) => {
                setIsLoading(false);
                const users = dataUser.data.map((user: any) => {
                    return user as User;
                });
                setUsers([...users]);
            })
            .catch(() => {
                notification.setNotification("Ошибка", "error");
            });
    }, []);

    // async function giveAdminRole(id: number) {
    //     AxiosHttp.giveAdminRole(id)
    //         .then(() => {
    //             const index = users.findIndex((user) => user.id === id);
    //             users[index].role = "ADMIN";
    //             setUsers([...users]);
    //         })
    //         .catch(() => {
    //             notification.setNotification("Не удалось выдать права", "error");
    //         });
    // }

    if (isLoading) {
        return (
            <div
                style={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                }}
            >
                <div className="loader"></div>
            </div>
        );
    }
    return (
        <>
            <div className="admin-page">
                <span>Админская панель</span>
                {users?.map((user) => (
                    <div className="admin-userinfo" key={user.id}>
                        <span>{user.id}</span>
                        <span>{user.login}</span>
                        <span>{user.role}</span>
                        {user.role === "ADMIN" ? (
                            <span className="admin-span">Уже админ</span>
                        ) : (
                            <span className="admin-span">Не админ</span>
                        )}
                    </div>
                ))}
            </div>
        </>
    );
};

export default AdminPage;
