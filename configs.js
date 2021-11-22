const fs = require('fs');
const path = require('path');

let configFiles = fs.readdirSync(path.join(__dirname, '/configs'));

let configs = [];
let userConfig = {};

configFiles.forEach(configName => {
    let config = JSON.parse(fs.readFileSync(path.join(__dirname, '/configs/' + configName)));
    if (config.defaultConfig === true) {
        userConfig = config;
        configs.push(config);
    } else {
        configs.push(config);
    };
});

console.log(configs[0].name);
console.log(userConfig);