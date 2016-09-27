'use strict';

const request = require('superagent');
const expect = require('chai').expect;

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


});


// * `PUT` - test 400, responds with 'bad request' for if no `body provided` or `invalid body`
// * `PUT` - test 200, response body like  `{<data>}` for a post request with a valid body
// * `POST` - test 400, responds with 'bad request' for if no `body provided` or `invalid body`
// * `POST` - test 200, response body like  `{<data>}` for a post request with a valid body
