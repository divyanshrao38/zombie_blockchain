import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Navbar, Nav, Container } from 'react-bootstrap';

function CustomNavbar(props) {
    console.log(props)
  return (
    <Navbar bg="dark" variant="dark">
      <Container>
        <Navbar.Brand href="#home">Team DOGE</Navbar.Brand>
        <Nav className="me-auto">
          <Nav.Link onClick={()=>props.handleCreateZombies()}>Create Zombies</Nav.Link>
          <Nav.Link onClick = {()=>props.handleShowOwner()}>Show Zombie owner</Nav.Link>
        </Nav>
      </Container>
    </Navbar>
  );
}

export default CustomNavbar;
