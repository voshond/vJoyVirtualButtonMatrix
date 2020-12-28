const buttonGenerator = (buttons) => {
    let renderedButton = "";
    // console.log(buttons)
    if (buttons === undefined) {
        console.log(buttons);

    } else {
        buttons.map((button, i) => {
            if (button.id === "") {
                renderedButton += `<button class="gridButton" vjoytype="${button.type}" vjoyid="${i + 1}" style="${styleGenerator(button.style).replace(/,/g, ";").replace(/"/g, "").replace(/\{/g, "").replace(/\}/g, "") + ";"}">${button.content}</button>`;
            } else {
                renderedButton += `<button class="gridButton" vjoytype="${button.type}" vjoyid="${button.id}" style="${styleGenerator(button.style).replace(/,/g, ";").replace(/"/g, "").replace(/\{/g, "").replace(/\}/g, "") + ";"}">${button.content}</button>`;
            }
        });
        return renderedButton;
    };
    renderedButton = "";
};

function styleGenerator(style) {
    // console.log(style)
    let model = "" + JSON.stringify(style);
    model.replace(/,/g, ";").replace(/"/g, "").replace(/\{/g, "").replace(/\}/g, "") + ";";
    return model;
};

module.exports = buttonGenerator;