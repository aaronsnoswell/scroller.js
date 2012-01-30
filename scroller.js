/*! Copyright (c) 2012 Aaron Snoswell (http://elucidatedbinary.com)
 * Licensed under the MIT License (LICENSE.txt).
 *
 * Based on the jquery mousewheel plugin by Brandon Aaron (https://github.com/brandonaaron/jquery-mousewheel)
 *
 * Version: 1.0
 */


;(function(global) {

    var types = ['DOMMouseScroll', 'mousewheel'];
    
    function handler(event, callback) {
        var orgEvent = event || window.event,
            args = [].slice.call(arguments, 2),
            delta = 0,
            returnValue = true,
            deltaX = 0,
            deltaY = 0;
        
        // Add event type
        event.type = "mousewheel";
        
        // Old school scrollwheel delta
        if ( orgEvent.wheelDelta ) { delta = orgEvent.wheelDelta/120; }
        if ( orgEvent.detail     ) { delta = -orgEvent.detail/3; }
        
        // New school multidimensional scroll (touchpads) deltas
        deltaY = delta;
        
        // Gecko
        if (orgEvent.axis !== undefined && orgEvent.axis === orgEvent.HORIZONTAL_AXIS) {
            deltaY = 0;
            deltaX = -1*delta;
        }
        
        // Webkit
        if (orgEvent.wheelDeltaY !== undefined) { deltaY = orgEvent.wheelDeltaY/120; }
        if (orgEvent.wheelDeltaX !== undefined) { deltaX = -1*orgEvent.wheelDeltaX/120; }
        
        // Add event and delta to the front of the arguments
        args.unshift(event, delta, deltaX, deltaY);
        
        var bubble = callback.apply(this, args);
        if(bubble === false) {
            event.stopPropagation();
        }
    }
    
    function handle_scroll(element, callback) {
        
        // Allow sizzle-esque selectors
        if(typeof(element) == "string") {
            element = global.document.querySelector(element);
            if(element === null) return;
        } else if(typeof(element) == "function") {
            callback = element;
            element  = global;
        }
        
        var callback_handler = function(e) {
            handler(e, callback);
        }
        
        if(element.addEventListener) {
            for(var i=types.length; i;) {
                element.addEventListener(types[--i], callback_handler, false);
            }
        } else {
            element.onmousewheel = callback_handler;
        }
        
        return callback_handler;
    }
    
    function handle_unscroll(element, callback) {
    
        // Allow sizzle-esque selectors
        if(typeof(element) == "string") {
            element = global.document.querySelector(element);
            if(element === null) return;
        }
        
        if(element.removeEventListener) {
            for(var i=types.length; i;) {
                element.removeEventListener(types[--i], callback, false);
            }
        } else {
            element.onmousewheel = null;
        }
    }
    
    global.scroller = handle_scroll;
    global.descroller = handle_unscroll;
    

})(this);




