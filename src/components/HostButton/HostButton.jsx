import { Link } from "react-router-dom"
import { Button } from "react-bootstrap"

const HostButton = () => {
    return (
        <>
            <Button variant="outline-dark">
                <Link to="/become-host">Be a host </Link>
            </Button>
        </>
    )
}

export default HostButton
