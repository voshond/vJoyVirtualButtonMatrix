function docReady(fn) {
    if (document.readyState === "complete" || document.readyState === "interactive") {
        setTimeout(fn, 1);
    } else {
        document.addEventListener("DOMContentLoaded", fn);
    };
};

docReady(function () {
    console.log("Initialized");
    assignEventListener();
    document.body.requestFullscreen();
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

        switch (type) {
            case "button":
                console.log("creating listener for button " + (input.getAttribute("vjoyid")));
                console.log({ id: input.getAttribute("vjoyid"), type: input.getAttribute("vjoytype") });

                input.addEventListener("click", function () {
                    dispatchRequest({ id: input.getAttribute("vjoyid"), type: input.getAttribute("vjoytype") });
                });
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