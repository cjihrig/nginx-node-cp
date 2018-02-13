FROM continuation/nginx-node-cp:latest

# Setup nginx
COPY ./nginx.conf /etc/nginx/nginx.conf
COPY ./selfsigned.crt /etc/nginx/certs/server.crt
COPY ./selfsigned.key /etc/nginx/certs/server.key

# Setup the Node.js app
RUN mkdir -p /opt/app/
WORKDIR /opt/app/
COPY ./app.js /opt/app/app.js
