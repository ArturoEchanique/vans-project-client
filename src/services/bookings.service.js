import axios from "axios";

class BookingsService {
    constructor() {
        this.api = axios.create({ baseURL: `${process.env.REACT_APP_API_URL}/bookings` });
    }
    saveBooking = (booking) => {
        return this.api.post(`/create`, booking);
    };
    getAllBooking = () => {
        return this.api.get("/get-all");
    };

    getOneBooking = (booking_id) => {
        return this.api.get(`/${booking_id}`);
    };
}

const bookingsService = new BookingsService();

export default bookingsService;
