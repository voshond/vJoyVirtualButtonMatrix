function docReady(fn) {
    if (document.readyState === "complete" || document.readyState === "interactive") {
        setTimeout(fn, 1);
    } else {
        document.addEventListener("DOMContentLoaded", fn);
    };
};

docReady(function () {
    console.log("Initialized");
    // createButtonGrid(24);
    assignEventListener();
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

function styleToggle(button) {

}

function assignEventListener() {
    let buttons = document.querySelectorAll(".gridButton");
    buttons.forEach(button => {
        let type = button.getAttribute("vjoytype");

        switch (type) {
            case "button":
                console.log("creating listener for button " + (button.getAttribute("vjoyid")));
                button.addEventListener("click", function () {
                    dispatchButtonPress(button.getAttribute("vjoyid"), button.getAttribute("vjoytype"));
                });
                break;

            case "toggle":
                console.log("creating listener for toggle button " + (button.getAttribute("vjoyid")));
                button.addEventListener("click", function () {
                    button.classList.toggle("toggledButton");
                    let state = button.classList.value.includes("toggledButton");
                    dispatchTogglePress(button.getAttribute("vjoyid"), button.getAttribute("vjoytype"), state);
                });
                break;

            case "slider":
                console.log("creating listener for slider " + (button.getAttribute("vjoyid")));
                button.addEventListener("click", function () {
                    dispatchSliderChange(button.getAttribute("vjoyid"), button.getAttribute("vjoytype"));
                });
                break;

            case "script":
                console.log("creating listener for slider " + (button.getAttribute("vjoyid")));
                button.addEventListener("click", function () {
                    dispatchScriptPress(button.getAttribute("vjoyid"), button.getAttribute("vjoytype"));
                });
                break;

            default:
                break;
        }


    });

    let sliders = document.querySelectorAll(".slider");
    sliders.forEach(slider => {
        slider.addEventListener("input", function () {
            dispatchSliderChange(slider.getAttribute("vjoyid"), slider.getAttribute("vjoytype"), slider.value);
        });
    });
};

function dispatchButtonPress(id, type) {
    postData("/button", { id: id, type: type }).then(res => {
        console.log(res);
    });
};

function dispatchTogglePress(id, type, state) {
    postData("/toggle", { id: id, type: type, state: state }).then(res => {
        console.log(res);
    });
};

function dispatchSliderChange(id, type, value) {
    console.log(id);
    postData("/slider", { id: id, type: type, value: value }).then(res => {
        console.log(res);
    });
};