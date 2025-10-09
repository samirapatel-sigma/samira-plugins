import React from 'react';
import styles from './ConcentricCircles.module.css';

/**
 * Displays two concentric circles: 
 *  - Outer red circle
 *  - Inner blue circle (centered)
 */
const ConcentricCircles = () => {
  return (
    <div className={styles.outerCircle}>
      <div className={styles.innerCircle}></div>
    </div>
  );
};

export default ConcentricCircles;