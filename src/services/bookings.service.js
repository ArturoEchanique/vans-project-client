import axios from "axios";

class BookingsService {
    constructor() {
        this.api = axios.create({ baseURL: `${process.env.REACT_APP_API_URL}/bookings` });
        this.api.interceptors.request.use((config) => {

            const token = localStorage.getItem("authToken");

            if (token) {
                config.headers = { Authorization: `Bearer ${token}` }
            }

            return config
        })
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
    editBooking = (booking_id) => {
        return this.api.get(`/edit/${booking_id}`);
    };
    deleteBooking = (booking_id) => {
        return this.api.get(`/delete/${booking_id}`);
    };
}

const bookingsService = new BookingsService();

export default bookingsService;
