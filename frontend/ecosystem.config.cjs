const path = require('node:path')

// cwd fixo na pasta do frontend e execução via "npm start" para que o binário
// do Next seja resolvido mesmo com hoisting de workspaces (node_modules na raiz).
module.exports = {
  apps: [
    {
      name: 'triamici-frontend',
      cwd: path.resolve(__dirname),
      script: 'npm',
      args: 'start',
      instances: 1,
      autorestart: true,
      watch: false,
      env_production: {
        NODE_ENV: 'production',
        PORT: 3000,
      },
    },
  ],
}
