import { Link } from "react-router-dom"
import { Container } from "react-bootstrap"
import { Button } from "react-bootstrap"
import DatePicker from "../../components/DatePicker/DatePicker"

const HomePage = ({ setFilterInfo }) => {
    const today = new Date()
    let tomorrow = new Date(today)
    tomorrow = tomorrow.setDate(today.getDate() + 1)

    return (
        <Container>
            <hr />
            <DatePicker startDate={today} endDate={tomorrow} handleDatesChange={setFilterInfo} />
            <Button variant="dark">
                <Link to="/results">Search Vans</Link>
            </Button>
        </Container>
    )
}

export default HomePage
