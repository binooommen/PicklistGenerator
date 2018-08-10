// Setting the message for mandatory
function checkMandatory(msg) {
	$("#error-msg-span").text(msg).show().fadeOut(1000);
}
function camelize(str) {
	return str.replace(/(?:^\w|[A-Z]|\b\w)/g, function(letter, index) {
	  return index == 0 ? letter.toLowerCase() : letter.toUpperCase();
	}).replace(/\s+/g, '');
  }
// On click for generate file
$(document).ready(function() {
	autosize(document.querySelectorAll('textarea'));
	$("#form-camel-submit").click(function (event) {
		var camelValues = $("#camel-values").val();
		if (camelValues === ''){
			checkMandatory("Fill Values!");
			event.preventDefault();
			return;
		}
		var values = camelValues.split('\n');
		if (camelValues !== '') {
			var data = '';
			for (var i = 0; i < values.length; i++) {
				data += camelize(values[i].replace('\n', '').trim());
				data += '\n';
			}
			data = data.slice(0, -1);
			$("#camel-output-values").val(data);
			autosize.update($("#camel-output-values"));
		}
	});

	$("#form-camel-clear").click(function (event) {
		location.reload();
	});

});

// Go to the top of the page functionality
window.onscroll = function() {scrollFunction()};

function scrollFunction() {
    if (document.documentElement.scrollTop > 900) {
        document.getElementById("goTopBtn").style.display = "block";
    } else {
        document.getElementById("goTopBtn").style.display = "none";
    }
}

// When the user clicks on the button, scroll to the top of the document
function topFunction() {
    document.body.scrollTop = 0;
    document.documentElement.scrollTop = 0;
}