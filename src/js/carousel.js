+function ($) {

  "use strict";

  // Carousel Defaults
  // -------------------
  var defaults = {
    image: {
      ratio: Math.floor(4/3)
    },
    toughness: 0.25,
    isTouch: 'createTouch' in document
  }

  // Carousel Constructor
  // -------------------
  var Carousel = function (element, options) {

    var _this = this;

    // Carousel & Items
    this.$element = $(element);
    this.$itemsWrapper = $(element).find('.touch-carousel-inner');
    this.$items = this.$element.find('.item');
    this.$controls = this.$element.find('.touch-carousel-control');

    this.options = $.extend(defaults, options, {});

    // Call private methods
    //this._addIndicators();

    // Bind Carousel Mouse Events
    this.options.pause == 'hover' && this.$element
      .on('mouseenter', $.proxy(this.pause, this))
      .on('mouseleave', $.proxy(this.cycle, this))


    // Initialize Touch-optimized Carousel methods.
    // Next statement only for debugging touch events
    // on a mouse interface. Remove the next line for production.
    this.options.isTouch = true;

    // Add touch class to add specific css styles
    // for non-touch enabled devices.
    if(!this.options.isTouch) {
      this.$element.addClass('non-touch');
    } else {
      this.pane_width = 0;
      this.pane_count = 0;
      this.current_pane = 0;
      this.onGesture = false;

      this._setPaneDimensions();
      this._regTouchGestures();
    }
  }

  // Carousel Prototype
  // -------------------
  Carousel.prototype = {
    Constructor: Carousel,

    cycle: function (e) {

      if (!e) this.paused = false
      if (this.interval) clearInterval(this.interval);
      this.options.interval
        && !this.paused
        && (this.interval = setInterval($.proxy(this.next, this), this.options.interval))
      return this
    }

  , getActiveIndex: function () {
      this.$active = this.$element.find('.item.active')
      this.$items = this.$active.parent().children()
      return this.$items.index(this.$active)
    }

  , to: function (pos) {
      var activeIndex = this.getActiveIndex()
        , that = this

      if (pos > (this.$items.length - 1) || pos < 0) return

      if( this.options.isTouch )
        return this._showPane( pos, true);

      if (this.sliding) {
        return this.$element.one('slid', function () {
          that.to(pos)
        })
      }

      if (activeIndex == pos) {
        return this.pause().cycle()
      }

      return this.slide(pos > activeIndex ? 'next' : 'prev', $(this.$items[pos]))
    }

  , pause: function (e) {
      if (!e) this.paused = true

      if ($.support.transition) {
        if (this.$element.find('.next, .prev').length && $.support.transition.end) {
          this.$element.trigger($.support.transition.end)
          this.cycle(true)
        }
      }
      clearInterval(this.interval)
      this.interval = null
      return this
    }

  , next: function () {

      if( this.options.isTouch )
        return this.nextPane();

      if (this.sliding) return;
      return this.slide('next')
    }

  , prev: function () {
      if( this.options.isTouch )
        return this.prevPane();

      if (this.sliding) return
      return this.slide('prev')
    }

  , slide: function (type, next) {
      var $active = this.$element.find('.item.active')
        , $next = next || $active[type]()
        , isCycling = this.interval
        , direction = type == 'next' ? 'left' : 'right'
        , fallback  = type == 'next' ? 'first' : 'last'
        , that = this
        , e

      this.sliding = true

      isCycling && this.pause()

      $next = $next.length ? $next : this.$element.find('.item')[fallback]()

      e = $.Event('slide', {
        relatedTarget: $next[0]
      , direction: direction
      })

      if ($next.hasClass('active')) return

      if ($.support.transition) {
        this.$element.trigger(e)
        if (e.isDefaultPrevented()) return
        $next.addClass(type)
        $next[0].offsetWidth // force reflow
        $active.addClass(direction)
        $next.addClass(direction)

        this.$element.find('.item').one($.support.transition.end, function (e) {

          $next.removeClass([type, direction].join(' ')).addClass('active')
          $active.removeClass(['active', direction].join(' '))
          that.sliding = false
          setTimeout(function () { that.$element.trigger('slid') }, 0)
        })
      } else {
        this.$element.trigger(e)
        if (e.isDefaultPrevented()) return
        $active.removeClass('active')
        $next.addClass('active')
        this.sliding = false
        this.$element.trigger('slid')
      }

      isCycling && this.cycle()

      return this
    },

    //
    //  register events for touch devices using hammer.js
    _regTouchGestures : function() {
      var _this = this;

      this.$itemsWrapper
        .hammer({ drag_lock_to_axis: true })
        .on("release dragleft dragright swipeleft swiperight", $.proxy(this._handleHammer, this));
    },

    _setPaneDimensions: function() {

      var _this = this;

      this.pane_width = this.$element.width();
      this.pane_count = this.$items.length;

      // Set items & wrapper to fixed width
      this.$itemsWrapper.width( this.pane_width * this.pane_count );
      this.$items.width( this.pane_width );

      // trigger _showPane for re-position the current pane
      // after re-calculation of pane width.
      this._showPane( this.current_pane );

    },

    _showPane: function( index ) {

        // remove class from prev pane
        this.$items.eq( this.current_pane ).toggleClass('active');


        // Last Item reached
        if( index >= this.pane_count) {
          this.pause();
        }

        // between the bounds
        // add active state to the current pane
        index = Math.max(0, Math.min(index, this.pane_count-1));
        var $next = this.$items.eq( index ).toggleClass('active');
        this.current_pane = index;

        var offset = -((100/this.pane_count) * this.current_pane);
        this._setContainerOffset(offset, true);

        return this;
    },

    _setContainerOffset: function(percent, animate) {

        var $container = this.$itemsWrapper;

        $container.removeClass('animate');

        if(animate) {
            $container.addClass('animate');
        }

        // CSS3 Transforms3D Animation
        if($.support.csstransforms3d) {
            this.onGesture = true;
            $container.css("transform", "translate3d("+ percent +"%,0,0) scale3d(1,1,1)");
        }

        // CSS3 Transform Animation
        else if($.support.csstransforms) {
            this.onGesture = true;
            $container.css("transform", "translate("+ percent +"%,0)");
        }

        // CSS3 Transition
        else {
          var px = (( this.pane_width * this.pane_count) / 100) * percent;
          $container.css("left", px +"px");
        }

        // Transition Complete
        if( $.support.transition ) {
          $container.one($.support.transition.end, function (e) {
            $container.removeClass('animate');
            this.onGesture = false;
          });
        } else {
          $container.removeClass('animate');
          this.onGesture = false;
        }
    },

    nextPane : function() {
      return this._showPane( this.current_pane+1, true);
    },
    prevPane : function() {
      return this._showPane( this.current_pane-1, true);
    },


    // Handle hammer.js events
    _handleHammer: function( e ) {
      // disable browser scrolling
      e.gesture.preventDefault();

      if(this.sliding) return;

      // Stop slideshow onGesture
      this.pause();

      switch(e.type) {
          case 'dragright':
          case 'dragleft':
            // stick to the finger
            var pane_offset = -(100/  this.pane_count) * this.current_pane;
            var drag_offset = ((100/ this.pane_width) * e.gesture.deltaX) / this.pane_count;

            // slow down at the first and last pane
            if( (this.current_pane === 0 && e.gesture.direction == Hammer.DIRECTION_RIGHT) ||
                ( this.current_pane == this.pane_count-1 && e.gesture.direction == Hammer.DIRECTION_LEFT)) {
                drag_offset *= this.options.toughness;
            }

            this._setContainerOffset(drag_offset + pane_offset);
            break;

          case 'swipeleft':
              this.nextPane();
              e.gesture.stopDetect();
              break;

          case 'swiperight':
              this.prevPane();
              e.gesture.stopDetect();
              break;

        case 'release':

            // more then 50% moved, navigate
            if(Math.abs(e.gesture.deltaX) > this.pane_width/2) {
                if(e.gesture.direction == 'right') {
                    this.prevPane();
                } else {
                    this.nextPane();
                }
            }
            else {
                this._showPane(this.current_pane, true);
            }
            break;
      }

    }
  }


  // CAROUSEL PLUGIN DEFINITION
  // ==========================

  var old = $.fn.carousel

  $.fn.carousel = function (option) {
    return this.each(function () {
      var $this   = $(this)
      var data    = $this.data('bs.carousel')
      var options = $.extend({}, Carousel.DEFAULTS, $this.data(), typeof option == 'object' && option)
      var action  = typeof option == 'string' ? option : options.slide

      if (!data) $this.data('bs.carousel', (data = new Carousel(this, options)))
      if (typeof option == 'number') data.to(option)
      else if (action) data[action]()
      else if (options.interval) data.pause().cycle()
    })
  }

  $.fn.carousel.Constructor = Carousel


  // CAROUSEL NO CONFLICT
  // ====================

  $.fn.carousel.noConflict = function () {
    $.fn.carousel = old
    return this
  }


  // CAROUSEL DATA-API
  // =================

  $(document).on('click.bs.carousel.data-api', '[data-slide], [data-slide-to]', function (e) {
    var $this   = $(this), href
    var $target = $($this.attr('data-target') || (href = $this.attr('href')) && href.replace(/.*(?=#[^\s]+$)/, '')) //strip for ie7
    var options = $.extend({}, $target.data(), $this.data())
    var slideIndex = $this.attr('data-slide-to')
    if (slideIndex) options.interval = false

    $target.carousel(options)

    if (slideIndex = $this.attr('data-slide-to')) {
      $target.data('bs.carousel').to(slideIndex)
    }

    e.preventDefault()
  })

  $(window).on('load', function () {
    $('[data-ride="touch-carousel"]').each(function () {
      var $carousel = $(this)
      $carousel.carousel($carousel.data())
    })
  })

}(window.jQuery);
