import { Link } from "react-router-dom"
import { Button } from "react-bootstrap"

const HostButton = () => {
    return (
        <>
            <Button variant="dark">
                <Link to="/become-host">became a host</Link>
            </Button>
        </>
    )
}

export default HostButton
