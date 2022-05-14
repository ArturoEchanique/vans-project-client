import { Container } from "react-bootstrap";
import { useEffect, useState } from "react";
import vanService from "./../../services/van.service";
import VanCard from "../../components/VanCard/VanCard";
import DatePicker from "../../components/DatePicker/DatePicker";
import MyComponent from "../../components/Map/Map";
import './ResultsPage.css'

const ResultsPage = ({ setFilterInfo, filterData }) => {
   

    // const [fetching, setFetching] = useState(false);
    const [vans, setVans] = useState([]);

    useEffect(() => loadVans(filterData), []);

    const loadVans = (query) => {
        vanService

            .getVans(query)
            .then(({ data }) => {
              
                // setFetching(true);
                setVans(data);
            })
            .catch((err) => console.log(err));
    };

    const handleFilterChange = (e) => {
        const { name } = e.currentTarget;
        if (name == "solarPower") {
          
            const { checked } = e.currentTarget;
            const formFilterData = { ...filterData, solarPower: checked };
            setFilterInfo(formFilterData);
            loadVans(formFilterData);
        } else {
            const { value } = e.currentTarget;
            const formFilterData = { ...filterData, [name]: value };
            setFilterInfo(formFilterData);
            loadVans(formFilterData);
        }
    };

    const handleFilterDatesChange = (dates) => {
        setFilterInfo(dates);
        loadVans({ ...filterData, ...dates });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
    };

    const { name, solarPower, startDate, endDate } = filterData;

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
            <MyComponent/>
            {vans.map((van, idx) => {
                return (
                    <VanCard key={idx} {...van} />
                )
            })}
            <Container>
                <hr />
                <DatePicker handleDatesChange={handleFilterDatesChange} />
            </Container>
        </div>
    );
};

export default ResultsPage;
