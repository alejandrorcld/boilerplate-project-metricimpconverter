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

  test('Debe leer una fracción simple', function() {
    assert.equal(convertHandler.getNum('1/2L'), 0.5);
  });

  test('Debe leer una fracción con decimales', function() {
    assert.equal(convertHandler.getNum('5.4/3kg'), 1.8);
  });

  test('Debe devolver null para fracción inválida', function() {
    assert.isNull(convertHandler.getNum('3/2/3kg'));
  });

  test('Debe devolver 1 si no hay número', function() {
    assert.equal(convertHandler.getNum('kg'), 1);
  });

  test('Debe devolver unidad válida', function() {
    assert.equal(convertHandler.getUnit('32L'), 'L');
  });

  test('Debe devolver null para unidad inválida', function() {
    assert.isNull(convertHandler.getUnit('32g'));
  });

  test('Debe devolver unidad de retorno correcta', function() {
    assert.equal(convertHandler.getReturnUnit('gal'), 'L');
    assert.equal(convertHandler.getReturnUnit('L'), 'gal');
    assert.equal(convertHandler.getReturnUnit('mi'), 'km');
    assert.equal(convertHandler.getReturnUnit('km'), 'mi');
    assert.equal(convertHandler.getReturnUnit('lbs'), 'kg');
    assert.equal(convertHandler.getReturnUnit('kg'), 'lbs');
  });

  test('Debe devolver nombre completo de unidad', function() {
    assert.equal(convertHandler.spellOutUnit('gal'), 'gallons');
    assert.equal(convertHandler.spellOutUnit('L'), 'liters');
    assert.equal(convertHandler.spellOutUnit('mi'), 'miles');
    assert.equal(convertHandler.spellOutUnit('km'), 'kilometers');
    assert.equal(convertHandler.spellOutUnit('lbs'), 'pounds');
    assert.equal(convertHandler.spellOutUnit('kg'), 'kilograms');
  });

  test('Debe convertir gal a L', function() {
    assert.approximately(convertHandler.convert(1, 'gal'), 3.78541, 0.1);
  });

  test('Debe convertir L a gal', function() {
    assert.approximately(convertHandler.convert(1, 'L'), 0.26417, 0.1);
  });

  test('Debe convertir mi a km', function() {
    assert.approximately(convertHandler.convert(1, 'mi'), 1.60934, 0.1);
  });

  test('Debe convertir km a mi', function() {
    assert.approximately(convertHandler.convert(1, 'km'), 0.62137, 0.1);
  });

  test('Debe convertir lbs a kg', function() {
    assert.approximately(convertHandler.convert(1, 'lbs'), 0.45359, 0.1);
  });

  test('Debe convertir kg a lbs', function() {
    assert.approximately(convertHandler.convert(1, 'kg'), 2.20462, 0.1);
  });

});
