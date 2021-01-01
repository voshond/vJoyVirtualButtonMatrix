function docReady(fn) {
    if (document.readyState === "complete" || document.readyState === "interactive") {
        setTimeout(fn, 1);
    } else {
        document.addEventListener("DOMContentLoaded", fn);
    };
};

let userConfig = {};

docReady(function () {
    console.log("Initialized");
    userConfig = JSON.parse(document.querySelector("#storage").innerText);
    console.log(userConfig.customButtons);
    assignEventListener();
    postData("/refresh");
});

async function postData(url = '', data = {}) {
    // Default options are marked with *
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
}

function assignEventListener() {
    let inputs = document.querySelectorAll(".input");
    inputs.forEach(input => {
        let type = input.getAttribute("vjoytype");
        let id = input.getAttribute("vjoyid");

        switch (type) {
            case "button":
                console.log("creating listener for button " + (input.getAttribute("vjoyid")));
                console.log({ id: input.getAttribute("vjoyid"), type: input.getAttribute("vjoytype") });

                // myObj.hasOwnProperty("myProp");
                let inputData = userConfig.customButtons.find(item => item.id + "" === id + "");
                if (inputData.hasOwnProperty("sequence") === true) {
                    input.addEventListener("click", function () {
                        dispatchRequest({ id: input.getAttribute("vjoyid"), type: input.getAttribute("vjoytype") });
                        dispatchSequence(inputData.sequence);
                    });
                } else if (inputData.hasOwnProperty("subcontrol") === true) {
                    input.addEventListener("click", function () {
                        dispatchRequest({ id: input.getAttribute("vjoyid"), type: input.getAttribute("vjoytype") });
                        dispatchSubControl(inputData.subcontrol);
                    });
                } else {
                    input.addEventListener("click", function () {
                        dispatchRequest({ id: input.getAttribute("vjoyid"), type: input.getAttribute("vjoytype") });
                    });
                }
                break;

            case "hold":
                console.log("creating listener for button " + (input.getAttribute("vjoyid")));
                console.log({ id: input.getAttribute("vjoyid"), type: input.getAttribute("vjoytype") });

                // myObj.hasOwnProperty("myProp");
                let inputData2 = userConfig.customButtons.find(item => item.id + "" === id + "");
                if (inputData2.hasOwnProperty("sequence") === true) {
                    input.addEventListener("click", function () {
                        dispatchRequest({ id: input.getAttribute("vjoyid"), type: input.getAttribute("vjoytype") });
                        dispatchSequence(inputData2.sequence);
                    });
                } else {
                    input.addEventListener("click", function () {
                        dispatchRequest({ id: input.getAttribute("vjoyid"), type: input.getAttribute("vjoytype") });
                    });
                }
                break;

            case "toggle":
                console.log("creating listener for toggle button " + (input.getAttribute("vjoyid")));
                console.log({ id: input.getAttribute("vjoyid"), type: input.getAttribute("vjoytype"), state: input.state });

                input.addEventListener("click", function () {
                    input.classList.toggle("toggledButton");
                    input.state = input.classList.value.includes("toggledButton");
                    dispatchRequest({ id: input.getAttribute("vjoyid"), type: input.getAttribute("vjoytype"), state: input.state });
                });
                break;

            case "slider":
                console.log("creating listener for slider " + (input.getAttribute("vjoyid")));
                console.log({ id: input.getAttribute("vjoyid"), type: input.getAttribute("vjoytype"), value: input.value });

                input.addEventListener("input", function () {
                    dispatchRequest({ id: input.getAttribute("vjoyid"), type: input.getAttribute("vjoytype"), value: input.value });
                });
                break;

            default:
                break;
        }
    });
};

function dispatchRequest(data) {
    console.log({ id: data.id, type: data.type, state: data.state, value: data.value });
    postData(`/${data.type}`, { id: data.id, type: data.type, state: data.state, value: data.value }).then(res => {
        console.log(res);
    });
};

function dispatchSequence(input) {
    setTimeout(() => {
        for (let i = 0; i < input.length; i++) {
            setTimeout(function () {
                let inputData = userConfig.customButtons.find(item => item.id + "" === input[i].id + "");
                inputData.value = input[i].value;

                if (inputData.type === "toggle") {
                    let renderedInput = Array.from(document.querySelectorAll(".input")).find(item => item.getAttribute("vjoyid") === input[i].id + "");
                    renderedInput.classList.toggle("toggledButton");
                    inputData.state = renderedInput.classList.value.includes("toggledButton");
                }

                dispatchRequest({ id: inputData.id, type: inputData.type, value: inputData.value, state: inputData.state });
                console.log("ran sequence: " + i);
            }, i * 1000)
        }
    }, 200);
};

function dispatchSubControl(input) {
    setTimeout(() => {
        for (let i = 0; i < input.length; i++) {
            setTimeout(function () {
                let inputData = userConfig.customButtons.find(item => item.id + "" === input[i].id + "");

                if (inputData.type === "toggle") {
                    let renderedInput = Array.from(document.querySelectorAll(".input")).find(item => item.getAttribute("vjoyid") === input[i].id + "");
                    renderedInput.classList.toggle("toggledButton");
                }

                console.log("set subtoggle state: " + i);
            }, i * 1000)
        }
    }, 200);
};