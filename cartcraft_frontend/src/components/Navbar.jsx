import React from "react";

const Navbar = () => {
  return (
    <>
      <nav
        className="navbar navbar-expand-lg navbar-light bg-white"
        style={{ justifyContent: "flex-start" }}
      >
        <img
          src="../images/Cartcraft.png"
          alt="Login_Graphics"
          style={{ height: "66px" }}
          className="ps-4"
        />
      </nav>
    </>
  );
};

export default Navbar;
