chrome.extension.onMessage.addListener(function(request, sender, sendResponse) {
	sendResponse(localStorage);
});