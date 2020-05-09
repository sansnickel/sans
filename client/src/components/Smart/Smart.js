import React, { Component } from 'react';
import './Smart.scss';
import LoadingLogo from '../../assets/Loading.gif';

const axios = require('axios');

class Smart extends Component {

  constructor(props) {
    super(props);
    this.state = {
      lights: [],
      loaded: false,
      status: [],
    };

    this.changeBrightness = this.changeBrightness.bind(this);
    this.handleChangeBrightness = this.handleChangeBrightness.bind(this);
    this.turnOn = this.turnOn.bind(this);
    this.turnOff = this.turnOff.bind(this);
  }

  componentDidMount() {
    axios.get('/lights')
      .then((res) => {
        const status = [];
        for (let i = 0; i < res.data.length; i += 1) {
          axios.get(`/lights/state/${i}`)
            .then((res2) => {
              status.push({ power: res2.data.power, color: res2.data.color });

              if (i === res.data.length - 1) {
                this.setState({ lights: res.data, status, loaded: true });
              }
            })
            .catch((err) => {
              console.log(err);
            });
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }

  turnOn(i) {
    axios.put(`/lights/on/${i}`)
      .then(() => {
        const s = this.state;
        const newstatus = s.status;
        newstatus[i].power = 1;

        this.setState({
          status: newstatus,
        });
      })
      .catch((err) => {
        console.log(err);
      });
  }

  turnOff(i) {
    axios.put(`/lights/off/${i}`)
      .then(() => {
        const s = this.state;
        const newstatus = s.status;
        newstatus[i].power = 0;

        this.setState({
          status: newstatus,
        });
      })
      .catch((err) => {
        console.log(err);
      });
  }

  handleChangeBrightness(i, e) {
    const s = this.state;
    const newstatus = s.status;
    const brightness = e.target.value / 100;

    newstatus[i].color.brightness = brightness;

    this.setState({
      status: newstatus,
    });
  }

  changeBrightness(i) {
    const s = this.state;
    axios.put(`/lights/brightness/${i}`, {
      data: {
        brightness: s.status[i].color.brightness,
      },
    })
      .then(() => {
      })
      .catch((err) => {
        console.log(err);
      });
  }

  render() {
    const that = this;
    const s = this.state;
    function showLogo() {
      return <img className="loadinglogo" src={LoadingLogo} alt="" />;
    }
    function showResult() {
      const pods = [];
      for (let i = 0; i < s.lights.length; i += 1) {
        pods.push(
          <div className="Smart__lights__container">
            <div className="Smart__lights__container__light">
              <div className="Smart__lights__container__light__label">{s.lights[i].deviceInfo.label}</div>
              {/* <div className="Smart__lights__container__light__ip">{s.lights[i].ip}</div> */}
              <div className="Smart__lights__container__light__buttons">
                <input type="range" id="brightness" name="brightness" min="0" max="100" onChange={e => that.handleChangeBrightness(i, e)} onMouseUp={() => that.changeBrightness(i)} onTouchEnd={() => that.changeBrightness(i)} value={Math.floor(s.status[i].color.brightness * 100)} />
                <div className={`Smart__lights__container__light__buttons__button${s.status[i].power === 1 ? ' active' : ''}`} role="button" onClick={() => that.turnOn(i)} onKeyUp={() => that.turnOn(i)} tabIndex="0">On</div>
                <div className={`Smart__lights__container__light__buttons__button${s.status[i].power === 0 ? ' active' : ''}`} role="button" onClick={() => that.turnOff(i)} onKeyUp={() => that.turnOff(i)} tabIndex="0">Off</div>
              </div>
            </div>
          </div>,
        );
      }
      return pods;
    }

    return (
      <div className="Smart">
        <div className="Smart__lights">
          { s.loaded === true ? showResult() : showLogo() }
        </div>
      </div>
    );
  }
}

export default Smart;
