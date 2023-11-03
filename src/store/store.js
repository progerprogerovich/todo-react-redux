import { createStore } from "redux";
import { combineReducers } from "redux";
import { projectsReducer } from "./projectsReducer";
import { tasksReducer } from "./tasksReducer";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage"; // используется local storage

const rootReducer = combineReducers({
  projects: projectsReducer,
  tasks: tasksReducer,
});

const persistConfig = {
  key: "root",
  storage,
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = createStore(persistedReducer);
export const persistor = persistStore(store);
