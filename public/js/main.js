function docReady(fn) {
    // see if DOM is already available
    if (document.readyState === "complete" || document.readyState === "interactive") {
        // call on next available tick
        setTimeout(fn, 1);
    } else {
        document.addEventListener("DOMContentLoaded", fn);
    }
}

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

docReady(function() {
    console.log("hi")
    createButtonGrid(24);
});

function createButtonGrid (amount) {
    console.log(`Creating ${amount} buttons`);
    let buttonGridContainer = document.querySelector("#buttonGridContainer");
    for (let index = amount; index > 0; index--) {
        let buttonTemplate = `<button id="gridButton${index}" class="gridButton">Button ${index}</button>`;
        buttonGridContainer.insertAdjacentHTML("afterbegin",buttonTemplate);
    };
    assignEventListener();
};

function assignEventListener () {
    let buttons = document.querySelectorAll(".gridButton");
    buttons.forEach((button, i) => {
        console.log("creating listener for button "+(i+1));
        button.addEventListener("click", function() {
            dispatchButtonPress(i+1);
        });
    });
};

function dispatchButtonPress (value) {
    postData("/button",{button:value}).then(res => {
        console.log(res);
    });
};