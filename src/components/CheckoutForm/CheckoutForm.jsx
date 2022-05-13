import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import stripeService from "../../services/stripe.service";


const CheckoutForm = ({ price }) => {
    const stripe = useStripe()
    const elements = useElements()
    const [loading, setLoading] = useState(false);

    const navigate = useNavigate()
    const handleSubmit = async (e) => {
        e.preventDefault();

        const { error, paymentMethod } = await stripe.createPaymentMethod({
            type: "card",
            card: elements.getElement(CardElement),
        })
        setLoading(true)
        // amount in cents

        if (!error) {
            const { id } = paymentMethod
            const { data } = await stripeService.checkout({ id, amount: price * 100 })
            console.log(data)
        }
        elements.getElement(CardElement).clear();
        navigate('/paydetails')
        setLoading(false);
    }
    console.log(!stripe || loading);

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