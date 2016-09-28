'use strict';

const request = require('superagent');
//const uuid = require('node-uuid');
const expect = require('chai').expect;
//const storage = require('../lib/storage.js'); //for mocking the data
const Fruit = require('../model/fruit.js');
const url = 'http://localhost:3000';

const examplefruit = {name: 'apple', texture: 'shiny', color:'red'};

require('../server.js');

describe('testing fruit routes', function(){

  describe('testing GET /api/fruit', function(){
    //before all tests are are run, create a fruit
    before (done => {
      //mocking the list for the test
      Fruit.createFruit(examplefruit)
      .then(fruit => {
        this.tempfruit = fruit;
        done();
      })
      .catch(err => done(err));
    });

    //remove mocked list after all tests have completed - runs after every test in each block
    after(done => {
      Fruit.deleteFruit(this.tempfruit.id)
      .then(() => done())
      .catch(err => done(err));
    });

    describe('testing with a valid id', () => {
      it ('should return a fruit with a valid id', done => {
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


    it ('Should respond with 404 - not found', function(done){
      request.get(`${url}/api/fruit/asdfasdf`)
      .end((err, res) => {
        expect(res.status).to.equal(404);
        done();
      });
    });
  });


  describe('testing POST /api/fruit', function(){
    //get rid of mocked data created wtih post request
    after (done => {
      Fruit.deleteFruit(this.tempfruit.id)
      .then(() => done())
      .catch(err =>done(err));
    });

    describe('with a valid body', () => {
      it ('should return a fruit', (done) => {
        request.post(`${url}/api/fruit`)
        .send(examplefruit)
        .end((err,res) => {
          if (err) return done(err);
          expect(res.status).to.equal(200);
          expect(res.body.name).to.equal(examplefruit.name);
          expect(res.body.texture).to.equal(examplefruit.texture);
          expect(res.body.color).to.equal(examplefruit.color);
          this.tempfruit = res.body;
          done();
        });
      });
    });

    it ('should respond with 400 - bad request', done => {
      request.post(`${url}/api/fruit/`)
      .send({})
      .end((err, res) => {
        console.error('res status', res.status);
        expect(res.status).to.equal(400);
        expect(err).to.not.equal(null);
        done();
      });
    });
  });

  describe('testing PUT requests to /api/fruit', function(){
    before (done => { //before all tests are ran
      //mocking the list for the test
      Fruit.createFruit(examplefruit)
      .then(fruit => {
        this.tempfruit = fruit;
        done();
      })
      .catch(err => done(err));
    });

    // remove mocked list after all tests have completed
    after(done => {
      Fruit.deleteFruit(this.tempfruit.id)
      .then(() => done())
      .catch(err => done(err));
    });

    describe('testing with a valid id and body', () => {

      it ('should return a fruit', done => {
        let updateContent = {name: 'new title', texture: 'new fruit', color: 'new date'};
        request.put(`${url}/api/fruit/${this.tempfruit.id}`)
        .send(updateContent) //send with updated content
        .end((err,res) => {
          if (err) return done(err);
          console.log('response body', res.body);
          console.log('temp fruit', this.tempfruit);
          expect(res.status).to.equal(200);
          expect(res.body.id).to.equal(this.tempfruit.id);
          for (var key in updateContent) {
            expect(res.body[key]).to.equal(updateContent[key]);
          }
          done();
        });
      });
    });//end of testing valid id and body

    it ('should respond with 400 - bad request', done => {
      let updateContent = 'asdfasdf';
      request.put(`${url}/api/fruit/${this.tempfruit.id}`)
      .set('Content-Type', 'application/json')
      .send(updateContent)
      .end((err, res) => {
        console.error('res status', res.status);
        expect(res.status).to.equal(400);
        expect(err).to.not.equal(null);
        done();
      });
    });
  });


  describe('testing DELETE /api/fruit', function(){
    before (done => { //before all tests are ran
      //mocking the list for the test
      Fruit.createFruit(examplefruit)
      .then(fruit => {
        this.tempfruit = fruit;
        done();
      })
      .catch(err => done(err));
    });

    it ('should respond with 204 successful deletion', done => {
      request.delete(`${url}/api/fruit/${this.tempfruit.id}`)
      .end((err, res) => {
        console.log(this.tempfruit.id);
        expect(res.status).to.equal(204);
        done();
      });
    });

    it ('should respond with 404 not found', done => {
      request.delete(`${url}/api/fruit/blerg`)
      .end((err, res) => {
        expect(res.status).to.equal(404);
        done();
      });
    });
  });


}); //end of first describe block
