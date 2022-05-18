import { useContext, useEffect, useState } from "react"
import { AuthContext } from "../../context/auth.context";
import reviewsService from "../../services/reviews.service";
import { Form, Button } from "react-bootstrap"
import vanService from "../../services/van.service";
import { useParams } from "react-router-dom";


const ReviewForm = ({ fireFinalActions }) => {
    const { user } = useContext(AuthContext);
    const { van_id } = useParams();



    const [formData, setFormData] = useState({
        owner: "",
        rating: "",
        reviewDate: "",
        text: ""
    })

    const handleInputChange = (e) => {
        const { name, value } = e.currentTarget
        setFormData({ ...formData, [name]: value })
        console.log(formData)

    }
    const addReviewToVan = (data) => {
        let review_id = data.data._id

        vanService
            .addReview(van_id, review_id)
            .then((data) => fireFinalActions())
            .catch((err) => console.log(err))

    }

    const handleSubmit = (e) => {
        e.preventDefault()

        reviewsService
            .createReviews(formData)
            .then((data) => addReviewToVan(data))
            .catch((err) => console.log(err))
    }



    useEffect(() => {
        if (user) setFormData({
            owner: user?._id,
            reviewDate: new Date()
        });
    }, [user]);


    const { rating, text, } = formData

    return (
        <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3" controlId="rating">
                <Form.Label>Rating</Form.Label>
                <Form.Control type="number" min={0} max={5} value={rating} onChange={handleInputChange} name="rating" />
            </Form.Group>

            <Form.Group className="mb-3" controlId="text">
                <Form.Label>Review</Form.Label>
                <Form.Control type="text" value={text} onChange={handleInputChange} name="text" />
            </Form.Group>

            <Button variant="dark" type="submit">Send Review</Button>
        </Form>
    )
}
export default ReviewForm