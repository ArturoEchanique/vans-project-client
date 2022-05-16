import { CardElement, useStripe, useElements, PaymentElemen } from "@stripe/react-stripe-js";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import stripeService from "../../services/stripe.service";
import bookingsService from "../../services/bookings.service";
import { useContext } from "react";
import { AuthContext } from "../../context/auth.context";
import userService from "../../services/user.service";
import vanService from "../../services/van.service";





const CheckoutForm = ({ startDate, endDate, price, bookedVan }) => {


    const stripe = useStripe()
    const elements = useElements()
    const [loading, setLoading] = useState(false);
    const { user } = useContext(AuthContext);


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
            const { data } = await stripeService.checkout({ id, amount: (price * 100) }) // amount in cents

        }

        const booking = await bookingsService.saveBooking({ startDate, endDate, price, bookedVan })
        console.log("the booking is", booking)
        const owner = await vanService.getOneVan(bookedVan)
        console.log("the van is", owner)

        const ownerId = owner.data.owner
        const bookingId = booking.data._id

        const getUser = await userService.addUserBookings(user._id, bookingId)
        console.log("the user is----", getUser)

        const getOwner = await userService.addOwnerBookings(ownerId, bookingId)
        console.log("the owner is -------", getOwner)

        elements.getElement(CardElement).clear()
        navigate('/paydetails')
        setLoading(false)
    }

    console.log(!stripe || loading)

    return (
        <form className="card card-body" onSubmit={handleSubmit}>
            {/* Product Information */}
            <img
                src="https://hips.hearstapps.com/hmg-prod.s3.amazonaws.com/images/ultimate-toys-camper-1634234458.jpg"
                className="img-fluid"
            />

            <h3 className="text-center my-2">Price: {price}$</h3>

            {/* User Card Input */}
            <div className="form-group">
                <CardElement />
            </div>
            <hr />

            <button disabled={!stripe} className="btn btn-success">
                {loading ? "Loading..." : "Book"}
            </button>

        </form>

    )
}


export default CheckoutForm