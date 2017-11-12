//  Counts the lines in a textarea
//  @param count - the element id to count
//  @param counter - the element to display the counter
//  could totaly be optimized but it is at least a start
(function(root) {
	function lineCounter (options) {
		if(typeof options !== 'object' || !options.count) {
			throw new Error("A count DOM element id must be provided.");
		}
		this.textareaId = options.count;
		this.textarea = document.getElementById(this.textareaId);
		this.numbers = document.createElement("div");
		this.createDisplay();
		this.defaultCount = Math.abs(options.defaultCount || 10);
		this.paddingLeft = Math.abs(options.paddingLeft || 5);
		this.textarea.addEventListener("keydown", this.display.bind(this), false);
		this.textarea.addEventListener("keyup", this.display.bind(this), false);
		this.numbersStyle = root.getComputedStyle(this.numbers, null);
		this.textareaStyle = root.getComputedStyle(this.textarea, null);
		this.display();
	}

	var proto = lineCounter.prototype;

	proto.count = function () {
		var count = this.textarea.value.split(/\r*\n/).length;
		return count > this.defaultCount ? count : this.defaultCount;
	};

	proto.display = function() {
		var count = this.count();
		this.numbers.innerHTML = "";
		for(var i = 1; i <= count; i++) {
			this.numbers.appendChild(this.createNumberDisplay(i));
		}
		// this might be able to be moved, but its good for now
		return this.textarea.style.paddingLeft =
			parseInt(this.numbersStyle.width) + this.paddingLeft + 'px';
	};

	proto.createDisplay = function() {
		var lineCounterUi = document.createElement("div");
		lineCounterUi.style.position = "relative";
		var clone = this.textarea.cloneNode();
		clone.classList.add(this.textareaId);
		lineCounterUi.appendChild(clone);
		this.addNumberStyles();
		lineCounterUi.prepend(this.numbers);
		this.textarea.parentNode.replaceChild(lineCounterUi, this.textarea);
		return this.textarea = 
			lineCounterUi.getElementsByClassName(this.textareaId)[0];
	};

	proto.createNumberDisplay = function (num) {
		var span = document.createElement("span");
		span.className = "number";
		span.id = "number_" + num;
		span.innerText = num;
		span.setAttribute('data-number', num);
		span.style.display = "block";
		span.style.lineHeight = this.textareaStyle.lineHeight;
		span.style.fontSize = this.textareaStyle.fontSize;
		span.style.textAlign = "center";
		span.style.padding = "0 .4em";
		return span;
	};

	proto.addNumberStyles = function() {
		this.numbers.style.height = "100%";
		this.numbers.style.position = "absolute";
		this.numbers.style.top = 0;
		this.numbers.style.bottom =  0;
		this.numbers.style.left = 0;
		this.numbers.style.padding =  0;
		this.numbers.style.marginRight = "5px";
		this.numbers.style.borderRight = "1px solid #9d9d9d";
		this.numbers.style.overflow = "hidden";
		this.numbers.style.display = "inline-block";
		this.numbers.style.color = "#9d9d9d";
		this.numbers.style.backgroundColor = "#ccc";
		this.numbers.style.zIndex =  1;	
	};

	return root.lineCounter = lineCounter;
})(this);
