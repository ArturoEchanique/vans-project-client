
import { Button, Col, Row, Form, ToggleButton, Container, Modal } from "react-bootstrap"
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
import { ProSidebar, Menu, MenuItem, SubMenu } from 'react-pro-sidebar';
import 'react-pro-sidebar/dist/css/styles.css';
import CityAndDate from "../../components/CityAndDate/CityAndDate"
import MaxPassengersSlider from "../../components/MaxPassengersSlider/MaxPassengersSlider"
import Loginform from "../../components/LoginForm/LoginForm"

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
    const [locationSwitcher, setLocationSwitcher] = useState(false)
    const [favoriteVans, setFavoriteVans] = useState([])
    const navigate = useNavigate()
    const [showModals, setShowModals] = useState(false)



    const showLoginModal = () => setShowModals(true)
    const closeLoginModal = () => setShowModals(false)

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

                <Container fluid>
                    <Row className="">
                        <Col xs={3} className="d-flex justify-content-center">
                            <div className="nameSearchBar">
                                <form onSubmit={handleSubmit}>
                                    <input className=" nameSearchBarInput textInputClean textInputBig" type="text" value={name} name="name" placeholder="Write a van name" onChange={handleFilterChange} />
                                </form>
                                <img className="searchNameIcon" src="./../../images/magnifyingGlassIcon.png"></img>
                            </div>
                        </Col>
                        <Col xs={5} className="d-flex justify-content-center">
                            <CityAndDate filterData={filterData} setFilterInfo={setFilterInfo} handleDatesChange={setFilterInfo}></CityAndDate>
                        </Col>
                        <Col xs={2} className="d-flex justify-content-center">
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
                            {/* <Button variant="light filterButtonWide" onClick={() => setLocationSwitcher(!locationSwitcher)}>
                                Show nearest vans
                            </Button> */}
                        </Col>
                        <Col xs={2} className="d-flex justify-content-end">
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




            <Container fluid className="resultsPageContainerMain">
                <Row >
                    <Col xs={5} style={{ paddingRight: 0 }}>
                        <VanCardList addFavoriteVan={addFavoriteVan} removeFavoriteVan={removeFavoriteVan} favoriteVans={favoriteVans} fetchMoreData={fetchMoreData} noResults={noResults} hasMoreVans={hasMoreVans} isFetchingData={isFetchingData} vans={vans}> </VanCardList>
                    </Col>
                    <Col style={{ paddingLeft: 0, paddingRight: 0 }}>
                        <ReactMap locationSwitcher={locationSwitcher} initLocationX={mapInitLocationX} initLocationY={mapInitLocationY} favoriteVans={favoriteVans} addFavoriteVan={addFavoriteVan} removeFavoriteVan={removeFavoriteVan} handleMapBoundsChange={handleMapBoundsChange} vans={mapVans} />

                    </Col >
                    <Col style={{ paddingLeft: 0, paddingRight: 0 }} xs={false ? 3 : "auto"} className="d-flex justify-content-end">
                        <ProSidebar collapsed={filtersCollapsed} rtl={false} width={"350px"} collapsedWidth={"0px"}>

                            {/* <Menu iconShape="square">
                                <MenuItem>Dashboard</MenuItem>
                                <SubMenu title="Components">
                                    <MenuItem>Component 1</MenuItem>
                                    <MenuItem>Component 2</MenuItem>
                                </SubMenu>
                            </Menu> */}
                            <Container className="filterMain filterScroll">
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
                                <h3 className="filterTitle">Max passengers</h3>
                                <Row className="justify-content-center filterRow">
                                    <Col>
                                        <MaxPassengersSlider handlePassengersChange={handleFilterPassengersChange} />
                                    </Col>
                                </Row>
                                <Row className="justify-content-center filterRow">
                                    <Col className="filterButtonCol">
                                        <Form.Control className="textInputSmall textInputClean" value={passengersStart + " passengers"} name="passengers" placeholder="Passengers start" />
                                    </Col>
                                    <Col className="filterButtonCol">
                                        <Form.Control className="textInputSmall textInputClean" value={passengersEnd + " passengers"} name="passengers" placeholder="Passengers start" />
                                    </Col>
                                </Row>
                            </Container>
                        </ProSidebar>
                    </Col>


                </Row>
            </Container>
        </div>
    )
}

export default ResultsPage
