import React from "react"
import "./ReviewComment.css"
import { beautifulDate } from "../../utils/dateUtils"

const ReviewsSection = ({ vanReview, profileIndex }) => {

    return (
        <div className="reviewComment">
            {vanReview &&
                <>
                    <div className="commentUpper">
                        <div className="upperLeft">
                            <img className="profileImage" src={vanReview.owner.imageUrl} />
                        </div>
                        <div className="upperRight">
                            {vanReview.owner && <div><strong>{vanReview.owner.username}</strong></div>}
                            <p>{beautifulDate(vanReview.reviewDate)}</p>
                        </div>
                    </div>
                    <div className="commentLower">
                        {vanReview.text && <div>{vanReview.text}</div>}
                    </div>
                </>


            }

        </div>
    )
}

export default ReviewsSection
