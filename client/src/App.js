import React, { Component } from 'react';
// import logo from './logo.svg';
import './App.scss';
import axios from 'axios';
import WolframAlpha from './components/WolframAlpha/WolframAlpha';
import Weather from './components/Weather/Weather';
// import Notes from './components/Notes/Notes';
import Translink from './components/Translink/Translink';
import Smart from './components/Smart/Smart';
import Home from './components/Home/Home';

import HomeLogo from './assets/Home.svg';
import WolframLogo from './assets/Wolfram.png';
import WeatherLogo from './assets/Weather.png';
import DictionaryLogo from './assets/Dictionary.png';
import TranslinkLogo from './assets/Translink.png';

if (process.env.NODE_ENV === 'production') axios.defaults.baseURL = 'http://192.168.0.45:3001';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      page: 'Home',
    };
  }

  changePage(newpage) {
    this.setState({ page: newpage });
  }

  render() {
    const { page } = this.state;

    const imageSources = {
      Home: `url( ${HomeLogo} )`,
      Wolfram: `url( ${WolframLogo} )`,
      Weather: `url( ${WeatherLogo} )`,
      Dictionary: `url( ${DictionaryLogo} )`,
      Translink: `url( ${TranslinkLogo} )`,
      Smart: `url( ${HomeLogo} )`,
    };

    const pageList = [];

    Object.keys(imageSources).map(
      (keyName, index) => pageList.push(
        <div className={`App__nav__buttons__container${page === keyName ? ' active' : ''}`}>
          <div
            role="button"
            tabIndex={index}
            key={keyName}
            className="App__nav__buttons__container__button"
            type="button"
            onClick={() => this.changePage(keyName)}
            onKeyUp={() => this.changePage(keyName)}
            style={{ backgroundImage: imageSources[keyName] }}
          />
        </div>,
      ),
    );

    return (
      <div className="App">
        <div className="App__nav">
          <div className="App__nav__buttons">{pageList}</div>
        </div>
        <div className="App__main">
          <div className={`App__main__page${page === 'Wolfram' ? ' active' : ''}`}>
            <WolframAlpha />
          </div>
          <div className={`App__main__page${page === 'Weather' ? ' active' : ''}`}>
            <Weather />
          </div>
          <div className={`App__main__page${page === 'Translink' ? ' active' : ''}`}>
            <Translink />
          </div>
          <div className={`App__main__page${page === 'Smart' ? ' active' : ''}`}>
            <Smart />
          </div>
          <div className={`App__main__page${page === 'Home' ? ' active' : ''}`}>
            <Home />
          </div>
        </div>
      </div>
    );
  }
}

export default App;
