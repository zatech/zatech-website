import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Suspense, lazy } from "react";
import Navbar from "./components/common/Navbar";
import Footer from "./components/common/Footer";
import ErrorBoundary from "./components/common/ErrorBoundary";
import appStyles from "./App.css?inline";

// Lazy load page components
const Home = lazy(() => import("./pages/Home"));
const SponsorshipPage = lazy(() => import("./pages/Sponsorship"));
const Privacy = lazy(() => import("./pages/Privacy"));

// Inject app-specific styles into document head
if (typeof document !== "undefined" && !document.querySelector('style[data-app-styles="true"]')) {
  const styleTag = document.createElement("style");
  styleTag.setAttribute("data-app-styles", "true");
  styleTag.textContent = appStyles;
  document.head.appendChild(styleTag);
}

// Main App component with routing and layout
function App() {

  return (
    <ErrorBoundary>
      <Router>
        <div className="app-root">
          <Navbar />
          <main className="app-main">
            <Suspense fallback={<div className="section"><div className="container">Loading...</div></div>}>
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/privacy" element={<Privacy/>} />
                <Route path="/sponsorship" element={<SponsorshipPage/>} />
              </Routes>
            </Suspense>
          </main>
          <Footer />
        </div>
      </Router>
    </ErrorBoundary>
  );
}

export default App;
