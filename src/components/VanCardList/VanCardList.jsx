import { Link } from "react-router-dom"
import React, { useEffect, useRef, useMemo } from "react"
import { Button, Image, Card, Col, Row, Form, ToggleButton, Container, Spinner } from "react-bootstrap"
import vanService from "../../services/van.service"
import { useContext, useState } from "react"
import { AuthContext } from "../../context/auth.context"
import VanCard from "../../components/VanCard/VanCard"
import InViewportComponent from "../InViewportComponent/InViewportComponent"
import "./VanCardList.css"



const VanCardList = ({ vans, fetchMoreData, hasMoreVans, noResults, isFetchingData, addFavoriteVan, removeFavoriteVan, favoriteVans, }) => {
    const ref = useRef();
    const inViewport = InViewportComponent(ref, "1% 0%"); // Trigger if 200px is visible from the element
    if (inViewport && !isFetchingData && hasMoreVans) fetchMoreData()
    if (inViewport && !isFetchingData && !hasMoreVans) console.log("no more results")
    if (inViewport) {
        console.log('in viewport:', ref.current);
    }
    else {
        console.log("not in viewport")
    }



    return (
        <div className="vanInfiniteScroll" >
            <Container fluid style={{padding:"0px 8%"}}>
                <Row>
                    {vans.map((van, idx) => {
                        return (
                            <Col lg={4} xl={6} sm={6} md={6} xs={12}>
                                <VanCard addFavoriteVan={addFavoriteVan} removeFavoriteVan={removeFavoriteVan} isFavorite={favoriteVans.includes(van._id)} key={idx} {...van} />
                            </Col>)
                    })}
                    <div ref={ref} className="spinnerContainer">
                        {hasMoreVans ? <Spinner className="mySpinner" animation="border" size="xl" role="status">
                            <span className="visually-hidden">Loading...</span>
                        </Spinner> : (noResults ? "There is no results" : "No more results")
                        }
                    </div>
                </Row>
            </Container>
        </div>




    )
}

export default VanCardList
