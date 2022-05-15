
import { AuthContext } from "../../context/auth.context";
import { GoogleMap, useJsApiLoader, Marker, InfoWindow } from '@react-google-maps/api';
import userService from "../../services/user.service";
import { useEffect, useState } from "react";
import VanCard from "../VanCard/VanCard";

const MapMarker = ({ van, markerIdx, showInfo, setVisibleMarker }) => {

    // const [showInfo, setShowInfo] = useState(false)

    let iconMarker = new window.google.maps.MarkerImage(
        "../../../images/roundedIcon.png",
        null, /* size is determined at runtime */
        null, /* origin is 0,0 */
        null, /* anchor is bottom center of the scaled image */
        new window.google.maps.Size(90, 60)
    );

    const label = {

        textAlign: "center",
        text: `${van.dayPrice}€`,
        fontSize: "26px",
        color: "#222222",
        fontWeight: "bolder",
        width: "100%"
    }

    return (
        <Marker onClick={() => setVisibleMarker(showInfo ? -1 : van._id)} position={{ lat: van.location.coordinates[0], lng: van.location.coordinates[1]}} label={label} icon={iconMarker}>
            {showInfo && <InfoWindow position={{ lat: van.location.coordinates[0], lng: van.location.coordinates[1] }} onCloseClick={() => setVisibleMarker(-1)}>
                <VanCard {...van} />
            </InfoWindow>}

        </Marker>
    );
};

export default MapMarker;