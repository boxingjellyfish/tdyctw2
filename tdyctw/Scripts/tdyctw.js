var tdyctw;
(function (tdyctw) {
    var Test = (function () {
        function Test() {
        }
        Test.generateUID = function () {
            var firstPart = (Math.random() * 46656) | 0;
            var secondPart = (Math.random() * 46656) | 0;
            var firstPartString = ("000" + firstPart.toString(36)).slice(-3);
            var secondPartString = ("000" + secondPart.toString(36)).slice(-3);
            return firstPartString + secondPartString;
        };
        return Test;
    }());
    tdyctw.Test = Test;
})(tdyctw || (tdyctw = {}));
//# sourceMappingURL=tdyctw.js.map