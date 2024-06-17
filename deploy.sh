#!/bin/bash

# Function to print success message
success_message () {
  echo "✔ $1"
}

# Function to print error message
error_message () {
  echo "✘ Error: $1"
  exit 1
}

# Pull the latest Docker images
echo "Pulling the latest Docker images..."
sudo docker-compose pull
if [ $? -eq 0 ]; then
  success_message "Docker images pulled successfully"
else
  error_message "Failed to pull Docker images"
fi

# Stop development Docker containers
echo "Stopping Craft-Backend-Dev containers..."
sudo docker-compose -f docker-compose-dev.yml down
if [ $? -eq 0 ]; then
  success_message "Craft-Backend-Dev containers stopped"
else
  error_message "Failed to stop Craft-Backend-Dev containers"
fi

# Start your Docker containers
echo "Starting production containers..."
sudo docker-compose up -d
if [ $? -eq 0 ]; then
  success_message "Production containers started"
else
  error_message "Failed to start production containers (check logs with 'docker-compose logs')"
fi

# Remove unused Docker images
echo "Removing unused Docker images..."
sudo docker image prune -af
if [ $? -eq 0 ]; then
  success_message "Unused Docker images removed"
else
  error_message "Failed to prune Docker images"
fi