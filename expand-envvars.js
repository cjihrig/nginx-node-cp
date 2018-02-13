'use strict';
const Fs = require('fs');
const configFile = process.env.NGINX_CONFIG || '/etc/nginx/nginx.conf';
const envVars = Object.keys(process.env);
let config = Fs.readFileSync(configFile, 'utf8');

for (let i = 0; i < envVars.length; i++) {
  const envVar = envVars[i];
  const value = process.env[envVar];
  const regExp = new RegExp('\\$ENV\\{' + envVar + '\\}', 'g');

  config = config.replace(regExp, value);
}

Fs.writeFileSync(configFile, config);
