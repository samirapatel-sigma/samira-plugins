import React from 'react';
import './HelloSigmaYellowBox.css';

const HelloSigmaYellowBox = () => {
  return (
    <div className="yellow-box" data-sigma-layout="layout-body--eN6VLA1CC">
      hello sigma
    </div>
  );
};

export default HelloSigmaYellowBox;

/* src/components/HelloSigmaYellowBox.css */
.yellow-box {
  background-color: #ffeb3b;
  color: #222;
  padding: 24px 48px;
  border-radius: 12px;
  font-size: 1.5rem;
  font-weight: bold;
  display: inline-block;
  box-shadow: 0 2px 8px rgba(0,0,0,0.07);
}