'use strict';

require('dotenv').config({ path: './variables.env' });
const Experience = require('./models/Experience');
const mongoose = require('mongoose')

module.exports.createExperience = (event, context, callback) => {
  context.callbackWaitsForEmptyEventLoop = false;
  return mongoose.connect(process.env.DB)
    .then(() =>
      Experience.create(JSON.parse(event.body))
    )
    .then(experience => callback(null, {
      statusCode: 200,
      body: JSON.stringify(experience)
    }))
    .catch(err => callback(null, {
      statusCode: err.statusCode || 500,
      headers: { 'Content-Type': 'text/plain' },
      body: 'Could not create the experience.'
    }));
}

module.exports.getOneExperience = (event, context, callback) => {
  context.callbackWaitsForEmptyEventLoop = false;
  return mongoose.connect(process.env.DB)
    .then(() =>
      Experience.findById(event.pathParameters.id)
    )
    .then(experience => callback(null, {
      statusCode: 200,
      body: JSON.stringify(experience)
    }))
    .catch(err => callback(null, {
      statusCode: err.statusCode || 500,
      headers: { 'Content-Type': 'text/plain' },
      body: 'Could not fetch the experience.'
    }));
};

module.exports.getAllExperiences = (event, context, callback) => {
  context.callbackWaitsForEmptyEventLoop = false;
  return mongoose.connect(process.env.DB)
    .then(() =>
      Experience.find()
    )
    .then(experiences => callback(null, {
      statusCode: 200,
      body: JSON.stringify(experiences)
    }))
    .catch(err => callback(null, {
      statusCode: err.statusCode || 500,
      headers: { 'Content-Type': 'text/plain' },
      body: 'Could not fetch the experiences.'
    }))
};

module.exports.updateExperience = (event, context, callback) => {
  context.callbackWaitsForEmptyEventLoop = false;
  return mongoose.connect(process.env.DB)
    .then(() =>
      Experience.findByIdAndUpdate(event.pathParameters.id, JSON.parse(event.body), { new: true })
    )
    .then(experience => callback(null, {
      statusCode: 200,
      body: JSON.stringify(experience)
    }))
    .catch(err => callback(null, {
      statusCode: err.statusCode || 500,
      headers: { 'Content-Type': 'text/plain' },
      body: 'Could not fetch the experiences.'
    }));
};

module.exports.deleteExperience = (event, context, callback) => {
  context.callbackWaitsForEmptyEventLoop = false;
  return mongoose.connect(process.env.DB)
    .then(() =>
      Experience.findByIdAndRemove(event.pathParameters.id)
    )
    .then(experience => callback(null, {
      statusCode: 200,
      body: JSON.stringify({ message: 'Removed experience with id: ' + experience.id, experience: experience })
    }))
    .catch(err => callback(null, {
      statusCode: err.statusCode || 500,
      headers: { 'Content-Type': 'text/plain' },
      body: 'Could not fetch the experiences.'
    }));
};