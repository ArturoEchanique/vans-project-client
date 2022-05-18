import { Card } from "react-bootstrap"
import { useEffect, useState } from "react"
import UserCard from "../UserCard/UserCard"
import userService from "../../services/user.service"

const UsersAdmin = () => {
    const [users, setUsers] = useState([])
    const [reload, setReload] = useState(true)

    const getAllUsers = () => {
        userService
            .getUsers()
            .then(({ data }) => {
                setUsers(data)
            })
            .catch((err) => console.log(err))
    }

    useEffect(() => {
        getAllUsers()
        setReload(false)
    }, [reload])

    const usersList = users.map((user) => {
        return (
            <Card style={{ width: "15rem" }} key={user._id}>
                <UserCard setReload={setReload} {...user} />
            </Card>
        )
    })
    return <>{usersList}</>
}

export default UsersAdmin
