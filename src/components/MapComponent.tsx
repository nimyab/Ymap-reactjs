import { YMaps, Map, Placemark } from "@pbe/react-yandex-maps";
import { MyLocation } from "../utils/types";

type MapProp = {
    locations: MyLocation[];
    userLocation: undefined | number[];
};

const MapComponent = ({ locations, userLocation }: MapProp) => {
    return (
        <YMaps>
            <Map
                defaultState={{ center: [55.75, 37.57], zoom: 12 }}
                state={{ center: userLocation, zoom: 12 }}
                width={800}
                height={800}
            >
                {locations.map((location) => (
                    <Placemark
                        modules={["geoObject.addon.balloon"]}
                        key={location.id}
                        geometry={[location.latitude, location.longitude]}
                        properties={{ balloonContentBody: location.name }}
                    />
                ))}
            </Map>
        </YMaps>
    );
};

export default MapComponent;
