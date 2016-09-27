'use strict';

const request = require('superagent');
//const uuid = require('node-uuid');
const expect = require('chai').expect;
//const storage = require('../lib/storage.js'); //for mocking the data
const Fruit = require('../model/fruit.js');
const url = 'http://localhost:3000';
require('../server.js');

const examplefruit = {name: 'apple', texture: 'shiny', color:'red'};

describe('testing fruit routes', function(){

  describe('testing GET /api/fruit', function(){
    describe('testing with a valid id', function() {
      before (done => { //before all tests are ran
        //mocking the list for the test
        Fruit.createFruit(examplefruit)
        .then(fruit => {
          this.tempfruit = fruit;
          done();
        })
        .catch(err => done(err));
      });

      //remove mocked list after all tests have completed
      after(done => {
        Fruit.deleteFruit(this.tempfruit.id)
        .then(() => done())
        .catch(err => done(err));
      });

      it ('should return a fruit', done => {
        request.get(`${url}/api/fruit/${this.tempfruit.id}`)
        .end((err, res) => {
          if (err) return done(err);
          expect(res.status).to.equal(200);
          expect(res.body.id).to.equal(this.tempfruit.id);
          expect(res.body.name).to.equal(this.tempfruit.name);
          expect(res.body.texture).to.equal(this.tempfruit.texture);
          expect(res.body.color).to.equal(this.tempfruit.color);
          done();
        });
      });
    });

    describe('with invalid id', function() {
      it ('Should respond with 404 - not found', function(done){
        request.get(`${url}/api/fruit/asdfasdf`)
        .end((err, res) => {
          expect(res.status).to.equal(404);
          done();
        });
      });
    });

  });
});
//
//
//     describe('with no id', function() {
//       it ('should respond with 400 - bad request', function(done){
//         request.get(`${url}/api/fruit`)
//         .end((err, res) => {
//           expect(res.status).to.equal(400);
//           done();
//         });
//       });
//     });
//
//     describe('testing POST /api/fruit', function(){
//       describe('with a valid body', function() {
//       //get rid of mocked data created wtih post request
//         after (done => {
//           if (this.tempfruit) {
//             fruit.deletefruit(this.tempfruit.id)
//             .then(() => done())
//             .catch(err =>done(err));
//           }
//         });
//
//         it ('should return a fruit', function(done){
//           request.post(`${url}/api/fruit`)
//           .send(examplefruit)
//           .end((err,res) => {
//             if (err) return done(err);
//             expect(res.status).to.equal(200);
//             expect(res.body.id).to.equal(true);
//             expect(res.body.title).to.equal(this.tempfruit.title);
//             expect(res.body.fruit).to.equal(this.tempfruit.fruit);
//             expect(res.body.date).to.equal(this.tempfruit.date);
//             this.tempfruit = res.body;
//             done();
//           });
//         });
//       });
//
//     });
//
//     describe('testing PUT requests to /api/fruit', function(){
//       describe('testing with a valid id and body', function() {
//         before (done => { //before all tests are ran
//           //mocking the list for the test
//           fruit.createfruit(examplefruit)
//           .then(fruit => {
//             this.tempfruit = fruit;
//             done();
//           })
//           .catch(err => done(err));
//         });
//
//         //remove mocked list after all tests have completed
//         after(done => {
//           if (this.tempfruit) {
//             fruit.deletefruit(this.tempfruit.id)
//             .catch(done);
//           }
//         });
//
//         it ('should return a fruit', done => {
//           let updateContent = {title: 'new title', fruit: 'new fruit', date: 'new date'};
//           request.put(`${url}/api/fruit/${this.tempfruit.id}`)
//           .send(updateContent) //send with updated content
//           .end((err,res) => {
//             if (err) return done(err);
//             expect(res.status).to.equal(200);
//             expect(res.body.id).to.equal(this.tempfruit.id);
//             for (var item in updateContent) {
//               expect(res.body[item].to.equal(updateContent[item]));
//             }
//             done();
//           });
//         });
//       });
//     });
//   });
//     //
//     // it ('should respond with 400 - bad request', function(done){
//     //   request.put(`${url}/api/fruit`)
//     //   .send({})
//     //   .end((err, res) => {
//     //     console.error('res status', res.status);
//     //     expect(res.status).to.equal(400);
//     //     expect(err).to.not.equal(null);
//     //     done();
//
//   //
//   // describe('testing DELETE /api/fruit', function(){
//   //   it ('should delete a file', function(done){
//   //     request.delete('localhost:3000/api/fruit?id=1234')
//   //     .send({})
//   //     .end((err, res) => {
//   //       expect(res.status).to.equal(400);
//   //       done();
//   //     });
//   //   });
//   // });
// });
