import { Container, Modal, Button, Card } from 'react-bootstrap'
import { useContext, useEffect, useState } from "react"
import vanService from './../../services/van.service'
import { AuthContext } from '../../context/auth.context'
import VanCard from '../../components/VanCard/VanCard'
import DatePicker from "../../components/DatePicker/DatePicker";
import './ResultsPage.css'

const ResultsPage = ({ setFilterState, filterData }) => {
    console.log("filterdata is ", filterData)

    const [fetching, setFetching] = useState(false)
    const [vans, setVans] = useState([])
    // const [filterData, setFilterData] = useState({
    //     name: "",
    //     solarPower: false,
    // })

    useEffect(() => loadVans(filterData), [])

    const loadVans = (query) => {

        vanService

            .getVans(query)
            .then(({ data }) => {
                console.log(data)
                setFetching(true)
                setVans(data)
            })
            .then(err => console.log(err))
    }
    
    const handleFilterChange = e => {
        
       
        const { name } = e.currentTarget
        if (name == "solarPower") {
            console.log("is solar power")
            const { checked } = e.currentTarget
            const formFilterData = { ...filterData, solarPower: checked }
            setFilterState(formFilterData)
            // setFilterData(formFilterData)
            loadVans(formFilterData);
        }
        else {
            const { value } = e.currentTarget
            const formFilterData = { ...filterData, [name]: value }
            setFilterState(formFilterData)
            // setFilterData(formFilterData)
            loadVans(formFilterData);
        }
    }

const handleSubmit = e => {
    e.preventDefault()
}

    const { name, solarPower, startDate, endDate } = filterData

return (
    <div className="resultsPage">
        <form onSubmit={handleSubmit}>
            <label>
                Search
                <input type="text" value={name} name="name" onChange={handleFilterChange} />
            </label>
            <label>
                With solar Power
                <input type="checkbox" checked={solarPower} name="solarPower" onChange={handleFilterChange} />
            </label>

        </form>
        {vans.map(van => {
            return (
                <VanCard {...van} />
            )
        })}
        <Container>
            <hr />
            <DatePicker setFilterState={setFilterState}/>
        </Container>

    </div>
)
}

export default ResultsPage