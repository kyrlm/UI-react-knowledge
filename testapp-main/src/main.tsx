import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./index.css";
import Root from "./routes/root";
import Home from "./pages/home/Home";
import Error from "./pages/error/Error";
import CompanyForm from "./pages/company/CompanyForm";
import EmployeeForm from "./pages/employee/EmployeeForm";
import CompanyTable from "./pages/company/CompanyTable";
import EmployeeTable from "./pages/employee/EmployeeTable";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ProductForm from "./pages/product/ProductForm";
import BonusForm from "./pages/bonus/BonusForm";
import BonusTable from "./pages/bonus/BonusTable";
import ProductTable from "./pages/product/ProductTable";
import EmployeeProductForm from "./pages/employeeProduct/EmployeeProductForm";
import EmployeeProductTable from "./pages/employeeProduct/EmployeeProductTable";
import VacationRequestTable from "./pages/vacationRequest/VacationRequestTable";
import VacationRequestForm from "./pages/vacationRequest/VacationRequestForm";

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <>
        <Root />
        <ToastContainer />
      </>
    ),
    errorElement: <Error />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/company",
        element: <CompanyTable />,
      },
      {
        path: "/company/:id",
        element: <CompanyForm />,
      },
      {
        path: "/company/new",
        element: <CompanyForm />,
      },
      {
        path: "/employee",
        element: <EmployeeTable />,
      },
      {
        path: "/employee/:id",
        element: <EmployeeForm />,
      },
      {
        path: "/employee/new",
        element: <EmployeeForm />,
      },
      {
        path: "/product",
        element: <ProductTable />,
      },
      {
        path: "/product/:id",
        element: <ProductForm />,
      },
      {
        path: "/product/new",
        element: <ProductForm />,
      },
      {
        path: "/bonus",
        element: <BonusTable />,
      },
      {
        path: "/bonus/:id",
        element: <BonusForm />,
      },
      {
        path: "/bonus/new",
        element: <BonusForm />,
      },
      {
        path: "/employeeProduct",
        element: <EmployeeProductTable />,
      },
      {
        path: "/employeeProduct/:id",
        element: <EmployeeProductForm />,
      },
      {
        path: "/employeeProduct/new",
        element: <EmployeeProductForm />,
      },
      {
        path: "/vacationRequest",
        element: <VacationRequestTable />,
      },
      {
        path: "/vacationRequest/:id",
        element: <VacationRequestForm />,
      },
      {
        path: "/vacationRequest/new",
        element: <VacationRequestForm />,
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <>
    <RouterProvider router={router} />
    <ToastContainer />
  </>
);
