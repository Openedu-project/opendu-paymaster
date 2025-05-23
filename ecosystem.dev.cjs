module.exports = {
  apps: [
    {
      name: 'openedu-paymaster-dev',
      script: './dist/index.js',
      instances: 2,
      exec_mode: 'cluster',
      autorestart: true,
      watch: false,
      max_memory_restart: '1G',
      env: {
        NODE_ENV: 'development',
        PORT: 8006
      },
      log_date_format: 'YYYY-MM-DD HH:mm:ss',
      merge_logs: true
    },
  ],
}; 