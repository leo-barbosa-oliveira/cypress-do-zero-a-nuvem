const { defineConfig } = require('cypress')

module.exports = defineConfig({
  projectId: "zhqh77",
  viewportHeight: 880, //altera a altura
  viewportWidth: 1280, // altera a larguda
  e2e: {}, //indica que é um projeto end2end
  //video: true// ver os video da exução dos testes
})