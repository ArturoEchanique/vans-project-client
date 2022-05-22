
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
import { useNavigate } from "react-router-dom"
import "./ResultsPage.css"

const ResultsPage = ({ setFilterInfo, filterData }) => {
    const { isLoggedIn, isLoading, user } = useContext(AuthContext)

    // const [fetching, setFetching] = useState(false);
    const [vans, setVans] = useState([])
    const [mapVans, setmapVans] = useState([])
    const [hasMoreVans, setHasMoreVans] = useState(true)
    const [noResults, setNoResults] = useState(true)
    const [isFetchingData, setIsFetchingData] = useState(false)
    const [locationSwitcher, setLocationSwitcher] = useState(false)
    const [favoriteVans, setFavoriteVans] = useState([])
    const navigate = useNavigate()

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
                if (query.skip === 0) {
                    if (data.length === 0) {
                        setHasMoreVans(false)
                        setNoResults(true)
                    }
                    else {
                        setNoResults(false)
                    }
                    setVans(data)
                    console.log("data is", data)
                    let vansCopy = []
                    for (let i = 0; i < 19; i++) {
                        if (data.length >= i + 1) {
                            if (!vansCopy.includes(data[i])) vansCopy.push(data[i])
                        }
                    }
                    console.log("vanscopy is", vansCopy)
                    setmapVans(vansCopy)
                }
                else {
                    setNoResults(false)
                    setVans([...vans, ...data])
                    let vansCopy2 = []
                    for (let i = 0; i < 19; i++) {
                        if (vans.length >= i + 1) {
                            if (!vansCopy2.includes(vans[i])) vansCopy2.push(vans[i])
                        }
                    }
                    setmapVans(vansCopy2)
                    if (data.length === 0) setHasMoreVans(false)
                    else setHasMoreVans(true)
                }
                setTimeout(() => {
                    setIsFetchingData(false)
                }, 1000)

            })
            .catch((err) => {
                setTimeout(() => {
                    setIsFetchingData(false)
                }, 1000)
                console.log(err)
            })
    }

    const getFavoriteVans = () => {
        userService
            .getOneUser(user._id)
            .then(({ data }) => {
                setFavoriteVans(data.favoriteVans.map(favoriteVan => favoriteVan._id))
            })
            .catch((err) => console.log(err))
    }

    const addFavoriteVan = (vanId) => {
        if (!user) {
            navigate("/login")
        }
        console.log("try adding favorite")
        userService
            .addFavoriteVan(user._id, vanId)
            .then(() => {
                getFavoriteVans()
            })
            .catch((err) => console.log(err))
    }
    const removeFavoriteVan = (vanId) => {
        if (!user) {
            navigate("/login")
        }
        userService
            .removeFavoriteVan(user._id, vanId)
            .then(() => getFavoriteVans())
            .catch((err) => console.log(err))
    }

    const handleFilterChange = (e) => {
        const { name } = e.currentTarget
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
        if (!isFetchingData) {
            setIsFetchingData(true)
            console.log("fetching more data")
            loadVans({ ...filterData, skip: vans.length })
        }

        // setTimeout(() => {
        //     loadVans({ ...filterData, skip: vans.length })
        // }, 1000)
    }

    // const testClick = () => {
    //     console.log("clicked!")
    // }


    return (

        <div className="resultsPageMain">

            <div className="resultsTopBar">
                <Row className="justify-content-center">
                    <div className="cityAndDate">
                        <Col xs={12} className="d-flex justify-content-center">
                            <>
                                <form>
                                    <label>
                                        <input className="cityAndDateElem" value={"Valencia"} />
                                    </label>
                                </form>
                            </>
                            <>
                                <DatePicker handleDatesChange={setFilterInfo} />
                            </>
                        </Col>
                    </div>
                </Row>
            </div>
            <Container fluid className="">
                <Row >
                    <Col xs={3}>
                        <VanCardList addFavoriteVan={addFavoriteVan} removeFavoriteVan={removeFavoriteVan} favoriteVans={favoriteVans} fetchMoreData={fetchMoreData} noResults={noResults} hasMoreVans={hasMoreVans} isFetchingData={isFetchingData} vans={vans}> </VanCardList>


                    </Col>
                    <Col xs={6}>
                        <ReactMap locationSwitcher={locationSwitcher} initLocationX={mapInitLocationX} initLocationY={mapInitLocationY} favoriteVans={favoriteVans} addFavoriteVan={addFavoriteVan} removeFavoriteVan={removeFavoriteVan} handleMapBoundsChange={handleMapBoundsChange} vans={mapVans} />

                    </Col>
                    <Col xs={3}>
                        <Container className="filterMain filterScroll">
                            <h3 className="filterTitle">Name</h3>
                            <Row className="justify-content-center filterRow">
                                <Col>
                                    <Form.Control className="textInputClean textInputBig" type="email" value={name} name="name" placeholder="Insert a van name" onChange={handleFilterChange} />
                                </Col>
                            </Row>
                            <h3 className="filterTitle">Features</h3>
                            <Row className="justify-content-center filterRowSmall">
                                <Col className="filterButtonCol">
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
                                <Col className="filterButtonCol">
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
                                <Col className="filterButtonCol">
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
                                <Col className="filterButtonCol">
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
                                <Col className="filterButtonCol">
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
                                <Col className="filterButtonCol">
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
                            <h3 className="filterTitle">Price range</h3>
                            <Row className="justify-content-center filterRow">
                                <Col>
                                    <PriceSlider handlePriceChange={handleFilterPriceChange} />
                                </Col>
                            </Row>
                            <Row className="justify-content-center filterRow">
                                <Col className="filterButtonCol">
                                    <Form.Control className="textInputSmall textInputClean" value={priceStart + "€"} name="name" placeholder="Price start" />
                                </Col>
                                <Col className="filterButtonCol">
                                    <Form.Control className="textInputSmall textInputClean" value={priceEnd + "€"} name="name" placeholder="Price start" />
                                </Col>
                            </Row>
                            <h3 className="filterTitle">Select dates</h3>
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
        </div>
    )
}

export default ResultsPage
