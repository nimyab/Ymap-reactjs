import { observer } from "mobx-react-lite";
import locationsStore from "../store/locationsStore";
import { useState } from "react";

const Locations = observer(() => {
    const locations = locationsStore.myLocations;

    const [name, setName] = useState("");
    const [latitude, setLatitude] = useState("");
    const [longitude, setLongitude] = useState("");
    function addLocation(){
        if(name.trim().length && name.trim().length && name.trim().length){}
    }

    return (
        <>
            <div className="locations-list">
                {locations.map((locations) => (
                    <div className="location-info">
                        <span>Название: {locations.name}</span>
                        <span>Широта: {locations.latitude}</span>
                        <span>Долгота: {locations.longitude}</span>
                        <div>
                            <button onClick={() => console.log("change")}>
                                Изменить
                            </button>
                            <button onClick={() => console.log("change")}>
                                Удалить
                            </button>
                        </div>
                    </div>
                ))}
            </div>
            <div className="location-input">
                <input type="text" placeholder="Название" value={name} onChange={e => setName(e.target.value)}/>
                <input type="text" placeholder="Широта" value={latitude} onChange={e => setLatitude(e.target.value)}/>
                <input type="text" placeholder="Долгота" value={longitude} onChange={e => setLongitude(e.target.value)}/>
                <button onClick={()=> addLocation()}>Добавить</button>
            </div>
        </>
    );
});

export default Locations;
