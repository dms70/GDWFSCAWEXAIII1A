import React from 'react';
import logo from '../assets/images/logo.svg';
import 'bootstrap/dist/css/bootstrap.min.css';
import {LinkContainer} from 'react-router-bootstrap'
import {Navbar,Nav,NavDropdown} from 'react-bootstrap'

const Header = () => {
  return (

<Navbar bg="light" expand="lg">     
<LinkContainer to="/">
<Navbar.Brand className="d-inline-block p-0" href="/" style={{ width: 80 }}>
  <img src={logo}  alt="logo" className="position-relative img-fluid" />
</Navbar.Brand>
</LinkContainer>
<Navbar.Toggle aria-controls="basic-navbar-nav" />
<Navbar.Collapse id="basic-navbar-nav">
  <Nav className="mr-auto">

      <NavDropdown title="Missions" id="collasible-nav-Missions">
      <LinkContainer to="/GetMissions"><Nav.Link>Get</Nav.Link></LinkContainer>
      </NavDropdown>
  </Nav>
</Navbar.Collapse>
</Navbar>
  )
}
export default Header;



