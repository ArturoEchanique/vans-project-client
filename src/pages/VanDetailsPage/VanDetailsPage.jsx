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
    console.log("vanDetails are", vanDetails)
    return (
        <div className="detailsPage">
            <div className="detailsPageSub">
                <div className="vanImageTopInfo">
                    <Row className="mb-3">
                        <Col xs="auto" className="d-flex justify-content-start">
                            <h3>Owner: Pablo Perez</h3>
                        </Col>
                        <Col className="d-flex align-items-center">
                            {vanDetails.reviews && <div className="bookingInfoRating"><strong>{`★ 4,95 - ${vanDetails.reviews.length} reviews`}</strong></div>}
                        </Col>
                        <Col xs={2} className="d-flex align-items-center justify-content-end">
                            <button className="heartButton" onClick={isFavorite ? () => removeFavoriteVan(_id) : () => addFavoriteVan(_id)}>
                                <img className={"heartIcon " + (isFavorite ? "redHeart" : "greyHeart")} src="./../../images/heartIcon.png"></img>&nbsp; Save van
                            </button>
                        </Col>

                    </Row>

                </div>
                <div className="vanImageTopInfo">
                </div>

                <img className="vanImage" src={vanDetails?.imageUrl}></img>
                <Row className="mt-3">
                    <Col xs={7} >
                        <div className="vanInfoMain">
                            <Row className="justify-content-left align-items-center mb-4">
                                <Col xs={10} className="justify-content-center">
                                    <h3 className="detailsPageTitle">{name?.length > 33 ? (name.slice(0, 33) + " ...") : name}</h3>
                                </Col>
                                <Col xs="auto" className="d-flex align-items-center">
                                    <img className="vanOwnerProfileImg" src={vanDetails.owner?.imageUrl}></img>
                                </Col>

                            </Row>
                            <p>{vanDetails.description}</p>

                            <br></br>
                            <br></br>
                            <br></br>
                            <h4 className="detailsPageTitle">{"Features"}</h4>
                            <Row className="d-flex justify-content-start vanDetailsIconsRow">
                                {solarPower &&

                                    <Col xs={4} style={{ paddingLeft: "0" }} className="d-flex justify-content-start mb-5">  <img className="vanCardIcon" src="./../../images/sunIcon.png"></img> &nbsp; &nbsp; Solar power&nbsp; &nbsp; </Col>

                                }
                                {shower &&

                                    <Col xs={4} style={{ paddingLeft: "0" }} className="d-flex justify-content-start mb-5"><img className="vanCardIcon" src="./../../images/showerIcon.png"></img> &nbsp; &nbsp; Shower&nbsp; &nbsp; </Col>

                                }
                                {solarRoof &&

                                    <Col xs={4} style={{ paddingLeft: "0" }} className="d-flex justify-content-start mb-5">  <img className="vanCardIcon" src="./../../images/solarRoofIcon.png"></img> &nbsp; &nbsp; Solar roof</Col>

                                }
                                {kitchen &&

                                    <Col xs={4} style={{ paddingLeft: "0" }} className="d-flex justify-content-start mb-5">  <img className="vanCardIcon" src="./../../images/kitchenIcon.png"></img> &nbsp; &nbsp; Kitchen&nbsp; &nbsp; </Col>
                                }
                                {bathroom &&

                                    <Col xs={4} style={{ paddingLeft: "0" }} className="d-flex justify-content-start mb-5"> <img className="vanCardIcon" src="./../../images/bathroomIcon.png"></img> &nbsp; &nbsp; Bathroom&nbsp; &nbsp; </Col>

                                }
                                {heatedSeats &&

                                    <Col xs={4} style={{ paddingLeft: "0" }} className="d-flex justify-content-start mb-5"> <img className="vanCardIcon" src="./../../images/heatedSeatsIcon.png"></img> &nbsp; &nbsp; Heated seats&nbsp; &nbsp; </Col>

                                }


                            </Row>

                        </div>
                    </Col>
                    <Col xs={5} className="d-flex justify-content-end">
                        <div className="bookingInfoMain">
                            <Row className="d-flex justify-content-space-between align-items-center mb-4">
                                <Col className="">
                                    <strong className="mainPrice">638 €</strong>&nbsp; /day
                                </Col>
                                <Col >
                                    {vanDetails.reviews && <div className="bookingInfoRating"><strong>{`★ 4,95 - ${vanDetails.reviews.length} reviews`}</strong></div>}
                                </Col>

                            </Row>
                            <div className="dateContainer mb-4">
                                <DatePicker startDate={bookingInfo.startDate} endDate={bookingInfo.endDate} reservedDays={reservedDays} handleDatesChange={setDateAndPrice} />
                            </div>

                            {vanDetails.owner !== user?._id ? (
                                <Link onClick={reserveButtonClicked} to={"/booking"}>

                                    <button className="bookVanButton mb-4" variant="light">
                                        <strong>Book Van</strong>
                                    </button>
                                </Link>
                            ) : (
                                <Link to={`/${vanDetails._id}/edit`}>
                                        <button className="bookVanButton mb-4" variant="dark detailsButtonWide" size="lg">
                                        Edit my van
                                    </button>
                                </Link>
                            )}
                            <div className="mb-4">
                                <p style={{textAlign:"center"}}>You will not be charged anything yet</p>
                                <p style={{textAlign:"center"}}>The total price of the trip includes VAT and all applicable taxes.</p>
                            </div>
                            <div className="bookingInfoPriceRow">
                                <p>7800€ x 5 days</p>
                                <p>39000€</p>
                            </div>
                            <div className="bookingInfoPriceRow">
                                <p>7800€ x 5 days</p>
                                <p>39000€</p>
                            </div>
                            <div className="bookingInfoPriceRow">
                                <p>7800€ x 5 days</p>
                                <p>39000€</p>
                            </div>
                                <hr></hr>
                            <div className="bookingInfoPriceRow">
                                <strong><p>Total</p></strong>
                                <strong><p>39000€</p></strong>
                            </div>
                        </div>
                    </Col>
                    <div id="modal">
                        <Modal show={showModal} onHide={closeModal}>
                            <Modal.Header closeButton>
                                <Modal.Title>Write review</Modal.Title>
                            </Modal.Header>
                            <Modal.Body>
                                <ReviewForm fireFinalActions={fireFinalActions} />
                            </Modal.Body>
                        </Modal>
                        <Row>
                            {vanDetails.reviews && <div className="reviewSectionTitle"><h2>{`★ 4,95 - ${vanDetails.reviews.length} reviews`}</h2></div>}
                        </Row>
                        <Row className="d-flex justify-content-between">

                            {vanDetails.reviews && vanDetails.reviews.map((review, idx) => {
                                return (
                                    <Col xs={5}>
                                        <ReviewComment profileIndex={idx} vanReview={review}></ReviewComment>
                                    </Col>
                                )

                            })}
                            {/* Comment vanReviews={vanDetails.reviews}></ReviewsSection> */}
                        </Row>

                        
                        <div className="reviewButtonContainer">
                            {isLoggedIn && <Button variant="dark addReviewButton" onClick={openModal}>Write review</Button>}
                        </div>
                        {< ReactMapVan initLocationX={vanDetails.location ? vanDetails.location.coordinates[0] : 40} initLocationY={vanDetails.location ? vanDetails.location.coordinates[1] : 3} />
                        }
                    </div >
                    {/* <Col xs={3} style={{ paddingLeft: "0", paddingRight: "0" }}>
                        {< ReactMapVan initLocationX={vanDetails.location ? vanDetails.location.coordinates[0] : 40} initLocationY={vanDetails.location ? vanDetails.location.coordinates[1] : 3} />
                        }
                    </Col> */}

                </Row>
            </div>


        </div>
    )

}

export default VanDetails
