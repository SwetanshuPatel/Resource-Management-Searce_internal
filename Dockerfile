FROM postgres:latest

# environment variables for PostgreSQL
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
RUN apt install npm -y

# Expose the PostgreSQL port
EXPOSE 5432

# Copy init.sql to the container's initialization directory
COPY init1.sql /docker-entrypoint-initdb.d/init1.sql

# Set working directory
WORKDIR /usr/src/app

# Create a directory named "rms"
RUN mkdir rms

# Set working directory to /usr/src/app/rms
WORKDIR /usr/src/app/rms

# Create backend and frontend directories inside "rms"
RUN mkdir backend
RUN mkdir frontend

# Set working directory to /usr/src/app/rms/backend
WORKDIR /usr/src/app/rms/backend

# Copy package.json and package-lock.json for backend
COPY ./backend/package*.json ./

# Install backend dependencies
RUN npm install
RUN npm install nodemon -y

# Copy the rest of the backend code
COPY ./backend/ ./

# Expose the backend port
EXPOSE 3000

# Set working directory to /usr/src/app/rms
WORKDIR /usr/src/app/rms

# Set working directory to /usr/src/app/rms/frontend
WORKDIR /usr/src/app/rms/frontend

# Copy package.json and package-lock.json for frontend
COPY ./frontend/package*.json ./

# Install frontend dependencies
RUN npm install

# Copy the rest of the frontend code
COPY ./frontend/ ./

# Expose the frontend port
EXPOSE 3001

# Set working directory to /usr/src/app
WORKDIR /usr/src/app
