'use strict';

const request = require('superagent');
const expect = require('chai').expect;
const uuid = require('node-uuid');
const storage = require('../lib/storage');
const Portfolio = require('../model/portfolio.js');
const URL = 'http://localhost:3000';

const examplePortfolio = {
  about: 'I',
  projects: 'like',
  work: 'cats',
};

describe('testing note route', function(){
  describe('testing GET requests  to /api/portfolio', function(){
    describe('with valid id', function(){
      before(done => {
        Portfolio.createPortfolio(examplePortfolio)
        .then(portfolio => {
          this.tempPortfolio = portfolio;
          done();
        })
        .catch(err => done(err))
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
      it('should return 404 response', done => {
        request.get(`${URL}/api/portfolio/666`)
        .end((err,res) => {
          if(err) return done(err);
          expect(res.status).to.equal(404);
          done();
        });
      });
    });
    describe('with no id', function(){

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
      it('should return a portfolio', done => {
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
    });
  });
});
