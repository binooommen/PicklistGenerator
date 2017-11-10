//  Counts the lines in a textarea
//  @param count - the element id to count
//  @param counter - the element to display the counter
//  could totaly be optimized but it is at least a start
(function(root) {
	function lineCounter (options) {
		this.picklistLineCount = 0;
		this.picklistTextarea = document.getElementById(options.count);
		this.picklistNumbers = document.getElementById(options.counter);
		this.picklistTextarea.addEventListener("keyup", this.display.bind(this), false);
		this.display();
	}

	var proto = lineCounter.prototype;

	proto.count = function () {
		return this.picklistTextarea.value.split(/\r*\n/).length;
	};

	proto.display = function() {
		if(this.picklistLineCount === this.count()) {
			return false;
		}
		this.picklistLineCount = this.count();
		this.picklistNumbers.innerHTML = "";
		for(var i = 1; i <= this.picklistLineCount; i++) {
			this.picklistNumbers.appendChild(this.createNumberDisplay(i));
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
