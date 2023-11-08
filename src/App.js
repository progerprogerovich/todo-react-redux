import { Route, Routes } from "react-router-dom";
import ProjectSelectionPage from "./components/ProjectSelectionPage";
import Task from "./components/Task";
import NotFound from "./components/NotFound";
import { PersistGate } from "redux-persist/integration/react";
import { persistor } from "./store/store";

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <PersistGate loading={null} persistor={persistor}>
          <Routes>
            <Route
              exact
              path="/todo-react-redux"
              element={<ProjectSelectionPage />}
            />
            <Route exact path="/project/:id" element={<Task />} />
            <Route path="/*" element={<NotFound />} />
          </Routes>
        </PersistGate>
      </header>
    </div>
  );
}

export default App;
