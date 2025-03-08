import React from "react";
import "./App.css";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
} from "react-router-dom";
import CalculatorHome from "./components/Calculator/CalculatorHome.jsx";
import Home from "./components/Homepage";
import Footer from "./components/Footer";
import PageNotFound from "./components/PageNotFound";
import Appraisal from "./components/Appraisal/Appraisal.jsx";
import Video from "./components/Video";
import NavbarMenu from "./components/NavbarMenu";
import ErrorPage from "./components/ErrorPage.jsx";
import { AnimatePresence } from "framer-motion";

function App() {
  const location = useLocation();

  return (
    <>
      <Video />
      <div id="HukuBartopolos">
        <NavbarMenu />
        <AnimatePresence initial={false} mode={"wait"}>
          <Routes location={location} key={location.pathname}>
            <Route path="/" element={<Home />} />
            <Route path="/Calculator" element={<CalculatorHome />} />
            <Route path="/Appraisal" element={<Appraisal />} />
            <Route path="/Appraisal/:uuid" element={<Appraisal />} />
            <Route path="/error" element={<ErrorPage />} />
            <Route path="*" element={<PageNotFound />} />
          </Routes>
        </AnimatePresence>
        <Footer />
      </div>
    </>
  );
}

export default App;
