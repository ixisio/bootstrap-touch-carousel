# Bootstrap TouchCarousel

A drop-in replacement for Twitter Bootstrap's Carousel (v3.00) to enable gestures on touch-enabled devices.
[http://v7.andreasklein.org/articles/bootstrap-touch](http://v7.andreasklein.org/articles/bootstrap-touch)


## Features

* Supported gestures: `dragleft` `dragright` `swipeleft` `swiperight`
* Optimized layout for touch devices
* Build with Less & Grunt
* No extra initializations


## Quick start
Three quick start options are available:

### Get the plugin
- [Download the latest release](https://github.com/ixisio/bootstrap-touch-carousel/archive/master.zip)
- Clone the repo: `git clone git://github.com/ixisio/bootstrap-touch-carousel.git`
- Add as Bootstrap git submodule `git submodule add git://github.com/ixisio/bootstrap-touch-carousel.git /vendor/your-sm`

### See the plugin in action

In case you are using a desktop to test this plugin you will need to emulate touch in your browser. Use Chrome to do so:

* Open Chrome Developer Tools
* Click on the Settings icon and open up the overrides panel
* Check "*Enable*" Overwrites and scroll down and check "*Enable touch events*"
* Refresh the Page


## How it works

This jQuery Plugin is designed to add touch-support to your existing bootstrap carousel. The only thing you have to do, is to load these files into your existing Bootstrap project:

`/dist/js/bootstrap-touch-carousel.js`
`/dist/css/bootstrap-touch-carousel.css`


## Compiling CSS and JavaScript

> Bootstrap uses [Grunt](http://gruntjs.com/) with convenient methods for working with the framework. It's how we compile our code, run tests, and more. To use it, install the required dependencies as directed and then run some Grunt commands.

[See twbs docs](https://github.com/twbs/bootstrap/blob/master/README.md)

### Available Grunt Tasks

* `grunt` Default tasks watches for JavaScript & LESS Changes
* `grunt build` creates a distribution build
* `grunt test` provides some qunit tests

## Changelog

**0.3.0**

* Update to grunt@0.4.2

**0.2.0**
* MSPointer benchmarks
* fixes [#3](https://github.com/ixisio/bootstrap-touch-carousel/issues/3), touch optimizes indicator pills
* [#2](https://github.com/ixisio/bootstrap-touch-carousel/issues/2), display captions on portait orientation iPad
* Create some unittest with qunit
* Documentation

**0.1.0**
* Initial Commit - provides the basic functionality.


## Feature Requests / Future Tasks

* Endless Loops (cycle)
* Live Resize
* Hammer.js custom build (use only whats required)
* ~~MSPointer: Support pointer and gesture events. Tests needed!~~
    Works perfectly! See hammer.js [compatibility table](https://github.com/EightMedia/hammer.js/wiki/Compatibility)
* ~~Optimize indicator pills for touch~~ done! [#3](https://github.com/ixisio/bootstrap-touch-carousel/issues/3)
* Better Documentation
* Unit Tests (qunit)


## Copyright and license

Copyright (c) 2013 ixisio Licensed under the MIT license.
