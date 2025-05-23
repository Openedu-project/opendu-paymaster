```bash
# Install pm2 global-env cli 
sudo npm install -g pm2

# Environment Setup
cp env.example .env
# Edit .env with your configuration

# Build 
npm run build

# Development
pm2 start ecosystem.dev.cjs

# Production
pm2 start ecosystem.prod.cjs

# Logs
pm2 logs

# Status
pm2 status
```
