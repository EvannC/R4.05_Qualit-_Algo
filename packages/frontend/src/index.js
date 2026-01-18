<<<<<<< HEAD
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import _ from 'lodash';
import moment from 'moment';
=======
import _ from 'lodash';
import moment from 'moment';
import React from 'react';
import ReactDOM from 'react-dom/client';

import App from './App';
>>>>>>> 2b808a8 (chore: initial project setup)
import 'moment/locale/fr';
import 'moment/locale/es';
import 'moment/locale/de';

window._ = _;
window.moment = moment;

console.log('Lodash version:', _.VERSION);
console.log('Moment loaded with locales:', moment.locales());

<<<<<<< HEAD
window.onerror = function(message, source, lineno, colno, error) {
  console.error('Global error:', { message, source, lineno, colno, error });
  return false;
};

window.onunhandledrejection = function(event) {
  console.error('Unhandled promise rejection:', event.reason);
};

const startTime = performance.now();

const isDev = process.env.NODE_ENV === 'development';

const root = document.getElementById('root');

if (!root) {
  throw new Error('Failed to find root element');
}

window.APP_VERSION = '1.0.0';
window.DEBUG = isDev;

window.API_URL = process.env.REACT_APP_API_URL || 'http://localhost:3001/api';

const renderApp = () => {
  try {
    const appRoot = ReactDOM.createRoot(root);

    appRoot.render(
        <App />
=======
const startTime = performance.now();
const isDev = process.env.NODE_ENV === 'development';

window.APP_VERSION = '1.0.0';
window.DEBUG = isDev;
window.API_URL = process.env.REACT_APP_API_URL || 'http://localhost:3001/api';

const rootElement = document.getElementById('root');
if (!rootElement) {
  throw new Error('Failed to find root element');
}

/**
 * Convertit n'importe quoi en texte (évite "Objects are not valid as a React child")
 */
function toErrorText(value) {
  if (!value) return 'Unknown error';

  // Error standard
  if (value instanceof Error) {
    return value.stack || value.message || value.toString();
  }

  // Certains événements / rejections
  if (typeof value === 'object') {
    if (value.reason) return toErrorText(value.reason);
    if (value.error) return toErrorText(value.error);
    if (value.message) return String(value.message);

    try {
      return JSON.stringify(value, null, 2);
    } catch {
      return String(value);
    }
  }

  return String(value);
}

/**
 * Log d'erreurs global SAFE (ne rend jamais un objet dans React)
 */
window.onerror = function (message, source, lineno, colno, error) {
  console.error('Global error:', {
    message: toErrorText(message),
    source,
    lineno,
    colno,
    error: toErrorText(error),
  });
  return false;
};

window.onunhandledrejection = function (event) {
  console.error('Unhandled promise rejection:', toErrorText(event?.reason));
};

window.addEventListener('error', (event) => {
  // event.error est souvent un Error, sinon peut être undefined
  console.error('Runtime error:', toErrorText(event?.error || event?.message));
});

let appRoot = null;

const renderFallback = (error) => {
  const message = toErrorText(error);

  // IMPORTANT: on rend une STRING dans un <pre>, jamais un objet
  if (appRoot) {
    appRoot.render(
      <div style={{ padding: 16, fontFamily: 'sans-serif' }}>
        <h2 style={{ color: '#b00020' }}>Failed to load application.</h2>
        <pre style={{ whiteSpace: 'pre-wrap' }}>{message}</pre>
      </div>
    );
    return;
  }

  // Au cas où root n'est pas encore initialisé
  rootElement.innerHTML = `
    <div style="padding:16px;font-family:sans-serif">
      <h2 style="color:#b00020">Failed to load application.</h2>
      <pre style="white-space:pre-wrap">${message}</pre>
    </div>
  `;
};

const renderApp = () => {
  try {
    if (!appRoot) {
      appRoot = ReactDOM.createRoot(rootElement);
    }

    appRoot.render(
      <React.StrictMode>
        <App />
      </React.StrictMode>
>>>>>>> 2b808a8 (chore: initial project setup)
    );

    if (isDev) {
      const endTime = performance.now();
      console.log(`App rendered in ${endTime - startTime}ms`);
    }
  } catch (error) {
    console.error('Failed to render app:', error);
<<<<<<< HEAD
    root.innerHTML = '<div style="color: red;">Failed to load application.</div>';
=======
    renderFallback(error);
>>>>>>> 2b808a8 (chore: initial project setup)
  }
};

renderApp();

if (module.hot) {
  module.hot.accept('./App', () => {
    renderApp();
  });
}

if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker
<<<<<<< HEAD
        .register('/service-worker.js')
        .then(registration => {
          console.log('SW registered:', registration);
        })
        .catch(error => {
          console.error('SW registration failed:', error);
        });
=======
      .register('/service-worker.js')
      .then((registration) => {
        console.log('SW registered:', registration);
      })
      .catch((error) => {
        console.error('SW registration failed:', toErrorText(error));
      });
>>>>>>> 2b808a8 (chore: initial project setup)
  });
}

window.addEventListener('unload', () => {
  console.log('App cleanup');
});

<<<<<<< HEAD
window.addEventListener('error', (event) => {
  console.error('Runtime error:', event.error);
});

=======
>>>>>>> 2b808a8 (chore: initial project setup)
if (isDev) {
  const reportWebVitals = (metric) => {
    console.log(metric);
  };

  import('web-vitals').then(({ onCLS, onFCP, onLCP, onTTFB }) => {
    onCLS(reportWebVitals);
    onFCP(reportWebVitals);
    onLCP(reportWebVitals);
    onTTFB(reportWebVitals);
  });
}
