const chaiHttp = require('chai-http');
const chai = require('chai');
let assert = chai.assert;
const server = require('../server');

chai.use(chaiHttp);

suite('Functional Tests', function() {

  test('Convertir 10L (GET)', function(done) {
    chai.request(server)
      .get('/api/convert')
      .query({input: '10L'})
      .end(function(err, res) {
        assert.equal(res.status, 200);
        assert.equal(res.body.initNum, 10);
        assert.equal(res.body.initUnit, 'L');
        assert.equal(res.body.returnUnit, 'gal');
        done();
      });
  });

  test('Entrada inválida (unidad)', function(done) {
    chai.request(server)
      .get('/api/convert')
      .query({input: '32g'})
      .end(function(err, res) {
        assert.equal(res.status, 200);
        assert.equal(res.body, 'invalid unit');
        done();
      });
  });

  test('Entrada inválida (número)', function(done) {
    chai.request(server)
      .get('/api/convert')
      .query({input: '3/2/3kg'})
      .end(function(err, res) {
        assert.equal(res.status, 200);
        assert.equal(res.body, 'invalid number');
        done();
      });
  });

  test('Entrada inválida (número y unidad)', function(done) {
    chai.request(server)
      .get('/api/convert')
      .query({input: '3/7.2/3kilomegagram'})
      .end(function(err, res) {
        assert.equal(res.status, 200);
        assert.equal(res.body, 'invalid number and unit');
        done();
      });
  });

  test('Sin número → default 1', function(done) {
    chai.request(server)
      .get('/api/convert')
      .query({input: 'kg'})
      .end(function(err, res) {
        assert.equal(res.status, 200);
        assert.equal(res.body.initNum, 1);
        assert.equal(res.body.initUnit, 'kg');
        assert.equal(res.body.returnUnit, 'lbs');
        done();
      });
  });

});
