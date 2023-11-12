module.exports = {
  build: [
    {
      src: './src/index.js',
      dest: './build/discore.min.js',
      watch: './src/**',
    },
  ],
  serve: {
    dir: '.',
    port: 4141
  }
}
