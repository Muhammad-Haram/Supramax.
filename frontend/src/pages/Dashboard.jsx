import { useEffect, useMemo, useState } from "react";
// import { userRequest } from "../requestMethod";
import Sidebar from "../components/sidebar/Sidebar";
import Topbar from "../components/topbar/Topbar";
import { useNavigate } from "react-router-dom";
import ProductList from "./ProductList";
import ProductDashboardList from "./ProductDashboardList";


export default function Home() {
  const [userStats, setUserStats] = useState([]);
  const navigate = useNavigate();

  const admin = JSON.parse(
    JSON.parse(localStorage.getItem("persist:root")).auth
  ).currentUser?.isAdmin;

  useEffect(() => {
    if (admin) {
      navigate("/dashboard");
    } else {
      navigate("/");
    }
  }, [admin])

  return (
    <>
      <Topbar />
      <div className="container">

        <Sidebar />

        <div className="home">
          <ProductDashboardList />
        </div>
      </div>
    </>
  );
}
