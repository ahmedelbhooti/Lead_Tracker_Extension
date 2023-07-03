let myLeads = [];
const inputEl = document.querySelector("#input-el");
const ulEl = document.querySelector("#ul-el");
const inputBtn = document.querySelector("#input-btn");
const deleteBtn = document.querySelector("#delete-btn");
const tabBtn = document.querySelector("#tab-btn");
const leadsFromLocalStorage = JSON.parse(localStorage.getItem("myLeads"));



if (leadsFromLocalStorage) {
    myLeads = leadsFromLocalStorage;
    render(myLeads);
}

function render(leads) {
    let listItems = "";
    for (let i = 0; i < leads.length; i++) {
        // listItems += "<li><a traget='_blank' href='" + myLeads[i] + "'>" + myLeads[i] + "</a></li>";
        listItems += `
        <li>
            <a target="_blank" href="${leads[i]}">
                ${leads[i]}
            </a>
        </li>`;
    }
    ulEl.innerHTML = listItems;
}

inputBtn.addEventListener("click", function () {
    const inputUrl = `https://${inputEl.value.trim()}`;
    if (inputUrl && isUrl(inputUrl)) {
        myLeads.push(inputUrl);
        inputEl.value = "";
        localStorage.setItem("myLeads", JSON.stringify(myLeads));
        render(myLeads);
    }
    else {
        alert("Please enter a vaild URL!");
    }
})

tabBtn.addEventListener("click", function () {
    chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
        myLeads.push(tabs[0].url);
        localStorage.setItem("myLeads", JSON.stringify(myLeads));
        render(myLeads);
    })
})

deleteBtn.addEventListener("dblclick", function () {
    localStorage.clear();
    myLeads = [];
    render(myLeads);
})

function isUrl(url) {
    const regex = /^(?:\w+:)?\/\/([^\s\.]+\.\S{2}|localhost[\:?\d]*)\S*$/;
    return regex.test(url);
}