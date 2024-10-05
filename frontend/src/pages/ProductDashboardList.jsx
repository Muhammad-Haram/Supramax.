import { DataGrid } from '@mui/x-data-grid';
import { Link } from "react-router-dom";
import { useEffect } from "react";
import { useDispatch, useSelector } from 'react-redux'
import { deleteProducts, getProducts } from "../redux/apiCallsForDashBoard";
import DeleteOutline from "@mui/icons-material/DeleteOutline";
import Topbar from '../components/topbar/Topbar';
import Sidebar from '../components/sidebar/Sidebar';

export default function ProductDashboardList() {
  const dispatch = useDispatch()
  const products = useSelector((store) => store.product.products)

  const handleDelete = (id) => {
    deleteProducts(id, dispatch);
    getProducts(dispatch);
  };

  useEffect(() => {
    getProducts(dispatch)
  }, [dispatch])

  const columns = [
    { field: "_id", headerName: "ID", width: 200 },
    {
      field: "product",
      headerName: "Product",
      width: 450,
      renderCell: (params) => {
        return (
          <div className="productListItem">
            <img className="productListImg" src={params.row.img} alt="" />
            {params.row.title}
          </div>
        );
      },
    },
    { field: "inStock", headerName: "Stock", width: 100 },
    {
      field: "categories",
      headerName: "Category",
      width: 300,
    },
    {
      field: "action",
      headerName: "Action",
      width: 150,
      renderCell: (params) => {
        return (
          <>
            <Link to={"/dashboard/product/" + params.row._id}>
              <button className="productListEdit">Edit</button>
            </Link>
            <DeleteOutline
              className="productListDelete"
              onClick={() => handleDelete(params.row._id)}
            />
          </>
        );
      },
    },
  ];

  return (

    <>
      <div className="productList">
        <DataGrid
          rows={products}
          disableSelectionOnClick
          columns={columns}
          getRowId={(row) => row._id}
          pageSize={8}
          checkboxSelection
        />
      </div>
    </>
  );
}
