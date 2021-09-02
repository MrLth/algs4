/*
 * @Author: mrlthf11
 * @LastEditors: mrlthf11
 * @Date: 2021-09-01 13:48:22
 * @LastEditTime: 2021-09-01 16:57:07
 * @Description: file content
 */
var DotGraph = /** @class */ (function () {
    function DotGraph(constructor, config) {
        var _a, _b;
        this.config = Object.assign({}, DotGraph.defaultConfig, config);
        this.config.markerUnitY = (_a = config.markerUnitY) !== null && _a !== void 0 ? _a : config.markerUnit;
        this.config.markerUnitX = (_b = config.markerUnitX) !== null && _b !== void 0 ? _b : config.markerUnit;
        var _c = this.config, width = _c.width, height = _c.height, markerSize = _c.markerSize, markerLength = _c.markerLength, fontsize = _c.markerFontSize;
        var canvas = document.createElement('canvas');
        constructor.style.overflow = 'hidden';
        constructor.style.width = width + 'px';
        constructor.style.height = height + 'px';
        canvas.width = width;
        canvas.height = height;
        constructor.appendChild(canvas);
        var ctx = this.ctx = canvas.getContext('2d');
        // draw marker line
        ctx.beginPath();
        ctx.moveTo(markerSize, 0);
        ctx.lineTo(markerSize, height - markerSize);
        ctx.lineTo(width, height - markerSize);
        ctx.stroke();
        ctx.font = fontsize + "px monospace";
        // draw marker x
        {
            var unit = this.config.markerUnitX;
            var max = config.maxX;
            var ratio = (width - markerSize) / max;
            var start = height - markerSize;
            var end = height - markerSize + markerLength;
            for (var i = unit; i <= max; i += unit) {
                var x = i * ratio + markerSize;
                ctx.beginPath();
                ctx.moveTo(x, start);
                ctx.lineTo(x, end);
                ctx.stroke();
                var text = i.toString();
                ctx.fillText(text, x - (text.length * fontsize / 2) / 2, start + fontsize * 1.5);
            }
        }
        // draw marker Y
        {
            var unit = this.config.markerUnitY;
            var max = config.maxY;
            var ratio = (height - markerSize) / max;
            var start = markerSize - markerLength;
            var end = markerSize;
            for (var i = unit; i <= max; i += unit) {
                var y = height - markerSize - i * ratio;
                ctx.beginPath();
                ctx.moveTo(start, y);
                ctx.lineTo(end, y);
                ctx.stroke();
                var text = i.toString();
                ctx.fillText(i.toString(), start - (text.length + 1) * fontsize / 2, y + fontsize * 0.25);
            }
        }
    }
    DotGraph.prototype.dot = function (x, y, color, size) {
        if (color === void 0) { color = 'black'; }
        if (size === void 0) { size = 1; }
        var _a = this, config = _a.config, ctx = _a.ctx;
        var markerSize = config.markerSize, height = config.height, width = config.width, maxY = config.maxY, maxX = config.maxX;
        var fillStyle = ctx.fillStyle;
        ctx.fillStyle = color;
        ctx.beginPath();
        ctx.arc(x * ((width - markerSize) / maxX) + markerSize, height - markerSize - y * ((height - markerSize) / maxY), size, 0, 2 * Math.PI);
        ctx.closePath();
        ctx.fill();
        ctx.fillStyle = fillStyle;
    };
    DotGraph.defaultConfig = {
        width: window.innerWidth,
        height: window.innerHeight,
        markerSize: 50,
        markerLength: 10,
        markerFontSize: 16
    };
    return DotGraph;
}());
