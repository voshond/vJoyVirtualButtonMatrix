const inputRender = (inputs) => {
    // did this because sliders and buttons are very different and would be weird to have them inline, i think
    let renderedHTML = {
        renderedButtons: "",
        renderedSliders: ""
    };

    let sliderIndex = 1;

    inputs.map(input => {
        switch (input.type) {
            case "button":
                if (input.id === "") {
                    renderedHTML.renderedButtons += `<button class="gridButton input ${input.class}" vjoytype="${input.type}" vjoyid="${i + 1}" style="${styleGenerator(input.style)}">${input.content}</button>`;
                } else {
                    renderedHTML.renderedButtons += `<button class="gridButton input ${input.class}" vjoytype="${input.type}" vjoyid="${input.id}" style="${styleGenerator(input.style)}">${input.content}</button>`;
                }
                break;

            case "hold":
                if (input.id === "") {
                    renderedHTML.renderedButtons += `<button class="gridButton input ${input.class}" vjoytype="${input.type}" vjoyid="${i + 1}" style="${styleGenerator(input.style)}">${input.content}</button>`;
                } else {
                    renderedHTML.renderedButtons += `<button class="gridButton input ${input.class}" vjoytype="${input.type}" vjoyid="${input.id}" style="${styleGenerator(input.style)}">${input.content}</button>`;
                }
                break;

            case "toggle":
                if (input.id === "") {
                    renderedHTML.renderedButtons += `<button class="gridButton input ${input.class}" vjoytype="${input.type}" vjoyid="${i + 1}" style="${styleGenerator(input.style)}">${input.content}</button>`;
                } else {
                    renderedHTML.renderedButtons += `<button class="gridButton input ${input.class}" vjoytype="${input.type}" vjoyid="${input.id}" style="${styleGenerator(input.style)}">${input.content}</button>`;
                }
                break;

            case "slider":
                if (input.id === "") {
                    console.log("No ID was passed, creating Slider" + sliderIndex);
                    let sliderid = "Slider" + sliderIndex;
                    renderedHTML.renderedSliders += `<div class="focus:outline-none grid relative ${input.class}">
                    <span class="top-1 left-1 absolute text-white text-shadow-md font-semibold font-sans">${input.id}</span>
                    <input class="focus:outline-none slider input ${input.class}" vjoytype="${input.type}" vjoyid="${sliderid}" type="range" min="${input.range.min}" max="${input.range.max}" value="${input.range.default}" class="verticalSlider" orient="${input.orientation}" style="${styleGenerator(input.style)}">
                    </div>`;
                    sliderIndex++;
                } else {
                    renderedHTML.renderedSliders += `<div class="focus:outline-none grid relative ${input.class}">
                    <span class="top-1 left-1 absolute text-white text-shadow-md font-semibold font-sans">${input.content}</span>
                    <input class="focus:outline-none slider input ${input.class}" vjoytype="${input.type}" vjoyid="${input.id}" type="range" min="${input.range.min}" max="${input.range.max}" value="${input.range.default}" class="verticalSlider" orient="${input.orientation}" style="${styleGenerator(input.style)}">
                    </div>`;
                }
                break;

            default:
                break;
        }
    })

    return renderedHTML;
};

function styleGenerator(style) {
    // take the style object and turn it into valid css
    return JSON.stringify(style).replace(/,/g, ";").replace(/"/g, "").replace(/\{/g, "").replace(/\}/g, "") + ";";
};

module.exports = inputRender;