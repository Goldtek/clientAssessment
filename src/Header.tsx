import React from 'react';
import { Navbar } from 'react-bootstrap';
import Container from 'react-bootstrap/Container';

function Header() {
  return (
    <Navbar bg="dark" variant="light">
        <Container>
          <Navbar.Brand href="#home"> Assingment</Navbar.Brand>
        </Container>
    </Navbar>
  );
}

export default Header;