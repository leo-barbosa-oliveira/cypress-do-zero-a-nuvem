const { defineConfig } = require('cypress')

module.exports = defineConfig({
  projectId:'vhcs7c',
  viewportHeight: 880, //altera a altura
  viewportWidth: 1280, // altera a larguda
  e2e: {}, //indica que é um projeto end2end
  //video: true// ver os video da exução dos testes
})