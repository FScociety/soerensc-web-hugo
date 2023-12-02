!function(e, t) {
    if ("object" == typeof exports && "object" == typeof module) 
        module.exports = t();
    else if ("function" == typeof define && define.amd) 
        define([], t);
    else {
        var n = t();
        for (var o in n)
            ("object" == typeof exports ? exports : e)[o] = n[o];
    }
}(window, (function() {
    return function(e) {
        var t = {};

        function n(o) {
            if (t[o]) return t[o].exports;
            var i = t[o] = {
                i: o,
                l: !1,
                exports: {}
            };
            e[o].call(i.exports, i, i.exports, n);
            i.l = !0;
            return i.exports;
        }
        n.m = e;
        n.c = t;

        n.d = function(e, t, o) {
            n.o(e, t) || Object.defineProperty(e, t, {
                enumerable: !0,
                get: o
            });
        };

        n.r = function(e) {
            "undefined" != typeof Symbol && Symbol.toStringTag && Object.defineProperty(e, Symbol.toStringTag, {
                value: "Module"
            });
            Object.defineProperty(e, "__esModule", {
                value: !0
            });
        };

        n.t = function(e, t) {
            if (1 & t && (e = n(e)), 8 & t) return e;
            if (4 & t && "object" == typeof e && e && e.__esModule) return e;
            var o = Object.create(null);
            if (n.r(o), Object.defineProperty(o, "default", {
                    enumerable: !0,
                    value: e
                }), 2 & t && "string" != typeof e)
                for (var i in e) n.d(o, i, function(t) {
                    return e[t];
                }.bind(null, i));
            return o;
        };

        n.n = function(e) {
            var t = e && e.__esModule ? function() {
                return e.default;
            } : function() {
                return e;
            };
            return n.d(t, "a", t), t;
        };

        n.o = function(e, t) {
            return Object.prototype.hasOwnProperty.call(e, t);
        };

        n.p = "";

        return n(n.s = 0);
    }([function(e, t, n) {
        "use strict";
        n.r(t);
        var o, i = "fslightbox-",
            r = "".concat(i, "styles"),
            s = "".concat(i, "cursor-grabbing"),
            a = "".concat(i, "full-dimension"),
            c = "".concat(i, "flex-centered"),
            l = "".concat(i, "open"),
            u = "".concat(i, "transform-transition"),
            d = "".concat(i, "absoluted"),
            f = "".concat(i, "slide-btn"),
            p = "".concat(f, "-container"),
            h = "".concat(i, "fade-in"),
            m = "".concat(i, "fade-out"),
            g = h + "-strong",
            v = m + "-strong",
            b = "".concat(i, "opacity-"),
            x = "".concat(b, "1"),
            y = "".concat(i, "source");

        function w(e) {
            return (w = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(e) {
                return typeof e;
            } : function(e) {
                return e && "function" == typeof Symbol && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e;
            })(e);
        }

        function S(e) {
            var t = e.stageIndexes,
                n = e.core.stageManager,
                o = e.props.sources.length - 1;
            n.getPreviousSlideIndex = function() {
                return 0 === t.current ? o : t.current - 1
            }, n.getNextSlideIndex = function() {
                return t.current === o ? 0 : t.current + 1
            }, n.updateStageIndexes = 0 === o ? function() {} : 1 === o ? function() {
                0 === t.current ? (t.next = 1, delete t.previous) : (t.previous = 0, delete t.next)
            } : function() {
                t.previous = n.getPreviousSlideIndex(), t.next = n.getNextSlideIndex()
            }, n.i = o <= 2 ? function() {
                return !0
            } : function
