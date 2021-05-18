import React, { useContext } from "react";
import TodoContext from "../context/TodoContext";
import EditTodo from "./EditTodo";
import DashboardAPI from "../api/DashboardAPI";

const ListTodo = () => {
  const { todos, setTodosChange } = useContext(TodoContext);

  const deleteTodo = async (id) => {
    try {
      await DashboardAPI.delete(`/todos/${id}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });

      setTodosChange(true);
    } catch (error) {
      console.log(error.response.data);
    }
  };

  return (
    <div>
      <table className="table mt-5">
        <thead>
          <tr>
            <th>Description</th>
            <th>Edit</th>
            <th>Delete</th>
          </tr>
        </thead>
        <tbody>
          {/* <tr>
            <td>John</td>
            <td>Doe</td>
            <td>john@example.com</td>
          </tr> */}
          {todos.map((x) => (
            <tr key={x.todo_id}>
              <td>{x.description}</td>
              <td>
                <EditTodo todo={x} />
              </td>
              <td>
                <button
                  className="btn btn-danger"
                  onClick={() => deleteTodo(x.todo_id)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ListTodo;
