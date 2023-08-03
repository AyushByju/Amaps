// CheckboxFilter.js
import React, { useState } from 'react';
import './filter.css'; // Importing CSS

const CheckboxFilter = ({ categories, checkedCategories, onCategoryToggle }) => {
  const [isOpen, setIsOpen] = useState(false); // Toggle for dropdown menu

  const handleToggle = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="filter-container">
      <button onClick={handleToggle} className="dropdown-btn">
        CFIN_Category {isOpen ? '▲' : '▼'}
      </button>
      {isOpen && (
        <div className="dropdown-menu">
          {categories.map((category, index) => (
            <div key={index} className="filter-item">
              <label className="filter-label">
                <input
                  type="checkbox"
                  checked={checkedCategories.includes(category)}
                  onChange={() => onCategoryToggle(category)}
                  className="filter-checkbox"
                />
                {category}
              </label>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default CheckboxFilter;
