'use strict';

const request = require('superagent');
const expect = require('chai').expect;
const Vehicle = require('../model/vehicle.js');

require('../server.js');

var vehicle = {
  type: 'sedan',
  brand: 'toyota',
  rimSize: 23,
  topSpeed: 135,
};

describe ('testing vehicle routes', function(){
  var testVehicle;
  describe('testing GET requests to api/note', function(){
    describe('with valid id', function() {
      before(done => {
        Vehicle.createVehicle(vehicle)
        .then((vehicle) => {
          testVehicle = vehicle;
          done();
        })
        .catch(err => done(err));
      });
      after(done => {
        Vehicle.deleteVehicle(testVehicle.id)
        .then(() => done())
        .catch(err => done(err));
      });
      it('should return a 200 and a note', function(done){
        request.get(`localhost:3000/api/vehicle?id=${testVehicle.id}`)
        .end((err, res) => {
          if (err) return done(err);
          expect(res.status).to.equal(200);
          expect(res.body.id).to.equal(testVehicle.id);
          expect(res.body.rimSize).to.equal(testVehicle.rimSize);
          done();
        });
      });
    });
    describe('with invalid ID', function() {
      it('should return a 404 status code', function(done){
        request.get('localhost:3000/api/vehicle?id=foobar')
        .end((err, res) => {
          expect(res.status).to.equal(404);
          done();
        });
      });
    });
    describe('with no ID', function() {
      // COMMENTED OUT THE 400 TEST TO ALLOW FOR THE EXTRA CREDIT
      // it('should return a 400', function(done){
      //   request.get('localhost:3000/api/vehicle')
      //   .end((err, res) => {
      //     expect(res.status).to.equal(400);
      //     done();
      //   });
      // });
      it('should return an array of available IDs', function(done){
        request.get('localhost:3000/api/vehicle')
         .end((err, res) => {
           expect(res.body).to.be.instanceOf(Array);
           done();
         });
      });
    });
  });
  describe('testing PUT /api/vehicle', function(){
    describe('with valid body', function(){
      before(done => {
        Vehicle.createVehicle(vehicle)
        .then((vehicle) => {
          testVehicle = vehicle;
          done();
        })
        .catch(err => done(err));
      });
      after(done => {
        if(testVehicle) {
          Vehicle.deleteVehicle(testVehicle.id)
          .then(() => done())
          .catch(done);
        }
      });
      it('should return a note', function(done){
        let changedVehicle = {rimSize: 19, brand:'honda', topSpeed:80};
        request.put(`localhost:3000/api/vehicle?id=${testVehicle.id}`)
        .send(changedVehicle)
        .end((err, res) => {
          if (err) return done(err);
          expect(res.body.rimSize).to.equal(19);
          expect(res.body.brand).to.equal('honda');
          expect(res.body.topSpeed).to.equal(80);
          expect(res.body.id).to.equal(testVehicle.id);
          done();
        });
      });
    });
    describe('with no body', function() {
      before(done => {
        Vehicle.createVehicle(vehicle)
        .then((vehicle) => {
          testVehicle = vehicle;
          done();
        })
        .catch(err => done(err));
      });
      it('should return a 400 for invalid body', function(done){
        request.put(`localhost:3000/api/vehicle?id=${testVehicle.id}`)
        .set('Content-Type','application/json')
        .send('not a json object')
        .end((err, res) => {
          expect(res.status).to.equal(400);
          done();
        });
      });
    });
  });
  describe('testing POST /api/vehicle', function(){
    var tempVehicle;
    describe('with a valid body', function(){
      after(done => {
        if(tempVehicle) {
          Vehicle.deleteVehicle(tempVehicle.id)
          .then(() => done())
          .catch(err => done(err));
        }
      });
      it('should return a note', done => {
        request.post('localhost:3000/api/vehicle')
        .send(vehicle)
        .end((err, res) => {
          if (err) return done(err);
          expect(res.status).to.equal(200);
          expect(!!res.body.id).to.equal(true);
          expect(res.body.brand).to.equal('toyota');
          expect(res.body.rimSize).to.equal(23);
          tempVehicle = res.body;
          done();
        });
      });
    });
    describe('with no body', function() {
      it('should return a 400', function(done){
        request.post('localhost:3000/api/vehicle')
        .send({'bad':'json'})
        .end((err, res) => {
          expect(res.status).to.equal(400);
          done();
        });
      });
    });
  });
  describe('testing DELETE /api/vehicle', function(){
    describe('with valid ID', function(){
      it('should return a 200', function(done){
        request.delete(`localhost:3000/api/vehicle?id=${testVehicle.id}`)
        .end((err, res) => {
          expect(res.status).to.equal(200);
          done();
        });
      });
    });
    describe('with invalid id', function() {
      it('should return a 404', function(done){
        request.delete('localhost:3000/api/vehicle?id=foobar')
        .end((err, res) => {
          expect(res.status).to.equal(404);
          done();
        });
      });
    });
    describe('with no id', function() {
      it('should return a 400', function(done){
        request.delete('localhost:3000/api/vehicle')
        .end((err, res) => {
          expect(res.status).to.equal(400);
          done();
        });
      });
    });
  });
});
