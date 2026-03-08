import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { useEffect } from "react";
import { HelmetProvider } from "react-helmet-async";
import Index from "./pages/Index";
import Services from "./pages/Services";
import Courses from "./pages/Courses";
import Blog from "./pages/Blog";
import BlogPost from "./pages/BlogPost";
import OracleManagedServices from "./pages/services/OracleManagedServices";
import CloudTransformation from "./pages/services/CloudTransformation";
import DevOpsSRE from "./pages/services/DevOpsSRE";
import AIEnabledOperations from "./pages/services/AIEnabledOperations";
import ProductionSupport from "./pages/services/ProductionSupport";
import Solutions from "./pages/Solutions";
import Industries from "./pages/Industries";
import About from "./pages/About";
import Resources from "./pages/Resources";
import ClientPortal from "./pages/ClientPortal";
import GetStarted from "./pages/GetStarted";
import Contact from "./pages/Contact";
import Leadership from "./pages/Leadership";
import CaseStudies from "./pages/CaseStudies";
import Careers from "./pages/Careers";
import PythonFullStack from "./pages/PythonFullStack";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import Terms from "./pages/Terms";
import Cookies from "./pages/Cookies";
import NotFound from "./pages/NotFound";
import PythonFullStackWidget from "./components/PythonFullStackWidget";

const queryClient = new QueryClient();

const GA4RouteTracker = () => {
  const location = useLocation();
  useEffect(() => {
    const w = window as any;
    if (typeof w.gtag === 'function') {
      w.gtag('config', 'G-18L5003T08', {
        page_path: location.pathname + location.search,
      });
    }
  }, [location]);
  return null;
};

const FloatingWidget = () => {
  const location = useLocation();
  if (location.pathname === "/python-full-stack") return null;
  return <PythonFullStackWidget />;
};

const App = () => (
  <HelmetProvider>
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <GA4RouteTracker />
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/services" element={<Services />} />
            <Route path="/courses" element={<Courses />} />
            <Route path="/blog" element={<Blog />} />
            <Route path="/blog/:slug" element={<BlogPost />} />
            <Route path="/services/oracle-managed-services" element={<OracleManagedServices />} />
            <Route path="/services/cloud-transformation" element={<CloudTransformation />} />
            <Route path="/services/devops-sre" element={<DevOpsSRE />} />
            <Route path="/services/ai-enabled-operations" element={<AIEnabledOperations />} />
            <Route path="/services/production-support" element={<ProductionSupport />} />
            <Route path="/solutions" element={<Solutions />} />
            <Route path="/industries" element={<Industries />} />
            <Route path="/about" element={<About />} />
            <Route path="/resources" element={<Resources />} />
            <Route path="/client-portal" element={<ClientPortal />} />
            <Route path="/get-started" element={<GetStarted />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/leadership" element={<Leadership />} />
            <Route path="/case-studies" element={<CaseStudies />} />
            <Route path="/careers" element={<Careers />} />
            <Route path="/python-full-stack" element={<PythonFullStack />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
          <FloatingWidget />
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  </HelmetProvider>
);

export default App;
