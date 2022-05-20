import "./VanDetailsPage.css"
import { Link, useParams } from "react-router-dom"
import VanService from "../../services/van.service"
import { useEffect, useState, useContext } from "react"
import userService from "./../../services/user.service"
import { AuthContext } from "../../context/auth.context"
import { Button, Row, Col, Container, Modal } from "react-bootstrap"
import BookingsService from "../../services/bookings.service"
import { MessageContext } from "../../context/message.context"
import DatePicker from "../../components/DatePicker/DatePicker"
import ReviewForm from "../../components/ReviewForm/ReviewForm"
import ReviewComment from "../../components/ReviewComment/ReviewComment"
import VanDetailsCard from "../../components/VanDetailsCard/VanDetailsCard"
import ReactMapVan from "../../components/ReactMapVan/ReactMapVan"
import Heart from "react-animated-heart";
import { useNavigate } from "react-router-dom"

const VanDetails = ({ setBookingInfo, bookingInfo }) => {
    const [vanDetails, setVanDetails] = useState({})
    const [isFavorite, setIsFavorite] = useState(false)
    const [reservedDays, setReservedDays] = useState([])
    const { van_id } = useParams()
    const { isLoggedIn, isLoading, user } = useContext(AuthContext)
    const { showMessage } = useContext(MessageContext)
    const navigate = useNavigate()

    useEffect(() => {
        getVan()
    }, [])

    useEffect(() => {
        vanDetails && getReservedDays()
    }, [vanDetails])

    useEffect(() => {
        user && getIsFavorite()
    }, [user])

    const getVan = () => {
        VanService.getOneVan(van_id)
            .then(({ data }) => {
                setVanDetails(data)
                console.log("van details are", data.location.coordinates)
            })
            .catch((err) => console.log(err))
    }

    const getReservedDays = () => {
        const reservedDaysArr = []
        BookingsService.getVanBookings(van_id)
            .then(({ data }) => {
                data.forEach((booking) => {
                    for (let d = new Date(booking.startDate); d <= new Date(booking.endDate); d.setDate(d.getDate() + 1)) {
                        reservedDaysArr.push(new Date(d))
                    }
                })
                setReservedDays(reservedDaysArr)
            })
            .catch((err) => console.log(err))
    }

    const getIsFavorite = () => {
        userService
            .getOneUser(user._id)
            .then(({ data }) => {
                console.log("getting is favorite data is", data)
                const favoriteVansIds = data.favoriteVans.map(van => van._id)
                setIsFavorite(favoriteVansIds.includes(van_id))
            })
            .catch((err) => console.log(err))
    }

    const addFavoriteVan = () => {
        if (!user) {
            navigate("/login")
        }
        userService
            .addFavoriteVan(user._id, van_id)
            .then((response) => {
                getIsFavorite()
            })
            .catch((err) => console.log(err))
    }
    const removeFavoriteVan = () => {
        userService
            .removeFavoriteVan(user._id, van_id)
            .then(() => getIsFavorite())
            .catch((err) => console.log(err))
    }

    const setDateAndPrice = (dates) => {
        const startDay = dates.startDate
        const endDay = dates.endDate

        const diffTime = Math.abs(endDay - startDay)
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))
        const bookingPrice = diffDays * vanDetails.dayPrice

        let bookingInfo = {
            startDate: dates.startDate,
            endDate: dates.endDate,
            price: bookingPrice,
            van_id: van_id,
        }

        setBookingInfo(bookingInfo)
    }


    const [showModal, setShowModal] = useState(false)

    const openModal = () => setShowModal(true)
    const closeModal = () => setShowModal(false)

    const fireFinalActions = () => {
        closeModal()
        getVan()
    }

    const reserveButtonClicked = (e) => {
        if (!bookingInfo.startDate) {
            showMessage("Error", "Insert an start date to reserve")

            e.preventDefault()
        }
        if (!bookingInfo.endDate) {
            showMessage("Error", "Insert an end date to reserve")

            e.preventDefault()
        }
    }

    const { setReload, _id, imageUrl, name, description, solarPower, shower, bathroom, dayPrice, vanRating, owner, hideDeleteButton, solarRoof, kitchen, heatedSeats } = vanDetails

    return (
        <div className="detailsPage">
            <Container fluid>
                <Row >
                    <Col style={{ paddingLeft: "0", paddingRight: "0", flex: "1", height: "100vh", overflowY: "scroll" }}>
                        <img className="vanImage" src={vanDetails.imageUrl}></img>
                        <Container fluid className="detailsLeftBlock">
                            <Row className="justify-content-left">
                                <Col xs={11} className="justify-content-center">
                                    <div className="detailsPageTitle">
                                        <h2>{name}</h2>
                                    </div>
                                </Col>

                                <Col xs={1} className="justify-content-center">
                                    <div className="detailsHeartIcon">
                                        <Heart isClick={isFavorite} onClick={isFavorite ? () => removeFavoriteVan(_id) : () => addFavoriteVan(_id)} />
                                    </div>
                                </Col>
                            </Row>

                            <Row className="justify-content-left vanDetailsIconsRow">
                                {solarPower &&
                                    <Col xs={1} className="justify-content-center">
                                        <img className="vanCardIcon" src="./../../images/sunIcon.png"></img>
                                    </Col>
                                }
                                {shower &&
                                    <Col xs={1} className="justify-content-center">
                                        <img className="vanCardIcon" src="./../../images/showerIcon.png"></img>
                                    </Col>
                                }
                                {solarRoof &&
                                    <Col xs={1} className="justify-content-center" >
                                        <img className="vanCardIcon" src="./../../images/solarRoofIcon.png"></img>
                                    </Col>
                                }
                                {kitchen &&
                                    <Col xs={1} className="justify-content-center" >
                                        <img className="vanCardIcon" src="./../../images/kitchenIcon.png"></img>
                                    </Col>
                                }
                                {bathroom &&
                                    <Col xs={1} className="justify-content-center" >
                                        <img className="vanCardIcon" src="./../../images/bathroomIcon.png"></img>
                                    </Col>
                                }
                                {heatedSeats &&
                                    <Col xs={1} className="justify-content-center" >
                                        <img className="vanCardIcon" src="./../../images/heatedSeatsIcon.png"></img>
                                    </Col>
                                }

                                <Col d-flex justify-content-center>
                                    <DatePicker startDate={bookingInfo.startDate} endDate={bookingInfo.endDate} reservedDays={reservedDays} handleDatesChange={setDateAndPrice} />
                                </Col>

                                <Col>
                                    {vanDetails.owner !== user?._id ? (
                                        <Link onClick={reserveButtonClicked} to={"/booking"}>

                                            <Button variant="dark detailsButtonWide">
                                                Book Van
                                            </Button>

                                        </Link>
                                    ) : (
                                        <Link to={`/${vanDetails._id}/edit`}>
                                            <Button className="search-button" variant="dark detailsButtonWide" size="lg">
                                                Edit my van
                                            </Button>
                                        </Link>
                                    )}
                                </Col>
                            </Row>
                            <div id="modal">
                                <Modal show={showModal} onHide={closeModal}>
                                    <Modal.Header closeButton>
                                        <Modal.Title>Add Review</Modal.Title>
                                    </Modal.Header>
                                    <Modal.Body>
                                        <ReviewForm fireFinalActions={fireFinalActions} />
                                    </Modal.Body>
                                </Modal>
                                <Row>
                                    <div className="reviewSectionTitle"><h2>{"★ 4,95 - 60 reviews"}</h2></div>

                                    {vanDetails.reviews && vanDetails.reviews.map(review => {
                                        return (
                                            <Col xs={6}>
                                                <ReviewComment vanReview={review}></ReviewComment>
                                            </Col>
                                        )

                                    })}
                                    {/* Comment vanReviews={vanDetails.reviews}></ReviewsSection> */}

                                </Row>
                                <div className="reviewButton">
                                    {isLoggedIn && <Button variant="dark addReviewButton" onClick={openModal}>Add Review</Button>}
                                </div>

                            </div >
                        </Container >

                    </Col>
                    <Col xs={3} style={{ paddingLeft: "0", paddingRight: "0" }}>
                        {< ReactMapVan initLocationX={vanDetails.location ? vanDetails.location.coordinates[0] : 40} initLocationY={vanDetails.location ? vanDetails.location.coordinates[1] : 3} />
                        }
                    </Col>

                </Row>
            </Container>
        </div>
    )

}

export default VanDetails
