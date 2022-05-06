import React from 'react';
import { Routes ,Route } from 'react-router-dom';

import Login from "./Login"
import Product from "./Product"
import Transaction from "./Transaction"
import Home from "./Home"
import Cart from "./Cart"

const Utama = () => (
    <Routes>
        <Route exact path="/" element={<Home/>}/>
        <Route path="/product" element={<Product/>}/>
        <Route path="/cart" element={<Cart/>}/>
        <Route path="/transaction" element={<Transaction/>}/>
        <Route path="/login" element={<Login/>}/>
    </Routes>
)

export default Utama;