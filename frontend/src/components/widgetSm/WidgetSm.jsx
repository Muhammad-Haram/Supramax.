import { useEffect, useState } from "react";
import "./widgetSm.css";
import { userRequest } from "../../requestMethod";
import Visibility from "@mui/icons-material/Visibility";

export default function WidgetSm() {

  const [users, setUsers] = useState([]);

  useEffect(() => {
    const getUsers = async () => {

      try {
        const res = await userRequest.get("users/?new=true")
        setUsers(res.data)
      } catch (error) {
        console.log(error, "data not fetch")
      }

    }

    getUsers();
  })

  return (
    <div className="widgetSm">
      <span className="widgetSmTitle">New Join Members</span>
      <ul className="widgetSmList">

        {users.map((user) => (

          <li className="widgetSmListItem" key={user._id}>
            <div className="widgetSmUser">
              <img
                src="https://images.pexels.com/photos/3992656/pexels-photo-3992656.png?auto=compress&cs=tinysrgb&dpr=2&w=500"
                alt=""
                className="widgetSmImg"
              />
              <span className="widgetSmUsername">{user.username}</span>
            </div>
            <button className="widgetSmButton">
              <Visibility className="widgetSmIcon" />
              Display
            </button>
          </li>

        ))}
      </ul>
    </div>
  );
}
