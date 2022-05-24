import React from 'react';
import { Navbar, Nav, Container } from 'react-bootstrap';

export const NavbarComponent = () => {
  return (
    <Navbar bg="dark" variant="dark">
        <Container>
            <Navbar.Brand href="/">File System</Navbar.Brand>
            <Nav className="me-auto">
                <Nav.Link href="/allfiles">Preview Files</Nav.Link>
            </Nav>
        </Container>
    </Navbar>
  )
}
