const bcrypt = require('bcryptjs');
const { ErrorMessage } = require('../constants/error.constant');
const HttpError = require('../models/http-error.model');

const database = {
  users: [
    {
      id: '1',
      username: 'nguyenvanhoan02@gmail.com',
      password: '123',
      entries: 0,
      joined: new Date(),
    },
    {
      id: '2',
      username: 'fleximind02@gmail.com',
      password: '123',
      entries: 0,
      joined: new Date(),
    },
  ],
};

const getUsers = (req, res, next) => {
  const { users } = database;
  res.json(users);
};

const signin = async (req, res, next) => {
  const { username, password } = req.body;
  const { users } = database;

  const index = users.findIndex(user => username === user.username);
  let isValidPassword;
  if (index >= 0) {
    const user = users[index];
    try {
      isValidPassword = await bcrypt.compare(password, user.password);
    } catch (error) {
      return next(new HttpError(ErrorMessage.INTERNAL_SERVER_ERROR, 500));
    }
    res.json({ message: 'Signin successfully' });
  } else {
    res.status(401).send(ErrorMessage.INVALID_CREDENTIALS);
  }
};

const signup = async (req, res, next) => {
  const { users } = database;
  const { username, password } = req.body;
  const index = users.findIndex(user => username === user.username);
  if (index >= 0) {
    return next(new HttpError('username already exists', 409));
  } else {
    try {
      let hashedPassword = await bcrypt.hash(password, 12);
      users.push({
        username,
        password: hashedPassword,
      });
      return res.json({ message: 'Signup successfully' });
    } catch (error) {
      return next(new HttpError(ErrorMessage.INTERNAL_SERVER_ERROR, 500));
    }
  }
};

module.exports = { signup, getUsers, signin };
