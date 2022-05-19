import { Link } from "react-router-dom"
import React, { useEffect, useRef, useMemo } from "react"
import { Button, Image, Card, Col, Row, Form, ToggleButton, Container, Spinner } from "react-bootstrap"
import vanService from "../../services/van.service"
import { useContext, useState } from "react"
import { AuthContext } from "../../context/auth.context"
import VanCard from "../../components/VanCard/VanCard"
import InViewportComponent from "../InViewportComponent/InViewportComponent"
import "./VanCardList.css"
import InfiniteScroll from "react-infinite-scroll-component"
import handleViewport from "react-in-viewport";



const VanCardList = ({ vans, fetchMoreData, hasMoreVans, noResults, isFetchingData, addFavoriteVan, removeFavoriteVan, favoriteVans,  }) => {
    // const { isLoggedIn, isLoading, user } = useContext(AuthContext)
    // const [deleteState, setDeleteState] = useState(false)
    // const [hasMoreVans, setHasMoreVans] = useState(true)

    // const fetchMoreData = () => {
    //     // setTimeout(() => {
    //     //     loadVans({ ...filterData, skip: vans.length })
    //     // }, 1000)
    // }
    const ref = useRef();
    // const inViewport = InViewportComponent(ref, '0px'); // Trigger as soon as the element becomes visible
    const inViewport = InViewportComponent(ref, "1% 0%"); // Trigger if 200px is visible from the element
    // console.log("has more vans", hasMoreVans)
    if (inViewport && !isFetchingData && hasMoreVans) fetchMoreData()
    if (inViewport && !isFetchingData && !hasMoreVans) console.log("no more results")
    if (inViewport) {
        console.log('in viewport:', ref.current);
    }
    else {
        console.log("not in viewport")
    }



    return (


        <InfiniteScroll
            dataLength={10}
            hasMore={hasMoreVans}
            loader={<h4>Loading...</h4>}
        >


            <div className="scroll">

                {/* <React.Fragment>
                    <Header />
                    <Content />
                    <Footer ref={ref} />
                </React.Fragment> */}
                <Container >
                    <Row >
                        {vans.map((van, idx) => {
                            return (
                                <>
                                    
                                    <VanCard addFavoriteVan={addFavoriteVan} removeFavoriteVan={removeFavoriteVan} isFavorite={favoriteVans.includes(van._id)} key={idx} {...van} />
                                    
                                   
                                    
                                </>)
                        })}
                        <div ref={ref} className="spinnerContainer">
                            {hasMoreVans ? <Spinner className="mySpinner" animation="border" size="xl" role="status">
                                <span className="visually-hidden">Loading...</span>
                            </Spinner> : (noResults ? "There is no results" : "No more results")
                            }
                        </div>

                        {/* <InViewportComponent noResults={noResults} hasMoreVans={hasMoreVans} fetchMoreData={fetchMoreData} isFetchingData={isFetchingData}>loading component</InViewportComponent> */}
                    </Row>
                </Container>
            </div>
        </InfiniteScroll>




    )
}

export default VanCardList
