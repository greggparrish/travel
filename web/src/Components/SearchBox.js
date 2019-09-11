import React from 'react';
import {Container, Row, Col, Form, Button} from 'react-bootstrap';
import IconStacked from '../Components/IconStacked'

const SearchBox = (props) => (
<section id='searchbox'>
  <Container>
    <h1>SEARCH GSA TRAVEL DATA</h1>
    <Row>
      <Col sm={12} md={6}>
        <div className='searchbox-wrapper flights'>
          <IconStacked
            stackIcon='fa-circle'
            icon='fa-plane'
          />
          <h3>FLIGHTS</h3>
          <Form>
            <Form.Group>
              <Form.Control
                className='ui-autocomplete-input'
                id='origin'
                name='origin'
                placeholder='Origin (ex. JFK)'
                autoComplete='off'
                onChange={(e) => props.store.handleSearchChange(e)}
              />
              <Form.Control
                className='ui-autocomplete-input'
                id='destination'
                name='destination'
                placeholder='Destination (ex. LAX)'
                autoComplete='off'
                onChange={(e) => props.store.handleSearchChange(e)}
              />
            </Form.Group>
            <Button className='btn-flat blue' type='submit'>
              Search Flights
            </Button>
          </Form>
        </div>
      </Col>
      <Col sm={12} md={6}>
        <div className='searchbox-wrapper hotels'>
          <IconStacked
            stackIcon='fa-circle'
            icon='fa-map-marker-alt'
          />
          <h3>HOTELS</h3>
          <Form>
            <Form.Group>
              <Form.Control
                className='ui-autocomplete-input'
                id='city'
                name='city'
                placeholder='City (ex. New York)'
                autoComplete='off'
                onChange={(e) => props.store.onChange(e)}
              />
            </Form.Group>
            <Button className='btn-flat green' type='submit'>
              Search Hotels
            </Button>
          </Form>
        </div>
      </Col>
    </Row>
  </Container>
</section>
);
export default SearchBox;
