import React, { Component } from 'react';
import './Translink.scss';
import LoadingLogo from '../../assets/Loading.gif';

const axios = require('axios');

class Translink extends Component {
  constructor(props) {
    super(props);

    this.state = {
      result: '',
      loaded: false,
    };
  }

  componentDidMount() {
    this.setState({ loaded: true });
  }

  componentDidUpdate(prevProps) {
    const p = this.props;

    if (p.query && ((prevProps.query !== p.query))) {
      this.setState({ loaded: false });
      axios.get('/bus', {
        params: {
          busno: p.query,
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
          pods.push(<h2>{data[i].RouteNo}</h2>);
          const times = data[i].Schedules;
          if (times) {
            for (let i = 0; i < times.length; i += 1) {
              pods.push(<h3>{times[i].ExpectedLeaveTime}</h3>)
            }
          }
        }
      }
      return pods;
    }

    return (
      <div className="TranslinkComponent">
        { s.loaded === true ? showResult() : showLogo() }
      </div>
    );
  }
}

export default Translink;
