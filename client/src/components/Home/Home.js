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

    return (
      <div className="Home">
        <Smart />
        <div className="TranslinkHome">
          <TranslinkHome query={52084} />
          <TranslinkHome query={61330} />
          <TranslinkHome query={51333} />
        </div>
      </div>
    );
  }
}

export default Home;
