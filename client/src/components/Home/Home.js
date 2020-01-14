import React, { Component } from 'react';
import './Home.scss';
import TranslinkHome from '../Translink/TranslinkHome';
import Smart from '../Smart/Smart';


class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {

    };
  }

  componentDidMount() {

  }

  render() {
    const busno = 61330;

    return (
      <div className="Home">
        <Smart />
        <TranslinkHome query={busno} />
      </div>
    );
  }
}

export default Home;
