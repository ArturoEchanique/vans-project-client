import { loadStripe } from "@stripe/stripe-js"
import axios from "axios"

const stripePromise = loadStripe("pk_test_51KwTPNGY00AWRT2Z6hsVVc0UNqWQLfAo9BUJlrRy5Nhcu1LKT4CeeEaJbZ2KmsQDmJaVFVT7ElohXWqPxZ5NmOrX00cLoHIJ5W")

class StripeService {
    constructor() {
        this.app = axios.create({ baseURL: `${process.env.REACT_APP_API_URL}` })
    }
    checkout(id, amount) {
        return this.app.post("/checkout", id, amount)
    }
}

const stripeService = new StripeService()

export default stripeService
