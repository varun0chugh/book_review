import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import Login from './pages/Login/Login';
import Register from './pages/Register/Register';
import { BookReviewsContextProvider } from './context/Context';
import AddReview from './components/AddReview/AddReview';
import HomePage from './pages/HomePage/HomePage';
import ProfilePage from './components/Profile/ProfilePage';
const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children:[
      {
        path: "/",
        element: <HomePage/>,
      },
      {
        path: "/add-review",
        element: <AddReview />,
      },
      {
        path: "/profile",
        element: <ProfilePage />,

      },
    ]
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/register",
    element: <Register />,
  },
  
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <BookReviewsContextProvider>
    <RouterProvider router={router} />
  </BookReviewsContextProvider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
