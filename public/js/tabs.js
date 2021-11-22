function docReady(fn) {
    if (document.readyState === "complete" || document.readyState === "interactive") {
        setTimeout(fn, 1);
    } else {
        document.addEventListener("DOMContentLoaded", fn);
    };
};

docReady(function () {
    createTabNavigation();
});

function createTabNavigation() {
    let tabContainer = document.querySelector(".tab-navigation");
    let tabs = [...document.querySelectorAll(".tab")];
    let tabsLinks = [...tabContainer.querySelectorAll("li")];

    tabsLinks.map(tab => {
        tab.addEventListener("click", () => {
            let tabId = tab.getAttribute("name");

            tabs.forEach(tab => {
                tab.classList.remove("activeTab");
            });
            tabs.filter(item => item.id != tabId).forEach(item => {
                item.classList.add("hidden");
            });
            tabsLinks.forEach(tab => {
                tab.classList.remove("activeNavigationLink");
            });

            let clickedTab = tabs.find(item => item.id === tabId);

            tab.classList.add("activeNavigationLink");
            clickedTab.classList.add("activeTab");
            clickedTab.classList.remove("hidden");

            console.log(`switching to ${tabId}`);
        });
    });
};