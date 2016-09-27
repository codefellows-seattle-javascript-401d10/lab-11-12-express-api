'use strict';


const request = require('superagent');
const expect = require('chai').expect;
const storage = require('../lib/storage');

require('../server.js');

describe('testing dog routes', function(){
  //take this line out, and create and delete mock data within tests with before and after blocks
  describe('testing POST /api/dog', function(){
    it('should return a dog', function(done){
      request.post('localhost:3000/api/dog')
      .send({id: '4747', name: 'Piper', breed: 'Husky', color: 'Black and white'})
      .end((err, res) => {
        if (err) return done(err);
        expect(res.status).to.equal(200);
        console.log('body',res.body);
        expect(res.body.name).to.equal('Piper');
        expect(res.body.breed).to.equal('Husky');
        expect(res.body.color).to.equal('Black and white');
        done();
      });
    });

    it('should return a response status of 400', function(done){
      request.post('localhost:3000/api/dog')
      .send({leg: 'asdf'})
      .end((err, res) => {
        console.error('res.status', res.status);
        expect(res.status).to.equal(400);
        done();
      });
    });
  });

  describe('testing PUT /api/dog', function(){
    it('should return an updated dog', function(done){
      request.put('localhost:3000/api/dog')
      .send({id: '4747', name: 'Barney', breed: 'mastiff', color: 'brown'})
      .end((err, res) => {
        //res.body is undefined
        console.log('res.status of PUT to update', res.body);
        // expect(res.status).to.equal('200');
        expect(res.body.name).to.equal('Barney');
        expect(res.body.breed).to.equal('mastiff');
        expect(res.body.color).to.equal('brown');
        done();
      });
    });

    it('should return a status of 400', function(done){
      request.put('localhost:3000/api/dog')
      .send({})
      .end((err, res) => {
        expect(res.status).to.equal('400');
        done();
      });
    });
  });

  describe('testing GET /api/recipe', function(){
    describe('with valid query', function() {
      before(done => {
        var dog = {
          id: '8888',
          name: 'Macy',
          breed: 'Pitbull',
          color: 'White and brown',
        };

        storage.createItem('dog', dog)
        .then(() => done())
        .catch(err => done(err));
      });

      // after(done => {
      //   storage.deleteItem('dog', '8888')
      //   .then(() => done())
      //   .catch(err => done(err));
      // });

      it('should return a macy dog', function(done){
        request.get('localhost:3000/api/dog?id=4747')
        .end((err, res) => {
          if (err) return done(err);
          expect(res.status).to.equal(200);
          expect(res.body.name).to.equal('Macy');
          expect(res.body.breed).to.equal('Pitbull');
          expect(res.body.color).to.equal('White and brown');
          done();
        });
      });
    });

    it('should return a status of 400', function(done){
      request.get('localhost:3000/api/dog')
      .end((err,res) => {
        expect(res.status).to.equal(400);
        done();
      });
    });

    it('should return a status of 404', function(done) {
      request.get('localhost:3000/api/dog?id=kitteh')
      .end((err,res) => {
        expect(res.status).to.equal(404);
        done();
      });
    });
  });
});

describe('testing unregistered routes', function(){
  it('should return a status of 404', function(done){
    request.get('localhost:3000/api/nonsense/route')
    .end((err, res) => {
      expect(res.status).to.equal(404);
      done();
    });
  });
});
