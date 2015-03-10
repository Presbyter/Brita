/**
 * i18n - Javascript Internationalization System
 *
 * @author Platform Team
 */

(function() {
    var $i18n = {

        /**
         * Messages
         * @var array
         * {
         *     'DOMAIN NAME' : {
         *         'KEY NAME' : 'value',
         *         'KEY NAME(Plurals) : ['value', 'value', ...]
         *         ...
         *     },
         *     ...
         * }
         */
        _lang: {},

        /**
         * Plurals Expressions
         * @var array
         * {
         *     'DOMAIN NAME' : function(n) {
         *         expressions
         *     },
         *     ...
         * }
         */
        _pluralsExp: {},

        /**
         * Current Domain
         * @var string
         */
        _currDomain: false,

        /**
         * override the current domain for a single message lookup
         *
         * @param string domain
         * @param string key
         * @return string
         */
        __d: function(domain, key, __idx__) {

            var t = $i18n._lang;

            if ($i18n._isEmpty(t) === true) {
                return key;
            }

            if (typeof t[domain] == 'undefined') {
                return key;
            }

            if (typeof t[domain][key] == 'undefined') {
                return key;
            }

            if (typeof t[domain][key] == 'object') {
                __idx__ = __idx__ ? __idx__ : 0;
                return t[domain][key][__idx__];
            }

            return t[domain][key];

        },

        /**
         * Plural version of __d
         *
         * @param string domain
         * @param string key1
         * @param string key2
         * @param int cnt
         * @return string
         */
        __dn: function(domain, key1, key2, cnt) {

            var n = parseInt(cnt);
            var idx = $i18n._getPluralsIndex(domain, n);

            if (idx == 0) {
                return $i18n.__d(domain, key1, 0);
            } else {
                return $i18n.__d(domain, key2, idx);
            }
        },

        _init: function() {
            $i18n._pluralsExp.__reserved_default_exp__ = function(n) {
                return n == 1 ? 0 : 1;
            };

            window['__d'] = function(domain, key) {
                return $i18n.__d(domain, key, 0);
            };

            window['__dn'] = function(domain, key1, key2, cnt) {
                return $i18n.__dn(domain, key1, key2, cnt);
            };

            window['__'] = function(key) {
                return $i18n.__d($i18n._currDomain, key, 0);
            };

            window['__n'] = function(key1, key2, cnt) {
                return $i18n.__dn($i18n._currDomain, key1, key2, cnt);
            };

            window['__i18n_regist__'] = this._regist;
            window['__i18n_bind__'] = this._bind;
            window['__i18n_plurals_exp_bind__'] = this._pluralsExpBind;
        },

        _isEmpty: function(val) {

            if (!val) return true;
            if (val == null) return true;
            if (val == undefined) return true;
            if (val == '') return true;
            if (typeof val == 'object') {
                for (var i in val) {
                    return false;
                }

                return true;
            }

            return false;

        },

        _trim: function(str) {
            if (typeof str != 'string') return '';

            return str.replace(/(^\s*)|(\s*$)/g, '');
        },

        _apply: function(method, func) {

            this[method] = func;

        },

        _regist: function(lang) {

            if (typeof lang != 'object') return false;

            $i18n._lang = lang;

            return true;

        },

        _bind: function(domain) {

            if ($i18n._isEmpty(domain) === true) return false;

            $i18n._currDomain = domain;

            return true;

        },

        _pluralsExpBind: function(domain, exp) {
            if (typeof exp != 'function') {
                return;
            }

            $i18n._pluralsExp[domain] = exp;
        },

        _getPluralsIndex: function(domain, n) {
            if (typeof $i18n._pluralsExp[domain] == 'undefined') {
                return $i18n._pluralsExp.__reserved_default_exp__(n);
            }

            return $i18n._pluralsExp[domain](n);
        }
    };

    $i18n._init();
})();
/*!
 * jQuery JavaScript Library v1.4.4
 * http://jquery.com/
 *
 * Copyright 2010, John Resig
 * Dual licensed under the MIT or GPL Version 2 licenses.
 * http://jquery.org/license
 *
 * Includes Sizzle.js
 * http://sizzlejs.com/
 * Copyright 2010, The Dojo Foundation
 * Released under the MIT, BSD, and GPL Licenses.
 *
 * Date: Thu Nov 11 19:04:53 2010 -0500
 */
(function(E, B) {
    function ka(a, b, d) {
        if (d === B && a.nodeType === 1) {
            d = a.getAttribute("data-" + b);
            if (typeof d === "string") {
                try {
                    d = d === "true" ? true : d === "false" ? false : d === "null" ? null : !c.isNaN(d) ? parseFloat(d) : Ja.test(d) ? c.parseJSON(d) : d
                } catch (e) {}
                c.data(a, b, d)
            } else d = B
        }
        return d
    }

    function U() {
        return false
    }

    function ca() {
        return true
    }

    function la(a, b, d) {
        d[0].type = a;
        return c.event.handle.apply(b, d)
    }

    function Ka(a) {
        var b, d, e, f, h, l, k, o, x, r, A, C = [];
        f = [];
        h = c.data(this, this.nodeType ? "events" : "__events__");
        if (typeof h === "function") h =
            h.events;
        if (!(a.liveFired === this || !h || !h.live || a.button && a.type === "click")) {
            if (a.namespace) A = RegExp("(^|\\.)" + a.namespace.split(".").join("\\.(?:.*\\.)?") + "(\\.|$)");
            a.liveFired = this;
            var J = h.live.slice(0);
            for (k = 0; k < J.length; k++) {
                h = J[k];
                h.origType.replace(X, "") === a.type ? f.push(h.selector) : J.splice(k--, 1)
            }
            f = c(a.target).closest(f, a.currentTarget);
            o = 0;
            for (x = f.length; o < x; o++) {
                r = f[o];
                for (k = 0; k < J.length; k++) {
                    h = J[k];
                    if (r.selector === h.selector && (!A || A.test(h.namespace))) {
                        l = r.elem;
                        e = null;
                        if (h.preType === "mouseenter" ||
                            h.preType === "mouseleave") {
                            a.type = h.preType;
                            e = c(a.relatedTarget).closest(h.selector)[0]
                        }
                        if (!e || e !== l) C.push({
                            elem: l,
                            handleObj: h,
                            level: r.level
                        })
                    }
                }
            }
            o = 0;
            for (x = C.length; o < x; o++) {
                f = C[o];
                if (d && f.level > d) break;
                a.currentTarget = f.elem;
                a.data = f.handleObj.data;
                a.handleObj = f.handleObj;
                A = f.handleObj.origHandler.apply(f.elem, arguments);
                if (A === false || a.isPropagationStopped()) {
                    d = f.level;
                    if (A === false) b = false;
                    if (a.isImmediatePropagationStopped()) break
                }
            }
            return b
        }
    }

    function Y(a, b) {
        return (a && a !== "*" ? a + "." : "") + b.replace(La,
            "`").replace(Ma, "&")
    }

    function ma(a, b, d) {
        if (c.isFunction(b)) return c.grep(a, function(f, h) {
            return !!b.call(f, h, f) === d
        });
        else if (b.nodeType) return c.grep(a, function(f) {
            return f === b === d
        });
        else if (typeof b === "string") {
            var e = c.grep(a, function(f) {
                return f.nodeType === 1
            });
            if (Na.test(b)) return c.filter(b, e, !d);
            else b = c.filter(b, e)
        }
        return c.grep(a, function(f) {
            return c.inArray(f, b) >= 0 === d
        })
    }

    function na(a, b) {
        var d = 0;
        b.each(function() {
            if (this.nodeName === (a[d] && a[d].nodeName)) {
                var e = c.data(a[d++]),
                    f = c.data(this,
                        e);
                if (e = e && e.events) {
                    delete f.handle;
                    f.events = {};
                    for (var h in e)
                        for (var l in e[h]) c.event.add(this, h, e[h][l], e[h][l].data)
                }
            }
        })
    }

    function Oa(a, b) {
        b.src ? c.ajax({
            url: b.src,
            async: false,
            dataType: "script"
        }) : c.globalEval(b.text || b.textContent || b.innerHTML || "");
        b.parentNode && b.parentNode.removeChild(b)
    }

    function oa(a, b, d) {
        var e = b === "width" ? a.offsetWidth : a.offsetHeight;
        if (d === "border") return e;
        c.each(b === "width" ? Pa : Qa, function() {
            d || (e -= parseFloat(c.css(a, "padding" + this)) || 0);
            if (d === "margin") e += parseFloat(c.css(a,
                "margin" + this)) || 0;
            else e -= parseFloat(c.css(a, "border" + this + "Width")) || 0
        });
        return e
    }

    function da(a, b, d, e) {
        if (c.isArray(b) && b.length) c.each(b, function(f, h) {
            d || Ra.test(a) ? e(a, h) : da(a + "[" + (typeof h === "object" || c.isArray(h) ? f : "") + "]", h, d, e)
        });
        else if (!d && b != null && typeof b === "object") c.isEmptyObject(b) ? e(a, "") : c.each(b, function(f, h) {
            da(a + "[" + f + "]", h, d, e)
        });
        else e(a, b)
    }

    function S(a, b) {
        var d = {};
        c.each(pa.concat.apply([], pa.slice(0, b)), function() {
            d[this] = a
        });
        return d
    }

    function qa(a) {
        if (!ea[a]) {
            var b = c("<" +
                    a + ">").appendTo("body"),
                d = b.css("display");
            b.remove();
            if (d === "none" || d === "") d = "block";
            ea[a] = d
        }
        return ea[a]
    }

    function fa(a) {
        return c.isWindow(a) ? a : a.nodeType === 9 ? a.defaultView || a.parentWindow : false
    }
    var t = E.document,
        c = function() {
            function a() {
                if (!b.isReady) {
                    try {
                        t.documentElement.doScroll("left")
                    } catch (j) {
                        setTimeout(a, 1);
                        return
                    }
                    b.ready()
                }
            }
            var b = function(j, s) {
                    return new b.fn.init(j, s)
                },
                d = E.jQuery,
                e = E.$,
                f, h = /^(?:[^<]*(<[\w\W]+>)[^>]*$|#([\w\-]+)$)/,
                l = /\S/,
                k = /^\s+/,
                o = /\s+$/,
                x = /\W/,
                r = /\d/,
                A = /^<(\w+)\s*\/?>(?:<\/\1>)?$/,
                C = /^[\],:{}\s]*$/,
                J = /\\(?:["\\\/bfnrt]|u[0-9a-fA-F]{4})/g,
                w = /"[^"\\\n\r]*"|true|false|null|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?/g,
                I = /(?:^|:|,)(?:\s*\[)+/g,
                L = /(webkit)[ \/]([\w.]+)/,
                g = /(opera)(?:.*version)?[ \/]([\w.]+)/,
                i = /(msie) ([\w.]+)/,
                n = /(mozilla)(?:.*? rv:([\w.]+))?/,
                m = navigator.userAgent,
                p = false,
                q = [],
                u, y = Object.prototype.toString,
                F = Object.prototype.hasOwnProperty,
                M = Array.prototype.push,
                N = Array.prototype.slice,
                O = String.prototype.trim,
                D = Array.prototype.indexOf,
                R = {};
            b.fn = b.prototype = {
                init: function(j,
                    s) {
                    var v, z, H;
                    if (!j) return this;
                    if (j.nodeType) {
                        this.context = this[0] = j;
                        this.length = 1;
                        return this
                    }
                    if (j === "body" && !s && t.body) {
                        this.context = t;
                        this[0] = t.body;
                        this.selector = "body";
                        this.length = 1;
                        return this
                    }
                    if (typeof j === "string")
                        if ((v = h.exec(j)) && (v[1] || !s))
                            if (v[1]) {
                                H = s ? s.ownerDocument || s : t;
                                if (z = A.exec(j))
                                    if (b.isPlainObject(s)) {
                                        j = [t.createElement(z[1])];
                                        b.fn.attr.call(j, s, true)
                                    } else j = [H.createElement(z[1])];
                                else {
                                    z = b.buildFragment([v[1]], [H]);
                                    j = (z.cacheable ? z.fragment.cloneNode(true) : z.fragment).childNodes
                                }
                                return b.merge(this,
                                    j)
                            } else {
                                if ((z = t.getElementById(v[2])) && z.parentNode) {
                                    if (z.id !== v[2]) return f.find(j);
                                    this.length = 1;
                                    this[0] = z
                                }
                                this.context = t;
                                this.selector = j;
                                return this
                            } else if (!s && !x.test(j)) {
                        this.selector = j;
                        this.context = t;
                        j = t.getElementsByTagName(j);
                        return b.merge(this, j)
                    } else return !s || s.jquery ? (s || f).find(j) : b(s).find(j);
                    else if (b.isFunction(j)) return f.ready(j);
                    if (j.selector !== B) {
                        this.selector = j.selector;
                        this.context = j.context
                    }
                    return b.makeArray(j, this)
                },
                selector: "",
                jquery: "1.4.4",
                length: 0,
                size: function() {
                    return this.length
                },
                toArray: function() {
                    return N.call(this, 0)
                },
                get: function(j) {
                    return j == null ? this.toArray() : j < 0 ? this.slice(j)[0] : this[j]
                },
                pushStack: function(j, s, v) {
                    var z = b();
                    b.isArray(j) ? M.apply(z, j) : b.merge(z, j);
                    z.prevObject = this;
                    z.context = this.context;
                    if (s === "find") z.selector = this.selector + (this.selector ? " " : "") + v;
                    else if (s) z.selector = this.selector + "." + s + "(" + v + ")";
                    return z
                },
                each: function(j, s) {
                    return b.each(this, j, s)
                },
                ready: function(j) {
                    b.bindReady();
                    if (b.isReady) j.call(t, b);
                    else q && q.push(j);
                    return this
                },
                eq: function(j) {
                    return j ===
                        -1 ? this.slice(j) : this.slice(j, +j + 1)
                },
                first: function() {
                    return this.eq(0)
                },
                last: function() {
                    return this.eq(-1)
                },
                slice: function() {
                    return this.pushStack(N.apply(this, arguments), "slice", N.call(arguments).join(","))
                },
                map: function(j) {
                    return this.pushStack(b.map(this, function(s, v) {
                        return j.call(s, v, s)
                    }))
                },
                end: function() {
                    return this.prevObject || b(null)
                },
                push: M,
                sort: [].sort,
                splice: [].splice
            };
            b.fn.init.prototype = b.fn;
            b.extend = b.fn.extend = function() {
                var j, s, v, z, H, G = arguments[0] || {},
                    K = 1,
                    Q = arguments.length,
                    ga = false;
                if (typeof G === "boolean") {
                    ga = G;
                    G = arguments[1] || {};
                    K = 2
                }
                if (typeof G !== "object" && !b.isFunction(G)) G = {};
                if (Q === K) {
                    G = this;
                    --K
                }
                for (; K < Q; K++)
                    if ((j = arguments[K]) != null)
                        for (s in j) {
                            v = G[s];
                            z = j[s];
                            if (G !== z)
                                if (ga && z && (b.isPlainObject(z) || (H = b.isArray(z)))) {
                                    if (H) {
                                        H = false;
                                        v = v && b.isArray(v) ? v : []
                                    } else v = v && b.isPlainObject(v) ? v : {};
                                    G[s] = b.extend(ga, v, z)
                                } else if (z !== B) G[s] = z
                        }
                    return G
            };
            b.extend({
                noConflict: function(j) {
                    E.$ = e;
                    if (j) E.jQuery = d;
                    return b
                },
                isReady: false,
                readyWait: 1,
                ready: function(j) {
                    j === true && b.readyWait--;
                    if (!b.readyWait || j !== true && !b.isReady) {
                        if (!t.body) return setTimeout(b.ready, 1);
                        b.isReady = true;
                        if (!(j !== true && --b.readyWait > 0))
                            if (q) {
                                var s = 0,
                                    v = q;
                                for (q = null; j = v[s++];) j.call(t, b);
                                b.fn.trigger && b(t).trigger("ready").unbind("ready")
                            }
                    }
                },
                bindReady: function() {
                    if (!p) {
                        p = true;
                        if (t.readyState === "complete") return setTimeout(b.ready, 1);
                        if (t.addEventListener) {
                            t.addEventListener("DOMContentLoaded", u, false);
                            E.addEventListener("load", b.ready, false)
                        } else if (t.attachEvent) {
                            t.attachEvent("onreadystatechange", u);
                            E.attachEvent("onload",
                                b.ready);
                            var j = false;
                            try {
                                j = E.frameElement == null
                            } catch (s) {}
                            t.documentElement.doScroll && j && a()
                        }
                    }
                },
                isFunction: function(j) {
                    return b.type(j) === "function"
                },
                isArray: Array.isArray || function(j) {
                    return b.type(j) === "array"
                },
                isWindow: function(j) {
                    return j && typeof j === "object" && "setInterval" in j
                },
                isNaN: function(j) {
                    return j == null || !r.test(j) || isNaN(j)
                },
                type: function(j) {
                    return j == null ? String(j) : R[y.call(j)] || "object"
                },
                isPlainObject: function(j) {
                    if (!j || b.type(j) !== "object" || j.nodeType || b.isWindow(j)) return false;
                    if (j.constructor &&
                        !F.call(j, "constructor") && !F.call(j.constructor.prototype, "isPrototypeOf")) return false;
                    for (var s in j);
                    return s === B || F.call(j, s)
                },
                isEmptyObject: function(j) {
                    for (var s in j) return false;
                    return true
                },
                error: function(j) {
                    throw j;
                },
                parseJSON: function(j) {
                    if (typeof j !== "string" || !j) return null;
                    j = b.trim(j);
                    if (C.test(j.replace(J, "@").replace(w, "]").replace(I, ""))) return E.JSON && E.JSON.parse ? E.JSON.parse(j) : (new Function("return " + j))();
                    else b.error("Invalid JSON: " + j)
                },
                noop: function() {},
                globalEval: function(j) {
                    if (j &&
                        l.test(j)) {
                        var s = t.getElementsByTagName("head")[0] || t.documentElement,
                            v = t.createElement("script");
                        v.type = "text/javascript";
                        if (b.support.scriptEval) v.appendChild(t.createTextNode(j));
                        else v.text = j;
                        s.insertBefore(v, s.firstChild);
                        s.removeChild(v)
                    }
                },
                nodeName: function(j, s) {
                    return j.nodeName && j.nodeName.toUpperCase() === s.toUpperCase()
                },
                each: function(j, s, v) {
                    var z, H = 0,
                        G = j.length,
                        K = G === B || b.isFunction(j);
                    if (v)
                        if (K)
                            for (z in j) {
                                if (s.apply(j[z], v) === false) break
                            } else
                                for (; H < G;) {
                                    if (s.apply(j[H++], v) === false) break
                                } else if (K)
                                    for (z in j) {
                                        if (s.call(j[z],
                                                z, j[z]) === false) break
                                    } else
                                        for (v = j[0]; H < G && s.call(v, H, v) !== false; v = j[++H]);
                    return j
                },
                trim: O ? function(j) {
                    return j == null ? "" : O.call(j)
                } : function(j) {
                    return j == null ? "" : j.toString().replace(k, "").replace(o, "")
                },
                makeArray: function(j, s) {
                    var v = s || [];
                    if (j != null) {
                        var z = b.type(j);
                        j.length == null || z === "string" || z === "function" || z === "regexp" || b.isWindow(j) ? M.call(v, j) : b.merge(v, j)
                    }
                    return v
                },
                inArray: function(j, s) {
                    if (s.indexOf) return s.indexOf(j);
                    for (var v = 0, z = s.length; v < z; v++)
                        if (s[v] === j) return v;
                    return -1
                },
                merge: function(j,
                    s) {
                    var v = j.length,
                        z = 0;
                    if (typeof s.length === "number")
                        for (var H = s.length; z < H; z++) j[v++] = s[z];
                    else
                        for (; s[z] !== B;) j[v++] = s[z++];
                    j.length = v;
                    return j
                },
                grep: function(j, s, v) {
                    var z = [],
                        H;
                    v = !!v;
                    for (var G = 0, K = j.length; G < K; G++) {
                        H = !!s(j[G], G);
                        v !== H && z.push(j[G])
                    }
                    return z
                },
                map: function(j, s, v) {
                    for (var z = [], H, G = 0, K = j.length; G < K; G++) {
                        H = s(j[G], G, v);
                        if (H != null) z[z.length] = H
                    }
                    return z.concat.apply([], z)
                },
                guid: 1,
                proxy: function(j, s, v) {
                    if (arguments.length === 2)
                        if (typeof s === "string") {
                            v = j;
                            j = v[s];
                            s = B
                        } else if (s && !b.isFunction(s)) {
                        v =
                            s;
                        s = B
                    }
                    if (!s && j) s = function() {
                        return j.apply(v || this, arguments)
                    };
                    if (j) s.guid = j.guid = j.guid || s.guid || b.guid++;
                    return s
                },
                access: function(j, s, v, z, H, G) {
                    var K = j.length;
                    if (typeof s === "object") {
                        for (var Q in s) b.access(j, Q, s[Q], z, H, v);
                        return j
                    }
                    if (v !== B) {
                        z = !G && z && b.isFunction(v);
                        for (Q = 0; Q < K; Q++) H(j[Q], s, z ? v.call(j[Q], Q, H(j[Q], s)) : v, G);
                        return j
                    }
                    return K ? H(j[0], s) : B
                },
                now: function() {
                    return (new Date).getTime()
                },
                uaMatch: function(j) {
                    j = j.toLowerCase();
                    j = L.exec(j) || g.exec(j) || i.exec(j) || j.indexOf("compatible") < 0 && n.exec(j) ||
                        [];
                    return {
                        browser: j[1] || "",
                        version: j[2] || "0"
                    }
                },
                browser: {}
            });
            b.each("Boolean Number String Function Array Date RegExp Object".split(" "), function(j, s) {
                R["[object " + s + "]"] = s.toLowerCase()
            });
            m = b.uaMatch(m);
            if (m.browser) {
                b.browser[m.browser] = true;
                b.browser.version = m.version
            }
            if (b.browser.webkit) b.browser.safari = true;
            if (D) b.inArray = function(j, s) {
                return D.call(s, j)
            };
            if (!/\s/.test("\u00a0")) {
                k = /^[\s\xA0]+/;
                o = /[\s\xA0]+$/
            }
            f = b(t);
            if (t.addEventListener) u = function() {
                t.removeEventListener("DOMContentLoaded", u,
                    false);
                b.ready()
            };
            else if (t.attachEvent) u = function() {
                if (t.readyState === "complete") {
                    t.detachEvent("onreadystatechange", u);
                    b.ready()
                }
            };
            return E.jQuery = E.$ = b
        }();
    (function() {
        c.support = {};
        var a = t.documentElement,
            b = t.createElement("script"),
            d = t.createElement("div"),
            e = "script" + c.now();
        d.style.display = "none";
        d.innerHTML = "   <link/><table></table><a href='/a' style='color:red;float:left;opacity:.55;'>a</a><input type='checkbox'/>";
        var f = d.getElementsByTagName("*"),
            h = d.getElementsByTagName("a")[0],
            l = t.createElement("select"),
            k = l.appendChild(t.createElement("option"));
        if (!(!f || !f.length || !h)) {
            c.support = {
                leadingWhitespace: d.firstChild.nodeType === 3,
                tbody: !d.getElementsByTagName("tbody").length,
                htmlSerialize: !!d.getElementsByTagName("link").length,
                style: /red/.test(h.getAttribute("style")),
                hrefNormalized: h.getAttribute("href") === "/a",
                opacity: /^0.55$/.test(h.style.opacity),
                cssFloat: !!h.style.cssFloat,
                checkOn: d.getElementsByTagName("input")[0].value === "on",
                optSelected: k.selected,
                deleteExpando: true,
                optDisabled: false,
                checkClone: false,
                scriptEval: false,
                noCloneEvent: true,
                boxModel: null,
                inlineBlockNeedsLayout: false,
                shrinkWrapBlocks: false,
                reliableHiddenOffsets: true
            };
            l.disabled = true;
            c.support.optDisabled = !k.disabled;
            b.type = "text/javascript";
            try {
                b.appendChild(t.createTextNode("window." + e + "=1;"))
            } catch (o) {}
            a.insertBefore(b, a.firstChild);
            if (E[e]) {
                c.support.scriptEval = true;
                delete E[e]
            }
            try {
                delete b.test
            } catch (x) {
                c.support.deleteExpando = false
            }
            a.removeChild(b);
            if (d.attachEvent && d.fireEvent) {
                d.attachEvent("onclick", function r() {
                    c.support.noCloneEvent =
                        false;
                    d.detachEvent("onclick", r)
                });
                d.cloneNode(true).fireEvent("onclick")
            }
            d = t.createElement("div");
            d.innerHTML = "<input type='radio' name='radiotest' checked='checked'/>";
            a = t.createDocumentFragment();
            a.appendChild(d.firstChild);
            c.support.checkClone = a.cloneNode(true).cloneNode(true).lastChild.checked;
            c(function() {
                var r = t.createElement("div");
                r.style.width = r.style.paddingLeft = "1px";
                t.body.appendChild(r);
                c.boxModel = c.support.boxModel = r.offsetWidth === 2;
                if ("zoom" in r.style) {
                    r.style.display = "inline";
                    r.style.zoom =
                        1;
                    c.support.inlineBlockNeedsLayout = r.offsetWidth === 2;
                    r.style.display = "";
                    r.innerHTML = "<div style='width:4px;'></div>";
                    c.support.shrinkWrapBlocks = r.offsetWidth !== 2
                }
                r.innerHTML = "<table><tr><td style='padding:0;display:none'></td><td>t</td></tr></table>";
                var A = r.getElementsByTagName("td");
                c.support.reliableHiddenOffsets = A[0].offsetHeight === 0;
                A[0].style.display = "";
                A[1].style.display = "none";
                c.support.reliableHiddenOffsets = c.support.reliableHiddenOffsets && A[0].offsetHeight === 0;
                r.innerHTML = "";
                t.body.removeChild(r).style.display =
                    "none"
            });
            a = function(r) {
                var A = t.createElement("div");
                r = "on" + r;
                var C = r in A;
                if (!C) {
                    A.setAttribute(r, "return;");
                    C = typeof A[r] === "function"
                }
                return C
            };
            c.support.submitBubbles = a("submit");
            c.support.changeBubbles = a("change");
            a = b = d = f = h = null
        }
    })();
    var ra = {},
        Ja = /^(?:\{.*\}|\[.*\])$/;
    c.extend({
        cache: {},
        uuid: 0,
        expando: "jQuery" + c.now(),
        noData: {
            embed: true,
            object: "clsid:D27CDB6E-AE6D-11cf-96B8-444553540000",
            applet: true
        },
        data: function(a, b, d) {
            if (c.acceptData(a)) {
                a = a == E ? ra : a;
                var e = a.nodeType,
                    f = e ? a[c.expando] : null,
                    h =
                    c.cache;
                if (!(e && !f && typeof b === "string" && d === B)) {
                    if (e) f || (a[c.expando] = f = ++c.uuid);
                    else h = a;
                    if (typeof b === "object")
                        if (e) h[f] = c.extend(h[f], b);
                        else c.extend(h, b);
                    else if (e && !h[f]) h[f] = {};
                    a = e ? h[f] : h;
                    if (d !== B) a[b] = d;
                    return typeof b === "string" ? a[b] : a
                }
            }
        },
        removeData: function(a, b) {
            if (c.acceptData(a)) {
                a = a == E ? ra : a;
                var d = a.nodeType,
                    e = d ? a[c.expando] : a,
                    f = c.cache,
                    h = d ? f[e] : e;
                if (b) {
                    if (h) {
                        delete h[b];
                        d && c.isEmptyObject(h) && c.removeData(a)
                    }
                } else if (d && c.support.deleteExpando) delete a[c.expando];
                else if (a.removeAttribute) a.removeAttribute(c.expando);
                else if (d) delete f[e];
                else
                    for (var l in a) delete a[l]
            }
        },
        acceptData: function(a) {
            if (a.nodeName) {
                var b = c.noData[a.nodeName.toLowerCase()];
                if (b) return !(b === true || a.getAttribute("classid") !== b)
            }
            return true
        }
    });
    c.fn.extend({
        data: function(a, b) {
            var d = null;
            if (typeof a === "undefined") {
                if (this.length) {
                    var e = this[0].attributes,
                        f;
                    d = c.data(this[0]);
                    for (var h = 0, l = e.length; h < l; h++) {
                        f = e[h].name;
                        if (f.indexOf("data-") === 0) {
                            f = f.substr(5);
                            ka(this[0], f, d[f])
                        }
                    }
                }
                return d
            } else if (typeof a === "object") return this.each(function() {
                c.data(this,
                    a)
            });
            var k = a.split(".");
            k[1] = k[1] ? "." + k[1] : "";
            if (b === B) {
                d = this.triggerHandler("getData" + k[1] + "!", [k[0]]);
                if (d === B && this.length) {
                    d = c.data(this[0], a);
                    d = ka(this[0], a, d)
                }
                return d === B && k[1] ? this.data(k[0]) : d
            } else return this.each(function() {
                var o = c(this),
                    x = [k[0], b];
                o.triggerHandler("setData" + k[1] + "!", x);
                c.data(this, a, b);
                o.triggerHandler("changeData" + k[1] + "!", x)
            })
        },
        removeData: function(a) {
            return this.each(function() {
                c.removeData(this, a)
            })
        }
    });
    c.extend({
        queue: function(a, b, d) {
            if (a) {
                b = (b || "fx") + "queue";
                var e =
                    c.data(a, b);
                if (!d) return e || [];
                if (!e || c.isArray(d)) e = c.data(a, b, c.makeArray(d));
                else e.push(d);
                return e
            }
        },
        dequeue: function(a, b) {
            b = b || "fx";
            var d = c.queue(a, b),
                e = d.shift();
            if (e === "inprogress") e = d.shift();
            if (e) {
                b === "fx" && d.unshift("inprogress");
                e.call(a, function() {
                    c.dequeue(a, b)
                })
            }
        }
    });
    c.fn.extend({
        queue: function(a, b) {
            if (typeof a !== "string") {
                b = a;
                a = "fx"
            }
            if (b === B) return c.queue(this[0], a);
            return this.each(function() {
                var d = c.queue(this, a, b);
                a === "fx" && d[0] !== "inprogress" && c.dequeue(this, a)
            })
        },
        dequeue: function(a) {
            return this.each(function() {
                c.dequeue(this,
                    a)
            })
        },
        delay: function(a, b) {
            a = c.fx ? c.fx.speeds[a] || a : a;
            b = b || "fx";
            return this.queue(b, function() {
                var d = this;
                setTimeout(function() {
                    c.dequeue(d, b)
                }, a)
            })
        },
        clearQueue: function(a) {
            return this.queue(a || "fx", [])
        }
    });
    var sa = /[\n\t]/g,
        ha = /\s+/,
        Sa = /\r/g,
        Ta = /^(?:href|src|style)$/,
        Ua = /^(?:button|input)$/i,
        Va = /^(?:button|input|object|select|textarea)$/i,
        Wa = /^a(?:rea)?$/i,
        ta = /^(?:radio|checkbox)$/i;
    c.props = {
        "for": "htmlFor",
        "class": "className",
        readonly: "readOnly",
        maxlength: "maxLength",
        cellspacing: "cellSpacing",
        rowspan: "rowSpan",
        colspan: "colSpan",
        tabindex: "tabIndex",
        usemap: "useMap",
        frameborder: "frameBorder"
    };
    c.fn.extend({
        attr: function(a, b) {
            return c.access(this, a, b, true, c.attr)
        },
        removeAttr: function(a) {
            return this.each(function() {
                c.attr(this, a, "");
                this.nodeType === 1 && this.removeAttribute(a)
            })
        },
        addClass: function(a) {
            if (c.isFunction(a)) return this.each(function(x) {
                var r = c(this);
                r.addClass(a.call(this, x, r.attr("class")))
            });
            if (a && typeof a === "string")
                for (var b = (a || "").split(ha), d = 0, e = this.length; d < e; d++) {
                    var f = this[d];
                    if (f.nodeType ===
                        1)
                        if (f.className) {
                            for (var h = " " + f.className + " ", l = f.className, k = 0, o = b.length; k < o; k++)
                                if (h.indexOf(" " + b[k] + " ") < 0) l += " " + b[k];
                            f.className = c.trim(l)
                        } else f.className = a
                }
            return this
        },
        removeClass: function(a) {
            if (c.isFunction(a)) return this.each(function(o) {
                var x = c(this);
                x.removeClass(a.call(this, o, x.attr("class")))
            });
            if (a && typeof a === "string" || a === B)
                for (var b = (a || "").split(ha), d = 0, e = this.length; d < e; d++) {
                    var f = this[d];
                    if (f.nodeType === 1 && f.className)
                        if (a) {
                            for (var h = (" " + f.className + " ").replace(sa, " "),
                                    l = 0, k = b.length; l < k; l++) h = h.replace(" " + b[l] + " ", " ");
                            f.className = c.trim(h)
                        } else f.className = ""
                }
            return this
        },
        toggleClass: function(a, b) {
            var d = typeof a,
                e = typeof b === "boolean";
            if (c.isFunction(a)) return this.each(function(f) {
                var h = c(this);
                h.toggleClass(a.call(this, f, h.attr("class"), b), b)
            });
            return this.each(function() {
                if (d === "string")
                    for (var f, h = 0, l = c(this), k = b, o = a.split(ha); f = o[h++];) {
                        k = e ? k : !l.hasClass(f);
                        l[k ? "addClass" : "removeClass"](f)
                    } else if (d === "undefined" || d === "boolean") {
                        this.className && c.data(this,
                            "__className__", this.className);
                        this.className = this.className || a === false ? "" : c.data(this, "__className__") || ""
                    }
            })
        },
        hasClass: function(a) {
            a = " " + a + " ";
            for (var b = 0, d = this.length; b < d; b++)
                if ((" " + this[b].className + " ").replace(sa, " ").indexOf(a) > -1) return true;
            return false
        },
        val: function(a) {
            if (!arguments.length) {
                var b = this[0];
                if (b) {
                    if (c.nodeName(b, "option")) {
                        var d = b.attributes.value;
                        return !d || d.specified ? b.value : b.text
                    }
                    if (c.nodeName(b, "select")) {
                        var e = b.selectedIndex;
                        d = [];
                        var f = b.options;
                        b = b.type === "select-one";
                        if (e < 0) return null;
                        var h = b ? e : 0;
                        for (e = b ? e + 1 : f.length; h < e; h++) {
                            var l = f[h];
                            if (l.selected && (c.support.optDisabled ? !l.disabled : l.getAttribute("disabled") === null) && (!l.parentNode.disabled || !c.nodeName(l.parentNode, "optgroup"))) {
                                a = c(l).val();
                                if (b) return a;
                                d.push(a)
                            }
                        }
                        return d
                    }
                    if (ta.test(b.type) && !c.support.checkOn) return b.getAttribute("value") === null ? "on" : b.value;
                    return (b.value || "").replace(Sa, "")
                }
                return B
            }
            var k = c.isFunction(a);
            return this.each(function(o) {
                var x = c(this),
                    r = a;
                if (this.nodeType === 1) {
                    if (k) r =
                        a.call(this, o, x.val());
                    if (r == null) r = "";
                    else if (typeof r === "number") r += "";
                    else if (c.isArray(r)) r = c.map(r, function(C) {
                        return C == null ? "" : C + ""
                    });
                    if (c.isArray(r) && ta.test(this.type)) this.checked = c.inArray(x.val(), r) >= 0;
                    else if (c.nodeName(this, "select")) {
                        var A = c.makeArray(r);
                        c("option", this).each(function() {
                            this.selected = c.inArray(c(this).val(), A) >= 0
                        });
                        if (!A.length) this.selectedIndex = -1
                    } else this.value = r
                }
            })
        }
    });
    c.extend({
        attrFn: {
            val: true,
            css: true,
            html: true,
            text: true,
            data: true,
            width: true,
            height: true,
            offset: true
        },
        attr: function(a, b, d, e) {
            if (!a || a.nodeType === 3 || a.nodeType === 8) return B;
            if (e && b in c.attrFn) return c(a)[b](d);
            e = a.nodeType !== 1 || !c.isXMLDoc(a);
            var f = d !== B;
            b = e && c.props[b] || b;
            var h = Ta.test(b);
            if ((b in a || a[b] !== B) && e && !h) {
                if (f) {
                    b === "type" && Ua.test(a.nodeName) && a.parentNode && c.error("type property can't be changed");
                    if (d === null) a.nodeType === 1 && a.removeAttribute(b);
                    else a[b] = d
                }
                if (c.nodeName(a, "form") && a.getAttributeNode(b)) return a.getAttributeNode(b).nodeValue;
                if (b === "tabIndex") return (b = a.getAttributeNode("tabIndex")) &&
                    b.specified ? b.value : Va.test(a.nodeName) || Wa.test(a.nodeName) && a.href ? 0 : B;
                return a[b]
            }
            if (!c.support.style && e && b === "style") {
                if (f) a.style.cssText = "" + d;
                return a.style.cssText
            }
            f && a.setAttribute(b, "" + d);
            if (!a.attributes[b] && a.hasAttribute && !a.hasAttribute(b)) return B;
            a = !c.support.hrefNormalized && e && h ? a.getAttribute(b, 2) : a.getAttribute(b);
            return a === null ? B : a
        }
    });
    var X = /\.(.*)$/,
        ia = /^(?:textarea|input|select)$/i,
        La = /\./g,
        Ma = / /g,
        Xa = /[^\w\s.|`]/g,
        Ya = function(a) {
            return a.replace(Xa, "\\$&")
        },
        ua = {
            focusin: 0,
            focusout: 0
        };
    c.event = {
        add: function(a, b, d, e) {
            if (!(a.nodeType === 3 || a.nodeType === 8)) {
                if (c.isWindow(a) && a !== E && !a.frameElement) a = E;
                if (d === false) d = U;
                else if (!d) return;
                var f, h;
                if (d.handler) {
                    f = d;
                    d = f.handler
                }
                if (!d.guid) d.guid = c.guid++;
                if (h = c.data(a)) {
                    var l = a.nodeType ? "events" : "__events__",
                        k = h[l],
                        o = h.handle;
                    if (typeof k === "function") {
                        o = k.handle;
                        k = k.events
                    } else if (!k) {
                        a.nodeType || (h[l] = h = function() {});
                        h.events = k = {}
                    }
                    if (!o) h.handle = o = function() {
                        return typeof c !== "undefined" && !c.event.triggered ? c.event.handle.apply(o.elem,
                            arguments) : B
                    };
                    o.elem = a;
                    b = b.split(" ");
                    for (var x = 0, r; l = b[x++];) {
                        h = f ? c.extend({}, f) : {
                            handler: d,
                            data: e
                        };
                        if (l.indexOf(".") > -1) {
                            r = l.split(".");
                            l = r.shift();
                            h.namespace = r.slice(0).sort().join(".")
                        } else {
                            r = [];
                            h.namespace = ""
                        }
                        h.type = l;
                        if (!h.guid) h.guid = d.guid;
                        var A = k[l],
                            C = c.event.special[l] || {};
                        if (!A) {
                            A = k[l] = [];
                            if (!C.setup || C.setup.call(a, e, r, o) === false)
                                if (a.addEventListener) a.addEventListener(l, o, false);
                                else a.attachEvent && a.attachEvent("on" + l, o)
                        }
                        if (C.add) {
                            C.add.call(a, h);
                            if (!h.handler.guid) h.handler.guid =
                                d.guid
                        }
                        A.push(h);
                        c.event.global[l] = true
                    }
                    a = null
                }
            }
        },
        global: {},
        remove: function(a, b, d, e) {
            if (!(a.nodeType === 3 || a.nodeType === 8)) {
                if (d === false) d = U;
                var f, h, l = 0,
                    k, o, x, r, A, C, J = a.nodeType ? "events" : "__events__",
                    w = c.data(a),
                    I = w && w[J];
                if (w && I) {
                    if (typeof I === "function") {
                        w = I;
                        I = I.events
                    }
                    if (b && b.type) {
                        d = b.handler;
                        b = b.type
                    }
                    if (!b || typeof b === "string" && b.charAt(0) === ".") {
                        b = b || "";
                        for (f in I) c.event.remove(a, f + b)
                    } else {
                        for (b = b.split(" "); f = b[l++];) {
                            r = f;
                            k = f.indexOf(".") < 0;
                            o = [];
                            if (!k) {
                                o = f.split(".");
                                f = o.shift();
                                x = RegExp("(^|\\.)" +
                                    c.map(o.slice(0).sort(), Ya).join("\\.(?:.*\\.)?") + "(\\.|$)")
                            }
                            if (A = I[f])
                                if (d) {
                                    r = c.event.special[f] || {};
                                    for (h = e || 0; h < A.length; h++) {
                                        C = A[h];
                                        if (d.guid === C.guid) {
                                            if (k || x.test(C.namespace)) {
                                                e == null && A.splice(h--, 1);
                                                r.remove && r.remove.call(a, C)
                                            }
                                            if (e != null) break
                                        }
                                    }
                                    if (A.length === 0 || e != null && A.length === 1) {
                                        if (!r.teardown || r.teardown.call(a, o) === false) c.removeEvent(a, f, w.handle);
                                        delete I[f]
                                    }
                                } else
                                    for (h = 0; h < A.length; h++) {
                                        C = A[h];
                                        if (k || x.test(C.namespace)) {
                                            c.event.remove(a, r, C.handler, h);
                                            A.splice(h--, 1)
                                        }
                                    }
                        }
                        if (c.isEmptyObject(I)) {
                            if (b =
                                w.handle) b.elem = null;
                            delete w.events;
                            delete w.handle;
                            if (typeof w === "function") c.removeData(a, J);
                            else c.isEmptyObject(w) && c.removeData(a)
                        }
                    }
                }
            }
        },
        trigger: function(a, b, d, e) {
            var f = a.type || a;
            if (!e) {
                a = typeof a === "object" ? a[c.expando] ? a : c.extend(c.Event(f), a) : c.Event(f);
                if (f.indexOf("!") >= 0) {
                    a.type = f = f.slice(0, -1);
                    a.exclusive = true
                }
                if (!d) {
                    a.stopPropagation();
                    c.event.global[f] && c.each(c.cache, function() {
                        this.events && this.events[f] && c.event.trigger(a, b, this.handle.elem)
                    })
                }
                if (!d || d.nodeType === 3 || d.nodeType ===
                    8) return B;
                a.result = B;
                a.target = d;
                b = c.makeArray(b);
                b.unshift(a)
            }
            a.currentTarget = d;
            (e = d.nodeType ? c.data(d, "handle") : (c.data(d, "__events__") || {}).handle) && e.apply(d, b);
            e = d.parentNode || d.ownerDocument;
            try {
                if (!(d && d.nodeName && c.noData[d.nodeName.toLowerCase()]))
                    if (d["on" + f] && d["on" + f].apply(d, b) === false) {
                        a.result = false;
                        a.preventDefault()
                    }
            } catch (h) {}
            if (!a.isPropagationStopped() && e) c.event.trigger(a, b, e, true);
            else if (!a.isDefaultPrevented()) {
                var l;
                e = a.target;
                var k = f.replace(X, ""),
                    o = c.nodeName(e, "a") && k ===
                    "click",
                    x = c.event.special[k] || {};
                if ((!x._default || x._default.call(d, a) === false) && !o && !(e && e.nodeName && c.noData[e.nodeName.toLowerCase()])) {
                    try {
                        if (e[k]) {
                            if (l = e["on" + k]) e["on" + k] = null;
                            c.event.triggered = true;
                            e[k]()
                        }
                    } catch (r) {}
                    if (l) e["on" + k] = l;
                    c.event.triggered = false
                }
            }
        },
        handle: function(a) {
            var b, d, e, f;
            d = [];
            var h = c.makeArray(arguments);
            a = h[0] = c.event.fix(a || E.event);
            a.currentTarget = this;
            b = a.type.indexOf(".") < 0 && !a.exclusive;
            if (!b) {
                e = a.type.split(".");
                a.type = e.shift();
                d = e.slice(0).sort();
                e = RegExp("(^|\\.)" +
                    d.join("\\.(?:.*\\.)?") + "(\\.|$)")
            }
            a.namespace = a.namespace || d.join(".");
            f = c.data(this, this.nodeType ? "events" : "__events__");
            if (typeof f === "function") f = f.events;
            d = (f || {})[a.type];
            if (f && d) {
                d = d.slice(0);
                f = 0;
                for (var l = d.length; f < l; f++) {
                    var k = d[f];
                    if (b || e.test(k.namespace)) {
                        a.handler = k.handler;
                        a.data = k.data;
                        a.handleObj = k;
                        k = k.handler.apply(this, h);
                        if (k !== B) {
                            a.result = k;
                            if (k === false) {
                                a.preventDefault();
                                a.stopPropagation()
                            }
                        }
                        if (a.isImmediatePropagationStopped()) break
                    }
                }
            }
            return a.result
        },
        props: "altKey attrChange attrName bubbles button cancelable charCode clientX clientY ctrlKey currentTarget data detail eventPhase fromElement handler keyCode layerX layerY metaKey newValue offsetX offsetY pageX pageY prevValue relatedNode relatedTarget screenX screenY shiftKey srcElement target toElement view wheelDelta which".split(" "),
        fix: function(a) {
            if (a[c.expando]) return a;
            var b = a;
            a = c.Event(b);
            for (var d = this.props.length, e; d;) {
                e = this.props[--d];
                a[e] = b[e]
            }
            if (!a.target) a.target = a.srcElement || t;
            if (a.target.nodeType === 3) a.target = a.target.parentNode;
            if (!a.relatedTarget && a.fromElement) a.relatedTarget = a.fromElement === a.target ? a.toElement : a.fromElement;
            if (a.pageX == null && a.clientX != null) {
                b = t.documentElement;
                d = t.body;
                a.pageX = a.clientX + (b && b.scrollLeft || d && d.scrollLeft || 0) - (b && b.clientLeft || d && d.clientLeft || 0);
                a.pageY = a.clientY + (b && b.scrollTop ||
                    d && d.scrollTop || 0) - (b && b.clientTop || d && d.clientTop || 0)
            }
            if (a.which == null && (a.charCode != null || a.keyCode != null)) a.which = a.charCode != null ? a.charCode : a.keyCode;
            if (!a.metaKey && a.ctrlKey) a.metaKey = a.ctrlKey;
            if (!a.which && a.button !== B) a.which = a.button & 1 ? 1 : a.button & 2 ? 3 : a.button & 4 ? 2 : 0;
            return a
        },
        guid: 1E8,
        proxy: c.proxy,
        special: {
            ready: {
                setup: c.bindReady,
                teardown: c.noop
            },
            live: {
                add: function(a) {
                    c.event.add(this, Y(a.origType, a.selector), c.extend({}, a, {
                        handler: Ka,
                        guid: a.handler.guid
                    }))
                },
                remove: function(a) {
                    c.event.remove(this,
                        Y(a.origType, a.selector), a)
                }
            },
            beforeunload: {
                setup: function(a, b, d) {
                    if (c.isWindow(this)) this.onbeforeunload = d
                },
                teardown: function(a, b) {
                    if (this.onbeforeunload === b) this.onbeforeunload = null
                }
            }
        }
    };
    c.removeEvent = t.removeEventListener ? function(a, b, d) {
        a.removeEventListener && a.removeEventListener(b, d, false)
    } : function(a, b, d) {
        a.detachEvent && a.detachEvent("on" + b, d)
    };
    c.Event = function(a) {
        if (!this.preventDefault) return new c.Event(a);
        if (a && a.type) {
            this.originalEvent = a;
            this.type = a.type
        } else this.type = a;
        this.timeStamp =
            c.now();
        this[c.expando] = true
    };
    c.Event.prototype = {
        preventDefault: function() {
            this.isDefaultPrevented = ca;
            var a = this.originalEvent;
            if (a)
                if (a.preventDefault) a.preventDefault();
                else a.returnValue = false
        },
        stopPropagation: function() {
            this.isPropagationStopped = ca;
            var a = this.originalEvent;
            if (a) {
                a.stopPropagation && a.stopPropagation();
                a.cancelBubble = true
            }
        },
        stopImmediatePropagation: function() {
            this.isImmediatePropagationStopped = ca;
            this.stopPropagation()
        },
        isDefaultPrevented: U,
        isPropagationStopped: U,
        isImmediatePropagationStopped: U
    };
    var va = function(a) {
            var b = a.relatedTarget;
            try {
                for (; b && b !== this;) b = b.parentNode;
                if (b !== this) {
                    a.type = a.data;
                    c.event.handle.apply(this, arguments)
                }
            } catch (d) {}
        },
        wa = function(a) {
            a.type = a.data;
            c.event.handle.apply(this, arguments)
        };
    c.each({
        mouseenter: "mouseover",
        mouseleave: "mouseout"
    }, function(a, b) {
        c.event.special[a] = {
            setup: function(d) {
                c.event.add(this, b, d && d.selector ? wa : va, a)
            },
            teardown: function(d) {
                c.event.remove(this, b, d && d.selector ? wa : va)
            }
        }
    });
    if (!c.support.submitBubbles) c.event.special.submit = {
        setup: function() {
            if (this.nodeName.toLowerCase() !==
                "form") {
                c.event.add(this, "click.specialSubmit", function(a) {
                    var b = a.target,
                        d = b.type;
                    if ((d === "submit" || d === "image") && c(b).closest("form").length) {
                        a.liveFired = B;
                        return la("submit", this, arguments)
                    }
                });
                c.event.add(this, "keypress.specialSubmit", function(a) {
                    var b = a.target,
                        d = b.type;
                    if ((d === "text" || d === "password") && c(b).closest("form").length && a.keyCode === 13) {
                        a.liveFired = B;
                        return la("submit", this, arguments)
                    }
                })
            } else return false
        },
        teardown: function() {
            c.event.remove(this, ".specialSubmit")
        }
    };
    if (!c.support.changeBubbles) {
        var V,
            xa = function(a) {
                var b = a.type,
                    d = a.value;
                if (b === "radio" || b === "checkbox") d = a.checked;
                else if (b === "select-multiple") d = a.selectedIndex > -1 ? c.map(a.options, function(e) {
                    return e.selected
                }).join("-") : "";
                else if (a.nodeName.toLowerCase() === "select") d = a.selectedIndex;
                return d
            },
            Z = function(a, b) {
                var d = a.target,
                    e, f;
                if (!(!ia.test(d.nodeName) || d.readOnly)) {
                    e = c.data(d, "_change_data");
                    f = xa(d);
                    if (a.type !== "focusout" || d.type !== "radio") c.data(d, "_change_data", f);
                    if (!(e === B || f === e))
                        if (e != null || f) {
                            a.type = "change";
                            a.liveFired =
                                B;
                            return c.event.trigger(a, b, d)
                        }
                }
            };
        c.event.special.change = {
            filters: {
                focusout: Z,
                beforedeactivate: Z,
                click: function(a) {
                    var b = a.target,
                        d = b.type;
                    if (d === "radio" || d === "checkbox" || b.nodeName.toLowerCase() === "select") return Z.call(this, a)
                },
                keydown: function(a) {
                    var b = a.target,
                        d = b.type;
                    if (a.keyCode === 13 && b.nodeName.toLowerCase() !== "textarea" || a.keyCode === 32 && (d === "checkbox" || d === "radio") || d === "select-multiple") return Z.call(this, a)
                },
                beforeactivate: function(a) {
                    a = a.target;
                    c.data(a, "_change_data", xa(a))
                }
            },
            setup: function() {
                if (this.type ===
                    "file") return false;
                for (var a in V) c.event.add(this, a + ".specialChange", V[a]);
                return ia.test(this.nodeName)
            },
            teardown: function() {
                c.event.remove(this, ".specialChange");
                return ia.test(this.nodeName)
            }
        };
        V = c.event.special.change.filters;
        V.focus = V.beforeactivate
    }
    t.addEventListener && c.each({
        focus: "focusin",
        blur: "focusout"
    }, function(a, b) {
        function d(e) {
            e = c.event.fix(e);
            e.type = b;
            return c.event.trigger(e, null, e.target)
        }
        c.event.special[b] = {
            setup: function() {
                ua[b] ++ === 0 && t.addEventListener(a, d, true)
            },
            teardown: function() {
                --ua[b] ===
                    0 && t.removeEventListener(a, d, true)
            }
        }
    });
    c.each(["bind", "one"], function(a, b) {
        c.fn[b] = function(d, e, f) {
            if (typeof d === "object") {
                for (var h in d) this[b](h, e, d[h], f);
                return this
            }
            if (c.isFunction(e) || e === false) {
                f = e;
                e = B
            }
            var l = b === "one" ? c.proxy(f, function(o) {
                c(this).unbind(o, l);
                return f.apply(this, arguments)
            }) : f;
            if (d === "unload" && b !== "one") this.one(d, e, f);
            else {
                h = 0;
                for (var k = this.length; h < k; h++) c.event.add(this[h], d, l, e)
            }
            return this
        }
    });
    c.fn.extend({
        unbind: function(a, b) {
            if (typeof a === "object" && !a.preventDefault)
                for (var d in a) this.unbind(d,
                    a[d]);
            else {
                d = 0;
                for (var e = this.length; d < e; d++) c.event.remove(this[d], a, b)
            }
            return this
        },
        delegate: function(a, b, d, e) {
            return this.live(b, d, e, a)
        },
        undelegate: function(a, b, d) {
            return arguments.length === 0 ? this.unbind("live") : this.die(b, null, d, a)
        },
        trigger: function(a, b) {
            return this.each(function() {
                c.event.trigger(a, b, this)
            })
        },
        triggerHandler: function(a, b) {
            if (this[0]) {
                var d = c.Event(a);
                d.preventDefault();
                d.stopPropagation();
                c.event.trigger(d, b, this[0]);
                return d.result
            }
        },
        toggle: function(a) {
            for (var b = arguments, d =
                    1; d < b.length;) c.proxy(a, b[d++]);
            return this.click(c.proxy(a, function(e) {
                var f = (c.data(this, "lastToggle" + a.guid) || 0) % d;
                c.data(this, "lastToggle" + a.guid, f + 1);
                e.preventDefault();
                return b[f].apply(this, arguments) || false
            }))
        },
        hover: function(a, b) {
            return this.mouseenter(a).mouseleave(b || a)
        }
    });
    var ya = {
        focus: "focusin",
        blur: "focusout",
        mouseenter: "mouseover",
        mouseleave: "mouseout"
    };
    c.each(["live", "die"], function(a, b) {
        c.fn[b] = function(d, e, f, h) {
            var l, k = 0,
                o, x, r = h || this.selector;
            h = h ? this : c(this.context);
            if (typeof d ===
                "object" && !d.preventDefault) {
                for (l in d) h[b](l, e, d[l], r);
                return this
            }
            if (c.isFunction(e)) {
                f = e;
                e = B
            }
            for (d = (d || "").split(" ");
                (l = d[k++]) != null;) {
                o = X.exec(l);
                x = "";
                if (o) {
                    x = o[0];
                    l = l.replace(X, "")
                }
                if (l === "hover") d.push("mouseenter" + x, "mouseleave" + x);
                else {
                    o = l;
                    if (l === "focus" || l === "blur") {
                        d.push(ya[l] + x);
                        l += x
                    } else l = (ya[l] || l) + x;
                    if (b === "live") {
                        x = 0;
                        for (var A = h.length; x < A; x++) c.event.add(h[x], "live." + Y(l, r), {
                            data: e,
                            selector: r,
                            handler: f,
                            origType: l,
                            origHandler: f,
                            preType: o
                        })
                    } else h.unbind("live." + Y(l, r), f)
                }
            }
            return this
        }
    });
    c.each("blur focus focusin focusout load resize scroll unload click dblclick mousedown mouseup mousemove mouseover mouseout mouseenter mouseleave change select submit keydown keypress keyup error".split(" "), function(a, b) {
        c.fn[b] = function(d, e) {
            if (e == null) {
                e = d;
                d = null
            }
            return arguments.length > 0 ? this.bind(b, d, e) : this.trigger(b)
        };
        if (c.attrFn) c.attrFn[b] = true
    });
    E.attachEvent && !E.addEventListener && c(E).bind("unload", function() {
        for (var a in c.cache)
            if (c.cache[a].handle) try {
                c.event.remove(c.cache[a].handle.elem)
            } catch (b) {}
    });
    (function() {
        function a(g, i, n, m, p, q) {
            p = 0;
            for (var u = m.length; p < u; p++) {
                var y = m[p];
                if (y) {
                    var F = false;
                    for (y = y[g]; y;) {
                        if (y.sizcache === n) {
                            F = m[y.sizset];
                            break
                        }
                        if (y.nodeType === 1 && !q) {
                            y.sizcache = n;
                            y.sizset = p
                        }
                        if (y.nodeName.toLowerCase() === i) {
                            F = y;
                            break
                        }
                        y = y[g]
                    }
                    m[p] = F
                }
            }
        }

        function b(g, i, n, m, p, q) {
            p = 0;
            for (var u = m.length; p < u; p++) {
                var y = m[p];
                if (y) {
                    var F = false;
                    for (y = y[g]; y;) {
                        if (y.sizcache === n) {
                            F = m[y.sizset];
                            break
                        }
                        if (y.nodeType === 1) {
                            if (!q) {
                                y.sizcache = n;
                                y.sizset = p
                            }
                            if (typeof i !== "string") {
                                if (y === i) {
                                    F = true;
                                    break
                                }
                            } else if (k.filter(i, [y]).length > 0) {
                                F = y;
                                break
                            }
                        }
                        y = y[g]
                    }
                    m[p] = F
                }
            }
        }
        var d = /((?:\((?:\([^()]+\)|[^()]+)+\)|\[(?:\[[^\[\]]*\]|['"][^'"]*['"]|[^\[\]'"]+)+\]|\\.|[^ >+~,(\[\\]+)+|[>+~])(\s*,\s*)?((?:.|\r|\n)*)/g,
            e = 0,
            f = Object.prototype.toString,
            h = false,
            l = true;
        [0, 0].sort(function() {
            l = false;
            return 0
        });
        var k = function(g, i, n, m) {
            n = n || [];
            var p = i = i || t;
            if (i.nodeType !== 1 && i.nodeType !== 9) return [];
            if (!g || typeof g !== "string") return n;
            var q, u, y, F, M, N = true,
                O = k.isXML(i),
                D = [],
                R = g;
            do {
                d.exec("");
                if (q = d.exec(R)) {
                    R = q[3];
                    D.push(q[1]);
                    if (q[2]) {
                        F = q[3];
                        break
                    }
                }
            } while (q);
            if (D.length > 1 && x.exec(g))
                if (D.length === 2 && o.relative[D[0]]) u = L(D[0] + D[1], i);
                else
                    for (u = o.relative[D[0]] ? [i] : k(D.shift(), i); D.length;) {
                        g = D.shift();
                        if (o.relative[g]) g += D.shift();
                        u = L(g, u)
                    } else {
                        if (!m && D.length > 1 && i.nodeType === 9 && !O && o.match.ID.test(D[0]) && !o.match.ID.test(D[D.length - 1])) {
                            q = k.find(D.shift(), i, O);
                            i = q.expr ? k.filter(q.expr, q.set)[0] : q.set[0]
                        }
                        if (i) {
                            q = m ? {
                                expr: D.pop(),
                                set: C(m)
                            } : k.find(D.pop(), D.length === 1 && (D[0] === "~" || D[0] === "+") && i.parentNode ? i.parentNode : i, O);
                            u = q.expr ? k.filter(q.expr,
                                q.set) : q.set;
                            if (D.length > 0) y = C(u);
                            else N = false;
                            for (; D.length;) {
                                q = M = D.pop();
                                if (o.relative[M]) q = D.pop();
                                else M = "";
                                if (q == null) q = i;
                                o.relative[M](y, q, O)
                            }
                        } else y = []
                    }
                y || (y = u);
            y || k.error(M || g);
            if (f.call(y) === "[object Array]")
                if (N)
                    if (i && i.nodeType === 1)
                        for (g = 0; y[g] != null; g++) {
                            if (y[g] && (y[g] === true || y[g].nodeType === 1 && k.contains(i, y[g]))) n.push(u[g])
                        } else
                            for (g = 0; y[g] != null; g++) y[g] && y[g].nodeType === 1 && n.push(u[g]);
                    else n.push.apply(n, y);
            else C(y, n);
            if (F) {
                k(F, p, n, m);
                k.uniqueSort(n)
            }
            return n
        };
        k.uniqueSort = function(g) {
            if (w) {
                h =
                    l;
                g.sort(w);
                if (h)
                    for (var i = 1; i < g.length; i++) g[i] === g[i - 1] && g.splice(i--, 1)
            }
            return g
        };
        k.matches = function(g, i) {
            return k(g, null, null, i)
        };
        k.matchesSelector = function(g, i) {
            return k(i, null, null, [g]).length > 0
        };
        k.find = function(g, i, n) {
            var m;
            if (!g) return [];
            for (var p = 0, q = o.order.length; p < q; p++) {
                var u, y = o.order[p];
                if (u = o.leftMatch[y].exec(g)) {
                    var F = u[1];
                    u.splice(1, 1);
                    if (F.substr(F.length - 1) !== "\\") {
                        u[1] = (u[1] || "").replace(/\\/g, "");
                        m = o.find[y](u, i, n);
                        if (m != null) {
                            g = g.replace(o.match[y], "");
                            break
                        }
                    }
                }
            }
            m || (m = i.getElementsByTagName("*"));
            return {
                set: m,
                expr: g
            }
        };
        k.filter = function(g, i, n, m) {
            for (var p, q, u = g, y = [], F = i, M = i && i[0] && k.isXML(i[0]); g && i.length;) {
                for (var N in o.filter)
                    if ((p = o.leftMatch[N].exec(g)) != null && p[2]) {
                        var O, D, R = o.filter[N];
                        D = p[1];
                        q = false;
                        p.splice(1, 1);
                        if (D.substr(D.length - 1) !== "\\") {
                            if (F === y) y = [];
                            if (o.preFilter[N])
                                if (p = o.preFilter[N](p, F, n, y, m, M)) {
                                    if (p === true) continue
                                } else q = O = true;
                            if (p)
                                for (var j = 0;
                                    (D = F[j]) != null; j++)
                                    if (D) {
                                        O = R(D, p, j, F);
                                        var s = m ^ !!O;
                                        if (n && O != null)
                                            if (s) q = true;
                                            else F[j] = false;
                                        else if (s) {
                                            y.push(D);
                                            q = true
                                        }
                                    }
                            if (O !==
                                B) {
                                n || (F = y);
                                g = g.replace(o.match[N], "");
                                if (!q) return [];
                                break
                            }
                        }
                    }
                if (g === u)
                    if (q == null) k.error(g);
                    else break;
                u = g
            }
            return F
        };
        k.error = function(g) {
            throw "Syntax error, unrecognized expression: " + g;
        };
        var o = k.selectors = {
                order: ["ID", "NAME", "TAG"],
                match: {
                    ID: /#((?:[\w\u00c0-\uFFFF\-]|\\.)+)/,
                    CLASS: /\.((?:[\w\u00c0-\uFFFF\-]|\\.)+)/,
                    NAME: /\[name=['"]*((?:[\w\u00c0-\uFFFF\-]|\\.)+)['"]*\]/,
                    ATTR: /\[\s*((?:[\w\u00c0-\uFFFF\-]|\\.)+)\s*(?:(\S?=)\s*(['"]*)(.*?)\3|)\s*\]/,
                    TAG: /^((?:[\w\u00c0-\uFFFF\*\-]|\\.)+)/,
                    CHILD: /:(only|nth|last|first)-child(?:\((even|odd|[\dn+\-]*)\))?/,
                    POS: /:(nth|eq|gt|lt|first|last|even|odd)(?:\((\d*)\))?(?=[^\-]|$)/,
                    PSEUDO: /:((?:[\w\u00c0-\uFFFF\-]|\\.)+)(?:\((['"]?)((?:\([^\)]+\)|[^\(\)]*)+)\2\))?/
                },
                leftMatch: {},
                attrMap: {
                    "class": "className",
                    "for": "htmlFor"
                },
                attrHandle: {
                    href: function(g) {
                        return g.getAttribute("href")
                    }
                },
                relative: {
                    "+": function(g, i) {
                        var n = typeof i === "string",
                            m = n && !/\W/.test(i);
                        n = n && !m;
                        if (m) i = i.toLowerCase();
                        m = 0;
                        for (var p = g.length, q; m < p; m++)
                            if (q = g[m]) {
                                for (;
                                    (q = q.previousSibling) && q.nodeType !== 1;);
                                g[m] = n || q && q.nodeName.toLowerCase() ===
                                    i ? q || false : q === i
                            }
                        n && k.filter(i, g, true)
                    },
                    ">": function(g, i) {
                        var n, m = typeof i === "string",
                            p = 0,
                            q = g.length;
                        if (m && !/\W/.test(i))
                            for (i = i.toLowerCase(); p < q; p++) {
                                if (n = g[p]) {
                                    n = n.parentNode;
                                    g[p] = n.nodeName.toLowerCase() === i ? n : false
                                }
                            } else {
                                for (; p < q; p++)
                                    if (n = g[p]) g[p] = m ? n.parentNode : n.parentNode === i;
                                m && k.filter(i, g, true)
                            }
                    },
                    "": function(g, i, n) {
                        var m, p = e++,
                            q = b;
                        if (typeof i === "string" && !/\W/.test(i)) {
                            m = i = i.toLowerCase();
                            q = a
                        }
                        q("parentNode", i, p, g, m, n)
                    },
                    "~": function(g, i, n) {
                        var m, p = e++,
                            q = b;
                        if (typeof i === "string" && !/\W/.test(i)) {
                            m =
                                i = i.toLowerCase();
                            q = a
                        }
                        q("previousSibling", i, p, g, m, n)
                    }
                },
                find: {
                    ID: function(g, i, n) {
                        if (typeof i.getElementById !== "undefined" && !n) return (g = i.getElementById(g[1])) && g.parentNode ? [g] : []
                    },
                    NAME: function(g, i) {
                        if (typeof i.getElementsByName !== "undefined") {
                            for (var n = [], m = i.getElementsByName(g[1]), p = 0, q = m.length; p < q; p++) m[p].getAttribute("name") === g[1] && n.push(m[p]);
                            return n.length === 0 ? null : n
                        }
                    },
                    TAG: function(g, i) {
                        return i.getElementsByTagName(g[1])
                    }
                },
                preFilter: {
                    CLASS: function(g, i, n, m, p, q) {
                        g = " " + g[1].replace(/\\/g,
                            "") + " ";
                        if (q) return g;
                        q = 0;
                        for (var u;
                            (u = i[q]) != null; q++)
                            if (u)
                                if (p ^ (u.className && (" " + u.className + " ").replace(/[\t\n]/g, " ").indexOf(g) >= 0)) n || m.push(u);
                                else if (n) i[q] = false;
                        return false
                    },
                    ID: function(g) {
                        return g[1].replace(/\\/g, "")
                    },
                    TAG: function(g) {
                        return g[1].toLowerCase()
                    },
                    CHILD: function(g) {
                        if (g[1] === "nth") {
                            var i = /(-?)(\d*)n((?:\+|-)?\d*)/.exec(g[2] === "even" && "2n" || g[2] === "odd" && "2n+1" || !/\D/.test(g[2]) && "0n+" + g[2] || g[2]);
                            g[2] = i[1] + (i[2] || 1) - 0;
                            g[3] = i[3] - 0
                        }
                        g[0] = e++;
                        return g
                    },
                    ATTR: function(g, i, n,
                        m, p, q) {
                        i = g[1].replace(/\\/g, "");
                        if (!q && o.attrMap[i]) g[1] = o.attrMap[i];
                        if (g[2] === "~=") g[4] = " " + g[4] + " ";
                        return g
                    },
                    PSEUDO: function(g, i, n, m, p) {
                        if (g[1] === "not")
                            if ((d.exec(g[3]) || "").length > 1 || /^\w/.test(g[3])) g[3] = k(g[3], null, null, i);
                            else {
                                g = k.filter(g[3], i, n, true ^ p);
                                n || m.push.apply(m, g);
                                return false
                            } else if (o.match.POS.test(g[0]) || o.match.CHILD.test(g[0])) return true;
                        return g
                    },
                    POS: function(g) {
                        g.unshift(true);
                        return g
                    }
                },
                filters: {
                    enabled: function(g) {
                        return g.disabled === false && g.type !== "hidden"
                    },
                    disabled: function(g) {
                        return g.disabled ===
                            true
                    },
                    checked: function(g) {
                        return g.checked === true
                    },
                    selected: function(g) {
                        return g.selected === true
                    },
                    parent: function(g) {
                        return !!g.firstChild
                    },
                    empty: function(g) {
                        return !g.firstChild
                    },
                    has: function(g, i, n) {
                        return !!k(n[3], g).length
                    },
                    header: function(g) {
                        return /h\d/i.test(g.nodeName)
                    },
                    text: function(g) {
                        return "text" === g.type
                    },
                    radio: function(g) {
                        return "radio" === g.type
                    },
                    checkbox: function(g) {
                        return "checkbox" === g.type
                    },
                    file: function(g) {
                        return "file" === g.type
                    },
                    password: function(g) {
                        return "password" === g.type
                    },
                    submit: function(g) {
                        return "submit" ===
                            g.type
                    },
                    image: function(g) {
                        return "image" === g.type
                    },
                    reset: function(g) {
                        return "reset" === g.type
                    },
                    button: function(g) {
                        return "button" === g.type || g.nodeName.toLowerCase() === "button"
                    },
                    input: function(g) {
                        return /input|select|textarea|button/i.test(g.nodeName)
                    }
                },
                setFilters: {
                    first: function(g, i) {
                        return i === 0
                    },
                    last: function(g, i, n, m) {
                        return i === m.length - 1
                    },
                    even: function(g, i) {
                        return i % 2 === 0
                    },
                    odd: function(g, i) {
                        return i % 2 === 1
                    },
                    lt: function(g, i, n) {
                        return i < n[3] - 0
                    },
                    gt: function(g, i, n) {
                        return i > n[3] - 0
                    },
                    nth: function(g, i, n) {
                        return n[3] -
                            0 === i
                    },
                    eq: function(g, i, n) {
                        return n[3] - 0 === i
                    }
                },
                filter: {
                    PSEUDO: function(g, i, n, m) {
                        var p = i[1],
                            q = o.filters[p];
                        if (q) return q(g, n, i, m);
                        else if (p === "contains") return (g.textContent || g.innerText || k.getText([g]) || "").indexOf(i[3]) >= 0;
                        else if (p === "not") {
                            i = i[3];
                            n = 0;
                            for (m = i.length; n < m; n++)
                                if (i[n] === g) return false;
                            return true
                        } else k.error("Syntax error, unrecognized expression: " + p)
                    },
                    CHILD: function(g, i) {
                        var n = i[1],
                            m = g;
                        switch (n) {
                            case "only":
                            case "first":
                                for (; m = m.previousSibling;)
                                    if (m.nodeType === 1) return false;
                                if (n ===
                                    "first") return true;
                                m = g;
                            case "last":
                                for (; m = m.nextSibling;)
                                    if (m.nodeType === 1) return false;
                                return true;
                            case "nth":
                                n = i[2];
                                var p = i[3];
                                if (n === 1 && p === 0) return true;
                                var q = i[0],
                                    u = g.parentNode;
                                if (u && (u.sizcache !== q || !g.nodeIndex)) {
                                    var y = 0;
                                    for (m = u.firstChild; m; m = m.nextSibling)
                                        if (m.nodeType === 1) m.nodeIndex = ++y;
                                    u.sizcache = q
                                }
                                m = g.nodeIndex - p;
                                return n === 0 ? m === 0 : m % n === 0 && m / n >= 0
                        }
                    },
                    ID: function(g, i) {
                        return g.nodeType === 1 && g.getAttribute("id") === i
                    },
                    TAG: function(g, i) {
                        return i === "*" && g.nodeType === 1 || g.nodeName.toLowerCase() ===
                            i
                    },
                    CLASS: function(g, i) {
                        return (" " + (g.className || g.getAttribute("class")) + " ").indexOf(i) > -1
                    },
                    ATTR: function(g, i) {
                        var n = i[1];
                        n = o.attrHandle[n] ? o.attrHandle[n](g) : g[n] != null ? g[n] : g.getAttribute(n);
                        var m = n + "",
                            p = i[2],
                            q = i[4];
                        return n == null ? p === "!=" : p === "=" ? m === q : p === "*=" ? m.indexOf(q) >= 0 : p === "~=" ? (" " + m + " ").indexOf(q) >= 0 : !q ? m && n !== false : p === "!=" ? m !== q : p === "^=" ? m.indexOf(q) === 0 : p === "$=" ? m.substr(m.length - q.length) === q : p === "|=" ? m === q || m.substr(0, q.length + 1) === q + "-" : false
                    },
                    POS: function(g, i, n, m) {
                        var p = o.setFilters[i[2]];
                        if (p) return p(g, n, i, m)
                    }
                }
            },
            x = o.match.POS,
            r = function(g, i) {
                return "\\" + (i - 0 + 1)
            },
            A;
        for (A in o.match) {
            o.match[A] = RegExp(o.match[A].source + /(?![^\[]*\])(?![^\(]*\))/.source);
            o.leftMatch[A] = RegExp(/(^(?:.|\r|\n)*?)/.source + o.match[A].source.replace(/\\(\d+)/g, r))
        }
        var C = function(g, i) {
            g = Array.prototype.slice.call(g, 0);
            if (i) {
                i.push.apply(i, g);
                return i
            }
            return g
        };
        try {
            Array.prototype.slice.call(t.documentElement.childNodes, 0)
        } catch (J) {
            C = function(g, i) {
                var n = 0,
                    m = i || [];
                if (f.call(g) === "[object Array]") Array.prototype.push.apply(m,
                    g);
                else if (typeof g.length === "number")
                    for (var p = g.length; n < p; n++) m.push(g[n]);
                else
                    for (; g[n]; n++) m.push(g[n]);
                return m
            }
        }
        var w, I;
        if (t.documentElement.compareDocumentPosition) w = function(g, i) {
            if (g === i) {
                h = true;
                return 0
            }
            if (!g.compareDocumentPosition || !i.compareDocumentPosition) return g.compareDocumentPosition ? -1 : 1;
            return g.compareDocumentPosition(i) & 4 ? -1 : 1
        };
        else {
            w = function(g, i) {
                var n, m, p = [],
                    q = [];
                n = g.parentNode;
                m = i.parentNode;
                var u = n;
                if (g === i) {
                    h = true;
                    return 0
                } else if (n === m) return I(g, i);
                else if (n) {
                    if (!m) return 1
                } else return -1;
                for (; u;) {
                    p.unshift(u);
                    u = u.parentNode
                }
                for (u = m; u;) {
                    q.unshift(u);
                    u = u.parentNode
                }
                n = p.length;
                m = q.length;
                for (u = 0; u < n && u < m; u++)
                    if (p[u] !== q[u]) return I(p[u], q[u]);
                return u === n ? I(g, q[u], -1) : I(p[u], i, 1)
            };
            I = function(g, i, n) {
                if (g === i) return n;
                for (g = g.nextSibling; g;) {
                    if (g === i) return -1;
                    g = g.nextSibling
                }
                return 1
            }
        }
        k.getText = function(g) {
            for (var i = "", n, m = 0; g[m]; m++) {
                n = g[m];
                if (n.nodeType === 3 || n.nodeType === 4) i += n.nodeValue;
                else if (n.nodeType !== 8) i += k.getText(n.childNodes)
            }
            return i
        };
        (function() {
            var g = t.createElement("div"),
                i = "script" + (new Date).getTime(),
                n = t.documentElement;
            g.innerHTML = "<a name='" + i + "'/>";
            n.insertBefore(g, n.firstChild);
            if (t.getElementById(i)) {
                o.find.ID = function(m, p, q) {
                    if (typeof p.getElementById !== "undefined" && !q) return (p = p.getElementById(m[1])) ? p.id === m[1] || typeof p.getAttributeNode !== "undefined" && p.getAttributeNode("id").nodeValue === m[1] ? [p] : B : []
                };
                o.filter.ID = function(m, p) {
                    var q = typeof m.getAttributeNode !== "undefined" && m.getAttributeNode("id");
                    return m.nodeType === 1 && q && q.nodeValue === p
                }
            }
            n.removeChild(g);
            n = g = null
        })();
        (function() {
            var g = t.createElement("div");
            g.appendChild(t.createComment(""));
            if (g.getElementsByTagName("*").length > 0) o.find.TAG = function(i, n) {
                var m = n.getElementsByTagName(i[1]);
                if (i[1] === "*") {
                    for (var p = [], q = 0; m[q]; q++) m[q].nodeType === 1 && p.push(m[q]);
                    m = p
                }
                return m
            };
            g.innerHTML = "<a href='#'></a>";
            if (g.firstChild && typeof g.firstChild.getAttribute !== "undefined" && g.firstChild.getAttribute("href") !== "#") o.attrHandle.href = function(i) {
                return i.getAttribute("href", 2)
            };
            g = null
        })();
        t.querySelectorAll &&
            function() {
                var g = k,
                    i = t.createElement("div");
                i.innerHTML = "<p class='TEST'></p>";
                if (!(i.querySelectorAll && i.querySelectorAll(".TEST").length === 0)) {
                    k = function(m, p, q, u) {
                        p = p || t;
                        m = m.replace(/\=\s*([^'"\]]*)\s*\]/g, "='$1']");
                        if (!u && !k.isXML(p))
                            if (p.nodeType === 9) try {
                                return C(p.querySelectorAll(m), q)
                            } catch (y) {} else if (p.nodeType === 1 && p.nodeName.toLowerCase() !== "object") {
                                var F = p.getAttribute("id"),
                                    M = F || "__sizzle__";
                                F || p.setAttribute("id", M);
                                try {
                                    return C(p.querySelectorAll("#" + M + " " + m), q)
                                } catch (N) {} finally {
                                    F ||
                                        p.removeAttribute("id")
                                }
                            }
                        return g(m, p, q, u)
                    };
                    for (var n in g) k[n] = g[n];
                    i = null
                }
            }();
        (function() {
            var g = t.documentElement,
                i = g.matchesSelector || g.mozMatchesSelector || g.webkitMatchesSelector || g.msMatchesSelector,
                n = false;
            try {
                i.call(t.documentElement, "[test!='']:sizzle")
            } catch (m) {
                n = true
            }
            if (i) k.matchesSelector = function(p, q) {
                q = q.replace(/\=\s*([^'"\]]*)\s*\]/g, "='$1']");
                if (!k.isXML(p)) try {
                    if (n || !o.match.PSEUDO.test(q) && !/!=/.test(q)) return i.call(p, q)
                } catch (u) {}
                return k(q, null, null, [p]).length > 0
            }
        })();
        (function() {
            var g =
                t.createElement("div");
            g.innerHTML = "<div class='test e'></div><div class='test'></div>";
            if (!(!g.getElementsByClassName || g.getElementsByClassName("e").length === 0)) {
                g.lastChild.className = "e";
                if (g.getElementsByClassName("e").length !== 1) {
                    o.order.splice(1, 0, "CLASS");
                    o.find.CLASS = function(i, n, m) {
                        if (typeof n.getElementsByClassName !== "undefined" && !m) return n.getElementsByClassName(i[1])
                    };
                    g = null
                }
            }
        })();
        k.contains = t.documentElement.contains ? function(g, i) {
                return g !== i && (g.contains ? g.contains(i) : true)
            } : t.documentElement.compareDocumentPosition ?
            function(g, i) {
                return !!(g.compareDocumentPosition(i) & 16)
            } : function() {
                return false
            };
        k.isXML = function(g) {
            return (g = (g ? g.ownerDocument || g : 0).documentElement) ? g.nodeName !== "HTML" : false
        };
        var L = function(g, i) {
            for (var n, m = [], p = "", q = i.nodeType ? [i] : i; n = o.match.PSEUDO.exec(g);) {
                p += n[0];
                g = g.replace(o.match.PSEUDO, "")
            }
            g = o.relative[g] ? g + "*" : g;
            n = 0;
            for (var u = q.length; n < u; n++) k(g, q[n], m);
            return k.filter(p, m)
        };
        c.find = k;
        c.expr = k.selectors;
        c.expr[":"] = c.expr.filters;
        c.unique = k.uniqueSort;
        c.text = k.getText;
        c.isXMLDoc = k.isXML;
        c.contains = k.contains
    })();
    var Za = /Until$/,
        $a = /^(?:parents|prevUntil|prevAll)/,
        ab = /,/,
        Na = /^.[^:#\[\.,]*$/,
        bb = Array.prototype.slice,
        cb = c.expr.match.POS;
    c.fn.extend({
        find: function(a) {
            for (var b = this.pushStack("", "find", a), d = 0, e = 0, f = this.length; e < f; e++) {
                d = b.length;
                c.find(a, this[e], b);
                if (e > 0)
                    for (var h = d; h < b.length; h++)
                        for (var l = 0; l < d; l++)
                            if (b[l] === b[h]) {
                                b.splice(h--, 1);
                                break
                            }
            }
            return b
        },
        has: function(a) {
            var b = c(a);
            return this.filter(function() {
                for (var d = 0, e = b.length; d < e; d++)
                    if (c.contains(this, b[d])) return true
            })
        },
        not: function(a) {
            return this.pushStack(ma(this, a, false), "not", a)
        },
        filter: function(a) {
            return this.pushStack(ma(this, a, true), "filter", a)
        },
        is: function(a) {
            return !!a && c.filter(a, this).length > 0
        },
        closest: function(a, b) {
            var d = [],
                e, f, h = this[0];
            if (c.isArray(a)) {
                var l, k = {},
                    o = 1;
                if (h && a.length) {
                    e = 0;
                    for (f = a.length; e < f; e++) {
                        l = a[e];
                        k[l] || (k[l] = c.expr.match.POS.test(l) ? c(l, b || this.context) : l)
                    }
                    for (; h && h.ownerDocument && h !== b;) {
                        for (l in k) {
                            e = k[l];
                            if (e.jquery ? e.index(h) > -1 : c(h).is(e)) d.push({
                                selector: l,
                                elem: h,
                                level: o
                            })
                        }
                        h =
                            h.parentNode;
                        o++
                    }
                }
                return d
            }
            l = cb.test(a) ? c(a, b || this.context) : null;
            e = 0;
            for (f = this.length; e < f; e++)
                for (h = this[e]; h;)
                    if (l ? l.index(h) > -1 : c.find.matchesSelector(h, a)) {
                        d.push(h);
                        break
                    } else {
                        h = h.parentNode;
                        if (!h || !h.ownerDocument || h === b) break
                    }
            d = d.length > 1 ? c.unique(d) : d;
            return this.pushStack(d, "closest", a)
        },
        index: function(a) {
            if (!a || typeof a === "string") return c.inArray(this[0], a ? c(a) : this.parent().children());
            return c.inArray(a.jquery ? a[0] : a, this)
        },
        add: function(a, b) {
            var d = typeof a === "string" ? c(a, b || this.context) :
                c.makeArray(a),
                e = c.merge(this.get(), d);
            return this.pushStack(!d[0] || !d[0].parentNode || d[0].parentNode.nodeType === 11 || !e[0] || !e[0].parentNode || e[0].parentNode.nodeType === 11 ? e : c.unique(e))
        },
        andSelf: function() {
            return this.add(this.prevObject)
        }
    });
    c.each({
        parent: function(a) {
            return (a = a.parentNode) && a.nodeType !== 11 ? a : null
        },
        parents: function(a) {
            return c.dir(a, "parentNode")
        },
        parentsUntil: function(a, b, d) {
            return c.dir(a, "parentNode", d)
        },
        next: function(a) {
            return c.nth(a, 2, "nextSibling")
        },
        prev: function(a) {
            return c.nth(a,
                2, "previousSibling")
        },
        nextAll: function(a) {
            return c.dir(a, "nextSibling")
        },
        prevAll: function(a) {
            return c.dir(a, "previousSibling")
        },
        nextUntil: function(a, b, d) {
            return c.dir(a, "nextSibling", d)
        },
        prevUntil: function(a, b, d) {
            return c.dir(a, "previousSibling", d)
        },
        siblings: function(a) {
            return c.sibling(a.parentNode.firstChild, a)
        },
        children: function(a) {
            return c.sibling(a.firstChild)
        },
        contents: function(a) {
            return c.nodeName(a, "iframe") ? a.contentDocument || a.contentWindow.document : c.makeArray(a.childNodes)
        }
    }, function(a,
        b) {
        c.fn[a] = function(d, e) {
            var f = c.map(this, b, d);
            Za.test(a) || (e = d);
            if (e && typeof e === "string") f = c.filter(e, f);
            f = this.length > 1 ? c.unique(f) : f;
            if ((this.length > 1 || ab.test(e)) && $a.test(a)) f = f.reverse();
            return this.pushStack(f, a, bb.call(arguments).join(","))
        }
    });
    c.extend({
        filter: function(a, b, d) {
            if (d) a = ":not(" + a + ")";
            return b.length === 1 ? c.find.matchesSelector(b[0], a) ? [b[0]] : [] : c.find.matches(a, b)
        },
        dir: function(a, b, d) {
            var e = [];
            for (a = a[b]; a && a.nodeType !== 9 && (d === B || a.nodeType !== 1 || !c(a).is(d));) {
                a.nodeType === 1 &&
                    e.push(a);
                a = a[b]
            }
            return e
        },
        nth: function(a, b, d) {
            b = b || 1;
            for (var e = 0; a; a = a[d])
                if (a.nodeType === 1 && ++e === b) break;
            return a
        },
        sibling: function(a, b) {
            for (var d = []; a; a = a.nextSibling) a.nodeType === 1 && a !== b && d.push(a);
            return d
        }
    });
    var za = / jQuery\d+="(?:\d+|null)"/g,
        $ = /^\s+/,
        Aa = /<(?!area|br|col|embed|hr|img|input|link|meta|param)(([\w:]+)[^>]*)\/>/ig,
        Ba = /<([\w:]+)/,
        db = /<tbody/i,
        eb = /<|&#?\w+;/,
        Ca = /<(?:script|object|embed|option|style)/i,
        Da = /checked\s*(?:[^=]|=\s*.checked.)/i,
        fb = /\=([^="'>\s]+\/)>/g,
        P = {
            option: [1,
                "<select multiple='multiple'>", "</select>"
            ],
            legend: [1, "<fieldset>", "</fieldset>"],
            thead: [1, "<table>", "</table>"],
            tr: [2, "<table><tbody>", "</tbody></table>"],
            td: [3, "<table><tbody><tr>", "</tr></tbody></table>"],
            col: [2, "<table><tbody></tbody><colgroup>", "</colgroup></table>"],
            area: [1, "<map>", "</map>"],
            _default: [0, "", ""]
        };
    P.optgroup = P.option;
    P.tbody = P.tfoot = P.colgroup = P.caption = P.thead;
    P.th = P.td;
    if (!c.support.htmlSerialize) P._default = [1, "div<div>", "</div>"];
    c.fn.extend({
        text: function(a) {
            if (c.isFunction(a)) return this.each(function(b) {
                var d =
                    c(this);
                d.text(a.call(this, b, d.text()))
            });
            if (typeof a !== "object" && a !== B) return this.empty().append((this[0] && this[0].ownerDocument || t).createTextNode(a));
            return c.text(this)
        },
        wrapAll: function(a) {
            if (c.isFunction(a)) return this.each(function(d) {
                c(this).wrapAll(a.call(this, d))
            });
            if (this[0]) {
                var b = c(a, this[0].ownerDocument).eq(0).clone(true);
                this[0].parentNode && b.insertBefore(this[0]);
                b.map(function() {
                    for (var d = this; d.firstChild && d.firstChild.nodeType === 1;) d = d.firstChild;
                    return d
                }).append(this)
            }
            return this
        },
        wrapInner: function(a) {
            if (c.isFunction(a)) return this.each(function(b) {
                c(this).wrapInner(a.call(this, b))
            });
            return this.each(function() {
                var b = c(this),
                    d = b.contents();
                d.length ? d.wrapAll(a) : b.append(a)
            })
        },
        wrap: function(a) {
            return this.each(function() {
                c(this).wrapAll(a)
            })
        },
        unwrap: function() {
            return this.parent().each(function() {
                c.nodeName(this, "body") || c(this).replaceWith(this.childNodes)
            }).end()
        },
        append: function() {
            return this.domManip(arguments, true, function(a) {
                this.nodeType === 1 && this.appendChild(a)
            })
        },
        prepend: function() {
            return this.domManip(arguments, true, function(a) {
                this.nodeType === 1 && this.insertBefore(a, this.firstChild)
            })
        },
        before: function() {
            if (this[0] && this[0].parentNode) return this.domManip(arguments, false, function(b) {
                this.parentNode.insertBefore(b, this)
            });
            else if (arguments.length) {
                var a = c(arguments[0]);
                a.push.apply(a, this.toArray());
                return this.pushStack(a, "before", arguments)
            }
        },
        after: function() {
            if (this[0] && this[0].parentNode) return this.domManip(arguments, false, function(b) {
                this.parentNode.insertBefore(b,
                    this.nextSibling)
            });
            else if (arguments.length) {
                var a = this.pushStack(this, "after", arguments);
                a.push.apply(a, c(arguments[0]).toArray());
                return a
            }
        },
        remove: function(a, b) {
            for (var d = 0, e;
                (e = this[d]) != null; d++)
                if (!a || c.filter(a, [e]).length) {
                    if (!b && e.nodeType === 1) {
                        c.cleanData(e.getElementsByTagName("*"));
                        c.cleanData([e])
                    }
                    e.parentNode && e.parentNode.removeChild(e)
                }
            return this
        },
        empty: function() {
            for (var a = 0, b;
                (b = this[a]) != null; a++)
                for (b.nodeType === 1 && c.cleanData(b.getElementsByTagName("*")); b.firstChild;) b.removeChild(b.firstChild);
            return this
        },
        clone: function(a) {
            var b = this.map(function() {
                if (!c.support.noCloneEvent && !c.isXMLDoc(this)) {
                    var d = this.outerHTML,
                        e = this.ownerDocument;
                    if (!d) {
                        d = e.createElement("div");
                        d.appendChild(this.cloneNode(true));
                        d = d.innerHTML
                    }
                    return c.clean([d.replace(za, "").replace(fb, '="$1">').replace($, "")], e)[0]
                } else return this.cloneNode(true)
            });
            if (a === true) {
                na(this, b);
                na(this.find("*"), b.find("*"))
            }
            return b
        },
        html: function(a) {
            if (a === B) return this[0] && this[0].nodeType === 1 ? this[0].innerHTML.replace(za, "") : null;
            else if (typeof a === "string" && !Ca.test(a) && (c.support.leadingWhitespace || !$.test(a)) && !P[(Ba.exec(a) || ["", ""])[1].toLowerCase()]) {
                a = a.replace(Aa, "<$1></$2>");
                try {
                    for (var b = 0, d = this.length; b < d; b++)
                        if (this[b].nodeType === 1) {
                            c.cleanData(this[b].getElementsByTagName("*"));
                            this[b].innerHTML = a
                        }
                } catch (e) {
                    this.empty().append(a)
                }
            } else c.isFunction(a) ? this.each(function(f) {
                var h = c(this);
                h.html(a.call(this, f, h.html()))
            }) : this.empty().append(a);
            return this
        },
        replaceWith: function(a) {
            if (this[0] && this[0].parentNode) {
                if (c.isFunction(a)) return this.each(function(b) {
                    var d =
                        c(this),
                        e = d.html();
                    d.replaceWith(a.call(this, b, e))
                });
                if (typeof a !== "string") a = c(a).detach();
                return this.each(function() {
                    var b = this.nextSibling,
                        d = this.parentNode;
                    c(this).remove();
                    b ? c(b).before(a) : c(d).append(a)
                })
            } else return this.pushStack(c(c.isFunction(a) ? a() : a), "replaceWith", a)
        },
        detach: function(a) {
            return this.remove(a, true)
        },
        domManip: function(a, b, d) {
            var e, f, h, l = a[0],
                k = [];
            if (!c.support.checkClone && arguments.length === 3 && typeof l === "string" && Da.test(l)) return this.each(function() {
                c(this).domManip(a,
                    b, d, true)
            });
            if (c.isFunction(l)) return this.each(function(x) {
                var r = c(this);
                a[0] = l.call(this, x, b ? r.html() : B);
                r.domManip(a, b, d)
            });
            if (this[0]) {
                e = l && l.parentNode;
                e = c.support.parentNode && e && e.nodeType === 11 && e.childNodes.length === this.length ? {
                    fragment: e
                } : c.buildFragment(a, this, k);
                h = e.fragment;
                if (f = h.childNodes.length === 1 ? h = h.firstChild : h.firstChild) {
                    b = b && c.nodeName(f, "tr");
                    f = 0;
                    for (var o = this.length; f < o; f++) d.call(b ? c.nodeName(this[f], "table") ? this[f].getElementsByTagName("tbody")[0] || this[f].appendChild(this[f].ownerDocument.createElement("tbody")) :
                        this[f] : this[f], f > 0 || e.cacheable || this.length > 1 ? h.cloneNode(true) : h)
                }
                k.length && c.each(k, Oa)
            }
            return this
        }
    });
    c.buildFragment = function(a, b, d) {
        var e, f, h;
        b = b && b[0] ? b[0].ownerDocument || b[0] : t;
        if (a.length === 1 && typeof a[0] === "string" && a[0].length < 512 && b === t && !Ca.test(a[0]) && (c.support.checkClone || !Da.test(a[0]))) {
            f = true;
            if (h = c.fragments[a[0]])
                if (h !== 1) e = h
        }
        if (!e) {
            e = b.createDocumentFragment();
            c.clean(a, b, e, d)
        }
        if (f) c.fragments[a[0]] = h ? e : 1;
        return {
            fragment: e,
            cacheable: f
        }
    };
    c.fragments = {};
    c.each({
        appendTo: "append",
        prependTo: "prepend",
        insertBefore: "before",
        insertAfter: "after",
        replaceAll: "replaceWith"
    }, function(a, b) {
        c.fn[a] = function(d) {
            var e = [];
            d = c(d);
            var f = this.length === 1 && this[0].parentNode;
            if (f && f.nodeType === 11 && f.childNodes.length === 1 && d.length === 1) {
                d[b](this[0]);
                return this
            } else {
                f = 0;
                for (var h = d.length; f < h; f++) {
                    var l = (f > 0 ? this.clone(true) : this).get();
                    c(d[f])[b](l);
                    e = e.concat(l)
                }
                return this.pushStack(e, a, d.selector)
            }
        }
    });
    c.extend({
        clean: function(a, b, d, e) {
            b = b || t;
            if (typeof b.createElement === "undefined") b = b.ownerDocument ||
                b[0] && b[0].ownerDocument || t;
            for (var f = [], h = 0, l;
                (l = a[h]) != null; h++) {
                if (typeof l === "number") l += "";
                if (l) {
                    if (typeof l === "string" && !eb.test(l)) l = b.createTextNode(l);
                    else if (typeof l === "string") {
                        l = l.replace(Aa, "<$1></$2>");
                        var k = (Ba.exec(l) || ["", ""])[1].toLowerCase(),
                            o = P[k] || P._default,
                            x = o[0],
                            r = b.createElement("div");
                        for (r.innerHTML = o[1] + l + o[2]; x--;) r = r.lastChild;
                        if (!c.support.tbody) {
                            x = db.test(l);
                            k = k === "table" && !x ? r.firstChild && r.firstChild.childNodes : o[1] === "<table>" && !x ? r.childNodes : [];
                            for (o = k.length -
                                1; o >= 0; --o) c.nodeName(k[o], "tbody") && !k[o].childNodes.length && k[o].parentNode.removeChild(k[o])
                        }!c.support.leadingWhitespace && $.test(l) && r.insertBefore(b.createTextNode($.exec(l)[0]), r.firstChild);
                        l = r.childNodes
                    }
                    if (l.nodeType) f.push(l);
                    else f = c.merge(f, l)
                }
            }
            if (d)
                for (h = 0; f[h]; h++)
                    if (e && c.nodeName(f[h], "script") && (!f[h].type || f[h].type.toLowerCase() === "text/javascript")) e.push(f[h].parentNode ? f[h].parentNode.removeChild(f[h]) : f[h]);
                    else {
                        f[h].nodeType === 1 && f.splice.apply(f, [h + 1, 0].concat(c.makeArray(f[h].getElementsByTagName("script"))));
                        d.appendChild(f[h])
                    }
            return f
        },
        cleanData: function(a) {
            for (var b, d, e = c.cache, f = c.event.special, h = c.support.deleteExpando, l = 0, k;
                (k = a[l]) != null; l++)
                if (!(k.nodeName && c.noData[k.nodeName.toLowerCase()]))
                    if (d = k[c.expando]) {
                        if ((b = e[d]) && b.events)
                            for (var o in b.events) f[o] ? c.event.remove(k, o) : c.removeEvent(k, o, b.handle);
                        if (h) delete k[c.expando];
                        else k.removeAttribute && k.removeAttribute(c.expando);
                        delete e[d]
                    }
        }
    });
    var Ea = /alpha\([^)]*\)/i,
        gb = /opacity=([^)]*)/,
        hb = /-([a-z])/ig,
        ib = /([A-Z])/g,
        Fa = /^-?\d+(?:px)?$/i,
        jb = /^-?\d/,
        kb = {
            position: "absolute",
            visibility: "hidden",
            display: "block"
        },
        Pa = ["Left", "Right"],
        Qa = ["Top", "Bottom"],
        W, Ga, aa, lb = function(a, b) {
            return b.toUpperCase()
        };
    c.fn.css = function(a, b) {
        if (arguments.length === 2 && b === B) return this;
        return c.access(this, a, b, true, function(d, e, f) {
            return f !== B ? c.style(d, e, f) : c.css(d, e)
        })
    };
    c.extend({
        cssHooks: {
            opacity: {
                get: function(a, b) {
                    if (b) {
                        var d = W(a, "opacity", "opacity");
                        return d === "" ? "1" : d
                    } else return a.style.opacity
                }
            }
        },
        cssNumber: {
            zIndex: true,
            fontWeight: true,
            opacity: true,
            zoom: true,
            lineHeight: true
        },
        cssProps: {
            "float": c.support.cssFloat ? "cssFloat" : "styleFloat"
        },
        style: function(a, b, d, e) {
            if (!(!a || a.nodeType === 3 || a.nodeType === 8 || !a.style)) {
                var f, h = c.camelCase(b),
                    l = a.style,
                    k = c.cssHooks[h];
                b = c.cssProps[h] || h;
                if (d !== B) {
                    if (!(typeof d === "number" && isNaN(d) || d == null)) {
                        if (typeof d === "number" && !c.cssNumber[h]) d += "px";
                        if (!k || !("set" in k) || (d = k.set(a, d)) !== B) try {
                            l[b] = d
                        } catch (o) {}
                    }
                } else {
                    if (k && "get" in k && (f = k.get(a, false, e)) !== B) return f;
                    return l[b]
                }
            }
        },
        css: function(a, b, d) {
            var e, f = c.camelCase(b),
                h = c.cssHooks[f];
            b = c.cssProps[f] || f;
            if (h && "get" in h && (e = h.get(a, true, d)) !== B) return e;
            else if (W) return W(a, b, f)
        },
        swap: function(a, b, d) {
            var e = {},
                f;
            for (f in b) {
                e[f] = a.style[f];
                a.style[f] = b[f]
            }
            d.call(a);
            for (f in b) a.style[f] = e[f]
        },
        camelCase: function(a) {
            return a.replace(hb, lb)
        }
    });
    c.curCSS = c.css;
    c.each(["height", "width"], function(a, b) {
        c.cssHooks[b] = {
            get: function(d, e, f) {
                var h;
                if (e) {
                    if (d.offsetWidth !== 0) h = oa(d, b, f);
                    else c.swap(d, kb, function() {
                        h = oa(d, b, f)
                    });
                    if (h <= 0) {
                        h = W(d, b, b);
                        if (h === "0px" && aa) h = aa(d, b, b);
                        if (h != null) return h === "" || h === "auto" ? "0px" : h
                    }
                    if (h < 0 || h == null) {
                        h = d.style[b];
                        return h === "" || h === "auto" ? "0px" : h
                    }
                    return typeof h === "string" ? h : h + "px"
                }
            },
            set: function(d, e) {
                if (Fa.test(e)) {
                    e = parseFloat(e);
                    if (e >= 0) return e + "px"
                } else return e
            }
        }
    });
    if (!c.support.opacity) c.cssHooks.opacity = {
        get: function(a, b) {
            return gb.test((b && a.currentStyle ? a.currentStyle.filter : a.style.filter) || "") ? parseFloat(RegExp.$1) / 100 + "" : b ? "1" : ""
        },
        set: function(a, b) {
            var d = a.style;
            d.zoom = 1;
            var e = c.isNaN(b) ? "" : "alpha(opacity=" + b * 100 + ")",
                f =
                d.filter || "";
            d.filter = Ea.test(f) ? f.replace(Ea, e) : d.filter + " " + e
        }
    };
    if (t.defaultView && t.defaultView.getComputedStyle) Ga = function(a, b, d) {
        var e;
        d = d.replace(ib, "-$1").toLowerCase();
        if (!(b = a.ownerDocument.defaultView)) return B;
        if (b = b.getComputedStyle(a, null)) {
            e = b.getPropertyValue(d);
            if (e === "" && !c.contains(a.ownerDocument.documentElement, a)) e = c.style(a, d)
        }
        return e
    };
    if (t.documentElement.currentStyle) aa = function(a, b) {
        var d, e, f = a.currentStyle && a.currentStyle[b],
            h = a.style;
        if (!Fa.test(f) && jb.test(f)) {
            d = h.left;
            e = a.runtimeStyle.left;
            a.runtimeStyle.left = a.currentStyle.left;
            h.left = b === "fontSize" ? "1em" : f || 0;
            f = h.pixelLeft + "px";
            h.left = d;
            a.runtimeStyle.left = e
        }
        return f === "" ? "auto" : f
    };
    W = Ga || aa;
    if (c.expr && c.expr.filters) {
        c.expr.filters.hidden = function(a) {
            var b = a.offsetHeight;
            return a.offsetWidth === 0 && b === 0 || !c.support.reliableHiddenOffsets && (a.style.display || c.css(a, "display")) === "none"
        };
        c.expr.filters.visible = function(a) {
            return !c.expr.filters.hidden(a)
        }
    }
    var mb = c.now(),
        nb = /<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi,
        ob = /^(?:select|textarea)/i,
        pb = /^(?:color|date|datetime|email|hidden|month|number|password|range|search|tel|text|time|url|week)$/i,
        qb = /^(?:GET|HEAD)$/,
        Ra = /\[\]$/,
        T = /\=\?(&|$)/,
        ja = /\?/,
        rb = /([?&])_=[^&]*/,
        sb = /^(\w+:)?\/\/([^\/?#]+)/,
        tb = /%20/g,
        ub = /#.*$/,
        Ha = c.fn.load;
    c.fn.extend({
        load: function(a, b, d) {
            if (typeof a !== "string" && Ha) return Ha.apply(this, arguments);
            else if (!this.length) return this;
            var e = a.indexOf(" ");
            if (e >= 0) {
                var f = a.slice(e, a.length);
                a = a.slice(0, e)
            }
            e = "GET";
            if (b)
                if (c.isFunction(b)) {
                    d = b;
                    b = null
                } else if (typeof b ===
                "object") {
                b = c.param(b, c.ajaxSettings.traditional);
                e = "POST"
            }
            var h = this;
            c.ajax({
                url: a,
                type: e,
                dataType: "html",
                data: b,
                complete: function(l, k) {
                    if (k === "success" || k === "notmodified") h.html(f ? c("<div>").append(l.responseText.replace(nb, "")).find(f) : l.responseText);
                    d && h.each(d, [l.responseText, k, l])
                }
            });
            return this
        },
        serialize: function() {
            return c.param(this.serializeArray())
        },
        serializeArray: function() {
            return this.map(function() {
                return this.elements ? c.makeArray(this.elements) : this
            }).filter(function() {
                return this.name &&
                    !this.disabled && (this.checked || ob.test(this.nodeName) || pb.test(this.type))
            }).map(function(a, b) {
                var d = c(this).val();
                return d == null ? null : c.isArray(d) ? c.map(d, function(e) {
                    return {
                        name: b.name,
                        value: e
                    }
                }) : {
                    name: b.name,
                    value: d
                }
            }).get()
        }
    });
    c.each("ajaxStart ajaxStop ajaxComplete ajaxError ajaxSuccess ajaxSend".split(" "), function(a, b) {
        c.fn[b] = function(d) {
            return this.bind(b, d)
        }
    });
    c.extend({
        get: function(a, b, d, e) {
            if (c.isFunction(b)) {
                e = e || d;
                d = b;
                b = null
            }
            return c.ajax({
                type: "GET",
                url: a,
                data: b,
                success: d,
                dataType: e
            })
        },
        getScript: function(a, b) {
            return c.get(a, null, b, "script")
        },
        getJSON: function(a, b, d) {
            return c.get(a, b, d, "json")
        },
        post: function(a, b, d, e) {
            if (c.isFunction(b)) {
                e = e || d;
                d = b;
                b = {}
            }
            return c.ajax({
                type: "POST",
                url: a,
                data: b,
                success: d,
                dataType: e
            })
        },
        ajaxSetup: function(a) {
            c.extend(c.ajaxSettings, a)
        },
        ajaxSettings: {
            url: location.href,
            global: true,
            type: "GET",
            contentType: "application/x-www-form-urlencoded",
            processData: true,
            async: true,
            xhr: function() {
                return new E.XMLHttpRequest
            },
            accepts: {
                xml: "application/xml, text/xml",
                html: "text/html",
                script: "text/javascript, application/javascript",
                json: "application/json, text/javascript",
                text: "text/plain",
                _default: "*/*"
            }
        },
        ajax: function(a) {
            var b = c.extend(true, {}, c.ajaxSettings, a),
                d, e, f, h = b.type.toUpperCase(),
                l = qb.test(h);
            b.url = b.url.replace(ub, "");
            b.context = a && a.context != null ? a.context : b;
            if (b.data && b.processData && typeof b.data !== "string") b.data = c.param(b.data, b.traditional);
            if (b.dataType === "jsonp") {
                if (h === "GET") T.test(b.url) || (b.url += (ja.test(b.url) ? "&" : "?") + (b.jsonp || "callback") + "=?");
                else if (!b.data ||
                    !T.test(b.data)) b.data = (b.data ? b.data + "&" : "") + (b.jsonp || "callback") + "=?";
                b.dataType = "json"
            }
            if (b.dataType === "json" && (b.data && T.test(b.data) || T.test(b.url))) {
                d = b.jsonpCallback || "jsonp" + mb++;
                if (b.data) b.data = (b.data + "").replace(T, "=" + d + "$1");
                b.url = b.url.replace(T, "=" + d + "$1");
                b.dataType = "script";
                var k = E[d];
                E[d] = function(m) {
                    if (c.isFunction(k)) k(m);
                    else {
                        E[d] = B;
                        try {
                            delete E[d]
                        } catch (p) {}
                    }
                    f = m;
                    c.handleSuccess(b, w, e, f);
                    c.handleComplete(b, w, e, f);
                    r && r.removeChild(A)
                }
            }
            if (b.dataType === "script" && b.cache === null) b.cache =
                false;
            if (b.cache === false && l) {
                var o = c.now(),
                    x = b.url.replace(rb, "$1_=" + o);
                b.url = x + (x === b.url ? (ja.test(b.url) ? "&" : "?") + "_=" + o : "")
            }
            if (b.data && l) b.url += (ja.test(b.url) ? "&" : "?") + b.data;
            b.global && c.active++ === 0 && c.event.trigger("ajaxStart");
            o = (o = sb.exec(b.url)) && (o[1] && o[1].toLowerCase() !== location.protocol || o[2].toLowerCase() !== location.host);
            if (b.dataType === "script" && h === "GET" && o) {
                var r = t.getElementsByTagName("head")[0] || t.documentElement,
                    A = t.createElement("script");
                if (b.scriptCharset) A.charset = b.scriptCharset;
                A.src = b.url;
                if (!d) {
                    var C = false;
                    A.onload = A.onreadystatechange = function() {
                        if (!C && (!this.readyState || this.readyState === "loaded" || this.readyState === "complete")) {
                            C = true;
                            c.handleSuccess(b, w, e, f);
                            c.handleComplete(b, w, e, f);
                            A.onload = A.onreadystatechange = null;
                            r && A.parentNode && r.removeChild(A)
                        }
                    }
                }
                r.insertBefore(A, r.firstChild);
                return B
            }
            var J = false,
                w = b.xhr();
            if (w) {
                b.username ? w.open(h, b.url, b.async, b.username, b.password) : w.open(h, b.url, b.async);
                try {
                    if (b.data != null && !l || a && a.contentType) w.setRequestHeader("Content-Type",
                        b.contentType);
                    if (b.ifModified) {
                        c.lastModified[b.url] && w.setRequestHeader("If-Modified-Since", c.lastModified[b.url]);
                        c.etag[b.url] && w.setRequestHeader("If-None-Match", c.etag[b.url])
                    }
                    o || w.setRequestHeader("X-Requested-With", "XMLHttpRequest");
                    w.setRequestHeader("Accept", b.dataType && b.accepts[b.dataType] ? b.accepts[b.dataType] + ", */*; q=0.01" : b.accepts._default)
                } catch (I) {}
                if (b.beforeSend && b.beforeSend.call(b.context, w, b) === false) {
                    b.global && c.active-- === 1 && c.event.trigger("ajaxStop");
                    w.abort();
                    return false
                }
                b.global &&
                    c.triggerGlobal(b, "ajaxSend", [w, b]);
                var L = w.onreadystatechange = function(m) {
                    if (!w || w.readyState === 0 || m === "abort") {
                        J || c.handleComplete(b, w, e, f);
                        J = true;
                        if (w) w.onreadystatechange = c.noop
                    } else if (!J && w && (w.readyState === 4 || m === "timeout")) {
                        J = true;
                        w.onreadystatechange = c.noop;
                        e = m === "timeout" ? "timeout" : !c.httpSuccess(w) ? "error" : b.ifModified && c.httpNotModified(w, b.url) ? "notmodified" : "success";
                        var p;
                        if (e === "success") try {
                            f = c.httpData(w, b.dataType, b)
                        } catch (q) {
                            e = "parsererror";
                            p = q
                        }
                        if (e === "success" || e === "notmodified") d ||
                            c.handleSuccess(b, w, e, f);
                        else c.handleError(b, w, e, p);
                        d || c.handleComplete(b, w, e, f);
                        m === "timeout" && w.abort();
                        if (b.async) w = null
                    }
                };
                try {
                    var g = w.abort;
                    w.abort = function() {
                        w && Function.prototype.call.call(g, w);
                        L("abort")
                    }
                } catch (i) {}
                b.async && b.timeout > 0 && setTimeout(function() {
                    w && !J && L("timeout")
                }, b.timeout);
                try {
                    w.send(l || b.data == null ? null : b.data)
                } catch (n) {
                    c.handleError(b, w, null, n);
                    c.handleComplete(b, w, e, f)
                }
                b.async || L();
                return w
            }
        },
        param: function(a, b) {
            var d = [],
                e = function(h, l) {
                    l = c.isFunction(l) ? l() : l;
                    d[d.length] =
                        encodeURIComponent(h) + "=" + encodeURIComponent(l)
                };
            if (b === B) b = c.ajaxSettings.traditional;
            if (c.isArray(a) || a.jquery) c.each(a, function() {
                e(this.name, this.value)
            });
            else
                for (var f in a) da(f, a[f], b, e);
            return d.join("&").replace(tb, "+")
        }
    });
    c.extend({
        active: 0,
        lastModified: {},
        etag: {},
        handleError: function(a, b, d, e) {
            a.error && a.error.call(a.context, b, d, e);
            a.global && c.triggerGlobal(a, "ajaxError", [b, a, e])
        },
        handleSuccess: function(a, b, d, e) {
            a.success && a.success.call(a.context, e, d, b);
            a.global && c.triggerGlobal(a, "ajaxSuccess", [b, a])
        },
        handleComplete: function(a, b, d) {
            a.complete && a.complete.call(a.context, b, d);
            a.global && c.triggerGlobal(a, "ajaxComplete", [b, a]);
            a.global && c.active-- === 1 && c.event.trigger("ajaxStop")
        },
        triggerGlobal: function(a, b, d) {
            (a.context && a.context.url == null ? c(a.context) : c.event).trigger(b, d)
        },
        httpSuccess: function(a) {
            try {
                return !a.status && location.protocol === "file:" || a.status >= 200 && a.status < 300 || a.status === 304 || a.status === 1223
            } catch (b) {}
            return false
        },
        httpNotModified: function(a, b) {
            var d = a.getResponseHeader("Last-Modified"),
                e = a.getResponseHeader("Etag");
            if (d) c.lastModified[b] = d;
            if (e) c.etag[b] = e;
            return a.status === 304
        },
        httpData: function(a, b, d) {
            var e = a.getResponseHeader("content-type") || "",
                f = b === "xml" || !b && e.indexOf("xml") >= 0;
            a = f ? a.responseXML : a.responseText;
            f && a.documentElement.nodeName === "parsererror" && c.error("parsererror");
            if (d && d.dataFilter) a = d.dataFilter(a, b);
            if (typeof a === "string")
                if (b === "json" || !b && e.indexOf("json") >= 0) a = c.parseJSON(a);
                else if (b === "script" || !b && e.indexOf("javascript") >= 0) c.globalEval(a);
            return a
        }
    });
    if (E.ActiveXObject) c.ajaxSettings.xhr = function() {
        if (E.location.protocol !== "file:") try {
            return new E.XMLHttpRequest
        } catch (a) {}
        try {
            return new E.ActiveXObject("Microsoft.XMLHTTP")
        } catch (b) {}
    };
    c.support.ajax = !!c.ajaxSettings.xhr();
    var ea = {},
        vb = /^(?:toggle|show|hide)$/,
        wb = /^([+\-]=)?([\d+.\-]+)(.*)$/,
        ba, pa = [
            ["height", "marginTop", "marginBottom", "paddingTop", "paddingBottom"],
            ["width", "marginLeft", "marginRight", "paddingLeft", "paddingRight"],
            ["opacity"]
        ];
    c.fn.extend({
        show: function(a, b, d) {
            if (a || a === 0) return this.animate(S("show",
                3), a, b, d);
            else {
                d = 0;
                for (var e = this.length; d < e; d++) {
                    a = this[d];
                    b = a.style.display;
                    if (!c.data(a, "olddisplay") && b === "none") b = a.style.display = "";
                    b === "" && c.css(a, "display") === "none" && c.data(a, "olddisplay", qa(a.nodeName))
                }
                for (d = 0; d < e; d++) {
                    a = this[d];
                    b = a.style.display;
                    if (b === "" || b === "none") a.style.display = c.data(a, "olddisplay") || ""
                }
                return this
            }
        },
        hide: function(a, b, d) {
            if (a || a === 0) return this.animate(S("hide", 3), a, b, d);
            else {
                a = 0;
                for (b = this.length; a < b; a++) {
                    d = c.css(this[a], "display");
                    d !== "none" && c.data(this[a], "olddisplay",
                        d)
                }
                for (a = 0; a < b; a++) this[a].style.display = "none";
                return this
            }
        },
        _toggle: c.fn.toggle,
        toggle: function(a, b, d) {
            var e = typeof a === "boolean";
            if (c.isFunction(a) && c.isFunction(b)) this._toggle.apply(this, arguments);
            else a == null || e ? this.each(function() {
                var f = e ? a : c(this).is(":hidden");
                c(this)[f ? "show" : "hide"]()
            }) : this.animate(S("toggle", 3), a, b, d);
            return this
        },
        fadeTo: function(a, b, d, e) {
            return this.filter(":hidden").css("opacity", 0).show().end().animate({
                opacity: b
            }, a, d, e)
        },
        animate: function(a, b, d, e) {
            var f = c.speed(b,
                d, e);
            if (c.isEmptyObject(a)) return this.each(f.complete);
            return this[f.queue === false ? "each" : "queue"](function() {
                var h = c.extend({}, f),
                    l, k = this.nodeType === 1,
                    o = k && c(this).is(":hidden"),
                    x = this;
                for (l in a) {
                    var r = c.camelCase(l);
                    if (l !== r) {
                        a[r] = a[l];
                        delete a[l];
                        l = r
                    }
                    if (a[l] === "hide" && o || a[l] === "show" && !o) return h.complete.call(this);
                    if (k && (l === "height" || l === "width")) {
                        h.overflow = [this.style.overflow, this.style.overflowX, this.style.overflowY];
                        if (c.css(this, "display") === "inline" && c.css(this, "float") === "none")
                            if (c.support.inlineBlockNeedsLayout)
                                if (qa(this.nodeName) ===
                                    "inline") this.style.display = "inline-block";
                                else {
                                    this.style.display = "inline";
                                    this.style.zoom = 1
                                } else this.style.display = "inline-block"
                    }
                    if (c.isArray(a[l])) {
                        (h.specialEasing = h.specialEasing || {})[l] = a[l][1];
                        a[l] = a[l][0]
                    }
                }
                if (h.overflow != null) this.style.overflow = "hidden";
                h.curAnim = c.extend({}, a);
                c.each(a, function(A, C) {
                    var J = new c.fx(x, h, A);
                    if (vb.test(C)) J[C === "toggle" ? o ? "show" : "hide" : C](a);
                    else {
                        var w = wb.exec(C),
                            I = J.cur() || 0;
                        if (w) {
                            var L = parseFloat(w[2]),
                                g = w[3] || "px";
                            if (g !== "px") {
                                c.style(x, A, (L || 1) + g);
                                I = (L ||
                                    1) / J.cur() * I;
                                c.style(x, A, I + g)
                            }
                            if (w[1]) L = (w[1] === "-=" ? -1 : 1) * L + I;
                            J.custom(I, L, g)
                        } else J.custom(I, C, "")
                    }
                });
                return true
            })
        },
        stop: function(a, b) {
            var d = c.timers;
            a && this.queue([]);
            this.each(function() {
                for (var e = d.length - 1; e >= 0; e--)
                    if (d[e].elem === this) {
                        b && d[e](true);
                        d.splice(e, 1)
                    }
            });
            b || this.dequeue();
            return this
        }
    });
    c.each({
        slideDown: S("show", 1),
        slideUp: S("hide", 1),
        slideToggle: S("toggle", 1),
        fadeIn: {
            opacity: "show"
        },
        fadeOut: {
            opacity: "hide"
        },
        fadeToggle: {
            opacity: "toggle"
        }
    }, function(a, b) {
        c.fn[a] = function(d, e, f) {
            return this.animate(b,
                d, e, f)
        }
    });
    c.extend({
        speed: function(a, b, d) {
            var e = a && typeof a === "object" ? c.extend({}, a) : {
                complete: d || !d && b || c.isFunction(a) && a,
                duration: a,
                easing: d && b || b && !c.isFunction(b) && b
            };
            e.duration = c.fx.off ? 0 : typeof e.duration === "number" ? e.duration : e.duration in c.fx.speeds ? c.fx.speeds[e.duration] : c.fx.speeds._default;
            e.old = e.complete;
            e.complete = function() {
                e.queue !== false && c(this).dequeue();
                c.isFunction(e.old) && e.old.call(this)
            };
            return e
        },
        easing: {
            linear: function(a, b, d, e) {
                return d + e * a
            },
            swing: function(a, b, d, e) {
                return (-Math.cos(a *
                    Math.PI) / 2 + 0.5) * e + d
            }
        },
        timers: [],
        fx: function(a, b, d) {
            this.options = b;
            this.elem = a;
            this.prop = d;
            if (!b.orig) b.orig = {}
        }
    });
    c.fx.prototype = {
        update: function() {
            this.options.step && this.options.step.call(this.elem, this.now, this);
            (c.fx.step[this.prop] || c.fx.step._default)(this)
        },
        cur: function() {
            if (this.elem[this.prop] != null && (!this.elem.style || this.elem.style[this.prop] == null)) return this.elem[this.prop];
            var a = parseFloat(c.css(this.elem, this.prop));
            return a && a > -1E4 ? a : 0
        },
        custom: function(a, b, d) {
            function e(l) {
                return f.step(l)
            }
            var f = this,
                h = c.fx;
            this.startTime = c.now();
            this.start = a;
            this.end = b;
            this.unit = d || this.unit || "px";
            this.now = this.start;
            this.pos = this.state = 0;
            e.elem = this.elem;
            if (e() && c.timers.push(e) && !ba) ba = setInterval(h.tick, h.interval)
        },
        show: function() {
            this.options.orig[this.prop] = c.style(this.elem, this.prop);
            this.options.show = true;
            this.custom(this.prop === "width" || this.prop === "height" ? 1 : 0, this.cur());
            c(this.elem).show()
        },
        hide: function() {
            this.options.orig[this.prop] = c.style(this.elem, this.prop);
            this.options.hide = true;
            this.custom(this.cur(), 0)
        },
        step: function(a) {
            var b = c.now(),
                d = true;
            if (a || b >= this.options.duration + this.startTime) {
                this.now = this.end;
                this.pos = this.state = 1;
                this.update();
                this.options.curAnim[this.prop] = true;
                for (var e in this.options.curAnim)
                    if (this.options.curAnim[e] !== true) d = false;
                if (d) {
                    if (this.options.overflow != null && !c.support.shrinkWrapBlocks) {
                        var f = this.elem,
                            h = this.options;
                        c.each(["", "X", "Y"], function(k, o) {
                            f.style["overflow" + o] = h.overflow[k]
                        })
                    }
                    this.options.hide && c(this.elem).hide();
                    if (this.options.hide ||
                        this.options.show)
                        for (var l in this.options.curAnim) c.style(this.elem, l, this.options.orig[l]);
                    this.options.complete.call(this.elem)
                }
                return false
            } else {
                a = b - this.startTime;
                this.state = a / this.options.duration;
                b = this.options.easing || (c.easing.swing ? "swing" : "linear");
                this.pos = c.easing[this.options.specialEasing && this.options.specialEasing[this.prop] || b](this.state, a, 0, 1, this.options.duration);
                this.now = this.start + (this.end - this.start) * this.pos;
                this.update()
            }
            return true
        }
    };
    c.extend(c.fx, {
        tick: function() {
            for (var a =
                    c.timers, b = 0; b < a.length; b++) a[b]() || a.splice(b--, 1);
            a.length || c.fx.stop()
        },
        interval: 13,
        stop: function() {
            clearInterval(ba);
            ba = null
        },
        speeds: {
            slow: 600,
            fast: 200,
            _default: 400
        },
        step: {
            opacity: function(a) {
                c.style(a.elem, "opacity", a.now)
            },
            _default: function(a) {
                if (a.elem.style && a.elem.style[a.prop] != null) a.elem.style[a.prop] = (a.prop === "width" || a.prop === "height" ? Math.max(0, a.now) : a.now) + a.unit;
                else a.elem[a.prop] = a.now
            }
        }
    });
    if (c.expr && c.expr.filters) c.expr.filters.animated = function(a) {
        return c.grep(c.timers, function(b) {
            return a ===
                b.elem
        }).length
    };
    var xb = /^t(?:able|d|h)$/i,
        Ia = /^(?:body|html)$/i;
    c.fn.offset = "getBoundingClientRect" in t.documentElement ? function(a) {
        var b = this[0],
            d;
        if (a) return this.each(function(l) {
            c.offset.setOffset(this, a, l)
        });
        if (!b || !b.ownerDocument) return null;
        if (b === b.ownerDocument.body) return c.offset.bodyOffset(b);
        try {
            d = b.getBoundingClientRect()
        } catch (e) {}
        var f = b.ownerDocument,
            h = f.documentElement;
        if (!d || !c.contains(h, b)) return d || {
            top: 0,
            left: 0
        };
        b = f.body;
        f = fa(f);
        return {
            top: d.top + (f.pageYOffset || c.support.boxModel &&
                h.scrollTop || b.scrollTop) - (h.clientTop || b.clientTop || 0),
            left: d.left + (f.pageXOffset || c.support.boxModel && h.scrollLeft || b.scrollLeft) - (h.clientLeft || b.clientLeft || 0)
        }
    } : function(a) {
        var b = this[0];
        if (a) return this.each(function(x) {
            c.offset.setOffset(this, a, x)
        });
        if (!b || !b.ownerDocument) return null;
        if (b === b.ownerDocument.body) return c.offset.bodyOffset(b);
        c.offset.initialize();
        var d, e = b.offsetParent,
            f = b.ownerDocument,
            h = f.documentElement,
            l = f.body;
        d = (f = f.defaultView) ? f.getComputedStyle(b, null) : b.currentStyle;
        for (var k = b.offsetTop, o = b.offsetLeft;
            (b = b.parentNode) && b !== l && b !== h;) {
            if (c.offset.supportsFixedPosition && d.position === "fixed") break;
            d = f ? f.getComputedStyle(b, null) : b.currentStyle;
            k -= b.scrollTop;
            o -= b.scrollLeft;
            if (b === e) {
                k += b.offsetTop;
                o += b.offsetLeft;
                if (c.offset.doesNotAddBorder && !(c.offset.doesAddBorderForTableAndCells && xb.test(b.nodeName))) {
                    k += parseFloat(d.borderTopWidth) || 0;
                    o += parseFloat(d.borderLeftWidth) || 0
                }
                e = b.offsetParent
            }
            if (c.offset.subtractsBorderForOverflowNotVisible && d.overflow !== "visible") {
                k +=
                    parseFloat(d.borderTopWidth) || 0;
                o += parseFloat(d.borderLeftWidth) || 0
            }
            d = d
        }
        if (d.position === "relative" || d.position === "static") {
            k += l.offsetTop;
            o += l.offsetLeft
        }
        if (c.offset.supportsFixedPosition && d.position === "fixed") {
            k += Math.max(h.scrollTop, l.scrollTop);
            o += Math.max(h.scrollLeft, l.scrollLeft)
        }
        return {
            top: k,
            left: o
        }
    };
    c.offset = {
        initialize: function() {
            var a = t.body,
                b = t.createElement("div"),
                d, e, f, h = parseFloat(c.css(a, "marginTop")) || 0;
            c.extend(b.style, {
                position: "absolute",
                top: 0,
                left: 0,
                margin: 0,
                border: 0,
                width: "1px",
                height: "1px",
                visibility: "hidden"
            });
            b.innerHTML = "<div style='position:absolute;top:0;left:0;margin:0;border:5px solid #000;padding:0;width:1px;height:1px;'><div></div></div><table style='position:absolute;top:0;left:0;margin:0;border:5px solid #000;padding:0;width:1px;height:1px;' cellpadding='0' cellspacing='0'><tr><td></td></tr></table>";
            a.insertBefore(b, a.firstChild);
            d = b.firstChild;
            e = d.firstChild;
            f = d.nextSibling.firstChild.firstChild;
            this.doesNotAddBorder = e.offsetTop !== 5;
            this.doesAddBorderForTableAndCells =
                f.offsetTop === 5;
            e.style.position = "fixed";
            e.style.top = "20px";
            this.supportsFixedPosition = e.offsetTop === 20 || e.offsetTop === 15;
            e.style.position = e.style.top = "";
            d.style.overflow = "hidden";
            d.style.position = "relative";
            this.subtractsBorderForOverflowNotVisible = e.offsetTop === -5;
            this.doesNotIncludeMarginInBodyOffset = a.offsetTop !== h;
            a.removeChild(b);
            c.offset.initialize = c.noop
        },
        bodyOffset: function(a) {
            var b = a.offsetTop,
                d = a.offsetLeft;
            c.offset.initialize();
            if (c.offset.doesNotIncludeMarginInBodyOffset) {
                b += parseFloat(c.css(a,
                    "marginTop")) || 0;
                d += parseFloat(c.css(a, "marginLeft")) || 0
            }
            return {
                top: b,
                left: d
            }
        },
        setOffset: function(a, b, d) {
            var e = c.css(a, "position");
            if (e === "static") a.style.position = "relative";
            var f = c(a),
                h = f.offset(),
                l = c.css(a, "top"),
                k = c.css(a, "left"),
                o = e === "absolute" && c.inArray("auto", [l, k]) > -1;
            e = {};
            var x = {};
            if (o) x = f.position();
            l = o ? x.top : parseInt(l, 10) || 0;
            k = o ? x.left : parseInt(k, 10) || 0;
            if (c.isFunction(b)) b = b.call(a, d, h);
            if (b.top != null) e.top = b.top - h.top + l;
            if (b.left != null) e.left = b.left - h.left + k;
            "using" in b ? b.using.call(a,
                e) : f.css(e)
        }
    };
    c.fn.extend({
        position: function() {
            if (!this[0]) return null;
            var a = this[0],
                b = this.offsetParent(),
                d = this.offset(),
                e = Ia.test(b[0].nodeName) ? {
                    top: 0,
                    left: 0
                } : b.offset();
            d.top -= parseFloat(c.css(a, "marginTop")) || 0;
            d.left -= parseFloat(c.css(a, "marginLeft")) || 0;
            e.top += parseFloat(c.css(b[0], "borderTopWidth")) || 0;
            e.left += parseFloat(c.css(b[0], "borderLeftWidth")) || 0;
            return {
                top: d.top - e.top,
                left: d.left - e.left
            }
        },
        offsetParent: function() {
            return this.map(function() {
                for (var a = this.offsetParent || t.body; a && !Ia.test(a.nodeName) &&
                    c.css(a, "position") === "static";) a = a.offsetParent;
                return a
            })
        }
    });
    c.each(["Left", "Top"], function(a, b) {
        var d = "scroll" + b;
        c.fn[d] = function(e) {
            var f = this[0],
                h;
            if (!f) return null;
            if (e !== B) return this.each(function() {
                if (h = fa(this)) h.scrollTo(!a ? e : c(h).scrollLeft(), a ? e : c(h).scrollTop());
                else this[d] = e
            });
            else return (h = fa(f)) ? "pageXOffset" in h ? h[a ? "pageYOffset" : "pageXOffset"] : c.support.boxModel && h.document.documentElement[d] || h.document.body[d] : f[d]
        }
    });
    c.each(["Height", "Width"], function(a, b) {
        var d = b.toLowerCase();
        c.fn["inner" + b] = function() {
            return this[0] ? parseFloat(c.css(this[0], d, "padding")) : null
        };
        c.fn["outer" + b] = function(e) {
            return this[0] ? parseFloat(c.css(this[0], d, e ? "margin" : "border")) : null
        };
        c.fn[d] = function(e) {
            var f = this[0];
            if (!f) return e == null ? null : this;
            if (c.isFunction(e)) return this.each(function(l) {
                var k = c(this);
                k[d](e.call(this, l, k[d]()))
            });
            if (c.isWindow(f)) return f.document.compatMode === "CSS1Compat" && f.document.documentElement["client" + b] || f.document.body["client" + b];
            else if (f.nodeType === 9) return Math.max(f.documentElement["client" +
                b], f.body["scroll" + b], f.documentElement["scroll" + b], f.body["offset" + b], f.documentElement["offset" + b]);
            else if (e === B) {
                f = c.css(f, d);
                var h = parseFloat(f);
                return c.isNaN(h) ? f : h
            } else return this.css(d, typeof e === "string" ? e : e + "px")
        }
    })
})(window);

/*
 * php의 sprintf와 사용방법은 비슷하나 문자열 포멧의 type specifier는 %s만 사용
 * 참조 : http://wiki.simplexi.com/pages/viewpage.action?pageId=125338699
 */
function sprintf() {
    var pattern = /%([0-9]+)\$s/g;

    var text = arguments[0];
    var extract = text.match(pattern, text);

    if (extract == null || extract.length < 0) {
        var split = text.split('%s');
        var count = split.length;
        var tmp = new Array();

        for (var i = 0; i < count; i++) {
            if (typeof arguments[i + 1] != 'undefined') {
                tmp.push(split[i] + arguments[i + 1]);
            } else {
                tmp.push(split[i]);
            }
        }

        return tmp.join('');
    } else {
        var count = extract.length;

        for (var i = 0; i < count; i++) {
            var index = extract[i].replace(pattern, '$1');
            if (typeof arguments[index] != 'undefined') {
                text = text.replace('%' + index + '$s', arguments[index]);
            }
        }

        return text;
    }
}
$(document).ready(function() {
    $('#btn_search').click(function() {
        $('#searchBarForm').submit();
    });

    $('input[name="keyword"]').keypress(function(e) {
        if (e.keyCode == 13 && $.trim($(this).val()) === '') {
            alert(__('검색어를 입력해주세요'));
            return false;
        }
    });
    $('#searchBarForm').submit(function(e) {

        if ($.trim($(this).find('#keyword').val()) == '') {
            alert(__('검색어를 입력해주세요'));
            return;
        }

        if (mobileWeb === true) {
            $Recentword.saveRecentWord($(this).find('#keyword').val());
        }
    });

    $('.btn_order').click(function() {
        $type = $(this).attr('rel');
        $('#order_by').val($type);

        $('#searchForm').submit();
    });

    $('.btn_view').click(function() {
        $view = $(this).attr('rel');

        if ($view != 'list') {
            $sAction = '/product/search_' + $view + '.html';
        } else {
            $sAction = '/product/search.html';
        }

        $('#view_type').val($view);
        $('#searchForm').attr('action', $sAction);
        $('#searchForm').submit();
    });

    // 검색어 관련 작업
    var aSearchKey = ReWriteSearchKey();
    if (aSearchKey !== false) {
        if (aSearchKey) { //ECHOSTING-44000
            var oSearchHeader = $(".xans-layout-searchheader").parent("form");
            oSearchHeader.find("#banner_action").val(aSearchKey.banner_action);
            oSearchHeader.find("#keyword").val(aSearchKey.msb_contents);
        }
    };

    if (mobileWeb === true) {
        $('#search_cancel').bind('click', function() {
            $('html, body').css({
                'overflowY': 'auto',
                height: 'auto',
                width: '100%'
            });
            $('.dimmed').toggle();
            $('.xans-layout-searchheader').hide();
        });

        $('.xans-layout-searchheader').find('button.btnDelete').bind('click', function() {
            $('#keyword').attr('value', '').focus();
            $('#banner_action').attr('value', ''); //ECQAINT-8961 Delete버튼 클릭시 value 초기화
        });

        // 검색페이지에서 삭제
        $('.xans-search-form').find('button.btnDelete').bind('click', function() {
            $('#searchForm').find('input#keyword').attr('value', '').focus();
        });

        $('.header .search button').bind('click', function() {
            if ($('#search_box').size() > 0) {
                $('html, body').css({
                    'overflowY': 'hidden',
                    height: '100%',
                    width: '100%'
                });
                $('.dimmed').toggle();
                $('#header .xans-layout-searchheader').toggle();
            } else {
                $('#header .xans-layout-searchheader').toggle();
            }
        });
    }
});

function ReWriteSearchKey() {
    if (typeof(sSearchBannerUseFlag) == "undefined") return false;
    if (sSearchBannerUseFlag == 'F') return false;
    if (typeof(aSearchBannerData) == "undefined") return false;
    if (aSearchBannerData.length === 0) return false;
    if (sSearchBannerType != 'F') return aSearchBannerData[Math.floor(Math.random() * aSearchBannerData.length)];

    var aResultData = null;
    var sSearchKey = $.cookie('iSearchKey');
    var iSearchKey = 0;

    //    if ( sSearchKey !== null ) {//ECHOSTING-44000
    if (sSearchKey != undefined) {
        iSearchKey = parseInt(sSearchKey) + parseInt(1);
        if (iSearchKey >= aSearchBannerData.length) {
            iSearchKey = 0;
        }
    }
    $.cookie('iSearchKey', iSearchKey, {
        path: '/'
    });

    return aSearchBannerData[iSearchKey];
}


var popProduct = {

    selProduct: function(product_no, iPrdImg, sPrdName, sPrdPrice, sCategoryName, iCategoryNo) {
        if (this.isGiftProduct(product_no) === false) {
            alert(sErrorMessage);
            return false;
        }

        try {
            opener.document.getElementById('aPrdLink').href = this.getUrl(product_no);
            opener.document.getElementById('aPrdNameLink').href = this.getUrl(product_no);
            opener.document.getElementById('product_no').value = product_no;
            opener.document.getElementById('iPrdImg').src = iPrdImg;
            opener.document.getElementById('sPrdName').innerHTML = sPrdName.replace(/[\＂]/g, '"');
            opener.document.getElementById('sPrdPrice').innerHTML = sPrdPrice;
            opener.document.getElementById('sPrdCommonImg').innerHTML = '';

            opener.$('#iPrdView').removeClass('displaynone').css('display', 'inline');
        } catch (e) {}

        // ECHOSTING-61590
        var iSelectedOptionIndex = $('#subject', opener.document).attr('selectedIndex');
        $('#subject option', opener.document).remove();
        $('input[name^="fix_title_form_"]', opener.document).each(function(iIndex) {
            var sSubject = popProduct.getConvertString($(this).val(), sPrdName, sCategoryName);
            var sOptionTag = '<option value="' + sSubject + '">' + sSubject + '</option>';
            $('#subject', opener.document).append(sOptionTag);
        });
        $('#subject', opener.document).attr('selectedIndex', iSelectedOptionIndex);
        $('#cate_no', opener.document).val(iCategoryNo);

        /**
         * thunmail이미지에 링크가 걸렸을경우 링크 처리
         */
        var eAnchor = opener.document.getElementById('iPrdImg').parentNode;
        if ('A' === eAnchor.tagName.toUpperCase()) {
            eAnchor.href = this.getUrl(product_no);
        }
        window.close();
    },

    getUrl: function(product_no) {
        var aPrdLink = opener.document.getElementById('aPrdLink').href;
        var iUrlIndex = aPrdLink.indexOf('product_no=');

        var aPrdLinkSplit = aPrdLink.split('product_no=');

        var aPrdParamSplit = aPrdLinkSplit[1].split('&');

        aPrdParamSplit.shift();

        return aPrdLink.substr(0, iUrlIndex) + 'product_no=' + product_no + (aPrdParamSplit.length > 0 ? '&' + aPrdParamSplit.join('&') : '');
    },
    // ECHOSTING-61590
    getConvertString: function(sSubject, sPrdName, sCategoryName) {
        sSubject = sSubject.replace('PRODUCT_NAME', sPrdName);
        return sSubject.replace('CATEGORY_NAME', sCategoryName);
    },
    isGiftProduct: function(iProductNum) {
        if (typeof aGiftReview === 'object') {
            if (aGiftReview[iProductNum] === 'F') {
                return false;
            }
        }
        return true;
    },
    END: function() {}
};

/**
 * 상품 검색 배너
 */
var SEARCH_BANNER = {
    /**
     * 상품 검색 Submit
     */
    submitSearchBanner: function(obj) {
        var form = $(obj).parents('form');

        if (form.find('#banner_action').val() != '') {
            // ECHOSTING-98878 상품검색키워드로 검색시에 폼전송이 되어 연결페이지로 이동이 안되고 검색페이지로 이동되는 오류 수정
            form.submit(function() {
                return false;
            });

            // 배너 연결 페이지 이동
            location.replace(form.find('#banner_action').val());
        } else {
            if ($.trim(form.find('#keyword').val()) == '') {
                alert(__('검색어를 입력해주세요'));
                form.find('#keyword').focus();
                return;
            }

            form.submit();
        }
    },

    /**
     * 검색어 입력폼 클릭
     */
    clickSearchForm: function(obj) {
        //ECHOSTING-105207 상품검색 키워드설정시 모바일에서 검색 결과 없음
        var form = $(obj).parents('form');

        if (mobileWeb == true && form.find('#banner_action').val() != '') {
            // ECHOSTING-98878 상품검색키워드로 검색시에 폼전송이 되어 연결페이지로 이동이 안되고 검색페이지로 이동되는 오류 수정
            form.submit(function() {
                return false;
            });

            // 배너 연결 페이지 이동
            location.replace(form.find('#banner_action').val());
        }

        form.find('#banner_action').val('');
        if (mobileWeb !== true) {
            $(obj).val('');
        }
    }
};

/**
 * 최근검색어
 */
var $Recentword = {
    // recent length
    recentNum: 10,

    // cookie expires
    expires: 10,

    // duplication key
    duplicateKey: 0,

    // recent string
    string: '',

    // recent string
    prefix: 'RECENT_WORD_',

    // sModuel
    sModule: 'xans-search-recentkeyword',

    // recent
    $recent: null,

    // recent list
    $recentList: null,

    // list size
    size: 0,

    // remove
    $remove: null,
    /**
     * save recent word
     */

    init: function() {
        this.setObj();
        this.action();
        this.dimmed();
    },

    dimmed: function() {
        try {
            $('.xans-layout-searchheader').after('<div class="dimmed"></div>');
        } catch (e) {}
    },

    setObj: function() {
        this.$recent = $('.' + this.sModule);

        this.$recentList = this.$recent.find('ul').find('li');

        this.size = this.$recentList.size();

        this.$remove = this.$recent.find('p');
    },

    action: function() {
        var $hot = $('.xans-search-hotkeyword'),
            $title = $('#keyword_title');

        if ($('.xans-layout-searchheader').find('ul.searchTab').hasClass('displaynone') === false) {
            this.$recent.hide();
            $title.hide();
        } else {
            $hot.hide();
        }

        $('.xans-layout-searchheader').find('ul.searchTab').find('li').click(function() {
            var index = $(this).index();
            $(this).addClass('selected').siblings().removeClass('selected');
            if (index == 0) {
                $Recentword.$recent.hide();
                $hot.show();
            } else {
                $Recentword.$recent.show();
                $hot.hide();
            }
        });
    },

    saveRecentWord: function(s) {
        this.string = s;

        // 중복처리        
        if (this.duplication() === false) {
            this.cookieOrder();
        }

        // 저장
        this.save();
    },

    save: function() {
        var bFull = true;
        for (var i = 1; i <= this.recentNum; i++) {
            if ($.cookie(this.prefix + i) == null) {
                bFull = false;
                this.add(i);
                break;
            }
        }

        if (bFull == true) {
            this.removeFrist();
            this.add(this.recentNum);
        }
    },

    duplication: function() {
        for (var k = 1; k <= this.recentNum; k++) {
            if ($.cookie(this.prefix + k) == this.string) {
                this.duplicateKey = k;
                $.cookie(this.prefix + k, null, {
                    path: '/'
                });
                return false;
            }
        }
    },

    cookieOrder: function() {
        var s = this.duplicateKey + 1;
        for (var i = this.duplicateKey; i <= this.recentNum; i++) {
            if ($.cookie(this.prefix + s) != null) {
                this.add(i, $.cookie(this.prefix + s));
                this.removeCookie(s);
                s++;
            }
        }
    },

    removeFrist: function() {
        for (var i = 2, k = 1; i <= this.recentNum; i++, k++) {
            $.cookie(this.prefix + k, $.cookie(this.prefix + i), {
                expires: this.expires,
                path: '/'
            });
        }
    },

    add: function(key, duplicateString) {
        $.cookie(this.prefix + key, duplicateString || this.string, {
            expires: this.expires,
            path: '/'
        });
    },

    removeCookie: function(key) {
        $.cookie(this.prefix + key, null, {
            path: '/'
        });
    },

    removeAll: function() {
        for (var i = 1; i <= this.recentNum; i++) {
            $.cookie(this.prefix + i, null, {
                path: '/'
            });
        }
        this.setNoList();
    },

    removeOne: function(key) {
        try {
            this.removeCookie(key);
            this.$recentList.each(function() {
                if ($(this).data('index') == key) {
                    $(this).remove();
                }
            });
            this.size--;
            if (this.size == 0) {
                this.setNoList();
            }
        } catch (e) {

        }
    },

    setNoList: function() {
        try {
            this.$recentList.each(function() {
                $(this).remove();
            });
            this.$remove.removeClass('displaynone');
        } catch (e) {

        }
    }
};
/*! Copyright (c) 2013 Brandon Aaron (http://brandonaaron.net)
 * Licensed under the MIT License (LICENSE.txt).
 *
 * Version 3.0.0
 */

(function(factory) {
    if (typeof define === 'function' && define.amd) {
        // AMD. Register as an anonymous module.
        define(['jquery'], factory);
    } else {
        // Browser globals
        factory(jQuery);
    }
}(function($) {
    $.fn.bgiframe = function(s) {
        s = $.extend({
            top: 'auto', // auto == borderTopWidth
            left: 'auto', // auto == borderLeftWidth
            width: 'auto', // auto == offsetWidth
            height: 'auto', // auto == offsetHeight
            opacity: true,
            src: 'javascript:false;',
            conditional: /MSIE 6.0/.test(navigator.userAgent) // expresion or function. return false to prevent iframe insertion
        }, s);

        // wrap conditional in a function if it isn't already
        if (!$.isFunction(s.conditional)) {
            var condition = s.conditional;
            s.conditional = function() {
                return condition;
            };
        }

        var $iframe = $('<iframe class="bgiframe"frameborder="0"tabindex="-1"src="' + s.src + '"' +
            'style="display:block;position:absolute;z-index:-1;"/>');

        return this.each(function() {
            var $this = $(this);
            if (s.conditional(this) === false) {
                return;
            }
            var existing = $this.children('iframe.bgiframe');
            var $el = existing.length === 0 ? $iframe.clone() : existing;
            $el.css({
                'top': s.top == 'auto' ?
                    ((parseInt($this.css('borderTopWidth'), 10) || 0) * -1) + 'px' : prop(s.top),
                'left': s.left == 'auto' ?
                    ((parseInt($this.css('borderLeftWidth'), 10) || 0) * -1) + 'px' : prop(s.left),
                'width': s.width == 'auto' ? (this.offsetWidth + 'px') : prop(s.width),
                'height': s.height == 'auto' ? (this.offsetHeight + 'px') : prop(s.height),
                'opacity': s.opacity === true ? 0 : undefined
            });

            if (existing.length === 0) {
                $this.prepend($el);
            }
        });
    };

    // old alias
    $.fn.bgIframe = $.fn.bgiframe;

    function prop(n) {
        return n && n.constructor === Number ? n + 'px' : n;
    }

}));
/**
 * Cookie plugin
 *
 * Copyright (c) 2006 Klaus Hartl (stilbuero.de)
 * Dual licensed under the MIT and GPL licenses:
 * http://www.opensource.org/licenses/mit-license.php
 * http://www.gnu.org/licenses/gpl.html
 *
 */

/**
 * Create a cookie with the given name and value and other optional parameters.
 *
 * @example $.cookie('the_cookie', 'the_value');
 * @desc Set the value of a cookie.
 * @example $.cookie('the_cookie', 'the_value', { expires: 7, path: '/', domain: 'jquery.com', secure: true });
 * @desc Create a cookie with all available options.
 * @example $.cookie('the_cookie', 'the_value');
 * @desc Create a session cookie.
 * @example $.cookie('the_cookie', null);
 * @desc Delete a cookie by passing null as value. Keep in mind that you have to use the same path and domain
 *       used when the cookie was set.
 *
 * @param String name The name of the cookie.
 * @param String value The value of the cookie.
 * @param Object options An object literal containing key/value pairs to provide optional cookie attributes.
 * @option Number|Date expires Either an integer specifying the expiration date from now on in days or a Date object.
 *                             If a negative value is specified (e.g. a date in the past), the cookie will be deleted.
 *                             If set to null or omitted, the cookie will be a session cookie and will not be retained
 *                             when the the browser exits.
 * @option String path The value of the path atribute of the cookie (default: path of page that created the cookie).
 * @option String domain The value of the domain attribute of the cookie (default: domain of page that created the cookie).
 * @option Boolean secure If true, the secure attribute of the cookie will be set and the cookie transmission will
 *                        require a secure protocol (like HTTPS).
 * @type undefined
 *
 * @name $.cookie
 * @cat Plugins/Cookie
 * @author Klaus Hartl/klaus.hartl@stilbuero.de
 */

/**
 * Get the value of a cookie with the given name.
 *
 * @example $.cookie('the_cookie');
 * @desc Get the value of a cookie.
 *
 * @param String name The name of the cookie.
 * @return The value of the cookie.
 * @type String
 *
 * @name $.cookie
 * @cat Plugins/Cookie
 * @author Klaus Hartl/klaus.hartl@stilbuero.de
 */
jQuery.cookie = function(name, value, options) {
    if (typeof value != 'undefined') { // name and value given, set cookie
        options = options || {};
        if (value === null) {
            value = '';
            options = $.extend({}, options); // clone object since it's unexpected behavior if the expired property were changed
            options.expires = -1;
        }
        var expires = '';
        if (options.expires && (typeof options.expires == 'number' || options.expires.toUTCString)) {
            var date;
            if (typeof options.expires == 'number') {
                date = new Date();
                date.setTime(date.getTime() + (options.expires * 24 * 60 * 60 * 1000));
            } else {
                date = options.expires;
            }
            expires = '; expires=' + date.toUTCString(); // use expires attribute, max-age is not supported by IE
        }
        // NOTE Needed to parenthesize options.path and options.domain
        // in the following expressions, otherwise they evaluate to undefined
        // in the packed version for some reason...
        var path = options.path ? '; path=' + (options.path) : '';
        var domain = options.domain ? '; domain=' + (options.domain) : '';
        var secure = options.secure ? '; secure' : '';
        document.cookie = [name, '=', encodeURIComponent(value), expires, path, domain, secure].join('');
    } else { // only name given, get cookie
        var cookieValue = null;
        if (document.cookie && document.cookie != '') {
            var cookies = document.cookie.split(';');
            for (var i = 0; i < cookies.length; i++) {
                var cookie = jQuery.trim(cookies[i]);
                // Does this cookie string begin with the name we want?
                if (cookie.substring(0, name.length + 1) == (name + '=')) {
                    cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
                    break;
                }
            }
        }
        return cookieValue;
    }
};
/* Copyright (c) 2007 Paul Bakaus (paul.bakaus@googlemail.com) and Brandon Aaron (brandon.aaron@gmail.com || http://brandonaaron.net)
 * Dual licensed under the MIT (http://www.opensource.org/licenses/mit-license.php)
 * and GPL (http://www.opensource.org/licenses/gpl-license.php) licenses.
 *
 * $LastChangedDate: 2007-12-20 08:46:55 -0600 (Thu, 20 Dec 2007) $
 * $Rev: 4259 $
 *
 * Version: 1.2
 *
 * Requires: jQuery 1.2+
 */

(function($) {

    $.dimensions = {
        version: '1.2'
    };

    // Create innerHeight, innerWidth, outerHeight and outerWidth methods
    $.each(['Height', 'Width'], function(i, name) {

        // innerHeight and innerWidth
        $.fn['inner' + name] = function() {
            if (!this[0]) return;

            var torl = name == 'Height' ? 'Top' : 'Left', // top or left
                borr = name == 'Height' ? 'Bottom' : 'Right'; // bottom or right

            return this.is(':visible') ? this[0]['client' + name] : num(this, name.toLowerCase()) + num(this, 'padding' + torl) + num(this, 'padding' + borr);
        };

        // outerHeight and outerWidth
        $.fn['outer' + name] = function(options) {
            if (!this[0]) return;

            var torl = name == 'Height' ? 'Top' : 'Left', // top or left
                borr = name == 'Height' ? 'Bottom' : 'Right'; // bottom or right

            options = $.extend({
                margin: false
            }, options || {});

            var val = this.is(':visible') ?
                this[0]['offset' + name] :
                num(this, name.toLowerCase()) + num(this, 'border' + torl + 'Width') + num(this, 'border' + borr + 'Width') + num(this, 'padding' + torl) + num(this, 'padding' + borr);

            return val + (options.margin ? (num(this, 'margin' + torl) + num(this, 'margin' + borr)) : 0);
        };
    });

    // Create scrollLeft and scrollTop methods
    $.each(['Left', 'Top'], function(i, name) {
        $.fn['scroll' + name] = function(val) {
            if (!this[0]) return;

            return val != undefined ?

                // Set the scroll offset
                this.each(function() {
                    this == window || this == document ?
                        window.scrollTo(
                            name == 'Left' ? val : $(window)['scrollLeft'](),
                            name == 'Top' ? val : $(window)['scrollTop']()
                        ) :
                        this['scroll' + name] = val;
                }) :

                // Return the scroll offset
                this[0] == window || this[0] == document ?
                self[(name == 'Left' ? 'pageXOffset' : 'pageYOffset')] ||
                $.boxModel && document.documentElement['scroll' + name] ||
                document.body['scroll' + name] :
                this[0]['scroll' + name];
        };
    });

    $.fn.extend({
        position: function() {
            var left = 0,
                top = 0,
                elem = this[0],
                offset, parentOffset, offsetParent, results;

            if (elem) {
                // Get *real* offsetParent
                offsetParent = this.offsetParent();

                // Get correct offsets
                offset = this.offset();
                parentOffset = offsetParent.offset();

                // Subtract element margins
                offset.top -= num(elem, 'marginTop');
                offset.left -= num(elem, 'marginLeft');

                // Add offsetParent borders
                parentOffset.top += num(offsetParent, 'borderTopWidth');
                parentOffset.left += num(offsetParent, 'borderLeftWidth');

                // Subtract the two offsets
                results = {
                    top: offset.top - parentOffset.top,
                    left: offset.left - parentOffset.left
                };
            }

            return results;
        },

        offsetParent: function() {
            var offsetParent = this[0].offsetParent;
            while (offsetParent && (!/^body|html$/i.test(offsetParent.tagName) && $.css(offsetParent, 'position') == 'static'))
                offsetParent = offsetParent.offsetParent;
            return $(offsetParent);
        }
    });

    function num(el, prop) {
        return parseInt($.curCSS(el.jquery ? el[0] : el, prop, true)) || 0;
    };

})(jQuery);

/*
 * jQuery Easing v1.1.1 - http://gsgd.co.uk/sandbox/jquery.easing.php
 *
 * Uses the built in easing capabilities added in jQuery 1.1
 * to offer multiple easing options
 *
 * Copyright (c) 2007 George Smith
 * Licensed under the MIT License:
 *   http://www.opensource.org/licenses/mit-license.php
 */

jQuery.extend(jQuery.easing, {
    easein: function(x, t, b, c, d) {
        return c * (t /= d) * t + b; // in
    },
    easeinout: function(x, t, b, c, d) {
        if (t < d / 2) return 2 * c * t * t / (d * d) + b;
        var ts = t - d / 2;
        return -2 * c * ts * ts / (d * d) + 2 * c * ts / d + c / 2 + b;
    },
    easeout: function(x, t, b, c, d) {
        return -c * t * t / (d * d) + 2 * c * t / d + b;
    },
    expoin: function(x, t, b, c, d) {
        var flip = 1;
        if (c < 0) {
            flip *= -1;
            c *= -1;
        }
        return flip * (Math.exp(Math.log(c) / d * t)) + b;
    },
    expoout: function(x, t, b, c, d) {
        var flip = 1;
        if (c < 0) {
            flip *= -1;
            c *= -1;
        }
        return flip * (-Math.exp(-Math.log(c) / d * (t - d)) + c + 1) + b;
    },
    expoinout: function(x, t, b, c, d) {
        var flip = 1;
        if (c < 0) {
            flip *= -1;
            c *= -1;
        }
        if (t < d / 2) return flip * (Math.exp(Math.log(c / 2) / (d / 2) * t)) + b;
        return flip * (-Math.exp(-2 * Math.log(c / 2) / d * (t - d)) + c + 1) + b;
    },
    bouncein: function(x, t, b, c, d) {
        return c - jQuery.easing['bounceout'](x, d - t, 0, c, d) + b;
    },
    bounceout: function(x, t, b, c, d) {
        if ((t /= d) < (1 / 2.75)) {
            return c * (7.5625 * t * t) + b;
        } else if (t < (2 / 2.75)) {
            return c * (7.5625 * (t -= (1.5 / 2.75)) * t + .75) + b;
        } else if (t < (2.5 / 2.75)) {
            return c * (7.5625 * (t -= (2.25 / 2.75)) * t + .9375) + b;
        } else {
            return c * (7.5625 * (t -= (2.625 / 2.75)) * t + .984375) + b;
        }
    },
    bounceinout: function(x, t, b, c, d) {
        if (t < d / 2) return jQuery.easing['bouncein'](x, t * 2, 0, c, d) * .5 + b;
        return jQuery.easing['bounceout'](x, t * 2 - d, 0, c, d) * .5 + c * .5 + b;
    },
    elasin: function(x, t, b, c, d) {
        var s = 1.70158;
        var p = 0;
        var a = c;
        if (t == 0) return b;
        if ((t /= d) == 1) return b + c;
        if (!p) p = d * .3;
        if (a < Math.abs(c)) {
            a = c;
            var s = p / 4;
        } else var s = p / (2 * Math.PI) * Math.asin(c / a);
        return -(a * Math.pow(2, 10 * (t -= 1)) * Math.sin((t * d - s) * (2 * Math.PI) / p)) + b;
    },
    elasout: function(x, t, b, c, d) {
        var s = 1.70158;
        var p = 0;
        var a = c;
        if (t == 0) return b;
        if ((t /= d) == 1) return b + c;
        if (!p) p = d * .3;
        if (a < Math.abs(c)) {
            a = c;
            var s = p / 4;
        } else var s = p / (2 * Math.PI) * Math.asin(c / a);
        return a * Math.pow(2, -10 * t) * Math.sin((t * d - s) * (2 * Math.PI) / p) + c + b;
    },
    elasinout: function(x, t, b, c, d) {
        var s = 1.70158;
        var p = 0;
        var a = c;
        if (t == 0) return b;
        if ((t /= d / 2) == 2) return b + c;
        if (!p) p = d * (.3 * 1.5);
        if (a < Math.abs(c)) {
            a = c;
            var s = p / 4;
        } else var s = p / (2 * Math.PI) * Math.asin(c / a);
        if (t < 1) return -.5 * (a * Math.pow(2, 10 * (t -= 1)) * Math.sin((t * d - s) * (2 * Math.PI) / p)) + b;
        return a * Math.pow(2, -10 * (t -= 1)) * Math.sin((t * d - s) * (2 * Math.PI) / p) * .5 + c + b;
    },
    backin: function(x, t, b, c, d) {
        var s = 1.70158;
        return c * (t /= d) * t * ((s + 1) * t - s) + b;
    },
    backout: function(x, t, b, c, d) {
        var s = 1.70158;
        return c * ((t = t / d - 1) * t * ((s + 1) * t + s) + 1) + b;
    },
    backinout: function(x, t, b, c, d) {
        var s = 1.70158;
        if ((t /= d / 2) < 1) return c / 2 * (t * t * (((s *= (1.525)) + 1) * t - s)) + b;
        return c / 2 * ((t -= 2) * t * (((s *= (1.525)) + 1) * t + s) + 2) + b;
    }
});
/*
 * Metadata - jQuery plugin for parsing metadata from elements
 *
 * Copyright (c) 2006 John Resig, Yehuda Katz, J�örn Zaefferer, Paul McLanahan
 *
 * Dual licensed under the MIT and GPL licenses:
 *   http://www.opensource.org/licenses/mit-license.php
 *   http://www.gnu.org/licenses/gpl.html
 *
 * Revision: $Id$
 *
 */

/**
 * Sets the type of metadata to use. Metadata is encoded in JSON, and each property
 * in the JSON will become a property of the element itself.
 *
 * There are three supported types of metadata storage:
 *
 *   attr:  Inside an attribute. The name parameter indicates *which* attribute.
 *
 *   class: Inside the class attribute, wrapped in curly braces: { }
 *
 *   elem:  Inside a child element (e.g. a script tag). The
 *          name parameter indicates *which* element.
 *
 * The metadata for an element is loaded the first time the element is accessed via jQuery.
 *
 * As a result, you can define the metadata type, use $(expr) to load the metadata into the elements
 * matched by expr, then redefine the metadata type and run another $(expr) for other elements.
 *
 * @name $.metadata.setType
 *
 * @example <p id="one" class="some_class {item_id: 1, item_label: 'Label'}">This is a p</p>
 * @before $.metadata.setType("class")
 * @after $("#one").metadata().item_id == 1; $("#one").metadata().item_label == "Label"
 * @desc Reads metadata from the class attribute
 *
 * @example <p id="one" class="some_class" data="{item_id: 1, item_label: 'Label'}">This is a p</p>
 * @before $.metadata.setType("attr", "data")
 * @after $("#one").metadata().item_id == 1; $("#one").metadata().item_label == "Label"
 * @desc Reads metadata from a "data" attribute
 *
 * @example <p id="one" class="some_class"><script>{item_id: 1, item_label: 'Label'}</script>This is a p</p>
 * @before $.metadata.setType("elem", "script")
 * @after $("#one").metadata().item_id == 1; $("#one").metadata().item_label == "Label"
 * @desc Reads metadata from a nested script element
 *
 * @param String type The encoding type
 * @param String name The name of the attribute to be used to get metadata (optional)
 * @cat Plugins/Metadata
 * @descr Sets the type of encoding to be used when loading metadata for the first time
 * @type undefined
 * @see metadata()
 */

(function($) {

    $.extend({
        metadata: {
            defaults: {
                type: 'class',
                name: 'metadata',
                cre: /({.*})/,
                single: 'metadata'
            },
            setType: function(type, name) {
                this.defaults.type = type;
                this.defaults.name = name;
            },
            get: function(elem, opts) {
                var settings = $.extend({}, this.defaults, opts);
                // check for empty string in single property
                if (!settings.single.length) settings.single = 'metadata';

                var data = $.data(elem, settings.single);
                // returned cached data if it already exists
                if (data) return data;

                data = "{}";

                if (settings.type == "class") {
                    var m = settings.cre.exec(elem.className);
                    if (m)
                        data = m[1];
                } else if (settings.type == "elem") {
                    if (!elem.getElementsByTagName)
                        return undefined;
                    var e = elem.getElementsByTagName(settings.name);
                    if (e.length)
                        data = $.trim(e[0].innerHTML);
                } else if (elem.getAttribute != undefined) {
                    var attr = elem.getAttribute(settings.name);
                    if (attr)
                        data = attr;
                }

                if (data.indexOf('{') < 0)
                    data = "{" + data + "}";

                data = eval("(" + data + ")");

                $.data(elem, settings.single, data);
                return data;
            }
        }
    });

    /**
     * Returns the metadata object for the first member of the jQuery object.
     *
     * @name metadata
     * @descr Returns element's metadata object
     * @param Object opts An object contianing settings to override the defaults
     * @type jQuery
     * @cat Plugins/Metadata
     */
    $.fn.metadata = function(opts) {
        return $.metadata.get(this[0], opts);
    };

})(jQuery);

/**
 * FwValidator
 *
 * @package     jquery
 * @subpackage  validator
 */

var FwValidator = {

    /**
     * 디버그 모드
     */
    DEBUG_MODE: false,

    /**
     * 결과 코드
     */
    CODE_SUCCESS: true,
    CODE_FAIL: false,

    /**
     * 어트리뷰트 명
     */
    ATTR_FILTER: 'fw-filter',
    ATTR_MSG: 'fw-msg',
    ATTR_LABEL: 'fw-label',
    ATTR_FIREON: 'fw-fireon',
    ATTR_ALONE: 'fw-alone',

    /**
     * 응답객체들
     */
    responses: {},

    /**
     * 엘리먼트별 필수 입력 에러 메세지
     */
    requireMsgs: {},

    /**
     * 엘리먼트의 특정 필터별 에러 메세지
     */
    elmFilterMsgs: {},

    /**
     * Validator 기본 이벤트 등록
     */
    bind: function(formId, expand) {

        var self = this;
        var formInfo = this.Helper.getFormInfo(formId);

        if (formInfo === false) {
            alert('The form does not exist - bind');
            return false;
        }

        var elmForm = formInfo.instance;

        var Response = this._response(formId);

        this._fireon(formId, elmForm, Response);
        this._submit(formId, elmForm, expand);

        return true;

    },

    /**
     * Validator 검사 진행
     *
     * @param string formId
     * @return object | false
     */
    inspection: function(formId, expand) {

        expand = (expand === true) ? true : false;

        var self = this;
        var Response = this._response(formId);

        if (Response === false) {
            alert('The form does not exist - inspection');
            return false;
        }

        if (Response.elmsTarget.length == 0) {
            return this.Helper.getResult(Response, this.CODE_SUCCESS);
        }

        Response.elmsTarget.each(function() {
            self._execute(Response, this);
        });

        if (Response.elmsCurrErrorField.length > 0) {

            if (expand !== true) {
                this.Handler.errorHandler(Response.elmsCurrErrorField[0]);
            } else {
                this.Handler.errorHandlerByExapnd(Response);
            }

            return Response.elmsCurrErrorField[0];

        }

        return this.Helper.getResult(Response, this.CODE_SUCCESS);

    },

    /**
     * submit 이벤트 등록
     *
     * @param string    formId
     * @param object    elmForm
     */
    _submit: function(formId, elmForm, expand) {
        var self = this;

        elmForm.unbind('submit');
        elmForm.bind('submit', function() {
            var result = false;

            try {
                result = self.inspection(formId, expand);
            } catch (e) {
                alert(e);
                return false;
            }

            if (!result || result.passed === self.CODE_FAIL) {
                return false;
            };

            var callback = self._beforeSubmit(elmForm);

            return callback !== false ? true : false;
        });
    },

    /**
     * fireon 이벤트 등록
     *
     * @param string                formId
     * @param object                elmForm
     * @param FwValidator.Response  Response
     */
    _fireon: function(formId, elmForm, Response) {
        var self = this;
        var formInfo = this.Helper.getFormInfo(formId);

        $(formInfo.selector).find('*[' + this.ATTR_FILTER + '][' + this.ATTR_FIREON + ']').each(function() {
            var elm = $(this);
            var evtName = $.trim(elm.attr(self.ATTR_FIREON));
            var elmMsg = '';

            elm.unbind(evtName);
            elm.bind(evtName, function() {
                var result = self._execute(Response, this);
                var targetField = Response.elmCurrField;

                //에러 메세지가 출력되 있다면 일단 지우고 체킹을 시작한다.
                if (typeof elmMsg == 'object') {
                    elmMsg.remove();
                }

                if (result > -1) {
                    elmMsg = self.Handler.errorHandlerByFireon(Response.elmsCurrErrorField[result]);
                } else {
                    self.Handler.successHandlerByFireon(self.Helper.getResult(Response, self.CODE_FAIL));
                }
            });
        });
    },

    /**
     * Response 객체 생성
     *
     * @param string formId
     * @return FwValidator.Response | false
     */
    _response: function(formId) {

        var formInfo = this.Helper.getFormInfo(formId);

        if (formInfo === false) {
            alert('The form does not exist - find');
            return false;
        }

        var elmForm = formInfo.instance;
        var elmsTarget = $(formInfo.selector).find('*[' + this.ATTR_FILTER + ']');

        this.responses[formId] = new FwValidator.Response();

        this.responses[formId].formId = formId;
        this.responses[formId].elmForm = elmForm;
        this.responses[formId].elmsTarget = elmsTarget;

        return this.responses[formId];

    },

    /**
     * BeforeExecute 콜백함수 실행
     *
     * @param FwValidator.Response Response
     */
    _beforeExecute: function(Response) {

        var count = this.Handler.beforeExecute.length;

        if (count == 0) return;

        for (var i in this.Handler.beforeExecute) {
            this.Handler.beforeExecute[i].call(this, Response);
        }

    },

    /**
     * BeforeSubmit 콜백함수 실행
     *
     * @param object elmForm (jquery 셀렉터 문법으로 찾아낸 폼 객체)
     */
    _beforeSubmit: function(elmForm) {

        if (typeof this.Handler.beforeSubmit != 'function') return true;

        return this.Handler.beforeSubmit.call(this, elmForm);

    },

    /**
     * 엘리먼트별 유효성 검사 실행
     *
     * @param FwValidator.Response  Response
     * @param htmlElement           elmTarget
     * @return int(에러가 발생한 elmCurrField 의 인덱스값) | -1(성공)
     */
    _execute: function(Response, elmTarget) {

        var RESULT_SUCCESS = -1;

        Response.elmCurrField = $(elmTarget);
        Response.elmCurrLabel = Response.elmCurrField.attr(this.ATTR_LABEL);
        Response.elmCurrFieldType = this.Helper.getElmType(Response.elmCurrField);
        Response.elmCurrFieldDisabled = elmTarget.disabled;
        Response.elmCurrValue = this.Helper.getValue(Response.formId, Response.elmCurrField);
        Response.elmCurrErrorMsg = Response.elmCurrField.attr(this.ATTR_MSG);

        //_beforeExecute 콜백함수 실행
        this._beforeExecute(Response);

        //필드가 disabled 일 경우는 체크하지 않음.
        if (Response.elmCurrFieldDisabled === true) {
            return RESULT_SUCCESS;
        }

        var filter = $.trim(Response.elmCurrField.attr(this.ATTR_FILTER));

        if (filter == '') {
            return RESULT_SUCCESS;
        }

        //is로 시작하지 않는것들은 정규표현식으로 간주
        if (/^is/i.test(filter)) {
            var filters = filter.split('&');
            var count = filters.length;

            //필수항목이 아닌경우 빈값이 들어왔을경우는 유효성 체크를 통과시킴

            if ((/isFill/i.test(filter) === false) && !Response.elmCurrValue) {
                return RESULT_SUCCESS;
            }

            for (var i = 0; i < count; ++i) {
                var filter = filters[i];
                var param = '';
                var filtersInfo = this.Helper.getFilterInfo(filter);

                filter = Response.elmCurrFilter = filtersInfo.id;
                param = filtersInfo.param;

                //필수 입력 필터의 경우 항목관리에서 사용자가 메세지를 직접 지정하는 부분이 있어 이렇게 처리
                if (filter == 'isFill') {
                    Response.elmCurrValue = $.trim(Response.elmCurrValue);
                    Response.elmCurrErrorMsg = this.requireMsgs[elmTarget.id] ? this.requireMsgs[elmTarget.id] : this.msgs['isFill'];
                } else {
                    var msg = Response.elmCurrField.attr(this.ATTR_MSG);

                    if (msg) {
                        Response.elmCurrErrorMsg = msg;
                    } else if (this.Helper.getElmFilterMsg(elmTarget.id, filter)) {
                        Response.elmCurrErrorMsg = this.Helper.getElmFilterMsg(elmTarget.id, filter);
                    } else {
                        Response.elmCurrErrorMsg = this.msgs[filter];
                    }

                }

                //존재하지 않는 필터인 경우 에러코드 반환
                if (this.Filter[filter] === undefined) {
                    Response.elmCurrErrorMsg = this.msgs['notMethod'];
                    var result = this.Helper.getResult(Response, this.CODE_FAIL);

                    Response.elmsCurrErrorField.push(result);
                    return Response.elmsCurrErrorField.length - 1;
                }

                //필터 실행
                var result = this.Filter[filter](Response, param);

                if (result == undefined || result.passed === this.CODE_FAIL) {
                    Response.elmsCurrErrorField.push(result);

                    //Debug를 위해 넣어둔 코드(확장형 필터를 잘못 등록해서 return값이 없는 경우를 체크하기 위함)
                    if (result == undefined) {
                        alert('Extension Filter Return error - ' + filter);
                    }

                    return Response.elmsCurrErrorField.length - 1;
                }
            }
        } else {
            var msg = Response.elmCurrErrorMsg;
            Response.elmCurrErrorMsg = msg ? msg : this.msgs['isRegex'];
            var result = this.Filter.isRegex(Response, filter);

            if (result.passed === this.CODE_FAIL) {
                Response.elmsCurrErrorField.push(result);

                return Response.elmsCurrErrorField.length - 1;
            }
        }

        return RESULT_SUCCESS;
    }
};

/**
 * FwValidator.Response
 *
 * @package     jquery
 * @subpackage  validator
 */

FwValidator.Response = function() {

    this.formId = null;
    this.elmForm = null;
    this.elmsTarget = null;
    this.elmsCurrErrorField = [];

    this.elmCurrField = null;
    this.elmCurrFieldType = null;
    this.elmCurrFieldDisabled = null;
    this.elmCurrLabel = null;
    this.elmCurrValue = null;
    this.elmCurrFilter = null;
    this.elmCurrErrorMsg = null;

    this.requireMsgs = {};

};

/**
 * FwValidator.Helper
 *
 * @package     jquery
 * @subpackage  validator
 */

FwValidator.Helper = {

    parent: FwValidator,

    /**
     * 메세지 엘리먼트의 아이디 prefix
     */
    msgIdPrefix: 'msg_',

    /**
     * 메세지 엘리먼트의 클래스 명 prefix
     */
    msgClassNamePrefix: 'msg_error_mark_',

    /**
     * 결과 반환
     */
    getResult: function(Response, code, param) {

        //특수 파라미터 정보(특정 필터에서만 사용함)
        param = param != undefined ? param : {};

        var msg = '';

        if (code === this.parent.CODE_FAIL) {

            try {
                msg = Response.elmCurrErrorMsg.replace(/\{label\}/i, Response.elmCurrLabel);
            } catch (e) {
                msg = 'No Message';
            }

        } else {

            msg = 'success';

        }

        var result = {};
        result.passed = code;
        result.formid = Response.formId;
        result.msg = msg;
        result.param = param;

        try {
            result.element = Response.elmCurrField;
            result.elmid = Response.elmCurrField.attr('id');
            result.filter = Response.elmCurrFilter;
        } catch (e) {}

        return result;

    },

    /**
     * 필터 정보 반환(필터이름, 파라미터)
     */
    getFilterInfo: function(filter) {
        var matches = filter.match(/(is[a-z]*)((?:\[.*?\])*)/i);

        return {
            id: matches[1],
            param: this.getFilterParams(matches[2])
        };
    },

    /**
     * 필터의 파라미터 스트링 파싱
     * isFill[a=1][b=1][c=1] 이런식의 멀티 파라미터가 지정되어 있는 경우는 배열로 반환함
     * isFill[a=1] 단일 파라미터는 파라미터로 지정된 스트링값만 반환함
     */
    getFilterParams: function(paramStr) {
        if (paramStr == undefined || paramStr == null || paramStr == '') {
            return '';
        }

        var matches = paramStr.match(/\[.*?\]/ig);

        if (matches == null) {
            return '';
        }

        var count = matches.length;
        var result = [];

        for (var i = 0; i < count; i++) {
            var p = matches[i].match(/\[(.*?)\]/);
            result.push(p[1]);
        }

        if (result.length == 1) {
            return result[0];
        }

        return result;
    },

    /**
     * 필드 타입 반환(select, checkbox, radio, textbox)
     */
    getElmType: function(elmField) {
        elmField = $(elmField);

        var elTag = elmField[0].tagName;
        var result = null;

        switch (elTag) {
            case 'SELECT':
                result = 'select';
                break;

            case 'INPUT':
                var _type = elmField.attr('type').toLowerCase();
                if (_type == 'checkbox') result = 'checkbox';
                else if (_type == 'radio') result = 'radio';
                else result = 'textbox';

                break;

            case 'TEXTAREA':
                result = 'textbox';
                break;

            default:
                result = 'textbox';
                break;
        }

        return result;
    },

    /**
     * 필드 값 반환
     */
    getValue: function(formId, elmField) {
        var result = '';
        var elmName = elmField.attr('name');
        var fieldType = this.getElmType(elmField);

        //checkbox 나 radio 박스는 value값을 반환하지 않음
        if (fieldType == 'checkbox' || fieldType == 'radio') {
            if (elmField.get(0).checked === true) {
                result = elmField.val();
            }
            return result;
        }

        //alonefilter 속성이 Y 로 되어 있다면 해당 엘리먼트의 값만 반환함
        var aloneFilter = elmField.attr(this.parent.ATTR_ALONE);
        if (aloneFilter == 'Y' || aloneFilter == 'y') {
            return elmField.val();
        }

        //name이 배열형태로 되어 있다면 값을 모두 합쳐서 반환
        if (/\[.*?\]/.test(elmName)) {
            var formInfo = this.getFormInfo(formId);

            var groupElms = $(formInfo.selector + ' [name="' + elmName + '"]');
            groupElms.each(function(i) {
                var elm = $(this);
                result += elm.val();
            });
        } else {
            result = elmField.val();
        }

        return result;
    },

    /**
     * 에러메세지 엘리먼트 생성
     */
    createMsg: function(elm, msg, formId) {
        var elmMsg = document.createElement('span');

        elmMsg.id = this.msgIdPrefix + elm.attr('id');
        elmMsg.className = this.msgClassNamePrefix + formId;
        elmMsg.innerHTML = msg;

        return $(elmMsg);
    },

    /**
     * 에러메세지 엘리먼트 제거
     */
    removeMsg: function(elm) {
        var id = this.msgIdPrefix + elm.attr('id');
        var elmErr = $('#' + id);

        if (elmErr) elmErr.remove();
    },

    /**
     * 에러메세지 엘리먼트 모두 제거
     */
    removeAllMsg: function(formId) {
        var className = this.msgClassNamePrefix + formId;

        $('.' + className).remove();
    },

    /**
     * 문자열의 Byte 수 반환
     */
    getByte: function(str) {
        var encode = encodeURIComponent(str);
        var totalBytes = 0;
        var chr;
        var bytes;
        var code;

        for (var i = 0; i < encode.length; i++) {
            chr = encode.charAt(i);
            if (chr != "%") totalBytes++;
            else {
                code = parseInt(encode.substr(i + 1, 2), 16);
                if (!(code & 0x80)) totalBytes++;
                else {
                    if ((code & 0xE0) == 0xC0) bytes = 2;
                    else if ((code & 0xF0) == 0xE0) bytes = 3;
                    else if ((code & 0xF8) == 0xF0) bytes = 4;
                    else return -1;

                    i += 3 * (bytes - 1);

                    totalBytes += 2;
                }
                i += 2;
            }
        }

        return totalBytes;
    },

    /**
     * 지정한 엘리먼트의 필터 메세지가 존재하는가
     *
     * @param elmId (엘리먼트 아이디)
     * @param filter (필터명)
     * @return string | false
     */
    getElmFilterMsg: function(elmId, filter) {
        if (this.parent.elmFilterMsgs[elmId] == undefined) return false;
        if (this.parent.elmFilterMsgs[elmId][filter] == undefined) return false;

        return this.parent.elmFilterMsgs[elmId][filter];
    },

    /**
     * 폼 정보 반환
     *
     * @param formId (폼 아이디 혹은 네임)
     * @return array(
     *   'selector' => 셀렉터 문자,
     *   'instance' => 셀렉터 문법으로 검색해낸 폼 객체
     * ) | false
     */
    getFormInfo: function(formId) {
        var result = {};
        var selector = '#' + formId;
        var instance = $(selector);

        if (instance.length > 0) {
            result.selector = selector;
            result.instance = instance;

            return result;
        }

        selector = 'form[name="' + formId + '"]';
        instance = $(selector);

        if (instance.length > 0) {
            result.selector = selector;
            result.instance = instance;

            return result;
        }

        return false;
    },

    /**
     * 숫자형태의 문자열로 바꿔줌
     * 123,123,123
     * 123123,123
     * 123%
     * 123  %
     * 123.4
     * -123
     * ,123
     *
     * @param value
     * @return float
     */
    getNumberConv: function(value) {
        if (!value || value == undefined || value == null) return '';

        value = value + "";

        value = value.replace(/,/g, '');
        value = value.replace(/%/g, '');
        value = value.replace(/[\s]/g, '');

        if (this.parent.Verify.isFloat(value) === false) return '';

        return parseFloat(value);
    }
};

/**
 * FwValidator.Handler
 *
 * @package     jquery
 * @subpackage  validator
 */

FwValidator.Handler = {

    parent: FwValidator,

    /**
     * 사용자 정의형 에러핸들러(엘리먼트 아이디별로 저장됨)
     */
    customErrorHandler: {},

    /**
     * 사용자 정의형 에러핸들러(필터별로 저장됨)
     */
    customErrorHandlerByFilter: {},

    /**
     * 사용자 정의형 성공핸들러(엘리먼트 아이디별로 저장됨)
     */
    customSuccessHandler: {},

    /**
     * 사용자 정의형 성공핸들러(필터별로 저장됨)
     */
    customSuccessHandlerByFilter: {},

    /**
     * FwValidator._execute에 의해 검사되기 전 실행되는 콜백함수
     */
    beforeExecute: [],

    /**
     * FwValidator._submit에서 바인딩한 onsubmit 이벤트 발생후 실행되는 콜백함수
     * {폼아이디 : 콜백함수, ...}
     */
    beforeSubmit: {},

    /**
     * 기본 메세지 전체를 오버라이딩
     */
    overrideMsgs: function(msgs) {
        if (typeof msgs != 'object') return;

        this.parent.msgs = msgs;
    },

    /**
     * 필드에 따른 필수 입력 에러메세지 설정
     */
    setRequireErrorMsg: function(field, msg) {
        this.parent.requireMsgs[field] = msg;
    },

    /**
     * 필터 타입에 따른 에러메세지 설정
     */
    setFilterErrorMsg: function(filter, msg) {
        this.parent.msgs[filter] = msg;
    },

    /**
     * 엘리먼트의 특정 필터에만 에러메세지를 설정
     */
    setFilterErrorMsgByElement: function(elmId, filter, msg) {
        if (this.parent.elmFilterMsgs[elmId] == undefined) {
            this.parent.elmFilterMsgs[elmId] = {};
        }

        this.parent.elmFilterMsgs[elmId][filter] = msg;
    },

    /**
     * 엘리먼트 아이디별 사용자정의형 에러핸들러 등록
     */
    setCustomErrorHandler: function(elmId, func) {
        if (typeof func != 'function') return;

        this.customErrorHandler[elmId] = func;
    },

    /**
     * 필터 타입별 사용자정의형 에러핸들러 등록
     */
    setCustomErrorHandlerByFilter: function(filter, func) {
        if (typeof func != 'function') return;

        this.customErrorHandlerByFilter[filter] = func;
    },

    /**
     * 엘리먼트 아이디별 사용자정의형 성공핸들러 등록
     */
    setCustomSuccessHandler: function(elmId, func) {
        if (typeof func != 'function') return;

        this.customSuccessHandler[elmId] = func;
    },

    /**
     * 필터 타입별 사용자정의형 성공핸들러 등록
     */
    setCustomSuccessHandlerByFilter: function(filter, func) {
        if (typeof func != 'function') return;

        this.customSuccessHandlerByFilter[filter] = func;
    },

    /**
     * 확장형 필터 등록
     */
    setExtensionFilter: function(filter, func) {
        if (typeof func != 'function') return;

        if (this.parent.Filter[filter] == undefined) {
            this.parent.Filter[filter] = func;
        }
    },

    /**
     * 각 엘리먼트가 FwValidator._execute에 의해 검사되기 전 실행되는 콜백함수 등록
     */
    setBeforeExecute: function(func) {
        if (typeof func != 'function') return;

        this.beforeExecute.push(func);
    },

    /**
     * FwValidator._submit 에서 바인딩된 onsubmit 이벤트의 콜백함수 등록(유효성 검사가 성공하면 호출됨)
     */
    setBeforeSubmit: function(func) {
        if (typeof func != 'function') return;

        this.beforeSubmit = func;
    },

    /**
     * 에러핸들러 - 기본
     */
    errorHandler: function(resultData) {
        if (this._callCustomErrorHandler(resultData) === true) return;

        alert(resultData.msg);
        resultData.element.focus();
    },

    /**
     * 에러핸들러 - 전체 펼침 모드
     */
    errorHandlerByExapnd: function(Response) {
        var count = Response.elmsCurrErrorField.length;

        //해당 폼에 출력된 에러메세지를 일단 모두 지운다.
        this.parent.Helper.removeAllMsg(Response.formId);

        for (var i = 0; i < count; ++i) {
            var resultData = Response.elmsCurrErrorField[i];

            if (this._callCustomErrorHandler(resultData) === true) continue;

            var elmMsg = this.parent.Helper.createMsg(resultData.element, resultData.msg, resultData.formid).css({
                'color': '#FF3300'
            });
            elmMsg.appendTo(resultData.element.parent());
        }
    },

    /**
     * 에러핸들러 - fireon
     */
    errorHandlerByFireon: function(resultData) {
        if (this._callCustomErrorHandler(resultData) === true) return;

        //해당 항목의 에러메세지 엘리먼트가 있다면 먼저 삭제한다.
        this.parent.Helper.removeMsg(resultData.element);

        var elmMsg = this.parent.Helper.createMsg(resultData.element, resultData.msg, resultData.formid).css({
            'color': '#FF3300'
        });
        elmMsg.appendTo(resultData.element.parent());

        return elmMsg;
    },

    /**
     * 성공핸들러 - fireon
     */
    successHandlerByFireon: function(resultData) {

        this._callCustomSuccessHandler(resultData);

    },

    /**
     * 정의형 에러 핸들러 호출
     *
     * @return boolean (정의형 에러핸들러를 호출했을 경우 true 반환)
     */
    _callCustomErrorHandler: function(resultData) {
        //resultData 가 정의되어 있지 않은 경우
        if (resultData == undefined) {
            alert('errorHandler - resultData is not found');
            return true;
        }

        //해당 엘리먼트에 대한 Custom에러핸들러가 등록되어 있다면 탈출
        if (this.customErrorHandler[resultData.elmid] != undefined) {
            this.customErrorHandler[resultData.elmid].call(this.parent, resultData);
            return true;
        }

        //해당 필터에 대한 Custom에러핸들러가 등록되어 있다면 탈출
        if (this.customErrorHandlerByFilter[resultData.filter] != undefined) {
            this.customErrorHandlerByFilter[resultData.filter].call(this.parent, resultData);
            return true;
        }

        return false;
    },

    /**
     * 정의형 성공 핸들러 호출 - 기본적으로 fireon 속성이 적용된 엘리먼트에만 적용됨.
     */
    _callCustomSuccessHandler: function(resultData) {

        if (this.customSuccessHandler[resultData.elmid] != undefined) {
            this.customSuccessHandler[resultData.elmid].call(this.parent, resultData);
            return;
        }

        if (this.customSuccessHandlerByFilter[resultData.filter] != undefined) {
            this.customSuccessHandlerByFilter[resultData.filter].call(this.parent, resultData);
            return;
        }

    }
};

/**
 * FwValidator.Verify
 *
 * @package     jquery
 * @subpackage  validator
 */

FwValidator.Verify = {

    parent: FwValidator,

    isNumber: function(value, cond) {
        if (value == '') return true;

        if (!cond) {
            cond = 1;
        }

        cond = parseInt(cond);

        pos = 1;
        nga = 2;
        minpos = 4;
        minnga = 8;

        result = 0;

        if ((/^[0-9]+$/).test(value) === true) {
            result = pos;
        } else if ((/^[-][0-9]+$/).test(value) === true) {
            result = nga;
        } else if ((/^[0-9]+[.][0-9]+$/).test(value) === true) {
            result = minpos;
        } else if ((/^[-][0-9]+[.][0-9]+$/).test(value) === true) {
            result = minnga;
        }

        if (result & cond) {
            return true;
        }

        return false;
    },

    isFloat: function(value) {
        if (value == '') return true;

        return (/^[\-0-9]([0-9]+[\.]?)*$/).test(value);
    },

    isIdentity: function(value) {
        if (value == '') return true;

        return (/^[a-z]+[a-z0-9_]+$/i).test(value);
    },

    isKorean: function(value) {
        if (value == '') return true;

        var count = value.length;

        for (var i = 0; i < count; ++i) {
            var cCode = value.charCodeAt(i);

            //공백은 무시
            if (cCode == 0x20) continue;

            if (cCode < 0x80) {
                return false;
            }
        }

        return true;
    },

    isAlpha: function(value) {
        if (value == '') return true;

        return (/^[a-z]+$/i).test(value);
    },

    isAlphaUpper: function(value) {
        if (value == '') return true;

        return (/^[A-Z]+$/).test(value);
    },

    isAlphaLower: function(value) {
        if (value == '') return true;

        return (/^[a-z]+$/).test(value);
    },

    isAlphaNum: function(value) {
        if (value == '') return true;

        return (/^[a-z0-9]+$/i).test(value);
    },

    isAlphaNumUpper: function(value) {
        if (value == '') return true;

        return (/^[A-Z0-9]+$/).test(value);
    },

    isAlphaNumLower: function(value) {
        if (value == '') return true;

        return (/^[a-z0-9]+$/).test(value);
    },

    isAlphaDash: function(value) {
        if (value == '') return true;

        return (/^[a-z0-9_-]+$/i).test(value);
    },

    isAlphaDashUpper: function(value) {
        if (value == '') return true;

        return (/^[A-Z0-9_-]+$/).test(value);
    },

    isAlphaDashLower: function(value) {
        if (value == '') return true;

        return (/^[a-z0-9_-]+$/).test(value);
    },

    isSsn: function(value) {
        value = value.replace(/-/g, '');
        if (value == '') return true;

        if ((/[0-9]{2}[01]{1}[0-9]{1}[0123]{1}[0-9]{1}[1234]{1}[0-9]{6}$/).test(value) === false) {
            return false;
        }

        var sum = 0;
        var last = value.charCodeAt(12) - 0x30;
        var bases = "234567892345";
        for (var i = 0; i < 12; i++) {
            sum += (value.charCodeAt(i) - 0x30) * (bases.charCodeAt(i) - 0x30);
        };
        var mod = sum % 11;

        if ((11 - mod) % 10 != last) {
            return false;
        }

        return true;
    },

    isForeignerNo: function(value) {
        value = value.replace(/-/g, '');
        if (value == '') return true;

        if ((/[0-9]{2}[01]{1}[0-9]{1}[0123]{1}[0-9]{1}[5678]{1}[0-9]{1}[02468]{1}[0-9]{2}[6789]{1}[0-9]{1}$/).test(value) === false) {
            return false;
        }

        var sum = 0;
        var last = value.charCodeAt(12) - 0x30;
        var bases = "234567892345";
        for (var i = 0; i < 12; i++) {
            sum += (value.charCodeAt(i) - 0x30) * (bases.charCodeAt(i) - 0x30);
        };
        var mod = sum % 11;
        if ((11 - mod + 2) % 10 != last) {
            return false;
        }

        return true;
    },

    isBizNo: function(value) {
        value = value.replace(/-/g, '');
        if (value == '') return true;

        if ((/[0-9]{3}[0-9]{2}[0-9]{5}$/).test(value) === false) {
            return false;
        }

        var sum = parseInt(value.charAt(0));
        var chkno = [0, 3, 7, 1, 3, 7, 1, 3];
        for (var i = 1; i < 8; i++) {
            sum += (parseInt(value.charAt(i)) * chkno[i]) % 10;
        }
        sum += Math.floor(parseInt(parseInt(value.charAt(8))) * 5 / 10);
        sum += (parseInt(value.charAt(8)) * 5) % 10 + parseInt(value.charAt(9));

        if (sum % 10 != 0) {
            return false;
        }

        return true;
    },

    isJuriNo: function(value) {
        value = value.replace(/-/g, '');
        if (value == '') return true;

        if ((/^([0-9]{6})-?([0-9]{7})$/).test(value) === false) {
            return false;
        }

        var sum = 0;
        var last = parseInt(value.charAt(12), 10);
        for (var i = 0; i < 12; i++) {
            if (i % 2 == 0) { // * 1
                sum += parseInt(value.charAt(i), 10);
            } else { // * 2
                sum += parseInt(value.charAt(i), 10) * 2;
            };
        };

        var mod = sum % 10;
        if ((10 - mod) % 10 != last) {
            return false;
        }

        return true;
    },

    isPhone: function(value) {
        value = value.replace(/-/g, '');
        if (value == '') return true;

        return (/^(02|0[0-9]{2,3})[1-9]{1}[0-9]{2,3}[0-9]{4}$/).test(value);
    },

    isMobile: function(value) {
        value = value.replace(/-/g, '');
        if (value == '') return true;

        return (/^01[016789][1-9]{1}[0-9]{2,3}[0-9]{4}$/).test(value);
    },

    isZipcode: function(value) {
        value = value.replace(/-/g, '');
        if (value == '') return true;

        return (/^[0-9]{3}[0-9]{3}$/).test(value);
    },

    isIp: function(value) {
        if (value == '') return true;

        return (/^([1-9]|[1-9][0-9]|1[0-9][0-9]|2[0-4][0-9]|25[0-5])(\.([0-9]|[1-9][0-9]|1[0-9][0-9]|2[0-4][0-9]|25[0-5])){2,}$/).test(value);
    },

    isEmail: function(value) {
        if (value == '') return true;

        return (/^([a-z0-9\_\-\.]+)@([a-z0-9\_\-]+\.)+[a-z]{2,6}$/i).test(value);
    },

    isUrl: function(value) {
        if (value == '') return true;

        return (/http[s]?:\/\/[a-z0-9_\-]+(\.[a-z0-9_\-]+)+/i).test(value);
    },

    isDate: function(value) {
        value = value.replace(/-/g, '');
        if (value == '') return true;

        return (/^[12][0-9]{3}(([0]?[1-9])|([1][012]))[0-3]?[0-9]$/).test(value);
    },

    isPassport: function(value) {
        if (value == '') return true;

        //일반 여권
        if ((/^[A-Z]{2}[0-9]{7}$/).test(value) === true) {
            return true;
        }

        //전자 여권
        if ((/^[A-Z]{1}[0-9]{8}$/).test(value) === true) {
            return true;
        }

        return false;
    },

    isNumberMin: function(value, limit) {
        value = this.parent.Helper.getNumberConv(value);
        limit = this.parent.Helper.getNumberConv(limit);

        if (value < limit) {
            return false;
        }

        return true;
    },

    isNumberMax: function(value, limit) {
        value = this.parent.Helper.getNumberConv(value);
        limit = this.parent.Helper.getNumberConv(limit);

        if (value > limit) {
            return false;
        }

        return true;
    },

    isNumberRange: function(value, min, max) {
        value = this.parent.Helper.getNumberConv(value);

        min = this.parent.Helper.getNumberConv(min);
        max = this.parent.Helper.getNumberConv(max);

        if (value < min || value > max) {
            return false;
        }

        return true;
    }
};

/**
 * FwValidator.Filter
 *
 * @package     jquery
 * @subpackage  validator
 */

FwValidator.Filter = {

    parent: FwValidator,

    isFill: function(Response, cond) {
        if (typeof cond != 'string') {
            var count = cond.length;
            var result = this.parent.Helper.getResult(Response, parent.CODE_SUCCESS);

            for (var i = 0; i < count; ++i) {
                result = this._fillConditionCheck(Response, cond[i]);

                if (result.passed === true) {
                    return result;
                }
            }

            return result;
        }

        return this._fillConditionCheck(Response, cond);
    },

    isMatch: function(Response, sField) {
        if (Response.elmCurrValue == '') {
            return this.parent.Helper.getResult(Response, this.parent.CODE_SUCCESS);
        }

        //Radio 나 Checkbox의 경우 무시
        if (Response.elmCurrFieldType == 'radio' || Response.elmCurrFieldType == 'checkbox') {
            return this.parent.Helper.getResult(Response, this.parent.CODE_SUCCESS);
        }

        var elmTarget = $('#' + sField);
        var elmTargetValue = elmTarget.val();

        if (Response.elmCurrValue != elmTargetValue) {
            var label = elmTarget.attr(this.parent.ATTR_LABEL);
            var match = label ? label : sField;

            Response.elmCurrErrorMsg = Response.elmCurrErrorMsg.replace(/\{match\}/i, match);

            return this.parent.Helper.getResult(Response, this.parent.CODE_FAIL);
        }

        return this.parent.Helper.getResult(Response, this.parent.CODE_SUCCESS);
    },

    isMax: function(Response, iLen) {
        var result = this.parent.Helper.getResult(Response, this.parent.CODE_SUCCESS);

        if (Response.elmCurrFieldType == 'radio' || Response.elmCurrFieldType == 'checkbox') {
            var chkCount = 0;
            var sName = Response.elmCurrField.attr('name');

            $('input[name="' + sName + '"]').each(function(i) {
                if ($(this).get(0).checked === true) {
                    ++chkCount;
                }
            });

            if (chkCount > iLen) {
                result = this.parent.Helper.getResult(Response, this.parent.CODE_FAIL);
            }

        } else {
            var len = Response.elmCurrValue.length;

            if (len > iLen) {
                result = this.parent.Helper.getResult(Response, this.parent.CODE_FAIL);
            }
        }

        if (result.passed === this.parent.CODE_FAIL) {
            result.msg = result.msg.replace(/\{max\}/i, iLen);
        }

        return result;
    },

    isMin: function(Response, iLen) {
        var result = this.parent.Helper.getResult(Response, this.parent.CODE_SUCCESS);

        if (Response.elmCurrFieldType == 'radio' || Response.elmCurrFieldType == 'checkbox') {
            var chkCount = 0;
            var sName = Response.elmCurrField.attr('name');

            $('input[name="' + sName + '"]').each(function(i) {
                if ($(this).get(0).checked === true) {
                    ++chkCount;
                }
            });

            if (chkCount < iLen) {
                result = this.parent.Helper.getResult(Response, this.parent.CODE_FAIL);
            }

        } else {
            var len = Response.elmCurrValue.length;

            if (len < iLen) {
                result = this.parent.Helper.getResult(Response, this.parent.CODE_FAIL);
            }
        }

        if (result.passed === this.parent.CODE_FAIL) {
            result.msg = result.msg.replace(/\{min\}/i, iLen);
        }

        return result;
    },

    isNumber: function(Response, iCond) {
        var result = this.parent.Verify.isNumber(Response.elmCurrValue, iCond);

        if (result === false) {
            return this.parent.Helper.getResult(Response, this.parent.CODE_FAIL);
        }

        return this.parent.Helper.getResult(Response, this.parent.CODE_SUCCESS);
    },

    isIdentity: function(Response) {
        var result = this.parent.Verify.isIdentity(Response.elmCurrValue);

        if (result === false) {
            return this.parent.Helper.getResult(Response, this.parent.CODE_FAIL);
        }

        return this.parent.Helper.getResult(Response, this.parent.CODE_SUCCESS);
    },

    isKorean: function(Response) {
        var result = this.parent.Verify.isKorean(Response.elmCurrValue);

        if (result === false) {
            return this.parent.Helper.getResult(Response, this.parent.CODE_FAIL);
        }

        return this.parent.Helper.getResult(Response, this.parent.CODE_SUCCESS);
    },

    isAlpha: function(Response) {
        var result = this.parent.Verify.isAlpha(Response.elmCurrValue);

        if (result === false) {
            return this.parent.Helper.getResult(Response, this.parent.CODE_FAIL);
        }

        return this.parent.Helper.getResult(Response, this.parent.CODE_SUCCESS);
    },

    isAlphaLower: function(Response) {
        var result = this.parent.Verify.isAlphaLower(Response.elmCurrValue);

        if (result === false) {
            return this.parent.Helper.getResult(Response, this.parent.CODE_FAIL);
        }

        return this.parent.Helper.getResult(Response, this.parent.CODE_SUCCESS);
    },

    isAlphaUpper: function(Response) {
        var result = this.parent.Verify.isAlphaUpper(Response.elmCurrValue);

        if (result === false) {
            return this.parent.Helper.getResult(Response, this.parent.CODE_FAIL);
        }

        return this.parent.Helper.getResult(Response, this.parent.CODE_SUCCESS);
    },

    isAlphaNum: function(Response) {
        var result = this.parent.Verify.isAlphaNum(Response.elmCurrValue);

        if (result === false) {
            return this.parent.Helper.getResult(Response, this.parent.CODE_FAIL);
        }

        return this.parent.Helper.getResult(Response, this.parent.CODE_SUCCESS);
    },

    isAlphaNumLower: function(Response) {
        var result = this.parent.Verify.isAlphaNumLower(Response.elmCurrValue);

        if (result === false) {
            return this.parent.Helper.getResult(Response, this.parent.CODE_FAIL);
        }

        return this.parent.Helper.getResult(Response, this.parent.CODE_SUCCESS);
    },

    isAlphaNumUpper: function(Response) {
        var result = this.parent.Verify.isAlphaNumUpper(Response.elmCurrValue);

        if (result === false) {
            return this.parent.Helper.getResult(Response, this.parent.CODE_FAIL);
        }

        return this.parent.Helper.getResult(Response, this.parent.CODE_SUCCESS);
    },

    isAlphaDash: function(Response) {
        var result = this.parent.Verify.isAlphaDash(Response.elmCurrValue);

        if (result === false) {
            return this.parent.Helper.getResult(Response, this.parent.CODE_FAIL);
        }

        return this.parent.Helper.getResult(Response, this.parent.CODE_SUCCESS);
    },

    isAlphaDashLower: function(Response) {
        var result = this.parent.Verify.isAlphaDashLower(Response.elmCurrValue);

        if (result === false) {
            return this.parent.Helper.getResult(Response, this.parent.CODE_FAIL);
        }

        return this.parent.Helper.getResult(Response, this.parent.CODE_SUCCESS);
    },

    isAlphaDashUpper: function(Response) {
        var result = this.parent.Verify.isAlphaDashUpper(Response.elmCurrValue);

        if (result === false) {
            return this.parent.Helper.getResult(Response, this.parent.CODE_FAIL);
        }

        return this.parent.Helper.getResult(Response, this.parent.CODE_SUCCESS);
    },

    isSsn: function(Response) {
        var result = this.parent.Verify.isSsn(Response.elmCurrValue);

        if (result === false) {
            return this.parent.Helper.getResult(Response, this.parent.CODE_FAIL);
        }

        return this.parent.Helper.getResult(Response, this.parent.CODE_SUCCESS);
    },

    isForeignerNo: function(Response) {
        var result = this.parent.Verify.isForeignerNo(Response.elmCurrValue);

        if (result === false) {
            return this.parent.Helper.getResult(Response, this.parent.CODE_FAIL);
        }

        return this.parent.Helper.getResult(Response, this.parent.CODE_SUCCESS);
    },

    isBizNo: function(Response) {
        var result = this.parent.Verify.isBizNo(Response.elmCurrValue);

        if (result === false) {
            return this.parent.Helper.getResult(Response, this.parent.CODE_FAIL);
        }

        return this.parent.Helper.getResult(Response, this.parent.CODE_SUCCESS);
    },

    isJuriNo: function(Response) {
        var result = this.parent.Verify.isJuriNo(Response.elmCurrValue);

        if (result === false) {
            return this.parent.Helper.getResult(Response, this.parent.CODE_FAIL);
        }

        return this.parent.Helper.getResult(Response, this.parent.CODE_SUCCESS);
    },

    isPhone: function(Response) {
        var result = this.parent.Verify.isPhone(Response.elmCurrValue);

        if (result === false) {
            return this.parent.Helper.getResult(Response, this.parent.CODE_FAIL);
        }

        return this.parent.Helper.getResult(Response, this.parent.CODE_SUCCESS);
    },

    isMobile: function(Response) {
        var result = this.parent.Verify.isMobile(Response.elmCurrValue);

        if (result === false) {
            return this.parent.Helper.getResult(Response, this.parent.CODE_FAIL);
        }

        return this.parent.Helper.getResult(Response, this.parent.CODE_SUCCESS);
    },

    isZipcode: function(Response) {
        var result = this.parent.Verify.isZipcode(Response.elmCurrValue);

        if (result === false) {
            return this.parent.Helper.getResult(Response, this.parent.CODE_FAIL);
        }

        return this.parent.Helper.getResult(Response, this.parent.CODE_SUCCESS);
    },

    isIp: function(Response) {
        var result = this.parent.Verify.isIp(Response.elmCurrValue);

        if (result === false) {
            return this.parent.Helper.getResult(Response, this.parent.CODE_FAIL);
        }

        return this.parent.Helper.getResult(Response, this.parent.CODE_SUCCESS);
    },

    isEmail: function(Response) {
        var result = this.parent.Verify.isEmail(Response.elmCurrValue);

        if (result === false) {
            return this.parent.Helper.getResult(Response, this.parent.CODE_FAIL);
        }

        return this.parent.Helper.getResult(Response, this.parent.CODE_SUCCESS);
    },

    isUrl: function(Response) {
        var result = this.parent.Verify.isUrl(Response.elmCurrValue);

        if (result === false) {
            return this.parent.Helper.getResult(Response, this.parent.CODE_FAIL);
        }

        return this.parent.Helper.getResult(Response, this.parent.CODE_SUCCESS);
    },

    isDate: function(Response) {
        var result = this.parent.Verify.isDate(Response.elmCurrValue);

        if (result === false) {
            return this.parent.Helper.getResult(Response, this.parent.CODE_FAIL);
        }

        return this.parent.Helper.getResult(Response, this.parent.CODE_SUCCESS);
    },

    isRegex: function(Response, regex) {
        regex = eval(regex);

        if (regex.test(Response.elmCurrValue) === false) {
            return this.parent.Helper.getResult(Response, this.parent.CODE_FAIL);
        }

        return this.parent.Helper.getResult(Response, this.parent.CODE_SUCCESS);
    },

    isPassport: function(Response) {
        var result = this.parent.Verify.isPassport(Response.elmCurrValue);

        if (result === false) {
            return this.parent.Helper.getResult(Response, this.parent.CODE_FAIL);
        }

        return this.parent.Helper.getResult(Response, this.parent.CODE_SUCCESS);
    },

    isSimplexEditorFill: function(Response) {

        var result = eval(Response.elmCurrValue + ".isEmptyContent();");

        if (result === true) {
            return this.parent.Helper.getResult(Response, this.parent.CODE_FAIL);
        }

        return this.parent.Helper.getResult(Response, this.parent.CODE_SUCCESS);

    },

    isMaxByte: function(Response, iLen) {
        var result = this.parent.Helper.getResult(Response, this.parent.CODE_SUCCESS);

        var len = this.parent.Helper.getByte(Response.elmCurrValue);

        if (len > iLen) {
            result = this.parent.Helper.getResult(Response, this.parent.CODE_FAIL);
            result.msg = result.msg.replace(/\{max\}/i, iLen);
        }

        return result;
    },

    isMinByte: function(Response, iLen) {
        var result = this.parent.Helper.getResult(Response, this.parent.CODE_SUCCESS);

        var len = this.parent.Helper.getByte(Response.elmCurrValue);

        if (len < iLen) {
            result = this.parent.Helper.getResult(Response, this.parent.CODE_FAIL);
            result.msg = result.msg.replace(/\{min\}/i, iLen);
        }

        return result;
    },

    isByteRange: function(Response, range) {
        var result = this.parent.Helper.getResult(Response, this.parent.CODE_SUCCESS);

        var rangeInfo = this._getRangeNum(range);
        var iMin = rangeInfo.min;
        var iMax = rangeInfo.max;

        var len = this.parent.Helper.getByte(Response.elmCurrValue);

        if (len < iMin || len > iMax) {
            result = this.parent.Helper.getResult(Response, this.parent.CODE_FAIL);
            result.msg = result.msg.replace(/\{min\}/i, iMin);
            result.msg = result.msg.replace(/\{max\}/i, iMax);
        }

        return result;
    },

    isLengthRange: function(Response, range) {
        var result = this.parent.Helper.getResult(Response, this.parent.CODE_SUCCESS);

        var rangeInfo = this._getRangeNum(range);
        var iMin = rangeInfo.min;
        var iMax = rangeInfo.max;

        var resultMin = this.isMin(Response, iMin);
        var resultMax = this.isMax(Response, iMax);

        if (resultMin.passed === this.parent.CODE_FAIL || resultMax.passed === this.parent.CODE_FAIL) {
            result = this.parent.Helper.getResult(Response, this.parent.CODE_FAIL);
            result.msg = result.msg.replace(/\{min\}/i, iMin);
            result.msg = result.msg.replace(/\{max\}/i, iMax);
        }

        return result;
    },

    isNumberMin: function(Response, iLimit) {
        var check = this.parent.Verify.isNumberMin(Response.elmCurrValue, iLimit);
        var result = this.parent.Helper.getResult(Response, this.parent.CODE_SUCCESS);

        if (check === false) {
            result = this.parent.Helper.getResult(Response, this.parent.CODE_FAIL);
            result.msg = result.msg.replace(/\{min\}/i, iLimit);
        }

        return result;
    },

    isNumberMax: function(Response, iLimit) {
        var check = this.parent.Verify.isNumberMax(Response.elmCurrValue, iLimit);
        var result = this.parent.Helper.getResult(Response, this.parent.CODE_SUCCESS);

        if (check === false) {
            result = this.parent.Helper.getResult(Response, this.parent.CODE_FAIL);
            result.msg = result.msg.replace(/\{max\}/i, iLimit);
        }

        return result;
    },

    isNumberRange: function(Response, range) {
        var iMin = range[0];
        var iMax = range[1];

        var check = this.parent.Verify.isNumberRange(Response.elmCurrValue, iMin, iMax);
        var result = this.parent.Helper.getResult(Response, this.parent.CODE_SUCCESS);

        if (check === false) {
            result = this.parent.Helper.getResult(Response, this.parent.CODE_FAIL);
            result.msg = result.msg.replace(/\{min\}/i, iMin);
            result.msg = result.msg.replace(/\{max\}/i, iMax);
        }

        return result;
    },

    _getRangeNum: function(range) {
        var result = {};

        result.min = range[0] <= 0 ? 0 : parseInt(range[0]);
        result.max = range[1] <= 0 ? 0 : parseInt(range[1]);

        return result;
    },

    _fillConditionCheck: function(Response, cond) {
        cond = $.trim(cond);

        var parent = this.parent;

        //조건식이 들어오면 조건식에 맞을 경우만 필수값을 체크함
        if (cond) {
            var conditions = cond.split('=');
            var fieldId = $.trim(conditions[0]);
            var fieldVal = $.trim(conditions[1]);

            try {
                var val = parent.Helper.getValue(Response.formId, $('#' + fieldId));
                val = $.trim(val);

                if (fieldVal != val) {
                    return parent.Helper.getResult(Response, parent.CODE_SUCCESS);
                }
            } catch (e) {
                if (parent.DEBUG_MODE == true) {
                    Response.elmCurrErrorMsg = parent.msgs['isFillError'];
                    Response.elmCurrErrorMsg = Response.elmCurrErrorMsg.replace(/\{condition\}/i, cond);
                    return parent.Helper.getResult(Response, parent.CODE_FAIL);
                }

                return parent.Helper.getResult(Response, parent.CODE_SUCCESS);
            }
        }

        //Radio 나 Checkbox의 경우 선택한값이 있는지 여부를 체크함
        if (Response.elmCurrFieldType == 'radio' || Response.elmCurrFieldType == 'checkbox') {

            var sName = Response.elmCurrField.attr('name');
            var result = parent.Helper.getResult(Response, parent.CODE_FAIL);

            $('input[name="' + sName + '"]').each(function(i) {
                if ($(this).get(0).checked === true) {
                    result = parent.Helper.getResult(Response, parent.CODE_SUCCESS);
                }
            });

            return result;

        }

        //일반 텍스트 박스
        if (Response.elmCurrValue != '') {
            return parent.Helper.getResult(Response, parent.CODE_SUCCESS);
        }

        return parent.Helper.getResult(Response, parent.CODE_FAIL);
    }
};

FwValidator.msgs = {

    //기본
    'isFill': '{label} 항목은 필수 입력값입니다.',

    'isNumber': '{label} 항목이 숫자 형식이 아닙니다.',

    'isEmail': '{label} 항목이 이메일 형식이 아닙니다.',

    'isIdentity': '{label} 항목이 아이디 형식이 아닙니다.',

    'isMax': '{label} 항목이 {max}자(개) 이하로 해주십시오.',

    'isMin': '{label} 항목이 {min}자(개) 이상으로 해주십시오 .',

    'isRegex': '{label} 항목이 올바른 입력값이 아닙니다.',

    'isAlpha': '{label} 항목이 영문이 아닙니다',

    'isAlphaLower': '{label} 항목이 영문 소문자 형식이 아닙니다',

    'isAlphaUpper': '{label} 항목이 영문 대문자 형식이 아닙니다',

    'isAlphaNum': '{label} 항목이 영문이나 숫자 형식이 아닙니다.',

    'isAlphaNumLower': '{label} 항목이 영문 소문자 혹은 숫자 형식이 아닙니다.',

    'isAlphaNumUpper': '{label} 항목이 영문 대문자 혹은 숫자 형식이 아닙니다.',

    'isAlphaDash': '{label} 항목이 [영문,숫자,_,-] 형식이 아닙니다.',

    'isAlphaDashLower': '{label} 항목이 [영문 소문자,숫자,_,-] 형식이 아닙니다.',

    'isAlphaDashUpper': '{label} 항목이 [영문 대문자,숫자,_,-] 형식이 아닙니다.',

    'isKorean': '{label} 항목이 한국어 형식이 아닙니다.',

    'isUrl': '{label} 항목이 URL 형식이 아닙니다.',

    'isSsn': '{label} 항목이 주민등록번호 형식이 아닙니다.',

    'isForeignerNo': '{label} 항목이 외국인등록번호 형식이 아닙니다.',

    'isBizNo': '{label} 항목이 사업자번호 형식이 아닙니다.',

    'isPhone': '{label} 항목이 전화번호 형식이 아닙니다.',

    'isMobile': '{label} 항목이 핸드폰 형식이 아닙니다.',

    'isZipcode': '{label} 항목이 우편번호 형식이 아닙니다.',

    'isJuriNo': '{label} 항목이 법인번호 형식이 아닙니다.',

    'isIp': '{label} 항목이 아이피 형식이 아닙니다.',

    'isDate': '{label} 항목이 날짜 형식이 아닙니다.',

    'isMatch': '{label} 항목과 {match} 항목이 같지 않습니다.',

    'isSuccess': '{label} 항목의 데이터는 전송할 수 없습니다.',

    'isSimplexEditorFill': '{label}(을/를) 입력하세요',

    'isPassport': '{label} 항목이 여권번호 형식이 아닙니다.',

    'isMaxByte': '{label} 항목은 {max}bytes 이하로 해주십시오.',

    'isMinByte': '{label} 항목은 {min}bytes 이상으로 해주십시오.',

    'isByteRange': '{label} 항목은 {min} ~ {max}bytes 범위로 해주십시오.',

    'isLengthRange': '{label} 항목은 {min} ~ {max}자(개) 범위로 해주십시오.',

    'isNumberMin': '{label} 항목은 {min} 이상으로 해주십시오.',

    'isNumberMax': '{label} 항목은 {max} 이하로 해주십시오.',

    'isNumberRange': '{label} 항목은 {min} ~ {max} 범위로 해주십시오.',


    //디버깅
    'notMethod': '{label} 항목에 존재하지 않는 필터를 사용했습니다.',

    'isFillError': "[{label}] 필드의 isFill {condition} 문장이 잘못되었습니다.\r\n해당 필드의 아이디를 확인하세요."

};

FwValidator.Handler.overrideMsgs({

    //기본
    'isFill': sprintf(__('%s 항목은 필수 입력값입니다.'), '{label}'),

    'isNumber': sprintf(__('%s 항목이 숫자 형식이 아닙니다.'), '{label}'),

    'isEmail': sprintf(__('%s 항목이 이메일 형식이 아닙니다.'), '{label}'),

    'isIdentity': sprintf(__('%s 항목이 아이디 형식이 아닙니다.'), '{label}'),

    'isMax': sprintf(__('%1$s 항목이 %2$s자(개) 이하로 해주십시오.'), '{label}', '{max}'),

    'isMin': sprintf(__('%1$s 항목이 %2$s자(개) 이상으로 해주십시오.'), '{label}', '{min}'),

    'isRegex': sprintf(__('%s 항목이 올바른 입력값이 아닙니다.'), '{label}'),

    'isAlpha': sprintf(__('%s 항목이 영문이 아닙니다.'), '{label}'),

    'isAlphaLower': sprintf(__('%s 항목이 영문 소문자 형식이 아닙니다.'), '{label}'),

    'isAlphaUpper': sprintf(__('%s 항목이 영문 대문자 형식이 아닙니다.'), '{label}'),

    'isAlphaNum': sprintf(__('%s 항목이 영문이나 숫자 형식이 아닙니다.'), '{label}'),

    'isAlphaNumLower': sprintf(__('%s 항목이 영문 소문자 혹은 숫자 형식이 아닙니다.'), '{label}'),

    'isAlphaNumUpper': sprintf(__('%s 항목이 영문 대문자 혹은 숫자 형식이 아닙니다.'), '{label}'),

    'isAlphaDash': sprintf(__('%s 항목이 [영문,숫자,_,-] 형식이 아닙니다.'), '{label}'),

    'isAlphaDashLower': sprintf(__('%s 항목이 [영문 소문자,숫자,_,-] 형식이 아닙니다.'), '{label}'),

    'isAlphaDashUpper': sprintf(__('%s 항목이 [영문 대문자,숫자,_,-] 형식이 아닙니다.'), '{label}'),

    'isKorean': sprintf(__('%s 항목이 한국어 형식이 아닙니다.'), '{label}'),

    'isUrl': sprintf(__('%s 항목이 URL 형식이 아닙니다.'), '{label}'),

    'isSsn': sprintf(__('%s 항목이 주민등록번호 형식이 아닙니다.'), '{label}'),

    'isForeignerNo': sprintf(__('%s 항목이 외국인등록번호 형식이 아닙니다.'), '{label}'),

    'isBizNo': sprintf(__('%s 항목이 사업자번호 형식이 아닙니다.'), '{label}'),

    'isPhone': sprintf(__('%s 항목이 전화번호 형식이 아닙니다.'), '{label}'),

    'isMobile': sprintf(__('%s 항목이 핸드폰 형식이 아닙니다.'), '{label}'),

    'isZipcode': sprintf(__('%s 항목이 우편번호 형식이 아닙니다.'), '{label}'),

    'isJuriNo': sprintf(__('%s 항목이 법인번호 형식이 아닙니다.'), '{label}'),

    'isIp': sprintf(__('%s 항목이 아이피 형식이 아닙니다.'), '{label}'),

    'isDate': sprintf(__('%s 항목이 날짜 형식이 아닙니다.'), '{label}'),

    'isMatch': sprintf(__('%1$s 항목과 %2$s 항목이 같지 않습니다.'), '{label}', '{match}'),

    'isSuccess': sprintf(__('%s 항목의 데이터는 전송할 수 없습니다.'), '{label}'),

    'isSimplexEditorFill': sprintf(__('%s(을/를) 입력하세요.'), '{label}'),

    'isPassport': sprintf(__('%s 항목이 여권번호 형식이 아닙니다.'), '{label}'),

    'isMaxByte': sprintf(__('%1$s 항목은 %2$sbytes 이하로 해주십시오.'), '{label}', '{max}'),

    'isMinByte': sprintf(__('%1$s 항목은 %2$sbytes 이상으로 해주십시오.'), '{label}', '{min}'),

    'isByteRange': sprintf(__('%1$s 항목은 %2$s ~ %3$sbytes 범위로 해주십시오.'), '{label}', '{min}', '{max}'),

    'isLengthRange': sprintf(__('%1$s 항목은 %2$s ~ %3$s자(개) 범위로 해주십시오.'), '{label}', '{min}', '{max}'),

    'isNumberMin': sprintf(__('%1$s 항목은 %2$s 이상으로 해주십시오.'), '{label}', '{min}'),

    'isNumberMax': sprintf(__('%1$s 항목은 %2$s 이하로 해주십시오.'), '{label}', '{max}'),

    'isNumberRange': sprintf(__('%1$s 항목은 %2$s ~ %3$s 범위로 해주십시오.'), '{label}', '{min}', '{max}'),


    //디버깅
    'notMethod': sprintf(__('%s 항목에 존재하지 않는 필터를 사용했습니다.'), '{label}'),

    'isFillError': sprintf(__('[%1$s] 필드의 isFill %2$s 문장이 잘못되었습니다.\r\n해당 필드의 아이디를 확인하세요.'), '{label}', '{condition}')

});
/**
 * jQuery JSON Plugin
 * version: 2.3 (2011-09-17)
 *
 * This document is licensed as free software under the terms of the
 * MIT License: http://www.opensource.org/licenses/mit-license.php
 *
 * Brantley Harris wrote this plugin. It is based somewhat on the JSON.org
 * website's http://www.json.org/json2.js, which proclaims:
 * "NO WARRANTY EXPRESSED OR IMPLIED. USE AT YOUR OWN RISK.", a sentiment that
 * I uphold.
 *
 * It is also influenced heavily by MochiKit's serializeJSON, which is
 * copyrighted 2005 by Bob Ippolito.
 */

(function($) {

    var escapeable = /["\\\x00-\x1f\x7f-\x9f]/g,
        meta = {
            '\b': '\\b',
            '\t': '\\t',
            '\n': '\\n',
            '\f': '\\f',
            '\r': '\\r',
            '"': '\\"',
            '\\': '\\\\'
        };

    /**
     * jQuery.toJSON
     * Converts the given argument into a JSON respresentation.
     *
     * @param o {Mixed} The json-serializble *thing* to be converted
     *
     * If an object has a toJSON prototype, that will be used to get the representation.
     * Non-integer/string keys are skipped in the object, as are keys that point to a
     * function.
     *
     */
    $.toJSON = typeof JSON === 'object' && JSON.stringify ? JSON.stringify : function(o) {

        if (o === null) {
            return 'null';
        }

        var type = typeof o;

        if (type === 'undefined') {
            return undefined;
        }
        if (type === 'number' || type === 'boolean') {
            return '' + o;
        }
        if (type === 'string') {
            return $.quoteString(o);
        }
        if (type === 'object') {
            if (typeof o.toJSON === 'function') {
                return $.toJSON(o.toJSON());
            }
            if (o.constructor === Date) {
                var month = o.getUTCMonth() + 1,
                    day = o.getUTCDate(),
                    year = o.getUTCFullYear(),
                    hours = o.getUTCHours(),
                    minutes = o.getUTCMinutes(),
                    seconds = o.getUTCSeconds(),
                    milli = o.getUTCMilliseconds();

                if (month < 10) {
                    month = '0' + month;
                }
                if (day < 10) {
                    day = '0' + day;
                }
                if (hours < 10) {
                    hours = '0' + hours;
                }
                if (minutes < 10) {
                    minutes = '0' + minutes;
                }
                if (seconds < 10) {
                    seconds = '0' + seconds;
                }
                if (milli < 100) {
                    milli = '0' + milli;
                }
                if (milli < 10) {
                    milli = '0' + milli;
                }
                return '"' + year + '-' + month + '-' + day + 'T' +
                    hours + ':' + minutes + ':' + seconds +
                    '.' + milli + 'Z"';
            }
            if (o.constructor === Array) {
                var ret = [];
                for (var i = 0; i < o.length; i++) {
                    ret.push($.toJSON(o[i]) || 'null');
                }
                return '[' + ret.join(',') + ']';
            }
            var name,
                val,
                pairs = [];
            for (var k in o) {
                type = typeof k;
                if (type === 'number') {
                    name = '"' + k + '"';
                } else if (type === 'string') {
                    name = $.quoteString(k);
                } else {
                    // Keys must be numerical or string. Skip others
                    continue;
                }
                type = typeof o[k];

                if (type === 'function' || type === 'undefined') {
                    // Invalid values like these return undefined
                    // from toJSON, however those object members
                    // shouldn't be included in the JSON string at all.
                    continue;
                }
                val = $.toJSON(o[k]);
                pairs.push(name + ':' + val);
            }
            return '{' + pairs.join(',') + '}';
        }
    };

    /**
     * jQuery.evalJSON
     * Evaluates a given piece of json source.
     *
     * @param src {String}
     */
    $.evalJSON = typeof JSON === 'object' && JSON.parse ? JSON.parse : function(src) {
        return eval('(' + src + ')');
    };

    /**
     * jQuery.secureEvalJSON
     * Evals JSON in a way that is *more* secure.
     *
     * @param src {String}
     */
    $.secureEvalJSON = typeof JSON === 'object' && JSON.parse ? JSON.parse : function(src) {

        var filtered =
            src
            .replace(/\\["\\\/bfnrtu]/g, '@')
            .replace(/"[^"\\\n\r]*"|true|false|null|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?/g, ']')
            .replace(/(?:^|:|,)(?:\s*\[)+/g, '');

        if (/^[\],:{}\s]*$/.test(filtered)) {
            return eval('(' + src + ')');
        } else {
            throw new SyntaxError('Error parsing JSON, source is not valid.');
        }
    };

    /**
     * jQuery.quoteString
     * Returns a string-repr of a string, escaping quotes intelligently.
     * Mostly a support function for toJSON.
     * Examples:
     * >>> jQuery.quoteString('apple')
     * "apple"
     *
     * >>> jQuery.quoteString('"Where are we going?", she asked.')
     * "\"Where are we going?\", she asked."
     */
    $.quoteString = function(string) {
        if (string.match(escapeable)) {
            return '"' + string.replace(escapeable, function(a) {
                var c = meta[a];
                if (typeof c === 'string') {
                    return c;
                }
                c = a.charCodeAt();
                return '\\u00' + Math.floor(c / 16).toString(16) + (c % 16).toString(16);
            }) + '"';
        }
        return '"' + string + '"';
    };

})(jQuery);

/**
 * 상품연동형 js - for 프론트
 */


;
(function($) {

    var $Olnk = {
        iOlinkTotalPrice: 0, // 저장형 옵션의 가격
        iAddOptionTotalPrice: 0, // 추가 구성상품의 가격
        aOptionData: new Array(), // 순차적 로딩을 위한 배열
        iOptionAddNum: 1, // 필수값을 표시하기 위한 번호
        iOptionAddProductNum: 1,
        aOptionAddProductNum: new Array(),
        aOptionProductData: new Array(),
        aOptionProductDataListKey: new Array(),
        bAllSelectedOption: false,
        /**
         * 최종가격 표시 핸들링 - 상품상세
         */
        handleTotalPrice: function(sOptionStockData, iProductPrice, sDispNonePrice, bButton) {
            var aStockData = $.parseJSON(sOptionStockData);
            var iPrdPrice = SHOP_PRICE.toShopPrice(iProductPrice);
            var iOptPrice = 0;
            var sOptionId = '';
            var iTotalPrice = 0;
            var iCnt = 1;
            var sQuantity = '(' + sprintf(__('%s개'), iCnt) + ')';
            var sPrice = '';


            // 운영방식설정 > 회원/비회원 가격표시 설정 반영
            if (sDispNonePrice == 'T') {
                iTotalPrice = 0;
            } else {
                $('select[id^="product_option_id"]').each(function() {
                    var iValNo = parseInt($(this).val());

                    if (isNaN(iValNo) === true) {
                        return;
                    }

                    iOptPrice += SHOP_PRICE.toShopPrice(aStockData[iValNo].option_price);
                    sOptionId = iValNo;

                });

                iTotalPrice = iPrdPrice + iOptPrice;
            }


            // 옵션 선택 완료 되었을때 check 
            var aOption = new Array();
            var aRequiredData = new Array();
            var sOptionText = '';
            var aOptionText = new Array();
            var bItemSelected = false,
                bSoldOut = false;
            var iTotalQuantity = 0;
            $('select[id^="' + product_option_id + '"]:visible').each(function() {

                if (Boolean($(this).attr('required')) === false && $(this).val() === '*') {
                    return true;
                }
                aOption.push($(this).val());
            });

            // 전부 선택인 옵션만 있고 선택된 옵션이 없을때 
            if ((Olnk.bAllSelectedOption === true || bButton === true) && aOption.length === 0) {
                bItemSelected = true;
                sOptionId = sProductCode;
            } else if (ITEM.isOptionSelected(aOption) === true) {
                bItemSelected = true;
            }

            // 버튼으로 처리 했을때 선택이 모두 되어 있지 않다면 튕겨 내자 
            if (bButton === true && bItemSelected === false && aOption.length > 0) {
                alert(__('필수 옵션을 선택해주세요.'));
                return false;
            }

            // 추가입력옵션 체크!!
            if (bButton === true && checkAddOption() === false) {
                bItemSelected = false;
            }

            if (bItemSelected === true) {
                var sOptionText = '';
                var iStockNumber = aStockData[sOptionId].stock_number;
                var bStock = aStockData[sOptionId].use_stock;
                var bStockSoldOut = aStockData[sOptionId].use_soldout;
                var sIsDisplay = aStockData[sOptionId].is_display;
                var sIsSelling = aStockData[sOptionId].is_selling;

                if (sIsSelling == 'F' || ((iStockNumber < buy_unit || iStockNumber <= 0) && ((bStock === true && bStockSoldOut === 'T') || sIsDisplay == 'F'))) {
                    bSoldOut = true;
                    sOptionText = ' <span class="soldOut">[' + __('품절') + ']</span>';
                }

                if (bSoldOut === true && isNewProductSkin() === false) {
                    alert(__('이 상품은 현재 재고가 부족하여 판매가 잠시 중단되고 있습니다.') + '\n\n' + __('제품명') + ' : ' + product_name);
                    return;
                }

                // 옵션 선택시 재고 수량이 현재 선택되어진 수량보다 적을 경우 alert처리후에 return합니다.
                $('.option_box_id').each(function(i) {
                    iTotalQuantity += parseInt($('#' + $(this).attr('id').replace('id', 'quantity')).val());
                });

                if (iTotalQuantity > 0) {
                    iTotalQuantity += parseInt(product_min);
                    if (((iStockNumber < iTotalQuantity || iStockNumber <= 0) && ((bStock === true && bStockSoldOut === 'T') || sIsDisplay == 'F'))) {
                        alert(__('재고 수량이 부족하여 더이상 옵션을 추가하실 수 없습니다.'));
                        return;
                    }
                }

                sOptionId = '';
                if ((Olnk.bAllSelectedOption === true || bButton === true) && aOption.length === 0) {
                    $('select[id^="' + product_option_id + '"]:visible').each(function() {
                        sSelectedOptionId = $(this).attr('id');
                        sOptionId += $(this).val() + '_' + $(this).attr('option_code') + '||';
                    });
                    aOptionText.push(__('선택한 옵션 없음'));
                } else {
                    $('select[id^="' + product_option_id + '"]:visible').each(function() {
                        if ($(this).attr('required') === false && $(this).val() === '*') {
                            return true;
                        }
                        if (Olnk.getCheckValue($(this).val(), '') === true) {
                            sSelectedOptionId = $(this).attr('id');
                            aOptionText.push($('#' + sSelectedOptionId + ' option:selected').text());
                        }
                        sOptionId += $(this).val() + '_' + $(this).attr('option_code') + '||';
                    });
                }


                iProductPrice = getProductPrice(product_min, iTotalPrice, sOptionId, bSoldOut, function(iProductPrice) {
                    if (isNewProductSkin() === false) {
                        if (sIsDisplayNonmemberPrice == 'T') {
                            $('#span_product_price_text').html(sNonmemberPrice);
                        } else {
                            $('#span_product_price_text').html(SHOP_PRICE_FORMAT.toShopPrice(iProductPrice));
                        }
                    } else {
                        setOptionBox(sOptionId, (aOptionText.join('/')) + ' ' + sOptionText, iProductPrice, bSoldOut, sSelectedOptionId);
                    }

                });


            }


        },

        /**
         * 장바구니 담기시 필요한 파라미터 생성
         */
        getSelectedItemForBasket: function(sProductCode, oTargets, iQuantity) {
            var options = {};
            var aOptionData, aOptionTmp;
            var bCheckNum = false;
            oTargets.each(function() {
                aOptionData = {};

                if ($(this).val().indexOf('||') >= 0) {
                    aOptionTmp = $(this).val().split('||');
                    for (i = 0; i < aOptionTmp.length; i++) {
                        if (aOptionTmp[i] !== '') {
                            aOptionData = aOptionTmp[i].split('_');
                        }

                        if (Olnk.getCheckValue(aOptionData[0], '') === true) {
                            options[aOptionData[1]] = aOptionData[0];
                            bCheckNum = true;
                        }
                    }
                } else {
                    var optCode = $(this).attr('option_code');
                    var optValNo = parseInt($(this).val());

                    if (optCode == '' || optCode == null) {
                        return null;
                    }
                    if (isNaN(optValNo) === true) {
                        optValNo = '';
                    }

                    if (optValNo !== '') {
                        options[optCode] = optValNo;
                        bCheckNum = true;
                    }

                }
            });


            return {
                'product_code': sProductCode,
                'quantity': iQuantity,
                'options': options,
                'bCheckNum': bCheckNum
            };
        },

        /**
         * 관심상품 담기시 필요한 파라미터 생성
         */
        getSelectedItemForWish: function(sProductCode, oTargets) {
            var options = {};
            var bCheckNum = false;

            var aOptionData, aOptionTmp;
            $(oTargets).each(function() {

                aOptionTmp = $(this).val().split('||');
                aOptionData = {};
                options = {};

                for (i = 0; i < aOptionTmp.length; i++) {
                    if (aOptionTmp[i] !== '') {
                        aOptionData = aOptionTmp[i].split('_');
                    }
                    //if (/^\*+$/.test(aOptionData[0]) === false) {
                    if (Olnk.getCheckValue(aOptionData[0], '') === true) {
                        options[aOptionData[1]] = aOptionData[0];
                        bCheckNum = true;
                    }
                }
            });

            return {
                'product_code': sProductCode,
                'options': options,
                'bCheckNum': bCheckNum
            };
        },

        /**
         * 선택된 품목정보 반환
         * 상품연동형에서는 item_code 가 선택한 옵션을 뜻하지 않으므로
         * 호환성을 위한 모조 값만 할당해준다.
         */
        getMockItemInfo: function(aInfo) {
            var aResult = {
                'product_no': aInfo.product_no,
                'item_code': aInfo.product_code + '000A',
                'opt_id': '000A',
                'opt_str': ''
            };

            return aResult;
        },

        /**
         * 상품연동형 옵션인지 여부 반환
         */
        isLinkageType: function(sOptionType) {
            if (typeof sOptionType == 'string' && sOptionType == 'E') {
                return true;
            }

            return false;
        },

        /**
         * 상품상세(NewProductAction) 관련 js 스크립트를 보면, create_layer 라는 함수가 있다.
         * 해당 함수는 ajax 콜을 해서 레이어 팝업으로 띄울 소스코드를 불러오게 되는데, 이때 스크립트 태그도 같이 따라온다.
         * 해당 스크립트 태그에서 불러오는 js 파일내부에는 동일한 jquery 코드가 다시한번 오버라이딩이 되는데
         * 이렇게 되면 기존에 물려있던 extension 메소드들은 초기화되어 날아가게 된다.
         *
         * 레이어 팝업이 뜨고 나서, $ 내에 존재해야할 메소드나 멤버변수들이 사라졌다면 이와 같은 현상때문이다.
         * 가장 이상적인 처리는 스크립트 태그를 없애는게 가장 좋으나 호출되는 스크립트에 의존적인 코드가 존재하는것으로 보인다.
         * 해당영역이 완전히 파악되기 전까진 필요한 부분에서만 예외적으로 동작할 수 있도록 한다.
         */
        bugfixCreateLayerForWish: function() {
            var __nil = jQuery.noConflict(true);
        },

        /**
         * 장바구니 담기시 필요한 파라미터를 일부 조작
         */
        hookParamForBasket: function(aParam, aInfo) {
            if (aInfo.option_type != 'E') {
                return aParam;
            }

            var aItemCode = this.getSelectedItemForBasket(aInfo.product_code, aInfo.targets, aInfo.quantity);

            aParam['item_code_before'] = '';
            aParam['option_type'] = 'E';
            aParam['selected_item_by_etype[]'] = $.toJSON(aItemCode);

            return aParam;
        },

        /**
         * 관심상품 담기시 필요한 파라미터를 일부 조작
         */
        hookParamForWish: function(aParam, aInfo) {
            if (aInfo.option_type != 'E') {
                return aParam;
            }

            var aItemCode = {};

            //
            // aInfo.targets 는 구스킨을 사용했을 때 출력되는 옵션 셀렉트 박스의 엘리먼트 객체인데,
            // 현재 뉴스킨과 구스킨 구분을 아이디값이 wishlist_option_modify_layer_ 에 해당되는 노드가
            // 있는지로 판별하기 때문에 모호함이 존재한다.  
            // 즉, 뉴스킨을 사용해도 해당 노드가 존재하지 않는 조건이 발생할 수 있기 때문이다.
            // 예를 들면, 관심상품상에 담긴 리스트가 모두 옵션이 없는 상품만 있는 경우이거나 아니면
            // 옵션이 존재하지만 아무것도 선택되지 않은 상품인 경우 발견이 되지 않을 수 있다.
            // 그러므로 이런 경우엔 셀렉트박스를 통해 선택된 옵션을 파악하는 것이 아니라, 
            // 현재 할당되어 있는 데이터를 기준으로 파라미터를 세팅하도록 한다.
            //
            if (aInfo.targets.length > 0) {
                aItemCode = this.getSelectedItemForBasket(aInfo.product_code, aInfo.targets, aInfo.quantity);
            } else {
                aItemCode = aInfo.selected_item_by_etype;
            }

            aParam.push('option_type=E');
            aParam.push('selected_item_by_etype[]=' + $.toJSON(aItemCode));

            return aParam;
        },
        /**
         * 장바구니 담기시 필요한 파라미터 생성 - 구스킨 전용 뉴스킨 사용안함.
         */
        getSelectedItemForBasketOldSkin: function(sProductCode, oTargets, iQuantity) {
            var options = {};
            var optCode = '';
            var optValNo = '';
            var bCheckNum = false;
            oTargets.each(function() {
                optCode = $(this).attr('option_code');
                optValNo = parseInt($(this).val());

                if (optCode == '' || optCode == null) {
                    return null;
                }

                if (isNaN(optValNo) === false) {
                    options[optCode] = $(this).val();
                    bCheckNum = true;
                }
            });

            return {
                'product_code': sProductCode,
                'quantity': iQuantity,
                'options': options,
                'bCheckNum': bCheckNum
            };
        },
        /**
         * 관심상품 담기시 필요한 파라미터 생성
         */
        getSelectedItemForWishOldSkin: function(sProductCode, oTargets) {
            var options = {};
            var isReturn = true;
            var bCheckNum = false;
            oTargets.each(function() {
                if (isReturn === false) {
                    isReturn = false;
                    return;
                }

                var optCode = $(this).attr('option_code');
                var optValNo = parseInt($(this).val());

                //
                // 필수입력값 체크
                // 
                if (Boolean($(this).attr('required')) === true) {
                    if (isNaN(optValNo) === true) {
                        isReturn = false;
                        return false;
                    }
                }

                if (optCode == '' || optCode == null) {
                    isReturn = false;
                    return;
                }

                if (isNaN(optValNo) === false) {
                    options[optCode] = optValNo;
                    bCheckNum = true;
                }
            });

            if (isReturn === true) {
                return {
                    'product_code': sProductCode,
                    'options': options,
                    'bCheckNum': bCheckNum
                };
            }

            return false;
        },
        /**
         * 옵션 순차적 로딩
         * @param oTargets : 실행될 오브젝트
         *          *
         */
        setOptionLording: function(oTargets) {
            var iNum = 0;
            oTargets.each(function() {
                if (iNum > 0) {
                    Olnk.setOptionLordingList($(this), $(this).attr('id'));
                }
                if (iNum === 0 && Boolean($(this).attr('required')) === false) {
                    iNum = 0;
                } else {
                    iNum++;
                }

            });

            if (iNum === 0) {
                Olnk.bAllSelectedOption = true;
            }
        },
        /**
         * 옵션값을 전역 변수에 할당하고 해당 option들은 삭제 처리
         */
        setOptionLordingList: function(oTargets, sOptionId) {
            var sData = '';

            Olnk.aOptionProductDataListKey[sOptionId] = true;
            oTargets.find('option').each(function() {
                if (Olnk.getCheckValue(this.value, '') === true) {
                    sData = sOptionId + '#$%' + '<option value=\'' + $(this).val() + '\'>' + $(this).text() + '</option>';
                    if ($.inArray(sData, Olnk.aOptionData) < 0) {
                        Olnk.aOptionData.push(sData);
                    }
                    $(this).remove();
                }
            });

        },
        /*
         * 옵션 선택후 다음 옵션 설정
         */
        setNextOption: function(oTarget, sOptionIdTxt) {

            if (this.getOptionCheckData(oTarget) === false) {
                return false;
            }

            var iOptionNum = parseInt(oTarget.attr('id').replace(sOptionIdTxt, '')) + Olnk.iOptionAddNum;
            var sOptionId = sOptionIdTxt + iOptionNum;

            this.setAppendOptionData(oTarget, sOptionId, '');

            // 필수가 나올때까지!!
            if (Boolean($('#' + sOptionId).attr('required')) === false && $('#' + sOptionId).attr('id') !== undefined) {
                this.setNextOption($('#' + sOptionId), sOptionIdTxt, true);
            }
        },
        /*
         * 옵션 선택후 다음 옵션 설정 ( 장바구니 , 관심상품 레이어용)
         */
        setNextOptionLayer: function(oTarget, sOptionIdTxt, sTargetId) {

            if (this.getOptionCheckData(oTarget) === false) {
                return false;
            }

            var iOptionNum = parseInt(oTarget.attr('id').replace(sOptionIdTxt, '')) + Olnk.iOptionAddNum;
            var sOptionId = sOptionIdTxt + iOptionNum;

            for (i = 0; i < Olnk.aOptionData.length; i++) {
                if (Olnk.aOptionData[i].indexOf(sOptionId) != -1) {
                    $('#' + sTargetId).find('#' + sOptionId).append(Olnk.aOptionData[i].replace(sOptionId + '#$%', ''));
                }
            }

            // 필수가 나올때까지!!
            if (Boolean($('#' + sTargetId).find('#' + sOptionId).attr('required')) === false && $('#' + sTargetId).find('#' + sOptionId).attr('id') !== undefined) {
                this.setNextOptionLayer($('#' + sTargetId).find('#' + sOptionId), sOptionIdTxt, sTargetId);
            }
        },
        setResetChildOption: function(oTargetId) {
            $('#' + oTargetId).find('option').each(function() {
                //if (/^\*+$/.test(this.value) === false) {
                if (Olnk.getCheckValue(this.value, '') === true) {
                    $(this).remove();
                }
            });
        },

        /**
         * 추가 구성상품 연동형옵션 순차적 로딩
         * 일반 상품과 달리 한가지 상품에 여러개가 달려 나옴
         */
        setAddOptionInit: function(aAddOptionDataInfo) {

            //$('#add_option_push_button_'+iAddProductNo)
            for (var key in aAddOptionDataInfo) {
                if (Olnk.isLinkageType(aAddOptionDataInfo[key].option_type) === true && Olnk.getOptionPushbutton($('#add_option_push_button_' + key)) === false) {
                    this.setAddOptionLording($('[id^="addproduct_option_id_' + key + '"]'));
                }
            }
        },
        /**
         * 추가 구성상품 연동형옵션 순차적 로딩
         * 각각의 상품을 구분짓기 위해 상품 아이디에 포함되어 있는 상품 번호를 이용해서 키값 사용
         */
        setAddOptionLording: function(oTargets) {
            var iNum = 0;
            var aOptionData;
            var iOptionAddProductNum = 1;
            oTargets.each(function() {
                if (iNum > 0) {
                    Olnk.setOptionLordingList($(this), $(this).attr('id'));
                    aOptionData = $(this).attr('id').split('_');
                    Olnk.aOptionAddProductNum[aOptionData[3]] = iOptionAddProductNum;
                }

                if (iNum === 0 && Boolean($(this).attr('required')) === false) {
                    iNum = 0;
                } else {
                    iNum++;
                }

            });
        },
        /*
         * 추가 구성상품 연동형 옵션 선택후 다음 옵션 설정
         * 위값과 크게 다른점은 없지만 추가 구성상품의 분리를 위해서
         */
        setNextAddOption: function(oTarget) {

            if (this.getOptionCheckData(oTarget) === false) {
                return false;
            }

            var aOptionData = oTarget.attr('id').split('_');
            var sOptionId = 'addproduct_option_id' + '_' + aOptionData[3] + '_' + (parseInt(aOptionData[4]) + Olnk.iOptionAddProductNum);

            this.setAppendOptionData(oTarget, sOptionId, '');

            if (Boolean($('#' + sOptionId).attr('required')) === false && $('#' + sOptionId).attr('id') !== undefined) {
                this.setNextAddOption($('#' + sOptionId));
            }
        },
        /*
         * 최근본 상푸 연동형 옵션 선택후 다음 옵션 설정
         * 위값과 크게 다른점은 없지만 추가 구성상품의 분리를 위해서
         */
        setNextRecentOption: function(oTarget, sOptionIdTxt, iProductCountNum) {

            if (this.getOptionCheckData(oTarget) === false) {
                return false;
            }

            var iOptionNum = parseInt(oTarget.attr('id').replace(sOptionIdTxt, ''));
            var sOptionId = sOptionIdTxt + '_' + (iProductCountNum) + '_' + (iOptionNum + 1);
            var sTargetId = (sOptionIdTxt + (iOptionNum + 1)) + '.ProductOption' + iProductCountNum;
            this.setAppendOptionData(oTarget, sOptionId, sTargetId);

            // 필수가 나올때까지!!
            if (Boolean($('#' + sTargetId).attr('required')) === false) {
                this.setNextRecentOption($('#' + sTargetId), sOptionIdTxt, iProductCountNum);
            }
        },

        /**
         * 옵션 순차적 로딩 ( 구스킨용 나중에 삭제 하기 쉬우라고 따로 처리)
         */
        setOptionLordingOldSkin: function(oTargets) {
            var iNum = 0;
            var iMultiOptionNum = 0;
            oTargets.each(function() {
                if (Olnk.aOptionProductData[$(this).attr('id')] != 1) {
                    if (iNum > 0) {
                        Olnk.setOptionLordingList($(this), $(this).attr('id'));
                    }
                    Olnk.aOptionProductData[$(this).attr('id')] = 1;
                    if (iNum === 0 && Boolean($(this).attr('required')) === false) {
                        iNum = 0;
                    } else {
                        iNum++;
                    }
                } else { // 옵션 추가 일때만 동작!!
                    if (iMultiOptionNum > 0) {
                        Olnk.setRemoveOptionData($(this));
                    }
                    if (iMultiOptionNum === 0 && Boolean($(this).attr('required')) === false) {
                        iMultiOptionNum = 0;
                    } else {
                        iMultiOptionNum++;
                    }
                }
            });

            if (iNum === 0) {
                Olnk.bAllSelectedOption = true;
            }
        },
        /*
         * 옵션 선택후 다음 옵션 설정 ( 구스킨용 나중에 삭제 하기 쉬우라고 따로 처리)
         */
        setNextOptionOldSkin: function(oTarget, sOptionIdTxt, sAddOptionTxt) {
            var iOptionNum = parseInt(oTarget.attr('id').replace(sOptionIdTxt, '')) + Olnk.iOptionAddNum;
            var sOptionId = sOptionIdTxt + iOptionNum;

            if (Olnk.getCheckValue(oTarget.val(), '') === false && Boolean(oTarget.attr('required')) === true) {
                this.setResetChildOption(sOptionId);
                return;
            }
            var sCheckOptionId = sOptionId.replace(sAddOptionTxt, '');

            for (i = 0; i < Olnk.aOptionData.length; i++) {
                if (Olnk.aOptionData[i].indexOf(sCheckOptionId) != -1) {
                    $('#' + sOptionId).append(Olnk.aOptionData[i].replace(sOptionId + '#$%', ''));
                }
            }

            if (Boolean($('#' + sOptionId).attr('required')) === false && $('#' + sOptionId).attr('id') !== undefined) {
                this.setNextOptionOldSkin($('#' + sOptionId), sOptionIdTxt, sAddOptionTxt);
            }
        },
        /*
         * 상단 옵션 선택후 하단에 있는 옵션 재세팅 ( 상위 옵션이 재 세팅되면 해당 옵션에 하단 옵션들은 reset)
         */
        setResetOptionData: function(oTargets, oTarget, sOptionIdTxt) {
            var iOptionNum = parseInt(oTarget.attr('id').replace(sOptionIdTxt, ''));
            oTargets.each(function() {
                var iSelectedOptionIdx = parseInt($(this).attr('id').replace(sOptionIdTxt, ''));

                if (iSelectedOptionIdx > iOptionNum) {
                    $(this).val('*');
                    if (Olnk.aOptionProductDataListKey[$(this).attr('id')] !== true) {
                        Olnk.setOptionLordingList($(this), $(this).attr('id'));
                    } else {
                        Olnk.setRemoveOptionData($(this));
                    }
                }
            });
        },
        /*
         * 상단 옵션 선택후 하단에 있는 옵션 재세팅 ( 상위 옵션이 재 세팅되면 해당 옵션에 하단 옵션들은 reset)
         * 최근본 상품 전용!! ( 이러고 싶지 않았음)
         */
        setResetRecentOptionData: function(oTargets, oTarget, sOptionIdTxt, iProductCountNum) {
            var iOptionNum = parseInt(oTarget.attr('id').replace(sOptionIdTxt, ''));
            var sOptionId = sOptionIdTxt + '_' + iProductCountNum;
            oTargets.each(function() {
                var iSelectedOptionIdx = parseInt($(this).attr('id').replace(sOptionIdTxt, ''));
                if (iSelectedOptionIdx > iOptionNum) {
                    $(this).val('*');
                    if (Olnk.aOptionProductDataListKey[sOptionId + '_' + iSelectedOptionIdx] !== true) {
                        Olnk.setOptionLordingList($(this), sOptionId + '_' + iSelectedOptionIdx);
                    } else {
                        Olnk.setRemoveOptionData($(this));
                    }
                }
            });
        },
        /*
         * 중복으로 생성되는것을 막기 위해서 한번 삭제후 재 세팅합니다.
         */
        setRemoveOptionData: function(oTarget) {
            oTarget.find('option').each(function() {
                if (Olnk.getCheckValue(this.value, '') === true) {
                    $(this).remove();
                }
            });
        },
        /*
         * 중복 호출되는 부분 공통 처리
         */
        setAppendOptionData: function(oTarget, sOptionId, sTargetId) {
            if (Olnk.getCheckValue(oTarget.val(), '') === false && Boolean(oTarget.attr('required')) === true) {
                this.setResetChildOption(sOptionId);
            }

            if (sTargetId === '') {
                sTargetId = sOptionId;
            }

            for (i = 0; i < Olnk.aOptionData.length; i++) {
                if (Olnk.aOptionData[i].indexOf(sOptionId) != -1) {
                    $('#' + sTargetId).append(Olnk.aOptionData[i].replace(sOptionId + '#$%', ''));
                }
            }
        },
        /**
         * 추가 구성상품 연동형옵션 순차적 로딩
         * 각각의 상품을 구분짓기 위해 상품 아이디에 포함되어 있는 상품 번호를 이용해서 키값 사용
         */
        setCompareOptionLording: function(oTargets) {
            var iNum = 0;
            var aOptionData;
            var iOptionAddProductNum = 1;
            oTargets.each(function() {
                if (iNum > 0) {
                    Olnk.setOptionLordingList($(this), $(this).attr('id'));
                    aOptionData = $(this).attr('id').split('_');
                    Olnk.aOptionAddProductNum[aOptionData[3]] = iOptionAddProductNum;
                }

                if (iNum === 0 && Boolean($(this).attr('required')) === false) {
                    iNum = 0;
                } else {
                    iNum++;
                }

            });
        },
        /*
         * 상단 옵션 선택후 alert후 옵션 재세팅 ( 상위 옵션이 재 세팅되면 해당 옵션에 하단 옵션들은 reset)
         */
        getOptionCheckData: function(oTarget) {
            //if ((/^\*+$/.test(oTarget.val()) === true && Boolean(oTarget.attr('required')) === true) || oTarget.attr('id') === undefined) {            
            if ((Olnk.getCheckValue(oTarget.val(), '') === false && Boolean(oTarget.attr('required')) === true) || oTarget.attr('id') === undefined) {
                return false;
            }

            return true;
        },
        /**
         * 재고 체크 ( 구스킨에서 action시에 필요함.
         * 각각의 수량을 전부 합치고 그 합친 수량과 재고 체크
         * @param sOptionId 옵션 id
         * @returns 품절여부
         */
        getStockValidate: function(sOptionId, iQuantity) {
            var aStockData = $.parseJSON(option_stock_data);
            var bSoldOut = false;
            var iStockNumber, bStock, bStockSoldOut;
            // get_stock_info
            if (aStockData[sOptionId] == undefined) {
                iStockNumber = -1;
                bStock = false;
                bStockSoldOut = 'F';
            } else {
                iStockNumber = aStockData[sOptionId].stock_number;
                bStock = aStockData[sOptionId].use_stock;
                bStockSoldOut = aStockData[sOptionId].use_soldout;

            }
            if (bStockSoldOut == 'T' && bStock === true && (iStockNumber < iQuantity)) {
                bSoldOut = true;
            }
            return bSoldOut;
        },
        /*
         * check value
         */
        getCheckValue: function(oTargetValue, oTarget) {
            if (/^\*+$/.test(oTargetValue) === true) {
                if (oTarget !== '') {
                    oTarget.val('*');
                }
                return false;
            }
            return true;
        },
        /*
         * 추가 구성상품의 재고 체크
         * @param aOptionBoxInfo 추가 구성상품 데이터
         */
        getAddProductStock: function(aOptionBoxInfo) {
            var iTotalQuantity = aOptionBoxInfo['iTotalQuantity'];
            if (this.isLinkageType(aOptionBoxInfo['option_type']) === true) {
                $('.option_add_box_' + aOptionBoxInfo['product_no']).each(function() {
                    // 수량 증가시 본인꺼는 빼야 한다..
                    if (aOptionBoxInfo['sOptionBoxId'] !== $(this).attr('id')) {
                        iTotalQuantity += parseInt(iQuantity = $('#' + $(this).attr('id').replace('id', 'quantity')).val());
                    }

                });
                if (aOptionBoxInfo['is_stock'] === true && aOptionBoxInfo['use_soldout'] === true && aOptionBoxInfo['stock_number'] < iTotalQuantity) {
                    alert(sprintf(__('%s 의 재고가 부족합니다.'), aOptionBoxInfo['title']));
                    //alert(aOptionBoxInfo['title'] + ' - ' + __('의 재고가 부족합니다.'));
                    return false;
                }
            }
        },
        /*
         * 모든 상품의 옵션이 선택일때 옵션박스가 떨궈지지 않았을 경우 (아무것도 선택안하면 option_box 안생김)
         * @param aOptionBoxInfo 추가 구성상품 데이터
         */
        getProductAllSelected: function(sProductCode, oTargets, iQuantity) {
            var bAllSelected = true;
            var options = {};
            oTargets.each(function(i) {
                if ($(this).val().indexOf('||') >= 0) {
                    aOptionTmp = $(this).val().split('||');
                    for (i = 0; i < aOptionTmp.length; i++) {
                        if (aOptionTmp[i] !== '') {
                            aOptionData = aOptionTmp[i].split('_');
                        }
                        options[aOptionData[1]] = '';
                    }
                } else {
                    if (Boolean($(this).attr('required')) === true || Olnk.getCheckValue($(this).val(), '') === true) {
                        bAllSelected = false;
                        return false;
                    }
                    var optCode = $(this).attr('option_code');
                    var optValNo = parseInt($(this).val());

                    if (optCode == '' || optCode == null) {
                        return null;
                    }
                    if (isNaN(optValNo) === true) {
                        optValNo = '';
                    }
                    options[optCode] = optValNo;
                }
            });

            if (bAllSelected === true) {
                return {
                    'product_code': sProductCode,
                    'quantity': iQuantity,
                    'options': options
                };
            } else {
                return false;
            }

        },
        /*
         * 상단 옵션 선택후 하단에 있는 옵션 재세팅 ( 상위 옵션이 재 세팅되면 해당 옵션에 하단 옵션들은 reset)
         */
        setResetSelecteOptionData: function(oTargets, oTarget, sOptionIdTxt) {
            var iOptionNum = parseInt(oTarget.attr('id').replace(sOptionIdTxt, ''));
            oTargets.each(function() {
                var iSelectedOptionIdx = parseInt($(this).attr('id').replace(sOptionIdTxt, ''));
                if (iSelectedOptionIdx > iOptionNum) {
                    $(this).val('*');
                }
            });
        },
        /*
         * 옵션 추가버튼 ( 신규 스킨의 연동형 옵션일때 품목 추가 버튼 생김)
         * totalProducts가 있을때 신규 스킨
         * ( NewProductOption.js에 isNewProductSkin이 있지만 의존적 처리가 어려움)
         * oPushButton 품목 추가 버튼 Object
         */
        getOptionPushbutton: function(oPushButton) {
            if (option_push_button === 'T' && oPushButton.size() > 0 && isNewProductSkin() === true) {
                return true;
            } else {
                return false;
            }

        },
        /*
         * 옵션 변경시 이벤트 모음 너무 지저분해서 이리로 빼자.
         * @param oPushButton 품목 추가 버튼 Object
         * @param sOptionTxt 추가 구성상품의 상품 번호
         */
        setOptionChangeEvent: function(oOptionData, sOptionTxt, sType, sMultiOptionData) {
            /*
             * 모두 선택일때는 특별하게 next옵션에 대한 처리 하지 마시길
             */
            if (sType === 'sAddProduct') {
                if (Boolean(oOptionData.attr('required')) === false && oOptionData.val() === '**') {
                    Olnk.setResetSelecteOptionData($('[id^="' + sOptionTxt + '"]'), oOptionData, sOptionTxt + '_');
                    Olnk.getCheckValue(oOptionData.val(), oOptionData);
                    return false;
                }
                Olnk.getCheckValue(oOptionData.val(), oOptionData);
                Olnk.setResetOptionData($('[id^="' + sOptionTxt + '"]'), oOptionData, sOptionTxt + '_');
                Olnk.setNextAddOption(oOptionData);
            } else {
                if (Olnk.bAllSelectedOption === true || (Boolean(oOptionData.attr('required')) === false && oOptionData.val() === '**')) {
                    Olnk.setResetSelecteOptionData($('[id^="' + sOptionTxt + '"]'), oOptionData, sOptionTxt);
                } else {
                    Olnk.setResetOptionData($('[id^="' + sOptionTxt + '"]'), oOptionData, sOptionTxt);
                    if (isNewProductSkin() === false) {
                        Olnk.setNextOptionOldSkin(oOptionData, sOptionTxt, sMultiOptionData);
                    } else {
                        Olnk.setNextOption(oOptionData, sOptionTxt);
                    }
                }
            }
        },
        /*
         * 옵션 추가버튼 action. php 에서 assign된 함수
         */
        setOptionPushButton: function() {
            Olnk.handleTotalPrice(option_stock_data, product_price, sIsDisplayNonmemberPrice, true);
        },
        /**
         * 옵션 추가 버튼 연동형 옵션인 경우에만 동작 하자.(이건 추가구성상품)
         * @param iProductNum 상품번호
         */
        setAddOptionPushButton: function(iProductNum) {
            ProductAdd.setAddProductOptionPushButton(iProductNum);
        }
    };

    //
    // 공개 인터페이스
    //
    window['Olnk'] = $Olnk;

})($);


var categoryOddColor = new Object();
var categoryEvenColor = new Object();

$(document).ready(function() {
    // 카테고리타입
    var aCategoryType = new Array('normal', 'reco', 'new', 'project', 'main');
    // 상품 ID prefix
    var sProductIdPrefix = 'product_';
    // 옵션 미리보기 아이콘 ID prefix
    var sOptPreviewIconId = 'opt_prv_id_';
    // 옵션 미리보기 레이어 ID prefix
    var sOptPreviewLayerId = 'opt_prv_layer_id_';
    // 옵션 미리보기 닫기 버튼 ID prefix
    var sOptPreviewCloseId = 'opt_prv_close_id_';

    // 상품요약정보 (툴팁)
    if ($('.tooltip').length > 0) {
        $('.tooltip').Tooltip({
            'name': 'toolTipStyle',
            'delay': '0',
            'top': '-200',
            'left': '10',
            'fade': false,
            'opacity': 1
        });
    }

    /**
     * 카테고리 타입별로 홀짝수 라인색상 설정
     */
    var iCategoryTypeLen = aCategoryType.length;
    for (var i = 0; i < iCategoryTypeLen; i++) {
        var iBeforeOffsetTop = -1;
        var sCategoryType = aCategoryType[i];
        var sBgColor = categoryOddColor[sCategoryType];
        $('[id^="' + sProductIdPrefix + aCategoryType[i] + '_"]').each(function(idx) {
            if ((idx > 0) && $(this).attr('offsetTop') != iBeforeOffsetTop) {
                sBgColor = (sBgColor == categoryOddColor[sCategoryType]) ? categoryEvenColor[sCategoryType] : categoryOddColor[sCategoryType];
            }
            iBeforeOffsetTop = $(this).attr('offsetTop');
            $(this).css('background-color', sBgColor);
        });
    }

    $('#selArray').change(function() {
        location.href = $(this).val();
    });

    $('#selArray>option').each(function() {
        if (location.search + location.hash == $(this).val()) {
            $(this).attr("selected", "true");
        }
    });

    /**
     * 옵션아이콘 onmouseover 핸들러
     */
    $('[id^="' + sOptPreviewIconId + '"]').mouseover(function() {
        if (sOptionPreviewMethod.indexOf('mouseover') > -1)
            setOptLayerDisplay($(this));
    });

    /**
     * 옵션아이콘 onmouseclick 핸들러
     */
    $('[id^="' + sOptPreviewIconId + '"]').click(function() {
        if (sOptionPreviewMethod.indexOf('mouseclick') > -1)
            setOptLayerDisplay($(this));
    });

    /**
     * 옵션 하나만 선택가능 옵션 동작
     */
    $('[name="item_code[]"]').live('click', function() {
        if ($.data(document, 'sUseOptionOne_class') === 'T') {
            if ($('input[name="item_code[]"][option_name="' + $(this).attr('option_name') + '"]:checked').size() > 1) {
                alert(__('옵션별로 1개 씩만 선택 가능한 상품입니다.'));
                $(this).attr('checked', false);
            }

        }
    });
    /**
     * 옵션 레이어 display 조절
     *
     * @param object optIcon 옵션 아이콘 JQuery 객체
     * @param string sPopupMethod 팝업 method (mouseover|mouseclick)
     */
    function setOptLayerDisplay(optIcon, sPopupMethod) {
        var aParam = getOptionParams(optIcon.attr('id'), sOptPreviewIconId);
        // 모든 옵션미리보기창 닫기
        $('[id^="' + sOptPreviewLayerId + '"]').each(function() {
            $(this).css('display', 'none');
        });

        // 선택된 옵션미리보기창 출력
        var sLayerId = '#' + sOptPreviewLayerId + aParam['product_no'];
        var aPos = findPos(optIcon.get(0));
        $(sLayerId).css('position', 'absolute');
        $(sLayerId).css('left', aPos['left']);
        $(sLayerId).css('top', (aPos['top'] + optIcon.attr('offsetHeight')) + 'px');
        $(sLayerId).css('display', '');
        $(sLayerId).css('z-index', '9999');
    }

    /**
     * 옵션아이콘 onmouseout 핸들러
     */
    $('[id^="' + sOptPreviewIconId + '"]').mouseout(function() {
        var aParam = getOptionParams($(this).attr('id'), sOptPreviewIconId);
        if (sOptionLayerCloseMethod != 'use_close_button')
            $('#' + sOptPreviewLayerId + aParam['product_no']).css('display', 'none');
    });

    /**
     * 옵션 레이어 onmouseover 핸들러
     */
    $('[id^="' + sOptPreviewLayerId + '"]').mouseover(function() {
        $(this).css('display', '');
    });

    /**
     * 옵션 레이어 onmouseout 핸들러
     */
    $('[id^="' + sOptPreviewLayerId + '"]').mouseout(function() {
        if (sOptionLayerCloseMethod != 'use_close_button')
            $(this).css('display', 'none');
    });

    /**
     * 옵션 레이어 닫기버튼 클릭 핸들러
     */
    $('[id^="' + sOptPreviewCloseId + '"]').click(function() {
        var aParam = getOptionParams($(this).attr('id'), sOptPreviewCloseId);
        $('#' + sOptPreviewLayerId + aParam['product_no']).css('display', 'none');
    });

    /**
     * HTML 오브젝트의 위치값 계산
     *
     * @param object obj 위치를 알고자 하는 오브젝트
     * @return object left, top 값
     */
    function findPos(obj) {
        var iCurLeft = iCurTop = 0;

        if (obj.offsetParent) {
            do {
                iCurLeft += obj.offsetLeft;
                iCurTop += obj.offsetTop;
            } while (obj = obj.offsetParent);
        }

        return {
            'left': iCurLeft,
            'top': iCurTop
        };
    }

    /**
     * 옵션관련 ID를 파싱해서 파라메터 추출, 반환
     *
     * @param string sId ID
     * @param string sPrefix 파싱할 때 삭제할 prefix
     * @return array 상품번호+팝업method
     */
    function getOptionParams(sId, sPrefix) {
        var aTmp = sId.replace(sPrefix, '').split('_');
        return {
            'product_no': aTmp[0],
            'popup_method': aTmp[1]
        };
    }

    if (mobileWeb !== true) {
        // 할인기간 레이어 열기
        $('.discountPeriod > a').mouseover(function() {
            $('.layerDiscountPeriod').hide();
            $(this).parent().find('.layerDiscountPeriod').show();
        }).mouseout(function() {
            $('.layerDiscountPeriod').hide();
        });
    } else {
        // 할인기간 레이어 열기
        $('.discountPeriod > a').click(function() {
            $('.layerDiscountPeriod').hide();
            $(this).parent().find('.layerDiscountPeriod').show();
        });

        // 할인기간 레이어 닫기
        $('.layerDiscountPeriod > .close').click(function() {
            $(this).parents('.layerDiscountPeriod').hide();
        });
    }

    COLORCHIPLIST.init();

});

//컬러칩 이미지 변경(상품리스트)
var COLORCHIPLIST = {
    init: function() {
        if (mobileWeb === false) {
            $('div.color > .chips').live('mouseover', function() {
                var iColorNo = $(this).attr('color_no');
                var iDisplayGroup = $(this).attr('displayGroup');

                if (iColorNo != '') {
                    $(this).css('cursor', 'pointer');
                    COLORCHIPLIST.getImage(this, iColorNo, iDisplayGroup);
                }
            });
        }
    },

    getImage: function(oObj, iColorNo, iDisplayGroup) {
        var sImageUrl = $.data($(oObj)[0], 'image');

        if (sImageUrl == undefined) {
            COLORCHIPLIST.getAjax(oObj, iColorNo, iDisplayGroup);
        } else {
            COLORCHIPLIST.setDisplayImage(oObj);
        }
    },

    getAjax: function(oObj, iColorNo, iDisplayGroup) {
        $.post(
            '/exec/front/Product/Colorimage',
            'iColorNo=' + iColorNo + '&iDisplayGroup=' + iDisplayGroup,
            function(sResponse) {
                if (sResponse != '') {
                    var oJson = $.parseJSON(sResponse);
                    $.data($(oObj)[0], 'image', oJson.sImageUrl);
                    $.data($(oObj)[0], 'displayGroup', oJson.iDisplayGroup);
                    $.data($(oObj)[0], 'product_no', oJson.iProductNo);
                    COLORCHIPLIST.setDisplayImage(oObj);
                }
            }
        );
    },

    setDisplayImage: function(oObj) {
        var iDisplayGroup = $.data($(oObj)[0], 'displayGroup');
        var iProductNo = $.data($(oObj)[0], 'product_no');
        var sImageUrl = $.data($(oObj)[0], 'image');

        var oEl = $('#eListPrdImage' + iProductNo + '_' + iDisplayGroup);
        oEl.attr('src', sImageUrl);


    }
};

// 상품 확대보기 아이콘 ID prefix
var sProductZoomIdPrefix = 'product_zoom_';

/**
 * 상품 확대보기
 *
 * @param int iProductNo 상품번호
 * @param int iCategoryNo 카테고리 번호
 * @param int iDisplayGroup display_group
 * @param string sLink 팝업창 URL
 * @param string sOption 팝업 옵션
 */
function zoom(iProductNo, iCategoryNo, iDisplayGroup, sLink, sOption) {
    // 팝업창 링크
    var sLink = sLink ? sLink : '/product/image_zoom.html';
    sLink += '?product_no=' + iProductNo + '&cate_no=' + iCategoryNo + '&display_group=' + iDisplayGroup;
    // 팝업창 옵션
    var sOptions = sOption ? sOption : 'toolbar=no,scrollbars=no,resizable=yes,width=800,height=640,left=0,top=0';
    // 팝업창 이름
    var sWinName = 'image_zoom';

    window.open(sLink, sWinName, sOptions);
}

/**
 * 상품상세 확대보기
 *
 * @param int iProductNo 상품번호
 * @param int iCategoryNo 카테고리 번호
 * @param int iDisplayGroup display_group
 * @param string sLink 팝업창 URL
 * @param string sOption 팝업 옵션
 */
function zoom2(iProductNo, iCategoryNo, iDisplayGroup, sLink, sOption) {
    // 팝업창 링크
    var sLink = sLink ? sLink : '/product/image_zoom2.html';
    sLink += '?product_no=' + iProductNo + '&cate_no=' + iCategoryNo + '&display_group=' + iDisplayGroup;
    // 팝업창 옵션
    var sOptions = sOption ? sOption : 'toolbar=no,scrollbars=no,resizable=yes,width=800,height=640,left=0,top=0';
    // 팝업창 이름
    var sWinName = 'image_zoom2';

    window.open(sLink, sWinName, sOptions);
}

/**
 * 상품 진열시 높이가 달라서 li가 깨지는 현상이 나타날때 이를 진열된 상품의 기준으로 높이를 다시 재설정해주는 스크립트입니다.
 * 이 스크립트는 반드시 고정폭에서 사용되어야 합니다.
 * 해당스크립트 실행문은 각각 모듈의 js에서 합니다.
 */
$.fn.productResize = function(nodeName) {
    nodeName = nodeName || 'li';

    return $(this).each(function() {
        var iTargetHeight = 0;
        var aTargetElement = new Array();
        var nodes = $(this).find(nodeName);
        var iFirstChildDepth = $(nodes[0]).parents().size(); // 타겟 depth
        for (var x = 0; x < nodes.size(); x++) {
            if ($(nodes[x]).parents().size() == iFirstChildDepth) {
                aTargetElement.push(x);
                if (iTargetHeight < $(nodes[x]).height()) {
                    iTargetHeight = $(nodes[x]).height();
                }
            }
        }
        for (var x in aTargetElement) {
            $(nodes[aTargetElement[x]]).height(iTargetHeight);
        }
    });
};
/**
 * 상품 리스트에서 쓰이는 기능 모음 1. 옵션 미리보기 2. 장바구니 넣기 3. 이미지 줌 4. 요약정보
 */
var EC_ListAction = {
    getOptionSelect: function(iProductNo, iCategoryNo, iDisplayGroup, sBasketType) {
        element = document;
        $('div.xans-product-basketoption').remove();
        $.get(basket_option, {
            'product_no': iProductNo,
            'cate_no': iCategoryNo,
            'display_group': iDisplayGroup,
            'basket_type': sBasketType
        }, function(sHtml) {
            $('body').append($(sHtml.replace(/[<]script( [^ ]+)? src=\"[^>]*>([\s\S]*?)[<]\/script>/g, "")));
        });
    },
    getOptionSelectValidate: function(sType) {
        var iCheckCount = 0;
        var bReturn = true;
        var bFirst = true;
        var eLists = $('.xans-product-optionlist');
        var iProductMin = parseInt($.data(document, 'ProductMin_class'), 10);

        // 뉴상품인 경우에만 있는 데이터
        var iProductMax = parseInt($.data(document, 'ProductMax_class'), 10);
        var iBuyUnit = parseInt($.data(document, 'ProductBuyUnit_class'), 10);
        if (isNaN(iBuyUnit) === true) iBuyUnit = 1;
        if (isNaN(iProductMax) === true) iProductMax = 0;

        var sOptionType = $.data(document, 'sOptionType_class');
        var aOptionName = $.parseJSON($.data(document, 'aOptionName_class'));
        if (sOptionType === 'F') {
            $(aOptionName).each(function(i) {
                if ($('input[option_name="' + aOptionName[i] + '"]:checked').size() == 0 && $('input[option_name="' + aOptionName[i] + '"]').attr('require') === 'T') {
                    alert(__('필수옵션은 반드시 1개 이상 선택하셔야 구매 또는 장바구니 담기가 가능합니다.'));
                    eOptionName.focus();
                    bReturn = false;
                    bFirst = false;
                    return false;
                }
            });
            if (bReturn === false) {
                bFirst = false;
                return false;
            }
        }
        for (var x = 0; x < eLists.length; x++) {
            var eList = $(eLists[x]);
            eList.find('.' + $.data(document, 'Check_class')).each(function() {
                if ($(this).attr('checked') === true) {
                    iCheckCount++;
                    eList.find('.' + $.data(document, 'Quantity_class')).each(function() {
                        var iQuantity = parseInt($(this).val(), 10);
                        if (bFirst === true) {
                            if (iQuantity < 1) {
                                alert(__('구매하실 수량을 입력해주세요'));
                                $(this).focus();
                                bReturn = false;
                                return false;
                            }
                            if (($(this).attr('stock') > 0 || $(this).attr('is_soldout') === 'T') && iQuantity > $(this).attr('stock')) {
                                alert(__('선택하신 옵션에 해당하는 상품의 재고 수량이 구매하실 수량보다 적습니다.'));
                                $(this).focus();
                                bReturn = false;
                                return false;
                            }

                            if (iQuantity % iBuyUnit !== 0) {
                                alert('선택하신 옵션은 ' + iBuyUnit + '개 단위로 구매 하실 수 있습니다.');
                                $(this).focus();
                                bReturn = false;
                                return false;
                            }

                            if (iQuantity < iProductMin) {
                                alert('선택하신 옵션의 최소 구매수량은 ' + iProductMin + '개 입니다.');
                                $(this).focus();
                                bReturn = false;
                                return false;
                            }
                            if (iProductMax > 1 && iQuantity > iProductMax) {
                                alert('선택하신 옵션의 최대 구매수량은 ' + iProductMax + '개 입니다.');
                                $(this).focus();
                                bReturn = false;
                                return false;
                            }
                        }

                        if (bReturn === false) {
                            bFirst = false;
                        }
                    });
                    if (bReturn === false) {
                        bFirst = false;
                    }
                }
            });
        }

        if (iCheckCount < 1) {
            alert(__('구매 또는 장바구니에 담을 상품을 선택해주세요.'));
            return false;
        }
        if (bReturn === true) {
            this.setBasketPrepare(sType);
        } else {
            return false;
        }
    },
    setBasketPrepare: function(sType) {
        var frm = this.getBasketForm();
        this.getHiddenElement('product_no', $.data(document, 'iProductNo_class')).appendTo(frm);
        this.getHiddenElement('main_cate_no', $.data(document, 'iCategoryNo_class')).appendTo(frm);
        this.getHiddenElement('display_group', $.data(document, 'iDisplayGroup_class')).appendTo(frm);
        this.getHiddenElement('basket_type', $.data(document, 'sBasketType_class')).appendTo(frm);
        this.getHiddenElement('product_min', $.data(document, 'ProductMin_class')).appendTo(frm);
        this.getHiddenElement('delvtype', $('input[name="delvtype"]').val()).appendTo(frm);
        this.getHiddenElement('option_type', 'T').appendTo(frm);
        this.getHiddenElement('command', 'add').appendTo(frm);
        this.getHiddenElement('has_option', 'T').appendTo(frm);
        var eLists = $('.xans-product-optionlist');
        var bAddProduct = false;
        var sOptionParam = '';
        for (var x = 0; x < eLists.length; x++) {
            var eList = $(eLists[x]);
            eList.find('.' + $.data(document, 'Check_class') + ':checked').each(function() {
                var sOptionId = $(this).val();
                var iQuantity = eList.find('.' + $.data(document, 'Quantity_class')).val();
                if (bAddProduct === false) {
                    var aOption = sOptionId.split('-');
                    var k = 0;
                    for (var z = 0; z < aOption.length; z++) {
                        key = z + 1;
                        EC_ListAction.getHiddenElement('option' + key, aOption[z]).appendTo(frm);
                    }

                    eList.find('.' + $.data(document, 'Quantity_class')).each(function() {
                        EC_ListAction.getHiddenElement('quantity', iQuantity).appendTo(frm);
                        bAddProduct = true;
                    });
                } else {
                    var aBasketInfo = new Array();
                    aBasketInfo.push($.data(document, 'iProductNo_class'));
                    aBasketInfo.push($.data(document, 'iCategoryNo_class'));
                    aBasketInfo.push($.data(document, 'iDisplayGroup_class'));
                    aBasketInfo.push($.data(document, 'ProductMin_class'));
                    aBasketInfo.push('product_name');
                    aBasketInfo.push('product_price');
                    aBasketInfo.push('T');
                    aBasketInfo.push(iQuantity);
                    aBasketInfo.push($.data(document, 'iOptionSize_class'));
                    var aOption = sOptionId.split('-');
                    var k = 0;
                    for (var z = 0; z < aOption.length; z++) {
                        if (aOption[z] != '0') {
                            aBasketInfo.push(aOption[z]);
                        }
                    }
                    EC_ListAction.getHiddenElement('basket_info[]', aBasketInfo.join('|')).appendTo(frm);
                }

                if (iQuantity > 0) {
                    frm.append(getInputHidden('selected_item[]', iQuantity + '||' + sOptionId));
                }
            });
        }
        // 선택한상품만 주문하기
        if (sType == 1 || sType == 'naver_checkout') {
            // 이미 장바구니에 들어있는지 체크
            this.selectbuy_action($.data(document, 'iProductNo_class'));
            EC_ListAction.getHiddenElement('quantity_override_flag', sIsPrdOverride).appendTo(frm);
        }

        var sAction = '/exec/front/order/basket/';
        action_basket(sType, 'category', sAction, frm.serialize(), $.data(document, 'sBasketType_class'));
        // 장바구니옵션창 자동으로 닫기게 처리-요거 처리 안하믄 레이어장바구니쪽에서 오류남 ECHOSTING-68196
        $('.xans-product-basketoption').remove();
    },
    getHiddenElement: function(sName, sValue) {
        return $('<input />').attr({
            'type': 'hidden',
            'name': sName,
            'value': sValue
        });
    },
    getBasketForm: function() {
        return $('<form>').attr({
            'method': 'POST',
            'name': 'CategoryBasket'
        });
    },
    /**
     * 리스트에서 상품 비교로 값을 넘긴다.
     */
    setProductCompare: function() {
        if ($('.ProductCompareClass:checked').size() < 1) {
            alert(__('비교할 상품을 선택해 주세요.'));
            return false;
        } else {
            var aProductNo = new Array();
            $('.ProductCompareClass:checked').each(function() {
                var aClass = $(this).attr('class').split(' ');

                var iSize = aClass.length;
                for (var x = 0; x < iSize; x++) {
                    var iProductNo = parseInt(aClass[x].split('_')[1], 10);
                    if (aClass != '' && aClass[x].indexOf('ECPCNO_') == 1 && $.inArray(iProductNo, aProductNo) < 0) {
                        aProductNo.push(iProductNo);
                    }
                }
            });
            if (aProductNo.length > 1) {
                if (aProductNo.length > max_comp_number) {
                    alert(sprintf(__('%s개까지 비교 가능합니다.'), max_comp_number));
                } else {
                    var eForm = $('<form>').attr({
                        'method': 'get',
                        'action': sComparePageUrl
                    });
                    var iSize = aProductNo.length;
                    for (var x = 0; x < iSize; x++) {
                        $('<input />').attr({
                            'type': 'hidden',
                            'name': 'product_no[]'
                        }).val(aProductNo[x]).appendTo(eForm);
                    }
                    eForm.appendTo($('body')).submit();
                }
            } else {
                alert(__('두개 이상의 상품을 선택하세요.'))
            }
        }
    },
    /**
     * 선택한상품만 주문하기
     *
     * @param string sOptionParam 옵션 파람값
     * @param int iProductNo 상품번호
     */
    selectbuy_action: function(iProductNo) {
        // ECHOSTING-95935 장바구니 상품 INSERT 실패 log방지
        if (typeof iProductNo == 'undefined') return;

        var aOptionId = new Array();
        var aTargetElement = $('.' + $.data(document, 'Check_class') + ':checked');
        var bOverride = false;
        for (var x = 0; x < aTargetElement.length; x++) {
            if (bOverride === true) {
                break;
            }
            var sOptionId = $(aTargetElement[x]).val();
            var sUrl = '/exec/front/order/basket/?command=select_prdcnt&product_no=' + iProductNo + '&option_type=T&option=' + sOptionId;
            $.ajax({
                url: sUrl,
                dataType: 'json',
                async: false,
                success: function(data) {
                    bOverride = true;
                    if (data.result > 0 && !confirm(sprintf(__('동일상품이 장바구니에 %s개 있습니다.'), data.result) + '\n' + __('함께 구매하시겠습니까?'))) {
                        sIsPrdOverride = 'T';
                    }
                }
            });
        }
    }
};

//페이지의 상위
function findMainFrame() {
        var $oFrame = null;
        if (opener) {
            try {
                opener.document;
                $oFrame = opener;
            } catch (e) {}
        } else {
            var $oParent = window;
            var $aFrames = [];
            while ($oParent != $oParent.parent) {
                $aFrames.unshift($oParent = $oParent.parent);
            }
            try {
                $oParent.location.href;
            } catch (e) {
                $aFrames.shift();
            }
            if (0 < $aFrames.length) {
                if ($aFrames[0].location.pathname === "/") {
                    if ($aFrames.length === 1) {
                        $oFrame = $aFrames[0];
                    } else
                    if ($aFrames.length > 1) {
                        $oFrame = $aFrames.pop();
                    }
                } else {
                    $oFrame = $aFrames[0];
                }
            }
        }
        return $oFrame;
    }
    // 상품 옵션 id
var product_option_id = 'product_option_id';

// 추가옵션 id
var add_option_id = 'add_option_';

// 선택된 상품만 주문하기
var sIsPrdOverride = 'F';

//모바일로 접속했는지
var bIsMobile = false;

/**
 * sType - 1:바로구매, 2:장바구니,naver_checkout:네이버체크아웃 form.submit - 바로구매, 장바구니, 관심상품
 * TODO 바로구매 - 장바구니에 넣으면서 주문한 상품 하나만 주문하기
 *
 * @param string sAction action url
 */
function product_submit(sType, sAction, oObj) {
    // ECHOSTING-58174
    if (sIsDisplayNonmemberPrice == 'T') {
        switch (sType) {
            case 1:
                alert(__('로그인후 상품을 구매해주세요.'));
                break;
            case 2:
                alert(__('로그인후 장바구니 담기를 해주세요.'));
                break
            default:
                break;
        }
        btn_action_move_url('/member/login.html');
        return false;
    }

    var sBasketType;

    var bIsPriceConentType = checkPriceType();

    if (bIsPriceConentType == false) {
        alert(sprintf(__('%s 상품은 구매할 수 있는 상품이 아닙니다.'), product_name));
        return;
    }

    if (typeof(basket_type) == 'undefined') {
        sBasketType = 'A0000';
    } else {
        sBasketType = basket_type;
    }

    // 품절 여부 체크
    if (checkSoldout() == false) return;

    // 옵션 체크
    if (sType != 'sms_restock' && checkOptionRequired() == false) {
        var sBuyBtnParent = $(oObj).parent().parent().attr('id');
        var sMsg = __('필수 옵션을 선택해주세요.');
        try {
            if (mobileWeb && sBuyBtnParent != '' && sBuyBtnParent == 'fixedActionButton') {
                if (Olnk.isLinkageType(option_type) === true) {
                    $('select[id^="' + product_option_id + '"]:visible').each(function() {
                        if (Olnk.getCheckValue($(this).val(), '') === true) {
                            $("#productOptionIframe")[0].contentWindow.$('#product_detail_option_layer #' + $(this).attr('id') + '').val($(this).val()).trigger('change');
                        }
                    });
                } else {
                    $('select[id^="' + product_option_id + '"]:visible').each(function() {
                        var sSelectOptionId = $(this).attr('id');
                        var sParentVal = $(this).val();
                        $("#productOptionIframe")[0].contentWindow.$('#product_detail_option_layer #' + sSelectOptionId + '').val(sParentVal).trigger('change');
                    });
                }
                var iTop = parseInt(($(window).height() - $("#productOptionIframe").height()) / 2);
                $("#opt_layer_iframe_parent").css({
                    "top": iTop,
                    "left": 0
                });
                $('html, body').css({
                    'overflow-y': 'hidden',
                    width: '100%',
                    height: '100%'
                });
                $('#opt_layer_window').show();
                return;
            } else {
                if (Olnk.getOptionPushbutton($('#option_push_button')) === true) {
                    var bCheckOption = false;
                    $('select[id^="' + product_option_id + '"]:visible').each(function() {
                        if (Boolean($(this).attr('required')) === true && Olnk.getCheckValue($(this).val(), '') === false) {
                            bCheckOption = true;
                            return false;
                        }
                    });
                    if (bCheckOption === false) {
                        sMsg = __('품목을 선택해 주세요.');
                    }
                }
            }
        } catch (e) {}
        alert(sMsg);
        return;
    }

    // 추가 옵션 체크 (품목기반 추가옵션일때는 폼제출때 검증 불필요)
    if (NEWPRD_ADD_OPTION.isItemBasedAddOptionType() !== true && checkAddOption() === false) {
        return false;
    }

    // 파일첨부 옵션 유효성 체크
    if (FileOptionManager.checkValidation() === false) return;

    // 수량 체크
    var iQuantity = 0;
    if (sType != 'sms_restock') {
        iQuantity = checkQuantity();
        if (iQuantity == false) return;
    }

    // 폼 세팅
    if (iQuantity == undefined || isNaN(iQuantity) === true) {
        iQuantity = 1;
    }

    // basket_type - 컨트롤러에서 변수에 assign 한 값을 그대로 사용하자
    var frm = $('#frm_image_zoom');
    // 어떤 이유로 서밋이 되지 않았을때 폼이 남아있는 경우에 폼 이하의 내용을 삭제함
    frm.find(":hidden").remove();
    frm.attr('method', 'POST');
    frm.attr('action', '/' + sAction);
    frm.append(getInputHidden('product_no', iProductNo));
    frm.append(getInputHidden('product_name', product_name));
    frm.append(getInputHidden('main_cate_no', iCategoryNo));
    frm.append(getInputHidden('display_group', iDisplayGroup));
    frm.append(getInputHidden('option_type', option_type));
    frm.append(getInputHidden('product_price', product_price));
    frm.append(getInputHidden('product_min', product_min));
    frm.append(getInputHidden('command', 'add'));
    frm.append(getInputHidden('has_option', has_option));
    frm.append(getInputHidden('basket_type', sBasketType));
    // frm.append(getInputHidden('product_name',product_name)); // 혹시 몰라서 빼봄.
    frm.append(getInputHidden('multi_option_schema', $('#multi_option').html()));
    frm.append(getInputHidden('multi_option_data', ''));
    frm.append(getInputHidden('quantity', iQuantity));
    frm.append(getInputHidden('delvType', delvtype));
    frm.append(getInputHidden('redirect', sType));
    frm.append(getInputHidden('prd_detail_ship_type', $('#delivery_cost_prepaid').val()));

    // 최대주문수량
    try {
        frm.append(getInputHidden('product_max_type', product_max_type));
        frm.append(getInputHidden('product_max', product_max));
    } catch (e) {}

    var count = 1;

    var sOptionParam = '';

    // 필수값 체크를 여기서 하지 않을수 있다.
    // 추이를 지켜보고 제거
    $('select[id^="' + product_option_id + '"]:visible').each(function() {
        frm.append(getInputHidden('optionids[]', $(this).attr('name')));
        if ($(this).attr('required') == true || $(this).attr('required') == 'required') {
            frm.append(getInputHidden('needed[]', $(this).attr('name')));
        }
        var iSelectedIndex = $(this).get(0).selectedIndex;
        if ($(this).attr('required') && iSelectedIndex > 0) iSelectedIndex -= 1;

        if (iSelectedIndex > 0) {
            sOptionParam += '&option' + count + '=' + iSelectedIndex;
            var sValue = $(this).val();
            var aValue = sValue.split("|");
            frm.append(getInputHidden($(this).attr('name'), aValue[0]));
            ++count;
        }
    });

    // 추가옵션
    if (add_option_name) {
        var iAddOptionNo = 0;
        var aAddOptionName = new Array();
        for (var i in add_option_name) {
            if ($('#' + add_option_id + i).val() == '' || typeof($('#' + add_option_id + i).val()) == 'undefined') {
                continue;
            }
            frm.append(getInputHidden('option_add[]', $('#' + add_option_id + i).val()));
            aAddOptionName[iAddOptionNo++] = add_option_name[i];
        }
        frm.append(getInputHidden('add_option_name', aAddOptionName.join(';')));
    }

    // 옵션 추가 구매 체크
    if (duplicateOptionCheck() === false) return;

    // 관련상품이 있을 때
    var bReturn = true;
    $('input[name="basket_info[]"]:checked').each(function() {
        var iRelationProductNum = $(this).val().substr(0, $(this).val().indexOf('|'));
        var eQuantity = $('#quantity_' + iRelationProductNum);
        var eOption = $('select[name="option_' + iRelationProductNum + '[]"]');

        var aValue = $(this).val().split('|');
        var sIsSetProduct = aValue[7];
        if (sIsSetProduct == 'T') {
            if (sType == '1') {
                alert(__('관련상품이 세트상품인 경우, 함께 구매할 수 없습니다.'));
            } else if (sType == '2') {
                alert(__('관련상품이 세트상품인 경우, 함께 장바구니에 담을 수 없습니다.'));
            }
            bReturn = false;
            return false;
        }

        if (eQuantity.attr('item_code')) {
            // 단품인가
            frm.append(getInputHidden('relation_item[]', eQuantity.val() + '||' + eQuantity.attr('item_code')));
        } else {
            // 품목이 있는가
            bReturn = true;
            // 조합/분리 형의 경우 value_mapper가 있어야한다. 있으면 가서 쓰고 없어서 undefined가 뜨면 catch를 실행 - 억지코드임.
            try {
                var aOptionMapper = $.parseJSON(eval('sOptionValueMapper' + iRelationProductNum));
                var aOptionValue = new Array();
                eOption.each(function() {
                    if ($(this).is('[required="true"]') === true && ($(this).val() == '*' || $(this).val() == '**')) {
                        alert(__('필수 옵션을 선택해주세요.'));
                        $(this).focus();
                        bReturn = false;
                        return false;
                    } else {
                        aOptionValue.push($(this).val());
                    }
                });
                sOptionValue = aOptionValue.join('#$%');
                var sItemCode = aOptionMapper[sOptionValue];
            } catch (e) {
                eOption.each(function() {
                    if ($(this).is('[required="true"]') === true && ($(this).val() == '*' || $(this).val() == '**')) {
                        alert(__('필수 옵션을 선택해주세요.'));
                        $(this).focus();
                        bReturn = false;
                        return false;
                    }
                });
                var sItemCode = eOption.val();
            }
            if (bReturn === true) {

                if (Olnk.isLinkageType(eQuantity.attr('option_type')) === false) {
                    frm.append(getInputHidden('relation_item[]', eQuantity.val() + '||' + sItemCode));
                } else {
                    var _sProductCode = eQuantity.attr('product_code');
                    var _iQuantity = eQuantity.val();

                    var _sItemCode = _sProductCode + '000A';
                    var _aItemValueNo = Olnk.getSelectedItemForBasket(_sProductCode, eOption, _iQuantity);

                    frm.append(getInputHidden('relation_item[]', _iQuantity + '||' + _sItemCode));
                    frm.append(getInputHidden('relation_item_by_etype[]', $.toJSON(_aItemValueNo)));
                }

            } else {
                return false;
            }
        }
    });
    if ($('input[name="basket_info[]"]:checked').length >= 0) {
        frm.append(getInputHidden('relation_product', 'yes'));
    }
    if (bReturn === false) return false;

    // 추가입력옵션 체크
    var bReturn = true;
    $('input[class^="option_add_box_"][name="basket_add_product[]"]').each(function() {
        var sAddOptionId = $(this).attr('id').replace('_id', '');
        var iAddProductNo = parseInt($(this).attr('class').substr($(this).attr('class').lastIndexOf('_') + 1));

        $('select[name^="addproduct_option_name_' + iAddProductNo + '"][required="true"]:visible').each(function() {
            if ($(this).val() == '*' || $(this).val() == '**') {
                alert(__('필수 옵션을 선택해주세요.'));
                $(this).focus();
                bReturn = false;
                return false;
            }
        });
        if (bReturn === false) return false;

        frm.append(getInputHidden('selected_add_item[]', $('#' + sAddOptionId + '_quantity').val() + '||' + $(this).val()));
        $bResult = checkAddOption('addproduct_add_option_id_' + iAddProductNo);
        if (bReturn === false) return false;
    });

    if ($('.add-product-checked:checked').size() > 0) {
        var aAddProduct = $.parseJSON(add_option_data);
        var aItemCode = new Array();
        var bCheckValidate = true;
        $('.add-product-checked:checked').each(function() {
            if (bCheckValidate === false) {
                return false;
            }
            var iProductNum = $(this).attr('product-no');
            var iQuantity = $('#add-product-quantity-' + iProductNum).val();
            var aData = aAddProduct[iProductNum];
            if (aData.item_code === undefined) {
                if (aData.option_type === 'T') {
                    if (aData.item_listing_type === 'S') {
                        var aOptionValue = new Array();
                        $('[id^="addproduct_option_id_' + iProductNum + '"]').each(function() {
                            aOptionValue.push($(this).val());
                        });
                        if (ITEM.isOptionSelected(aOptionValue) === true) {
                            sOptionValue = aOptionValue.join('#$%');
                            aItemCode.push([$.parseJSON(aData.option_value_mapper)[sOptionValue], iQuantity]);
                        } else {
                            bCheckValidate = false;
                            alert(__('필수 옵션을 선택해주세요.'));
                            return false;
                        }
                    } else {
                        var $eItemSelectbox = $('[name="addproduct_option_name_' + iProductNum + '"]');

                        if (ITEM.isOptionSelected($eItemSelectbox.val()) === true) {
                            aItemCode.push([$eItemSelectbox.val(), iQuantity]);
                        } else {
                            bCheckValidate = false;
                            $eItemSelectbox.focus();
                            alert(__('필수 옵션을 선택해주세요.'));
                            return false;
                        }
                    }
                } else if (Olnk.isLinkageType(sOptionType) === true) {
                    $('[id^="addproduct_option_id_' + iProductNum + '"]').each(function() {
                        alert($(this).val());
                        if ($(this).attr('required') == true && ITEM.isOptionSelected($(this).val()) === false) {
                            bCheckValidate = false;
                            $(this).focus();
                            alert(__('필수 옵션을 선택해주세요.'));
                            return false;
                        }

                        if (ITEM.isOptionSelected($(this).val()) === true) {
                            aItemCode.push([$(this).val(), iQuantity]);
                        }
                    });
                } else {
                    $('[id^="addproduct_option_id_' + iProductNum + '"]').each(function() {
                        if ($(this).attr('required') == true && ITEM.isOptionSelected($(this).val()) === false) {
                            bCheckValidate = false;
                            $(this).focus();
                            alert(__('필수 옵션을 선택해주세요.'));
                            return false;
                        }
                        if (ITEM.isOptionSelected($(this).val()) === true) {
                            aItemCode.push([$(this).val(), iQuantity]);
                        }
                    });
                }
            } else {
                aItemCode.push([aData.item_code, iQuantity]);
            }
        });
        if (bCheckValidate === true) {
            for (var x = 0; x < aItemCode.length; x++) {
                frm.append(getInputHidden('relation_item[]', aItemCode[x][1] + '||' + aItemCode[x][0]));
            }
        } else {
            bReturn = false;
        }

    }

    if (bReturn === false) return false;

    // 옵션 추가 구매 - 구상품 스킨에만 존재하는 내용
    if ($('.EC_MultipleOption').size() > 0) {
        //연동형 옵션의 경우 하단에서 재처리!
        if (Olnk.isLinkageType(sOptionType) === false) {
            // 원래 하던일은 여기서 하도록 두고(중복체크 같은 부분)
            var aMultipleOption = EC_MultipleOption.getMultipleOption();
            if (aMultipleOption == -1) return false;
            for (var x = 0; x < aMultipleOption.length; x++) {
                var iQuantity = EC_MultipleOption.getMultipleOption()[x].split('|')[7];
                var mItemCode = ITEM.getOldProductItemCode('.EC_MultipleOption:eq(' + x + ') [name^="option"]');
                var aItemCode = [];

                if (typeof mItemCode === 'string') {
                    aItemCode.push(mItemCode);
                } else {
                    aItemCode = mItemCode;
                }
                for (var i = 0; i < aItemCode.length; i++) {
                    var sItemCode = aItemCode[i];
                    frm.append(getInputHidden('selected_item[]', iQuantity + '||' + sItemCode));
                }
            }
        }

        // 사용자 지정 옵션
        if ($('.' + $.data(document, 'multiple_option_input_class')).size() > 0) {
            frm.append(getInputHidden('user_option_name_' + iProductNo, add_option_name.join(',@,')));

            var bReturn = true;
            var aAddOption = new Array();
            $('.' + $.data(document, 'multiple_option_input_class')).each(function() {
                if ($(this).val() == '') {
                    alert(__('추가 옵션을 입력해주세요.'));
                    $(this).focus();
                    bReturn = false;
                    return false;
                } else {
                    aAddOption.push($(this).val());
                }
            });
            frm.append(getInputHidden('user_option_' + iProductNo, aAddOption.join(',@,')));
        }
        if (bReturn === false) return false;
    }

    // 선택한상품만 주문하기
    if (sType == 1 || sType == 'naver_checkout') {
        var aItemParams = [];
        var aItemCode = ITEM.getItemCode();
        for (var i = 0, length = aItemCode.length; i < length; i++) {
            aItemParams.push("item_code[]=" + aItemCode[i]);
        }

        sOptionParam = sOptionParam + '&delvtype=' + delvtype + '&' + aItemParams.join("&");
        if (sType == 'naver_checkout') { //ECHOSTING-62146
            frm.append(getInputHidden('quantity_override_flag', 'T'));
        } else {

            if (Olnk.isLinkageType(sOptionType) === true) {
                var aItemValueNo = '';
                var sSelectedItemByEtype = '';
                var iQuantity = 0;

                if (isNewProductSkin() === false) {
                    iQuantity = $('#quantity').val();
                    aItemValueNo = Olnk.getSelectedItemForBasketOldSkin(sProductCode, $('[id^="product_option_id"]:visible'), iQuantity);

                    // 전부 선택인 경우 필요값 생성한다.
                    if (aItemValueNo.bCheckNum === false) {
                        var _aItemValueNo = Olnk.getProductAllSelected(sProductCode, $('[id^="product_option_id"]:visible'), iQuantity);
                        if (_aItemValueNo !== false) {
                            sSelectedItemByEtype = 'selected_item_by_etype[]=' + $.toJSON(_aItemValueNo) + '&';
                        }
                    } else {
                        sSelectedItemByEtype = 'selected_item_by_etype[]=' + $.toJSON(_aItemValueNo) + '&';
                    }


                    var iOptionNum = 1;

                    if ($.data(document, 'multiple_option_add_class') != undefined) {
                        iOptionNum = EC_MultipleOption.iOptionIdx;
                    }

                    _aItemValueNo = '';
                    $('.EC_MultipleOption').each(function(i) {
                        iQuantity = $(this).find('.' + $.data(document, 'multiple_option_quantity_class')).val();
                        aItemValueNo = Olnk.getSelectedItemForBasketOldSkin(sProductCode, $('[id^="add_' + iOptionNum + '_product_option_id"]'), iQuantity);

                        if (aItemValueNo.bCheckNum === false) {
                            _aItemValueNo = Olnk.getProductAllSelected(sProductCode, $('[id^="add_' + iOptionNum + '_product_option_id"]'), iQuantity);
                            if (_aItemValueNo !== false) {
                                sSelectedItemByEtype += 'selected_item_by_etype[]=' + $.toJSON(_aItemValueNo) + '&';
                            }
                        } else {
                            sSelectedItemByEtype += 'selected_item_by_etype[]=' + $.toJSON(aItemValueNo) + '&';
                        }

                        iOptionNum++;
                    });

                } else {
                    $('.option_box_id').each(function(i) {
                        iQuantity = $('#' + $(this).attr('id').replace('id', 'quantity')).val();
                        aItemValueNo = Olnk.getSelectedItemForBasket(sProductCode, $(this), iQuantity);
                        if (aItemValueNo.bCheckNum === false) { // 옵션박스는 있지만 값이 선택이 안된경우
                            aItemValueNo = Olnk.getProductAllSelected(sProductCode, $(this), iQuantity);
                        }
                        sSelectedItemByEtype += 'selected_item_by_etype[]=' + $.toJSON(aItemValueNo) + '&';
                    });

                    // 전부 선택인 경우 필요값 생성한다.
                    if (sSelectedItemByEtype === '') {
                        iQuantity = (buy_unit >= product_min ? buy_unit : product_min);
                        aItemValueNo = Olnk.getProductAllSelected(sProductCode, $('[id^="product_option_id"]'), iQuantity);
                        if (aItemValueNo !== false) {
                            sSelectedItemByEtype += 'selected_item_by_etype[]=' + $.toJSON(aItemValueNo) + '&';
                        }
                    }

                }


            }
            selectbuy_action(sOptionParam, iProductNo, sSelectedItemByEtype);
            frm.append(getInputHidden('quantity_override_flag', sIsPrdOverride));
        }
    }

    if (typeof ACEWrap != 'undefined') {
        ACEWrap.addBasket();
    }

    // 뉴상품 옵션 선택 구매
    if (has_option == 'T') {
        if (Olnk.isLinkageType(sOptionType) === false) {
            if (isNewProductSkin() === true) {

                if ($('[name="quantity_opt[]"][id^="option_box"]').length > 0 && $('[name="quantity_opt[]"][id^="option_box"]').length == $('[name="item_code[]"]').length) {

                    //품목별 추가옵션 이름 셋팅
                    NEWPRD_ADD_OPTION.setItemAddOptionName(frm);

                    $('[name="quantity_opt[]"][id^="option_box"]').each(function(i) {

                        var oItem = $('[name="item_code[]"]:eq(' + i + ')');
                        var sItemCode = oItem.val();

                        frm.prepend(getInputHidden('selected_item[]', $(this).val() + '||' + sItemCode));

                        //품목별 추가옵션 셋팅
                        var sItemAddOption = unescape(oItem.attr('data-item-add-option'));
                        NEWPRD_ADD_OPTION.setItemAddOption(sItemCode, sItemAddOption, frm);
                    });
                }
            } else {
                // 뉴 상품 + 구스디 스킨
                var aItemCode = ITEM.getItemCode();
                for (var i = 0; i < aItemCode.length; i++) {
                    frm.prepend(getInputHidden('selected_item[]', getQuantity() + '||' + aItemCode[i]));
                }
            }
        } else {
            var _sItemCode = sProductCode + '000A';
            var iQuantity = 0;

            var _aItemValueNo = '';
            if (isNewProductSkin() === false) {
                iQuantity = $('#quantity').val();

                // 수량이 없는 경우에는 최소 구매 수량으로 던진다!!
                if (iQuantity === undefined) {
                    iQuantity = product_min;
                }
                var aItemValueNo = Olnk.getSelectedItemForBasketOldSkin(sProductCode, $('[id^="product_option_id"]:visible'), iQuantity);
                frm.prepend(getInputHidden('selected_item[]', iQuantity + '||' + _sItemCode));

                if (aItemValueNo.bCheckNum === false) {
                    _aItemValueNo = Olnk.getProductAllSelected(sProductCode, $('[id^="product_option_id"]:visible'), iQuantity);
                    if (_aItemValueNo !== false) {
                        frm.prepend(getInputHidden('selected_item_by_etype[]', $.toJSON(_aItemValueNo)));
                    }
                } else {
                    frm.prepend(getInputHidden('selected_item_by_etype[]', $.toJSON(aItemValueNo)));
                }

                var iOptionNum = 1;

                if ($.data(document, 'multiple_option_add_class') != undefined) {
                    iOptionNum = EC_MultipleOption.iOptionIdx;
                }

                $('.EC_MultipleOption').each(function(i) {
                    iQuantity = $(this).find('.' + $.data(document, 'multiple_option_quantity_class')).val();
                    aItemValueNo = Olnk.getSelectedItemForBasketOldSkin(sProductCode, $('[id^="add_' + iOptionNum + '_product_option_id"]'), iQuantity);

                    frm.prepend(getInputHidden('selected_item[]', iQuantity + '||' + _sItemCode));

                    if (aItemValueNo.bCheckNum === false) {
                        _aItemValueNo = Olnk.getProductAllSelected(sProductCode, $('[id^="add_' + iOptionNum + '_product_option_id"]'), iQuantity);
                        if (_aItemValueNo !== false) {
                            frm.prepend(getInputHidden('selected_item_by_etype[]', $.toJSON(_aItemValueNo)));
                        }
                    } else {
                        frm.prepend(getInputHidden('selected_item_by_etype[]', $.toJSON(aItemValueNo)));
                    }

                    iOptionNum++;
                });

            } else {
                //품목별 추가옵션 이름 셋팅
                NEWPRD_ADD_OPTION.setItemAddOptionName(frm);
                $('.option_box_id').each(function(i) {

                    iQuantity = $('#' + $(this).attr('id').replace('id', 'quantity')).val();
                    _aItemValueNo = Olnk.getSelectedItemForBasket(sProductCode, $(this), iQuantity);

                    frm.prepend(getInputHidden('selected_item[]', iQuantity + '||' + _sItemCode));
                    if (_aItemValueNo.bCheckNum === false) { // 옵션박스는 있지만 값이 선택이 안된경우
                        _aItemValueNo = Olnk.getProductAllSelected(sProductCode, $(this), iQuantity);
                    }
                    frm.prepend(getInputHidden('selected_item_by_etype[]', $.toJSON(_aItemValueNo)));
                    var oItem = $('[name="item_code[]"]:eq(' + i + ')');
                    var sItemCode = oItem.val();

                    //품목별 추가옵션 셋팅
                    var sItemAddOption = unescape(oItem.attr('data-item-add-option'));
                    NEWPRD_ADD_OPTION.setItemAddOption(_sItemCode + '_' + i, sItemAddOption, frm);
                });

                // 전부 선택인 경우 필요값 생성한다.
                if (_aItemValueNo === '') {
                    iQuantity = (buy_unit >= product_min ? buy_unit : product_min);
                    frm.prepend(getInputHidden('selected_item[]', iQuantity + '||' + _sItemCode));
                    _aItemValueNo = Olnk.getProductAllSelected(sProductCode, $('[id^="product_option_id"]'), iQuantity);
                    if (_aItemValueNo !== false) {
                        frm.prepend(getInputHidden('selected_item_by_etype[]', $.toJSON(_aItemValueNo)));
                    }
                }
            }

        }
    } else {
        if (item_code === undefined) {
            var sItemCode = product_code + '000A';
        } else {
            var sItemCode = item_code;
        }
        if (sType != 'sms_restock') {
            frm.prepend(getInputHidden('selected_item[]', $(quantity_id).val() + '||' + sItemCode));
        }
    }
    // 파일첨부 옵션의 파일업로드가 없을 경우 바로 장바구니에 넣기
    if (FileOptionManager.existsFileUpload() === false) {
        action_basket(sType, 'detail', sAction, frm.serialize(), sBasketType);
        // 파일첨부 옵션의 파일업로드가 있으면
    } else {
        FileOptionManager.upload(function(mResult) {
            // 파일업로드 실패
            if (mResult === false) return false;

            // 파일업로드 성공
            for (var sId in mResult) {
                frm.append(getInputHidden(sId, FileOptionManager.encode(mResult[sId])));
            }

            action_basket(sType, 'detail', sAction, frm.serialize(), sBasketType);
        });
    }
}

/*
 * 판매가 대체 문구 상품 체크
 */
function checkPriceType() {
    if (typeof product_price_content == 'undefined') {
        return true;
    }

    var sProductcontent = product_price_content.replace(/\s/g, '').toString();

    if (sProductcontent === '1') {
        return false;
    }

    return true;
}

/**
 * 품절 상품 체크
 */
function checkSoldout() {
    // 품절 품목만 추가된 경우
    if ($('.option_box_id').length == 0 && $('.soldout_option_box_id').length > 0) {
        alert(__('품절된 상품은 구매가 불가능합니다.'));
        return false;
    }

    return true;
}


/**
 * 선택한상품만 주문하기
 *
 * @param string sOptionParam 옵션 파람값
 * @param int iProductNo 상품번호
 * @param string sSelectedItemByEtype 상품연동형의 경우 입력되는 선택된옵션 json 데이터
 */
function selectbuy_action(sOptionParam, iProductNo, sSelectedItemByEtype) {
    var sAddParam = '';
    if (typeof sSelectedItemByEtype != 'undefined' && sSelectedItemByEtype != '') {
        sAddParam = '&' + sSelectedItemByEtype;
    }

    var sUrl = '/exec/front/order/basket/?command=select_prdcnt&product_no=' + iProductNo + '&option_type=' + (window['option_type'] || '') + sOptionParam + sAddParam;
    $.ajax({
        url: sUrl,
        dataType: 'json',
        async: false,
        success: function(data) {
            if (data.result > 0 && !confirm(sprintf(__('동일상품이 장바구니에 %s개 있습니다.'), data.result) + '\n' + __('함께 구매하시겠습니까?'))) {
                sIsPrdOverride = 'T';
            }
        }
    });
}

/**
 * 장바구니 담기(카테고리)
 *
 * @param int iProductNo 상품번호
 * @param int iCategoryNo 카테고리 번호
 * @param int iDisplayGroup display_group
 * @param string sBasketType 무이자 설정(A0000:일반, A0001:무이자)
 * @param string iQuantity 주문수량
 * @param string sItemCode 아이템코드
 * @param string sDelvType 배송타입
 */
function category_add_basket(iProductNo, iCategoryNo, iDisplayGroup, sBasketType, bList, iQuantity, sItemCode, sDelvType, sProductMaxType, sProductMax) {
    if (iQuantity == undefined) {
        iQuantity = 1;
    }

    if (bList == true) {
        try {
            if ($.type(EC_ListAction) == 'object') {
                EC_ListAction.getOptionSelect(iProductNo, iCategoryNo, iDisplayGroup, sBasketType);
            }
        } catch (e) {
            alert(__('장바구니에 담을 수 없습니다.'));
            return false;
        }
    } else {
        var sAction = '/exec/front/order/basket/';
        var sData = 'command=add&quantity=' + iQuantity + '&product_no=' + iProductNo + '&main_cate_no=' + iCategoryNo + '&display_group=' + iDisplayGroup + '&basket_type=' + sBasketType + '&delvtype=' + sDelvType + '&product_max_type=' + sProductMaxType + '&product_max=' + sProductMax;
        // 장바구니 위시리스트인지 여부
        if (typeof(basket_page_flag) != 'undefined' && basket_page_flag == 'T') {
            sData = sData + '&basket_page_flag=' + basket_page_flag;
        }

        // 뉴상품 옵션 선택 구매
        sData = sData + '&selected_item[]=' + iQuantity + '||' + sItemCode + '000A';

        action_basket(2, 'category', sAction, sData, sBasketType);
    }
}

/**
 * 구매하기
 *
 * @param int iProductNo 상품번호
 * @param int iCategoryNo 카테고리 번호
 * @param int iDisplayGroup display_group
 * @param string sBasketType 무이자 설정(A0000:일반, A0001:무이자)
 * @param string iQuantity 주문수량
 */
function add_order(iProductNo, iCategoryNo, iDisplayGroup, sBasketType, iQuantity) {
    if (iQuantity == undefined) {
        iQuantity = 1;
    }

    var sAction = '/exec/front/order/basket/';
    var sData = 'command=add&quantity=' + iQuantity + '&product_no=' + iProductNo + '&main_cate_no=' + iCategoryNo + '&display_group=' + iDisplayGroup + '&basket_type=' + sBasketType;

    action_basket(1, 'wishlist', sAction, sData, sBasketType);
}

/**
 * 레이어 생성
 *
 * @param layerId
 * @param sHtml
 */
function create_layer(layerId, sHtml, bBuyLayer) {
    if (bBuyLayer == true) {
        parent.$('body').append($('<div id="' + layerId + '"></div>'));
        parent.$('#' + layerId).html(sHtml);
        parent.$('#' + layerId).show();
    } else {
        $('<div id="' + layerId + '"></div>').appendTo('body');
        $('#' + layerId).html(sHtml);
        $('#' + layerId).show();
    }
    // set delvtype to basket
    try {
        $(".xans-product-basketadd").find("a[href='/order/basket.html']").attr("href", "/order/basket.html?delvtype=" + delvtype);
    } catch (e) {}
    try {
        $(".xans-order-layerbasket").find("a[href='/order/basket.html']").attr("href", "/order/basket.html?delvtype=" + delvtype);
    } catch (e) {}
}

/**
 * 레이어 위치 조정
 *
 * @param layerId
 */
function position_layer(layerId) {
    var obj = $('#' + layerId);

    var x = 0;
    var y = 0;
    try {
        var hWd = parseInt(document.body.clientWidth / 2 + $(window).scrollLeft());
        var hHt = parseInt(document.body.clientHeight / 2 + $(window).scrollTop() / 2);
        var hBW = parseInt(obj.width()) / 2;
        var hBH = parseInt(hHt - $(window).scrollTop());

        x = hWd - hBW;
        if (x < 0) x = 0;
        y = hHt - hBH;
        if (y < 0) y = 0;

    } catch (e) {}

    obj.css({
        position: 'absolute',
        display: 'block',
        top: y + "px",
        left: x + "px"
    });

}


// 장바구니 담기 처리중인지 체크 - (ECHOSTING-85853, 2013.05.21 by wcchoi)
var bIsRunningAddBasket = false;

/**
 * 장바구니/구매 호출
 *
 * @param sType
 * @param sGroup
 * @param sAction
 * @param sParam
 * @param aBasketType
 * @param bNonDuplicateChk
 */
function action_basket(sType, sGroup, sAction, sParam, sBasketType, bNonDuplicateChk) {
    // 장바구니 담기에 대해서만 처리
    // 중복 체크 안함 이 true가 아닐경우(false나 null)에만 중복체크
    if (sType == 2 && bNonDuplicateChk != true) {
        if (bIsRunningAddBasket) {
            alert(__('처리중입니다. 잠시만 기다려주세요.'));
            return;
        } else {
            bIsRunningAddBasket = true;
        }
    }

    if (sType == 'sms_restock') {
        action_sms_restock(sParam);
        return;
    }

    $.post(sAction, sParam, function(data) {
        basket_result_action(sType, sGroup, data, sBasketType);

        bIsRunningAddBasket = false; // 장바구니 담기 처리 완료

    }, 'json');

    // 관신상품 > 전체상품 주문 ==> 장바구니에 들어가기도 전에 /exec/front/order/order/ 호출하게 되어 오류남
    // async : false - by wcchoi
    // 다시 async모드로 원복하기로 함 - ECQAINT-7857
    /*
    $.ajax({
        type: "POST",
        url: sAction,
        data: sParam,
        async: false,
        success: function(data) {
            basket_result_action(sType, sGroup, data, sBasketType);
            bIsRunningAddBasket = false; // 장바구니 담기 처리 완료
        },
        dataType: 'json'
    });
    */
}

/**
 * 리스트나 상세에서 장바구니 이후의 액션을 처리하고 싶을 경우 이변수를 파라미터로 지정해줌
 */
var sProductLink = null;
/**
 * 장바구니 결과 처리
 *
 * @param sType
 * @param sGroup
 * @param aData
 * @param aBasketType
 */
function basket_result_action(sType, sGroup, aData, sBasketType) {
    var sHtml = '';
    var bOpener = false;
    var oOpener = findMainFrame();
    var sLocation = location;

    var bBuyLayer = false;

    if (aData == null) return;
    if (aData.result >= 0) {

        try {
            if (oOpener != null && typeof(oOpener) != 'undefined' && oOpener.location.hostname == self.location.hostname) {
                if (oOpener.location.pathname.indexOf('coupon_product_list') < 0 && oOpener.location.pathname.indexOf('admin') < 0) {
                    bOpener = true;
                }
            }
        } catch (e) {}

        try {
            if (mobileWeb == true && parent.$('#opt_layer_window').length > 0 && typeof(window.parent) == 'object') {
                parent.$('html, body').css('overflowY', 'auto');
                parent.$('#opt_layer_window').hide();
                sLocation = parent.location;
                bBuyLayer = true;
            }
        } catch (e) {}

        // 네이버 체크아웃
        if (sType == 'naver_checkout') {
            var sUrl = '/exec/front/order/navercheckout';

            // inflow param from naver common JS to Checkout Service
            try {
                if (typeof(wcs) == 'object') {
                    var inflowParam = wcs.getMileageInfo();
                    if (inflowParam != false) {
                        sUrl = sUrl + '?naver_inflow_param=' + inflowParam;
                    }
                }
            } catch (e) {}

            if (is_order_page == 'N' && bIsMobile == false) {
                window.open(sUrl);
                return false;
            } else {
                sLocation.href = sUrl;
                return false;
            }
        }

        // 배송유형
        var sDelvType = '';
        if (typeof(delvtype) != 'undefined') {
            if (typeof(delvtype) == 'object') {
                sDelvType = $(delvtype).val();
            } else {
                sDelvType = delvtype;
            }
        } else if (aData.sDelvType != null) {
            sDelvType = aData.sDelvType;
        }

        if (sType == 1) { // 바로구매하기
            if (aData.isLogin == 'T') { // 회원
                if (bOpener) {
                    oOpener.location.href = "/order/orderform.html?basket_type=" + sBasketType + "&delvtype=" + sDelvType;
                } else {
                    sLocation.href = "/order/orderform.html?basket_type=" + sBasketType + "&delvtype=" + sDelvType;
                }
            } else { // 비회원
                sUrl = '/member/login.html?noMember=1&returnUrl=' + encodeURIComponent('/order/orderform.html?basket_type=' + sBasketType + "&delvtype=" + sDelvType);
                sUrl += '&delvtype=' + sDelvType;
                if (bOpener) {
                    oOpener.location.href = sUrl;
                } else {
                    sLocation.href = sUrl;
                    // parent.location.href = sUrl;
                }
            }
        } else { // 장바구니담기
            if (sGroup == 'detail') {
                if (mobileWeb === true) {
                    if (typeof(basket_page_flag) != 'undefined' && basket_page_flag == 'T') {
                        sLocation.reload();
                        return;
                    }
                } else {
                    if (bOpener) {
                        oOpener.location.href = "/order/basket.html" + "?delvtype=" + sDelvType;
                    }
                }

                var oSearch = /basket.html/g;
                if (typeof(aData.isDisplayBasket) != "undefined" && aData.isDisplayBasket == 'T' && oSearch.test(window.location.pathname) == false) {
                    if ((typeof(aData.isDisplayLayerBasket) != "undefined" && aData.isDisplayLayerBasket == 'T') && (typeof(aData.isBasketPopup) != "undefined" && aData.isBasketPopup == 'T')) {
                        if (!bOpener) layer_basket2(sDelvType);
                    } else {
                        layer_basket(sDelvType, bBuyLayer);
                    }
                } else {
                    sLocation.href = "/order/basket.html?" + "&delvtype=" + sDelvType;
                }
            } else {
                // from으로 위시리스트에서 요청한건지 판단.
                var bIsFromWishlist = false;
                if (typeof(aData.from) != "undefined" && aData.from == "wishlist") {
                    bIsFromWishlist = true;
                }

                // 장바구니 위시리스트인지 여부
                if (typeof(basket_page_flag) != 'undefined' && basket_page_flag == 'T' || bIsFromWishlist == true) {
                    sLocation.reload();
                    return;
                }

                if ((typeof(aData.isDisplayLayerBasket) != "undefined" && aData.isDisplayLayerBasket == 'T') && (typeof(aData.isBasketPopup) != "undefined" && aData.isBasketPopup == 'T')) {
                    layer_basket2(sDelvType);
                } else {
                    layer_basket(sDelvType, bBuyLayer);
                }
            }
        }
    } else {
        var msg = aData.alertMSG.replace('\\n', '\n');
        try {
            msg = decodeURIComponent(decodeURIComponent(msg));
        } catch (err) {}
        alert(msg);

        if (aData.result == -111) {
            if (sProductLink !== null) {
                sLocation.href = '/product/detail.html?' + sProductLink;
            }
        }
        if (aData.result == -101) {
            sUrl = '/member/login.html?noMember=1&returnUrl=' + encodeURIComponent(location.href);
            if (bOpener) {
                oOpener.location.href = sUrl;
            } else {
                sLocation.href = sUrl;
            }
        }
    }
    if (bOpener === true && opener) {
        self.close();
    }
}

function layer_basket(sDelvType, bBuyLayer) {
    var oProductName = null;
    if (typeof(product_name) !== 'undefined') {
        oProductName = {
            'product_name': product_name
        };
    }
    $('.xans-product-basketoption').remove();
    $.get('/product/add_basket.html?delvtype=' + sDelvType, oProductName, function(sHtml) {
        create_layer('confirmLayer', sHtml, bBuyLayer);
    });
}

function layer_basket2(sDelvType) {
    $('.xans-order-layerbasket').remove();
    $.get('/product/add_basket2.html?delvtype=' + sDelvType + '&layerbasket=T', '', function(sHtml) {
        create_layer('confirmLayer', sHtml, false);
    });
}

function layer_wishlist(bBuyLayer) {
    $('.layerWish').remove();
    $.get('/product/layer_wish.html', '', function(sHtml) {
        create_layer('confirmLayer', sHtml, bBuyLayer);
        Olnk.bugfixCreateLayerForWish();
    });
}

function go_basket() {
    var oOpener = findMainFrame();
    if (oOpener !== null && typeof(oOpener) != 'object') {
        location.href = '/order/basket.html';
    } else {
        oOpener.location.href = '/order/basket.html';
        if (opener !== null) {
            self.close();
        }
    }
}

function move_basket_page() {
    var sLocation = location;
    try {
        if (mobileWeb == true && parent.$('#opt_layer_window').length > 0 && typeof(window.parent) == 'object') {
            parent.$('html, body').css('overflowY', 'auto');
            parent.$('#opt_layer_window').hide();
            sLocation = parent.location;
        }
    } catch (e) {}

    sLocation.href = '/order/basket.html';
}

/**
 * 이미지 확대보기 (상품상세 버튼)
 */
function go_detail() {
    var sUrl = '/product/detail.html?product_no=' + iProductNo;
    var oOpener = findMainFrame();

    if (typeof(iCategoryNo) != 'undefined') {
        sUrl += '&cate_no=' + iCategoryNo;
    }

    if (typeof(iDisplayGroup) != 'undefined') {
        sUrl += '&display_group=' + iDisplayGroup;
    }

    if (oOpener !== null && typeof(oOpener) != 'object') {
        location.href = sUrl;
    } else {
        oOpener.location.href = sUrl;
        if (opener !== null) {
            self.close();
        }
    }
}

/**
 * 바로구매하기/장바구니담기 Action  - 로그인하지 않았을 경우
 */
function check_action_nologin() {
    alert(__('회원만 구매 가능합니다. 비회원인 경우 회원가입 후 이용하여 주세요.'));

    var bOpener = false;
    var oOpener = findMainFrame();
    var sLocation = location;

    try {
        if (oOpener != null && typeof(oOpener) != 'undefined' && oOpener.location.hostname == self.location.hostname) {
            bOpener = true;
        }
    } catch (e) {}

    try {
        if (mobileWeb == true && parent.$('#opt_layer_window').length > 0 && typeof(window.parent) == 'object') {
            parent.$('html, body').css('overflowY', 'auto');
            parent.$('#opt_layer_window').hide();
            sLocation = parent.location;
        }
    } catch (e) {}

    sUrl = '/member/login.html?noMember=1&returnUrl=' + encodeURIComponent(location.href);
    if (bOpener) {
        oOpener.location.href = sUrl;
    } else {
        sLocation.href = sUrl;
    }
}

/**
 * 바로구매하기 Action  - 불량회원 구매제한
 */
function check_action_block(sMsg) {
    if (sMsg == '') {
        sMsg = __('쇼핑몰 관리자가 구매 제한을 설정하여 구매하실 수 없습니다.');
    }
    alert(sMsg);
}

/**
 * 관심상품 등록 - 로그인하지 않았을 경우
 */
function add_wishlist_nologin(sUrl) {

    alert(__('로그인 후 관심상품 등록을 해주세요.'));

    btn_action_move_url(sUrl);
}

/**
 * 바로구매하기 / 장바구니 담기 / 관심상품 등록 시 url 이동에 사용하는 메소드
 * @param sUrl 이동할 주소
 */
function btn_action_move_url(sUrl) {
    var bOpener = false;
    var oOpener = findMainFrame();
    var sLocation = location;

    try {
        if (oOpener != null && typeof(oOpener) != 'undefined' && oOpener.location.hostname == self.location.hostname) {
            bOpener = true;
        }
    } catch (e) {}

    try {
        if (mobileWeb == true && parent.$('#opt_layer_window').length > 0 && typeof(window.parent) == 'object') {
            parent.$('html, body').css('overflowY', 'auto');
            parent.$('#opt_layer_window').hide();
            sLocation = parent.location;
        }
    } catch (e) {}

    sUrl += '?return_url=' + encodeURIComponent('http://' + location.hostname + location.pathname + location.search);
    if (bOpener === false) {
        sLocation.replace(sUrl);
    } else {
        opener.location.replace(sUrl);
    }
}

/**
 * return_url 없이 url 이동에 사용하는 메소드
 * @param sUrl 이동할 주소
 */
function btn_action_move_no_return_url(sUrl) {
    var bOpener = false;
    var oOpener = findMainFrame();
    try {
        if (oOpener != null && typeof(oOpener) != 'undefined' && oOpener.location.hostname == self.location.hostname) {
            bOpener = true;
        }
    } catch (e) {}

    if (bOpener === false) {
        location.replace(sUrl);
    } else {
        oOpener.location.replace(sUrl);
    }
}

/**
 * 관심상품 등록 - 파라미터 생성
 */
function add_wishlist(sMode) {
    var sUrl = 'http://' + location.hostname;
    sUrl += '/exec/front/Product/Wishlist/';
    var param = location.search.substring(location.search.indexOf('?') + 1);
    sParam = param + '&command=add';
    sParam += '&referer=' + encodeURIComponent('http://' + location.hostname + location.pathname + location.search);

    add_wishlist_action(sUrl, sParam, sMode);
}

var bWishlistSave = false;

function add_wishlist_action(sAction, sParam, sMode) {
    if (bWishlistSave === true) {
        alert('관심상품 등록중입니다.');
        return false;
    }
    var required_msg = __('품목을 선택해 주세요.');
    var aItemCode = ITEM.getWishItemCode();
    var sSelectedItemByEtype = '';

    if (Olnk.isLinkageType(sOptionType) === true) {
        if (isNewProductSkin() === false) {
            sItemCode = Olnk.getSelectedItemForWishOldSkin(sProductCode, $('[id^="product_option_id"]:visible'));

            if (sItemCode === false) {
                alert(__('필수 옵션을 선택해주세요.'));
                return false;
            } else {
                sSelectedItemByEtype += 'selected_item_by_etype[]=' + $.toJSON(sItemCode) + '&';
                aItemCode.push(sItemCode);
            }

        } else {
            $('.soldout_option_box_id,.option_box_id').each(function(i) {
                sItemCode = Olnk.getSelectedItemForWish(sProductCode, $(this));
                if (sItemCode.bCheckNum === false) {
                    sItemCode = Olnk.getProductAllSelected(sProductCode, $(this), 1);
                }
                sSelectedItemByEtype += 'selected_item_by_etype[]=' + $.toJSON(sItemCode) + '&';
                aItemCode.push(sItemCode);
            });

            // 전부 선택인 경우 필요값 생성한다.
            if (sSelectedItemByEtype === '') {
                iQuantity = (buy_unit >= product_min ? buy_unit : product_min);
                aItemValueNo = Olnk.getProductAllSelected(sProductCode, $('[id^="product_option_id"]'), 1);
                if (aItemValueNo !== false) {
                    sSelectedItemByEtype += 'selected_item_by_etype[]=' + $.toJSON(aItemValueNo) + '&';
                    aItemCode.push(aItemValueNo);
                }
            }
        }


        if (/^\*+$/.test(aItemCode) === true || aItemCode == '') {
            alert(required_msg);
            return false;
        }


    }

    if (aItemCode === false) {
        var sBuyBtnParent = $(sMode).parent().parent().attr('id');
        try {
            if (mobileWeb == true) {
                if (sBuyBtnParent != '' && sBuyBtnParent == 'fixedActionButton') {
                    $('select[id^="' + product_option_id + '"]:visible').each(function() {
                        var sSelectOptionId = $(this).attr('id');
                        var sParentVal = $(this).val();
                        $("#productOptionIframe")[0].contentWindow.$('#product_detail_option_layer #' + sSelectOptionId + '').val(sParentVal).trigger('change');
                    });
                    var iTop = parseInt(($(window).height() - $("#productOptionIframe").height()) / 2);
                    $("#opt_layer_iframe_parent").css({
                        "top": iTop,
                        "left": 0
                    });
                    $('html, body').css({
                        'overflow-y': 'hidden',
                        width: '100%',
                        height: '100%'
                    });
                    $('#opt_layer_window').show();
                    return;
                }
            }
        } catch (e) {}
        alert(required_msg);
        return false;
    }

    if (aItemCode !== null) {

        var sItemCode = '';
        var aTemp = [];

        for (var x in aItemCode) {
            try {
                var opt_id = aItemCode[x].substr(aItemCode[x].length - 4, aItemCode[x].length);
                aTemp.push('selected_item[]=' + opt_id);
            } catch (e) {}
        }

        if (Olnk.isLinkageType(sOptionType) === true) {
            sParam = sParam + '&' + 'selected_item[]=000A&' + sSelectedItemByEtype;
        } else {
            sParam = sParam + '&' + aTemp.join('&');
        }
    }

    sParam = sParam + '&product_no=' + iProductNo;


    // 추가 옵션 체크 (품목기반 추가옵션일때는 폼제출때 검증 불필요)
    if (NEWPRD_ADD_OPTION.isItemBasedAddOptionType() !== true && checkAddOption() === false) {
        return false;
    }

    // 추가옵션
    var aAddOptionStr = new Array();
    var aAddOptionRow = new Array();
    if (add_option_name) {
        for (var i = 0; i < add_option_name.length; i++) {
            if (add_option_name[i] != '') {
                aAddOptionRow.push(add_option_name[i] + '*' + $('#' + add_option_id + i).val());
            }
        }
    }
    aAddOptionStr.push(aAddOptionRow);

    sParam += '&add_option=' + encodeURIComponent(aAddOptionStr.join('|'));

    // 파일첨부 옵션 유효성 체크
    if (FileOptionManager.checkValidation() === false) return;

    bWishlistSave = true;

    // 파일첨부 옵션의 파일업로드가 없을 경우 바로 관심상품 넣기
    if (FileOptionManager.existsFileUpload() === false) {
        add_wishlist_request(sParam, sMode);
        // 파일첨부 옵션의 파일업로드가 있으면
    } else {
        FileOptionManager.upload(function(mResult) {
            // 파일업로드 실패
            if (mResult === false) {
                bWishlistSave = false;
                return false;
            }

            // 파일업로드 성공
            for (var sId in mResult) {
                sParam += '&' + sId + '=' + FileOptionManager.encode(mResult[sId]);
            }

            add_wishlist_request(sParam, sMode);
        });
    }
}

function add_wishlist_request(sParam, sMode) {
    var sUrl = '/exec/front/Product/Wishlist/';

    $.post(
        sUrl,
        sParam,
        function(data) {
            if (sMode != 'back') {
                add_wishlist_result(data);
            }
            bWishlistSave = false;
        },
        'json');
}

function add_wishlist_result(aData) {
    var bBuyLayer = false;
    var bOpener = true;
    var oOpener = findMainFrame();
    var agent = navigator.userAgent.toLowerCase();

    if (aData == null) return;
    if (aData.result == 'SUCCESS') {

        if (agent.indexOf('iphone') != -1 || agent.indexOf('android') != -1) {
            try {
                if (parent.$('#opt_layer_window').length > 0 && typeof(window.parent) == 'object') {
                    parent.$('html, body').css('overflowY', 'auto');
                    parent.$('#opt_layer_window').hide();
                    bBuyLayer = true;
                }
            } catch (e) {}
        }

        try {
            if (oOpener != null && typeof(oOpener) != 'undefined' && oOpener.location.hostname == self.location.hostname) {
                bOpener = false;
            }
        } catch (e) {}

        if (aData.confirm == 'T' && bOpener === true) {
            layer_wishlist(bBuyLayer);
            return;
        }
        alert(__('관심상품으로 등록되었습니다.'))
    } else if (aData.result == 'ERROR') {
        alert(__('실패하였습니다.'));
    } else if (aData.result == 'NOT_LOGIN') {
        alert(__('회원 로그인 후 이용하실 수 있습니다.'));
    } else if (aData.result == 'INVALID_REQUEST') {
        alert(__('파라미터가 잘못되었습니다.'));
    } else if (aData.result == 'NO_TARGET') {
        alert(__('이미 등록되어 있습니다.'));
    }
}

/**
 * 추가된 함수
 * 해당 value값을 받아 replace 처리
 * @param string sValue value
 * @return string replace된 sValue
 */
function replaceCheck(sName, sValue) {
    //ECHOSTING-9736
    if (typeof(sValue) == "string" && (sName == "option_add[]" || sName.indexOf("item_option_add") === 0)) {
        sValue = sValue.replace(/'/g, '\\&#039;');
    }
    // 타입이 string 일때 연산시 단일 따움표 " ' " 문자를 " ` " 액센트 문자로 치환하여 깨짐을 방지
    return sValue;
}


/**
 * name, value값을 받아 input hidden 태그 반환
 *
 * @param string sName name
 * @param string sValue value
 * @return string input hidden 태그
 */
function getInputHidden(sName, sValue) {

    sValue = replaceCheck(sName, sValue); // 추가된 부분 (replaceCheck 함수 호출)
    return "<input type='hidden' name='" + sName + "' value='" + sValue + "' />";
}


/**
 * 필수옵션이 선택되었는지 체크
 *
 * @return bool 필수옵션이 선택되었다면 true, 아니면 false 반환
 */
function checkOptionRequired(sReq) {
    var bResult = true;
    // 옵션이 없다면 필수값 체크는 필요없음.
    if (has_option === 'F') {
        return bResult;
    }
    var sTargetOptionId = product_option_id
    if (sReq != null) {
        sTargetOptionId = sReq;
    }

    if (option_type === 'F') {
        // 단독구성
        var iOptionCount = $('select[id^="' + sTargetOptionId + '"][required="true"]:visible').length;
        if (iOptionCount > 0) {
            if (ITEM.getItemCode() === false) {
                bResult = false;
                return false;
            }

            var aRequiredOption = new Object();
            var aItemCodeList = ITEM.getItemCode();
            // 필수 옵션정보와 선택한 옵션 정보 비교
            for (var i = 0; i < aItemCodeList.length; i++) {
                var sTargetItemCode = aItemCodeList[i];
                $('select[id^="' + sTargetOptionId + '"][required="true"]:visible option').each(function() {
                    if ($(this).val() == sTargetItemCode) {
                        var sProductOptionId = $(this).parent().attr('id');
                        aRequiredOption[sProductOptionId] = true;
                    }
                });

            }
            // 필수옵션별 개수보다 선택한 옵션개수가 적을경우 리턴
            if (iOptionCount > Object.size(aRequiredOption)) {
                bResult = false;
                return bResult;
            }
        }
    } else {
        if (Olnk.isLinkageType(sOptionType) === true) {
            if (isNewProductSkin() === false) {
                $('select[id^="' + product_option_id + '"][required="true"]:visible').each(function() {
                    var sel = parseInt($(this).val());

                    if (isNaN(sel) === true) {
                        $(this).focus();
                        bResult = false;
                        return false;
                    }
                });
                // 추가 구매 check 
                $('.' + $.data(document, 'multiple_option_select_class')).each(function(i) {
                    if (Boolean($(this).attr('required')) === true) {
                        var sel = parseInt($(this).val());

                        if (isNaN(sel) === true) {
                            $(this).focus();
                            bResult = false;
                            return false;
                        }
                    }
                });
            } else { // 연동형 사용중이면서 뉴스킨
                var aItemCodeList = ITEM.getItemCode();
                if (aItemCodeList === false) {
                    bResult = false;
                    return false;
                }
                // 연동형 옵션의 버튼 사용중이지만 선택된 품목이 없는 경우 , 뉴스킨에서만 동작해야 함.                
                if (Olnk.getOptionPushbutton($('#option_push_button')) === true && $('.option_box_id').length === 0) {
                    bResult = false;
                    return false;
                }
            }
            return bResult;
        }
        if (ITEM.getItemCode() === false) {
            bResult = false;
            return false;
        }
        // 조합구성
        if (item_listing_type == 'S') {
            // 분리선택형
            var eTarget = $.parseJSON(option_value_mapper);
            for (var x in eTarget) {
                if (ITEM.getItemCode().indexOf(eTarget[x]) > -1) {
                    bResult = true;
                    break;
                } else {
                    bResult = false;
                }
            }
            if (bResult === false) {
                bResult = false;
                return false;
            }
        } else {
            $('select[id^="' + product_option_id + '"][required="true"]:visible').each(function() {
                var eTarget = $(this).children().children();
                bResult = false;
                eTarget.each(function() {
                    if (ITEM.getItemCode().indexOf($(this).val()) > -1) {
                        bResult = true;
                        return false;
                    }
                });
                if (bResult === false) {
                    return false;
                }
            });
        }
    }

    return bResult;
}

/**
 * 추가옵션 입력값 체크
 *
 * @return bool 모든 추가옵션에 값이 입력되었다면 true, 아니면 false
 */
function checkAddOption(sReq) {
    if (sReq != null) {
        add_option_id = sReq;
    }
    var bResult = true;
    $('[id^="' + add_option_id + '"]:visible').each(function() {
        if ($(this).attr('require') !== false && $(this).attr('require') == 'T') {
            if ($(this).val().replace(/^[\s]+|[\s]+$/g, '').length == 0) {
                alert(__('추가 옵션을 입력해주세요.'));
                $(this).focus();
                bResult = false;
                return false;
            }
        }
    });

    return bResult;
}

/**
 * 수량 가져오기
 *
 * @return mixed 정상적인 수량이면 수량(integer) 반환, 아니면 false 반환
 */
function getQuantity() {
    // 뉴상품인데 디자인이 수정안됐을 수 있다.
    if (isNewProductSkin() === false) {
        iQuantity = parseInt($(quantity_id).val(), 10);
    } else {
        if (has_option == 'T') {
            var iQuantity = 0;

            if (Olnk.isLinkageType(sOptionType) === true) {
                iQuantity = parseInt($(quantity_id).val(), 10);
                return iQuantity;
            }

            $('[name="quantity_opt[]"]').each(function() {
                iQuantity = iQuantity + parseInt($(this).val(), 10);
            });
        } else {
            var iQuantity = parseInt($(quantity_id).val().replace(/^[\s]+|[\s]+$/g, '').match(/[\d\-]+/), 10);
            if (isNaN(iQuantity) === true || $(quantity_id).val() == '' || $(quantity_id).val().indexOf('.') > 0) {
                return false;
            }
        }

    }

    return iQuantity;
}

/**
 * 수량 체크
 *
 * @return mixed 올바른 수량이면 수량을, 아니면 false
 */
function checkQuantity() {
    // 수량 가져오기
    var iQuantity = getQuantity();

    if (isNewProductSkin() === false) {
        if (iQuantity === false) return false;

        // 구스킨의 옵션 추가인 경우 수량을 모두 합쳐야 함..하는수 없이 each추가
        // 재고 관련도 여기서 하나?
        if (Olnk.isLinkageType(option_type) === true) {
            var sOptionIdTmp = '';
            $('select[id^="' + product_option_id + '"]:visible').each(function() {
                if (/^\*+$/.test($(this).val()) === false) {
                    sOptionIdTmp = $(this).val();
                    return false;
                }
            });

            $('.EC_MultipleOption').each(function(i) {
                iQuantity += parseInt($(this).find('.' + $.data(document, 'multiple_option_quantity_class')).val(), 10);
            });

            if (Olnk.getStockValidate(sOptionIdTmp, iQuantity) === true) {
                alert(__('상품의 수량이 재고수량 보다 많습니다.'));
                $(quantity_id).focus();
                return false;
            }
        }


        if (iQuantity < product_min) {
            alert(sprintf(__('최소 주문수량은 %s 입니다.'), product_min));
            $(quantity_id).focus();
            return false;
        }
        if (iQuantity > product_max && product_max > 0) {
            alert(sprintf(__('최대 주문수량은 %s 입니다.'), product_max));
            $(quantity_id).focus();
            return false;
        }

    } else {
        var bResult = true;
        $('[name="quantity_opt[]"]').each(function() {
            iQuantity = parseInt($(this).val());
            var iProductMin = product_min;
            var iProductMax = product_max;

            // 추가 구성상품인 경우 product_min ,  product_max 값은 다른값을 비교해야 함..
            if ($(this).attr('id').indexOf('add_') > -1) {
                iProductMin = $('#' + $(this).attr('id').replace('quantity', 'productmin')).val();
                iProductMax = $('#' + $(this).attr('id').replace('quantity', 'productmax')).val();
            }


            if (iQuantity < iProductMin) {
                alert(sprintf(__('상품별 최소 주문수량은 %s 입니다.'), iProductMin));
                $(quantity_id).focus();
                bResult = false;
                return false;
            }
            if (iQuantity > iProductMax && iProductMax > 0) {
                alert(sprintf(__('상품별 최대 주문수량은 %s 입니다.'), iProductMax));
                $(quantity_id).focus();
                bResult = false;
                return false;
            }
        });

        if (bResult == false) {
            return bResult;
        }
    }


    return iQuantity;
}

function commify(n) {
    var reg = /(^[+-]?\d+)(\d{3})/; // 정규식
    n += ''; // 숫자를 문자열로 변환
    while (reg.test(n)) {
        n = n.replace(reg, '$1' + ',' + '$2');
    }
    return n;
}

var isClose = 'T';

function optionPreview(obj, sAction, sProductNo, closeType) {
    var sPreviewId = 'btn_preview_';
    var sUrl = '/product/option_preview.html';
    var layerId = $('#opt_preview_' + sAction + '_' + sProductNo);

    // layerId = action명 + product_no 로 이루어짐 (한 페이지에 다른 종류의 상품리스트가 노출될때 구분 필요)
    if ($(layerId).length > 0) {
        $(layerId).show();
    } else if (sProductNo != '') {
        $.post(sUrl, 'product_no=' + sProductNo + '&action=' + sAction, function(result) {
            $(obj).after(result.replace(/[<]script( [^ ]+)? src=\"[^>]*>([\s\S]*?)[<]\/script>/g, ""));
        });
    }
}

function closeOptionPreview(sAction, sProductNo) {
    isClose = 'T';
    setTimeout("checkOptionPreview('" + sAction + "','" + sProductNo + "')", 150);
}

function checkOptionPreview(sAction, sProductNo) {
    var layerId = $('#opt_preview_' + sAction + '_' + sProductNo);
    if (isClose == 'T') $(layerId).hide();
}

function openOptionPreview(sAction, sProductNo) {
    isClose = 'F';
    var layerId = $('#opt_preview_' + sAction + '_' + sProductNo);
    $(layerId).show();

    $(layerId).mousemouseenter(function() {
        $(layerId).show();
    }).mouseleave(function() {
        $(layerId).hide();
    });

}

function changeOptionId() {
    if (typeof product_price == 'undefined') {
        var product_price = 0;
    }

    var price = product_price;

    $('select[id^="' + product_option_id + '"]').each(function() {
        aOptInfo = $(this).val().split('|');
        if (typeof(aOptInfo[1]) != 'undefined') {
            price += parseInt(aOptInfo[1]);
        }
    });

    $('#product_price').val(price);
    $('#span_product_price').html(commify(price) + '원');
}

/**
 * 네이버체크아웃 주문하기
 */
function nv_add_basket_1_product() {
    bIsMobile = false;

    if (_isProc == 'F') {
        alert(__("체크아웃 입점상태를 확인하십시오."));
        return;
    }

    if (typeof(set_option_data) != 'undefined') {
        alert(__('세트상품은 체크아웃 구매가 불가하오니, 쇼핑몰 바로구매를 이용해주세요. 감사합니다.'));
        return;
    }

    product_submit('naver_checkout', '/exec/front/order/basket/')
}

/**
 * 네이버체크아웃 찜하기
 */
function nv_add_basket_2_product() {
    if (_isProc == 'F') {
        alert(__("체크아웃 입점상태를 확인하십시오."));
        return;
    }

    window.open("/exec/front/order/navercheckoutwish?product_no=" + iProductNo, "navercheckout_basket",
        'scrollbars=yes,status=no,toolbar=no,width=450,height=300');
}

/**
 * 네이버체크아웃 주문하기
 */
function nv_add_basket_1_m_product() {
    bIsMobile = true;

    if (_isProc == 'F') {
        alert(__("체크아웃 입점상태를 확인하십시오."));
        return;
    }

    if (typeof(set_option_data) != 'undefined') {
        alert(__('세트상품은 체크아웃 구매가 불가하오니, 쇼핑몰 바로구매를 이용해주세요. 감사합니다.'));
        return;
    }

    product_submit('naver_checkout', '/exec/front/order/basket/')
}

/**
 * 네이버체크아웃 찜하기
 */
function nv_add_basket_2_m_product() {
    if (_isProc == 'F') {
        alert(__("체크아웃 입점상태를 확인하십시오."));
        return;
    }

    window.location.href = "/exec/front/order/navercheckoutwish?product_no=" + iProductNo;
    //window.open("/exec/front/order/navercheckoutwish?product_no=" + iProductNo, "navercheckout_basket", 'scrollbars=yes,status=no,toolbar=no,width=450,height=300');
}

/**
 * 옵션 추가 구매시에 같은 옵션을 검사하는 함수
 *
 * @returns Boolean
 */
function duplicateOptionCheck() {
    var bOptionDuplicate = getOptionDuplicate();
    //var bAddOptionDuplicate = getAddOptionDuplicate();

    if (bOptionDuplicate !== true) { //}&& bAddOptionDuplicate !== true) {
        alert(__('동일한 옵션의 상품이 있습니다.'));
        return false;
    }

    return true;
}

/**
 * 텍스트 인풋 옵션 중복 체크
 *
 * @returns {Boolean}
 */
function getAddOptionDuplicate() {
        var aOptionRow = new Array();
        var iOptionLength = 0;
        var aOptionValue = new Array();
        var bReturn = true;
        // 기본 옵션
        $('[id^="' + add_option_id + '"]:visible').each(function() {
            aOptionRow.push($(this).val());
        });
        aOptionValue.push(aOptionRow.join(',@,'));
        $('.EC_MultipleOption').each(function() {
            aOptionRow = new Array();
            $($(this).find('.' + $.data(document, 'multiple_option_input_class'))).each(function() {
                aOptionRow.push($(this).val());
            });
            var sOptionRow = aOptionRow.join(',@,');
            if ($.inArray(sOptionRow, aOptionValue) > -1) {
                bReturn = false;
                return false;
            } else {
                aOptionValue.push(sOptionRow);
            }
        });
        return bReturn;
    }
    /**
     * 일반 셀렉트박스형 옵션 체크 함수
     *
     * @returns {Boolean}
     */
function getOptionDuplicate() {
    // 선택여부는 이미 선택이 되어 있음
    var aOptionId = new Array();
    var aOptionValue = new Array();
    var aOptionRow = new Array();
    var iOptionLength = 0;
    // 기본 옵션
    $('select[id^="' + product_option_id + '"]:visible').each(function(i) {
        aOptionValue.push($(this).val());
        iOptionLength++;
    });
    // 추가 구매
    $('.' + $.data(document, 'multiple_option_select_class')).each(function(i) {
        aOptionValue.push($(this).val());
    });

    var aOptionRow = new Array();
    for (var x in aOptionValue) {
        var sOptionValue = aOptionValue[x];
        aOptionRow.push(sOptionValue);
        if (x % iOptionLength == iOptionLength - 1) {
            var sOptionId = aOptionRow.join('-');

            if ($.inArray(sOptionId, aOptionId) > -1) {
                return false;
            }
            aOptionId.push(sOptionId);
            aOptionRow = new Array();
        }
    }

    return true;
}

function getOptionValue(sReq) {
    var sReturn = sReq;
    if (sReq.indexOf('|') > -1) {
        var aReturn = sReq.split('|');
        sReturn = aReturn[0];
    }
    return sReturn;
}

function action_sms_restock(sParam) {
    window.open('#none', 'sms_restock', 'width=459, height=490');
    $('#frm_image_zoom').attr('target', 'sms_restock');
    $('#frm_image_zoom').attr('action', '/product/sms_restock.html');
    $('#frm_image_zoom').submit();
}

// 최대 할인쿠폰 다운받기 팝업
function popupDcCoupon(product_no, coupon_no, cate_no, opener_url, location) {
    var Url = '/';
    if (location === 'Front' || typeof location === 'undefined') {
        Url += 'product/'
    }
    Url += '/coupon_popup.html';
    window.open(Url + "?product_no=" + product_no + "&coupon_no=" + coupon_no + "&cate_no=" + cate_no + "&opener_url=" + opener_url, "popupDcCoupon", "toolbar=no,scrollbars=no,resizable=yes,width=800,height=640,left=0,top=0");
}

/**
 * 관련상품 열고 닫기
 */
function ShowAndHideRelation() {
    try {
        var sRelation = $('ul.mSetPrd').parent();
        var sRelationDisp = sRelation.css('display');
        if (sRelationDisp === 'none') {
            $('#setTitle').removeClass('show');
            sRelation.show();
        } else {
            $('#setTitle').addClass('show');
            sRelation.hide();
        }
    } catch (e) {}
}

var ITEM = {
    getItemCode: function() {
        var chk_has_opt = '';
        try {
            chk_has_opt = has_option;
        } catch (e) {
            chk_has_opt = 'T';
        }

        if (chk_has_opt == 'F') {
            return [item_code];
        } else {
            // 필수값 체크
            var bRequire = false;
            $('[id^="product_option_id"]').each(function() {
                if (Boolean($(this).attr('required')) === true || $(this).attr('required') == 'required') {
                    bRequire = true;
                    return false;
                }
            });

            var aItemCode = new Array();
            if (bRequire === true) {
                if ($('#totalProducts').size() === 0) {
                    sItemCode = this.getOldProductItemCode();
                    if (sItemCode !== false) {
                        if (typeof(sItemCode) === 'string') {
                            aItemCode.push(sItemCode);
                        } else {
                            aItemCode = sItemCode;
                        }
                    } else {
                        // 옵션이 선택되지 않음
                        return false;
                    }
                } else {
                    if ($('.option_box_id').length == 0) {
                        // 옵션이 선택되지 않음
                        return false;
                    }
                    $('.option_box_id').each(function() {
                        aItemCode.push($(this).val());
                    });
                }
            }

            return aItemCode;
        }
    },
    getWishItemCode: function() {
        var chk_has_opt = '';
        try {
            chk_has_opt = has_option;
        } catch (e) {
            chk_has_opt = 'T';
        }

        if (chk_has_opt == 'F') {
            return [item_code];
        } else {
            // 필수값 체크
            var bRequire = false;
            $('[id^="product_option_id"]').each(function() {
                if (Boolean($(this).attr('required')) === true || $(this).attr('required') == 'required') {
                    bRequire = true;
                    return false;
                }
            });

            var aItemCode = new Array();
            if (bRequire === true) {
                if ($('#totalProducts').size() === 0) {
                    sItemCode = this.getOldProductItemCode();
                    if (sItemCode !== false) {
                        if (typeof(sItemCode) === 'string') {
                            aItemCode.push(sItemCode);
                        } else {
                            aItemCode = sItemCode;
                        }
                    } else {
                        // 옵션이 선택되지 않음
                        return false;
                    }
                } else {
                    if ($('.soldout_option_box_id,.option_box_id').length == 0) {
                        // 옵션이 선택되지 않음
                        return false;
                    }
                    $('.soldout_option_box_id,.option_box_id').each(function() {
                        aItemCode.push($(this).val());
                    });
                }
            }

            return aItemCode;
        }
    },
    getOldProductItemCode: function(sSelector) {
        if (sSelector === undefined) {
            sSelector = '[id^="product_option_id"]';
        }
        var sItemCode = null;
        // 뉴상품 옵션 선택 구매
        if (has_option === 'F') {
            // 화면에 있음
            sItemCode = item_code;
        } else {
            if (item_listing_type == 'S') {
                var aOptionValue = new Array();
                $(sSelector).each(function() {
                    if (ITEM.isOptionSelected($(this).val()) === true) {
                        aOptionValue.push($(this).val());
                    }
                });

                if (option_type === 'T') {
                    var aCodeMap = $.parseJSON(option_value_mapper);
                    sItemCode = aCodeMap[aOptionValue.join('#$%')];
                } else {
                    sItemCode = aOptionValue;
                }
            } else {
                sItemCode = $(sSelector).val();
            }
        }

        if (sItemCode === undefined) {
            return false;
        }

        return sItemCode;
    },
    isOptionSelected: function(aOption) {
        var sOptionValue = null;
        if (typeof aOption === 'string') {
            sOptionValue = aOption;
        } else {
            if (aOption.length === 0) return false;
            sOptionValue = aOption.join('-|');
        }
        sOptionValue = '-|' + sOptionValue + '-|';
        return !(/-\|\*{1,2}-\|/g).test(sOptionValue);
    }
};
/**
 * ie8 일때 indxeOf 동작안함
 */
if (!Array.prototype.indexOf) {
    Array.prototype.indexOf = function(elt /*, from*/ ) {
        var len = this.length >>> 0;
        var from = Number(arguments[1]) || 0;

        from = (from < 0) ? Math.ceil(from) : Math.floor(from);
        if (from < 0) {
            from += len;
        }

        for (from; from < len; from++) {
            if (from in this && this[from] === elt) {
                return from;
            }
        }
        return -1;
    };
}

if (!Object.size) {
    Object.size = function(obj) {
        var size = 0,
            key;
        for (key in obj) {
            if (obj.hasOwnProperty(key)) size++;
        }
        return size;
    };
}

var iPopupCateNo = '';
var iPopupProductNo = '';
var sPopupRefdoc = '';
var sPopupsSkinCode = '';
var aPopupPageName = '';

/**
 * popup open
 * 팝업의 형태는 layer popup 과 window popup 두형태가 존재한다.
 */
$(document).ready(function() {
    // 팝업에서 ajax 로 세션을 동시접근 방지 
    setTimeout(function() {
        POPUP.setPopupList();
    }, 1000);
});

// ECHOSTING-91093 EP 캐시문제로 기존에 PHP 에서 처리하던 부분을 ajax를 호출하여 처리하도록 합니다.
var POPUP = {
    init: function() {

    },
    setPopupList: function() {
        // r 은 메인 ep캐시 회피용 더미 파라미터
        $.ajax({
            url: '/exec/front/popup/AjaxMain',
            type: "get",
            data: {
                'cate_no': iPopupCateNo,
                'refdoc': sPopupRefdoc,
                'skin_code': sPopupsSkinCode,
                'page_name': aPopupPageName,
                'product_no': iPopupProductNo,
                'random_dummy': Math.random()
            },
            dataType: "json",
            success: function(oResult) {
                if (oResult.result == '0000') {
                    aPopupList = oResult.data;
                    POPUP.setPopup();
                }
            },
            error: function() {}
        });
    },
    setPopup: function() {
        if (!aPopupList) {
            return;
        }
        if ($.cookie('SDE_POPUP')) {
            var aPopupCookie = $.cookie('SDE_POPUP').split('&');
        }

        // 팝업리스트를 호출하며
        // 시간이 만료시간 전이며, SDE_POPUP에 쿠키값이 없는지 검사
        for (var i = 0; i < aPopupList.length; i++) {
            if (aPopupList[i].open) {
                if (this.bOpenPopup(aPopupList[i].idx, aPopupCookie)) {
                    open_popup(aPopupList[i]);
                }
            }
        }
    },
    //회원이 그만본다고 정의한 idx를 비교
    bOpenPopup: function(iIdx, aPopupCookie) {
        if (!aPopupCookie) return true;

        var aCookie = [];

        for (var i = 0; i < aPopupCookie.length; i++) {
            aCookie = aPopupCookie[i].split('=');
            if (aCookie[0] == iIdx) {
                // [솔업2] - 2013.11.28
                // SUB-6539 오늘 하루 열지 않음 만료시간과 현재시간을 체크 하는 로직 추가
                var oCookieTime = new Date(parseInt(aCookie[1]) * 1000);

                var sCookieTime = new String(oCookieTime.getFullYear());
                sCookieTime += (oCookieTime.getMonth() < 10) ? '0' + new String(oCookieTime.getMonth()) : new String(oCookieTime.getMonth());
                sCookieTime += (oCookieTime.getDate() < 10) ? '0' + new String(oCookieTime.getDate()) : new String(oCookieTime.getDate());
                sCookieTime += (oCookieTime.getHours() < 10) ? '0' + new String(oCookieTime.getHours()) : new String(oCookieTime.getHours());
                sCookieTime += (oCookieTime.getMinutes() < 10) ? '0' + new String(oCookieTime.getMinutes()) : new String(oCookieTime.getMinutes());
                sCookieTime += (oCookieTime.getSeconds() < 10) ? '0' + new String(oCookieTime.getSeconds()) : new String(oCookieTime.getSeconds());

                var oCurrentTime = new Date();

                var sCurrentTime = new String(oCurrentTime.getFullYear());
                sCurrentTime += (oCurrentTime.getMonth() < 10) ? '0' + new String(oCurrentTime.getMonth()) : new String(oCurrentTime.getMonth());
                sCurrentTime += (oCurrentTime.getDate() < 10) ? '0' + new String(oCurrentTime.getDate()) : new String(oCurrentTime.getDate());
                sCurrentTime += (oCurrentTime.getHours() < 10) ? '0' + new String(oCurrentTime.getHours()) : new String(oCurrentTime.getHours());
                sCurrentTime += (oCurrentTime.getMinutes() < 10) ? '0' + new String(oCurrentTime.getMinutes()) : new String(oCurrentTime.getMinutes());
                sCurrentTime += (oCurrentTime.getSeconds() < 10) ? '0' + new String(oCurrentTime.getSeconds()) : new String(oCurrentTime.getSeconds());

                if (parseInt(sCookieTime) < parseInt(sCurrentTime)) {
                    return true;
                }

                return false;
            }

        }
        return true;
    }
};


var open_popup = function(aData) {


    var aSize = aData.size.split('*');
    var aPos = aData.position.split('*');
    var ds = aData.file.indexOf('?') == -1 ? '?' : '&';
    var sUri = aData.file + ds + 'idx=' + aData.idx + '&type=' + aData.type;
    var sChildType = aData.child_type;

    /**
     * layer popup open
     */
    this.layer_popup = function() {
        var oElement = document.createElement('div');

        oElement.id = 'popup_' + aData.idx;
        oElement.style.position = 'absolute';
        oElement.style.top = aPos[0] + 'px';
        oElement.style.left = aPos[1] + 'px';
        oElement.style.zIndex = '99';

        //ECHOSTING-39168 [긴급][스타일맨]IE8 개별팝업 이슈확인요청
        oElement.style.width = aSize[0] + 'px';

        oElement.innerHTML = '<iframe src="' + sUri + '" scrolling="no" width="' + aSize[0] + '" height="' + aSize[1] + '" frameborder="0"  allowTransparency="true"></iframe>';
        document.body.appendChild(oElement);

        // 레이어 팝업 드래그
        $('#' + oElement.id + ' iframe').load(function() {
            var iframeBody = $(this).contents().find('body');
            iframeBody.css({
                'margin': 0
            });

            if (navigator.userAgent.indexOf('MSIE') > 0) {
                iframeBody.bind('contextmenu', function() {
                    return false;
                });
                iframeBody.bind('selectstart', function() {
                    return false;
                });
                iframeBody.bind('dragstart', function() {
                    return false;
                });
            }

            // ECHOSTING-91562 샘플 팝업인 경우에만 레이어팝업 리사이징
            if (sChildType == 'W') {
                // ECHOSTING-114699 팝업 리사이징 오류 관련 수정 로직 추가 - 2014.11.04
                var bIsExistsGoogleAd = (iframeBody.find('iframe[name="google_conversion_frame"]').size() > 0) ? true : false;

                if (bIsExistsGoogleAd == true) {
                    iframeBody.find('iframe[name="google_conversion_frame"]').attr('width', '13px');
                }

                var iAdjustSizeX = this.contentWindow.document.body.scrollWidth + 'px';
                var iAdjustSizeY = this.contentWindow.document.body.scrollHeight + 'px';

                this.style.width = iAdjustSizeX;
                this.style.height = iAdjustSizeY;

                iframeBody.find('.xans-popup-footer > div').css('width', (parseInt(iAdjustSizeX) - 10) + 'px');
            }

            iframeBody.mousedown(function(e) {
                var orgX = e.clientX;
                var orgY = e.clientY;

                iframeBody.mousemove(function(e) {
                    oElement.style.left = (parseInt(oElement.style.left) + e.clientX - orgX) + "px";
                    oElement.style.top = (parseInt(oElement.style.top) + e.clientY - orgY) + "px";
                });

                iframeBody.mouseup(function(e) {
                    iframeBody.unbind('mousemove');
                });

                iframeBody.mouseleave(function(e) {
                    iframeBody.unbind('mousemove');
                });
            });
        }); // end of 레이어 팝업 드래그
    };

    /**
     * window popup open
     */
    this.win_popup = function() {
        try {
            var popup = window.open(sUri, 'popup_' + aData.idx, 'width=' + aSize[0] + ', height=' + aSize[1] + ', top=' + aPos[0] + ', left=' + aPos[1] + ', toolbar=0, menubar=0');
            popup.focus();
        } catch (e) {

        }
    };

    var aFunction = {
        'W': 'win_popup',
        'L': 'layer_popup'
    };

    this[aFunction[aData.type]]();
}

$(document).ready(function() {
    // 국문몰에서만
    if (SHOP.getLanguage() == 'ko_KR' && $('#authInfoLayer').length <= 0) {
        // 팝업에서 ajax 로 세션을 동시접근 방지
        setTimeout(function() {
            POPUP_AUTH_GUIDE.setPopup();
        }, 500);
    }
});

// 본인인증안내 레이어 팝업
// EP 캐시문제로 ajax를 호출하여 세션체크
var POPUP_AUTH_GUIDE = {
    setPopup: function() {
        // random_dummy 은 메인 ep캐시 회피용 더미 파라미터
        $.ajax({
            url: '/exec/front/popup/AjaxCertification',
            type: "get",
            data: {
                'random_dummy': Math.random()
            },
            dataType: "json",
            success: function(oResult) {
                if (oResult.result == 'T') {
                    POPUP_AUTH_GUIDE.openPopup();
                }
            },
            error: function() {}
        });
    },
    openPopup: function() {
        if (POPUP_AUTH_GUIDE.getCookie('CERTIFICATION_LAYER_NOT_TODAY') === 'T') {
            return;
        } else {
            var bBuyLayer = false;
            var agent = navigator.userAgent.toLowerCase();
            if (agent.indexOf('iphone') != -1 || agent.indexOf('android') != -1) {
                try {
                    if (parent.$('#opt_layer_window').length > 0 && typeof(window.parent) == 'object') {
                        parent.$('html, body').css('overflowY', 'auto');
                        parent.$('#opt_layer_window').hide();
                        bBuyLayer = true;
                    }
                } catch (e) {}
            }

            $.get('/member/certification_layer.html', '', function(sHtml) {
                if (bBuyLayer == true) {
                    if (parent.$('#authInfoLayer').length <= 0) {
                        parent.$('body').append($('<div id=\"authInfoLayer\"></div>'));
                        parent.$('#authInfoLayer').html(sHtml);
                        parent.$('#authInfoLayer').show();
                    }
                } else {
                    if ($('#authInfoLayer').length <= 0) {
                        $('<div id=\"authInfoLayer\"></div>').appendTo('body');
                        $('#authInfoLayer').html(sHtml);
                        $('#authInfoLayer').show();
                    }
                }
            });
        }
    },
    getCookie: function(name) {
        var nameEQ = name + "=";
        var ca = document.cookie.split(';');
        for (var i = 0; i < ca.length; i++) {
            var c = ca[i];
            while (c.charAt(0) == ' ') c = c.substring(1, c.length);
            if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length, c.length);
        }
        return null;
    }
};

document.ondragstart = function() {
    return false;
};

document.onselectstart = function() {
    return false;
};

/**
 * 접속통계 & 실시간접속통계
 */
$(document).ready(function() {
    // 이미 weblog.js 실행 되었을 경우 종료 
    if ($('#log_realtime').length > 0) {
        return;
    }
    /*
     * QueryString에서 디버그 표시 제거
     */
    function stripDebug(sLocation) {
        if (typeof sLocation != 'string') return '';

        sLocation = sLocation.replace(/^d[=]*[\d]*[&]*$/, '');
        sLocation = sLocation.replace(/^d[=]*[\d]*[&]/, '');
        sLocation = sLocation.replace(/(&d&|&d[=]*[\d]*[&]*)/, '&');

        return sLocation;
    }

    // realconn & Ad aggregation
    var _aPrs = new Array();
    _sUserQs = window.location.search.substring(1);
    _sUserQs = stripDebug(_sUserQs);
    _aPrs[0] = 'rloc=' + escape(document.location);
    _aPrs[1] = 'rref=' + escape(document.referrer);
    _aPrs[2] = 'udim=' + window.screen.width + '*' + window.screen.height;
    _aPrs[3] = 'rserv=' + aLogData.log_server2;

    // 모바일웹일 경우 추가 파라미터 생성
    var _sMobilePrs = '';
    if (mobileWeb === true) _sMobilePrs = '&mobile=T&mobile_ver=new';

    _sUrlQs = _sUserQs + '&' + _aPrs.join('&') + _sMobilePrs;
    var _sUrlFull = '/exec/front/realconn/main/?' + _sUrlQs;
    var node = document.createElement('iframe');
    node.setAttribute('src', _sUrlFull);
    node.setAttribute('id', 'log_realtime');

    document.body.appendChild(node);

    if (aLogData.log_debug == 'T') {
        $('#log_realtime').css({
            'display': 'block',
            'width': '100%',
            'height': '450px'
        });
    } else {
        $('#log_realtime').css({
            'display': 'none',
            'width': '0',
            'height': '0'
        });
    }

    // eclog2.0, eclog1.9
    var sTime = new Date().getTime(); //ECHOSTING-54575
    var sScriptSrc = 'http://' + aLogData.log_server1 + '/weblog.js?uid=' + aLogData.mid + '&uname=' + aLogData.mid + '&r_ref=' + document.referrer;
    if (mobileWeb === true) sScriptSrc += '&cafe_ec=mobile';
    sScriptSrc += '&t=' + sTime; //ECHOSTING-54575
    var node = document.createElement('script');
    node.setAttribute('type', 'text/javascript');
    node.setAttribute('src', sScriptSrc);
    node.setAttribute('id', 'log_script');
    document.body.appendChild(node);
});

/**
 * 비동기식 데이터 정의 회원로그인 정보 / 최근 본 상품
 */
var methods = {
    Basketcnt: function(aData) {
        $('.xans-layout-orderbasketcount span a').html(aData);
    },
    Couponcnt: function(aData) {
        $('.xans-layout-myshopcouponcount').html(aData);
    },
    member: function(output) {
        try {
            var output = decodeURIComponent(output);

            if (AuthSSLManager.isError(output) == true) {
                alert(output);
                return;
            }
            var aData = AuthSSLManager.unserialize(output);

            var fk = '';
            for (var k in aData) {
                $('.xans-member-var-' + k).html(aData[k]);
            }
        } catch (e) {}
    },
    recent: function(aData) {
        aNodes = $('.xans-layout-productrecent .xans-record-');
        var iRecordCnt = aNodes.length;
        var iCheckCnt = 0;
        for (var i = 0; i < aData.length; i++) {
            if (!aNodes[i]) {
                $(aNodes[iRecordCnt - 1]).clone().appendTo($(aNodes[iRecordCnt - 1]).parent());
                iCheckCnt++;
            }
        }

        if (iCheckCnt > 0) {
            aNodes = $('.xans-layout-productrecent .xans-record-');
        }

        if (aData.length > 0) {
            $('.xans-layout-productrecent').show();
        }



        for (var i = 0; i < aData.length; i++) {
            replaceHtml(aNodes[i], aData[i]);
        }
        // 종료 카운트 지정
        if (aData.length < aNodes.length) {
            iLength = aData.length;
            deleteNode();
        }

        recentBntInit();

        /**
         * 패치되지 않은 노드를 제거
         */
        function deleteNode() {
            for (var i = iLength; i < aNodes.length; i++) {
                $(aNodes[i]).remove();
            }
        }

        function replaceHtml(oNode, aData) {
            var sHtml = $(oNode).html().replace('about:blank', aData.recent_img).replace('##param##', aData.param).replace('##name##', aData.name);

            $(oNode).html(sHtml);

            if (aData.disp_recent === true) {
                $(oNode).removeClass('displaynone');
            }
        }

        function recentBntInit() {
            // 화면에 뿌려진 갯수
            var iDisplayCount = 0;
            // 보여지는 style
            var sDisplay = '';
            var iIdx = 0;
            //
            var iDisplayNoneIdx = 0;

            var nodes = $('.xans-layout-productrecent .xans-record-').each(function() {
                sDisplay = $(this).css('display');
                if (sDisplay != 'none') {
                    iDisplayCount++;
                } else {
                    if (iDisplayNoneIdx == 0) {
                        iDisplayNoneIdx = iIdx;
                    }

                }
                iIdx++;
            });

            var iRecentCount = nodes.length;
            var bBtnActive = iDisplayCount > 0;
            $('.xans-layout-productrecent .prev').unbind('click').click(function() {
                if (bBtnActive !== true) return;
                var iFirstNode = iDisplayNoneIdx - iDisplayCount;
                if (iFirstNode == 0 || iDisplayCount == iRecentCount) {
                    alert(__('최근 본 첫번째 상품입니다.'));
                    return;
                } else {
                    iDisplayNoneIdx--;
                    $(nodes[iDisplayNoneIdx]).hide();
                    $(nodes[iFirstNode - 1]).removeClass('displaynone');
                    $(nodes[iFirstNode - 1]).fadeIn('fast');

                }
            }).css({
                cursor: 'pointer'
            });

            $('.xans-layout-productrecent .next').unbind('click').click(function() {
                if (bBtnActive !== true) return;
                if ((iRecentCount) == iDisplayNoneIdx || iDisplayCount == iRecentCount) {
                    alert(__('최근 본 마지막 상품입니다.'));
                } else {
                    $(nodes[iDisplayNoneIdx]).fadeIn('fast');
                    $(nodes[iDisplayNoneIdx]).removeClass('displaynone');
                    $(nodes[(iDisplayNoneIdx - iDisplayCount)]).hide();
                    iDisplayNoneIdx++;
                }
            }).css({
                cursor: 'pointer'
            });

        }
    }

}
$(document).ready(
    function() {

        $('.xans-layout-productrecent').hide();

        var aNodes = $('.xans-layout-statelogon, .xans-layout-logon');
        var aModule = [];

        if (aNodes.length > 0) {
            aModule.push('member');
        }

        aNodes = $('.xans-layout-productrecent .xans-record-');
        var iRecordCnt = aNodes.length;

        if (iRecordCnt > 0) {
            aModule.push('recent');
        }

        // 장바구니 수량
        aNodesBasket = $('.xans-layout-orderbasketcount');
        if (aNodesBasket.length > 0) {
            aModule.push('Basketcnt');
        }

        // 쿠폰 갯수(Myshop: 마이페이지)
        aNodesCoupon = $('.xans-myshop-bankbook, .xans-layout-myshopcouponcount');
        if (aNodesCoupon.length > 0) {
            aModule.push('Couponcnt');
        }



        if (aModule.length == 0) {
            return;
        }


        // 에디터에서 접근했을 경우 임의의 상품 지정
        var sEditor = '';
        try {
            if (bEditor === true) {
                sEditor = '&PREVIEW_SDE=1';
            }
        } catch (e) {}


        $.ajax({
            url: '/exec/front/manage/async?module=' + aModule.join(',') + sEditor,
            dataType: 'json',
            success: function(aData) {

                for (var k in aData) {

                    if (k == "member") {
                        AuthSSLManager.weave({
                            'auth_mode': 'decryptClient',
                            'auth_string': aData[k],
                            'auth_callbackName': 'methods.member'
                        });
                    } else {
                        methods[k](aData[k]);
                    }


                }
            }
        });



    });
/**
 * 움직이는 배너 Jquery Plug-in
 * @author  cafe24
 */

;
(function($) {

    $.fn.floatBanner = function(options) {
        options = $.extend({}, $.fn.floatBanner.defaults, options);

        return this.each(function() {
            var aPosition = $(this).position();
            var node = this;

            $(window).scroll(function() {
                var _top = $(document).scrollTop();
                _top = (aPosition.top < _top) ? _top : aPosition.top;

                setTimeout(function() {
                    $(node).stop().animate({
                        top: _top
                    }, options.animate);
                }, options.delay);
            });
        });
    };

    $.fn.floatBanner.defaults = {
        'animate': 500,
        'delay': 500
    };

})(jQuery);

/**
 * 문서 구동후 시작
 */
$(document).ready(function() {
    $('#banner, #quick').floatBanner();
});

/**
 *  썸네일 이미지 엑박일경우 기본값 설정
 */
$(window).load(function() {
    $("img.thumb,img.ThumbImage,img.BigImage").each(function($i, $item) {
        var $img = new Image();
        $img.onerror = function() {
            $item.src = "//img.echosting.cafe24.com/thumb/img_product_big.gif";
        }
        $img.src = this.src;
    });
});



$(document).ready(function() {
    $("img.rollimg").mouseover(function() {
        $(this).attr("src", $(this).attr("src").replace("_off", "_on"));

    });
    $("img.rollimg").mouseout(function() {
        $(this).attr("src", $(this).attr("src").replace("_on", "_off"));
    });

});



function set_start() {
    document.body.style.behavior = 'url(#default#homepage)';
    document.body.setHomePage('http://fsdbxhd.cafe24.com/');
}


//window popup script
function winPop(url) {
        window.open(url, "popup", "width=300,height=300,left=10,top=10,resizable=no,scrollbars=no");
    }
    /**
     * document.location.href split
     * return array Param
     */
function getQueryString(sKey) {
    var sQueryString = document.location.search.substring(1);
    var aParam = {};

    if (sQueryString) {
        var aFields = sQueryString.split("&");
        var aField = [];
        for (var i = 0; i < aFields.length; i++) {
            aField = aFields[i].split('=');
            aParam[aField[0]] = aField[1];
        }
    }

    aParam.page = aParam.page ? aParam.page : 1;
    return sKey ? aParam[sKey] : aParam;
};


/**
 * paging HTML strong tag로 변형
 */
function convertPaging() {

    $('.paging ol a').each(function() {
        var sPage = $(this).text() ? $(this).text() : 1;

        if (sPage == '[' + getQueryString('page') + ']') {
            $(this).parent().html('<strong title="현재페이지">' + sPage + '</strong>');
        } else {
            var sHref = $(this).attr('href');
            $(this).parent().html('<a href="' + sHref + '" title="' + sPage + '페이지로 이동">' + sPage + '</a>');
        }
    });
}

$(document).ready(function() {
    // tab
    $.eTab = function(ul) {
        $(ul).find('a').click(function() {
            var _li = $(this).parent('li').addClass('selected').siblings().removeClass('selected'),
                _target = $(this).attr('href'),
                _siblings = '.' + $(_target).attr('class');
            $(_target).show().siblings(_siblings).hide();
            return false
        });
    }
    if (window.call_eTab) {
        call_eTab();
    };
});
$.fn.extend({
    center: function() {
        this.each(function() {
            var
                $this = $(this),
                $w = $(window);
            $this.css({
                position: "absolute",
                top: ~~(($w.height() - $this.outerHeight()) / 2) + $w.scrollTop() + "px",
                left: ~~(($w.width() - $this.outerWidth()) / 2) + $w.scrollLeft() + "px"
            });
        });
        return this;
    }
});
$(function() {
    var $container = function() {
        /*
        <div id="modalContainer">
            <iframe id="modalContent" scroll="0" scrolling="no" frameBorder="0"></iframe>
        </div>');
        */
    }.toString().slice(14, -3);
    $('body')
        .append($('<div id="modalBackpanel"></div>'))
        .append($($container));

    function closeModal() {
        $('#modalContainer').hide();
        $('#modalBackpanel').hide();
    }
    $('#modalBackpanel').click(closeModal);
    zoom = function($piProductNo, $piCategoryNo, $piDisplayGroup) {
        var $url = '/product/image_zoom.html?product_no=' + $piProductNo + '&cate_no=' + $piCategoryNo + '&display_group=' + $piDisplayGroup;
        $('#modalContent').attr('src', $url);
        $('#modalContent').bind("load", function() {
            $(".header .close", this.contentWindow.document.body).bind("click", closeModal);
        });
        $('#modalBackpanel').css({
            width: $("body").width(),
            height: $("body").height(),
            opacity: .4
        }).show();
        $('#modalContainer').center().show();
    }
});
/*!
 * jQuery Cycle Plugin (with Transition Definitions)
 * Examples and documentation at: http://jquery.malsup.com/cycle/
 * Copyright (c) 2007-2009 M. Alsup
 * Version: 2.72 (09-SEP-2009)
 * Dual licensed under the MIT and GPL licenses:
 * http://www.opensource.org/licenses/mit-license.php
 * http://www.gnu.org/licenses/gpl.html
 * Requires: jQuery v1.2.6 or later
 *
 * Originally based on the work of:
 *	1) Matt Oakes
 *	2) Torsten Baldes (http://medienfreunde.com/lab/innerfade/)
 *	3) Benjamin Sterling (http://www.benjaminsterling.com/experiments/jqShuffle/)
 */
;
(function($) {

    var ver = '2.72';

    // if $.support is not defined (pre jQuery 1.3) add what I need
    if ($.support == undefined) {
        $.support = {
            opacity: !($.browser.msie)
        };
    }

    function debug(s) {
        if ($.fn.cycle.debug)
            log(s);
    }

    function log() {
        if (window.console && window.console.log)
            window.console.log('[cycle] ' + Array.prototype.join.call(arguments, ' '));
        //$('body').append('<div>'+Array.prototype.join.call(arguments,' ')+'</div>');
    };

    // the options arg can be...
    //   a number  - indicates an immediate transition should occur to the given slide index
    //   a string  - 'stop', 'pause', 'resume', or the name of a transition effect (ie, 'fade', 'zoom', etc)
    //   an object - properties to control the slideshow
    //
    // the arg2 arg can be...
    //   the name of an fx (only used in conjunction with a numeric value for 'options')
    //   the value true (only used in conjunction with a options == 'resume') and indicates
    //	 that the resume should occur immediately (not wait for next timeout)

    $.fn.cycle = function(options, arg2) {
        var o = {
            s: this.selector,
            c: this.context
        };

        // in 1.3+ we can fix mistakes with the ready state
        if (this.length === 0 && options != 'stop') {
            if (!$.isReady && o.s) {
                log('DOM not ready, queuing slideshow');
                $(function() {
                    $(o.s, o.c).cycle(options, arg2);
                });
                return this;
            }
            // is your DOM ready?  http://docs.jquery.com/Tutorials:Introducing_$(document).ready()
            log('terminating; zero elements found by selector' + ($.isReady ? '' : ' (DOM not ready)'));
            return this;
        }

        // iterate the matched nodeset
        return this.each(function() {
            var opts = handleArguments(this, options, arg2);
            if (opts === false)
                return;

            // stop existing slideshow for this container (if there is one)
            if (this.cycleTimeout)
                clearTimeout(this.cycleTimeout);
            this.cycleTimeout = this.cyclePause = 0;

            var $cont = $(this);
            var $slides = opts.slideExpr ? $(opts.slideExpr, this) : $cont.children();
            var els = $slides.get();
            if (els.length < 2) {
                log('terminating; too few slides: ' + els.length);
                return;
            }

            var opts2 = buildOptions($cont, $slides, els, opts, o);
            if (opts2 === false)
                return;

            var startTime = opts2.continuous ? 10 : getTimeout(opts2.currSlide, opts2.nextSlide, opts2, !opts2.rev);

            // if it's an auto slideshow, kick it off
            if (startTime) {
                startTime += (opts2.delay || 0);
                if (startTime < 10)
                    startTime = 10;
                debug('first timeout: ' + startTime);
                this.cycleTimeout = setTimeout(function() {
                    go(els, opts2, 0, !opts2.rev)
                }, startTime);
            }
        });
    };

    // process the args that were passed to the plugin fn
    function handleArguments(cont, options, arg2) {
        if (cont.cycleStop == undefined)
            cont.cycleStop = 0;
        if (options === undefined || options === null)
            options = {};
        if (options.constructor == String) {
            switch (options) {
                case 'stop':
                    cont.cycleStop++; // callbacks look for change
                    if (cont.cycleTimeout)
                        clearTimeout(cont.cycleTimeout);
                    cont.cycleTimeout = 0;
                    $(cont).removeData('cycle.opts');
                    return false;
                case 'pause':
                    cont.cyclePause = 1;
                    return false;
                case 'resume':
                    cont.cyclePause = 0;
                    if (arg2 === true) { // resume now!
                        options = $(cont).data('cycle.opts');
                        if (!options) {
                            log('options not found, can not resume');
                            return false;
                        }
                        if (cont.cycleTimeout) {
                            clearTimeout(cont.cycleTimeout);
                            cont.cycleTimeout = 0;
                        }
                        go(options.elements, options, 1, 1);
                    }
                    return false;
                case 'prev':
                case 'next':
                    var opts = $(cont).data('cycle.opts');
                    if (!opts) {
                        log('options not found, "prev/next" ignored');
                        return false;
                    }
                    $.fn.cycle[options](opts);
                    return false;
                default:
                    options = {
                        fx: options
                    };
            };
            return options;
        } else if (options.constructor == Number) {
            // go to the requested slide
            var num = options;
            options = $(cont).data('cycle.opts');
            if (!options) {
                log('options not found, can not advance slide');
                return false;
            }
            if (num < 0 || num >= options.elements.length) {
                log('invalid slide index: ' + num);
                return false;
            }
            options.nextSlide = num;
            if (cont.cycleTimeout) {
                clearTimeout(cont.cycleTimeout);
                cont.cycleTimeout = 0;
            }
            if (typeof arg2 == 'string')
                options.oneTimeFx = arg2;
            go(options.elements, options, 1, num >= options.currSlide);
            return false;
        }
        return options;
    };

    function removeFilter(el, opts) {
        if (!$.support.opacity && opts.cleartype && el.style.filter) {
            try {
                el.style.removeAttribute('filter');
            } catch (smother) {} // handle old opera versions
        }
    };

    // one-time initialization
    function buildOptions($cont, $slides, els, options, o) {
        // support metadata plugin (v1.0 and v2.0)
        var opts = $.extend({}, $.fn.cycle.defaults, options || {}, $.metadata ? $cont.metadata() : $.meta ? $cont.data() : {});
        if (opts.autostop)
            opts.countdown = opts.autostopCount || els.length;

        var cont = $cont[0];
        $cont.data('cycle.opts', opts);
        opts.$cont = $cont;
        opts.stopCount = cont.cycleStop;
        opts.elements = els;
        opts.before = opts.before ? [opts.before] : [];
        opts.after = opts.after ? [opts.after] : [];
        opts.after.unshift(function() {
            opts.busy = 0;
        });

        // push some after callbacks
        if (!$.support.opacity && opts.cleartype)
            opts.after.push(function() {
                removeFilter(this, opts);
            });
        if (opts.continuous)
            opts.after.push(function() {
                go(els, opts, 0, !opts.rev);
            });

        saveOriginalOpts(opts);

        // clearType corrections
        if (!$.support.opacity && opts.cleartype && !opts.cleartypeNoBg)
            clearTypeFix($slides);

        // container requires non-static position so that slides can be position within
        if ($cont.css('position') == 'static')
            $cont.css('position', 'relative');
        if (opts.width)
            $cont.width(opts.width);
        if (opts.height && opts.height != 'auto')
            $cont.height(opts.height);

        if (opts.startingSlide)
            opts.startingSlide = parseInt(opts.startingSlide);

        // if random, mix up the slide array
        if (opts.random) {
            opts.randomMap = [];
            for (var i = 0; i < els.length; i++)
                opts.randomMap.push(i);
            opts.randomMap.sort(function(a, b) {
                return Math.random() - 0.5;
            });
            opts.randomIndex = 0;
            opts.startingSlide = opts.randomMap[0];
        } else if (opts.startingSlide >= els.length)
            opts.startingSlide = 0; // catch bogus input
        opts.currSlide = opts.startingSlide = opts.startingSlide || 0;
        var first = opts.startingSlide;

        // set position and zIndex on all the slides
        $slides.css({
            position: 'absolute',
            top: 0,
            left: 0
        }).hide().each(function(i) {
            var z = first ? i >= first ? els.length - (i - first) : first - i : els.length - i;
            $(this).css('z-index', z)
        });

        // make sure first slide is visible
        $(els[first]).css('opacity', 1).show(); // opacity bit needed to handle restart use case
        removeFilter(els[first], opts);

        // stretch slides
        if (opts.fit && opts.width)
            $slides.width(opts.width);
        if (opts.fit && opts.height && opts.height != 'auto')
            $slides.height(opts.height);

        // stretch container
        var reshape = opts.containerResize && !$cont.innerHeight();
        if (reshape) { // do this only if container has no size http://tinyurl.com/da2oa9
            var maxw = 0,
                maxh = 0;
            for (var j = 0; j < els.length; j++) {
                var $e = $(els[j]),
                    e = $e[0],
                    w = $e.outerWidth(),
                    h = $e.outerHeight();
                if (!w) w = e.offsetWidth;
                if (!h) h = e.offsetHeight;
                maxw = w > maxw ? w : maxw;
                maxh = h > maxh ? h : maxh;
            }
            if (maxw > 0 && maxh > 0)
                $cont.css({
                    width: maxw + 'px',
                    height: maxh + 'px'
                });
        }

        if (opts.pause)
            $cont.hover(function() {
                this.cyclePause++;
            }, function() {
                this.cyclePause--;
            });

        if (supportMultiTransitions(opts) === false)
            return false;

        // apparently a lot of people use image slideshows without height/width attributes on the images.
        // Cycle 2.50+ requires the sizing info for every slide; this block tries to deal with that.
        var requeue = false;
        options.requeueAttempts = options.requeueAttempts || 0;
        $slides.each(function() {
            // try to get height/width of each slide
            var $el = $(this);
            this.cycleH = (opts.fit && opts.height) ? opts.height : $el.height();
            this.cycleW = (opts.fit && opts.width) ? opts.width : $el.width();

            if ($el.is('img')) {
                // sigh..  sniffing, hacking, shrugging...  this crappy hack tries to account for what browsers do when
                // an image is being downloaded and the markup did not include sizing info (height/width attributes);
                // there seems to be some "default" sizes used in this situation
                var loadingIE = ($.browser.msie && this.cycleW == 28 && this.cycleH == 30 && !this.complete);
                var loadingFF = ($.browser.mozilla && this.cycleW == 34 && this.cycleH == 19 && !this.complete);
                var loadingOp = ($.browser.opera && ((this.cycleW == 42 && this.cycleH == 19) || (this.cycleW == 37 && this.cycleH == 17)) && !this.complete);
                var loadingOther = (this.cycleH == 0 && this.cycleW == 0 && !this.complete);
                // don't requeue for images that are still loading but have a valid size
                if (loadingIE || loadingFF || loadingOp || loadingOther) {
                    if (o.s && opts.requeueOnImageNotLoaded && ++options.requeueAttempts < 100) { // track retry count so we don't loop forever
                        log(options.requeueAttempts, ' - img slide not loaded, requeuing slideshow: ', this.src, this.cycleW, this.cycleH);
                        setTimeout(function() {
                            $(o.s, o.c).cycle(options)
                        }, opts.requeueTimeout);
                        requeue = true;
                        return false; // break each loop
                    } else {
                        log('could not determine size of image: ' + this.src, this.cycleW, this.cycleH);
                    }
                }
            }
            return true;
        });

        if (requeue)
            return false;

        opts.cssBefore = opts.cssBefore || {};
        opts.animIn = opts.animIn || {};
        opts.animOut = opts.animOut || {};

        $slides.not(':eq(' + first + ')').css(opts.cssBefore);
        if (opts.cssFirst)
            $($slides[first]).css(opts.cssFirst);

        if (opts.timeout) {
            opts.timeout = parseInt(opts.timeout);
            // ensure that timeout and speed settings are sane
            if (opts.speed.constructor == String)
                opts.speed = $.fx.speeds[opts.speed] || parseInt(opts.speed);
            if (!opts.sync)
                opts.speed = opts.speed / 2;
            while ((opts.timeout - opts.speed) < 250) // sanitize timeout
                opts.timeout += opts.speed;
        }
        if (opts.easing)
            opts.easeIn = opts.easeOut = opts.easing;
        if (!opts.speedIn)
            opts.speedIn = opts.speed;
        if (!opts.speedOut)
            opts.speedOut = opts.speed;

        opts.slideCount = els.length;
        opts.currSlide = opts.lastSlide = first;
        if (opts.random) {
            opts.nextSlide = opts.currSlide;
            if (++opts.randomIndex == els.length)
                opts.randomIndex = 0;
            opts.nextSlide = opts.randomMap[opts.randomIndex];
        } else
            opts.nextSlide = opts.startingSlide >= (els.length - 1) ? 0 : opts.startingSlide + 1;

        // run transition init fn
        if (!opts.multiFx) {
            var init = $.fn.cycle.transitions[opts.fx];
            if ($.isFunction(init))
                init($cont, $slides, opts);
            else if (opts.fx != 'custom' && !opts.multiFx) {
                log('unknown transition: ' + opts.fx, '; slideshow terminating');
                return false;
            }
        }

        // fire artificial events
        var e0 = $slides[first];
        if (opts.before.length)
            opts.before[0].apply(e0, [e0, e0, opts, true]);
        if (opts.after.length > 1)
            opts.after[1].apply(e0, [e0, e0, opts, true]);

        if (opts.next)
            $(opts.next).bind(opts.prevNextEvent, function() {
                return advance(opts, opts.rev ? -1 : 1)
            });
        if (opts.prev)
            $(opts.prev).bind(opts.prevNextEvent, function() {
                return advance(opts, opts.rev ? 1 : -1)
            });
        if (opts.pager)
            buildPager(els, opts);

        exposeAddSlide(opts, els);

        return opts;
    };

    // save off original opts so we can restore after clearing state
    function saveOriginalOpts(opts) {
        opts.original = {
            before: [],
            after: []
        };
        opts.original.cssBefore = $.extend({}, opts.cssBefore);
        opts.original.cssAfter = $.extend({}, opts.cssAfter);
        opts.original.animIn = $.extend({}, opts.animIn);
        opts.original.animOut = $.extend({}, opts.animOut);
        $.each(opts.before, function() {
            opts.original.before.push(this);
        });
        $.each(opts.after, function() {
            opts.original.after.push(this);
        });
    };

    function supportMultiTransitions(opts) {
        var i, tx, txs = $.fn.cycle.transitions;
        // look for multiple effects
        if (opts.fx.indexOf(',') > 0) {
            opts.multiFx = true;
            opts.fxs = opts.fx.replace(/\s*/g, '').split(',');
            // discard any bogus effect names
            for (i = 0; i < opts.fxs.length; i++) {
                var fx = opts.fxs[i];
                tx = txs[fx];
                if (!tx || !txs.hasOwnProperty(fx) || !$.isFunction(tx)) {
                    log('discarding unknown transition: ', fx);
                    opts.fxs.splice(i, 1);
                    i--;
                }
            }
            // if we have an empty list then we threw everything away!
            if (!opts.fxs.length) {
                log('No valid transitions named; slideshow terminating.');
                return false;
            }
        } else if (opts.fx == 'all') { // auto-gen the list of transitions
            opts.multiFx = true;
            opts.fxs = [];
            for (p in txs) {
                tx = txs[p];
                if (txs.hasOwnProperty(p) && $.isFunction(tx))
                    opts.fxs.push(p);
            }
        }
        if (opts.multiFx && opts.randomizeEffects) {
            // munge the fxs array to make effect selection random
            var r1 = Math.floor(Math.random() * 20) + 30;
            for (i = 0; i < r1; i++) {
                var r2 = Math.floor(Math.random() * opts.fxs.length);
                opts.fxs.push(opts.fxs.splice(r2, 1)[0]);
            }
            debug('randomized fx sequence: ', opts.fxs);
        }
        return true;
    };

    // provide a mechanism for adding slides after the slideshow has started
    function exposeAddSlide(opts, els) {
        opts.addSlide = function(newSlide, prepend) {
            var $s = $(newSlide),
                s = $s[0];
            if (!opts.autostopCount)
                opts.countdown++;
            els[prepend ? 'unshift' : 'push'](s);
            if (opts.els)
                opts.els[prepend ? 'unshift' : 'push'](s); // shuffle needs this
            opts.slideCount = els.length;

            $s.css('position', 'absolute');
            $s[prepend ? 'prependTo' : 'appendTo'](opts.$cont);

            if (prepend) {
                opts.currSlide++;
                opts.nextSlide++;
            }

            if (!$.support.opacity && opts.cleartype && !opts.cleartypeNoBg)
                clearTypeFix($s);

            if (opts.fit && opts.width)
                $s.width(opts.width);
            if (opts.fit && opts.height && opts.height != 'auto')
                $slides.height(opts.height);
            s.cycleH = (opts.fit && opts.height) ? opts.height : $s.height();
            s.cycleW = (opts.fit && opts.width) ? opts.width : $s.width();

            $s.css(opts.cssBefore);

            if (opts.pager)
                $.fn.cycle.createPagerAnchor(els.length - 1, s, $(opts.pager), els, opts);

            if ($.isFunction(opts.onAddSlide))
                opts.onAddSlide($s);
            else
                $s.hide(); // default behavior
        };
    }

    // reset internal state; we do this on every pass in order to support multiple effects
    $.fn.cycle.resetState = function(opts, fx) {
        fx = fx || opts.fx;
        opts.before = [];
        opts.after = [];
        opts.cssBefore = $.extend({}, opts.original.cssBefore);
        opts.cssAfter = $.extend({}, opts.original.cssAfter);
        opts.animIn = $.extend({}, opts.original.animIn);
        opts.animOut = $.extend({}, opts.original.animOut);
        opts.fxFn = null;
        $.each(opts.original.before, function() {
            opts.before.push(this);
        });
        $.each(opts.original.after, function() {
            opts.after.push(this);
        });

        // re-init
        var init = $.fn.cycle.transitions[fx];
        if ($.isFunction(init))
            init(opts.$cont, $(opts.elements), opts);
    };

    // this is the main engine fn, it handles the timeouts, callbacks and slide index mgmt
    function go(els, opts, manual, fwd) {
        // opts.busy is true if we're in the middle of an animation
        if (manual && opts.busy && opts.manualTrump) {
            // let manual transitions requests trump active ones
            $(els).stop(true, true);
            opts.busy = false;
        }
        // don't begin another timeout-based transition if there is one active
        if (opts.busy)
            return;

        var p = opts.$cont[0],
            curr = els[opts.currSlide],
            next = els[opts.nextSlide];

        // stop cycling if we have an outstanding stop request
        if (p.cycleStop != opts.stopCount || p.cycleTimeout === 0 && !manual)
            return;

        // check to see if we should stop cycling based on autostop options
        if (!manual && !p.cyclePause &&
            ((opts.autostop && (--opts.countdown <= 0)) ||
                (opts.nowrap && !opts.random && opts.nextSlide < opts.currSlide))) {
            if (opts.end)
                opts.end(opts);
            return;
        }

        // if slideshow is paused, only transition on a manual trigger
        if (manual || !p.cyclePause) {
            var fx = opts.fx;
            // keep trying to get the slide size if we don't have it yet
            curr.cycleH = curr.cycleH || $(curr).height();
            curr.cycleW = curr.cycleW || $(curr).width();
            next.cycleH = next.cycleH || $(next).height();
            next.cycleW = next.cycleW || $(next).width();

            // support multiple transition types
            if (opts.multiFx) {
                if (opts.lastFx == undefined || ++opts.lastFx >= opts.fxs.length)
                    opts.lastFx = 0;
                fx = opts.fxs[opts.lastFx];
                opts.currFx = fx;
            }

            // one-time fx overrides apply to:  $('div').cycle(3,'zoom');
            if (opts.oneTimeFx) {
                fx = opts.oneTimeFx;
                opts.oneTimeFx = null;
            }

            $.fn.cycle.resetState(opts, fx);

            // run the before callbacks
            if (opts.before.length)
                $.each(opts.before, function(i, o) {
                    if (p.cycleStop != opts.stopCount) return;
                    o.apply(next, [curr, next, opts, fwd]);
                });

            // stage the after callacks
            var after = function() {
                $.each(opts.after, function(i, o) {
                    if (p.cycleStop != opts.stopCount) return;
                    o.apply(next, [curr, next, opts, fwd]);
                });
            };

            if (opts.nextSlide != opts.currSlide) {
                // get ready to perform the transition
                opts.busy = 1;
                if (opts.fxFn) // fx function provided?
                    opts.fxFn(curr, next, opts, after, fwd);
                else if ($.isFunction($.fn.cycle[opts.fx])) // fx plugin ?
                    $.fn.cycle[opts.fx](curr, next, opts, after);
                else
                    $.fn.cycle.custom(curr, next, opts, after, manual && opts.fastOnEvent);
            }

            // calculate the next slide
            opts.lastSlide = opts.currSlide;
            if (opts.random) {
                opts.currSlide = opts.nextSlide;
                if (++opts.randomIndex == els.length)
                    opts.randomIndex = 0;
                opts.nextSlide = opts.randomMap[opts.randomIndex];
            } else { // sequence
                var roll = (opts.nextSlide + 1) == els.length;
                opts.nextSlide = roll ? 0 : opts.nextSlide + 1;
                opts.currSlide = roll ? els.length - 1 : opts.nextSlide - 1;
            }

            if (opts.pager)
                $.fn.cycle.updateActivePagerLink(opts.pager, opts.currSlide);
        }

        // stage the next transtion
        var ms = 0;
        if (opts.timeout && !opts.continuous)
            ms = getTimeout(curr, next, opts, fwd);
        else if (opts.continuous && p.cyclePause) // continuous shows work off an after callback, not this timer logic
            ms = 10;
        if (ms > 0)
            p.cycleTimeout = setTimeout(function() {
                go(els, opts, 0, !opts.rev)
            }, ms);
    };

    // invoked after transition
    $.fn.cycle.updateActivePagerLink = function(pager, currSlide) {
        $(pager).find('a').removeClass('activeSlide').filter('a:eq(' + currSlide + ')').addClass('activeSlide');
    };

    // calculate timeout value for current transition
    function getTimeout(curr, next, opts, fwd) {
        if (opts.timeoutFn) {
            // call user provided calc fn
            var t = opts.timeoutFn(curr, next, opts, fwd);
            while ((t - opts.speed) < 250) // sanitize timeout
                t += opts.speed;
            debug('calculated timeout: ' + t + '; speed: ' + opts.speed);
            if (t !== false)
                return t;
        }
        return opts.timeout;
    };

    // expose next/prev function, caller must pass in state
    $.fn.cycle.next = function(opts) {
        advance(opts, opts.rev ? -1 : 1);
    };
    $.fn.cycle.prev = function(opts) {
        advance(opts, opts.rev ? 1 : -1);
    };

    // advance slide forward or back
    function advance(opts, val) {
        var els = opts.elements;
        var p = opts.$cont[0],
            timeout = p.cycleTimeout;
        if (timeout) {
            clearTimeout(timeout);
            p.cycleTimeout = 0;
        }
        if (opts.random && val < 0) {
            // move back to the previously display slide
            opts.randomIndex--;
            if (--opts.randomIndex == -2)
                opts.randomIndex = els.length - 2;
            else if (opts.randomIndex == -1)
                opts.randomIndex = els.length - 1;
            opts.nextSlide = opts.randomMap[opts.randomIndex];
        } else if (opts.random) {
            if (++opts.randomIndex == els.length)
                opts.randomIndex = 0;
            opts.nextSlide = opts.randomMap[opts.randomIndex];
        } else {
            opts.nextSlide = opts.currSlide + val;
            if (opts.nextSlide < 0) {
                if (opts.nowrap) return false;
                opts.nextSlide = els.length - 1;
            } else if (opts.nextSlide >= els.length) {
                if (opts.nowrap) return false;
                opts.nextSlide = 0;
            }
        }

        if ($.isFunction(opts.prevNextClick))
            opts.prevNextClick(val > 0, opts.nextSlide, els[opts.nextSlide]);
        go(els, opts, 1, val >= 0);
        return false;
    };

    function buildPager(els, opts) {
        var $p = $(opts.pager);
        $.each(els, function(i, o) {
            $.fn.cycle.createPagerAnchor(i, o, $p, els, opts);
        });
        $.fn.cycle.updateActivePagerLink(opts.pager, opts.startingSlide);
    };

    $.fn.cycle.createPagerAnchor = function(i, el, $p, els, opts) {
        var a;
        if ($.isFunction(opts.pagerAnchorBuilder))
            a = opts.pagerAnchorBuilder(i, el);
        else
            a = '<a href="#">' + (i + 1) + '</a>';

        if (!a)
            return;
        var $a = $(a);
        // don't reparent if anchor is in the dom
        if ($a.parents('body').length === 0) {
            var arr = [];
            if ($p.length > 1) {
                $p.each(function() {
                    var $clone = $a.clone(true);
                    $(this).append($clone);
                    arr.push($clone);
                });
                $a = $(arr);
            } else {
                $a.appendTo($p);
            }
        }

        $a.bind(opts.pagerEvent, function(e) {
            e.preventDefault();
            opts.nextSlide = i;
            var p = opts.$cont[0],
                timeout = p.cycleTimeout;
            if (timeout) {
                clearTimeout(timeout);
                p.cycleTimeout = 0;
            }
            if ($.isFunction(opts.pagerClick))
                opts.pagerClick(opts.nextSlide, els[opts.nextSlide]);
            go(els, opts, 1, opts.currSlide < i); // trigger the trans
            return false;
        });

        if (opts.pagerEvent != 'click')
            $a.click(function() {
                return false;
            }); // supress click

        if (opts.pauseOnPagerHover)
            $a.hover(function() {
                opts.$cont[0].cyclePause++;
            }, function() {
                opts.$cont[0].cyclePause--;
            });
    };

    // helper fn to calculate the number of slides between the current and the next
    $.fn.cycle.hopsFromLast = function(opts, fwd) {
        var hops, l = opts.lastSlide,
            c = opts.currSlide;
        if (fwd)
            hops = c > l ? c - l : opts.slideCount - l;
        else
            hops = c < l ? l - c : l + opts.slideCount - c;
        return hops;
    };

    // fix clearType problems in ie6 by setting an explicit bg color
    // (otherwise text slides look horrible during a fade transition)
    function clearTypeFix($slides) {
        function hex(s) {
            s = parseInt(s).toString(16);
            return s.length < 2 ? '0' + s : s;
        };

        function getBg(e) {
            for (; e && e.nodeName.toLowerCase() != 'html'; e = e.parentNode) {
                var v = $.css(e, 'background-color');
                if (v.indexOf('rgb') >= 0) {
                    var rgb = v.match(/\d+/g);
                    return '#' + hex(rgb[0]) + hex(rgb[1]) + hex(rgb[2]);
                }
                if (v && v != 'transparent')
                    return v;
            }
            return '#ffffff';
        };
        $slides.each(function() {
            $(this).css('background-color', getBg(this));
        });
    };

    // reset common props before the next transition
    $.fn.cycle.commonReset = function(curr, next, opts, w, h, rev) {
        $(opts.elements).not(curr).hide();
        opts.cssBefore.opacity = 1;
        opts.cssBefore.display = 'block';
        if (w !== false && next.cycleW > 0)
            opts.cssBefore.width = next.cycleW;
        if (h !== false && next.cycleH > 0)
            opts.cssBefore.height = next.cycleH;
        opts.cssAfter = opts.cssAfter || {};
        opts.cssAfter.display = 'none';
        $(curr).css('zIndex', opts.slideCount + (rev === true ? 1 : 0));
        $(next).css('zIndex', opts.slideCount + (rev === true ? 0 : 1));
    };

    // the actual fn for effecting a transition
    $.fn.cycle.custom = function(curr, next, opts, cb, speedOverride) {
        var $l = $(curr),
            $n = $(next);
        var speedIn = opts.speedIn,
            speedOut = opts.speedOut,
            easeIn = opts.easeIn,
            easeOut = opts.easeOut;
        $n.css(opts.cssBefore);
        if (speedOverride) {
            if (typeof speedOverride == 'number')
                speedIn = speedOut = speedOverride;
            else
                speedIn = speedOut = 1;
            easeIn = easeOut = null;
        }
        var fn = function() {
            $n.animate(opts.animIn, speedIn, easeIn, cb)
        };
        $l.animate(opts.animOut, speedOut, easeOut, function() {
            if (opts.cssAfter) $l.css(opts.cssAfter);
            if (!opts.sync) fn();
        });
        if (opts.sync) fn();
    };

    // transition definitions - only fade is defined here, transition pack defines the rest
    $.fn.cycle.transitions = {
        fade: function($cont, $slides, opts) {
            $slides.not(':eq(' + opts.currSlide + ')').css('opacity', 0);
            opts.before.push(function(curr, next, opts) {
                $.fn.cycle.commonReset(curr, next, opts);
                opts.cssBefore.opacity = 0;
            });
            opts.animIn = {
                opacity: 1
            };
            opts.animOut = {
                opacity: 0
            };
            opts.cssBefore = {
                top: 0,
                left: 0
            };
        }
    };

    $.fn.cycle.ver = function() {
        return ver;
    };

    // override these globally if you like (they are all optional)
    $.fn.cycle.defaults = {
        fx: 'fade', // name of transition effect (or comma separated names, ex: fade,scrollUp,shuffle)
        timeout: 4000, // milliseconds between slide transitions (0 to disable auto advance)
        timeoutFn: null, // callback for determining per-slide timeout value:  function(currSlideElement, nextSlideElement, options, forwardFlag)
        continuous: 0, // true to start next transition immediately after current one completes
        speed: 1000, // speed of the transition (any valid fx speed value)
        speedIn: null, // speed of the 'in' transition
        speedOut: null, // speed of the 'out' transition
        next: null, // selector for element to use as click trigger for next slide
        prev: null, // selector for element to use as click trigger for previous slide
        prevNextClick: null, // callback fn for prev/next clicks:	function(isNext, zeroBasedSlideIndex, slideElement)
        prevNextEvent: 'click', // event which drives the manual transition to the previous or next slide
        pager: null, // selector for element to use as pager container
        pagerClick: null, // callback fn for pager clicks:	function(zeroBasedSlideIndex, slideElement)
        pagerEvent: 'click', // name of event which drives the pager navigation
        pagerAnchorBuilder: null, // callback fn for building anchor links:  function(index, DOMelement)
        before: null, // transition callback (scope set to element to be shown):	 function(currSlideElement, nextSlideElement, options, forwardFlag)
        after: null, // transition callback (scope set to element that was shown):  function(currSlideElement, nextSlideElement, options, forwardFlag)
        end: null, // callback invoked when the slideshow terminates (use with autostop or nowrap options): function(options)
        easing: null, // easing method for both in and out transitions
        easeIn: null, // easing for "in" transition
        easeOut: null, // easing for "out" transition
        shuffle: null, // coords for shuffle animation, ex: { top:15, left: 200 }
        animIn: null, // properties that define how the slide animates in
        animOut: null, // properties that define how the slide animates out
        cssBefore: null, // properties that define the initial state of the slide before transitioning in
        cssAfter: null, // properties that defined the state of the slide after transitioning out
        fxFn: null, // function used to control the transition: function(currSlideElement, nextSlideElement, options, afterCalback, forwardFlag)
        height: 'auto', // container height
        startingSlide: 0, // zero-based index of the first slide to be displayed
        sync: 1, // true if in/out transitions should occur simultaneously
        random: 0, // true for random, false for sequence (not applicable to shuffle fx)
        fit: 0, // force slides to fit container
        containerResize: 1, // resize container to fit largest slide
        pause: 0, // true to enable "pause on hover"
        pauseOnPagerHover: 0, // true to pause when hovering over pager link
        autostop: 0, // true to end slideshow after X transitions (where X == slide count)
        autostopCount: 0, // number of transitions (optionally used with autostop to define X)
        delay: 0, // additional delay (in ms) for first transition (hint: can be negative)
        slideExpr: null, // expression for selecting slides (if something other than all children is required)
        cleartype: !$.support.opacity, // true if clearType corrections should be applied (for IE)
        cleartypeNoBg: false, // set to true to disable extra cleartype fixing (leave false to force background color setting on slides)
        nowrap: 0, // true to prevent slideshow from wrapping
        fastOnEvent: 0, // force fast transitions when triggered manually (via pager or prev/next); value == time in ms
        randomizeEffects: 1, // valid when multiple effects are used; true to make the effect sequence random
        rev: 0, // causes animations to transition in reverse
        manualTrump: true, // causes manual transition to stop an active transition instead of being ignored
        requeueOnImageNotLoaded: true, // requeue the slideshow if any image slides are not yet loaded
        requeueTimeout: 250 // ms delay for requeue
    };

})(jQuery);


/*!
 * jQuery Cycle Plugin Transition Definitions
 * This script is a plugin for the jQuery Cycle Plugin
 * Examples and documentation at: http://malsup.com/jquery/cycle/
 * Copyright (c) 2007-2008 M. Alsup
 * Version:	 2.72
 * Dual licensed under the MIT and GPL licenses:
 * http://www.opensource.org/licenses/mit-license.php
 * http://www.gnu.org/licenses/gpl.html
 */
(function($) {

    //
    // These functions define one-time slide initialization for the named
    // transitions. To save file size feel free to remove any of these that you
    // don't need.
    //
    $.fn.cycle.transitions.none = function($cont, $slides, opts) {
        opts.fxFn = function(curr, next, opts, after) {
            $(next).show();
            $(curr).hide();
            after();
        };
    }

    // scrollUp/Down/Left/Right
    $.fn.cycle.transitions.scrollUp = function($cont, $slides, opts) {
        $cont.css('overflow', 'hidden');
        opts.before.push($.fn.cycle.commonReset);
        var h = $cont.height();
        opts.cssBefore = {
            top: h,
            left: 0
        };
        opts.cssFirst = {
            top: 0
        };
        opts.animIn = {
            top: 0
        };
        opts.animOut = {
            top: -h
        };
    };
    $.fn.cycle.transitions.scrollDown = function($cont, $slides, opts) {
        $cont.css('overflow', 'hidden');
        opts.before.push($.fn.cycle.commonReset);
        var h = $cont.height();
        opts.cssFirst = {
            top: 0
        };
        opts.cssBefore = {
            top: -h,
            left: 0
        };
        opts.animIn = {
            top: 0
        };
        opts.animOut = {
            top: h
        };
    };
    $.fn.cycle.transitions.scrollLeft = function($cont, $slides, opts) {
        $cont.css('overflow', 'hidden');
        opts.before.push($.fn.cycle.commonReset);
        var w = $cont.width();
        opts.cssFirst = {
            left: 0
        };
        opts.cssBefore = {
            left: w,
            top: 0
        };
        opts.animIn = {
            left: 0
        };
        opts.animOut = {
            left: 0 - w
        };
    };
    $.fn.cycle.transitions.scrollRight = function($cont, $slides, opts) {
        $cont.css('overflow', 'hidden');
        opts.before.push($.fn.cycle.commonReset);
        var w = $cont.width();
        opts.cssFirst = {
            left: 0
        };
        opts.cssBefore = {
            left: -w,
            top: 0
        };
        opts.animIn = {
            left: 0
        };
        opts.animOut = {
            left: w
        };
    };
    $.fn.cycle.transitions.scrollHorz = function($cont, $slides, opts) {
        $cont.css('overflow', 'hidden').width();
        opts.before.push(function(curr, next, opts, fwd) {
            $.fn.cycle.commonReset(curr, next, opts);
            opts.cssBefore.left = fwd ? (next.cycleW - 1) : (1 - next.cycleW);
            opts.animOut.left = fwd ? -curr.cycleW : curr.cycleW;
        });
        opts.cssFirst = {
            left: 0
        };
        opts.cssBefore = {
            top: 0
        };
        opts.animIn = {
            left: 0
        };
        opts.animOut = {
            top: 0
        };
    };
    $.fn.cycle.transitions.scrollVert = function($cont, $slides, opts) {
        $cont.css('overflow', 'hidden');
        opts.before.push(function(curr, next, opts, fwd) {
            $.fn.cycle.commonReset(curr, next, opts);
            opts.cssBefore.top = fwd ? (1 - next.cycleH) : (next.cycleH - 1);
            opts.animOut.top = fwd ? curr.cycleH : -curr.cycleH;
        });
        opts.cssFirst = {
            top: 0
        };
        opts.cssBefore = {
            left: 0
        };
        opts.animIn = {
            top: 0
        };
        opts.animOut = {
            left: 0
        };
    };

    // slideX/slideY
    $.fn.cycle.transitions.slideX = function($cont, $slides, opts) {
        opts.before.push(function(curr, next, opts) {
            $(opts.elements).not(curr).hide();
            $.fn.cycle.commonReset(curr, next, opts, false, true);
            opts.animIn.width = next.cycleW;
        });
        opts.cssBefore = {
            left: 0,
            top: 0,
            width: 0
        };
        opts.animIn = {
            width: 'show'
        };
        opts.animOut = {
            width: 0
        };
    };
    $.fn.cycle.transitions.slideY = function($cont, $slides, opts) {
        opts.before.push(function(curr, next, opts) {
            $(opts.elements).not(curr).hide();
            $.fn.cycle.commonReset(curr, next, opts, true, false);
            opts.animIn.height = next.cycleH;
        });
        opts.cssBefore = {
            left: 0,
            top: 0,
            height: 0
        };
        opts.animIn = {
            height: 'show'
        };
        opts.animOut = {
            height: 0
        };
    };

    // shuffle
    $.fn.cycle.transitions.shuffle = function($cont, $slides, opts) {
        var i, w = $cont.css('overflow', 'visible').width();
        $slides.css({
            left: 0,
            top: 0
        });
        opts.before.push(function(curr, next, opts) {
            $.fn.cycle.commonReset(curr, next, opts, true, true, true);
        });
        // only adjust speed once!
        if (!opts.speedAdjusted) {
            opts.speed = opts.speed / 2; // shuffle has 2 transitions
            opts.speedAdjusted = true;
        }
        opts.random = 0;
        opts.shuffle = opts.shuffle || {
            left: -w,
            top: 15
        };
        opts.els = [];
        for (i = 0; i < $slides.length; i++)
            opts.els.push($slides[i]);

        for (i = 0; i < opts.currSlide; i++)
            opts.els.push(opts.els.shift());

        // custom transition fn (hat tip to Benjamin Sterling for this bit of sweetness!)
        opts.fxFn = function(curr, next, opts, cb, fwd) {
            var $el = fwd ? $(curr) : $(next);
            $(next).css(opts.cssBefore);
            var count = opts.slideCount;
            $el.animate(opts.shuffle, opts.speedIn, opts.easeIn, function() {
                var hops = $.fn.cycle.hopsFromLast(opts, fwd);
                for (var k = 0; k < hops; k++)
                    fwd ? opts.els.push(opts.els.shift()) : opts.els.unshift(opts.els.pop());
                if (fwd) {
                    for (var i = 0, len = opts.els.length; i < len; i++)
                        $(opts.els[i]).css('z-index', len - i + count);
                } else {
                    var z = $(curr).css('z-index');
                    $el.css('z-index', parseInt(z) + 1 + count);
                }
                $el.animate({
                    left: 0,
                    top: 0
                }, opts.speedOut, opts.easeOut, function() {
                    $(fwd ? this : curr).hide();
                    if (cb) cb();
                });
            });
        };
        opts.cssBefore = {
            display: 'block',
            opacity: 1,
            top: 0,
            left: 0
        };
    };

    // turnUp/Down/Left/Right
    $.fn.cycle.transitions.turnUp = function($cont, $slides, opts) {
        opts.before.push(function(curr, next, opts) {
            $.fn.cycle.commonReset(curr, next, opts, true, false);
            opts.cssBefore.top = next.cycleH;
            opts.animIn.height = next.cycleH;
        });
        opts.cssFirst = {
            top: 0
        };
        opts.cssBefore = {
            left: 0,
            height: 0
        };
        opts.animIn = {
            top: 0
        };
        opts.animOut = {
            height: 0
        };
    };
    $.fn.cycle.transitions.turnDown = function($cont, $slides, opts) {
        opts.before.push(function(curr, next, opts) {
            $.fn.cycle.commonReset(curr, next, opts, true, false);
            opts.animIn.height = next.cycleH;
            opts.animOut.top = curr.cycleH;
        });
        opts.cssFirst = {
            top: 0
        };
        opts.cssBefore = {
            left: 0,
            top: 0,
            height: 0
        };
        opts.animOut = {
            height: 0
        };
    };
    $.fn.cycle.transitions.turnLeft = function($cont, $slides, opts) {
        opts.before.push(function(curr, next, opts) {
            $.fn.cycle.commonReset(curr, next, opts, false, true);
            opts.cssBefore.left = next.cycleW;
            opts.animIn.width = next.cycleW;
        });
        opts.cssBefore = {
            top: 0,
            width: 0
        };
        opts.animIn = {
            left: 0
        };
        opts.animOut = {
            width: 0
        };
    };
    $.fn.cycle.transitions.turnRight = function($cont, $slides, opts) {
        opts.before.push(function(curr, next, opts) {
            $.fn.cycle.commonReset(curr, next, opts, false, true);
            opts.animIn.width = next.cycleW;
            opts.animOut.left = curr.cycleW;
        });
        opts.cssBefore = {
            top: 0,
            left: 0,
            width: 0
        };
        opts.animIn = {
            left: 0
        };
        opts.animOut = {
            width: 0
        };
    };

    // zoom
    $.fn.cycle.transitions.zoom = function($cont, $slides, opts) {
        opts.before.push(function(curr, next, opts) {
            $.fn.cycle.commonReset(curr, next, opts, false, false, true);
            opts.cssBefore.top = next.cycleH / 2;
            opts.cssBefore.left = next.cycleW / 2;
            opts.animIn = {
                top: 0,
                left: 0,
                width: next.cycleW,
                height: next.cycleH
            };
            opts.animOut = {
                width: 0,
                height: 0,
                top: curr.cycleH / 2,
                left: curr.cycleW / 2
            };
        });
        opts.cssFirst = {
            top: 0,
            left: 0
        };
        opts.cssBefore = {
            width: 0,
            height: 0
        };
    };

    // fadeZoom
    $.fn.cycle.transitions.fadeZoom = function($cont, $slides, opts) {
        opts.before.push(function(curr, next, opts) {
            $.fn.cycle.commonReset(curr, next, opts, false, false);
            opts.cssBefore.left = next.cycleW / 2;
            opts.cssBefore.top = next.cycleH / 2;
            opts.animIn = {
                top: 0,
                left: 0,
                width: next.cycleW,
                height: next.cycleH
            };
        });
        opts.cssBefore = {
            width: 0,
            height: 0
        };
        opts.animOut = {
            opacity: 0
        };
    };

    // blindX
    $.fn.cycle.transitions.blindX = function($cont, $slides, opts) {
        var w = $cont.css('overflow', 'hidden').width();
        opts.before.push(function(curr, next, opts) {
            $.fn.cycle.commonReset(curr, next, opts);
            opts.animIn.width = next.cycleW;
            opts.animOut.left = curr.cycleW;
        });
        opts.cssBefore = {
            left: w,
            top: 0
        };
        opts.animIn = {
            left: 0
        };
        opts.animOut = {
            left: w
        };
    };
    // blindY
    $.fn.cycle.transitions.blindY = function($cont, $slides, opts) {
        var h = $cont.css('overflow', 'hidden').height();
        opts.before.push(function(curr, next, opts) {
            $.fn.cycle.commonReset(curr, next, opts);
            opts.animIn.height = next.cycleH;
            opts.animOut.top = curr.cycleH;
        });
        opts.cssBefore = {
            top: h,
            left: 0
        };
        opts.animIn = {
            top: 0
        };
        opts.animOut = {
            top: h
        };
    };
    // blindZ
    $.fn.cycle.transitions.blindZ = function($cont, $slides, opts) {
        var h = $cont.css('overflow', 'hidden').height();
        var w = $cont.width();
        opts.before.push(function(curr, next, opts) {
            $.fn.cycle.commonReset(curr, next, opts);
            opts.animIn.height = next.cycleH;
            opts.animOut.top = curr.cycleH;
        });
        opts.cssBefore = {
            top: h,
            left: w
        };
        opts.animIn = {
            top: 0,
            left: 0
        };
        opts.animOut = {
            top: h,
            left: w
        };
    };

    // growX - grow horizontally from centered 0 width
    $.fn.cycle.transitions.growX = function($cont, $slides, opts) {
        opts.before.push(function(curr, next, opts) {
            $.fn.cycle.commonReset(curr, next, opts, false, true);
            opts.cssBefore.left = this.cycleW / 2;
            opts.animIn = {
                left: 0,
                width: this.cycleW
            };
            opts.animOut = {
                left: 0
            };
        });
        opts.cssBefore = {
            width: 0,
            top: 0
        };
    };
    // growY - grow vertically from centered 0 height
    $.fn.cycle.transitions.growY = function($cont, $slides, opts) {
        opts.before.push(function(curr, next, opts) {
            $.fn.cycle.commonReset(curr, next, opts, true, false);
            opts.cssBefore.top = this.cycleH / 2;
            opts.animIn = {
                top: 0,
                height: this.cycleH
            };
            opts.animOut = {
                top: 0
            };
        });
        opts.cssBefore = {
            height: 0,
            left: 0
        };
    };

    // curtainX - squeeze in both edges horizontally
    $.fn.cycle.transitions.curtainX = function($cont, $slides, opts) {
        opts.before.push(function(curr, next, opts) {
            $.fn.cycle.commonReset(curr, next, opts, false, true, true);
            opts.cssBefore.left = next.cycleW / 2;
            opts.animIn = {
                left: 0,
                width: this.cycleW
            };
            opts.animOut = {
                left: curr.cycleW / 2,
                width: 0
            };
        });
        opts.cssBefore = {
            top: 0,
            width: 0
        };
    };
    // curtainY - squeeze in both edges vertically
    $.fn.cycle.transitions.curtainY = function($cont, $slides, opts) {
        opts.before.push(function(curr, next, opts) {
            $.fn.cycle.commonReset(curr, next, opts, true, false, true);
            opts.cssBefore.top = next.cycleH / 2;
            opts.animIn = {
                top: 0,
                height: next.cycleH
            };
            opts.animOut = {
                top: curr.cycleH / 2,
                height: 0
            };
        });
        opts.cssBefore = {
            left: 0,
            height: 0
        };
    };

    // cover - curr slide covered by next slide
    $.fn.cycle.transitions.cover = function($cont, $slides, opts) {
        var d = opts.direction || 'left';
        var w = $cont.css('overflow', 'hidden').width();
        var h = $cont.height();
        opts.before.push(function(curr, next, opts) {
            $.fn.cycle.commonReset(curr, next, opts);
            if (d == 'right')
                opts.cssBefore.left = -w;
            else if (d == 'up')
                opts.cssBefore.top = h;
            else if (d == 'down')
                opts.cssBefore.top = -h;
            else
                opts.cssBefore.left = w;
        });
        opts.animIn = {
            left: 0,
            top: 0
        };
        opts.animOut = {
            opacity: 1
        };
        opts.cssBefore = {
            top: 0,
            left: 0
        };
    };

    // uncover - curr slide moves off next slide
    $.fn.cycle.transitions.uncover = function($cont, $slides, opts) {
        var d = opts.direction || 'left';
        var w = $cont.css('overflow', 'hidden').width();
        var h = $cont.height();
        opts.before.push(function(curr, next, opts) {
            $.fn.cycle.commonReset(curr, next, opts, true, true, true);
            if (d == 'right')
                opts.animOut.left = w;
            else if (d == 'up')
                opts.animOut.top = -h;
            else if (d == 'down')
                opts.animOut.top = h;
            else
                opts.animOut.left = -w;
        });
        opts.animIn = {
            left: 0,
            top: 0
        };
        opts.animOut = {
            opacity: 1
        };
        opts.cssBefore = {
            top: 0,
            left: 0
        };
    };

    // toss - move top slide and fade away
    $.fn.cycle.transitions.toss = function($cont, $slides, opts) {
        var w = $cont.css('overflow', 'visible').width();
        var h = $cont.height();
        opts.before.push(function(curr, next, opts) {
            $.fn.cycle.commonReset(curr, next, opts, true, true, true);
            // provide default toss settings if animOut not provided
            if (!opts.animOut.left && !opts.animOut.top)
                opts.animOut = {
                    left: w * 2,
                    top: -h / 2,
                    opacity: 0
                };
            else
                opts.animOut.opacity = 0;
        });
        opts.cssBefore = {
            left: 0,
            top: 0
        };
        opts.animIn = {
            left: 0
        };
    };

    // wipe - clip animation
    $.fn.cycle.transitions.wipe = function($cont, $slides, opts) {
        var w = $cont.css('overflow', 'hidden').width();
        var h = $cont.height();
        opts.cssBefore = opts.cssBefore || {};
        var clip;
        if (opts.clip) {
            if (/l2r/.test(opts.clip))
                clip = 'rect(0px 0px ' + h + 'px 0px)';
            else if (/r2l/.test(opts.clip))
                clip = 'rect(0px ' + w + 'px ' + h + 'px ' + w + 'px)';
            else if (/t2b/.test(opts.clip))
                clip = 'rect(0px ' + w + 'px 0px 0px)';
            else if (/b2t/.test(opts.clip))
                clip = 'rect(' + h + 'px ' + w + 'px ' + h + 'px 0px)';
            else if (/zoom/.test(opts.clip)) {
                var top = parseInt(h / 2);
                var left = parseInt(w / 2);
                clip = 'rect(' + top + 'px ' + left + 'px ' + top + 'px ' + left + 'px)';
            }
        }

        opts.cssBefore.clip = opts.cssBefore.clip || clip || 'rect(0px 0px 0px 0px)';

        var d = opts.cssBefore.clip.match(/(\d+)/g);
        var t = parseInt(d[0]),
            r = parseInt(d[1]),
            b = parseInt(d[2]),
            l = parseInt(d[3]);

        opts.before.push(function(curr, next, opts) {
            if (curr == next) return;
            var $curr = $(curr),
                $next = $(next);
            $.fn.cycle.commonReset(curr, next, opts, true, true, false);
            opts.cssAfter.display = 'block';

            var step = 1,
                count = parseInt((opts.speedIn / 13)) - 1;
            (function f() {
                var tt = t ? t - parseInt(step * (t / count)) : 0;
                var ll = l ? l - parseInt(step * (l / count)) : 0;
                var bb = b < h ? b + parseInt(step * ((h - b) / count || 1)) : h;
                var rr = r < w ? r + parseInt(step * ((w - r) / count || 1)) : w;
                $next.css({
                    clip: 'rect(' + tt + 'px ' + rr + 'px ' + bb + 'px ' + ll + 'px)'
                });
                (step++ <= count) ? setTimeout(f, 13): $curr.css('display', 'none');
            })();
        });
        opts.cssBefore = {
            display: 'block',
            opacity: 1,
            top: 0,
            left: 0
        };
        opts.animIn = {
            left: 0
        };
        opts.animOut = {
            left: 0
        };
    };

})(jQuery);