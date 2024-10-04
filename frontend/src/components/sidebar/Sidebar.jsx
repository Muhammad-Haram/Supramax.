import React from "react";
import "./sidebar.css";
import { Link } from "react-router-dom";
import LineStyle from "@mui/icons-material/LineStyle";
import PermIdentity from "@mui/icons-material/PermIdentity";
import StoreIcon from '@mui/icons-material/Store';
import PersonAddAltIcon from '@mui/icons-material/PersonAddAlt';
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
            {/* <li className="sidebarListItem">
              <Timeline className="sidebarIcon" />
              Analytics
            </li> */}
            {/* <li className="sidebarListItem">
              <TrendingUp className="sidebarIcon" />
              Sales
            </li> */}
          </ul>
        </div>
        <div className="sidebarMenu">
          <h3 className="sidebarTitle">Quick Menu</h3>
          <ul className="sidebarList">
            <Link to="/dashboard/users" className="link">
              <li className="sidebarListItem">
                <PermIdentity className="sidebarIcon" />
                Users
              </li>
            </Link>

            {/* <Link to="/newUser" className="link">
              <li className="sidebarListItem">
                <PersonAddAltIcon className="sidebarIcon" />
                Add Users
              </li>
            </Link> */}

            <Link to="/dashboard/products" className="link">
              <li className="sidebarListItem">
                <StoreIcon className="sidebarIcon" />
                Products
              </li>
            </Link>

            <Link to="/dashboard/newproduct" className="link">
              <li className="sidebarListItem">
                <AddBusinessIcon className="sidebarIcon" />
                Add Products
              </li>
            </Link>

            {/* <li className="sidebarListItem">
              <AttachMoney className="sidebarIcon" />
              Transactions
            </li> */}
            {/* <li className="sidebarListItem">
              <BarChart className="sidebarIcon" />
              Reports
            </li> */}
          </ul>
        </div>
        <div className="sidebarMenu">
          {/* <h3 className="sidebarTitle">Notifications</h3> */}
          <ul className="sidebarList">
            {/* <li className="sidebarListItem">
              <MailOutline className="sidebarIcon" />
              Mail
            </li> */}
            {/* <li className="sidebarListItem">
              <DynamicFeed className="sidebarIcon" />
              Feedback
            </li> */}
            {/* <li className="sidebarListItem">
              <ChatBubbleOutline className="sidebarIcon" />
              Messages
            </li> */}
          </ul>
        </div>
        <div className="sidebarMenu">
          {/* <h3 className="sidebarTitle">Staff</h3> */}
          <ul className="sidebarList">
            {/* <li className="sidebarListItem">
              <WorkOutline className="sidebarIcon" />
              Manage
            </li> */}
            {/* <li className="sidebarListItem">
              <Timeline className="sidebarIcon" />
              Analytics
            </li> */}
            {/* <li className="sidebarListItem">
              <Report className="sidebarIcon" />
              Reports
            </li> */}
          </ul>
        </div>
      </div>
    </div>
  );
}
