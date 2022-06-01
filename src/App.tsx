import React from "react";
import UserAppointment from "./components/user-appointment";
import Doctor from "./components/doctor";
import Header from "./components/header";
import SideBar from "./components/sidebar";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import "./css/App.css";

function App() {
  return (
    <div className="container-fluid">
      <Router>
        <div className="row">
          <div className="col-12">
            <Header />
          </div>
          <div className="col-2 bg-wrap sidebar-bg-wrap-height">
            <SideBar />
          </div>
          <div className="col-10">
            <Routes>
              <Route path="/" element={<UserAppointment />} />
              <Route path="/doctor" element={<Doctor />} />
            </Routes>
          </div>
        </div>
      </Router>
    </div>
  );
}

export default App;
