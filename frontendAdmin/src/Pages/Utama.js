import React from 'react';
import { Routes ,Route } from 'react-router-dom';

import Login from "./Login"
import Product from "./Product"
import Customer from "./Customer"
import Transaction from "./Transaction"
import Home from "./Home"
import Admin from "./Admin"

const Utama = () => (
    <Routes>
        <Route exact path="/" element={<Home/>}/>
        <Route path="/product" element={<Product/>}/>
        <Route path="/customer" element={<Customer/>}/>
        <Route path="/transaction" element={<Transaction/>}/>
        <Route path="/admin" element={<Admin/>}/>
        <Route path="/login" element={<Login/>}/>
    </Routes>
)

export default Utama;