import { Link, Outlet } from "react-router-dom";
import userStore from "../store/userStore";

const Navbar = () => {
    const isAuth = userStore.isAuth;
    const userRole = userStore.user.role;

    return (
        <>
            <header>
                <Link to={"/"}>Главная</Link>
                {isAuth ? <Link to={"/map"}>Карта</Link> : null}
                {isAuth && userRole === "ADMIN" ? (
                    <Link to={"/adminPanel"}>Админская панель</Link>
                ) : null}
                {!isAuth ? <Link to={"/auth/login"}>Вход</Link> : <Link to={'/auth/logout'}>Выход</Link>}
            </header>
            <main>
                <Outlet />
            </main>
        </>
    );
};

export default Navbar;
