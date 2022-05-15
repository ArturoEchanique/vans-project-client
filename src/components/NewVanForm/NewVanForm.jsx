import { useContext, useState } from "react"
import { Form, Button, Container, Row, Col } from "react-bootstrap";
import vanService from "../../services/van.service"
import { useNavigate } from 'react-router-dom'
import uploadService from "../../services/upload.service"
import { AuthContext } from "../../context/auth.context";
import userService from "../../services/user.service";



const NewVanForm = () => {
    const { user } = useContext(AuthContext);


    const [formData, setFormData] = useState({
        owner: user._id,
        name: "",
        description: "",
        imageUrl: "",
        dayPrice: "",
        longitude: "",
        latitude: ""

    })
    const [loadingImage, setLoadingImage] = useState(false)


    const navigate = useNavigate()

    const handleSubmit = e => {
        e.preventDefault()
        //****** */
        vanService
            .createVan(formData)
            // .then(res => {
            //     navigate('/')
            // })
            .then(() => {
                userService.editUser(user._id, { role: "OWNER" })
                    .then((rrr) => console.log("el usuariooo", rrr))
            })
            .catch(err => console.log(err))
    }
    const handleImageUpload = (e) => {

        setLoadingImage(true)

        const uploadData = new FormData()
        uploadData.append('imageData', e.target.files[0])

        uploadService
            .uploadImage(uploadData)
            .then(({ data }) => {
                setLoadingImage(false)
                setFormData({ ...formData, imageUrl: data.cloudinary_url })
            })
            .catch(err => console.log(err))
    }

    const handleInputChange = e => {
        const { value, name } = e.currentTarget
        setFormData({ ...formData, [name]: value })
    }

    const { name, description, dayPrice, longitude, latitude } = formData

    return (
        <Container>
            <Row>
                <Col md={{ span: 6, offset: 3 }}>
                    <h1>Add a new Vehicle</h1>
                    <hr />
                    <Form onSubmit={handleSubmit}>
                        <Form.Group className="mb-3" controlId="name">
                            <Form.Label>Model name</Form.Label>
                            <Form.Control type="text" onChange={handleInputChange} name="name" value={name} />
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="description">
                            <Form.Label>Description</Form.Label>
                            <Form.Control type="text" onChange={handleInputChange} name="description" value={description} />
                        </Form.Group>

                        {/* <Form.Group className="mb-3" controlId="email">
                            <Form.Label>Image Url</Form.Label>
                            <Form.Control type="text" onChange={handleInputChange} name="imageUrl" value={imageUrl} />
                        </Form.Group> */}
                        <Form.Group className="mb-3" controlId="imageUrl">
                            <Form.Label>Image (import)</Form.Label>
                            <Form.Control type="file" onChange={handleImageUpload} />
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="dayPrice">
                            <Form.Label>Price per day</Form.Label>
                            <Form.Control type="text" onChange={handleInputChange} name="dayPrice" value={dayPrice} />
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="longitude">
                            <Form.Label>Longitude</Form.Label>
                            <Form.Control type="text" onChange={handleInputChange} name="longitude" value={longitude}
                            />
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="latitude">
                            <Form.Label>Latitude</Form.Label>
                            <Form.Control type="text" onChange={handleInputChange} name="latitude" value={latitude} />
                        </Form.Group>

                        <Button variant="dark" type="submit" disabled={loadingImage}>{loadingImage ? 'Loading...' : 'Add Van'}</Button>
                    </Form>
                </Col>
            </Row>
        </Container>
    );
}

export default NewVanForm