import axios from "axios"

class ProfileImage {
    constructor() {
        this.api = axios.create({ baseURL: `https://randomuser.me/api/` })
        this.api.interceptors.request.use((config) => {
            const token = localStorage.getItem("authToken")

            if (token) {
                config.headers = { Authorization: `Bearer ${token}` }
            }

            return config
        })
    }
    getRandomImage = () => {
        return this.api.get("/")
    };

    getReviews = () => {
        return this.api.get("/get-all")
    }

    getOneReview = (review_id) => {
        return this.api.get(`/${review_id}`)
    }

    editReview = (review_id, review) => {
        return this.api.post(`/edit/${review_id}`, review)
    }

    deleteReview = (review_id) => {
        return this.api.post(`/delete/${review_id}`)
    }
}

const profileImage = new ProfileImage()
export default profileImage
