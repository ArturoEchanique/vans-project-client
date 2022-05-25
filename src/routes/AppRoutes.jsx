import { useState } from "react"
import PrivateRoutes from "./PrivateRoutes"
import { Routes, Route } from "react-router-dom"
import HomePage from "../pages/HomePage/HomePage"
import ErrorPage from "../pages/ErrorPage/ErrorPage"
import LoginPage from "../pages/loginPage/loginPage"
import AdminPage from "../pages/AdminPage/AdminPage"
import Map from "../components/geocodeMap/geocodeMap"
import SignupPage from "../pages/SingupPage/SingupPage"
import NewVanPage from "../pages/NewVanPage/NewVanPage"
import ResultsPage from "../pages/ResultsPage/ResultsPage"
import ProfilePage from "../pages/ProfilePage/ProfilePage"
import EditVanPage from "../pages/EditVanPage/EditVanPage"
import MessagesPage from "../pages/MessagesPage/MessagesPage"
import VanDetails from "../pages/VanDetailsPage/VanDetailsPage"
import BecomeHostPage from "../pages/BecomeHostPage/BecomeHostPage"
import PrivacyTermsPage from "../pages/PrivacyTermsPage/PrivacyTermsPage"
import AdminEditUserPage from "../pages/AdminEditUserPage/AdminEditUserPage"
import BookingConfirmPage from "../pages/BookingConfirmPage/BookingConfirmPage"
import PaymentDetailsPage from "../pages/PaymentDetailsPage/PaymentDetailsPage"


const today = new Date()

const AppRoutes = ({ filterData, setFilterInfo, setHideFilter, hideFilter }) => {
    // const [filterData, setFilterData] = useState({
    //     skip: 0,
    //     mapXBounds: [40, 41],
    //     mapYBounds: [-4, -3],
    //     address: "Valencia",
    //     mapInitLocationX: 40.39103445694156,
    //     mapInitLocationY: -3.7007285931754588,
    //     priceStart: 0,
    //     priceEnd: 400,
    //     startDate: today,
    //     endDate: null,
    //     name: "",
    //     solarPower: false,
    //     shower: false,
    //     bathroom: false,
    //     kitchen: false,
    //     sunRoof: false,
    //     heatedSeats: false,
    // })

    const [bookingData, setBookingData] = useState({
        startDate: today,
        endDate: null,
        price: 0,
        bookedVan: "",
    })

    // const setFilterInfo = (data) => {
    //     setFilterData({ ...filterData, ...data })
    // }

    const setBookingInfo = (data) => {
        setBookingData({ ...bookingData, ...data })
    }

    return (
        <Routes>
            <Route path="/map" element={<Map />} />
            <Route path="/*" element={<ErrorPage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/singup" element={<SignupPage />} />
            <Route path="/:van_id/edit" element={<EditVanPage />} />
            <Route path="/become-host" element={<BecomeHostPage />} />
            <Route path="/privacyterms" element={<PrivacyTermsPage />} />
            <Route path="/admin" element={<PrivateRoutes requiredRoles={["ADMIN"]} />}>
                <Route path="" element={<AdminPage />} />
                <Route path="/admin/edit-user/:_id" element={<AdminEditUserPage />} />
            </Route>
            <Route path="/newvan" element={<PrivateRoutes requiredRoles={["USER", "OWNER"]} />}>
                <Route path="" element={<NewVanPage />} />
            </Route>
            <Route path="/profile" element={<PrivateRoutes requiredRoles={["USER", "OWNER"]} />}>
                <Route path="" element={<ProfilePage />} />
            </Route>
            <Route path="/booking" element={<PrivateRoutes requiredRoles={["USER", "OWNER"]} />}>
                <Route path="" element={<BookingConfirmPage {...bookingData} />} />
            </Route>

            <Route path="/paydetails" element={<PrivateRoutes requiredRoles={["USER", "OWNER"]} />}>
                <Route path="" element={<PaymentDetailsPage {...bookingData} />} />
            </Route>
            <Route path="/profile/messages" element={<PrivateRoutes requiredRoles={["USER", "OWNER"]} />}>
                <Route path="" element={<MessagesPage />} />
            </Route>
            <Route path="/" element={<HomePage  filterData={filterData} setFilterInfo={setFilterInfo} />} />
            <Route path="/results" element={<ResultsPage setFilterInfo={setFilterInfo} filterData={filterData} />} />
            <Route path="/:van_id/details" element={<VanDetails setBookingInfo={setBookingInfo} bookingInfo={bookingData} />} />
        </Routes>
    )
}

export default AppRoutes
