import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Product from "./pages/Product";
import Home from "./pages/Home";
import ProductList from "./pages/ProductList";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import NewProduct from "./pages/NewProduct";
import ProductDashboardList from "./pages/ProductDashboardList";
import UpdateProduct from "./pages/UpdateProduct";
import SearchResults from "./components/SearchResults";
import AboutUs from "./pages/AboutUs";
import ContactUs from "./pages/ContactUs";
import ScrollToTop from "./components/ScrollToTop";
import Application from "./pages/Application";
import Markets from "./pages/Markets";

const appRouter = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/register",
    element: <Register />,
  },
  {
    path: "/aboutus",
    element: <AboutUs />,
  },
  {
    path: "/contactus",
    element: <ContactUs />,
  },
  {
    path: "/products",
    element: <ProductList />,
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
  {
    path: "/search-results",
    element: <SearchResults />,
  },
  {
    path: "/application",
    element: <Application />,
  },
  {
    path: "/market",
    element: <Markets />,
  },
]);

const App = () => {
  return (
    <RouterProvider router={appRouter}>
      <ScrollToTop />
    </RouterProvider>
  );
};

export default App;
