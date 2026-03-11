import "@/App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Toaster } from "./components/ui/sonner";
import { AuthProvider } from "./context/AuthContext";
import ProtectedRoute from "./components/ProtectedRoute";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import Courses from "./pages/Courses";
import CourseDetail from "./pages/CourseDetail";
import Videos from "./pages/Videos";
import Funding from "./pages/Funding";
import Contact from "./pages/Contact";
import RGPD from "./pages/RGPD";
import CGV from "./pages/CGV";
import MentionsLegales from "./pages/MentionsLegales";
import CertificationCheckout from "./pages/CertificationCheckout";
import Indicateurs from "./pages/Indicateurs";
import ProcedureInscription from "./pages/ProcedureInscription";
import AccessibiliteHandicap from "./pages/AccessibiliteHandicap";
import FAQ from "./pages/FAQ";
import PaymentSuccess from "./pages/PaymentSuccess";
import PaymentCancel from "./pages/PaymentCancel";
import About from "./pages/About";
import Auth from "./pages/Auth";
import Dashboard from "./pages/Dashboard";
import ExtremeBootcamp from "./pages/ExtremeBootcamp";
import "./i18n";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <AuthProvider>
          <Navbar />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/courses" element={<Courses />} />
            <Route path="/course/:courseId" element={<CourseDetail />} />
            <Route path="/videos" element={<Videos />} />
            <Route path="/funding" element={<Funding />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/rgpd" element={<RGPD />} />
            <Route path="/cgv" element={<CGV />} />
            <Route path="/mentions-legales" element={<MentionsLegales />} />
            <Route path="/certification" element={<CertificationCheckout />} />
            <Route path="/indicateurs" element={<Indicateurs />} />
            <Route path="/inscription" element={<ProcedureInscription />} />
            <Route path="/accessibilite" element={<AccessibiliteHandicap />} />
            <Route path="/faq" element={<FAQ />} />
            <Route path="/payment/success" element={<PaymentSuccess />} />
            <Route path="/payment/cancel" element={<PaymentCancel />} />
            <Route path="/auth" element={<Auth />} />
            <Route path="/extreme-bootcamp" element={<ExtremeBootcamp />} />
            <Route 
              path="/dashboard" 
              element={
                <ProtectedRoute>
                  <Dashboard />
                </ProtectedRoute>
              } 
            />
          </Routes>
          <Footer />
          <Toaster />
        </AuthProvider>
      </BrowserRouter>
    </div>
  );
}

export default App;
