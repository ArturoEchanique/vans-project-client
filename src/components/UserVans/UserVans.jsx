import { useContext } from "react"
import VanCard from "../VanCard/VanCard"
import { useEffect, useState } from "react"
import vanService from "../../services/van.service"
import { AuthContext } from "../../context/auth.context"
import { Col,Row } from "react-bootstrap"

const UserVans = () => {
    const { user } = useContext(AuthContext)

    const [userVans, setUserVans] = useState([])

    const getUserVans = () => {
        vanService
            .getUserVans(user._id)
            .then(({ data }) => {
                setUserVans(data)
            })
            .catch((err) => console.log(err))
    }

    useEffect(() => {
        getUserVans()
    }, [])
    

    const vansList = userVans.map((van) => {
        return (
            <Col key={van._id}>
                
                <VanCard {...van}  />
            </Col>
        )
    })

    return (
        <Row className="g-4 " xs={12}>
            <h3 className="favorite">Your Vans</h3>
            <hr />
            {vansList}
        </Row>
    )
}

export default UserVans
