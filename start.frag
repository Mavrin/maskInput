/*!
 * jQuery numberMask Plugin v1.0.0
 *
 * Licensed under the MIT License
 * Authors: Konstantin Krivlenia
 *          krivlenia@gmail.com
 * Site:  https://github.com/Mavrin/maskInput
 */
(function (factory) {
    if (typeof define === 'function' && define.amd) {
        // AMD. Register as an anonymous module.
        define(['jquery'], factory);
    } else if (typeof module === "object" && module.exports) {
              var $ = require('jquery');
              module.exports = factory($);
    }  else {
        // Browser globals
        factory(jQuery);
    }
}(function ($) {

