import axios from 'axios'

class VanService {
    constructor() {
        this.api = axios.create({ baseURL: `${process.env.REACT_APP_API_URL}/vans` });
        this.api.interceptors.request.use((config) => {
            const token = localStorage.getItem("authToken");

            if (token) {
                config.headers = { Authorization: `Bearer ${token}` };
            }

            return config;
        });
    }

    createVan = (van) => {
        return this.api.post("/create", van);
    };

    getVans = (filterData) => {
        console.log("filterData", filterData);
        if (filterData.startDate && typeof filterData.startDate === "object") filterData.startDate = filterData.startDate.getTime();
        if (filterData.endDate && typeof filterData.endDate === "object") filterData.endDate = filterData.endDate.getTime();
        let query = "";
        for (const [key, value] of Object.entries(filterData)) {
            if (value || key == "name" || key == "priceStart" || key == "priceEnd") query += key + "=" + value + "&";
        }
        console.log("query is", query);
        // let queryComputed = `name=${filterData.name}&solarPower=${filterData.solarPower}&startDate=${startDate}&endDate=${endDate}`
        return this.api.get(`/?${query}`);
    };

    getUserVans = (_id) => {
    
        console.log(_id);
        
        return this.api.get(`/get-vans?owner=${_id}`);
    };

    getOneVan = (id) => {
        return this.api.get(`/${id}`);
    };

    getOneVanAndUpdate = (id, van) => {
        return this.api.post(`/${id}/edit`, van);
    };

    getOneVanAndRemove = (id) => {
        return this.api.post(`/${id}/delete`);
    };
}

const vanService = new VanService()

export default vanService