# nginx-node-cp

nginx and Node.js in a single container managed by [ContainerPilot](https://github.com/joyent/containerpilot). This is meant to be a base image that can be extended.

## Configuration

A basic application can be set up by `COPY`ing nginx and Node.js files (application code, conf file, keys, certs, etc.) into the `nginx-node-cp` image. See the Dockerfile in the [example](./example) directory.

### Environment Variables

`nginx-node-cp` supports the following environment variables:

- `NODE_START` - The command used to start the Node.js application. Defaults to `node .`.
- `PORT` - The port used by nginx to communicate with the Node.js application. Defaults to `5000`.
- `NGINX_CONFIG` - The path to the nginx configuration file inside the container. Defaults to `/etc/nginx/nginx.conf`.
- `HEALTH_ENDPOINT` - The HTTP endpoint of the Node.js application used for performing application health checks. Defaults to `health`.

### `prestart.sh`

The `prestart.sh` script in this repository is copied into the container at `/bin/prestart.sh`. This script executes prior to application startup. Images that extend `nginx-node-cp` can overwrite this with their own initialization script.

### Parameterizing nginx Configuration

The `expand-envvars.js` script in this repository is copied into the container at `/bin/expand-envvars.js`. The default `prestart.sh` script executes this file, which replaces all instances of `$ENV{variable}` with the corresponding environment variable value in the `NGINX_CONFIG` file.

## Sample Application

The sample application in the [example](./example) directory sets up a basic nginx-Node.js application. nginx is configured such that all HTTP traffic is redirected to HTTPS, which is then proxied to a "Hello World!" Node.js server.
