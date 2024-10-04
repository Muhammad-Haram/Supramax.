import Chart from "../components/chart/Chart";
import FeaturedInfo from "../components/featuredInfo/FeaturedInfo";
import WidgetSm from "../components/widgetSm/WidgetSm";
import WidgetLg from "../components/widgetLg/WidgetLg";
import { useEffect, useMemo, useState } from "react";
import { userRequest } from "../requestMethod";
import Sidebar from "../components/sidebar/Sidebar";
import Topbar from "../components/topbar/Topbar";
import { useNavigate } from "react-router-dom";


export default function Home() {
  const [userStats, setUserStats] = useState([]);
  const MONTHS = useMemo(
    () => [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Agu",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ],
    []
  );
  const navigate = useNavigate();

  const admin = JSON.parse(
    JSON.parse(localStorage.getItem("persist:root")).auth
  ).currentUser?.isAdmin;

  console.log(admin)

  useEffect(() => {
    if (admin) {
      navigate("/dashboard");
    } else {
      navigate("/");
    }
  }, [admin])

  useEffect(() => {
    const getUserStats = async () => {
      try {
        const res = await userRequest.get('/users/stats');
        res.data.map((item) => (
          setUserStats((prev) => [
            ...prev,
            { name: MONTHS[item._id - 1], "Active User": item.total },
          ])
        ))
      } catch (error) {
        console.log(error, "user stats fetched error")
      }
    }
    getUserStats();
  }, [MONTHS]);

  return (
    <>
      <Topbar />
      <div className="container">

        <Sidebar />

        <div className="home">
          <FeaturedInfo />
          <Chart data={userStats} title="User Analytics" grid dataKey="Active User" />
          <div className="homeWidgets">
            <WidgetSm />
            <WidgetLg />
          </div>
        </div>
      </div>
    </>
  );
}
