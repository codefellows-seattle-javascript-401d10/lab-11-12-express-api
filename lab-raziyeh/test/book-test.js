'use strict';

const request = require('superagent');
const expect = require('chai').expect;
const Book = require('../model/book.js');
const url = 'http://localhost:3000';
const exampleBook = {
  title: 'JavaScript-2',
  author: 'Raziyeh Bazargan',
  page: '120',
  creationDate: '2016-09-26T23:39:59.775Z',
};

//start the server
require('../server.js');

describe('testing Book Routes', function(){
  var tempBook;
  describe('GET requests tests', function(){
    describe('testing GET /api/book/unregistered', function() {
      it('expecting to return an error with unregistered route - GET', function(done){
        request.get(`${url}/api/woow`)
        .end((err, res) => {
          expect(res.status).to.equal(404);
          expect(res.err).to.not.null;
          done();
        });
      });
    });

    describe('testing GET /api/book valid id provided in the request', function(){
      before(done => {
        Book.createItem(exampleBook)
          .then( book => {
            tempBook = book;
            done();
          })
          .catch(err => done(err));
      });
      after(done => {
        Book.deleteItem(tempBook.id)
          .then( () => done())
          .catch(err => done(err));
      });

      it('expecting to return an book with valid id - GET', (done) => {
        request.get(`${url}/api/book/${tempBook.id}`)
            .end((err, res) => {
              if(err) return done(err);
              expect(res.status).to.equal(200);
              expect(res.body.id).to.equal(tempBook.id);
              expect(res.body.title).to.equal(tempBook.title);
              expect(res.body.page).to.equal(tempBook.page);
              done();
            });
      });
    });

    describe('testing GET /api/book invalid id  in the request', function(){
      it('expecting to return an error with unValid Id - GET', function(done){
        request.get(`${url}/api/book/01234`)
        .end((err, res) => {
          expect(res.status).to.equal(404);
          done();
        });
      });
    });
  });

  describe('POST requests tests', function() {

    describe('testing POST with a valid body /api/book', function() {

      after(done => {
        if(tempBook) {
          Book.deleteItem('book', tempBook.id)
          .then(() => done())
          .catch(err => done(err));
        }
      });

      it('expecting create a new Book - POST', (done) => {
        request.post(`${url}/api/book`)
        .send(tempBook)
        .end((err, res) => {
          if (err) return done(err);
          expect(res.status).to.equal(200);
          expect(!!res.body.id).to.equal(true);
          expect(res.body.title).to.equal(tempBook.title);
          expect(res.body.author).to.equal(tempBook.author);
          this.tempBook = res.body;
          done();
        });
      });
    });

    describe('testing POST /api/book', function(){
      before(done => {
        exampleBook.title = null;
        done();
      });

      after(done => {
        exampleBook.title = 'JavaScript-2';
        done();
      });

      it('expecting respond with bad request - POST', function(done){
        request.post(`${url}/api/book`)
        .send(exampleBook)
        .end((err, res) => {
          expect(res.status).to.equal(400);
          done();
        });
      });
    });
  });

  describe('Testing PUT requests to api/book', function(){
    describe('valid id and body', function() {
      before( done => {
        Book.createItem(exampleBook)
        .then(book => {
          this.tempBook = book;
          done();
        })
        .catch(err => done(err));
      });

      after(done => {
        if(this.tempBook) {
          Book.deleteItem(this.tempBook.id)
         .then(() => done())
         .catch(err => done(err));
        }
      });

      it('should return an book update', (done) => {
        let updateData = { title: 'up date', author: 'fizzbuzz', page:'222' };
        request.put(`${url}/api/book/${this.tempBook.id}`)
        .send(updateData)
        .end((err, res) => {
          if (err) return done(err);
          expect(res.status).to.equal(200);
          expect(res.body.id).to.equal(this.tempBook.id);
          for (var key in updateData) {
            expect(res.body[key]).to.equal(updateData[key]);
          }
          done();
        });
      });
    });
    describe('Expecting bad request - PUT', function(){
      it('expecting respond with bad request - PUT', function(done){
        request.put(`${url}/api/book?id=${tempBook.id}`)
        .send({ISBN:'445555444'})
        .end((err, res) => {
          expect(res.status).to.equal(404);
          done();
        });
      });
    });
  });

  //DELETE - test 204, with an empty response body for DELETE request with a valid id
  describe('Testing DELETE requests to api/book', function() {
    before(done => {
      Book.createItem(exampleBook)
          .then( book => {
            this.tempBook = book;
            done();
          })
          .catch(err => done(err));
    });
    it('expecting to delete a book with id provided', (done) => {
      request.delete(`${url}/api/book/${this.tempBook.id}`)
       .end((err, res) => {
         expect(res.status).to.equal(204);
         done();
       });
    });
  });+This app allows clients to connect to the API and perform the following operations on the /api/vehicles path:
 +- GET: takes an ID (e.g. /api/vehicles/:id)
 +- POST: takes a body JSON object with the properties listed below
 +- PUT: takes an ID and body JSON; modifies an existing object with the provided JSON.
 +- DELETE: takes an ID and deletes the object corresponding to the ID.
 +

  // describe('Testing DELETE requests to api/book', function() {
  //   it('expecting 404 for invalid or missing id ', function(done) {
  //     request.delete(`${url}/api/book/0000`)
  //      .end((err, res) => {
  //        expect(res.status).to.equal(404);
  //        done();
  //      });
  //   });
  // });
});
