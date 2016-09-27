'use strict';

const request = require('superagent');
const expect = require('chai').expect;
const storage = require('../lib/storage');

require('../server.js');

describe('testing book routes', function(){

  describe('testing POST /api/book', function(){

    it('should create a book', function(done){
      request.post('localhost:3000/api/book')
      .send({
        author: 'C.S.Lewis',
        title: 'The Magicians Nephew',
        description: 'Something about Narnia',
      })
      .end((err, res) => {
        if(err) return done(err);
        expect(res.status).to.equal(200);
        expect(res.body.author).to.equal('C.S.Lewis');
        expect(res.body.title).to.equal('The Magicians Nephew');
        expect(res.body.description).to.equal('Something about Narnia');
        done();
      });
    });

    it('should return status 400: bad request', function(done){
      request.post('localhost:3000/api/book')
      .send({
        author: '',
        title: 'The Magicians Nephew',
        description: 'Something about Narnia',
      })
      .end((err, res) => {
        expect(res.status).to.equal(400);
        done();
      });
    });

    it('should return status 400: bad request', function(done){
      request.post('localhost:3000/api/book')
      .send({
        author: 'C.S.Lewis',
        title: '',
        description: 'Something about Narnia',
      })
      .end((err, res) => {
        expect(res.status).to.equal(400);
        done();
      });
    });

    it('should return status 400: bad request', function(done){
      request.post('localhost:3000/api/book')
      .send({
        author: 'C.S.Lewis',
        title: 'The Magicians Nephew',
        description: '',
      })
      .end((err, res) => {
        expect(res.status).to.equal(400);
        done();
      });
    });

    it('should return status 400: bad request', function(done){
      request.post('localhost:3000/api/book')
      .send({})
      .end((err, res) => {
        expect(res.status).to.equal(400);
        done();
      });
    });

  });

  describe('testing GET /api/book', function(){

    describe('testing GET request with existing item', function(){

      before (done => {
        var book = {
          id: '1330',
          author: 'C.S.Lewis',
          title: 'The Magicians Nephew',
          description: 'Something about Narnia',
        };
        storage.createItem('book', book)
        .then(() => done())
        .catch(err => done(err));
      });

      after(done => {
        storage.deleteItem('book', '1330')
        .then(() => done())
        .catch(err => done(err));
      });

      it('should return a book', function(done){
        request.get('localhost:3000/api/book?id=1330')
        .end((err, res) => {
          if(err) return done(err);
          expect(res.status).to.equal(200);
          expect(res.body.author).to.equal('C.S.Lewis');
          expect(res.body.title).to.equal('The Magicians Nephew');
          expect(res.body.description).to.equal('Something about Narnia');
          done();
        });
      });

      it('should return status 404: not found', function(done){
        request.get('localhost:3000/api/book?id=hippocampus')
        .end((err, res) => {
          expect(res.status).to.equal(404);
          done();
        });
      });

      it('should return status 400: bad request', function(done){
        request.get('localhost:3000/api/book')
        .end((err, res) => {
          expect(res.status).to.equal(400);
          done();
        });
      });
    });

  });

});
