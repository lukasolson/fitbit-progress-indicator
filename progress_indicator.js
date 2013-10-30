$(document).ready(function () {
	var steps = -1;

	var timeout = setTimeout(function getSteps() {
		var newSteps = parseFloat($(".steps .number").eq(0).text().replace(",", ""));
		if (newSteps === steps) {
			var stepsGoal = parseFloat($(".steps .number").eq(2).text().replace(",", ""));
			if (newSteps >= stepsGoal) return;
			
			var minutesNeeded = Math.ceil(calculateMinutesNeeded(newSteps, stepsGoal, 100));

			var dashHeader = $(".dashHeader").css("position", "relative"),
				element = $("<div>" + (minutesNeeded > 0 ? "Walk" : "Relax") + " for " + Math.abs(minutesNeeded) + " mins<div>")
					.appendTo(dashHeader)
					.css({
						"background-color": (minutesNeeded > 60 ? "#55C2C2" : (minutesNeeded > 0 ? "#FF6D43" : "#9ADE11")),
						"box-shadow": "0 3px 3px " + (minutesNeeded > 60 ? "#009999" : (minutesNeeded > 0 ? "#D54C01" : "#8BC90E")),
						"border-radius": "20px",
						"color": "white",
						"padding": "8px 21px",
						"position": "absolute"
					});

			return element
				.hide()
				.css({
					"left": (dashHeader.width() / 2 - element.outerWidth(true) / 2) + "px"
				})
				.fadeIn();
		}

		steps = newSteps;
		timeout = setTimeout(getSteps, 50);
	}, 50);
});

function calculateMinutesNeeded(steps, stepsGoal, stepsPerMinute) {
	var now = new Date(),
		elapsedDayPercent = (now.getHours() + (now.getMinutes() / 60)) / 24,
		stepsExpected = elapsedDayPercent * stepsGoal,
		stepsBehind = stepsExpected - steps,
		stepsNeeded = stepsBehind / (1 - stepsGoal / stepsPerMinute / 60 / 24);

	return stepsBehind > 0 ? stepsNeeded / stepsPerMinute : stepsBehind / (stepsGoal / 24 / 60);
}