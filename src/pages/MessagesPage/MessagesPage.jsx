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
import "./MessagesPage.css"
import ChatButton from "../../components/ChatButton/ChatButton";
import ChatMessage from "../../components/ChatMessage/ChatMessage";
import MessagesBookingDetails from "../../components/MessagesBookingDetails/MessagesBookingDetails";



const MessagesPage = ({ setBookingInfo }) => {

    const { isLoggedIn, isLoading, user } = useContext(AuthContext)
    const [chats, setChats] = useState([]);
    const [selectedChat, setSelectedChat] = useState(0);
    const [selectedCategory, setSelectedCategory] = useState("owned");
    const [messages, setMessages] = useState([]);
    const [messageText, setMessageText] = useState("");
    // const [bookingDetails, setBookingDetails] = useState([]);
    const [userDetails, setUserDetails] = useState({});



    useEffect(() => {
        loadUser()
        loadUserChats()

    }, [user])

    useEffect(() => {
        if (chats.length > 0) loadChatMessages()
    }, [chats, selectedChat])

    const getChatPartner = (chat) => {
        console.log("chat owners are, ", chat)

        if(chat) if (chat.owners && chat.owners[0]._id.toString() == user._id.toString()) return chat.owners[1]
        return chat?.owners[0]
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
        <div className="messagesPageMain">
            <Row style={{ padding: 0 }} className="messagesPageSubMain">
                <Col xs={3} style={{ padding: "0px" }}>
                    <h3 className="messagesSectionTitle">Messages</h3>
                    <div className="chatsCategoriesMain">
                        <button className={"chatCategoryButton " + (selectedCategory === "owned" ? "selected" : "unselected")} onClick={() => setSelectedCategory("owned")}
                            active={selectedCategory === "owned"}>
                            Owned vans
                        </button>
                        <button className={"chatCategoryButton " + (selectedCategory === "booked" ? "selected" : "unselected")} onClick={() => setSelectedCategory("booked")}
                            active={selectedCategory === "booked"}>
                            Booked vans
                        </button>
                    </div>
                    <div className="chatsMainContainer">
                        {chats.map((chat, idx) => {
                            if (selectedCategory === "owned"){
                                if (chat.booking.bookedVan.owner._id === user._id) {
                                    return (
                                        <button className={"chatButton " + (selectedChat === idx ? "selected" : "unselected")} key={idx} onClick={() => setSelectedChat(idx)}
                                            active={selectedChat === idx} >
                                            <ChatButton interlocutor={getChatPartner(chat)} bookingStartDate={chat.booking.startDate} bookingEndDate={chat.booking.endDate}></ChatButton>
                                        </button>
                                    )
                                }
                            }
                            else{
                                if (chat.booking.bookedVan.owner._id !== user._id) {
                                    return (
                                        <button className={"chatButton " + (selectedChat === idx ? "selected" : "unselected")} key={idx} onClick={() => setSelectedChat(idx)}
                                            active={selectedChat === idx} >
                                            <ChatButton interlocutor={getChatPartner(chat)} bookingStartDate={chat.booking.startDate} bookingEndDate={chat.booking.endDate}></ChatButton>
                                        </button>
                                    )
                                }
                            }
                            // return (
                            //     <button className={"chatButton " + (selectedChat === idx ? "selected" : "unselected")} key={idx} onClick={() => setSelectedChat(idx)}
                            //         active={selectedChat === idx} >
                            //         <ChatButton interlocutor={getChatPartner(chat)} bookingStartDate={chat.booking.startDate} bookingEndDate={chat.booking.endDate}></ChatButton>
                            //     </button>
                            // )
                        })}
                    </div>
                </Col>
                <Col xs={6} style={{ padding: "0px" }}>
                    <h3 className="messagesSectionTitle">{getChatPartner(chats[selectedChat])?.username}</h3>
                    <div className="messagesMainContainer">
                        {messages.map((message, idx) => {
                            return (
                                <>
                                    <ChatMessage key={idx} message={message}></ChatMessage>
                                    {/* <p key={idx}>{message.text}</p> */}
                                </>

                            )
                        })}
                    </div>
                    <div className="messagesSendSection">
                        <form className="sendMessageArea" onSubmit={handleMessageSubmit}>

                            <input className="writeMessageInput textInputClean textInputBig" type="text" value={messageText} placeholder="Write a message" onChange={handleInputChange} />

                            <input className="sendMessageIcon" type="image" src="./../../images/sendMessageIcon.png" />
                        </form>
                    </div>

                </Col>
                <Col xs={3} style={{ padding: "0px" }}>
                    <h3 className="messagesSectionTitle">Booking details</h3>
                    {chats.length > 0 && <MessagesBookingDetails vanDetails={chats[selectedChat].booking.bookedVan} bookingInfo={chats[selectedChat].booking}/>}
                    {/* chats[selectedChat].booking.bookedVan.owner.username */}


                </Col>
            </Row>
        </div >
    );
};

export default MessagesPage;
