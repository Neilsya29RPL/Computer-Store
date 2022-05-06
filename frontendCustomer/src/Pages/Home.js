import React from 'react'
import axios from 'axios'
import Header from '../Component/Header';


export default class Home extends React.Component {
    constructor() {
        super()
        this.state = {
            token: "",
            customerName: "",
        }
        // cek di local storage apakah ada token (sudah login) 
        if (localStorage.getItem('token')) {
            this.state.token = localStorage.getItem('token')
        }
        // jika belum login 
        else {
            window.location = '/Login'
        }
    }

    headerConfig = () => {
        let header = {
            headers: {Authorization: `Bearer ${this.state.token}`}
        }
        return header
    }

    // mendapatkan nama customer
    getCustomer = () => {
        let customer = localStorage.getItem('name')
        let url = "http://localhost:8080/customer"

        axios.get(url)
        .then(res => {
            this.setState({
                customerName: customer
            })
        })
        .catch(err => {
            console.log(err.message)
        })
    }

    componentDidMount = () => {
        this.getCustomer()
    }

    render() {
        return (
            <div>
            <Header/>
                <div className="container">
                    <div className='mb-4 mt-4'>
                        <h6>Dashboard Customer</h6>
                    </div>
                    <div className='alert bg-dark text-white text-center mb-4'>
                        <h1 className="text-bold"><i>HY! WELCOME {this.state.customerName.toUpperCase()}</i></h1>
                    </div>
                </div>
                </div>
        )
    }
}