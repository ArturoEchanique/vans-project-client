import "./MessagesBookingDetails.css"
import { Link, useParams } from "react-router-dom"
import { useEffect, useState, useContext } from "react"
import { AuthContext } from "../../context/auth.context"
import { Button, Row, Col, Container, Modal } from "react-bootstrap"
import { beautifulDate, beautifulHour, daysBetweenTwoDates } from "../../utils/dateUtils"

const MessagesBookingDetails = ({ vanDetails, setBookingInfo, bookingInfo }) => {
    // const [vanDetails, setVanDetails] = useState({})
    const { van_id } = useParams()
    const { isLoggedIn, isLoading, user } = useContext(AuthContext)


    const { setReload, _id, imageUrl, name, description, solarPower, shower, bathroom, maxPassengers, dayPrice, vanRating, owner, hideDeleteButton, solarRoof, kitchen, heatedSeats } = vanDetails
    console.log("vanDetails are", vanDetails)

    let totalDays = 0
    let daysPrice = 0
    let commision = 0
    let totalPrice = 0
    if (bookingInfo) {
        totalDays = daysBetweenTwoDates(bookingInfo.startDate, bookingInfo.endDate)
        daysPrice = vanDetails.dayPrice * totalDays
        commision = daysPrice * 0.05
        commision = Math.round(commision * 100) / 100
        totalPrice = daysPrice + daysPrice * 0.05
    }

    return (
        <div className="messagesBookingDetailsMain">
            <img className="messagesVanImage" src={vanDetails?.imageUrl}></img>

            <div className="messagesDetailsPageSub">


                <h4 className="messagesBookingTitle mb-4">{name?.length > 1000 ? (name.slice(0, 33) + " ...") : name}</h4>
                {/* <p className="mb-4">{vanDetails.description}</p> */}
                <hr></hr>
                <Row className="mt-3 d-flex justify-content-between align-items-center">
                    <Col xs={8}>
                        <h4>Owner: {vanDetails?.owner?.username}</h4>
                    </Col>
                    <Col xs={4}>
                        <img className="messagesVanOwnerProfileImg" src={vanDetails.owner?.imageUrl}></img>
                    </Col>
                </Row>
                <Row className="">
                    <Col xs={12} >
                        <div className="messagesVanInfoMain">
                            <br></br>
                            <h4 className="detailsPageTitle">{"Features"}</h4>
                            <Row className="d-flex justify-content-start messagesVanDetailsIconsRow">
                                <Col xs={6} style={{ paddingLeft: "0" }} className="d-flex justify-content-start mb-4">  
                                    <img className="vanCardIcon" src="./../../images/peopleIcon.png"></img> &nbsp;{" " + maxPassengers + " passengers "}
                                </Col>
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
                            <Row className="mt-3 d-flex justify-content-between align-items-center">
                                <Col xs={6}>
                                    
                                    <h4>From</h4>
                                    <p>{beautifulDate(bookingInfo?.startDate) + " 15:00 "}</p>
                                </Col>
                                <Col xs={6}>
                                    <h4>To</h4>
                                    <p>{beautifulDate(bookingInfo?.endDate) + " 12:00 "}</p>
                                </Col>
                            </Row>
                            <hr></hr>
                        </div>
                    </Col>
                    <Col xs={12} className="d-flex justify-content-end">
                        <div className="messagesBookingInfoMain">
                            <Row className="d-flex justify-content-space-between align-items-center mb-4">
                                <Col className="">
                                    <strong className="messagesMainPrice">{vanDetails.dayPrice} €</strong>&nbsp; /day
                                </Col>
                                <Col className="">
                                    <strong className="messagesTotalPrice">Total: {totalPrice} €</strong>
                                    {/* {vanDetails.reviews && <div className="bookingInfoRating"><strong>{`★ 4,95 - ${vanDetails.reviews.length} reviews`}</strong></div>} */}
                                </Col>

                            </Row>
                            <div className="mb-4">
                                <p style={{ textAlign: "center" }}>The total price of the van includes VAT and all applicable taxes.</p>
                            </div>
                            {/* <div className="messagesBookingInfoPriceRow">
                                <p>7800€ x 5 days</p>
                                <p>39000€</p>
                            </div>
                            <div className="messagesBookingInfoPriceRow">
                                <p>Service commission</p>
                                <p>39000€</p>
                            </div> */}
                            {/* <hr></hr> */}
                            {/* <div className="messagesBookingInfoPriceRow">
                                <strong><p>Total</p></strong>
                                <strong><p className="messagesMainPrice">39000€</p></strong>
                            </div> */}
                        </div>
                    </Col>
                </Row>
            </div>


        </div>
    )

}

export default MessagesBookingDetails
