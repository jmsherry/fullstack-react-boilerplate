import React from 'react';

const ErrorDisplay = (err) => (
  <p>
    <strong>There was an error: {err.message}</strong>
  </p>
);

export default ErrorDisplay;