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
            <img className="messagesVanImage" src={vanDetails?.imageUrl}></img>

            <div className="messagesDetailsPageSub">


                <h4 className="messagesBookingTitle mb-4">{name?.length > 1000 ? (name.slice(0, 33) + " ...") : name}</h4>
                {/* <p className="mb-4">{vanDetails.description}</p> */}
                <hr></hr>
                <Row className="mt-3 d-flex justify-content-between align-items-center">
                    <Col xs={9}>
                        <h4>Owner: Pablo Perez</h4>
                    </Col>
                    <Col xs={3}>
                        <img className="vanOwnerProfileImg" src={vanDetails.owner?.imageUrl}></img>
                    </Col>
                </Row>
                <Row className="">
                    <Col xs={12} >
                        <div className="messagesVanInfoMain">
                            <br></br>
                            <h4 className="detailsPageTitle">{"Features"}</h4>
                            <Row className="d-flex justify-content-start messagesVanDetailsIconsRow">
                                {solarPower &&

                                    <Col xs={6} style={{ paddingLeft: "0" }} className="d-flex justify-content-start mb-4">  <img className="vanCardIcon" src="./../../images/sunIcon.png"></img> &nbsp; &nbsp; Solar power&nbsp; &nbsp; </Col>

                                }
                                {shower &&

                                    <Col xs={6} style={{ paddingLeft: "0" }} className="d-flex justify-content-start mb-4"><img className="vanCardIcon" src="./../../images/showerIcon.png"></img> &nbsp; &nbsp; Shower&nbsp; &nbsp; </Col>

                                }
                                {solarRoof &&

                                    <Col xs={6} style={{ paddingLeft: "0" }} className="d-flex justify-content-start mb-4">  <img className="vanCardIcon" src="./../../images/solarRoofIcon.png"></img> &nbsp; &nbsp; Solar roof</Col>

                                }
                                {kitchen &&

                                    <Col xs={6} style={{ paddingLeft: "0" }} className="d-flex justify-content-start mb-4">  <img className="vanCardIcon" src="./../../images/kitchenIcon.png"></img> &nbsp; &nbsp; Kitchen&nbsp; &nbsp; </Col>
                                }
                                {bathroom &&

                                    <Col xs={6} style={{ paddingLeft: "0" }} className="d-flex justify-content-start mb-4"> <img className="vanCardIcon" src="./../../images/bathroomIcon.png"></img> &nbsp; &nbsp; Bathroom&nbsp; &nbsp; </Col>

                                }
                                {heatedSeats &&

                                    <Col xs={6} style={{ paddingLeft: "0" }} className="d-flex justify-content-start mb-4"> <img className="vanCardIcon" src="./../../images/heatedSeatsIcon.png"></img> &nbsp; &nbsp; Heated seats&nbsp; &nbsp; </Col>

                                }
                            </Row>
                            <hr></hr>
                        </div>
                    </Col>
                    <Col xs={12} className="d-flex justify-content-end">
                        <div className="messagesBookingInfoMain">
                            <Row className="d-flex justify-content-space-between align-items-center mb-4">
                                <Col className="">
                                    <strong className="messagesMainPrice">638 €</strong>&nbsp; /day
                                </Col>
                                <Col >
                                    {vanDetails.reviews && <div className="bookingInfoRating"><strong>{`★ 4,95 - ${vanDetails.reviews.length} reviews`}</strong></div>}
                                </Col>

                            </Row>
                            <div className="mb-4">
                                <p style={{ textAlign: "center" }}>The total price of the trip includes VAT and all applicable taxes.</p>
                            </div>
                            <div className="messagesBookingInfoPriceRow">
                                <p>7800€ x 5 days</p>
                                <p>39000€</p>
                            </div>
                            <div className="messagesBookingInfoPriceRow">
                                <p>Service commission</p>
                                <p>39000€</p>
                            </div>
                            <hr></hr>
                            <div className="messagesBookingInfoPriceRow">
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
