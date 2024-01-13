import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App.jsx';
import { AuthContextProvider } from './context/AuthContext.jsx';
import { TaskContextProvider } from './context/TaskContext.jsx';
import './index.css';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <AuthContextProvider>
      <TaskContextProvider>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </TaskContextProvider>
    </AuthContextProvider>
  </React.StrictMode>,
);
