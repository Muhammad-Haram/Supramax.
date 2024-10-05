import React from "react";
import "./sidebar.css";
import { Link } from "react-router-dom";
import LineStyle from "@mui/icons-material/LineStyle";
import StoreIcon from '@mui/icons-material/Store';
import AddBusinessIcon from '@mui/icons-material/AddBusiness';

export default function Sidebar() {
  return (
    <div className="sidebar">
      <div className="sidebarWrapper">
        <div className="sidebarMenu">
          <h3 className="sidebarTitle">Dashboard</h3>
          <ul className="sidebarList">
            <Link to="/" className="link">
              <li className="sidebarListItem active">
                <LineStyle className="sidebarIcon" />
                Home
              </li>
            </Link>
          </ul>
        </div>
        <div className="sidebarMenu">
          <h3 className="sidebarTitle">Quick Menu</h3>
          <ul className="sidebarList">
            <Link to="/dashboard/newproduct" className="link">
              <li className="sidebarListItem">
                <AddBusinessIcon className="sidebarIcon" />
                Add Products
              </li>
            </Link>

          </ul>
        </div>
        <div className="sidebarMenu">
          <ul className="sidebarList">
          </ul>
        </div>
      </div>
    </div>
  );
}
