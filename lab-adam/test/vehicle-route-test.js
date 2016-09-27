'use strict';

const request = require('superagent');
const expect = require('chai').expect;
const Vehicle = require('../model/vehicle.js');

require('../server.js');

describe ('testing vehicle routes', function(){
  var testVehicle;
  describe('data construction and removal for testing', function(){
    var vehicle = {
      type: 'sedan',
      brand: 'toyota',
      rimSize: 23,
      topSpeed: 135,
    };
    before('create vehicle', function(done){
      Vehicle.createVehicle(vehicle)
      .then((vehicle) => {
        testVehicle = vehicle;
        done();
      });
    });
    describe('testing GET requests to /api/vehicle', function(){
      it('should return a 200 requests if valid ID provided', function(done){
        request.get(`localhost:3000/api/vehicle?id=${testVehicle.id}`)
        .end((err, res) => {
          if (err) return done(err);
          expect(res.status).to.equal(200);
          done();
        });
      });
      it('should return a 404 status code for invalid IDs', function(done){
        request.get('localhost:3000/api/vehicle?id=foobar')
         .end((err, res) => {
           expect(res.status).to.equal(404);
           done();
         });
      });
      it('should return a 400 if no ID provided', function(done){
        request.get('localhost:3000/api/vehicle')
         .end((err, res) => {
           expect(res.status).to.equal(400);
           done();
         });
      });
      it('should return an array of available IDs for GET requests w/no ID', function(done){
        request.get('localhost:3000/api/vehicle')
         .end((err, res) => {
           console.log(res.body);
           expect(res.body).to.be.instanceOf(Array);
           done();
         });
      });
    });
    describe('testing POST /api/vehicle', function(){
      it('should create a new vehicle', function(done){
        request.post('localhost:3000/api/vehicle')
       .send(vehicle)
       .end((err, res) => {
         if(err) return done(err);
         expect(res.status).to.equal(200);
         expect(res.body.rimSize).to.equal(23);
         done();
       });
      });
      it('should return a 400 for no body or invalid body', function(done){
        request.post('localhost:3000/api/vehicle')
       .send({'bad':'json'})
       .end((err, res) => {
         expect(res.status).to.equal(400);
         done();
       });
      });
    });
    before('create vehicle', function(done){
      Vehicle.createVehicle(vehicle)
      .then((vehicle) => {
        testVehicle = vehicle;
        done();
      })
      .catch( err => done(err));
    });
    describe('testing PUT requests to /api/vehicle', function(){
      it('should return a 200 request if valid ID provided', function(done){
        testVehicle.rimSize = 18;
        request.put(`localhost:3000/api/vehicle?id=${testVehicle.id}`)
        .send(testVehicle)
        .end((err, res) => {
          if (err) return done(err);
          expect(res.body.rimSize).to.equal(18);
          done();
        });
      });
      it('should return a 400 for no body or invalid body', function(done){
        request.put('localhost:3000/api/vehicle')
       .send({'bad':'json'})
       .end((err, res) => {
         expect(res.status).to.equal(400);
         done();
       });
      });
    });
    before('create vehicle', function(done){
      Vehicle.createVehicle(vehicle)
      .then((vehicle) => {
        testVehicle = vehicle;
        done();
      })
      .catch( err => done(err));
    });
    describe('testing DELETE /api/vehicle', function(){
      it('should return a 204 when passed a valid ID', function(done){
        console.log(testVehicle.id);
        request.delete(`localhost:3000/api/vehicle?id=${testVehicle.id}`)
        .end((err, res) => {
          console.log(res.status);
          expect(res.status).to.equal(200);
          done();
        });
      });
      it('should return a 404 for invalid IDs', function(done){
        request.delete('localhost:3000/api/vehicle?id=foobar')
        .end((err, res) => {
          expect(res.status).to.equal(404);
          done();
        });
      });
      it('should return a 400 if no ID', function(done){
        request.delete('localhost:3000/api/vehicle')
        .end((err, res) => {
          expect(res.status).to.equal(400);
          done();
        });
      });
    });
  });
});
