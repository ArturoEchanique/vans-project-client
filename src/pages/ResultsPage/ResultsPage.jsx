import "./ResultsPage.css"
import { Button, Col, Row, Form, ToggleButton, Container } from "react-bootstrap"
import vanService from "./../../services/van.service"
import VanCard from "../../components/VanCard/VanCard"
import { useEffect, useState, useContext } from "react"
import userService from "./../../services/user.service"
import { AuthContext } from "../../context/auth.context"
import ReactMap from "../../components/ReactMap/ReactMap"
import InfiniteScroll from "react-infinite-scroll-component"
import DatePicker from "../../components/DatePicker/DatePicker"
import PriceSlider from "../../components/PriceSlider/PriceSlider"
import VanCardList from "../../components/VanCardList/VanCardList"

const ResultsPage = ({ setFilterInfo, filterData }) => {
    const { isLoggedIn, isLoading, user } = useContext(AuthContext)

    // const [fetching, setFetching] = useState(false);
    const [vans, setVans] = useState([])
    const [hasMoreVans, setHasMoreVans] = useState(true)
    const [locationSwitcher, setLocationSwitcher] = useState(false)
    const [favoriteVans, setFavoriteVans] = useState([])

    const { name, solarPower, shower, bathroom, sunRoof, heatedSeats, kitchen, startDate, endDate, mapInitLocationX, mapInitLocationY, priceStart, priceEnd } = filterData;


    useEffect(() => {
        loadVans(filterData)
    }, [])

    useEffect(() => {
        user && getFavoriteVans()
    }, [user])

    const loadVans = (query) => {
        vanService

            .getVans(query)
            .then(({ data }) => {
                if (query.skip === 0) setVans(data)
                else {
                    setVans([...vans, ...data])
                    if (data.length === 0) setHasMoreVans(false)
                    else setHasMoreVans(true)
                }
            })
            .catch((err) => console.log(err))
    }

    const getFavoriteVans = () => {
        userService
            .getOneUser(user._id)
            .then(({ data }) => {
                setFavoriteVans(data.favoriteVans)
            })
            .catch((err) => console.log(err))
    }

    const addFavoriteVan = (vanId) => {
        userService
            .addFavoriteVan(user._id, vanId)
            .then(() => getFavoriteVans())
            .catch((err) => console.log(err))
    }
    const removeFavoriteVan = (vanId) => {
        userService
            .removeFavoriteVan(user._id, vanId)
            .then(() => getFavoriteVans())
            .catch((err) => console.log(err))
    }

    const handleFilterChange = (e) => {
        console.log("changing filter")
        const { name } = e.currentTarget
        console.log("name is", name)
        if (e.currentTarget.hasOwnProperty("checked")) {
            const { checked } = e.currentTarget
            const formFilterData = { ...filterData, [name]: checked }
            setFilterInfo(formFilterData)
            loadVans(formFilterData)
        } else {
            const { value } = e.currentTarget
            const formFilterData = { ...filterData, [name]: value }
            setFilterInfo(formFilterData)
            loadVans(formFilterData)
        }
    }
    const handleMapBoundsChange = (bounds) => {
        setHasMoreVans(true)
        setFilterInfo(bounds)
        loadVans({ ...filterData, ...bounds })
    }

    const handleFilterDatesChange = (dates) => {
        setHasMoreVans(true)
        setFilterInfo(dates)
        loadVans({ ...filterData, ...dates })
    }

    const handleFilterPriceChange = (priceRange) => {
        setHasMoreVans(true)
        setFilterInfo(priceRange)
        loadVans({ ...filterData, ...priceRange })
    }

    // const solarPowerClicked = () => {
    //     const formFilterData = { ...filterData, solarPower: !solarPower }
    //     setFilterInfo(formFilterData)
    //     loadVans(formFilterData)
    // }

    const handleSubmit = (e) => {
        e.preventDefault()
    }

    const fetchMoreData = () => {
        setTimeout(() => {
            loadVans({ ...filterData, skip: vans.length })
        }, 1000)
    }

    // const testClick = () => {
    //     console.log("clicked!")
    // }


    return (
        <div className="resultsPage">
            <Container fluid>
                <Row >
                    <Col >
                        <InfiniteScroll
                            dataLength={vans.length / 4}
                            next={fetchMoreData}
                            hasMore={hasMoreVans}
                            loader={<h4>Loading...</h4>}
                        >
                            <VanCardList vans={vans}> </VanCardList>
                            {/* <Container>
                                <Row>
                                    {vans.map((van, idx) => {
                                        return <VanCard key={idx} {...van} isFavorite={favoriteVans.includes(van._id)} addFavoriteVan={addFavoriteVan} removeFavoriteVan={removeFavoriteVan} />
                                    })}
                                </Row>
                            </Container> */}
                        </InfiniteScroll>


                    </Col>
                    <Col >
                        <ReactMap locationSwitcher={locationSwitcher} initLocationX={mapInitLocationX} initLocationY={mapInitLocationY} favoriteVans={favoriteVans} addFavoriteVan={addFavoriteVan} removeFavoriteVan={removeFavoriteVan} handleMapBoundsChange={handleMapBoundsChange} vans={vans.slice(0, 30)} />

                    </Col>
                    <Col >
                        <Container>
                            <h3 className="filterRow">Name</h3>
                            <Row className="justify-content-center filterRow">
                                <Col>
                                    <Form.Control className="textInput" type="email" value={name} name="name" placeholder="Insert a van name" onChange={handleFilterChange} />
                                </Col>
                            </Row>
                            <h3 className="filterRow">Features</h3>
                            <Row className="justify-content-center filterRowSmall">
                                <Col>
                                    <ToggleButton
                                        className="filterButton"
                                        id="solarPower"
                                        type="checkbox"
                                        variant={solarPower ? "dark" : "light"}
                                        checked={solarPower}
                                        name="solarPower"
                                        onChange={handleFilterChange}>
                                        Solar power
                                    </ToggleButton>
                                </Col>
                                <Col>
                                    <ToggleButton
                                        className="filterButton"
                                        id="shower"
                                        type="checkbox"
                                        variant={shower ? "dark" : "light"}
                                        checked={shower}
                                        name="shower"
                                        onChange={handleFilterChange}>
                                        Shower
                                    </ToggleButton>
                                </Col>
                            </Row>
                            <Row className="justify-content-center filterRowSmall">
                                <Col>
                                    <ToggleButton
                                        className="filterButton"
                                        id="bathroom"
                                        type="checkbox"
                                        variant={bathroom ? "dark" : "light"}
                                        checked={bathroom}
                                        name="bathroom"
                                        onChange={handleFilterChange}>
                                        Bathroom
                                    </ToggleButton>
                                </Col>
                                <Col>
                                    <ToggleButton
                                        className="filterButton"
                                        id="kitchen"
                                        type="checkbox"
                                        variant={kitchen ? "dark" : "light"}
                                        checked={kitchen}
                                        name="kitchen"
                                        onChange={handleFilterChange}>
                                        Kitchen
                                    </ToggleButton>
                                </Col>
                            </Row>
                            <Row className="justify-content-center filterRowSmall">
                                <Col>
                                    <ToggleButton
                                        className="filterButton"
                                        id="sunRoof"
                                        type="checkbox"
                                        variant={sunRoof ? "dark" : "light"}
                                        checked={sunRoof}
                                        name="sunRoof"
                                        onChange={handleFilterChange}>
                                        Sun roof
                                    </ToggleButton>
                                </Col>
                                <Col>
                                    <ToggleButton
                                        className="filterButton"
                                        id="heatedSeats"
                                        type="checkbox"
                                        variant={heatedSeats ? "dark" : "light"}
                                        checked={heatedSeats}
                                        name="heatedSeats"
                                        onChange={handleFilterChange}>
                                        Heated seats
                                    </ToggleButton>
                                </Col>
                            </Row>
                            <h3 className="filterRow">Price range</h3>
                            <Row className="justify-content-center filterRow">
                                <Col>
                                    <PriceSlider handlePriceChange={handleFilterPriceChange} />
                                </Col>
                            </Row>
                            <Row className="justify-content-center filterRow">
                                <Col>
                                    <Form.Control className="textInputSmall" value={priceStart + "€"} name="name" placeholder="Price start" />
                                </Col>
                                <Col>
                                    <Form.Control className="textInputSmall" value={priceEnd + "€"} name="name" placeholder="Price start" />
                                </Col>
                            </Row>
                            <h3 className="filterRow">Select dates</h3>
                            <Row className="justify-content-center filterRow">
                                <Col>
                                    <DatePicker startDate={startDate} endDate={endDate} handleDatesChange={handleFilterDatesChange} />
                                </Col>
                            </Row>
                            <Row className="justify-content-center filterRow">
                                <Col>
                                    <Button variant="dark filterButtonWide" onClick={() => setLocationSwitcher(!locationSwitcher)}>
                                        Search near vans
                                    </Button>
                                </Col>
                            </Row>
                        </Container>
                    </Col>
                </Row>
            </Container>
            <div className="resultsPage">
                {/* <form onSubmit={handleSubmit}>
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
                    <label>
                        Kitchen
                        <input type="checkbox" checked={kitchen} name="kitchen" onChange={handleFilterChange} />
                    </label>
                    <label>
                        Sun roof
                        <input type="checkbox" checked={sunRoof} name="sunRoof" onChange={handleFilterChange} />
                    </label>
                    <label>
                        Heated seats
                        <input type="checkbox" checked={heatedSeats} name="heatedSeats" onChange={handleFilterChange} />
                    </label>

                </form> */}
                {/* <ButtonGroup>

                        <Button key={idx} onClick={() => setSelectedChat(idx)}
                            active={selectedChat === idx} >
                            {getChatPartner(chat).username}
                        </Button>
            </ButtonGroup> */}
            </div>
        </div>
    )
}

export default ResultsPage
