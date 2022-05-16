import axios from 'axios'

class UploadService {

    constructor() {

        this.app = axios.create({ baseURL: `${process.env.REACT_APP_API_URL}/upload` })

        this.app.interceptors.request.use((config) => {

            const token = localStorage.getItem("authToken");

            if (token) {
                config.headers = { Authorization: `Bearer ${token}` }
            }

            return config
        })
    }

    uploadImage(imageForm) {
        return this.app.post('/image', imageForm)
    }

    uploadMultipleImage(photos) {
        return this.app.post('/multipleImages', photos)
    }
}

const uploadService = new UploadService()

export default uploadService