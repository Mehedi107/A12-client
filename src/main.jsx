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
import ItemDetails from './pages/ProductDetails.jsx';
import PrivateRoute from './routes/PrivateRoute.jsx';
import Dashboard from './pages/dashboard/Dashboard.jsx';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import ProductAll from './pages/ProductAll.jsx';
import MyProfile from './pages/dashboard/MyProfile.jsx';
import AddProduct from './pages/dashboard/AddProduct.jsx';
import MyProduct from './pages/dashboard/MyProduct.jsx';
import UpdateProduct from './pages/dashboard/UpdateProduct.jsx';
import ModeratorRoute from './routes/ModeratorRoute.jsx';
import ProductReview from './pages/dashboard/ProductReview.jsx';
import ReportedContent from './pages/dashboard/ReportedContent.jsx';
import Statistics from './pages/dashboard/Statistics.jsx';
import ManageUser from './pages/dashboard/ManageUser.jsx';
import ManageCoupon from './pages/dashboard/ManageCoupon.jsx';
import AdminRoute from './routes/AdminRoute.jsx';

const queryClient = new QueryClient();

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <HelmetProvider>
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<App />}>
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

              <Route
                path="dashboard"
                element={
                  <PrivateRoute>
                    <Dashboard />
                  </PrivateRoute>
                }
              >
                <Route index path="my-profile" element={<MyProfile />} />
                <Route path="add-product" element={<AddProduct />} />
                <Route path="my-product" element={<MyProduct />} />
                <Route
                  path="product-review"
                  element={
                    <ModeratorRoute>
                      <ProductReview />
                    </ModeratorRoute>
                  }
                />
                <Route
                  path="reported-content"
                  element={
                    <ModeratorRoute>
                      <ReportedContent />
                    </ModeratorRoute>
                  }
                />
                <Route path="update/:id" element={<UpdateProduct />} />
                <Route
                  path="statistics"
                  element={
                    <AdminRoute>
                      <Statistics />
                    </AdminRoute>
                  }
                />
                <Route
                  path="user"
                  element={
                    <AdminRoute>
                      <ManageUser />
                    </AdminRoute>
                  }
                />
                <Route
                  path="coupon"
                  element={
                    <AdminRoute>
                      <ManageCoupon />
                    </AdminRoute>
                  }
                />
              </Route>
              <Route path="*" element={<Error />} />
            </Routes>
            <Toaster />
          </BrowserRouter>
        </HelmetProvider>
      </AuthProvider>
    </QueryClientProvider>
  </StrictMode>
);
