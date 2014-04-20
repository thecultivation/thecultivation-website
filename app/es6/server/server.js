import app from './app';

var server = function () {
  app.listen(5000);
  console.log('Listening on port 5000');
}

export default = server;