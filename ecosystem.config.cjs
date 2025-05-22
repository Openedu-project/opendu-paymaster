module.exports = {
  apps: [
    {
      name: 'openedu-paymaster',
      script: './dist/index.js',
      instances: 2,
      exec_mode: 'cluster',
      autorestart: true,
      watch: false,
      max_memory_restart: '1G',
      node_args: '--experimental-specifier-resolution=node',
      env: {
        NODE_ENV: 'development',
      },
      env_production: {
        NODE_ENV: 'production',
        PORT: 8006,
      },
      log_date_format: 'YYYY-MM-DD HH:mm:ss',
      merge_logs: true
    },
  ],
};
