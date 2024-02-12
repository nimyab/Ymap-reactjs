import { Link } from "react-router-dom";
import "../index.css";

const MainPage = () => {
    
    return (
        <>
            <div className="main-page">
                <span style={{
                    fontSize: 45,
                    margin: 15
                }}>Главная страница</span>
                <span style={{
                    fontSize: 20,
                    margin: 15,
                }}>Чтобы начать пользоваться картой <Link to={'/auth/login'}>войдите</Link></span>
            </div>
        </>
    );
};

export default MainPage;
