import React, { useState } from "react";
import "./inputSearch.css";

const InputSearch = ({ onSearch }) => {
  const [searchQuery, setSearchQuery] = useState("");

  const handleInputChange = (e) => {
    const query = e.target.value;
    setSearchQuery(query);
    onSearch(query); // Вызываю функцию обратного вызова, передавая текущий запрос на поиск
  };

  return (
    <input
      className="input__search"
      type="text"
      value={searchQuery}
      onChange={handleInputChange}
      placeholder="Поиск"
    />
  );
};

export default InputSearch;
