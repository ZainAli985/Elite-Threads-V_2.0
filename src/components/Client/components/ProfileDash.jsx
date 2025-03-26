import React from "react";
import './ProfileDash.css'
import '../../utils/utility.css'

const ProfileDashBoard = () => {
    return (
        <>
            <div className="profile-dash-parent">
                <div className="pfp-txt">
                    <h2 className="g-t w-300">MY PROFILE</h2>
                </div>
                <div className="pfp-info-boxes flex">
                    <div className="pfp-info-box flex g-t">ID:</div>
                    <div className="pfp-info-box flex g-t">USERNAME:</div>
                    <div className="pfp-info-box flex g-t">EMAIL:</div>
                    <div className="pfp-info-box flex g-t">PASSWORD:</div>
                </div>
            </div>
        </>
    )
}

export default ProfileDashBoard;