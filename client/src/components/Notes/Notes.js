import React, { Component } from 'react';
import './Notes.scss';

const axios = require('axios');

class Notes extends Component {
  constructor(props) {
    super(props);
    this.state = { notes: [] };
    this.handleChange = this.handleChange.bind(this);
  }

  componentDidMount() {
    axios.get('/notes')
      .then((res) => {
        this.setState({ notes: res.data });
        const s = this.state;
        this.tempNotes = [...s.notes];
        console.log(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  handleChange(event) {
    const s = this.state;
    const index = s.notes.findIndex(note => note._id === event.target.getAttribute('myid'));
    const tempNotes = [...s.notes];
    tempNotes[index].content = event.target.value;
    this.setState({ notes: tempNotes });
  }

  render() {
    const s = this.state;
    const listNotes = s.notes.map(
      note => (
        <textarea
          key={note._id}
          myid={note._id} 
          value={note.content}
          onChange={this.handleChange}
        />
      ),
    );

    return (
      <div className="Notes">
        <div className="Notes__content">
          { listNotes }
        </div>
      </div>
    );
  }
}

export default Notes;
