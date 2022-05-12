import { Container } from "react-bootstrap";
import DatePicker from "../../components/DatePicker/DatePicker";
import { Button } from "react-bootstrap";
import { Link } from "react-router-dom";

const HomePage = ({setFilterInfo}) => {
    return (
        <Container>
            <hr />
            <DatePicker handleDatesChange={setFilterInfo} />
            <Button variant="dark">
                <Link to="/results">Search Vans</Link>
            </Button>
        </Container>
    );
};

export default HomePage;
