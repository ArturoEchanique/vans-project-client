import axios from 'axios'

class VanService {

    constructor() {
        this.app = axios.create({ baseURL: `${process.env.REACT_APP_API_URL}/vans` })
    }

    createVan = van => {
        return this.app.post('/create', van)
    }

    getVans = () => {
        return this.app.get('/get-all')
    }

    getWithQuery = () => {
        return this.app.get('/get-all')
    }

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