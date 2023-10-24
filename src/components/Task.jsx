import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import Modal from "./Modal";
import "./task.css";
import ModalSubtask from "./ModalSubtask";

const Task = () => {
  const [activeModal, setActiveModal] = useState(false);
  const [activeSubTaskModal, setActiveSubTaskModal] = useState(false);
  const tasks = useSelector((state) => state.tasks.tasks);
  const comments = useSelector((state) => state.tasks.comments);
  const subtasks = useSelector((state) => state.tasks.subtasks);
  const dispatch = useDispatch();
  const { id } = useParams();
  console.log(id);
  const prioritet = ["Queue", "Development", "Done"];

  const [newSubTask, setNewSubTask] = useState({ title: "", description: "" });
  const [commentsByTask, setCommentsByTask] = useState({}); // Состояние для комментариев по задачам

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

  const addTask = (newTask) => {
    const maxId =
      tasks && tasks.length > 0 ? Math.max(...tasks.map((task) => task.id)) : 0;
    const task = {
      id: maxId + 1,
      projectID: id,
      ...newTask,
    };

    dispatch({ type: "ADD_TASK", payload: task });
    setActiveModal(false);
  };

  const removeTask = (taskId) => {
    dispatch({ type: "REMOVE_TASK", payload: taskId });
  };

  const addSubtask = (newSubTask, taskId) => {
    const maxSubTaskId =
      subtasks && subtasks.length > 0
        ? Math.max(...subtasks.map((subtask) => subtask.id))
        : 0;
    const subtask = {
      id: maxSubTaskId + 1,
      ...newSubTask,
      taskId,
    };
    dispatch({ type: "ADD_SUBTASK", payload: subtask });
  };

  const removeSubTask = (subtaskId) => {
    dispatch({ type: "REMOVE_SUBTASK", payload: subtaskId });
  };

  const addComment = (description, taskId) => {
    const maxCommentId =
      comments && comments.length > 0
        ? Math.max(...comments.map((comment) => comment.id))
        : 0;

    const comment = {
      id: maxCommentId + 1,
      description,
      taskId,
    };
    dispatch({ type: "ADD_COMMENT", payload: comment });
  };

  return (
    <>
      <button className="button-add__task" onClick={() => setActiveModal(true)}>
        Добавить задачу
      </button>
      <div className="status__wrap">
        {prioritet.map((priority) => (
          <div key={priority}>
            <h2 className="priority">{priority}</h2>
            {tasks
              .filter((task) => task.priority === priority)
              .map((task) => (
                <div key={task.id}>
                  <div className="status__item">
                    <h2>{task.title}</h2>
                    <p>{task.description}</p>
                    <p>Дата создания: {task.creationDate}</p>
                    <p>Время в работе: {task.workTime}</p>
                    <p>Дата окончания: {task.dateTime}</p>
                    <p>{task.status}</p>
                    <h2>Подзадачи</h2>
                    {subtasks
                      .filter((subtask) => subtask.taskId === task.id)
                      .map((subtask) => (
                        <div key={subtask.id}>
                          <p>{subtask.title}</p>
                          <p>{subtask.description}</p>
                          <button onClick={() => removeSubTask(subtask.id)}>
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
                    {comments
                      .filter((comment) => comment.taskId === task.id)
                      .map((comment) => (
                        <div key={comment.id}>
                          <p>{comment.description}</p>
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
    </>
  );
};

export default Task;
