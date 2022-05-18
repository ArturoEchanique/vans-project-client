import { Wrapper, Status } from "@googlemaps/react-wrapper"
import React from "react"
import { GoogleMap, LoadScript } from "@react-google-maps/api"
import Geocode from "react-geocode"

function Map() {
    Geocode.setApiKey("AIzaSyCJXfnCjCNoZ5DFVcicZ182oaJT54TZPb4")

    let street = "calle sierra nevada,22"
    let city = "guadalajara"
    let country = "spain"
    let location = street + city + country

    Geocode.fromAddress(location).then(
        (response) => {
            const { lat, lng } = response.results[0].geometry.location
            console.log(lat, lng)
        },
        (error) => {
            console.error(error)
        }
    )

    const containerStyle = {
        width: "400px",
        height: "400px",
    }

    const center = {
        lat: -3.745,
        lng: -38.523,
    }

    return (
        <LoadScript googleMapsApiKey="AIzaSyCJXfnCjCNoZ5DFVcicZ182oaJT54TZPb4">
            <GoogleMap mapContainerStyle={containerStyle} center={center} zoom={10}>
                <></>
            </GoogleMap>
        </LoadScript>
    )
}

export default React.memo(Map)
