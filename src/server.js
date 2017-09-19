const app = require('./app');

app.listen(app.get('PORT'), () => {
  console.log('Server is running at port ' + app.get('PORT'));
});
