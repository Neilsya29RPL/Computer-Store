import React from "react";
import axios from "axios";
import CustList from "../Component/customer_list";
import { Modal, Button, Form } from "react-bootstrap";
import Header from '../Component/Header';

export default class Customer extends React.Component {
    constructor() {
        super()
        this.state = {
            customers: [],
            customer_id: "",
            name: "",
            phone: "",
            address: "",
            username: "",
            password: "",
            image: null,//karena objek jadi pake null
            isModalOpen: false,
            action: ""

        }
        if (localStorage.getItem("token")) {//pengecekan ada token apa tidak
            //token dibutuhkan setiap saat mau ngakses API, token diambil dari local storage, data login disimpan ke local storage
            this.state.token = localStorage.getItem("token")
        } else {
            window.location = "/Login"
        }
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

    getCustomer = () => {
        let customer = (localStorage.getItem("name"))
        let url = "http://localhost:8080/customer"
        axios.get(url)
            .then(res => {
                this.setState({
                    customers: res.data.customer,
                    // custCount: res.data.count
                })

            })
            .catch(err => {
                console.log(err.message)
            })
        console.log(customer)
        // console.log(this.state.custCount)
    }

    addCust = () => {
        this.setState({
            isModalOpen: true,
            customer_id: "",
            name: "",
            phone: "",
            address: "",
            image: null,
            username: "",
            password: "",
            action: "insert"
        });
    }

    handleEdit = (item) => {
        this.setState({
            isModalOpen: true,
            customer_id: item.customer_id,
            name: item.name,
            phone: item.phone,
            address: item.address,
            image: item.image,
            username: item.username,
            password: item.password,
            action: "update"
        })
    }

    handleSave = (e) => {
        e.preventDefault()
        // console.log("berhasil ")
        let form =  new FormData()//
        form.append("name",this.state.name)
        form.append("phone",this.state.phone)
        form.append("address",this.state.address)
        form.append("image",this.state.image)
        form.append("username",this.state.username)
        form.append("password",this.state.password)
       
        let url = ""
        if (this.state.action === "insert"){
            url = "http://localhost:8080/customer"
            axios.post(url, form)
            .then(res => {
                console.log(res.data.message)
                this.getCustomer()
                this.handleClose()
            })
            .catch(err => {
                console.log(err.message)
            })
            }else if (this.state.action === "update") {
            url = "http://localhost:8080/customer/" + this.state.customer_id
            axios.put(url, form)
            .then(res => {
                console.log(res.data.message)
                this.getCustomer()
                this.handleClose()
            })
            .catch(err => {
                console.log(err.message)
            })
        }
        //panggil api backend
    }
    handleDel = (customer_id) => {
        let url = "http://localhost:8080/customer/" + customer_id
        if (window.confirm("Apakah anda yakin ingin menghapus data ini?")) {
            axios.delete(url)
                .then(res => {
                    console.log(res.data.message)
                    this.getCustomer()
                    // this.handleClose()
                })
                .catch(err => {
                    console.log(err.message)
                })
        }
    }
    componentDidMount = () => {//dijalankan setelah constructor untuk emnjalan get admin karena fungsi tersebut tak ada aksi seperti button
        this.getCustomer()
    }

    render() {
        return (
            <div>
                <Header/>
                <div className="back">
                <div className="container">
                    <button className="btn btn-success" onClick={() => this.addCust()}>
                    Add Customer
                    </button><br />
                    <div className="row">
                        {this.state.customers.map((item, index) => {
                            return (
                                <CustList key={index}
                                    nameImage={item.image}//nma file ngambil dari database
                                    image={"http://localhost:8080/image/customer/" + item.image}//nama file link dari url
                                    name={item.name}
                                    phone={item.phone}
                                    address={item.address}
                                    username= {item.username}
                                    password={item.password}
                                    onEdit={() => this.handleEdit(item)}
                                    onDel={() => this.handleDel(item.customer_id)}

                                />
                            )
                        })}
                    </div>

                    <Modal  show={this.state.isModalOpen} onHide={this.handleClose}>
                        <Modal.Header closeButton>
                            <Modal.Title>Form Customer</Modal.Title>
                        </Modal.Header>
                        <Form onSubmit={e => this.handleSave(e)}>
                            <Modal.Body>
                                <Form.Group className="mb-3 text-dark bg-transparent" controlId="name">
                                    <Form.Label className="text-black" >Customer Name </Form.Label>
                                    <Form.Control className="text-dark bg-transparent" type="text" name="name" placeholder="Masukkan Nama" value={this.state.name} onChange={this.handleChange} />
                                </Form.Group>
                                <Form.Group className="mb-3" controlId="phone">
                                    <Form.Label className="text-black">Phone</Form.Label>
                                    <Form.Control className="text-dark bg-transparent" type="text" name="phone" placeholder="Masukkan Phone Number" value={this.state.phone} onChange={this.handleChange} />
                                </Form.Group>
                                <Form.Group className="mb-3" controlId="address">
                                    <Form.Label className="text-black">Address</Form.Label>
                                    <Form.Control className="text-dark bg-transparent" type="text" name="address" placeholder="Masukkan Alamat" value={this.state.address} onChange={this.handleChange} />
                                </Form.Group>
                                <Form.Group className="mb-3" controlId="image">
                                    <Form.Label className="text-black">Image </Form.Label>
                                    <Form.Control className="text-dark bg-transparent" type="file" name="image" placeholder="Masukkan Foto Customer" value={this.state.Image} onChange={this.handleFile} />
                                </Form.Group>
                                <Form.Group className="mb-3" controlId="username">
                                    <Form.Label className="text-black">Username</Form.Label>
                                    <Form.Control className="text-dark bg-transparent" type="text" name="username" placeholder="Masukkan  Username" value={this.state.username} onChange={this.handleChange} />
                                </Form.Group>
                                <Form.Group className="mb-3" controlId="password">
                                    <Form.Label className="text-black">Password</Form.Label>
                                    <Form.Control className="text-dark bg-transparent" type="password" name="password" placeholder="Masukkan Password" value={this.state.password} onChange={this.handleChange} required/> 
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
        )
    }
}