import React, { Component } from 'react';
import './Weather.scss';
import LoadingLogo from '../../assets/Loading.gif';

const axios = require('axios');

class Weather extends Component {
  constructor(props) {
    super(props);

    this.state = {
      result: '',
      loaded: false,
    };

    this.handleInputChange = this.handleInputChange.bind(this);
  }

  componentDidMount() {
    this.setState({ loaded: true });
  }

  componentDidUpdate(prevProps) {
    const p = this.props;

    if (p.query && ((prevProps.query !== p.query))) {
      this.setState({ loaded: false });
      axios.get('/weather', {
        params: {
          q: p.query,
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
  }

  handleInputChange(event) {
    const e = event;
    const t = e.target;
    const value = t.type === 'checkbox' ? t.checked : t.value;
    const n = t.name;

    this.setState({
      [n]: value,
      loaded: false,
    });
  }

  render() {
    const s = this.state;
    function showLogo() {
      return <img src={LoadingLogo} alt="" />;
    }
    function showResult() {
      const pods = [];
      const data = s.result.list;
      if (data) {
        for (let i = 0; i < data.length; i += 1) {
          pods.push(<h2>{data[i].dt_txt}</h2>);
          pods.push(<h2>{data[i].weather[0].description}</h2>);
        }
      }
      return pods;
    }

    return (
      <div className="WeatherComponent">
        { s.loaded === true ? showResult() : showLogo() }
      </div>
    );
  }
}

export default Weather;
