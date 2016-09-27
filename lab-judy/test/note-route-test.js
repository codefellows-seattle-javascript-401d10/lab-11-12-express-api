'use strict';

const request = require('superagent');
const expect = require('chai').expect;
const Person = require('../model/person.js');
const url = 'http://localhost:3000';

require('../server.js');

const examplePerson = {
  name: 'judy',
  age: '12',
};

describe('testing person routes', function(){
  describe('testing GET request to /api/person', function(){

  // * `GET` - test 404, responds with 'not found' for valid request made with an id that was not found
    it('should return status 404 for valid request with bad id', function(done){
      request.get(`${url}/api/person?id=badid`)
    .end((err, res) => {
      expect(res.status).to.equal(404);
      done();
    });
    });
  });

  describe('testing GET request to /api/person w/ no id provided', function(){
    // * `GET` - test 400, responds with 'bad request' if no id was provided in the request
    it('should return 400 if no id was provided in request', function(done){
      request.get(`${url}/api/person`)
      .end((err, res) => {
        expect(res.status).to.equal(400);
        done();
      });
    });
  });

  describe('testing for request made with valid id', function(){
    // * `GET` - test 200, response body like `{<data>}` for a request made with a valid id
    before(done => {
      Person.createPerson(examplePerson)
      .then(person => {
        this.tempPerson = person;
        done();
      })
      .catch( err => done(err));
    });
    //clean up the mocked person
    after(done => {
      Person.deletePerson(this.tempPerson.id)
      .then(() => done())
      .catch(err => done(err));
    });

    it('should return 200 for a request with a valid id', done => {
      request.get(`${url}/api/person?id=${this.tempPerson.id}`)
      .end((err, res) => {
        if (err) return done(err);
        expect(res.status).to.equal(200);
        expect(res.body.name).to.equal(examplePerson.name);
        expect(res.body.age).to.equal(examplePerson.age);
        done();
      });
    });
  });


  // *TODO:  `PUT` - test 400, responds with 'bad request' for if no `body provided` or `invalid body`
  describe('testing if no body provided or invalid body provided', function(){
    before(done => {
      Person.createPerson(examplePerson)
      .then(person => {
        this.tempPerson = person;
        done();
      })
      .catch( err => done(err));
    });
    //clean up the mocked person
    after(done => {
      Person.deletePerson(this.tempPerson.id)
      .then(() => done())
      .catch(err => done(err));
    });
    it('should return status 400 for no body provided or invalid body provided', done => {
      request.put(`${url}/api/person?id=${this.tempPerson.id}`)
      .set('Content-Type','application/json')
      .send('invalid body')
      .end((err, res) => {
        expect(res.status).to.equal(400);
        done();
      });
    });
  });

  // * `PUT` - test 200, response body like  `{<data>}` for a post request with a valid body
  describe('testing for put request with valid body', function(){
    before(done => {
      Person.createPerson(examplePerson)
      .then(person => {
        this.tempPerson = person;
        done();
      })
      .catch( err => done(err));
    });
    //clean up the mocked person
    after(done => {
      Person.deletePerson(this.tempPerson.id)
      .then(() => done())
      .catch(err => done(err));
    });

    it('should return 200 for request with valid body', done => {
      let updatedPerson = {name: 'updated', age: '45'};
      request.put(`${url}/api/person?id=${this.tempPerson.id}`)
      .send(updatedPerson)
      .end((err, res) => {
        expect(res.status).to.equal(200);
        expect(res.body.id).to.equal(this.tempPerson.id);
        for (var key in updatedPerson){
          expect(res.body[key]).to.equal(updatedPerson[key]);
        }
        done();
      });
    });
  });
  // * TODO: `POST` - test 200, response body like  `{<data>}` for a post request with a valid body
  describe('testing for post request with valid body', function(){
    before(done => {
      Person.createPerson(examplePerson)
      .then(person => {
        this.tempPerson = person;
        done();
      })
      .catch( err => done(err));
    });
    //clean up the mocked person
    after(done => {
      Person.deletePerson(this.tempPerson.id)
      .then(() => done())
      .catch(err => done(err));
    });
    it('should return a 200 status for post request with valid body', done => {
      request.post(`${url}/api/person`)
      .send(examplePerson)
      .end((err, res) => {
        if (err) return done (err);
        expect(res.status).to.equal(200);
        expect(!!res.body.id).to.equal(true);
        expect(res.body.name).to.equal(examplePerson.name);
        expect(res.body.age).to.equal(examplePerson.age);
        this.tempPerson = res.body;
        done();
      });

    });
  });
  // `POST` - test 400, responds with 'bad request' for if no `body provided` or `invalid body`
  describe('testing post for bad request if no body provided', function(){
    before(done => {
      Person.createPerson(examplePerson)
      .then(person => {
        this.tempPerson = person;
        done();
      })
      .catch(err => done(err));
    });
    after(done => {
      Person.deletePerson(this.tempPerson.id)
      .then( () => done())
      .catch(err => done(err));
    });
    it('should return 400 with bad post request for invalid body provided', done =>{
      request.post(`${url}/api/person?id=${this.tempPerson.id}`)
      .set('Content-Type','application/json')
      .send('invalid body')
      .end((err, res) => {
        expect(res.status).to.equal(400);
        done();
      });
    });
  });


});
