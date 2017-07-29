var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var upload = require('./routes/upload');

var port = 3001;

app.use(function(req, res, next) { //allow cross origin requests
    res.setHeader("Access-Control-Allow-Methods", "POST, PUT, OPTIONS, DELETE, GET");
    res.header("Access-Control-Allow-Origin", "http://localhost:4200");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    res.header("Access-Control-Allow-Credentials", true);
    next();
});

app.use(express.static('../client'));
app.use(bodyParser.json());

app.use('/api',upload);
app.listen(port, function () {
    console.log('server running ' + port)
})
