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
    userConfig = JSON.parse(bla);

    document.querySelector("#generateConfig").addEventListener("click", function () {
        generateConfig();
    });
});

let generateConfig = () => {
    let code = document.querySelector("#code");

    code.innerText = JSON.stringify(userConfig);
    console.log(JSON.stringify(userConfig, null, 1));
};

