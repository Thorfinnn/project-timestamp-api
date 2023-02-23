// index.js
// where your node app starts

// init project
var express = require('express');
var app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC 
var cors = require('cors');
app.use(cors({ optionsSuccessStatus: 200 }));  // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));
app.set('json spaces', 2);

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function(req, res) {
  res.sendFile(__dirname + '/views/index.html');
});

app.get("/api/:date?", (req, res) => {
  date = req.params.date;
  if (typeof date === `undefined`) {
    date1 = new Date();
    return res.json({
      unix: date1.valueOf(),
      utc: date1.toUTCString()
    });
  } else if (/\d{5,}/.test(date)) {
    datenum = parseInt(date);
    return res.json({
      unix: datenum,
      utc: new Date(datenum).toUTCString()
    });
  } else {
    dateobject = new Date(date);
    if (dateobject.toString() != "Invalid Date") {
      return res.json({
        unix: dateobject.valueOf(),
        utc: dateobject.toUTCString()
      });
    } else {
      return res.json({
        error: "Invalid Date"
      });
    }
  }

});



// your first API endpoint... 
app.get("/api/hello", function(req, res) {
  res.json({ greeting: 'hello API' });
});



// listen for requests :)
var listener = app.listen(process.env.PORT, function() {
  console.log('Your app is listening on port ' + listener.address().port);
});
