import axios from 'axios'

class VanService {

    constructor() {
        this.app = axios.create({ baseURL: `${process.env.REACT_APP_API_URL}/vans` })
        this.app.interceptors.request.use((config) => {

            const token = localStorage.getItem("authToken");

            if (token) {
                config.headers = { Authorization: `Bearer ${token}` }
            }

            return config
        })
    }

    createVan = van => {
        return this.app.post('/create', van)
    }

    getVans = (filterData) => {
        const startDate = filterData.startDate.getTime()
        const endDate = filterData.endDate.getTime()
        let queryComputed = `?name=${filterData.name}&solarPower=${filterData.solarPower}&startDate=${startDate}&endDate=${endDate}`
        return this.app.get(`/${queryComputed}`)
    }

    // getWithQuery = () => {
    //     return this.app.get('/get-all')
    // }

    getOneVan = id => {
        return this.app.get(`/${id}`)
    }

    getOneVanAndUpdate = (id, van) => {
        return this.app.post(`/${id}/edit`, van)
    }

    getOneVanAndRemove = id => {
        return this.app.post(`/${id}/delete`)
    }

}

const vanService = new VanService()

export default vanService