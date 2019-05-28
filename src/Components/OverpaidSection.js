import React from 'react';
import {Container, Row, Col, Form, Button} from 'react-bootstrap';

const OverpaidSection = () => (
  <section id='overpaid'>
    <Container>
      <Row>
        <Col s={12} m={6}>
          <h2>MOST OFTEN OVERPAID FLIGHTS</h2>
        </Col>
        <Col s={12} m={6}>
          <h2>MOST EXPENSIVE HOTELS</h2>
        </Col>
      </Row>
    </Container>
  </section>
);
export default OverpaidSection;
