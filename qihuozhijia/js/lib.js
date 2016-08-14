function Slider(elm) {
	this.box = elm;
	this.Num = 0;
	this.liWidth = this.box.children("li").eq(0).outerWidth(true);
}
Slider.prototype.init = function() {
	var This = this;
	this.box.css({
		left: 0,
		width: This.liWidth * this.box.children("li").length + "px"
	});
	if (this.box.width() <= this.box.parent("div").width()) {
		$(".slider-prev").attr("disabled", "disabled");
		$(".slider-next").attr("disabled", "disabled");
	}
	$(".slider-next").on("click", function() {
		This.move(-1);
	});
	$(".slider-prev").on("click", function() {
		This.move(1);
	});
}
Slider.prototype.move = function(num) {
	this.Num += num;
	if (this.box.position().left <= (this.box.parent("div").width() - this.box.width() + this.liWidth)) {
		$(".slider-next").attr("disabled", "disabled");
	}
	if (this.Num >= 0) {
		$(".slider-prev").attr("disabled", "disabled");
		$(".slider-next").removeAttr("disabled");
	}
	if (this.Num < 0) {
		$(".slider-prev").removeAttr("disabled");
	}
	var left = this.Num * this.liWidth;
	this.box.stop().animate({
		left: left + "px"
	}, 100);
}

function Tab(wrap, options) {
	this.tabWrap = wrap;
	this.tabHdCon = this.tabWrap.find(".tab-hd-con");
	this.tabHdContent = this.tabWrap.find(".tab-bd-content");
	this.timer = null;
	this.autoPlayTimer = null;
	this.options = { //配置初始化
		autoPlay: false, //自动播放时间
		tabEvent: "click", //触发时间
		now: 0, //默认第几个显示
		delay: false //延迟时间
	}
	$.extend(this.options, options);
	this.init();
}
Tab.prototype.init = function() {
	var _this = this;
	this.tabHdCon.eq(this.options.now).addClass("active");
	this.tabHdContent.eq(this.options.now).css("display", "block");
	this.tabHdCon.on(this.options.tabEvent, function() {
		if (_this.options.tabEvent == "mouseover" && (!isNaN(_this.options.delay))) { //延迟切换
			var This = this;
			_this.timer = setTimeout(function() {
				_this.change(This);
			}, _this.options.delay);
		} else {
			_this.change(this);
		}
	}).mouseout(function() {
		clearTimeout(_this.timer);
	});
	if (this.options.autoPlay) { //自动切换
		this.autoPlay();
		this.tabWrap.hover(function() {
			clearInterval(_this.options.autoPlayTimer);
		}, function() {
			_this.autoPlay();
		});
	}
}
Tab.prototype.autoPlay = function() {
	var _this = this;
	_this.options.autoPlayTimer = setInterval(function() {
		if (_this.options.now == _this.tabHdCon.length - 1) {
			_this.options.now = 0;
		} else {
			_this.options.now++;
		}
		_this.tabHdCon.removeClass("active");
		_this.tabHdCon.eq(_this.options.now).addClass("active");
		_this.tabHdContent.css("display", "none");
		_this.tabHdContent.eq(_this.options.now).css("display", "block");
	}, this.options.autoPlay);
}
Tab.prototype.change = function(obj) {
	this.tabHdCon.removeClass("active");
	this.options.now = $(obj).index();
	this.tabHdCon.eq(this.options.now).addClass("active");
	this.tabHdContent.css("display", "none");
	this.tabHdContent.eq(this.options.now).css("display", "block");
}