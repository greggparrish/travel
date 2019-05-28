import React, {Component} from 'react'
import {inject, observer} from 'mobx-react';
import {Container} from 'react-bootstrap';

import IconStacked from '../Components/IconStacked'


class Header extends Component {
  constructor(props) {
    super(props);
    this.cs = this.props.commonStore
  }
  render() {
    return (
      <header>
      </header>
    );
  }
}
export default inject('commonStore')(observer(Header));
