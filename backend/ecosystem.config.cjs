const path = require('node:path')

module.exports = {
  apps: [
    {
      name: 'triamici-backend',
      cwd: path.resolve(__dirname),
      script: './dist/src/server.js',
      instances: 1,
      autorestart: true,
      watch: false,
      env_production: {
        NODE_ENV: 'production',
        PORT: 3001,
      },
    },
  ],
}
