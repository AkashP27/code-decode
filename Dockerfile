FROM ubuntu:20.04

RUN apt-get update
RUN apt-get install -y ca-certificates curl gnupg
RUN mkdir -p /etc/apt/keyrings
RUN curl -fsSL https://deb.nodesource.com/gpgkey/nodesource-repo.gpg.key | gpg --dearmor -o /etc/apt/keyrings/nodesource.gpg

RUN echo "deb [signed-by=/etc/apt/keyrings/nodesource.gpg] https://deb.nodesource.com/node_20.x nodistro main" | tee /etc/apt/sources.list.d/nodesource.list
RUN apt-get update
RUN apt-get install nodejs -y

RUN apt-get update && \
    apt install python3

RUN apt-get update && \
    apt-get -y install g++

RUN apt-get update && \
    apt-get -y install openjdk-17-jdk openjdk-17-jre

RUN apt-get update && \
    apt-get -y install golang-go 

WORKDIR /usr/src/app
COPY ./package.json ./
RUN npm install
COPY . .
EXPOSE 5000
CMD ["npm", "start"]
