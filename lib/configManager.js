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

function writeLastConfig(file, configData) {
    try {
        fs.writeFileSync(file, JSON.stringify(configData), "utf8");
        console.log(`Updating last loaded config. File ${file} written successfully`);
        return "success"
    } catch (error) {
        return error
    }  
};

function changeConfig(file) {
    let userConfig = JSON.parse(fs.readFileSync(file));
    return userConfig;
};

module.exports.readConfigs = readConfigs;
module.exports.readLastConfig = readLastConfig;
module.exports.writeLastConfig = writeLastConfig;
module.exports.changeConfig = changeConfig;