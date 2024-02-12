import { Route, Routes, useNavigate } from "react-router-dom";
import Navbar from "./components/Navbar";
import MainPage from "./pages/MainPage";
import LoginPage from "./pages/LoginPage";
import RegistrationPage from "./pages/RegistrationPage";
import AdminPage from "./pages/AdminPage";
import AdminValidate from "./components/AdminValidate";
import MapPage from "./pages/MapPage";
import AuthValidate from "./components/AuthValidate";
import { useEffect } from "react";
import userStore from "./store/userStore";

function App() {
    const navigate = useNavigate()
    useEffect(() => {
        userStore.getUserFromServer();
        if(userStore.isAuth) navigate('/map');
    }, []);

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
                </Route>
            </Routes>
        </>
    );
}

export default App;
