import React from 'react';
import ConcentricCircles from '../components/ConcentricCircles';

/**
 * Dummy layout component to simulate 'layout-body-KkOQSqVjFr'.
 * Places the plugin (ConcentricCircles) centered in the page.
 */
export default function LayoutBodyKkOQSqVjFr() {
  return (
    <div className="layout-body-concentric">
      <h1 className="plugin-title">Concentric Circles Plugin Demo</h1>
      <ConcentricCircles size={240} innerRatio={0.5} />
    </div>
  );
}