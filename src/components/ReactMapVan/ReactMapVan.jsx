import React from 'react'
import { useState, useEffect } from "react";
import { Button, Row } from "react-bootstrap"
import { GoogleMap, useJsApiLoader, Marker, InfoWindow } from '@react-google-maps/api';
import MapMarker from "../MapMarker/MapMarker";
import "./ReactMapVan.css"

const containerStyle = {
    width: '100%',
    height: '400px'
};

function ReactMap({ initLocationX, initLocationY  }) {

    const [visibleMarker, setVisibleMarker] = useState(-1)
    const [zoom, setZoom] = useState(14)
    const [center, setCenter] = useState({ lat: initLocationX, lng: initLocationY });
    const [map, setMap] = React.useState(null)

    // useEffect(() => {
    //     if (map) {
    //         console.log("setting center")
    //         map.setCenter({lat: initLocationX, lng: initLocationY})
    //         console.log("locating user")
    //     }
    // }, [initLocationX])

    // const setVisibleMarkerFn = (idx) => {
    //     setVisibleMarker(idx)
    // }

    const { isLoaded } = useJsApiLoader({
        id: 'google-map-script',
        googleMapsApiKey: "AIzaSyCJXfnCjCNoZ5DFVcicZ182oaJT54TZPb4"
    })

   

    const onLoad = React.useCallback(function callback(map) {

        const bounds = new window.google.maps.LatLngBounds(center);
        setMap(map)

    }, [])

    const onUnmount = React.useCallback(function callback(map) {
        setMap(null)
    }, [])

    // const mapLoaded = () => {
    // }

    // const mapBoundsChange = (map) => {
    //     const bounds = map.getBounds()
    //     const margin = 150 / 2 ** map.getZoom()
    //     handleMapBoundsChange({ mapYBounds: [bounds.Ab.h - margin * 2, bounds.Ab.j + margin], mapXBounds: [bounds.Va.h - margin, bounds.Va.j + margin] })
    // }

    let iconMarker = "../../../images/vanIcon.png"



    return isLoaded ? (
        <div className="reactMapVanMain">
            <GoogleMap
                mapContainerStyle={containerStyle}
                center={{ lat: initLocationX, lng: initLocationY }}
                zoom={zoom}

                onLoad={onLoad}
                onUnmount={onUnmount}>

                <>
                    <Marker position={{ lat: initLocationX, lng: initLocationY }} icon={iconMarker}/>
                </>
                <></>
            </GoogleMap>
        </div>
    ) : <></>

}

export default React.memo(ReactMap)