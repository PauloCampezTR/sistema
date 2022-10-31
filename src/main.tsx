import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Register from "./pages/Register/Register";
import Home from "./pages/Home/Home";
import Header from "./components/Header/Header2";
import ListTable from "./pages/RegisterList/RegisterList";
import Footer from "./components/Footer/Footer";
ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <BrowserRouter>
    <Header />
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/cadastro" element={<Register />} />
      <Route path="/lista" element={<ListTable />} />
    </Routes>
    <Footer />
  </BrowserRouter>
);
