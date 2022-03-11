module.exports = {  
    transformIgnorePatterns: ['node_modules/(?!(sucrase)/)'],
    transform: {
      '^.+\\.(js|jsx|ts|tsx|mjs)$': 'babel-jest',
    },
    // ...the rest of your config"jest": {
    // transform: {
    //     "^.+\\.js$": "jest-buble"
    //   }
    // }
    // "jest": {
    //     "transform": {
    //       "^.+\\.js$": "jest-buble"
    //     }
      }
  