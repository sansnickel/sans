const express = require('express');
const app = express();
const port = process.env.PORT || 3001;
const axios = require('axios');

var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/mydb', {useNewUrlParser: true});
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  console.log('connected to database');
  var noteSchema = new mongoose.Schema({
    content: String
  });
  var Note = mongoose.model('Note', noteSchema);
  // var testnote = new Note({ content: 'test content' });
  // console.log(testnote.content);
  // testnote.save((err, fluffy) => {
  //   if (err) return console.error(err);
  //   console.log('note saved');
  // });
  app.get('/notes', function(req, res) {
    Note.find((err, notes) => {
      if (err) return console.error(err);
      res.json(notes);
      console.log(notes);
    })
  });
});


app.get('/', function (req, res) {
 return res.send('Hello World!');
});

app.get('/ping', function (req, res) {
  return res.send('pong');
});

app.get('/randomfact', function (req, res) {

  axios.get('http://numbersapi.com/random/trivia')
    .then(function (response) {
      res.json( response.data );
      console.log( response.data );
    })
    .catch(function (error) {
      res.json( 'Life sucks.' );
      console.log( error );
    });

});

app.get('/wolfram', function (req, res) {

  console.log( req );

  axios.get('http://api.wolframalpha.com/v1/result', {
    params: {
      i: req.query.q,
      appid: 'R6U925-QHVGLE5R97',
    }
  })
  .then(function (response) {
    res.json( response.data );
    console.log( response.data );
  })
  .catch(function (error) {
    res.json( error.response.data );
    console.log( error );
  });

});

app.get('/wolfram2', function (req, res) {

  console.log( req );

  axios.get('http://api.wolframalpha.com/v2/query?', {
    params: {
      input: req.query.q,
      appid: 'R6U925-QHVGLE5R97',
      output: 'json',
      format: 'image',
    }
  })
  .then(function (response) {
    res.json( response.data.queryresult.pods );
    console.log( response.data.queryresult.pods );
  })
  .catch(function (error) {
    res.json( error.response.data );
    console.log( error );
  });

});

app.get('/weather', function (req, res) {

  console.log( req );

  axios.get('https://api.openweathermap.org/data/2.5/forecast', {
    params: {
      q: req.query.q,
      mode: 'json',
      appid: '5a060cd07bb1454e930e3b2dcb328648',
    }
  })
  .then(function (response) {
    res.json( response.data );
    console.log( response.data );
  })
  .catch(function (error) {
    res.json( error.response.data );
    console.log( error );
  });

});

app.listen(port, () => console.log(`Listening on port ${port}`));
