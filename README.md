
# scroller.js

Scroller is a simple stand-alone JavaScript shim that adds cross-browser mouse scroll support. It's the tie to go along with [keymaster](https://github.com/madrobby/keymaster)'s tux.

Scroller is based on the [jquery-mousewheel](https://github.com/brandonaaron/jquery-mousewheel) project by Brandon Aaron.

## Usage

Include `scroller.js` in your markup.

```html
<script src="scroller.min.js" ></script>
```

Scroller has no dependancies and shouldn't interfere with any other JavaScript libraries.

Two global method is exposed, ```scroller```, which is used to attach mouse scroll handlers, and ```descroller``` - used to detach handlers.

```javascript
// Define a mouse-scroll event listener
scroller(function(e, d, dx, dy) { console.log("You scrolled the mouse!") });

// Return false to prevent bubbling
scroller("div#cool", function(e, d, dx, dy) { console.log("Huzzah!"); return false; });

// Supports jQuery-like selectors or element references
var mydiv = document.getElementById("yeah"),
    ref = scroller(mydiv, function(e, d, dx, dy) { //... });

// Use descroller to detach event handlers
descroller(mydiv, ref);

```

## License

This script is licensed under the MIT License (LICENSE.txt).

Copyright (c) 2012 [Aaron Snoswell](http://elucidatedbinary.com)
