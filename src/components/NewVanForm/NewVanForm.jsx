import React from "react"
import Geocode from "react-geocode"
import { useContext, useState } from "react"
import userService from "../../services/user.service"
import { AuthContext } from "../../context/auth.context"
import uploadService from "../../services/upload.service"
import { Form, Button, Container, Row, Col } from "react-bootstrap"
import vanService from "../../services/van.service"
import { useNavigate } from "react-router-dom"

const NewVanForm = () => {
    const { user } = useContext(AuthContext)

    const [loadingImage, setLoadingImage] = useState(false)

    const [formData, setFormData] = useState({
        owner: user._id,
        name: "",
        description: "",
        imageUrl: "",
        dayPrice: "",
        longitude: 0,
        latitude: 0,
        solarPower: 0,
        shower: false,
        bathroom: false,
        maxPassengers: 0,
    })

    const [geoData, setGeoData] = useState({
        street: "",
        city: "",
        country: "",
    })

    const handleLocation = (e) => {
        const { name, value } = e.currentTarget
        const geoForn = { ...geoData, [name]: value }
        setGeoData({ ...geoData, [name]: value })

        Geocode.setApiKey("AIzaSyAgl6fbZLuPOLVZf5xRxKGM6CcpkXf_FEc")

        Geocode
            .fromAddress(`${geoForn.street}, ${geoForn.city},${geoForn.country}`)
            .then((response) => {
                const { lat, lng } = response.results[0].geometry.location;

                setFormData({ ...formData, latitude: lat, longitude: lng })
            },
                (error) => {
                    console.error(error)
                }
            )
    }

    const navigate = useNavigate()

    const handleSubmit = (e) => {
        e.preventDefault()

        vanService
            .createVan(formData)

            .then(() => {
                userService.editUser(user._id, { role: "OWNER" })
            })
            .then((res) => {
                navigate("/")
            })
            .catch((err) => console.log(err))
    }
    const handleImageUpload = (e) => {
        setLoadingImage(true)

        const uploadData = new FormData()
        for (let i = 0; i < e.target.files.length; i++) {
            uploadData.append("photos", e.target.files[i])
        }

        uploadService
            .uploadMultipleImage(uploadData)
            .then(({ data }) => {
                setLoadingImage(false)
                setFormData({ ...formData, imageUrl: data.cloudinary_urls })
            })

            .catch((err) => console.log(err))
    }

    const handleInputChange = (e) => {
        const { name } = e.currentTarget

        if (e.currentTarget.hasOwnProperty("checked")) {
            const { checked } = e.currentTarget
            setFormData({ ...formData, [name]: checked })
        } else if (!e.currentTarget.value === "street" || "city" || "country") {
            const { value } = e.currentTarget
            setFormData({ ...formData, [name]: value, owner: user._id })
        }
    }
    const { street, country, city } = geoData
    const { owner, name, description, dayPrice, longitude, latitude, solarPower, shower, bathroom, maxPassengers } = formData

    return (
        <Container>
            <Row>
                <Col md={{ span: 6, offset: 3 }}>
                    <h1>Add a new Vehicle</h1>
                    <hr />
                    <Form onSubmit={handleSubmit}>
                        <Form.Group className="mb-3" controlId="owner">
                            <Form.Control type="hidden" onChange={handleInputChange} name="owner" value={owner} />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="name">
                            <Form.Label>Model name</Form.Label>
                            <Form.Control type="text" onChange={handleInputChange} name="name" value={name} />
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="description">
                            <Form.Label>Description</Form.Label>
                            <Form.Control type="text" onChange={handleInputChange} name="description" value={description} />
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="imageUrl">
                            <Form.Label>Image (import)</Form.Label>
                            <Form.Control type="file" multiple onChange={handleImageUpload} />
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="dayPrice">
                            <Form.Label>Price per day</Form.Label>
                            <Form.Control type="number" onChange={handleInputChange} name="dayPrice" value={dayPrice} />
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="longitude">
                            {/* <Form.Label>Longitude</Form.Label> */}
                            <Form.Control type="hidden" onChange={handleInputChange} name="longitude" value={longitude} />
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="latitude">
                            {/* <Form.Label>Latitude</Form.Label> */}
                            <Form.Control type="hidden" onChange={handleInputChange} name="latitude" value={latitude} />
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="street">
                            <Form.Label>Direction</Form.Label>
                            <Form.Control type="text" onChange={handleLocation} name="street" value={street} />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="city">
                            <Form.Label>City</Form.Label>
                            <Form.Control type="text" onChange={handleLocation} name="city" value={city} />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="country">
                            <Form.Label>Country</Form.Label>
                            <Form.Control type="text" onChange={handleLocation} name="country" value={country} />
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="maxPassengers">
                            <Form.Label>Maximun Passengers</Form.Label>
                            <Form.Control type="number" min={0} onChange={handleInputChange} name="maxPassengers" value={maxPassengers} />
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="solarPower">
                            <input type="checkbox" onChange={handleInputChange} name="solarPower" checked={solarPower} />
                            <Form.Label>Solar Power</Form.Label>
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="shower">
                            <input type="checkbox" onChange={handleInputChange} name="shower" checked={shower} />
                            <Form.Label>Shower</Form.Label>
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="bathroom">
                            <input type="checkbox" onChange={handleInputChange} name="bathroom" checked={bathroom} />
                            <Form.Label>Bathroom</Form.Label>
                        </Form.Group>

                        <Button variant="dark" type="submit" disabled={loadingImage}>
                            {loadingImage ? "Loading..." : "Add Van"}
                        </Button>
                    </Form>
                </Col>
            </Row>
        </Container>
    )
}

export default NewVanForm
