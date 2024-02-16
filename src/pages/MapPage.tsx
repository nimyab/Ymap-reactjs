import { useEffect, useState } from "react";
import Locations from "../components/Locations";
import Map from "../components/MapComponent";
import "../index.css";
import { observer } from "mobx-react-lite";
import locationsStore from "../store/locationsStore";
import { MyLocation } from "../utils/types";

const MapPage = observer(() => {
    const locations = locationsStore.myLocations;
    const [isLoading, setIsLoading] = useState(true);

    const [userLocation, setUserLocation] = useState<number[]>();
    useEffect(() => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition((position) => {
                setUserLocation([
                    position.coords.latitude,
                    position.coords.longitude,
                ]);
            });
        }
        locationsStore.getAllLocation().then(() => setIsLoading(false));
    }, []);

    async function addLocation(
        name: string,
        latitude: number,
        longitude: number
    ) {
        await locationsStore.addLocation(name, latitude, longitude);
    }

    async function deleteLocation(id: number) {
        await locationsStore.deleteLocation(id);
    }

    async function updateLocation(data: MyLocation) {
        await locationsStore.updateLocation(data);
    }

    if (isLoading) {
        return (
            <div style={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
            }}>
                <div className="loader"></div>
            </div>
        );
    }

    return (
        <>
            <div className="map-page">
                <span>Мои метки</span>
                <div className="locations">
                    <Locations
                        addLoc={addLocation}
                        locations={locations}
                        setUserLocation={setUserLocation}
                        updateLoc={updateLocation}
                        deleteLoc={deleteLocation}
                    />
                </div>
                <div className="map">
                    <Map locations={locations} userLocation={userLocation} />
                </div>
            </div>
        </>
    );
});

export default MapPage;
