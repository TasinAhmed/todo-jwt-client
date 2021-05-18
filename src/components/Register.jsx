import React, { useContext, useState } from "react";
import { Redirect } from "react-router";
import UserContext from "../context/UserContext";
import AuthAPI from "../api/AuthAPI";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";

const Register = () => {
  const { isAuthenticated, setIsAuthenticated } = useContext(UserContext);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const { token } = (
        await AuthAPI.post("/register", { name, email, password })
      ).data;

      localStorage.setItem("token", token);
      setIsAuthenticated(true);
      toast.success("Registration Successful!");
    } catch (error) {
      toast.error(error.response.data);
    }
  };

  return (
    <>
      {isAuthenticated ? <Redirect to="/dashboard" /> : null}
      <h1 className="text-center my-5">Register</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="name"
          placeholder="name"
          className="form-control my-3"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <input
          type="email"
          name="email"
          placeholder="email"
          className="form-control my-3"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          name="password"
          placeholder="password"
          className="form-control my-3"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button className="btn btn-success btn-block" type="submit">
          Submit
        </button>
      </form>
      <Link to="/login">Login</Link>
    </>
  );
};

export default Register;
