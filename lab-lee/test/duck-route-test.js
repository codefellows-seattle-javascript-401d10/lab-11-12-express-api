'use strict';

const request = require('superagent');
const expect = require('chai').expect;
const Duck = require('../model/duck');
const url = 'http://localhost:3000';

const exampleDuck = {
  name: 'exampleduck',
  color: 'brown',
  feathers: '0',
  id: '12345678',

};

require('../server.js');

describe('testing duck routes', function() {

  describe('testing POST /api/duck', function() {

    after( done => {
      if (this.tempDuck) {
        Duck.deleteDuck(this.tempDuck.id)
        .then(() => done())
        .catch(err => done(err));
      }
    });

    it('should return a duck with status 200', done => {
      request.post(`${url}/api/duck`)
      .send(exampleDuck)
      .end((err, res) => {
        if (err) return done(err);
        expect(res.status).to.equal(200);
        expect(!!res.body.id).to.equal(true);
        expect(res.body.name).to.equal(exampleDuck.name);
        expect(res.body.color).to.equal(exampleDuck.color);
        expect(res.body.feathers).to.equal(exampleDuck.feathers);
        this.tempDuck = res.body;
        done();
      });
    });

    it('should 400 bad request', function(done) {
      request.post(`${url}/api/duck`)
      .send({name: '', color: '', feathers: ''})
      .end((err, res) => {
        expect(res.status).to.equal(400);
        done();
      });
    });
  });

  describe('testing GET /api/duck:id', function(){

    before( done => {
      Duck.createDuck(exampleDuck)
      .then( duck => {
        this.tempDuck = duck;
        done();
      })
      .catch(err => done(err));
    });

    after( done => {
      Duck.deleteDuck(this.tempDuck.id)
      .then(() => done())
      .catch(err => done(err));
    });

    it('should get a duck with a valid id and status 200', done => {
      request.get(`${url}/api/duck/${this.tempDuck.id}`)
      .end( (err, res) => {
        if (err) return done(err);
        expect(res.status).to.equal(200);
        expect(res.body.id).to.equal(this.tempDuck.id);
        expect(res.body.name).to.equal(this.tempDuck.name);
        expect(res.body.content).to.equal(this.tempDuck.content);
        done();
      });
    });

    it('should give a 200 and fetch array of ', (done) => {
      request.get('localhost:3000/api/duck/ ')
      .end( (err, res) => {
        expect(res.status).to.equal(200);
        done();
      });
    });

    it('should give a 404 invalid id', (done) => {
      request.get(`${url}/api/duck/nope`)
      .end( (err, res) => {
        expect(res.status).to.equal(404);
        done();
      });
    });
  });

  describe('testing PUT /api/duck if no file already', function() {

    before( done => {
      Duck.createDuck(exampleDuck)
      .then( duck => {
        this.tempDuck = duck;
        done();
      })
      .catch(done);
    });

    after( done => {
      if(this.tempDuck) {
        Duck.deleteDuck(this.tempDuck.id)
        .then(() => done())
        .catch(done);
      }
    });

    it('should return a duck with status 200', done => {
      let updateData = {name: 'larry', color: 'blue', feathers: '15'};
      request.put(`${url}/api/duck?id=${this.tempDuck.id}`)
      .send(updateData)
      .end((err, res) => {
        if (err) return done(err);
        expect(res.status).to.equal(200);
        expect(res.body.id).to.equal(this.tempDuck.id);
        for (var key in updateData) {
          expect(res.body[key]).to.equal(updateData[key]);
        }
        done();
      });
    });

    it('should 400 bad request', done => {
      let updateData = {};
      request.put(`${url}/api/duck?id=${updateData}`)
      .send(updateData)
      .end((err, res) => {
        expect(res.status).to.equal(400);
        done();
      });
    });
  });

  describe('testing DELETE /api/duck', function(){
    let duck;

    before( done => {
      Duck.createDuck( {
        name: 'larry',
        color: 'blue',
        feathers: '15',
      })
      .then( (_duck) => {
        duck = _duck;
        done();
      })
      .catch(err => done(err));
    });

    it('should get a duck with a valid id, delete it and status 200', function(done) {
      request.delete(`localhost:3000/api/duck?id=${duck.id}`)
      .end( (err, res) => {
        if (err) return done(err);
        expect(res.status).to.equal(200);
        done();
      });
    });

    it('should give a 400', function(done) {
      request.delete('localhost:3000/api/duck?id= ')
      .end( (err, res) => {
        expect(res.status).to.equal(400);
        console.log(res.body);
        done();
      });
    });

    it('should give a 404', function(done) {
      request.delete('localhost:3000/api/duck?id=not-exist')
      .end( (err, res) => {
        expect(res.status).to.equal(404);
        console.log(res.body);
        done();
      });
    });
  });

  describe('testing GET /api/duck/all', function() {
    let duck;

    before( done => {
      Duck.createDuck( {
        name: 'larry',
        color: 'blue',
        feathers: '15',
      })
      .then( (_duck) => {
        duck = _duck;
        done();
      })
      .catch(err => done(err));
    });

    after( done => {
      Duck.deleteDuck(duck.id)
      .then(() => done())
      .catch(err => done(err));
    });
  });
});
