import SignupPage from "../pages/SingupPage/SingupPage";
import { Routes, Route } from "react-router-dom";
import HomePage from "../pages/HomePage/HomePage";
import ResultsPage from "../pages/ResultsPage/ResultsPage";
import ErrorPage from "../pages/ErrorPage/ErrorPage";
import LoginPage from "../pages/loginPage/loginPage";
import ProfilePage from "../pages/ProfilePage/ProfilePage";
import NewVanPage from "../pages/NewVanPage/NewVanPage";
import EditVanPage from "../pages/EditVanPage/EditVanPage";
import { useState } from "react";
// import BecomeHostPage from "../pages/BecomeHostPage/BecomeHostPage";
import VanDetails from "../pages/VanDetailsPage/VanDetailsPage";
import BookingConfirmPage from "../pages/BookingConfirmPage/BookingConfirmPage";
import PrivateRoutes from "./PrivateRoutes";

const AppRoutes = () => {
    // const [bookingDates, setBookingDates] = useState()
    const [filterData, setFilterData] = useState({
        startDate: new Date(),
        endDate: new Date(),
        name: "",
        solarPower: false,
    });

     const [bookingData, setBookingData] = useState({
        startDate: new Date(),
        endDate: new Date(),
        price: 0,
        van_id: "",
    });

    const setFilterInfo = (data) => {
        setFilterData({ ...filterData, ...data });
    };
   

    const setBookingInfo = (data) => {
        setBookingData({ ...bookingData, ...data });
    };

    return (
        <Routes>
            <Route path="/" element={<HomePage setFilterInfo={setFilterInfo} />} />
            <Route path="/singup" element={<SignupPage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route
                path="/results"
                element={<ResultsPage setFilterInfo={setFilterInfo} filterData={filterData} />}
            />
            {/* <Route path="/become-host" element={<BecomeHostPage />} /> */}
            <Route path="/:van_id/details" element={<VanDetails setBookingInfo={setBookingInfo} />} />
            <Route path="/:van_id/edit" element={<EditVanPage />} />
            <Route path="/booking" element={<BookingConfirmPage {...bookingData} />} />
            <Route path="/*" element={<ErrorPage />} />
            <Route path="/profile" element={<PrivateRoutes />}>
                <Route path="" element={<ProfilePage />} />
            </Route>
            <Route path="/newvan" element={<PrivateRoutes />}>
                <Route path="" element={<NewVanPage />} />
            </Route>
        </Routes>
    );
};

export default AppRoutes;
