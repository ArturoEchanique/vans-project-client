import { Container } from "react-bootstrap";
import { useEffect, useState, useContext } from "react";
import vanService from "./../../services/van.service";
import VanCard from "../../components/VanCard/VanCard";
import DatePicker from "../../components/DatePicker/DatePicker";
import { AuthContext } from "../../context/auth.context"
import ReactMap from "../../components/ReactMap/ReactMap";
import './ResultsPage.css'
import PriceSlider from "../../components/PriceSlider/PriceSlider";
import { Row } from "react-bootstrap";
import InfiniteScroll from "react-infinite-scroll-component";
import userService from "./../../services/user.service";

const ResultsPage = ({ setFilterInfo, filterData }) => {

    const { isLoggedIn, isLoading, user } = useContext(AuthContext)

    // const [fetching, setFetching] = useState(false);
    const [vans, setVans] = useState([]);
    const [hasMoreVans, setHasMoreVans] = useState(true);
    const [favoriteVans, setFavoriteVans] = useState([]);

    useEffect(() => {
        loadVans(filterData)
     }, []);

    useEffect(() => {
        
       user && getFavoriteVans()
    }, [user]);

    const loadVans = (query) => {
        vanService

            .getVans(query)
            .then(({ data }) => {

                // setFetching(true);
                if (query.skip === 0) setVans(data)
                else {
                    setVans([...vans, ...data])
                    if (data.length === 0) setHasMoreVans(false)
                    else (setHasMoreVans(true))
                }
            })
            .catch((err) => console.log(err));
    };

    const getFavoriteVans = () => {

        userService
            .getOneUser(user._id)
            .then(({ data }) => {
                setFavoriteVans(data.favoriteVans)
            })
            .catch((err) => console.log(err));
    };

    const addFavoriteVan = (vanId) => {
        userService
            .addFavoriteVan(user._id, vanId)
            .then(() => getFavoriteVans())
            .catch((err) => console.log(err));
    }
    const removeFavoriteVan = (vanId) => {
        userService
            .removeFavoriteVan(user._id, vanId)
            .then(() => getFavoriteVans())
            .catch((err) => console.log(err));
    }

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
    const handleMapBoundsChange = (bounds) => {
        (setHasMoreVans(true))
        setFilterInfo(bounds);
        loadVans({ ...filterData, ...bounds });
    };

    const handleFilterDatesChange = (dates) => {
        (setHasMoreVans(true))
        setFilterInfo(dates);
        loadVans({ ...filterData, ...dates });
    };

    const handleFilterPriceChange = (priceRange) => {
        (setHasMoreVans(true))
        setFilterInfo(priceRange);
        loadVans({ ...filterData, ...priceRange });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
    };

    const fetchMoreData = () => {
        console.log("fetching more data")
        // loadVans({ ...filterData, skip: vans.length });
        //I put an timeout to not slow down the infinite scroll a little bit
        setTimeout(() =>{
            loadVans({ ...filterData, skip: vans.length });
        }, 1000)

    };

    const { name, solarPower, shower, bathroom, startDate, endDate } = filterData;

    return (
        <div className="resultsPage">
            <Container>
                <hr />
                <DatePicker startDate={startDate} endDate={endDate} handleDatesChange={handleFilterDatesChange} />
            </Container>
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
                <PriceSlider handlePriceChange={handleFilterPriceChange} />
            </form>
            <ReactMap favoriteVans={favoriteVans} addFavoriteVan={addFavoriteVan} removeFavoriteVan={removeFavoriteVan} handleMapBoundsChange={handleMapBoundsChange} vans={vans.slice(0, 19)} />
            <InfiniteScroll
                dataLength={vans.length / 4}
                next={fetchMoreData}
                hasMore={hasMoreVans}
                loader={<h4>Loading...</h4>}
            >
                <Container>
                    <Row>
                        {vans.map((van, idx) => {
                            return (
                                <VanCard key={idx} {...van} isFavorite={favoriteVans.includes(van._id)} addFavoriteVan={addFavoriteVan} removeFavoriteVan={removeFavoriteVan} />
                            )
                        })}
                    </Row>
                </Container>
            </InfiniteScroll>
        </div>
    );
};

export default ResultsPage;
