import axios from 'axios'

class VanService {

    constructor() {
        this.app = axios.create({ baseURL: 'http://localhost:5005/api/vans' })
    }

    createVan = van => {
        return this.app.post('/create', van)
    }

    getVans = (query) => {
        console.log("query is", query)
        let queryComputed= `?name=${query}`
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