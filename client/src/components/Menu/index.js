import React, { Children } from "react";
import API from "../../utils/API";
import { toast } from "react-toastify";
import "./style.css";

export function LogOut() {
  API.logOut()
    .then(res => {
      toast.success("You are successfully logged out");
      window.location.href = "/";
    }).catch(err => {
      toast.error("There is an error. Please contact your administrator");
    })
}

export function AdminMenu(userInfo) {
  let userDetail = userInfo.userInfo
  function logOut(evt) {
    if (evt) {
      evt.preventDefault()
    }
    API.logOut()
      .then(res => {
        toast.success("You are successfully logged out");
        window.location.href = "/";
      }).catch(err => {
        toast.error("There is an error. Please contact your administrator");
      })
  }
  return (
    userDetail.roleId !== 6 ? logOut() :
      <nav className="navbar navbar-expand-lg sticky-top navbar-light bg-light bg-navBar">
        <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse justify-content-center" id="navbarNav">
          <ul className="navbar-nav" id="category-nav">
            <li className="nav-item">
              <a className="nav-link" href="/roles">Departments/Roles</a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="/servicesmenu">Services Menu</a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="/clients">Clients</a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="/users">Users</a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="/profile">Profile</a>
            </li>
            <li className="nav-item">
              {userDetail.userId === null ? '' : <a className="nav-link" href="" onClick={logOut}>Log Out</a>}
            </li>
          </ul>
        </div>
      </nav>
  )
}

export function EmployeeMenu(userId) {
  function logOut(evt) {
    evt.preventDefault()
    API.logOut()
      .then(res => {
        toast.success("You are successfully logged out");
        window.location.href = "/";
      }).catch(err => {
        toast.error("There is an error. Please contact your administrator");
      })
  }

  return (
    <nav className="navbar navbar-expand-lg sticky-top navbar-light bg-light bg-navBar">
      <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
        <span className="navbar-toggler-icon"></span>
      </button>
      <div className="collapse navbar-collapse justify-content-center" id="navbarNav">
        <ul className="navbar-nav" id="category-nav">
          <li className="nav-item">
            <a className="nav-link" href="/servicesmenu">Services Menu</a>
          </li>
          <li className="nav-item">
            <a className="nav-link" href="/clients">Clients</a>
          </li>
          <li className="nav-item">
            <a className="nav-link" href="/profile">Profile</a>
          </li>
          <li className="nav-item">
            {userId === null ? '' : <a className="nav-link" href="" onClick={logOut}>Log Out</a>}
          </li>
        </ul>
      </div>
    </nav>
  )
}

export function CustomerMenu(userId) {
  function logOut(evt) {
    evt.preventDefault()
    API.logOut()
      .then(res => {
        toast.success("You are successfully logged out");
        window.location.href = "/";
      }).catch(err => {
        toast.error("There is an error. Please contact your administrator");
      })
  }

  return (
    <nav className="navbar navbar-expand-lg sticky-top navbar-light bg-light bg-navBar">
      <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
        <span className="navbar-toggler-icon"></span>
      </button>
      <div className="collapse navbar-collapse justify-content-center" id="navbarNav">
        <ul className="navbar-nav" id="category-nav">
          <li className="nav-item">
            <a className="nav-link" href="/service">My Services</a>
          </li>
          <li className="nav-item">
            <a className="nav-link" href="/profile">Profile</a>
          </li>
          <li className="nav-item">
            {userId === null ? '' : <a className="nav-link" href="" onClick={logOut}>Log Out</a>}
          </li>
        </ul>
      </div>
    </nav>
  )
}
