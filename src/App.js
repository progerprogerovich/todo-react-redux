import { Route, Routes } from "react-router-dom";
import NotFound from "./components/NotFound";
import { PersistGate } from "redux-persist/integration/react";
import { persistor } from "./store/store";
import Task from "./components/Task/Task";
import Project from "./components/Project/Project";

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <PersistGate loading={null} persistor={persistor}>
          <Routes>
            <Route exact path="/" element={<Project />} />
            <Route exact path="/project/:id" element={<Task />} />
            <Route path="/*" element={<NotFound />} />
          </Routes>
        </PersistGate>
      </header>
    </div>
  );
}

export default App;
