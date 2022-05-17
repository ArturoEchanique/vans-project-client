import axios from "axios";

class ChatsService {
    constructor() {
        this.api = axios.create({ baseURL: `${process.env.REACT_APP_API_URL}/chats` });
        this.api.interceptors.request.use((config) => {
            const token = localStorage.getItem("authToken");

            if (token) {
                config.headers = { Authorization: `Bearer ${token}` };
            }

            return config;
        });
    }

    getChats = () => {
        return this.api.get("/get-all");
    };

    getUserChats = (user_id) => {
        return this.api.get(`/get-user-chats/${user_id}`);
    };

    getOneChat = (chat_id) => {
        return this.api.get(`/${chat_id}`);
    };

    createChat= (chat) => {
        return this.api.post("/create-chat", chat);
    }

    editChat = (chat_id, chat) => {
        return this.api.post(`/edit/${chat_id}`, chat);
    };

    deleteChat = (chat_id) => {
        return this.api.post(`/delete/${chat_id}`);
    };
}

const chatsService = new ChatsService();
export default chatsService;
