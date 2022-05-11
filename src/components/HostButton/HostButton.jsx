import { Button } from "react-bootstrap";
import { Link } from "react-router-dom";


const HostButton = () => {
    return (
        <>
            <Button variant="dark">
                <Link to="/became-host">became a host</Link>
            </Button>
        </>
    );
  
};

export default HostButton;