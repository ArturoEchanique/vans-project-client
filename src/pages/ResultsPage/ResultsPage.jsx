import { Container } from "react-bootstrap";
import { useEffect, useState } from "react";
import vanService from "./../../services/van.service";
import VanCard from "../../components/VanCard/VanCard";
import DatePicker from "../../components/DatePicker/DatePicker";
import MyComponent from "../../components/Map/Map";
import './ResultsPage.css'
import PriceSlider from "../../components/PriceSlider/PriceSlider";

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
        if (e.currentTarget.hasOwnProperty('checked')) {
            const { checked } = e.currentTarget;
            const formFilterData = { ...filterData, [name]: checked };
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

    const handleFilterPriceChange = (priceRange) => {
        setFilterInfo(priceRange);
        loadVans({ ...filterData, ...priceRange });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
    };

    const { name, solarPower, shower, bathroom, startDate, endDate } = filterData;

    return (
        <div className="resultsPage">
            <form onSubmit={handleSubmit}>
                <label>
                    Search
                    <input type="text" value={name} name="name" onChange={handleFilterChange} />
                </label>
                <label>
                    Solar Power
                    <input type="checkbox" checked={solarPower} name="solarPower" onChange={handleFilterChange} />
                </label>
                <label>
                    Shower
                    <input type="checkbox" checked={shower} name="shower" onChange={handleFilterChange} />
                </label>
                <label>
                    BathRoom
                    <input type="checkbox" checked={bathroom} name="bathroom" onChange={handleFilterChange} />
                </label>
                <PriceSlider handlePriceChange={handleFilterPriceChange}/>
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
