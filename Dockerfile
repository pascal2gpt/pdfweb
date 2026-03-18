# Use the official lightweight Nginx image
FROM nginx:alpine

# Copy the Nginx configuration template
# The official Nginx image automatically substitutes environment variables in templates
COPY default.conf.template /etc/nginx/templates/default.conf.template

# Copy the static website files to the Nginx HTML directory
COPY . /usr/share/nginx/html
