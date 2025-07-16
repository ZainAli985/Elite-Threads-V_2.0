import React from "react";
import UserSideMenu from "./components/User-side-menu";
import UserProfileNav from "./components/UserProfileNav";
import ProfileDashBoard from "./components/ProfileDash";
import { Route, Routes } from "react-router-dom";
import DeliveredOrders from "./components/DeliveredOrders";
import SettingsUser from "./components/SettingsUser";

function UserProfile() {
    return (
        <>
            <UserProfileNav />
            <UserSideMenu />
            <Routes>
                <Route path="dashboard" element={<ProfileDashBoard />} />
                <Route path="deliveredorders" element={<DeliveredOrders />} />
                <Route path="settingsuser" element={<SettingsUser />} />
                {/* Default Path  */}
                <Route path="*" element={<ProfileDashBoard />} />
            </Routes>
        </>
    )
}

export default UserProfile