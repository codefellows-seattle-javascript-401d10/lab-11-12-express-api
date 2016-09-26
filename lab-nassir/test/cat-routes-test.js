'use strict';

const request = require('superagent');
const expect = require('chai').expect;

require('../server');

describe('Testing cat routes', function() {
  beforeEach(function(){
    let cat = {
      id: 1234;
      name: 'Moggy';
      breed: 'Shorthair';
    }
  });
  describe('Testing POST /api/cat', function() {
    it('Should return a cat', function(done) {
      request.post('localhost:3000/api/cat')
      .send({name: 'Moggy', breed: 'Shorthair'})
      .end((err, res) => {
        if (err) return done(err);
        expect(res.status).to.equal(200);
        expect(res.body.name).to.equal('Moggy');
        expect(res.body.breed).to.equal('Shorthair');
        cat = res.body;
        done();
      });
    });

    it('Should return a 400 error and an error message (incorrect object)', function(done) {
      request.post('localhost:3000/api/cat')
      .send({name: 'Moggy', content: 'Shorthair'})
      .end((err, res) => {
        expect(res.status).to.equal(400);
        expect(res.text).to.equal('BadRequestError');
        expect(err).to.not.equal(null);
        done();
      });
    });

    it('Should return a 400 error and an error message (no object)', function(done) {
      request.post('localhost:3000/api/cat')
      .end((err, res) => {
        expect(res.status).to.equal(400);
        expect(res.text).to.equal('BadRequestError');
        expect(err).to.not.equal(null);
        done();
      });
    });
  });

  describe('Testing GET /api/cat', function() {
    it('Should return a cat', function(done) {
      request.get(`localhost:3000/api/cat?id=${cat.id}`)
      .end((err, res) => {
        if (err) return done(err);
        expect(res.status).to.equal(200);
        expect(res.body.name).to.equal('Moggy');
        expect(res.body.breed).to.equal('Shorthair');
        done();
      });
    });

    it('Should return a 404 status', function(done) {
      request.get('localhost:3000/api/cat?id=1234')
      .end((err, res) => {
        expect(res.status).to.equal(404);
        expect(res.text).to.equal('NotFoundError');
        expect(err).to.not.equal(null);
        done();
      });
    });

    it('Should return a 400 status', function(done) {
      request.get('localhost:3000/api/cat')
      .end((err, res) => {
        expect(res.status).to.equal(400);
        expect(res.text).to.equal('BadRequestError');
        expect(err).to.not.equal(null);
        done();
      });
    });
  });

  describe('Testing DELETE /api/cat', function(){
    it('Should return a 404 status (no id)', function(done){
      request.delete('localhost:3000/api/cat/?id=')
      .end((err, res) => {
        expect(res.status).to.equal(400);
        done();
      });
    });

    it('If successfully deleted, should return a 204 status', function(done){
      request.delete(`localhost:3000/api/cat?id=${cat.id}`)
      .end((err, res) => {
        expect(res.status).to.equal(204);
        done();
      });
    });
  });

  describe('Testing unregistered routes', function(){
    it('Should return a 404 status and an error message', function(done){
      request.get('localhost:3000/api/apples')
      .end((err, res) => {
        expect(res.status).to.equal(404);
        expect(res.text).to.equal('Cannot GET /api/apples\n');
        expect(err).to.not.equal(null);
        done();
        res.end();
      });
    });
  });

});
