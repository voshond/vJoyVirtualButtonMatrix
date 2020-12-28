const sliderGenerator = (sliders) => {
    let renderedSlider = "";
    // console.log(buttons)
    if (sliders === undefined) {
        console.log("Error: Slider undefined");
        console.log(sliders);
    } else {
        sliders.map((slider, i) => {
            if (slider.id === "") {
                console.log("No ID was passed, creating Slider" + i);
                let sliderid = "Slider" + i;
                renderedSlider += `<input class="slider" vjoytype="${slider.type}" vjoyid="${slider.sliderid}" type="range" min="${slider.range.min}" max="${slider.range.max}" value="${slider.range.default}" class="verticalSlider" orient="${slider.orientation}" style="${styleGenerator(slider.style).replace(/,/g, ";").replace(/"/g, "").replace(/\{/g, "").replace(/\}/g, "") + ";"}">`;
            } else {
                renderedSlider += `<input class="slider" vjoytype="${slider.type}" vjoyid="${slider.id}" type="range" min="${slider.range.min}" max="${slider.range.max}" value="${slider.range.default}" class="verticalSlider" orient="${slider.orientation}" style="${styleGenerator(slider.style).replace(/,/g, ";").replace(/"/g, "").replace(/\{/g, "").replace(/\}/g, "") + ";"}">`;
            }
        });
        return renderedSlider;
    };
    renderedSlider = "";
};

function styleGenerator(style) {
    // console.log(style)
    let model = "" + JSON.stringify(style);
    model.replace(/,/g, ";").replace(/"/g, "").replace(/\{/g, "").replace(/\}/g, "") + ";";
    return model;
};

module.exports = sliderGenerator;