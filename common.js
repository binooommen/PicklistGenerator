// Setting the message for mandatory
function checkMandatory(fieldName) {
	$("span").text("Fill " + fieldName +"!").show().fadeOut(1000);
}
// Generate the file
function makeFile(text) {
	var data = new Blob([text], {type: 'json'});
	var textFile = window.URL.createObjectURL(data);
	return textFile;
};
// On click for generate file
$(document).ready(function() {
	autosize(document.querySelectorAll('textarea'));
	$("#form-submit").click(function (event) {
		var picklistValues = $("#picklist-values").val();
		if (picklistValues === ''){
			checkMandatory("Picklist Values");
			event.preventDefault();
			return;
		}
		var picklistName = $("#picklist-name").val();
		if (picklistName === ''){
			checkMandatory("Picklist Name");
			event.preventDefault();
			return;
		}
		var values = picklistValues.split('\n');
		if (picklistValues !== '' || picklistName !== '') {
			var data = '[';
			var name = picklistName.replace('.json', '');
			var needRank = $("[name='rank']:checked").val();
			var rankData = '"\n';
			for (var i = 0; i < values.length; i++) {
				values[i] = values[i].replace('\n', '');
				if (needRank === 'Yes') {
					rankData = '",\n		"rank": "' + (i + 1) + '"\n';
				}
				data += '\n\
	{\n\
		"name": "' + name + '",\n\
		"value": "' + values[i] + rankData + '\
	},';
			}
			data = data.slice(0, -1);
			data += '\n]'
			$("#main-form").hide();
			$("#picklist-download").show();
			$("#picklist-output").val(data);
			autosize.update($("#picklist-output"));
		}
	});

	$("#form-back").click(function (event) {
		$("#main-form").show();
		$("#picklist-download").hide();
	});

	$("#form-clear").click(function (event) {
		location.reload();
	});

	$("#picklist-file").click(function (event) {
		var data = $("#picklist-output").val();
		var file = makeFile(data);
		this.href = file;
		this.download = $("#picklist-name").val();
	});

});