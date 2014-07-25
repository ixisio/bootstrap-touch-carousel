+function ($) {
  "use strict";

  /**
   * Return whole plugin if touch is not supported
   */
  if (!("ontouchstart" in window || navigator.msMaxTouchPoints)) {
    return false;
  }

  /**
   * testProps()
   * @description Test properties with all major prefixes in current browser
   * @param {Array} props List of props to be tested
   * @param {String} prefixed Use Boolean or prefixed css property as return value
   * @return {String/Boolean} Prefixed css property or Boolean based on `prefixed` param
   */
  function testProps( props, prefixed ) {
    var _style = document.createElement('div').style;
    for ( var i in props ) {
      if ( _style[ props[i] ] !== undefined ) {
        return prefixed == 'pfx' ? props[i] : true;
      }
    }
    return false;
  }

  /**
   * transitionEnd()
   * @description Test browser transition support
   * @return {String} Return supported transition event hooks
   */
  function transitionEnd() {
    var el = document.createElement('bootstrap')
    var transEndEventNames = {
      'WebkitTransition' : 'webkitTransitionEnd',
      'MozTransition'    : 'transitionend',
      'OTransition'      : 'oTransitionEnd otransitionend',
      'transition'       : 'transitionend'
    }

    for (var name in transEndEventNames) {
      if (el.style[name] !== undefined) {
        return { end: transEndEventNames[name] }
      }
    }
  }

  /**
   * csstransforms()
   * @description Test browser CSS transforms support
   * @return {Boolean} return support condition result
   */
  function csstransforms() {
    var prefixes = ['transformProperty', 'WebkitTransform', 'MozTransform', 'msTransform'];
    return !!testProps( prefixes );
  }

  /**
   * csstransforms3d()
   * @description Test browser CSS transforms3d support
   * @todo Test more than only webkit
   * @return {Boolean} return support condition result
   */
  function csstransforms3d() {
    return ('WebKitCSSMatrix' in window && 'm11' in new WebKitCSSMatrix());
  }

  /**
   * Anonymous function
   * @description Save functions to jquery.support namespace
   * @return {null}
   */
  $(function () {
    $.support.transition = transitionEnd()
    $.support.csstransforms = csstransforms()
    $.support.csstransforms3d = csstransforms3d()
  })

}(window.jQuery);
