import { useContext } from "react"
import { Button } from "react-bootstrap"
import { AuthContext } from "../../context/auth.context"
import userService from "../../services/user.service"

const DeleteButton = () => {
    const { user, logOutUser, isLoggedIn } = useContext(AuthContext)

    const handleDelete = () => {
        userService
            .deleteUser(user._id)
            .then(() => {
                logOutUser()
            })
            .catch((err) => console.log(err))
    }

    return (
        <>
            <Button variant="dark" onClick={handleDelete}>
                Delete Profile
            </Button>
        </>
    )
}

export default DeleteButton
