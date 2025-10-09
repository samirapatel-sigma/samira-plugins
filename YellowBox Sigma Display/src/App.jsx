import React from 'react';
import YellowBox from './components/YellowBox';
import styles from './App.module.css';

/**
 * App component renders the YellowBox inside the designated layout section.
 */
function App() {
  return (
    <div className={styles.layoutBody}>
      <YellowBox />
    </div>
  );
}

export default App;