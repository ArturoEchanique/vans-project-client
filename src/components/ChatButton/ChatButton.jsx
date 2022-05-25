import React from "react"
import { Button, Row, Col, Container, Modal } from "react-bootstrap"
import "./ChatButton.css"
import ProfileImage from "../../services/profileImage.service"
import { useEffect, useState, useContext } from "react"
import {beautifulDate, beautifulHour} from "../../utils/dateUtils"

const ChatButton = ({ interlocutor, bookingStartDate, vanReview, profileIndex }) => {

    // const [profileImg, setProfileImg] = useState("")

    // useEffect(() => {
    //     getRandomImage()
    // }, [])

    // const getRandomImage = () => {
    //     ProfileImage.getRandomImage()
    //         .then(({ data }) => {
    //             console.log("data is profile", data.results[0].picture.thumbnail)
    //             setProfileImg(data.results[0].picture.thumbnail)
    //         })
    //         .catch((err) => console.log(err))
    // }
    console.log("booking sd type is =", typeof bookingStartDate)
    return (
        <div className="chatButtonMain">
            <div className="chatButtonLeft">
                <img className="chatProfileImage" src={interlocutor.imageUrl} />
            </div>
            <div className="chatButtonRight">
                <div className="upperRight">
                    <div><strong>{interlocutor.username}</strong></div>
                </div>
                <div className="commentLower">
                    <div>Booking: {beautifulDate(bookingStartDate)}</div>
                </div>
            </div>
        </div>
    )
}

export default ChatButton
