import React from 'react';
import {Link} from 'react-router-dom';
import { Container, Nav, Navbar } from 'react-bootstrap'


class Header extends React.Component {
  Logout = () => {
    localStorage.removeItem("token")
    localStorage.removeItem("admin")
    window.location = "../Login"
  }
  render() {
    return(
      <div>
        <Navbar bg="dark" variant="dark">
            <Container>
              <Navbar.Brand href="#home">Computer store </Navbar.Brand>
              <Nav className="me-auto">
                <Nav.Link href="/">Home</Nav.Link>
                <Nav.Link href="/Product">Product</Nav.Link>
                <Nav.Link href="/Customer">Customers</Nav.Link>
                <Nav.Link href="/Transaction">Transactions</Nav.Link>
                <Nav.Link href="/Admin">Administrator</Nav.Link>
                <Nav.Link onClick={() => this.Logout()}>Logout</Nav.Link>
              </Nav>
            </Container>
        </Navbar> 
        <br></br>
        {/* <p><Utama /></p> */}
      </div>
    );
  }
}

export default Header;
