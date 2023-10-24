import React, { useState } from "react";
import "./modal.css";

const Modal = ({ activeModal, setActiveModal, addTask }) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [creationDate, setCreationDate] = useState("");
  const [dateTime, setDateTime] = useState("");
  const [priority, setPriority] = useState("Queue"); // Значение по умолчанию "Queue"
  const [workTime, setWorkTime] = useState("");
  const [selectedStatus, setSelectedStatus] = useState(""); // Состояние для текущего статуса

  const handleTitleChange = (event) => {
    setTitle(event.target.value);
  };

  const handleDescriptionChange = (event) => {
    setDescription(event.target.value);
  };

  const handleCreationDateChange = (event) => {
    setCreationDate(event.target.value);
  };

  const handleDateTime = (event) => {
    setDateTime(event.target.value);
  };

  const handlePriorityChange = (event) => {
    setPriority(event.target.value);
  };

  const handleStatusChange = (event) => {
    setSelectedStatus(event.target.value);
  };

  const handleWorkTime = (event) => {
    setWorkTime(event.target.value);
  };

  const handleAddTask = (event) => {
    event.preventDefault(); // Предотвращаю перезагрузку страницы

    const newTask = {
      title,
      description,
      creationDate,
      dateTime,
      priority,
      status: selectedStatus,
      workTime,
    };

    addTask(newTask);

    setActiveModal(false);
  };

  return (
    <div
      className={activeModal ? "modal active" : "modal"}
      onClick={() => setActiveModal(false)}
    >
      <div
        className={activeModal ? "modal__content active " : "modal__content"}
        onClick={(event) => event.stopPropagation()}
      >
        <h1>Создать задачу</h1>
        <div className="modal__content_wrap">
          <span>Заголовок</span>
          <input type="text" value={title} onChange={handleTitleChange} />
          <span>Описание</span>
          <input
            type="text"
            value={description}
            onChange={handleDescriptionChange}
          />
          <span>Дата создания</span>
          <input
            type="date"
            value={creationDate}
            onChange={handleCreationDateChange}
          />
          <span>Время в работе (чч:мм)</span>
          <input type="text" value={workTime} onChange={handleWorkTime} />

          <span>Дата окончания</span>
          <input type="date" value={dateTime} onChange={handleDateTime} />
          <span>Приоритет</span>
          <select value={priority} onChange={handlePriorityChange}>
            <option>Queue</option>
            <option>Development</option>
            <option>Done</option>
          </select>

          <span>Текущий статус</span>
          <div className="status__wrapper">
            <label>
              <input
                type="radio"
                name="status"
                value="Выполнено"
                onChange={handleStatusChange}
                checked={selectedStatus === "Выполнено"}
              />
              Выполнено
            </label>
            <label>
              <input
                type="radio"
                name="status"
                value="Не выполнено"
                onChange={handleStatusChange}
                checked={selectedStatus === "Не выполнено"}
              />
              Невыполнено
            </label>
          </div>
          <input type="file" />
        </div>
        <button onClick={handleAddTask}>Добавить</button>
      </div>
    </div>
  );
};

export default Modal;
