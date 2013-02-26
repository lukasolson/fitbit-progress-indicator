$(document).ready(function() {
	$("input").each(function() {
		$(this).val(localStorage[$(this).attr("id")]);
	});
		
	$("#save").click(function() {
		$("input").each(function() {
			localStorage[$(this).attr("id")] = $(this).val();
		});
		
		$("body").append("Options saved.");
	});
});