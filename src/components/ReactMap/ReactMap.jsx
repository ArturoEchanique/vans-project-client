import React from 'react'
import { useState } from "react";
import { GoogleMap, useJsApiLoader, Marker, InfoWindow } from '@react-google-maps/api';
import TestComponent from "../TestComponent/TestComponent";
import MapMarker from "../MapMarker/MapMarker";
import VanCard from '../VanCard/VanCard';

const containerStyle = {
    width: '1200px',
    height: '800px'
};

function ReactMap({ initLocationX, initLocationY, vans, favoriteVans, addFavoriteVan, removeFavoriteVan, handleMapBoundsChange }) {

    console.log("loc x is", initLocationX)
    const [visibleMarker, setVisibleMarker] = useState(-1)
    const [center, setCenter] = useState({ lat: initLocationX, lng: initLocationY });

    const setVisibleMarkerFn = (idx) => {
        setVisibleMarker(idx)
    }

    const { isLoaded } = useJsApiLoader({
        id: 'google-map-script',
        googleMapsApiKey: "AIzaSyCJXfnCjCNoZ5DFVcicZ182oaJT54TZPb4"
    })

    const [map, setMap] = React.useState(null)

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
        setTimeout(() =>{
            mapBoundsChange(map)
        }, 500)
        
    }, [])

    const onUnmount = React.useCallback(function callback(map) {
        setMap(null)
    }, [])

    const mapLoaded = () => {
        console.log("the map is loaded with geo")
    }

    const mapBoundsChange = (map) => {
        const bounds = map.getBounds()
        const margin = 150 / 2 ** map.getZoom()
        handleMapBoundsChange({ mapYBounds: [bounds.Ab.h - margin * 2, bounds.Ab.j + margin], mapXBounds: [bounds.Va.h - margin, bounds.Va.j + margin] })
    }



    return isLoaded ? (
        <GoogleMap
            mapContainerStyle={containerStyle}
            center={center}
            zoom={10}

            onLoad={onLoad}
            onZoomChanged={map && (() => mapBoundsChange(map))}
            onDragEnd={map && (() => mapBoundsChange(map))}
            onUnmount={onUnmount}>
           <button>holiii</button>

            <>
                {vans.map((van, idx) => {
                    return (
                        <MapMarker isFavorite={favoriteVans.includes(van._id)} addFavoriteVan={addFavoriteVan} removeFavoriteVan={removeFavoriteVan} showInfo={visibleMarker === van._id} setVisibleMarker={setVisibleMarkerFn} van={van} key={van._id} markerIdx={idx} />
                    )
                })}
            </>
            <></>
        </GoogleMap>
    ) : <></>
}

export default React.memo(ReactMap)