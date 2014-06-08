var request = require('supertest');
var chai = require('chai');

var server = require('../server');
var models = require('../models');

var expect = chai.expect;

describe('Models', function () {
    it('should expose the table names', function () {
        expect(models.hasOwnProperty('message')).to.equal(true);
    })
});

describe('Server', function () {
    var agent;
    before(function (done) {
        server.start(5003);
        agent = request.agent('http://localhost:5003/api/')
        done();
    });

    it('should return json', function (done) {
        agent
            .get('client')
            .expect('Content-Type', 'application/json; charset=utf-8')
            .expect(200);
        done();
    });

    it('should return a list', function (done) {
        agent
            .get('message')
            .end(function (err, res) {
                if (err) return done(err);
                expect(res.body.hasOwnProperty('length')).to.equal(true);
                done();
            });
    });

    // write your own tests here

});

