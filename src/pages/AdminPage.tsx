import { useEffect, useState } from "react";
import AxiosHttp from "../http/axios";
import "../index.css";
import { User } from "../utils/types";

const AdminPage = () => {
    const [users, setUsers] = useState<User[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    useEffect(() => {
        AxiosHttp.getAllUsers().then((dataUser) => {
            setIsLoading(false);
            if (dataUser.status === 200) {
                const users = dataUser.data.map((user: any) => {
                    return {
                        id: user.id,
                        login: user.login,
                        role: user.role,
                    } as User;
                });
                setUsers([...users]);
            }
        });
    }, []);

    async function giveAdminRole(id: number) {
        AxiosHttp.giveAdminRole(id).then((dataUser) => {
            if (dataUser.status === 200) {
                console.log(dataUser);
                const index = users.findIndex((user) => user.id === id);
                users[index].role = "ADMIN";
                setUsers([...users]);
            }
        });
    }

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
                            <button onClick={() => giveAdminRole(user.id)}>
                                Сделать админом
                            </button>
                        )}
                    </div>
                ))}
            </div>
        </>
    );
};

export default AdminPage;
