import React, { Component } from 'react';
import './Home.scss';
import TranslinkHome from '../Translink/TranslinkHome';
import Smart from '../Smart/Smart';
import FactOfTheDay from '../FactOfTheDay/FactOfTheDay';
import WeatherHome from '../Weather/WeatherHome';

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
        <div className="Home__container Home__container--fact">
          <div className="Home__container__fact Home__container__section">
            <FactOfTheDay />
          </div>
        </div>
        <div className="Home__container">
          <div className="Home__container__smart Home__container__section">
            <Smart />
          </div>
        </div>
        <div className="Home__container">
          <div className="Home__container__weather Home__container__section">
            <WeatherHome />
          </div>
        </div>
        <div className="Home__container">
          <div className="Home__container__translink Home__container__section">
            <TranslinkHome query={52084} on="Garden City Rd" at="Cambie Rd" />
            <TranslinkHome query={61330} on="Bridgeport" at="Bay 11" />
            <TranslinkHome query={51333} on="Knight St" at="E47 Ave" />
          </div>
        </div>
      </div>
    );
  }
}

export default Home;
