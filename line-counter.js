//  Counts the lines in a textarea
//  @param count - the element id to count
//  @param counter - the element to display the counter
//  could totaly be optimized but it is at least a start
(function(root) {
	function lineCounter (options) {
		this.lineCount = 0;
		this.textarea = document.getElementById(options.count);
		this.numbers = document.getElementById(options.counter);
		this.defaultCount = options.defaultCount || 10;
		this.textarea.addEventListener("keydown", this.display.bind(this), false);
		this.textarea.addEventListener("keyup", this.display.bind(this), false);
		this.display();
	}

	var proto = lineCounter.prototype;

	proto.count = function () {
		var count = this.textarea.value.split(/\r*\n/).length;
		return count > this.defaultCount ? count : this.defaultCount;
	};

	proto.display = function() {
		var count = this.count();
		if(this.lineCount === count) {
			return false;
		}
		this.numbers.innerHTML = "";
		for(var i = 1; i <= count; i++) {
			this.numbers.appendChild(this.createNumberDisplay(i));
		}
		return this.lineCount = count;
	};

	proto.createNumberDisplay = function (num) {
		var span = document.createElement("span");
		span.className = "number";
		span.innerText = num;
		return span;
	};

	return root.lineCounter = lineCounter;
})(this);
