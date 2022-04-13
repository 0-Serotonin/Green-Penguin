import React, { useState } from "react";
import { GoogleMap, useLoadScript, Marker, InfoWindow, KmlLayer, MarkerClusterer } from "@react-google-maps/api";
import mapStyles from "./mapStyles";
import usePlacesAutocomplete, { getGeocode, getLatLng } from "use-places-autocomplete";
import { Combobox, ComboboxInput, ComboboxPopover, ComboboxList, ComboboxOption } from "@reach/combobox";
import "@reach/combobox/styles.css";
import { useLocation } from "react-router-dom";


const libraries = ["places"];
const mapContainerStyle = {
    width: "100vw",
    height: "100vh",
};
const center = {
    lat: 1.3521,
    lng: 103.8198,
};
const options = {
    styles: mapStyles,
    disableDefaultUI: true,
    zoomControl: false,
}

// Location of your computer
var yourLatitude;
var yourLongitude;


export default function Map(props) {
    const [selectedPoint, setSelectedPoint] = useState(null);

    const { isLoaded, loadError } = useLoadScript({
        googleMapsApiKey: "AIzaSyBL0wqyCym-8QPPVK-ZME2-trqeA89EN7c",
        libraries,
    })

    const mapRef = React.useRef();
    const onMapLoad = React.useCallback((map) => {
        mapRef.current = map;
    }, []);

    const panTo = React.useCallback(({ lat, lng }) => {
        mapRef.current.panTo({ lat, lng });
        mapRef.current.setZoom(17);
    }, []);

    const [markers, setMarkers] = React.useState([]);
    const location = useLocation();
    const { url } = location.state;

    if (loadError) return "Error loading Maps";
    if (!isLoaded) return "Loading Maps";

    return <div>
        <Search panTo={panTo} />
        <Locate panTo={panTo} />

        <GoogleMap
            mapContainerStyle={mapContainerStyle}
            zoom={12}
            center={center}
            options={options}
            onLoad={onMapLoad}
            onClick={(event) => {
                setMarkers(() => [{
                    lat: yourLatitude,
                    lng: yourLongitude,
                }]);
            }}

        >
            {markers.map(marker => (
                <Marker
                    key={marker.lat}
                    position={{lat: marker.lat, lng: marker.lng}}
                />
            ))}

            <KmlLayer
                url={url}
                options={{ preserveViewport: true }}
            />

            {selectedPoint && (
                <InfoWindow
                    position={{
                        lat: selectedPoint.geometry.coordinates[1],
                        lng: selectedPoint.geometry.coordinates[0]
                    }}
                    onCloseClick={() => {
                        setSelectedPoint(null);
                    }}
                >
                    <span>
                        <b>{selectedPoint.properties.Name}</b>
                        <ul>{selectedPoint.properties.Description}</ul>
                    </span>
                </InfoWindow>
            )}

        </GoogleMap>
    </div>
}

function Locate({ panTo }) {
    return (
        <button className="locate" onClick={() => {
            navigator.geolocation.getCurrentPosition((position) => {
                panTo({
                    lat: position.coords.latitude,
                    lng: position.coords.longitude,
                })
                yourLatitude = position.coords.latitude;
                yourLongitude = position.coords.longitude;
            }, () => null);
        }}>
            <img src="https://upload.wikimedia.org/wikipedia/commons/d/d9/Compass.svg" alt="compass - Locate Me" />
        </button>
    );
}

function Search({ panTo }) {
    const { ready, value, suggestions: { status, data }, setValue, clearSuggestions } = usePlacesAutocomplete({
        requestOptions: {
            location: { lat: () => 1.3521, lng: () => 103.8198 },
            radius: 2000,
        },
    });

    return (
        <div className="search">
            <Combobox
                onSelect={async (address) => {
                    setValue(address, false);
                    clearSuggestions();

                    try {
                        const results = await getGeocode({ address });
                        const { lat, lng } = await getLatLng(results[0]);
                        panTo({ lat, lng });
                        yourLatitude = lat;
                        yourLongitude = lng;
                        // console.log(lat, lng);
                    } catch (error) {
                        console.log("Error!");
                    }

                    // console.log(address);
                }}
            >
                <ComboboxInput
                    value={value}
                    onChange={(e) => {
                        setValue(e.target.value);
                    }}
                    disabled={!ready}
                    placeholder="Enter an Address or Postal Code"
                />
                <ComboboxPopover>
                    <ComboboxList>
                        {status === "OK" && data.map(({ id, description }) => (
                            <ComboboxOption
                                key={id}
                                value={description}
                            />
                        ))}
                    </ComboboxList>
                </ComboboxPopover>
            </Combobox>
        </div>
    );
}