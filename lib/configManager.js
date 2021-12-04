const fs = require('fs');

function readConfigs(directory) {
    let configFiles = fs.readdirSync(directory);
    let configs = [];

    configFiles.forEach(configName => {
        let config = JSON.parse(fs.readFileSync(directory + "\\" + configName));
        configs.push({
            "name": config.name,
            "path": {
                "full": directory + "\\" + configName,
                "short": "configs\\" + configName
            },
            "vJoy": {
                "deviceId": config.vJoy.deviceId
            }
        });
    });
    return configs;
};

function readLastConfig(file) {
    let lastConfig = JSON.parse(fs.readFileSync(file));
    return lastConfig;
};

function changeConfig(file) {
    let userConfig = JSON.parse(fs.readFileSync(file));
    console.log(userConfig);
    return userConfig;
};

module.exports.readConfigs = readConfigs;
module.exports.readLastConfig = readLastConfig;
module.exports.changeConfig = changeConfig;

// path.join(__dirname, '/configs')