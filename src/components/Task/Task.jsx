// Task.js
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import "./task.css";
import InputSearch from "../InputSearch/InputSearch";
import SubTask from "../Subtask/SubTask";
import { updateTaskList } from "../../store/tasksReducer";
import Comment from "../Comment/Comment";
import ModalTask from "../Modal/ModalTask";

const Task = () => {
  const [activeModal, setActiveModal] = useState(false);
  const [inputSearch, setInputSearch] = useState("");
  const [draggedTask, setDraggedTask] = useState(null);
  const [editTaskTitle, setEditTaskTitle] = useState("");
  const [editTaskDescription, setEditTaskDescription] = useState("");
  const [editTaskId, setEditTaskId] = useState(null);
  const [editTaskMode, setEditTaskMode] = useState(null);

  const tasks = useSelector((state) => state.tasks.tasks);
  const dispatch = useDispatch();
  const { id } = useParams();

  const handleSearch = (query) => {
    setInputSearch(query);
  };

  const prioritet = ["Queue", "Development", "Done"];

  const addTask = (newTask) => {
    const task = {
      id: tasks.length + 1,
      projectID: id,
      subtasks: [],
      comments: [],
      ...newTask,
    };

    dispatch({ type: "ADD_TASK", payload: task });
    setActiveModal(false);
  };

  const removeTask = (taskId) => {
    dispatch({ type: "REMOVE_TASK", payload: taskId });
  };

  const dragOverHandler = (e) => {
    e.preventDefault();
  };

  const dragLeaveHandler = (e) => {
    // Можете добавить необходимую логику
  };

  const dragStartHandler = (e, task) => {
    setDraggedTask(task);
  };

  const dragEndHandler = () => {
    setDraggedTask(null);
  };

  const dropHandler = (e, targetPriority, targetTask) => {
    e.preventDefault();

    if (!draggedTask || draggedTask.subtaskOf) {
      return;
    }

    const updatedTasks = tasks.map((task) => {
      if (task.id === draggedTask.id) {
        return {
          ...task,
          priority: targetPriority,
        };
      }
      if (task.id === targetTask.id) {
        return {
          ...task,
        };
      }
      return task;
    });

    dispatch(updateTaskList(updatedTasks));
    setDraggedTask(null);
  };

  const startEditing = (task, field) => {
    setEditTaskId(task.id);
    setEditTaskTitle(task.title);
    setEditTaskDescription(task.description);
    setEditTaskMode(field);
  };

  const cancelEditing = () => {
    setEditTaskId(null);
    setEditTaskTitle("");
    setEditTaskDescription("");
    setEditTaskMode(null);
  };

  const saveEditing = (taskId) => {
    const updatedTasks = tasks.map((t) => {
      if (t.id === editTaskId) {
        return {
          ...t,
          title: editTaskMode === "title" ? editTaskTitle : t.title,
          description:
            editTaskMode === "description"
              ? editTaskDescription
              : t.description,
        };
      }
      return t;
    });

    dispatch(updateTaskList(updatedTasks));
    cancelEditing();
  };

  return (
    <div>
      <InputSearch onSearch={handleSearch} />
      <button className="button-add__task" onClick={() => setActiveModal(true)}>
        Добавить задачу
      </button>
      <Link to="/">
        <button className="button__back">Назад</button>
      </Link>
      <div className="status__wrap">
        {prioritet.map((priority) => (
          <div key={priority} className="status__container">
            <h2 className="priority">{priority}</h2>
            {tasks
              .filter(
                (task) =>
                  task.projectID === id &&
                  task.priority === priority &&
                  task.title.toLowerCase().includes(inputSearch.toLowerCase())
              )
              .map((task) => (
                <div
                  onDragStart={(e) => dragStartHandler(e, task)}
                  onDragEnd={dragEndHandler}
                  onDragOver={dragOverHandler}
                  onDragLeave={dragLeaveHandler}
                  onDrop={(e) => dropHandler(e, priority, task)}
                  draggable={true}
                  key={task.id}
                  className="task"
                >
                  <div className="status__item">
                    <h2>
                      {editTaskMode === "title" && editTaskId === task.id ? (
                        <div>
                          <input
                            type="text"
                            value={editTaskTitle}
                            onChange={(e) => setEditTaskTitle(e.target.value)}
                          />
                          <button
                            onClick={() => saveEditing(task.id)}
                            title="Сохранить"
                          >
                            Сохранить
                          </button>
                          <button onClick={cancelEditing}>Отмена</button>
                        </div>
                      ) : (
                        <>
                          {task.title}
                          <img
                            src={process.env.PUBLIC_URL + "/pencil.png"}
                            style={{ cursor: "pointer" }}
                            alt="pencil"
                            onClick={() => startEditing(task, "title")}
                          />
                        </>
                      )}
                    </h2>
                    <p>
                      {editTaskMode === "description" &&
                      editTaskId === task.id ? (
                        <textarea
                          value={editTaskDescription}
                          onChange={(e) =>
                            setEditTaskDescription(e.target.value)
                          }
                        />
                      ) : (
                        <>
                          {task.description}
                          <img
                            src={process.env.PUBLIC_URL + "/pencil.png"}
                            style={{ cursor: "pointer" }}
                            alt="pencil"
                            onClick={() => startEditing(task, "description")}
                          />
                        </>
                      )}
                      {editTaskMode === "description" &&
                        editTaskId === task.id && (
                          <>
                            <button onClick={() => saveEditing(task.id)}>
                              Сохранить
                            </button>
                            <button onClick={cancelEditing}>Отмена</button>
                          </>
                        )}
                    </p>
                    <p>Дата создания: {task.creationDate}</p>
                    <p>Время в работе: {task.workTime} часа(ов)</p>
                    <p>Дата окончания: {task.dateTime}</p>
                    <h2>Подзадачи</h2>
                    <div className="subtask__inner">
                      <SubTask
                        tasks={tasks}
                        task={task}
                        dragStartHandler={dragStartHandler}
                        dragEndHandler={dragEndHandler}
                        dragOverHandler={dragOverHandler}
                        dropHandler={dropHandler}
                        dispatch={dispatch}
                        updateTaskList={updateTaskList}
                      />
                    </div>

                    <Comment
                      tasks={tasks}
                      task={task}
                      dragStartHandler={dragStartHandler}
                      dragEndHandler={dragEndHandler}
                      dragOverHandler={dragOverHandler}
                      dropHandler={dropHandler}
                      dispatch={dispatch}
                      updateTaskList={updateTaskList}
                    />
                    <div className="status__button-wrap">
                      <button
                        className="status__remove"
                        onClick={() => removeTask(task.id)}
                      >
                        Удалить
                      </button>
                    </div>
                  </div>
                </div>
              ))}
          </div>
        ))}
      </div>
      <ModalTask
        activeModal={activeModal}
        setActiveModal={setActiveModal}
        addTask={addTask}
      />
    </div>
  );
};

export default Task;
