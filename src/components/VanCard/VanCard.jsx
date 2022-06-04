import { Link } from "react-router-dom"
import { Button, Image, Card, Col, Row, Form, ToggleButton, Container } from "react-bootstrap"
import vanService from "../../services/van.service"
import { useContext, useState } from "react"
import { AuthContext } from "../../context/auth.context"
import "./VanCard.css"
import React from "react";



const VanCard = ({ isFavorite, addFavoriteVan, removeFavoriteVan, _id, imageUrl, name, description, dayPrice }) => {

    const getVanImageFiltered = () => {
        if (imageUrl[0] && (imageUrl[0] !== "https://res.cloudinary.com/dzzkeb6xp/image/upload/v1652949657/vans_project/results_azn9vk.png")) {
            return imageUrl[0]
        }
        else return "https://res.cloudinary.com/dzzkeb6xp/image/upload/v1652949664/vans_project/26_ngdxkd.jpg"
    }
    const imageUrlFiltered = getVanImageFiltered()
    return (
        <Container className="vanCardMain">
            <div className="imageParent">
                <Link to={`/${_id}/details`} style={{ textDecoration: 'none', padding: "0px", margin: "0px" }}>
                    <img className="vanCardImage" src={imageUrlFiltered} />
                </Link>
                <button className="heartButton" onClick={isFavorite ? () => removeFavoriteVan(_id) : () => addFavoriteVan(_id)}>
                    <img className={"heartIcon " + (isFavorite ? "redHeart" : "greyHeart")} src="./../../images/heartIcon.png"></img>
                </button>
            </div>
            <Row className="justify-content-left align-items-center">
                <Col xs={9} className="justify-content-center">
                    <h3 className="vanCardTitle">{name.length > 28 ? (name.slice(0, 28) + " ...") : name}</h3>
                </Col>
            </Row>
            <p className="filterRow vanCardDescription">{description.length > 70 ? (description.slice(0, 70) + "...") : description}</p>
            <strong>{dayPrice} € </strong>/day
            <Row className="justify-content-center filterRowSmall">
            </Row>

        </Container>
    )
}

export default VanCard
