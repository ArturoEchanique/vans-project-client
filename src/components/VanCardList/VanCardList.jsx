import { Link } from "react-router-dom"
import { Button, Image, Card, Col, Row, Form, ToggleButton, Container } from "react-bootstrap"
import vanService from "../../services/van.service"
import { useContext, useState } from "react"
import { AuthContext } from "../../context/auth.context"
import VanCard from "../../components/VanCard/VanCard"

const VanCardList = ({ vans }) => {
    const { isLoggedIn, isLoading, user } = useContext(AuthContext)
    const [deleteState, setDeleteState] = useState(false)

    return (

        <Container>
            <Row>
                {vans.map((van, idx) => {
                    return <VanCard key={idx} {...van} isFavorite={false}/>
                })}
            </Row>
        </Container>

    )
}

export default VanCardList
