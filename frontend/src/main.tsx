import Home from '@/pages/home/Home';

import { createRoot } from 'react-dom/client';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';

import './index.css';
import Storytelling from './pages/storytelling/Storytelling';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Home />,
  },
  {
    path: 'storytelling',
    element: <Storytelling />,
  },
]);

createRoot(document.getElementById('root')!).render(
  <RouterProvider router={router} />
);
