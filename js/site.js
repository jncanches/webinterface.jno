//triggers scrollUp and scrollDown
//easier to manage visibility of nav bar
$(function() {
	$(window).data("scrollTop", $(window).scrollTop());
	$(window).scroll("scrollDown", function() {
		var scrollWay = "DOWN";
		if ($(window).data("scrollTop") > $(window).scrollTop()) {
			scrollWay = "UP";
		}
		$(window).data("scrollTop", $(window).scrollTop());
		if (scrollWay == "UP") {
			$(window).trigger("scrollUp");
		} else {
			$(window).trigger("scrollDown");
		}
	});
});

var _site;

var Site = function($header, $nav, $content, $footer, options) {
	if (!_site) {
		this.$header = $header;
		this.$nav = $nav;
		this.$content = $content;
		this.$footer = $footer;
		
		this.options = $.extend({}, Site.defaultOptions, options);
		this.initialize();
		_site = this;
	}
	return _site;
};

Site.defaultOptions = {
};

Site.prototype = {
	initialize: function() {
		this.storeOriginalPositions();
		this.mapScrollEvents();
	},
	
	storeOriginalPositions: function() {
		$(window).data("scrollTop", $(window).scrollTop());
		this.$nav.data("originalTop", this.$nav.position().top);
		this.$nav.data("originalPosition", this.$nav.css("position"));
		this.$nav.data("originalHeight", this.$nav.height());		
	},
	
	mapScrollEvents: function() {
		var that = this;
		$(window).on("scrollDown", function() {
			that.$nav.stop().slideUp(400);
		});
		$(window).on("scrollUp", function() {
			if ($(window).scrollTop() > that.$nav.data("originalTop")) {
				that.$nav.css({position: "fixed"});
				that.$nav.css({top: 0});
				that.$nav.stop().slideDown(100);
			} else {
				that.$nav.css({position: that.$nav.data("originalPosition")});
				that.$nav.css({top: that.$nav.data("originalTop")});
				that.$nav.stop().height(that.$nav.data("originalHeight"));
			}
		});
	}
};

//static functions
Site.staticFunction = function() {
};