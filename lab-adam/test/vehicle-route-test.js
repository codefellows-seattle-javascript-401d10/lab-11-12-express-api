'use strict';

const request = require('superagent');
const expect = require('chai').expect;
const storage = require('../lib/storage.js');
const vehicle = require('../model/vehicle.js');

require('../server.js');

describe ('testing vehicle routes', function(){
  before('create vehicle for testing', function(done){
    var testVehicle = {
      rimSize: 23,
      type: 'sedan',
      brand: 'toyota',
      topSpeed: 135,
      id: 12345,
    };
    storage.createItem('vehicle', testVehicle);
    done();
  });
  describe('testing GET requests to /api/vehicle', function(){
    it('should return a 200 requests if valid ID provided', function(done){
      request.get('localhost:3000/api/vehicle?id=12345')
      .end((err, res) => {
        if (err) return done(err);
        expect(res.status).to.equal(200);
        done();
      });
    });
  });
});

// describe('testing vehicle routes', function(){
//   before('populating storage with dummy data', function(done){
//     request.post('localhost:3000/api/vehicle')
//     .send({name:'Roger Rabbit', height: 123, weight: 103, saying:'ehh whats up doc'})
//     .end((err) => {
//       if(err) return done(err);
//       done();
//     });
//   });
//   var vehicle = null;
//   describe('testing POST /api/vehicle', function(){
//     it('should create a new vehicle', function(done){
//       request.post('localhost:3000/api/vehicle')
//       .send({name: 'Bugs Bunny', height: 176, weight: 175, saying: 'th th thats all folks!'})
//       .end((err, res) => {
//         if(err) return done(err);
//         expect(res.status).to.equal(200);
//         expect(res.body.name).to.equal('Bugs Bunny');
//         expect(res.body.height).to.equal(176);
//         expect(res.body.weight).to.equal(175);
//         expect(res.body.saying).to.equal('th th thats all folks!');
//         vehicle = res.body;
//         done();
//       });
//     });
//     it('should return a 400 if no body provided', function(done){
//       request.post('localhost:3000/api/vehicle')
//       .send({})
//       .end((err, res) => {
//         expect(res.status).to.equal(400);
//         done();
//       });
//     });
//   });
//   describe('testing GET /api/vehicle', function(){
//     it('should return a vehicle', function(done){
//       request.get(`localhost:3000/api/vehicle?id=${vehicle.id}`)
//       .end((err, res) => {
//         if(err) return done(err);
//         expect(res.status).to.equal(200);
//         expect(res.body.name).to.equal('Bugs Bunny');
//         expect(res.body.height).to.equal(176);
//         expect(res.body.weight).to.equal(175);
//         expect(res.body.saying).to.equal('th th thats all folks!');
//         vehicle = res.body;
//         done();
//       });
//     });
//     it('should return a 404 status code for invalid IDs', function(done){
//       request.get('localhost:3000/api/vehicle?id=foobar')
//       .end((err, res) => {
//         expect(res.status).to.equal(404);
//         done();
//       });
//     });
//     it('should return a 400 if no ID provided', function(done){
//       request.get('localhost:3000/api/vehicle')
//       .end((err, res) => {
//         expect(res.status).to.equal(400);
//         done();
//       });
//     });
//     it('should return an array of available IDs for GET requests w/no ID', function(done){
//       request.get('localhost:3000/api/vehicle')
//       .end((err, res) => {
//         expect(res.body).to.be.instanceOf(Array);
//         done();
//       });
//     });
//   });
//   describe('testing DELETE /api/vehicle', function(){
//     it('should return a 204 when passed a valid ID', function(done){
//       request.delete(`localhost:3000/api/vehicle?id=${vehicle.id}`)
//       .end((err, res) => {
//         expect(res.status).to.equal(204);
//         done();
//       });
//     });
//     it('should return a 404 for invalid IDs', function(done){
//       request.delete('localhost:3000/api/vehicle?id=foobar')
//       .end((err, res) => {
//         expect(res.status).to.equal(404);
//         done();
//       });
//     });
//     it('should return a 400 if no ID', function(done){
//       request.delete('localhost:3000/api/vehicle')
//       .end((err, res) => {
//         expect(res.status).to.equal(400);
//         done();
//       });
//     });
//   });
//   describe('server response for not found routes', function(){
//     it('should return a 404 error for unregistered routes', function(done){
//       request.get('localhost:3000/foo/bar?id=wtf')
//       .end((err, res) => {
//         expect(res.status).to.equal(404);
//         done();
//       });
//     });
//   });
// });
