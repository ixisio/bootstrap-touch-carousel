/*! 
 * bootstrap-touch-carousel v0.7.1
 * https://github.com/ixisio/bootstrap-touch-carousel.git 
 * 
 * Copyright (c) 2014 (ixisio) Andreas Klein
 * Licensed under the MIT license
 * 
 * 
 * Including Hammer.js@1.0.6dev, http://eightmedia.github.com/hammer.js 
 */ 
+function(a){"use strict";function b(a,b){var c=document.createElement("div").style;for(var d in a)if(void 0!==c[a[d]])return"pfx"==b?a[d]:!0;return!1}function c(){var a=document.createElement("bootstrap"),b={WebkitTransition:"webkitTransitionEnd",MozTransition:"transitionend",OTransition:"oTransitionEnd otransitionend",transition:"transitionend"};for(var c in b)if(void 0!==a.style[c])return{end:b[c]}}function d(){var a=["transformProperty","WebkitTransform","MozTransform","msTransform"];return!!b(a)}function e(){return"WebKitCSSMatrix"in window&&"m11"in new WebKitCSSMatrix}if(!("ontouchstart"in window||navigator.msMaxTouchPoints))return!1;a.fn.emulateTransitionEnd=function(b){var c=!1,d=this;a(this).one(a.support.transition.end,function(){c=!0});var e=function(){c||a(d).trigger(a.support.transition.end)};return setTimeout(e,b),this},a(function(){a.support.transition=c(),a.support.csstransforms=d(),a.support.csstransforms3d=e()});var f="touch-carousel",g=function(b,c){return this.$element=a(b),this.$itemsWrapper=this.$element.find(".carousel-inner"),this.$items=this.$element.find(".item"),this.$indicators=this.$element.find(".carousel-indicators"),this.pane_width=this.pane_count=this.current_pane=0,this.onGesture=!1,this.options=c,this._setPaneDimensions(),this.$items.length<=1?this.disable():(this._regTouchGestures(),void a(window).on("orientationchange resize",a.proxy(this._setPaneDimensions,this)))};g.DEFAULTS={interval:!1,toughness:.25},g.prototype.cycle=function(b){return b||(this.paused=!1),this.interval&&clearInterval(this.interval),this.options.interval&&!this.paused&&(this.interval=setInterval(a.proxy(this.next,this),this.options.interval)),this},g.prototype.to=function(a){return a>this.$items.length-1||0>a?void 0:this._showPane(a)},g.prototype.pause=function(a){return a||(this.paused=!0),clearInterval(this.interval),this.interval=null,this},g.prototype._regTouchGestures=function(){this.$itemsWrapper.add(this.$indicators).hammer({drag_lock_to_axis:!0,preventDefault:!0}).on("release dragleft dragright swipeleft swiperight",a.proxy(this._handleGestures,this))},g.prototype._setPaneDimensions=function(){this.pane_width=this.$element.width(),this.pane_count=this.$items.length,this.$itemsWrapper.width(this.pane_width*this.pane_count),this.$items.width(this.pane_width)},g.prototype._showPane=function(a){this.$items.eq(this.current_pane).toggleClass("active"),a>=this.pane_count&&this.pause(),a=Math.max(0,Math.min(a,this.pane_count-1));this.$items.eq(a).toggleClass("active");this.current_pane=a;var b=-(100/this.pane_count*this.current_pane);return this._setContainerOffset(b,!0,a),this},g.prototype._setContainerOffset=function(b,c,d){var e=this;if(this.$itemsWrapper.removeClass("animate"),c&&this.$itemsWrapper.addClass("animate"),a.support.csstransforms3d)this.onGesture=!0,this.$itemsWrapper.css("transform","translate3d("+b+"%,0,0) scale3d(1,1,1)");else if(a.support.csstransforms)this.onGesture=!0,this.$itemsWrapper.css("transform","translate("+b+"%,0)");else{var f=this.pane_width*this.pane_count/100*b;this.$itemsWrapper.css("left",f+"px")}a.support.transition?this.$itemsWrapper.one(a.support.transition.end,function(){e.$itemsWrapper.removeClass("animate"),e.onGesture=!1,e._updateIndicators(d)}):(this.$itemsWrapper.removeClass("animate"),this.onGesture=!1,this._updateIndicators(d))},g.prototype.next=function(){var b=this.$element.find(".item.active"),c=b.next(),d=a.Event("slide.bs.carousel",{relatedTarget:c[0],direction:"left"});return this.$element.trigger(d),this._showPane(this.current_pane+1),this.$element.trigger("slid"),this},g.prototype.prev=function(){var b=this.$element.find(".item.active"),c=b.prev(),d=a.Event("slide.bs.carousel",{relatedTarget:c[0],direction:"right"});return this.$element.trigger(d),this._showPane(this.current_pane-1),this.$element.trigger("slid"),this},g.prototype._handleGestures=function(a){if(!this.sliding)switch(this.pause(),a.type){case"dragright":case"dragleft":var b=-(100/this.pane_count)*this.current_pane,c=100/this.pane_width*a.gesture.deltaX/this.pane_count;(0===this.current_pane&&a.gesture.direction==Hammer.DIRECTION_RIGHT||this.current_pane==this.pane_count-1&&a.gesture.direction==Hammer.DIRECTION_LEFT)&&(c*=this.options.toughness),this._setContainerOffset(c+b);break;case"swipeleft":this.next(),a.gesture.stopDetect();break;case"swiperight":this.prev(),a.gesture.stopDetect();break;case"release":Math.abs(a.gesture.deltaX)>this.pane_width/2?"right"==a.gesture.direction?this.prev():this.next():this._showPane(this.current_pane,!0)}},g.prototype.disable=function(){return this.$indicators.hide(),this.$element.removeData(f),!1},g.prototype._updateIndicators=function(a){return this.$indicators.length&&(this.$indicators.find(".active").removeClass("active"),this.$indicators.children().eq(a).addClass("active")),this.$element.trigger("slid.bs.carousel"),this};var h=a.fn.carousel;a.fn.carousel=function(b){return this.each(function(){var c=a(this),d=c.data(f),e=a.extend({},g.DEFAULTS,c.data(),"object"==typeof b&&b),h="string"==typeof b?b:e.slide;d||c.data(f,d=new g(this,e)).addClass(f),"number"==typeof b?d.to(b):h?d[h]():e.interval&&d.pause().cycle()})},a.fn.carousel.Constructor=g,a.fn.carousel.noConflict=function(){return a.fn.carousel=h,this},a(document).off("click.bs.carousel").on("click.bs.carousel.data-api","[data-slide], [data-slide-to]",function(b){var c,d=a(this),e=a(d.attr("data-target")||(c=d.attr("href"))&&c.replace(/.*(?=#[^\s]+$)/,"")),g=a.extend({},e.data(),d.data()),h=d.attr("data-slide-to");h&&(g.interval=!1),e.carousel(g),(h=d.attr("data-slide-to"))&&e.data(f).to(h),b.preventDefault()})}(window.jQuery);