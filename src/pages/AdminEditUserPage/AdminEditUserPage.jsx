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
        <Container className="top-margin">
            <Row>
                <Col sm={4} className="background-profile-detalis">
                    <ProfileCard {...userDetails} />
                </Col>
                <Col className="background-profile-detalis">
                    <Row>
                        <UserBookings {...userDetails} />
                        <hr />
                    </Row>
                    <Row>
                        <h3 className="mt-3 mb-5">User Vans</h3>
                        <AdminUserVans {...userDetails} />
                    </Row>
                    <Row>
                        <hr />
                        <OwnerBookings {...userDetails} />
                    </Row>
                </Col>
            </Row>
        </Container>
    )
}

export default AdminEditUserPage
