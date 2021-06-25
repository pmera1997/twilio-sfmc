const JWT = require('jsonwebtoken');

module.exports = (body) => {
  if (!body) {
    return new Error('invalid jwtdata');
  }

  return JWT.verify(body.toString('utf8'), process.env.JWT, {
    algorithm: 'HS256',
  });
};

/*'use strict';

module.exports = (body, secret, cb) => {
	if (!body) {
		return cb(new Error('invalid jwtdata'));
	}

	require('jsonwebtoken').verify(body.toString('utf8'), secret, {
		algorithm: 'HS256'
	}, cb);
};*/
