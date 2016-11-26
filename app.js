var express = require('express'),
    bodyParser = require('body-parser'),
    consign = require('consign'),
    app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

//Load all modules
consign({verbose: false})
    .include('helpers')
    .then('db')
    .then('models')
    .then('middlewares')
    .then('controllers')
    .then('routes')
    .into(app);

//404 error
app.use(function(request, response, next){
   var err = new Error('Not found!');
   err.status = 404;
   next(err);
});

//error handling
app.use(function(err, request, response, next){
   response.status(err.status || 500).json({err: err.message});
});

module.exports = app;
