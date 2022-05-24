import "./MessagesBookingDetails.css"
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

const MessagesBookingDetails = ({ vanDetails, setBookingInfo, bookingInfo }) => {
    // const [vanDetails, setVanDetails] = useState({})
    const { van_id } = useParams()
    const { isLoggedIn, isLoading, user } = useContext(AuthContext)


    const { setReload, _id, imageUrl, name, description, solarPower, shower, bathroom, dayPrice, vanRating, owner, hideDeleteButton, solarRoof, kitchen, heatedSeats } = vanDetails
    console.log("vanDetails are", vanDetails)
    return (
        <div className="messagesBookingDetailsMain">
            <div className="detailsPageSub">
                <div className="vanImageTopInfo">
                    <Row className="mb-3">
                        <Col xs="auto" className="d-flex justify-content-start">
                            <h3>Owner: Pablo Perez</h3>
                        </Col>
                        <Col className="d-flex align-items-center">
                            {vanDetails.reviews && <div className="bookingInfoRating"><strong>{`★ 4,95 - ${vanDetails.reviews.length} reviews`}</strong></div>}
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
                            <div className="mb-4">
                                <p style={{ textAlign: "center" }}>You will not be charged anything yet</p>
                                <p style={{ textAlign: "center" }}>The total price of the trip includes VAT and all applicable taxes.</p>
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
                </Row>
            </div>


        </div>
    )

}

export default MessagesBookingDetails
