import { DataGrid } from '@mui/x-data-grid';
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from 'react-redux'
import { deleteProducts, getProducts } from "../redux/apiCallsForDashBoard";
import DeleteOutline from "@mui/icons-material/DeleteOutline";
import { useNavigate } from "react-router-dom";
import toast from 'react-hot-toast';


export default function ProductDashboardList() {
  const navigate = useNavigate();
  const dispatch = useDispatch()
  const products = useSelector((store) => store.product.products);

  const admin = JSON.parse(
    JSON.parse(localStorage.getItem("persist:root")).auth
  ).currentUser?.isAdmin;

  useEffect(() => {
    if (!admin) {
      navigate("/");
    }
  }, [admin])

  const handleDelete = (id) => {
    console.log(id);
    deleteProducts(id, dispatch).then(() => {
      getProducts(dispatch);
    }).catch(err => {
      console.error("Error deleting product:", err);
      toast.error("Failed to delete product");
    });
  };

  useEffect(() => {
    getProducts(dispatch)
  }, [dispatch])

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      await getProducts(dispatch);
      setLoading(false);
    };

    fetchProducts();
  }, [dispatch]);

  const columns = [
    { field: "_id", headerName: "ID", width: 200 },
    {
      field: "product",
      headerName: "Product",
      width: 400,
      renderCell: (params) => {
        return (
          <div className="productListItem">
            <img className="productListImg" src={params.row.img} alt="" />
            {params.row.title}
          </div>
        );
      },
    },
    { field: "partNumber", headerName: "Part Number", width: 150 },
    {
      field: "type",
      headerName: "Type",
      width: 100,
    },

    {
      field: "unit",
      headerName: "Unit",
      width: 100,
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
    <div className="productList">
      {loading ? (
        <p className="loading">Loading...</p>
      ) : (
        <DataGrid
          rows={products}
          disableSelectionOnClick
          columns={columns}
          getRowId={(row) => row._id}
          pageSize={8}
          checkboxSelection
        />
      )}
    </div>
  );

}
