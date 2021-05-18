import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Login from "./components/Login";
import Register from "./components/Register";
import Dashboard from "./components/Dashboard";
import UserContext from "./context/UserContext";
import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Landing from "./components/Landing";

toast.configure();

const App = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    async function isAuth() {
      try {
        await axios.get(`${process.env.REACT_APP_API_URL}/auth/verify`, {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        });
        setIsAuthenticated(true);
      } catch (error) {
        console.log(error.response.data);
        localStorage.removeItem("token");
        setIsAuthenticated(false);
      }
    }

    isAuth();
  }, []);

  return (
    <UserContext.Provider value={{ isAuthenticated, setIsAuthenticated }}>
      <div className="container">
        <Router>
          <Switch>
            <Route exact path="/" component={Landing} />
            <Route exact path="/login" component={Login} />
            <Route exact path="/register" component={Register} />
            <Route exact path="/dashboard" component={Dashboard} />
          </Switch>
        </Router>
      </div>
    </UserContext.Provider>
  );
};

export default App;
