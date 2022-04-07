// import React from "react";
// // import { GoogleMap, withScriptjs, withGoogleMap, Marker } from "react-google-maps";
// import { GoogleMap, useLoadScript, Marker, InfoWindow } from "@react-google-maps/api";
// import * as ewasteData from "./e-waste-recycling-geojson.json";
// import * as lightingData from "./lighting-waste-collection-points-geojson.json";

// function Map() {
//     return (
//         <GoogleMap
//             defaultZoom={12}
//             defaultCenter={{ lat: 1.3521, lng: 103.8198 }}
//         >
//             {ewasteData.features.map(ewaste => (
//                 <Marker
//                     key={ewaste.properties.Name}
//                     // position={{
//                     //     lat: ewaste.geometry.coordinates[0],
//                     //     lng: ewaste.geometry.coordinates[1]
//                     // }}
//                 />
//             ))}
//         </GoogleMap>
//     );
// }

// const WrappedMap = withScriptjs(withGoogleMap(Map));

// export default function App() {
//     return (
//         <div style={{ width: "100vw", height: "100vh" }}>
//             <WrappedMap
//                 googleMapURL={`https://maps.googleapis.com/maps/api/js?v=3.exp&libraries=geometry,drawing,places&key=AIzaSyBL0wqyCym-8QPPVK-ZME2-trqeA89EN7c`}
//                 loadingElement={<div style={{ height: "100%" }} />}
//                 containerElement={<div style={{ height: "100%" }} />}
//                 mapElement={<div style={{ height: "100%" }} />}
//             />
//         </div>
//     );
// }

import React, { useState } from "react";
// import { GoogleMap, withScriptjs, withGoogleMap, Marker } from "react-google-maps";
import { GoogleMap, useLoadScript, Marker, InfoWindow, KmlLayer, MarkerClusterer } from "@react-google-maps/api";
// import * as ewasteData from "./e-waste-recycling-geojson.json";
// import * as lightingData from "./lighting-waste-collection-points-geojson.json";
import mapStyles from "./mapStyles";
import usePlacesAutocomplete, { getGeocode, getLatLng } from "use-places-autocomplete";
import { Combobox, ComboboxInput, ComboboxPopover, ComboboxList, ComboboxOption } from "@reach/combobox";
import "@reach/combobox/styles.css";


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

// E-waste DataSet
// var { features } = ewasteData;
// const ewastes = features;
// console.log(features[0].geometry.coordinates[0]);
// console.log(features[0].geometry.coordinates[1]);


// Lighting-waste DataSet
// var { features } = lightingData;
// const lightings = features;

// Location of your computer
var yourLatitude;
var yourLongitude;


export default function Map() {
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

            {/* <Marker
                // key={"You"}
                position={{ lat: yourLatitude, lng: yourLongitude }}
            /> */}

            {/* {ewastes.map(ewaste => (
                <Marker
                    key={ewaste.properties.Name}
                    position={{
                        lat: ewaste.geometry.coordinates[1],
                        lng: ewaste.geometry.coordinates[0]
                    }}
                    icon={{
                        url: "https://upload.wikimedia.org/wikipedia/commons/archive/7/7b/20130326143134%21Recycling_symbol.svg",
                        scaledSize: new window.google.maps.Size(25, 25),
                    }}
                    onClick={() => {
                        setSelectedPoint(ewaste);
                    }}
                />
            ))}

            {lightings.map(lighting => (
                <Marker
                    key={lighting.properties.Name}
                    position={{
                        lat: lighting.geometry.coordinates[1],
                        lng: lighting.geometry.coordinates[0]
                    }}
                    icon={{
                        url: "https://www.svgrepo.com/show/89902/incandescent-light-bulb.svg",
                        scaledSize: new window.google.maps.Size(30, 30),
                    }}
                    onClick={() => {
                        setSelectedPoint(lighting);
                    }}
                />
            ))} */}

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

            {/* 2nd Hand Goods */}
            <KmlLayer
                url="https://geo.data.gov.sg/secondhandcollecn/2017/11/30/kml/secondhandcollecn.kml"
                options={{ preserveViewport: true }}
            />
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