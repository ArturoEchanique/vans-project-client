import { useState } from "react"
import { Form, Button } from "react-bootstrap"
import vanService from "../../services/van.service"
import { useNavigate } from 'react-router-dom'


const NewVanForm = () => {

    const [formData, setFormData] = useState({
        name: "",
        description: "",
        imageUrl: "",
        dayPrice: "",
        longitude: "",
        latitude: ""

    })

    const navigate = useNavigate()

    const handleSubmit = e => {
        e.preventDefault()
        //****** */
        vanService
            .createVan(formData)
            .then(res => {
                navigate('/')
            })
            .catch(err => console.log(err))
    }

    const handleInputChange = e => {
        const { value, name } = e.currentTarget
        setFormData({ ...formData, [name]: value })
    }

    const { name, description, imageUrl, dayPrice, longitude, latitude } = formData

    return (

        <Form onSubmit={handleSubmit}>

            <Form.Group className="mb-3" controlId="name">
                <Form.Label>Model name</Form.Label>
                <Form.Control type="text" onChange={handleInputChange} name="name" value={name} />
            </Form.Group>

            <Form.Group className="mb-3" controlId="description">
                <Form.Label>Description</Form.Label>
                <Form.Control type="text" onChange={handleInputChange} name="description" value={description} />
            </Form.Group>

            <Form.Group className="mb-3" controlId="email">
                <Form.Label>Image Url</Form.Label>
                <Form.Control type="text" onChange={handleInputChange} name="imageUrl" value={imageUrl} />
            </Form.Group>

            <Form.Group className="mb-3" controlId="dayPrice">
                <Form.Label>Price per day</Form.Label>
                <Form.Control type="text" onChange={handleInputChange} name="dayPrice" value={dayPrice} />
            </Form.Group>

            <Form.Group className="mb-3" controlId="longitude">
                <Form.Label>Longitude</Form.Label>
                <Form.Control type="text" onChange={handleInputChange} name="longitude" value={longitude} />
            </Form.Group>

            <Form.Group className="mb-3" controlId="latitude">
                <Form.Label>Latitude</Form.Label>
                <Form.Control type="text" onChange={handleInputChange} name="latitude" value={latitude} />
            </Form.Group>

            <Button variant="dark" type="submit">Add Van</Button>
        </Form>

    )
}

export default NewVanForm