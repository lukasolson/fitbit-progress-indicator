if (!localStorage.getItem("initialized")) {
	chrome.tabs.create({url: "options.html"});
	localStorage.setItem("initialized", true);
}

chrome.extension.onMessage.addListener(function(request, sender, sendResponse) {
	sendResponse(localStorage);
});