import { Container } from "react-bootstrap";
import DatePicker from "../../components/DatePicker/DatePicker";

const HomePage = ({setFilterState}) => {
    return (
        <Container>
            <hr />
            <DatePicker setFilterState={setFilterState} />
        </Container>
    );
};

export default HomePage;
