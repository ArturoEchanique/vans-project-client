import axios from "axios"

class VanService {
    constructor() {
        this.api = axios.create({ baseURL: `${process.env.REACT_APP_API_URL}/vans` })
        this.api.interceptors.request.use((config) => {
            const token = localStorage.getItem("authToken")

            if (token) {
                config.headers = { Authorization: `Bearer ${token}` }
            }
            return config
        })
    }
    createVan = (van) => {
        return this.api.post("/create", van)
    }

    createVan = (van) => {
        return this.api.post("/create", van);
    };

    addReview = (van_id, review_id) => {
        return this.api.post("/addreview", { van_id, review_id });
    };

    getVans = (filterData) => {
        if (filterData.startDate && typeof filterData.startDate === "object") filterData.startDate = filterData.startDate.getTime()
        if (filterData.endDate && typeof filterData.endDate === "object") filterData.endDate = filterData.endDate.getTime()
        let query = ""
        for (const [key, value] of Object.entries(filterData)) {
            if (key == "mapInitLocationX" || key == "mapInitLocationY") continue
            else {
                if (value || key == "name" || key == "priceStart" || key == "priceEnd" || key == "passengersStart" || key == "passengersEnd") query += key + "=" + value + "&";
            }
        }
        return this.api.get(`/?${query}`)
    }

    getUserVans = (_id) => {
        return this.api.get(`/get-vans?owner=${_id}`);
    }

    getOneVan = (id) => {
        return this.api.get(`/${id}`)
    }

    getOneVanAndUpdate = (id, van) => {
        return this.api.post(`/${id}/edit`, van)
    }

    getOneVanAndRemove = (id) => {
        return this.api.post(`/${id}/delete`)
    }
}

const vanService = new VanService()

export default vanService
