import React from 'react'

const ReviewsSection = ({ vanReviews }) => {
    return (
        <>
            <h2>{"Reviews Section"}</h2>
            {vanReviews && vanReviews.map(review => {
                return (
                    <>
                        <div>{"date: " + review.reviewDate}</div>
                        <div>{"stars: " + review.rating}</div>
                        <div>{"autor: " + review.owner}</div>
                        <div>{"comment: " + review.text}</div>
                    </>

                )
            })}

        </>

    )
}

export default ReviewsSection