'use strict';

const request = require('superagent');
const expect = require('chai').expect;
const Portfolio = require('../model/portfolio.js');
const URL = 'http://localhost:3000';

require('../server.js');

const examplePortfolio = {
  about: 'I',
  projects: 'like',
  work: 'cats',
};

describe('testing portolio route', function(){
  describe('testing GET requests  to /api/portfolio', function(){
    describe('with valid id', function(){
      before(done => {
        Portfolio.createPortfolio(examplePortfolio)
        .then(portfolio => {
          this.tempPortfolio = portfolio;
          done();
        })
        .catch(err => done(err));
      });
      after(done => {
        Portfolio.deletePortfolio(this.tempPortfolio.id)
        .then(() => done())
        .catch(err => done(err));
      });
      it('should return a portfolio', done => {
        request.get(`${URL}/api/portfolio/${this.tempPortfolio.id}`)
        .end((err,res) => {
          if(err) return done(err);
          expect(res.status).to.equal(200);
          expect(res.body.id).to.equal(this.tempPortfolio.id);
          expect(res.body.about).to.equal(this.tempPortfolio.about);
          expect(res.body.projects).to.equal(this.tempPortfolio.projects);
          expect(res.body.work).to.equal(this.tempPortfolio.work);
          done();
        });
      });
    });
    describe('with invalid id', function(){
      it('should return 404 response for invalid GET', done => {
        request.get(`${URL}/api/portfolio/666`)
        .end((err,res) => {
          expect(res.status).to.equal(404);
          done();
        });
      });
    });
  });
  describe('testing POST /api/portfolio', function(){
    describe('with a valid body', function(){
      after( done => {
        if(this.tempPortfolio){
          Portfolio.deletePortfolio(this.tempPortfolio.id)
          .then(() => done())
          .catch(err => done(err));
        }
      });
      it('should return an updated portfolio', done => {
        request.post(`${URL}/api/portfolio`)
        .send(examplePortfolio)
        .end((err, res) => {
          if(err) return done(err);
          expect(res.status).to.equal(200);
          expect(!!res.body.id).to.equal(true);
          expect(res.body.about).to.equal(examplePortfolio.about);
          expect(res.body.projects).to.equal(examplePortfolio.projects);
          expect(res.body.work).to.equal(examplePortfolio.work);
          this.tempPortfolio = res.body;
          done();
        });
      });
      describe('testing POST with invalid id', function(){
        it('should return 404 response for invalid POST', done => {
          request.post(`${URL}/api/portfolio/666`)
          .end((err,res) => {
            expect(res.status).to.equal(404);
            done();
          });
        });
      });
    });
  });
  describe('testing PUT requests to  /api/portfolio', function(){
    describe('valid id and body', function(){
      before( done => {
        Portfolio.createPortfolio(examplePortfolio)
        .then( portfolio => {
          this.tempPortfolio = portfolio;
          done();
        })
        .catch(err => done(err));
      });
      after( done => {
        if(this.tempPortfolio){
          Portfolio.deletePortfolio(this.tempPortfolio.id)
          .then(() => done())
          .catch(done);
        }
      });
      it('should return an updated portfolio via PUT', done => {
        let updateData = {about: 'update', projects: 'updated', work: 'also updated'};
        request.put(`${URL}/api/portfolio/${this.tempPortfolio.id}`)
        .send(updateData)
        .end((err, res) => {
          if (err) return done(err);
          expect(res.status).to.equal(200);
          expect(res.body.id).to.equal(this.tempPortfolio.id);
          for(var key in updateData) {
            expect(res.body[key]).to.equal(updateData[key]);
          }
          done();
        });
      });
      it('should return a 400 for invalid PUT request', done => {
        let updateData = 'justastring';
        request.put(`${URL}/api/portfolio/${this.tempPortfolio.id}`)
        .set('Content-Type', 'application/json')
        .send(updateData)
        .end((err, res) => {
          expect(res.status).to.equal(400);
          done();
        });
      });
    });
  });
  describe('testing DELETE requests to /api/portfolio', function(){
    describe('with valid id', function(){
      before(done => {
        Portfolio.createPortfolio(examplePortfolio)
        .then(portfolio => {
          this.tempPortfolio = portfolio;
          done();
        })
        .catch(err => done(err));
      });
      after(done => {
        Portfolio.deletePortfolio(this.tempPortfolio.id)
        .then(() => done())
        .catch(err => done(err));
      });
      it('should return a status code of 204 upon DELETE', done => {
        request.delete(`${URL}/api/portfolio/${this.tempPortfolio.id}`)
        .end((err, res) => {
          expect(res.status).to.equal(204);
          done();
        });
      });
      describe('testing DELETE requests without id', function(){
        it('should return a status code of 404 for no id', done => {
          request.delete(`${URL}/api/portfolio/`)
          .end((err, res) => {
            expect(res.status).to.equal(404);
            done();
          });
        });
      });
    });
  });
});
