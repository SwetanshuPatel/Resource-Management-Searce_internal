FROM postgres:latest

# Set environment variables for PostgreSQL
ENV POSTGRES_DB rms
ENV POSTGRES_USER postgres
ENV POSTGRES_PASSWORD password

# environment variables for the backend
ENV DB_USER postgres
ENV DB_HOST localhost
ENV DB_DATABASE rms
ENV DB_PASSWORD password
ENV DB_PORT 5432
ENV PORT 3000

# Install PostgreSQL client for database initialization
RUN apt-get update && apt-get install -y postgresql-client

# Install Node.js and Yarn
RUN apt-get install -y nodejs npm
RUN npm install -g yarn

# Expose the PostgreSQL port
EXPOSE 5432

# Copy init.sql to the container's initialization directory
COPY Database/init1.sql /docker-entrypoint-initdb.d/init1.sql

# Create working directory for the application
WORKDIR /usr/src/app

# Create backend and frontend directories
RUN mkdir -p rms/backend rms/frontend

# Set working directory to /usr/src/app/rms
WORKDIR /usr/src/app/rms

# Copy backend package files and install dependencies
COPY ./backend/package*.json ./
RUN yarn install
RUN yarn global add nodemon

# Copy the rest of the backend code
COPY ./backend/ ./

# Expose the backend port
EXPOSE 3000

# Set working directory to /usr/src/app/rms/frontend
WORKDIR /usr/src/app/rms/frontend

# Copy frontend package files and install dependencies
COPY ./frontend/package*.json ./
RUN yarn install

# Copy the rest of the frontend code
COPY ./frontend/ ./

# Expose the frontend port
EXPOSE 3001
