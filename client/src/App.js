import React, { Component } from 'react';
// import logo from './logo.svg';
import './App.scss';
import axios from 'axios';
import FactOfTheDay from './components/FactOfTheDay/FactOfTheDay';
import APISelect from './components/APISelect/APISelect';
import WolframAlpha from './components/WolframAlpha/WolframAlpha';
import Weather from './components/Weather/Weather';
import Notes from './components/Notes/Notes';
import Home from './components/Home/Home';

if (process.env.NODE_ENV === 'production') axios.defaults.baseURL = 'http://192.168.0.45:3001';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      query: '',
      submittedQuery: '',
      api: '',
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.setAPI = this.setAPI.bind(this);
  }

  setAPI(data) {
    this.setState({ api: data });
    this.setState({ submittedQuery: '' });
  }

  handleChange(event) {
    this.setState({ query: event.target.value });
  }

  handleSubmit(event) {
    this.setState(prevState => ({ submittedQuery: prevState.query }));
    event.preventDefault();
  }

  render() {
    const { submittedQuery, query, api } = this.state;
    let mainComponent;

    switch (api) {
      case 'Wolfram': mainComponent = <WolframAlpha query={submittedQuery} />; break;
      case 'Weather': mainComponent = <Weather query={submittedQuery} />; break;
      case 'Home': mainComponent = <Home />; break;
      default: mainComponent = <Home />; break;
    }

    return (
      <div className="App">
        <div className="App__left">
          <APISelect sendAPI={this.setAPI} />
        </div>
        <div className="App__right">
          <form className="Form" onSubmit={this.handleSubmit}>
            <input className="Form__Searchbar" type="text" value={query} onChange={this.handleChange} placeholder="Search anything..." />
            <input className="Form__Submit" type="submit" value="&rarr;" />
          </form>
          {mainComponent}
          <FactOfTheDay />
          <Notes />
        </div>
      </div>
    );
  }
}

export default App;
