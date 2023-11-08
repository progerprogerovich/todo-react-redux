import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import Modal from "./Modal";
import "./task.css";
import ModalSubtask from "./ModalSubtask";
import { updateTaskList } from "../store/tasksReducer";
import InputSearch from "./InputSearch";

const Task = () => {
  const [activeModal, setActiveModal] = useState(false);
  const [activeSubTaskModal, setActiveSubTaskModal] = useState(false);
  const [inputSearch, setInputSearch] = useState("");
  const tasks = useSelector((state) => state.tasks.tasks);
  const dispatch = useDispatch();
  const { id } = useParams();
  const handleSearch = (query) => {
    // Обработка поискового запроса
    setInputSearch(query);
  };

  const prioritet = ["Queue", "Development", "Done"];

  const [newSubTask, setNewSubTask] = useState({ title: "", description: "" });
  const [commentsByTask, setCommentsByTask] = useState({});

  const handleCommentChange = (event, taskId) => {
    const updatedComments = { ...commentsByTask };
    updatedComments[taskId] = event.target.value;
    setCommentsByTask(updatedComments);
  };

  const submitComment = (taskId, commentText) => {
    if (commentText.trim() !== "") {
      addComment(commentText, taskId);
      const updatedComments = { ...commentsByTask };
      updatedComments[taskId] = "";
      setCommentsByTask(updatedComments);
    }
  };
  const [currentCard, setCurrentCard] = useState(null);

  const sortCards = (a, b) => {
    if (a.order > b.order) {
      return 1;
    } else {
      return -1;
    }
  };

  function dragStartHandler(e, card) {
    console.log("drag", card);
    setCurrentCard(card);
  }

  function dragEndHandler(e) {}

  function dragOverHandler(e) {
    e.preventDefault();
  }

  function dropHandler(e, card) {
    e.preventDefault();
    if (currentCard) {
      const updatedCardList = tasks.map((c) => {
        if (c.id === card.id) {
          return {
            ...c,
            order: currentCard.order,
            title: currentCard.title,
            description: currentCard.description,
            creationDate: currentCard.creationDate,
            workTime: currentCard.workTime,
            dateTime: currentCard.dateTime,
            subtasks: currentCard.subtasks, // Обновляю subtasks
            comments: currentCard.comments,
          };
        }
        if (c.id === currentCard.id) {
          return {
            ...c,
            order: card.order,
            title: card.title,
            description: card.description,
            creationDate: card.creationDate,
            workTime: card.workTime,
            dateTime: card.dateTime,
            subtasks: card.subtasks,
            comments: card.comments,
          };
        }
        return c;
      });

      dispatch(updateTaskList(updatedCardList));
    }
    setCurrentCard(null);
  }

  const addTask = (newTask) => {
    const task = {
      id: tasks.length + 1,
      order: tasks.length + 2,
      projectID: id,
      subtasks: [], // Инициализирую пустым массивом подзадач
      comments: [],
      ...newTask,
    };

    dispatch({ type: "ADD_TASK", payload: task });
    console.log(task);
    setActiveModal(false);
  };

  const removeTask = (taskId) => {
    dispatch({ type: "REMOVE_TASK", payload: taskId });
  };

  const addSubtask = (newSubTask, taskId) => {
    const subtask = {
      id: tasks.length + 1,
      order: tasks.length + 2,
      ...newSubTask,
    };

    // Нахожу соответствующую задачу и добавляю подзадачу в ее массив subtasks
    const updatedTasks = tasks.map((task) => {
      if (task.id === taskId) {
        return {
          ...task,
          subtasks: [...task.subtasks, subtask],
        };
      }
      return task;
    });

    dispatch(updateTaskList(updatedTasks));
  };

  const removeSubTask = (subtaskId, taskId) => {
    // Нахожу соответствующую задачу и удаляю подзадачу из ее массива subtasks
    const updatedTasks = tasks.map((task) => {
      if (task.id === taskId) {
        return {
          ...task,
          subtasks: task.subtasks.filter((subtask) => subtask.id !== subtaskId),
        };
      }
      return task;
    });
    dispatch(updateTaskList(updatedTasks));
  };

  const addComment = (description, taskId) => {
    const comment = {
      id: tasks.length + 1,
      order: tasks.length + 2,
      description,
      taskId,
    };

    const updatedComments = tasks.map((task) => {
      if (task.id === taskId) {
        return {
          ...task,
          comments: [...task.comments, comment],
        };
      }
      return task;
    });

    dispatch(updateTaskList(updatedComments));
  };

  const removeComment = (commentId, taskId) => {
    const updatedTasks = tasks.map((task) => {
      if (task.id === taskId) {
        return {
          ...task,
          comments: task.comments.filter((comment) => comment.id !== commentId),
        };
      }
      return task;
    });
    dispatch(updateTaskList(updatedTasks));
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

              .sort(sortCards)
              .map((task) => (
                <div
                  onDragStart={(e) => dragStartHandler(e, task)}
                  onDragLeave={(e) => dragEndHandler(e)}
                  onDragEnd={(e) => dragEndHandler(e)}
                  onDragOver={(e) => dragOverHandler(e)}
                  onDrop={(e) => dropHandler(e, task)}
                  draggable={true}
                  key={task.id}
                >
                  <div className="status__item">
                    <h2>{task.title}</h2>
                    <p>{task.description}</p>
                    <p>Дата создания: {task.creationDate}</p>
                    <p>Время в работе: {task.workTime} часа</p>
                    <p>Дата окончания: {task.dateTime}</p>
                    <p>{task.status}</p>
                    <h2>Подзадачи</h2>
                    {task.subtasks.map((subtask) => (
                      <div
                        onDragStart={(e) => dragStartHandler(e, subtask)}
                        onDragLeave={(e) => dragEndHandler(e)}
                        onDragEnd={(e) => dragEndHandler(e)}
                        onDragOver={(e) => dragOverHandler(e)}
                        onDrop={(e) => dropHandler(e, subtask)}
                        key={subtask.id}
                      >
                        <p>{subtask.title}</p>
                        <p>{subtask.description}</p>
                        <button
                          onClick={() => removeSubTask(subtask.id, task.id)}
                        >
                          Удалить подзадачу
                        </button>
                      </div>
                    ))}

                    <button
                      onClick={() => {
                        setNewSubTask({ ...newSubTask, taskId: task.id });
                        setActiveSubTaskModal(true);
                      }}
                    >
                      Добавить подзадачу
                    </button>
                    <h2>Комментарии</h2>
                    <div className="status__button-wrap">
                      <textarea
                        placeholder="Введите комментарий"
                        value={commentsByTask[task.id] || ""}
                        onChange={(event) =>
                          handleCommentChange(event, task.id)
                        }
                      />
                      <button
                        onClick={() =>
                          submitComment(task.id, commentsByTask[task.id])
                        }
                      >
                        Добавить комментарий
                      </button>
                    </div>
                    {task.comments.map((comment) => (
                      <div
                        onDragStart={(e) => dragStartHandler(e, comment)}
                        onDragLeave={(e) => dragEndHandler(e)}
                        onDragEnd={(e) => dragEndHandler(e)}
                        onDragOver={(e) => dragOverHandler(e)}
                        onDrop={(e) => dropHandler(e, comment)}
                        key={comment.id}
                      >
                        <p>{comment.description}</p>
                        <button
                          onClick={() => removeComment(comment.id, task.id)}
                        >
                          Удалить комментарий
                        </button>
                      </div>
                    ))}
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
      <Modal
        activeModal={activeModal}
        setActiveModal={setActiveModal}
        addTask={addTask}
      />
      <ModalSubtask
        activeSubTaskModal={activeSubTaskModal}
        setActiveSubTaskModal={setActiveSubTaskModal}
        addSubtask={addSubtask}
        newSubTask={newSubTask}
      />
    </div>
  );
};

export default Task;
