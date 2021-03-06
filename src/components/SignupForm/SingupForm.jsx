import { useState } from "react"
import { Form, Button } from "react-bootstrap"
import { Link, useNavigate } from "react-router-dom"
import authService from "../../services/auth.service"
import uploadService from "../../services/upload.service"

const SignupForm = ({ closeModal }) => {
    const [signupData, setSignupData] = useState({
        username: "",
        password: "",
        email: "",
        imageUrl: "",
    })

    const [loadingImage, setLoadingImage] = useState(false)

    const navigate = useNavigate()

    const handleSubmit = (e) => {
        e.preventDefault()

        authService
            .signup(signupData)
            .then((res) => {
                closeModal()
                navigate("/login")
            })
            .catch((err) => console.log(err))
    }

    const handleInputChange = (e) => {
        const { value, name } = e.currentTarget
        setSignupData({ ...signupData, [name]: value })
    }
    const handleImageUpload = (e) => {
        setLoadingImage(true)

        const uploadData = new FormData()
        uploadData.append("imageData", e.target.files[0])

        uploadService
            .uploadImage(uploadData)
            .then(({ data }) => {
                setLoadingImage(false)
                setSignupData({ ...signupData, imageUrl: data.cloudinary_url })
            })
            .catch((err) => console.log(err))
    }

    const { username, password, email } = signupData

    return (
        <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3" controlId="username">
                <Form.Label>User Name</Form.Label>
                <Form.Control type="text" onChange={handleInputChange} name="username" value={username} />
            </Form.Group>

            <Form.Group className="mb-3" controlId="email">
                <Form.Label>Email</Form.Label>
                <Form.Control type="email" onChange={handleInputChange} name="email" value={email} />
            </Form.Group>

            <Form.Group className="mb-3" controlId="password">
                <Form.Label>Password</Form.Label>
                <Form.Control type="password" onChange={handleInputChange} name="password" value={password} />
            </Form.Group>

            <Form.Group className="mb-3" controlId="imageUrl">
                <Form.Label>Image (import)</Form.Label>
                <Form.Control type="file" onChange={handleImageUpload} />
            </Form.Group>
            <Form.Check className="mb-3 mt-4">
                <input type="checkbox" className="form-check-input" id="exampleCheck1" required />
                <Link to={"/privacyterms"} target="_blank" rel="noopener noreferrer">
                    <Form.Label > &nbsp; Privacy policy terms</Form.Label>
                </Link>
            </Form.Check>
            <button type="submit" disabled={loadingImage} style={{ width: "100%" }} className="vanmeupButton mb-4" variant="light">
                {loadingImage ? "Loading..." : "Sign up"}
            </button>
            {/* <Button variant="dark" type="submit" disabled={loadingImage}>
                {loadingImage ? "Loading..." : "send"}
            </Button> */}
        </Form>
    )
}

export default SignupForm
