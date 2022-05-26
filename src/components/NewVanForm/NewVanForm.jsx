import "./newVanForm.css"
import React from "react"
import Geocode from "react-geocode"
import { useContext, useState } from "react"
import userService from "../../services/user.service"
import { AuthContext } from "../../context/auth.context"
import uploadService from "../../services/upload.service"
import { Form, Button, Container, Row, Col } from "react-bootstrap"
import vanService from "../../services/van.service"
import { useNavigate } from "react-router-dom"
import { MessageContext } from "../../context/message.context"

const NewVanForm = ({ fireFinalActions }) => {
    const { user } = useContext(AuthContext)

    const [loadingImage, setLoadingImage] = useState(false)
    const { showMessage } = useContext(MessageContext)

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
        kitchen: false,
        heatedSeats: false,
        sunRoof: false
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
                console.log("geocode success", response)
                const { lat, lng } = response.results[0].geometry.location;

                //lat and long is switched, the error is in the server side maybe, sorry.
                setFormData({ ...formData, latitude: lng, longitude: lat })
            },
                (error) => {
                    console.log("geocode falied", error)
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
                showMessage("Completed", "Van successfully created")
                fireFinalActions()
                navigate("/profile")
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
    const { owner, name, description, dayPrice, longitude, latitude, solarPower, shower, bathroom, maxPassengers,
        kitchen, heatedSeats, sunRoof } = formData

    return (
        <Container>
            <Row>
                <Col md={{ span: 12, offset: 0 }}>
                    <Form id="modal" onSubmit={handleSubmit}>
                        <div className="inputFieldContainer mt-2">
                      
                                <input id="html" className="formInputField textInputClean textInputBig" type="hidden" name="owner" value={owner} placeholder="Write your email" onChange={handleInputChange} />
                         
                        </div>
                        <br></br>

                        <label for="name">Van title</label>
                        <br></br>
                        <div className="inputFieldContainer mt-2">
 

                                <input id="html" className="formInputField textInputClean textInputBig" type="text" name="name" value={name} placeholder="" onChange={handleInputChange} />
                   
                        </div>
                        <br></br>

                        <label for="description">Van description</label>
                        <br></br>
                        <div className="inputFieldContainer mt-2">
                     

                                <input id="html" className="formInputField textInputClean textInputBig" type="text" name="description" value={description} placeholder="" onChange={handleInputChange} />
                        
                        </div>
                        <br></br>

                        <Form.Group className="mb-3" controlId="imageUrl">
                            <Form.Label>Image (import)</Form.Label>
                            <Form.Control type="file" multiple onChange={handleImageUpload} />
                        </Form.Group>



                        <label for="street">Address</label>
                        <br></br>
                        <div className="inputFieldContainer mt-2">
                      

                                <input id="html" className="formInputField textInputClean textInputBig" type="text" name="street" value={street} placeholder="" onChange={handleLocation} />
                         
                        </div>
                        <br></br>

                        {/* <Form.Group className="mb-3" controlId="owner">
                            <Form.Control type="hidden" onChange={handleInputChange} name="owner" value={owner} />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="name">
                            <Form.Label>Model name</Form.Label>
                            <Form.Control type="text" onChange={handleInputChange} name="name" value={name} />
                        </Form.Group> */}

                        {/* <Form.Group className="mb-3" controlId="description">
                            <Form.Label>Description</Form.Label>
                            <Form.Control type="text" onChange={handleInputChange} name="description" value={description} />
                        </Form.Group> */}

                        {/* <Form.Group className="mb-3" controlId="imageUrl">
                            <Form.Label>Image (import)</Form.Label>
                            <Form.Control type="file" multiple onChange={handleImageUpload} />
                        </Form.Group> */}

                        {/* <Form.Group className="mb-3" controlId="dayPrice">
                            <Form.Label>Price per day</Form.Label>
                            <Form.Control type="number" onChange={handleInputChange} name="dayPrice" value={dayPrice} />
                        </Form.Group> */}

                        <Form.Group className="mb-3" controlId="longitude">
                            {/* <Form.Label>Longitude</Form.Label> */}
                            <Form.Control type="hidden" onChange={handleInputChange} name="longitude" value={longitude} />
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="latitude">
                            {/* <Form.Label>Latitude</Form.Label> */}
                            <Form.Control type="hidden" onChange={handleInputChange} name="latitude" value={latitude} />
                        </Form.Group>

                        {/* <Form.Group className="mb-3" controlId="street">
                            <Form.Label>Direction</Form.Label>
                            <Form.Control type="text" onChange={handleLocation} name="street" value={street} />
                        </Form.Group> */}
                        <Row>
                            <Col>
                                <label for="city">City</label>
                                <br></br>
                                <div className="inputFieldContainer mt-2">
                              

                                        <input id="html" className="formInputField textInputClean textInputBig" type="text" name="city" value={city} placeholder="" onChange={handleLocation} />
                                 
                                </div>
                                <br></br>
                            </Col>
                            <Col>
                                <label for="country">Country</label>
                                <br></br>
                                <div className="inputFieldContainer mt-2">
                              

                                        <input id="html" className="formInputField textInputClean textInputBig" type="text" name="country" value={country} placeholder="" onChange={handleLocation} />
                                 
                                </div>
                                <br></br>
                            </Col>
                        </Row>

                        <Row>
                            <Col>
                                <label for="dayPrice">Price per day</label>
                                <br></br>
                                <div className="inputFieldContainer mt-2">
                              

                                        <input id="html" className="formInputField textInputClean textInputBig" type="number" name="dayPrice" value={dayPrice} placeholder="" onChange={handleInputChange} />
                                 
                                </div>
                                <br></br>
                            </Col>
                            <Col>
                                <label for="maxPassengers">Max passengers</label>
                                <br></br>
                                <div className="inputFieldContainer mt-2">
                              

                                        <input id="html" className="formInputField textInputClean textInputBig" type="number" name="maxPassengers" value={maxPassengers} placeholder="" onChange={handleInputChange} />
                                 
                                </div>
                                <br></br>
                            </Col>
                        </Row>
                        {/* <Form.Group className="mb-3" controlId="city">
                            <Form.Label>City</Form.Label>
                            <Form.Control type="text" onChange={handleLocation} name="city" value={city} />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="country">
                            <Form.Label>Country</Form.Label>
                            <Form.Control type="text" onChange={handleLocation} name="country" value={country} />
                        </Form.Group> */}

                        {/* <Form.Group className="mb-3" controlId="maxPassengers">
                            <Form.Label>Maximun Passengers</Form.Label>
                            <Form.Control type="number" min={0} onChange={handleInputChange} name="maxPassengers" value={maxPassengers} />
                        </Form.Group> */}
                        <Row>
                            <Col xs={4}>
                                <Form.Group className="mb-3" controlId="solarPower">
                                    <input type="checkbox" onChange={handleInputChange} name="solarPower" checked={solarPower} />
                                    <Form.Label>&nbsp; Solar Power</Form.Label>
                                </Form.Group>
                            </Col>
                            <Col xs={4}>
                                <Form.Group className="mb-3" controlId="shower">
                                    <input type="checkbox" onChange={handleInputChange} name="shower" checked={shower} />
                                    <Form.Label>&nbsp; Shower</Form.Label>
                                </Form.Group>
                            </Col>
                            <Col xs={4}>
                                <Form.Group className="mb-3" controlId="bathroom">
                                    <input type="checkbox" onChange={handleInputChange} name="bathroom" checked={bathroom} />
                                    <Form.Label> &nbsp; Bathroom</Form.Label>
                                </Form.Group>
                            </Col>
                            <Col xs={4}>
                                <Form.Group className="mb-3" controlId="kitchen">
                                    <input type="checkbox" onChange={handleInputChange} name="kitchen" checked={kitchen} />
                                    <Form.Label>&nbsp; Kitchen</Form.Label>
                                </Form.Group>
                            </Col>
                            <Col xs={4}>
                                <Form.Group className="mb-3" controlId="heatedSeats">
                                    <input type="checkbox" onChange={handleInputChange} name="heatedSeats" checked={heatedSeats} />
                                    <Form.Label>&nbsp; Heated seats</Form.Label>
                                </Form.Group>
                            </Col>
                            <Col xs={4}>
                                <Form.Group className="mb-3" controlId="sunRoof">
                                    <input type="checkbox" onChange={handleInputChange} name="sunRoof" checked={sunRoof} />
                                    <Form.Label>&nbsp; Sunroof</Form.Label>
                                </Form.Group>
                            </Col>
                        </Row>          
                        <button style={{ width: "100%" }} type="submit" disabled={loadingImage} className="vanmeupButton mb-4 mt-4" variant="light">
                            {loadingImage ? "Loading..." : "Add Van"}
                        </button>
                        {/* <Button variant="dark" type="submit" disabled={loadingImage}>
                            {loadingImage ? "Loading..." : "Add Van"}
                        </Button> */}
                    </Form>
                </Col>
            </Row>
        </Container>
    )
}

export default NewVanForm
