'use strict';

require('dotenv').config({ path: './variables.env' });
const User = require('./models/User');
const mongoose = require('mongoose')

module.exports.create = (event, context, callback) => {
  context.callbackWaitsForEmptyEventLoop = false;
  return mongoose.connect(process.env.DB)
    .then(() =>
      User.create(JSON.parse(event.body))
    )
    .then(user => callback(null, {
      statusCode: 200,
      body: JSON.stringify(user)
    }))
    .catch(err => callback(null, {
      statusCode: err.statusCode || 500,
      headers: { 'Content-Type': 'text/plain' },
      body: 'Could not create the user.'
    }));
}

module.exports.getOne = (event, context, callback) => {
  context.callbackWaitsForEmptyEventLoop = false;
  return mongoose.connect(process.env.DB)
    .then(() =>
      User.findById(event.pathParameters.id)
    )
    .then(user => callback(null, {
      statusCode: 200,
      body: JSON.stringify(user)
    }))
    .catch(err => callback(null, {
      statusCode: err.statusCode || 500,
      headers: { 'Content-Type': 'text/plain' },
      body: 'Could not fetch the user.'
    }));
};

module.exports.getAll = (event, context, callback) => {
  context.callbackWaitsForEmptyEventLoop = false;
  return mongoose.connect(process.env.DB)
    .then(() =>
      User.find()
    )
    .then(users => callback(null, {
      statusCode: 200,
      body: JSON.stringify(users)
    }))
    .catch(err => callback(null, {
      statusCode: err.statusCode || 500,
      headers: { 'Content-Type': 'text/plain' },
      body: 'Could not fetch the users.'
    }))
};

module.exports.update = (event, context, callback) => {
  context.callbackWaitsForEmptyEventLoop = false;
  return mongoose.connect(process.env.DB)
    .then(() =>
      User.findByIdAndUpdate(event.pathParameters.id, JSON.parse(event.body), { new: true })
    )
    .then(user => callback(null, {
      statusCode: 200,
      body: JSON.stringify(user)
    }))
    .catch(err => callback(null, {
      statusCode: err.statusCode || 500,
      headers: { 'Content-Type': 'text/plain' },
      body: 'Could not fetch the users.'
    }));
};

module.exports.delete = (event, context, callback) => {
  context.callbackWaitsForEmptyEventLoop = false;
  return mongoose.connect(process.env.DB)
    .then(() =>
      User.findByIdAndRemove(event.pathParameters.id)
    )
    .then(user => callback(null, {
      statusCode: 200,
      body: JSON.stringify({ message: 'Removed user with id: ' + user._id, user: user })
    }))
    .catch(err => callback(null, {
      statusCode: err.statusCode || 500,
      headers: { 'Content-Type': 'text/plain' },
      body: 'Could not fetch the users.'
    }));
};