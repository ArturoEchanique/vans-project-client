import VanCard from "../VanCard/VanCard"
import { Marker, InfoWindow } from "@react-google-maps/api"
import "./MapMarker.css"

const MapMarker = ({ isFavorite, addFavoriteVan, removeFavoriteVan, van, markerIdx, showInfo, setVisibleMarker }) => {
    let iconMarker = new window.google.maps.MarkerImage(
        "../../../images/roundedIcon.png",
        null /* size is determined at runtime */,
        null /* origin is 0,0 */,
        null /* anchor is bottom center of the scaled image */,
        new window.google.maps.Size(60, 40)
    )

    const label = {
        text: `${van.dayPrice}€`,
        fontSize: "16px",
        color: "#222222",
        fontWeight: "bolder",
    }

    return (
        <Marker onClick={() => setVisibleMarker(showInfo ? -1 : van._id)} position={{ lat: van.location.coordinates[0], lng: van.location.coordinates[1] }} label={label} icon={iconMarker}>
            {showInfo && (
                <InfoWindow position={{ lat: van.location.coordinates[0], lng: van.location.coordinates[1] }} onCloseClick={() => setVisibleMarker(-1)}>
                        <VanCard hideDeleteButton={true} isFavorite={isFavorite} addFavoriteVan={addFavoriteVan} removeFavoriteVan={removeFavoriteVan} {...van} />
                </InfoWindow>
            )}
        </Marker>
    )
}

export default MapMarker
