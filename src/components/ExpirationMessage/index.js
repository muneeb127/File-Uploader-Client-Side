import React from 'react';
import Alert from 'react-bootstrap/Alert';
export const ExpirationMessage = () => {
  return (
    <Alert key="warning" variant="warning">
            Your link has expired. Please generate a new one.
    </Alert>
  )
}
