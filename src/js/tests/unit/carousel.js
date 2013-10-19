$(function () {

    module("TouchCarousel")

      test("should be defined on jquery object", function () {
        ok($(document.body).carousel, 'carousel method is defined')
      })

      test("should return element", function () {
        ok($(document.body).carousel()[0] == document.body, 'document.body returned')
      })

      test("should overwrite default carousel", function () {
        ok(typeof $(document.body).carousel().data('touch-carousel') === "object", '"object" TouchCarousel returned')
      })

      test("hammer.js should be defined", function () {
        ok(typeof window.Hammer === "function", '"function" Hammer returned')
      })

      test("should not handle gestures if its currently sliding", 0, function () {
        // @todo: apply tests
      })

      // @todo: test touch gestures & event handler
})
