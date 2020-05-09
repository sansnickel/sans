import React, { Component } from 'react';
import './Translink.scss';
import LoadingLogo from '../../assets/Loading.gif';
import Search from '../Search/Search';

const axios = require('axios');

class Translink extends Component {
  constructor(props) {
    super(props);

    this.state = {
      result: '',
      loaded: true,
    };

    this.doSearch = this.doSearch.bind(this);
  }

  componentDidMount() {
  }

  componentDidUpdate() {
  }

  doSearch(query) {
    this.setState({ loaded: false });
    axios.get('/bus', {
      params: {
        busno: query,
        count: 10,
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
      const pods = [];
      const data = s.result;
      if (data) {
        for (let i = 0; i < data.length; i += 1) {
          pods.push(<h2>{data[i].RouteNo}</h2>);
          const times = data[i].Schedules;
          if (times) {
            for (let j = 0; j < times.length; j += 1) {
              pods.push(<h3>{times[j].ExpectedLeaveTime}</h3>)
            }
          }
        }
      }
      return pods;
    }

    return (
      <div className="TranslinkComponent">
        <Search doSearch={this.doSearch} />
        { s.loaded === true ? showResult() : showLogo() }
      </div>
    );
  }
}

export default Translink;
