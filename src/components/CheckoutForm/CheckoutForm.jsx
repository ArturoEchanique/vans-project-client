import './CheckoutForm.css'
import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js"
import { useState } from "react"
import { useNavigate } from "react-router-dom"
import stripeService from "../../services/stripe.service"
import bookingsService from "../../services/bookings.service"
import chatService from "../../services/chat.service"
import { useContext } from "react"
import { AuthContext } from "../../context/auth.context"
import vanService from "../../services/van.service"
import nodemailerService from "../../services/nodemailer.service"
import userService from "../../services/user.service"
import { Button, Card, Modal } from "react-bootstrap"
import PaymentDetailsCard from "../PaymentDetailsCard/PaymentDetailsCard"
const CheckoutForm = ({ startDate, endDate, price, bookedVan }) => {
    const stripe = useStripe()
    const elements = useElements()
    const [loading, setLoading] = useState(false)
    const { user } = useContext(AuthContext)

    const [showModal, setShowModal] = useState(false)

    const openModal = () => setShowModal(true)
    const closeModal = () => setShowModal(false)

    const fireFinalActions = () => {
        closeModal()
    }

    const navigate = useNavigate()
    const handleSubmit = async (e) => {
        e.preventDefault()

        const { error, paymentMethod } = await stripe.createPaymentMethod({
            type: "card",
            card: elements.getElement(CardElement),
        })
        setLoading(true)

        if (!error) {
            const { id } = paymentMethod
            const { data } = await stripeService.checkout({ id, amount: price * 100 }) // amount in cents
        }
        const owner = await vanService.getOneVan(bookedVan)

        const user_id = user._id

        const owner_Id = owner.data.owner

        const booking = await bookingsService.saveBooking(user_id, owner_Id, { startDate, endDate, price, bookedVan })
        const newChat = { owners: [user_id, owner_Id], booking: booking.data._id }
        const ownerEmail = await userService.getOneUser(owner_Id)
        const chat = await chatService.createChat(newChat)

        let name = user.username
        let subject = "You Have a New Booking"
        let message = `you have a new booking on day ${startDate.toLocaleString()}`
        let email = ownerEmail.data.email
        const sendMail = await nodemailerService.sendMail({
            email, subject, message, name
        })


        elements.getElement(CardElement).clear()
        openModal()
        // navigate("/paydetails")
        setLoading(false)
    }

    return (
        <>
            <Modal show={showModal} onHide={closeModal}>
                <div className="modal1">
                    <Modal.Header closeButton>
                        <Modal.Title>Booked Successfull</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <PaymentDetailsCard fireFinalActions={fireFinalActions} />
                    </Modal.Body>
                </div>
            </Modal>
            <form onSubmit={handleSubmit}>
                <Card className="payment" style={{ width: '28rem' }}>
                    <Card.Img variant="top" src="https://careeracademy.co.nz/wp-content/uploads/2020/11/Secure-Payment-Icon.png" />
                    <Card.Body>
                        <Card.Title className="paymentTitle">Checkout</Card.Title>
                        <Card.Text className="paymentPrice">
                            Price: {price}$


                        </Card.Text>
                        <CardElement />
                        <hr />
                        <Button variant="dark" disabled={!stripe}>
                            {loading ? "Loading..." : "Book"}
                        </Button>
                    </Card.Body>
                </Card>
            </form>

            {/* 
            <form onSubmit={handleSubmit}>
                <img src="https://careeracademy.co.nz/wp-content/uploads/2020/11/Secure-Payment-Icon.png" className="img-fluid" />
                <h3 className="text-center my-2">Price: {price}$</h3>
                <div className="form-group">
                    <CardElement />
                </div>
                <hr />
                <button disabled={!stripe} className="btn btn-success">
                    {loading ? "Loading..." : "Book"}
                </button>
            </form> */}
        </>
    )
}

export default CheckoutForm
