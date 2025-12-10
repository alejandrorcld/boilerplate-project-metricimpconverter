const chai = require('chai');
let assert = chai.assert;
const ConvertHandler = require('../controllers/convertHandler.js');

let convertHandler = new ConvertHandler();

suite('Unit Tests', function(){
  test('Debe leer un número entero', function() {
    assert.equal(convertHandler.getNum('32L'), 32);
  });

  test('Debe leer un número decimal', function() {
    assert.equal(convertHandler.getNum('3.2L'), 3.2);
  });

  // … y así hasta cubrir todos los casos
});
