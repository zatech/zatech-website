import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Suspense, lazy } from "react";
import Navbar from "./components/common/Navbar";
import Footer from "./components/common/Footer";
import ErrorBoundary from "./components/common/ErrorBoundary";
import appStyles from "./App.css?inline";

const Home = lazy(() => import("./pages/Home"));
const SponsorshipPage = lazy(() => import("./pages/Sponsorship"));

if (typeof document !== "undefined" && !document.querySelector('style[data-app-styles="true"]')) {
  const styleTag = document.createElement("style");
  styleTag.setAttribute("data-app-styles", "true");
  styleTag.textContent = appStyles;
  document.head.appendChild(styleTag);
}

function App() {

  return (
    <ErrorBoundary>
      <Router>
        <Navbar />
        <Suspense fallback={<div className="section"><div className="container">Loading...</div></div>}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/sponsorship" element={<SponsorshipPage/>} />
          </Routes>
        </Suspense>
        <Footer />
      </Router>
    </ErrorBoundary>
  );
}

export default App;
