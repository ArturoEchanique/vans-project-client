import { loadStripe } from "@stripe/stripe-js";
import axios from "axios";
import { Elements, CardElement, useStripe, useElements, } from "@stripe/react-stripe-js";


const stripePromise = loadStripe("pk_test_51KwTPNGY00AWRT2Z6hsVVc0UNqWQLfAo9BUJlrRy5Nhcu1LKT4CeeEaJbZ2KmsQDmJaVFVT7ElohXWqPxZ5NmOrX00cLoHIJ5W");
