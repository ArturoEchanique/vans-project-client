import React from "react"
import { Button, Row, Col, Container, Modal } from "react-bootstrap"
import "./ReviewComment.css"
import ProfileImage from "../../services/profileImage.service"
import { useEffect, useState, useContext } from "react"

const ReviewsSection = ({ vanReview, profileIndex }) => {

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
        <div className="reviewComment">
            {vanReview &&
                <>
                    <div className="commentUpper">
                        <div className="upperLeft">
                            <img className="profileImage" src={`../../images/profileImages/${profileIndex % 10}.jpeg`} />
                        </div>
                        <div className="upperRight">

                            {/* {vanReview.rating && <div>{"stars: " + vanReview.rating}</div>} */}
                        {vanReview.owner && <div><strong>{vanReview.owner.username}</strong></div>}
                            <p>April 2022</p>
                        </div>


                    </div>
                    <div className="commentLower">
                        {vanReview.text && <div>{"comment: " + vanReview.text}</div>}
                    </div>



                    {/* <div>{"date: " + review?.reviewDate.toString()}</div>
                        <div>{"stars: " + review?.rating}</div>
                        <div>{"autor: " + review?.owner?.username}</div>
                        <div>{"comment: " + review?.text}</div> */}
                </>


            }

        </div>
    )
}

export default ReviewsSection
