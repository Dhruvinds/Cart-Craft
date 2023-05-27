import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getUserDetails } from "../Actions/userAction";
import DashboardSidebar from "./DashboardSidebar";

const Dashboard = () => {
  const userdl = useSelector((state) => state.userDetails);
  const { user } = userdl;

  const dispach = useDispatch();

  useEffect(() => {
    if (!user || !user.firstName) {
      dispach(getUserDetails("profile"));
    }
  }, [user]);

  return (
    <>
      <DashboardSidebar>
        <img
          src="./images/Admin.png"
          alt="Admin Dashboard"
          style={{ height: "85vh", width: "100vw" }}
        />
      </DashboardSidebar>
    </>
  );
};

export default Dashboard;
