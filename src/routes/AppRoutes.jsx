import SignupPage from "../pages/SingupPage/SingUpPage";
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
import AdminEditUserPage from "../pages/AdminEditUserPage/AdminEditUserPage";

const AppRoutes = () => {
    const [filterData, setFilterData] = useState({
        owner: "",
        mapXBounds: [39, 40],
        mapYBounds: [-3, -2],
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
            <Route path="/admin" element={<AdminPage />} />
            <Route path="/paydetails" element={<PaymentDetailsPage {...bookingData} />} />
            <Route path="/privacyterms" element={<PrivacyTermsPage />} />
            <Route path="/admin/edit-user/:user_id" element={<AdminEditUserPage />} />
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
