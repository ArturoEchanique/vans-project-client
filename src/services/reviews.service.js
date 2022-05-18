import axios from "axios";

class ReviewsService {
    constructor() {
        this.api = axios.create({ baseURL: `${process.env.REACT_APP_API_URL}/reviews` });
        this.api.interceptors.request.use((config) => {
            const token = localStorage.getItem("authToken");

            if (token) {
                config.headers = { Authorization: `Bearer ${token}` };
            }

            return config;
        });
    }
    createReviews = (review) => {
        return this.api.post("/create", review)
    };

    getReviews = () => {
        return this.api.get("/get-all");
    };

    getOneReview = (review_id) => {
        return this.api.get(`/${review_id}`);
    };

    editReview = (review_id, review) => {
        return this.api.post(`/edit/${review_id}`, review);
    };

    deleteReview = (review_id) => {
        return this.api.post(`/delete/${review_id}`);
    };
}

const reviewsService = new ReviewsService();
export default reviewsService;
