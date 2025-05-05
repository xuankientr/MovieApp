import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
// import App from '@pages/HomePage.jsx';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import HomePage from '@pages/HomePage.jsx';
import MovieDetail from '@pages/MovieDetail.jsx';
import RootLayout from '@pages/RootLayout.jsx';
import TVShowDetail from '@/pages/TVShowDetail';
import ModalProvider from '@/context/ModalProvider';

const router = createBrowserRouter([
  {
    element: <RootLayout />,
    children: [
      {
        path: '/',
        element: <HomePage />,
      },
      {
        path: '/movie/:id',
        element: <MovieDetail />,
      },
      {
        path: '/tv/:id',
        element: <TVShowDetail />,
      },
    ],
  },
]);

createRoot(document.getElementById('root')).render(
  <StrictMode>
    {/* <App /> */}
    <ModalProvider>
      <RouterProvider router={router} />
    </ModalProvider>
  </StrictMode>
);
