import { useState } from "react";
import { MyLocation } from "../utils/types";

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
    const [latitude, setLatitude] = useState("");
    const [longitude, setLongitude] = useState("");
    function addLocation() {
        console.log(parseFloat(latitude), latitude);
        props.addLoc(name, parseFloat(latitude), parseFloat(longitude));
        setName("");
        setLatitude("");
        setLongitude("");
    }

    function updateLocation() {
        props.updateLoc({
            id,
            latitude: parseFloat(latitude),
            longitude: parseFloat(longitude),
            name,
        } as MyLocation);
        setName("");
        setLatitude("");
        setLongitude("");
        setTextButton("Добавить");
    }

    function updateModLocation(location: MyLocation) {
        setTextButton("Изменить");
        setId(location.id);
        setName(location.name);
        setLatitude(location.latitude.toString());
        setLongitude(location.longitude.toString());
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
                    onChange={(e) => setLatitude(e.target.value)}
                />
                <input
                    type="text"
                    placeholder="Долгота"
                    value={longitude}
                    onChange={(e) => setLongitude(e.target.value)}
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
