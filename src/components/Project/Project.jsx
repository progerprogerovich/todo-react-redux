import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import "./project.css";

const Project = () => {
  const [inputValue, setInputValue] = useState("");
  const [editingProjectId, setEditingProjectId] = useState(null);
  const [editInputValue, setEditInputValue] = useState("");
  const projects = useSelector((state) => state.projects.projects);
  const dispatch = useDispatch();

  const handleInputChange = (event) => {
    setInputValue(event.target.value);
  };

  const handleEditInputChange = (event) => {
    setEditInputValue(event.target.value);
  };

  const handleInputEnterChange = (event) => {
    if (event.key === "Enter") {
      if (editingProjectId) {
        saveEditedProjectTitle(editingProjectId, inputValue);
      } else {
        addProject(inputValue);
      }
    }
  };

  const addProject = (title) => {
    const maxId =
      projects && projects.length > 0
        ? Math.max(...projects.map((project) => project.id))
        : 0;

    const project = {
      id: maxId + 1,
      title,
    };
    if (inputValue === "") {
      alert("Вы ввели пустое значение");
      return;
    }
    dispatch({ type: "ADD_PROJECT", payload: project });
    setInputValue("");
  };

  const removeProject = (id) => {
    dispatch({ type: "REMOVE_PROJECT", payload: id });
  };

  const startEditingProject = (id) => {
    setEditingProjectId(id);
    const projectToEdit = projects.find((project) => project.id === id);
    setEditInputValue(projectToEdit.title);
  };

  const saveEditedProjectTitle = (id, newTitle) => {
    dispatch({ type: "EDIT_PROJECT_TITLE", payload: { id, title: newTitle } });
    setInputValue("");
    setEditingProjectId(null);
  };

  return (
    <div>
      <input
        className="input__addProject"
        type="text"
        value={inputValue}
        onChange={handleInputChange}
        onKeyDown={handleInputEnterChange}
      />
      <button
        onClick={() => {
          if (editingProjectId) {
            saveEditedProjectTitle(editingProjectId, inputValue);
          } else {
            addProject(inputValue);
          }
        }}
      >
        {editingProjectId ? "Сохранить" : "Добавить"}
      </button>
      <ul className="projects">
        {projects.length === 0 ? (
          <>
            <h1 className="no_projects">Проектов нету</h1>
          </>
        ) : (
          projects.map((project) => (
            <li className="project__wrap" key={project.id}>
              <Link
                to={`/project/${project.id}`}
                onClick={(e) => {
                  if (editingProjectId === project.id) {
                    e.preventDefault(); // Предотвращение перехода при редактировании
                  }
                }}
              >
                {editingProjectId === project.id ? (
                  <input
                    type="text"
                    value={editInputValue}
                    onChange={handleEditInputChange}
                    onKeyDown={(e) => {
                      if (e.key === "Enter") {
                        saveEditedProjectTitle(project.id, editInputValue);
                      }
                    }}
                  />
                ) : (
                  <>
                    <p className="project__title">
                      {project.id}.<span>{project.title}</span>
                    </p>
                  </>
                )}
              </Link>
              {editingProjectId === project.id ? (
                <button
                  onClick={() =>
                    saveEditedProjectTitle(project.id, editInputValue)
                  }
                >
                  Сохранить
                </button>
              ) : (
                <div>
                  <button onClick={() => startEditingProject(project.id)}>
                    Редактировать
                  </button>
                  <button onClick={() => removeProject(project.id)}>
                    Удалить
                  </button>
                </div>
              )}
            </li>
          ))
        )}
      </ul>
    </div>
  );
};

export default Project;
