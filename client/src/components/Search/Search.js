import React, { Component } from 'react';
import './Search.scss';

class Search extends Component {
  constructor(props) {
    super(props);
    this.state = {
      query: '',
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount() {

  }

  handleChange(event) {
    this.setState({ query: event.target.value });
  }

  handleSubmit(event) {
    event.preventDefault();
    const s = this.state;
    const p = this.props;
    p.doSearch(s.query);
  }

  render() {
    const { query } = this.state;

    return (
      <form className="Search" onSubmit={this.handleSubmit}>
        <input className="Search__bar" type="text" value={query} onChange={this.handleChange} placeholder="Search anything..." />
        <input className="Search__submit" type="submit" value="&rarr;" />
      </form>
    );
  }
}

export default Search;
