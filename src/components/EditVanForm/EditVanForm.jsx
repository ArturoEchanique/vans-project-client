import { useEffect, useState } from "react"
import { Form, Button } from "react-bootstrap"
import vanService from "../../services/van.service"
import { useNavigate, useParams } from "react-router-dom"

const EditVanForm = () => {
    const { van_id } = useParams()

    const navigate = useNavigate()

    const [formData, setFormData] = useState({
        name: "",
        name: "",
        description: "",
        imageUrl: "",
        dayPrice: "",
        longitude: "",
        latitude: "",
        solarPower: "",
        shower: "",
        bathroom: "",
        maxPassengers: "",
    })

    useEffect(() => loadVans(), [])

    const loadVans = () => {
        vanService
            .getOneVan(van_id)
            .then(({ data }) => {
                setFormData(data)
            })
            .catch((err) => console.log(err))
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        vanService
            .getOneVanAndUpdate(van_id, formData)
            .then((res) => {
                navigate("/")
            })
            .catch((err) => console.log(err))
    }

    const handleInputChange = (e) => {
        const { name } = e.currentTarget

        if (e.currentTarget.hasOwnProperty("checked")) {
            const { checked } = e.currentTarget
            setFormData({ ...formData, [name]: checked })
        } else {
            const { value } = e.currentTarget
            setFormData({ ...formData, [name]: value })
        }
    }

    const { name, description, imageUrl, dayPrice, longitude, latitude, solarPower, shower, bathroom, maxPassengers } = formData

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
                <Form.Control type="number" onChange={handleInputChange} name="longitude" value={longitude} />
            </Form.Group>

            <Form.Group className="mb-3" controlId="latitude">
                <Form.Label>Latitude</Form.Label>
                <Form.Control type="number" onChange={handleInputChange} name="latitude" value={latitude} />
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

            <Button variant="dark" type="submit">
                Update
            </Button>
        </Form>
    )
}

export default EditVanForm
