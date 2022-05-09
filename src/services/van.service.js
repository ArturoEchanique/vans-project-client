import axios from 'axios'

class VanService {

    constructor() {
        this.app = axios.create({ baseURL: 'http://localhost:5005/api/vans' })
    }

    createVan = van => {
        return this.app.post('/create-van', van)
    }

    getVans = () => {
        return this.app.get('/get-all-vans')
    }

    getOneVan = id => {
        return this.app.get(`/get-onevan/${id}`)
    }

    getOneVanAndUpdate = (id, van) => {
        return this.app.post(`/get-onevan/${id}/edit`, van)
    }

    getOneVanAndRemove = id => {
        return this.app.post(`/get-onevan/${id}/delete`)
    }

}

const vanService = new VanService()

export default vanService