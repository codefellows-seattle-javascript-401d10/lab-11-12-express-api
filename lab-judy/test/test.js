'use strict';

const request = require('superagent');
const expect = require('chai').expect;
const Person = require('../model/person.js');
const debug = require('debug')('person:test');
const createError = require('http-errors');


require('../server.js');

describe('testing person routes', function(){

  // * `GET` - test 404, responds with 'not found' for valid request made with an id that was not found
  it('should return status 404 for valid request with bad id', function(done){
    request.get('localhost:3000/api/person?id=badid')
    .end((err, res) => {
      expect(res.status).to.equal(404);
      done();
    });
  });
  // * `GET` - test 400, responds with 'bad request' if no id was provided in the request
  it('should return 400 if no id was provided in request', function(done){
    request.get('localhost:3000/api/person')
    .end((err, res) => {
      expect(res.status).to.equal(400);
      done();
    });
  });
  // * `GET` - test 200, response body like `{<data>}` for a request made with a valid id
  it('should return 200 for a request with a valid id', function(done){
    request.get('localhost:3000/api/person?id=acfbe580-8448-11e6-a4b2-255212c2f3c8')
    .end((err, res) => {
      expect(res.status).to.equal(200);
      done();
    });
  });
  // *TODO:  `PUT` - test 400, responds with 'bad request' for if no `body provided` or `invalid body`

  // * `PUT` - test 200, response body like  `{<data>}` for a post request with a valid body
  it('should return 200 for request with valid body', function(done){
    request.put('localhost:3000/api/person?id=3b5b02e0-844c-11e6-9cc7-a1624c463b1d')
    .end((err, res) => {
      expect(res.status).to.equal(200);
      done();
    });
  });
  // * TODO: `POST` - test 200, response body like  `{<data>}` for a post request with a valid body



});
