module.exports = {
  apps: [
    {
      name: 'oxie-server',
      script: 'server.cjs',
      cwd: __dirname,
      env: {
        NODE_ENV: 'production'
      }
    }
  ]
}
