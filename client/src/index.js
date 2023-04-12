import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import Dashboard from './modules/Dashboard';
import Form from './modules/Form/Index';
import { createBrowserRouter,RouterProvider, Navigate } from 'react-router-dom';

const ProtectedRoute = ({ children ,auth=false}) => {
  const isLoggedIn = localStorage.getItem('user:token')!==null || false;

  if(!isLoggedIn && auth)
  {
    return <Navigate to="/users/sign_in" />
  }
  else if(isLoggedIn &&  ['/users/sign_in','/users/sign_up'].includes(window.location.pathname))
  {
    return <Navigate to="/" />
  }

  return children;
  }

const router = createBrowserRouter([
  {
    path: "/",
    element: <ProtectedRoute auth={true}><Dashboard/></ProtectedRoute>,
  },
  {
    path: "/users/sign_in",
    element: <ProtectedRoute><Form isSignInPage={true} /></ProtectedRoute>,
  },
  {
    path: "/users/sign_up",
    element: <ProtectedRoute><Form isSignInPage={false} /></ProtectedRoute>,
  }
]);


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
