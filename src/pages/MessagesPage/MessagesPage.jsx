import { useEffect, useState, useContext } from "react";
import { Button, Row, Col, Container } from "react-bootstrap";
import { Link, useParams } from "react-router-dom";
import DatePicker from "../../components/DatePicker/DatePicker";
import ReviewsSection from "../../components/ReviewsSection/ReviewsSection";
import userService from "./../../services/user.service";
import { AuthContext } from "../../context/auth.context"
import VanDetailsCard from "../../components/VanDetailsCard/VanDetailsCard";
import VanService from "../../services/van.service";
import messagesService from "./../../services/messages.service";
import bookingsService from "./../../services/bookings.service";
const MessagesPage = ({ setBookingInfo }) => {

    const { isLoggedIn, isLoading, user } = useContext(AuthContext)
    const [messages, setMessages] = useState([]);
    // const [vanDetails, setVanDetails] = useState({});
    // const [isFavorite, setIsFavorite] = useState(false);
    // const { van_id } = useParams();
    // const { isLoggedIn, isLoading, user } = useContext(AuthContext)

    useEffect(() => {
        loadMessages()
    }, []);

    const loadMessages = () => {
        
        messagesService
            .getUserMessages(user._id)
            .then(({ data }) => {
                   console.log("data is...", data)
                   setMessages(data)
            })
            .catch((err) => console.log(err));
    };

    const loadBookings = () => {

        bookingsService
            .getUserMessages(user._id)
            .then(({ data }) => {
                console.log("data is...", data)
                setMessages(data)
            })
            .catch((err) => console.log(err));
    };

    // const getVan = () => {
    //     VanService.getOneVan(van_id)
    //         .then(({ data }) => {
    //             setVanDetails(data);
    //         })
    //         .catch((err) => console.log(err));
    // };

    // useEffect(() => {
    //     getVan();
    // }, []);

    // useEffect(() => {

    //     user && getIsFavorite()
    // }, [user]);

    // const getIsFavorite = () => {

    //     userService
    //         .getOneUser(user._id)
    //         .then(({ data }) => {
    //             setIsFavorite(data.favoriteVans.includes(van_id))
    //         })
    //         .catch((err) => console.log(err));
    // };

    // const addFavoriteVan = () => {
    //     userService
    //         .addFavoriteVan(user._id, van_id)
    //         .then(() => getIsFavorite())
    //         .catch((err) => console.log(err));
    // }
    // const removeFavoriteVan = () => {
    //     userService
    //         .removeFavoriteVan(user._id, van_id)
    //         .then(() => getIsFavorite())
    //         .catch((err) => console.log(err));
    // }

    // const setDateAndPrice = (dates) => {
    //     const startDay = dates.startDate;
    //     const endDay = dates.endDate;

    //     const diffTime = Math.abs(endDay - startDay);
    //     const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    //     const bookingPrice = diffDays * vanDetails.dayPrice;



    //     let bookingInfo = {
    //         startDate: dates.startDate,
    //         endDate: dates.endDate,
    //         price: bookingPrice,
    //         van_id: van_id,
    //     };

    //     setBookingInfo(bookingInfo);
    // };



    return (
        <Container>
            <Row>
                <Col>
                    <h3>Chats </h3>
                </Col>
                <Col>
                    <h3>Mensajes </h3>
                </Col>
                <Col>
                    <h3>Quiza info de la reserva</h3>
                </Col>
            </Row>
        </Container>
    );
};

export default MessagesPage;
