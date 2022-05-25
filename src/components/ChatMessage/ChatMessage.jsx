import React from "react"
import { Button, Row, Col, Container, Modal } from "react-bootstrap"
import "./ChatMessage.css"
import ProfileImage from "../../services/profileImage.service"
import { useEffect, useState, useContext } from "react"
import { beautifulDate, beautifulHour } from "../../utils/dateUtils"

const ChatMessage = ({ message, profileIndex }) => {

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
    return (
        <div className="chatMessageMain">
            <div className="chatMessageLeft">
                <img className="chatMessageProfileImage" src={message.owner.imageUrl} />
            </div>
            <div className="chatMessageRight">
                <div className="chatMessageUpperRight">
                    <div><strong>{message.owner.username}</strong></div>
                    <div className="chatMessageHour">{beautifulHour(message.messageDate)}</div>
                </div>
                <div className="chatMessageCommentLower">
                    
                    {message.text && <p>{message.text}</p>}
                </div>
            </div>
        </div>
        // <div className="chatMessageMain">
        //     {message &&
        //         <>
        //             <div className="commentUpper">
        //                 <div className="upperLeft">
        //                     <img className="profileImage" src={message.owner.imageUrl} />
        //                 </div>
        //                 <div className="upperRight">

        //                     {/* {message.rating && <div>{"stars: " + message.rating}</div>} */}
        //                     {message.owner && <div><strong>{message.owner.username}</strong></div>}
        //                 <p>{message.messageDate && <div>{message.messageDate}</div>}</p>
        //                 {message.text && <p>{message.text}</p>}
        //                 </div>


        //             </div>
        //             <div className="commentLower">
                        
        //             </div>
        //         </>
        //     }

        // </div>
    )
}

export default ChatMessage
