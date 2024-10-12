import React from "react";
import "./topbar.css";
import LogoutTwoToneIcon from '@mui/icons-material/LogoutTwoTone';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../../redux/authSlice';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { useNavigate } from "react-router-dom";
import toast, { Toaster } from 'react-hot-toast';



export default function Topbar() {

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(logout());
    navigate("/login");
    toast.success('Logout Successful')
  };

  const username = useSelector((state) => state.auth.currentUser?.username);

  return (
    <div className="topbar">
      <div className="topbarWrapper">
        <div className="topLeft">
          <span className="logo">Supramax Admin</span>
        </div>
        <div className="topRight">

          <div className="usernameDiv">
            <AccountCircleIcon className="icons" />
            <p className="usernamePara">{username}</p>
          </div>

          <div>
            <button className="logoutButton" onClick={handleLogout}>
              <LogoutTwoToneIcon className="icons" />
            </button>
          </div>

        </div>
      </div>
    </div>
  );
}
