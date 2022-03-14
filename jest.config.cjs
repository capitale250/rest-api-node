module.exports = {  
    transformIgnorePatterns: ['node_modules/(?!(sucrase)/)'],
    transform: {
      '^.+\\.(js|jsx|ts|tsx|mjs)$': 'babel-jest',
    },
    //scriptPreprocessor:[ './node_modules/babel-jest']
     
    //transform: {".*": ["./node_modules/babel-jest"]}
  
   // setupFilesAfterEnv: ['./jest.setup.js']
    //globalTeardown: ['./test-teardown-globals.js'],
    //advanceTimersByTime(msToRun)
    // ...the rest of your config"jest": {
    // transform: {
    //     "^.+\\.js$": "jest-buble"
    //   }
    // }
    // "jest": {
    //     "transform": {
    //       "^.+\\.js$": "jest-buble"
     //     }
      //jest: {
        //'testTimeout': '15000'
        //},

        //return {
         //verbose: true,
         //};
      }


  