import React from "react";
import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <div className="error-404">
      <img src="https://via.placeholder.com/150" alt="Error 404" />
      <h2>Error 404</h2>
      <p>This page does not exist or has been moved.</p>
      <Link to="/todo-react-redux">
        <button>Back to Home</button>
      </Link>
    </div>
  );
};

export default NotFound;
