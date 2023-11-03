const tasksState = {
  tasks: [],
  comments: [],
};

const UPDATE_TASK_LIST = "UPDATE_TASK_LIST";

export const tasksReducer = (state = tasksState, action) => {
  switch (action.type) {
    case "ADD_TASK":
      return { ...state, tasks: [...state.tasks, action.payload] };
    case "REMOVE_TASK":
      return {
        ...state,
        tasks: [...state.tasks.filter((task) => task.id !== action.payload)],
      };
    case UPDATE_TASK_LIST:
      return { ...state, tasks: action.tasks };
    default:
      return state;
  }
};

export const updateTaskList = (tasks) => ({
  type: UPDATE_TASK_LIST,
  tasks,
});
