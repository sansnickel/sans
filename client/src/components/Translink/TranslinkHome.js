import React, { Component } from 'react';
import './TranslinkHome.scss';
import LoadingLogo from '../../assets/Loading.gif';

const axios = require('axios');

class TranslinkHome extends Component {
  constructor(props) {
    super(props);

    this.state = {
      result: '',
      loaded: false,
    };
  }

  componentDidMount() {
    const p = this.props;
    axios.get('/bus', {
      params: {
        busno: p.query,
        timeframe: 120,
        count: 4,
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

  componentDidUpdate(prevProps) {
    const p = this.props;

    if (p.query && ((prevProps.query !== p.query))) {
      this.setState({ loaded: false });
      axios.get('/bus', {
        params: {
          busno: p.query,
          count: 4,
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

  render() {
    const s = this.state;
    function showLogo() {
      return <img src={LoadingLogo} alt="" />;
    }
    function showResult() {
      const pods = [];
      const data = s.result;
      if (data) {
        for (let i = 0; i < data.length; i += 1) {
          const busno = [];
          busno.push(<div className="routeNo">{data[i].RouteNo}</div>);
          const times = data[i].Schedules;
          if (times) {
            for (let j = 0; j < times.length; j += 1) {
              const indexm = times[j].ExpectedLeaveTime.indexOf('m');
              busno.push(<div className="routeNo__time">{times[j].ExpectedLeaveTime.substring(0, indexm + 1)}</div>);
            }
          }
          pods.push(<div className="stopNo">{busno}</div>);
        }
      }
      return pods;
    }

    return (
      <div className="TranslinkHomeComponent">
        { s.loaded === true ? showResult() : showLogo() }
      </div>
    );
  }
}

export default TranslinkHome;
