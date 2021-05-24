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
      <LinkContainer to="/NewMissions"><Nav.Link>New</Nav.Link></LinkContainer>
      <LinkContainer to="/GetMissions"><Nav.Link>Get</Nav.Link></LinkContainer>
      <LinkContainer to="/DeleteMissions"><Nav.Link>Delete</Nav.Link></LinkContainer>
      <LinkContainer to="/ModifyMissions"><Nav.Link>Modify</Nav.Link></LinkContainer>
      </NavDropdown>

      <NavDropdown title="Agents" id="collasible-nav-Agents">
      <LinkContainer to="/NewAgents"><Nav.Link>New</Nav.Link></LinkContainer>
      <LinkContainer to="/GetAgents"><Nav.Link>Get</Nav.Link></LinkContainer>
      <LinkContainer to="/DeleteAgents"><Nav.Link>Delete</Nav.Link></LinkContainer>
      <LinkContainer to="/ModifyAgents"><Nav.Link>Modify</Nav.Link></LinkContainer>
      </NavDropdown>

      <NavDropdown title="Targets" id="collasible-nav-Targets">
      <LinkContainer to="/NewTargets"><Nav.Link>New</Nav.Link></LinkContainer>
      <LinkContainer to="/GetTargets"><Nav.Link>Get</Nav.Link></LinkContainer>
      <LinkContainer to="/DeleteTargets"><Nav.Link>Delete</Nav.Link></LinkContainer>
      <LinkContainer to="/ModifyTargets"><Nav.Link>Modify</Nav.Link></LinkContainer>
      </NavDropdown>

      <NavDropdown title="Contacts" id="collasible-nav-Contacts">
      <LinkContainer to="/NewContacts"><Nav.Link>New</Nav.Link></LinkContainer>
      <LinkContainer to="/GetContacts"><Nav.Link>Get</Nav.Link></LinkContainer>
      <LinkContainer to="/DeleteContacts"><Nav.Link>Delete</Nav.Link></LinkContainer>
      <LinkContainer to="/ModifyContacts"><Nav.Link>Modify</Nav.Link></LinkContainer>
      </NavDropdown>

      <NavDropdown title="Planque" id="collasible-nav-Stashs">
      <LinkContainer to="/NewStashs"><Nav.Link>New</Nav.Link></LinkContainer>
      <LinkContainer to="/GetStashs"><Nav.Link>Get</Nav.Link></LinkContainer>
      <LinkContainer to="/DeleteStashs"><Nav.Link>Delete</Nav.Link></LinkContainer>
      <LinkContainer to="/ModifyStashs"><Nav.Link>Modify</Nav.Link></LinkContainer>
      </NavDropdown>

      <NavDropdown title="Speciality" id="collasible-nav-Speciality">
      <LinkContainer to="/NewSpeciality"><Nav.Link>New</Nav.Link></LinkContainer>
      <LinkContainer to="/GetSpeciality"><Nav.Link>Get</Nav.Link></LinkContainer>
      <LinkContainer to="/DeleteSpeciality"><Nav.Link>Delete</Nav.Link></LinkContainer>
      </NavDropdown>

  </Nav>
</Navbar.Collapse>
</Navbar>
  )
}

export default Header;



