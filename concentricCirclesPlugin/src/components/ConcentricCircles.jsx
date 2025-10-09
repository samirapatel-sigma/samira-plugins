import React from 'react';
import PropTypes from 'prop-types';

/**
 * Renders two concentric circles: outer (red), inner (blue).
 * Size and thickness are customizable via props.
 */
export default function ConcentricCircles({
  size = 200,
  innerRatio = 0.5, // Inner circle diameter as ratio of outer
  outerColor = '#e53935',
  innerColor = '#1e88e5',
  style
}) {
  if (
    typeof size !== 'number' ||
    typeof innerRatio !== 'number' ||
    innerRatio <= 0 ||
    innerRatio >= 1
  ) {
    return <div className="concentric-circles-error">Invalid props</div>;
  }
  const innerSize = size * innerRatio;

  return (
    <div
      className="concentric-circles-wrapper"
      style={{
        width: size,
        height: size,
        position: 'relative',
        display: 'inline-block',
        ...style,
      }}
      aria-label="Two concentric circles: outer red, inner blue"
    >
      <div
        className="concentric-circle-outer"
        style={{
          width: size,
          height: size,
          background: outerColor,
          borderRadius: '50%',
          position: 'absolute',
          left: 0,
          top: 0,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      ></div>
      <div
        className="concentric-circle-inner"
        style={{
          width: innerSize,
          height: innerSize,
          background: innerColor,
          borderRadius: '50%',
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
        }}
      ></div>
    </div>
  );
}

ConcentricCircles.propTypes = {
  size: PropTypes.number,
  innerRatio: PropTypes.number,
  outerColor: PropTypes.string,
  innerColor: PropTypes.string,
  style: PropTypes.object,
};