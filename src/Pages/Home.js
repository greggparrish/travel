import React, {Component} from 'react'
import {inject, observer} from "mobx-react";

import SearchBox from '../Components/SearchBox'
import OverpaidSection from '../Components/OverpaidSection'
import AboutSection from '../Components/AboutSection'

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
    }
  }


  componentDidMount() {
  }

  render() {
    return (
      <div id='home'>
        <SearchBox store={this.props.flightStore} />
        <OverpaidSection />
        <AboutSection />
      </div>
    );
  }
}

export default inject('flightStore', 'commonStore')(observer(Home));
