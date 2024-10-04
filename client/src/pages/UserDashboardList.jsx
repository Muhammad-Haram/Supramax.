import { DataGrid } from '@mui/x-data-grid';
import { Link } from "react-router-dom";
import { useEffect } from "react";
import { useDispatch, useSelector } from 'react-redux'
import DeleteOutline from "@mui/icons-material/DeleteOutline";
import { deleteUsers, getUsers } from "../redux/apiCallsForDashBoard";
import Topbar from '../components/topbar/Topbar';
import Sidebar from '../components/sidebar/Sidebar';

export default function UserDashboardList() {

  const dispatch = useDispatch()
  const users = useSelector((store) => store.user.users);

  const handleDelete = (id) => {
    deleteUsers(id, dispatch);
    getUsers(dispatch);
  };

  useEffect(() => {
    getUsers(dispatch)
  }, [dispatch])

  const columns = [
    { field: "_id", headerName: "ID", width: 200 },

    { field: "username", headerName: "Username", width: 200 },

    { field: "email", headerName: "Email", width: 200 },

    { field: "isAdmin", headerName: "Admin", width: 200 },

    {
      field: "action",
      headerName: "Action",
      width: 150,
      renderCell: (params) => {
        return (
          <>
            <Link to={"/dashboard/user/" + params.row._id}>
              <button className="userListEdit">Edit</button>
            </Link>
            <DeleteOutline
              className="userListDelete"
              onClick={() => handleDelete(params.row._id)}
            />
          </>
        );
      },
    },
  ];

  return (

    <>
      <Topbar />
      <div className="container">

        <Sidebar />

        <div className="userList">
          <DataGrid
            rows={users}
            disableSelectionOnClick
            columns={columns}
            getRowId={(row) => row._id}
            pageSize={8}
            checkboxSelection
          />
        </div>
      </div>
    </>
  );
}
