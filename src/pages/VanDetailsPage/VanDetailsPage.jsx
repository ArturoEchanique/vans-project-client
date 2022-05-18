import { useEffect, useState, useContext } from "react";
import { Button, Row, Col, Container } from "react-bootstrap";
import { Link, useParams } from "react-router-dom";
import DatePicker from "../../components/DatePicker/DatePicker";
import ReviewsSection from "../../components/ReviewsSection/ReviewsSection";
import userService from "./../../services/user.service";
import { AuthContext } from "../../context/auth.context"
import VanDetailsCard from "../../components/VanDetailsCard/VanDetailsCard";
import VanService from "../../services/van.service";
import BookingsService from "../../services/bookings.service";
import { MessageContext } from '../../context/message.context'

const VanDetails = ({ setBookingInfo, bookingInfo }) => {
    const [vanDetails, setVanDetails] = useState({});
    const [isFavorite, setIsFavorite] = useState(false);
    const [reservedDays, setReservedDays] = useState([]);
    const { van_id } = useParams();
    const { isLoggedIn, isLoading, user } = useContext(AuthContext)
    const { showMessage } = useContext(MessageContext)

    useEffect(() => {
        getVan();
    }, []);

    useEffect(() => {
        vanDetails && getReservedDays()
    }, [vanDetails]);

    useEffect(() => {

        user && getIsFavorite()
    }, [user]);

    const getVan = () => {
        VanService.getOneVan(van_id)
            .then(({ data }) => {
                setVanDetails(data);
            })
            .catch((err) => console.log(err));
    };

    const getReservedDays = () => {
        const reservedDaysArr = []
        BookingsService.getVanBookings(van_id)
            .then(({ data }) => {
                data.forEach(booking => {
                    for (let d = new Date(booking.startDate); d <= new Date(booking.endDate); d.setDate(d.getDate() + 1)) {
                        reservedDaysArr.push(new Date(d))
                    }
                })
                setReservedDays(reservedDaysArr);
            })
            .catch((err) => console.log(err));
        // const reservedDays = 
        // console.log("Here reserved days are", reservedDays)
        
    };



    const getIsFavorite = () => {

        userService
            .getOneUser(user._id)
            .then(({ data }) => {
                setIsFavorite(data.favoriteVans.includes(van_id))
            })
            .catch((err) => console.log(err));
    };

    const addFavoriteVan = () => {
        userService
            .addFavoriteVan(user._id, van_id)
            .then(() => getIsFavorite())
            .catch((err) => console.log(err));
    }
    const removeFavoriteVan = () => {
        userService
            .removeFavoriteVan(user._id, van_id)
            .then(() => getIsFavorite())
            .catch((err) => console.log(err));
    }

    const setDateAndPrice = (dates) => {
        const startDay = dates.startDate;
        const endDay = dates.endDate;

        const diffTime = Math.abs(endDay - startDay);
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
        const bookingPrice = diffDays * vanDetails.dayPrice;



        let bookingInfo = {
            startDate: dates.startDate,
            endDate: dates.endDate,
            price: bookingPrice,
            van_id: van_id,
        };

        setBookingInfo(bookingInfo);
    };

    const reserveButtonClicked = (e) => {
        if(!bookingInfo.startDate) {
            showMessage("Error", "Insert an start date to reserve")
            console.log("insert and start date!}")
            e.preventDefault()
        }
        if (!bookingInfo.endDate) {
            showMessage("Error", "Insert an end date to reserve")
            console.log("insert and end date!}")
            e.preventDefault()
        }
        
       console.log("booking info is", bookingInfo)
    }

    // const setDateAndPriceHard = (dates) => {
    //     let bookingInfo = { ...dates, price: 100,van_id:van_id };
    //     setBookingInfo(bookingInfo);
    // };

    return (
        <Container>
            <Row>
                <VanDetailsCard {...vanDetails} />
            </Row>
            <Row>
                <Col>
                    <h3>Aqui van nuestras reservas </h3>
                </Col>
                <Col>
                    <DatePicker startDate={bookingInfo.startDate} endDate={bookingInfo.endDate} reservedDays={reservedDays} handleDatesChange={setDateAndPrice} />
                    {vanDetails.owner !== user?._id
                        ?
                        <Link onClick={reserveButtonClicked} to={"/booking"}>
                            <Button variant="outline-dark" size="lg">
                                Reserve
                            </Button>
                        </Link>
                        :
                        <Link to={`/${vanDetails._id}/edit`}>
                            <Button variant="outline-dark" size="lg">
                                Edit my van
                            </Button>
                        </Link>

                    }

                    <Button onClick={isFavorite ? (() => removeFavoriteVan()) : (() => addFavoriteVan())} variant={isFavorite ? "danger" : "outline-danger"} size="lg">
                        favorite
                    </Button>
                </Col>
            </Row>
            <Row>
                {<ReviewsSection vanReviews={vanDetails.reviews}></ReviewsSection>}
            </Row>
        </Container>
    );
};

export default VanDetails;
