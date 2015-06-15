Skyfall.js
Adds a neat breakdown effect to any website with divs.

Usage

1. Download the .js file and place in the directory of your webpage.
2. Add the following at the bottom of the body.

    <script src='skyfall-1.0.1.js'></script>

3. Add the following class to the button or element you want to trigger on click 
   
   activate

4. For dynamically created buttons or elements you want to trigger the animation, add the following line of code after its creation

   $(document).on('click', [identifier], function() { appendClass(); });

where [identifier] is the object's class, type, or id

5. Add the following class to any divs you want excluded from the animation 
   
   excluded

6. Make sure you have jQuery installed.
7. And that's it! Enjoy!

Customization

You can change the values of the variables in the first couple of lines of skyfall.js to change the effects of the animation

Known Issues

The CSS animations used in Skyfall.js are not compatible with fixed-position divs. Currently, Skyfall.js works properly with absolute and relative positioned divs.

Copyright 2015 Vicmart Inc, All Rights Reserved
