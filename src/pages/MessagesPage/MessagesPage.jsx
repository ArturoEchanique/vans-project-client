import { useEffect, useState, useContext } from "react";
import { Button, ButtonGroup, Row, Col, Container } from "react-bootstrap";
import { Link, useParams } from "react-router-dom";
import DatePicker from "../../components/DatePicker/DatePicker";
import userService from "./../../services/user.service";
import { AuthContext } from "../../context/auth.context"
import VanDetailsCard from "../../components/VanDetailsCard/VanDetailsCard";
import VanService from "../../services/van.service";
import messagesService from "./../../services/messages.service";
import bookingsService from "./../../services/bookings.service";
import chatService from "./../../services/chat.service";


const MessagesPage = ({ setBookingInfo }) => {

    const { isLoggedIn, isLoading, user } = useContext(AuthContext)
    const [chats, setChats] = useState([]);
    const [selectedChat, setSelectedChat] = useState(0);
    const [messages, setMessages] = useState([]);
    const [messageText, setMessageText] = useState("");
    const [bookingDetails, setBookingDetails] = useState([]);
    const [userDetails, setUserDetails] = useState({});
  


    useEffect(() => {
        loadUser()
        loadUserChats()

    }, [user])

    useEffect(() => {
        if (chats.length > 0) loadChatMessages()
    }, [chats, selectedChat])

    const getChatPartner = (chat) => {
        if (chat.owners[0]._id.toString() == user._id.toString()) return chat.owners[1]
        return chat.owners[0]
    }

    const loadUser = () => {
        userService
            .getOneUser(user._id)

            .then(({ data }) => {
                console.log("user data is,", data)

                setUserDetails(data);

            })
            .catch((err) => console.log(err));
    };

    const loadUserChats = () => {
        console.log("trying getting chats")
        chatService
            .getUserChats(user._id)

            .then(({ data }) => {
                console.log("chats are,", data)

                setChats(data);
            })
            .catch((err) => console.log(err));
    };


    const loadChatMessages = () => {

        console.log("chats are", chats)
        messagesService
            .getChatMessages(chats[selectedChat]._id)
            .then(({ data }) => {
                console.log("messages data is...", data)
                setMessages(data)
            })
            .catch((err) => console.log(err));
    }

    const handleMessageSubmit = (e) => {
        e.preventDefault();
        const message = {
            owner: user._id,
            chat: chats[selectedChat],
            messageDate: new Date(),
            text: messageText,
        }
        messagesService
            .createMessage(message)
            .then(({ data }) => {
                console.log("message created")
                loadChatMessages()
                setMessageText("")
            })
            
            .catch((err) => console.log(err));

    }

    const handleInputChange = (e) => {
        const { value, name } = e.target
        setMessageText(value)
    }



    return (
        <Container>
            <Row>
                <Col>
                    <ButtonGroup>
                        {chats.map((chat, idx) => {
                            return (
                                <Button key={idx} onClick={() => setSelectedChat(idx)}
                                    active={selectedChat === idx} >
                                    {getChatPartner(chat).username}
                                </Button>

                            )
                        })}
                    </ButtonGroup>



                </Col>
                <Col>
                    <h3>{messages.map((message,idx) => {
                        return (
                            <p key={idx}>{message.text}</p>
                        )
                    })}</h3>
                    <form onSubmit={handleMessageSubmit}>
                        <label>
                            new messate
                            <textarea value={messageText} onChange={handleInputChange} />
                        </label>
                        <input type="submit" value="Submit" />
                    </form>

                </Col>
                <Col>
                    <h3>Reservation info
                        van owner:
                        {chats.length > 0 && chats[selectedChat].booking.bookedVan.owner.username}
                    </h3>

                </Col>
            </Row>
        </Container>
    );
};

export default MessagesPage;
