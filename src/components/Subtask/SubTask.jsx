import React, { useState } from "react";
import ModalSubtask from "../ModalSubtask/ModalSubtask";
import "./subtask.css";

const SubTask = ({
  tasks,
  task,
  dragStartHandler,
  dragEndHandler,
  dragOverHandler,
  dropHandler,
  dispatch,
  updateTaskList,
}) => {
  const [activeSubTaskModal, setActiveSubTaskModal] = useState(false);
  const [newSubTask, setNewSubTask] = useState({ title: "" });
  const [editTitle, setEditTitle] = useState("");
  const [editSubtaskId, setEditSubtaskId] = useState(null);
  const [editMode, setEditMode] = useState(null);
  const [subTaskIdCounter, setSubTaskIdCounter] = useState(0);

  const removeSubTask = (subtaskId, taskId) => {
    const updatedSubtasks = tasks.map((task) => {
      if (task.id === taskId) {
        return {
          ...task,
          subtasks: [
            ...task.subtasks.filter((subtask) => subtask.id !== subtaskId),
          ],
        };
      }
      return task;
    });
    dispatch(updateTaskList(updatedSubtasks));
  };

  const addSubtask = (newSubTask, taskId) => {
    const subtask = {
      id: subTaskIdCounter + 1,
      isCompleted: false,
      ...newSubTask,
    };

    setSubTaskIdCounter(subTaskIdCounter + 1);

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

  const startEditing = (subtask, field) => {
    setEditSubtaskId(subtask.id);
    setEditTitle(subtask.title);
    setEditMode(field);
  };

  const cancelEditing = () => {
    setEditSubtaskId(null);
    setEditTitle("");
    setEditMode(null);
  };

  const saveEditing = (subtaskId) => {
    const updatedTasks = tasks.map((t) => {
      if (t.id === task.id) {
        return {
          ...t,
          subtasks: t.subtasks.map((subtask) => {
            if (subtask.id === subtaskId) {
              return {
                ...subtask,
                title: editMode === "title" ? editTitle : subtask.title,
              };
            }
            return subtask;
          }),
        };
      }
      return t;
    });

    dispatch(updateTaskList(updatedTasks));
    cancelEditing();
  };

  const handleCircleCheckClick = (subtaskId) => {
    const updatedTasks = tasks.map((t) => {
      if (t.id === task.id) {
        return {
          ...t,
          subtasks: t.subtasks.map((subtask) => {
            if (subtask.id === subtaskId) {
              return {
                ...subtask,
                isCompleted: !subtask.isCompleted,
              };
            }
            return subtask;
          }),
        };
      }
      return t;
    });

    dispatch(updateTaskList(updatedTasks));
  };

  return (
    <>
      {task.subtasks.map((subtask) => (
        <div
          onDragStart={(e) => dragStartHandler(e, subtask)}
          onDragLeave={(e) => dragEndHandler(e)}
          onDragEnd={(e) => dragEndHandler(e)}
          onDragOver={(e) => dragOverHandler(e)}
          onDrop={(e) => dropHandler(e, subtask)}
          key={subtask.id}
        >
          {editSubtaskId === subtask.id ? (
            <div>
              {editMode === "title" && (
                <input
                  type="text"
                  value={editTitle}
                  onChange={(e) => setEditTitle(e.target.value)}
                />
              )}
              <button onClick={() => saveEditing(subtask.id)}>Сохранить</button>
              <button onClick={cancelEditing}>Отмена</button>
            </div>
          ) : (
            <div className="subtask__wrap">
              {subtask.isCompleted ? (
                <img
                  className="subtask__none"
                  src={process.env.PUBLIC_URL + "/circle-check.png"}
                  style={{ cursor: "pointer" }}
                  alt="progress"
                  onClick={() => handleCircleCheckClick(subtask.id)}
                />
              ) : (
                <img
                  className="subtask__done"
                  src={process.env.PUBLIC_URL + "/progress.png"}
                  style={{
                    cursor: "pointer",
                  }}
                  alt="circle-check"
                  onClick={() => handleCircleCheckClick(subtask.id)}
                />
              )}
              <span>{subtask.title}</span>
              <img
                src={process.env.PUBLIC_URL + "/pencil.png"}
                onClick={() => startEditing(subtask, "title")}
                style={{ cursor: "pointer" }}
                alt="pencil"
              />
              <img
                src={process.env.PUBLIC_URL + "/musor.png"}
                alt="musor"
                style={{ cursor: "pointer" }}
                onClick={() => removeSubTask(subtask.id, task.id)}
              />
            </div>
          )}
        </div>
      ))}
      <button
        onClick={() => {
          setNewSubTask({ ...newSubTask, taskId: task.id });
          setActiveSubTaskModal(true);
        }}
        className="subtask__add"
      >
        Добавить подзадачу
      </button>
      <ModalSubtask
        activeSubTaskModal={activeSubTaskModal}
        setActiveSubTaskModal={setActiveSubTaskModal}
        addSubtask={addSubtask}
        newSubTask={newSubTask}
      />
    </>
  );
};

export default SubTask;
