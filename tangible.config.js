module.exports = {
  build: [
    {
      src: './src/index.js',
      dest: './build/discore.min.js',
      watch: './src/**',
    },
    {
      src: './src/index.js',
      dest: './docs/build/discore.min.js',
      watch: './src/**',
    },
  ],
  serve: {
    dir: '.',
    port: 4141
  }
}
