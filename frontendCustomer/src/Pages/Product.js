import React from "react";
import axios from "axios";
import { Modal, Button, Form } from "react-bootstrap";
import ProdList from "../Component/product_list";
import Header from '../Component/Header';

export default class Product extends React.Component {

    constructor(){
        super()
        this.state = {
            products: [],
            token: "",
        }
        if (localStorage.getItem("token")) {
            this.state.token = localStorage.getItem("token")
        } else {
            window.location = "/login"
        }
        this.headerConfig.bind(this)
    }

    headerConfig = () => {
        let header = {
            headers: {Authorization : `Bearer ${this.state.token}`}
        }
        return header
    }

    handleClose = () => {
        this.setState({
            isModalOpen: false
        });
    }

    getProduct = () => {
        let product = (localStorage.getItem("name"))
        let url = "http://localhost:8080/product"
        axios.get(url, this.headerConfig())
            .then(res => {
                this.setState({
                    products: res.data.product,
                })

            })
            .catch(err => {
                console.log(err.message)
            })
        console.log(product)
    }

    searching = event => {
        if(event.keyCode === 13){
            // 13 adalah kode untuk tombol enter
            let keyword = this.state.keyword.toLowerCase()
            let tempProduct = this.state.products
            let result = tempProduct.filter(item => {
                return item.name.toLowerCase().includes(keyword) 

            })
            this.setState({products: result})
        }
    }

    componentDidMount = () => {//dijalankan setelah constructor untuk emnjalan get admin karena fungsi tersebut tak ada aksi seperti button
        this.getProduct()
    }

    addToCart = (selectedItem) => {
        // membuat sebuah variabel untuk menampung cart sementara
        let tempCart = []
        // cek eksistensi dari data cart pada localStorage
        if(localStorage.getItem("cart") !== null){
            tempCart = JSON.parse(localStorage.getItem("cart"))
            // JSON.parse() digunakan untuk mengonversi dari string -> array object
        }
        // cek data yang dipilih user ke keranjang belanja
        let existItem = tempCart.find(item => item.product_id === selectedItem.product_id)
        if(existItem){
            // jika item yang dipilih ada pada keranjang belanja
            window.alert(`Anda telah memilih ${selectedItem.name}`)
        }else{
            // user diminta memasukkan jumlah item yang dibeli
            let promptJumlah = window.prompt(`Masukkan jumlah ${selectedItem.name} yang beli`,"")
            if(promptJumlah !== null && promptJumlah !== ""){
                // jika user memasukkan jumlah item yg dibeli
                // menambahkan properti "jumlahBeli" pada item yang dipilih
                selectedItem.qty = promptJumlah
                // masukkan item yg dipilih ke dalam cart
                tempCart.push(selectedItem)
                // simpan array tempCart ke localStorage
                localStorage.setItem("cart", JSON.stringify(tempCart))
            }
        }
    }

    render() {
        return (
            <div>
                <Header />
                <div className="container">
                <br></br>
                    <input type="text" className="form-control my-2" placeholder="Pencarian" value={this.state.keyword} onChange={ev => this.setState({keyword: ev.target.value})} onKeyUp={ev => this.searching(ev)}/>
                    <div className="back">
                <div className="container">
                    <div className="row">
                        {this.state.products.map((item, index) => {
                            return (
                                <ProdList key={index}
                                    nameImage={item.image}//nma file ngambil dari database
                                    image={"http://localhost:8080/image/product/" + item.image}//nama file link dari url
                                    name={item.name}
                                    price={item.price}
                                    stock={item.stock}
                                    onCart={() => this.addToCart(item)}
                                />
                            )
                        })}
                    </div>
                </div>
                </div>
                </div>
            </div>
        )
    }

}