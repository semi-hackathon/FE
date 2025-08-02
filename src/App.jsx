import LoginLayout from './layout/LoginLayout';
import MainLayout from './layout/MainLayout';
import HomePage from './pages/HomePage';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';

const router = createBrowserRouter([
  {
    element: <MainLayout />,
    children: [{ path: '/', element: <HomePage /> }],
  },
]);
const App = () => {
  return <RouterProvider router={router} />;
};

export default App;
