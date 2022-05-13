import axios from 'axios'

class VanService {

    constructor() {
        this.api = axios.create({ baseURL: `${process.env.REACT_APP_API_URL}/vans` })
        this.api.interceptors.request.use((config) => {

            const token = localStorage.getItem("authToken");

            if (token) {
                config.headers = { Authorization: `Bearer ${token}` }
            }

            return config
        })
    }

    createVan = van => {
        return this.api.post('/create', van)
    }

    getVans = (filterData) => {
        filterData.startDate = filterData.startDate.getTime()
        filterData.endDate = filterData.endDate.getTime()
        let query = ""
        for (const [key, value] of Object.entries(filterData)) {
            if (value || key == "name") query += key + "=" + value + "&"
        }
        // let queryComputed = `name=${filterData.name}&solarPower=${filterData.solarPower}&startDate=${startDate}&endDate=${endDate}`
        return this.app.get(`/?${query}`)
    }

    getOneVan = id => {
        return this.api.get(`/${id}`)
    }

    getOneVanAndUpdate = (id, van) => {
        return this.api.post(`/${id}/edit`, van)
    }

    getOneVanAndRemove = id => {
        return this.api.post(`/${id}/delete`)
    }

}

const vanService = new VanService()

export default vanService