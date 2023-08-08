import React from 'react';
import './filter.css';

const CheckboxFilter = ({ title, categories, checkedCategories, onCategoryToggle }) => {
  return (
    <div className="filter-container">
      <h4>{title}</h4>
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
  );
};

export default CheckboxFilter;
