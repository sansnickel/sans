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
      active: false,
    };

    this.toggleExpand = this.toggleExpand.bind(this);
  }

  componentDidMount() {
    const p = this.props;
    axios.get('/bus', {
      params: {
        busno: p.query,
        timeframe: 1440,
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

  componentDidUpdate(prevProps) {
    const p = this.props;

    if (p.query && ((prevProps.query !== p.query))) {
      this.setState({ loaded: false });
      axios.get('/bus', {
        params: {
          timeframe: 1440,
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

  toggleExpand() {
    this.setState(prevState => ({
      active: !prevState.active,
    }));
  }

  render() {
    const s = this.state;
    const p = this.props;
    function showLogo() {
      return <img className="loadinglogo" src={LoadingLogo} alt="" />;
    }
    function showResult() {
      const pods = [];
      const data = s.result;
      let timestr;

      if (data) {
        for (let i = 0; i < data.length; i += 1) {
          const busno = [];
          busno.push(
            <div className="TranslinkHome__stops__stopNo__routeNo">
              {data[i].RouteNo}
            </div>,
          );

          const times = data[i].Schedules;
          if (times) {
            for (let j = 0; j < times.length; j += 1) {
              const indexm = times[j].ExpectedLeaveTime.indexOf('m');

              if (times[j].ExpectedLeaveTime.indexOf(':') <= 1) {
                timestr = ` ${times[j].ExpectedLeaveTime.substring(0, indexm + 1)}`;
              } else {
                timestr = times[j].ExpectedLeaveTime.substring(0, indexm + 1);
              }
              busno.push(<div className="TranslinkHome__stops__stopNo__routeNo__time">{timestr}</div>);
            }
          }
          pods.push(<div className="TranslinkHome__stops__stopNo">{busno}</div>);
        }
      }
      return pods;
    }

    return (
      <div className={`TranslinkHome${s.loaded === false ? ' loading' : ''}${s.active === true ? ' active' : ''}`} role="button" tabIndex="0" onClick={this.toggleExpand} onKeyUp={this.toggleExpand}>
        <div className="TranslinkHome__intersection">
          <div className="TranslinkHome__intersection__on">{p.on}</div>
          <div className="TranslinkHome__intersection__at">{p.at}</div>
        </div>
        <div className="TranslinkHome__line" />
        <div className="TranslinkHome__stops">
          { s.loaded === true ? showResult() : showLogo() }
        </div>
        <div className="TranslinkHome__expand" />
      </div>
    );
  }
}

export default TranslinkHome;
