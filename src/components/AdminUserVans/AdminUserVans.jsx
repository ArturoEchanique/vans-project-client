import { useContext } from "react"
import { useEffect, useState } from "react"
import { Col, Button } from "react-bootstrap"
import vanService from "../../services/van.service"
import { AuthContext } from "../../context/auth.context"

const AdminUserVans = ({ _id }) => {
    const { user } = useContext(AuthContext)

    const [userVans, setUserVans] = useState([])
    const [reload, setReload] = useState(true)

    const getUserVans = () => {
        vanService
            .getUserVans(_id)
            .then(({ data }) => {
                console.log(data)
                setUserVans(data)
            })
            .catch((err) => console.log(err))
    }

    useEffect(() => {
        getUserVans()
        setReload(false)
    }, [reload])

    const vansList = userVans.map((van) => {
        const { name, imageUrl, _id } = van

        const handleDelete = () => {
            console.log(true)

            vanService
                .getOneVanAndRemove(van._id)
                .then(() => {
                    setReload(true)
                })
                .catch((err) => console.log(err))
        }

        return (
            <Col key={_id}>
                <h4>{name}</h4>
                <img src={imageUrl[0]} alt="" />
                <Button variant="dark" onClick={handleDelete}>
                    delete
                </Button>
            </Col>
        )
    })

    return <>{vansList}</>
}

export default AdminUserVans
