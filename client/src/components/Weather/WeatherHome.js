import React, { Component } from 'react';
import './Weather.scss';
import LoadingLogo from '../../assets/Loading.gif';

const axios = require('axios');

class WeatherHome extends Component {
  constructor(props) {
    super(props);

    this.state = {
      result: '',
      loaded: true,
    };
  }

  componentDidMount() {
    this.setState({ loaded: false });
    axios.get('/weather', {
      params: {
        q: 'Vancouver',
      },
    }).then((res) => {
      this.setState({
        result: res.data,
        loaded: true,
      });
      console.log(res);
    }).catch((err) => {
      console.log(err);
    });
  }

  componentDidUpdate() {
  }

  render() {
    const s = this.state;

    function showLogo() {
      return <img className="loadinglogo" src={LoadingLogo} alt="" />;
    }

    function showResult() {
      const code = s.result.cod;

      if (code === 200) {
        const { icon } = s.result.weather[0];
        const { temp } = s.result.main;
        return (
          <div>
            <div className="WeatherHome__result__temp">{`${Math.round(temp)}°C`}</div>
            <img src={`http://openweathermap.org/img/wn/${icon}.png`} alt="weather icon" />
          </div>
        );
      }
      return s.result.message;
    }

    return (
      <div className="WeatherHome">
        <div className="WeatherHome__result">
          { s.loaded === true ? showResult() : showLogo() }
        </div>
      </div>
    );
  }
}

export default WeatherHome;
