//  Counts the lines in a textarea
//  @param count - the element id to count
//  @param counter - the element to display the counter
//  could totaly be optimized but it is at least a start
(function(root) {
	function lineCounter (options) {
		this.lineCount = 0;
		this.textarea = document.getElementById(options.count);
		this.numbers = document.getElementById(options.counter);
		this.textarea.addEventListener("keyup", this.display.bind(this), false);
		this.display();
	}

	var proto = lineCounter.prototype;

	proto.count = function () {
		return this.textarea.value.split(/\r*\n/).length;
	};

	proto.display = function() {
		if(this.lineCount === this.count()) {
			return false;
		}
		this.lineCount = this.count();
		this.numbers.innerHTML = "";
		for(var i = 1; i <= this.lineCount; i++) {
			this.numbers.appendChild(this.createNumberDisplay(i));
		}
	};

	proto.createNumberDisplay = function (num) {
		var span = document.createElement("span");
		span.className = "number";
		span.innerText = num;
		return span;
	};

	return root.lineCounter = lineCounter;
})(this);
