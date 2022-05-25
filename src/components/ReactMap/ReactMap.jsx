import React from 'react'
import { useState, useEffect } from "react";
import { Button, Row } from "react-bootstrap"
import { GoogleMap, useJsApiLoader, Marker, InfoWindow } from '@react-google-maps/api';
import MapMarker from "../MapMarker/MapMarker";
import "./ReactMap.css"

const containerStyle = {
    width: '100%',
    height: '100vh'
};

// const exampleMapStyles = [
//     {
//         featureType: "poi",
//         elementType: "geometry",
//         stylers: [
//             {
//                 color: "#eeeeee",
//             },
//         ],
//     },
//     {
//         featureType: "poi",
//         elementType: "labels.text",
//         stylers: [
//             {
//                 visibility: "off",
//             },
//         ],
//     },
//     {
//         featureType: "water",
//         elementType: "labels.text.fill",
//         stylers: [
//             {
//                 color: "#9e9e9e",
//             },
//         ],
//     },
// ];
function ReactMap({ initLocationX, locationSwitcher, initLocationY, vans, favoriteVans, addFavoriteVan, removeFavoriteVan, handleMapBoundsChange }) {

    const [visibleMarker, setVisibleMarker] = useState(-1)
    const [zoom, setZoom] = useState(14)
    const [center, setCenter] = useState({ lat: initLocationX, lng: initLocationY });

    useEffect(() => {
        if (map) {
            goToUserLocation()
        }
    }, [locationSwitcher])

    const setVisibleMarkerFn = (idx) => {
        setVisibleMarker(idx)
    }

    const { isLoaded } = useJsApiLoader({
        id: 'google-map-script',
        googleMapsApiKey: "AIzaSyCJXfnCjCNoZ5DFVcicZ182oaJT54TZPb4"
    })

    const [map, setMap] = React.useState(null)

    const goToUserLocation = () => {
        navigator.geolocation.getCurrentPosition(
            ({ coords: { latitude: lat, longitude: lng } }) => {
                const pos = { lat, lng };
                // setCenter(pos);
                map.setCenter(pos)
                setTimeout(() => {
                    map.setZoom(16)
                }, 500)
            }
        )
        const bounds = new window.google.maps.LatLngBounds(center);
        // mapBoundsChange(map)
        // setMap(map)
        //temporal, sin timeout no funciona
        // setTimeout(() => {
        //     mapBoundsChange(map)
        // }, 500)
    }

    const onLoad = React.useCallback(function callback(map) {

        // const pos = { lat: initLocationX, lng: initLocationY }
        // setCenter(pos)

        // navigator.geolocation.getCurrentPosition(
        //     ({ coords: { latitude: lat, longitude: lng } }) => {
        //         const pos = { lat, lng };
        //         setCenter(pos);
        //         mapLoaded()
        //         mapBoundsChange(map)
        //     }
        // )
        const bounds = new window.google.maps.LatLngBounds(center);
        // map.fitBounds(bounds);
        setMap(map)
        //temporal, sin timeout no funciona
        setTimeout(() => {
            mapBoundsChange(map)
        }, 500)

    }, [])

    const onUnmount = React.useCallback(function callback(map) {
        setMap(null)
    }, [])
    console.log("vans are", vans)

    // const mapLoaded = () => {
    // }

    const mapBoundsChange = (map) => {
        
        const bounds = map.getBounds()
        console.log("map is ", bounds)
        const margin = 150 / 2 ** map.getZoom()
        console.log("keys are", Object.keys(bounds)[0])
        const yCord = Object.values(bounds)[0]
        const xCord = Object.values(bounds)[1]
        handleMapBoundsChange({ mapYBounds: [yCord.h - margin * 2, yCord.j + margin], mapXBounds: [xCord.h - margin, xCord.j + margin] })
    }



    return isLoaded ? (
        <>
            <GoogleMap
                mapContainerStyle={containerStyle}
                center={center}
                zoom={zoom}
                // options={{
                //     styles: exampleMapStyles,
                // }}
                onLoad={onLoad}
                onZoomChanged={map && (() => mapBoundsChange(map))}
                onDragEnd={map && (() => mapBoundsChange(map))}
                onUnmount={onUnmount}>

                <>

                    {vans.map((van, idx) => {
                        return (
                            <MapMarker isFavorite={favoriteVans.includes(van._id)} addFavoriteVan={addFavoriteVan} removeFavoriteVan={removeFavoriteVan} showInfo={visibleMarker === van._id} setVisibleMarker={setVisibleMarkerFn} van={van} key={van._id} markerIdx={idx} />
                        )
                    })}
                </>
                <></>
            </GoogleMap>
        </>
    ) : <></>

}

export default React.memo(ReactMap)