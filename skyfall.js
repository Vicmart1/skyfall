var max_horizontal_offset = 100;
var duration = 5;
var max_iterations = 1;

var scroll_height = -1; //Do not change this value//

function getRotationDegrees(obj) {
    var matrix = obj.css("-webkit-transform") ||
    obj.css("-moz-transform")    ||
    obj.css("-ms-transform")     ||
    obj.css("-o-transform")      ||
    obj.css("transform");
    if(matrix !== 'none') {
        var values = matrix.split('(')[1].split(')')[0].split(',');
        var a = values[0];
        var b = values[1];
        var angle = Math.round(Math.atan2(b, a) * (180/Math.PI));
    } else { var angle = 0; }
    return (angle < 0) ? angle + 360 : angle;
}

function animate(obj) {
  obj.css('-webkit-transition', 'top ' + duration + 's ease-in, left ' + duration + 's ease-in');
  obj.css('-moz-transition', 'top ' + duration + 's ease-in, left ' + duration + 's ease-in');
  obj.css('-ms-transition', 'top ' + duration + 's ease-in, left ' + duration + 's ease-in');
  obj.css('-o-transition', 'top ' + duration + 's ease-in, left ' + duration + 's ease-in');
  obj.css('transition', 'top ' + duration + 's ease-in, left ' + duration + 's ease-in');

	obj.css('top', (obj.offset().top + ($('body').height() * ((Math.random() + 2) * 2))) + 'px');
	obj.css('left', ((Math.random() * max_horizontal_offset) - (max_horizontal_offset/2)) + 'px');
}

function iterate(obj, iterations) {
  var grand_children = false;
  obj.children('div').each(function () {
    grand_children = $(this).has('div').length ? true : false;
  });
  if(!grand_children) {
    iterations++;
    if(iterations < max_iterations) {
      obj.children('div').each(function () {
        iterate($(this), iterations);
      });
    } else {
      return true;
    }
  } else {
    return false;
  }
}

$('div').click(
	function() {
		$("div").each(function( index ) {
			if(!$(this).hasClass('.excluded')) {
				if(!$(this).has('div').length) {
					animate($(this));
				}else{
          var iterations = 0;
					if(iterate($(this), iterations)) {
            animate($(this));
          }
				}
			}
		});
		scroll_height = $("body").prop("scrollHeight");
	}
);

window.onscroll = function (e) {
		if(scroll_height > -1) {
    	var maxViewableHeight = scroll_height,
        	scrollTop = getScrollTop();
    	if (scrollTop + window.innerHeight > maxViewableHeight) {
        	e.preventDefault();
        	window.scrollTo(0, maxViewableHeight - window.innerHeight);
        	return false;
    	}
		}
}

function getScrollTop() {
    if (typeof window.pageYOffset !== 'undefined') {
        return window.pageYOffset;
    }
    var body = document.body,
        docElement = document.documentElement;
    docElement = (docElement.clientHeight) ? docElement : body;
    return docElement.scrollTop;
}
