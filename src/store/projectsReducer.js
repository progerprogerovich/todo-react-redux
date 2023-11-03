const projectsState = {
  projects: [],
};

export const projectsReducer = (state = projectsState, action) => {
  switch (action.type) {
    case "ADD_PROJECT":
      return { ...state, projects: [...state.projects, action.payload] };
    case "REMOVE_PROJECT":
      return {
        ...state,
        projects: [
          ...state.projects.filter((project) => project.id !== action.payload),
        ],
      };
    case "EDIT_PROJECT_TITLE":
      return {
        ...state,
        projects: state.projects.map((project) => {
          if (project.id === action.payload.id) {
            return { ...project, title: action.payload.title };
          }
          return project;
        }),
      };
    default:
      return state;
  }
};
