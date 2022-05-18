import axios from "axios"

class MessagesService {
    constructor() {
        this.api = axios.create({ baseURL: `${process.env.REACT_APP_API_URL}/messages` })
        this.api.interceptors.request.use((config) => {
            const token = localStorage.getItem("authToken")

            if (token) {
                config.headers = { Authorization: `Bearer ${token}` }
            }

            return config
        })
    }

    getMessages = () => {
        return this.api.get("/get-all")
    }

    getUserMessages = (user_id) => {
        return this.api.get(`/get-user-messages/${user_id}`)
    }

    getChatMessages = (chat_id) => {
        return this.api.get(`/get-chat-messages/${chat_id}`)
    }

    getOneMessage = (message_id) => {
        return this.api.get(`/${message_id}`)
    }

    createMessage = (message) => {
        return this.api.post("/create-message", message)
    }

    editMessage = (message_id, message) => {
        return this.api.post(`/edit/${message_id}`, message)
    }

    deleteMessage = (message_id) => {
        return this.api.post(`/delete/${message_id}`)
    }
}

const messagesService = new MessagesService()
export default messagesService
