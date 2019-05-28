import React, { Component } from 'react'

class Footer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      value: '',
    };
  }

  onChange = event => {
    this.setState({ value: event.target.value });
  };

  render() {
    return (
      <footer>
        <div className="container">
          Footer
        </div>
      </footer>
    );
  }
}
export default Footer;
