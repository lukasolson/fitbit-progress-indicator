$(document).ready(function () {
	var steps = -1;

	var timeout = setTimeout(function getSteps() {
		var newSteps = parseFloat($(".steps .number").eq(0).text());
		if (newSteps === steps) {
			var minutesNeeded = Math.ceil(calculateMinutesNeeded(newSteps, parseFloat($(".steps .number").eq(2).text()), 100));
			return $("<span>(" + (minutesNeeded > 0 ? "Walk" : "Relax") + " for " + Math.abs(minutesNeeded) + " mins)<span>").hide().appendTo($(".steps .main h2")).fadeIn();
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

	return (stepsBehind > 0 ? stepsNeeded : stepsBehind) / stepsPerMinute;
}