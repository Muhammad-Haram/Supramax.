import React from "react";
import "./topbar.css";
import LogoutTwoToneIcon from '@mui/icons-material/LogoutTwoTone';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../../redux/authSlice';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';

export default function Topbar() {

  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(logout());
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
