import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { Provider } from "react-redux";
import appStore from "./utils/appStore";

import { AnimatePresence, motion } from "framer-motion";

import Body from "./components/Body";
import Login from "./components/Login";
import Feed from "./components/Feed";
import Profile from "./components/Profile";
import Connections from "./components/Connections";
import Requests from "./components/Requests";
import Premium from "./components/Premium";
import Chat from "./components/Chat";

import NavBar from "./components/home/NavBar";
import Hero from "./components/home/Hero";
import Features from "./components/home/Features";
import HowItWorks from "./components/home/HowItWorks";
import Testimonials from "./components/home/Testimonials";
import CTA from "./components/home/CTA";
import Footer from "./components/home/Footer";

// Home Page Layout
const HomePageLayout = () => (
  <div className="min-h-screen bg-gray-950 text-white">
    <NavBar />
    <main>
      <Hero />
      <Features />
      <HowItWorks />
      <Testimonials />
      <CTA />
    </main>
    <Footer />
  </div>
);

// Reusable layout
const PageWithLayout = ({ children }) => (
  <Body>{children}</Body>
);

// Wrapper for route transitions
const AnimatedRoutes = () => {
  const location = useLocation();

  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        {/* Public Routes */}
        <Route
          path="/"
          element={
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -30 }}
              transition={{ duration: 0.3 }}
            >
              <HomePageLayout />
            </motion.div>
          }
        />
        <Route path="/login" element={<Login />} />

        {/* Protected Routes */}
        <Route
          path="/feed"
          element={
            <PageWithLayout>
              <Feed />
            </PageWithLayout>
          }
        />
        <Route
          path="/profile"
          element={
            <PageWithLayout>
              <Profile />
            </PageWithLayout>
          }
        />
        <Route
          path="/connections"
          element={
            <PageWithLayout>
              <Connections />
            </PageWithLayout>
          }
        />
        <Route
          path="/requests"
          element={
            <PageWithLayout>
              <Requests />
            </PageWithLayout>
          }
        />
        <Route path="/chat/:targetUserId" element={<Chat />} />

        {/* Premium Route with Animation */}
        <Route
          path="/premium"
          element={
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -40 }}
              transition={{ duration: 0.3 }}
            >
              <Premium />
            </motion.div>
          }
        />
      </Routes>
    </AnimatePresence>
  );
};

function App() {
  return (
    <Provider store={appStore}>
      <BrowserRouter>
        <AnimatedRoutes />
      </BrowserRouter>
    </Provider>
  );
}

export default App;
