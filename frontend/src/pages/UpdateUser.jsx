import { Link, useLocation, useNavigate } from "react-router-dom";
import PermIdentity from '@mui/icons-material/PermIdentity';
import MailOutline from '@mui/icons-material/MailOutline';
import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import { updateUsers } from "../redux/apiCallsForDashBoard";
import Topbar from "../components/topbar/Topbar";
import Sidebar from "../components/sidebar/Sidebar";

export default function UpdateUser() {
  const location = useLocation();
  const userId = location.pathname.split("/")[3];
  const userData = useSelector((store) => store.user.users.find((user) => user._id === userId));
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [inputs, setInputs] = useState({
    username: userData.username,
    email: userData.email,
    isAdmin: userData.isAdmin || false,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setInputs((prev) => ({
      ...prev,
      [name]: name === "isAdmin" ? (value === "true") : value,
    }));
  };

  const handleClick = async (e) => {
    e.preventDefault();
    try {
      console.log("Current inputs:", inputs);

      const userUpdate = {
        ...inputs,
        _id: userData._id,
        createdAt: userData.createdAt,
        updatedAt: new Date().toISOString(),
        __v: userData.__v,
      };

      console.log("User update payload:", userUpdate);

      await updateUsers(userId, userUpdate, dispatch);
      navigate("/dashboard/users");
    } catch (error) {
      console.log(error, 'User Update Error');
    }
  };

  return (

    <>
      <Topbar />
      <div className="container">

        <Sidebar />

        <div className="user">
          <div className="userContainer">
            <div className="userShow">
              <div className="userShowBottom">
                <span className="userShowTitle">Account Details</span>
                <div className="userShowInfo">
                  <PermIdentity className="userShowIcon" />
                  <span className="userShowInfoTitle">{userData.username}</span>
                </div>
                <span className="userShowTitle">Contact Details</span>
                <div className="userShowInfo">
                  <MailOutline className="userShowIcon" />
                  <span className="userShowInfoTitle">{userData.email}</span>
                </div>
              </div>
            </div>
            <div className="userUpdate">
              <span className="userUpdateTitle">Edit</span>
              <form className="userUpdateForm">
                <div className="userUpdateLeft">
                  <div className="userUpdateItem">
                    <label>Username</label>
                    <input name="username" type="text" value={inputs.username} onChange={handleChange} />
                  </div>
                  <div className="userUpdateItem">
                    <label>Email</label>
                    <input name="email" type="text" value={inputs.email} onChange={handleChange} />
                  </div>
                  <div className="userUpdateItem">
                    <label>Admin</label>
                    <select name="isAdmin" value={inputs.isAdmin} onChange={handleChange}>
                      <option value="true">Yes</option>
                      <option value="false">No</option>
                    </select>
                  </div>
                </div>
                <div className="userUpdateRight">
                  <button className="userUpdateButton" onClick={handleClick}>Update</button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
