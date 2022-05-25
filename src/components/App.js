import { useState } from "react"
import "bootstrap/dist/css/bootstrap.min.css"
import "./App.css"
import AppRoutes from "../routes/AppRoutes"
import Navigation from "./Navigation/Navigation"
import UserMessage from "./UserMessage/UserMessage"
import Footer from "./Footer/Footer"


const today = new Date()

const App = () => {

    const [filterData, setFilterData] = useState({
        skip: 0,
        mapXBounds: [40, 41],
        mapYBounds: [-4, -3],
        address: "Valencia",
        mapInitLocationX: 40.39103445694156,
        mapInitLocationY: -3.7007285931754588,
        priceStart: 0,
        priceEnd: 400,
        passengersStart: 0,
        passengersEnd: 12,
        startDate: today,
        endDate: null,
        name: "",
        solarPower: false,
        shower: false,
        bathroom: false,
        kitchen: false,
        sunRoof: false,
        heatedSeats: false,
    })

    const setFilterInfo = (data) => {
        setFilterData({ ...filterData, ...data })
    }

    return (
        <>
            <Navigation filterData={filterData} setFilterInfo={setFilterInfo}/>
            <AppRoutes filterData={filterData} setFilterInfo={setFilterInfo}/>
            <UserMessage />
            {/* <Footer /> */}
        </>
    )
}

export default App
