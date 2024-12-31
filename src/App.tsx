import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Admin from "./pages/Admin.tsx";
import User from "./pages/User.tsx";
import Home from "./pages/Home.tsx";
import { ThemeProvider }  from "./utils/ThemeProvider.tsx";
//import Header from "./components/Header.tsx";

const App: React.FC = () => {
  return (
    <ThemeProvider>
      <Router>
        {/* <Header /> */}
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/admin" element={<Admin />} />
          <Route path="/user" element={<User />} />
        </Routes>
      </Router>
    </ThemeProvider>
  );
};

export default App;
