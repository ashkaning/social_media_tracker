import React from "react";
import { toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import { AdminMenu, EmployeeMenu, CustomerMenu } from "../../components/Menu";

let userId;
let roleId;
let isUserLoggin
function CheckSecurity(res) {
    isUserLoggin = res.isUserLoggin
    userId = res.userId
    roleId = res.roleId
    if (isUserLoggin === true && userId !== null) {
        return Menu(userId, roleId)
    }
    else if (isUserLoggin === false && userId === null) {
        toast.info("Please Try To Login... !");
        return window.location.href = "/";
    }
    /* else {
        toast.info("mmm... Something is wrong. Please Try To again... !");

    } */
}
function Menu(userId, roleId) {
    let userInfo = {
        userId: userId,
        roleId: roleId
    }
    if (roleId === 6) {
        return <AdminMenu userInfo={userInfo} />
    }
    else if (roleId === 13) {
        return <CustomerMenu userId={userId} />
    }
    else if (roleId >= 1 && roleId <= 5) {
        return <EmployeeMenu userId={userId} />
    }
}
export default CheckSecurity;