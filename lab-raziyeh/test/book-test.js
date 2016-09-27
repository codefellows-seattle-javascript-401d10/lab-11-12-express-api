'use strict';

const request = require('superagent');
const expect = require('chai').expect;

const storage = require('../lib/storage.js');

describe('testing Book Routes', function(){

  describe('POST requests tests', function(){

    // POST - test 200, response body like {<data>} for a post request with a valid body
    describe('testing POST /api/book', function(){
      it('save a new Book - POST', function(done){
        request.post('localhost:3000/api/book')
        .send({ title: 'HTML', author: 'Raziyeh', page: '350' })
        .end((err, res) => {
          if (err) return done(err);
          expect(res.status).to.equal(200);
          expect(res.body.title).to.equal('HTML');
          expect(res.body.author).to.equal('Raziyeh');
          expect(res.body.page).to.equal('350');
        });
        done();
      });
    });

    // POST - test 400, responds with 'bad request' for if no body provided or invalid body
    describe('testing POST /api/book', function(){
      it('expecting respond with bad request - POST', function(done){
        request.post('localhost:3000/api/book')
        .send({ISBN:'445555444'})
        .end((err, res) => {
          expect(res.status).to.equal(400);
          expect(res.text).to.be.equal('bad request');
        });
        done();
      });
    });
  });

  describe('GET requests tests', function(){
  // GET - test 404, responds with 'not found' for unregistered url
    describe('testing GET /api/book/unregistered', function() {
      it('expectinf to return an error with unregistered route - GET', function(done){
        request.get('/api/woow')
        .end((err, res) => {
          expect(res.status).to.equal(404);
          expect(res.text).to.equal('not found');
        });
        done();
      });
    });


    // GET - test 200, response body like {<data>} for a request made with a valid id
    // GET - test 404, responds with 'not found' for valid request made with an id that was not found
    describe('testing GET /api/book valid and unvalid id provided in the request', function(){
      var book;
      describe('test GET book with valid id', function() {
        before(done => {
          book = {
            id: '89e78be0-8442-11e6-ad93-1111111111',
            title: 'JavaScript',
            author: 'Raziyeh Bazargan',
            page: '120',
            creationDate: '2016-09-26T23:39:59.775Z',
          };
          
          storage.createItem('book' , book)
            .then( () =>  done())
            .catch(err => done(err));
        });

        after(done => {
          storage.deleteItem('book', book.id)
         .then( () =>  done())
         .catch(err => done(err));
        });
        
        // it('expecting to return an book with valid id - GET', function(done){
        //   request.get(`localhost:3000/api/book?id=${book.id}`)
        //     .end((err, res) => {
        //       expect(res.status).to.equal(200);
        //       expect(res.body.id).to.equal(book.id);
        //     });
        //   done();
        // });
      });

      it('expecting to return an error with unValid Id - GET', function(done){
        request.get('localhost:3000/api/person?id=89e78be0-8442-11e6-ad93-1111111111')
        .end((err, res) => {
          expect(res.status).to.equal(404);
          expect(res.text).to.equal('bad request');
        });
        done();
      });

      it('expecting to return an error with no id - GET', function(done){
        request.get('localhost:3000/api/person')
        .end((err, res) => {
          expect(res.status).to.equal(400);
          expect(res.text).to.equal('bad request');
        });
        done();
      });
    });

    // GET - test 400, responds with 'bad request' if no id was provided in the request
    describe('testing GET /api/book no id provided in the request', function(){
      it('expecting to return an error with no id - GET', function(done){
        request.get('localhost:3000/api/person?id=')
        .end((err, res) => {
          expect(res.status).to.equal(400);
          expect(res.text).to.equal('bad request');
        });
        done();
      });
    });

  });

  describe('PUT requests tests', function(){
    // PUT - test 400, responds with 'bad request' for if no body provided or invalid body
    // PUT - test 200, response body like {<data>} for a post request with a valid body
  });

});