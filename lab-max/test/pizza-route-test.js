'use strict';

const request = require('superagent');
const expect = require('chai').expect;
const Pizza = require('../model/pizza');

require('../server.js');

var pizza = {
  sauce: 'red',
  crust: 'thin',
  meat: 'pepperoni',
  cheese: 'cheddar',
};

describe('testing Pizza routes', function(){

  describe('testing an unregistered route', function(){
    it('should return a 404 error', function(done){
      request.get('localhost:3000/api/cats')
      .end((err, res) => {
        expect(res.status).to.equal(404);
        done();
      });
    });
  });

  describe('testing GET /api/pizza', function(){
    describe('testing valid route', function(){
      var tempPizza;
      before( done => {
        Pizza.createPizza(pizza)
        .then((pizza) => {
          tempPizza = pizza;
          done();
        })
        .catch( err => done(err));
      });

      after( done => {
        Pizza.deletePizza(tempPizza.id)
        .then(() => done())
        .catch( err => done(err));
      });

      it('should return a pizza', function(done){
        request.get(`localhost:3000/api/pizza?id=${tempPizza.id}`)
        .end((err, res) => {
          if(err) return done(err);
          expect(res.status).to.equal(200);
          expect(res.body.sauce).to.equal('red');
          expect(res.body.crust).to.equal('thin');
          expect(res.body.meat).to.equal('pepperoni');
          expect(res.body.cheese).to.equal('cheddar');
          done();
        });
      });
    });

    describe('testing for a request not found', function(){
      it('should return a 404 error', function(done){
        request.get('localhost:3000/api/pizza?id=1111')
        .end((err, res) => {
          expect(res.status).to.equal(404);
          done();
        });
      });
    });

    describe('testing for a bad request', function(){
      it('should return a 400 error', function(done){
        request.get('localhost:3000/api/pizza')
        .end((err, res) => {
          expect(res.status).to.equal(400);
          done();
        });
      });
    });
  });

  describe('testing POST /api/pizza', function(){
    describe('testing valid route', function(){
      var tempPizza;

      after( done => {
        Pizza.deletePizza(tempPizza.id)
        .then( () => done())
        .catch( err => done(err));
      });

      it('should return a pizza', function(done){
        request.post('localhost:3000/api/pizza')
        .send(pizza)
        .end((err, res) => {
          if(err) return done(err);
          tempPizza = res.body;
          expect(res.status).to.equal(200);
          expect(res.body.sauce).to.equal('red');
          expect(res.body.crust).to.equal('thin');
          expect(res.body.meat).to.equal('pepperoni');
          expect(res.body.cheese).to.equal('cheddar');
          done();
        });
      });
    });

    describe('testing bad request', function(){

      before( done => {
        pizza.meat = '';
        done();
      });

      after( done => {
        pizza.meat = 'pepperoni';
        done();
      });

      it('should return a 400 error', function(done){
        request.post('localhost:3000/api/pizza')
        .send(pizza)
        .end((err, res) => {
          console.log(res.status);
          expect(res.status).to.equal(400);
          expect(res.body.meat).to.equal(undefined);
          done();
        });
      });
    });
  });

  describe('testing PUT /api/pizza', function(){
    describe('testing valid route', function(){
      var tempPizza;

      before( done => {
        Pizza.createPizza(pizza)
        .then( pizza => {
          pizza.cheese = 'work';
          tempPizza = pizza;

          done();
        })
        .catch( err => done(err));
      });

      after( done => {
        Pizza.deletePizza(tempPizza.id)
        .then(() => done())
        .catch( err => done(err));
      });

      it('should return an updated pizza', function(done){
        request.put(`localhost:3000/api/pizza?id=${tempPizza.id}`)
        .send(tempPizza)
        .end((err, res) => {
          if (err) return done(err);
          expect(res.status).to.equal(200);
          expect(res.body.sauce).to.equal('red');
          expect(res.body.crust).to.equal('thin');
          expect(res.body.meat).to.equal('pepperoni');
          expect(res.body.cheese).to.equal('work');
          done();
        });
      });
    });

    describe('testing for bad PUT request', function(){
      var aPizza;

      before( done => {
        Pizza.createPizza(pizza)
        .then(pizza => {
          aPizza = pizza;
          done();
        })
        .catch( err => done(err));
      });

      after( done => {
        Pizza.deletePizza(aPizza.id);
        done();
      });

      it('should return a 400 error for invalid body', function(done){
        request.put(`localhost:3000/api/pizza?id=${aPizza.id}`)
        .set('Content-Type', 'application/json')
        .send('{')
        .end((err, res) => {
          expect(res.status).to.equal(400);
          done();
        });
      });
    });
  });
});
