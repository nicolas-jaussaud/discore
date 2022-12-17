module.exports = {
  build: [

    // Core library

    {
      src: './discore/src/index.js',
      dest: './discore/build/discore.min.js',
      watch: './discore/src/**',
      react: 'react'
    },

    // Dialog library

    {
      src: './discursed/src/index.jsx',
      dest: './discursed/build/discursed.min.js',
      watch: './discursed/src/**',
      react: 'react'
    },
    {
      src: './discursed/src/index.scss',
      dest: './discursed/build/discursed.min.css',
      watch: './discursed/**'
    },

    // Example

    {
      src: './example/assets/src/index.js',
      dest: './example/assets/build/app.min.js',
      watch: './example/assets/src/**',
      react: 'react'
    }

  ],
  serve: {
    dir: './example/'
  }
}
