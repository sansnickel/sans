const express = require('express');
const cors = require('cors');
const app = express();
const dotenv = require('dotenv');
dotenv.config();
const port = process.env.PORT || 3001;
const axios = require('axios');

const Lifx  = require('node-lifx-lan');
const bodyParser = require('body-parser');

global.devices = [];

app.use(bodyParser.json());

app.use(cors({
  origin: 'http://192.168.0.45:3000'
}));

// var mongoose = require('mongoose');
// mongoose.connect('mongodb://localhost:27017/mydb', {useNewUrlParser: true});
// var db = mongoose.connection;
// db.on('error', console.error.bind(console, 'connection error:'));
// db.once('open', function() {
//   console.log('connected to database');
//   var noteSchema = new mongoose.Schema({
//     content: String
//   });
//   var Note = mongoose.model('Note', noteSchema);
//   // var testnote = new Note({ content: 'test content' });
//   // console.log(testnote.content);
//   // testnote.save((err, fluffy) => {
//   //   if (err) return console.error(err);
//   //   console.log('note saved');
//   // });
//   app.get('/notes', function(req, res) {
//     Note.find((err, notes) => {
//       if (err) return console.error(err);
//       res.json(notes);
//       console.log(notes);
//     })
//   });
// });


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
      // console.log( response.data );
    })
    .catch(function (error) {
      res.json( 'Life sucks.' );
      // console.log( error );
    });

});

app.get('/wolfram', function (req, res) {

  axios.get('http://api.wolframalpha.com/v1/result', {
    params: {
      i: req.query.q,
      appid: process.env.WOLFRAM_KEY,
    }
  })
  .then(function (response) {
    res.json( response.data );
    // console.log( response.data );
  })
  .catch(function (error) {
    res.json( error.response.data );
    // console.log( error );
  });

});

app.get('/wolfram2', function (req, res) {

  axios.get('http://api.wolframalpha.com/v2/query', {
    params: {
      input: req.query.q,
      appid: process.env.WOLFRAM_KEY,
      output: 'json',
      format: 'image',
    }
  })
  .then(function (response) {
    
    if ( response.data.queryresult.success === false ) {
      res.json ( 'Wolfram|Alpha did not understand your input' );
    } else {
      res.json( response.data.queryresult.pods );
    }
  })
  .catch(function (error) {
    res.json( error.response.data );
    // console.log( error );
  });

});

app.get('/forecast', function (req, res) {
  axios.get('https://api.openweathermap.org/data/2.5/forecast', {
    params: {
      q: req.query.q,
      mode: 'json',
      units: 'metric',
      appid: process.env.WEATHER_KEY,
    }
  })
  .then(function (response) {
    res.json( response.data );
    console.log( response.data );
  })
  .catch(function (error) {
    res.json( error.response.data );
    // console.log( error );
  });
});

app.get('/weather', function (req, res) {
  axios.get('https://api.openweathermap.org/data/2.5/weather', {
    params: {
      q: req.query.q,
      mode: 'json',
      units: 'metric',
      appid: process.env.WEATHER_KEY,
    }
  })
  .then(function (response) {
    res.json( response.data );
    console.log( response.data );
  })
  .catch(function (error) {
    res.json( error.response.data );
    // console.log( error );
  });
});

app.get('/bus', (req, res) => {
  // console.log( req.query.count );
  axios.get('https://api.translink.ca/rttiapi/v1/stops/' + req.query.busno + '/estimates', {
    params: {
      'content-type': 'application/JSON',
      timeframe: req.query.timeframe,
      count: req.query.count,
      apIKey: process.env.TRANSLINK_KEY
    }
  })
  .then(function (response) {
    res.json( response.data );
    // console.log( response.data );
  })
  .catch(function ( error ) {
    res.json( error.response.data );
    // console.log( error );
  })
})

app.get('/lights/', function (req, res) {
  if ( devices.length >= 1 ) {
    res.json(devices);
  } else {
    Lifx.discover().then((device_list) => {
      devices = device_list;
      return device_list;
      // let device_arr;
      // device_list.forEach((device) => {
      //   device_arr.push([
      //     device['ip'],
      //     device['mac'],
      //     device['deviceInfo']['label']
      //   ].join(' | '));
      // });
    }).then(( response ) => {
      // console.log(JSON.stringify(response, null, '  '));
      res.json( response );
    }).catch((error) => {
      console.error(error);
    });
  }

});

app.get('/lights/state/:index', function (req, res) {

  if ( devices.length <= 0 ) {
    Lifx.discover().then((device_list) => {
      devices = device_list;
    }).catch((error) => {
      console.error(error);
    });
  }

  devices[req.params.index].getLightState()
  .then( (response) => {
    // console.log(JSON.stringify(response, null, '  '));
    res.json( response );
  }).catch((error) => {
    console.error(error);
  })
});

app.put('/lights/brightness/:index', function (req, res) {

  function changeBrightness() {
    devices[req.params.index].setColor({
      color: {
        hue: 0,
        saturation: 0,
        brightness: req.body.data.brightness
      },
      duration: 1000,
    })
    .then(() => {
      res.status(200).end();
      console.log('Done!');
    }).catch((error) => {
      console.error(error);
    });
  }
  if ( devices[req.params.index] === undefined ) {
    Lifx.discover().then((device_list) => {
      devices = device_list;
    }).then(() => {
      changeBrightness();
    }).catch((error) => {
      console.error(error);
    });
  } else {
    changeBrightness();
  }
});

app.put('/lights/on/:index', function (req, res) {

  if ( devices.length <= 0 ) {
    Lifx.discover().then((device_list) => {
      devices = device_list;
    }).catch((error) => {
      console.error(error);
    });
  }

  devices[req.params.index].turnOn().then(() => {
    res.status(200).end();
    console.log('Done!');
  }).catch((error) => {
    console.error(error);
  });


  // Lifx.turnOnBroadcast().then(() => {
  //   res.status(200).end();
  //   console.log('Done!');
  // }).catch((error) => {
  //   console.error(error);
  // });
});

app.put('/lights/off/:index', function (req, res) {

  if ( devices.length <= 0 ) {
    Lifx.discover().then((device_list) => {
      devices = device_list;
    }).catch((error) => {
      console.error(error);
    });
  }

  devices[req.params.index].turnOff().then(() => {
    res.status(200).end();
    console.log('Done!');
  }).catch((error) => {
    console.error(error);
  });

  // Lifx.turnOffBroadcast({
  //   duration: 1000,
  // }).then(() => {
  //   res.status(200).end();
  //   console.log('Done!');
  // }).catch((error) => {
  //   console.error(error);
  // });
});


// Lifx.discover().then((device_list) => {
//   device_list.forEach((device) => {
//     console.log([
//       device['ip'],
//       device['mac'],
//       device['deviceInfo']['label']
//     ].join(' | '));
//   });
//   return Lifx.turnOffFilter({
//     filters: [{
//       label: "Lamp",
//     }]
//   });
// }).then(() => {
//   console.log('Done!');
// }).catch((error) => {
//   console.error(error);
// });


app.listen(port, () => console.log(`Listening on port ${port}`));
