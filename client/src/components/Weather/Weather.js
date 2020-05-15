import React, { Component } from 'react';
import './Weather.scss';
import Search from '../Search/Search';
import LoadingLogo from '../../assets/Loading.gif';

const axios = require('axios');

class Weather extends Component {
  constructor(props) {
    super(props);

    this.state = {
      result: '',
      loaded: true,
    };

    this.doSearch = this.doSearch.bind(this);
  }

  componentDidMount() {
    // this.setState({ loaded: true });
  }

  componentDidUpdate() {
  }

  doSearch(query) {
    this.setState({ loaded: false });
    axios.get('/forecast', {
      params: {
        q: query,
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


  render() {
    const s = this.state;

    function showLogo() {
      return <img className="loadinglogo" src={LoadingLogo} alt="" />;
    }

    function showResult() {
      const pods = {};
      const data = s.result.list;
      const code = s.result.cod;
      let times = [];
      let curday;

      const days = [];

      if (code === '200') {
        let day = new Date(data[0].dt * 1000).toLocaleString('en-CA', { month: 'short', day: 'numeric' });

        for (let i = 0; i < data.length; i += 1) {
          curday = new Date(data[i].dt * 1000).toLocaleString('en-CA', { month: 'short', day: 'numeric' });
          if (day !== curday) {
            // start new section
            pods[day] = times;
            day = curday;
            times = [];
          }

          // push pods
          times.push(
            <div className="Weather__result__day__times__container__entry" key={data[i].dt}>
              <div className="Weather__result__day__times__container__entry__time">
                {new Date(data[i].dt * 1000).toLocaleString('en-CA', { hour: 'numeric' })}
              </div>
              <img src={`http://openweathermap.org/img/wn/${data[i].weather[0].icon}.png`} alt="weather icon" />
              <div className="Weather__result__day__times__container__entry__temp">
                {Math.round(data[i].main.temp)}
                °C
              </div>
            </div>,
          );
        }

        Object.keys(pods).forEach(key => (
          days.push(
            <div className="Weather__result__day" key={key}>
              <div className="Weather__result__day__title">
                {key}
              </div>
              <div className="Weather__result__day__times">
                <div className="Weather__result__day__times__container">
                  {pods[key]}
                </div>
              </div>
            </div>,
          )
        ));
      } else {
        return s.result.message;
      }
      return days;
    }

    return (
      <div className="Weather">
        <div className="Weather__search">
          <Search doSearch={this.doSearch} />
        </div>
        <div className="Weather__result">
          { s.loaded === true ? showResult() : showLogo() }
        </div>
      </div>
    );
  }
}

export default Weather;
