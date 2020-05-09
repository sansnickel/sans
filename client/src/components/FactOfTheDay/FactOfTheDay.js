import React, { Component } from 'react';
import './FactOfTheDay.scss';

const axios = require('axios');

class FactOfTheDay extends Component {
  constructor(props) {
    super(props);
    this.state = { result: ' ' };
  }

  componentDidMount() {
    axios.get('/randomfact')
      .then(res => this.setState({ result: res.data }))
      .catch((err) => {
        console.log(err);
      });
  }

  render() {
    const myvar = this.state;
    return (
      <div className="FactOfTheDay">
        {/* <div className="FactOfTheDay__title">
          Fact Of The Day
        </div> */}
        <div className="FactOfTheDay__content">
          { myvar.result }
        </div>
      </div>
    );
  }
}

export default FactOfTheDay;
