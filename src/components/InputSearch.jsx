import React, { useState } from "react";
import "./input.css";

const InputSearch = ({ onSearch }) => {
  const [searchQuery, setSearchQuery] = useState("");

  const handleInputChange = (e) => {
    const query = e.target.value;
    setSearchQuery(query);
    onSearch(query); // Вызываю функцию обратного вызова, передавая текущий запрос на поиск
  };

  return (
    <input
      type="text"
      value={searchQuery}
      onChange={handleInputChange}
      placeholder="Поиск"
    />
  );
};

export default InputSearch;
