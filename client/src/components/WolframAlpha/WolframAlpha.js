import React, { Component } from 'react';
import './WolframAlpha.scss';
import LoadingLogo from '../../assets/Loading.gif';

const axios = require('axios');

class WolframAlpha extends Component {
  constructor(props) {
    super(props);

    this.state = {
      result: '',
      loaded: false,
      fullResult: false,
    };

    this.handleInputChange = this.handleInputChange.bind(this);
  }

  componentDidMount() {
    this.setState({ loaded: true });
  }

  componentDidUpdate(prevProps, prevState) {
    const p = this.props;
    const s = this.state;

    if (p.query && ((prevProps.query !== p.query) || (prevState.fullResult !== s.fullResult))) {
      this.setState({ loaded: false });
      if (s.fullResult !== true) {
        axios.get('/wolfram', {
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
      } else {
        axios.get('/wolfram2', {
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
      if (s.fullResult !== true) {
        return s.result;
      }

      const pods = [];
      for (let i = 0; i < s.result.length; i += 1) {
        pods.push(<h2>{s.result[i].title}</h2>);
        for (let j = 0; j < s.result[i].subpods.length; j += 1) {
          pods.push(<img src={s.result[i].subpods[j].img.src} alt="" />);
        }
      }
      return pods;
    }

    return (
      <div className="WolframComponent">
        <input name="fullResult" type="checkbox" checked={s.fullResult} onChange={this.handleInputChange} />
          Show Full Result?
        { s.loaded === true ? showResult() : showLogo() }
      </div>
    );
  }
}

export default WolframAlpha;
