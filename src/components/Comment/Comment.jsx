// Comment.js
import React, { useState } from "react";

const Comment = ({
  task,
  tasks,
  dragStartHandler,
  dragEndHandler,
  dragOverHandler,
  dropHandler,
  dispatch,
  updateTaskList,
}) => {
  const [commentsByTask, setCommentsByTask] = useState({});
  const [commentIdCounter, setCommentIdCounter] = useState(0);

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

  const addComment = (description, taskId) => {
    const comment = {
      id: commentIdCounter + 1,
      description,
      taskId,
    };

    setCommentIdCounter(commentIdCounter + 1);

    const updatedTasks = tasks.map((task) => {
      if (task.id === taskId) {
        return {
          ...task,
          comments: [...task.comments, comment],
        };
      }
      return task;
    });

    dispatch(updateTaskList(updatedTasks));
  };

  const removeComment = (commentId, taskId) => {
    const updatedComments = tasks.map((task) => {
      if (task.id === taskId) {
        return {
          ...task,
          comments: [
            ...task.comments.filter((comment) => comment.id !== commentId),
          ],
        };
      }
      return task;
    });
    dispatch(updateTaskList(updatedComments));
  };

  return (
    <>
      <h2>Комментарии</h2>
      <div className="status__button-wrap">
        <textarea
          placeholder="Введите комментарий"
          value={commentsByTask[task.id] || ""}
          onChange={(event) => handleCommentChange(event, task.id)}
        />
        <button onClick={() => submitComment(task.id, commentsByTask[task.id])}>
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
          <p>
            {comment.description}
            <img
              src={process.env.PUBLIC_URL + "/musor.png"}
              alt="musor"
              style={{ cursor: "pointer" }}
              onClick={() => removeComment(comment.id, task.id)}
            />
          </p>
        </div>
      ))}
    </>
  );
};

export default Comment;
