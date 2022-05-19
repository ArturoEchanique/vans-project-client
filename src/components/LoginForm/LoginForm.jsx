import { useContext, useState } from "react"
import { Form, Button } from "react-bootstrap"
import { useNavigate } from "react-router-dom"
import authService from "../../services/auth.service"
import { AuthContext } from "./../../context/auth.context"
import { MessageContext } from "../../context/message.context"

const Loginform = ({ closeModal }) => {
    const [loginData, setLoginData] = useState({
        password: "",
        email: "",
    })

    const navigate = useNavigate()

    const { storeToken, authenticateUser } = useContext(AuthContext)
    const { showMessage } = useContext(MessageContext)

    const handleSubmit = (e) => {
        e.preventDefault()

        authService
            .login(loginData)
            .then(({ data }) => {
                storeToken(data.authToken)
                showMessage("Bienvenid@", "Sesión iniciada correctamente")
                authenticateUser()
                navigate("/")
                closeModal()
            })
            .catch((err) => console.log(err))
    }

    const handleInputChange = (e) => {
        const { value, name } = e.currentTarget
        setLoginData({ ...loginData, [name]: value })
    }

    const { password, email } = loginData

    return (

        <Form id="fomLogin" onSubmit={handleSubmit}>
            <Form.Group className="mb-3" controlId="email">
                <Form.Label>Email</Form.Label>
                <Form.Control type="email" onChange={handleInputChange} name="email" value={email} />
            </Form.Group>

            <Form.Group className="mb-3" controlId="password">
                <Form.Label>Password</Form.Label>
                <Form.Control type="password" onChange={handleInputChange} name="password" value={password} />
            </Form.Group>

            <Button variant="dark" type="submit">
                Log In
            </Button>
        </Form>
    )
}

export default Loginform
