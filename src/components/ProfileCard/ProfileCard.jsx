import { useContext } from "react";
import { AuthContext } from "../../context/auth.context";
import userService from "../../services/user.service";
import { useEffect, useState } from "react";

const ProfileCard = ({ username, imageUrl }) => {

    return (
        <div>
            <h1>{username}</h1>
            <img src={imageUrl} />
            <hr />
        </div>
    );
};

export default ProfileCard;
