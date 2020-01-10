import React, { Component } from 'react';
import './APISelect.scss';
import LeagueLogo from '../../assets/League.png';
import WolframLogo from '../../assets/Wolfram.png';
import WeatherLogo from '../../assets/Weather.png';
import DictionaryLogo from '../../assets/Dictionary.png';
import TranslinkLogo from '../../assets/Translink.png';


// const axios = require('axios');

class APISelect extends Component {
  constructor(props) {
    super(props);
    this.state = { api: '' };
    this.changeAPI = this.changeAPI.bind(this);
  }

  changeAPI(newAPI) {
    const api = this.props;
    api.sendAPI(newAPI);
    this.setState({ api: newAPI });
  }

  render() {
    const imageSources = {
      League: `url( ${LeagueLogo} )`,
      Wolfram: `url( ${WolframLogo} )`,
      Weather: `url( ${WeatherLogo} )`,
      Dictionary: `url( ${DictionaryLogo} )`,
      Translink: `url( ${TranslinkLogo} )`,
      Home: `url( ${LeagueLogo} )`,
      b: `url( ${WolframLogo} )`,
      c: `url( ${WeatherLogo} )`,
      d: `url( ${DictionaryLogo} )`,
      e: `url( ${TranslinkLogo} )`,
      g: `url( ${LeagueLogo} )`,
      h: `url( ${WolframLogo} )`,
      i: `url( ${WeatherLogo} )`,
      j: `url( ${DictionaryLogo} )`,
      k: `url( ${TranslinkLogo} )`,
    };

    const optionList = [];
    const selected = this.state;

    Object.keys(imageSources).map(
      keyName => optionList.push(<button
        key={keyName}
        className={selected.api === keyName ? 'selected' : ''}
        type="button"
        onClick={() => this.changeAPI(keyName)}
        onKeyUp={() => this.changeAPI(keyName)}
        style={{ backgroundImage: imageSources[keyName] }}
      />),
    );

    return (
      <div className="APISelect">
        {optionList}
      </div>
    );
  }
}

export default APISelect;
