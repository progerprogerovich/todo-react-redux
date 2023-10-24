import { Route, Routes } from "react-router-dom";
import ProjectSelectionPage from "./components/ProjectSelectionPage";
import Task from "./components/Task";

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <Routes>
          <Route
            path="/todo-react-redux/"
            element={<ProjectSelectionPage />}
          ></Route>
          <Route path="/project/:id" element={<Task />}></Route>
        </Routes>
      </header>
    </div>
  );
}

export default App;
