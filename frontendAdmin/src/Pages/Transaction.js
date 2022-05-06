import React from 'react'
import Header from '../Component/Header'
import axios from 'axios'
import TransactionList from "../Component/TransactionList";

export default class Transaksi extends React.Component {
    constructor() {
        super()
        this.state = {
            token: "",
            transactions: [],
            selectTransaction: [],
            isModalOpen: false,
            transaksi_id: "",
            customer_id: "",
            customer_name: "",
            time: ""
        }
        if (localStorage.getItem("token")) {//pengecekan ada token apa tidak
            //token dibutuhkan setiap saat mau ngakses API, token diambil dari local storage, data login disimpan ke local storage
            this.state.token = localStorage.getItem("token")
        } else {
            window.location = "/login"
        }
    }

    details = (item) => {
        let date = new Date(item.waktu)
        let tm = `${date.getDate()}/${Number(date.getMonth()) + 1}/${date.getFullYear()}`
        this.setState({
            selectTransaction: item.detail_transaksi,
            isModalOpen: true,
            transaksi_id: item.transaksi_id,
            customer_id: item.customer.customer_id,
            customer_name: item.customer.name,
            time: tm
        })
    }

    convertTime = (time) => {
        let date = new Date(time)
        return `${date.getDate()}/${Number(date.getMonth()) + 1}/${date.getFullYear()}`
    }

    headerConfig = () => {
        let header = {
            headers: { Authorization: `Bearer ${this.state.token}` }
        }
        return header
    }

    handleClose = () => {
        this.setState({
            isModalOpen: false
        });
    }

    getTransaction = () => {
        let url = "http://localhost:8080/transaksi"

        axios.get(url, this.headerConfig())
        
            .then(res => {
                this.setState({
                    transactions: res.data.transaksi,
                    // custCount: res.data.count
                })

            })
            .catch(err => {
                console.log(err.message)
            })
            
    }
    
    componentDidMount() {
        this.getTransaction()
    }

    render() {
        return (
            <div>
                <Header />
                <div className="container">
                    <h3 className="text-bold text-light mt-2">Transactions List</h3>

                    <div className="row">
                        {this.state.transactions.map((item, index) => {
                            return (
                                <TransactionList
                                    key={item.transaksi_id}
                                    transaction_id={item.transaksi_id}
                                    customer_name={item.customer.name}
                                    customer_address={item.customer.address}

                                    time= {this.convertTime(item.waktu)}
                                    products={item.detail_transaksi}
                                />
                            )
                        })}
                    </div>
                </div>
            </div>
        )
    }
}