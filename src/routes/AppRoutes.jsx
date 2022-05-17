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
import VanDetails from "../pages/VanDetailsPage/VanDetailsPage";
import BookingConfirmPage from "../pages/BookingConfirmPage/BookingConfirmPage";
import PrivateRoutes from "./PrivateRoutes";
import PaymentDetailsPage from "../pages/PaymentDetailsPage/PaymentDetailsPage";
import AdminPage from "../pages/AdminPage/AdminPage";
import PrivacyTermsPage from "../pages/PrivacyTermsPage/PrivacyTermsPage";
import BecomeHostPage from "../pages/BecomeHostPage/BecomeHostPage";
import SocketPage from "../pages/SocketPage/SocketPage";
import AdminEditUserPage from "../pages/AdminEditUserPage/AdminEditUserPage";

const AppRoutes = () => {
    const [filterData, setFilterData] = useState({
        skip: 0,
        mapXBounds: [40, 41],
        mapYBounds: [-4, -3],
        priceStart: 0,
        priceEnd: 400,
        startDate: new Date(),
        endDate: new Date(),
        name: "",
        solarPower: false,
        shower: false,
        bathroom: false,
    });

    const [bookingData, setBookingData] = useState({
        startDate: new Date(),
        endDate: new Date(),
        price: 0,
        bookedVan: "",
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
            <Route path="/results" element={<ResultsPage setFilterInfo={setFilterInfo} filterData={filterData} />} />
            <Route path="/become-host" element={<BecomeHostPage />} />
            <Route path="/:van_id/details" element={<VanDetails setBookingInfo={setBookingInfo} />} />
            <Route path="/:van_id/edit" element={<EditVanPage />} />
            <Route path="/booking" element={<BookingConfirmPage {...bookingData} />} />

            <Route path="/admin" element={<PrivateRoutes requiredRole={"ADMIN"} />}>
                <Route path="" element={<AdminPage />} />
            </Route>
            {/* <Route path="/admin" element={<AdminPage />} /> */}
            {/* <Route path="/paydetails" element={<PaymentDetailsPage {...bookingData} />} /> */}
            <Route path="/paydetails" element={<PrivateRoutes requiredRole={"USER"} />}>
                <Route path="" element={<PaymentDetailsPage {...bookingData} />} />
            </Route>


            <Route path="/privacyterms" element={<PrivacyTermsPage />} />
            <Route path="/chat" element={<SocketPage />} />


            <Route path="/profile" element={<PrivateRoutes requiredRole={"USER"} />}>
                <Route path="" element={<ProfilePage />} />
            </Route>
            <Route path="/newvan" element={<PrivateRoutes requiredRole={"USER"} />}>
                <Route path="" element={<NewVanPage />} />
            </Route>
            <Route path="/*" element={<ErrorPage />} />
        </Routes>
    );
};

export default AppRoutes;
