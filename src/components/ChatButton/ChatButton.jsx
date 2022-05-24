import React from "react"
import { Button, Row, Col, Container, Modal } from "react-bootstrap"
import "./ChatButton.css"
import ProfileImage from "../../services/profileImage.service"
import { useEffect, useState, useContext } from "react"

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
    console.log("booking sd =", bookingStartDate)
    return (
        <div className="chatButtonMain">
                <div className="commentUpper">
                    <div className="upperLeft">
                        <img className="profileImage" src={interlocutor.imageUrl} />
                    </div>
                    <div className="upperRight">
                        <div><strong>{interlocutor.username}</strong></div>
                        <p>April 2022</p>
                    </div>
                </div>
                <div className="commentLower">
                    {<div>viaje: {bookingStartDate}</div>}
                </div>
        </div>
    )
}

export default ChatButton
