import React from 'react';

const FilterGroup = ({ title, children }) => (
  <div className="space-y-4">
    <h3 className="font-semibold text-gray-800 mb-3">{title}</h3>
    {children}
  </div>
);

export default FilterGroup;