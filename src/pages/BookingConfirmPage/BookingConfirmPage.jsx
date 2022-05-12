import BookingConfirmCard from "../../components/BookingConfirmCard/BookingConfirmCard";
import CheckoutForm from "../../components/CheckoutForm/CheckoutForm";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";

const stripePromise = loadStripe("pk_test_51KwTPNGY00AWRT2Z6hsVVc0UNqWQLfAo9BUJlrRy5Nhcu1LKT4CeeEaJbZ2KmsQDmJaVFVT7ElohXWqPxZ5NmOrX00cLoHIJ5W");



const BookingConfirmPage = () => {
    return (
        <>
            <Elements stripe={stripePromise}>
                <div className="container p-4">
                    <div className="row h-100">
                        <div className="col-md-4 offset-md-4 h-100">
                            <CheckoutForm />
                        </div>
                    </div>
                </div>
            </Elements>
            {/* <BookingConfirmCard /> */}
        </>
    )
};

export default BookingConfirmPage;
