'use strict';

const request = require('superagent');
const expect = require('chai').expect;
const storage = require('../lib/storage');

require('../server');

const exampleCat = {
  id: '1234',
  name: 'Moggy',
  breed: 'Shorthair',
};
describe('Testing cat routes', function() {

  describe('Testing POST /api/cat', function() {
    it('Should return a cat', function(done) {
      request.post('localhost:3000/api/cat')
      .send({name: 'Pochi', breed: 'Persian'})
      .end((err, res) => {
        if (err) return done(err);
        expect(res.status).to.equal(200);
        expect(res.body.name).to.equal('Pochi');
        expect(res.body.breed).to.equal('Persian');
        storage.deleteItem('cat', res.body.id);
        done();
      });
    });

    it('Should return a 400 error and an error message (incorrect object)', function(done) {
      request.post('localhost:3000/api/cat')
      .send({name: 'Pochi', content: 'Persian'})
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
    before(done => {
      storage.createItem('cat', exampleCat)
      .then(cat => {
        this.tempCat = cat;
        done();
      })
      .catch(err => done(err));
    });
    after(done => {
      storage.deleteItem('cat', this.tempCat.id)
      .then(() => done())
      .catch(err => done(err));
    });
    it('Should GET a cat and status code 200', done => {
      request.get(`localhost:3000/api/cat/${this.tempCat.id}`)
      .end((err, res) => {
        if (err) return done(err);
        expect(res.status).to.equal(200);
        expect(res.body.name).to.equal('Moggy');
        expect(res.body.breed).to.equal('Shorthair');
        done();
      });
    });

    it('Should return a 404 status for an ID not found', done => {
      request.get('localhost:3000/api/cat/1235')
      .end((err, res) => {
        expect(res.status).to.equal(404);
        expect(res.text).to.equal('NotFoundError');
        expect(err).to.not.equal(null);
        done();
      });
    });

    it('Should return a 404 status for a missing ID', done => {
      request.get('localhost:3000/api/cat')
      .end((err, res) => {
        expect(res.status).to.equal(404);
        expect(res.text).to.equal('Cannot GET /api/cat\n');
        expect(err).to.not.equal(null);
        done();
      });
    });
  });

  describe('Testing PUT /api/cat', function(){
    before(done => {
      storage.createItem('cat', exampleCat)
      .then(cat => {
        this.tempCat = cat;
        done();
      })
      .catch(err => done(err));
    });
    after(done => {
      storage.deleteItem('cat', this.tempCat.id)
      .then(() => done())
      .catch(err => done(err));
    });
    it('Should return a new name and breed for Moggy, Shorthair', done => {
      request.put(`localhost:3000/api/cat/${this.tempCat.id}`)
      .set('Content-type', 'application/json')
      .send({name: 'Pochi', breed: 'Persian'})
      .end((err, res) => {
        expect(res.status).to.equal(200);
        expect(res.body.name).to.equal('Pochi');
        expect(res.body.breed).to.equal('Persian');
        done();
      });
    });

    it('Should return a 404 status and NotFoundError for an invalid id', done => {
      request.put('localhost:3000/api/cat/1235')
      .send({name: 'Pochi', breed: 'Persian'})
      .end((err, res) => {
        expect(res.status).to.equal(404);
        expect(res.text).to.equal('NotFoundError');
        done();
      });
    });

    it('Should return a 400 status and SyntaxError for an invalid or missing JSON object', done => {
      request.put('localhost:3000/api/cat/1234')
      .set('Content-type', 'application/json')
      .send('{')
      .end((err, res) => {
        expect(res.status).to.equal(400);
        expect(res.text).to.equal('SyntaxError');
        done();
      });
    });
  });

  describe('Testing DELETE /api/cat', function(){
    before(done => {
      storage.createItem('cat', exampleCat)
      .then(cat => {
        this.tempCat = cat;
        done();
      })
      .catch(err => done(err));
    });
    // after(done => {
    //   storage.deleteItem('cat', this.tempCat.id)
    //   .then(() => done())
    //   .catch(err => done(err));
    // });
    it('Should return a 204 and no message for a successful delete', done => {
      request.delete(`localhost:3000/api/cat/${this.tempCat.id}`)
      .end((err, res) => {
        expect(res.status).to.equal(204);
        done();
      });
    });
    it('Should return a 404 for an invalid ID', done => {
      request.delete('localhost:3000/api/cat/124465')
      .end((err, res) => {
        expect(res.status).to.equal(404);
        expect(res.text).to.equal('NotFoundError');
        done();
      });
    });
    it('Should return a 404 for a missing ID', done => {
      request.delete('localhost:3000/api/cat/')
      .end((err, res) => {
        expect(res.status).to.equal(404);
        expect(res.text).to.equal('Cannot DELETE /api/cat/\n');
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
