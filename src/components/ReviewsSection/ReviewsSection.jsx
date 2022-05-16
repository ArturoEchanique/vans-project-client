import React from 'react'

const ReviewsSection = ({ reviewData }) => {
    return (
        <>
            <h2>{"Reviews Section"}</h2>
            <div>{"autor: " + reviewData}</div>
            <div>{"comment: " + reviewData}</div>
        </>

    )
}

export default ReviewsSection