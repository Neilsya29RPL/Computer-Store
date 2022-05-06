import React from "react";
import axios from "axios";
import { Modal, Form, Button } from "react-bootstrap";
import Header from '../Component/Header';

export default class Admin extends React.Component {
    constructor() {
        super()
        this.state = {
            token: "",
            admin: [],
            admin_id: "",
            name: "",
            username: "",
            password: "",
            fillPassword: true,
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
            headers: { Authorization: `Bearer ${this.state.token}` }
        }
        return header
    }

    handleClose = () => {
        this.setState({
            isModalOpen: false
        });
    }

    getAdmin = () => {
        let admin = (localStorage.getItem("name"))
        let url = "http://localhost:8080/admin"
        axios.get(url, this.headerConfig())
            .then(res => {
                this.setState({
                    admin: res.data.admin,
                    // custCount: res.data.count
                })

            })
            .catch(err => {
                console.log(err.message)
            })
        console.log(admin)
        // console.log(this.state.custCount)
    }

    handleEdit = item => {
        this.setState({
            isModalOpen: true,
            action: "update",
            admin_id: item.admin_id,
            name: item.name,
            username: item.username,
            password: "",
            fillPassword: false,
        })
    }

    Add = () => {
        this.setState({
            isModalOpen: true,
            action: "insert",
            admin_id: 0,
            name: "",
            username: "",
            password: "",
            fillPassword: true,
        })
    }

    dropAdmin = admin_id => {
        if (window.confirm("are you sure will delete this item?")) {
            let url = "http://localhost:8080/admin/" + admin_id
            axios.delete(url, this.headerConfig())
                .then(response => {
                    window.alert(response.data.message)
                    this.getAdmin()
                })
                .catch(error => console.log(error))
        }
    }



    handleSave = e => {
        e.preventDefault()
        let form = {
            admin_id: this.state.admin_id,
            name: this.state.name,
            username: this.state.username
        }

        if (this.state.fillPassword) {
            form.password = this.state.password
        }
        let url = ""
        if (this.state.action === "insert") {
            url = "http://localhost:8080/admin"
            axios.post(url, form, this.headerConfig())
                .then(response => {
                    window.alert(response.data.message)
                    this.getAdmin()
                    this.handleClose()
                })
                .catch(error => console.log(error))
        } else if (this.state.action === "update") {
            url = "http://localhost:8080/admin/" + this.state.admin_id
            axios.put(url, form, this.headerConfig())
                .then(response => {
                    window.alert(response.data.message)
                    this.getAdmin()
                    this.handleClose()
                })
                .catch(error => console.log(error))
        }
    }


    componentDidMount = () => {//dijalankan setelah constructor untuk emnjalan get admin karena fungsi tersebut tak ada aksi seperti button
        this.getAdmin()
    }

    render() {
        return (
            <div>
                <Header />
                {/* <div className="back"> */}
                <div className="container">
                   <br></br>
                    <table className="table table-bordered">
                        <thead align="center">
                            <tr>
                                <th>No</th>
                                <th>Name</th>
                                <th>Username</th>
                                <th>Option</th>
                            </tr>
                        </thead>
                        <tbody align="center">
                            {this.state.admin.map((item, index) => {
                                return (
                                    <tr key={index}>
                                        <td>{index + 1}</td>
                                        <td>{item.name}</td>
                                        <td>{item.username}</td>
                                        <td>
                                        {/* button untuk mengedit */}
                                        <button className="btn btn-sm btn-primary m-1"  onClick={() => this.handleEdit(item)}>
                                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" class="bi bi-pencil-square" viewBox="0 0 16 16">
                                        <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z"/>
                                        <path fill-rule="evenodd" d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5v11z"/>
                                        </svg>
                                        </button>
                                        {/* button untuk menghapus */}
                                        <button className="btn btn-sm btn-danger m-1"  onClick={() => this.dropAdmin(item.admin_id)}>
                                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" class="bi bi-trash" viewBox="0 0 16 16">
                                        <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6z"/>
                                        <path fill-rule="evenodd" d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z"/>
                                        </svg>
                                        </button>
                                        </td>
                                    </tr>
                                )
                            })}
                        </tbody>
                    </table>
                    <button className="btn btn-success" onClick={() => this.Add()}>
                        Add Admin
                    </button>

                    {/* modal admin  */}
                    <Modal show={this.state.isModalOpen} onHide={this.handleClose}>
                        <Modal.Header closeButton>
                            <Modal.Title>Form Admin</Modal.Title>
                        </Modal.Header>
                        <Form onSubmit={e => this.handleSave(e)}>
                            <Modal.Body>
                                <Form.Group className="mb-3 text-dark bg-transparent" controlId="name">
                                    <Form.Label className="text-black" >Admin Name </Form.Label>
                                    <Form.Control className="text-dark bg-transparent" type="text" name="name" placeholder="Masukkan Nama" value={this.state.name}
                                        onChange={e => this.setState({ name: e.target.value })} required
                                    />
                                </Form.Group>
                                <Form.Group className="mb-3" controlId="username">
                                    <Form.Label className="text-black">Username</Form.Label>
                                    <Form.Control className="text-dark bg-transparent" type="text" name="username" placeholder="Masukkan  Username" value={this.state.username}
                                        onChange={e => this.setState({ username: e.target.value })} required
                                    />
                                </Form.Group>
                                {this.state.action === "update" && this.state.fillPassword === false ? (
                                    <Button className="btn btn-sm btn-secondary mb-1 btn-block"
                                        onClick={() => this.setState({ fillPassword: true })}>
                                        Change Password
                                    </Button>

                                ) : (

                                    <Form.Group className="mb-3" controlId="password">
                                        <Form.Label className="text-black">Password</Form.Label>
                                        <Form.Control className="text-dark bg-transparent" type="password" name="password" placeholder="Masukkan Password" value={this.state.password}
                                            onChange={e => this.setState({ password: e.target.value })}
                                        />
                                    </Form.Group>
                                )}
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
        )
    }
}

