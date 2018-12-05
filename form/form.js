// Setting the message for mandatory
function checkMandatory(msg) {
	$("#error-msg-span").text(msg).show().fadeOut(1000);
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
		var fieldValues = $("#field-values").val();
		if (fieldValues === ''){
			checkMandatory("Fill Field Values!");
			event.preventDefault();
			return;
		}
		var values = fieldValues.split('\n');
		if (fieldValues !== '') {
			var data = '[';
			var isIndex = $("[name='which-form-radio']:checked").val() === 'index';
			var isForm = $("[name='which-form-radio']:checked").val() === 'form';
			var extraInfo = '';
			for (var i = 0; i < values.length; i++) {
				values[i] = values[i].replace('\n', '').trim();
				if (isIndex) {
					extraInfo = ',\n		caption: \'' + values[i] + '\',\n\
		kind: \'editable\',\n\
		type: \'textbox\'';
				}
				if (isForm) {
					extraInfo = ',\n		displayRule: \'\'';
				}
				data += '\n\
	{\n\
		field: \'' + values[i] + '\'\
' + extraInfo + '\
\n	},';
			}
			data = data.slice(0, -1);
			data += '\n]'
			$("#main-form").hide();
			$("#form-download").show();
			$("#form-output").val(data);
			autosize.update($("#form-output"));
		}
	});

	$("#form-back").click(function (event) {
		$("#main-form").show();
		$("#form-download").hide();
	});

	$("#new-form").click(function (event) {
		location.reload();
	});

	$("#form-clear").click(function (event) {
		location.reload();
	});

	$("#form-file").click(function (event) {
		var data = $("#form-output").val();
		var file = makeFile(data);
		this.href = file;
		this.download = 'test.js';
	});

});