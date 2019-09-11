import React, {Component} from 'react'
import {inject, observer} from 'mobx-react';
import {Container, Navbar, Nav} from 'react-bootstrap';

import IconStacked from '../Components/IconStacked'


class NavBar extends Component {
  constructor(props) {
    super(props);
  }
  smoothScroll(e) {
    e.preventDefault();
    document.getElementById("about").scrollIntoView({behavior: "smooth"});
  }
  render() {
    return (
      <header>
        <Navbar bg="transparent" expand="lg">
          <Container>
            <Navbar.Brand href="/">
              <IconStacked
                stackIcon='fa-circle'
                icon='fa-paper-plane'
              />
              GSA Travel App
            </Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
              <Nav className="ml-auto">
                <Nav.Link href="/">Home</Nav.Link>
                <a href="/#about" class="nav-link" onClick={(e) => this.smoothScroll(e)}>About</a>
                <Nav.Link href="/search">Search</Nav.Link>
              </Nav>
            </Navbar.Collapse>
          </Container>
        </Navbar>
      </header>
    );
  }
}
export default NavBar;

