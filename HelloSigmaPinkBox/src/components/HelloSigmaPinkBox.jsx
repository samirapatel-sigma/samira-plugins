import React from 'react';

/**
 * Simple pink box displaying 'hello sigma'.
 * SUPPORTED: HTML rendering.
 */
function HelloSigmaPinkBox() {
  return (
    <div
      style={{
        background: 'pink',
        color: '#D60087',
        padding: '2rem',
        borderRadius: '1rem',
        textAlign: 'center',
        fontWeight: 'bold',
        fontSize: '1.5rem',
        maxWidth: '300px',
        margin: '2rem auto',
        boxShadow: '0 2px 12px rgba(214,0,135,0.08)'
      }}
      aria-label="hello-sigma-pink-box"
    >
      hello sigma
    </div>
  );
}

export default HelloSigmaPinkBox;