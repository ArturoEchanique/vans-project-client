import axios from "axios";

class UserService {
    constructor() {
        this.api = axios.create({ baseURL: `${process.env.REACT_APP_API_URL}/user` });
        this.api.interceptors.request.use((config) => {
            const token = localStorage.getItem("authToken");

            if (token) {
                config.headers = { Authorization: `Bearer ${token}` };
            }

            return config;
        });
    }

    getUsers = () => {
        return this.api.get("/get-all");
    };

    getOneUser = (user_id) => {
        return this.api.get(`/${user_id}`);
    };
    editUser = (user_id) => {
        return this.api.post(`/edit/${user_id}`);
    };
    deleteUser = (user_id) => {
        return this.api.post(`/delete/${user_id}`);
    };
    addUserBookings = (user_id, ownerBookings) => {
        return this.api.post(`/${user_id}/addUserBookings`, ownerBookings)
    }

}

const userService = new UserService();
export default userService;
