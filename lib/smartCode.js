// License: MIT
// Author: YAGUCHI Yuya (yayugu)

// jQuery plugin
(function($) {
  $.fn.smartCode = function(options) {
    if (options === undefined) options = {};

    // options and each value
    var width = options.width || 300;
    var height = options.height;
    var fontSize = options.fontSize || 16;
    var font = options.font || 'Inconsolata, monospace';
    var lineHeight = options.lineHeight || 1.2;
    var leftPadding = options.leftPadding || 5;
    var topPadding = options.topPadding || fontSize + 5;
    var fillStyle = options.fillStyle || "#333333";
    
    return $(this).map(function(i, elem) {
      var lines = $(elem).text().split("\n");
      var canvas = $('<canvas>').attr({
        width: width,
        height: height || topPadding + (lines.length - 1) * fontSize * lineHeight
      });
      var ctx = canvas[0].getContext('2d');
      ctx.font = fontSize + "px " + font;
      ctx.fillStyle = fillStyle;
      var charWidth = ctx.measureText('a').width;
      $.each(lines, function(i, line) {
        var y = topPadding + i * fontSize * lineHeight;
        var i;
        var headSpaceWidth;
        var ratio;
        if (ctx.measureText(line).width <= width) {
          ctx.fillText(line, leftPadding, y);
        } else {
          i = line.search(/[^ ]/);
          headSpaceWidth = charWidth * i;
          line = line.slice(i);
          ratio = (width - headSpaceWidth - leftPadding) / ctx.measureText(line).width;
          ctx.scale(ratio, 1);
          ctx.fillText(line, (leftPadding + headSpaceWidth) * (1 / ratio), y);
          ctx.scale(1 / ratio, 1);
        }
      });
      $(elem).empty().append(canvas);
      return canvas[0];
    });
  };
}(jQuery));

