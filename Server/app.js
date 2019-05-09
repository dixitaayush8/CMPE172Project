var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var mysql = require('mysql');
var SqlString = require('sqlstring');
var app = express();


var con = mysql.createConnection({
  host: "jaic.c4ni4hbk2san.us-west-1.rds.amazonaws.com",
  user: "root",
  password: "jaicroot",
  database: "employees"
});

con.connect(function(err) {
  if (err) throw err;
  con.query("select dept_name, dept_no, count(emp_no) as count, ROUND(avg(salary),2) as average from employees join dept_emp using(emp_no) join departments using(dept_no) join salaries using(emp_no, from_date) group by dept_no", function (err, result, fields) {
    if (err) throw err;
    console.log(result);
  });


  console.log('Connected to database.');

});
//proxying here
app.use(express.static(path.join(__dirname, 'public')))
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');
app.enable('trust proxy');
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

//employee = [emp_no: '000', birth_date: '00', first_name: 'Winnie', last_name: 'Australia', gender: 'M', hire_date: '000'];
/*app.get('/api/create', (req, res) => {

  var sql = SqlString.format('insert into employees set emp_no = ?,birth_date = ?,first_name = ?,last_name = ?,gender = ?,hire_date = ?'
    , [req.query.emp_no, req.query.birth_date, req.query.first_name, req.query.last_name, req.query.gender, req.query.hire_date])
  console.log(sql)
  con.query(sql, function (err, result, fields) {
    if (err) throw err;
    console.log('Created new Employee', result);
    res.send({ result: result });
  })
});*/
app.get('/api/positioninfo', (req,res) => {
  var sql = SqlString.format('select title, count(*) as count, ROUND(avg(salary),2) as average from titles inner join salaries using(emp_no, from_date) group by title')
  con.query(sql, function (err, result, fields) {
    if (err) throw err;
    res.send({ result: result });
  })
})
app.get('/api/departmentinfo',(req, res) => {
  var sql = SqlString.format('select dept_name, dept_no, count(emp_no) as count, ROUND(avg(salary),2) as average from employees join dept_emp using(emp_no) join departments using(dept_no) join salaries using(emp_no, from_date) group by dept_no')
  con.query(sql, function (err, result, fields) {
    if (err) throw err;
    res.send({ result: result });
  })
})

app.get('/api/newsalary', (req, res) => {
  var sql = SqlString.format('update salaries set salary = ? where emp_no = ? and from_date = ?', [req.query.salary, req.query.emp_no, req.query.from_date])

  con.query(sql, function (err, result, fields) {
    if (err) throw err;
    console.log('Created new salary for Employee', result);
    res.send({ result: result });
  })
});

//employee = [emp_no: '000', birth_date: '00', first_name: 'Winnie', last_name: 'Australia', gender: 'M', hire_date: '000'];
app.get('/api/update', (req, res) => {

  var sql = SqlString.format('update employees set birth_date = ?,first_name = ?,last_name = ?,gender = ?,hire_date = ? where emp_no = ?',
    [req.query.birth_date, req.query.first_name, req.query.last_name, req.query.gender, req.query.hire_date, req.query.emp_no])
  console.log(sql)
  console.log("just updated employee with employee number 10001");
  con.query(sql,
    req, function (err, result, fields) {
      if (err) throw err
      console.log(result, result)
    })
});

//delete with emp_no
/*app.get('/api/delete', (req, res) => {
  console.log("req is " + req.query.emp_no)
  con.query('delete from employees where emp_no =' + req.query.emp_no, function (err, result, fields) {
    if (err) throw err;
    console.log('Deleted', result);
    res.send({ result: result });
  })
});*/

// search by emp_no
app.get('/api/employee', (req, res) => {
  var sql = SqlString.format('select * from employees join salaries using(emp_no) where emp_no = ? ORDER BY from_date DESC LIMIT 1', [req.query.emp_no])
  con.query(sql, function (err, result, fields) {
    if (err) throw err;
    console.log(result, result);
    res.send({ result: result })
  })
});

// search by emp_no
app.get('/api/employeeTable', (req, res) => {
  var sql = SqlString.format('select * from employees join salaries using(emp_no) where emp_no = ? ORDER BY from_date DESC', [req.query.emp_no])
  con.query(sql, function (err, result, fields) {
    if (err) throw err;
    console.log(result, result);
    res.send({ result: result })
  })
});

app.get('*', function (request, response) {
  response.sendFile(path.resolve(__dirname, 'public/index.html'));
});

app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next(createError(404));
});

app.listen(3001);

module.exports = app;
