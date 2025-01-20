import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App.jsx';
import { BrowserRouter, Route, Routes } from 'react-router';
import { HelmetProvider } from 'react-helmet-async';
import Login from './pages/Login.jsx';
import Register from './pages/Register.jsx';
import Error from './pages/Error.jsx';
import Home from './pages/Home.jsx';
import AuthProvider from './provider/AuthProvider.jsx';
import { Toaster } from 'react-hot-toast';
import Items from './pages/Items.jsx';
import ItemDetails from './pages/ProductDetails.jsx';
import PrivateRoute from './routes/PrivateRoute.jsx';
import Dashboard from './pages/Dashboard.jsx';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import ProductAll from './pages/ProductAll.jsx';

const queryClient = new QueryClient();

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <HelmetProvider>
          <BrowserRouter>
            <Routes>
              <Route element={<App />} errorElement={<Error />}>
                <Route index element={<Home />} />
                <Route path="products" element={<ProductAll />} />
                <Route
                  path="product/:id"
                  element={
                    <PrivateRoute>
                      <ItemDetails />
                    </PrivateRoute>
                  }
                />
              </Route>

              <Route path="login" element={<Login />} />
              <Route path="register" element={<Register />} />
              <Route path="dashboard" element={<Dashboard />} />
            </Routes>
            <Toaster />
          </BrowserRouter>
        </HelmetProvider>
      </AuthProvider>
    </QueryClientProvider>
  </StrictMode>
);
