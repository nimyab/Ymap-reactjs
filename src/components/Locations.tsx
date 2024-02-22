import { useState } from "react";
import { MyLocation } from "../utils/types";
import notification from "../store/notification";

type LocationsProps = {
    locations: MyLocation[];
    addLoc: (name: string, latitude: number, setLongitude: number) => void;
    updateLoc: (data: MyLocation) => void;
    deleteLoc: (id: number) => void;
    setUserLocation: any;
};

const Locations = ({ ...props }: LocationsProps) => {
    const locations = props.locations;

    const [textButton, setTextButton] = useState("Добавить");
    const [id, setId] = useState<number>();
    const [name, setName] = useState("");
    const [latitude, setLatitude] = useState<number>(0);
    const [longitude, setLongitude] = useState<number>(0);
    function addLocation() {
        if (
            name.trim().length &&
            -90 <= latitude &&
            latitude <= 90 &&
            -180 <= longitude &&
            longitude <= 180
        ) {
            props.addLoc(name, latitude, longitude);
        } else notification.setNotification("Неверные данные", "error");
        setName("");
        setLatitude(0);
        setLongitude(0);
    }

    function updateLocation() {
        if (
            name.trim().length &&
            -90 <= latitude &&
            latitude <= 90 &&
            -180 <= longitude &&
            longitude <= 180
        ) {
            props.updateLoc({
                id,
                latitude,
                longitude,
                name,
            } as MyLocation);
        } else notification.setNotification("Неверные данные", "error");
        setName("");
        setLatitude(0);
        setLongitude(0);
        setTextButton("Добавить");
    }

    function updateModLocation(location: MyLocation) {
        setTextButton("Изменить");
        setId(location.id);
        setName(location.name);
        setLatitude(location.latitude);
        setLongitude(location.longitude);
    }

    return (
        <>
            <div className="locations-list">
                {locations.map((location) => (
                    <div className="location-info" key={location.id}>
                        <span>Название: {location.name}</span>
                        <span>Широта: {location.latitude}</span>
                        <span>Долгота: {location.longitude}</span>
                        <div>
                            <button onClick={() => updateModLocation(location)}>
                                Изменить
                            </button>
                            <button
                                onClick={() => props.deleteLoc(location.id)}
                            >
                                Удалить
                            </button>
                            <button
                                onClick={() =>
                                    props.setUserLocation([
                                        location.latitude,
                                        location.longitude,
                                    ])
                                }
                            >
                                К локации
                            </button>
                        </div>
                    </div>
                ))}
            </div>
            <div className="location-input">
                <input
                    type="text"
                    placeholder="Название"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                />
                <input
                    type="text"
                    placeholder="Широта"
                    value={latitude}
                    onChange={(e) => setLatitude(Number(e.target.value))}
                />
                <input
                    type="text"
                    placeholder="Долгота"
                    value={longitude}
                    onChange={(e) => setLongitude(Number(e.target.value))}
                />
                <button
                    onClick={() => {
                        if (textButton === "Добавить") {
                            addLocation();
                        } else {
                            updateLocation();
                        }
                    }}
                >
                    {textButton}
                </button>
            </div>
        </>
    );
};

export default Locations;
