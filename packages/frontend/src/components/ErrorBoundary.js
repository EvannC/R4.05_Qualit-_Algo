<<<<<<< HEAD
import React from 'react'

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props)
    this.state = { hasError: false, error: null }
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error }
  }

  componentDidCatch(error, errorInfo) {
    console.log('Error caught:', error, errorInfo)
=======
import PropTypes from 'prop-types';
import React from 'react';

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    console.log('Error caught:', error, errorInfo);
>>>>>>> 2b808a8 (chore: initial project setup)
  }

  render() {
    if (this.state.hasError) {
      return (
<<<<<<< HEAD
        <div style={{
          padding: '20px',
          margin: '20px',
          border: '1px solid #ff0000',
          borderRadius: '4px',
          backgroundColor: '#ffebee'
        }}>
          <h2>Something went wrong!</h2>
          <pre style={{
            whiteSpace: 'pre-wrap',
            color: '#ff0000'
          }}>
=======
        <div
          style={{
            padding: '20px',
            margin: '20px',
            border: '1px solid #ff0000',
            borderRadius: '4px',
            backgroundColor: '#ffebee',
          }}
        >
          <h2>Something went wrong!</h2>
          <pre
            style={{
              whiteSpace: 'pre-wrap',
              color: '#ff0000',
            }}
          >
>>>>>>> 2b808a8 (chore: initial project setup)
            {this.state.error && this.state.error.toString()}
          </pre>
          <button
            onClick={() => window.location.reload()}
            style={{
              padding: '8px 16px',
              backgroundColor: '#f44336',
              color: 'white',
              border: 'none',
              borderRadius: '4px',
<<<<<<< HEAD
              cursor: 'pointer'
            }}
=======
              cursor: 'pointer',
            }}
            type="button"
>>>>>>> 2b808a8 (chore: initial project setup)
          >
            Reload Page
          </button>
        </div>
<<<<<<< HEAD
      )
    }

    return this.props.children
  }
}

=======
      );
    }

    return this.props.children;
  }
}

ErrorBoundary.propTypes = {
  children: PropTypes.node,
};

>>>>>>> 2b808a8 (chore: initial project setup)
export default ErrorBoundary;
