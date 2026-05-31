import React from 'react';
import { createBrowserRouter, RouterProvider, Navigate } from 'react-router-dom';
import BasicLayout from '../components/Layout/BasicLayout';
import Home from '../pages/Home';
import Overview from '../pages/Overview';
import Introduction from '../pages/Introduction';
import Origins from '../pages/Origins';
import Process from '../pages/Process';
import Colors from '../pages/Colors';
import Patterns from '../pages/Patterns';
import ModernInheritance from '../pages/ModernInheritance';
import About from '../pages/About';
import InfoVis from '../pages/InfoVis';
import AdminLogin from '../pages/Admin/Login';
import AdminDashboard from '../pages/Admin/Dashboard';
import { AuthProvider, useAuth } from '../context/AuthContext';
import { ContentProvider } from '../context/ContentContext';

const PrivateRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { isAuthenticated } = useAuth();
  return isAuthenticated ? <>{children}</> : <Navigate to="/litianyu123" replace />;
};

const router = createBrowserRouter([
  {
    path: '/',
    element: <BasicLayout />,
    children: [
      {
        path: '/',
        element: <Home />,
      },
      {
        path: '/overview',
        element: <Overview />,
      },
      {
        path: '/introduction',
        element: <Introduction />,
      },
      {
        path: '/origins',
        element: <Origins />,
      },
      {
        path: '/process',
        element: <Process />,
      },
      {
        path: '/colors',
        element: <Colors />,
      },
      {
        path: '/patterns',
        element: <Patterns />,
      },
      {
        path: '/modern-inheritance',
        element: <ModernInheritance />,
      },
      {
        path: '/infovis',
        element: <InfoVis />,
      },
      {
        path: '/about',
        element: <About />,
      },
    ],
  },
  {
    path: '/litianyu123',
    element: <AdminLogin />
  },
  {
    path: '/admin/dashboard',
    element: (
      <PrivateRoute>
        <AdminDashboard />
      </PrivateRoute>
    )
  }
]);

const AppRouter: React.FC = () => {
  return (
    <AuthProvider>
      <ContentProvider>
        <RouterProvider router={router} />
      </ContentProvider>
    </AuthProvider>
  );
};

export default AppRouter;