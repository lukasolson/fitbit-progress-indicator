function secondsToPrettyInterval(seconds) {
	var minutes = Math.floor(seconds / 60),
		hours = Math.floor(minutes / 60);
	
	minutes = minutes % 60;
	seconds = seconds % 60;
	
	var timeString = "";
	if (hours > 0) timeString += hours + " hour" + (hours !== 1 ? "s" : "") + ", ";
	if (minutes > 0) timeString += minutes + " minute" + (minutes !== 1 ? "s" : "") + ", ";
	timeString += seconds + " second" + (seconds !== 1 ? "s" : "");
	
	return timeString;
}

$(document).ready(function() {
	chrome.extension.sendMessage("", function(storage) {
		storage["wake_hours"] = storage["wake_hours"] || "07:00";
		storage["sleep_hours"] = storage["sleep_hours"] || "23:00";
		storage["steps_per_min"] = storage["steps_per_min"] || "110";
		setTimeout(function () {
			var wakeHour = (parseInt(storage["wake_hours"], 10) + parseInt(storage["wake_hours"].substring(3), 10) / 60) || 7,
				sleepHour = (parseInt(storage["sleep_hours"], 10) + parseInt(storage["sleep_hours"].substring(3), 10) / 60) || 23,
				awakeHours = sleepHour - wakeHour,
				stepsPerHour = (parseInt(storage["steps_per_min"], 10) * 60) || 100;
			
			var steps = parseInt($(".steps_taken .highlight1").text() || $(".steps span span").eq(0).text()),
				goalSteps = parseInt($(".steps_taken").next().find("span").eq(2).text().replace(",", "") || $(".steps span span").eq(2).text());
		
			if (steps > goalSteps) {
				addMessage("Great job! Take the rest of the day off.");
				return;
			}
		
			var now = new Date(),
				hours = now.getHours() + now.getMinutes() / 60 + now.getSeconds() / 60 / 60 - wakeHour;
		
			var stepsExpected = Math.floor(hours / awakeHours * goalSteps),
				stepsBehind = stepsExpected - steps;
		
			if (stepsBehind > 0) {
				var stepsNeeded = Math.floor(stepsBehind / (1 - goalSteps / stepsPerHour / awakeHours)),
					secondsNeeded = Math.floor(stepsNeeded / (stepsPerHour / 60 / 60));
			
				addMessage("Go out and walk for " + secondsToPrettyInterval(secondsNeeded) + " (" + stepsNeeded + " steps)");
			} else {
				addMessage("You're doing great! You can relax for " + secondsToPrettyInterval(Math.round(-stepsBehind / (goalSteps / awakeHours / 60 / 60))));
			}
		}, 1500);
	});
});

function addMessage(message) {
	$(".dataBlockContainer .dataBlock").eq(0).append(
		"<ul id=\"milestone_teaser\" class=\"clearfix\">" +
		"	<li class=\"left\">" +
		"		<div class=\"milestone_desc tt\">" + message + "</div>" +
		"	</li>" +
		"	<li class=\"right\"></li>" +
		"</ul>"
	)[0] || alert(message);
}