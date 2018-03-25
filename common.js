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
		var picklistValues = $("#picklist-values").val();
		if (picklistValues === ''){
			checkMandatory("Fill Picklist Values!");
			event.preventDefault();
			return;
		}
		var values = picklistValues.split('\n');
		var picklistName = $("#picklist-name").val();
		if (picklistName === ''){
			checkMandatory("Fill Picklist Name!");
			event.preventDefault();
			return;
		}
		var addParent = false;
		var parentValues;
		if ($("[name='picklist-parent']:checked").val() === 'Yes') {
			var parentPicklistValues = $("#parent-picklist-values").val();
			if (parentPicklistValues === ''){
				checkMandatory("Fill Parent Picklist Values!");
				event.preventDefault();
				return;
			} else {
				parentValues = parentPicklistValues.split('\n');
				if (values.length !== parentValues.length) {
					checkMandatory("Row Length Mismatch");
					event.preventDefault();
					return;
				}
			}
			addParent = true;
		}
		if (picklistValues !== '' || picklistName !== '') {
			var data = '[';
			var name = picklistName.replace('.json', '');
			var needRank = $("[name='picklist-rank']:checked").val();
			var rankData = '';
			var parentData = '';
			for (var i = 0; i < values.length; i++) {
				values[i] = values[i].replace('\n', '').trim();
				if (needRank === 'Yes') {
					rankData = ',\n		"rank": "' + (i + 1) + '"';
				}
				if (addParent) {
					var multiParent = parentValues[i].split(',');
					parentData = ',\n		"parents": [';
					for (var count = 0; count < multiParent.length; count++) {
						parentData += '"' + multiParent[count].trim() + '"';
						if (multiParent.length !== (count + 1)) {
							parentData += ', ';
						}
					}
					parentData += ']';
				}
				data += '\n\
	{\n\
		"name": "' + name + '",\n\
		"value": "' + values[i] + '"' + parentData + rankData +'\
\n	},';
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

	$("#new-picklist").click(function (event) {
		location.reload();
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

	$("#picklist-parent").click(function (event) {
		if ($("[name='picklist-parent']:checked").val() === 'Yes') {
			$("#div-picklist-values").css("width","49%");
			$("#div-picklist-parent-values").show();
			$("#div-label-picklist-values").css("width","49%");
			$("#div-label-picklist-parent-values").show();
			$("#picklist-values").addClass("line-numbers");
			// watch for our parent, and init and auto size it
			if(! $('#line_count_ui_parent-picklist-values').length) {
				var parentsCoutner = new window.lineCounter({
					count: 'parent-picklist-values',
					defaultCount: 4
				});
				autosize($("#parent-picklist-values").get(0));
			}
			autosize.update($("#parent-picklist-values"));
			autosize.update($("#picklist-values"));
		} else {
			$("#div-picklist-values").css("width","100%");
			$("#div-label-picklist-values").css("width","100%");
			$("#div-label-picklist-parent-values").hide();
			$("#div-picklist-parent-values").hide();
			$("#picklist-values").removeClass("line-numbers");
			autosize.update($("#picklist-values"));
		}
	});

});
