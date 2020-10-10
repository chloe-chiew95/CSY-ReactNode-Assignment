const bodyParser = require('body-parser');

var fs = require('fs');
var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var cors = require("cors");
var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var loadRestaurantData = require('./routes/restaurant');
//var saveOrderData = require('./routes/orderhistory');
var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));

app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(cors());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
console.log(__dirname)
//app.use('/orderhistory',saveOrderData);
app.use('/', indexRouter);
app.use('/restaurant',loadRestaurantData);
app.use('/users', usersRouter);


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/get/orderhistory', (req, res) => {

  res.send(fs.readFileSync('order-history.json', "utf-8"));
    
});

app.post('/post/orderhistory', (req, res) => {
   const order ={
    "time": req.body.order.time,
    "date": req.body.order.date,
    "name": req.body.order.name,
    "menuItem": req.body.order.menuItem,
    "total": req.body.order.total
  } 
//var str = fs.readFileSync('order-history.json', "utf-8")
var str = ""
if(fs.readFileSync('order-history.json', "utf-8") == "" || fs.readFileSync('order-history.json', "utf-8") == null){
  fs.writeFileSync('order-history.json', "[");
}
else{
  str = fs.readFileSync('order-history.json', "utf-8")
  fs.writeFileSync('order-history.json', str.substring(0,str.length-1) + ",");
}
str = fs.readFileSync('order-history.json', "utf-8")
fs.writeFileSync('order-history.json', str + JSON.stringify(order));
str = fs.readFileSync('order-history.json', "utf-8")
fs.writeFileSync('order-history.json', str + "]");
  
  console.log("Order saved!"); 
  
});





// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
