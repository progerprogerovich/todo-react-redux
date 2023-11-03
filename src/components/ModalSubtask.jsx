import React, { useState } from "react";
import "./modal.css";

const ModalSubtask = ({
  activeSubTaskModal,
  setActiveSubTaskModal,
  addSubtask,
  newSubTask,
}) => {
  const { taskId } = newSubTask;

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const handleTitleChange = (event) => {
    setTitle(event.target.value);
  };

  const handleDescriptionChange = (event) => {
    setDescription(event.target.value);
  };

  const handleAddSubtask = (event) => {
    event.preventDefault();

    const newSubTask = {
      title,
      description,
    };

    if (newSubTask.title === "" && newSubTask.description === "") {
      alert("Вы ввели пустые значения");
      return;
    }
    if (newSubTask.title === "") {
      alert("Вы ввели пустой заголовок");
      return;
    }
    if (newSubTask.description === "") {
      alert("Вы ввели пустое описание");
      return;
    }

    addSubtask(newSubTask, taskId);

    setActiveSubTaskModal(false);
    setTitle("");
    setDescription("");
  };

  return (
    <div
      className={activeSubTaskModal ? "modal active" : "modal"}
      onClick={() => setActiveSubTaskModal(false)}
    >
      <form onSubmit={handleAddSubtask}>
        <div
          className={
            activeSubTaskModal ? "modal__content active" : "modal__content"
          }
          onClick={(event) => event.stopPropagation()}
        >
          <h1>Добавить подзадачу</h1>
          <div className="modal__content_wrap">
            <span>Заголовок</span>
            <input type="text" value={title} onChange={handleTitleChange} />
            <span>Описание</span>
            <input
              type="text"
              value={description}
              onChange={handleDescriptionChange}
            />
          </div>
          <button type="submit">Добавить подзадачу</button>
        </div>
      </form>
    </div>
  );
};

export default ModalSubtask;
