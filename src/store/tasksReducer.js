const tasksState = {
  tasks: [],
  comments: [],
  subtasks: [],
};

export const tasksReducer = (state = tasksState, action) => {
  switch (action.type) {
    case "ADD_TASK":
      return { ...state, tasks: [...state.tasks, action.payload] };
    case "REMOVE_TASK":
      return {
        ...state,
        tasks: [...state.tasks.filter((task) => task.id !== action.payload)],
      };
    case "ADD_COMMENT":
      return { ...state, comments: [...state.comments, action.payload] };
    case "REMOVE_COMMENT":
      return {};
    case "ADD_SUBTASK":
      return { ...state, subtasks: [...state.subtasks, action.payload] };
    case "REMOVE_SUBTASK":
      return {
        ...state,
        subtasks: [
          ...state.subtasks.filter((subtask) => subtask.id !== action.payload),
        ],
      };
    default:
      return state;
  }
};
