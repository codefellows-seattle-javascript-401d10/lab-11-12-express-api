'use strict';

const request = require('superagent');
const expect = require('chai').expect;
const Book = require('../model/book');
const url = 'http://localhost:3000';

const exampleBook = {
  author: 'C.S.Lewis',
  title: 'The Magicians Nephew',
  description: 'Something about Narnia',
};

const updateBook = {
  author: 'R.F.Rankin',
  title: 'The Hollow Chocolate Bunnies of the Apocalypse',
  description: 'Poor Jack, toys can talk',
};

require('../server.js');

describe('testing book routes', function(){

  describe('testing DELETE /api/book', function(){

    describe('testing DELETE request with existing item', function(){

      before(done => {
        Book.createBook(exampleBook)
        .then(book => {
          this.tempBook = book;
          done();
        })
        .catch(err => done(err));
      });

      after(done => {
        if(this.tempBook){
          Book.deleteBook(this.tempBook.id)
          .then(() => done())
          .catch(err => done(err));
        }
      });

      it('should delete a book', done => {
        request.delete(`${url}/api/book/${this.tempBook.id}`)
        .end((err, res) => {
          if(err) return done(err);
          expect(res.status).to.equal(204);
          done();
        });
      });

      it('should return status 404: not found', done => {
        request.delete(`${url}/api/book/hippocampus`)
        .end((err, res) => {
          expect(res.status).to.equal(404);
          done();
        });
      });

    });

  });

  describe('testing GET /api/book', function(){

    describe('testing GET request with existing item', function(){

      before(done => {
        Book.createBook(exampleBook)
        .then(book => {
          this.tempBook = book;
          done();
        })
        .catch(err => done(err));
      });

      after(done => {
        Book.deleteBook(this.tempBook.id)
        .then(() => done())
        .catch(err => done(err));
      });

      it('should return a book', done => {
        request.get(`${url}/api/book/${this.tempBook.id}`)
        .end((err, res) => {
          if(err) return done(err);
          expect(res.status).to.equal(200);
          for(var key in this.tempBook){
            expect(res.body[key]).to.equal(this.tempBook[key]);
          }
          done();
        });
      });

      it('should return status 404: not found', done => {
        request.get(`${url}/api/book/hippocampus`)
        .end((err, res) => {
          expect(res.status).to.equal(404);
          done();
        });
      });

    });

  });

  describe('testing POST /api/book', function(){

    describe('with a valid body', function(){

      after(done => {
        if(this.tempBook){
          Book.deleteBook(this.tempBook.id)
          .then(() => done())
          .catch(err => done(err));
        }
      });

      it('should create a book', done => {
        request.post(`${url}/api/book`)
        .send(this.tempBook)
        .end((err, res) => {
          if(err) return done(err);
          expect(res.status).to.equal(200);
          for(var key in this.tempBook){
            expect(res.body[key].to.equal(this.tempBook[key]));
          }
          done();
        });
      });

    });

    describe('with invalid body', function(){

      it('should return status 400: expected author', done => {
        this.tempBook.author = '';
        request.post(`${url}/api/book`)
        .send(this.tempBook)
        .end((err, res) => {
          expect(res.status).to.equal(400);
          done();
        });
      });

      it('should return status 400: expected title', done => {
        this.tempBook.title = '';
        request.post(`${url}/api/book`)
        .send(this.tempBook)
        .end((err, res) => {
          expect(res.status).to.equal(400);
          done();
        });
      });

      it('should return status 400: expected description', done => {
        this.tempBook.description = '';
        request.post(`${url}/api/book`)
        .send(this.tempBook)
        .end((err, res) => {
          expect(res.status).to.equal(400);
          done();
        });
      });

    });

  });

  describe('testing PUT /api/book', function(){

    describe('with valid id and body', function(){

      before(done => {
        Book.createBook(exampleBook)
        .then(book => {
          this.tempBook = book;
          done();
        })
        .catch(err => done(err));
      });

      after(done => {
        Book.deleteBook(this.tempBook.id)
        .then(() => done())
        .catch(err => done(err));
      });

      it('should update the book', done => {
        request.put(`${url}/api/book/${this.tempBook.id}`)
        .send(updateBook)
        .end((err, res) => {
          if(err) return done(err);
          expect(res.status).to.equal(200);
          for(var key in updateBook){
            expect(res.body[key].to.equal(updateBook[key]));
          }
          done();
        });
      });

    });

    describe('with invalid id or body', function(){

      it('should return status 404: not found: bad id', done => {
        request.put(`${url}/api/book/hippocampus`)
        .send(updateBook)
        .end((err, res) => {
          if(err) return done(err);
          expect(res.status).to.equal(404);
          done();
        });
      });

      it('should return status 400: bad request: no content', done => {
        request.put(`${url}/api/book/${this.tempBook.id}`)
        .send({})
        .end((err, res) => {
          if(err) return done(err);
          expect(res.status).to.equal(400);
          done();
        });
      });

      it('should return status 400: bad request: no id', done => {
        request.put(`${url}/api/book/`)
        .send(updateBook)
        .end((err, res) => {
          if(err) return done(err);
          expect(res.status).to.equal(400);
          done();
        });
      });

    });

  });

});
