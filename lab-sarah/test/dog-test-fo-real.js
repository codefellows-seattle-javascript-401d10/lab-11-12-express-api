'use strict';

const expect = require('chai').expect;
const request = require('superagent');
const Dog = require('../model/dog.js');
const url = 'http://localhost:3000';
const debug = require('debug')('dog:dog-test-fo-real');

//start server
require('../server.js');

const exampleDog = {
  name: 'example',
  breed: 'husky',
  color: 'purple',
};

describe('testing dog route', function() {
  describe('testing GET requests to /api/dog', function(){
    describe('with a valid id', function(){
      debug('THIS HAS BEEN TESTED AND IS BEING REACHED');
      //make the temporary dog
      before(done => {
        Dog.createDog(exampleDog)
        .then(dog => {
          this.tempDog = dog;
          done();
        })
        .catch(err => done(err));
      });

      //delete the temporary dog
      after(done => {
        Dog.deleteDog(this.tempDog.id)
        .then(() => done())
        .catch(err => done(err));
      });

      it('should return a dog', done => {
        request.get(`${url}/api/dog/${this.tempDog.id}`)
        .end((err, res) => {
          if (err) return done(err);
          expect(res.status).to.equal(200);
          expect(res.body.id).to.equal(this.tempDog.id);
          expect(res.body.name).to.equal(this.tempDog.name);
          expect(res.body.breed).to.equal(this.tempDog.breed);
          expect(res.body.color).to.equal(this.tempDog.color);
          done();
        });
      });
    });

    describe('with invalid id', function(){
      it('should respond with 404 status', done => {
        var nonsense = '7575';
        request.get(`${url}/api/dog/${nonsense}`)
        .end((err, res) => {
          expect(res.status).to.equal(404);
          done();
        });
      });
    });
  });

  describe('testing POST requests to /api/dog', function(){
    describe('with a valid body', function(){
      after(done => {
        if (this.tempDog){
          Dog.deleteDog(this.tempDog.id)
          .then(() => done())
          .catch(err => done(err));
        }
      });

      it('should return a dog', done => {
        request.post(`${url}/api/dog`)
        .send(exampleDog)
        .end((err, res) => {
          if (err) return done(err);
          expect(res.status).to.equal(200);
          expect(!!res.body.id).to.equal(true);
          expect(res.body.name).to.equal(exampleDog.name);
          expect(res.body.breed).to.equal(exampleDog.breed);
          expect(res.body.color).to.equal(exampleDog.color);
          this.tempDog = res.body;
          done();
        });
      });
    });

    describe('with an invalid body', function(){
      it('should return a 404', done => {
        request.post(`${url}/api/dog`)
        .send('asdf')
        .end((err, res) => {
          expect(res.status).to.equal(400);
          done();
        });
      });
    });
  });

  describe('testing PUT requests to /api/dog', function(){
    describe('with a valid id and body', function(){
      before(done => {
        Dog.createDog(exampleDog)
        .then(dog => {
          // console.log('wtf is dog', dog);
          this.tempDog = dog;
          // console.log('wtf is tempDog', this.tempDog);
          done();
        })
        .catch(err => done(err));
      });

      // after(done => {
      //   if (this.tempDog) {
      //     Dog.deleteDog(this.tempDog.id)
      //     .then(() => done())
      //     .catch(done);
      //   }
      // });

      it ('should return an updated dog', done => {

        let updateData = {name: 'update', breed: 'whatever', color: 'rainbow'};

        debug('url:, `${url}/api/dog/${this.tempDog.id}` THERES GOT TO BE A BETTER WAY ', `${this.tempDog.id}`);



        request.put(`${url}/api/dog/${this.tempDog.id}`)
        .send(updateData)
        .end((err, res) => {
          debug('it block testing return of updated dog!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!', res.body.id);
          if (err) return done(err);
          expect(res.status).to.equal(200);
          expect(res.body.id).to.equal(this.tempDog.id);
          expect(res.body.name).to.equal(this.tempDog.name);
          expect(res.body.breed).to.equal(this.tempDog.breed);
          expect(res.body.color).to.equal(this.tempDog.color);
          // done();
        });

        done(); //this is when the test fails
      });

    });

    describe('with invalid json', function(){
      before(done => {
        Dog.createDog(exampleDog)
        .then(dog => {
          this.tempDog = dog;
          done();
        })
        .catch(err => done(err));
      });
      it('should return a 400 status', done => {
        let updateData = {};
        request.put(`${url}/api/dog/${this.tempDog.id}`)
        .send(updateData)
        .end((err, res) => {
          if (err) return done(err);
          expect(res.status).to.equal(400);
        });
        done();
      });
    });
  });

  before(done => {
    Dog.createDog(exampleDog)
    .then(dog => {
      // console.log('wtf is dog', dog);
      this.tempDog = dog;
      // console.log('wtf is tempDog', this.tempDog);
      done();
    })
    .catch(err => done(err));
  });

  describe('testing DELETE requests to /api/dog', function(){
    describe('with a valid id', function() {

      before(done => {
        Dog.createDog(exampleDog)
        .then(dog => {
          // console.log('wtf is dog', dog);
          this.tempDog = dog;
          // console.log('wtf is tempDog', this.tempDog);
          done();
        })
        .catch(err => done(err));
      });

      it('should return a status of 204', done => {
        console.log('tempDog.id in it 203 of DELETE', `${this.tempDog.id}`);
        request.delete(`${url}/api/dog/${this.tempDog.id}`)
        .end((err, res) => {
          expect(res.status).to.equal(204);
          done();
        });
        // done();
      });
    });

    describe('with an invalid id', function() {
      before(done => {
        Dog.createDog(exampleDog)
        .then(dog => {
          this.tempDog = dog;
          done();
        })
        .catch(err => done(err));
      });
    });
  });
});
