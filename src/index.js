import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "purecss/build/pure.css";
import "./index.css";

import ProductAdd from "./components/ProductAdd";

import reportWebVitals from "./reportWebVitals";
import ProductList from "./components/ProductList";

const router = createBrowserRouter([
    {
        path: "/",
        element: <ProductList />,
    },
    {
        path: "add-product",
        element: <ProductAdd />,
    },
]);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
    <React.StrictMode>
        <RouterProvider router={router} />
    </React.StrictMode>,
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
