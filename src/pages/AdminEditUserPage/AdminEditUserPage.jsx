import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import Loader from "../../components/Loader/Loader"
import userService from "../../services/user.service"
import { Container, Row, Col } from "react-bootstrap"
import ProfileCard from "../../components/ProfileCard/ProfileCard"
import UserBookings from "../../components/UserBookings/UserBookings"
import OwnerBookings from "../../components/OwnerBookings/OwnerBookings"
import AdminUserVans from "../../components/AdminUserVans/AdminUserVans"

const AdminEditUserPage = () => {
    const { _id } = useParams()

    const [userDetails, setUserDetails] = useState(undefined)

    const getUser = () => {
        userService
            .getOneUser(_id)

            .then(({ data }) => {
                setUserDetails(data)
            })
            .catch((err) => console.log(err))
    }

    useEffect(() => {
        getUser()
    }, [])

    return userDetails === undefined ? (
        <Loader />
    ) : (
        <Container>
            <Row>
                <Col>
                    <ProfileCard {...userDetails} />
                </Col>
            </Row>

            <Row>
                <UserBookings {...userDetails} />
            </Row>
            <Row>
                <h3>vans</h3>

                <AdminUserVans {...userDetails} />
            </Row>

            <Row>
                <OwnerBookings {...userDetails} />
            </Row>
        </Container>
    )
}

export default AdminEditUserPage
