import { Link } from "react-router-dom"
import { Button, Image, Card, Col, Row, Form, ToggleButton, Container } from "react-bootstrap"
import vanService from "../../services/van.service"
import { useContext, useState } from "react"
import { AuthContext } from "../../context/auth.context"
import VanCard from "../../components/VanCard/VanCard"
import "./vanCardList.css"
import InfiniteScroll from "react-infinite-scroll-component"

const VanCardList = ({ vans }) => {
    const { isLoggedIn, isLoading, user } = useContext(AuthContext)
    const [deleteState, setDeleteState] = useState(false)
    const [hasMoreVans, setHasMoreVans] = useState(true)

    const fetchMoreData = () => {
        // setTimeout(() => {
        //     loadVans({ ...filterData, skip: vans.length })
        // }, 1000)
    }

    return (
        <div className="scroll">
            <InfiniteScroll
                dataLength={vans.length / 4}
                next={fetchMoreData}
                hasMore={hasMoreVans}
                loader={<h4>Loading...</h4>}
            >
                <Container >
                    <Row >
                        {vans.map((van, idx) => {
                            return <VanCard key={idx} {...van} isFavorite={false} />
                        })}
                    </Row>
                </Container>
            </InfiniteScroll>

        </div>


    )
}

export default VanCardList
