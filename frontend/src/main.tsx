import Home from '@/pages/home/Home';

//import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';

import './index.css';
import Storytelling from './pages/storytelling/Storytelling';

const router = createBrowserRouter([
  {
    // This route now directly renders the HomePage at the root URL
    path: '/',
    element: <Home />,
  },
  {
    // This route directly renders the StorytellingPage at its URL
    path: 'storytelling',
    element: <Storytelling />,
  },
]);

// 3. Render the app using the RouterProvider
createRoot(document.getElementById('root')!).render(
  <RouterProvider router={router} />
);
