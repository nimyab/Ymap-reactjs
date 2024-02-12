import Locations from "../components/Locations";
import Map  from '../components/Map';
import "../index.css";

const MapPage = () => {
    return (
        <>
            <div className="map-page">
                <span>Мои метки</span>
                <div className="map">
                    <Map/>
                </div>
                <div className="locations">
                    <Locations></Locations>
                </div>
            </div>
        </>
    );
};

export default MapPage;
