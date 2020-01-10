import React, { Component } from 'react';
import './Home.scss';
import LoadingLogo from '../../assets/Loading.gif';

const axios = require('axios');

class Home extends Component {

  static turnOn() {
    axios.get('/lights/on')
      .then((res) => {
      })
      .catch((err) => {
      });
  }

  static turnOff() {
    axios.get('/lights/off')
      .then((res) => {
      })
      .catch((err) => {
      });
  }


  constructor(props) {
    super(props);
    this.state = {
      lights: [],
      loaded: false,
    };
  }

  componentDidMount() {
    axios.get('/lights')
      .then((res) => {
        this.setState({ lights: res.data, loaded: true });
        console.log(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }


  render() {
    const s = this.state;
    function showLogo() {
      return <img src={LoadingLogo} alt="" />;
    }
    function showResult() {
      const pods = [];
      pods.push(<h3>{s.lights[0].deviceInfo.label}</h3>);
      pods.push(<h4>{s.lights[0].ip}</h4>);
      return pods;
    }

    return (
      <div className="Home">
        <div className="Lights">
          { s.loaded === true ? showResult() : showLogo() }
          <button type="button" onClick={Home.turnOn}>Turn On</button>
          <button type="button" onClick={Home.turnOff}>Turn Off</button>
        </div>
      </div>
    );
  }
}

export default Home;
