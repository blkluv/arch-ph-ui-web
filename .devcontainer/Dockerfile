# Use the official Node.js image as the base image
FROM node:18-alpine

# Install pnpm globally
RUN npm install -g pnpm

# Install necessary tools
RUN apk add --no-cache bash git

# Configure Git (Replace with your own name and email)
RUN git config --global user.name "francisgail" \
    && git config --global user.email "francis.gail.pena@gmail.com"

    # Set the working directory inside the container
WORKDIR /workspaces/arch-ph-ui-web
    
# Expose Next.js default port
#EXPOSE 3000
