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
      src: './docs/assets/src/index.js',
      dest: './docs/assets/build/app.min.js',
      watch: './docs/assets/src/**',
      react: 'react'
    }

  ],
  serve: {
    dir: './docs/'
  }
}
