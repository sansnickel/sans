import React, { Component } from 'react';
import Search from '../Search/Search';
import './WolframAlpha.scss';
import LoadingLogo from '../../assets/Loading.gif';

const axios = require('axios');

class WolframAlpha extends Component {
  constructor(props) {
    super(props);

    this.state = {
      result: '',
      loaded: true,
      fullResult: false,
    };

    this.doSearch = this.doSearch.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
  }

  componentDidMount() {
    // this.setState({ loaded: true });
  }

  componentDidUpdate() {

  }

  doSearch(query) {
    const s = this.state;

    this.setState({ loaded: false });
    if (s.fullResult !== true) {
      axios.get('/wolfram', {
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
    } else {
      axios.get('/wolfram2', {
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
  }

  handleInputChange(event) {
    const e = event;
    const t = e.target;
    const value = t.type === 'checkbox' ? t.checked : t.value;
    const n = t.name;

    this.setState({
      [n]: value,
    });
  }

  render() {
    const s = this.state;

    const hasContent = (s.result === '' && s.loaded === true) ? 'hidden' : '';

    function showLogo() {
      return <img className="loadinglogo" src={LoadingLogo} alt="" />;
    }
    function showResult() {
      if (!Array.isArray(s.result)) {
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
      <div className="Wolfram">
        <div className="Wolfram__search">
          <div className="Wolfram__search__bar">
            <Search doSearch={this.doSearch} />
          </div>
          <div className="Wolfram__search__full">
            <input name="fullResult" type="checkbox" checked={s.fullResult} onChange={this.handleInputChange} />
            Show Full Result?
          </div>
        </div>
        <div className={`Wolfram__result ${hasContent}`}>
          { s.loaded === true ? showResult() : showLogo() }
        </div>
      </div>
    );
  }
}

export default WolframAlpha;
