import React, { useContext, useState } from "react";
import { Button, Modal } from "react-bootstrap";
import DashboardAPI from "../api/DashboardAPI";
import TodoContext from "../context/TodoContext";

const EditTodo = ({ todo }) => {
  const [show, setShow] = useState(false);
  const [description, setDescription] = useState(todo.description);
  const { setTodosChange } = useContext(TodoContext);

  const handleClose = () => {
    setShow(false);
    setDescription(todo.description);
  };
  const handleShow = () => setShow(true);

  async function editTodo() {
    try {
      await DashboardAPI.put(
        `/todos/${todo.todo_id}`,
        { description },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      setTodosChange(true);
      handleClose();
    } catch (error) {
      console.log(error.response.data);
    }
  }

  return (
    <>
      <Button variant="warning" onClick={handleShow}>
        Edit
      </Button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Edit Todo</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <input
            type="text"
            className="form-control"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={editTodo}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default EditTodo;
