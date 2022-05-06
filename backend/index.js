//import
const express = require('express');
const cors = require('cors');

//implementasi
const app = express();
app.use(cors());

//endpoint nanti ditambahkan di sini
//endpoint admin
const admin = require('./routes/admin');
app.use("/admin", admin)

//endpoint customer
const customer = require('./routes/customer');
app.use("/customer", customer)

//endpoint product
const product = require('./routes/product');
app.use("/product", product)

//endpoint transaksi
const transaksi = require('./routes/transaksi');
app.use("/transaksi", transaksi)

app.use(express.static(__dirname))

//run server
app.listen(8080, () => {
    console.log('server run on port 8080')
})