import React from "react";
import axios from "axios";
import { Modal, Button, Form } from "react-bootstrap";
import ProdList from "../Component/product_list";
import Header from '../Component/Header';

export default class Product extends React.Component {
    constructor() {
        super()
        this.state = {
            products: [],
            product_id: "",
            name: "",
            price: "",
            stock: 0,
            image: null,
            isModalOpen: false,
            action: ""
        }
        if (localStorage.getItem("token")) {//pengecekan ada token apa tidak
            //token dibutuhkan setiap saat mau ngakses API, token diambil dari local storage, data login disimpan ke local storage
            this.state.token = localStorage.getItem("token")
        } else {
            window.location = "/login"
        }
    }

    headerConfig = () => {
        let header = {
            headers: {Authorization : `Bearer ${this.state.token}`}
        }
        return header
    }

    handleChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        });
    }
    handleFile = (e) => {
        this.setState({
            image: e.target.files[0] //up 1 file saja
        });
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
                    // custCount: res.data.count
                })

            })
            .catch(err => {
                console.log(err.message)
            })
        console.log(product)
        // console.log(this.state.custCount)
    }

    addProd = () => {
        this.setState({
            isModalOpen: true,
            product_id: "",
            name: "",
            price: "",
            stock: 0,
            image: null,
            action: "insert"
        });
    }

    handleEdit = (item) => {
        this.setState({
            isModalOpen: true,
            product_id: item.product_id,
            name: item.name,
            price: item.price,
            stock: item.stock,
            image: item.image,
            action: "update"
        })
        
    }

    handleSave = (e) => {
        e.preventDefault()
        // console.log("berhasil ")
        let form =  new FormData()//
        form.append("name",this.state.name)
        form.append("price",this.state.price)
        form.append("stock",this.state.stock)
        form.append("image",this.state.image)
       
        let url = ""
        if (this.state.action === "insert"){
            url = "http://localhost:8080/product"
            axios.post(url, form)
            .then(res => {
                console.log(res.data.message)
                this.getProduct()
                this.handleClose()
            })
            .catch(err => {
                console.log(err.message)
            })
            }else if (this.state.action === "update") {
            url = "http://localhost:8080/product/" + this.state.product_id
            axios.put(url, form)
            .then(res => {
                console.log(res.data.message)
                this.getProduct()
                this.handleClose()
            })
            .catch(err => {
                console.log(err.message)
            })
        }
        //panggil api backend
    }

    handleDel = (product_id) => {
        let url = "http://localhost:8080/product/" + product_id
        if (window.confirm("Apakah anda yakin ingin menghapus data ini?")) {
            axios.delete(url)
                .then(res => {
                    console.log(res.data.message)
                    this.getProduct()
                    // this.handleClose()
                })
                .catch(err => {
                    console.log(err.message)
                })
        }
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
                                    onEdit={() => this.handleEdit(item)}
                                    onDel={() => this.handleDel(item.product_id)}
                                />
                            )
                        })}
                    </div>
                    <button className="btn btn-success" onClick={() => this.addProd()}>
                    Add Product
                    </button><br />

                    <Modal  show={this.state.isModalOpen} onHide={this.handleClose}>
                        <Modal.Header closeButton>
                            <Modal.Title>Form Product</Modal.Title>
                        </Modal.Header>
                        <Form onSubmit={e => this.handleSave(e)}>
                            <Modal.Body>
                                <Form.Group className="mb-3 text-dark bg-transparent" controlId="name">
                                    <Form.Label className="text-black" >Product Name </Form.Label>
                                    <Form.Control className="text-dark bg-transparent" type="text" name="name" placeholder="Masukkan Nama" value={this.state.name} onChange={this.handleChange} />
                                </Form.Group>
                                <Form.Group className="mb-3" controlId="price">
                                    <Form.Label className="text-black">Price</Form.Label>
                                    <Form.Control className="text-dark bg-transparent" type="text" name="price" placeholder="Masukkan Harga" value={this.state.price} onChange={this.handleChange} />
                                </Form.Group>
                                <Form.Group className="mb-3" controlId="stock">
                                    <Form.Label className="text-black">Stock</Form.Label>
                                    <Form.Control className="text-dark bg-transparent" type="text" name="stock" placeholder="Masukkan Stock" value={this.state.stock} onChange={this.handleChange} />
                                </Form.Group>
                                <Form.Group className="mb-3" controlId="image">
                                    <Form.Label className="text-black">Image </Form.Label>
                                    {/* image tidak peru value  */}
                                    <Form.Control className="text-dark bg-transparent" type="file" name="image" placeholder="Masukkan Foto Customer" value={this.state.Image} onChange={this.handleFile} />
                                </Form.Group>
                            </Modal.Body>
                            <Modal.Footer>

                                <Button variant="secondary" onClick={this.handleClose}>
                                    Close
                                </Button>
                                <Button variant="primary" type="submit" onClick={this.handleClose}>
                                    Save
                                </Button>

                            </Modal.Footer>
                        </Form>
                    </Modal>
                </div>
                </div>
                </div>
                </div>
        )
    }

}