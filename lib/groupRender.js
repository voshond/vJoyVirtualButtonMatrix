const inputRender = require('./inputRender.js');

const groupRender = (inputs) => {
    let renderedHTML = "";

    let groups = {};
    [...new Set(inputs.map(item => {
        return item.group;
    }))].map(filter => {
        groups[filter] = inputs.filter(item => item.group === filter);
    });

    let groupsKeys = Object.keys(groups);


    groupsKeys.forEach((item, i) => {
        let groupHeader = `<h1 class="text-white font-black">Group: ${item}</h1>`;
        let groupBody = `<div class="grid mt-1 grid-cols-2 sm:grid-cols-3 md:grid-cols-5 lg:grid-cols-6 gap-2 grid-flow-row mb-6">
        ${inputRender(Array.from(groups[item]))}
        </div>`;
        renderedHTML += `${groupHeader} ${groupBody}`
    });

    return renderedHTML;
};

module.exports = groupRender;