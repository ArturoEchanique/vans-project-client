import './CheckoutForm.css'
import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js"
import { useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import stripeService from "../../services/stripe.service"
import bookingsService from "../../services/bookings.service"
import chatService from "../../services/chat.service"
import { useContext } from "react"
import { AuthContext } from "../../context/auth.context"
import vanService from "../../services/van.service"
import nodemailerService from "../../services/nodemailer.service"
import userService from "../../services/user.service"
import { Button, Card, Col, Modal } from "react-bootstrap"
import PaymentDetailsCard from "../PaymentDetailsCard/PaymentDetailsCard"
import { MessageContext } from "../../context/message.context"

const CheckoutForm = ({ startDate, endDate, price, bookedVan }) => {
    const stripe = useStripe()
    const elements = useElements()
    const [loading, setLoading] = useState(false)
    const { user } = useContext(AuthContext)
    const { showMessage } = useContext(MessageContext)

    const [error, setError] = useState(false)

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
        setError(false)

        if (!error) {
            const { id } = paymentMethod
            const { data } = await stripeService.checkout({ id, amount: price * 100 }) // amount in cents
        }
        if (error) {
            setError(true)
            showMessage("mal", "muy mal")
        }

        const owner = await vanService.getOneVan(bookedVan)
        console.log("la ven es", owner)

        const user_id = user._id
        console.log("yo", user_id)

        const owner_Id = owner.data.owner._id
        console.log("el owner es", owner_Id)

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
        setLoading(false)
    }

    return (
        <>
            {!error &&
            
                // <Modal backdrop="static" show={showModal} onHide={closeModal}>
                //     <div className="modal1">
                //         <Modal.Header closeButton>
                //             <Modal.Title>Invalid Credit Card</Modal.Title>
                //         </Modal.Header>
                //         <Modal.Body id='paybtn'>
                //             <div>
                //                 <h3>Please type a valid Credit card</h3>
                //             </div>
                //             <hr />
                //             <button style={{ width: "150px" }} onClick={closeModal} className="vanmeupButton mb-4" variant="light">
                //                 Try again
                //             </button>
                //             {/* <Button  id='payBtn' variant="dark">
                //                 Try again
                //             </Button> */}
                //         </Modal.Body>
                //     </div>
                // </Modal>
                
                <Modal backdrop="static" show={showModal} onHide={closeModal}>
                    <div className="modal1">
                        <Modal.Header closeButton>
                            <Modal.Title>Booked Successfull</Modal.Title>
                        </Modal.Header>
                        <Modal.Body id='paybtn'>
                            <PaymentDetailsCard />
                            <hr />
                            <Button onClick={closeModal} id='payBtn' variant="dark">
                                <Link id='linkpay' to={'/profile'}>See bookings</Link>
                            </Button>
                        </Modal.Body>
                    </div>
                </Modal>
            }


            <form onSubmit={handleSubmit}>
                <CardElement />
                <hr />
                <Col id="cancelationPolici">
                    <h5 id="cancelationTile">Cancellation policy</h5>
                    <h6 id="cancelation">
                        Free cancellation for 48 hours.
                    </h6>
                    <p>
                        Cancel before <>{startDate.toLocaleString()}</> for a partial refund.
                        Our Extenuating Circumstances policy does not cover travel disruptions caused by COVID-19.
                    </p>
                </Col>
                <hr />
                <br></br>
                <p>
                    By selecting the button below, I agree to the Host's Vans Rules,
                    vanmeup's Rebooking and Refund Policy, and that Vanmeup can charge my payment method if
                    I'm responsible for damage. Payment Terms between you and Argablo S.A.
                </p>
                <br></br>
                <br />
                <button style={{ width: "150px" }} onClick={handleSubmit} className="vanmeupButton mb-4" variant="light">
                    {loading ? "Loading..." : "Book"}
                </button>
                {/* <Button id='payBtn' onClick={handleSubmit} variant="dark" disabled={!stripe}>
                    {loading ? "Loading..." : "Book"}
                </Button> */}
                {/* </Card.Body> */}
                {/* </Card> */}
            </form>

        </>
    )
}

export default CheckoutForm
