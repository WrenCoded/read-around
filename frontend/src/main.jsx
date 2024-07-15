import React from 'react'
import ReactDOM from 'react-dom/client'
// Importing the Bootstrap CSS
import "../scss/custom.scss";
import '../scss/nav-custom.scss'; // Your custom navbar styles
import App from './App.jsx'


ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)
