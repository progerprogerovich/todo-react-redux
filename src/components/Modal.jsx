import React, { useState } from "react";
import "./modal.css";

const initialTaskState = {
  title: "",
  description: "",
  creationDate: "",
  dateTime: "",
  priority: "Queue",
  workTime: "",
  selectedStatus: "",
};

const Modal = ({ activeModal, setActiveModal, addTask }) => {
  const [task, setTask] = useState(initialTaskState);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setTask({
      ...task,
      [name]: value,
    });
  };

  const handleAddTask = (event) => {
    event.preventDefault();

    const newTask = {
      ...task,
      status: task.selectedStatus,
    };

    if (newTask.title === "") {
      alert("Вы ввели пустой заголовок");
      return;
    }

    if (newTask.creationDate === "") {
      alert("Вы ввели пустую дату создания");
      return;
    }

    if (newTask.workTime === "") {
      alert("Вы ввели пустое время в работе");
      return;
    }

    if (newTask.dateTime === "") {
      alert("Вы ввели пустую дату окончания");
      return;
    }

    if (newTask.selectedStatus === "") {
      alert("Вы не выбрали статус");
      return;
    }

    if (task.creationDate > task.dateTime) {
      alert("Дата создания не может быть больше даты окончания");
      return;
    }

    addTask(newTask);

    setActiveModal(false);
    setTask(initialTaskState);
  };

  return (
    <div
      className={activeModal ? "modal active" : "modal"}
      onClick={() => setActiveModal(false)}
    >
      <form onSubmit={handleAddTask}>
        <div
          className={activeModal ? "modal__content active " : "modal__content"}
          onClick={(event) => event.stopPropagation()}
        >
          <h1>Создать задачу</h1>
          <div className="modal__content_wrap">
            <span>Заголовок</span>
            <input
              type="text"
              name="title"
              value={task.title}
              onChange={handleChange}
            />
            <span>Описание</span>
            <input
              type="text"
              name="description"
              value={task.description}
              onChange={handleChange}
            />
            <span>Дата создания</span>
            <input
              type="date"
              name="creationDate"
              value={task.creationDate}
              onChange={handleChange}
            />
            <span>Время в работе (чч:мм)</span>
            <input
              type="number"
              name="workTime"
              value={task.workTime}
              onChange={handleChange}
            />

            <span>Дата окончания</span>
            <input
              type="date"
              name="dateTime"
              value={task.dateTime}
              onChange={handleChange}
            />
            <span>Приоритет</span>
            <select
              name="priority"
              value={task.priority}
              onChange={handleChange}
            >
              <option>Queue</option>
              <option>Development</option>
              <option>Done</option>
            </select>

            <span>Текущий статус</span>
            <div className="status__wrapper">
              <label>
                <input
                  type="radio"
                  name="selectedStatus"
                  value="Выполнено"
                  onChange={handleChange}
                  checked={task.selectedStatus === "Выполнено"}
                />
                Выполнено
              </label>
              <label>
                <input
                  type="radio"
                  name="selectedStatus"
                  value="Не выполнено"
                  onChange={handleChange}
                  checked={task.selectedStatus === "Не выполнено"}
                />
                Невыполнено
              </label>
            </div>
            <input type="file" />
          </div>
          <button type="submit">Добавить</button>
        </div>
      </form>
    </div>
  );
};

export default Modal;
