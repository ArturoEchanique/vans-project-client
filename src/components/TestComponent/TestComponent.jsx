import { useContext } from "react";
import { AuthContext } from "../../context/auth.context";
import userService from "../../services/user.service";
import { useEffect, useState } from "react";

const TestComponent = () => {

    return (
        <div>
            <h1>i am test component</h1>
        </div>
    );
};

export default TestComponent;
