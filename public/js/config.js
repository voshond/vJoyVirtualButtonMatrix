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
    userConfig = JSON.parse("{}");

    document.querySelector("#generateConfig").addEventListener("click", function () {
        generateConfig();
    });
});

let generateConfig = () => {
    let code = document.querySelector("#code");
    let amountOfDefaultInputs = parseInt(document.querySelector("#amountOfDefaultInputs").value);

    let generatedInputs = [];

    for (let index = 1; index <= amountOfDefaultInputs; index++) {
        const input = new Input(index, "button", "miau", "default", {
            "background-color": "#72192E",
            "color": "#ffffff"
        });
        generatedInputs.push(input);
    }

    code.innerText = JSON.stringify(generatedInputs);
    console.log(JSON.stringify(generatedInputs, null, 1));
};

let Input = class {
    constructor(id, type, content, group, style, subcontrol, sequence) {
        this.id = id;
        this.type = type;
        this.content = content;
        this.group = group;
        this.style = style;
        this.subcontrol = subcontrol;
        this.sequence = sequence;
    }
}