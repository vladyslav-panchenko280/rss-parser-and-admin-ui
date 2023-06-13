# Use a base Node.js image
FROM node:latest

# Set the working directory
WORKDIR /home/Work/test-task-devit

# Copy the project files into the container
COPY . .

# Get variables from environment
ENV PORT=${PORT} \
    JWT_SECRET=${JWT_SECRET} \
    DATABASE_MONGO=${DATABASE_MONGO} \
    RSS_FEED=${RSS_FEED}

# Run the installations script to install dependencies
RUN bash "./scripts/installation.sh"

# Build the project
RUN bash "./scripts/build.sh"

# Listen on the specified network ports at runtim
EXPOSE 3010

# Set the command to start the application
CMD ["bash", "-c", "./scripts/start.sh"]