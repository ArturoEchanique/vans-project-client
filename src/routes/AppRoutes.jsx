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
import AdminEditUserPage from "../pages/AdminEditUserPage/AdminEditUserPage";
import Map from "../components/geocodeMap/geocodeMap";
import MessagesPage from "../pages/MessagesPage/MessagesPage";

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
<<<<<<< HEAD
=======
            <Route path="/booking" element={<BookingConfirmPage {...bookingData} />} />
            <Route path="/privacyterms" element={<PrivacyTermsPage />} />

            <Route path="/map" element={<Map />} />

>>>>>>> a0bbd07fe82baad424b9dac027ef14038bdd7b95

            <Route path="/booking" element={<PrivateRoutes requiredRoles={["USER", "OWNER"]} />}>
                <Route path="" element={<BookingConfirmPage {...bookingData} />} />
            </Route>

            <Route path="/admin" element={<PrivateRoutes requiredRoles={["ADMIN"]} />}>
                <Route path="" element={<AdminPage />} />
                <Route path="/admin/edit-user/:_id" element={<AdminEditUserPage />} />
            </Route>
<<<<<<< HEAD
=======

>>>>>>> a0bbd07fe82baad424b9dac027ef14038bdd7b95

            <Route path="/paydetails" element={<PrivateRoutes requiredRoles={["USER"]} />}>
                <Route path="" element={<PaymentDetailsPage {...bookingData} />} />
            </Route>

            <Route path="/privacyterms" element={<PrivacyTermsPage />} />

            <Route path="/profile" element={<PrivateRoutes requiredRoles={["USER"]} />}>
                <Route path="" element={<ProfilePage />} />
            </Route>
            <Route path="/profile/messages" element={<PrivateRoutes requiredRoles={["USER"]} />}>
                <Route path="" element={<MessagesPage />} />
            </Route>
            <Route path="/newvan" element={<PrivateRoutes requiredRoles={["USER"]} />}>
                <Route path="" element={<NewVanPage />} />
            </Route>
            <Route path="/*" element={<ErrorPage />} />
        </Routes>
    );
};

export default AppRoutes;
