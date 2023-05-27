import React, { Fragment } from "react";
import Sidebar from "./Sidebar";
import Navbar from "./UserDashboard";
import "../styles/UserDashBoard.css";

const Layout = ({ children }) => {
  return (
    <Fragment>
      <div className="flex-grow">
        <Navbar />

        <div className="mx-4 mt-24 md:mx-12 md:mt-32 lg:mt-24 flex flex-col md:flex-row">
          <Sidebar />
          {/* All Children pass from here */}
          {children}
        </div>
      </div>
    </Fragment>
  );
};

export default Layout;
