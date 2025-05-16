FROM oven/bun:1.1

WORKDIR /app

# Copy package.json
COPY package.json ./

# Install dependencies
RUN bun install

# Install PM2 globally
RUN npm install pm2 -g

# Copy the rest of the application
COPY . .

# Build the application
RUN bun run build

# Create ecosystem.config.js for PM2
RUN echo 'module.exports = {' > ecosystem.config.js && \
    echo '  apps: [{' >> ecosystem.config.js && \
    echo '    name: "openedu-paymaster",' >> ecosystem.config.js && \
    echo '    script: "./dist/index.js",' >> ecosystem.config.js && \
    echo '    interpreter: "bun",' >> ecosystem.config.js && \
    echo '    instances: 1,' >> ecosystem.config.js && \
    echo '    autorestart: true,' >> ecosystem.config.js && \
    echo '    watch: false,' >> ecosystem.config.js && \
    echo '    max_memory_restart: "1G"' >> ecosystem.config.js && \
    echo '  }]' >> ecosystem.config.js && \
    echo '};' >> ecosystem.config.js

# Expose the port
EXPOSE 8006

# Set PM2 environment variables from build args
ARG PM2_PUBLIC_KEY
ARG PM2_SECRET_KEY
ENV PM2_PUBLIC_KEY=${PM2_PUBLIC_KEY}
ENV PM2_SECRET_KEY=${PM2_SECRET_KEY}

# Start the application with PM2
CMD ["pm2-runtime", "ecosystem.config.js"]
