const express = require('express');
const bodyParser = require('body-parser');

const usersRoutes = require('./routes/user.route');

const app = express();
app.use(bodyParser.json());
app.use(usersRoutes);
app.use((error, req, res, next) => {
  if (res.headerSent) {
    return next(error);
  }
  const { code, message } = error;
  res.status(code | 500);
  res.json({ message: message | 'An unknown error occurred!' });
});

app.listen(3000, () => {
  console.log('app is running on port 3000');
});
