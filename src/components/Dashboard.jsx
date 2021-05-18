import React, { useContext, useEffect, useState } from "react";
import { Button } from "react-bootstrap";
import { Redirect } from "react-router";
import { toast } from "react-toastify";
import DashboardAPI from "../api/DashboardAPI";
import TodoContext from "../context/TodoContext";
import UserContext from "../context/UserContext";
import InputTodo from "./InputTodo";
import ListTodo from "./ListTodo";

const Dashboard = () => {
  const { isAuthenticated, setIsAuthenticated } = useContext(UserContext);
  const [name, setName] = useState("");
  const [todos, setTodos] = useState([]);
  const [todosChange, setTodosChange] = useState([]);

  const logout = () => {
    localStorage.removeItem("token");
    setIsAuthenticated(false);
    toast.success("Logged out successfully!");
  };

  useEffect(() => {
    let mounted = true;

    const getName = async () => {
      try {
        const response = await DashboardAPI.get("/", {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });

        if (mounted) {
          setTodos(response.data.todos);
          setName(response.data.userName);
        }
      } catch (error) {
        console.log(error);
      }
    };

    getName();
    setTodosChange(false);
    return () => (mounted = false);
  }, [todosChange]);

  return (
    <>
      {isAuthenticated ? null : <Redirect to="/" />}
      <div className="d-flex mt-5 justify-content-around">
        <h2>{name}'s Todo List</h2>
        <Button variant="primary" onClick={logout}>
          Logout
        </Button>
      </div>
      <TodoContext.Provider
        value={{ todos, setTodos, todosChange, setTodosChange }}
      >
        <InputTodo />
        <ListTodo />
      </TodoContext.Provider>
    </>
  );
};

export default Dashboard;
