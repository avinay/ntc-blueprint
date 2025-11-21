import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import Overview from "./pages/Overview";
import Program from "./pages/Program";
import Partnership from "./pages/Partnership";
import Logistics from "./pages/Logistics";
import Registration from "./pages/Registration";
import Resources from "./pages/Resources";
import NotFound from "./pages/NotFound";
import Networking from "./pages/Networking";
import CreateProfile from "./pages/networking/CreateProfile";
import MyProfile from "./pages/networking/MyProfile";
import ScanProfile from "./pages/networking/ScanProfile";
import ContactList from "./pages/networking/ContactList";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/overview" element={<Overview />} />
          <Route path="/program" element={<Program />} />
          <Route path="/partnership" element={<Partnership />} />
          <Route path="/logistics" element={<Logistics />} />
          <Route path="/registration" element={<Registration />} />
          <Route path="/resources" element={<Resources />} />
          <Route path="/networking" element={<Networking />} />
          <Route path="/networking/create-profile" element={<CreateProfile />} />
          <Route path="/networking/my-profile" element={<MyProfile />} />
          <Route path="/networking/scan" element={<ScanProfile />} />
          <Route path="/networking/contacts" element={<ContactList />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
