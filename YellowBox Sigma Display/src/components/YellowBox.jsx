import React from 'react';
import styles from './YellowBox.module.css';

/**
 * Displays 'Hello Sigma' in a styled yellow box.
 */
const YellowBox = () => (
  <div className={styles.yellowBox}>
    Hello Sigma
  </div>
);

export default YellowBox;