import React from 'react';

/**
 * Box component that displays children in a styled pink box.
 */
const Box = ({ children }) => {
  return (
    <div className="pink-box">
      {children}
    </div>
  );
};

export default Box;