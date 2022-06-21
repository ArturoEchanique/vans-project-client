
import { Button, Col, Row, Form, ToggleButton, Container, Modal } from "react-bootstrap"
import vanService from "./../../services/van.service"
import { useEffect, useState, useContext } from "react"
import userService from "./../../services/user.service"
import { AuthContext } from "../../context/auth.context"
import ReactMap from "../../components/ReactMap/ReactMap"
import PriceSlider from "../../components/PriceSlider/PriceSlider"
import VanCardList from "../../components/VanCardList/VanCardList"
import { useNavigate } from "react-router-dom"
import "./ResultsPage.css"
import { ProSidebar, Menu, MenuItem, SubMenu } from 'react-pro-sidebar';
import 'react-pro-sidebar/dist/css/styles.css';
import CityAndDate from "../../components/CityAndDate/CityAndDate"
import MaxPassengersSlider from "../../components/MaxPassengersSlider/MaxPassengersSlider"
import Loginform from "../../components/LoginForm/LoginForm"
import useWindowDimensions from "../../utils/useWindowDimensions"

const ResultsPage = ({ setFilterInfo, filterData }) => {
    const { isLoggedIn, isLoading, user } = useContext(AuthContext)
    const [filtersCollapsed, setFiltersCollapsed] = useState(true)
    // const [fetching, setFetching] = useState(false);
    const [vans, setVans] = useState([])
    const [vansFound, setVansFound] = useState(0)
    const [mapVans, setmapVans] = useState([])
    const [hasMoreVans, setHasMoreVans] = useState(true)
    const [noResults, setNoResults] = useState(true)
    const [isFetchingData, setIsFetchingData] = useState(false)
    const [showMap, setShowMap] = useState(true)
    const [locationButtonPressed, setLocationButtonPressed] = useState(false)
    const [locationSwitcher, setLocationSwitcher] = useState(false)
    const [favoriteVans, setFavoriteVans] = useState([])
    const navigate = useNavigate()
    const [showModals, setShowModals] = useState(false)
    const { height, width } = useWindowDimensions();



    const showLoginModal = () => setShowModals(true)
    const closeLoginModal = () => setShowModals(false)
    const closeFiltersModal = () => setFiltersCollapsed(true)

    const { name, solarPower, shower, bathroom, sunRoof, heatedSeats, kitchen, startDate, endDate, mapInitLocationX, mapInitLocationY, priceStart, priceEnd, passengersStart, passengersEnd } = filterData;


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
                    setVansFound(data.length)
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
                    setVansFound(query.skip + data.length)
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
            setShowModals(true)

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
            setShowModals(true)

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

    const handleFilterPassengersChange = (passengersRange) => {
        setHasMoreVans(true)
        setFilterInfo(passengersRange)
        loadVans({ ...filterData, ...passengersRange })
    }

    const handleSubmit = (e) => {
        e.preventDefault()
    }

    const fetchMoreData = () => {
        if (!isFetchingData) {
            setIsFetchingData(true)
            console.log("fetching more data")
            loadVans({ ...filterData, skip: vans.length })
        }
    }

    const pressLocationButton = () => {
        closeFiltersModal()
        setShowMap(true)
        setLocationButtonPressed(true)
        setTimeout(() => {
            setLocationButtonPressed(false)
            setLocationSwitcher(!locationSwitcher)
        }, "200")
    }

    console.log("width is...-----", width)

    return (
        <div className={width > 1200 ? "resultsPageMain" : "resultsPageMainSm"}>
            {/* <ReactMap locationSwitcher={locationSwitcher} initLocationX={mapInitLocationX} initLocationY={mapInitLocationY} favoriteVans={favoriteVans} addFavoriteVan={addFavoriteVan} removeFavoriteVan={removeFavoriteVan} handleMapBoundsChange={handleMapBoundsChange} vans={mapVans} /> */}
            <div className="resultsTopBar" style={{ height: "70px" }}>
                <Modal show={showModals} onHide={closeLoginModal}>
                    <div className="modal1">
                        <Modal.Header closeButton>
                            <Modal.Title>Please Log in </Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            <Loginform closeModal={closeLoginModal} />
                        </Modal.Body>
                    </div>
                </Modal>
                <Modal show={!filtersCollapsed} onHide={closeFiltersModal}>
                    <div className="modal1">
                        <Modal.Header closeButton>
                            <Modal.Title>Filters</Modal.Title>
                        </Modal.Header>
                        <Modal.Body >
                            <Container className="filterMain filterScroll">
                                <Row className="d-flex justify-content-center filterRowSmall filterLocationButton">
                                    <button
                                        className={"locationButton" + (locationButtonPressed ? " pressed" : " unpressed")}
                                        id="showFilters"
                                        type="checkbox"
                                        variant={"light"}
                                        checked={filtersCollapsed}
                                        name="showFilters"
                                        onClick={pressLocationButton}>
                                        <img className="locationButtonIcon" src="./../../images/locationIcon.png"></img>
                                        Show nearest vans
                                    </button>
                                </Row>

                                <Row className="d-flex justify-content-center filterRowSmall filterVanName">
                                    <h3 className="filterTitle mt-4">Write a van name</h3>
                                    <div className="nameSearchBar" style={{ width: "100%" }}>
                                        <input className=" nameSearchBarInput textInputClean textInputBig" type="text" value={name} name="name" placeholder="Van name" onChange={handleFilterChange} />
                                        <img className="searchNameIcon" src="./../../images/magnifyingGlassIcon.png"></img>
                                    </div>
                                </Row>
                                <h3 className="filterTitle mt-4">Features</h3>
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
                                    <Col className="filterButtonCol" style={{ margin: "0px 1%" }}>
                                        <Form.Control className="textInputSmall textInputClean" value={priceStart + "€"} name="name" placeholder="Price start" />
                                    </Col>
                                    <Col className="filterButtonCol" style={{ margin: "0px 1%" }}>
                                        <Form.Control className="textInputSmall textInputClean" value={priceEnd + "€"} name="name" placeholder="Price start" />
                                    </Col>
                                </Row>
                                <h3 className="filterTitle">Max passengers</h3>
                                <Row className="justify-content-center filterRow">
                                    <Col>
                                        <MaxPassengersSlider handlePassengersChange={handleFilterPassengersChange} />
                                    </Col>
                                </Row>
                                <Row className="justify-content-center filterRow">
                                    <Col className="filterButtonCol" style={{ margin: "0px 1.8%" }}>
                                        <Form.Control className="textInputSmall textInputClean" value={passengersStart + " passengers"} name="passengers" placeholder="Passengers start" />
                                    </Col>
                                    <Col className="filterButtonCol" style={{ margin: "0px 1.8%" }}>
                                        <Form.Control className="textInputSmall textInputClean" value={passengersEnd + " passengers"} name="passengers" placeholder="Passengers start" />
                                    </Col>
                                </Row>

                                <Row className="justify-content-center filterRowSmall filterDatesBar">
                                    <h3 className="filterTitle mt-4 mb-3">City and date</h3>
                                    <CityAndDate filterData={filterData} setFilterInfo={setFilterInfo} handleDatesChange={setFilterInfo}></CityAndDate>
                                </Row>
                            </Container>
                        </Modal.Body>
                    </div>
                </Modal>
                <Container fluid style={{ padding: "0 5%" }}>
                    <Row className="d-flex justify-content-around">
                        <Col xs="auto" className="topBarLocationButton" style={{ padding: "0 6px" }}>
                            <button
                                style={{ width: "180px" }}
                                className={"locationButton" + (locationButtonPressed ? " pressed" : " unpressed")}
                                id="showFilters"
                                type="checkbox"
                                variant={"light"}
                                checked={filtersCollapsed}
                                name="showFilters"
                                onClick={pressLocationButton}>
                                <img className="locationButtonIcon" src="./../../images/locationIcon.png"></img>
                                Show nearest vans
                            </button>
                        </Col>

                        <Col xs="auto" className="topBarName" style={{ padding: "0 6px" }}>
                            <div className="nameSearchBar">
                                <form onSubmit={handleSubmit}>
                                    <input className=" nameSearchBarInput textInputClean textInputBig" type="text" value={name} name="name" placeholder="Van name" onChange={handleFilterChange} />
                                </form>
                                <img className="searchNameIcon" src="./../../images/magnifyingGlassIcon.png"></img>
                            </div>
                        </Col>
                        <Col xs="auto" className="topBarDatesBar" style={{ padding: "0 6px" }}>
                            <CityAndDate filterData={filterData} setFilterInfo={setFilterInfo} handleDatesChange={setFilterInfo}></CityAndDate>
                        </Col>
                        {(width <= 1200) &&
                            <Col xs="auto" className="showMapButtonCol" style={{ padding: "0 6px" }}>
                                <button
                                    className={"showMapButton" + (!showMap ? " unchecked" : " checked")}
                                    id="showMap"
                                    type="checkbox"
                                    variant={"light"}
                                    checked={showMap}
                                    name="showMap"
                                    onClick={() => setShowMap(!showMap)}>
                                    <img className="mapButtonIcon" src="./../../images/locationIcon.png"></img>
                                    {showMap ? "Hide map" : "Show map"}
                                </button>
                            </Col>
                        }

                        <Col xs="auto" className="" style={{ padding: "0 6px" }}>
                            <button
                                className={"showFiltersButton" + (filtersCollapsed ? " unchecked" : " checked")}
                                id="showFilters"
                                type="checkbox"
                                variant={"light"}
                                checked={filtersCollapsed}
                                name="showFilters"
                                onClick={() => setFiltersCollapsed(!filtersCollapsed)}>
                                <img className="filterButtonIcon" src="./../../images/filterIcon.png"></img>
                                Filters
                            </button>
                        </Col>
                    </Row>
                </Container>
            </div>
            <Container fluid className="resultsPageContainerMain" style={{ height: "91.5%" }}>
                <Row style={{ height: "100%" }}>
                    {(!showMap || width > 1200) &&
                        <Col sm={12} xl={5} style={{ padding: 0, height: "100%" }}>
                            <VanCardList addFavoriteVan={addFavoriteVan} removeFavoriteVan={removeFavoriteVan} favoriteVans={favoriteVans} fetchMoreData={fetchMoreData} noResults={noResults} hasMoreVans={hasMoreVans} isFetchingData={isFetchingData} vans={vans}> </VanCardList>
                        </Col>
                    }

                    {(showMap || width > 1200) &&
                        <Col style={{ paddingLeft: 0, paddingRight: 0, height: "100%" }}>
                            <ReactMap locationSwitcher={locationSwitcher} initLocationX={mapInitLocationX} initLocationY={mapInitLocationY} favoriteVans={favoriteVans} addFavoriteVan={addFavoriteVan} removeFavoriteVan={removeFavoriteVan} handleMapBoundsChange={handleMapBoundsChange} vans={mapVans} />
                        </Col >
                    }

                </Row>
            </Container>
            {/* <div className="filterContainerMain">
                <ProSidebar collapsed={filtersCollapsed} rtl={false} width={"min(100vw, 400px)"} collapsedWidth={"0px"}>
                    <Container className="filterMain filterScroll">
                        <Row className="d-flex justify-content-center filterRowSmall filterLocationButton">
                            <button
                                className={"locationButton"}
                                id="showFilters"
                                type="checkbox"
                                variant={"light"}
                                checked={filtersCollapsed}
                                name="showFilters"
                                onClick={() => setLocationSwitcher(!locationSwitcher)}>
                                <img className="locationButtonIcon" src="./../../images/locationIcon.png"></img>
                                Show nearest vans
                            </button>
                        </Row>

                        <Row className="d-flex justify-content-center filterRowSmall filterVanName">
                            <h3 className="filterTitle mt-4">Write a van name</h3>
                            <div className="nameSearchBar" style={{ width: "100%" }}>
                                <form onSubmit={handleSubmit}>
                                    <input className=" nameSearchBarInput textInputClean textInputBig" type="text" value={name} name="name" placeholder="Van name" onChange={handleFilterChange} />
                                </form>
                                <img className="searchNameIcon" src="./../../images/magnifyingGlassIcon.png"></img>
                            </div>
                        </Row>
                        <h3 className="filterTitle mt-4">Features</h3>
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
                            <Col className="filterButtonCol" style={{ margin: "0px 1%" }}>
                                <Form.Control className="textInputSmall textInputClean" value={priceStart + "€"} name="name" placeholder="Price start" />
                            </Col>
                            <Col className="filterButtonCol" style={{ margin: "0px 1%" }}>
                                <Form.Control className="textInputSmall textInputClean" value={priceEnd + "€"} name="name" placeholder="Price start" />
                            </Col>
                        </Row>
                        <h3 className="filterTitle">Max passengers</h3>
                        <Row className="justify-content-center filterRow">
                            <Col>
                                <MaxPassengersSlider handlePassengersChange={handleFilterPassengersChange} />
                            </Col>
                        </Row>
                        <Row className="justify-content-center filterRow">
                            <Col className="filterButtonCol" style={{ margin: "0px 1.8%" }}>
                                <Form.Control className="textInputSmall textInputClean" value={passengersStart + " passengers"} name="passengers" placeholder="Passengers start" />
                            </Col>
                            <Col className="filterButtonCol" style={{ margin: "0px 1.8%" }}>
                                <Form.Control className="textInputSmall textInputClean" value={passengersEnd + " passengers"} name="passengers" placeholder="Passengers start" />
                            </Col>
                        </Row>

                        <Row className="justify-content-center filterRowSmall filterDatesBar">
                            <h3 className="filterTitle mt-4 mb-3">City and date</h3>
                            <CityAndDate filterData={filterData} setFilterInfo={setFilterInfo} handleDatesChange={setFilterInfo}></CityAndDate>
                        </Row>
                    </Container>
                </ProSidebar>
            </div> */}
        </div>
    )
}

export default ResultsPage
