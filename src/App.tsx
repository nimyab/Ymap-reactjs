import { Route, Routes, useNavigate } from "react-router-dom";
import Navbar from "./components/Navbar";
import MainPage from "./pages/MainPage";
import LoginPage from "./pages/LoginPage";
import RegistrationPage from "./pages/RegistrationPage";
import AdminPage from "./pages/AdminPage";
import AdminValidate from "./components/AdminValidate";
import MapPage from "./pages/MapPage";
import AuthValidate from "./components/AuthValidate";
import { useEffect, useState } from "react";
import userStore from "./store/userStore";
import "./index.css";
import Logout from "./components/Logout";

function App() {
    const [isLoading, setIsLoading] = useState(true);
    const navigate = useNavigate();
    useEffect(() => {
        userStore.getUserFromServer().then(() => {
            setIsLoading(false);
            if (userStore.isAuth) navigate("/map");
        });
    }, []);

    if (isLoading) {
        return <div className="loader"></div>;
    }
    return (
        <>
            <Routes>
                <Route path="/" element={<Navbar />}>
                    <Route index element={<MainPage />} />
                    <Route
                        path="adminPanel"
                        element={
                            <AdminValidate>
                                <AdminPage />
                            </AdminValidate>
                        }
                    />
                    <Route
                        path="map"
                        element={
                            <AuthValidate>
                                <MapPage />
                            </AuthValidate>
                        }
                    />
                </Route>
                <Route path="/auth">
                    <Route path="login" element={<LoginPage />} />
                    <Route path="registration" element={<RegistrationPage />} />
                    <Route path="logout" element={<Logout />} />
                </Route>
            </Routes>
        </>
    );
}

export default App;
