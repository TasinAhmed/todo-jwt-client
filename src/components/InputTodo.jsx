import React, { useContext, useState } from "react";
import TodoContext from "../context/TodoContext";
import DashboardAPI from "../api/DashboardAPI";

const InputTodo = () => {
  const { setTodosChange } = useContext(TodoContext);
  const [description, setDescription] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await DashboardAPI.post(
        "/todos",
        { description },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      setDescription("");
      setTodosChange(true);
    } catch (error) {
      console.log(error.response.data);
    }
  };

  return (
    <div>
      <h1 className="text-center my-5">Input Todo</h1>
      <form className="d-flex" onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="add todo"
          className="form-control"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        <button className="btn btn-success" type="submit">
          Add
        </button>
      </form>
    </div>
  );
};

export default InputTodo;
