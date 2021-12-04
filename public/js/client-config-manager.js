// window.location.reload();
/*

      <button class="self-center bg-gray-400 w-8/12 rounded-md text-left p-2 px-3 mb-2 relative">
        <span class="bg-gray-900 text-gray-100 rounded text-sm px-1 h-5 text-center absolute right-3 top-2">vJoy ID: 1</span>
        <div class="mb-1"><span class="text-lg font-bold">Profile: Star Citizen<span></div>
        <div class="font-mono p-1 px-2 over text-sm bg-gray-300 rounded">Path</span>
      </button>

*/

function docReady(fn) {
    if (document.readyState === "complete" || document.readyState === "interactive") {
        setTimeout(fn, 1);
    } else {
        document.addEventListener("DOMContentLoaded", fn);
    };
};

docReady(function () {
    console.log("init config manager");
    configs = JSON.parse(document.querySelector("#configs").innerText);
    renderConfigs(configs);
});

function renderConfigs(configs = []) {
    let content = "";
    configs.forEach(config => {
        content += `
            <button class="configButton self-center bg-gray-400 w-full md:w-8/12 rounded-md text-left p-2 px-3 mb-2 relative" name="${config.name}" vjoyid="${config.vJoy.deviceId}" fullPath="${config.path.full}">
                <div class="mb-1"><span class="text-lg font-bold">${config.name}<span></div>
                <div class="bg-gray-900 text-gray-100 rounded text-sm p-1 px-2 md:px-1 md:text-center text-left font-mono mb-1 md:mb-0 w-full md:w-auto md:absolute md:right-3 md:top-2">vJoy ID: ${config.vJoy.deviceId}</div>
                <div class="font-mono p-1 px-2 over text-sm bg-gray-300 rounded">${config.path.short}</span>
            </button>
        `;
    });

    updateContent(content, "#configContainer");
};

function updateContent(content, id) {
    document.querySelector(id).innerHTML = document.querySelector(id).innerHTML + content;
    console.log("adding config button handlers");
    registerHandler();
};

function registerHandler() {
    document.querySelectorAll(".configButton").forEach(input => {
        input.addEventListener("click", function () {
            postData("/changeConfig", {
                name: input.getAttribute("name"),
                file: input.getAttribute("file"),
                vJoy: {
                    deviceId: input.getAttribute("vjoyid")
                }
            }).then(res => {
                console.log(res);
            });;
            window.location.reload();
        });
    });
};

async function postData(url = '', data = {}) {
    // Default options are marked with *
    console.log(data);
    const response = await fetch(url, {
        method: 'POST',
        mode: 'cors',
        cache: 'no-cache',
        credentials: 'same-origin',
        headers: {
            'Content-Type': 'application/json'
        },
        redirect: 'follow',
        referrerPolicy: 'no-referrer',
        body: JSON.stringify(data)
    });
    return response.json();
};