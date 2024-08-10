# Use an official Ubuntu base image
FROM ubuntu:latest

# Install necessary tools
RUN apt-get update && \
    apt-get install -y g++ make

# Set the working directory
WORKDIR /app

# The default command will be an interactive shell
CMD ["/bin/bash"]

