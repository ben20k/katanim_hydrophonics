import React from 'react';
import ReactDOM from 'react-dom/client';
import '../node_modules/font-awesome/css/font-awesome.min.css';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from './redux/store';


import { Home, Product, Products, AboutPage, ContactPage, Cart, 
  LoginPage, RegisterPage, Checkout, PageNotFound, ArticlePage,
  NewsAndAnnouncementsPage, ProductListPage } from "./pages"


// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import AddProductPage from './pages/admin/AddProduct';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBv_7sKF9dbUTckV6d0CZ58_A7tWdlFD54",
  authDomain: "katanim-b5372.firebaseapp.com",
  projectId: "katanim-b5372",
  storageBucket: "katanim-b5372.appspot.com",
  messagingSenderId: "352832855628",
  appId: "1:352832855628:web:33c009569e9cca2a981ee9",
  measurementId: "G-LPBS7KJW8J"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <BrowserRouter>
    <Provider store={store}>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/product" element={<Products />} />
        <Route path="/product/:id" element={<Product />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/contact" element={<ContactPage />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/checkout" element={<Checkout />} />
        <Route path="*" element={<PageNotFound />} />
        <Route path="/product/*" element={<PageNotFound />} />
        <Route path="/articles" element={<ArticlePage />} />
        <Route path="/news" element={<NewsAndAnnouncementsPage />} />
        <Route path="/product/new" element={<AddProductPage />} />
        <Route path="/product/list/:status" element={<ProductListPage />} />
      </Routes>
    </Provider>
  </BrowserRouter>
);