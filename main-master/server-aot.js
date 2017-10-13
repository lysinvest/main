const PORT = process.env.PORT || 7000;

var compression = require('compression');
var express = require('express');
var path = require('path');

var app = express();
app.use(compression());

app.set('view engine', 'html'); 
app.set('views', path.join(__dirname, 'dist/aot'));
app.engine('html', require('ejs').renderFile);

app.use(express.static(path.join(__dirname, 'dist/aot')));

app.get('*', function(req, res, next) {
  res.render('index');
});

app.set('port', PORT);
var server = app.listen(app.get('port'), function() {
  var port = server.address().port;
  console.log('AOT listen port:' + PORT);
});
