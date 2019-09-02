import React, {Component} from 'react'
import {inject, observer} from 'mobx-react';
import {Container, Navbar, Nav} from 'react-bootstrap';

import IconStacked from '../Components/IconStacked'


class NavBar extends Component {
  constructor(props) {
    super(props);
    this.cs = this.props.commonStore
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
                <Nav.Link href="/#about">About</Nav.Link>
                <Nav.Link href="/search">Search</Nav.Link>
              </Nav>
            </Navbar.Collapse>
          </Container>
        </Navbar>
      </header>
    );
  }
}
export default inject('commonStore')(observer(NavBar));

