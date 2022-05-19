import { Link } from "react-router-dom"
import { useEffect, useRef, useMemo } from "react"
import { Button, Image, Card, Col, Row, Form, ToggleButton, Container, Spinner } from "react-bootstrap"
import vanService from "../../services/van.service"
import { useContext, useState } from "react"
import { AuthContext } from "../../context/auth.context"
import VanCard from "../../components/VanCard/VanCard"
import InViewportComponent from "../InViewportComponent/InViewportComponent"
import "./VanCardList.css"
import InfiniteScroll from "react-infinite-scroll-component"
import handleViewport from "react-in-viewport";



const VanCardList = ({ vans, fetchMoreData, hasMoreVans, noResults, isFetchingData, }) => {
    // const { isLoggedIn, isLoading, user } = useContext(AuthContext)
    // const [deleteState, setDeleteState] = useState(false)
    // const [hasMoreVans, setHasMoreVans] = useState(true)

    // const fetchMoreData = () => {
    //     // setTimeout(() => {
    //     //     loadVans({ ...filterData, skip: vans.length })
    //     // }, 1000)
    // }



    return (
        

        <InfiniteScroll
            dataLength={10}
            hasMore={hasMoreVans}
            loader={<h4>Loading...</h4>}
        >
            
            
            <div className="scroll">
               
               
                <Container >
                    <Row >
                        {vans.map((van, idx) => {
                            return (
                                <>

                                    <VanCard key={idx} {...van} isFavorite={false} />
                                </>)
                        })}
                        <InViewportComponent noResults={noResults} hasMoreVans={hasMoreVans} fetchMoreData={fetchMoreData} isFetchingData={isFetchingData}>loading component</InViewportComponent>
                    </Row>
                </Container>
            </div>
        </InfiniteScroll>




    )
}

export default VanCardList
