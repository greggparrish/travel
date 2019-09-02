import React from 'react';
import {Container, Row, Col, Form, Button} from 'react-bootstrap';
import IconStacked from '../Components/IconStacked'

const AboutSection = () => (
  <section id='about'>
    <Container>
        <Row>
          <IconStacked
            stackIcon='fa-circle'
            icon='fa-question'
          />
          <h2 className='section-heading'>ABOUT</h2>
          <div className='section-subheading text-muted'>
            <p>This app was the winning entry in a <a href='http://gsatraveldata.challengepost.com/' target='_blank' rel='noopener noreferrer'>contest</a> sponsored by the <a href='http://www.gsa.gov/' target='_blank' rel='noopener noreferrer'>General Services Administration</a> (GSA).</p>
            <p>It uses a cleaned and standardized version of the government travel data provided by the GSA (four Excel spreadsheets) and incorporates other publicly available data sources to compare prices paid by government workers with those paid by consumers on flights and hotels.  It also evaluates current government flight agreements with some airlines (which often charged above market rates), and offers several options for cheaper flights and accommodation.</p>
            <p>The GSA offers no official endorsement of either the app or the developer. </p>
          </div>
        </Row>
    </Container>
  </section>
);
export default AboutSection;
