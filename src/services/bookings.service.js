import axios from "axios";

class BookingsService {
    constructor() {
        this.api = axios.create({ baseURL: `${process.env.REACT_APP_API_URL}/bookings` });
        this.api.interceptors.request.use((config) => {
            const token = localStorage.getItem("authToken");

            if (token) {
                config.headers = { Authorization: `Bearer ${token}` };
            }

            return config;
        });
    }
    saveBooking = (user_id, owner_id, booking) => {
        return this.api.post(`/create?owner_id=${owner_id}&user_id=${user_id}`, booking);
    };
    getAllBooking = () => {
        return this.api.get("/get-all");
    };

    getVanBookings = (van_id) => {
        const reservedDays = [];
        return this.api.get(`/get-van-bookings/${van_id}`);
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
