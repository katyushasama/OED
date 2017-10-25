/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/. */

const express = require('express');
const path = require('path');
const favicon = require('serve-favicon');
const logger = require('morgan');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const users = require('./routes/users');
const fileProcessing = require('./routes/fileProcessing');
const readings = require('./routes/readings');
const meters = require('./routes/meters');
const login = require('./routes/login');
const verification = require('./routes/verification');
const version = require('./routes/version');

const app = express();

app.use(favicon(path.join(__dirname, '..', 'client', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, '..', 'client')));

app.use('/api/users', users);
app.use('/api/meters', meters);
app.use('/api/readings', readings);
app.use('/api/login', login);
app.use('/api/verification', verification);
app.use('/api/fileProcessing', fileProcessing);
//    /api/fp/6
app.use('/api/version', version);

app.get('*', (req, res) => {
	res.sendFile(path.resolve(__dirname, '..', 'client', 'index.html'));
});

// catch 404 and forward to error handler
app.use((req, res, next) => {
	const err = new Error('Not Found');
	err.status = 404;
	next(err);
});

app.use((err, req, res) => {
	res.status(err.status || 500);
	if (err.status === 404) res.send(`<h1>${err.status} Not found</h1>`);
	else res.send(`<h1>${err.status} Server Error</h1>`);
});

module.exports = app;
