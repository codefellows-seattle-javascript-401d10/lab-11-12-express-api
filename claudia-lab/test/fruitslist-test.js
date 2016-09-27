'use strict';

const request = require('superagent');
const expect = require('chai').expect;
const storage = require('../lib/storage.js'); //for mocking the data


require('../server.js'); //starts the server - have to close server be

describe('testing fruitslist routes', function(){

  describe('testing POST /api/fruitslist', function(){

    it ('should return a fruitslist', function(done){
      request.post('localhost:3000/api/fruitslist')
      .send({title: 'My Favorite List', fruit: 'pineapple', date: '10/12'}) //if you pass in done, that means that an error has occurred
      .end((err,res) => {
        if (err) return done(err);
        expect(res.status).to.equal(200);
        expect(res.body.title).to.equal('My Favorite List');
        expect(res.body.fruit).to.equal('pineapple');
        expect(res.body.date).to.equal('10/12');
        done(); //get this otherwise timeout error
      });
    });

    it ('should return bad request', function(done){
      request.post('localhost:3000/api/fruitslist')
      .send({})
      .end((err, res) => {
        console.error('res status', res.status);
        expect(res.status).to.equal(400);
        expect(err).to.not.equal(null);
        done();
      });
    });
  });

  //pass a fruitslist with an id, test for name and content
  describe('testing GET /api/fruitslist', function(){

    describe('testing with a valid query', function() {
      before (done => {
        //var fruitslist = new fruitslist('fruitslist1', 'goose', 'dinner');
        var fruitslist = {
          id: '1234',
          title: 'My Favorite List',
          fruit: 'pineapple',
          date: '10/12',
        };
        storage.createItem('fruitslist', fruitslist)
        .then(() => done())
        .catch(err => done(err));
      });

      after(done => {
        storage.deleteItem('fruitslist', '1234') //so the storage doesn't include bullshit files from testing
        .then(() => done())
        .catch(err => done(err));
      });

      it ('should return a fruitslist', function(done){
        request.get('localhost:3000/api/fruitslist?id=1234')
        .end((err, res) => {
          if (err) return done(err);
          expect(res.status).to.equal(200);
          expect(res.body.title).to.equal('My Favorite List');
          expect(res.body.fruit).to.equal('pineapple');
          expect(res.body.date).to.equal('10/12');
          done();
        });
      });
      it ('should return not found', function(done){
        request.get('localhost:3000/api/fruitslist?id=102341293asdf8419238471')
          .end((err, res) => {
            expect(res.status).to.equal(404);
            done();
          });
      });

      it ('should return bad request', function(done){
        request.get('localhost:3000/api/fruitslist')
        .end((err, res) => {
          expect(res.status).to.equal(400);
          done();
        });
      });
    });
  });
  describe('testing PUT /api/fruitslist', function(){
    before (done => {
      //var fruitslist = new fruitslist('fruitslist1', 'goose', 'dinner');
      var fruitslist = {
        id: '1234',
        title: 'My Favorite List',
        fruit: 'pineapple',
        date: '10/12',
      };
      storage.createItem('fruitslist', fruitslist)
      .then(() => done())
      .catch(err => done(err));
    });

    after(done => {
      storage.deleteItem('fruitslist', '1234') //so the storage doesn't include bullshit files from testing
      .then(() => done())
      .catch(err => done(err));
    });

    it ('should return a request with a valid body', function(done){
      request.put('localhost:3000/api/fruitslist?id=1234')
      .end((err,res) => {
        if (err) return done(err);
        if (res.body) {
          expect(res.status).to.equal(200);
        }
        done(); //get this otherwise timeout error
      });
    });

    it ('should return bad request', function(done){
      request.put('localhost:3000/api/fruitslist')
      .send({})
      .end((err, res) => {
        console.error('res status', res.status);
        expect(res.status).to.equal(400);
        expect(err).to.not.equal(null);
        done();
      });
    });
  });

//   describe('testing DELETE /api/fruitslist', function(){
//     it ('should delete a file', function(done){
//       request.delete('localhost:3000/api/fruitslist?id=1234')
//       .send({})
//       .end((err, res) => {
//         expect(res.status).to.equal(400);
//         done();
//       });
//     });
//   });
});
