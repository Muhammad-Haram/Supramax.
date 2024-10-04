import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Product from "./pages/Product";
import Home from "./pages/Home";
import ProductList from "./pages/ProductList";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard"
import NewProduct from "./pages/NewProduct";
import ProductDashboardList from "./pages/ProductDashboardList";
import UpdateProduct from "./pages/UpdateProduct";


const appRouter = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/dashboard/login",
    element: <Login />,
  },
  {
    path: "/dashboard/register",
    element: <Register />,
  },
  {
    path: "/products/:category",
    element: <ProductList />,
  },
  {
    path: "/product/:id",
    element: <Product />,
  },
  {
    path: "/dashboard",
    element: <Dashboard />,
  },

  {
    path: "/dashboard/newproduct",
    element: <NewProduct />,
  },

  {
    path: "/dashboard/products",
    element: <ProductDashboardList />,
  },

  {
    path: "/dashboard/product/:productId",
    element: <UpdateProduct />,
  },

]);

const App = () => {
  return (
    <>
      <RouterProvider router={appRouter} />
    </>
  );
};

export default App;