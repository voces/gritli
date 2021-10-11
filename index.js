var R = Object.create;
var F6 = Object.defineProperty;
var X6 = Object.getOwnPropertyDescriptor;
var tt = Object.getOwnPropertyNames;
var nt = Object.getPrototypeOf, et = Object.prototype.hasOwnProperty;
var it = (f)=>F6(f, "__esModule", {
        value: !0
    })
;
var rt = (f, d)=>()=>(d || f((d = {
            exports: {
            }
        }).exports, d), d.exports)
;
var st = (f, d, H)=>{
    if (d && typeof d == "object" || typeof d == "function") for (let M of tt(d))!et.call(f, M) && M !== "default" && F6(f, M, {
        get: ()=>d[M]
        ,
        enumerable: !(H = X6(d, M)) || H.enumerable
    });
    return f;
}, E13 = (f)=>st(it(F6(f != null ? R(nt(f)) : {
    }, "default", f && f.__esModule && "default" in f ? {
        get: ()=>f.default
        ,
        enumerable: !0
    } : {
        value: f,
        enumerable: !0
    })), f)
;
var z = rt((J, Z)=>{
    (function(f, d) {
        typeof J == "object" && typeof Z != "undefined" ? Z.exports = d() : typeof define == "function" && define.amd ? define(d) : (f = typeof globalThis != "undefined" ? globalThis : f || self).dayjs = d();
    })(J, function() {
        "use strict";
        var f = 1000, d = 60000, H = 3600000, M = "millisecond", O = "second", _ = "minute", b = "hour", D = "day", j = "week", y = "month", V = "quarter", v = "year", T = "date", q = "Invalid Date", P = /^(\d{4})[-/]?(\d{1,2})?[-/]?(\d{0,2})[Tt\s]*(\d{1,2})?:?(\d{1,2})?:?(\d{1,2})?[.:]?(\d+)?$/, Q = /\[([^\]]+)]|Y{1,4}|M{1,4}|D{1,2}|d{1,4}|H{1,2}|h{1,2}|a|A|m{1,2}|s{1,2}|Z{1,2}|SSS/g, G = {
            name: "en",
            weekdays: "Sunday_Monday_Tuesday_Wednesday_Thursday_Friday_Saturday".split("_"),
            months: "January_February_March_April_May_June_July_August_September_October_November_December".split("_")
        }, I = function(i, e, t) {
            var r = String(i);
            return !r || r.length >= e ? i : "" + Array(e + 1 - r.length).join(t) + i;
        }, K = {
            s: I,
            z: function(i) {
                var e = -i.utcOffset(), t = Math.abs(e), r = Math.floor(t / 60), n = t % 60;
                return (e <= 0 ? "+" : "-") + I(r, 2, "0") + ":" + I(n, 2, "0");
            },
            m: function i(e, t) {
                if (e.date() < t.date()) return -i(t, e);
                var r = 12 * (t.year() - e.year()) + (t.month() - e.month()), n = e.clone().add(r, y), u = t - n < 0, s = e.clone().add(r + (u ? -1 : 1), y);
                return +(-(r + (t - n) / (u ? n - s : s - n)) || 0);
            },
            a: function(i) {
                return i < 0 ? Math.ceil(i) || 0 : Math.floor(i);
            },
            p: function(i) {
                return ({
                    M: y,
                    y: v,
                    w: j,
                    d: D,
                    D: T,
                    h: b,
                    m: _,
                    s: O,
                    ms: M,
                    Q: V
                })[i] || String(i || "").toLowerCase().replace(/s$/, "");
            },
            u: function(i) {
                return i === void 0;
            }
        }, x = "en", w = {
        };
        w[x] = G;
        var N = function(i) {
            return i instanceof C;
        }, A = function(i, e, t) {
            var r;
            if (!i) return x;
            if (typeof i == "string") w[i] && (r = i), e && (w[i] = e, r = i);
            else {
                var n = i.name;
                w[n] = i, r = n;
            }
            return !t && r && (x = r), r || !t && x;
        }, $ = function(i, e) {
            if (N(i)) return i.clone();
            var t = typeof e == "object" ? e : {
            };
            return t.date = i, t.args = arguments, new C(t);
        }, a = K;
        a.l = A, a.i = N, a.w = function(i, e) {
            return $(i, {
                locale: e.$L,
                utc: e.$u,
                x: e.$x,
                $offset: e.$offset
            });
        };
        var C = function() {
            function i(t) {
                this.$L = A(t.locale, null, !0), this.parse(t);
            }
            var e = i.prototype;
            return e.parse = function(t) {
                this.$d = (function(r) {
                    var n = r.date, u = r.utc;
                    if (n === null) return new Date(NaN);
                    if (a.u(n)) return new Date;
                    if (n instanceof Date) return new Date(n);
                    if (typeof n == "string" && !/Z$/i.test(n)) {
                        var s = n.match(P);
                        if (s) {
                            var o = s[2] - 1 || 0, c = (s[7] || "0").substring(0, 3);
                            return u ? new Date(Date.UTC(s[1], o, s[3] || 1, s[4] || 0, s[5] || 0, s[6] || 0, c)) : new Date(s[1], o, s[3] || 1, s[4] || 0, s[5] || 0, s[6] || 0, c);
                        }
                    }
                    return new Date(n);
                })(t), this.$x = t.x || {
                }, this.init();
            }, e.init = function() {
                var t = this.$d;
                this.$y = t.getFullYear(), this.$M = t.getMonth(), this.$D = t.getDate(), this.$W = t.getDay(), this.$H = t.getHours(), this.$m = t.getMinutes(), this.$s = t.getSeconds(), this.$ms = t.getMilliseconds();
            }, e.$utils = function() {
                return a;
            }, e.isValid = function() {
                return this.$d.toString() !== q;
            }, e.isSame = function(t, r) {
                var n = $(t);
                return this.startOf(r) <= n && n <= this.endOf(r);
            }, e.isAfter = function(t, r) {
                return $(t) < this.startOf(r);
            }, e.isBefore = function(t, r) {
                return this.endOf(r) < $(t);
            }, e.$g = function(t, r, n) {
                return a.u(t) ? this[r] : this.set(n, t);
            }, e.unix = function() {
                return Math.floor(this.valueOf() / 1000);
            }, e.valueOf = function() {
                return this.$d.getTime();
            }, e.startOf = function(t, r) {
                var n = this, u = !!a.u(r) || r, s = a.p(t), o = function(Y, m) {
                    var S = a.w(n.$u ? Date.UTC(n.$y, m, Y) : new Date(n.$y, m, Y), n);
                    return u ? S : S.endOf(D);
                }, c = function(Y, m) {
                    return a.w(n.toDate()[Y].apply(n.toDate("s"), (u ? [
                        0,
                        0,
                        0,
                        0
                    ] : [
                        23,
                        59,
                        59,
                        999
                    ]).slice(m)), n);
                }, h = this.$W, l = this.$M, p = this.$D, g = "set" + (this.$u ? "UTC" : "");
                switch(s){
                    case v:
                        return u ? o(1, 0) : o(31, 11);
                    case y:
                        return u ? o(1, l) : o(0, l + 1);
                    case j:
                        var L = this.$locale().weekStart || 0, W = (h < L ? h + 7 : h) - L;
                        return o(u ? p - W : p + (6 - W), l);
                    case D:
                    case T:
                        return c(g + "Hours", 0);
                    case b:
                        return c(g + "Minutes", 1);
                    case _:
                        return c(g + "Seconds", 2);
                    case O:
                        return c(g + "Milliseconds", 3);
                    default:
                        return this.clone();
                }
            }, e.endOf = function(t) {
                return this.startOf(t, !1);
            }, e.$set = function(t, r) {
                var n, u = a.p(t), s = "set" + (this.$u ? "UTC" : ""), o = (n = {
                }, n[D] = s + "Date", n[T] = s + "Date", n[y] = s + "Month", n[v] = s + "FullYear", n[b] = s + "Hours", n[_] = s + "Minutes", n[O] = s + "Seconds", n[M] = s + "Milliseconds", n)[u], c = u === D ? this.$D + (r - this.$W) : r;
                if (u === y || u === v) {
                    var h = this.clone().set(T, 1);
                    h.$d[o](c), h.init(), this.$d = h.set(T, Math.min(this.$D, h.daysInMonth())).$d;
                } else o && this.$d[o](c);
                return this.init(), this;
            }, e.set = function(t, r) {
                return this.clone().$set(t, r);
            }, e.get = function(t) {
                return this[a.p(t)]();
            }, e.add = function(t, r) {
                var n, u = this;
                t = Number(t);
                var s = a.p(r), o = function(l) {
                    var p = $(u);
                    return a.w(p.date(p.date() + Math.round(l * t)), u);
                };
                if (s === y) return this.set(y, this.$M + t);
                if (s === v) return this.set(v, this.$y + t);
                if (s === D) return o(1);
                if (s === j) return o(7);
                var c = (n = {
                }, n[_] = d, n[b] = H, n[O] = f, n)[s] || 1, h = this.$d.getTime() + t * c;
                return a.w(h, this);
            }, e.subtract = function(t, r) {
                return this.add(-1 * t, r);
            }, e.format = function(t) {
                var r = this, n = this.$locale();
                if (!this.isValid()) return n.invalidDate || q;
                var u = t || "YYYY-MM-DDTHH:mm:ssZ", s = a.z(this), o = this.$H, c = this.$m, h = this.$M, l = n.weekdays, p = n.months, g = function(m, S, U, k) {
                    return m && (m[S] || m(r, u)) || U[S].substr(0, k);
                }, L = function(m) {
                    return a.s(o % 12 || 12, m, "0");
                }, W = n.meridiem || function(m, S, U) {
                    var k = m < 12 ? "AM" : "PM";
                    return U ? k.toLowerCase() : k;
                }, Y = {
                    YY: String(this.$y).slice(-2),
                    YYYY: this.$y,
                    M: h + 1,
                    MM: a.s(h + 1, 2, "0"),
                    MMM: g(n.monthsShort, h, p, 3),
                    MMMM: g(p, h),
                    D: this.$D,
                    DD: a.s(this.$D, 2, "0"),
                    d: String(this.$W),
                    dd: g(n.weekdaysMin, this.$W, l, 2),
                    ddd: g(n.weekdaysShort, this.$W, l, 3),
                    dddd: l[this.$W],
                    H: String(o),
                    HH: a.s(o, 2, "0"),
                    h: L(1),
                    hh: L(2),
                    a: W(o, c, !0),
                    A: W(o, c, !1),
                    m: String(c),
                    mm: a.s(c, 2, "0"),
                    s: String(this.$s),
                    ss: a.s(this.$s, 2, "0"),
                    SSS: a.s(this.$ms, 3, "0"),
                    Z: s
                };
                return u.replace(Q, function(m, S) {
                    return S || Y[m] || s.replace(":", "");
                });
            }, e.utcOffset = function() {
                return 15 * -Math.round(this.$d.getTimezoneOffset() / 15);
            }, e.diff = function(t, r, n) {
                var u, s = a.p(r), o = $(t), c = (o.utcOffset() - this.utcOffset()) * d, h = this - o, l = a.m(this, o);
                return l = (u = {
                }, u[v] = l / 12, u[y] = l, u[V] = l / 3, u[j] = (h - c) / 604800000, u[D] = (h - c) / 86400000, u[b] = h / H, u[_] = h / d, u[O] = h / f, u)[s] || h, n ? l : a.a(l);
            }, e.daysInMonth = function() {
                return this.endOf(y).$D;
            }, e.$locale = function() {
                return w[this.$L];
            }, e.locale = function(t, r) {
                if (!t) return this.$L;
                var n = this.clone(), u = A(t, r, !0);
                return u && (n.$L = u), n;
            }, e.clone = function() {
                return a.w(this.$d, this);
            }, e.toDate = function() {
                return new Date(this.valueOf());
            }, e.toJSON = function() {
                return this.isValid() ? this.toISOString() : null;
            }, e.toISOString = function() {
                return this.$d.toISOString();
            }, e.toString = function() {
                return this.$d.toUTCString();
            }, i;
        }(), B = C.prototype;
        return $.prototype = B, [
            [
                "$ms",
                M
            ],
            [
                "$s",
                O
            ],
            [
                "$m",
                _
            ],
            [
                "$H",
                b
            ],
            [
                "$W",
                D
            ],
            [
                "$M",
                y
            ],
            [
                "$y",
                v
            ],
            [
                "$D",
                T
            ]
        ].forEach(function(i) {
            B[i[1]] = function(e) {
                return this.$g(e, i[0], i[1]);
            };
        }), $.extend = function(i, e) {
            return i.$i || (i(e, C, $), i.$i = !0), $;
        }, $.locale = A, $.isDayjs = N, $.unix = function(i) {
            return $(1000 * i);
        }, $.en = w[x], $.Ls = w, $.p = {
        }, $;
    });
});
var at = E13(z());
var export_default = at.default;
var ee = Object.create;
var _ = Object.defineProperty;
var ne = Object.getOwnPropertyDescriptor;
var te = Object.getOwnPropertyNames;
var re = Object.getPrototypeOf, ie5 = Object.prototype.hasOwnProperty;
var oe7 = (t)=>_(t, "__esModule", {
        value: !0
    })
;
var se5 = (t, o)=>()=>(o || t((o = {
            exports: {
            }
        }).exports, o), o.exports)
;
var ae = (t, o, D)=>{
    if (o && typeof o == "object" || typeof o == "function") for (let s of te(o))!ie5.call(t, s) && s !== "default" && _(t, s, {
        get: ()=>o[s]
        ,
        enumerable: !(D = ne(o, s)) || D.enumerable
    });
    return t;
}, fe = (t)=>ae(oe7(_(t != null ? ee(re(t)) : {
    }, "default", t && t.__esModule && "default" in t ? {
        get: ()=>t.default
        ,
        enumerable: !0
    } : {
        value: t,
        enumerable: !0
    })), t)
;
var G6 = se5((k, E)=>{
    (function(t, o) {
        typeof k == "object" && typeof E != "undefined" ? E.exports = o() : typeof define == "function" && define.amd ? define(o) : (t = typeof globalThis != "undefined" ? globalThis : t || self).dayjs_plugin_customParseFormat = o();
    })(k, function() {
        "use strict";
        var t = {
            LTS: "h:mm:ss A",
            LT: "h:mm A",
            L: "MM/DD/YYYY",
            LL: "MMMM D, YYYY",
            LLL: "MMMM D, YYYY h:mm A",
            LLLL: "dddd, MMMM D, YYYY h:mm A"
        }, o = /(\[[^[]*\])|([-:/.()\s]+)|(A|a|YYYY|YY?|MM?M?M?|Do|DD?|hh?|HH?|mm?|ss?|S{1,3}|z|ZZ?)/g, D = /\d\d/, s = /\d\d?/, S = /\d*[^\s\d-_:/()]+/, M = {
        }, X = function(e) {
            return (e = +e) + (e > 68 ? 1900 : 2000);
        }, a = function(e) {
            return function(n) {
                this[e] = +n;
            };
        }, V = [
            /[+-]\d\d:?(\d\d)?|Z/,
            function(e) {
                (this.zone || (this.zone = {
                })).offset = (function(n) {
                    if (!n || n === "Z") return 0;
                    var r = n.match(/([+-]|\d\d)/g), i = 60 * r[1] + (+r[2] || 0);
                    return i === 0 ? 0 : r[0] === "+" ? -i : i;
                })(e);
            }
        ], H = function(e) {
            var n = M[e];
            return n && (n.indexOf ? n : n.s.concat(n.f));
        }, q = function(e, n) {
            var r, i = M.meridiem;
            if (i) {
                for(var c = 1; c <= 24; c += 1)if (e.indexOf(i(c, 0, n)) > -1) {
                    r = c > 12;
                    break;
                }
            } else r = e === (n ? "pm" : "PM");
            return r;
        }, I = {
            A: [
                S,
                function(e) {
                    this.afternoon = q(e, !1);
                }
            ],
            a: [
                S,
                function(e) {
                    this.afternoon = q(e, !0);
                }
            ],
            S: [
                /\d/,
                function(e) {
                    this.milliseconds = 100 * +e;
                }
            ],
            SS: [
                D,
                function(e) {
                    this.milliseconds = 10 * +e;
                }
            ],
            SSS: [
                /\d{3}/,
                function(e) {
                    this.milliseconds = +e;
                }
            ],
            s: [
                s,
                a("seconds")
            ],
            ss: [
                s,
                a("seconds")
            ],
            m: [
                s,
                a("minutes")
            ],
            mm: [
                s,
                a("minutes")
            ],
            H: [
                s,
                a("hours")
            ],
            h: [
                s,
                a("hours")
            ],
            HH: [
                s,
                a("hours")
            ],
            hh: [
                s,
                a("hours")
            ],
            D: [
                s,
                a("day")
            ],
            DD: [
                D,
                a("day")
            ],
            Do: [
                S,
                function(e) {
                    var n = M.ordinal, r = e.match(/\d+/);
                    if (this.day = r[0], n) for(var i = 1; i <= 31; i += 1)n(i).replace(/\[|\]/g, "") === e && (this.day = i);
                }
            ],
            M: [
                s,
                a("month")
            ],
            MM: [
                D,
                a("month")
            ],
            MMM: [
                S,
                function(e) {
                    var n = H("months"), r = (H("monthsShort") || n.map(function(i) {
                        return i.substr(0, 3);
                    })).indexOf(e) + 1;
                    if (r < 1) throw new Error;
                    this.month = r % 12 || r;
                }
            ],
            MMMM: [
                S,
                function(e) {
                    var n = H("months").indexOf(e) + 1;
                    if (n < 1) throw new Error;
                    this.month = n % 12 || n;
                }
            ],
            Y: [
                /[+-]?\d+/,
                a("year")
            ],
            YY: [
                D,
                function(e) {
                    this.year = X(e);
                }
            ],
            YYYY: [
                /\d{4}/,
                a("year")
            ],
            Z: V,
            ZZ: V
        };
        function J(e) {
            var n, r;
            n = e, r = M && M.formats;
            for(var i = (e = n.replace(/(\[[^\]]+])|(LTS?|l{1,4}|L{1,4})/g, function(y, Y, h) {
                var f = h && h.toUpperCase();
                return Y || r[h] || t[h] || r[f].replace(/(\[[^\]]+])|(MMMM|MM|DD|dddd)/g, function(p, v, L) {
                    return v || L.slice(1);
                });
            })).match(o), c = i.length, d = 0; d < c; d += 1){
                var T = i[d], g = I[T], l = g && g[0], m = g && g[1];
                i[d] = m ? {
                    regex: l,
                    parser: m
                } : T.replace(/^\[|\]$/g, "");
            }
            return function(y) {
                for(var Y = {
                }, h = 0, f = 0; h < c; h += 1){
                    var p = i[h];
                    if (typeof p == "string") f += p.length;
                    else {
                        var v = p.regex, L = p.parser, b = y.substr(f), $ = v.exec(b)[0];
                        L.call(Y, $), y = y.replace($, "");
                    }
                }
                return (function(w) {
                    var u = w.afternoon;
                    if (u !== void 0) {
                        var x = w.hours;
                        u ? x < 12 && (w.hours += 12) : x === 12 && (w.hours = 0), delete w.afternoon;
                    }
                })(Y), Y;
            };
        }
        return function(e, n, r) {
            r.p.customParseFormat = !0, e && e.parseTwoDigitYear && (X = e.parseTwoDigitYear);
            var i = n.prototype, c = i.parse;
            i.parse = function(d) {
                var T = d.date, g = d.utc, l = d.args;
                this.$u = g;
                var m = l[1];
                if (typeof m == "string") {
                    var y = l[2] === !0, Y = l[3] === !0, h = y || Y, f = l[2];
                    Y && (f = l[2]), M = this.$locale(), !y && f && (M = r.Ls[f]), this.$d = (function(b, $, w) {
                        try {
                            if ([
                                "x",
                                "X"
                            ].indexOf($) > -1) return new Date(($ === "X" ? 1000 : 1) * b);
                            var u = J($)(b), x = u.year, A = u.month, K = u.day, N = u.hours, Q = u.minutes, R = u.seconds, W = u.milliseconds, B = u.zone, O = new Date, z = K || (x || A ? 1 : O.getDate()), F = x || O.getFullYear(), Z = 0;
                            x && !A || (Z = A > 0 ? A - 1 : O.getMonth());
                            var P = N || 0, j = Q || 0, C = R || 0, U = W || 0;
                            return B ? new Date(Date.UTC(F, Z, z, P, j, C, U + 60 * B.offset * 1000)) : w ? new Date(Date.UTC(F, Z, z, P, j, C, U)) : new Date(F, Z, z, P, j, C, U);
                        } catch (he) {
                            return new Date("");
                        }
                    })(T, m, g), this.init(), f && f !== !0 && (this.$L = this.locale(f).$L), h && T != this.format(m) && (this.$d = new Date("")), M = {
                    };
                } else if (m instanceof Array) for(var p = m.length, v = 1; v <= p; v += 1){
                    l[1] = m[v - 1];
                    var L = r.apply(this, l);
                    if (L.isValid()) {
                        this.$d = L.$d, this.$L = L.$L, this.init();
                        break;
                    }
                    v === p && (this.$d = new Date(""));
                }
                else c.call(this, d);
            };
        };
    });
});
var ue = fe(G6());
var export_default1 = ue.default;
export_default.extend(export_default1);
var D = Object.create;
var j = Object.defineProperty;
var z1 = Object.getOwnPropertyDescriptor;
var B = Object.getOwnPropertyNames;
var G1 = Object.getPrototypeOf, ee1 = Object.prototype.hasOwnProperty;
var ne1 = (e)=>j(e, "__esModule", {
        value: !0
    })
;
var H = (e, n)=>()=>(n || e((n = {
            exports: {
            }
        }).exports, n), n.exports)
;
var te1 = (e, n, t)=>{
    if (n && typeof n == "object" || typeof n == "function") for (let l of B(n))!ee1.call(e, l) && l !== "default" && j(e, l, {
        get: ()=>n[l]
        ,
        enumerable: !(t = z1(n, l)) || t.enumerable
    });
    return e;
}, J = (e)=>te1(ne1(j(e != null ? D(G1(e)) : {
    }, "default", e && e.__esModule && "default" in e ? {
        get: ()=>e.default
        ,
        enumerable: !0
    } : {
        value: e,
        enumerable: !0
    })), e)
;
var $ = H((r)=>{
    "use strict";
    var _, v, g, C;
    typeof performance == "object" && typeof performance.now == "function" ? (K = performance, r.unstable_now = function() {
        return K.now();
    }) : (F = Date, Q = F.now(), r.unstable_now = function() {
        return F.now() - Q;
    });
    var K, F, Q;
    typeof window == "undefined" || typeof MessageChannel != "function" ? (y = null, L = null, N = function() {
        if (y !== null) try {
            var e = r.unstable_now();
            y(!0, e), y = null;
        } catch (n) {
            throw setTimeout(N, 0), n;
        }
    }, _ = function(e) {
        y !== null ? setTimeout(_, 0, e) : (y = e, setTimeout(N, 0));
    }, v = function(e, n) {
        L = setTimeout(e, n);
    }, g = function() {
        clearTimeout(L);
    }, r.unstable_shouldYield = function() {
        return !1;
    }, C = r.unstable_forceFrameRate = function() {
    }) : (S = window.setTimeout, X = window.clearTimeout, typeof console != "undefined" && (Z = window.cancelAnimationFrame, typeof window.requestAnimationFrame != "function" && console.error("This browser doesn't support requestAnimationFrame. Make sure that you load a polyfill in older browsers. https://reactjs.org/link/react-polyfills"), typeof Z != "function" && console.error("This browser doesn't support cancelAnimationFrame. Make sure that you load a polyfill in older browsers. https://reactjs.org/link/react-polyfills")), h = !1, w = null, P = -1, E = 5, R = 0, r.unstable_shouldYield = function() {
        return r.unstable_now() >= R;
    }, C = function() {
    }, r.unstable_forceFrameRate = function(e) {
        0 > e || 125 < e ? console.error("forceFrameRate takes a positive int between 0 and 125, forcing frame rates higher than 125 fps is not supported") : E = 0 < e ? Math.floor(1000 / e) : 5;
    }, q = new MessageChannel, x = q.port2, q.port1.onmessage = function() {
        if (w !== null) {
            var e = r.unstable_now();
            R = e + E;
            try {
                w(!0, e) ? x.postMessage(null) : (h = !1, w = null);
            } catch (n) {
                throw x.postMessage(null), n;
            }
        } else h = !1;
    }, _ = function(e) {
        w = e, h || (h = !0, x.postMessage(null));
    }, v = function(e, n) {
        P = S(function() {
            e(r.unstable_now());
        }, n);
    }, g = function() {
        X(P), P = -1;
    });
    var y, L, N, S, X, Z, h, w, P, E, R, q, x;
    function Y(e, n) {
        var t = e.length;
        e.push(n);
        e: for(;;){
            var l = t - 1 >>> 1, o = e[l];
            if (o !== void 0 && 0 < I(o, n)) e[l] = n, e[t] = o, t = l;
            else break e;
        }
    }
    function a(e) {
        return e = e[0], e === void 0 ? null : e;
    }
    function T(e) {
        var n = e[0];
        if (n !== void 0) {
            var t = e.pop();
            if (t !== n) {
                e[0] = t;
                e: for(var l = 0, o = e.length; l < o;){
                    var f = 2 * (l + 1) - 1, b = e[f], m = f + 1, d = e[m];
                    if (b !== void 0 && 0 > I(b, t)) d !== void 0 && 0 > I(d, b) ? (e[l] = d, e[m] = t, l = m) : (e[l] = b, e[f] = t, l = f);
                    else if (d !== void 0 && 0 > I(d, t)) e[l] = d, e[m] = t, l = m;
                    else break e;
                }
            }
            return n;
        }
        return null;
    }
    function I(e, n) {
        var t = e.sortIndex - n.sortIndex;
        return t !== 0 ? t : e.id - n.id;
    }
    var s = [], c = [], re = 1, u = null, i = 3, M = !1, p = !1, k = !1;
    function U(e) {
        for(var n = a(c); n !== null;){
            if (n.callback === null) T(c);
            else if (n.startTime <= e) T(c), n.sortIndex = n.expirationTime, Y(s, n);
            else break;
            n = a(c);
        }
    }
    function W(e) {
        if (k = !1, U(e), !p) if (a(s) !== null) p = !0, _(O);
        else {
            var n = a(c);
            n !== null && v(W, n.startTime - e);
        }
    }
    function O(e, n) {
        p = !1, k && (k = !1, g()), M = !0;
        var t = i;
        try {
            for(U(n), u = a(s); u !== null && (!(u.expirationTime > n) || e && !r.unstable_shouldYield());){
                var l = u.callback;
                if (typeof l == "function") {
                    u.callback = null, i = u.priorityLevel;
                    var o = l(u.expirationTime <= n);
                    n = r.unstable_now(), typeof o == "function" ? u.callback = o : u === a(s) && T(s), U(n);
                } else T(s);
                u = a(s);
            }
            if (u !== null) var f = !0;
            else {
                var b = a(c);
                b !== null && v(W, b.startTime - n), f = !1;
            }
            return f;
        } finally{
            u = null, i = t, M = !1;
        }
    }
    var le = C;
    r.unstable_IdlePriority = 5;
    r.unstable_ImmediatePriority = 1;
    r.unstable_LowPriority = 4;
    r.unstable_NormalPriority = 3;
    r.unstable_Profiling = null;
    r.unstable_UserBlockingPriority = 2;
    r.unstable_cancelCallback = function(e) {
        e.callback = null;
    };
    r.unstable_continueExecution = function() {
        p || M || (p = !0, _(O));
    };
    r.unstable_getCurrentPriorityLevel = function() {
        return i;
    };
    r.unstable_getFirstCallbackNode = function() {
        return a(s);
    };
    r.unstable_next = function(e) {
        switch(i){
            case 1:
            case 2:
            case 3:
                var n = 3;
                break;
            default:
                n = i;
        }
        var t = i;
        i = n;
        try {
            return e();
        } finally{
            i = t;
        }
    };
    r.unstable_pauseExecution = function() {
    };
    r.unstable_requestPaint = le;
    r.unstable_runWithPriority = function(e, n) {
        switch(e){
            case 1:
            case 2:
            case 3:
            case 4:
            case 5: break;
            default:
                e = 3;
        }
        var t = i;
        i = e;
        try {
            return n();
        } finally{
            i = t;
        }
    };
    r.unstable_scheduleCallback = function(e, n, t) {
        var l = r.unstable_now();
        switch(typeof t == "object" && t !== null ? (t = t.delay, t = typeof t == "number" && 0 < t ? l + t : l) : t = l, e){
            case 1:
                var o = -1;
                break;
            case 2:
                o = 250;
                break;
            case 5:
                o = 1073741823;
                break;
            case 4:
                o = 10000;
                break;
            default:
                o = 5000;
        }
        return o = t + o, e = {
            id: re++,
            callback: n,
            priorityLevel: e,
            startTime: t,
            expirationTime: o,
            sortIndex: -1
        }, t > l ? (e.sortIndex = t, Y(c, e), a(s) === null && e === a(c) && (k ? g() : k = !0, v(W, t - l))) : (e.sortIndex = o, Y(s, e), p || M || (p = !0, _(O))), e;
    };
    r.unstable_wrapCallback = function(e) {
        var n = i;
        return function() {
            var t = i;
            i = n;
            try {
                return e.apply(this, arguments);
            } finally{
                i = t;
            }
        };
    };
});
var V = H((se, A)=>{
    "use strict";
    A.exports = $();
});
var ie1 = J(V());
var export_default2 = ie1.default;
var b = Object.create;
var s = Object.defineProperty;
var p = Object.getOwnPropertyDescriptor;
var O = Object.getOwnPropertyNames;
var j1 = Object.getPrototypeOf, g = Object.prototype.hasOwnProperty;
var m = (r)=>s(r, "__esModule", {
        value: !0
    })
;
var v7 = (r, e)=>()=>(e || r((e = {
            exports: {
            }
        }).exports, e), e.exports)
;
var y = (r, e, t)=>{
    if (e && typeof e == "object" || typeof e == "function") for (let n of O(e))!g.call(r, n) && n !== "default" && s(r, n, {
        get: ()=>e[n]
        ,
        enumerable: !(t = p(e, n)) || t.enumerable
    });
    return r;
}, h = (r)=>y(m(s(r != null ? b(j1(r)) : {
    }, "default", r && r.__esModule && "default" in r ? {
        get: ()=>r.default
        ,
        enumerable: !0
    } : {
        value: r,
        enumerable: !0
    })), r)
;
var l = v7((q, i)=>{
    "use strict";
    var u = Object.getOwnPropertySymbols, d = Object.prototype.hasOwnProperty, w = Object.prototype.propertyIsEnumerable;
    function P(r) {
        if (r == null) throw new TypeError("Object.assign cannot be called with null or undefined");
        return Object(r);
    }
    function E() {
        try {
            if (!Object.assign) return !1;
            var r = new String("abc");
            if (r[5] = "de", Object.getOwnPropertyNames(r)[0] === "5") return !1;
            for(var e = {
            }, t = 0; t < 10; t++)e["_" + String.fromCharCode(t)] = t;
            var n = Object.getOwnPropertyNames(e).map(function(o) {
                return e[o];
            });
            if (n.join("") !== "0123456789") return !1;
            var a = {
            };
            return "abcdefghijklmnopqrst".split("").forEach(function(o) {
                a[o] = o;
            }), Object.keys(Object.assign({
            }, a)).join("") === "abcdefghijklmnopqrst";
        } catch (o) {
            return !1;
        }
    }
    i.exports = E() ? Object.assign : function(r, e) {
        for(var t, n = P(r), a, o = 1; o < arguments.length; o++){
            t = Object(arguments[o]);
            for(var f in t)d.call(t, f) && (n[f] = t[f]);
            if (u) {
                a = u(t);
                for(var c = 0; c < a.length; c++)w.call(t, a[c]) && (n[a[c]] = t[a[c]]);
            }
        }
        return n;
    };
});
var S = h(l());
var export_default3 = S.default;
var W = Object.create;
var h1 = Object.defineProperty;
var Y = Object.getOwnPropertyDescriptor;
var G2 = Object.getOwnPropertyNames;
var J1 = Object.getPrototypeOf, K4 = Object.prototype.hasOwnProperty;
var Q = (e)=>h1(e, "__esModule", {
        value: !0
    })
;
var X1 = (e)=>{
    if (typeof require != "undefined") return require(e);
    throw new Error('Dynamic require of "' + e + '" is not supported');
};
var j2 = (e, t)=>()=>(t || e((t = {
            exports: {
            }
        }).exports, t), t.exports)
;
var Z = (e, t, r)=>{
    if (t && typeof t == "object" || typeof t == "function") for (let o of G2(t))!K4.call(e, o) && o !== "default" && h1(e, o, {
        get: ()=>t[o]
        ,
        enumerable: !(r = Y(t, o)) || r.enumerable
    });
    return e;
}, O1 = (e)=>Z(Q(h1(e != null ? W(J1(e)) : {
    }, "default", e && e.__esModule && "default" in e ? {
        get: ()=>e.default
        ,
        enumerable: !0
    } : {
        value: e,
        enumerable: !0
    })), e)
;
var z2 = j2((n)=>{
    "use strict";
    var E = export_default3, y = 60103, P = 60106;
    n.Fragment = 60107;
    n.StrictMode = 60108;
    n.Profiler = 60114;
    var x = 60109, I = 60110, w = 60112;
    n.Suspense = 60113;
    var A = 60115, F = 60116;
    typeof Symbol == "function" && Symbol.for && (l = Symbol.for, y = l("react.element"), P = l("react.portal"), n.Fragment = l("react.fragment"), n.StrictMode = l("react.strict_mode"), n.Profiler = l("react.profiler"), x = l("react.provider"), I = l("react.context"), w = l("react.forward_ref"), n.Suspense = l("react.suspense"), A = l("react.memo"), F = l("react.lazy"));
    var l, L = typeof Symbol == "function" && Symbol.iterator;
    function b(e) {
        return e === null || typeof e != "object" ? null : (e = L && e[L] || e["@@iterator"], typeof e == "function" ? e : null);
    }
    function _(e) {
        for(var t = "https://reactjs.org/docs/error-decoder.html?invariant=" + e, r = 1; r < arguments.length; r++)t += "&args[]=" + encodeURIComponent(arguments[r]);
        return "Minified React error #" + e + "; visit " + t + " for the full message or use the non-minified dev environment for full errors and additional helpful warnings.";
    }
    var q = {
        isMounted: function() {
            return !1;
        },
        enqueueForceUpdate: function() {
        },
        enqueueReplaceState: function() {
        },
        enqueueSetState: function() {
        }
    }, D = {
    };
    function d(e, t, r) {
        this.props = e, this.context = t, this.refs = D, this.updater = r || q;
    }
    d.prototype.isReactComponent = {
    };
    d.prototype.setState = function(e, t) {
        if (typeof e != "object" && typeof e != "function" && e != null) throw Error(_(85));
        this.updater.enqueueSetState(this, e, t, "setState");
    };
    d.prototype.forceUpdate = function(e) {
        this.updater.enqueueForceUpdate(this, e, "forceUpdate");
    };
    function M() {
    }
    M.prototype = d.prototype;
    function S(e, t, r) {
        this.props = e, this.context = t, this.refs = D, this.updater = r || q;
    }
    var C = S.prototype = new M;
    C.constructor = S;
    E(C, d.prototype);
    C.isPureReactComponent = !0;
    var R = {
        current: null
    }, N = Object.prototype.hasOwnProperty, U = {
        key: !0,
        ref: !0,
        __self: !0,
        __source: !0
    };
    function T(e, t, r) {
        var o, u = {
        }, c = null, f = null;
        if (t != null) for(o in t.ref !== void 0 && (f = t.ref), t.key !== void 0 && (c = "" + t.key), t)N.call(t, o) && !U.hasOwnProperty(o) && (u[o] = t[o]);
        var s = arguments.length - 2;
        if (s === 1) u.children = r;
        else if (1 < s) {
            for(var i = Array(s), p = 0; p < s; p++)i[p] = arguments[p + 2];
            u.children = i;
        }
        if (e && e.defaultProps) for(o in s = e.defaultProps, s)u[o] === void 0 && (u[o] = s[o]);
        return {
            $$typeof: y,
            type: e,
            key: c,
            ref: f,
            props: u,
            _owner: R.current
        };
    }
    function ee(e, t) {
        return {
            $$typeof: y,
            type: e.type,
            key: t,
            ref: e.ref,
            props: e.props,
            _owner: e._owner
        };
    }
    function k(e) {
        return typeof e == "object" && e !== null && e.$$typeof === y;
    }
    function te(e) {
        var t = {
            "=": "=0",
            ":": "=2"
        };
        return "$" + e.replace(/[=:]/g, function(r) {
            return t[r];
        });
    }
    var V = /\/+/g;
    function $(e, t) {
        return typeof e == "object" && e !== null && e.key != null ? te("" + e.key) : t.toString(36);
    }
    function v(e, t, r, o, u) {
        var c = typeof e;
        (c === "undefined" || c === "boolean") && (e = null);
        var f = !1;
        if (e === null) f = !0;
        else switch(c){
            case "string":
            case "number":
                f = !0;
                break;
            case "object":
                switch(e.$$typeof){
                    case y:
                    case P:
                        f = !0;
                }
        }
        if (f) return f = e, u = u(f), e = o === "" ? "." + $(f, 0) : o, Array.isArray(u) ? (r = "", e != null && (r = e.replace(V, "$&/") + "/"), v(u, t, r, "", function(p) {
            return p;
        })) : u != null && (k(u) && (u = ee(u, r + (!u.key || f && f.key === u.key ? "" : ("" + u.key).replace(V, "$&/") + "/") + e)), t.push(u)), 1;
        if (f = 0, o = o === "" ? "." : o + ":", Array.isArray(e)) for(var s = 0; s < e.length; s++){
            c = e[s];
            var i = o + $(c, s);
            f += v(c, t, r, i, u);
        }
        else if (i = b(e), typeof i == "function") for(e = i.call(e), s = 0; !(c = e.next()).done;)c = c.value, i = o + $(c, s++), f += v(c, t, r, i, u);
        else if (c === "object") throw t = "" + e, Error(_(31, t === "[object Object]" ? "object with keys {" + Object.keys(e).join(", ") + "}" : t));
        return f;
    }
    function m(e, t, r) {
        if (e == null) return e;
        var o = [], u = 0;
        return v(e, o, "", "", function(c) {
            return t.call(r, c, u++);
        }), o;
    }
    function re(e) {
        if (e._status === -1) {
            var t = e._result;
            t = t(), e._status = 0, e._result = t, t.then(function(r) {
                e._status === 0 && (r = r.default, e._status = 1, e._result = r);
            }, function(r) {
                e._status === 0 && (e._status = 2, e._result = r);
            });
        }
        if (e._status === 1) return e._result;
        throw e._result;
    }
    var B = {
        current: null
    };
    function a() {
        var e = B.current;
        if (e === null) throw Error(_(321));
        return e;
    }
    var ne = {
        ReactCurrentDispatcher: B,
        ReactCurrentBatchConfig: {
            transition: 0
        },
        ReactCurrentOwner: R,
        IsSomeRendererActing: {
            current: !1
        },
        assign: E
    };
    n.Children = {
        map: m,
        forEach: function(e, t, r) {
            m(e, function() {
                t.apply(this, arguments);
            }, r);
        },
        count: function(e) {
            var t = 0;
            return m(e, function() {
                t++;
            }), t;
        },
        toArray: function(e) {
            return m(e, function(t) {
                return t;
            }) || [];
        },
        only: function(e) {
            if (!k(e)) throw Error(_(143));
            return e;
        }
    };
    n.Component = d;
    n.PureComponent = S;
    n.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED = ne;
    n.cloneElement = function(e, t, r) {
        if (e == null) throw Error(_(267, e));
        var o = E({
        }, e.props), u = e.key, c = e.ref, f = e._owner;
        if (t != null) {
            if (t.ref !== void 0 && (c = t.ref, f = R.current), t.key !== void 0 && (u = "" + t.key), e.type && e.type.defaultProps) var s = e.type.defaultProps;
            for(i in t)N.call(t, i) && !U.hasOwnProperty(i) && (o[i] = t[i] === void 0 && s !== void 0 ? s[i] : t[i]);
        }
        var i = arguments.length - 2;
        if (i === 1) o.children = r;
        else if (1 < i) {
            s = Array(i);
            for(var p = 0; p < i; p++)s[p] = arguments[p + 2];
            o.children = s;
        }
        return {
            $$typeof: y,
            type: e.type,
            key: u,
            ref: c,
            props: o,
            _owner: f
        };
    };
    n.createContext = function(e, t) {
        return t === void 0 && (t = null), e = {
            $$typeof: I,
            _calculateChangedBits: t,
            _currentValue: e,
            _currentValue2: e,
            _threadCount: 0,
            Provider: null,
            Consumer: null
        }, e.Provider = {
            $$typeof: x,
            _context: e
        }, e.Consumer = e;
    };
    n.createElement = T;
    n.createFactory = function(e) {
        var t = T.bind(null, e);
        return t.type = e, t;
    };
    n.createRef = function() {
        return {
            current: null
        };
    };
    n.forwardRef = function(e) {
        return {
            $$typeof: w,
            render: e
        };
    };
    n.isValidElement = k;
    n.lazy = function(e) {
        return {
            $$typeof: F,
            _payload: {
                _status: -1,
                _result: e
            },
            _init: re
        };
    };
    n.memo = function(e, t) {
        return {
            $$typeof: A,
            type: e,
            compare: t === void 0 ? null : t
        };
    };
    n.useCallback = function(e, t) {
        return a().useCallback(e, t);
    };
    n.useContext = function(e, t) {
        return a().useContext(e, t);
    };
    n.useDebugValue = function() {
    };
    n.useEffect = function(e, t) {
        return a().useEffect(e, t);
    };
    n.useImperativeHandle = function(e, t, r) {
        return a().useImperativeHandle(e, t, r);
    };
    n.useLayoutEffect = function(e, t) {
        return a().useLayoutEffect(e, t);
    };
    n.useMemo = function(e, t) {
        return a().useMemo(e, t);
    };
    n.useReducer = function(e, t, r) {
        return a().useReducer(e, t, r);
    };
    n.useRef = function(e) {
        return a().useRef(e);
    };
    n.useState = function(e) {
        return a().useState(e);
    };
    n.version = "17.0.2";
});
var g1 = j2((se, H)=>{
    "use strict";
    H.exports = z2();
});
var oe1 = O1(g1()), ue1 = O1(g1()), { Fragment: fe1 , StrictMode: le , Profiler: pe4 , Suspense: ae1 , Children: ye , Component: de , PureComponent: _e , __SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED: ve , cloneElement: me , createContext: he , createElement: Ee , createFactory: Se , createRef: Ce , forwardRef: Re , isValidElement: ke , lazy: $e , memo: ge , useCallback: je , useContext: Oe , useDebugValue: Pe , useEffect: xe , useImperativeHandle: Ie1 , useLayoutEffect: we , useMemo: Ae , useReducer: Fe , useRef: Le2 , useState: qe , version: De  } = oe1;
var export_default4 = ue1.default;
var _s = Object.create;
var Or = Object.defineProperty;
var Ns = Object.getOwnPropertyDescriptor;
var Ps = Object.getOwnPropertyNames;
var Ts = Object.getPrototypeOf, Ls = Object.prototype.hasOwnProperty;
var zs = (e)=>Or(e, "__esModule", {
        value: !0
    })
;
var Mr = (e)=>{
    if (typeof require != "undefined") return require(e);
    throw new Error('Dynamic require of "' + e + '" is not supported');
};
var Ri = (e, n)=>()=>(n || e((n = {
            exports: {
            }
        }).exports, n), n.exports)
;
var Os = (e, n, t)=>{
    if (n && typeof n == "object" || typeof n == "function") for (let r of Ps(n))!Ls.call(e, r) && r !== "default" && Or(e, r, {
        get: ()=>n[r]
        ,
        enumerable: !(t = Ns(n, r)) || t.enumerable
    });
    return e;
}, Di = (e)=>Os(zs(Or(e != null ? _s(Ts(e)) : {
    }, "default", e && e.__esModule && "default" in e ? {
        get: ()=>e.default
        ,
        enumerable: !0
    } : {
        value: e,
        enumerable: !0
    })), e)
;
var Es = Ri((ie)=>{
    "use strict";
    var _t = export_default4, M = export_default3, U = export_default2;
    function v(e) {
        for(var n = "https://reactjs.org/docs/error-decoder.html?invariant=" + e, t = 1; t < arguments.length; t++)n += "&args[]=" + encodeURIComponent(arguments[t]);
        return "Minified React error #" + e + "; visit " + n + " for the full message or use the non-minified dev environment for full errors and additional helpful warnings.";
    }
    if (!_t) throw Error(v(227));
    var Ii = new Set, On = {
    };
    function He(e, n) {
        nn(e, n), nn(e + "Capture", n);
    }
    function nn(e, n) {
        for(On[e] = n, e = 0; e < n.length; e++)Ii.add(n[e]);
    }
    var me = !(typeof window == "undefined" || typeof window.document == "undefined" || typeof window.document.createElement == "undefined"), Ms = /^[:A-Z_a-z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD][:A-Z_a-z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD\-.0-9\u00B7\u0300-\u036F\u203F-\u2040]*$/, Fi = Object.prototype.hasOwnProperty, ji = {
    }, Ui = {
    };
    function Rs(e) {
        return Fi.call(Ui, e) ? !0 : Fi.call(ji, e) ? !1 : Ms.test(e) ? Ui[e] = !0 : (ji[e] = !0, !1);
    }
    function Ds(e, n, t, r) {
        if (t !== null && t.type === 0) return !1;
        switch(typeof n){
            case "function":
            case "symbol":
                return !0;
            case "boolean":
                return r ? !1 : t !== null ? !t.acceptsBooleans : (e = e.toLowerCase().slice(0, 5), e !== "data-" && e !== "aria-");
            default:
                return !1;
        }
    }
    function Is(e, n, t, r) {
        if (n === null || typeof n == "undefined" || Ds(e, n, t, r)) return !0;
        if (r) return !1;
        if (t !== null) switch(t.type){
            case 3:
                return !n;
            case 4:
                return n === !1;
            case 5:
                return isNaN(n);
            case 6:
                return isNaN(n) || 1 > n;
        }
        return !1;
    }
    function Y(e, n, t, r, l, i, o) {
        this.acceptsBooleans = n === 2 || n === 3 || n === 4, this.attributeName = r, this.attributeNamespace = l, this.mustUseProperty = t, this.propertyName = e, this.type = n, this.sanitizeURL = i, this.removeEmptyString = o;
    }
    var V = {
    };
    "children dangerouslySetInnerHTML defaultValue defaultChecked innerHTML suppressContentEditableWarning suppressHydrationWarning style".split(" ").forEach(function(e) {
        V[e] = new Y(e, 0, !1, e, null, !1, !1);
    });
    [
        [
            "acceptCharset",
            "accept-charset"
        ],
        [
            "className",
            "class"
        ],
        [
            "htmlFor",
            "for"
        ],
        [
            "httpEquiv",
            "http-equiv"
        ]
    ].forEach(function(e) {
        var n = e[0];
        V[n] = new Y(n, 1, !1, e[1], null, !1, !1);
    });
    [
        "contentEditable",
        "draggable",
        "spellCheck",
        "value"
    ].forEach(function(e) {
        V[e] = new Y(e, 2, !1, e.toLowerCase(), null, !1, !1);
    });
    [
        "autoReverse",
        "externalResourcesRequired",
        "focusable",
        "preserveAlpha"
    ].forEach(function(e) {
        V[e] = new Y(e, 2, !1, e, null, !1, !1);
    });
    "allowFullScreen async autoFocus autoPlay controls default defer disabled disablePictureInPicture disableRemotePlayback formNoValidate hidden loop noModule noValidate open playsInline readOnly required reversed scoped seamless itemScope".split(" ").forEach(function(e) {
        V[e] = new Y(e, 3, !1, e.toLowerCase(), null, !1, !1);
    });
    [
        "checked",
        "multiple",
        "muted",
        "selected"
    ].forEach(function(e) {
        V[e] = new Y(e, 3, !0, e, null, !1, !1);
    });
    [
        "capture",
        "download"
    ].forEach(function(e) {
        V[e] = new Y(e, 4, !1, e, null, !1, !1);
    });
    [
        "cols",
        "rows",
        "size",
        "span"
    ].forEach(function(e) {
        V[e] = new Y(e, 6, !1, e, null, !1, !1);
    });
    [
        "rowSpan",
        "start"
    ].forEach(function(e) {
        V[e] = new Y(e, 5, !1, e.toLowerCase(), null, !1, !1);
    });
    var Rr = /[\-:]([a-z])/g;
    function Dr(e) {
        return e[1].toUpperCase();
    }
    "accent-height alignment-baseline arabic-form baseline-shift cap-height clip-path clip-rule color-interpolation color-interpolation-filters color-profile color-rendering dominant-baseline enable-background fill-opacity fill-rule flood-color flood-opacity font-family font-size font-size-adjust font-stretch font-style font-variant font-weight glyph-name glyph-orientation-horizontal glyph-orientation-vertical horiz-adv-x horiz-origin-x image-rendering letter-spacing lighting-color marker-end marker-mid marker-start overline-position overline-thickness paint-order panose-1 pointer-events rendering-intent shape-rendering stop-color stop-opacity strikethrough-position strikethrough-thickness stroke-dasharray stroke-dashoffset stroke-linecap stroke-linejoin stroke-miterlimit stroke-opacity stroke-width text-anchor text-decoration text-rendering underline-position underline-thickness unicode-bidi unicode-range units-per-em v-alphabetic v-hanging v-ideographic v-mathematical vector-effect vert-adv-y vert-origin-x vert-origin-y word-spacing writing-mode xmlns:xlink x-height".split(" ").forEach(function(e) {
        var n = e.replace(Rr, Dr);
        V[n] = new Y(n, 1, !1, e, null, !1, !1);
    });
    "xlink:actuate xlink:arcrole xlink:role xlink:show xlink:title xlink:type".split(" ").forEach(function(e) {
        var n = e.replace(Rr, Dr);
        V[n] = new Y(n, 1, !1, e, "http://www.w3.org/1999/xlink", !1, !1);
    });
    [
        "xml:base",
        "xml:lang",
        "xml:space"
    ].forEach(function(e) {
        var n = e.replace(Rr, Dr);
        V[n] = new Y(n, 1, !1, e, "http://www.w3.org/XML/1998/namespace", !1, !1);
    });
    [
        "tabIndex",
        "crossOrigin"
    ].forEach(function(e) {
        V[e] = new Y(e, 1, !1, e.toLowerCase(), null, !1, !1);
    });
    V.xlinkHref = new Y("xlinkHref", 1, !1, "xlink:href", "http://www.w3.org/1999/xlink", !0, !1);
    [
        "src",
        "href",
        "action",
        "formAction"
    ].forEach(function(e) {
        V[e] = new Y(e, 1, !1, e.toLowerCase(), null, !0, !0);
    });
    function Ir(e, n, t, r) {
        var l = V.hasOwnProperty(n) ? V[n] : null, i = l !== null ? l.type === 0 : r ? !1 : !(!(2 < n.length) || n[0] !== "o" && n[0] !== "O" || n[1] !== "n" && n[1] !== "N");
        i || (Is(n, t, l, r) && (t = null), r || l === null ? Rs(n) && (t === null ? e.removeAttribute(n) : e.setAttribute(n, "" + t)) : l.mustUseProperty ? e[l.propertyName] = t === null ? l.type === 3 ? !1 : "" : t : (n = l.attributeName, r = l.attributeNamespace, t === null ? e.removeAttribute(n) : (l = l.type, t = l === 3 || l === 4 && t === !0 ? "" : "" + t, r ? e.setAttributeNS(r, n, t) : e.setAttribute(n, t))));
    }
    var We = _t.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED, Mn = 60103, Ae = 60106, Ee = 60107, Fr = 60108, Rn = 60114, jr = 60109, Ur = 60110, Nt = 60112, Dn = 60113, Pt = 60120, Tt = 60115, Vr = 60116, Br = 60121, Hr = 60128, Vi = 60129, Wr = 60130, Ar = 60131;
    typeof Symbol == "function" && Symbol.for && (F = Symbol.for, Mn = F("react.element"), Ae = F("react.portal"), Ee = F("react.fragment"), Fr = F("react.strict_mode"), Rn = F("react.profiler"), jr = F("react.provider"), Ur = F("react.context"), Nt = F("react.forward_ref"), Dn = F("react.suspense"), Pt = F("react.suspense_list"), Tt = F("react.memo"), Vr = F("react.lazy"), Br = F("react.block"), F("react.scope"), Hr = F("react.opaque.id"), Vi = F("react.debug_trace_mode"), Wr = F("react.offscreen"), Ar = F("react.legacy_hidden"));
    var F, Bi = typeof Symbol == "function" && Symbol.iterator;
    function In(e) {
        return e === null || typeof e != "object" ? null : (e = Bi && e[Bi] || e["@@iterator"], typeof e == "function" ? e : null);
    }
    var Qr;
    function Fn(e) {
        if (Qr === void 0) try {
            throw Error();
        } catch (t) {
            var n = t.stack.trim().match(/\n( *(at )?)/);
            Qr = n && n[1] || "";
        }
        return `
` + Qr + e;
    }
    var $r = !1;
    function Lt(e, n) {
        if (!e || $r) return "";
        $r = !0;
        var t = Error.prepareStackTrace;
        Error.prepareStackTrace = void 0;
        try {
            if (n) if (n = function() {
                throw Error();
            }, Object.defineProperty(n.prototype, "props", {
                set: function() {
                    throw Error();
                }
            }), typeof Reflect == "object" && Reflect.construct) {
                try {
                    Reflect.construct(n, []);
                } catch (s) {
                    var r = s;
                }
                Reflect.construct(e, [], n);
            } else {
                try {
                    n.call();
                } catch (s) {
                    r = s;
                }
                e.call(n.prototype);
            }
            else {
                try {
                    throw Error();
                } catch (s) {
                    r = s;
                }
                e();
            }
        } catch (s) {
            if (s && r && typeof s.stack == "string") {
                for(var l = s.stack.split(`
`), i = r.stack.split(`
`), o = l.length - 1, u = i.length - 1; 1 <= o && 0 <= u && l[o] !== i[u];)u--;
                for(; 1 <= o && 0 <= u; o--, u--)if (l[o] !== i[u]) {
                    if (o !== 1 || u !== 1) do if (o--, u--, 0 > u || l[o] !== i[u]) return `
` + l[o].replace(" at new ", " at ");
                    while (1 <= o && 0 <= u)
                    break;
                }
            }
        } finally{
            $r = !1, Error.prepareStackTrace = t;
        }
        return (e = e ? e.displayName || e.name : "") ? Fn(e) : "";
    }
    function Fs(e) {
        switch(e.tag){
            case 5:
                return Fn(e.type);
            case 16:
                return Fn("Lazy");
            case 13:
                return Fn("Suspense");
            case 19:
                return Fn("SuspenseList");
            case 0:
            case 2:
            case 15:
                return e = Lt(e.type, !1), e;
            case 11:
                return e = Lt(e.type.render, !1), e;
            case 22:
                return e = Lt(e.type._render, !1), e;
            case 1:
                return e = Lt(e.type, !0), e;
            default:
                return "";
        }
    }
    function tn(e) {
        if (e == null) return null;
        if (typeof e == "function") return e.displayName || e.name || null;
        if (typeof e == "string") return e;
        switch(e){
            case Ee:
                return "Fragment";
            case Ae:
                return "Portal";
            case Rn:
                return "Profiler";
            case Fr:
                return "StrictMode";
            case Dn:
                return "Suspense";
            case Pt:
                return "SuspenseList";
        }
        if (typeof e == "object") switch(e.$$typeof){
            case Ur:
                return (e.displayName || "Context") + ".Consumer";
            case jr:
                return (e._context.displayName || "Context") + ".Provider";
            case Nt:
                var n = e.render;
                return n = n.displayName || n.name || "", e.displayName || (n !== "" ? "ForwardRef(" + n + ")" : "ForwardRef");
            case Tt:
                return tn(e.type);
            case Br:
                return tn(e._render);
            case Vr:
                n = e._payload, e = e._init;
                try {
                    return tn(e(n));
                } catch (t) {
                }
        }
        return null;
    }
    function ke(e) {
        switch(typeof e){
            case "boolean":
            case "number":
            case "object":
            case "string":
            case "undefined":
                return e;
            default:
                return "";
        }
    }
    function Hi(e) {
        var n = e.type;
        return (e = e.nodeName) && e.toLowerCase() === "input" && (n === "checkbox" || n === "radio");
    }
    function js(e) {
        var n = Hi(e) ? "checked" : "value", t = Object.getOwnPropertyDescriptor(e.constructor.prototype, n), r = "" + e[n];
        if (!e.hasOwnProperty(n) && typeof t != "undefined" && typeof t.get == "function" && typeof t.set == "function") {
            var l = t.get, i = t.set;
            return Object.defineProperty(e, n, {
                configurable: !0,
                get: function() {
                    return l.call(this);
                },
                set: function(o) {
                    r = "" + o, i.call(this, o);
                }
            }), Object.defineProperty(e, n, {
                enumerable: t.enumerable
            }), {
                getValue: function() {
                    return r;
                },
                setValue: function(o) {
                    r = "" + o;
                },
                stopTracking: function() {
                    e._valueTracker = null, delete e[n];
                }
            };
        }
    }
    function zt(e) {
        e._valueTracker || (e._valueTracker = js(e));
    }
    function Wi(e) {
        if (!e) return !1;
        var n = e._valueTracker;
        if (!n) return !0;
        var t = n.getValue(), r = "";
        return e && (r = Hi(e) ? e.checked ? "true" : "false" : e.value), e = r, e !== t ? (n.setValue(e), !0) : !1;
    }
    function Ot(e) {
        if (e = e || (typeof document != "undefined" ? document : void 0), typeof e == "undefined") return null;
        try {
            return e.activeElement || e.body;
        } catch (n) {
            return e.body;
        }
    }
    function Yr(e, n) {
        var t = n.checked;
        return M({
        }, n, {
            defaultChecked: void 0,
            defaultValue: void 0,
            value: void 0,
            checked: t ?? e._wrapperState.initialChecked
        });
    }
    function Ai(e, n) {
        var t = n.defaultValue == null ? "" : n.defaultValue, r = n.checked != null ? n.checked : n.defaultChecked;
        t = ke(n.value != null ? n.value : t), e._wrapperState = {
            initialChecked: r,
            initialValue: t,
            controlled: n.type === "checkbox" || n.type === "radio" ? n.checked != null : n.value != null
        };
    }
    function Qi(e, n) {
        n = n.checked, n != null && Ir(e, "checked", n, !1);
    }
    function Xr(e, n) {
        Qi(e, n);
        var t = ke(n.value), r = n.type;
        if (t != null) r === "number" ? (t === 0 && e.value === "" || e.value != t) && (e.value = "" + t) : e.value !== "" + t && (e.value = "" + t);
        else if (r === "submit" || r === "reset") {
            e.removeAttribute("value");
            return;
        }
        n.hasOwnProperty("value") ? Kr(e, n.type, t) : n.hasOwnProperty("defaultValue") && Kr(e, n.type, ke(n.defaultValue)), n.checked == null && n.defaultChecked != null && (e.defaultChecked = !!n.defaultChecked);
    }
    function $i(e, n, t) {
        if (n.hasOwnProperty("value") || n.hasOwnProperty("defaultValue")) {
            var r = n.type;
            if (!(r !== "submit" && r !== "reset" || n.value !== void 0 && n.value !== null)) return;
            n = "" + e._wrapperState.initialValue, t || n === e.value || (e.value = n), e.defaultValue = n;
        }
        t = e.name, t !== "" && (e.name = ""), e.defaultChecked = !!e._wrapperState.initialChecked, t !== "" && (e.name = t);
    }
    function Kr(e, n, t) {
        (n !== "number" || Ot(e.ownerDocument) !== e) && (t == null ? e.defaultValue = "" + e._wrapperState.initialValue : e.defaultValue !== "" + t && (e.defaultValue = "" + t));
    }
    function Us(e) {
        var n = "";
        return _t.Children.forEach(e, function(t) {
            t != null && (n += t);
        }), n;
    }
    function Gr(e, n) {
        return e = M({
            children: void 0
        }, n), (n = Us(n.children)) && (e.children = n), e;
    }
    function rn(e, n, t, r) {
        if (e = e.options, n) {
            n = {
            };
            for(var l = 0; l < t.length; l++)n["$" + t[l]] = !0;
            for(t = 0; t < e.length; t++)l = n.hasOwnProperty("$" + e[t].value), e[t].selected !== l && (e[t].selected = l), l && r && (e[t].defaultSelected = !0);
        } else {
            for(t = "" + ke(t), n = null, l = 0; l < e.length; l++){
                if (e[l].value === t) {
                    e[l].selected = !0, r && (e[l].defaultSelected = !0);
                    return;
                }
                n !== null || e[l].disabled || (n = e[l]);
            }
            n !== null && (n.selected = !0);
        }
    }
    function Zr(e, n) {
        if (n.dangerouslySetInnerHTML != null) throw Error(v(91));
        return M({
        }, n, {
            value: void 0,
            defaultValue: void 0,
            children: "" + e._wrapperState.initialValue
        });
    }
    function Yi(e, n) {
        var t = n.value;
        if (t == null) {
            if (t = n.children, n = n.defaultValue, t != null) {
                if (n != null) throw Error(v(92));
                if (Array.isArray(t)) {
                    if (!(1 >= t.length)) throw Error(v(93));
                    t = t[0];
                }
                n = t;
            }
            n == null && (n = ""), t = n;
        }
        e._wrapperState = {
            initialValue: ke(t)
        };
    }
    function Xi(e, n) {
        var t = ke(n.value), r = ke(n.defaultValue);
        t != null && (t = "" + t, t !== e.value && (e.value = t), n.defaultValue == null && e.defaultValue !== t && (e.defaultValue = t)), r != null && (e.defaultValue = "" + r);
    }
    function Ki(e) {
        var n = e.textContent;
        n === e._wrapperState.initialValue && n !== "" && n !== null && (e.value = n);
    }
    var Jr = {
        html: "http://www.w3.org/1999/xhtml",
        mathml: "http://www.w3.org/1998/Math/MathML",
        svg: "http://www.w3.org/2000/svg"
    };
    function Gi(e) {
        switch(e){
            case "svg":
                return "http://www.w3.org/2000/svg";
            case "math":
                return "http://www.w3.org/1998/Math/MathML";
            default:
                return "http://www.w3.org/1999/xhtml";
        }
    }
    function qr(e, n) {
        return e == null || e === "http://www.w3.org/1999/xhtml" ? Gi(n) : e === "http://www.w3.org/2000/svg" && n === "foreignObject" ? "http://www.w3.org/1999/xhtml" : e;
    }
    var Mt, Zi = function(e) {
        return typeof MSApp != "undefined" && MSApp.execUnsafeLocalFunction ? function(n, t, r, l) {
            MSApp.execUnsafeLocalFunction(function() {
                return e(n, t, r, l);
            });
        } : e;
    }(function(e, n) {
        if (e.namespaceURI !== Jr.svg || "innerHTML" in e) e.innerHTML = n;
        else {
            for(Mt = Mt || document.createElement("div"), Mt.innerHTML = "<svg>" + n.valueOf().toString() + "</svg>", n = Mt.firstChild; e.firstChild;)e.removeChild(e.firstChild);
            for(; n.firstChild;)e.appendChild(n.firstChild);
        }
    });
    function jn(e, n) {
        if (n) {
            var t = e.firstChild;
            if (t && t === e.lastChild && t.nodeType === 3) {
                t.nodeValue = n;
                return;
            }
        }
        e.textContent = n;
    }
    var Un = {
        animationIterationCount: !0,
        borderImageOutset: !0,
        borderImageSlice: !0,
        borderImageWidth: !0,
        boxFlex: !0,
        boxFlexGroup: !0,
        boxOrdinalGroup: !0,
        columnCount: !0,
        columns: !0,
        flex: !0,
        flexGrow: !0,
        flexPositive: !0,
        flexShrink: !0,
        flexNegative: !0,
        flexOrder: !0,
        gridArea: !0,
        gridRow: !0,
        gridRowEnd: !0,
        gridRowSpan: !0,
        gridRowStart: !0,
        gridColumn: !0,
        gridColumnEnd: !0,
        gridColumnSpan: !0,
        gridColumnStart: !0,
        fontWeight: !0,
        lineClamp: !0,
        lineHeight: !0,
        opacity: !0,
        order: !0,
        orphans: !0,
        tabSize: !0,
        widows: !0,
        zIndex: !0,
        zoom: !0,
        fillOpacity: !0,
        floodOpacity: !0,
        stopOpacity: !0,
        strokeDasharray: !0,
        strokeDashoffset: !0,
        strokeMiterlimit: !0,
        strokeOpacity: !0,
        strokeWidth: !0
    }, Vs = [
        "Webkit",
        "ms",
        "Moz",
        "O"
    ];
    Object.keys(Un).forEach(function(e) {
        Vs.forEach(function(n) {
            n = n + e.charAt(0).toUpperCase() + e.substring(1), Un[n] = Un[e];
        });
    });
    function Ji(e, n, t) {
        return n == null || typeof n == "boolean" || n === "" ? "" : t || typeof n != "number" || n === 0 || Un.hasOwnProperty(e) && Un[e] ? ("" + n).trim() : n + "px";
    }
    function qi(e, n) {
        e = e.style;
        for(var t in n)if (n.hasOwnProperty(t)) {
            var r = t.indexOf("--") === 0, l = Ji(t, n[t], r);
            t === "float" && (t = "cssFloat"), r ? e.setProperty(t, l) : e[t] = l;
        }
    }
    var Bs = M({
        menuitem: !0
    }, {
        area: !0,
        base: !0,
        br: !0,
        col: !0,
        embed: !0,
        hr: !0,
        img: !0,
        input: !0,
        keygen: !0,
        link: !0,
        meta: !0,
        param: !0,
        source: !0,
        track: !0,
        wbr: !0
    });
    function br(e, n) {
        if (n) {
            if (Bs[e] && (n.children != null || n.dangerouslySetInnerHTML != null)) throw Error(v(137, e));
            if (n.dangerouslySetInnerHTML != null) {
                if (n.children != null) throw Error(v(60));
                if (!(typeof n.dangerouslySetInnerHTML == "object" && "__html" in n.dangerouslySetInnerHTML)) throw Error(v(61));
            }
            if (n.style != null && typeof n.style != "object") throw Error(v(62));
        }
    }
    function el(e, n) {
        if (e.indexOf("-") === -1) return typeof n.is == "string";
        switch(e){
            case "annotation-xml":
            case "color-profile":
            case "font-face":
            case "font-face-src":
            case "font-face-uri":
            case "font-face-format":
            case "font-face-name":
            case "missing-glyph":
                return !1;
            default:
                return !0;
        }
    }
    function nl(e) {
        return e = e.target || e.srcElement || window, e.correspondingUseElement && (e = e.correspondingUseElement), e.nodeType === 3 ? e.parentNode : e;
    }
    var tl = null, ln = null, on = null;
    function bi(e) {
        if (e = tt(e)) {
            if (typeof tl != "function") throw Error(v(280));
            var n = e.stateNode;
            n && (n = bt(n), tl(e.stateNode, e.type, n));
        }
    }
    function eo(e) {
        ln ? on ? on.push(e) : on = [
            e
        ] : ln = e;
    }
    function no() {
        if (ln) {
            var e = ln, n = on;
            if (on = ln = null, bi(e), n) for(e = 0; e < n.length; e++)bi(n[e]);
        }
    }
    function rl(e, n) {
        return e(n);
    }
    function to(e, n, t, r, l) {
        return e(n, t, r, l);
    }
    function ll() {
    }
    var ro = rl, Qe = !1, il = !1;
    function ol() {
        (ln !== null || on !== null) && (ll(), no());
    }
    function Hs(e, n, t) {
        if (il) return e(n, t);
        il = !0;
        try {
            return ro(e, n, t);
        } finally{
            il = !1, ol();
        }
    }
    function Vn(e, n) {
        var t = e.stateNode;
        if (t === null) return null;
        var r = bt(t);
        if (r === null) return null;
        t = r[n];
        e: switch(n){
            case "onClick":
            case "onClickCapture":
            case "onDoubleClick":
            case "onDoubleClickCapture":
            case "onMouseDown":
            case "onMouseDownCapture":
            case "onMouseMove":
            case "onMouseMoveCapture":
            case "onMouseUp":
            case "onMouseUpCapture":
            case "onMouseEnter":
                (r = !r.disabled) || (e = e.type, r = !(e === "button" || e === "input" || e === "select" || e === "textarea")), e = !r;
                break e;
            default:
                e = !1;
        }
        if (e) return null;
        if (t && typeof t != "function") throw Error(v(231, n, typeof t));
        return t;
    }
    var ul = !1;
    if (me) try {
        un = {
        }, Object.defineProperty(un, "passive", {
            get: function() {
                ul = !0;
            }
        }), window.addEventListener("test", un, un), window.removeEventListener("test", un, un);
    } catch (e) {
        ul = !1;
    }
    var un;
    function Ws(e, n, t, r, l, i, o, u, s) {
        var d = Array.prototype.slice.call(arguments, 3);
        try {
            n.apply(t, d);
        } catch (y) {
            this.onError(y);
        }
    }
    var Bn = !1, Rt = null, Dt = !1, sl = null, As = {
        onError: function(e) {
            Bn = !0, Rt = e;
        }
    };
    function Qs(e, n, t, r, l, i, o, u, s) {
        Bn = !1, Rt = null, Ws.apply(As, arguments);
    }
    function $s(e, n, t, r, l, i, o, u, s) {
        if (Qs.apply(this, arguments), Bn) {
            if (Bn) {
                var d = Rt;
                Bn = !1, Rt = null;
            } else throw Error(v(198));
            Dt || (Dt = !0, sl = d);
        }
    }
    function $e(e) {
        var n = e, t = e;
        if (e.alternate) for(; n.return;)n = n.return;
        else {
            e = n;
            do n = e, (n.flags & 1026) != 0 && (t = n.return), e = n.return;
            while (e)
        }
        return n.tag === 3 ? t : null;
    }
    function lo(e) {
        if (e.tag === 13) {
            var n = e.memoizedState;
            if (n === null && (e = e.alternate, e !== null && (n = e.memoizedState)), n !== null) return n.dehydrated;
        }
        return null;
    }
    function io(e) {
        if ($e(e) !== e) throw Error(v(188));
    }
    function Ys(e) {
        var n = e.alternate;
        if (!n) {
            if (n = $e(e), n === null) throw Error(v(188));
            return n !== e ? null : e;
        }
        for(var t = e, r = n;;){
            var l = t.return;
            if (l === null) break;
            var i = l.alternate;
            if (i === null) {
                if (r = l.return, r !== null) {
                    t = r;
                    continue;
                }
                break;
            }
            if (l.child === i.child) {
                for(i = l.child; i;){
                    if (i === t) return io(l), e;
                    if (i === r) return io(l), n;
                    i = i.sibling;
                }
                throw Error(v(188));
            }
            if (t.return !== r.return) t = l, r = i;
            else {
                for(var o = !1, u = l.child; u;){
                    if (u === t) {
                        o = !0, t = l, r = i;
                        break;
                    }
                    if (u === r) {
                        o = !0, r = l, t = i;
                        break;
                    }
                    u = u.sibling;
                }
                if (!o) {
                    for(u = i.child; u;){
                        if (u === t) {
                            o = !0, t = i, r = l;
                            break;
                        }
                        if (u === r) {
                            o = !0, r = i, t = l;
                            break;
                        }
                        u = u.sibling;
                    }
                    if (!o) throw Error(v(189));
                }
            }
            if (t.alternate !== r) throw Error(v(190));
        }
        if (t.tag !== 3) throw Error(v(188));
        return t.stateNode.current === t ? e : n;
    }
    function oo(e) {
        if (e = Ys(e), !e) return null;
        for(var n = e;;){
            if (n.tag === 5 || n.tag === 6) return n;
            if (n.child) n.child.return = n, n = n.child;
            else {
                if (n === e) break;
                for(; !n.sibling;){
                    if (!n.return || n.return === e) return null;
                    n = n.return;
                }
                n.sibling.return = n.return, n = n.sibling;
            }
        }
        return null;
    }
    function uo(e, n) {
        for(var t = e.alternate; n !== null;){
            if (n === e || n === t) return !0;
            n = n.return;
        }
        return !1;
    }
    var so, al, ao, fo, fl = !1, se = [], xe = null, Ce = null, _e = null, Hn = new Map, Wn = new Map, An = [], co = "mousedown mouseup touchcancel touchend touchstart auxclick dblclick pointercancel pointerdown pointerup dragend dragstart drop compositionend compositionstart keydown keypress keyup input textInput copy cut paste click change contextmenu reset submit".split(" ");
    function cl(e, n, t, r, l) {
        return {
            blockedOn: e,
            domEventName: n,
            eventSystemFlags: t | 16,
            nativeEvent: l,
            targetContainers: [
                r
            ]
        };
    }
    function po(e, n) {
        switch(e){
            case "focusin":
            case "focusout":
                xe = null;
                break;
            case "dragenter":
            case "dragleave":
                Ce = null;
                break;
            case "mouseover":
            case "mouseout":
                _e = null;
                break;
            case "pointerover":
            case "pointerout":
                Hn.delete(n.pointerId);
                break;
            case "gotpointercapture":
            case "lostpointercapture":
                Wn.delete(n.pointerId);
        }
    }
    function Qn(e, n, t, r, l, i) {
        return e === null || e.nativeEvent !== i ? (e = cl(n, t, r, l, i), n !== null && (n = tt(n), n !== null && al(n)), e) : (e.eventSystemFlags |= r, n = e.targetContainers, l !== null && n.indexOf(l) === -1 && n.push(l), e);
    }
    function Xs(e, n, t, r, l) {
        switch(n){
            case "focusin":
                return xe = Qn(xe, e, n, t, r, l), !0;
            case "dragenter":
                return Ce = Qn(Ce, e, n, t, r, l), !0;
            case "mouseover":
                return _e = Qn(_e, e, n, t, r, l), !0;
            case "pointerover":
                var i = l.pointerId;
                return Hn.set(i, Qn(Hn.get(i) || null, e, n, t, r, l)), !0;
            case "gotpointercapture":
                return i = l.pointerId, Wn.set(i, Qn(Wn.get(i) || null, e, n, t, r, l)), !0;
        }
        return !1;
    }
    function Ks(e) {
        var n = Ye(e.target);
        if (n !== null) {
            var t = $e(n);
            if (t !== null) {
                if (n = t.tag, n === 13) {
                    if (n = lo(t), n !== null) {
                        e.blockedOn = n, fo(e.lanePriority, function() {
                            U.unstable_runWithPriority(e.priority, function() {
                                ao(t);
                            });
                        });
                        return;
                    }
                } else if (n === 3 && t.stateNode.hydrate) {
                    e.blockedOn = t.tag === 3 ? t.stateNode.containerInfo : null;
                    return;
                }
            }
        }
        e.blockedOn = null;
    }
    function It(e) {
        if (e.blockedOn !== null) return !1;
        for(var n = e.targetContainers; 0 < n.length;){
            var t = yl(e.domEventName, e.eventSystemFlags, n[0], e.nativeEvent);
            if (t !== null) return n = tt(t), n !== null && al(n), e.blockedOn = t, !1;
            n.shift();
        }
        return !0;
    }
    function mo(e, n, t) {
        It(e) && t.delete(n);
    }
    function Gs() {
        for(fl = !1; 0 < se.length;){
            var e = se[0];
            if (e.blockedOn !== null) {
                e = tt(e.blockedOn), e !== null && so(e);
                break;
            }
            for(var n = e.targetContainers; 0 < n.length;){
                var t = yl(e.domEventName, e.eventSystemFlags, n[0], e.nativeEvent);
                if (t !== null) {
                    e.blockedOn = t;
                    break;
                }
                n.shift();
            }
            e.blockedOn === null && se.shift();
        }
        xe !== null && It(xe) && (xe = null), Ce !== null && It(Ce) && (Ce = null), _e !== null && It(_e) && (_e = null), Hn.forEach(mo), Wn.forEach(mo);
    }
    function $n(e, n) {
        e.blockedOn === n && (e.blockedOn = null, fl || (fl = !0, U.unstable_scheduleCallback(U.unstable_NormalPriority, Gs)));
    }
    function ho(e) {
        function n(l) {
            return $n(l, e);
        }
        if (0 < se.length) {
            $n(se[0], e);
            for(var t = 1; t < se.length; t++){
                var r = se[t];
                r.blockedOn === e && (r.blockedOn = null);
            }
        }
        for(xe !== null && $n(xe, e), Ce !== null && $n(Ce, e), _e !== null && $n(_e, e), Hn.forEach(n), Wn.forEach(n), t = 0; t < An.length; t++)r = An[t], r.blockedOn === e && (r.blockedOn = null);
        for(; 0 < An.length && (t = An[0], t.blockedOn === null);)Ks(t), t.blockedOn === null && An.shift();
    }
    function Ft(e, n) {
        var t = {
        };
        return t[e.toLowerCase()] = n.toLowerCase(), t["Webkit" + e] = "webkit" + n, t["Moz" + e] = "moz" + n, t;
    }
    var sn = {
        animationend: Ft("Animation", "AnimationEnd"),
        animationiteration: Ft("Animation", "AnimationIteration"),
        animationstart: Ft("Animation", "AnimationStart"),
        transitionend: Ft("Transition", "TransitionEnd")
    }, dl = {
    }, vo = {
    };
    me && (vo = document.createElement("div").style, "AnimationEvent" in window || (delete sn.animationend.animation, delete sn.animationiteration.animation, delete sn.animationstart.animation), "TransitionEvent" in window || delete sn.transitionend.transition);
    function jt(e) {
        if (dl[e]) return dl[e];
        if (!sn[e]) return e;
        var n = sn[e], t;
        for(t in n)if (n.hasOwnProperty(t) && t in vo) return dl[e] = n[t];
        return e;
    }
    var yo = jt("animationend"), go = jt("animationiteration"), wo = jt("animationstart"), So = jt("transitionend"), Eo = new Map, pl = new Map, Zs = [
        "abort",
        "abort",
        yo,
        "animationEnd",
        go,
        "animationIteration",
        wo,
        "animationStart",
        "canplay",
        "canPlay",
        "canplaythrough",
        "canPlayThrough",
        "durationchange",
        "durationChange",
        "emptied",
        "emptied",
        "encrypted",
        "encrypted",
        "ended",
        "ended",
        "error",
        "error",
        "gotpointercapture",
        "gotPointerCapture",
        "load",
        "load",
        "loadeddata",
        "loadedData",
        "loadedmetadata",
        "loadedMetadata",
        "loadstart",
        "loadStart",
        "lostpointercapture",
        "lostPointerCapture",
        "playing",
        "playing",
        "progress",
        "progress",
        "seeking",
        "seeking",
        "stalled",
        "stalled",
        "suspend",
        "suspend",
        "timeupdate",
        "timeUpdate",
        So,
        "transitionEnd",
        "waiting",
        "waiting"
    ];
    function ml(e, n) {
        for(var t = 0; t < e.length; t += 2){
            var r = e[t], l = e[t + 1];
            l = "on" + (l[0].toUpperCase() + l.slice(1)), pl.set(r, n), Eo.set(r, l), He(l, [
                r
            ]);
        }
    }
    var Js = U.unstable_now;
    Js();
    var L = 8;
    function an(e) {
        if ((1 & e) != 0) return L = 15, 1;
        if ((2 & e) != 0) return L = 14, 2;
        if ((4 & e) != 0) return L = 13, 4;
        var n = 24 & e;
        return n !== 0 ? (L = 12, n) : (e & 32) != 0 ? (L = 11, 32) : (n = 192 & e, n !== 0 ? (L = 10, n) : (e & 256) != 0 ? (L = 9, 256) : (n = 3584 & e, n !== 0 ? (L = 8, n) : (e & 4096) != 0 ? (L = 7, 4096) : (n = 4186112 & e, n !== 0 ? (L = 6, n) : (n = 62914560 & e, n !== 0 ? (L = 5, n) : e & 67108864 ? (L = 4, 67108864) : (e & 134217728) != 0 ? (L = 3, 134217728) : (n = 805306368 & e, n !== 0 ? (L = 2, n) : (1073741824 & e) != 0 ? (L = 1, 1073741824) : (L = 8, e))))));
    }
    function qs(e) {
        switch(e){
            case 99:
                return 15;
            case 98:
                return 10;
            case 97:
            case 96:
                return 8;
            case 95:
                return 2;
            default:
                return 0;
        }
    }
    function bs(e) {
        switch(e){
            case 15:
            case 14:
                return 99;
            case 13:
            case 12:
            case 11:
            case 10:
                return 98;
            case 9:
            case 8:
            case 7:
            case 6:
            case 4:
            case 5:
                return 97;
            case 3:
            case 2:
            case 1:
                return 95;
            case 0:
                return 90;
            default:
                throw Error(v(358, e));
        }
    }
    function Yn(e, n) {
        var t = e.pendingLanes;
        if (t === 0) return L = 0;
        var r = 0, l = 0, i = e.expiredLanes, o = e.suspendedLanes, u = e.pingedLanes;
        if (i !== 0) r = i, l = L = 15;
        else if (i = t & 134217727, i !== 0) {
            var s = i & ~o;
            s !== 0 ? (r = an(s), l = L) : (u &= i, u !== 0 && (r = an(u), l = L));
        } else i = t & ~o, i !== 0 ? (r = an(i), l = L) : u !== 0 && (r = an(u), l = L);
        if (r === 0) return 0;
        if (r = 31 - Ne(r), r = t & ((0 > r ? 0 : 1 << r) << 1) - 1, n !== 0 && n !== r && (n & o) == 0) {
            if (an(n), l <= L) return n;
            L = l;
        }
        if (n = e.entangledLanes, n !== 0) for(e = e.entanglements, n &= r; 0 < n;)t = 31 - Ne(n), l = 1 << t, r |= e[t], n &= ~l;
        return r;
    }
    function ko(e) {
        return e = e.pendingLanes & -1073741825, e !== 0 ? e : e & 1073741824 ? 1073741824 : 0;
    }
    function Ut(e, n) {
        switch(e){
            case 15:
                return 1;
            case 14:
                return 2;
            case 12:
                return e = fn(24 & ~n), e === 0 ? Ut(10, n) : e;
            case 10:
                return e = fn(192 & ~n), e === 0 ? Ut(8, n) : e;
            case 8:
                return e = fn(3584 & ~n), e === 0 && (e = fn(4186112 & ~n), e === 0 && (e = 512)), e;
            case 2:
                return n = fn(805306368 & ~n), n === 0 && (n = 268435456), n;
        }
        throw Error(v(358, e));
    }
    function fn(e) {
        return e & -e;
    }
    function hl(e) {
        for(var n = [], t = 0; 31 > t; t++)n.push(e);
        return n;
    }
    function Vt(e, n, t) {
        e.pendingLanes |= n;
        var r = n - 1;
        e.suspendedLanes &= r, e.pingedLanes &= r, e = e.eventTimes, n = 31 - Ne(n), e[n] = t;
    }
    var Ne = Math.clz32 ? Math.clz32 : ta, ea = Math.log, na = Math.LN2;
    function ta(e) {
        return e === 0 ? 32 : 31 - (ea(e) / na | 0) | 0;
    }
    var ra = U.unstable_UserBlockingPriority, la = U.unstable_runWithPriority, Bt = !0;
    function ia(e, n, t, r) {
        Qe || ll();
        var l = vl, i = Qe;
        Qe = !0;
        try {
            to(l, e, n, t, r);
        } finally{
            (Qe = i) || ol();
        }
    }
    function oa(e, n, t, r) {
        la(ra, vl.bind(null, e, n, t, r));
    }
    function vl(e, n, t, r) {
        if (Bt) {
            var l;
            if ((l = (n & 4) == 0) && 0 < se.length && -1 < co.indexOf(e)) e = cl(null, e, n, t, r), se.push(e);
            else {
                var i = yl(e, n, t, r);
                if (i === null) l && po(e, r);
                else {
                    if (l) {
                        if (-1 < co.indexOf(e)) {
                            e = cl(i, e, n, t, r), se.push(e);
                            return;
                        }
                        if (Xs(i, e, n, t, r)) return;
                        po(e, r);
                    }
                    Zo(e, n, r, null, t);
                }
            }
        }
    }
    function yl(e, n, t, r) {
        var l = nl(r);
        if (l = Ye(l), l !== null) {
            var i = $e(l);
            if (i === null) l = null;
            else {
                var o = i.tag;
                if (o === 13) {
                    if (l = lo(i), l !== null) return l;
                    l = null;
                } else if (o === 3) {
                    if (i.stateNode.hydrate) return i.tag === 3 ? i.stateNode.containerInfo : null;
                    l = null;
                } else i !== l && (l = null);
            }
        }
        return Zo(e, n, r, l, t), null;
    }
    var Pe = null, gl = null, Ht = null;
    function xo() {
        if (Ht) return Ht;
        var e, n = gl, t = n.length, r, l = "value" in Pe ? Pe.value : Pe.textContent, i = l.length;
        for(e = 0; e < t && n[e] === l[e]; e++);
        var o = t - e;
        for(r = 1; r <= o && n[t - r] === l[i - r]; r++);
        return Ht = l.slice(e, 1 < r ? 1 - r : void 0);
    }
    function Wt(e) {
        var n = e.keyCode;
        return "charCode" in e ? (e = e.charCode, e === 0 && n === 13 && (e = 13)) : e = n, e === 10 && (e = 13), 32 <= e || e === 13 ? e : 0;
    }
    function At() {
        return !0;
    }
    function Co() {
        return !1;
    }
    function q(e) {
        function n(t, r, l, i, o) {
            this._reactName = t, this._targetInst = l, this.type = r, this.nativeEvent = i, this.target = o, this.currentTarget = null;
            for(var u in e)e.hasOwnProperty(u) && (t = e[u], this[u] = t ? t(i) : i[u]);
            return this.isDefaultPrevented = (i.defaultPrevented != null ? i.defaultPrevented : i.returnValue === !1) ? At : Co, this.isPropagationStopped = Co, this;
        }
        return M(n.prototype, {
            preventDefault: function() {
                this.defaultPrevented = !0;
                var t = this.nativeEvent;
                t && (t.preventDefault ? t.preventDefault() : typeof t.returnValue != "unknown" && (t.returnValue = !1), this.isDefaultPrevented = At);
            },
            stopPropagation: function() {
                var t = this.nativeEvent;
                t && (t.stopPropagation ? t.stopPropagation() : typeof t.cancelBubble != "unknown" && (t.cancelBubble = !0), this.isPropagationStopped = At);
            },
            persist: function() {
            },
            isPersistent: At
        }), n;
    }
    var cn = {
        eventPhase: 0,
        bubbles: 0,
        cancelable: 0,
        timeStamp: function(e) {
            return e.timeStamp || Date.now();
        },
        defaultPrevented: 0,
        isTrusted: 0
    }, wl = q(cn), Xn = M({
    }, cn, {
        view: 0,
        detail: 0
    }), ua = q(Xn), Sl, El, Kn, Qt = M({
    }, Xn, {
        screenX: 0,
        screenY: 0,
        clientX: 0,
        clientY: 0,
        pageX: 0,
        pageY: 0,
        ctrlKey: 0,
        shiftKey: 0,
        altKey: 0,
        metaKey: 0,
        getModifierState: xl,
        button: 0,
        buttons: 0,
        relatedTarget: function(e) {
            return e.relatedTarget === void 0 ? e.fromElement === e.srcElement ? e.toElement : e.fromElement : e.relatedTarget;
        },
        movementX: function(e) {
            return "movementX" in e ? e.movementX : (e !== Kn && (Kn && e.type === "mousemove" ? (Sl = e.screenX - Kn.screenX, El = e.screenY - Kn.screenY) : El = Sl = 0, Kn = e), Sl);
        },
        movementY: function(e) {
            return "movementY" in e ? e.movementY : El;
        }
    }), _o = q(Qt), sa = M({
    }, Qt, {
        dataTransfer: 0
    }), aa = q(sa), fa = M({
    }, Xn, {
        relatedTarget: 0
    }), kl = q(fa), ca = M({
    }, cn, {
        animationName: 0,
        elapsedTime: 0,
        pseudoElement: 0
    }), da = q(ca), pa = M({
    }, cn, {
        clipboardData: function(e) {
            return "clipboardData" in e ? e.clipboardData : window.clipboardData;
        }
    }), ma = q(pa), ha = M({
    }, cn, {
        data: 0
    }), No = q(ha), va = {
        Esc: "Escape",
        Spacebar: " ",
        Left: "ArrowLeft",
        Up: "ArrowUp",
        Right: "ArrowRight",
        Down: "ArrowDown",
        Del: "Delete",
        Win: "OS",
        Menu: "ContextMenu",
        Apps: "ContextMenu",
        Scroll: "ScrollLock",
        MozPrintableKey: "Unidentified"
    }, ya = {
        8: "Backspace",
        9: "Tab",
        12: "Clear",
        13: "Enter",
        16: "Shift",
        17: "Control",
        18: "Alt",
        19: "Pause",
        20: "CapsLock",
        27: "Escape",
        32: " ",
        33: "PageUp",
        34: "PageDown",
        35: "End",
        36: "Home",
        37: "ArrowLeft",
        38: "ArrowUp",
        39: "ArrowRight",
        40: "ArrowDown",
        45: "Insert",
        46: "Delete",
        112: "F1",
        113: "F2",
        114: "F3",
        115: "F4",
        116: "F5",
        117: "F6",
        118: "F7",
        119: "F8",
        120: "F9",
        121: "F10",
        122: "F11",
        123: "F12",
        144: "NumLock",
        145: "ScrollLock",
        224: "Meta"
    }, ga = {
        Alt: "altKey",
        Control: "ctrlKey",
        Meta: "metaKey",
        Shift: "shiftKey"
    };
    function wa(e) {
        var n = this.nativeEvent;
        return n.getModifierState ? n.getModifierState(e) : (e = ga[e]) ? !!n[e] : !1;
    }
    function xl() {
        return wa;
    }
    var Sa = M({
    }, Xn, {
        key: function(e) {
            if (e.key) {
                var n = va[e.key] || e.key;
                if (n !== "Unidentified") return n;
            }
            return e.type === "keypress" ? (e = Wt(e), e === 13 ? "Enter" : String.fromCharCode(e)) : e.type === "keydown" || e.type === "keyup" ? ya[e.keyCode] || "Unidentified" : "";
        },
        code: 0,
        location: 0,
        ctrlKey: 0,
        shiftKey: 0,
        altKey: 0,
        metaKey: 0,
        repeat: 0,
        locale: 0,
        getModifierState: xl,
        charCode: function(e) {
            return e.type === "keypress" ? Wt(e) : 0;
        },
        keyCode: function(e) {
            return e.type === "keydown" || e.type === "keyup" ? e.keyCode : 0;
        },
        which: function(e) {
            return e.type === "keypress" ? Wt(e) : e.type === "keydown" || e.type === "keyup" ? e.keyCode : 0;
        }
    }), Ea = q(Sa), ka = M({
    }, Qt, {
        pointerId: 0,
        width: 0,
        height: 0,
        pressure: 0,
        tangentialPressure: 0,
        tiltX: 0,
        tiltY: 0,
        twist: 0,
        pointerType: 0,
        isPrimary: 0
    }), Po = q(ka), xa = M({
    }, Xn, {
        touches: 0,
        targetTouches: 0,
        changedTouches: 0,
        altKey: 0,
        metaKey: 0,
        ctrlKey: 0,
        shiftKey: 0,
        getModifierState: xl
    }), Ca = q(xa), _a = M({
    }, cn, {
        propertyName: 0,
        elapsedTime: 0,
        pseudoElement: 0
    }), Na = q(_a), Pa = M({
    }, Qt, {
        deltaX: function(e) {
            return "deltaX" in e ? e.deltaX : "wheelDeltaX" in e ? -e.wheelDeltaX : 0;
        },
        deltaY: function(e) {
            return "deltaY" in e ? e.deltaY : "wheelDeltaY" in e ? -e.wheelDeltaY : "wheelDelta" in e ? -e.wheelDelta : 0;
        },
        deltaZ: 0,
        deltaMode: 0
    }), Ta = q(Pa), La = [
        9,
        13,
        27,
        32
    ], Cl = me && "CompositionEvent" in window, Gn = null;
    me && "documentMode" in document && (Gn = document.documentMode);
    var za = me && "TextEvent" in window && !Gn, To = me && (!Cl || Gn && 8 < Gn && 11 >= Gn), Lo = String.fromCharCode(32), zo = !1;
    function Oo(e, n) {
        switch(e){
            case "keyup":
                return La.indexOf(n.keyCode) !== -1;
            case "keydown":
                return n.keyCode !== 229;
            case "keypress":
            case "mousedown":
            case "focusout":
                return !0;
            default:
                return !1;
        }
    }
    function Mo(e) {
        return e = e.detail, typeof e == "object" && "data" in e ? e.data : null;
    }
    var dn = !1;
    function Oa(e, n) {
        switch(e){
            case "compositionend":
                return Mo(n);
            case "keypress":
                return n.which !== 32 ? null : (zo = !0, Lo);
            case "textInput":
                return e = n.data, e === Lo && zo ? null : e;
            default:
                return null;
        }
    }
    function Ma(e, n) {
        if (dn) return e === "compositionend" || !Cl && Oo(e, n) ? (e = xo(), Ht = gl = Pe = null, dn = !1, e) : null;
        switch(e){
            case "paste":
                return null;
            case "keypress":
                if (!(n.ctrlKey || n.altKey || n.metaKey) || n.ctrlKey && n.altKey) {
                    if (n.char && 1 < n.char.length) return n.char;
                    if (n.which) return String.fromCharCode(n.which);
                }
                return null;
            case "compositionend":
                return To && n.locale !== "ko" ? null : n.data;
            default:
                return null;
        }
    }
    var Ra = {
        color: !0,
        date: !0,
        datetime: !0,
        "datetime-local": !0,
        email: !0,
        month: !0,
        number: !0,
        password: !0,
        range: !0,
        search: !0,
        tel: !0,
        text: !0,
        time: !0,
        url: !0,
        week: !0
    };
    function Ro(e) {
        var n = e && e.nodeName && e.nodeName.toLowerCase();
        return n === "input" ? !!Ra[e.type] : n === "textarea";
    }
    function Do(e, n, t, r) {
        eo(r), n = Gt(n, "onChange"), 0 < n.length && (t = new wl("onChange", "change", null, t, r), e.push({
            event: t,
            listeners: n
        }));
    }
    var Zn = null, Jn = null;
    function Da(e) {
        $o(e, 0);
    }
    function $t(e) {
        var n = yn(e);
        if (Wi(n)) return e;
    }
    function Ia(e, n) {
        if (e === "change") return n;
    }
    var Io = !1;
    me && (me ? (Xt = "oninput" in document, Xt || (_l = document.createElement("div"), _l.setAttribute("oninput", "return;"), Xt = typeof _l.oninput == "function"), Yt = Xt) : Yt = !1, Io = Yt && (!document.documentMode || 9 < document.documentMode));
    var Yt, Xt, _l;
    function Fo() {
        Zn && (Zn.detachEvent("onpropertychange", jo), Jn = Zn = null);
    }
    function jo(e) {
        if (e.propertyName === "value" && $t(Jn)) {
            var n = [];
            if (Do(n, Jn, e, nl(e)), e = Da, Qe) e(n);
            else {
                Qe = !0;
                try {
                    rl(e, n);
                } finally{
                    Qe = !1, ol();
                }
            }
        }
    }
    function Fa(e, n, t) {
        e === "focusin" ? (Fo(), Zn = n, Jn = t, Zn.attachEvent("onpropertychange", jo)) : e === "focusout" && Fo();
    }
    function ja(e) {
        if (e === "selectionchange" || e === "keyup" || e === "keydown") return $t(Jn);
    }
    function Ua(e, n) {
        if (e === "click") return $t(n);
    }
    function Va(e, n) {
        if (e === "input" || e === "change") return $t(n);
    }
    function Ba(e, n) {
        return e === n && (e !== 0 || 1 / e == 1 / n) || e !== e && n !== n;
    }
    var ee = typeof Object.is == "function" ? Object.is : Ba, Ha = Object.prototype.hasOwnProperty;
    function qn(e, n) {
        if (ee(e, n)) return !0;
        if (typeof e != "object" || e === null || typeof n != "object" || n === null) return !1;
        var t = Object.keys(e), r = Object.keys(n);
        if (t.length !== r.length) return !1;
        for(r = 0; r < t.length; r++)if (!Ha.call(n, t[r]) || !ee(e[t[r]], n[t[r]])) return !1;
        return !0;
    }
    function Uo(e) {
        for(; e && e.firstChild;)e = e.firstChild;
        return e;
    }
    function Vo(e, n) {
        var t = Uo(e);
        e = 0;
        for(var r; t;){
            if (t.nodeType === 3) {
                if (r = e + t.textContent.length, e <= n && r >= n) return {
                    node: t,
                    offset: n - e
                };
                e = r;
            }
            e: {
                for(; t;){
                    if (t.nextSibling) {
                        t = t.nextSibling;
                        break e;
                    }
                    t = t.parentNode;
                }
                t = void 0;
            }
            t = Uo(t);
        }
    }
    function Bo(e, n) {
        return e && n ? e === n ? !0 : e && e.nodeType === 3 ? !1 : n && n.nodeType === 3 ? Bo(e, n.parentNode) : "contains" in e ? e.contains(n) : e.compareDocumentPosition ? !!(e.compareDocumentPosition(n) & 16) : !1 : !1;
    }
    function Ho() {
        for(var e = window, n = Ot(); n instanceof e.HTMLIFrameElement;){
            try {
                var t = typeof n.contentWindow.location.href == "string";
            } catch (r) {
                t = !1;
            }
            if (t) e = n.contentWindow;
            else break;
            n = Ot(e.document);
        }
        return n;
    }
    function Nl(e) {
        var n = e && e.nodeName && e.nodeName.toLowerCase();
        return n && (n === "input" && (e.type === "text" || e.type === "search" || e.type === "tel" || e.type === "url" || e.type === "password") || n === "textarea" || e.contentEditable === "true");
    }
    var Wa = me && "documentMode" in document && 11 >= document.documentMode, pn = null, Pl = null, bn = null, Tl = !1;
    function Wo(e, n, t) {
        var r = t.window === t ? t.document : t.nodeType === 9 ? t : t.ownerDocument;
        Tl || pn == null || pn !== Ot(r) || (r = pn, "selectionStart" in r && Nl(r) ? r = {
            start: r.selectionStart,
            end: r.selectionEnd
        } : (r = (r.ownerDocument && r.ownerDocument.defaultView || window).getSelection(), r = {
            anchorNode: r.anchorNode,
            anchorOffset: r.anchorOffset,
            focusNode: r.focusNode,
            focusOffset: r.focusOffset
        }), bn && qn(bn, r) || (bn = r, r = Gt(Pl, "onSelect"), 0 < r.length && (n = new wl("onSelect", "select", null, n, t), e.push({
            event: n,
            listeners: r
        }), n.target = pn)));
    }
    ml("cancel cancel click click close close contextmenu contextMenu copy copy cut cut auxclick auxClick dblclick doubleClick dragend dragEnd dragstart dragStart drop drop focusin focus focusout blur input input invalid invalid keydown keyDown keypress keyPress keyup keyUp mousedown mouseDown mouseup mouseUp paste paste pause pause play play pointercancel pointerCancel pointerdown pointerDown pointerup pointerUp ratechange rateChange reset reset seeked seeked submit submit touchcancel touchCancel touchend touchEnd touchstart touchStart volumechange volumeChange".split(" "), 0);
    ml("drag drag dragenter dragEnter dragexit dragExit dragleave dragLeave dragover dragOver mousemove mouseMove mouseout mouseOut mouseover mouseOver pointermove pointerMove pointerout pointerOut pointerover pointerOver scroll scroll toggle toggle touchmove touchMove wheel wheel".split(" "), 1);
    ml(Zs, 2);
    for(Ll = "change selectionchange textInput compositionstart compositionend compositionupdate".split(" "), Kt = 0; Kt < Ll.length; Kt++)pl.set(Ll[Kt], 0);
    var Ll, Kt;
    nn("onMouseEnter", [
        "mouseout",
        "mouseover"
    ]);
    nn("onMouseLeave", [
        "mouseout",
        "mouseover"
    ]);
    nn("onPointerEnter", [
        "pointerout",
        "pointerover"
    ]);
    nn("onPointerLeave", [
        "pointerout",
        "pointerover"
    ]);
    He("onChange", "change click focusin focusout input keydown keyup selectionchange".split(" "));
    He("onSelect", "focusout contextmenu dragend focusin keydown keyup mousedown mouseup selectionchange".split(" "));
    He("onBeforeInput", [
        "compositionend",
        "keypress",
        "textInput",
        "paste"
    ]);
    He("onCompositionEnd", "compositionend focusout keydown keypress keyup mousedown".split(" "));
    He("onCompositionStart", "compositionstart focusout keydown keypress keyup mousedown".split(" "));
    He("onCompositionUpdate", "compositionupdate focusout keydown keypress keyup mousedown".split(" "));
    var et = "abort canplay canplaythrough durationchange emptied encrypted ended error loadeddata loadedmetadata loadstart pause play playing progress ratechange seeked seeking stalled suspend timeupdate volumechange waiting".split(" "), Ao = new Set("cancel close invalid load scroll toggle".split(" ").concat(et));
    function Qo(e, n, t) {
        var r = e.type || "unknown-event";
        e.currentTarget = t, $s(r, n, void 0, e), e.currentTarget = null;
    }
    function $o(e, n) {
        n = (n & 4) != 0;
        for(var t = 0; t < e.length; t++){
            var r = e[t], l = r.event;
            r = r.listeners;
            e: {
                var i = void 0;
                if (n) for(var o = r.length - 1; 0 <= o; o--){
                    var u = r[o], s = u.instance, d = u.currentTarget;
                    if (u = u.listener, s !== i && l.isPropagationStopped()) break e;
                    Qo(l, u, d), i = s;
                }
                else for(o = 0; o < r.length; o++){
                    if (u = r[o], s = u.instance, d = u.currentTarget, u = u.listener, s !== i && l.isPropagationStopped()) break e;
                    Qo(l, u, d), i = s;
                }
            }
        }
        if (Dt) throw e = sl, Dt = !1, sl = null, e;
    }
    function z(e, n) {
        var t = tu(n), r = e + "__bubble";
        t.has(r) || (Go(n, e, 2, !1), t.add(r));
    }
    var Yo = "_reactListening" + Math.random().toString(36).slice(2);
    function Xo(e) {
        e[Yo] || (e[Yo] = !0, Ii.forEach(function(n) {
            Ao.has(n) || Ko(n, !1, e, null), Ko(n, !0, e, null);
        }));
    }
    function Ko(e, n, t, r) {
        var l = 4 < arguments.length && arguments[4] !== void 0 ? arguments[4] : 0, i = t;
        if (e === "selectionchange" && t.nodeType !== 9 && (i = t.ownerDocument), r !== null && !n && Ao.has(e)) {
            if (e !== "scroll") return;
            l |= 2, i = r;
        }
        var o = tu(i), u = e + "__" + (n ? "capture" : "bubble");
        o.has(u) || (n && (l |= 4), Go(i, e, l, n), o.add(u));
    }
    function Go(e, n, t, r) {
        var l = pl.get(n);
        switch(l === void 0 ? 2 : l){
            case 0:
                l = ia;
                break;
            case 1:
                l = oa;
                break;
            default:
                l = vl;
        }
        t = l.bind(null, n, t, e), l = void 0, !ul || n !== "touchstart" && n !== "touchmove" && n !== "wheel" || (l = !0), r ? l !== void 0 ? e.addEventListener(n, t, {
            capture: !0,
            passive: l
        }) : e.addEventListener(n, t, !0) : l !== void 0 ? e.addEventListener(n, t, {
            passive: l
        }) : e.addEventListener(n, t, !1);
    }
    function Zo(e, n, t, r, l) {
        var i = r;
        if ((n & 1) == 0 && (n & 2) == 0 && r !== null) e: for(;;){
            if (r === null) return;
            var o = r.tag;
            if (o === 3 || o === 4) {
                var u = r.stateNode.containerInfo;
                if (u === l || u.nodeType === 8 && u.parentNode === l) break;
                if (o === 4) for(o = r.return; o !== null;){
                    var s = o.tag;
                    if ((s === 3 || s === 4) && (s = o.stateNode.containerInfo, s === l || s.nodeType === 8 && s.parentNode === l)) return;
                    o = o.return;
                }
                for(; u !== null;){
                    if (o = Ye(u), o === null) return;
                    if (s = o.tag, s === 5 || s === 6) {
                        r = i = o;
                        continue e;
                    }
                    u = u.parentNode;
                }
            }
            r = r.return;
        }
        Hs(function() {
            var d = i, y = nl(t), C = [];
            e: {
                var h = Eo.get(e);
                if (h !== void 0) {
                    var S = wl, k = e;
                    switch(e){
                        case "keypress":
                            if (Wt(t) === 0) break e;
                        case "keydown":
                        case "keyup":
                            S = Ea;
                            break;
                        case "focusin":
                            k = "focus", S = kl;
                            break;
                        case "focusout":
                            k = "blur", S = kl;
                            break;
                        case "beforeblur":
                        case "afterblur":
                            S = kl;
                            break;
                        case "click":
                            if (t.button === 2) break e;
                        case "auxclick":
                        case "dblclick":
                        case "mousedown":
                        case "mousemove":
                        case "mouseup":
                        case "mouseout":
                        case "mouseover":
                        case "contextmenu":
                            S = _o;
                            break;
                        case "drag":
                        case "dragend":
                        case "dragenter":
                        case "dragexit":
                        case "dragleave":
                        case "dragover":
                        case "dragstart":
                        case "drop":
                            S = aa;
                            break;
                        case "touchcancel":
                        case "touchend":
                        case "touchmove":
                        case "touchstart":
                            S = Ca;
                            break;
                        case yo:
                        case go:
                        case wo:
                            S = da;
                            break;
                        case So:
                            S = Na;
                            break;
                        case "scroll":
                            S = ua;
                            break;
                        case "wheel":
                            S = Ta;
                            break;
                        case "copy":
                        case "cut":
                        case "paste":
                            S = ma;
                            break;
                        case "gotpointercapture":
                        case "lostpointercapture":
                        case "pointercancel":
                        case "pointerdown":
                        case "pointermove":
                        case "pointerout":
                        case "pointerover":
                        case "pointerup":
                            S = Po;
                    }
                    var E = (n & 4) != 0, c = !E && e === "scroll", a = E ? h !== null ? h + "Capture" : null : h;
                    E = [];
                    for(var f = d, p; f !== null;){
                        p = f;
                        var m = p.stateNode;
                        if (p.tag === 5 && m !== null && (p = m, a !== null && (m = Vn(f, a), m != null && E.push(nt(f, m, p)))), c) break;
                        f = f.return;
                    }
                    0 < E.length && (h = new S(h, k, null, t, y), C.push({
                        event: h,
                        listeners: E
                    }));
                }
            }
            if ((n & 7) == 0) {
                e: {
                    if (h = e === "mouseover" || e === "pointerover", S = e === "mouseout" || e === "pointerout", h && (n & 16) == 0 && (k = t.relatedTarget || t.fromElement) && (Ye(k) || k[vn])) break e;
                    if ((S || h) && (h = y.window === y ? y : (h = y.ownerDocument) ? h.defaultView || h.parentWindow : window, S ? (k = t.relatedTarget || t.toElement, S = d, k = k ? Ye(k) : null, k !== null && (c = $e(k), k !== c || k.tag !== 5 && k.tag !== 6) && (k = null)) : (S = null, k = d), S !== k)) {
                        if (E = _o, m = "onMouseLeave", a = "onMouseEnter", f = "mouse", (e === "pointerout" || e === "pointerover") && (E = Po, m = "onPointerLeave", a = "onPointerEnter", f = "pointer"), c = S == null ? h : yn(S), p = k == null ? h : yn(k), h = new E(m, f + "leave", S, t, y), h.target = c, h.relatedTarget = p, m = null, Ye(y) === d && (E = new E(a, f + "enter", k, t, y), E.target = p, E.relatedTarget = c, m = E), c = m, S && k) n: {
                            for(E = S, a = k, f = 0, p = E; p; p = mn(p))f++;
                            for(p = 0, m = a; m; m = mn(m))p++;
                            for(; 0 < f - p;)E = mn(E), f--;
                            for(; 0 < p - f;)a = mn(a), p--;
                            for(; f--;){
                                if (E === a || a !== null && E === a.alternate) break n;
                                E = mn(E), a = mn(a);
                            }
                            E = null;
                        }
                        else E = null;
                        S !== null && Jo(C, h, S, E, !1), k !== null && c !== null && Jo(C, c, k, E, !0);
                    }
                }
                e: {
                    if (h = d ? yn(d) : window, S = h.nodeName && h.nodeName.toLowerCase(), S === "select" || S === "input" && h.type === "file") var _ = Ia;
                    else if (Ro(h)) if (Io) _ = Va;
                    else {
                        _ = ja;
                        var w = Fa;
                    }
                    else (S = h.nodeName) && S.toLowerCase() === "input" && (h.type === "checkbox" || h.type === "radio") && (_ = Ua);
                    if (_ && (_ = _(e, d))) {
                        Do(C, _, t, y);
                        break e;
                    }
                    w && w(e, h, d), e === "focusout" && (w = h._wrapperState) && w.controlled && h.type === "number" && Kr(h, "number", h.value);
                }
                switch(w = d ? yn(d) : window, e){
                    case "focusin":
                        (Ro(w) || w.contentEditable === "true") && (pn = w, Pl = d, bn = null);
                        break;
                    case "focusout":
                        bn = Pl = pn = null;
                        break;
                    case "mousedown":
                        Tl = !0;
                        break;
                    case "contextmenu":
                    case "mouseup":
                    case "dragend":
                        Tl = !1, Wo(C, t, y);
                        break;
                    case "selectionchange":
                        if (Wa) break;
                    case "keydown":
                    case "keyup":
                        Wo(C, t, y);
                }
                var N;
                if (Cl) e: {
                    switch(e){
                        case "compositionstart":
                            var T = "onCompositionStart";
                            break e;
                        case "compositionend":
                            T = "onCompositionEnd";
                            break e;
                        case "compositionupdate":
                            T = "onCompositionUpdate";
                            break e;
                    }
                    T = void 0;
                }
                else dn ? Oo(e, t) && (T = "onCompositionEnd") : e === "keydown" && t.keyCode === 229 && (T = "onCompositionStart");
                T && (To && t.locale !== "ko" && (dn || T !== "onCompositionStart" ? T === "onCompositionEnd" && dn && (N = xo()) : (Pe = y, gl = "value" in Pe ? Pe.value : Pe.textContent, dn = !0)), w = Gt(d, T), 0 < w.length && (T = new No(T, e, null, t, y), C.push({
                    event: T,
                    listeners: w
                }), N ? T.data = N : (N = Mo(t), N !== null && (T.data = N)))), (N = za ? Oa(e, t) : Ma(e, t)) && (d = Gt(d, "onBeforeInput"), 0 < d.length && (y = new No("onBeforeInput", "beforeinput", null, t, y), C.push({
                    event: y,
                    listeners: d
                }), y.data = N));
            }
            $o(C, n);
        });
    }
    function nt(e, n, t) {
        return {
            instance: e,
            listener: n,
            currentTarget: t
        };
    }
    function Gt(e, n) {
        for(var t = n + "Capture", r = []; e !== null;){
            var l = e, i = l.stateNode;
            l.tag === 5 && i !== null && (l = i, i = Vn(e, t), i != null && r.unshift(nt(e, i, l)), i = Vn(e, n), i != null && r.push(nt(e, i, l))), e = e.return;
        }
        return r;
    }
    function mn(e) {
        if (e === null) return null;
        do e = e.return;
        while (e && e.tag !== 5)
        return e || null;
    }
    function Jo(e, n, t, r, l) {
        for(var i = n._reactName, o = []; t !== null && t !== r;){
            var u = t, s = u.alternate, d = u.stateNode;
            if (s !== null && s === r) break;
            u.tag === 5 && d !== null && (u = d, l ? (s = Vn(t, i), s != null && o.unshift(nt(t, s, u))) : l || (s = Vn(t, i), s != null && o.push(nt(t, s, u)))), t = t.return;
        }
        o.length !== 0 && e.push({
            event: n,
            listeners: o
        });
    }
    function Zt() {
    }
    var zl = null, Ol = null;
    function qo(e, n) {
        switch(e){
            case "button":
            case "input":
            case "select":
            case "textarea":
                return !!n.autoFocus;
        }
        return !1;
    }
    function Ml(e, n) {
        return e === "textarea" || e === "option" || e === "noscript" || typeof n.children == "string" || typeof n.children == "number" || typeof n.dangerouslySetInnerHTML == "object" && n.dangerouslySetInnerHTML !== null && n.dangerouslySetInnerHTML.__html != null;
    }
    var bo = typeof setTimeout == "function" ? setTimeout : void 0, Aa = typeof clearTimeout == "function" ? clearTimeout : void 0;
    function Rl(e) {
        e.nodeType === 1 ? e.textContent = "" : e.nodeType === 9 && (e = e.body, e != null && (e.textContent = ""));
    }
    function hn(e) {
        for(; e != null; e = e.nextSibling){
            var n = e.nodeType;
            if (n === 1 || n === 3) break;
        }
        return e;
    }
    function eu(e) {
        e = e.previousSibling;
        for(var n = 0; e;){
            if (e.nodeType === 8) {
                var t = e.data;
                if (t === "$" || t === "$!" || t === "$?") {
                    if (n === 0) return e;
                    n--;
                } else t === "/$" && n++;
            }
            e = e.previousSibling;
        }
        return null;
    }
    var Dl = 0;
    function Qa(e) {
        return {
            $$typeof: Hr,
            toString: e,
            valueOf: e
        };
    }
    var Jt = Math.random().toString(36).slice(2), Te = "__reactFiber$" + Jt, qt = "__reactProps$" + Jt, vn = "__reactContainer$" + Jt, nu = "__reactEvents$" + Jt;
    function Ye(e) {
        var n = e[Te];
        if (n) return n;
        for(var t = e.parentNode; t;){
            if (n = t[vn] || t[Te]) {
                if (t = n.alternate, n.child !== null || t !== null && t.child !== null) for(e = eu(e); e !== null;){
                    if (t = e[Te]) return t;
                    e = eu(e);
                }
                return n;
            }
            e = t, t = e.parentNode;
        }
        return null;
    }
    function tt(e) {
        return e = e[Te] || e[vn], !e || e.tag !== 5 && e.tag !== 6 && e.tag !== 13 && e.tag !== 3 ? null : e;
    }
    function yn(e) {
        if (e.tag === 5 || e.tag === 6) return e.stateNode;
        throw Error(v(33));
    }
    function bt(e) {
        return e[qt] || null;
    }
    function tu(e) {
        var n = e[nu];
        return n === void 0 && (n = e[nu] = new Set), n;
    }
    var Il = [], gn = -1;
    function Le(e) {
        return {
            current: e
        };
    }
    function O(e) {
        0 > gn || (e.current = Il[gn], Il[gn] = null, gn--);
    }
    function R(e, n) {
        gn++, Il[gn] = e.current, e.current = n;
    }
    var ze = {
    }, W = Le(ze), K = Le(!1), Xe = ze;
    function wn(e, n) {
        var t = e.type.contextTypes;
        if (!t) return ze;
        var r = e.stateNode;
        if (r && r.__reactInternalMemoizedUnmaskedChildContext === n) return r.__reactInternalMemoizedMaskedChildContext;
        var l = {
        }, i;
        for(i in t)l[i] = n[i];
        return r && (e = e.stateNode, e.__reactInternalMemoizedUnmaskedChildContext = n, e.__reactInternalMemoizedMaskedChildContext = l), l;
    }
    function G(e) {
        return e = e.childContextTypes, e != null;
    }
    function er() {
        O(K), O(W);
    }
    function ru(e, n, t) {
        if (W.current !== ze) throw Error(v(168));
        R(W, n), R(K, t);
    }
    function lu(e, n, t) {
        var r = e.stateNode;
        if (e = n.childContextTypes, typeof r.getChildContext != "function") return t;
        r = r.getChildContext();
        for(var l in r)if (!(l in e)) throw Error(v(108, tn(n) || "Unknown", l));
        return M({
        }, t, r);
    }
    function nr(e) {
        return e = (e = e.stateNode) && e.__reactInternalMemoizedMergedChildContext || ze, Xe = W.current, R(W, e), R(K, K.current), !0;
    }
    function iu(e, n, t) {
        var r = e.stateNode;
        if (!r) throw Error(v(169));
        t ? (e = lu(e, n, Xe), r.__reactInternalMemoizedMergedChildContext = e, O(K), O(W), R(W, e)) : O(K), R(K, t);
    }
    var Fl = null, Ke = null, $a = U.unstable_runWithPriority, jl = U.unstable_scheduleCallback, Ul = U.unstable_cancelCallback, Ya = U.unstable_shouldYield, ou = U.unstable_requestPaint, Vl = U.unstable_now, Xa = U.unstable_getCurrentPriorityLevel, tr = U.unstable_ImmediatePriority, uu = U.unstable_UserBlockingPriority, su = U.unstable_NormalPriority, au = U.unstable_LowPriority, fu = U.unstable_IdlePriority, Bl = {
    }, Ka = ou !== void 0 ? ou : function() {
    }, he = null, rr = null, Hl = !1, cu = Vl(), A = 10000 > cu ? Vl : function() {
        return Vl() - cu;
    };
    function Sn() {
        switch(Xa()){
            case tr:
                return 99;
            case uu:
                return 98;
            case su:
                return 97;
            case au:
                return 96;
            case fu:
                return 95;
            default:
                throw Error(v(332));
        }
    }
    function du(e) {
        switch(e){
            case 99:
                return tr;
            case 98:
                return uu;
            case 97:
                return su;
            case 96:
                return au;
            case 95:
                return fu;
            default:
                throw Error(v(332));
        }
    }
    function Ge(e, n) {
        return e = du(e), $a(e, n);
    }
    function rt(e, n, t) {
        return e = du(e), jl(e, n, t);
    }
    function ae() {
        if (rr !== null) {
            var e = rr;
            rr = null, Ul(e);
        }
        pu();
    }
    function pu() {
        if (!Hl && he !== null) {
            Hl = !0;
            var e = 0;
            try {
                var n = he;
                Ge(99, function() {
                    for(; e < n.length; e++){
                        var t = n[e];
                        do t = t(!0);
                        while (t !== null)
                    }
                }), he = null;
            } catch (t) {
                throw he !== null && (he = he.slice(e + 1)), jl(tr, ae), t;
            } finally{
                Hl = !1;
            }
        }
    }
    var Ga = We.ReactCurrentBatchConfig;
    function oe(e, n) {
        if (e && e.defaultProps) {
            n = M({
            }, n), e = e.defaultProps;
            for(var t in e)n[t] === void 0 && (n[t] = e[t]);
            return n;
        }
        return n;
    }
    var lr = Le(null), ir = null, En = null, or = null;
    function Wl() {
        or = En = ir = null;
    }
    function Al(e) {
        var n = lr.current;
        O(lr), e.type._context._currentValue = n;
    }
    function mu(e, n) {
        for(; e !== null;){
            var t = e.alternate;
            if ((e.childLanes & n) === n) {
                if (t === null || (t.childLanes & n) === n) break;
                t.childLanes |= n;
            } else e.childLanes |= n, t !== null && (t.childLanes |= n);
            e = e.return;
        }
    }
    function kn(e, n) {
        ir = e, or = En = null, e = e.dependencies, e !== null && e.firstContext !== null && ((e.lanes & n) != 0 && (ue = !0), e.firstContext = null);
    }
    function ne(e, n) {
        if (or !== e && n !== !1 && n !== 0) if ((typeof n != "number" || n === 1073741823) && (or = e, n = 1073741823), n = {
            context: e,
            observedBits: n,
            next: null
        }, En === null) {
            if (ir === null) throw Error(v(308));
            En = n, ir.dependencies = {
                lanes: 0,
                firstContext: n,
                responders: null
            };
        } else En = En.next = n;
        return e._currentValue;
    }
    var Oe = !1;
    function Ql(e) {
        e.updateQueue = {
            baseState: e.memoizedState,
            firstBaseUpdate: null,
            lastBaseUpdate: null,
            shared: {
                pending: null
            },
            effects: null
        };
    }
    function hu(e, n) {
        e = e.updateQueue, n.updateQueue === e && (n.updateQueue = {
            baseState: e.baseState,
            firstBaseUpdate: e.firstBaseUpdate,
            lastBaseUpdate: e.lastBaseUpdate,
            shared: e.shared,
            effects: e.effects
        });
    }
    function Me(e, n) {
        return {
            eventTime: e,
            lane: n,
            tag: 0,
            payload: null,
            callback: null,
            next: null
        };
    }
    function Re(e, n) {
        if (e = e.updateQueue, e !== null) {
            e = e.shared;
            var t = e.pending;
            t === null ? n.next = n : (n.next = t.next, t.next = n), e.pending = n;
        }
    }
    function vu(e, n) {
        var t = e.updateQueue, r = e.alternate;
        if (r !== null && (r = r.updateQueue, t === r)) {
            var l = null, i = null;
            if (t = t.firstBaseUpdate, t !== null) {
                do {
                    var o = {
                        eventTime: t.eventTime,
                        lane: t.lane,
                        tag: t.tag,
                        payload: t.payload,
                        callback: t.callback,
                        next: null
                    };
                    i === null ? l = i = o : i = i.next = o, t = t.next;
                }while (t !== null)
                i === null ? l = i = n : i = i.next = n;
            } else l = i = n;
            t = {
                baseState: r.baseState,
                firstBaseUpdate: l,
                lastBaseUpdate: i,
                shared: r.shared,
                effects: r.effects
            }, e.updateQueue = t;
            return;
        }
        e = t.lastBaseUpdate, e === null ? t.firstBaseUpdate = n : e.next = n, t.lastBaseUpdate = n;
    }
    function lt(e, n, t, r) {
        var l = e.updateQueue;
        Oe = !1;
        var i = l.firstBaseUpdate, o = l.lastBaseUpdate, u = l.shared.pending;
        if (u !== null) {
            l.shared.pending = null;
            var s = u, d = s.next;
            s.next = null, o === null ? i = d : o.next = d, o = s;
            var y = e.alternate;
            if (y !== null) {
                y = y.updateQueue;
                var C = y.lastBaseUpdate;
                C !== o && (C === null ? y.firstBaseUpdate = d : C.next = d, y.lastBaseUpdate = s);
            }
        }
        if (i !== null) {
            C = l.baseState, o = 0, y = d = s = null;
            do {
                u = i.lane;
                var h = i.eventTime;
                if ((r & u) === u) {
                    y !== null && (y = y.next = {
                        eventTime: h,
                        lane: 0,
                        tag: i.tag,
                        payload: i.payload,
                        callback: i.callback,
                        next: null
                    });
                    e: {
                        var S = e, k = i;
                        switch(u = n, h = t, k.tag){
                            case 1:
                                if (S = k.payload, typeof S == "function") {
                                    C = S.call(h, C, u);
                                    break e;
                                }
                                C = S;
                                break e;
                            case 3:
                                S.flags = S.flags & -4097 | 64;
                            case 0:
                                if (S = k.payload, u = typeof S == "function" ? S.call(h, C, u) : S, u == null) break e;
                                C = M({
                                }, C, u);
                                break e;
                            case 2:
                                Oe = !0;
                        }
                    }
                    i.callback !== null && (e.flags |= 32, u = l.effects, u === null ? l.effects = [
                        i
                    ] : u.push(i));
                } else h = {
                    eventTime: h,
                    lane: u,
                    tag: i.tag,
                    payload: i.payload,
                    callback: i.callback,
                    next: null
                }, y === null ? (d = y = h, s = C) : y = y.next = h, o |= u;
                if (i = i.next, i === null) {
                    if (u = l.shared.pending, u === null) break;
                    i = u.next, u.next = null, l.lastBaseUpdate = u, l.shared.pending = null;
                }
            }while (1)
            y === null && (s = C), l.baseState = s, l.firstBaseUpdate = d, l.lastBaseUpdate = y, vt |= o, e.lanes = o, e.memoizedState = C;
        }
    }
    function yu(e, n, t) {
        if (e = n.effects, n.effects = null, e !== null) for(n = 0; n < e.length; n++){
            var r = e[n], l = r.callback;
            if (l !== null) {
                if (r.callback = null, r = t, typeof l != "function") throw Error(v(191, l));
                l.call(r);
            }
        }
    }
    var gu = new _t.Component().refs;
    function ur(e, n, t, r) {
        n = e.memoizedState, t = t(r, n), t = t == null ? n : M({
        }, n, t), e.memoizedState = t, e.lanes === 0 && (e.updateQueue.baseState = t);
    }
    var sr = {
        isMounted: function(e) {
            return (e = e._reactInternals) ? $e(e) === e : !1;
        },
        enqueueSetState: function(e, n, t) {
            e = e._reactInternals;
            var r = b(), l = Fe(e), i = Me(r, l);
            i.payload = n, t != null && (i.callback = t), Re(e, i), je(e, l, r);
        },
        enqueueReplaceState: function(e, n, t) {
            e = e._reactInternals;
            var r = b(), l = Fe(e), i = Me(r, l);
            i.tag = 1, i.payload = n, t != null && (i.callback = t), Re(e, i), je(e, l, r);
        },
        enqueueForceUpdate: function(e, n) {
            e = e._reactInternals;
            var t = b(), r = Fe(e), l = Me(t, r);
            l.tag = 2, n != null && (l.callback = n), Re(e, l), je(e, r, t);
        }
    };
    function wu(e, n, t, r, l, i, o) {
        return e = e.stateNode, typeof e.shouldComponentUpdate == "function" ? e.shouldComponentUpdate(r, i, o) : n.prototype && n.prototype.isPureReactComponent ? !qn(t, r) || !qn(l, i) : !0;
    }
    function Su(e, n, t) {
        var r = !1, l = ze, i = n.contextType;
        return typeof i == "object" && i !== null ? i = ne(i) : (l = G(n) ? Xe : W.current, r = n.contextTypes, i = (r = r != null) ? wn(e, l) : ze), n = new n(t, i), e.memoizedState = n.state !== null && n.state !== void 0 ? n.state : null, n.updater = sr, e.stateNode = n, n._reactInternals = e, r && (e = e.stateNode, e.__reactInternalMemoizedUnmaskedChildContext = l, e.__reactInternalMemoizedMaskedChildContext = i), n;
    }
    function Eu(e, n, t, r) {
        e = n.state, typeof n.componentWillReceiveProps == "function" && n.componentWillReceiveProps(t, r), typeof n.UNSAFE_componentWillReceiveProps == "function" && n.UNSAFE_componentWillReceiveProps(t, r), n.state !== e && sr.enqueueReplaceState(n, n.state, null);
    }
    function $l(e, n, t, r) {
        var l = e.stateNode;
        l.props = t, l.state = e.memoizedState, l.refs = gu, Ql(e);
        var i = n.contextType;
        typeof i == "object" && i !== null ? l.context = ne(i) : (i = G(n) ? Xe : W.current, l.context = wn(e, i)), lt(e, t, l, r), l.state = e.memoizedState, i = n.getDerivedStateFromProps, typeof i == "function" && (ur(e, n, i, t), l.state = e.memoizedState), typeof n.getDerivedStateFromProps == "function" || typeof l.getSnapshotBeforeUpdate == "function" || typeof l.UNSAFE_componentWillMount != "function" && typeof l.componentWillMount != "function" || (n = l.state, typeof l.componentWillMount == "function" && l.componentWillMount(), typeof l.UNSAFE_componentWillMount == "function" && l.UNSAFE_componentWillMount(), n !== l.state && sr.enqueueReplaceState(l, l.state, null), lt(e, t, l, r), l.state = e.memoizedState), typeof l.componentDidMount == "function" && (e.flags |= 4);
    }
    var ar = Array.isArray;
    function it(e, n, t) {
        if (e = t.ref, e !== null && typeof e != "function" && typeof e != "object") {
            if (t._owner) {
                if (t = t._owner, t) {
                    if (t.tag !== 1) throw Error(v(309));
                    var r = t.stateNode;
                }
                if (!r) throw Error(v(147, e));
                var l = "" + e;
                return n !== null && n.ref !== null && typeof n.ref == "function" && n.ref._stringRef === l ? n.ref : (n = function(i) {
                    var o = r.refs;
                    o === gu && (o = r.refs = {
                    }), i === null ? delete o[l] : o[l] = i;
                }, n._stringRef = l, n);
            }
            if (typeof e != "string") throw Error(v(284));
            if (!t._owner) throw Error(v(290, e));
        }
        return e;
    }
    function fr(e, n) {
        if (e.type !== "textarea") throw Error(v(31, Object.prototype.toString.call(n) === "[object Object]" ? "object with keys {" + Object.keys(n).join(", ") + "}" : n));
    }
    function ku(e) {
        function n(c, a) {
            if (e) {
                var f = c.lastEffect;
                f !== null ? (f.nextEffect = a, c.lastEffect = a) : c.firstEffect = c.lastEffect = a, a.nextEffect = null, a.flags = 8;
            }
        }
        function t(c, a) {
            if (!e) return null;
            for(; a !== null;)n(c, a), a = a.sibling;
            return null;
        }
        function r(c, a) {
            for(c = new Map; a !== null;)a.key !== null ? c.set(a.key, a) : c.set(a.index, a), a = a.sibling;
            return c;
        }
        function l(c, a) {
            return c = Be(c, a), c.index = 0, c.sibling = null, c;
        }
        function i(c, a, f) {
            return c.index = f, e ? (f = c.alternate, f !== null ? (f = f.index, f < a ? (c.flags = 2, a) : f) : (c.flags = 2, a)) : a;
        }
        function o(c) {
            return e && c.alternate === null && (c.flags = 2), c;
        }
        function u(c, a, f, p) {
            return a === null || a.tag !== 6 ? (a = Pi(f, c.mode, p), a.return = c, a) : (a = l(a, f), a.return = c, a);
        }
        function s(c, a, f, p) {
            return a !== null && a.elementType === f.type ? (p = l(a, f.props), p.ref = it(c, a, f), p.return = c, p) : (p = Tr(f.type, f.key, f.props, null, c.mode, p), p.ref = it(c, a, f), p.return = c, p);
        }
        function d(c, a, f, p) {
            return a === null || a.tag !== 4 || a.stateNode.containerInfo !== f.containerInfo || a.stateNode.implementation !== f.implementation ? (a = Ti(f, c.mode, p), a.return = c, a) : (a = l(a, f.children || []), a.return = c, a);
        }
        function y(c, a, f, p, m) {
            return a === null || a.tag !== 7 ? (a = zn(f, c.mode, p, m), a.return = c, a) : (a = l(a, f), a.return = c, a);
        }
        function C(c, a, f) {
            if (typeof a == "string" || typeof a == "number") return a = Pi("" + a, c.mode, f), a.return = c, a;
            if (typeof a == "object" && a !== null) {
                switch(a.$$typeof){
                    case Mn:
                        return f = Tr(a.type, a.key, a.props, null, c.mode, f), f.ref = it(c, null, a), f.return = c, f;
                    case Ae:
                        return a = Ti(a, c.mode, f), a.return = c, a;
                }
                if (ar(a) || In(a)) return a = zn(a, c.mode, f, null), a.return = c, a;
                fr(c, a);
            }
            return null;
        }
        function h(c, a, f, p) {
            var m = a !== null ? a.key : null;
            if (typeof f == "string" || typeof f == "number") return m !== null ? null : u(c, a, "" + f, p);
            if (typeof f == "object" && f !== null) {
                switch(f.$$typeof){
                    case Mn:
                        return f.key === m ? f.type === Ee ? y(c, a, f.props.children, p, m) : s(c, a, f, p) : null;
                    case Ae:
                        return f.key === m ? d(c, a, f, p) : null;
                }
                if (ar(f) || In(f)) return m !== null ? null : y(c, a, f, p, null);
                fr(c, f);
            }
            return null;
        }
        function S(c, a, f, p, m) {
            if (typeof p == "string" || typeof p == "number") return c = c.get(f) || null, u(a, c, "" + p, m);
            if (typeof p == "object" && p !== null) {
                switch(p.$$typeof){
                    case Mn:
                        return c = c.get(p.key === null ? f : p.key) || null, p.type === Ee ? y(a, c, p.props.children, m, p.key) : s(a, c, p, m);
                    case Ae:
                        return c = c.get(p.key === null ? f : p.key) || null, d(a, c, p, m);
                }
                if (ar(p) || In(p)) return c = c.get(f) || null, y(a, c, p, m, null);
                fr(a, p);
            }
            return null;
        }
        function k(c, a, f, p) {
            for(var m = null, _ = null, w = a, N = a = 0, T = null; w !== null && N < f.length; N++){
                w.index > N ? (T = w, w = null) : T = w.sibling;
                var P = h(c, w, f[N], p);
                if (P === null) {
                    w === null && (w = T);
                    break;
                }
                e && w && P.alternate === null && n(c, w), a = i(P, a, N), _ === null ? m = P : _.sibling = P, _ = P, w = T;
            }
            if (N === f.length) return t(c, w), m;
            if (w === null) {
                for(; N < f.length; N++)w = C(c, f[N], p), w !== null && (a = i(w, a, N), _ === null ? m = w : _.sibling = w, _ = w);
                return m;
            }
            for(w = r(c, w); N < f.length; N++)T = S(w, c, N, f[N], p), T !== null && (e && T.alternate !== null && w.delete(T.key === null ? N : T.key), a = i(T, a, N), _ === null ? m = T : _.sibling = T, _ = T);
            return e && w.forEach(function(Se) {
                return n(c, Se);
            }), m;
        }
        function E(c, a, f, p) {
            var m = In(f);
            if (typeof m != "function") throw Error(v(150));
            if (f = m.call(f), f == null) throw Error(v(151));
            for(var _ = m = null, w = a, N = a = 0, T = null, P = f.next(); w !== null && !P.done; N++, P = f.next()){
                w.index > N ? (T = w, w = null) : T = w.sibling;
                var Se = h(c, w, P.value, p);
                if (Se === null) {
                    w === null && (w = T);
                    break;
                }
                e && w && Se.alternate === null && n(c, w), a = i(Se, a, N), _ === null ? m = Se : _.sibling = Se, _ = Se, w = T;
            }
            if (P.done) return t(c, w), m;
            if (w === null) {
                for(; !P.done; N++, P = f.next())P = C(c, P.value, p), P !== null && (a = i(P, a, N), _ === null ? m = P : _.sibling = P, _ = P);
                return m;
            }
            for(w = r(c, w); !P.done; N++, P = f.next())P = S(w, c, N, P.value, p), P !== null && (e && P.alternate !== null && w.delete(P.key === null ? N : P.key), a = i(P, a, N), _ === null ? m = P : _.sibling = P, _ = P);
            return e && w.forEach(function(Cs) {
                return n(c, Cs);
            }), m;
        }
        return function(c, a, f, p) {
            var m = typeof f == "object" && f !== null && f.type === Ee && f.key === null;
            m && (f = f.props.children);
            var _ = typeof f == "object" && f !== null;
            if (_) switch(f.$$typeof){
                case Mn:
                    e: {
                        for(_ = f.key, m = a; m !== null;){
                            if (m.key === _) {
                                switch(m.tag){
                                    case 7:
                                        if (f.type === Ee) {
                                            t(c, m.sibling), a = l(m, f.props.children), a.return = c, c = a;
                                            break e;
                                        }
                                        break;
                                    default:
                                        if (m.elementType === f.type) {
                                            t(c, m.sibling), a = l(m, f.props), a.ref = it(c, m, f), a.return = c, c = a;
                                            break e;
                                        }
                                }
                                t(c, m);
                                break;
                            } else n(c, m);
                            m = m.sibling;
                        }
                        f.type === Ee ? (a = zn(f.props.children, c.mode, p, f.key), a.return = c, c = a) : (p = Tr(f.type, f.key, f.props, null, c.mode, p), p.ref = it(c, a, f), p.return = c, c = p);
                    }
                    return o(c);
                case Ae:
                    e: {
                        for(m = f.key; a !== null;){
                            if (a.key === m) if (a.tag === 4 && a.stateNode.containerInfo === f.containerInfo && a.stateNode.implementation === f.implementation) {
                                t(c, a.sibling), a = l(a, f.children || []), a.return = c, c = a;
                                break e;
                            } else {
                                t(c, a);
                                break;
                            }
                            else n(c, a);
                            a = a.sibling;
                        }
                        a = Ti(f, c.mode, p), a.return = c, c = a;
                    }
                    return o(c);
            }
            if (typeof f == "string" || typeof f == "number") return f = "" + f, a !== null && a.tag === 6 ? (t(c, a.sibling), a = l(a, f), a.return = c, c = a) : (t(c, a), a = Pi(f, c.mode, p), a.return = c, c = a), o(c);
            if (ar(f)) return k(c, a, f, p);
            if (In(f)) return E(c, a, f, p);
            if (_ && fr(c, f), typeof f == "undefined" && !m) switch(c.tag){
                case 1:
                case 22:
                case 0:
                case 11:
                case 15:
                    throw Error(v(152, tn(c.type) || "Component"));
            }
            return t(c, a);
        };
    }
    var cr = ku(!0), xu = ku(!1), ot = {
    }, fe = Le(ot), ut = Le(ot), st = Le(ot);
    function Ze(e) {
        if (e === ot) throw Error(v(174));
        return e;
    }
    function Yl(e, n) {
        switch(R(st, n), R(ut, e), R(fe, ot), e = n.nodeType, e){
            case 9:
            case 11:
                n = (n = n.documentElement) ? n.namespaceURI : qr(null, "");
                break;
            default:
                e = e === 8 ? n.parentNode : n, n = e.namespaceURI || null, e = e.tagName, n = qr(n, e);
        }
        O(fe), R(fe, n);
    }
    function xn() {
        O(fe), O(ut), O(st);
    }
    function Cu(e) {
        Ze(st.current);
        var n = Ze(fe.current), t = qr(n, e.type);
        n !== t && (R(ut, e), R(fe, t));
    }
    function Xl(e) {
        ut.current === e && (O(fe), O(ut));
    }
    var D = Le(0);
    function dr(e) {
        for(var n = e; n !== null;){
            if (n.tag === 13) {
                var t = n.memoizedState;
                if (t !== null && (t = t.dehydrated, t === null || t.data === "$?" || t.data === "$!")) return n;
            } else if (n.tag === 19 && n.memoizedProps.revealOrder !== void 0) {
                if ((n.flags & 64) != 0) return n;
            } else if (n.child !== null) {
                n.child.return = n, n = n.child;
                continue;
            }
            if (n === e) break;
            for(; n.sibling === null;){
                if (n.return === null || n.return === e) return null;
                n = n.return;
            }
            n.sibling.return = n.return, n = n.sibling;
        }
        return null;
    }
    var ve = null, De = null, ce = !1;
    function _u(e, n) {
        var t = le(5, null, null, 0);
        t.elementType = "DELETED", t.type = "DELETED", t.stateNode = n, t.return = e, t.flags = 8, e.lastEffect !== null ? (e.lastEffect.nextEffect = t, e.lastEffect = t) : e.firstEffect = e.lastEffect = t;
    }
    function Nu(e, n) {
        switch(e.tag){
            case 5:
                var t = e.type;
                return n = n.nodeType !== 1 || t.toLowerCase() !== n.nodeName.toLowerCase() ? null : n, n !== null ? (e.stateNode = n, !0) : !1;
            case 6:
                return n = e.pendingProps === "" || n.nodeType !== 3 ? null : n, n !== null ? (e.stateNode = n, !0) : !1;
            case 13:
                return !1;
            default:
                return !1;
        }
    }
    function Kl(e) {
        if (ce) {
            var n = De;
            if (n) {
                var t = n;
                if (!Nu(e, n)) {
                    if (n = hn(t.nextSibling), !n || !Nu(e, n)) {
                        e.flags = e.flags & -1025 | 2, ce = !1, ve = e;
                        return;
                    }
                    _u(ve, t);
                }
                ve = e, De = hn(n.firstChild);
            } else e.flags = e.flags & -1025 | 2, ce = !1, ve = e;
        }
    }
    function Pu(e) {
        for(e = e.return; e !== null && e.tag !== 5 && e.tag !== 3 && e.tag !== 13;)e = e.return;
        ve = e;
    }
    function pr(e) {
        if (e !== ve) return !1;
        if (!ce) return Pu(e), ce = !0, !1;
        var n = e.type;
        if (e.tag !== 5 || n !== "head" && n !== "body" && !Ml(n, e.memoizedProps)) for(n = De; n;)_u(e, n), n = hn(n.nextSibling);
        if (Pu(e), e.tag === 13) {
            if (e = e.memoizedState, e = e !== null ? e.dehydrated : null, !e) throw Error(v(317));
            e: {
                for(e = e.nextSibling, n = 0; e;){
                    if (e.nodeType === 8) {
                        var t = e.data;
                        if (t === "/$") {
                            if (n === 0) {
                                De = hn(e.nextSibling);
                                break e;
                            }
                            n--;
                        } else t !== "$" && t !== "$!" && t !== "$?" || n++;
                    }
                    e = e.nextSibling;
                }
                De = null;
            }
        } else De = ve ? hn(e.stateNode.nextSibling) : null;
        return !0;
    }
    function Gl() {
        De = ve = null, ce = !1;
    }
    var Cn = [];
    function Zl() {
        for(var e = 0; e < Cn.length; e++)Cn[e]._workInProgressVersionPrimary = null;
        Cn.length = 0;
    }
    var at = We.ReactCurrentDispatcher, te = We.ReactCurrentBatchConfig, ft = 0, I = null, Q = null, B = null, mr = !1, ct = !1;
    function Z() {
        throw Error(v(321));
    }
    function Jl(e, n) {
        if (n === null) return !1;
        for(var t = 0; t < n.length && t < e.length; t++)if (!ee(e[t], n[t])) return !1;
        return !0;
    }
    function ql(e, n, t, r, l, i) {
        if (ft = i, I = n, n.memoizedState = null, n.updateQueue = null, n.lanes = 0, at.current = e === null || e.memoizedState === null ? Ja : qa, e = t(r, l), ct) {
            i = 0;
            do {
                if (ct = !1, !(25 > i)) throw Error(v(301));
                i += 1, B = Q = null, n.updateQueue = null, at.current = ba, e = t(r, l);
            }while (ct)
        }
        if (at.current = gr, n = Q !== null && Q.next !== null, ft = 0, B = Q = I = null, mr = !1, n) throw Error(v(300));
        return e;
    }
    function Je() {
        var e = {
            memoizedState: null,
            baseState: null,
            baseQueue: null,
            queue: null,
            next: null
        };
        return B === null ? I.memoizedState = B = e : B = B.next = e, B;
    }
    function qe() {
        if (Q === null) {
            var e = I.alternate;
            e = e !== null ? e.memoizedState : null;
        } else e = Q.next;
        var n = B === null ? I.memoizedState : B.next;
        if (n !== null) B = n, Q = e;
        else {
            if (e === null) throw Error(v(310));
            Q = e, e = {
                memoizedState: Q.memoizedState,
                baseState: Q.baseState,
                baseQueue: Q.baseQueue,
                queue: Q.queue,
                next: null
            }, B === null ? I.memoizedState = B = e : B = B.next = e;
        }
        return B;
    }
    function de(e, n) {
        return typeof n == "function" ? n(e) : n;
    }
    function dt(e) {
        var n = qe(), t = n.queue;
        if (t === null) throw Error(v(311));
        t.lastRenderedReducer = e;
        var r = Q, l = r.baseQueue, i = t.pending;
        if (i !== null) {
            if (l !== null) {
                var o = l.next;
                l.next = i.next, i.next = o;
            }
            r.baseQueue = l = i, t.pending = null;
        }
        if (l !== null) {
            l = l.next, r = r.baseState;
            var u = o = i = null, s = l;
            do {
                var d = s.lane;
                if ((ft & d) === d) u !== null && (u = u.next = {
                    lane: 0,
                    action: s.action,
                    eagerReducer: s.eagerReducer,
                    eagerState: s.eagerState,
                    next: null
                }), r = s.eagerReducer === e ? s.eagerState : e(r, s.action);
                else {
                    var y = {
                        lane: d,
                        action: s.action,
                        eagerReducer: s.eagerReducer,
                        eagerState: s.eagerState,
                        next: null
                    };
                    u === null ? (o = u = y, i = r) : u = u.next = y, I.lanes |= d, vt |= d;
                }
                s = s.next;
            }while (s !== null && s !== l)
            u === null ? i = r : u.next = o, ee(r, n.memoizedState) || (ue = !0), n.memoizedState = r, n.baseState = i, n.baseQueue = u, t.lastRenderedState = r;
        }
        return [
            n.memoizedState,
            t.dispatch
        ];
    }
    function pt(e) {
        var n = qe(), t = n.queue;
        if (t === null) throw Error(v(311));
        t.lastRenderedReducer = e;
        var r = t.dispatch, l = t.pending, i = n.memoizedState;
        if (l !== null) {
            t.pending = null;
            var o = l = l.next;
            do i = e(i, o.action), o = o.next;
            while (o !== l)
            ee(i, n.memoizedState) || (ue = !0), n.memoizedState = i, n.baseQueue === null && (n.baseState = i), t.lastRenderedState = i;
        }
        return [
            i,
            r
        ];
    }
    function Tu(e, n, t) {
        var r = n._getVersion;
        r = r(n._source);
        var l = n._workInProgressVersionPrimary;
        if (l !== null ? e = l === r : (e = e.mutableReadLanes, (e = (ft & e) === e) && (n._workInProgressVersionPrimary = r, Cn.push(n))), e) return t(n._source);
        throw Cn.push(n), Error(v(350));
    }
    function Lu(e, n, t, r) {
        var l = X;
        if (l === null) throw Error(v(349));
        var i = n._getVersion, o = i(n._source), u = at.current, s = u.useState(function() {
            return Tu(l, n, t);
        }), d = s[1], y = s[0];
        s = B;
        var C = e.memoizedState, h = C.refs, S = h.getSnapshot, k = C.source;
        C = C.subscribe;
        var E = I;
        return e.memoizedState = {
            refs: h,
            source: n,
            subscribe: r
        }, u.useEffect(function() {
            h.getSnapshot = t, h.setSnapshot = d;
            var c = i(n._source);
            if (!ee(o, c)) {
                c = t(n._source), ee(y, c) || (d(c), c = Fe(E), l.mutableReadLanes |= c & l.pendingLanes), c = l.mutableReadLanes, l.entangledLanes |= c;
                for(var a = l.entanglements, f = c; 0 < f;){
                    var p = 31 - Ne(f), m = 1 << p;
                    a[p] |= c, f &= ~m;
                }
            }
        }, [
            t,
            n,
            r
        ]), u.useEffect(function() {
            return r(n._source, function() {
                var c = h.getSnapshot, a = h.setSnapshot;
                try {
                    a(c(n._source));
                    var f = Fe(E);
                    l.mutableReadLanes |= f & l.pendingLanes;
                } catch (p) {
                    a(function() {
                        throw p;
                    });
                }
            });
        }, [
            n,
            r
        ]), ee(S, t) && ee(k, n) && ee(C, r) || (e = {
            pending: null,
            dispatch: null,
            lastRenderedReducer: de,
            lastRenderedState: y
        }, e.dispatch = d = ti.bind(null, I, e), s.queue = e, s.baseQueue = null, y = Tu(l, n, t), s.memoizedState = s.baseState = y), y;
    }
    function zu(e, n, t) {
        var r = qe();
        return Lu(r, e, n, t);
    }
    function mt(e) {
        var n = Je();
        return typeof e == "function" && (e = e()), n.memoizedState = n.baseState = e, e = n.queue = {
            pending: null,
            dispatch: null,
            lastRenderedReducer: de,
            lastRenderedState: e
        }, e = e.dispatch = ti.bind(null, I, e), [
            n.memoizedState,
            e
        ];
    }
    function hr(e, n, t, r) {
        return e = {
            tag: e,
            create: n,
            destroy: t,
            deps: r,
            next: null
        }, n = I.updateQueue, n === null ? (n = {
            lastEffect: null
        }, I.updateQueue = n, n.lastEffect = e.next = e) : (t = n.lastEffect, t === null ? n.lastEffect = e.next = e : (r = t.next, t.next = e, e.next = r, n.lastEffect = e)), e;
    }
    function Ou(e) {
        var n = Je();
        return e = {
            current: e
        }, n.memoizedState = e;
    }
    function vr() {
        return qe().memoizedState;
    }
    function bl(e, n, t, r) {
        var l = Je();
        I.flags |= e, l.memoizedState = hr(1 | n, t, void 0, r === void 0 ? null : r);
    }
    function ei(e, n, t, r) {
        var l = qe();
        r = r === void 0 ? null : r;
        var i = void 0;
        if (Q !== null) {
            var o = Q.memoizedState;
            if (i = o.destroy, r !== null && Jl(r, o.deps)) {
                hr(n, t, i, r);
                return;
            }
        }
        I.flags |= e, l.memoizedState = hr(1 | n, t, i, r);
    }
    function Mu(e, n) {
        return bl(516, 4, e, n);
    }
    function yr(e, n) {
        return ei(516, 4, e, n);
    }
    function Ru(e, n) {
        return ei(4, 2, e, n);
    }
    function Du(e, n) {
        if (typeof n == "function") return e = e(), n(e), function() {
            n(null);
        };
        if (n != null) return e = e(), n.current = e, function() {
            n.current = null;
        };
    }
    function Iu(e, n, t) {
        return t = t != null ? t.concat([
            e
        ]) : null, ei(4, 2, Du.bind(null, n, e), t);
    }
    function ni() {
    }
    function Fu(e, n) {
        var t = qe();
        n = n === void 0 ? null : n;
        var r = t.memoizedState;
        return r !== null && n !== null && Jl(n, r[1]) ? r[0] : (t.memoizedState = [
            e,
            n
        ], e);
    }
    function ju(e, n) {
        var t = qe();
        n = n === void 0 ? null : n;
        var r = t.memoizedState;
        return r !== null && n !== null && Jl(n, r[1]) ? r[0] : (e = e(), t.memoizedState = [
            e,
            n
        ], e);
    }
    function Za(e, n) {
        var t = Sn();
        Ge(98 > t ? 98 : t, function() {
            e(!0);
        }), Ge(97 < t ? 97 : t, function() {
            var r = te.transition;
            te.transition = 1;
            try {
                e(!1), n();
            } finally{
                te.transition = r;
            }
        });
    }
    function ti(e, n, t) {
        var r = b(), l = Fe(e), i = {
            lane: l,
            action: t,
            eagerReducer: null,
            eagerState: null,
            next: null
        }, o = n.pending;
        if (o === null ? i.next = i : (i.next = o.next, o.next = i), n.pending = i, o = e.alternate, e === I || o !== null && o === I) ct = mr = !0;
        else {
            if (e.lanes === 0 && (o === null || o.lanes === 0) && (o = n.lastRenderedReducer, o !== null)) try {
                var u = n.lastRenderedState, s = o(u, t);
                if (i.eagerReducer = o, i.eagerState = s, ee(s, u)) return;
            } catch (d) {
            } finally{
            }
            je(e, l, r);
        }
    }
    var gr = {
        readContext: ne,
        useCallback: Z,
        useContext: Z,
        useEffect: Z,
        useImperativeHandle: Z,
        useLayoutEffect: Z,
        useMemo: Z,
        useReducer: Z,
        useRef: Z,
        useState: Z,
        useDebugValue: Z,
        useDeferredValue: Z,
        useTransition: Z,
        useMutableSource: Z,
        useOpaqueIdentifier: Z,
        unstable_isNewReconciler: !1
    }, Ja = {
        readContext: ne,
        useCallback: function(e, n) {
            return Je().memoizedState = [
                e,
                n === void 0 ? null : n
            ], e;
        },
        useContext: ne,
        useEffect: Mu,
        useImperativeHandle: function(e, n, t) {
            return t = t != null ? t.concat([
                e
            ]) : null, bl(4, 2, Du.bind(null, n, e), t);
        },
        useLayoutEffect: function(e, n) {
            return bl(4, 2, e, n);
        },
        useMemo: function(e, n) {
            var t = Je();
            return n = n === void 0 ? null : n, e = e(), t.memoizedState = [
                e,
                n
            ], e;
        },
        useReducer: function(e, n, t) {
            var r = Je();
            return n = t !== void 0 ? t(n) : n, r.memoizedState = r.baseState = n, e = r.queue = {
                pending: null,
                dispatch: null,
                lastRenderedReducer: e,
                lastRenderedState: n
            }, e = e.dispatch = ti.bind(null, I, e), [
                r.memoizedState,
                e
            ];
        },
        useRef: Ou,
        useState: mt,
        useDebugValue: ni,
        useDeferredValue: function(e) {
            var n = mt(e), t = n[0], r = n[1];
            return Mu(function() {
                var l = te.transition;
                te.transition = 1;
                try {
                    r(e);
                } finally{
                    te.transition = l;
                }
            }, [
                e
            ]), t;
        },
        useTransition: function() {
            var e = mt(!1), n = e[0];
            return e = Za.bind(null, e[1]), Ou(e), [
                e,
                n
            ];
        },
        useMutableSource: function(e, n, t) {
            var r = Je();
            return r.memoizedState = {
                refs: {
                    getSnapshot: n,
                    setSnapshot: null
                },
                source: e,
                subscribe: t
            }, Lu(r, e, n, t);
        },
        useOpaqueIdentifier: function() {
            if (ce) {
                var e = !1, n = Qa(function() {
                    throw e || (e = !0, t("r:" + (Dl++).toString(36))), Error(v(355));
                }), t = mt(n)[1];
                return (I.mode & 2) == 0 && (I.flags |= 516, hr(5, function() {
                    t("r:" + (Dl++).toString(36));
                }, void 0, null)), n;
            }
            return n = "r:" + (Dl++).toString(36), mt(n), n;
        },
        unstable_isNewReconciler: !1
    }, qa = {
        readContext: ne,
        useCallback: Fu,
        useContext: ne,
        useEffect: yr,
        useImperativeHandle: Iu,
        useLayoutEffect: Ru,
        useMemo: ju,
        useReducer: dt,
        useRef: vr,
        useState: function() {
            return dt(de);
        },
        useDebugValue: ni,
        useDeferredValue: function(e) {
            var n = dt(de), t = n[0], r = n[1];
            return yr(function() {
                var l = te.transition;
                te.transition = 1;
                try {
                    r(e);
                } finally{
                    te.transition = l;
                }
            }, [
                e
            ]), t;
        },
        useTransition: function() {
            var e = dt(de)[0];
            return [
                vr().current,
                e
            ];
        },
        useMutableSource: zu,
        useOpaqueIdentifier: function() {
            return dt(de)[0];
        },
        unstable_isNewReconciler: !1
    }, ba = {
        readContext: ne,
        useCallback: Fu,
        useContext: ne,
        useEffect: yr,
        useImperativeHandle: Iu,
        useLayoutEffect: Ru,
        useMemo: ju,
        useReducer: pt,
        useRef: vr,
        useState: function() {
            return pt(de);
        },
        useDebugValue: ni,
        useDeferredValue: function(e) {
            var n = pt(de), t = n[0], r = n[1];
            return yr(function() {
                var l = te.transition;
                te.transition = 1;
                try {
                    r(e);
                } finally{
                    te.transition = l;
                }
            }, [
                e
            ]), t;
        },
        useTransition: function() {
            var e = pt(de)[0];
            return [
                vr().current,
                e
            ];
        },
        useMutableSource: zu,
        useOpaqueIdentifier: function() {
            return pt(de)[0];
        },
        unstable_isNewReconciler: !1
    }, ef = We.ReactCurrentOwner, ue = !1;
    function J(e, n, t, r) {
        n.child = e === null ? xu(n, null, t, r) : cr(n, e.child, t, r);
    }
    function Uu(e, n, t, r, l) {
        t = t.render;
        var i = n.ref;
        return kn(n, l), r = ql(e, n, t, r, i, l), e !== null && !ue ? (n.updateQueue = e.updateQueue, n.flags &= -517, e.lanes &= ~l, ye(e, n, l)) : (n.flags |= 1, J(e, n, r, l), n.child);
    }
    function Vu(e, n, t, r, l, i) {
        if (e === null) {
            var o = t.type;
            return typeof o == "function" && !_i(o) && o.defaultProps === void 0 && t.compare === null && t.defaultProps === void 0 ? (n.tag = 15, n.type = o, Bu(e, n, o, r, l, i)) : (e = Tr(t.type, null, r, n, n.mode, i), e.ref = n.ref, e.return = n, n.child = e);
        }
        return o = e.child, (l & i) == 0 && (l = o.memoizedProps, t = t.compare, t = t !== null ? t : qn, t(l, r) && e.ref === n.ref) ? ye(e, n, i) : (n.flags |= 1, e = Be(o, r), e.ref = n.ref, e.return = n, n.child = e);
    }
    function Bu(e, n, t, r, l, i) {
        if (e !== null && qn(e.memoizedProps, r) && e.ref === n.ref) if (ue = !1, (i & l) != 0) (e.flags & 16384) != 0 && (ue = !0);
        else return n.lanes = e.lanes, ye(e, n, i);
        return li(e, n, t, r, i);
    }
    function ri(e, n, t) {
        var r = n.pendingProps, l = r.children, i = e !== null ? e.memoizedState : null;
        if (r.mode === "hidden" || r.mode === "unstable-defer-without-hiding") if ((n.mode & 4) == 0) n.memoizedState = {
            baseLanes: 0
        }, Pr(n, t);
        else if ((t & 1073741824) != 0) n.memoizedState = {
            baseLanes: 0
        }, Pr(n, i !== null ? i.baseLanes : t);
        else return e = i !== null ? i.baseLanes | t : t, n.lanes = n.childLanes = 1073741824, n.memoizedState = {
            baseLanes: e
        }, Pr(n, e), null;
        else i !== null ? (r = i.baseLanes | t, n.memoizedState = null) : r = t, Pr(n, r);
        return J(e, n, l, t), n.child;
    }
    function Hu(e, n) {
        var t = n.ref;
        (e === null && t !== null || e !== null && e.ref !== t) && (n.flags |= 128);
    }
    function li(e, n, t, r, l) {
        var i = G(t) ? Xe : W.current;
        return i = wn(n, i), kn(n, l), t = ql(e, n, t, r, i, l), e !== null && !ue ? (n.updateQueue = e.updateQueue, n.flags &= -517, e.lanes &= ~l, ye(e, n, l)) : (n.flags |= 1, J(e, n, t, l), n.child);
    }
    function Wu(e, n, t, r, l) {
        if (G(t)) {
            var i = !0;
            nr(n);
        } else i = !1;
        if (kn(n, l), n.stateNode === null) e !== null && (e.alternate = null, n.alternate = null, n.flags |= 2), Su(n, t, r), $l(n, t, r, l), r = !0;
        else if (e === null) {
            var o = n.stateNode, u = n.memoizedProps;
            o.props = u;
            var s = o.context, d = t.contextType;
            typeof d == "object" && d !== null ? d = ne(d) : (d = G(t) ? Xe : W.current, d = wn(n, d));
            var y = t.getDerivedStateFromProps, C = typeof y == "function" || typeof o.getSnapshotBeforeUpdate == "function";
            C || typeof o.UNSAFE_componentWillReceiveProps != "function" && typeof o.componentWillReceiveProps != "function" || (u !== r || s !== d) && Eu(n, o, r, d), Oe = !1;
            var h = n.memoizedState;
            o.state = h, lt(n, r, o, l), s = n.memoizedState, u !== r || h !== s || K.current || Oe ? (typeof y == "function" && (ur(n, t, y, r), s = n.memoizedState), (u = Oe || wu(n, t, u, r, h, s, d)) ? (C || typeof o.UNSAFE_componentWillMount != "function" && typeof o.componentWillMount != "function" || (typeof o.componentWillMount == "function" && o.componentWillMount(), typeof o.UNSAFE_componentWillMount == "function" && o.UNSAFE_componentWillMount()), typeof o.componentDidMount == "function" && (n.flags |= 4)) : (typeof o.componentDidMount == "function" && (n.flags |= 4), n.memoizedProps = r, n.memoizedState = s), o.props = r, o.state = s, o.context = d, r = u) : (typeof o.componentDidMount == "function" && (n.flags |= 4), r = !1);
        } else {
            o = n.stateNode, hu(e, n), u = n.memoizedProps, d = n.type === n.elementType ? u : oe(n.type, u), o.props = d, C = n.pendingProps, h = o.context, s = t.contextType, typeof s == "object" && s !== null ? s = ne(s) : (s = G(t) ? Xe : W.current, s = wn(n, s));
            var S = t.getDerivedStateFromProps;
            (y = typeof S == "function" || typeof o.getSnapshotBeforeUpdate == "function") || typeof o.UNSAFE_componentWillReceiveProps != "function" && typeof o.componentWillReceiveProps != "function" || (u !== C || h !== s) && Eu(n, o, r, s), Oe = !1, h = n.memoizedState, o.state = h, lt(n, r, o, l);
            var k = n.memoizedState;
            u !== C || h !== k || K.current || Oe ? (typeof S == "function" && (ur(n, t, S, r), k = n.memoizedState), (d = Oe || wu(n, t, d, r, h, k, s)) ? (y || typeof o.UNSAFE_componentWillUpdate != "function" && typeof o.componentWillUpdate != "function" || (typeof o.componentWillUpdate == "function" && o.componentWillUpdate(r, k, s), typeof o.UNSAFE_componentWillUpdate == "function" && o.UNSAFE_componentWillUpdate(r, k, s)), typeof o.componentDidUpdate == "function" && (n.flags |= 4), typeof o.getSnapshotBeforeUpdate == "function" && (n.flags |= 256)) : (typeof o.componentDidUpdate != "function" || u === e.memoizedProps && h === e.memoizedState || (n.flags |= 4), typeof o.getSnapshotBeforeUpdate != "function" || u === e.memoizedProps && h === e.memoizedState || (n.flags |= 256), n.memoizedProps = r, n.memoizedState = k), o.props = r, o.state = k, o.context = s, r = d) : (typeof o.componentDidUpdate != "function" || u === e.memoizedProps && h === e.memoizedState || (n.flags |= 4), typeof o.getSnapshotBeforeUpdate != "function" || u === e.memoizedProps && h === e.memoizedState || (n.flags |= 256), r = !1);
        }
        return ii(e, n, t, r, i, l);
    }
    function ii(e, n, t, r, l, i) {
        Hu(e, n);
        var o = (n.flags & 64) != 0;
        if (!r && !o) return l && iu(n, t, !1), ye(e, n, i);
        r = n.stateNode, ef.current = n;
        var u = o && typeof t.getDerivedStateFromError != "function" ? null : r.render();
        return n.flags |= 1, e !== null && o ? (n.child = cr(n, e.child, null, i), n.child = cr(n, null, u, i)) : J(e, n, u, i), n.memoizedState = r.state, l && iu(n, t, !0), n.child;
    }
    function Au(e) {
        var n = e.stateNode;
        n.pendingContext ? ru(e, n.pendingContext, n.pendingContext !== n.context) : n.context && ru(e, n.context, !1), Yl(e, n.containerInfo);
    }
    var wr = {
        dehydrated: null,
        retryLane: 0
    };
    function Qu(e, n, t) {
        var r = n.pendingProps, l = D.current, i = !1, o;
        return (o = (n.flags & 64) != 0) || (o = e !== null && e.memoizedState === null ? !1 : (l & 2) != 0), o ? (i = !0, n.flags &= -65) : e !== null && e.memoizedState === null || r.fallback === void 0 || r.unstable_avoidThisFallback === !0 || (l |= 1), R(D, l & 1), e === null ? (r.fallback !== void 0 && Kl(n), e = r.children, l = r.fallback, i ? (e = $u(n, e, l, t), n.child.memoizedState = {
            baseLanes: t
        }, n.memoizedState = wr, e) : typeof r.unstable_expectedLoadTime == "number" ? (e = $u(n, e, l, t), n.child.memoizedState = {
            baseLanes: t
        }, n.memoizedState = wr, n.lanes = 33554432, e) : (t = Ni({
            mode: "visible",
            children: e
        }, n.mode, t, null), t.return = n, n.child = t)) : e.memoizedState !== null ? i ? (r = Xu(e, n, r.children, r.fallback, t), i = n.child, l = e.child.memoizedState, i.memoizedState = l === null ? {
            baseLanes: t
        } : {
            baseLanes: l.baseLanes | t
        }, i.childLanes = e.childLanes & ~t, n.memoizedState = wr, r) : (t = Yu(e, n, r.children, t), n.memoizedState = null, t) : i ? (r = Xu(e, n, r.children, r.fallback, t), i = n.child, l = e.child.memoizedState, i.memoizedState = l === null ? {
            baseLanes: t
        } : {
            baseLanes: l.baseLanes | t
        }, i.childLanes = e.childLanes & ~t, n.memoizedState = wr, r) : (t = Yu(e, n, r.children, t), n.memoizedState = null, t);
    }
    function $u(e, n, t, r) {
        var l = e.mode, i = e.child;
        return n = {
            mode: "hidden",
            children: n
        }, (l & 2) == 0 && i !== null ? (i.childLanes = 0, i.pendingProps = n) : i = Ni(n, l, 0, null), t = zn(t, l, r, null), i.return = e, t.return = e, i.sibling = t, e.child = i, t;
    }
    function Yu(e, n, t, r) {
        var l = e.child;
        return e = l.sibling, t = Be(l, {
            mode: "visible",
            children: t
        }), (n.mode & 2) == 0 && (t.lanes = r), t.return = n, t.sibling = null, e !== null && (e.nextEffect = null, e.flags = 8, n.firstEffect = n.lastEffect = e), n.child = t;
    }
    function Xu(e, n, t, r, l) {
        var i = n.mode, o = e.child;
        e = o.sibling;
        var u = {
            mode: "hidden",
            children: t
        };
        return (i & 2) == 0 && n.child !== o ? (t = n.child, t.childLanes = 0, t.pendingProps = u, o = t.lastEffect, o !== null ? (n.firstEffect = t.firstEffect, n.lastEffect = o, o.nextEffect = null) : n.firstEffect = n.lastEffect = null) : t = Be(o, u), e !== null ? r = Be(e, r) : (r = zn(r, i, l, null), r.flags |= 2), r.return = n, t.return = n, t.sibling = r, n.child = t, r;
    }
    function Ku(e, n) {
        e.lanes |= n;
        var t = e.alternate;
        t !== null && (t.lanes |= n), mu(e.return, n);
    }
    function oi(e, n, t, r, l, i) {
        var o = e.memoizedState;
        o === null ? e.memoizedState = {
            isBackwards: n,
            rendering: null,
            renderingStartTime: 0,
            last: r,
            tail: t,
            tailMode: l,
            lastEffect: i
        } : (o.isBackwards = n, o.rendering = null, o.renderingStartTime = 0, o.last = r, o.tail = t, o.tailMode = l, o.lastEffect = i);
    }
    function Gu(e, n, t) {
        var r = n.pendingProps, l = r.revealOrder, i = r.tail;
        if (J(e, n, r.children, t), r = D.current, (r & 2) != 0) r = r & 1 | 2, n.flags |= 64;
        else {
            if (e !== null && (e.flags & 64) != 0) e: for(e = n.child; e !== null;){
                if (e.tag === 13) e.memoizedState !== null && Ku(e, t);
                else if (e.tag === 19) Ku(e, t);
                else if (e.child !== null) {
                    e.child.return = e, e = e.child;
                    continue;
                }
                if (e === n) break e;
                for(; e.sibling === null;){
                    if (e.return === null || e.return === n) break e;
                    e = e.return;
                }
                e.sibling.return = e.return, e = e.sibling;
            }
            r &= 1;
        }
        if (R(D, r), (n.mode & 2) == 0) n.memoizedState = null;
        else switch(l){
            case "forwards":
                for(t = n.child, l = null; t !== null;)e = t.alternate, e !== null && dr(e) === null && (l = t), t = t.sibling;
                t = l, t === null ? (l = n.child, n.child = null) : (l = t.sibling, t.sibling = null), oi(n, !1, l, t, i, n.lastEffect);
                break;
            case "backwards":
                for(t = null, l = n.child, n.child = null; l !== null;){
                    if (e = l.alternate, e !== null && dr(e) === null) {
                        n.child = l;
                        break;
                    }
                    e = l.sibling, l.sibling = t, t = l, l = e;
                }
                oi(n, !0, t, null, i, n.lastEffect);
                break;
            case "together":
                oi(n, !1, null, null, void 0, n.lastEffect);
                break;
            default:
                n.memoizedState = null;
        }
        return n.child;
    }
    function ye(e, n, t) {
        if (e !== null && (n.dependencies = e.dependencies), vt |= n.lanes, (t & n.childLanes) != 0) {
            if (e !== null && n.child !== e.child) throw Error(v(153));
            if (n.child !== null) {
                for(e = n.child, t = Be(e, e.pendingProps), n.child = t, t.return = n; e.sibling !== null;)e = e.sibling, t = t.sibling = Be(e, e.pendingProps), t.return = n;
                t.sibling = null;
            }
            return n.child;
        }
        return null;
    }
    var Zu, ui, Ju, qu;
    Zu = function(e, n) {
        for(var t = n.child; t !== null;){
            if (t.tag === 5 || t.tag === 6) e.appendChild(t.stateNode);
            else if (t.tag !== 4 && t.child !== null) {
                t.child.return = t, t = t.child;
                continue;
            }
            if (t === n) break;
            for(; t.sibling === null;){
                if (t.return === null || t.return === n) return;
                t = t.return;
            }
            t.sibling.return = t.return, t = t.sibling;
        }
    };
    ui = function() {
    };
    Ju = function(e, n, t, r) {
        var l = e.memoizedProps;
        if (l !== r) {
            e = n.stateNode, Ze(fe.current);
            var i = null;
            switch(t){
                case "input":
                    l = Yr(e, l), r = Yr(e, r), i = [];
                    break;
                case "option":
                    l = Gr(e, l), r = Gr(e, r), i = [];
                    break;
                case "select":
                    l = M({
                    }, l, {
                        value: void 0
                    }), r = M({
                    }, r, {
                        value: void 0
                    }), i = [];
                    break;
                case "textarea":
                    l = Zr(e, l), r = Zr(e, r), i = [];
                    break;
                default:
                    typeof l.onClick != "function" && typeof r.onClick == "function" && (e.onclick = Zt);
            }
            br(t, r);
            var o;
            t = null;
            for(d in l)if (!r.hasOwnProperty(d) && l.hasOwnProperty(d) && l[d] != null) if (d === "style") {
                var u = l[d];
                for(o in u)u.hasOwnProperty(o) && (t || (t = {
                }), t[o] = "");
            } else d !== "dangerouslySetInnerHTML" && d !== "children" && d !== "suppressContentEditableWarning" && d !== "suppressHydrationWarning" && d !== "autoFocus" && (On.hasOwnProperty(d) ? i || (i = []) : (i = i || []).push(d, null));
            for(d in r){
                var s = r[d];
                if (u = l != null ? l[d] : void 0, r.hasOwnProperty(d) && s !== u && (s != null || u != null)) if (d === "style") if (u) {
                    for(o in u)!u.hasOwnProperty(o) || s && s.hasOwnProperty(o) || (t || (t = {
                    }), t[o] = "");
                    for(o in s)s.hasOwnProperty(o) && u[o] !== s[o] && (t || (t = {
                    }), t[o] = s[o]);
                } else t || (i || (i = []), i.push(d, t)), t = s;
                else d === "dangerouslySetInnerHTML" ? (s = s ? s.__html : void 0, u = u ? u.__html : void 0, s != null && u !== s && (i = i || []).push(d, s)) : d === "children" ? typeof s != "string" && typeof s != "number" || (i = i || []).push(d, "" + s) : d !== "suppressContentEditableWarning" && d !== "suppressHydrationWarning" && (On.hasOwnProperty(d) ? (s != null && d === "onScroll" && z("scroll", e), i || u === s || (i = [])) : typeof s == "object" && s !== null && s.$$typeof === Hr ? s.toString() : (i = i || []).push(d, s));
            }
            t && (i = i || []).push("style", t);
            var d = i;
            (n.updateQueue = d) && (n.flags |= 4);
        }
    };
    qu = function(e, n, t, r) {
        t !== r && (n.flags |= 4);
    };
    function ht(e, n) {
        if (!ce) switch(e.tailMode){
            case "hidden":
                n = e.tail;
                for(var t = null; n !== null;)n.alternate !== null && (t = n), n = n.sibling;
                t === null ? e.tail = null : t.sibling = null;
                break;
            case "collapsed":
                t = e.tail;
                for(var r = null; t !== null;)t.alternate !== null && (r = t), t = t.sibling;
                r === null ? n || e.tail === null ? e.tail = null : e.tail.sibling = null : r.sibling = null;
        }
    }
    function nf(e, n, t) {
        var r = n.pendingProps;
        switch(n.tag){
            case 2:
            case 16:
            case 15:
            case 0:
            case 11:
            case 7:
            case 8:
            case 12:
            case 9:
            case 14:
                return null;
            case 1:
                return G(n.type) && er(), null;
            case 3:
                return xn(), O(K), O(W), Zl(), r = n.stateNode, r.pendingContext && (r.context = r.pendingContext, r.pendingContext = null), (e === null || e.child === null) && (pr(n) ? n.flags |= 4 : r.hydrate || (n.flags |= 256)), ui(n), null;
            case 5:
                Xl(n);
                var l = Ze(st.current);
                if (t = n.type, e !== null && n.stateNode != null) Ju(e, n, t, r, l), e.ref !== n.ref && (n.flags |= 128);
                else {
                    if (!r) {
                        if (n.stateNode === null) throw Error(v(166));
                        return null;
                    }
                    if (e = Ze(fe.current), pr(n)) {
                        r = n.stateNode, t = n.type;
                        var i = n.memoizedProps;
                        switch(r[Te] = n, r[qt] = i, t){
                            case "dialog":
                                z("cancel", r), z("close", r);
                                break;
                            case "iframe":
                            case "object":
                            case "embed":
                                z("load", r);
                                break;
                            case "video":
                            case "audio":
                                for(e = 0; e < et.length; e++)z(et[e], r);
                                break;
                            case "source":
                                z("error", r);
                                break;
                            case "img":
                            case "image":
                            case "link":
                                z("error", r), z("load", r);
                                break;
                            case "details":
                                z("toggle", r);
                                break;
                            case "input":
                                Ai(r, i), z("invalid", r);
                                break;
                            case "select":
                                r._wrapperState = {
                                    wasMultiple: !!i.multiple
                                }, z("invalid", r);
                                break;
                            case "textarea":
                                Yi(r, i), z("invalid", r);
                        }
                        br(t, i), e = null;
                        for(var o in i)i.hasOwnProperty(o) && (l = i[o], o === "children" ? typeof l == "string" ? r.textContent !== l && (e = [
                            "children",
                            l
                        ]) : typeof l == "number" && r.textContent !== "" + l && (e = [
                            "children",
                            "" + l
                        ]) : On.hasOwnProperty(o) && l != null && o === "onScroll" && z("scroll", r));
                        switch(t){
                            case "input":
                                zt(r), $i(r, i, !0);
                                break;
                            case "textarea":
                                zt(r), Ki(r);
                                break;
                            case "select":
                            case "option": break;
                            default:
                                typeof i.onClick == "function" && (r.onclick = Zt);
                        }
                        r = e, n.updateQueue = r, r !== null && (n.flags |= 4);
                    } else {
                        switch(o = l.nodeType === 9 ? l : l.ownerDocument, e === Jr.html && (e = Gi(t)), e === Jr.html ? t === "script" ? (e = o.createElement("div"), e.innerHTML = "<script><\/script>", e = e.removeChild(e.firstChild)) : typeof r.is == "string" ? e = o.createElement(t, {
                            is: r.is
                        }) : (e = o.createElement(t), t === "select" && (o = e, r.multiple ? o.multiple = !0 : r.size && (o.size = r.size))) : e = o.createElementNS(e, t), e[Te] = n, e[qt] = r, Zu(e, n, !1, !1), n.stateNode = e, o = el(t, r), t){
                            case "dialog":
                                z("cancel", e), z("close", e), l = r;
                                break;
                            case "iframe":
                            case "object":
                            case "embed":
                                z("load", e), l = r;
                                break;
                            case "video":
                            case "audio":
                                for(l = 0; l < et.length; l++)z(et[l], e);
                                l = r;
                                break;
                            case "source":
                                z("error", e), l = r;
                                break;
                            case "img":
                            case "image":
                            case "link":
                                z("error", e), z("load", e), l = r;
                                break;
                            case "details":
                                z("toggle", e), l = r;
                                break;
                            case "input":
                                Ai(e, r), l = Yr(e, r), z("invalid", e);
                                break;
                            case "option":
                                l = Gr(e, r);
                                break;
                            case "select":
                                e._wrapperState = {
                                    wasMultiple: !!r.multiple
                                }, l = M({
                                }, r, {
                                    value: void 0
                                }), z("invalid", e);
                                break;
                            case "textarea":
                                Yi(e, r), l = Zr(e, r), z("invalid", e);
                                break;
                            default:
                                l = r;
                        }
                        br(t, l);
                        var u = l;
                        for(i in u)if (u.hasOwnProperty(i)) {
                            var s = u[i];
                            i === "style" ? qi(e, s) : i === "dangerouslySetInnerHTML" ? (s = s ? s.__html : void 0, s != null && Zi(e, s)) : i === "children" ? typeof s == "string" ? (t !== "textarea" || s !== "") && jn(e, s) : typeof s == "number" && jn(e, "" + s) : i !== "suppressContentEditableWarning" && i !== "suppressHydrationWarning" && i !== "autoFocus" && (On.hasOwnProperty(i) ? s != null && i === "onScroll" && z("scroll", e) : s != null && Ir(e, i, s, o));
                        }
                        switch(t){
                            case "input":
                                zt(e), $i(e, r, !1);
                                break;
                            case "textarea":
                                zt(e), Ki(e);
                                break;
                            case "option":
                                r.value != null && e.setAttribute("value", "" + ke(r.value));
                                break;
                            case "select":
                                e.multiple = !!r.multiple, i = r.value, i != null ? rn(e, !!r.multiple, i, !1) : r.defaultValue != null && rn(e, !!r.multiple, r.defaultValue, !0);
                                break;
                            default:
                                typeof l.onClick == "function" && (e.onclick = Zt);
                        }
                        qo(t, r) && (n.flags |= 4);
                    }
                    n.ref !== null && (n.flags |= 128);
                }
                return null;
            case 6:
                if (e && n.stateNode != null) qu(e, n, e.memoizedProps, r);
                else {
                    if (typeof r != "string" && n.stateNode === null) throw Error(v(166));
                    t = Ze(st.current), Ze(fe.current), pr(n) ? (r = n.stateNode, t = n.memoizedProps, r[Te] = n, r.nodeValue !== t && (n.flags |= 4)) : (r = (t.nodeType === 9 ? t : t.ownerDocument).createTextNode(r), r[Te] = n, n.stateNode = r);
                }
                return null;
            case 13:
                return O(D), r = n.memoizedState, (n.flags & 64) != 0 ? (n.lanes = t, n) : (r = r !== null, t = !1, e === null ? n.memoizedProps.fallback !== void 0 && pr(n) : t = e.memoizedState !== null, r && !t && (n.mode & 2) != 0 && (e === null && n.memoizedProps.unstable_avoidThisFallback !== !0 || (D.current & 1) != 0 ? H === 0 && (H = 3) : ((H === 0 || H === 3) && (H = 4), X === null || (vt & 134217727) == 0 && (Nn & 134217727) == 0 || Tn(X, $))), (r || t) && (n.flags |= 4), null);
            case 4:
                return xn(), ui(n), e === null && Xo(n.stateNode.containerInfo), null;
            case 10:
                return Al(n), null;
            case 17:
                return G(n.type) && er(), null;
            case 19:
                if (O(D), r = n.memoizedState, r === null) return null;
                if (i = (n.flags & 64) != 0, o = r.rendering, o === null) if (i) ht(r, !1);
                else {
                    if (H !== 0 || e !== null && (e.flags & 64) != 0) for(e = n.child; e !== null;){
                        if (o = dr(e), o !== null) {
                            for(n.flags |= 64, ht(r, !1), i = o.updateQueue, i !== null && (n.updateQueue = i, n.flags |= 4), r.lastEffect === null && (n.firstEffect = null), n.lastEffect = r.lastEffect, r = t, t = n.child; t !== null;)i = t, e = r, i.flags &= 2, i.nextEffect = null, i.firstEffect = null, i.lastEffect = null, o = i.alternate, o === null ? (i.childLanes = 0, i.lanes = e, i.child = null, i.memoizedProps = null, i.memoizedState = null, i.updateQueue = null, i.dependencies = null, i.stateNode = null) : (i.childLanes = o.childLanes, i.lanes = o.lanes, i.child = o.child, i.memoizedProps = o.memoizedProps, i.memoizedState = o.memoizedState, i.updateQueue = o.updateQueue, i.type = o.type, e = o.dependencies, i.dependencies = e === null ? null : {
                                lanes: e.lanes,
                                firstContext: e.firstContext
                            }), t = t.sibling;
                            return R(D, D.current & 1 | 2), n.child;
                        }
                        e = e.sibling;
                    }
                    r.tail !== null && A() > gi && (n.flags |= 64, i = !0, ht(r, !1), n.lanes = 33554432);
                }
                else {
                    if (!i) if (e = dr(o), e !== null) {
                        if (n.flags |= 64, i = !0, t = e.updateQueue, t !== null && (n.updateQueue = t, n.flags |= 4), ht(r, !0), r.tail === null && r.tailMode === "hidden" && !o.alternate && !ce) return n = n.lastEffect = r.lastEffect, n !== null && (n.nextEffect = null), null;
                    } else 2 * A() - r.renderingStartTime > gi && t !== 1073741824 && (n.flags |= 64, i = !0, ht(r, !1), n.lanes = 33554432);
                    r.isBackwards ? (o.sibling = n.child, n.child = o) : (t = r.last, t !== null ? t.sibling = o : n.child = o, r.last = o);
                }
                return r.tail !== null ? (t = r.tail, r.rendering = t, r.tail = t.sibling, r.lastEffect = n.lastEffect, r.renderingStartTime = A(), t.sibling = null, n = D.current, R(D, i ? n & 1 | 2 : n & 1), t) : null;
            case 23:
            case 24:
                return Ci(), e !== null && e.memoizedState !== null != (n.memoizedState !== null) && r.mode !== "unstable-defer-without-hiding" && (n.flags |= 4), null;
        }
        throw Error(v(156, n.tag));
    }
    function tf(e) {
        switch(e.tag){
            case 1:
                G(e.type) && er();
                var n = e.flags;
                return n & 4096 ? (e.flags = n & -4097 | 64, e) : null;
            case 3:
                if (xn(), O(K), O(W), Zl(), n = e.flags, (n & 64) != 0) throw Error(v(285));
                return e.flags = n & -4097 | 64, e;
            case 5:
                return Xl(e), null;
            case 13:
                return O(D), n = e.flags, n & 4096 ? (e.flags = n & -4097 | 64, e) : null;
            case 19:
                return O(D), null;
            case 4:
                return xn(), null;
            case 10:
                return Al(e), null;
            case 23:
            case 24:
                return Ci(), null;
            default:
                return null;
        }
    }
    function si(e, n) {
        try {
            var t = "", r = n;
            do t += Fs(r), r = r.return;
            while (r)
            var l = t;
        } catch (i) {
            l = `
Error generating stack: ` + i.message + `
` + i.stack;
        }
        return {
            value: e,
            source: n,
            stack: l
        };
    }
    function ai(e, n) {
        try {
            console.error(n.value);
        } catch (t) {
            setTimeout(function() {
                throw t;
            });
        }
    }
    var rf = typeof WeakMap == "function" ? WeakMap : Map;
    function bu(e, n, t) {
        t = Me(-1, t), t.tag = 3, t.payload = {
            element: null
        };
        var r = n.value;
        return t.callback = function() {
            kr || (kr = !0, wi = r), ai(e, n);
        }, t;
    }
    function es(e, n, t) {
        t = Me(-1, t), t.tag = 3;
        var r = e.type.getDerivedStateFromError;
        if (typeof r == "function") {
            var l = n.value;
            t.payload = function() {
                return ai(e, n), r(l);
            };
        }
        var i = e.stateNode;
        return i !== null && typeof i.componentDidCatch == "function" && (t.callback = function() {
            typeof r != "function" && (pe === null ? pe = new Set([
                this
            ]) : pe.add(this), ai(e, n));
            var o = n.stack;
            this.componentDidCatch(n.value, {
                componentStack: o !== null ? o : ""
            });
        }), t;
    }
    var lf = typeof WeakSet == "function" ? WeakSet : Set;
    function ns(e) {
        var n = e.ref;
        if (n !== null) if (typeof n == "function") try {
            n(null);
        } catch (t) {
            Ve(e, t);
        }
        else n.current = null;
    }
    function of(e, n) {
        switch(n.tag){
            case 0:
            case 11:
            case 15:
            case 22:
                return;
            case 1:
                if (n.flags & 256 && e !== null) {
                    var t = e.memoizedProps, r = e.memoizedState;
                    e = n.stateNode, n = e.getSnapshotBeforeUpdate(n.elementType === n.type ? t : oe(n.type, t), r), e.__reactInternalSnapshotBeforeUpdate = n;
                }
                return;
            case 3:
                n.flags & 256 && Rl(n.stateNode.containerInfo);
                return;
            case 5:
            case 6:
            case 4:
            case 17:
                return;
        }
        throw Error(v(163));
    }
    function uf(e, n, t) {
        switch(t.tag){
            case 0:
            case 11:
            case 15:
            case 22:
                if (n = t.updateQueue, n = n !== null ? n.lastEffect : null, n !== null) {
                    e = n = n.next;
                    do {
                        if ((e.tag & 3) == 3) {
                            var r = e.create;
                            e.destroy = r();
                        }
                        e = e.next;
                    }while (e !== n)
                }
                if (n = t.updateQueue, n = n !== null ? n.lastEffect : null, n !== null) {
                    e = n = n.next;
                    do {
                        var l = e;
                        r = l.next, l = l.tag, (l & 4) != 0 && (l & 1) != 0 && (vs(t, e), hf(t, e)), e = r;
                    }while (e !== n)
                }
                return;
            case 1:
                e = t.stateNode, t.flags & 4 && (n === null ? e.componentDidMount() : (r = t.elementType === t.type ? n.memoizedProps : oe(t.type, n.memoizedProps), e.componentDidUpdate(r, n.memoizedState, e.__reactInternalSnapshotBeforeUpdate))), n = t.updateQueue, n !== null && yu(t, n, e);
                return;
            case 3:
                if (n = t.updateQueue, n !== null) {
                    if (e = null, t.child !== null) switch(t.child.tag){
                        case 5:
                            e = t.child.stateNode;
                            break;
                        case 1:
                            e = t.child.stateNode;
                    }
                    yu(t, n, e);
                }
                return;
            case 5:
                e = t.stateNode, n === null && t.flags & 4 && qo(t.type, t.memoizedProps) && e.focus();
                return;
            case 6:
                return;
            case 4:
                return;
            case 12:
                return;
            case 13:
                t.memoizedState === null && (t = t.alternate, t !== null && (t = t.memoizedState, t !== null && (t = t.dehydrated, t !== null && ho(t))));
                return;
            case 19:
            case 17:
            case 20:
            case 21:
            case 23:
            case 24:
                return;
        }
        throw Error(v(163));
    }
    function ts(e, n) {
        for(var t = e;;){
            if (t.tag === 5) {
                var r = t.stateNode;
                if (n) r = r.style, typeof r.setProperty == "function" ? r.setProperty("display", "none", "important") : r.display = "none";
                else {
                    r = t.stateNode;
                    var l = t.memoizedProps.style;
                    l = l != null && l.hasOwnProperty("display") ? l.display : null, r.style.display = Ji("display", l);
                }
            } else if (t.tag === 6) t.stateNode.nodeValue = n ? "" : t.memoizedProps;
            else if ((t.tag !== 23 && t.tag !== 24 || t.memoizedState === null || t === e) && t.child !== null) {
                t.child.return = t, t = t.child;
                continue;
            }
            if (t === e) break;
            for(; t.sibling === null;){
                if (t.return === null || t.return === e) return;
                t = t.return;
            }
            t.sibling.return = t.return, t = t.sibling;
        }
    }
    function rs(e, n) {
        if (Ke && typeof Ke.onCommitFiberUnmount == "function") try {
            Ke.onCommitFiberUnmount(Fl, n);
        } catch (i) {
        }
        switch(n.tag){
            case 0:
            case 11:
            case 14:
            case 15:
            case 22:
                if (e = n.updateQueue, e !== null && (e = e.lastEffect, e !== null)) {
                    var t = e = e.next;
                    do {
                        var r = t, l = r.destroy;
                        if (r = r.tag, l !== void 0) if ((r & 4) != 0) vs(n, t);
                        else {
                            r = n;
                            try {
                                l();
                            } catch (i) {
                                Ve(r, i);
                            }
                        }
                        t = t.next;
                    }while (t !== e)
                }
                break;
            case 1:
                if (ns(n), e = n.stateNode, typeof e.componentWillUnmount == "function") try {
                    e.props = n.memoizedProps, e.state = n.memoizedState, e.componentWillUnmount();
                } catch (i1) {
                    Ve(n, i1);
                }
                break;
            case 5:
                ns(n);
                break;
            case 4:
                us(e, n);
        }
    }
    function ls(e) {
        e.alternate = null, e.child = null, e.dependencies = null, e.firstEffect = null, e.lastEffect = null, e.memoizedProps = null, e.memoizedState = null, e.pendingProps = null, e.return = null, e.updateQueue = null;
    }
    function is(e) {
        return e.tag === 5 || e.tag === 3 || e.tag === 4;
    }
    function os(e) {
        e: {
            for(var n = e.return; n !== null;){
                if (is(n)) break e;
                n = n.return;
            }
            throw Error(v(160));
        }
        var t = n;
        switch(n = t.stateNode, t.tag){
            case 5:
                var r = !1;
                break;
            case 3:
                n = n.containerInfo, r = !0;
                break;
            case 4:
                n = n.containerInfo, r = !0;
                break;
            default:
                throw Error(v(161));
        }
        t.flags & 16 && (jn(n, ""), t.flags &= -17);
        e: n: for(t = e;;){
            for(; t.sibling === null;){
                if (t.return === null || is(t.return)) {
                    t = null;
                    break e;
                }
                t = t.return;
            }
            for(t.sibling.return = t.return, t = t.sibling; t.tag !== 5 && t.tag !== 6 && t.tag !== 18;){
                if (t.flags & 2 || t.child === null || t.tag === 4) continue n;
                t.child.return = t, t = t.child;
            }
            if (!(t.flags & 2)) {
                t = t.stateNode;
                break e;
            }
        }
        r ? fi(e, t, n) : ci(e, t, n);
    }
    function fi(e, n, t) {
        var r = e.tag, l = r === 5 || r === 6;
        if (l) e = l ? e.stateNode : e.stateNode.instance, n ? t.nodeType === 8 ? t.parentNode.insertBefore(e, n) : t.insertBefore(e, n) : (t.nodeType === 8 ? (n = t.parentNode, n.insertBefore(e, t)) : (n = t, n.appendChild(e)), t = t._reactRootContainer, t != null || n.onclick !== null || (n.onclick = Zt));
        else if (r !== 4 && (e = e.child, e !== null)) for(fi(e, n, t), e = e.sibling; e !== null;)fi(e, n, t), e = e.sibling;
    }
    function ci(e, n, t) {
        var r = e.tag, l = r === 5 || r === 6;
        if (l) e = l ? e.stateNode : e.stateNode.instance, n ? t.insertBefore(e, n) : t.appendChild(e);
        else if (r !== 4 && (e = e.child, e !== null)) for(ci(e, n, t), e = e.sibling; e !== null;)ci(e, n, t), e = e.sibling;
    }
    function us(e, n) {
        for(var t = n, r = !1, l, i;;){
            if (!r) {
                r = t.return;
                e: for(;;){
                    if (r === null) throw Error(v(160));
                    switch(l = r.stateNode, r.tag){
                        case 5:
                            i = !1;
                            break e;
                        case 3:
                            l = l.containerInfo, i = !0;
                            break e;
                        case 4:
                            l = l.containerInfo, i = !0;
                            break e;
                    }
                    r = r.return;
                }
                r = !0;
            }
            if (t.tag === 5 || t.tag === 6) {
                e: for(var o = e, u = t, s = u;;)if (rs(o, s), s.child !== null && s.tag !== 4) s.child.return = s, s = s.child;
                else {
                    if (s === u) break e;
                    for(; s.sibling === null;){
                        if (s.return === null || s.return === u) break e;
                        s = s.return;
                    }
                    s.sibling.return = s.return, s = s.sibling;
                }
                i ? (o = l, u = t.stateNode, o.nodeType === 8 ? o.parentNode.removeChild(u) : o.removeChild(u)) : l.removeChild(t.stateNode);
            } else if (t.tag === 4) {
                if (t.child !== null) {
                    l = t.stateNode.containerInfo, i = !0, t.child.return = t, t = t.child;
                    continue;
                }
            } else if (rs(e, t), t.child !== null) {
                t.child.return = t, t = t.child;
                continue;
            }
            if (t === n) break;
            for(; t.sibling === null;){
                if (t.return === null || t.return === n) return;
                t = t.return, t.tag === 4 && (r = !1);
            }
            t.sibling.return = t.return, t = t.sibling;
        }
    }
    function di(e, n) {
        switch(n.tag){
            case 0:
            case 11:
            case 14:
            case 15:
            case 22:
                var t = n.updateQueue;
                if (t = t !== null ? t.lastEffect : null, t !== null) {
                    var r = t = t.next;
                    do (r.tag & 3) == 3 && (e = r.destroy, r.destroy = void 0, e !== void 0 && e()), r = r.next;
                    while (r !== t)
                }
                return;
            case 1:
                return;
            case 5:
                if (t = n.stateNode, t != null) {
                    r = n.memoizedProps;
                    var l = e !== null ? e.memoizedProps : r;
                    e = n.type;
                    var i = n.updateQueue;
                    if (n.updateQueue = null, i !== null) {
                        for(t[qt] = r, e === "input" && r.type === "radio" && r.name != null && Qi(t, r), el(e, l), n = el(e, r), l = 0; l < i.length; l += 2){
                            var o = i[l], u = i[l + 1];
                            o === "style" ? qi(t, u) : o === "dangerouslySetInnerHTML" ? Zi(t, u) : o === "children" ? jn(t, u) : Ir(t, o, u, n);
                        }
                        switch(e){
                            case "input":
                                Xr(t, r);
                                break;
                            case "textarea":
                                Xi(t, r);
                                break;
                            case "select":
                                e = t._wrapperState.wasMultiple, t._wrapperState.wasMultiple = !!r.multiple, i = r.value, i != null ? rn(t, !!r.multiple, i, !1) : e !== !!r.multiple && (r.defaultValue != null ? rn(t, !!r.multiple, r.defaultValue, !0) : rn(t, !!r.multiple, r.multiple ? [] : "", !1));
                        }
                    }
                }
                return;
            case 6:
                if (n.stateNode === null) throw Error(v(162));
                n.stateNode.nodeValue = n.memoizedProps;
                return;
            case 3:
                t = n.stateNode, t.hydrate && (t.hydrate = !1, ho(t.containerInfo));
                return;
            case 12:
                return;
            case 13:
                n.memoizedState !== null && (yi = A(), ts(n.child, !0)), ss(n);
                return;
            case 19:
                ss(n);
                return;
            case 17:
                return;
            case 23:
            case 24:
                ts(n, n.memoizedState !== null);
                return;
        }
        throw Error(v(163));
    }
    function ss(e) {
        var n = e.updateQueue;
        if (n !== null) {
            e.updateQueue = null;
            var t = e.stateNode;
            t === null && (t = e.stateNode = new lf), n.forEach(function(r) {
                var l = gf.bind(null, e, r);
                t.has(r) || (t.add(r), r.then(l, l));
            });
        }
    }
    function sf(e, n) {
        return e !== null && (e = e.memoizedState, e === null || e.dehydrated !== null) ? (n = n.memoizedState, n !== null && n.dehydrated === null) : !1;
    }
    var af = Math.ceil, Sr = We.ReactCurrentDispatcher, pi = We.ReactCurrentOwner, x = 0, X = null, j = null, $ = 0, be = 0, mi = Le(0), H = 0, Er = null, _n = 0, vt = 0, Nn = 0, hi = 0, vi = null, yi = 0, gi = 1 / 0;
    function Pn() {
        gi = A() + 500;
    }
    var g = null, kr = !1, wi = null, pe = null, Ie = !1, yt = null, gt = 90, Si = [], Ei = [], ge = null, wt = 0, ki = null, xr = -1, we = 0, Cr = 0, St = null, _r = !1;
    function b() {
        return (x & 48) != 0 ? A() : xr !== -1 ? xr : xr = A();
    }
    function Fe(e) {
        if (e = e.mode, (e & 2) == 0) return 1;
        if ((e & 4) == 0) return Sn() === 99 ? 1 : 2;
        if (we === 0 && (we = _n), Ga.transition !== 0) {
            Cr !== 0 && (Cr = vi !== null ? vi.pendingLanes : 0), e = we;
            var n = 4186112 & ~Cr;
            return n &= -n, n === 0 && (e = 4186112 & ~e, n = e & -e, n === 0 && (n = 8192)), n;
        }
        return e = Sn(), (x & 4) != 0 && e === 98 ? e = Ut(12, we) : (e = qs(e), e = Ut(e, we)), e;
    }
    function je(e, n, t) {
        if (50 < wt) throw wt = 0, ki = null, Error(v(185));
        if (e = Nr(e, n), e === null) return null;
        Vt(e, n, t), e === X && (Nn |= n, H === 4 && Tn(e, $));
        var r = Sn();
        n === 1 ? (x & 8) != 0 && (x & 48) == 0 ? xi(e) : (re(e, t), x === 0 && (Pn(), ae())) : ((x & 4) == 0 || r !== 98 && r !== 99 || (ge === null ? ge = new Set([
            e
        ]) : ge.add(e)), re(e, t)), vi = e;
    }
    function Nr(e, n) {
        e.lanes |= n;
        var t = e.alternate;
        for(t !== null && (t.lanes |= n), t = e, e = e.return; e !== null;)e.childLanes |= n, t = e.alternate, t !== null && (t.childLanes |= n), t = e, e = e.return;
        return t.tag === 3 ? t.stateNode : null;
    }
    function re(e, n) {
        for(var t = e.callbackNode, r = e.suspendedLanes, l = e.pingedLanes, i = e.expirationTimes, o = e.pendingLanes; 0 < o;){
            var u = 31 - Ne(o), s = 1 << u, d = i[u];
            if (d === -1) {
                if ((s & r) == 0 || (s & l) != 0) {
                    d = n, an(s);
                    var y = L;
                    i[u] = 10 <= y ? d + 250 : 6 <= y ? d + 5000 : -1;
                }
            } else d <= n && (e.expiredLanes |= s);
            o &= ~s;
        }
        if (r = Yn(e, e === X ? $ : 0), n = L, r === 0) t !== null && (t !== Bl && Ul(t), e.callbackNode = null, e.callbackPriority = 0);
        else {
            if (t !== null) {
                if (e.callbackPriority === n) return;
                t !== Bl && Ul(t);
            }
            n === 15 ? (t = xi.bind(null, e), he === null ? (he = [
                t
            ], rr = jl(tr, pu)) : he.push(t), t = Bl) : n === 14 ? t = rt(99, xi.bind(null, e)) : (t = bs(n), t = rt(t, as.bind(null, e))), e.callbackPriority = n, e.callbackNode = t;
        }
    }
    function as(e) {
        if (xr = -1, Cr = we = 0, (x & 48) != 0) throw Error(v(327));
        var n = e.callbackNode;
        if (Ue() && e.callbackNode !== n) return null;
        var t = Yn(e, e === X ? $ : 0);
        if (t === 0) return null;
        var r = t, l = x;
        x |= 16;
        var i = ps();
        (X !== e || $ !== r) && (Pn(), Ln(e, r));
        do try {
            df();
            break;
        } catch (u) {
            ds(e, u);
        }
        while (1)
        if (Wl(), Sr.current = i, x = l, j !== null ? r = 0 : (X = null, $ = 0, r = H), (_n & Nn) != 0) Ln(e, 0);
        else if (r !== 0) {
            if (r === 2 && (x |= 64, e.hydrate && (e.hydrate = !1, Rl(e.containerInfo)), t = ko(e), t !== 0 && (r = Et(e, t))), r === 1) throw n = Er, Ln(e, 0), Tn(e, t), re(e, A()), n;
            switch(e.finishedWork = e.current.alternate, e.finishedLanes = t, r){
                case 0:
                case 1:
                    throw Error(v(345));
                case 2:
                    en(e);
                    break;
                case 3:
                    if (Tn(e, t), (t & 62914560) === t && (r = yi + 500 - A(), 10 < r)) {
                        if (Yn(e, 0) !== 0) break;
                        if (l = e.suspendedLanes, (l & t) !== t) {
                            b(), e.pingedLanes |= e.suspendedLanes & l;
                            break;
                        }
                        e.timeoutHandle = bo(en.bind(null, e), r);
                        break;
                    }
                    en(e);
                    break;
                case 4:
                    if (Tn(e, t), (t & 4186112) === t) break;
                    for(r = e.eventTimes, l = -1; 0 < t;){
                        var o = 31 - Ne(t);
                        i = 1 << o, o = r[o], o > l && (l = o), t &= ~i;
                    }
                    if (t = l, t = A() - t, t = (120 > t ? 120 : 480 > t ? 480 : 1080 > t ? 1080 : 1920 > t ? 1920 : 3000 > t ? 3000 : 4320 > t ? 4320 : 1960 * af(t / 1960)) - t, 10 < t) {
                        e.timeoutHandle = bo(en.bind(null, e), t);
                        break;
                    }
                    en(e);
                    break;
                case 5:
                    en(e);
                    break;
                default:
                    throw Error(v(329));
            }
        }
        return re(e, A()), e.callbackNode === n ? as.bind(null, e) : null;
    }
    function Tn(e, n) {
        for(n &= ~hi, n &= ~Nn, e.suspendedLanes |= n, e.pingedLanes &= ~n, e = e.expirationTimes; 0 < n;){
            var t = 31 - Ne(n), r = 1 << t;
            e[t] = -1, n &= ~r;
        }
    }
    function xi(e) {
        if ((x & 48) != 0) throw Error(v(327));
        if (Ue(), e === X && (e.expiredLanes & $) != 0) {
            var n = $, t = Et(e, n);
            (_n & Nn) != 0 && (n = Yn(e, n), t = Et(e, n));
        } else n = Yn(e, 0), t = Et(e, n);
        if (e.tag !== 0 && t === 2 && (x |= 64, e.hydrate && (e.hydrate = !1, Rl(e.containerInfo)), n = ko(e), n !== 0 && (t = Et(e, n))), t === 1) throw t = Er, Ln(e, 0), Tn(e, n), re(e, A()), t;
        return e.finishedWork = e.current.alternate, e.finishedLanes = n, en(e), re(e, A()), null;
    }
    function ff() {
        if (ge !== null) {
            var e = ge;
            ge = null, e.forEach(function(n) {
                n.expiredLanes |= 24 & n.pendingLanes, re(n, A());
            });
        }
        ae();
    }
    function fs(e, n) {
        var t = x;
        x |= 1;
        try {
            return e(n);
        } finally{
            x = t, x === 0 && (Pn(), ae());
        }
    }
    function cs(e, n) {
        var t = x;
        x &= -2, x |= 8;
        try {
            return e(n);
        } finally{
            x = t, x === 0 && (Pn(), ae());
        }
    }
    function Pr(e, n) {
        R(mi, be), be |= n, _n |= n;
    }
    function Ci() {
        be = mi.current, O(mi);
    }
    function Ln(e, n) {
        e.finishedWork = null, e.finishedLanes = 0;
        var t = e.timeoutHandle;
        if (t !== -1 && (e.timeoutHandle = -1, Aa(t)), j !== null) for(t = j.return; t !== null;){
            var r = t;
            switch(r.tag){
                case 1:
                    r = r.type.childContextTypes, r != null && er();
                    break;
                case 3:
                    xn(), O(K), O(W), Zl();
                    break;
                case 5:
                    Xl(r);
                    break;
                case 4:
                    xn();
                    break;
                case 13:
                    O(D);
                    break;
                case 19:
                    O(D);
                    break;
                case 10:
                    Al(r);
                    break;
                case 23:
                case 24:
                    Ci();
            }
            t = t.return;
        }
        X = e, j = Be(e.current, null), $ = be = _n = n, H = 0, Er = null, hi = Nn = vt = 0;
    }
    function ds(e, n) {
        do {
            var t = j;
            try {
                if (Wl(), at.current = gr, mr) {
                    for(var r = I.memoizedState; r !== null;){
                        var l = r.queue;
                        l !== null && (l.pending = null), r = r.next;
                    }
                    mr = !1;
                }
                if (ft = 0, B = Q = I = null, ct = !1, pi.current = null, t === null || t.return === null) {
                    H = 1, Er = n, j = null;
                    break;
                }
                e: {
                    var i = e, o = t.return, u = t, s = n;
                    if (n = $, u.flags |= 2048, u.firstEffect = u.lastEffect = null, s !== null && typeof s == "object" && typeof s.then == "function") {
                        var d = s;
                        if ((u.mode & 2) == 0) {
                            var y = u.alternate;
                            y ? (u.updateQueue = y.updateQueue, u.memoizedState = y.memoizedState, u.lanes = y.lanes) : (u.updateQueue = null, u.memoizedState = null);
                        }
                        var C = (D.current & 1) != 0, h = o;
                        do {
                            var S;
                            if (S = h.tag === 13) {
                                var k = h.memoizedState;
                                if (k !== null) S = k.dehydrated !== null;
                                else {
                                    var E = h.memoizedProps;
                                    S = E.fallback === void 0 ? !1 : E.unstable_avoidThisFallback !== !0 ? !0 : !C;
                                }
                            }
                            if (S) {
                                var c = h.updateQueue;
                                if (c === null) {
                                    var a = new Set;
                                    a.add(d), h.updateQueue = a;
                                } else c.add(d);
                                if ((h.mode & 2) == 0) {
                                    if (h.flags |= 64, u.flags |= 16384, u.flags &= -2981, u.tag === 1) if (u.alternate === null) u.tag = 17;
                                    else {
                                        var f = Me(-1, 1);
                                        f.tag = 2, Re(u, f);
                                    }
                                    u.lanes |= 1;
                                    break e;
                                }
                                s = void 0, u = n;
                                var p = i.pingCache;
                                if (p === null ? (p = i.pingCache = new rf, s = new Set, p.set(d, s)) : (s = p.get(d), s === void 0 && (s = new Set, p.set(d, s))), !s.has(u)) {
                                    s.add(u);
                                    var m = yf.bind(null, i, d, u);
                                    d.then(m, m);
                                }
                                h.flags |= 4096, h.lanes = n;
                                break e;
                            }
                            h = h.return;
                        }while (h !== null)
                        s = Error((tn(u.type) || "A React component") + ` suspended while rendering, but no fallback UI was specified.

Add a <Suspense fallback=...> component higher in the tree to provide a loading indicator or placeholder to display.`);
                    }
                    H !== 5 && (H = 2), s = si(s, u), h = o;
                    do {
                        switch(h.tag){
                            case 3:
                                i = s, h.flags |= 4096, n &= -n, h.lanes |= n;
                                var _ = bu(h, i, n);
                                vu(h, _);
                                break e;
                            case 1:
                                i = s;
                                var w = h.type, N = h.stateNode;
                                if ((h.flags & 64) == 0 && (typeof w.getDerivedStateFromError == "function" || N !== null && typeof N.componentDidCatch == "function" && (pe === null || !pe.has(N)))) {
                                    h.flags |= 4096, n &= -n, h.lanes |= n;
                                    var T = es(h, i, n);
                                    vu(h, T);
                                    break e;
                                }
                        }
                        h = h.return;
                    }while (h !== null)
                }
                hs(t);
            } catch (P) {
                n = P, j === t && t !== null && (j = t = t.return);
                continue;
            }
            break;
        }while (1)
    }
    function ps() {
        var e = Sr.current;
        return Sr.current = gr, e === null ? gr : e;
    }
    function Et(e, n) {
        var t = x;
        x |= 16;
        var r = ps();
        X === e && $ === n || Ln(e, n);
        do try {
            cf();
            break;
        } catch (l) {
            ds(e, l);
        }
        while (1)
        if (Wl(), x = t, Sr.current = r, j !== null) throw Error(v(261));
        return X = null, $ = 0, H;
    }
    function cf() {
        for(; j !== null;)ms(j);
    }
    function df() {
        for(; j !== null && !Ya();)ms(j);
    }
    function ms(e) {
        var n = gs(e.alternate, e, be);
        e.memoizedProps = e.pendingProps, n === null ? hs(e) : j = n, pi.current = null;
    }
    function hs(e) {
        var n = e;
        do {
            var t = n.alternate;
            if (e = n.return, (n.flags & 2048) == 0) {
                if (t = nf(t, n, be), t !== null) {
                    j = t;
                    return;
                }
                if (t = n, t.tag !== 24 && t.tag !== 23 || t.memoizedState === null || (be & 1073741824) != 0 || (t.mode & 4) == 0) {
                    for(var r = 0, l = t.child; l !== null;)r |= l.lanes | l.childLanes, l = l.sibling;
                    t.childLanes = r;
                }
                e !== null && (e.flags & 2048) == 0 && (e.firstEffect === null && (e.firstEffect = n.firstEffect), n.lastEffect !== null && (e.lastEffect !== null && (e.lastEffect.nextEffect = n.firstEffect), e.lastEffect = n.lastEffect), 1 < n.flags && (e.lastEffect !== null ? e.lastEffect.nextEffect = n : e.firstEffect = n, e.lastEffect = n));
            } else {
                if (t = tf(n), t !== null) {
                    t.flags &= 2047, j = t;
                    return;
                }
                e !== null && (e.firstEffect = e.lastEffect = null, e.flags |= 2048);
            }
            if (n = n.sibling, n !== null) {
                j = n;
                return;
            }
            j = n = e;
        }while (n !== null)
        H === 0 && (H = 5);
    }
    function en(e) {
        var n = Sn();
        return Ge(99, pf.bind(null, e, n)), null;
    }
    function pf(e, n) {
        do Ue();
        while (yt !== null)
        if ((x & 48) != 0) throw Error(v(327));
        var t = e.finishedWork;
        if (t === null) return null;
        if (e.finishedWork = null, e.finishedLanes = 0, t === e.current) throw Error(v(177));
        e.callbackNode = null;
        var r = t.lanes | t.childLanes, l = r, i = e.pendingLanes & ~l;
        e.pendingLanes = l, e.suspendedLanes = 0, e.pingedLanes = 0, e.expiredLanes &= l, e.mutableReadLanes &= l, e.entangledLanes &= l, l = e.entanglements;
        for(var o = e.eventTimes, u = e.expirationTimes; 0 < i;){
            var s = 31 - Ne(i), d = 1 << s;
            l[s] = 0, o[s] = -1, u[s] = -1, i &= ~d;
        }
        if (ge !== null && (r & 24) == 0 && ge.has(e) && ge.delete(e), e === X && (j = X = null, $ = 0), 1 < t.flags ? t.lastEffect !== null ? (t.lastEffect.nextEffect = t, r = t.firstEffect) : r = t : r = t.firstEffect, r !== null) {
            if (l = x, x |= 32, pi.current = null, zl = Bt, o = Ho(), Nl(o)) {
                if ("selectionStart" in o) u = {
                    start: o.selectionStart,
                    end: o.selectionEnd
                };
                else e: if (u = (u = o.ownerDocument) && u.defaultView || window, (d = u.getSelection && u.getSelection()) && d.rangeCount !== 0) {
                    u = d.anchorNode, i = d.anchorOffset, s = d.focusNode, d = d.focusOffset;
                    try {
                        u.nodeType, s.nodeType;
                    } catch (P) {
                        u = null;
                        break e;
                    }
                    var y = 0, C = -1, h = -1, S = 0, k = 0, E = o, c = null;
                    n: for(;;){
                        for(var a; E !== u || i !== 0 && E.nodeType !== 3 || (C = y + i), E !== s || d !== 0 && E.nodeType !== 3 || (h = y + d), E.nodeType === 3 && (y += E.nodeValue.length), (a = E.firstChild) !== null;)c = E, E = a;
                        for(;;){
                            if (E === o) break n;
                            if (c === u && ++S === i && (C = y), c === s && ++k === d && (h = y), (a = E.nextSibling) !== null) break;
                            E = c, c = E.parentNode;
                        }
                        E = a;
                    }
                    u = C === -1 || h === -1 ? null : {
                        start: C,
                        end: h
                    };
                } else u = null;
                u = u || {
                    start: 0,
                    end: 0
                };
            } else u = null;
            Ol = {
                focusedElem: o,
                selectionRange: u
            }, Bt = !1, St = null, _r = !1, g = r;
            do try {
                mf();
            } catch (P) {
                if (g === null) throw Error(v(330));
                Ve(g, P), g = g.nextEffect;
            }
            while (g !== null)
            St = null, g = r;
            do try {
                for(o = e; g !== null;){
                    var f = g.flags;
                    if (f & 16 && jn(g.stateNode, ""), f & 128) {
                        var p = g.alternate;
                        if (p !== null) {
                            var m = p.ref;
                            m !== null && (typeof m == "function" ? m(null) : m.current = null);
                        }
                    }
                    switch(f & 1038){
                        case 2:
                            os(g), g.flags &= -3;
                            break;
                        case 6:
                            os(g), g.flags &= -3, di(g.alternate, g);
                            break;
                        case 1024:
                            g.flags &= -1025;
                            break;
                        case 1028:
                            g.flags &= -1025, di(g.alternate, g);
                            break;
                        case 4:
                            di(g.alternate, g);
                            break;
                        case 8:
                            u = g, us(o, u);
                            var _ = u.alternate;
                            ls(u), _ !== null && ls(_);
                    }
                    g = g.nextEffect;
                }
            } catch (P1) {
                if (g === null) throw Error(v(330));
                Ve(g, P1), g = g.nextEffect;
            }
            while (g !== null)
            if (m = Ol, p = Ho(), f = m.focusedElem, o = m.selectionRange, p !== f && f && f.ownerDocument && Bo(f.ownerDocument.documentElement, f)) {
                for(o !== null && Nl(f) && (p = o.start, m = o.end, m === void 0 && (m = p), ("selectionStart" in f) ? (f.selectionStart = p, f.selectionEnd = Math.min(m, f.value.length)) : (m = (p = f.ownerDocument || document) && p.defaultView || window, m.getSelection && (m = m.getSelection(), u = f.textContent.length, _ = Math.min(o.start, u), o = o.end === void 0 ? _ : Math.min(o.end, u), !m.extend && _ > o && (u = o, o = _, _ = u), u = Vo(f, _), i = Vo(f, o), u && i && (m.rangeCount !== 1 || m.anchorNode !== u.node || m.anchorOffset !== u.offset || m.focusNode !== i.node || m.focusOffset !== i.offset) && (p = p.createRange(), p.setStart(u.node, u.offset), m.removeAllRanges(), _ > o ? (m.addRange(p), m.extend(i.node, i.offset)) : (p.setEnd(i.node, i.offset), m.addRange(p)))))), p = [], m = f; m = m.parentNode;)m.nodeType === 1 && p.push({
                    element: m,
                    left: m.scrollLeft,
                    top: m.scrollTop
                });
                for(typeof f.focus == "function" && f.focus(), f = 0; f < p.length; f++)m = p[f], m.element.scrollLeft = m.left, m.element.scrollTop = m.top;
            }
            Bt = !!zl, Ol = zl = null, e.current = t, g = r;
            do try {
                for(f = e; g !== null;){
                    var w = g.flags;
                    if (w & 36 && uf(f, g.alternate, g), w & 128) {
                        p = void 0;
                        var N = g.ref;
                        if (N !== null) {
                            var T = g.stateNode;
                            switch(g.tag){
                                case 5:
                                    p = T;
                                    break;
                                default:
                                    p = T;
                            }
                            typeof N == "function" ? N(p) : N.current = p;
                        }
                    }
                    g = g.nextEffect;
                }
            } catch (P2) {
                if (g === null) throw Error(v(330));
                Ve(g, P2), g = g.nextEffect;
            }
            while (g !== null)
            g = null, Ka(), x = l;
        } else e.current = t;
        if (Ie) Ie = !1, yt = e, gt = n;
        else for(g = r; g !== null;)n = g.nextEffect, g.nextEffect = null, g.flags & 8 && (w = g, w.sibling = null, w.stateNode = null), g = n;
        if (r = e.pendingLanes, r === 0 && (pe = null), r === 1 ? e === ki ? wt++ : (wt = 0, ki = e) : wt = 0, t = t.stateNode, Ke && typeof Ke.onCommitFiberRoot == "function") try {
            Ke.onCommitFiberRoot(Fl, t, void 0, (t.current.flags & 64) == 64);
        } catch (P) {
        }
        if (re(e, A()), kr) throw kr = !1, e = wi, wi = null, e;
        return (x & 8) != 0 || ae(), null;
    }
    function mf() {
        for(; g !== null;){
            var e = g.alternate;
            _r || St === null || ((g.flags & 8) != 0 ? uo(g, St) && (_r = !0) : g.tag === 13 && sf(e, g) && uo(g, St) && (_r = !0));
            var n = g.flags;
            (n & 256) != 0 && of(e, g), (n & 512) == 0 || Ie || (Ie = !0, rt(97, function() {
                return Ue(), null;
            })), g = g.nextEffect;
        }
    }
    function Ue() {
        if (gt !== 90) {
            var e = 97 < gt ? 97 : gt;
            return gt = 90, Ge(e, vf);
        }
        return !1;
    }
    function hf(e, n) {
        Si.push(n, e), Ie || (Ie = !0, rt(97, function() {
            return Ue(), null;
        }));
    }
    function vs(e, n) {
        Ei.push(n, e), Ie || (Ie = !0, rt(97, function() {
            return Ue(), null;
        }));
    }
    function vf() {
        if (yt === null) return !1;
        var e = yt;
        if (yt = null, (x & 48) != 0) throw Error(v(331));
        var n = x;
        x |= 32;
        var t = Ei;
        Ei = [];
        for(var r = 0; r < t.length; r += 2){
            var l = t[r], i = t[r + 1], o = l.destroy;
            if (l.destroy = void 0, typeof o == "function") try {
                o();
            } catch (s) {
                if (i === null) throw Error(v(330));
                Ve(i, s);
            }
        }
        for(t = Si, Si = [], r = 0; r < t.length; r += 2){
            l = t[r], i = t[r + 1];
            try {
                var u = l.create;
                l.destroy = u();
            } catch (s) {
                if (i === null) throw Error(v(330));
                Ve(i, s);
            }
        }
        for(u = e.current.firstEffect; u !== null;)e = u.nextEffect, u.nextEffect = null, u.flags & 8 && (u.sibling = null, u.stateNode = null), u = e;
        return x = n, ae(), !0;
    }
    function ys(e, n, t) {
        n = si(t, n), n = bu(e, n, 1), Re(e, n), n = b(), e = Nr(e, 1), e !== null && (Vt(e, 1, n), re(e, n));
    }
    function Ve(e, n) {
        if (e.tag === 3) ys(e, e, n);
        else for(var t = e.return; t !== null;){
            if (t.tag === 3) {
                ys(t, e, n);
                break;
            } else if (t.tag === 1) {
                var r = t.stateNode;
                if (typeof t.type.getDerivedStateFromError == "function" || typeof r.componentDidCatch == "function" && (pe === null || !pe.has(r))) {
                    e = si(n, e);
                    var l = es(t, e, 1);
                    if (Re(t, l), l = b(), t = Nr(t, 1), t !== null) Vt(t, 1, l), re(t, l);
                    else if (typeof r.componentDidCatch == "function" && (pe === null || !pe.has(r))) try {
                        r.componentDidCatch(n, e);
                    } catch (i) {
                    }
                    break;
                }
            }
            t = t.return;
        }
    }
    function yf(e, n, t) {
        var r = e.pingCache;
        r !== null && r.delete(n), n = b(), e.pingedLanes |= e.suspendedLanes & t, X === e && ($ & t) === t && (H === 4 || H === 3 && ($ & 62914560) === $ && 500 > A() - yi ? Ln(e, 0) : hi |= t), re(e, n);
    }
    function gf(e, n) {
        var t = e.stateNode;
        t !== null && t.delete(n), n = 0, n === 0 && (n = e.mode, (n & 2) == 0 ? n = 1 : (n & 4) == 0 ? n = Sn() === 99 ? 1 : 2 : (we === 0 && (we = _n), n = fn(62914560 & ~we), n === 0 && (n = 4194304))), t = b(), e = Nr(e, n), e !== null && (Vt(e, n, t), re(e, t));
    }
    var gs;
    gs = function(e, n, t) {
        var r = n.lanes;
        if (e !== null) if (e.memoizedProps !== n.pendingProps || K.current) ue = !0;
        else if ((t & r) != 0) ue = (e.flags & 16384) != 0;
        else {
            switch(ue = !1, n.tag){
                case 3:
                    Au(n), Gl();
                    break;
                case 5:
                    Cu(n);
                    break;
                case 1:
                    G(n.type) && nr(n);
                    break;
                case 4:
                    Yl(n, n.stateNode.containerInfo);
                    break;
                case 10:
                    r = n.memoizedProps.value;
                    var l = n.type._context;
                    R(lr, l._currentValue), l._currentValue = r;
                    break;
                case 13:
                    if (n.memoizedState !== null) return (t & n.child.childLanes) != 0 ? Qu(e, n, t) : (R(D, D.current & 1), n = ye(e, n, t), n !== null ? n.sibling : null);
                    R(D, D.current & 1);
                    break;
                case 19:
                    if (r = (t & n.childLanes) != 0, (e.flags & 64) != 0) {
                        if (r) return Gu(e, n, t);
                        n.flags |= 64;
                    }
                    if (l = n.memoizedState, l !== null && (l.rendering = null, l.tail = null, l.lastEffect = null), R(D, D.current), r) break;
                    return null;
                case 23:
                case 24:
                    return n.lanes = 0, ri(e, n, t);
            }
            return ye(e, n, t);
        }
        else ue = !1;
        switch(n.lanes = 0, n.tag){
            case 2:
                if (r = n.type, e !== null && (e.alternate = null, n.alternate = null, n.flags |= 2), e = n.pendingProps, l = wn(n, W.current), kn(n, t), l = ql(null, n, r, e, l, t), n.flags |= 1, typeof l == "object" && l !== null && typeof l.render == "function" && l.$$typeof === void 0) {
                    if (n.tag = 1, n.memoizedState = null, n.updateQueue = null, G(r)) {
                        var i = !0;
                        nr(n);
                    } else i = !1;
                    n.memoizedState = l.state !== null && l.state !== void 0 ? l.state : null, Ql(n);
                    var o = r.getDerivedStateFromProps;
                    typeof o == "function" && ur(n, r, o, e), l.updater = sr, n.stateNode = l, l._reactInternals = n, $l(n, r, e, t), n = ii(null, n, r, !0, i, t);
                } else n.tag = 0, J(null, n, l, t), n = n.child;
                return n;
            case 16:
                l = n.elementType;
                e: {
                    switch(e !== null && (e.alternate = null, n.alternate = null, n.flags |= 2), e = n.pendingProps, i = l._init, l = i(l._payload), n.type = l, i = n.tag = Sf(l), e = oe(l, e), i){
                        case 0:
                            n = li(null, n, l, e, t);
                            break e;
                        case 1:
                            n = Wu(null, n, l, e, t);
                            break e;
                        case 11:
                            n = Uu(null, n, l, e, t);
                            break e;
                        case 14:
                            n = Vu(null, n, l, oe(l.type, e), r, t);
                            break e;
                    }
                    throw Error(v(306, l, ""));
                }
                return n;
            case 0:
                return r = n.type, l = n.pendingProps, l = n.elementType === r ? l : oe(r, l), li(e, n, r, l, t);
            case 1:
                return r = n.type, l = n.pendingProps, l = n.elementType === r ? l : oe(r, l), Wu(e, n, r, l, t);
            case 3:
                if (Au(n), r = n.updateQueue, e === null || r === null) throw Error(v(282));
                if (r = n.pendingProps, l = n.memoizedState, l = l !== null ? l.element : null, hu(e, n), lt(n, r, null, t), r = n.memoizedState.element, r === l) Gl(), n = ye(e, n, t);
                else {
                    if (l = n.stateNode, (i = l.hydrate) && (De = hn(n.stateNode.containerInfo.firstChild), ve = n, i = ce = !0), i) {
                        if (e = l.mutableSourceEagerHydrationData, e != null) for(l = 0; l < e.length; l += 2)i = e[l], i._workInProgressVersionPrimary = e[l + 1], Cn.push(i);
                        for(t = xu(n, null, r, t), n.child = t; t;)t.flags = t.flags & -3 | 1024, t = t.sibling;
                    } else J(e, n, r, t), Gl();
                    n = n.child;
                }
                return n;
            case 5:
                return Cu(n), e === null && Kl(n), r = n.type, l = n.pendingProps, i = e !== null ? e.memoizedProps : null, o = l.children, Ml(r, l) ? o = null : i !== null && Ml(r, i) && (n.flags |= 16), Hu(e, n), J(e, n, o, t), n.child;
            case 6:
                return e === null && Kl(n), null;
            case 13:
                return Qu(e, n, t);
            case 4:
                return Yl(n, n.stateNode.containerInfo), r = n.pendingProps, e === null ? n.child = cr(n, null, r, t) : J(e, n, r, t), n.child;
            case 11:
                return r = n.type, l = n.pendingProps, l = n.elementType === r ? l : oe(r, l), Uu(e, n, r, l, t);
            case 7:
                return J(e, n, n.pendingProps, t), n.child;
            case 8:
                return J(e, n, n.pendingProps.children, t), n.child;
            case 12:
                return J(e, n, n.pendingProps.children, t), n.child;
            case 10:
                e: {
                    r = n.type._context, l = n.pendingProps, o = n.memoizedProps, i = l.value;
                    var u = n.type._context;
                    if (R(lr, u._currentValue), u._currentValue = i, o !== null) if (u = o.value, i = ee(u, i) ? 0 : (typeof r._calculateChangedBits == "function" ? r._calculateChangedBits(u, i) : 1073741823) | 0, i === 0) {
                        if (o.children === l.children && !K.current) {
                            n = ye(e, n, t);
                            break e;
                        }
                    } else for(u = n.child, u !== null && (u.return = n); u !== null;){
                        var s = u.dependencies;
                        if (s !== null) {
                            o = u.child;
                            for(var d = s.firstContext; d !== null;){
                                if (d.context === r && (d.observedBits & i) != 0) {
                                    u.tag === 1 && (d = Me(-1, t & -t), d.tag = 2, Re(u, d)), u.lanes |= t, d = u.alternate, d !== null && (d.lanes |= t), mu(u.return, t), s.lanes |= t;
                                    break;
                                }
                                d = d.next;
                            }
                        } else o = u.tag === 10 && u.type === n.type ? null : u.child;
                        if (o !== null) o.return = u;
                        else for(o = u; o !== null;){
                            if (o === n) {
                                o = null;
                                break;
                            }
                            if (u = o.sibling, u !== null) {
                                u.return = o.return, o = u;
                                break;
                            }
                            o = o.return;
                        }
                        u = o;
                    }
                    J(e, n, l.children, t), n = n.child;
                }
                return n;
            case 9:
                return l = n.type, i = n.pendingProps, r = i.children, kn(n, t), l = ne(l, i.unstable_observedBits), r = r(l), n.flags |= 1, J(e, n, r, t), n.child;
            case 14:
                return l = n.type, i = oe(l, n.pendingProps), i = oe(l.type, i), Vu(e, n, l, i, r, t);
            case 15:
                return Bu(e, n, n.type, n.pendingProps, r, t);
            case 17:
                return r = n.type, l = n.pendingProps, l = n.elementType === r ? l : oe(r, l), e !== null && (e.alternate = null, n.alternate = null, n.flags |= 2), n.tag = 1, G(r) ? (e = !0, nr(n)) : e = !1, kn(n, t), Su(n, r, l), $l(n, r, l, t), ii(null, n, r, !0, e, t);
            case 19:
                return Gu(e, n, t);
            case 23:
                return ri(e, n, t);
            case 24:
                return ri(e, n, t);
        }
        throw Error(v(156, n.tag));
    };
    function wf(e, n, t, r) {
        this.tag = e, this.key = t, this.sibling = this.child = this.return = this.stateNode = this.type = this.elementType = null, this.index = 0, this.ref = null, this.pendingProps = n, this.dependencies = this.memoizedState = this.updateQueue = this.memoizedProps = null, this.mode = r, this.flags = 0, this.lastEffect = this.firstEffect = this.nextEffect = null, this.childLanes = this.lanes = 0, this.alternate = null;
    }
    function le(e, n, t, r) {
        return new wf(e, n, t, r);
    }
    function _i(e) {
        return e = e.prototype, !(!e || !e.isReactComponent);
    }
    function Sf(e) {
        if (typeof e == "function") return _i(e) ? 1 : 0;
        if (e != null) {
            if (e = e.$$typeof, e === Nt) return 11;
            if (e === Tt) return 14;
        }
        return 2;
    }
    function Be(e, n) {
        var t = e.alternate;
        return t === null ? (t = le(e.tag, n, e.key, e.mode), t.elementType = e.elementType, t.type = e.type, t.stateNode = e.stateNode, t.alternate = e, e.alternate = t) : (t.pendingProps = n, t.type = e.type, t.flags = 0, t.nextEffect = null, t.firstEffect = null, t.lastEffect = null), t.childLanes = e.childLanes, t.lanes = e.lanes, t.child = e.child, t.memoizedProps = e.memoizedProps, t.memoizedState = e.memoizedState, t.updateQueue = e.updateQueue, n = e.dependencies, t.dependencies = n === null ? null : {
            lanes: n.lanes,
            firstContext: n.firstContext
        }, t.sibling = e.sibling, t.index = e.index, t.ref = e.ref, t;
    }
    function Tr(e, n, t, r, l, i) {
        var o = 2;
        if (r = e, typeof e == "function") _i(e) && (o = 1);
        else if (typeof e == "string") o = 5;
        else e: switch(e){
            case Ee:
                return zn(t.children, l, i, n);
            case Vi:
                o = 8, l |= 16;
                break;
            case Fr:
                o = 8, l |= 1;
                break;
            case Rn:
                return e = le(12, t, n, l | 8), e.elementType = Rn, e.type = Rn, e.lanes = i, e;
            case Dn:
                return e = le(13, t, n, l), e.type = Dn, e.elementType = Dn, e.lanes = i, e;
            case Pt:
                return e = le(19, t, n, l), e.elementType = Pt, e.lanes = i, e;
            case Wr:
                return Ni(t, l, i, n);
            case Ar:
                return e = le(24, t, n, l), e.elementType = Ar, e.lanes = i, e;
            default:
                if (typeof e == "object" && e !== null) switch(e.$$typeof){
                    case jr:
                        o = 10;
                        break e;
                    case Ur:
                        o = 9;
                        break e;
                    case Nt:
                        o = 11;
                        break e;
                    case Tt:
                        o = 14;
                        break e;
                    case Vr:
                        o = 16, r = null;
                        break e;
                    case Br:
                        o = 22;
                        break e;
                }
                throw Error(v(130, e == null ? e : typeof e, ""));
        }
        return n = le(o, t, n, l), n.elementType = e, n.type = r, n.lanes = i, n;
    }
    function zn(e, n, t, r) {
        return e = le(7, e, r, n), e.lanes = t, e;
    }
    function Ni(e, n, t, r) {
        return e = le(23, e, r, n), e.elementType = Wr, e.lanes = t, e;
    }
    function Pi(e, n, t) {
        return e = le(6, e, null, n), e.lanes = t, e;
    }
    function Ti(e, n, t) {
        return n = le(4, e.children !== null ? e.children : [], e.key, n), n.lanes = t, n.stateNode = {
            containerInfo: e.containerInfo,
            pendingChildren: null,
            implementation: e.implementation
        }, n;
    }
    function Ef(e, n, t) {
        this.tag = n, this.containerInfo = e, this.finishedWork = this.pingCache = this.current = this.pendingChildren = null, this.timeoutHandle = -1, this.pendingContext = this.context = null, this.hydrate = t, this.callbackNode = null, this.callbackPriority = 0, this.eventTimes = hl(0), this.expirationTimes = hl(-1), this.entangledLanes = this.finishedLanes = this.mutableReadLanes = this.expiredLanes = this.pingedLanes = this.suspendedLanes = this.pendingLanes = 0, this.entanglements = hl(0), this.mutableSourceEagerHydrationData = null;
    }
    function kf(e, n, t) {
        var r = 3 < arguments.length && arguments[3] !== void 0 ? arguments[3] : null;
        return {
            $$typeof: Ae,
            key: r == null ? null : "" + r,
            children: e,
            containerInfo: n,
            implementation: t
        };
    }
    function Lr(e, n, t, r) {
        var l = n.current, i = b(), o = Fe(l);
        e: if (t) {
            t = t._reactInternals;
            n: {
                if ($e(t) !== t || t.tag !== 1) throw Error(v(170));
                var u = t;
                do {
                    switch(u.tag){
                        case 3:
                            u = u.stateNode.context;
                            break n;
                        case 1:
                            if (G(u.type)) {
                                u = u.stateNode.__reactInternalMemoizedMergedChildContext;
                                break n;
                            }
                    }
                    u = u.return;
                }while (u !== null)
                throw Error(v(171));
            }
            if (t.tag === 1) {
                var s = t.type;
                if (G(s)) {
                    t = lu(t, s, u);
                    break e;
                }
            }
            t = u;
        } else t = ze;
        return n.context === null ? n.context = t : n.pendingContext = t, n = Me(i, o), n.payload = {
            element: e
        }, r = r === void 0 ? null : r, r !== null && (n.callback = r), Re(l, n), je(l, o, i), o;
    }
    function Li(e) {
        if (e = e.current, !e.child) return null;
        switch(e.child.tag){
            case 5:
                return e.child.stateNode;
            default:
                return e.child.stateNode;
        }
    }
    function ws(e, n) {
        if (e = e.memoizedState, e !== null && e.dehydrated !== null) {
            var t = e.retryLane;
            e.retryLane = t !== 0 && t < n ? t : n;
        }
    }
    function zi(e, n) {
        ws(e, n), (e = e.alternate) && ws(e, n);
    }
    function xf() {
        return null;
    }
    function Oi(e, n, t) {
        var r = t != null && t.hydrationOptions != null && t.hydrationOptions.mutableSources || null;
        if (t = new Ef(e, n, t != null && t.hydrate === !0), n = le(3, null, null, n === 2 ? 7 : n === 1 ? 3 : 0), t.current = n, n.stateNode = t, Ql(n), e[vn] = t.current, Xo(e.nodeType === 8 ? e.parentNode : e), r) for(e = 0; e < r.length; e++){
            n = r[e];
            var l = n._getVersion;
            l = l(n._source), t.mutableSourceEagerHydrationData == null ? t.mutableSourceEagerHydrationData = [
                n,
                l
            ] : t.mutableSourceEagerHydrationData.push(n, l);
        }
        this._internalRoot = t;
    }
    Oi.prototype.render = function(e) {
        Lr(e, this._internalRoot, null, null);
    };
    Oi.prototype.unmount = function() {
        var e = this._internalRoot, n = e.containerInfo;
        Lr(null, e, null, function() {
            n[vn] = null;
        });
    };
    function kt(e) {
        return !(!e || e.nodeType !== 1 && e.nodeType !== 9 && e.nodeType !== 11 && (e.nodeType !== 8 || e.nodeValue !== " react-mount-point-unstable "));
    }
    function Cf(e, n) {
        if (n || (n = e ? e.nodeType === 9 ? e.documentElement : e.firstChild : null, n = !(!n || n.nodeType !== 1 || !n.hasAttribute("data-reactroot"))), !n) for(var t; t = e.lastChild;)e.removeChild(t);
        return new Oi(e, 0, n ? {
            hydrate: !0
        } : void 0);
    }
    function zr(e, n, t, r, l) {
        var i = t._reactRootContainer;
        if (i) {
            var o = i._internalRoot;
            if (typeof l == "function") {
                var u = l;
                l = function() {
                    var d = Li(o);
                    u.call(d);
                };
            }
            Lr(n, o, e, l);
        } else {
            if (i = t._reactRootContainer = Cf(t, r), o = i._internalRoot, typeof l == "function") {
                var s = l;
                l = function() {
                    var d = Li(o);
                    s.call(d);
                };
            }
            cs(function() {
                Lr(n, o, e, l);
            });
        }
        return Li(o);
    }
    so = function(e) {
        if (e.tag === 13) {
            var n = b();
            je(e, 4, n), zi(e, 4);
        }
    };
    al = function(e) {
        if (e.tag === 13) {
            var n = b();
            je(e, 67108864, n), zi(e, 67108864);
        }
    };
    ao = function(e) {
        if (e.tag === 13) {
            var n = b(), t = Fe(e);
            je(e, t, n), zi(e, t);
        }
    };
    fo = function(e, n) {
        return n();
    };
    tl = function(e, n, t) {
        switch(n){
            case "input":
                if (Xr(e, t), n = t.name, t.type === "radio" && n != null) {
                    for(t = e; t.parentNode;)t = t.parentNode;
                    for(t = t.querySelectorAll("input[name=" + JSON.stringify("" + n) + '][type="radio"]'), n = 0; n < t.length; n++){
                        var r = t[n];
                        if (r !== e && r.form === e.form) {
                            var l = bt(r);
                            if (!l) throw Error(v(90));
                            Wi(r), Xr(r, l);
                        }
                    }
                }
                break;
            case "textarea":
                Xi(e, t);
                break;
            case "select":
                n = t.value, n != null && rn(e, !!t.multiple, n, !1);
        }
    };
    rl = fs;
    to = function(e, n, t, r, l) {
        var i = x;
        x |= 4;
        try {
            return Ge(98, e.bind(null, n, t, r, l));
        } finally{
            x = i, x === 0 && (Pn(), ae());
        }
    };
    ll = function() {
        (x & 49) == 0 && (ff(), Ue());
    };
    ro = function(e, n) {
        var t = x;
        x |= 2;
        try {
            return e(n);
        } finally{
            x = t, x === 0 && (Pn(), ae());
        }
    };
    function Ss(e, n) {
        var t = 2 < arguments.length && arguments[2] !== void 0 ? arguments[2] : null;
        if (!kt(n)) throw Error(v(200));
        return kf(e, n, null, t);
    }
    var _f = {
        Events: [
            tt,
            yn,
            bt,
            eo,
            no,
            Ue,
            {
                current: !1
            }
        ]
    }, xt = {
        findFiberByHostInstance: Ye,
        bundleType: 0,
        version: "17.0.2",
        rendererPackageName: "react-dom"
    }, Nf = {
        bundleType: xt.bundleType,
        version: xt.version,
        rendererPackageName: xt.rendererPackageName,
        rendererConfig: xt.rendererConfig,
        overrideHookState: null,
        overrideHookStateDeletePath: null,
        overrideHookStateRenamePath: null,
        overrideProps: null,
        overridePropsDeletePath: null,
        overridePropsRenamePath: null,
        setSuspenseHandler: null,
        scheduleUpdate: null,
        currentDispatcherRef: We.ReactCurrentDispatcher,
        findHostInstanceByFiber: function(e) {
            return e = oo(e), e === null ? null : e.stateNode;
        },
        findFiberByHostInstance: xt.findFiberByHostInstance || xf,
        findHostInstancesForRefresh: null,
        scheduleRefresh: null,
        scheduleRoot: null,
        setRefreshHandler: null,
        getCurrentFiber: null
    };
    if (typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ != "undefined" && (Ct = __REACT_DEVTOOLS_GLOBAL_HOOK__, !Ct.isDisabled && Ct.supportsFiber)) try {
        Fl = Ct.inject(Nf), Ke = Ct;
    } catch (e1) {
    }
    var Ct;
    ie.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED = _f;
    ie.createPortal = Ss;
    ie.findDOMNode = function(e) {
        if (e == null) return null;
        if (e.nodeType === 1) return e;
        var n = e._reactInternals;
        if (n === void 0) throw typeof e.render == "function" ? Error(v(188)) : Error(v(268, Object.keys(e)));
        return e = oo(n), e = e === null ? null : e.stateNode, e;
    };
    ie.flushSync = function(e, n) {
        var t = x;
        if ((t & 48) != 0) return e(n);
        x |= 1;
        try {
            if (e) return Ge(99, e.bind(null, n));
        } finally{
            x = t, ae();
        }
    };
    ie.hydrate = function(e, n, t) {
        if (!kt(n)) throw Error(v(200));
        return zr(null, e, n, !0, t);
    };
    ie.render = function(e, n, t) {
        if (!kt(n)) throw Error(v(200));
        return zr(null, e, n, !1, t);
    };
    ie.unmountComponentAtNode = function(e) {
        if (!kt(e)) throw Error(v(40));
        return e._reactRootContainer ? (cs(function() {
            zr(null, null, e, !1, function() {
                e._reactRootContainer = null, e[vn] = null;
            });
        }), !0) : !1;
    };
    ie.unstable_batchedUpdates = fs;
    ie.unstable_createPortal = function(e, n) {
        return Ss(e, n, 2 < arguments.length && arguments[2] !== void 0 ? arguments[2] : null);
    };
    ie.unstable_renderSubtreeIntoContainer = function(e, n, t, r) {
        if (!kt(t)) throw Error(v(200));
        if (e == null || e._reactInternals === void 0) throw Error(v(38));
        return zr(e, n, t, !1, r);
    };
    ie.version = "17.0.2";
});
var Mi = Ri((Of, xs)=>{
    "use strict";
    function ks() {
        if (!(typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ == "undefined" || typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE != "function")) try {
            __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE(ks);
        } catch (e) {
            console.error(e);
        }
    }
    ks(), xs.exports = Es();
});
var Pf = Di(Mi()), { __SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED: Mf , createPortal: Rf , findDOMNode: Df , flushSync: If , hydrate: Ff , render: jf , unmountComponentAtNode: Uf , unstable_batchedUpdates: Vf , unstable_createPortal: Bf , unstable_renderSubtreeIntoContainer: Hf , version: Wf  } = Pf;
const urlTheme = new URLSearchParams(location.search).get("theme");
const isDarkMode = urlTheme ? urlTheme === "dark" ? true : false : window.matchMedia?.("(prefers-color-scheme: dark)").matches;
const deepAssign = (base, ...sources)=>{
    for (const source of sources){
        for(const prop in source){
            const value = source[prop];
            if (typeof value === "object" && value !== null && base[prop]) {
                deepAssign(base[prop], value);
            } else base[prop] = value;
        }
    }
    return base;
};
const theme = {
    monaco: "light",
    variables: {
        "--color-primary": "black",
        "--color-secondary": "#111",
        "--color-tertiary": "#556",
        "--color-number": "#098658",
        "--color-string": "#0000ff",
        "--color-date": "#e07400",
        "--color-focus": "white",
        "--background-primary": "white",
        "--background-secondary": "#f3f3f3",
        "--background-tertiary": "#ececec",
        "--background-focus": "#0060C0",
        "--border-primary": "#eee",
        "--border-secondary": "#ddd"
    },
    panel: {
        container: {
            backgroundColor: "var(--background-primary)",
            color: "var(--color-primary)"
        }
    },
    tabs: {
        container: {
            backgroundColor: "var(--background-secondary)"
        },
        label: {
            base: {
                backgroundColor: "var(--background-tertiary)"
            },
            selected: {
                backgroundColor: "var(--background-primary)"
            }
        }
    },
    divider: {
        backgroundColor: "var(--border-primary)"
    },
    table: {
        container: {
            backgroundColor: "var(--background-primary)"
        },
        cell: {
            border: "1px solid var(--border-secondary)"
        },
        number: {
            color: "var(--color-number)"
        },
        string: {
            color: "var(--color-string)"
        },
        date: {
            color: "var(--color-date)"
        }
    },
    contextMenu: {
        container: {
            backgroundColor: "var(--background-primary)"
        },
        option: {
            color: "var(--color-tertiary)"
        },
        optionHovered: {
            backgroundColor: "var(--background-focus)",
            color: "var(--color-focus)"
        },
        separator: {
            borderBottom: "1px solid var(--border-primary)"
        }
    },
    nav: {
        container: {
            backgroundColor: "var(--background-secondary)"
        }
    },
    tree: {
        guides: {
            base: {
                borderColor: "var(--color-tertiary)"
            }
        }
    },
    input: {
        backgroundColor: "var(--background-primary)",
        border: "1px solid var(--border-primary)",
        color: "var(--color-primary)"
    },
    textSelect: {
        container: {
            backgroundColor: "var(--background-secondary)",
            boxShadow: "0 0 8px 2px var(--border-secondary)"
        },
        option: {
            color: "var(--color-primary)"
        },
        optionFocused: {
            color: "var(--color-focus)",
            backgroundColor: "var(--background-focus)"
        },
        optionHotkey: {
            backgroundColor: "var(--background-tertiary)",
            border: "1px solid var(--border-secondary)",
            boxShadow: "0 1px 1px 0px var(--border-primary)"
        },
        optionHotkeyFocused: {
            backgroundColor: "inherit",
            boxShadow: "none"
        }
    },
    badge: {
        red: {
            backgroundColor: "#B30912",
            color: "white"
        },
        green: {
            backgroundColor: "#33b309",
            color: "white"
        }
    },
    extend: (source)=>{
        deepAssign(theme, source);
        return theme;
    }
};
if (isDarkMode) {
    theme.extend({
        monaco: "vs-dark",
        variables: {
            "--color-primary": "white",
            "--color-secondary": "#eee",
            "--color-tertiary": "#667",
            "--color-number": "#b5cea8",
            "--color-string": "#569cd6",
            "--color-date": "#e07400",
            "--background-primary": "#1e1e1e",
            "--background-secondary": "#252526",
            "--background-tertiary": "#2D2D2D",
            "--background-focus": "#094771",
            "--border-primary": "#6F6F6F",
            "--border-secondary": "#333"
        },
        contextMenu: {
            container: {
                backgroundColor: "var(--background-tertiary)"
            }
        }
    });
}
const Icon = ({ icon , size =16 , ...props })=>export_default4.createElement("img", Object.assign({
        src: `https://raw.githubusercontent.com/icons8/flat-color-icons/8eccbbbd8b2af1d2c9593e7cfba5ecb0d68ee378/svg/${icon}.svg`,
        width: size
    }, props))
;
const Label = ({ children , icon , iconStyle , style  })=>export_default4.createElement("span", {
        style: {
            display: "inline-flex",
            alignItems: "center",
            ...style
        }
    }, export_default4.createElement(Icon, {
        icon: icon,
        style: {
            paddingRight: 2,
            ...iconStyle
        }
    }), children)
;
const Divider = ({ direction , index , fixed  })=>{
    const style = {
    };
    if (direction === "horizontal") {
        style.height = 1;
        if (!fixed) style.cursor = "ns-resize";
    } else {
        style.width = 1;
        if (!fixed) style.cursor = "ew-resize";
    }
    return export_default4.createElement("div", {
        className: "divider",
        style: {
            flexShrink: 0,
            zIndex: 1,
            ...style,
            ...theme.divider
        },
        "data-index": index,
        "data-fixed": fixed
    });
};
const getStoredPanelBasis = (id)=>{
    const value = localStorage.getItem(`panel-${id}-basis`);
    if (!value) return;
    return parseFloat(value);
};
const storePanelBasis = (id, basis)=>{
    localStorage.setItem(`panel-${id}-basis`, basis.toString());
};
const Panel = ({ basis , children , direction ="horizontal" , fixed =false , id , style , title  })=>{
    const [childBasisOverrides, setChildBasisOverrides] = qe(export_default4.Children.map(children, (child)=>export_default4.isValidElement(child) ? getStoredPanelBasis(child.props.id) : undefined
    ) ?? []);
    const dragTarget = Le2();
    const childArr = Ae(()=>export_default4.Children.toArray(children)
    , [
        children
    ]);
    const handleMouseDown = je((e)=>{
        if (e.target instanceof HTMLElement && e.target.classList.contains("divider") && e.target.dataset.fixed !== "true") {
            e.preventDefault();
            e.stopPropagation();
            dragTarget.current = e.target;
        }
    }, []);
    const handleMouseMove = je((e)=>{
        if (!dragTarget.current) return;
        const index = parseInt(dragTarget.current.dataset.index ?? "");
        const previous = dragTarget.current.previousElementSibling;
        const next = dragTarget.current.nextElementSibling;
        const parent = dragTarget.current.parentElement;
        if (!previous || !next || !parent) return;
        const sizeProp = direction === "horizontal" ? "clientWidth" : "clientHeight";
        const diff = (direction === "horizontal" ? e.movementX : e.movementY) / parent[sizeProp];
        if (diff === 0) return;
        const previousNode = childArr[index];
        if (export_default4.isValidElement(previousNode) && previousNode.props.id) {
            storePanelBasis(previousNode.props.id, previous[sizeProp] / parent[sizeProp] + diff);
        }
        const nextNode = childArr[index + 1];
        if (export_default4.isValidElement(nextNode) && nextNode.props.id) {
            storePanelBasis(nextNode.props.id, next[sizeProp] / parent[sizeProp] - diff);
        }
        setChildBasisOverrides([
            ...childBasisOverrides.slice(0, index),
            previous[sizeProp] / parent[sizeProp] + diff,
            next[sizeProp] / parent[sizeProp] - diff,
            ...childBasisOverrides.slice(index + 2), 
        ]);
    }, [
        childArr,
        childBasisOverrides
    ]);
    const handleMouseUp = je(()=>{
        dragTarget.current = undefined;
    }, []);
    const newChildren = [];
    for(let i = 0; i < childArr.length; i++){
        const child = childArr[i];
        const childNode = export_default4.isValidElement(child) ? child : undefined;
        const nextChild = childArr[i + 1];
        const nextChildNode = export_default4.isValidElement(nextChild) ? nextChild : undefined;
        const storedBasis = childBasisOverrides[i];
        newChildren.push(childNode ? export_default4.cloneElement(childNode, {
            basis: ((typeof storedBasis === "number" ? storedBasis * 100 + "%" : undefined) ?? childNode.props.basis) ?? childNode.props.style?.basis
        }) : child);
        if (i < childArr.length - 1) {
            newChildren.push(export_default4.createElement(Divider, {
                key: `divider-${i}`,
                direction: direction === "vertical" ? "horizontal" : "vertical",
                index: i,
                fixed: childNode?.props.fixed || nextChildNode?.props.fixed || false
            }));
        }
    }
    return export_default4.createElement("div", {
        style: {
            display: "flex",
            flexDirection: "column",
            flexBasis: basis ?? style?.flexBasis,
            flexGrow: fixed ? 0 : 1,
            flexShrink: fixed ? 0 : 1,
            overflow: "hidden",
            ...style,
            ...theme.panel.container
        },
        onMouseDown: handleMouseDown,
        onMouseMove: handleMouseMove,
        onMouseUp: handleMouseUp,
        "data-id": id
    }, !!title && export_default4.createElement("div", {
        style: {
            fontWeight: "bold",
            padding: "4 8",
            ...theme.panel.title
        }
    }, title), export_default4.createElement("div", {
        style: {
            flexGrow: 1,
            display: "flex",
            flexDirection: direction === "vertical" ? "column" : "row",
            overflow: "auto",
            ...theme.panel.content
        }
    }, newChildren));
};
function O2(e, t, n) {
    return t in e ? Object.defineProperty(e, t, {
        value: n,
        enumerable: !0,
        configurable: !0,
        writable: !0
    }) : e[t] = n, e;
}
function g2(e, t) {
    var n = Object.keys(e);
    if (Object.getOwnPropertySymbols) {
        var r = Object.getOwnPropertySymbols(e);
        t && (r = r.filter(function(i) {
            return Object.getOwnPropertyDescriptor(e, i).enumerable;
        })), n.push.apply(n, r);
    }
    return n;
}
function v1(e) {
    for(var t = 1; t < arguments.length; t++){
        var n = arguments[t] != null ? arguments[t] : {
        };
        t % 2 ? g2(Object(n), !0).forEach(function(r) {
            O2(e, r, n[r]);
        }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(n)) : g2(Object(n)).forEach(function(r) {
            Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(n, r));
        });
    }
    return e;
}
function y1() {
    for(var e = arguments.length, t = new Array(e), n = 0; n < e; n++)t[n] = arguments[n];
    return function(r) {
        return t.reduceRight(function(i, a) {
            return a(i);
        }, r);
    };
}
function c(e) {
    return function t() {
        for(var n = this, r = arguments.length, i = new Array(r), a = 0; a < r; a++)i[a] = arguments[a];
        return i.length >= e.length ? e.apply(this, i) : function() {
            for(var f = arguments.length, s = new Array(f), o = 0; o < f; o++)s[o] = arguments[o];
            return t.apply(n, [].concat(i, s));
        };
    };
}
function p1(e) {
    return ({
    }).toString.call(e).includes("Object");
}
function m1(e) {
    return !Object.keys(e).length;
}
function l1(e) {
    return typeof e == "function";
}
function j3(e, t) {
    return Object.prototype.hasOwnProperty.call(e, t);
}
function w(e, t) {
    return p1(t) || u("changeType"), Object.keys(t).some(function(n) {
        return !j3(e, n);
    }) && u("changeField"), t;
}
function P9(e) {
    l1(e) || u("selectorType");
}
function T(e) {
    l1(e) || p1(e) || u("handlerType"), p1(e) && Object.values(e).some(function(t) {
        return !l1(t);
    }) && u("handlersType");
}
function S1(e) {
    e || u("initialIsRequired"), p1(e) || u("initialType"), m1(e) && u("initialContent");
}
function E1(e, t) {
    throw new Error(e[t] || e.default);
}
var D1 = {
    initialIsRequired: "initial state is required",
    initialType: "initial state should be an object",
    initialContent: "initial state shouldn't be an empty object",
    handlerType: "handler should be an object or a function",
    handlersType: "all handlers should be a functions",
    selectorType: "selector should be a function",
    changeType: "provided value of changes should be an object",
    changeField: 'it seams you want to change a field in the state which is not specified in the "initial" state',
    default: "an unknown error accured in `state-local` package"
}, u = c(E1)(D1), h2 = {
    changes: w,
    selector: P9,
    handler: T,
    initial: S1
};
function q(e) {
    var t = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {
    };
    h2.initial(e), h2.handler(t);
    var n = {
        current: e
    }, r = c(I)(n, t), i = c(F1)(n), a = c(h2.changes)(e), f = c(C)(n);
    function s() {
        var d = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : function(b) {
            return b;
        };
        return h2.selector(d), d(n.current);
    }
    function o(d) {
        y1(r, i, a, f)(d);
    }
    return [
        s,
        o
    ];
}
function C(e, t) {
    return l1(t) ? t(e.current) : t;
}
function F1(e, t) {
    return e.current = v1(v1({
    }, e.current), t), t;
}
function I(e, t, n) {
    return l1(t) ? t(e.current) : Object.keys(n).forEach(function(r) {
        var i;
        return (i = t[r]) === null || i === void 0 ? void 0 : i.call(t, e.current[r]);
    }), n;
}
var R1 = {
    create: q
}, x = R1;
function x1(r, e, t) {
    return e in r ? Object.defineProperty(r, e, {
        value: t,
        enumerable: !0,
        configurable: !0,
        writable: !0
    }) : r[e] = t, r;
}
function d(r, e) {
    var t = Object.keys(r);
    if (Object.getOwnPropertySymbols) {
        var n = Object.getOwnPropertySymbols(r);
        e && (n = n.filter(function(o) {
            return Object.getOwnPropertyDescriptor(r, o).enumerable;
        })), t.push.apply(t, n);
    }
    return t;
}
function l2(r) {
    for(var e = 1; e < arguments.length; e++){
        var t = arguments[e] != null ? arguments[e] : {
        };
        e % 2 ? d(Object(t), !0).forEach(function(n) {
            x1(r, n, t[n]);
        }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(r, Object.getOwnPropertyDescriptors(t)) : d(Object(t)).forEach(function(n) {
            Object.defineProperty(r, n, Object.getOwnPropertyDescriptor(t, n));
        });
    }
    return r;
}
function m2(r, e) {
    return T1(r) || E2(r, e) || C1(r, e) || _1();
}
function T1(r) {
    if (Array.isArray(r)) return r;
}
function E2(r, e) {
    if (!(typeof Symbol == "undefined" || !(Symbol.iterator in Object(r)))) {
        var t = [], n = !0, o = !1, i = void 0;
        try {
            for(var a = r[Symbol.iterator](), u; !(n = (u = a.next()).done) && (t.push(u.value), !(e && t.length === e)); n = !0);
        } catch (c) {
            o = !0, i = c;
        } finally{
            try {
                !n && a.return != null && a.return();
            } finally{
                if (o) throw i;
            }
        }
        return t;
    }
}
function C1(r, e) {
    if (!!r) {
        if (typeof r == "string") return g3(r, e);
        var t = Object.prototype.toString.call(r).slice(8, -1);
        if (t === "Object" && r.constructor && (t = r.constructor.name), t === "Map" || t === "Set") return Array.from(r);
        if (t === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t)) return g3(r, e);
    }
}
function g3(r, e) {
    (e == null || e > r.length) && (e = r.length);
    for(var t = 0, n = new Array(e); t < e; t++)n[t] = r[t];
    return n;
}
function _1() {
    throw new TypeError(`Invalid attempt to destructure non-iterable instance.
In order to be iterable, non-array objects must have a [Symbol.iterator]() method.`);
}
var M = {
    paths: {
        vs: "https://cdn.jsdelivr.net/npm/monaco-editor@0.25.2/min/vs"
    }
}, v2 = M;
function z3(r) {
    return function e() {
        for(var t = this, n = arguments.length, o = new Array(n), i = 0; i < n; i++)o[i] = arguments[i];
        return o.length >= r.length ? r.apply(this, o) : function() {
            for(var a = arguments.length, u = new Array(a), c = 0; c < a; c++)u[c] = arguments[c];
            return e.apply(t, [].concat(o, u));
        };
    };
}
var b1 = z3;
function D2(r) {
    return ({
    }).toString.call(r).includes("Object");
}
var j4 = D2;
function L(r) {
    return r || h3("configIsRequired"), j4(r) || h3("configType"), r.urls ? (q1(), {
        paths: {
            vs: r.urls.monacoBase
        }
    }) : r;
}
function q1() {
    console.warn(y2.deprecation);
}
function H1(r, e) {
    throw new Error(r[e] || r.default);
}
var y2 = {
    configIsRequired: "the configuration object is required",
    configType: "the configuration object should be an object",
    default: "an unknown error accured in `@monaco-editor/loader` package",
    deprecation: `Deprecation warning!
    You are using deprecated way of configuration.

    Instead of using
      monaco.config({ urls: { monacoBase: '...' } })
    use
      monaco.config({ paths: { vs: '...' } })

    For more please check the link https://github.com/suren-atoyan/monaco-loader#config
  `
}, h3 = b1(H1)(y2), R2 = {
    config: L
}, w1 = R2;
var B1 = function() {
    for(var e = arguments.length, t = new Array(e), n = 0; n < e; n++)t[n] = arguments[n];
    return function(o) {
        return t.reduceRight(function(i, a) {
            return a(i);
        }, o);
    };
}, O3 = B1;
function A(r, e) {
    return Object.keys(e).forEach(function(t) {
        e[t] instanceof Object && r[t] && Object.assign(e[t], A(r[t], e[t]));
    }), l2(l2({
    }, r), e);
}
var S2 = A;
var $1 = {
    type: "cancelation",
    msg: "operation is manually canceled"
};
function N(r) {
    var e = !1, t = new Promise(function(n, o) {
        r.then(function(i) {
            return e ? o($1) : n(i);
        }), r.catch(o);
    });
    return t.cancel = function() {
        return e = !0;
    }, t;
}
var p2 = N;
var F2 = x.create({
    config: v2,
    isInitialized: !1,
    resolve: null,
    reject: null,
    monaco: null
}), I1 = m2(F2, 2), f = I1[0], s1 = I1[1];
function G3(r) {
    s1(function(e) {
        return {
            config: S2(e.config, w1.config(r))
        };
    });
}
function K1() {
    var r = f(function(e) {
        var t = e.isInitialized;
        return {
            isInitialized: t
        };
    });
    if (!r.isInitialized) {
        if (window.monaco && window.monaco.editor) return P1(window.monaco), p2(Promise.resolve(window.monaco));
        O3(U, J2)(Q1), s1({
            isInitialized: !0
        });
    }
    return p2(X2);
}
function U(r) {
    return document.body.appendChild(r);
}
function Y1(r) {
    var e = document.createElement("script");
    return r && (e.src = r), e;
}
function J2(r) {
    var e = f(function(n) {
        var o = n.config, i = n.reject;
        return {
            config: o,
            reject: i
        };
    }), t = Y1("".concat(e.config.paths.vs, "/loader.js"));
    return t.onload = function() {
        return r();
    }, t.onerror = e.reject, t;
}
function Q1() {
    var r = f(function(t) {
        var n = t.config, o = t.resolve, i = t.reject;
        return {
            config: n,
            resolve: o,
            reject: i
        };
    }), e = window.require;
    e.config(r.config), e([
        "vs/editor/editor.main"
    ], function(t) {
        P1(t), r.resolve(t);
    }, function(t) {
        r.reject(t);
    });
}
function P1(r) {
    f().monaco || s1({
        monaco: r
    });
}
function V1() {
    return f(function(r) {
        var e = r.monaco;
        return e;
    });
}
var X2 = new Promise(function(r, e) {
    return s1({
        resolve: r,
        reject: e
    });
}), Z1 = {
    config: G3,
    init: K1,
    __getMonacoInstance: V1
}, k = Z1;
var O4 = Object.create;
var p3 = Object.defineProperty;
var b2 = Object.getOwnPropertyDescriptor;
var P2 = Object.getOwnPropertyNames;
var R3 = Object.getPrototypeOf, _2 = Object.prototype.hasOwnProperty;
var d1 = (e)=>p3(e, "__esModule", {
        value: !0
    })
;
var n = (e, r)=>()=>(r || e((r = {
            exports: {
            }
        }).exports, r), r.exports)
;
var g4 = (e, r, t)=>{
    if (r && typeof r == "object" || typeof r == "function") for (let o of P2(r))!_2.call(e, o) && o !== "default" && p3(e, o, {
        get: ()=>r[o]
        ,
        enumerable: !(t = b2(r, o)) || t.enumerable
    });
    return e;
}, a = (e)=>g4(d1(p3(e != null ? O4(R3(e)) : {
    }, "default", e && e.__esModule && "default" in e ? {
        get: ()=>e.default
        ,
        enumerable: !0
    } : {
        value: e,
        enumerable: !0
    })), e)
;
var y3 = n((q, i)=>{
    "use strict";
    var v = "SECRET_DO_NOT_PASS_THIS_OR_YOU_WILL_BE_FIRED";
    i.exports = v;
});
var h4 = n((w, f)=>{
    "use strict";
    var S = y3();
    function u() {
    }
    function m() {
    }
    m.resetWarningCache = u;
    f.exports = function() {
        function e(o, W, k, C, I, T) {
            if (T !== S) {
                var c = new Error("Calling PropTypes validators directly is not supported by the `prop-types` package. Use PropTypes.checkPropTypes() to call them. Read more at http://fb.me/use-check-prop-types");
                throw c.name = "Invariant Violation", c;
            }
        }
        e.isRequired = e;
        function r() {
            return e;
        }
        var t = {
            array: e,
            bool: e,
            func: e,
            number: e,
            object: e,
            string: e,
            symbol: e,
            any: e,
            arrayOf: r,
            element: e,
            elementType: e,
            instanceOf: r,
            node: e,
            objectOf: r,
            oneOf: r,
            oneOfType: r,
            shape: r,
            exact: r,
            checkPropTypes: m,
            resetWarningCache: u
        };
        return t.PropTypes = t, t;
    };
});
var s2 = n((F, l)=>{
    l.exports = h4()();
    var D, j;
});
var E3 = a(s2());
var export_default5 = E3.default;
var ge1 = {
    display: "flex",
    height: "100%",
    width: "100%",
    justifyContent: "center",
    alignItems: "center"
};
function ye1({ content: e  }) {
    return export_default4.createElement("div", {
        style: ge1
    }, e);
}
var ee2 = ye1;
var he1 = {
    wrapper: {
        display: "flex",
        position: "relative",
        textAlign: "initial"
    },
    fullWidth: {
        width: "100%"
    },
    hide: {
        display: "none"
    }
}, V2 = he1;
function te2({ width: e , height: r , isEditorReady: s , loading: t , _ref: g , className: m , wrapperClassName: v  }) {
    return export_default4.createElement("section", {
        style: {
            ...V2.wrapper,
            width: e,
            height: r
        },
        className: v
    }, !s && export_default4.createElement(ee2, {
        content: t
    }), export_default4.createElement("div", {
        ref: g,
        style: {
            ...V2.fullWidth,
            ...!s && V2.hide
        },
        className: m
    }));
}
te2.propTypes = {
    width: export_default5.oneOfType([
        export_default5.number,
        export_default5.string
    ]).isRequired,
    height: export_default5.oneOfType([
        export_default5.number,
        export_default5.string
    ]).isRequired,
    loading: export_default5.oneOfType([
        export_default5.element,
        export_default5.string
    ]).isRequired,
    isEditorReady: export_default5.bool.isRequired,
    className: export_default5.string,
    wrapperClassName: export_default5.string
};
var re1 = te2;
var ve1 = ge(re1), q2 = ve1;
function be(e) {
    xe(e, []);
}
var O5 = be;
function ke1(e, r, s = !0) {
    let t = Le2(!0);
    xe(t.current || !s ? ()=>{
        t.current = !1;
    } : e, r);
}
var M1 = ke1;
function C2() {
}
function Y2(e, r, s, t) {
    return je1(e, t) || Oe1(e, r, s, t);
}
function je1(e, r) {
    return e.editor.getModel(oe2(e, r));
}
function Oe1(e, r, s, t) {
    return e.editor.createModel(r, s, t && oe2(e, t));
}
function oe2(e, r) {
    return e.Uri.parse(r);
}
function ne2(e) {
    return e === void 0;
}
function Z2({ original: e , modified: r , language: s , originalLanguage: t , modifiedLanguage: g , originalModelPath: m , modifiedModelPath: v , keepCurrentOriginalModel: w , keepCurrentModifiedModel: W , theme: b , loading: P , options: E , height: A , width: B , className: G , wrapperClassName: H , beforeMount: J , onMount: K  }) {
    let [y, T] = qe(!1), [R, a] = qe(!0), h = Le2(null), f = Le2(null), D = Le2(null), p = Le2(K), n = Le2(J);
    O5(()=>{
        let c = k.init();
        return c.then((l)=>(f.current = l) && a(!1)
        ).catch((l)=>(l == null ? void 0 : l.type) !== "cancelation" && console.error("Monaco initialization: error:", l)
        ), ()=>h.current ? Q() : c.cancel()
        ;
    }), M1(()=>{
        let c = h.current.getModifiedEditor();
        c.getOption(f.current.editor.EditorOption.readOnly) ? c.setValue(r) : r !== c.getValue() && (c.executeEdits("", [
            {
                range: c.getModel().getFullModelRange(),
                text: r,
                forceMoveMarkers: !0
            }
        ]), c.pushUndoStop());
    }, [
        r
    ], y), M1(()=>{
        h.current.getModel().original.setValue(e);
    }, [
        e
    ], y), M1(()=>{
        let { original: c , modified: l  } = h.current.getModel();
        f.current.editor.setModelLanguage(c, t || s), f.current.editor.setModelLanguage(l, g || s);
    }, [
        s,
        t,
        g
    ], y), M1(()=>{
        f.current.editor.setTheme(b);
    }, [
        b
    ], y), M1(()=>{
        h.current.updateOptions(E);
    }, [
        E
    ], y);
    let S = je(()=>{
        n.current(f.current);
        let c = f.current.editor.createModel(e, t || s, m && f.current.Uri.parse(m)), l = f.current.editor.createModel(r, g || s, v && f.current.Uri.parse(v));
        h.current.setModel({
            original: c,
            modified: l
        });
    }, [
        s,
        r,
        g,
        e,
        t,
        m,
        v
    ]), I = je(()=>{
        h.current = f.current.editor.createDiffEditor(D.current, {
            automaticLayout: !0,
            ...E
        }), S(), f.current.editor.setTheme(b), T(!0);
    }, [
        E,
        b,
        S
    ]);
    xe(()=>{
        y && p.current(h.current, f.current);
    }, [
        y
    ]), xe(()=>{
        !R && !y && I();
    }, [
        R,
        y,
        I
    ]);
    function Q() {
        let c = h.current.getModel();
        if (!w) {
            var l;
            (l = c.original) === null || l === void 0 || l.dispose();
        }
        if (!W) {
            var U;
            (U = c.modified) === null || U === void 0 || U.dispose();
        }
        h.current.dispose();
    }
    return export_default4.createElement(q2, {
        width: B,
        height: A,
        isEditorReady: y,
        loading: P,
        _ref: D,
        className: G,
        wrapperClassName: H
    });
}
Z2.propTypes = {
    original: export_default5.string,
    modified: export_default5.string,
    language: export_default5.string,
    originalLanguage: export_default5.string,
    modifiedLanguage: export_default5.string,
    originalModelPath: export_default5.string,
    modifiedModelPath: export_default5.string,
    keepCurrentOriginalModel: export_default5.bool,
    keepCurrentModifiedModel: export_default5.bool,
    theme: export_default5.string,
    loading: export_default5.oneOfType([
        export_default5.element,
        export_default5.string
    ]),
    options: export_default5.object,
    width: export_default5.oneOfType([
        export_default5.number,
        export_default5.string
    ]),
    height: export_default5.oneOfType([
        export_default5.number,
        export_default5.string
    ]),
    className: export_default5.string,
    wrapperClassName: export_default5.string,
    beforeMount: export_default5.func,
    onMount: export_default5.func
};
Z2.defaultProps = {
    theme: "light",
    loading: "Loading...",
    options: {
    },
    keepCurrentOriginalModel: !1,
    keepCurrentModifiedModel: !1,
    width: "100%",
    height: "100%",
    beforeMount: C2,
    onMount: C2
};
function qe1(e) {
    let r = Le2();
    return xe(()=>{
        r.current = e;
    }, [
        e
    ]), r.current;
}
var ae2 = qe1;
var [fe2, Be] = x.create({
    backup: null
}), F3 = new Map;
function _3({ defaultValue: e , defaultLanguage: r , defaultPath: s , value: t , language: g , path: m , theme: v , line: w , loading: W , options: b , overrideServices: P , saveViewState: E , keepCurrentModel: A , width: B , height: G , className: H , wrapperClassName: J , beforeMount: K , onMount: y , onChange: T , onValidate: R  }) {
    let [a, h] = qe(!1), [f, D] = qe(!0), p = Le2(null), n = Le2(null), S = Le2(null), I = Le2(y), Q = Le2(K), c = Le2(null), l = Le2(t), U = ae2(m);
    O5(()=>{
        let u = k.init();
        return u.then((d)=>(p.current = d) && D(!1)
        ).catch((d)=>(d == null ? void 0 : d.type) !== "cancelation" && console.error("Monaco initialization: error:", d)
        ), ()=>n.current ? me() : u.cancel()
        ;
    }), M1(()=>{
        let u = Y2(p.current, e || t, r || g, m);
        u !== n.current.getModel() && (E && F3.set(U, n.current.saveViewState()), n.current.setModel(u), E && n.current.restoreViewState(F3.get(m)));
    }, [
        m
    ], a), M1(()=>{
        n.current.updateOptions(b);
    }, [
        b
    ], a), M1(()=>{
        n.current.getOption(p.current.editor.EditorOption.readOnly) ? n.current.setValue(t) : t !== n.current.getValue() && (n.current.executeEdits("", [
            {
                range: n.current.getModel().getFullModelRange(),
                text: t,
                forceMoveMarkers: !0
            }
        ]), n.current.pushUndoStop());
    }, [
        t
    ], a), M1(()=>{
        p.current.editor.setModelLanguage(n.current.getModel(), g);
    }, [
        g
    ], a), M1(()=>{
        ne2(w) || n.current.revealLine(w);
    }, [
        w
    ], a), M1(()=>{
        p.current.editor.setTheme(v);
    }, [
        v
    ], a);
    let $ = je(()=>{
        Q.current(p.current);
        let u = m || s, d = Y2(p.current, t || e, r || g, u);
        n.current = p.current.editor.create(S.current, {
            model: d,
            automaticLayout: !0,
            ...b
        }, P), E && n.current.restoreViewState(F3.get(u)), p.current.editor.setTheme(v), fe2().backup || Be({
            backup: p.current.editor.setModelMarkers
        }), h(!0);
    }, [
        e,
        r,
        s,
        t,
        g,
        m,
        b,
        P,
        E,
        v
    ]);
    xe(()=>{
        a && I.current(n.current, p.current);
    }, [
        a
    ]), xe(()=>{
        !f && !a && $();
    }, [
        f,
        a,
        $
    ]), l.current = t, xe(()=>{
        if (a && T) {
            var u, d;
            (u = c.current) === null || u === void 0 || u.dispose(), c.current = (d = n.current) === null || d === void 0 ? void 0 : d.onDidChangeModelContent((L)=>{
                let j = n.current.getValue();
                l.current !== j && T(j, L);
            });
        }
    }, [
        a,
        T
    ]), xe(()=>{
        a && (p.current.editor.setModelMarkers = function(u, d, L) {
            var j;
            (j = fe2().backup) === null || j === void 0 || j.call(p.current.editor, u, d, L), R == null || R(L);
        });
    }, [
        a,
        R
    ]);
    function me() {
        var u;
        if ((u = c.current) === null || u === void 0 || u.dispose(), A) E && F3.set(m, n.current.saveViewState());
        else {
            var d;
            (d = n.current.getModel()) === null || d === void 0 || d.dispose();
        }
        n.current.dispose();
    }
    return export_default4.createElement(q2, {
        width: B,
        height: G,
        isEditorReady: a,
        loading: W,
        _ref: S,
        className: H,
        wrapperClassName: J
    });
}
_3.propTypes = {
    defaultValue: export_default5.string,
    defaultPath: export_default5.string,
    defaultLanguage: export_default5.string,
    value: export_default5.string,
    language: export_default5.string,
    path: export_default5.string,
    theme: export_default5.string,
    line: export_default5.number,
    loading: export_default5.oneOfType([
        export_default5.element,
        export_default5.string
    ]),
    options: export_default5.object,
    overrideServices: export_default5.object,
    saveViewState: export_default5.bool,
    keepCurrentModel: export_default5.bool,
    width: export_default5.oneOfType([
        export_default5.number,
        export_default5.string
    ]),
    height: export_default5.oneOfType([
        export_default5.number,
        export_default5.string
    ]),
    className: export_default5.string,
    wrapperClassName: export_default5.string,
    beforeMount: export_default5.func,
    onMount: export_default5.func,
    onChange: export_default5.func,
    onValidate: export_default5.func
};
_3.defaultProps = {
    theme: "light",
    loading: "Loading...",
    options: {
    },
    overrideServices: {
    },
    saveViewState: !0,
    keepCurrentModel: !1,
    width: "100%",
    height: "100%",
    beforeMount: C2,
    onMount: C2,
    onValidate: C2
};
var pe1 = _3;
var He = ge(pe1), Je = He;
var _4 = Object.create;
var S3 = Object.defineProperty;
var g5 = Object.getOwnPropertyDescriptor;
var j5 = Object.getOwnPropertyNames;
var z4 = Object.getPrototypeOf, A1 = Object.prototype.hasOwnProperty;
var h5 = (e)=>S3(e, "__esModule", {
        value: !0
    })
;
var P3 = (e, o)=>()=>(o || e((o = {
            exports: {
            }
        }).exports, o), o.exports)
;
var L1 = (e, o, x)=>{
    if (o && typeof o == "object" || typeof o == "function") for (let s of j5(o))!A1.call(e, s) && s !== "default" && S3(e, s, {
        get: ()=>o[s]
        ,
        enumerable: !(x = g5(o, s)) || x.enumerable
    });
    return e;
}, v3 = (e)=>L1(h5(S3(e != null ? _4(z4(e)) : {
    }, "default", e && e.__esModule && "default" in e ? {
        get: ()=>e.default
        ,
        enumerable: !0
    } : {
        value: e,
        enumerable: !0
    })), e)
;
var E4 = P3((r)=>{
    "use strict";
    var t = typeof Symbol == "function" && Symbol.for, b = t ? Symbol.for("react.element") : 60103, $ = t ? Symbol.for("react.portal") : 60106, c = t ? Symbol.for("react.fragment") : 60107, i = t ? Symbol.for("react.strict_mode") : 60108, f = t ? Symbol.for("react.profiler") : 60114, u = t ? Symbol.for("react.provider") : 60109, l = t ? Symbol.for("react.context") : 60110, C = t ? Symbol.for("react.async_mode") : 60111, y = t ? Symbol.for("react.concurrent_mode") : 60111, m = t ? Symbol.for("react.forward_ref") : 60112, p = t ? Symbol.for("react.suspense") : 60113, R = t ? Symbol.for("react.suspense_list") : 60120, d = t ? Symbol.for("react.memo") : 60115, a = t ? Symbol.for("react.lazy") : 60116, q = t ? Symbol.for("react.block") : 60121, O = t ? Symbol.for("react.fundamental") : 60117, V = t ? Symbol.for("react.responder") : 60118, k = t ? Symbol.for("react.scope") : 60119;
    function n(e) {
        if (typeof e == "object" && e !== null) {
            var o = e.$$typeof;
            switch(o){
                case b:
                    switch(e = e.type, e){
                        case C:
                        case y:
                        case c:
                        case f:
                        case i:
                        case p:
                            return e;
                        default:
                            switch(e = e && e.$$typeof, e){
                                case l:
                                case m:
                                case a:
                                case d:
                                case u:
                                    return e;
                                default:
                                    return o;
                            }
                    }
                case $:
                    return o;
            }
        }
    }
    function w(e) {
        return n(e) === y;
    }
    r.AsyncMode = C;
    r.ConcurrentMode = y;
    r.ContextConsumer = l;
    r.ContextProvider = u;
    r.Element = b;
    r.ForwardRef = m;
    r.Fragment = c;
    r.Lazy = a;
    r.Memo = d;
    r.Portal = $;
    r.Profiler = f;
    r.StrictMode = i;
    r.Suspense = p;
    r.isAsyncMode = function(e) {
        return w(e) || n(e) === C;
    };
    r.isConcurrentMode = w;
    r.isContextConsumer = function(e) {
        return n(e) === l;
    };
    r.isContextProvider = function(e) {
        return n(e) === u;
    };
    r.isElement = function(e) {
        return typeof e == "object" && e !== null && e.$$typeof === b;
    };
    r.isForwardRef = function(e) {
        return n(e) === m;
    };
    r.isFragment = function(e) {
        return n(e) === c;
    };
    r.isLazy = function(e) {
        return n(e) === a;
    };
    r.isMemo = function(e) {
        return n(e) === d;
    };
    r.isPortal = function(e) {
        return n(e) === $;
    };
    r.isProfiler = function(e) {
        return n(e) === f;
    };
    r.isStrictMode = function(e) {
        return n(e) === i;
    };
    r.isSuspense = function(e) {
        return n(e) === p;
    };
    r.isValidElementType = function(e) {
        return typeof e == "string" || typeof e == "function" || e === c || e === y || e === f || e === i || e === p || e === R || typeof e == "object" && e !== null && (e.$$typeof === a || e.$$typeof === d || e.$$typeof === u || e.$$typeof === l || e.$$typeof === m || e.$$typeof === O || e.$$typeof === V || e.$$typeof === k || e.$$typeof === q);
    };
    r.typeOf = n;
});
var M2 = P3((G, F)=>{
    "use strict";
    F.exports = E4();
});
var T2 = v3(M2());
var export_default6 = T2.default;
var f1 = Object.defineProperty;
var b3 = Object.getOwnPropertyDescriptor;
var j6 = Object.getOwnPropertyNames;
var A2 = Object.prototype.hasOwnProperty;
var D3 = (r)=>{
    if (typeof require != "undefined") return require(r);
    throw new Error('Dynamic require of "' + r + '" is not supported');
};
var I2 = (r, e)=>()=>(e || r((e = {
            exports: {
            }
        }).exports, e), e.exports)
;
var R4 = (r, e, a)=>{
    if (e && typeof e == "object" || typeof e == "function") for (let t of j6(e))!A2.call(r, t) && t !== "default" && f1(r, t, {
        get: ()=>e[t]
        ,
        enumerable: !(a = b3(e, t)) || a.enumerable
    });
    return r;
};
var d2 = I2((Y, l)=>{
    "use strict";
    var y = export_default6, $ = {
        childContextTypes: !0,
        contextType: !0,
        contextTypes: !0,
        defaultProps: !0,
        displayName: !0,
        getDefaultProps: !0,
        getDerivedStateFromError: !0,
        getDerivedStateFromProps: !0,
        mixins: !0,
        propTypes: !0,
        type: !0
    }, m = {
        name: !0,
        length: !0,
        prototype: !0,
        caller: !0,
        callee: !0,
        arguments: !0,
        arity: !0
    }, n = {
        $$typeof: !0,
        render: !0,
        defaultProps: !0,
        displayName: !0,
        propTypes: !0
    }, c = {
        $$typeof: !0,
        compare: !0,
        defaultProps: !0,
        displayName: !0,
        propTypes: !0,
        type: !0
    }, i = {
    };
    i[y.ForwardRef] = n;
    i[y.Memo] = c;
    function T(r) {
        return y.isMemo(r) ? c : i[r.$$typeof] || $;
    }
    var E = Object.defineProperty, F = Object.getOwnPropertyNames, O = Object.getOwnPropertySymbols, h = Object.getOwnPropertyDescriptor, M = Object.getPrototypeOf, P = Object.prototype;
    function S(r, e, a) {
        if (typeof e != "string") {
            if (P) {
                var t = M(e);
                t && t !== P && S(r, t, a);
            }
            var p = F(e);
            O && (p = p.concat(O(e)));
            for(var s = T(r), v = T(e), o = 0; o < p.length; ++o){
                var u = p[o];
                if (!m[u] && !(a && a[u]) && !(v && v[u]) && !(s && s[u])) {
                    var g = h(e, u);
                    try {
                        E(r, u, g);
                    } catch (q) {
                    }
                }
            }
        }
        return r;
    }
    l.exports = S;
});
var v4 = export_default4.createContext(null);
function $e1(e) {
    e();
}
var Se1 = $e1, Ce1 = function(r) {
    return Se1 = r;
}, we1 = function() {
    return Se1;
};
function Ae1() {
    var e = we1(), r = null, t = null;
    return {
        clear: function() {
            r = null, t = null;
        },
        notify: function() {
            e(function() {
                for(var n = r; n;)n.callback(), n = n.next;
            });
        },
        get: function() {
            for(var n = [], i = r; i;)n.push(i), i = i.next;
            return n;
        },
        subscribe: function(n) {
            var i = !0, o = t = {
                callback: n,
                next: null,
                prev: t
            };
            return o.prev ? o.prev.next = o : r = o, function() {
                !i || r === null || (i = !1, o.next ? o.next.prev = o.prev : t = o.prev, o.prev ? o.prev.next = o.next : r = o.next);
            };
        }
    };
}
var ge2 = {
    notify: function() {
    },
    get: function() {
        return [];
    }
};
function D4(e, r) {
    var t, a = ge2;
    function n(f) {
        return c(), a.subscribe(f);
    }
    function i() {
        a.notify();
    }
    function o() {
        u.onStateChange && u.onStateChange();
    }
    function s() {
        return Boolean(t);
    }
    function c() {
        t || (t = r ? r.addNestedSub(o) : e.subscribe(o), a = Ae1());
    }
    function p() {
        t && (t(), t = void 0, a.clear(), a = ge2);
    }
    var u = {
        addNestedSub: n,
        notifyNestedSubs: i,
        handleChangeWrapper: o,
        isSubscribed: s,
        trySubscribe: c,
        tryUnsubscribe: p,
        getListeners: function() {
            return a;
        }
    };
    return u;
}
var T3 = typeof window != "undefined" && typeof window.document != "undefined" && typeof window.document.createElement != "undefined" ? we : xe;
function Ye(e) {
    var r = e.store, t = e.context, a = e.children, n = Ae(function() {
        var s = D4(r);
        return s.onStateChange = s.notifyNestedSubs, {
            store: r,
            subscription: s
        };
    }, [
        r
    ]), i = Ae(function() {
        return r.getState();
    }, [
        r
    ]);
    T3(function() {
        var s = n.subscription;
        return s.trySubscribe(), i !== r.getState() && s.notifyNestedSubs(), function() {
            s.tryUnsubscribe(), s.onStateChange = null;
        };
    }, [
        n,
        i
    ]);
    var o = t || v4;
    return export_default4.createElement(o.Provider, {
        value: n
    }, a);
}
var Ke = Ye;
function Z3() {
    var e = Oe(v4);
    return e;
}
function ee3(e) {
    e === void 0 && (e = v4);
    var r = e === v4 ? Z3 : function() {
        return Oe(e);
    };
    return function() {
        var a = r(), n = a.store;
        return n;
    };
}
var le1 = ee3();
function qe2(e) {
    e === void 0 && (e = v4);
    var r = e === v4 ? le1 : ee3(e);
    return function() {
        var a = r();
        return a.dispatch;
    };
}
var Nr = qe2();
var _r = function(r, t) {
    return r === t;
};
function qr(e, r, t, a) {
    var n = Fe(function(x) {
        return x + 1;
    }, 0), i = n[1], o = Ae(function() {
        return D4(t, a);
    }, [
        t,
        a
    ]), s = Le2(), c = Le2(), p = Le2(), u = Le2(), f = t.getState(), l;
    try {
        if (e !== c.current || f !== p.current || s.current) {
            var d = e(f);
            u.current === void 0 || !r(d, u.current) ? l = d : l = u.current;
        } else l = u.current;
    } catch (x) {
        throw s.current && (x.message += `
The error may be correlated with this previous error:
` + s.current.stack + `

`), x;
    }
    return T3(function() {
        c.current = e, p.current = f, u.current = l, s.current = void 0;
    }), T3(function() {
        function x() {
            try {
                var S = t.getState();
                if (S === p.current) return;
                var h = c.current(S);
                if (r(h, u.current)) return;
                u.current = h, p.current = S;
            } catch (m) {
                s.current = m;
            }
            i();
        }
        return o.onStateChange = x, o.trySubscribe(), x(), function() {
            return o.tryUnsubscribe();
        };
    }, [
        t,
        o
    ]), l;
}
function Ue(e) {
    e === void 0 && (e = v4);
    var r = e === v4 ? Z3 : function() {
        return Oe(e);
    };
    return function(a, n) {
        n === void 0 && (n = _r);
        var i = r(), o = i.store, s = i.subscription, c = qr(a, n, o, s);
        return Pe(c), c;
    };
}
var Ur = Ue();
Ce1(Vf);
const useAppDispatch = ()=>Nr()
;
function m3(e) {
    for(var t = arguments.length, o = Array(t > 1 ? t - 1 : 0), r = 1; r < t; r++)o[r - 1] = arguments[r];
    if (!1) var c, l;
    throw Error("[Immer] minified error nr: " + e + (o.length ? " " + o.map(function(s) {
        return "'" + s + "'";
    }).join(",") : "") + ". Find the full error at: https://bit.ly/3cXEKWf");
}
function _5(e) {
    return !!e && !!e[v5];
}
function D5(e) {
    return !!e && ((function(t) {
        if (!t || typeof t != "object") return !1;
        var o = Object.getPrototypeOf(t);
        if (o === null) return !0;
        var r = Object.hasOwnProperty.call(o, "constructor") && o.constructor;
        return r === Object || typeof r == "function" && Function.toString.call(r) === Pe1;
    })(e) || Array.isArray(e) || !!e[R5] || !!e.constructor[R5] || V3(e) || K2(e));
}
function S4(e, t, o) {
    o === void 0 && (o = !1), x2(e) === 0 ? (o ? Object.keys : k1)(e).forEach(function(r) {
        o && typeof r == "symbol" || t(r, e[r], e);
    }) : e.forEach(function(r, c) {
        return t(c, r, e);
    });
}
function x2(e) {
    var t = e[v5];
    return t ? t.i > 3 ? t.i - 4 : t.i : Array.isArray(e) ? 1 : V3(e) ? 2 : K2(e) ? 3 : 0;
}
function I3(e, t) {
    return x2(e) === 2 ? e.has(t) : Object.prototype.hasOwnProperty.call(e, t);
}
function T4(e, t) {
    return x2(e) === 2 ? e.get(t) : e[t];
}
function oe3(e, t, o) {
    var r = x2(e);
    r === 2 ? e.set(t, o) : r === 3 ? (e.delete(t), e.add(o)) : e[t] = o;
}
function ae3(e, t) {
    return e === t ? e !== 0 || 1 / e == 1 / t : e != e && t != t;
}
function V3(e) {
    return me1 && e instanceof Map;
}
function K2(e) {
    return Oe2 && e instanceof Set;
}
function O6(e) {
    return e.o || e.t;
}
function X3(e) {
    if (Array.isArray(e)) return Array.prototype.slice.call(e);
    var t = pe2(e);
    delete t[v5];
    for(var o = k1(t), r = 0; r < o.length; r++){
        var c = o[r], l = t[c];
        l.writable === !1 && (l.writable = !0, l.configurable = !0), (l.get || l.set) && (t[c] = {
            configurable: !0,
            writable: !0,
            enumerable: l.enumerable,
            value: e[c]
        });
    }
    return Object.create(Object.getPrototypeOf(e), t);
}
function Y3(e, t) {
    return t === void 0 && (t = !1), q3(e) || _5(e) || !D5(e) || (x2(e) > 1 && (e.set = e.add = e.clear = e.delete = he2), Object.freeze(e), t && S4(e, function(o, r) {
        return Y3(r, !0);
    }, !0)), e;
}
function he2() {
    m3(2);
}
function q3(e) {
    return e == null || typeof e != "object" || Object.isFrozen(e);
}
function N1(e) {
    var t = ne3[e];
    return t || m3(18, e), t;
}
function B2(e, t) {
    ne3[e] || (ne3[e] = t);
}
function M3() {
    return C3;
}
function H2(e, t) {
    t && (N1("Patches"), e.u = [], e.s = [], e.v = t);
}
function U1(e) {
    L2(e), e.p.forEach(ve2), e.p = null;
}
function L2(e) {
    e === C3 && (C3 = e.l);
}
function ie2(e) {
    return C3 = {
        p: [],
        l: C3,
        h: e,
        m: !0,
        _: 0
    };
}
function ve2(e) {
    var t = e[v5];
    t.i === 0 || t.i === 1 ? t.j() : t.O = !0;
}
function Q2(e, t) {
    t._ = t.p.length;
    var o = t.p[0], r = e !== void 0 && e !== o;
    return t.h.g || N1("ES5").S(t, e, r), r ? (o[v5].P && (U1(t), m3(4)), D5(e) && (e = W1(t, e), t.l || J3(t, e)), t.u && N1("Patches").M(o[v5], e, t.u, t.s)) : e = W1(t, o, []), U1(t), t.u && t.v(t.u, t.s), e !== re2 ? e : void 0;
}
function W1(e, t, o) {
    if (q3(t)) return t;
    var r = t[v5];
    if (!r) return S4(t, function(l, s) {
        return ue2(e, r, t, l, s, o);
    }, !0), t;
    if (r.A !== e) return t;
    if (!r.P) return J3(e, r.t, !0), r.t;
    if (!r.I) {
        r.I = !0, r.A._--;
        var c = r.i === 4 || r.i === 5 ? r.o = X3(r.k) : r.o;
        S4(r.i === 3 ? new Set(c) : c, function(l, s) {
            return ue2(e, r, c, l, s, o);
        }), J3(e, c, !1), o && e.u && N1("Patches").R(r, o, e.u, e.s);
    }
    return r.o;
}
function ue2(e, t, o, r, c, l) {
    if (_5(c)) {
        var s = W1(e, c, l && t && t.i !== 3 && !I3(t.D, r) ? l.concat(r) : void 0);
        if (oe3(o, r, s), !_5(s)) return;
        e.m = !1;
    }
    if (D5(c) && !q3(c)) {
        if (!e.h.F && e._ < 1) return;
        W1(e, c), t && t.A.l || J3(e, c);
    }
}
function J3(e, t, o) {
    o === void 0 && (o = !1), e.h.F && e.m && Y3(t, o);
}
function Z4(e, t) {
    var o = e[v5];
    return (o ? O6(o) : e)[t];
}
function ce3(e, t) {
    if (t in e) for(var o = Object.getPrototypeOf(e); o;){
        var r = Object.getOwnPropertyDescriptor(o, t);
        if (r) return r;
        o = Object.getPrototypeOf(o);
    }
}
function w2(e) {
    e.P || (e.P = !0, e.l && w2(e.l));
}
function ee4(e) {
    e.o || (e.o = X3(e.t));
}
function F4(e, t, o) {
    var r = V3(t) ? N1("MapSet").N(t, o) : K2(t) ? N1("MapSet").T(t, o) : e.g ? function(c, l) {
        var s = Array.isArray(c), u = {
            i: s ? 1 : 0,
            A: l ? l.A : M3(),
            P: !1,
            I: !1,
            D: {
            },
            l,
            t: c,
            k: null,
            o: null,
            j: null,
            C: !1
        }, i = u, n = z5;
        s && (i = [
            u
        ], n = G4);
        var a = Proxy.revocable(i, n), f = a.revoke, h = a.proxy;
        return u.k = h, u.j = f, h;
    }(t, o) : N1("ES5").J(t, o);
    return (o ? o.A : M3()).p.push(r), r;
}
function de1(e) {
    return _5(e) || m3(22, e), (function t(o) {
        if (!D5(o)) return o;
        var r, c = o[v5], l = x2(o);
        if (c) {
            if (!c.P && (c.i < 4 || !N1("ES5").K(c))) return c.t;
            c.I = !0, r = fe3(o, l), c.I = !1;
        } else r = fe3(o, l);
        return S4(r, function(s, u) {
            c && T4(c.t, s) === u || oe3(r, s, t(u));
        }), l === 3 ? new Set(r) : r;
    })(e);
}
function fe3(e, t) {
    switch(t){
        case 2:
            return new Map(e);
        case 3:
            return Array.from(e);
    }
    return X3(e);
}
function ye2() {
    function e(s, u) {
        var i = l[s];
        return i ? i.enumerable = u : l[s] = i = {
            configurable: !0,
            enumerable: u,
            get: function() {
                var n = this[v5];
                return z5.get(n, s);
            },
            set: function(n) {
                var a = this[v5];
                z5.set(a, s, n);
            }
        }, i;
    }
    function t(s) {
        for(var u = s.length - 1; u >= 0; u--){
            var i = s[u][v5];
            if (!i.P) switch(i.i){
                case 5:
                    r(i) && w2(i);
                    break;
                case 4:
                    o(i) && w2(i);
            }
        }
    }
    function o(s) {
        for(var u = s.t, i = s.k, n = k1(i), a = n.length - 1; a >= 0; a--){
            var f = n[a];
            if (f !== v5) {
                var h = u[f];
                if (h === void 0 && !I3(u, f)) return !0;
                var p = i[f], d = p && p[v5];
                if (d ? d.t !== h : !ae3(p, h)) return !0;
            }
        }
        var y = !!u[v5];
        return n.length !== k1(u).length + (y ? 0 : 1);
    }
    function r(s) {
        var u = s.k;
        if (u.length !== s.t.length) return !0;
        var i = Object.getOwnPropertyDescriptor(u, u.length - 1);
        return !(!i || i.get);
    }
    function c(s) {
        s.O && m3(3, JSON.stringify(O6(s)));
    }
    var l = {
    };
    B2("ES5", {
        J: function(s, u) {
            var i = Array.isArray(s), n = function(f, h) {
                if (f) {
                    for(var p = Array(h.length), d = 0; d < h.length; d++)Object.defineProperty(p, "" + d, e(d, !0));
                    return p;
                }
                var y = pe2(h);
                delete y[v5];
                for(var b = k1(y), g = 0; g < b.length; g++){
                    var P = b[g];
                    y[P] = e(P, f || !!y[P].enumerable);
                }
                return Object.create(Object.getPrototypeOf(h), y);
            }(i, s), a = {
                i: i ? 5 : 4,
                A: u ? u.A : M3(),
                P: !1,
                I: !1,
                D: {
                },
                l: u,
                t: s,
                k: n,
                o: null,
                O: !1,
                C: !1
            };
            return Object.defineProperty(n, v5, {
                value: a,
                writable: !0
            }), n;
        },
        S: function(s, u, i) {
            i ? _5(u) && u[v5].A === s && t(s.p) : (s.u && (function n(a) {
                if (a && typeof a == "object") {
                    var f = a[v5];
                    if (f) {
                        var h = f.t, p = f.k, d = f.D, y = f.i;
                        if (y === 4) S4(p, function(A) {
                            A !== v5 && (h[A] !== void 0 || I3(h, A) ? d[A] || n(p[A]) : (d[A] = !0, w2(f)));
                        }), S4(h, function(A) {
                            p[A] !== void 0 || I3(p, A) || (d[A] = !1, w2(f));
                        });
                        else if (y === 5) {
                            if (r(f) && (w2(f), d.length = !0), p.length < h.length) for(var b = p.length; b < h.length; b++)d[b] = !1;
                            else for(var g = h.length; g < p.length; g++)d[g] = !0;
                            for(var P = Math.min(p.length, h.length), E = 0; E < P; E++)d[E] === void 0 && n(p[E]);
                        }
                    }
                }
            })(s.p[0]), t(s.p));
        },
        K: function(s) {
            return s.i === 4 ? o(s) : r(s);
        }
    });
}
var se1, C3, te3 = typeof Symbol != "undefined" && typeof Symbol("x") == "symbol", me1 = typeof Map != "undefined", Oe2 = typeof Set != "undefined", le2 = typeof Proxy != "undefined" && Proxy.revocable !== void 0 && typeof Reflect != "undefined", re2 = te3 ? Symbol.for("immer-nothing") : ((se1 = {
})["immer-nothing"] = !0, se1), R5 = te3 ? Symbol.for("immer-draftable") : "__$immer_draftable", v5 = te3 ? Symbol.for("immer-state") : "__$immer_state";
var Pe1 = "" + Object.prototype.constructor, k1 = typeof Reflect != "undefined" && Reflect.ownKeys ? Reflect.ownKeys : Object.getOwnPropertySymbols !== void 0 ? function(e) {
    return Object.getOwnPropertyNames(e).concat(Object.getOwnPropertySymbols(e));
} : Object.getOwnPropertyNames, pe2 = Object.getOwnPropertyDescriptors || function(e) {
    var t = {
    };
    return k1(e).forEach(function(o) {
        t[o] = Object.getOwnPropertyDescriptor(e, o);
    }), t;
}, ne3 = {
}, z5 = {
    get: function(e, t) {
        if (t === v5) return e;
        var o = O6(e);
        if (!I3(o, t)) return (function(c, l, s) {
            var u, i = ce3(l, s);
            return i ? "value" in i ? i.value : (u = i.get) === null || u === void 0 ? void 0 : u.call(c.k) : void 0;
        })(e, o, t);
        var r = o[t];
        return e.I || !D5(r) ? r : r === Z4(e.t, t) ? (ee4(e), e.o[t] = F4(e.A.h, r, e)) : r;
    },
    has: function(e, t) {
        return t in O6(e);
    },
    ownKeys: function(e) {
        return Reflect.ownKeys(O6(e));
    },
    set: function(e, t, o) {
        var r = ce3(O6(e), t);
        if (r == null ? void 0 : r.set) return r.set.call(e.k, o), !0;
        if (!e.P) {
            var c = Z4(O6(e), t), l = c == null ? void 0 : c[v5];
            if (l && l.t === o) return e.o[t] = o, e.D[t] = !1, !0;
            if (ae3(o, c) && (o !== void 0 || I3(e.t, t))) return !0;
            ee4(e), w2(e);
        }
        return e.o[t] === o && typeof o != "number" && (o !== void 0 || t in e.o) || (e.o[t] = o, e.D[t] = !0, !0);
    },
    deleteProperty: function(e, t) {
        return Z4(e.t, t) !== void 0 || t in e.t ? (e.D[t] = !1, ee4(e), w2(e)) : delete e.D[t], e.o && delete e.o[t], !0;
    },
    getOwnPropertyDescriptor: function(e, t) {
        var o = O6(e), r = Reflect.getOwnPropertyDescriptor(o, t);
        return r && {
            writable: !0,
            configurable: e.i !== 1 || t !== "length",
            enumerable: r.enumerable,
            value: o[t]
        };
    },
    defineProperty: function() {
        m3(11);
    },
    getPrototypeOf: function(e) {
        return Object.getPrototypeOf(e.t);
    },
    setPrototypeOf: function() {
        m3(12);
    }
}, G4 = {
};
S4(z5, function(e, t) {
    G4[e] = function() {
        return arguments[0] = arguments[0][0], t.apply(this, arguments);
    };
}), G4.deleteProperty = function(e, t) {
    return z5.deleteProperty.call(this, e[0], t);
}, G4.set = function(e, t, o) {
    return z5.set.call(this, e[0], t, o, e[0]);
};
var we2 = function() {
    function e(o) {
        var r = this;
        this.g = le2, this.F = !0, this.produce = function(c, l, s) {
            if (typeof c == "function" && typeof l != "function") {
                var u = l;
                l = c;
                var i = r;
                return function(p) {
                    var d = this;
                    p === void 0 && (p = u);
                    for(var y = arguments.length, b = Array(y > 1 ? y - 1 : 0), g = 1; g < y; g++)b[g - 1] = arguments[g];
                    return i.produce(p, function(P) {
                        var E;
                        return (E = l).call.apply(E, [
                            d,
                            P
                        ].concat(b));
                    });
                };
            }
            var n;
            if (typeof l != "function" && m3(6), s !== void 0 && typeof s != "function" && m3(7), D5(c)) {
                var a = ie2(r), f = F4(r, c, void 0), h = !0;
                try {
                    n = l(f), h = !1;
                } finally{
                    h ? U1(a) : L2(a);
                }
                return typeof Promise != "undefined" && n instanceof Promise ? n.then(function(p) {
                    return H2(a, s), Q2(p, a);
                }, function(p) {
                    throw U1(a), p;
                }) : (H2(a, s), Q2(n, a));
            }
            if (!c || typeof c != "object") return (n = l(c)) === re2 ? void 0 : (n === void 0 && (n = c), r.F && Y3(n, !0), n);
            m3(21, c);
        }, this.produceWithPatches = function(c, l) {
            return typeof c == "function" ? function(i) {
                for(var n = arguments.length, a = Array(n > 1 ? n - 1 : 0), f = 1; f < n; f++)a[f - 1] = arguments[f];
                return r.produceWithPatches(i, function(h) {
                    return c.apply(void 0, [
                        h
                    ].concat(a));
                });
            } : [
                r.produce(c, l, function(i, n) {
                    s = i, u = n;
                }),
                s,
                u
            ];
            var s, u;
        }, typeof (o == null ? void 0 : o.useProxies) == "boolean" && this.setUseProxies(o.useProxies), typeof (o == null ? void 0 : o.autoFreeze) == "boolean" && this.setAutoFreeze(o.autoFreeze);
    }
    var t = e.prototype;
    return t.createDraft = function(o) {
        D5(o) || m3(8), _5(o) && (o = de1(o));
        var r = ie2(this), c = F4(this, o, void 0);
        return c[v5].C = !0, L2(r), c;
    }, t.finishDraft = function(o, r) {
        var c = o && o[v5], l = c.A;
        return H2(l, r), Q2(void 0, l);
    }, t.setAutoFreeze = function(o) {
        this.F = o;
    }, t.setUseProxies = function(o) {
        o && !le2 && m3(20), this.g = o;
    }, t.applyPatches = function(o, r) {
        var c;
        for(c = r.length - 1; c >= 0; c--){
            var l = r[c];
            if (l.path.length === 0 && l.op === "replace") {
                o = l.value;
                break;
            }
        }
        var s = N1("Patches").$;
        return _5(o) ? s(o, r) : this.produce(o, function(u) {
            return s(u, r.slice(c + 1));
        });
    }, e;
}(), j7 = new we2, je2 = j7.produce, Me = je2;
function f2(e, t, r) {
    return t in e ? Object.defineProperty(e, t, {
        value: r,
        enumerable: !0,
        configurable: !0,
        writable: !0
    }) : e[t] = r, e;
}
function o(e, t) {
    var r = Object.keys(e);
    if (Object.getOwnPropertySymbols) {
        var n = Object.getOwnPropertySymbols(e);
        t && (n = n.filter(function(i) {
            return Object.getOwnPropertyDescriptor(e, i).enumerable;
        })), r.push.apply(r, n);
    }
    return r;
}
function p4(e) {
    for(var t = 1; t < arguments.length; t++){
        var r = arguments[t] != null ? arguments[t] : {
        };
        t % 2 ? o(Object(r), !0).forEach(function(n) {
            f2(e, n, r[n]);
        }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(r)) : o(Object(r)).forEach(function(n) {
            Object.defineProperty(e, n, Object.getOwnPropertyDescriptor(r, n));
        });
    }
    return e;
}
function i1(e) {
    return "Minified Redux error #" + e + "; visit https://redux.js.org/Errors?code=" + e + " for the full message or use the non-minified dev environment for full errors. ";
}
var x3 = function() {
    return typeof Symbol == "function" && Symbol.observable || "@@observable";
}(), N2 = function() {
    return Math.random().toString(36).substring(7).split("").join(".");
}, m4 = {
    INIT: "@@redux/INIT" + N2(),
    REPLACE: "@@redux/REPLACE" + N2(),
    PROBE_UNKNOWN_ACTION: function() {
        return "@@redux/PROBE_UNKNOWN_ACTION" + N2();
    }
};
function I4(e) {
    if (typeof e != "object" || e === null) return !1;
    for(var t = e; Object.getPrototypeOf(t) !== null;)t = Object.getPrototypeOf(t);
    return Object.getPrototypeOf(e) === t;
}
function _6(e, t, r) {
    var o;
    if (typeof t == "function" && typeof r == "function" || typeof r == "function" && typeof arguments[3] == "function") throw new Error(i1(0));
    if (typeof t == "function" && typeof r == "undefined" && (r = t, t = void 0), typeof r != "undefined") {
        if (typeof r != "function") throw new Error(i1(1));
        return r(_6)(e, t);
    }
    if (typeof e != "function") throw new Error(i1(2));
    var s = e, d = t, h = [], a = h, u = !1;
    function l() {
        a === h && (a = h.slice());
    }
    function v() {
        if (u) throw new Error(i1(3));
        return d;
    }
    function E(n) {
        if (typeof n != "function") throw new Error(i1(4));
        if (u) throw new Error(i1(5));
        var p = !0;
        return l(), a.push(n), function() {
            if (!!p) {
                if (u) throw new Error(i1(6));
                p = !1, l();
                var c = a.indexOf(n);
                a.splice(c, 1), h = null;
            }
        };
    }
    function f(n) {
        if (!I4(n)) throw new Error(i1(7));
        if (typeof n.type == "undefined") throw new Error(i1(8));
        if (u) throw new Error(i1(9));
        try {
            u = !0, d = s(d, n);
        } finally{
            u = !1;
        }
        for(var p = h = a, y = 0; y < p.length; y++){
            var c = p[y];
            c();
        }
        return n;
    }
    function b(n) {
        if (typeof n != "function") throw new Error(i1(10));
        s = n, f({
            type: m4.REPLACE
        });
    }
    function g() {
        var n, p = E;
        return n = {
            subscribe: function(c) {
                if (typeof c != "object" || c === null) throw new Error(i1(11));
                function w() {
                    c.next && c.next(v());
                }
                w();
                var k = p(w);
                return {
                    unsubscribe: k
                };
            }
        }, n[x3] = function() {
            return this;
        }, n;
    }
    return f({
        type: m4.INIT
    }), o = {
        dispatch: f,
        subscribe: E,
        getState: v,
        replaceReducer: b
    }, o[x3] = g, o;
}
function S5(e) {
    Object.keys(e).forEach(function(t) {
        var r = e[t], o = r(void 0, {
            type: m4.INIT
        });
        if (typeof o == "undefined") throw new Error(i1(12));
        if (typeof r(void 0, {
            type: m4.PROBE_UNKNOWN_ACTION()
        }) == "undefined") throw new Error(i1(13));
    });
}
function A3(e) {
    for(var t = Object.keys(e), r = {
    }, o = 0; o < t.length; o++){
        var s = t[o];
        typeof e[s] == "function" && (r[s] = e[s]);
    }
    var d = Object.keys(r), h, a;
    try {
        S5(r);
    } catch (u) {
        a = u;
    }
    return function(l, v) {
        if (l === void 0 && (l = {
        }), a) throw a;
        if (!1) var E;
        for(var f = !1, b = {
        }, g = 0; g < d.length; g++){
            var n = d[g], p = r[n], y = l[n], c = p(y, v);
            if (typeof c == "undefined") {
                var w = v && v.type;
                throw new Error(i1(14));
            }
            b[n] = c, f = f || c !== y;
        }
        return f = f || d.length !== Object.keys(l).length, f ? b : l;
    };
}
function j8() {
    for(var e = arguments.length, t = new Array(e), r = 0; r < e; r++)t[r] = arguments[r];
    return t.length === 0 ? function(o) {
        return o;
    } : t.length === 1 ? t[0] : t.reduce(function(o, s) {
        return function() {
            return o(s.apply(void 0, arguments));
        };
    });
}
function R6() {
    for(var e = arguments.length, t = new Array(e), r = 0; r < e; r++)t[r] = arguments[r];
    return function(o) {
        return function() {
            var s = o.apply(void 0, arguments), d = function() {
                throw new Error(i1(15));
            }, h = {
                getState: s.getState,
                dispatch: function() {
                    return d.apply(void 0, arguments);
                }
            }, a = t.map(function(u) {
                return u(h);
            });
            return d = j8.apply(void 0, a)(s.dispatch), p4(p4({
            }, s), {
            }, {
                dispatch: d
            });
        };
    };
}
function n1(u) {
    return function(e) {
        var a = e.dispatch, i = e.getState;
        return function(f) {
            return function(t) {
                return typeof t == "function" ? t(a, i, u) : f(t);
            };
        };
    };
}
var r = n1();
r.withExtraArgument = n1;
var c1 = r;
var oe4 = function() {
    var e = function(t, r) {
        return e = Object.setPrototypeOf || ({
            __proto__: []
        }) instanceof Array && function(n, i) {
            n.__proto__ = i;
        } || function(n, i) {
            for(var a in i)Object.prototype.hasOwnProperty.call(i, a) && (n[a] = i[a]);
        }, e(t, r);
    };
    return function(t, r) {
        if (typeof r != "function" && r !== null) throw new TypeError("Class extends value " + String(r) + " is not a constructor or null");
        e(t, r);
        function n() {
            this.constructor = t;
        }
        t.prototype = r === null ? Object.create(r) : (n.prototype = r.prototype, new n);
    };
}(), k2 = function(e, t) {
    for(var r = 0, n = t.length, i = e.length; r < n; r++, i++)e[i] = t[r];
    return e;
}, fe4 = Object.defineProperty, B3 = Object.getOwnPropertySymbols, se2 = Object.prototype.hasOwnProperty, ve3 = Object.prototype.propertyIsEnumerable, L3 = function(e, t, r) {
    return t in e ? fe4(e, t, {
        enumerable: !0,
        configurable: !0,
        writable: !0,
        value: r
    }) : e[t] = r;
}, E5 = function(e, t) {
    for(var r in t || (t = {
    }))se2.call(t, r) && L3(e, r, t[r]);
    if (B3) for(var n = 0, i = B3(t); n < i.length; n++){
        var r = i[n];
        ve3.call(t, r) && L3(e, r, t[r]);
    }
    return e;
}, Ae2 = typeof window != "undefined" && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ : function() {
    if (arguments.length !== 0) return typeof arguments[0] == "object" ? j8 : j8.apply(null, arguments);
};
function P4(e) {
    if (typeof e != "object" || e === null) return !1;
    for(var t = e; Object.getPrototypeOf(t) !== null;)t = Object.getPrototypeOf(t);
    return Object.getPrototypeOf(e) === t;
}
var Ee1 = function(e) {
    oe4(t, e);
    function t() {
        for(var r = [], n = 0; n < arguments.length; n++)r[n] = arguments[n];
        var i = e.apply(this, r) || this;
        return Object.setPrototypeOf(i, t.prototype), i;
    }
    return Object.defineProperty(t, Symbol.species, {
        get: function() {
            return t;
        },
        enumerable: !1,
        configurable: !0
    }), t.prototype.concat = function() {
        for(var r = [], n = 0; n < arguments.length; n++)r[n] = arguments[n];
        return e.prototype.concat.apply(this, r);
    }, t.prototype.prepend = function() {
        for(var r = [], n = 0; n < arguments.length; n++)r[n] = arguments[n];
        return r.length === 1 && Array.isArray(r[0]) ? new (t.bind.apply(t, k2([
            void 0
        ], r[0].concat(this)))) : new (t.bind.apply(t, k2([
            void 0
        ], r.concat(this))));
    }, t;
}(Array);
function ke2(e) {
    return typeof e == "boolean";
}
function De1() {
    return function(t) {
        return Ne(t);
    };
}
function Ne(e) {
    e === void 0 && (e = {
    });
    var t = e.thunk, r = t === void 0 ? !0 : t, n = e.immutableCheck, i = n === void 0 ? !0 : n, a = e.serializableCheck, f = a === void 0 ? !0 : a, s = new Ee1;
    if (r && (ke2(r) ? s.push(c1) : s.push(c1.withExtraArgument(r.extraArgument))), !1) {
        if (i) var p;
        if (f) var u;
    }
    return s;
}
var W2 = !0;
function br(e) {
    var t = De1(), r = e || {
    }, n = r.reducer, i = n === void 0 ? void 0 : n, a = r.middleware, f = a === void 0 ? t() : a, s = r.devTools, p = s === void 0 ? !0 : s, u = r.preloadedState, y = u === void 0 ? void 0 : u, g = r.enhancers, v = g === void 0 ? void 0 : g, w;
    if (typeof i == "function") w = i;
    else if (P4(i)) w = A3(i);
    else throw new Error('"reducer" is a required argument, and must be a function or an object of functions that can be passed to combineReducers');
    var c = f;
    if (typeof c == "function" && (c = c(t), !W2 && !Array.isArray(c))) throw new Error("when using a middleware builder function, an array of middleware must be returned");
    if (!W2 && c.some(function(l) {
        return typeof l != "function";
    })) throw new Error("each middleware provided to configureStore must be a function");
    var o = R6.apply(void 0, c), m = j8;
    p && (m = Ae2(E5({
        trace: !W2
    }, typeof p == "object" && p)));
    var b = [
        o
    ];
    Array.isArray(v) ? b = k2([
        o
    ], v) : typeof v == "function" && (b = v(b));
    var d = m.apply(void 0, b);
    return _6(w, y, d);
}
function D6(e, t) {
    function r() {
        for(var n = [], i = 0; i < arguments.length; i++)n[i] = arguments[i];
        if (t) {
            var a = t.apply(void 0, n);
            if (!a) throw new Error("prepareAction did not return an object");
            return E5(E5({
                type: e,
                payload: a.payload
            }, "meta" in a && {
                meta: a.meta
            }), "error" in a && {
                error: a.error
            });
        }
        return {
            type: e,
            payload: n[0]
        };
    }
    return r.toString = function() {
        return "" + e;
    }, r.type = e, r.match = function(n) {
        return n.type === e;
    }, r;
}
function re3(e) {
    var t = {
    }, r = [], n, i = {
        addCase: function(a, f) {
            var s = typeof a == "string" ? a : a.type;
            if (s in t) throw new Error("addCase cannot be called with two reducers for the same action type");
            return t[s] = f, i;
        },
        addMatcher: function(a, f) {
            return r.push({
                matcher: a,
                reducer: f
            }), i;
        },
        addDefaultCase: function(a) {
            return n = a, i;
        }
    };
    return e(i), [
        t,
        r,
        n
    ];
}
function ze(e, t, r, n) {
    r === void 0 && (r = []);
    var i = typeof t == "function" ? re3(t) : [
        t,
        r,
        n
    ], a = i[0], f = i[1], s = i[2], p = Me(e, function() {
    });
    return function(u, y) {
        u === void 0 && (u = p);
        var g = k2([
            a[y.type]
        ], f.filter(function(v) {
            var w = v.matcher;
            return w(y);
        }).map(function(v) {
            var w = v.reducer;
            return w;
        }));
        return g.filter(function(v) {
            return !!v;
        }).length === 0 && (g = [
            s
        ]), g.reduce(function(v, w) {
            if (w) if (_5(v)) {
                var c = v, o = w(c, y);
                return typeof o == "undefined" ? v : o;
            } else {
                if (D5(v)) return Me(v, function(m) {
                    return w(m, y);
                });
                var o = w(v, y);
                if (typeof o == "undefined") {
                    if (v === null) return v;
                    throw Error("A case reducer on a non-draftable value must not return undefined");
                }
                return o;
            }
            return v;
        }, u);
    };
}
function Pe2(e, t) {
    return e + "/" + t;
}
function Mr1(e) {
    var t = e.name, r = e.initialState;
    if (!t) throw new Error("`name` is a required option for createSlice");
    var n = e.reducers || {
    }, i = typeof e.extraReducers == "function" ? re3(e.extraReducers) : [
        e.extraReducers
    ], a = i[0], f = a === void 0 ? {
    } : a, s = i[1], p = s === void 0 ? [] : s, u = i[2], y = u === void 0 ? void 0 : u, g = Object.keys(n), v = {
    }, w = {
    }, c = {
    };
    g.forEach(function(b) {
        var d = n[b], l = Pe2(t, b), h, O;
        "reducer" in d ? (h = d.reducer, O = d.prepare) : h = d, v[b] = h, w[l] = h, c[b] = O ? D6(l, O) : D6(l);
    });
    var o = E5(E5({
    }, f), w), m = ze(r, o, p, y);
    return {
        name: t,
        reducer: m,
        actions: c,
        caseReducers: v
    };
}
ye2();
const randomUUID = ()=>crypto.randomUUID()
;
const outputSlice = Mr1({
    name: "output",
    initialState: [],
    reducers: {
        append: (state, log)=>{
            state.splice(0, 0, {
                time: Date.now(),
                key: randomUUID(),
                node: log.payload
            }).slice(0, 250);
        }
    }
});
const formatDuration = (ms)=>{
    if (ms < 1000) return `${ms}ms`;
    if (ms < 60000) return `${(ms / 1000).toPrecision(3)}s`;
    return `${(ms / 60000).toPrecision(3)}m`;
};
const useQuery = (connection)=>{
    const selectedConnection = Ur((s)=>s.connection.connection
    );
    const [lastResults, setLastResults] = qe();
    const usedConnection = connection ?? selectedConnection;
    const dispatch = useAppDispatch();
    if (usedConnection) return async (query, cache = "no-cache")=>{
        dispatch(outputSlice.actions.append(query));
        const start = Date.now();
        const results = await fetch(`${usedConnection.proxy ?? "http://localhost:3000"}/?config=${encodeURIComponent(JSON.stringify(usedConnection))}&query=${encodeURIComponent(query)}`, {
            cache: !lastResults || lastResults instanceof Error || lastResults.error ? "reload" : cache
        }).then((r)=>r.json()
        ).catch((err)=>err
        );
        setLastResults(results);
        if (results instanceof Error) {
            if (results.message === "Failed to fetch") {
                results.message = `Unable to connect to proxy service at ${usedConnection.proxy}; download and run at https://github.com/voces/gritli-proxy`;
            }
            dispatch(outputSlice.actions.append(export_default4.createElement("span", {
                style: {
                    color: "red"
                }
            }, "-- ", results.message)));
            throw results;
        }
        const totalDuration = Date.now() - start;
        if (results.error) dispatch(outputSlice.actions.append(export_default4.createElement("span", {
            style: {
                color: "red"
            }
        }, "-- ", results.error)));
        if (results.rows) dispatch(outputSlice.actions.append(export_default4.createElement("span", {
            style: {
                color: "#666"
            }
        }, `-- completed with ${results.rows.length} results in ${formatDuration(totalDuration)} (${formatDuration(results.duration)} query time)`)));
        return results;
    };
    return (query)=>{
        console.warn("No connection for query", query);
        return Promise.resolve({
            duration: 0,
            error: "No connection selected"
        });
    };
};
const types = {
    [0]: "number",
    [1]: "number",
    [2]: "number",
    [3]: "number",
    [4]: "number",
    [5]: "number",
    [6]: "other",
    [7]: "date",
    [8]: "number",
    [9]: "number",
    [10]: "date",
    [11]: "date",
    [12]: "date",
    [13]: "date",
    [14]: "date",
    [15]: "string",
    [16]: "other",
    [17]: "date",
    [18]: "date",
    [19]: "date",
    [246]: "number",
    [247]: "string",
    [248]: "other",
    [249]: "other",
    [250]: "other",
    [251]: "other",
    [252]: "other",
    [253]: "string",
    [254]: "string",
    [255]: "other",
    [256]: "boolean"
};
const OptionComponent = ({ option  })=>{
    const [hovered, setHovered] = qe(false);
    if (option.type === "option-separator") {
        return export_default4.createElement("div", {
            style: {
                margin: "4px 8px",
                ...theme.contextMenu.separator
            }
        });
    }
    return export_default4.createElement("div", {
        onClick: ()=>option.onClick()
        ,
        style: {
            fontSize: 14,
            padding: "4px 32px",
            cursor: "pointer",
            ...theme.contextMenu.option,
            ...hovered ? theme.contextMenu.optionHovered : undefined
        },
        onMouseOver: ()=>setHovered(true)
        ,
        onMouseLeave: ()=>setHovered(false)
    }, option.label);
};
const ContextMenu = ({ options , shown , left , top  })=>{
    return export_default4.createElement(export_default4.Fragment, null, shown && export_default4.createElement("div", {
        style: {
            position: "absolute",
            top,
            left,
            zIndex: 100,
            boxShadow: "0px 2px 4px 1px rgba(0, 0, 0, 0.2)",
            padding: "6px 0",
            ...theme.contextMenu.container
        }
    }, options.map((o, i)=>export_default4.createElement(OptionComponent, {
            key: i,
            option: o
        })
    )));
};
var h6 = class extends Map {
    constructor(e, s3 = i2){
        super();
        if (Object.defineProperties(this, {
            _intern: {
                value: new Map
            },
            _key: {
                value: s3
            }
        }), e != null) for (let [r1, c2] of e)this.set(r1, c2);
    }
    get(e) {
        return super.get(n2(this, e));
    }
    has(e) {
        return super.has(n2(this, e));
    }
    set(e, s) {
        return super.set(u1(this, e), s);
    }
    delete(e) {
        return super.delete(o1(this, e));
    }
}, f3 = class extends Set {
    constructor(e1, s4 = i2){
        super();
        if (Object.defineProperties(this, {
            _intern: {
                value: new Map
            },
            _key: {
                value: s4
            }
        }), e1 != null) for (let r2 of e1)this.add(r2);
    }
    has(e) {
        return super.has(n2(this, e));
    }
    add(e) {
        return super.add(u1(this, e));
    }
    delete(e) {
        return super.delete(o1(this, e));
    }
};
function n2({ _intern: t , _key: e  }, s) {
    let r = e(s);
    return t.has(r) ? t.get(r) : s;
}
function u1({ _intern: t , _key: e  }, s) {
    let r = e(s);
    return t.has(r) ? t.get(r) : (t.set(r, s), s);
}
function o1({ _intern: t , _key: e  }, s) {
    let r = e(s);
    return t.has(r) && (s = t.get(r), t.delete(r)), s;
}
function i2(t) {
    return t !== null && typeof t == "object" ? t.valueOf() : t;
}
function c3(e, t) {
    return e == null || t == null ? NaN : e < t ? -1 : e > t ? 1 : e >= t ? 0 : NaN;
}
function q4(e) {
    let t = e, n = e, o = e;
    e.length !== 2 && (t = (u, s)=>e(u) - s
    , n = c3, o = (u, s)=>c3(e(u), s)
    );
    function r(u, s, a = 0, d = u.length) {
        if (a < d) {
            if (n(s, s) !== 0) return d;
            do {
                let l = a + d >>> 1;
                o(u[l], s) < 0 ? a = l + 1 : d = l;
            }while (a < d)
        }
        return a;
    }
    function f(u, s, a = 0, d = u.length) {
        if (a < d) {
            if (n(s, s) !== 0) return d;
            do {
                let l = a + d >>> 1;
                o(u[l], s) <= 0 ? a = l + 1 : d = l;
            }while (a < d)
        }
        return a;
    }
    function i(u, s, a = 0, d = u.length) {
        let l = r(u, s, a, d - 1);
        return l > a && t(u[l - 1], s) > -t(u[l], s) ? l - 1 : l;
    }
    return {
        left: r,
        center: i,
        right: f
    };
}
var ne4 = q4(c3), re4 = ne4.right, X4 = re4;
var V4 = class {
    constructor(){
        this._partials = new Float64Array(32), this._n = 0;
    }
    add(t) {
        let n = this._partials, o = 0;
        for(let r = 0; r < this._n && r < 32; r++){
            let f = n[r], i = t + f, u = Math.abs(t) < Math.abs(f) ? t - (i - f) : f - (i - t);
            u && (n[o++] = u), t = i;
        }
        return n[o] = t, this._n = o + 1, this;
    }
    valueOf() {
        let t = this._partials, n = this._n, o, r, f, i = 0;
        if (n > 0) {
            for(i = t[--n]; n > 0 && (o = i, r = t[--n], i = o + r, f = r - (i - o), !f););
            n > 0 && (f < 0 && t[n - 1] < 0 || f > 0 && t[n - 1] > 0) && (r = f * 2, o = i + r, r == o - i && (i = o));
        }
        return i;
    }
};
var Z5 = Math.sqrt(50), $2 = Math.sqrt(10), _7 = Math.sqrt(2);
function C4(e, t, n) {
    var o, r = -1, f, i, u;
    if (t = +t, e = +e, n = +n, e === t && n > 0) return [
        e
    ];
    if ((o = t < e) && (f = e, e = t, t = f), (u = I5(e, t, n)) === 0 || !isFinite(u)) return [];
    if (u > 0) {
        let s = Math.round(e / u), a = Math.round(t / u);
        for(s * u < e && ++s, a * u > t && --a, i = new Array(f = a - s + 1); ++r < f;)i[r] = (s + r) * u;
    } else {
        u = -u;
        let s = Math.round(e * u), a = Math.round(t * u);
        for(s / u < e && ++s, a / u > t && --a, i = new Array(f = a - s + 1); ++r < f;)i[r] = (s + r) / u;
    }
    return o && i.reverse(), i;
}
function I5(e, t, n) {
    var o = (t - e) / Math.max(0, n), r = Math.floor(Math.log(o) / Math.LN10), f = o / Math.pow(10, r);
    return r >= 0 ? (f >= Z5 ? 10 : f >= $2 ? 5 : f >= _7 ? 2 : 1) * Math.pow(10, r) : -Math.pow(10, -r) / (f >= Z5 ? 10 : f >= $2 ? 5 : f >= _7 ? 2 : 1);
}
function nt1(e, t, n) {
    var o = Math.abs(t - e) / Math.max(0, n), r = Math.pow(10, Math.floor(Math.log(o) / Math.LN10)), f = o / r;
    return f >= Z5 ? r *= 10 : f >= $2 ? r *= 5 : f >= _7 && (r *= 2), t < e ? -r : r;
}
var l3 = {
    value: ()=>{
    }
};
function s5() {
    for(var r = 0, t = arguments.length, n = {
    }, e; r < t; ++r){
        if (!(e = arguments[r] + "") || e in n || /[\s.]/.test(e)) throw new Error("illegal type: " + e);
        n[e] = [];
    }
    return new f4(n);
}
function f4(r) {
    this._ = r;
}
function h7(r, t) {
    return r.trim().split(/^|\s+/).map(function(n) {
        var e = "", o = n.indexOf(".");
        if (o >= 0 && (e = n.slice(o + 1), n = n.slice(0, o)), n && !t.hasOwnProperty(n)) throw new Error("unknown type: " + n);
        return {
            type: n,
            name: e
        };
    });
}
f4.prototype = s5.prototype = {
    constructor: f4,
    on: function(r, t) {
        var n = this._, e = h7(r + "", n), o, u = -1, i = e.length;
        if (arguments.length < 2) {
            for(; ++u < i;)if ((o = (r = e[u]).type) && (o = w3(n[o], r.name))) return o;
            return;
        }
        if (t != null && typeof t != "function") throw new Error("invalid callback: " + t);
        for(; ++u < i;)if (o = (r = e[u]).type) n[o] = a1(n[o], r.name, t);
        else if (t == null) for(o in n)n[o] = a1(n[o], r.name, null);
        return this;
    },
    copy: function() {
        var r = {
        }, t = this._;
        for(var n in t)r[n] = t[n].slice();
        return new f4(r);
    },
    call: function(r, t) {
        if ((o = arguments.length - 2) > 0) for(var n = new Array(o), e = 0, o, u; e < o; ++e)n[e] = arguments[e + 2];
        if (!this._.hasOwnProperty(r)) throw new Error("unknown type: " + r);
        for(u = this._[r], e = 0, o = u.length; e < o; ++e)u[e].value.apply(t, n);
    },
    apply: function(r, t, n) {
        if (!this._.hasOwnProperty(r)) throw new Error("unknown type: " + r);
        for(var e = this._[r], o = 0, u = e.length; o < u; ++o)e[o].value.apply(t, n);
    }
};
function w3(r, t) {
    for(var n = 0, e = r.length, o; n < e; ++n)if ((o = r[n]).name === t) return o.value;
}
function a1(r, t, n) {
    for(var e = 0, o = r.length; e < o; ++e)if (r[e].name === t) {
        r[e] = l3, r = r.slice(0, e).concat(r.slice(e + 1));
        break;
    }
    return n != null && r.push({
        name: t,
        value: n
    }), r;
}
var c4 = s5;
var C5 = "http://www.w3.org/1999/xhtml", E6 = {
    svg: "http://www.w3.org/2000/svg",
    xhtml: C5,
    xlink: "http://www.w3.org/1999/xlink",
    xml: "http://www.w3.org/XML/1998/namespace",
    xmlns: "http://www.w3.org/2000/xmlns/"
};
function x4(t) {
    var e = t += "", r = e.indexOf(":");
    return r >= 0 && (e = t.slice(0, r)) !== "xmlns" && (t = t.slice(r + 1)), E6.hasOwnProperty(e) ? {
        space: E6[e],
        local: t
    } : t;
}
function Rt(t) {
    return function() {
        var e = this.ownerDocument, r = this.namespaceURI;
        return r === C5 && e.documentElement.namespaceURI === C5 ? e.createElement(t) : e.createElementNS(r, t);
    };
}
function Vt(t) {
    return function() {
        return this.ownerDocument.createElementNS(t.space, t.local);
    };
}
function _8(t) {
    var e = x4(t);
    return (e.local ? Vt : Rt)(e);
}
function Ft() {
}
function g6(t) {
    return t == null ? Ft : function() {
        return this.querySelector(t);
    };
}
function k3(t) {
    typeof t != "function" && (t = g6(t));
    for(var e = this._groups, r = e.length, i = new Array(r), n = 0; n < r; ++n)for(var o = e[n], l = o.length, s = i[n] = new Array(l), f, u, c = 0; c < l; ++c)(f = o[c]) && (u = t.call(f, f.__data__, c, o)) && ("__data__" in f && (u.__data__ = f.__data__), s[c] = u);
    return new a2(i, this._parents);
}
function v6(t) {
    return t == null ? [] : Array.isArray(t) ? t : Array.from(t);
}
function Bt() {
    return [];
}
function R7(t) {
    return t == null ? Bt : function() {
        return this.querySelectorAll(t);
    };
}
function Mt(t) {
    return function() {
        return v6(t.apply(this, arguments));
    };
}
function z6(t) {
    typeof t == "function" ? t = Mt(t) : t = R7(t);
    for(var e = this._groups, r = e.length, i = [], n = [], o = 0; o < r; ++o)for(var l = e[o], s = l.length, f, u = 0; u < s; ++u)(f = l[u]) && (i.push(t.call(f, f.__data__, u, l)), n.push(f));
    return new a2(i, n);
}
function V5(t) {
    return function() {
        return this.matches(t);
    };
}
function N3(t) {
    return function(e) {
        return e.matches(t);
    };
}
var Tt = Array.prototype.find;
function Pt(t) {
    return function() {
        return Tt.call(this.children, t);
    };
}
function qt() {
    return this.firstElementChild;
}
function H3(t) {
    return this.select(t == null ? qt : Pt(typeof t == "function" ? t : N3(t)));
}
var Dt = Array.prototype.filter;
function It() {
    return Array.from(this.children);
}
function Ot(t) {
    return function() {
        return Dt.call(this.children, t);
    };
}
function U2(t) {
    return this.selectAll(t == null ? It : Ot(typeof t == "function" ? t : N3(t)));
}
function X5(t) {
    typeof t != "function" && (t = V5(t));
    for(var e = this._groups, r = e.length, i = new Array(r), n = 0; n < r; ++n)for(var o = e[n], l = o.length, s = i[n] = [], f, u = 0; u < l; ++u)(f = o[u]) && t.call(f, f.__data__, u, o) && s.push(f);
    return new a2(i, this._parents);
}
function L4(t) {
    return new Array(t.length);
}
function Y4() {
    return new a2(this._enter || this._groups.map(L4), this._parents);
}
function w4(t, e) {
    this.ownerDocument = t.ownerDocument, this.namespaceURI = t.namespaceURI, this._next = null, this._parent = t, this.__data__ = e;
}
w4.prototype = {
    constructor: w4,
    appendChild: function(t) {
        return this._parent.insertBefore(t, this._next);
    },
    insertBefore: function(t, e) {
        return this._parent.insertBefore(t, e);
    },
    querySelector: function(t) {
        return this._parent.querySelector(t);
    },
    querySelectorAll: function(t) {
        return this._parent.querySelectorAll(t);
    }
};
function K3(t) {
    return function() {
        return t;
    };
}
function kt(t, e, r, i, n, o) {
    for(var l = 0, s, f = e.length, u = o.length; l < u; ++l)(s = e[l]) ? (s.__data__ = o[l], i[l] = s) : r[l] = new w4(t, o[l]);
    for(; l < f; ++l)(s = e[l]) && (n[l] = s);
}
function zt(t, e, r, i, n, o, l) {
    var s, f, u = new Map, c = e.length, h = o.length, m = new Array(c), p;
    for(s = 0; s < c; ++s)(f = e[s]) && (m[s] = p = l.call(f, f.__data__, s, e) + "", u.has(p) ? n[s] = f : u.set(p, f));
    for(s = 0; s < h; ++s)p = l.call(t, o[s], s, o) + "", (f = u.get(p)) ? (i[s] = f, f.__data__ = o[s], u.delete(p)) : r[s] = new w4(t, o[s]);
    for(s = 0; s < c; ++s)(f = e[s]) && u.get(m[s]) === f && (n[s] = f);
}
function Ht(t) {
    return t.__data__;
}
function G5(t, e) {
    if (!arguments.length) return Array.from(this, Ht);
    var r = e ? zt : kt, i = this._parents, n = this._groups;
    typeof t != "function" && (t = K3(t));
    for(var o = n.length, l = new Array(o), s = new Array(o), f = new Array(o), u = 0; u < o; ++u){
        var c = i[u], h = n[u], m = h.length, p = Ut(t.call(c, c && c.__data__, u, i)), d = p.length, q = s[u] = new Array(d), D = l[u] = new Array(d), bt = f[u] = new Array(m);
        r(c, h, q, D, bt, p, e);
        for(var y = 0, S = 0, I, O; y < d; ++y)if (I = q[y]) {
            for(y >= S && (S = y + 1); !(O = D[S]) && ++S < d;);
            I._next = O || null;
        }
    }
    return l = new a2(l, i), l._enter = s, l._exit = f, l;
}
function Ut(t) {
    return typeof t == "object" && "length" in t ? t : Array.from(t);
}
function J4() {
    return new a2(this._exit || this._groups.map(L4), this._parents);
}
function Q3(t, e, r) {
    var i = this.enter(), n = this, o = this.exit();
    return typeof t == "function" ? (i = t(i), i && (i = i.selection())) : i = i.append(t + ""), e != null && (n = e(n), n && (n = n.selection())), r == null ? o.remove() : r(o), i && n ? i.merge(n).order() : n;
}
function W3(t) {
    for(var e = t.selection ? t.selection() : t, r = this._groups, i = e._groups, n = r.length, o = i.length, l = Math.min(n, o), s = new Array(n), f = 0; f < l; ++f)for(var u = r[f], c = i[f], h = u.length, m = s[f] = new Array(h), p, d = 0; d < h; ++d)(p = u[d] || c[d]) && (m[d] = p);
    for(; f < n; ++f)s[f] = r[f];
    return new a2(s, this._parents);
}
function Z6() {
    for(var t = this._groups, e = -1, r = t.length; ++e < r;)for(var i = t[e], n = i.length - 1, o = i[n], l; --n >= 0;)(l = i[n]) && (o && l.compareDocumentPosition(o) ^ 4 && o.parentNode.insertBefore(l, o), o = l);
    return this;
}
function $3(t) {
    t || (t = Xt);
    function e(h, m) {
        return h && m ? t(h.__data__, m.__data__) : !h - !m;
    }
    for(var r = this._groups, i = r.length, n = new Array(i), o = 0; o < i; ++o){
        for(var l = r[o], s = l.length, f = n[o] = new Array(s), u, c = 0; c < s; ++c)(u = l[c]) && (f[c] = u);
        f.sort(e);
    }
    return new a2(n, this._parents).order();
}
function Xt(t, e) {
    return t < e ? -1 : t > e ? 1 : t >= e ? 0 : NaN;
}
function tt1() {
    var t = arguments[0];
    return arguments[0] = this, t.apply(null, arguments), this;
}
function et1() {
    return Array.from(this);
}
function rt1() {
    for(var t = this._groups, e = 0, r = t.length; e < r; ++e)for(var i = t[e], n = 0, o = i.length; n < o; ++n){
        var l = i[n];
        if (l) return l;
    }
    return null;
}
function nt2() {
    let t = 0;
    for (let e of this)++t;
    return t;
}
function it1() {
    return !this.node();
}
function ot(t) {
    for(var e = this._groups, r = 0, i = e.length; r < i; ++r)for(var n = e[r], o = 0, l = n.length, s; o < l; ++o)(s = n[o]) && t.call(s, s.__data__, o, n);
    return this;
}
function Yt(t) {
    return function() {
        this.removeAttribute(t);
    };
}
function Kt(t) {
    return function() {
        this.removeAttributeNS(t.space, t.local);
    };
}
function Gt(t, e) {
    return function() {
        this.setAttribute(t, e);
    };
}
function Jt(t, e) {
    return function() {
        this.setAttributeNS(t.space, t.local, e);
    };
}
function Qt(t, e) {
    return function() {
        var r = e.apply(this, arguments);
        r == null ? this.removeAttribute(t) : this.setAttribute(t, r);
    };
}
function Wt(t, e) {
    return function() {
        var r = e.apply(this, arguments);
        r == null ? this.removeAttributeNS(t.space, t.local) : this.setAttributeNS(t.space, t.local, r);
    };
}
function st1(t, e) {
    var r = x4(t);
    if (arguments.length < 2) {
        var i = this.node();
        return r.local ? i.getAttributeNS(r.space, r.local) : i.getAttribute(r);
    }
    return this.each((e == null ? r.local ? Kt : Yt : typeof e == "function" ? r.local ? Wt : Qt : r.local ? Jt : Gt)(r, e));
}
function A4(t) {
    return t.ownerDocument && t.ownerDocument.defaultView || t.document && t || t.defaultView;
}
function Zt(t) {
    return function() {
        this.style.removeProperty(t);
    };
}
function $t(t, e, r) {
    return function() {
        this.style.setProperty(t, e, r);
    };
}
function te4(t, e, r) {
    return function() {
        var i = e.apply(this, arguments);
        i == null ? this.style.removeProperty(t) : this.style.setProperty(t, i, r);
    };
}
function lt(t, e, r) {
    return arguments.length > 1 ? this.each((e == null ? Zt : typeof e == "function" ? te4 : $t)(t, e, r ?? "")) : ft(this.node(), t);
}
function ft(t, e) {
    return t.style.getPropertyValue(e) || A4(t).getComputedStyle(t, null).getPropertyValue(e);
}
function ee5(t) {
    return function() {
        delete this[t];
    };
}
function re5(t, e) {
    return function() {
        this[t] = e;
    };
}
function ne5(t, e) {
    return function() {
        var r = e.apply(this, arguments);
        r == null ? delete this[t] : this[t] = r;
    };
}
function ut(t, e) {
    return arguments.length > 1 ? this.each((e == null ? ee5 : typeof e == "function" ? ne5 : re5)(t, e)) : this.node()[t];
}
function ct(t) {
    return t.trim().split(/^|\s+/);
}
function F5(t) {
    return t.classList || new at1(t);
}
function at1(t) {
    this._node = t, this._names = ct(t.getAttribute("class") || "");
}
at1.prototype = {
    add: function(t) {
        var e = this._names.indexOf(t);
        e < 0 && (this._names.push(t), this._node.setAttribute("class", this._names.join(" ")));
    },
    remove: function(t) {
        var e = this._names.indexOf(t);
        e >= 0 && (this._names.splice(e, 1), this._node.setAttribute("class", this._names.join(" ")));
    },
    contains: function(t) {
        return this._names.indexOf(t) >= 0;
    }
};
function pt(t, e) {
    for(var r = F5(t), i = -1, n = e.length; ++i < n;)r.add(e[i]);
}
function ht(t, e) {
    for(var r = F5(t), i = -1, n = e.length; ++i < n;)r.remove(e[i]);
}
function ie3(t) {
    return function() {
        pt(this, t);
    };
}
function oe5(t) {
    return function() {
        ht(this, t);
    };
}
function se3(t, e) {
    return function() {
        (e.apply(this, arguments) ? pt : ht)(this, t);
    };
}
function mt(t, e) {
    var r = ct(t + "");
    if (arguments.length < 2) {
        for(var i = F5(this.node()), n = -1, o = r.length; ++n < o;)if (!i.contains(r[n])) return !1;
        return !0;
    }
    return this.each((typeof e == "function" ? se3 : e ? ie3 : oe5)(r, e));
}
function le3() {
    this.textContent = "";
}
function fe5(t) {
    return function() {
        this.textContent = t;
    };
}
function ue3(t) {
    return function() {
        var e = t.apply(this, arguments);
        this.textContent = e ?? "";
    };
}
function dt(t) {
    return arguments.length ? this.each(t == null ? le3 : (typeof t == "function" ? ue3 : fe5)(t)) : this.node().textContent;
}
function ce1() {
    this.innerHTML = "";
}
function ae4(t) {
    return function() {
        this.innerHTML = t;
    };
}
function pe3(t) {
    return function() {
        var e = t.apply(this, arguments);
        this.innerHTML = e ?? "";
    };
}
function _t(t) {
    return arguments.length ? this.each(t == null ? ce1 : (typeof t == "function" ? pe3 : ae4)(t)) : this.node().innerHTML;
}
function he3() {
    this.nextSibling && this.parentNode.appendChild(this);
}
function yt() {
    return this.each(he3);
}
function me2() {
    this.previousSibling && this.parentNode.insertBefore(this, this.parentNode.firstChild);
}
function xt() {
    return this.each(me2);
}
function gt(t) {
    var e = typeof t == "function" ? t : _8(t);
    return this.select(function() {
        return this.appendChild(e.apply(this, arguments));
    });
}
function de2() {
    return null;
}
function vt(t, e) {
    var r = typeof t == "function" ? t : _8(t), i = e == null ? de2 : typeof e == "function" ? e : g6(e);
    return this.select(function() {
        return this.insertBefore(r.apply(this, arguments), i.apply(this, arguments) || null);
    });
}
function _e1() {
    var t = this.parentNode;
    t && t.removeChild(this);
}
function wt() {
    return this.each(_e1);
}
function ye3() {
    var t = this.cloneNode(!1), e = this.parentNode;
    return e ? e.insertBefore(t, this.nextSibling) : t;
}
function xe1() {
    var t = this.cloneNode(!0), e = this.parentNode;
    return e ? e.insertBefore(t, this.nextSibling) : t;
}
function At(t) {
    return this.select(t ? xe1 : ye3);
}
function jt(t) {
    return arguments.length ? this.property("__data__", t) : this.node().__data__;
}
function ge3(t) {
    return function(e) {
        t.call(this, e, this.__data__);
    };
}
function ve4(t) {
    return t.trim().split(/^|\s+/).map(function(e) {
        var r = "", i = e.indexOf(".");
        return i >= 0 && (r = e.slice(i + 1), e = e.slice(0, i)), {
            type: e,
            name: r
        };
    });
}
function we3(t) {
    return function() {
        var e = this.__on;
        if (!!e) {
            for(var r = 0, i = -1, n = e.length, o; r < n; ++r)o = e[r], (!t.type || o.type === t.type) && o.name === t.name ? this.removeEventListener(o.type, o.listener, o.options) : e[++i] = o;
            ++i ? e.length = i : delete this.__on;
        }
    };
}
function Ae3(t, e, r) {
    return function() {
        var i = this.__on, n, o = ge3(e);
        if (i) {
            for(var l = 0, s = i.length; l < s; ++l)if ((n = i[l]).type === t.type && n.name === t.name) {
                this.removeEventListener(n.type, n.listener, n.options), this.addEventListener(n.type, n.listener = o, n.options = r), n.value = e;
                return;
            }
        }
        this.addEventListener(t.type, o, r), n = {
            type: t.type,
            name: t.name,
            value: e,
            listener: o,
            options: r
        }, i ? i.push(n) : this.__on = [
            n
        ];
    };
}
function St(t, e, r) {
    var i = ve4(t + ""), n, o = i.length, l;
    if (arguments.length < 2) {
        var s = this.node().__on;
        if (s) {
            for(var f = 0, u = s.length, c; f < u; ++f)for(n = 0, c = s[f]; n < o; ++n)if ((l = i[n]).type === c.type && l.name === c.name) return c.value;
        }
        return;
    }
    for(s = e ? Ae3 : we3, n = 0; n < o; ++n)this.each(s(i[n], e, r));
    return this;
}
function Ct(t, e, r) {
    var i = A4(t), n = i.CustomEvent;
    typeof n == "function" ? n = new n(e, r) : (n = i.document.createEvent("Event"), r ? (n.initEvent(e, r.bubbles, r.cancelable), n.detail = r.detail) : n.initEvent(e, !1, !1)), t.dispatchEvent(n);
}
function je3(t, e) {
    return function() {
        return Ct(this, t, e);
    };
}
function Se2(t, e) {
    return function() {
        return Ct(this, t, e.apply(this, arguments));
    };
}
function Et(t, e) {
    return this.each((typeof e == "function" ? Se2 : je3)(t, e));
}
function* Nt() {
    for(var t = this._groups, e = 0, r = t.length; e < r; ++e)for(var i = t[e], n = 0, o = i.length, l; n < o; ++n)(l = i[n]) && (yield l);
}
var j9 = [
    null
];
function a2(t, e) {
    this._groups = t, this._parents = e;
}
function Lt() {
    return new a2([
        [
            document.documentElement
        ]
    ], j9);
}
function Ce2() {
    return this;
}
a2.prototype = Lt.prototype = {
    constructor: a2,
    select: k3,
    selectAll: z6,
    selectChild: H3,
    selectChildren: U2,
    filter: X5,
    data: G5,
    enter: Y4,
    exit: J4,
    join: Q3,
    merge: W3,
    selection: Ce2,
    order: Z6,
    sort: $3,
    call: tt1,
    nodes: et1,
    node: rt1,
    size: nt2,
    empty: it1,
    each: ot,
    attr: st1,
    style: lt,
    property: ut,
    classed: mt,
    text: dt,
    html: _t,
    raise: yt,
    lower: xt,
    append: gt,
    insert: vt,
    remove: wt,
    clone: At,
    datum: jt,
    on: St,
    dispatch: Et,
    [Symbol.iterator]: Nt
};
var Ee2 = Lt;
function B4(t) {
    return typeof t == "string" ? new a2([
        [
            document.querySelector(t)
        ]
    ], [
        document.documentElement
    ]) : new a2([
        [
            t
        ]
    ], j9);
}
var Le1 = 0;
function M4() {
    return new T5;
}
function T5() {
    this._ = "@" + (++Le1).toString(36);
}
T5.prototype = M4.prototype = {
    constructor: T5,
    get: function(t) {
        for(var e = this._; !(e in t);)if (!(t = t.parentNode)) return;
        return t[e];
    },
    set: function(t, e) {
        return t[this._] = e;
    },
    remove: function(t) {
        return this._ in t && delete t[this._];
    },
    toString: function() {
        return this._;
    }
};
function j10(t, { sourceEvent: o , subject: s , target: l , identifier: f , active: h , x: b , y: w , dx: E , dy: v , dispatch: m  }) {
    Object.defineProperties(this, {
        type: {
            value: t,
            enumerable: !0,
            configurable: !0
        },
        sourceEvent: {
            value: o,
            enumerable: !0,
            configurable: !0
        },
        subject: {
            value: s,
            enumerable: !0,
            configurable: !0
        },
        target: {
            value: l,
            enumerable: !0,
            configurable: !0
        },
        identifier: {
            value: f,
            enumerable: !0,
            configurable: !0
        },
        active: {
            value: h,
            enumerable: !0,
            configurable: !0
        },
        x: {
            value: b,
            enumerable: !0,
            configurable: !0
        },
        y: {
            value: w,
            enumerable: !0,
            configurable: !0
        },
        dx: {
            value: E,
            enumerable: !0,
            configurable: !0
        },
        dy: {
            value: v,
            enumerable: !0,
            configurable: !0
        },
        _: {
            value: m
        }
    });
}
j10.prototype.on = function() {
    var t = this._.on.apply(this._, arguments);
    return t === this._ ? this : t;
};
function b4(e, t, r) {
    e.prototype = t.prototype = r, r.constructor = e;
}
function g7(e, t) {
    var r = Object.create(e.prototype);
    for(var n in t)r[n] = t[n];
    return r;
}
function x5() {
}
var p5 = 0.7, m5 = 1 / p5, y4 = "\\s*([+-]?\\d+)\\s*", M5 = "\\s*([+-]?\\d*\\.?\\d+(?:[eE][+-]?\\d+)?)\\s*", c5 = "\\s*([+-]?\\d*\\.?\\d+(?:[eE][+-]?\\d+)?)%\\s*", xe2 = /^#([0-9a-f]{3,8})$/, ce2 = new RegExp("^rgb\\(" + [
    y4,
    y4,
    y4
] + "\\)$"), ue4 = new RegExp("^rgb\\(" + [
    c5,
    c5,
    c5
] + "\\)$"), oe6 = new RegExp("^rgba\\(" + [
    y4,
    y4,
    y4,
    M5
] + "\\)$"), be1 = new RegExp("^rgba\\(" + [
    c5,
    c5,
    c5,
    M5
] + "\\)$"), de3 = new RegExp("^hsl\\(" + [
    M5,
    c5,
    c5
] + "\\)$"), ge4 = new RegExp("^hsla\\(" + [
    M5,
    c5,
    c5,
    M5
] + "\\)$"), L5 = {
    aliceblue: 15792383,
    antiquewhite: 16444375,
    aqua: 65535,
    aquamarine: 8388564,
    azure: 15794175,
    beige: 16119260,
    bisque: 16770244,
    black: 0,
    blanchedalmond: 16772045,
    blue: 255,
    blueviolet: 9055202,
    brown: 10824234,
    burlywood: 14596231,
    cadetblue: 6266528,
    chartreuse: 8388352,
    chocolate: 13789470,
    coral: 16744272,
    cornflowerblue: 6591981,
    cornsilk: 16775388,
    crimson: 14423100,
    cyan: 65535,
    darkblue: 139,
    darkcyan: 35723,
    darkgoldenrod: 12092939,
    darkgray: 11119017,
    darkgreen: 25600,
    darkgrey: 11119017,
    darkkhaki: 12433259,
    darkmagenta: 9109643,
    darkolivegreen: 5597999,
    darkorange: 16747520,
    darkorchid: 10040012,
    darkred: 9109504,
    darksalmon: 15308410,
    darkseagreen: 9419919,
    darkslateblue: 4734347,
    darkslategray: 3100495,
    darkslategrey: 3100495,
    darkturquoise: 52945,
    darkviolet: 9699539,
    deeppink: 16716947,
    deepskyblue: 49151,
    dimgray: 6908265,
    dimgrey: 6908265,
    dodgerblue: 2003199,
    firebrick: 11674146,
    floralwhite: 16775920,
    forestgreen: 2263842,
    fuchsia: 16711935,
    gainsboro: 14474460,
    ghostwhite: 16316671,
    gold: 16766720,
    goldenrod: 14329120,
    gray: 8421504,
    green: 32768,
    greenyellow: 11403055,
    grey: 8421504,
    honeydew: 15794160,
    hotpink: 16738740,
    indianred: 13458524,
    indigo: 4915330,
    ivory: 16777200,
    khaki: 15787660,
    lavender: 15132410,
    lavenderblush: 16773365,
    lawngreen: 8190976,
    lemonchiffon: 16775885,
    lightblue: 11393254,
    lightcoral: 15761536,
    lightcyan: 14745599,
    lightgoldenrodyellow: 16448210,
    lightgray: 13882323,
    lightgreen: 9498256,
    lightgrey: 13882323,
    lightpink: 16758465,
    lightsalmon: 16752762,
    lightseagreen: 2142890,
    lightskyblue: 8900346,
    lightslategray: 7833753,
    lightslategrey: 7833753,
    lightsteelblue: 11584734,
    lightyellow: 16777184,
    lime: 65280,
    limegreen: 3329330,
    linen: 16445670,
    magenta: 16711935,
    maroon: 8388608,
    mediumaquamarine: 6737322,
    mediumblue: 205,
    mediumorchid: 12211667,
    mediumpurple: 9662683,
    mediumseagreen: 3978097,
    mediumslateblue: 8087790,
    mediumspringgreen: 64154,
    mediumturquoise: 4772300,
    mediumvioletred: 13047173,
    midnightblue: 1644912,
    mintcream: 16121850,
    mistyrose: 16770273,
    moccasin: 16770229,
    navajowhite: 16768685,
    navy: 128,
    oldlace: 16643558,
    olive: 8421376,
    olivedrab: 7048739,
    orange: 16753920,
    orangered: 16729344,
    orchid: 14315734,
    palegoldenrod: 15657130,
    palegreen: 10025880,
    paleturquoise: 11529966,
    palevioletred: 14381203,
    papayawhip: 16773077,
    peachpuff: 16767673,
    peru: 13468991,
    pink: 16761035,
    plum: 14524637,
    powderblue: 11591910,
    purple: 8388736,
    rebeccapurple: 6697881,
    red: 16711680,
    rosybrown: 12357519,
    royalblue: 4286945,
    saddlebrown: 9127187,
    salmon: 16416882,
    sandybrown: 16032864,
    seagreen: 3050327,
    seashell: 16774638,
    sienna: 10506797,
    silver: 12632256,
    skyblue: 8900331,
    slateblue: 6970061,
    slategray: 7372944,
    slategrey: 7372944,
    snow: 16775930,
    springgreen: 65407,
    steelblue: 4620980,
    tan: 13808780,
    teal: 32896,
    thistle: 14204888,
    tomato: 16737095,
    turquoise: 4251856,
    violet: 15631086,
    wheat: 16113331,
    white: 16777215,
    whitesmoke: 16119285,
    yellow: 16776960,
    yellowgreen: 10145074
};
b4(x5, v8, {
    copy: function(e) {
        return Object.assign(new this.constructor, this, e);
    },
    displayable: function() {
        return this.rgb().displayable();
    },
    hex: K5,
    formatHex: K5,
    formatHsl: pe5,
    formatRgb: X7,
    toString: X7
});
function K5() {
    return this.rgb().formatHex();
}
function pe5() {
    return Q4(this).formatHsl();
}
function X7() {
    return this.rgb().formatRgb();
}
function v8(e) {
    var t, r;
    return e = (e + "").trim().toLowerCase(), (t = xe2.exec(e)) ? (r = t[1].length, t = parseInt(t[1], 16), r === 6 ? Y5(t) : r === 3 ? new a3(t >> 8 & 15 | t >> 4 & 240, t >> 4 & 15 | t & 240, (t & 15) << 4 | t & 15, 1) : r === 8 ? C6(t >> 24 & 255, t >> 16 & 255, t >> 8 & 255, (t & 255) / 255) : r === 4 ? C6(t >> 12 & 15 | t >> 8 & 240, t >> 8 & 15 | t >> 4 & 240, t >> 4 & 15 | t & 240, ((t & 15) << 4 | t & 15) / 255) : null) : (t = ce2.exec(e)) ? new a3(t[1], t[2], t[3], 1) : (t = ue4.exec(e)) ? new a3(t[1] * 255 / 100, t[2] * 255 / 100, t[3] * 255 / 100, 1) : (t = oe6.exec(e)) ? C6(t[1], t[2], t[3], t[4]) : (t = be1.exec(e)) ? C6(t[1] * 255 / 100, t[2] * 255 / 100, t[3] * 255 / 100, t[4]) : (t = de3.exec(e)) ? J5(t[1], t[2] / 100, t[3] / 100, 1) : (t = ge4.exec(e)) ? J5(t[1], t[2] / 100, t[3] / 100, t[4]) : L5.hasOwnProperty(e) ? Y5(L5[e]) : e === "transparent" ? new a3(NaN, NaN, NaN, 0) : null;
}
function Y5(e) {
    return new a3(e >> 16 & 255, e >> 8 & 255, e & 255, 1);
}
function C6(e, t, r, n) {
    return n <= 0 && (e = t = r = NaN), new a3(e, t, r, n);
}
function R8(e) {
    return e instanceof x5 || (e = v8(e)), e ? (e = e.rgb(), new a3(e.r, e.g, e.b, e.opacity)) : new a3;
}
function Z7(e, t, r, n) {
    return arguments.length === 1 ? R8(e) : new a3(e, t, r, n ?? 1);
}
function a3(e, t, r, n) {
    this.r = +e, this.g = +t, this.b = +r, this.opacity = +n;
}
b4(a3, Z7, g7(x5, {
    brighter: function(e) {
        return e = e == null ? m5 : Math.pow(m5, e), new a3(this.r * e, this.g * e, this.b * e, this.opacity);
    },
    darker: function(e) {
        return e = e == null ? p5 : Math.pow(p5, e), new a3(this.r * e, this.g * e, this.b * e, this.opacity);
    },
    rgb: function() {
        return this;
    },
    displayable: function() {
        return -0.5 <= this.r && this.r < 255.5 && -0.5 <= this.g && this.g < 255.5 && -0.5 <= this.b && this.b < 255.5 && 0 <= this.opacity && this.opacity <= 1;
    },
    hex: F7,
    formatHex: F7,
    formatRgb: G7,
    toString: G7
}));
function F7() {
    return "#" + P5(this.r) + P5(this.g) + P5(this.b);
}
function G7() {
    var e = this.opacity;
    return e = isNaN(e) ? 1 : Math.max(0, Math.min(1, e)), (e === 1 ? "rgb(" : "rgba(") + Math.max(0, Math.min(255, Math.round(this.r) || 0)) + ", " + Math.max(0, Math.min(255, Math.round(this.g) || 0)) + ", " + Math.max(0, Math.min(255, Math.round(this.b) || 0)) + (e === 1 ? ")" : ", " + e + ")");
}
function P5(e) {
    return e = Math.max(0, Math.min(255, Math.round(e) || 0)), (e < 16 ? "0" : "") + e.toString(16);
}
function J5(e, t, r, n) {
    return n <= 0 ? e = t = r = NaN : r <= 0 || r >= 1 ? e = t = NaN : t <= 0 && (e = NaN), new u2(e, t, r, n);
}
function Q4(e) {
    if (e instanceof u2) return new u2(e.h, e.s, e.l, e.opacity);
    if (e instanceof x5 || (e = v8(e)), !e) return new u2;
    if (e instanceof u2) return e;
    e = e.rgb();
    var t = e.r / 255, r = e.g / 255, n = e.b / 255, i = Math.min(t, r, n), f = Math.max(t, r, n), s = NaN, h = f - i, d = (f + i) / 2;
    return h ? (t === f ? s = (r - n) / h + (r < n) * 6 : r === f ? s = (n - t) / h + 2 : s = (t - r) / h + 4, h /= d < 0.5 ? f + i : 2 - f - i, s *= 60) : h = d > 0 && d < 1 ? 0 : s, new u2(s, h, d, e.opacity);
}
function T6(e, t, r, n) {
    return arguments.length === 1 ? Q4(e) : new u2(e, t, r, n ?? 1);
}
function u2(e, t, r, n) {
    this.h = +e, this.s = +t, this.l = +r, this.opacity = +n;
}
b4(u2, T6, g7(x5, {
    brighter: function(e) {
        return e = e == null ? m5 : Math.pow(m5, e), new u2(this.h, this.s, this.l * e, this.opacity);
    },
    darker: function(e) {
        return e = e == null ? p5 : Math.pow(p5, e), new u2(this.h, this.s, this.l * e, this.opacity);
    },
    rgb: function() {
        var e = this.h % 360 + (this.h < 0) * 360, t = isNaN(e) || isNaN(this.s) ? 0 : this.s, r = this.l, n = r + (r < 0.5 ? r : 1 - r) * t, i = 2 * r - n;
        return new a3($4(e >= 240 ? e - 240 : e + 120, i, n), $4(e, i, n), $4(e < 120 ? e + 240 : e - 120, i, n), this.opacity);
    },
    displayable: function() {
        return (0 <= this.s && this.s <= 1 || isNaN(this.s)) && 0 <= this.l && this.l <= 1 && 0 <= this.opacity && this.opacity <= 1;
    },
    formatHsl: function() {
        var e = this.opacity;
        return e = isNaN(e) ? 1 : Math.max(0, Math.min(1, e)), (e === 1 ? "hsl(" : "hsla(") + (this.h || 0) + ", " + (this.s || 0) * 100 + "%, " + (this.l || 0) * 100 + "%" + (e === 1 ? ")" : ", " + e + ")");
    }
}));
function $4(e, t, r) {
    return (e < 60 ? t + (r - t) * e / 60 : e < 180 ? r : e < 240 ? t + (r - t) * (240 - e) / 60 : t) * 255;
}
var H4 = Math.PI / 180, j11 = 180 / Math.PI;
var q5 = 18, U3 = 0.96422, V6 = 1, W4 = 0.82521, ee6 = 4 / 29, N4 = 6 / 29, te5 = 3 * N4 * N4, me3 = N4 * N4 * N4;
function re6(e) {
    if (e instanceof l4) return new l4(e.l, e.a, e.b, e.opacity);
    if (e instanceof o2) return ae5(e);
    e instanceof a3 || (e = R8(e));
    var t = D7(e.r), r = D7(e.g), n = D7(e.b), i = _9((0.2225045 * t + 0.7168786 * r + 0.0606169 * n) / V6), f, s;
    return t === r && r === n ? f = s = i : (f = _9((0.4360747 * t + 0.3850649 * r + 0.1430804 * n) / U3), s = _9((0.0139322 * t + 0.0971045 * r + 0.7141733 * n) / W4)), new l4(116 * i - 16, 500 * (f - i), 200 * (i - s), e.opacity);
}
function I6(e, t, r, n) {
    return arguments.length === 1 ? re6(e) : new l4(e, t, r, n ?? 1);
}
function l4(e, t, r, n) {
    this.l = +e, this.a = +t, this.b = +r, this.opacity = +n;
}
b4(l4, I6, g7(x5, {
    brighter: function(e) {
        return new l4(this.l + q5 * (e ?? 1), this.a, this.b, this.opacity);
    },
    darker: function(e) {
        return new l4(this.l - q5 * (e ?? 1), this.a, this.b, this.opacity);
    },
    rgb: function() {
        var e = (this.l + 16) / 116, t = isNaN(this.a) ? e : e + this.a / 500, r = isNaN(this.b) ? e : e - this.b / 200;
        return t = U3 * z7(t), e = V6 * z7(e), r = W4 * z7(r), new a3(B5(3.1338561 * t - 1.6168667 * e - 0.4906146 * r), B5(-0.9787684 * t + 1.9161415 * e + 0.033454 * r), B5(0.0719453 * t - 0.2289914 * e + 1.4052427 * r), this.opacity);
    }
}));
function _9(e) {
    return e > me3 ? Math.pow(e, 1 / 3) : e / te5 + ee6;
}
function z7(e) {
    return e > N4 ? e * e * e : te5 * (e - ee6);
}
function B5(e) {
    return 255 * (e <= 0.0031308 ? 12.92 * e : 1.055 * Math.pow(e, 1 / 2.4) - 0.055);
}
function D7(e) {
    return (e /= 255) <= 0.04045 ? e / 12.92 : Math.pow((e + 0.055) / 1.055, 2.4);
}
function ne6(e) {
    if (e instanceof o2) return new o2(e.h, e.c, e.l, e.opacity);
    if (e instanceof l4 || (e = re6(e)), e.a === 0 && e.b === 0) return new o2(NaN, 0 < e.l && e.l < 100 ? 0 : NaN, e.l, e.opacity);
    var t = Math.atan2(e.b, e.a) * j11;
    return new o2(t < 0 ? t + 360 : t, Math.sqrt(e.a * e.a + e.b * e.b), e.l, e.opacity);
}
function ie4(e, t, r, n) {
    return arguments.length === 1 ? ne6(e) : new o2(e, t, r, n ?? 1);
}
function o2(e, t, r, n) {
    this.h = +e, this.c = +t, this.l = +r, this.opacity = +n;
}
function ae5(e) {
    if (isNaN(e.h)) return new l4(e.l, 0, 0, e.opacity);
    var t = e.h * H4;
    return new l4(e.l, Math.cos(t) * e.c, Math.sin(t) * e.c, e.opacity);
}
b4(o2, ie4, g7(x5, {
    brighter: function(e) {
        return new o2(this.h, this.c, this.l + q5 * (e ?? 1), this.opacity);
    },
    darker: function(e) {
        return new o2(this.h, this.c, this.l - q5 * (e ?? 1), this.opacity);
    },
    rgb: function() {
        return ae5(this).rgb();
    }
}));
var fe6 = -0.14861, O7 = 1.78277, S6 = -0.29227, E7 = -0.90649, k4 = 1.97294, se4 = k4 * E7, le4 = k4 * O7, he4 = O7 * S6 - E7 * fe6;
function Ne1(e) {
    if (e instanceof w5) return new w5(e.h, e.s, e.l, e.opacity);
    e instanceof a3 || (e = R8(e));
    var t = e.r / 255, r = e.g / 255, n = e.b / 255, i = (he4 * n + se4 * t - le4 * r) / (he4 + se4 - le4), f = n - i, s = (k4 * (r - i) - S6 * f) / E7, h = Math.sqrt(s * s + f * f) / (k4 * i * (1 - i)), d = h ? Math.atan2(s, f) * j11 - 120 : NaN;
    return new w5(d < 0 ? d + 360 : d, h, i, e.opacity);
}
function A5(e, t, r, n) {
    return arguments.length === 1 ? Ne1(e) : new w5(e, t, r, n ?? 1);
}
function w5(e, t, r, n) {
    this.h = +e, this.s = +t, this.l = +r, this.opacity = +n;
}
b4(w5, A5, g7(x5, {
    brighter: function(e) {
        return e = e == null ? m5 : Math.pow(m5, e), new w5(this.h, this.s, this.l * e, this.opacity);
    },
    darker: function(e) {
        return e = e == null ? p5 : Math.pow(p5, e), new w5(this.h, this.s, this.l * e, this.opacity);
    },
    rgb: function() {
        var e = isNaN(this.h) ? 0 : (this.h + 120) * H4, t = +this.l, r = isNaN(this.s) ? 0 : this.s * t * (1 - t), n = Math.cos(e), i = Math.sin(e);
        return new a3(255 * (t + r * (fe6 * n + O7 * i)), 255 * (t + r * (S6 * n + E7 * i)), 255 * (t + r * (k4 * n)), this.opacity);
    }
}));
var M6 = (e)=>()=>e
;
function Z8(e, r) {
    return function(o) {
        return e + o * r;
    };
}
function pr1(e, r, o) {
    return e = Math.pow(e, o), r = Math.pow(r, o) - e, o = 1 / o, function(n) {
        return Math.pow(e + n * r, o);
    };
}
function F8(e) {
    return (e = +e) == 1 ? m6 : function(r, o) {
        return o - r ? pr1(r, o, e) : M6(isNaN(r) ? o : r);
    };
}
function m6(e, r) {
    var o = r - e;
    return o ? Z8(e, o) : M6(isNaN(e) ? r : e);
}
var C7 = function e(r) {
    var o = F8(r);
    function n(t, u) {
        var i = o((t = Z7(t)).r, (u = Z7(u)).r), a = o(t.g, u.g), c = o(t.b, u.b), l = m6(t.opacity, u.opacity);
        return function(f) {
            return t.r = i(f), t.g = a(f), t.b = c(f), t.opacity = l(f), t + "";
        };
    }
    return n.gamma = e, n;
}(1);
function N5(e, r) {
    r || (r = []);
    var o = e ? Math.min(r.length, e.length) : 0, n = r.slice(), t;
    return function(u) {
        for(t = 0; t < o; ++t)n[t] = e[t] * (1 - u) + r[t] * u;
        return n;
    };
}
function S7(e) {
    return ArrayBuffer.isView(e) && !(e instanceof DataView);
}
function z8(e, r) {
    var o = r ? r.length : 0, n = e ? Math.min(o, e.length) : 0, t = new Array(n), u = new Array(o), i;
    for(i = 0; i < n; ++i)t[i] = y5(e[i], r[i]);
    for(; i < o; ++i)u[i] = r[i];
    return function(a) {
        for(i = 0; i < n; ++i)u[i] = t[i](a);
        return u;
    };
}
function I7(e, r) {
    var o = new Date;
    return e = +e, r = +r, function(n) {
        return o.setTime(e * (1 - n) + r * n), o;
    };
}
function x6(e, r) {
    return e = +e, r = +r, function(o) {
        return e * (1 - o) + r * o;
    };
}
function O8(e, r) {
    var o = {
    }, n = {
    }, t;
    (e === null || typeof e != "object") && (e = {
    }), (r === null || typeof r != "object") && (r = {
    });
    for(t in r)t in e ? o[t] = y5(e[t], r[t]) : n[t] = r[t];
    return function(u) {
        for(t in o)n[t] = o[t](u);
        return n;
    };
}
var E8 = /[-+]?(?:\d+\.?\d*|\.?\d+)(?:[eE][-+]?\d+)?/g, V7 = new RegExp(E8.source, "g");
function gr(e) {
    return function() {
        return e;
    };
}
function dr(e) {
    return function(r) {
        return e(r) + "";
    };
}
function _10(e, r) {
    var o = E8.lastIndex = V7.lastIndex = 0, n, t, u, i = -1, a = [], c = [];
    for(e = e + "", r = r + ""; (n = E8.exec(e)) && (t = V7.exec(r));)(u = t.index) > o && (u = r.slice(o, u), a[i] ? a[i] += u : a[++i] = u), (n = n[0]) === (t = t[0]) ? a[i] ? a[i] += t : a[++i] = t : (a[++i] = null, c.push({
        i,
        x: x6(n, t)
    })), o = V7.lastIndex;
    return o < r.length && (u = r.slice(o), a[i] ? a[i] += u : a[++i] = u), a.length < 2 ? c[0] ? dr(c[0].x) : gr(r) : (r = c.length, function(l) {
        for(var f = 0, s; f < r; ++f)a[(s = c[f]).i] = s.x(l);
        return a.join("");
    });
}
function y5(e, r) {
    var o = typeof r, n;
    return r == null || o === "boolean" ? M6(r) : (o === "number" ? x6 : o === "string" ? (n = v8(r)) ? (r = n, C7) : _10 : r instanceof v8 ? C7 : r instanceof Date ? I7 : S7(r) ? N5 : Array.isArray(r) ? z8 : typeof r.valueOf != "function" && typeof r.toString != "function" || isNaN(r) ? O8 : x6)(e, r);
}
function yr(e, r) {
    return e = +e, r = +r, function(o) {
        return Math.round(e * (1 - o) + r * o);
    };
}
var $5 = 180 / Math.PI, L6 = {
    translateX: 0,
    translateY: 0,
    rotate: 0,
    skewX: 0,
    scaleX: 1,
    scaleY: 1
};
function G8(e, r, o, n, t, u) {
    var i, a, c;
    return (i = Math.sqrt(e * e + r * r)) && (e /= i, r /= i), (c = e * o + r * n) && (o -= e * c, n -= r * c), (a = Math.sqrt(o * o + n * n)) && (o /= a, n /= a, c /= a), e * n < r * o && (e = -e, r = -r, c = -c, i = -i), {
        translateX: t,
        translateY: u,
        rotate: Math.atan2(r, e) * $5,
        skewX: Math.atan(c) * $5,
        scaleX: i,
        scaleY: a
    };
}
var B6;
function b5(e) {
    let r = new (typeof DOMMatrix == "function" ? DOMMatrix : WebKitCSSMatrix)(e + "");
    return r.isIdentity ? L6 : G8(r.a, r.b, r.c, r.d, r.e, r.f);
}
function P6(e) {
    return e == null ? L6 : (B6 || (B6 = document.createElementNS("http://www.w3.org/2000/svg", "g")), B6.setAttribute("transform", e), (e = B6.transform.baseVal.consolidate()) ? (e = e.matrix, G8(e.a, e.b, e.c, e.d, e.e, e.f)) : L6);
}
function rr(e, r, o, n) {
    function t(l) {
        return l.length ? l.pop() + " " : "";
    }
    function u(l, f, s, p, h, d) {
        if (l !== s || f !== p) {
            var g = h.push("translate(", null, r, null, o);
            d.push({
                i: g - 4,
                x: x6(l, s)
            }, {
                i: g - 2,
                x: x6(f, p)
            });
        } else (s || p) && h.push("translate(" + s + r + p + o);
    }
    function i(l, f, s, p) {
        l !== f ? (l - f > 180 ? f += 360 : f - l > 180 && (l += 360), p.push({
            i: s.push(t(s) + "rotate(", null, n) - 2,
            x: x6(l, f)
        })) : f && s.push(t(s) + "rotate(" + f + n);
    }
    function a(l, f, s, p) {
        l !== f ? p.push({
            i: s.push(t(s) + "skewX(", null, n) - 2,
            x: x6(l, f)
        }) : f && s.push(t(s) + "skewX(" + f + n);
    }
    function c(l, f, s, p, h, d) {
        if (l !== s || f !== p) {
            var g = h.push(t(h) + "scale(", null, ",", null, ")");
            d.push({
                i: g - 4,
                x: x6(l, s)
            }, {
                i: g - 2,
                x: x6(f, p)
            });
        } else (s !== 1 || p !== 1) && h.push(t(h) + "scale(" + s + "," + p + ")");
    }
    return function(l, f) {
        var s = [], p = [];
        return l = e(l), f = e(f), u(l.translateX, l.translateY, f.translateX, f.translateY, s, p), i(l.rotate, f.rotate, s, p), a(l.skewX, f.skewX, s, p), c(l.scaleX, l.scaleY, f.scaleX, f.scaleY, s, p), l = f = null, function(h) {
            for(var d = -1, g = p.length, v; ++d < g;)s[(v = p[d]).i] = v.x(h);
            return s.join("");
        };
    };
}
var Mr2 = rr(b5, "px, ", "px)", "deg)"), wr = rr(P6, ", ", ")", ")");
var f5 = 0, s6 = 0, u3 = 0, T7 = 1000, _11, l5, h8 = 0, i3 = 0, x7 = 0, c6 = typeof performance == "object" && performance.now ? performance : Date, j12 = typeof window == "object" && window.requestAnimationFrame ? window.requestAnimationFrame.bind(window) : function(n) {
    setTimeout(n, 17);
};
function m7() {
    return i3 || (j12(q6), i3 = c6.now() + x7);
}
function q6() {
    i3 = 0;
}
function o3() {
    this._call = this._time = this._next = null;
}
o3.prototype = F9.prototype = {
    constructor: o3,
    restart: function(n, t, r) {
        if (typeof n != "function") throw new TypeError("callback is not a function");
        r = (r == null ? m7() : +r) + (t == null ? 0 : +t), !this._next && l5 !== this && (l5 ? l5._next = this : _11 = this, l5 = this), this._call = n, this._time = r, v9();
    },
    stop: function() {
        this._call && (this._call = null, this._time = 1 / 0, v9());
    }
};
function F9(n, t, r) {
    var e = new o3;
    return e.restart(n, t, r), e;
}
function I8() {
    m7(), ++f5;
    for(var n = _11, t; n;)(t = i3 - n._time) >= 0 && n._call.call(void 0, t), n = n._next;
    --f5;
}
function y6() {
    i3 = (h8 = c6.now()) + x7, f5 = s6 = 0;
    try {
        I8();
    } finally{
        f5 = 0, D8(), i3 = 0;
    }
}
function A6() {
    var n = c6.now(), t = n - h8;
    t > T7 && (x7 -= t, h8 = n);
}
function D8() {
    for(var n, t = _11, r, e = 1 / 0; t;)t._call ? (e > t._time && (e = t._time), n = t, t = t._next) : (r = t._next, t._next = null, t = n ? n._next = r : _11 = r);
    l5 = n, v9(e);
}
function v9(n) {
    if (!f5) {
        s6 && (s6 = clearTimeout(s6));
        var t = n - i3;
        t > 24 ? (n < 1 / 0 && (s6 = setTimeout(y6, n - c6.now() - x7)), u3 && (u3 = clearInterval(u3))) : (u3 || (h8 = c6.now(), u3 = setInterval(A6, T7)), f5 = 1, j12(y6));
    }
}
function N6(n, t, r) {
    var e = new o3;
    return t = t == null ? 0 : +t, e.restart((w)=>{
        e.stop(), n(w + t);
    }, t, r), e;
}
function b6(n) {
    return ((n *= 2) <= 1 ? n * n * n : (n -= 2) * n * n + 2) / 2;
}
var pt1 = c4("start", "end", "cancel", "interrupt"), ht1 = [], b7 = 0, E9 = 1, N7 = 2, A7 = 3, V8 = 4, C8 = 5, g8 = 6;
function y7(t, r, e, n, i, s) {
    var o = t.__transition;
    if (!o) t.__transition = {
    };
    else if (e in o) return;
    mt1(t, e, {
        name: r,
        index: n,
        group: i,
        on: pt1,
        tween: ht1,
        time: s.time,
        delay: s.delay,
        duration: s.duration,
        ease: s.ease,
        timer: null,
        state: b7
    });
}
function x8(t, r) {
    var e = h9(t, r);
    if (e.state > b7) throw new Error("too late; already scheduled");
    return e;
}
function d3(t, r) {
    var e = h9(t, r);
    if (e.state > A7) throw new Error("too late; already running");
    return e;
}
function h9(t, r) {
    var e = t.__transition;
    if (!e || !(e = e[r])) throw new Error("transition not found");
    return e;
}
function mt1(t, r, e) {
    var n = t.__transition, i;
    n[r] = e, e.timer = F9(s, 0, e.time);
    function s(l) {
        e.state = E9, e.timer.restart(o, e.delay, e.time), e.delay <= l && o(l - e.delay);
    }
    function o(l) {
        var f, m, p, c;
        if (e.state !== E9) return u();
        for(f in n)if (c = n[f], c.name === e.name) {
            if (c.state === A7) return N6(o);
            c.state === V8 ? (c.state = g8, c.timer.stop(), c.on.call("interrupt", t, t.__data__, c.index, c.group), delete n[f]) : +f < r && (c.state = g8, c.timer.stop(), c.on.call("cancel", t, t.__data__, c.index, c.group), delete n[f]);
        }
        if (N6(function() {
            e.state === A7 && (e.state = V8, e.timer.restart(a, e.delay, e.time), a(l));
        }), e.state = N7, e.on.call("start", t, t.__data__, e.index, e.group), e.state === N7) {
            for(e.state = A7, i = new Array(p = e.tween.length), f = 0, m = -1; f < p; ++f)(c = e.tween[f].value.call(t, t.__data__, e.index, e.group)) && (i[++m] = c);
            i.length = m + 1;
        }
    }
    function a(l) {
        for(var f = l < e.duration ? e.ease.call(null, l / e.duration) : (e.timer.restart(u), e.state = C8, 1), m = -1, p = i.length; ++m < p;)i[m].call(t, f);
        e.state === C8 && (e.on.call("end", t, t.__data__, e.index, e.group), u());
    }
    function u() {
        e.state = g8, e.timer.stop(), delete n[r];
        for(var l in n)return;
        delete t.__transition;
    }
}
function D9(t, r) {
    var e = t.__transition, n, i, s = !0, o;
    if (!!e) {
        r = r == null ? null : r + "";
        for(o in e){
            if ((n = e[o]).name !== r) {
                s = !1;
                continue;
            }
            i = n.state > N7 && n.state < C8, n.state = g8, n.timer.stop(), n.on.call(i ? "interrupt" : "cancel", t, t.__data__, n.index, n.group), delete e[o];
        }
        s && delete t.__transition;
    }
}
function G9(t) {
    return this.each(function() {
        D9(this, t);
    });
}
function dt1(t, r) {
    var e, n;
    return function() {
        var i = d3(this, t), s = i.tween;
        if (s !== e) {
            n = e = s;
            for(var o = 0, a = n.length; o < a; ++o)if (n[o].name === r) {
                n = n.slice(), n.splice(o, 1);
                break;
            }
        }
        i.tween = n;
    };
}
function _t1(t, r, e) {
    var n, i;
    if (typeof e != "function") throw new Error;
    return function() {
        var s = d3(this, t), o = s.tween;
        if (o !== n) {
            i = (n = o).slice();
            for(var a = {
                name: r,
                value: e
            }, u = 0, l = i.length; u < l; ++u)if (i[u].name === r) {
                i[u] = a;
                break;
            }
            u === l && i.push(a);
        }
        s.tween = i;
    };
}
function P7(t, r) {
    var e = this._id;
    if (t += "", arguments.length < 2) {
        for(var n = h9(this.node(), e).tween, i = 0, s = n.length, o; i < s; ++i)if ((o = n[i]).name === t) return o.value;
        return null;
    }
    return this.each((r == null ? dt1 : _t1)(e, t, r));
}
function w6(t, r, e) {
    var n = t._id;
    return t.each(function() {
        var i = d3(this, n);
        (i.value || (i.value = {
        }))[r] = e.apply(this, arguments);
    }), function(i) {
        return h9(i, n).value[r];
    };
}
function S8(t, r) {
    var e;
    return (typeof r == "number" ? x6 : r instanceof v8 ? C7 : (e = v8(r)) ? (r = e, C7) : _10)(t, r);
}
function xt1(t) {
    return function() {
        this.removeAttribute(t);
    };
}
function Tt1(t) {
    return function() {
        this.removeAttributeNS(t.space, t.local);
    };
}
function jt1(t, r, e) {
    var n, i = e + "", s;
    return function() {
        var o = this.getAttribute(t);
        return o === i ? null : o === n ? s : s = r(n = o, e);
    };
}
function Et1(t, r, e) {
    var n, i = e + "", s;
    return function() {
        var o = this.getAttributeNS(t.space, t.local);
        return o === i ? null : o === n ? s : s = r(n = o, e);
    };
}
function Nt1(t, r, e) {
    var n, i, s;
    return function() {
        var o, a = e(this), u;
        return a == null ? void this.removeAttribute(t) : (o = this.getAttribute(t), u = a + "", o === u ? null : o === n && u === i ? s : (i = u, s = r(n = o, a)));
    };
}
function At1(t, r, e) {
    var n, i, s;
    return function() {
        var o, a = e(this), u;
        return a == null ? void this.removeAttributeNS(t.space, t.local) : (o = this.getAttributeNS(t.space, t.local), u = a + "", o === u ? null : o === n && u === i ? s : (i = u, s = r(n = o, a)));
    };
}
function O9(t, r) {
    var e = x4(t), n = e === "transform" ? wr : S8;
    return this.attrTween(t, typeof r == "function" ? (e.local ? At1 : Nt1)(e, n, w6(this, "attr." + t, r)) : r == null ? (e.local ? Tt1 : xt1)(e) : (e.local ? Et1 : jt1)(e, n, r));
}
function St1(t, r) {
    return function(e) {
        this.setAttribute(t, r.call(this, e));
    };
}
function It1(t, r) {
    return function(e) {
        this.setAttributeNS(t.space, t.local, r.call(this, e));
    };
}
function Dt1(t, r) {
    var e, n;
    function i() {
        var s = r.apply(this, arguments);
        return s !== n && (e = (n = s) && It1(t, s)), e;
    }
    return i._value = r, i;
}
function Rt1(t, r) {
    var e, n;
    function i() {
        var s = r.apply(this, arguments);
        return s !== n && (e = (n = s) && St1(t, s)), e;
    }
    return i._value = r, i;
}
function U4(t, r) {
    var e = "attr." + t;
    if (arguments.length < 2) return (e = this.tween(e)) && e._value;
    if (r == null) return this.tween(e, null);
    if (typeof r != "function") throw new Error;
    var n = x4(t);
    return this.tween(e, (n.local ? Dt1 : Rt1)(n, r));
}
function Ft1(t, r) {
    return function() {
        x8(this, t).delay = +r.apply(this, arguments);
    };
}
function bt(t, r) {
    return r = +r, function() {
        x8(this, t).delay = r;
    };
}
function H5(t) {
    var r = this._id;
    return arguments.length ? this.each((typeof t == "function" ? Ft1 : bt)(r, t)) : h9(this.node(), r).delay;
}
function Vt1(t, r) {
    return function() {
        d3(this, t).duration = +r.apply(this, arguments);
    };
}
function Gt1(t, r) {
    return r = +r, function() {
        d3(this, t).duration = r;
    };
}
function L7(t) {
    var r = this._id;
    return arguments.length ? this.each((typeof t == "function" ? Vt1 : Gt1)(r, t)) : h9(this.node(), r).duration;
}
function Pt1(t, r) {
    if (typeof r != "function") throw new Error;
    return function() {
        d3(this, t).ease = r;
    };
}
function M7(t) {
    var r = this._id;
    return arguments.length ? this.each(Pt1(r, t)) : h9(this.node(), r).ease;
}
function kt1(t, r) {
    return function() {
        var e = r.apply(this, arguments);
        if (typeof e != "function") throw new Error;
        d3(this, t).ease = e;
    };
}
function $6(t) {
    if (typeof t != "function") throw new Error;
    return this.each(kt1(this._id, t));
}
function q7(t) {
    typeof t != "function" && (t = V5(t));
    for(var r = this._groups, e = r.length, n = new Array(e), i = 0; i < e; ++i)for(var s = r[i], o = s.length, a = n[i] = [], u, l = 0; l < o; ++l)(u = s[l]) && t.call(u, u.__data__, l, s) && a.push(u);
    return new _12(n, this._parents, this._name, this._id);
}
function B7(t) {
    if (t._id !== this._id) throw new Error;
    for(var r = this._groups, e = t._groups, n = r.length, i = e.length, s = Math.min(n, i), o = new Array(n), a = 0; a < s; ++a)for(var u = r[a], l = e[a], f = u.length, m = o[a] = new Array(f), p, c = 0; c < f; ++c)(p = u[c] || l[c]) && (m[c] = p);
    for(; a < n; ++a)o[a] = r[a];
    return new _12(o, this._parents, this._name, this._id);
}
function Ot1(t) {
    return (t + "").trim().split(/^|\s+/).every(function(r) {
        var e = r.indexOf(".");
        return e >= 0 && (r = r.slice(0, e)), !r || r === "start";
    });
}
function Ut1(t, r, e) {
    var n, i, s = Ot1(r) ? x8 : d3;
    return function() {
        var o = s(this, t), a = o.on;
        a !== n && (i = (n = a).copy()).on(r, e), o.on = i;
    };
}
function J6(t, r) {
    var e = this._id;
    return arguments.length < 2 ? h9(this.node(), e).on.on(t) : this.each(Ut1(e, t, r));
}
function Ht1(t) {
    return function() {
        var r = this.parentNode;
        for(var e in this.__transition)if (+e !== t) return;
        r && r.removeChild(this);
    };
}
function K6() {
    return this.on("end.remove", Ht1(this._id));
}
function Q5(t) {
    var r = this._name, e = this._id;
    typeof t != "function" && (t = g6(t));
    for(var n = this._groups, i = n.length, s = new Array(i), o = 0; o < i; ++o)for(var a = n[o], u = a.length, l = s[o] = new Array(u), f, m, p = 0; p < u; ++p)(f = a[p]) && (m = t.call(f, f.__data__, p, a)) && ("__data__" in f && (m.__data__ = f.__data__), l[p] = m, y7(l[p], r, e, p, l, h9(f, e)));
    return new _12(s, this._parents, r, e);
}
function W5(t) {
    var r = this._name, e = this._id;
    typeof t != "function" && (t = R7(t));
    for(var n = this._groups, i = n.length, s = [], o = [], a = 0; a < i; ++a)for(var u = n[a], l = u.length, f, m = 0; m < l; ++m)if (f = u[m]) {
        for(var p = t.call(f, f.__data__, m, u), c, ut = h9(f, e), j = 0, lt = p.length; j < lt; ++j)(c = p[j]) && y7(c, r, e, j, p, ut);
        s.push(p), o.push(f);
    }
    return new _12(s, o, r, e);
}
var qt1 = Ee2.prototype.constructor;
function X8() {
    return new qt1(this._groups, this._parents);
}
function Jt1(t, r) {
    var e, n, i;
    return function() {
        var s = ft(this, t), o = (this.style.removeProperty(t), ft(this, t));
        return s === o ? null : s === e && o === n ? i : i = r(e = s, n = o);
    };
}
function Y6(t) {
    return function() {
        this.style.removeProperty(t);
    };
}
function Kt1(t, r, e) {
    var n, i = e + "", s;
    return function() {
        var o = ft(this, t);
        return o === i ? null : o === n ? s : s = r(n = o, e);
    };
}
function Qt1(t, r, e) {
    var n, i, s;
    return function() {
        var o = ft(this, t), a = e(this), u = a + "";
        return a == null && (u = a = (this.style.removeProperty(t), ft(this, t))), o === u ? null : o === n && u === i ? s : (i = u, s = r(n = o, a));
    };
}
function Wt1(t, r) {
    var e, n, i, s = "style." + r, o = "end." + s, a;
    return function() {
        var u = d3(this, t), l = u.on, f = u.value[s] == null ? a || (a = Y6(r)) : void 0;
        (l !== e || i !== f) && (n = (e = l).copy()).on(o, i = f), u.on = n;
    };
}
function Z9(t, r, e) {
    var n = (t += "") === "transform" ? Mr2 : S8;
    return r == null ? this.styleTween(t, Jt1(t, n)).on("end.style." + t, Y6(t)) : typeof r == "function" ? this.styleTween(t, Qt1(t, n, w6(this, "style." + t, r))).each(Wt1(this._id, t)) : this.styleTween(t, Kt1(t, n, r), e).on("end.style." + t, null);
}
function Xt1(t, r, e) {
    return function(n) {
        this.style.setProperty(t, r.call(this, n), e);
    };
}
function Yt1(t, r, e) {
    var n, i;
    function s() {
        var o = r.apply(this, arguments);
        return o !== i && (n = (i = o) && Xt1(t, o, e)), n;
    }
    return s._value = r, s;
}
function tt2(t, r, e) {
    var n = "style." + (t += "");
    if (arguments.length < 2) return (n = this.tween(n)) && n._value;
    if (r == null) return this.tween(n, null);
    if (typeof r != "function") throw new Error;
    return this.tween(n, Yt1(t, r, e ?? ""));
}
function Zt1(t) {
    return function() {
        this.textContent = t;
    };
}
function tr(t) {
    return function() {
        var r = t(this);
        this.textContent = r ?? "";
    };
}
function rt2(t) {
    return this.tween("text", typeof t == "function" ? tr(w6(this, "text", t)) : Zt1(t == null ? "" : t + ""));
}
function rr1(t) {
    return function(r) {
        this.textContent = t.call(this, r);
    };
}
function er(t) {
    var r, e;
    function n() {
        var i = t.apply(this, arguments);
        return i !== e && (r = (e = i) && rr1(i)), r;
    }
    return n._value = t, n;
}
function et2(t) {
    var r = "text";
    if (arguments.length < 1) return (r = this.tween(r)) && r._value;
    if (t == null) return this.tween(r, null);
    if (typeof t != "function") throw new Error;
    return this.tween(r, er(t));
}
function nt3() {
    for(var t = this._name, r = this._id, e = I9(), n = this._groups, i = n.length, s = 0; s < i; ++s)for(var o = n[s], a = o.length, u, l = 0; l < a; ++l)if (u = o[l]) {
        var f = h9(u, r);
        y7(u, t, e, l, o, {
            time: f.time + f.delay + f.duration,
            delay: 0,
            duration: f.duration,
            ease: f.ease
        });
    }
    return new _12(n, this._parents, t, e);
}
function it2() {
    var t, r, e = this, n = e._id, i = e.size();
    return new Promise(function(s, o) {
        var a = {
            value: o
        }, u = {
            value: function() {
                --i == 0 && s();
            }
        };
        e.each(function() {
            var l = d3(this, n), f = l.on;
            f !== t && (r = (t = f).copy(), r._.cancel.push(a), r._.interrupt.push(a), r._.end.push(u)), l.on = r;
        }), i === 0 && s();
    });
}
var nr = 0;
function _12(t, r, e, n) {
    this._groups = t, this._parents = r, this._name = e, this._id = n;
}
function R9(t) {
    return Ee2().transition(t);
}
function I9() {
    return ++nr;
}
var v10 = Ee2.prototype;
_12.prototype = R9.prototype = {
    constructor: _12,
    select: Q5,
    selectAll: W5,
    selectChild: v10.selectChild,
    selectChildren: v10.selectChildren,
    filter: q7,
    merge: B7,
    selection: X8,
    transition: nt3,
    call: v10.call,
    nodes: v10.nodes,
    node: v10.node,
    size: v10.size,
    empty: v10.empty,
    each: v10.each,
    on: J6,
    attr: O9,
    attrTween: U4,
    style: Z9,
    styleTween: tt2,
    text: rt2,
    textTween: et2,
    remove: K6,
    tween: P7,
    delay: H5,
    duration: L7,
    ease: M7,
    easeVarying: $6,
    end: it2,
    [Symbol.iterator]: v10[Symbol.iterator]
};
var sr = {
    time: null,
    delay: 0,
    duration: 250,
    ease: b6
};
function ar(t, r) {
    for(var e; !(e = t.__transition) || !(e = e[r]);)if (!(t = t.parentNode)) throw new Error(`transition ${r} not found`);
    return e;
}
function st2(t) {
    var r, e;
    t instanceof _12 ? (r = t._id, t = t._name) : (r = I9(), (e = sr).time = m7(), t = t == null ? null : t + "");
    for(var n = this._groups, i = n.length, s = 0; s < i; ++s)for(var o = n[s], a = o.length, u, l = 0; l < a; ++l)(u = o[l]) && y7(u, t, r, l, o, e || ar(u, r));
    return new _12(n, this._parents, t, r);
}
Ee2.prototype.interrupt = G9;
Ee2.prototype.transition = st2;
var x9 = Math.PI, v11 = 2 * x9, c7 = 0.000001, C9 = v11 - c7;
function y8() {
    this._x0 = this._y0 = this._x1 = this._y1 = null, this._ = "";
}
function g9() {
    return new y8;
}
y8.prototype = g9.prototype = {
    constructor: y8,
    moveTo: function(i, s) {
        this._ += "M" + (this._x0 = this._x1 = +i) + "," + (this._y0 = this._y1 = +s);
    },
    closePath: function() {
        this._x1 !== null && (this._x1 = this._x0, this._y1 = this._y0, this._ += "Z");
    },
    lineTo: function(i, s) {
        this._ += "L" + (this._x1 = +i) + "," + (this._y1 = +s);
    },
    quadraticCurveTo: function(i, s, t, h) {
        this._ += "Q" + +i + "," + +s + "," + (this._x1 = +t) + "," + (this._y1 = +h);
    },
    bezierCurveTo: function(i, s, t, h, _, e) {
        this._ += "C" + +i + "," + +s + "," + +t + "," + +h + "," + (this._x1 = +_) + "," + (this._y1 = +e);
    },
    arcTo: function(i, s, t, h, _) {
        i = +i, s = +s, t = +t, h = +h, _ = +_;
        var e = this._x1, M = this._y1, f = t - i, a = h - s, n = e - i, u = M - s, o = n * n + u * u;
        if (_ < 0) throw new Error("negative radius: " + _);
        if (this._x1 === null) this._ += "M" + (this._x1 = i) + "," + (this._y1 = s);
        else if (o > c7) if (!(Math.abs(u * f - a * n) > c7) || !_) this._ += "L" + (this._x1 = i) + "," + (this._y1 = s);
        else {
            var l = t - e, r = h - M, d = f * f + a * a, q = l * l + r * r, b = Math.sqrt(d), T = Math.sqrt(o), A = _ * Math.tan((x9 - Math.acos((d + o - q) / (2 * b * T))) / 2), p = A / T, L = A / b;
            Math.abs(p - 1) > c7 && (this._ += "L" + (i + p * n) + "," + (s + p * u)), this._ += "A" + _ + "," + _ + ",0,0," + +(u * l > n * r) + "," + (this._x1 = i + L * f) + "," + (this._y1 = s + L * a);
        }
    },
    arc: function(i, s, t, h, _, e) {
        i = +i, s = +s, t = +t, e = !!e;
        var M = t * Math.cos(h), f = t * Math.sin(h), a = i + M, n = s + f, u = 1 ^ e, o = e ? h - _ : _ - h;
        if (t < 0) throw new Error("negative radius: " + t);
        this._x1 === null ? this._ += "M" + a + "," + n : (Math.abs(this._x1 - a) > c7 || Math.abs(this._y1 - n) > c7) && (this._ += "L" + a + "," + n), !!t && (o < 0 && (o = o % v11 + v11), o > C9 ? this._ += "A" + t + "," + t + ",0,1," + u + "," + (i - M) + "," + (s - f) + "A" + t + "," + t + ",0,1," + u + "," + (this._x1 = a) + "," + (this._y1 = n) : o > c7 && (this._ += "A" + t + "," + t + ",0," + +(o >= x9) + "," + u + "," + (this._x1 = i + t * Math.cos(_)) + "," + (this._y1 = s + t * Math.sin(_))));
    },
    rect: function(i, s, t, h) {
        this._ += "M" + (this._x0 = this._x1 = +i) + "," + (this._y0 = this._y1 = +s) + "h" + +t + "v" + +h + "h" + -t + "Z";
    },
    toString: function() {
        return this._;
    }
};
var E10 = g9;
var et3 = 0.00000000000000011102230246251565, d4 = 134217729, Nt2 = (3 + 8 * et3) * et3;
function ot1(K, N, W, T, S) {
    let O, C, q, G, o = N[0], u = T[0], l = 0, i = 0;
    u > o == u > -o ? (O = o, o = N[++l]) : (O = u, u = T[++i]);
    let e = 0;
    if (l < K && i < W) for(u > o == u > -o ? (C = o + O, q = O - (C - o), o = N[++l]) : (C = u + O, q = O - (C - u), u = T[++i]), O = C, q !== 0 && (S[e++] = q); l < K && i < W;)u > o == u > -o ? (C = O + o, G = C - O, q = O - (C - G) + (o - G), o = N[++l]) : (C = O + u, G = C - O, q = O - (C - G) + (u - G), u = T[++i]), O = C, q !== 0 && (S[e++] = q);
    for(; l < K;)C = O + o, G = C - O, q = O - (C - G) + (o - G), o = N[++l], O = C, q !== 0 && (S[e++] = q);
    for(; i < W;)C = O + u, G = C - O, q = O - (C - G) + (u - G), u = T[++i], O = C, q !== 0 && (S[e++] = q);
    return (O !== 0 || e === 0) && (S[e++] = O), e;
}
function Ot2(K, N) {
    let W = N[0];
    for(let T = 1; T < K; T++)W += N[T];
    return W;
}
function L8(K) {
    return new Float64Array(K);
}
var gs = (3 + 16 * et3) * et3, Qs = (2 + 12 * et3) * et3, Ds = (9 + 64 * et3) * et3 * et3, xt2 = L8(4), ss = L8(8), cs = L8(12), os = L8(16), mt2 = L8(4);
function Fs(K, N, W, T, S, O, C) {
    let q, G, o, u, l, i, e, v, t, r, a, M, m, Q, h, E, _, B, J = K - S, P = W - S, V = N - O, R = T - O;
    Q = J * R, i = d4 * J, e = i - (i - J), v = J - e, i = d4 * R, t = i - (i - R), r = R - t, h = v * r - (Q - e * t - v * t - e * r), E = V * P, i = d4 * V, e = i - (i - V), v = V - e, i = d4 * P, t = i - (i - P), r = P - t, _ = v * r - (E - e * t - v * t - e * r), a = h - _, l = h - a, xt2[0] = h - (a + l) + (l - _), M = Q + a, l = M - Q, m = Q - (M - l) + (a - l), a = m - E, l = m - a, xt2[1] = m - (a + l) + (l - E), B = M + a, l = B - M, xt2[2] = M - (B - l) + (a - l), xt2[3] = B;
    let Z = Ot2(4, xt2), n = Qs * C;
    if (Z >= n || -Z >= n || (l = K - J, q = K - (J + l) + (l - S), l = W - P, o = W - (P + l) + (l - S), l = N - V, G = N - (V + l) + (l - O), l = T - R, u = T - (R + l) + (l - O), q === 0 && G === 0 && o === 0 && u === 0) || (n = Ds * C + Nt2 * Math.abs(Z), Z += J * u + R * q - (V * o + P * G), Z >= n || -Z >= n)) return Z;
    Q = q * R, i = d4 * q, e = i - (i - q), v = q - e, i = d4 * R, t = i - (i - R), r = R - t, h = v * r - (Q - e * t - v * t - e * r), E = G * P, i = d4 * G, e = i - (i - G), v = G - e, i = d4 * P, t = i - (i - P), r = P - t, _ = v * r - (E - e * t - v * t - e * r), a = h - _, l = h - a, mt2[0] = h - (a + l) + (l - _), M = Q + a, l = M - Q, m = Q - (M - l) + (a - l), a = m - E, l = m - a, mt2[1] = m - (a + l) + (l - E), B = M + a, l = B - M, mt2[2] = M - (B - l) + (a - l), mt2[3] = B;
    let f = ot1(4, xt2, 4, mt2, ss);
    Q = J * u, i = d4 * J, e = i - (i - J), v = J - e, i = d4 * u, t = i - (i - u), r = u - t, h = v * r - (Q - e * t - v * t - e * r), E = V * o, i = d4 * V, e = i - (i - V), v = V - e, i = d4 * o, t = i - (i - o), r = o - t, _ = v * r - (E - e * t - v * t - e * r), a = h - _, l = h - a, mt2[0] = h - (a + l) + (l - _), M = Q + a, l = M - Q, m = Q - (M - l) + (a - l), a = m - E, l = m - a, mt2[1] = m - (a + l) + (l - E), B = M + a, l = B - M, mt2[2] = M - (B - l) + (a - l), mt2[3] = B;
    let p = ot1(f, ss, 4, mt2, cs);
    Q = q * u, i = d4 * q, e = i - (i - q), v = q - e, i = d4 * u, t = i - (i - u), r = u - t, h = v * r - (Q - e * t - v * t - e * r), E = G * o, i = d4 * G, e = i - (i - G), v = G - e, i = d4 * o, t = i - (i - o), r = o - t, _ = v * r - (E - e * t - v * t - e * r), a = h - _, l = h - a, mt2[0] = h - (a + l) + (l - _), M = Q + a, l = M - Q, m = Q - (M - l) + (a - l), a = m - E, l = m - a, mt2[1] = m - (a + l) + (l - E), B = M + a, l = B - M, mt2[2] = M - (B - l) + (a - l), mt2[3] = B;
    let F = ot1(p, cs, 4, mt2, os);
    return os[F - 1];
}
function qs(K, N, W, T, S, O) {
    let C = (N - O) * (W - S), q = (K - S) * (T - O), G = C - q;
    if (C === 0 || q === 0 || C > 0 != q > 0) return G;
    let o = Math.abs(C + q);
    return Math.abs(G) >= gs * o ? G : -Fs(K, N, W, T, S, O, o);
}
var F10 = Math.pow(2, -52), D10 = new Uint32Array(512), H6 = class {
    static from(t, i = V9, l = W6) {
        let r = t.length, h = new Float64Array(r * 2);
        for(let n = 0; n < r; n++){
            let o = t[n];
            h[2 * n] = i(o), h[2 * n + 1] = l(o);
        }
        return new H6(h);
    }
    constructor(t){
        let i4 = t.length >> 1;
        if (i4 > 0 && typeof t[0] != "number") throw new Error("Expected coords to contain numbers.");
        this.coords = t;
        let l6 = Math.max(2 * i4 - 5, 0);
        this._triangles = new Uint32Array(l6 * 3), this._halfedges = new Int32Array(l6 * 3), this._hashSize = Math.ceil(Math.sqrt(i4)), this._hullPrev = new Uint32Array(i4), this._hullNext = new Uint32Array(i4), this._hullTri = new Uint32Array(i4), this._hullHash = new Int32Array(this._hashSize).fill(-1), this._ids = new Uint32Array(i4), this._dists = new Float64Array(i4), this.update();
    }
    update() {
        let { coords: t , _hullPrev: i , _hullNext: l , _hullTri: r , _hullHash: h  } = this, n = t.length >> 1, o = 1 / 0, _ = 1 / 0, f = -1 / 0, b = -1 / 0;
        for(let s = 0; s < n; s++){
            let c = t[2 * s], g = t[2 * s + 1];
            c < o && (o = c), g < _ && (_ = g), c > f && (f = c), g > b && (b = g), this._ids[s] = s;
        }
        let d = (o + f) / 2, m = (_ + b) / 2, w = 1 / 0, u, y, p;
        for(let s7 = 0; s7 < n; s7++){
            let c = C10(d, m, t[2 * s7], t[2 * s7 + 1]);
            c < w && (u = s7, w = c);
        }
        let z = t[2 * u], U = t[2 * u + 1];
        w = 1 / 0;
        for(let s8 = 0; s8 < n; s8++){
            if (s8 === u) continue;
            let c = C10(z, U, t[2 * s8], t[2 * s8 + 1]);
            c < w && c > 0 && (y = s8, w = c);
        }
        let A = t[2 * y], L = t[2 * y + 1], X = 1 / 0;
        for(let s9 = 0; s9 < n; s9++){
            if (s9 === u || s9 === y) continue;
            let c = J7(z, U, A, L, t[2 * s9], t[2 * s9 + 1]);
            c < X && (p = s9, X = c);
        }
        let P = t[2 * p], v = t[2 * p + 1];
        if (X === 1 / 0) {
            for(let g = 0; g < n; g++)this._dists[g] = t[2 * g] - t[0] || t[2 * g + 1] - t[1];
            E11(this._ids, this._dists, 0, n - 1);
            let s = new Uint32Array(n), c = 0;
            for(let g10 = 0, x = -1 / 0; g10 < n; g10++){
                let S = this._ids[g10];
                this._dists[S] > x && (s[c++] = S, x = this._dists[S]);
            }
            this.hull = s.subarray(0, c), this.triangles = new Uint32Array(0), this.halfedges = new Uint32Array(0);
            return;
        }
        if (qs(z, U, A, L, P, v) < 0) {
            let s = y, c = A, g = L;
            y = p, A = P, L = v, p = s, P = c, v = g;
        }
        let q = Q6(z, U, A, L, P, v);
        this._cx = q.x, this._cy = q.y;
        for(let s10 = 0; s10 < n; s10++)this._dists[s10] = C10(t[2 * s10], t[2 * s10 + 1], q.x, q.y);
        E11(this._ids, this._dists, 0, n - 1), this._hullStart = u;
        let N = 3;
        l[u] = i[p] = y, l[y] = i[u] = p, l[p] = i[y] = u, r[u] = 0, r[y] = 1, r[p] = 2, h.fill(-1), h[this._hashKey(z, U)] = u, h[this._hashKey(A, L)] = y, h[this._hashKey(P, v)] = p, this.trianglesLen = 0, this._addTriangle(u, y, p, -1, -1, -1);
        for(let s11 = 0, c, g; s11 < this._ids.length; s11++){
            let x = this._ids[s11], S = t[2 * x], M = t[2 * x + 1];
            if (s11 > 0 && Math.abs(S - c) <= F10 && Math.abs(M - g) <= F10 || (c = S, g = M, x === u || x === y || x === p)) continue;
            let T = 0;
            for(let Y = 0, O = this._hashKey(S, M); Y < this._hashSize && (T = h[(O + Y) % this._hashSize], !(T !== -1 && T !== l[T])); Y++);
            T = i[T];
            let a = T, k;
            for(; k = l[a], qs(S, M, t[2 * a], t[2 * a + 1], t[2 * k], t[2 * k + 1]) >= 0;)if (a = k, a === T) {
                a = -1;
                break;
            }
            if (a === -1) continue;
            let K = this._addTriangle(a, x, l[a], -1, -1, r[a]);
            r[x] = this._legalize(K + 2), r[a] = K, N++;
            let I = l[a];
            for(; k = l[I], qs(S, M, t[2 * I], t[2 * I + 1], t[2 * k], t[2 * k + 1]) < 0;)K = this._addTriangle(I, x, k, r[x], -1, r[I]), r[x] = this._legalize(K + 2), l[I] = I, N--, I = k;
            if (a === T) for(; k = i[a], qs(S, M, t[2 * k], t[2 * k + 1], t[2 * a], t[2 * a + 1]) < 0;)K = this._addTriangle(k, x, a, -1, r[a], r[k]), this._legalize(K + 2), r[k] = K, l[a] = a, N--, a = k;
            this._hullStart = i[x] = a, l[a] = i[I] = x, l[x] = I, h[this._hashKey(S, M)] = x, h[this._hashKey(t[2 * a], t[2 * a + 1])] = a;
        }
        this.hull = new Uint32Array(N);
        for(let s12 = 0, c8 = this._hullStart; s12 < N; s12++)this.hull[s12] = c8, c8 = l[c8];
        this.triangles = this._triangles.subarray(0, this.trianglesLen), this.halfedges = this._halfedges.subarray(0, this.trianglesLen);
    }
    _hashKey(t, i) {
        return Math.floor(R10(t - this._cx, i - this._cy) * this._hashSize) % this._hashSize;
    }
    _legalize(t) {
        let { _triangles: i , _halfedges: l , coords: r  } = this, h = 0, n = 0;
        for(;;){
            let o = l[t], _ = t - t % 3;
            if (n = _ + (t + 2) % 3, o === -1) {
                if (h === 0) break;
                t = D10[--h];
                continue;
            }
            let f = o - o % 3, b = _ + (t + 1) % 3, d = f + (o + 2) % 3, m = i[n], w = i[t], u = i[b], y = i[d];
            if (B8(r[2 * m], r[2 * m + 1], r[2 * w], r[2 * w + 1], r[2 * u], r[2 * u + 1], r[2 * y], r[2 * y + 1])) {
                i[t] = y, i[o] = m;
                let z = l[d];
                if (z === -1) {
                    let A = this._hullStart;
                    do {
                        if (this._hullTri[A] === d) {
                            this._hullTri[A] = t;
                            break;
                        }
                        A = this._hullPrev[A];
                    }while (A !== this._hullStart)
                }
                this._link(t, z), this._link(o, l[n]), this._link(n, d);
                let U = f + (o + 1) % 3;
                h < D10.length && (D10[h++] = U);
            } else {
                if (h === 0) break;
                t = D10[--h];
            }
        }
        return n;
    }
    _link(t, i) {
        this._halfedges[t] = i, i !== -1 && (this._halfedges[i] = t);
    }
    _addTriangle(t, i, l, r, h, n) {
        let o = this.trianglesLen;
        return this._triangles[o] = t, this._triangles[o + 1] = i, this._triangles[o + 2] = l, this._link(o, r), this._link(o + 1, h), this._link(o + 2, n), this.trianglesLen += 3, o;
    }
};
function R10(e, t) {
    let i = e / (Math.abs(e) + Math.abs(t));
    return (t > 0 ? 3 - i : 1 + i) / 4;
}
function C10(e, t, i, l) {
    let r = e - i, h = t - l;
    return r * r + h * h;
}
function B8(e, t, i, l, r, h, n, o) {
    let _ = e - n, f = t - o, b = i - n, d = l - o, m = r - n, w = h - o, u = _ * _ + f * f, y = b * b + d * d, p = m * m + w * w;
    return _ * (d * p - y * w) - f * (b * p - y * m) + u * (b * w - d * m) < 0;
}
function J7(e, t, i, l, r, h) {
    let n = i - e, o = l - t, _ = r - e, f = h - t, b = n * n + o * o, d = _ * _ + f * f, m = 0.5 / (n * f - o * _), w = (f * b - o * d) * m, u = (n * d - _ * b) * m;
    return w * w + u * u;
}
function Q6(e, t, i, l, r, h) {
    let n = i - e, o = l - t, _ = r - e, f = h - t, b = n * n + o * o, d = _ * _ + f * f, m = 0.5 / (n * f - o * _), w = e + (f * b - o * d) * m, u = t + (n * d - _ * b) * m;
    return {
        x: w,
        y: u
    };
}
function E11(e, t, i, l) {
    if (l - i <= 20) for(let r = i + 1; r <= l; r++){
        let h = e[r], n = t[h], o = r - 1;
        for(; o >= i && t[e[o]] > n;)e[o + 1] = e[o--];
        e[o + 1] = h;
    }
    else {
        let r = i + l >> 1, h = i + 1, n = l;
        j13(e, r, h), t[e[i]] > t[e[l]] && j13(e, i, l), t[e[h]] > t[e[l]] && j13(e, h, l), t[e[i]] > t[e[h]] && j13(e, i, h);
        let o = e[h], _ = t[o];
        for(;;){
            do h++;
            while (t[e[h]] < _)
            do n--;
            while (t[e[n]] > _)
            if (n < h) break;
            j13(e, h, n);
        }
        e[i + 1] = e[n], e[n] = o, l - h + 1 >= n - i ? (E11(e, t, h, l), E11(e, t, i, n - 1)) : (E11(e, t, i, n - 1), E11(e, t, h, l));
    }
}
function j13(e, t, i) {
    let l = e[t];
    e[t] = e[i], e[i] = l;
}
function V9(e) {
    return e[0];
}
function W6(e) {
    return e[1];
}
var Z10 = 0.000001, y9 = class {
    constructor(){
        this._x0 = this._y0 = this._x1 = this._y1 = null, this._ = "";
    }
    moveTo(e, t) {
        this._ += `M${this._x0 = this._x1 = +e},${this._y0 = this._y1 = +t}`;
    }
    closePath() {
        this._x1 !== null && (this._x1 = this._x0, this._y1 = this._y0, this._ += "Z");
    }
    lineTo(e, t) {
        this._ += `L${this._x1 = +e},${this._y1 = +t}`;
    }
    arc(e, t, n) {
        e = +e, t = +t, n = +n;
        let i = e + n, l = t;
        if (n < 0) throw new Error("negative radius");
        this._x1 === null ? this._ += `M${i},${l}` : (Math.abs(this._x1 - i) > Z10 || Math.abs(this._y1 - l) > Z10) && (this._ += "L" + i + "," + l), !!n && (this._ += `A${n},${n},0,1,1,${e - n},${t}A${n},${n},0,1,1,${this._x1 = i},${this._y1 = l}`);
    }
    rect(e, t, n, i) {
        this._ += `M${this._x0 = this._x1 = +e},${this._y0 = this._y1 = +t}h${+n}v${+i}h${-n}Z`;
    }
    value() {
        return this._ || null;
    }
};
var x10 = class {
    constructor(){
        this._ = [];
    }
    moveTo(e, t) {
        this._.push([
            e,
            t
        ]);
    }
    closePath() {
        this._.push(this._[0].slice());
    }
    lineTo(e, t) {
        this._.push([
            e,
            t
        ]);
    }
    value() {
        return this._.length ? this._ : null;
    }
};
var A8 = class {
    constructor(e2, [t1, n3, i5, l7] = [
        0,
        0,
        960,
        500
    ]){
        if (!((i5 = +i5) >= (t1 = +t1)) || !((l7 = +l7) >= (n3 = +n3))) throw new Error("invalid bounds");
        this.delaunay = e2, this._circumcenters = new Float64Array(e2.points.length * 2), this.vectors = new Float64Array(e2.points.length * 2), this.xmax = i5, this.xmin = t1, this.ymax = l7, this.ymin = n3, this._init();
    }
    update() {
        return this.delaunay.update(), this._init(), this;
    }
    _init() {
        let { delaunay: { points: e , hull: t , triangles: n  } , vectors: i  } = this, l = this.circumcenters = this._circumcenters.subarray(0, n.length / 3 * 2);
        for(let c = 0, d = 0, m = n.length, _, p; c < m; c += 3, d += 2){
            let b = n[c] * 2, P = n[c + 1] * 2, H = n[c + 2] * 2, $ = e[b], M = e[b + 1], D = e[P], O = e[P + 1], V = e[H], C = e[H + 1], S = D - $, F = O - M, w = V - $, v = C - M, E = (S * v - F * w) * 2;
            if (Math.abs(E) < 0.000000001) {
                let j = 1000000000, I = n[0] * 2;
                j *= Math.sign((e[I] - $) * v - (e[I + 1] - M) * w), _ = ($ + V) / 2 - j * v, p = (M + C) / 2 + j * w;
            } else {
                let j = 1 / E, I = S * S + F * F, L = w * w + v * v;
                _ = $ + (v * I - F * L) * j, p = M + (S * L - w * I) * j;
            }
            l[d] = _, l[d + 1] = p;
        }
        let s = t[t.length - 1], h, r = s * 4, o, u = e[2 * s], f, a = e[2 * s + 1];
        i.fill(0);
        for(let c8 = 0; c8 < t.length; ++c8)s = t[c8], h = r, o = u, f = a, r = s * 4, u = e[2 * s], a = e[2 * s + 1], i[h + 2] = i[r] = f - a, i[h + 3] = i[r + 1] = u - o;
    }
    render(e) {
        let t = e == null ? e = new y9 : void 0, { delaunay: { halfedges: n , inedges: i , hull: l  } , circumcenters: s , vectors: h  } = this;
        if (l.length <= 1) return null;
        for(let u = 0, f = n.length; u < f; ++u){
            let a = n[u];
            if (a < u) continue;
            let c = Math.floor(u / 3) * 2, d = Math.floor(a / 3) * 2, m = s[c], _ = s[c + 1], p = s[d], b = s[d + 1];
            this._renderSegment(m, _, p, b, e);
        }
        let r, o = l[l.length - 1];
        for(let u4 = 0; u4 < l.length; ++u4){
            r = o, o = l[u4];
            let f = Math.floor(i[o] / 3) * 2, a = s[f], c = s[f + 1], d = r * 4, m = this._project(a, c, h[d + 2], h[d + 3]);
            m && this._renderSegment(a, c, m[0], m[1], e);
        }
        return t && t.value();
    }
    renderBounds(e) {
        let t = e == null ? e = new y9 : void 0;
        return e.rect(this.xmin, this.ymin, this.xmax - this.xmin, this.ymax - this.ymin), t && t.value();
    }
    renderCell(e, t) {
        let n = t == null ? t = new y9 : void 0, i = this._clip(e);
        if (i === null || !i.length) return;
        t.moveTo(i[0], i[1]);
        let l = i.length;
        for(; i[0] === i[l - 2] && i[1] === i[l - 1] && l > 1;)l -= 2;
        for(let s = 2; s < l; s += 2)(i[s] !== i[s - 2] || i[s + 1] !== i[s - 1]) && t.lineTo(i[s], i[s + 1]);
        return t.closePath(), n && n.value();
    }
    *cellPolygons() {
        let { delaunay: { points: e  }  } = this;
        for(let t = 0, n = e.length / 2; t < n; ++t){
            let i = this.cellPolygon(t);
            i && (i.index = t, yield i);
        }
    }
    cellPolygon(e) {
        let t = new x10;
        return this.renderCell(e, t), t.value();
    }
    _renderSegment(e, t, n, i, l) {
        let s, h = this._regioncode(e, t), r = this._regioncode(n, i);
        h === 0 && r === 0 ? (l.moveTo(e, t), l.lineTo(n, i)) : (s = this._clipSegment(e, t, n, i, h, r)) && (l.moveTo(s[0], s[1]), l.lineTo(s[2], s[3]));
    }
    contains(e, t, n) {
        return t = +t, t !== t || (n = +n, n !== n) ? !1 : this.delaunay._step(e, t, n) === e;
    }
    *neighbors(e) {
        let t = this._clip(e);
        if (t) for (let n of this.delaunay.neighbors(e)){
            let i = this._clip(n);
            if (i) {
                t: for(let l = 0, s = t.length; l < s; l += 2)for(let h = 0, r = i.length; h < r; h += 2)if (t[l] == i[h] && t[l + 1] == i[h + 1] && t[(l + 2) % s] == i[(h + r - 2) % r] && t[(l + 3) % s] == i[(h + r - 1) % r]) {
                    yield n;
                    break t;
                }
            }
        }
    }
    _cell(e) {
        let { circumcenters: t , delaunay: { inedges: n , halfedges: i , triangles: l  }  } = this, s = n[e];
        if (s === -1) return null;
        let h = [], r = s;
        do {
            let o = Math.floor(r / 3);
            if (h.push(t[o * 2], t[o * 2 + 1]), r = r % 3 == 2 ? r - 2 : r + 1, l[r] !== e) break;
            r = i[r];
        }while (r !== s && r !== -1)
        return h;
    }
    _clip(e) {
        if (e === 0 && this.delaunay.hull.length === 1) return [
            this.xmax,
            this.ymin,
            this.xmax,
            this.ymax,
            this.xmin,
            this.ymax,
            this.xmin,
            this.ymin
        ];
        let t = this._cell(e);
        if (t === null) return null;
        let { vectors: n  } = this, i = e * 4;
        return n[i] || n[i + 1] ? this._clipInfinite(e, t, n[i], n[i + 1], n[i + 2], n[i + 3]) : this._clipFinite(e, t);
    }
    _clipFinite(e, t) {
        let n = t.length, i = null, l, s, h = t[n - 2], r = t[n - 1], o, u = this._regioncode(h, r), f, a = 0;
        for(let c = 0; c < n; c += 2)if (l = h, s = r, h = t[c], r = t[c + 1], o = u, u = this._regioncode(h, r), o === 0 && u === 0) f = a, a = 0, i ? i.push(h, r) : i = [
            h,
            r
        ];
        else {
            let d, m, _, p, b;
            if (o === 0) {
                if ((d = this._clipSegment(l, s, h, r, o, u)) === null) continue;
                [m, _, p, b] = d;
            } else {
                if ((d = this._clipSegment(h, r, l, s, u, o)) === null) continue;
                [p, b, m, _] = d, f = a, a = this._edgecode(m, _), f && a && this._edge(e, f, a, i, i.length), i ? i.push(m, _) : i = [
                    m,
                    _
                ];
            }
            f = a, a = this._edgecode(p, b), f && a && this._edge(e, f, a, i, i.length), i ? i.push(p, b) : i = [
                p,
                b
            ];
        }
        if (i) f = a, a = this._edgecode(i[0], i[1]), f && a && this._edge(e, f, a, i, i.length);
        else if (this.contains(e, (this.xmin + this.xmax) / 2, (this.ymin + this.ymax) / 2)) return [
            this.xmax,
            this.ymin,
            this.xmax,
            this.ymax,
            this.xmin,
            this.ymax,
            this.xmin,
            this.ymin
        ];
        return i;
    }
    _clipSegment(e, t, n, i, l, s) {
        for(;;){
            if (l === 0 && s === 0) return [
                e,
                t,
                n,
                i
            ];
            if (l & s) return null;
            let h, r, o = l || s;
            o & 8 ? (h = e + (n - e) * (this.ymax - t) / (i - t), r = this.ymax) : o & 4 ? (h = e + (n - e) * (this.ymin - t) / (i - t), r = this.ymin) : o & 2 ? (r = t + (i - t) * (this.xmax - e) / (n - e), h = this.xmax) : (r = t + (i - t) * (this.xmin - e) / (n - e), h = this.xmin), l ? (e = h, t = r, l = this._regioncode(e, t)) : (n = h, i = r, s = this._regioncode(n, i));
        }
    }
    _clipInfinite(e, t, n, i, l, s) {
        let h = Array.from(t), r;
        if ((r = this._project(h[0], h[1], n, i)) && h.unshift(r[0], r[1]), (r = this._project(h[h.length - 2], h[h.length - 1], l, s)) && h.push(r[0], r[1]), h = this._clipFinite(e, h)) for(let o = 0, u = h.length, f, a = this._edgecode(h[u - 2], h[u - 1]); o < u; o += 2)f = a, a = this._edgecode(h[o], h[o + 1]), f && a && (o = this._edge(e, f, a, h, o), u = h.length);
        else this.contains(e, (this.xmin + this.xmax) / 2, (this.ymin + this.ymax) / 2) && (h = [
            this.xmin,
            this.ymin,
            this.xmax,
            this.ymin,
            this.xmax,
            this.ymax,
            this.xmin,
            this.ymax
        ]);
        return h;
    }
    _edge(e, t, n, i, l) {
        for(; t !== n;){
            let s, h;
            switch(t){
                case 5:
                    t = 4;
                    continue;
                case 4:
                    t = 6, s = this.xmax, h = this.ymin;
                    break;
                case 6:
                    t = 2;
                    continue;
                case 2:
                    t = 10, s = this.xmax, h = this.ymax;
                    break;
                case 10:
                    t = 8;
                    continue;
                case 8:
                    t = 9, s = this.xmin, h = this.ymax;
                    break;
                case 9:
                    t = 1;
                    continue;
                case 1:
                    t = 5, s = this.xmin, h = this.ymin;
                    break;
            }
            (i[l] !== s || i[l + 1] !== h) && this.contains(e, s, h) && (i.splice(l, 0, s, h), l += 2);
        }
        if (i.length > 4) for(let s = 0; s < i.length; s += 2){
            let h = (s + 2) % i.length, r = (s + 4) % i.length;
            (i[s] === i[h] && i[h] === i[r] || i[s + 1] === i[h + 1] && i[h + 1] === i[r + 1]) && (i.splice(h, 2), s -= 2);
        }
        return l;
    }
    _project(e, t, n, i) {
        let l = 1 / 0, s, h, r;
        if (i < 0) {
            if (t <= this.ymin) return null;
            (s = (this.ymin - t) / i) < l && (r = this.ymin, h = e + (l = s) * n);
        } else if (i > 0) {
            if (t >= this.ymax) return null;
            (s = (this.ymax - t) / i) < l && (r = this.ymax, h = e + (l = s) * n);
        }
        if (n > 0) {
            if (e >= this.xmax) return null;
            (s = (this.xmax - e) / n) < l && (h = this.xmax, r = t + (l = s) * i);
        } else if (n < 0) {
            if (e <= this.xmin) return null;
            (s = (this.xmin - e) / n) < l && (h = this.xmin, r = t + (l = s) * i);
        }
        return [
            h,
            r
        ];
    }
    _edgecode(e, t) {
        return (e === this.xmin ? 1 : e === this.xmax ? 2 : 0) | (t === this.ymin ? 4 : t === this.ymax ? 8 : 0);
    }
    _regioncode(e, t) {
        return (e < this.xmin ? 1 : e > this.xmax ? 2 : 0) | (t < this.ymin ? 4 : t > this.ymax ? 8 : 0);
    }
};
var X9 = 2 * Math.PI, T8 = Math.pow;
function Y7(g) {
    return g[0];
}
function q8(g) {
    return g[1];
}
function z9(g) {
    let { triangles: e , coords: t  } = g;
    for(let n = 0; n < e.length; n += 3){
        let i = 2 * e[n], l = 2 * e[n + 1], s = 2 * e[n + 2];
        if ((t[s] - t[i]) * (t[l + 1] - t[i + 1]) - (t[l] - t[i]) * (t[s + 1] - t[i + 1]) > 0.0000000001) return !1;
    }
    return !0;
}
function G10(g, e, t) {
    return [
        g + Math.sin(g + e) * t,
        e + Math.cos(g - e) * t
    ];
}
var k5 = class {
    static from(e, t = Y7, n = q8, i) {
        return new k5("length" in e ? J8(e, t, n, i) : Float64Array.from(K7(e, t, n, i)));
    }
    constructor(e3){
        this._delaunator = new H6(e3), this.inedges = new Int32Array(e3.length / 2), this._hullIndex = new Int32Array(e3.length / 2), this.points = this._delaunator.coords, this._init();
    }
    update() {
        return this._delaunator.update(), this._init(), this;
    }
    _init() {
        let e = this._delaunator, t = this.points;
        if (e.hull && e.hull.length > 2 && z9(e)) {
            this.collinear = Int32Array.from({
                length: t.length / 2
            }, (a, c)=>c
            ).sort((a, c)=>t[2 * a] - t[2 * c] || t[2 * a + 1] - t[2 * c + 1]
            );
            let r = this.collinear[0], o = this.collinear[this.collinear.length - 1], u = [
                t[2 * r],
                t[2 * r + 1],
                t[2 * o],
                t[2 * o + 1]
            ], f = 0.00000001 * Math.hypot(u[3] - u[1], u[2] - u[0]);
            for(let a = 0, c = t.length / 2; a < c; ++a){
                let d = G10(t[2 * a], t[2 * a + 1], f);
                t[2 * a] = d[0], t[2 * a + 1] = d[1];
            }
            this._delaunator = new H6(t);
        } else delete this.collinear;
        let n = this.halfedges = this._delaunator.halfedges, i = this.hull = this._delaunator.hull, l = this.triangles = this._delaunator.triangles, s = this.inedges.fill(-1), h = this._hullIndex.fill(-1);
        for(let r = 0, o = n.length; r < o; ++r){
            let u = l[r % 3 == 2 ? r - 2 : r + 1];
            (n[r] === -1 || s[u] === -1) && (s[u] = r);
        }
        for(let r3 = 0, o4 = i.length; r3 < o4; ++r3)h[i[r3]] = r3;
        i.length <= 2 && i.length > 0 && (this.triangles = new Int32Array(3).fill(-1), this.halfedges = new Int32Array(3).fill(-1), this.triangles[0] = i[0], s[i[0]] = 1, i.length === 2 && (s[i[1]] = 0, this.triangles[1] = i[1], this.triangles[2] = i[1]));
    }
    voronoi(e) {
        return new A8(this, e);
    }
    *neighbors(e) {
        let { inedges: t , hull: n , _hullIndex: i , halfedges: l , triangles: s , collinear: h  } = this;
        if (h) {
            let f = h.indexOf(e);
            f > 0 && (yield h[f - 1]), f < h.length - 1 && (yield h[f + 1]);
            return;
        }
        let r = t[e];
        if (r === -1) return;
        let o = r, u = -1;
        do {
            if (yield u = s[o], o = o % 3 == 2 ? o - 2 : o + 1, s[o] !== e) return;
            if (o = l[o], o === -1) {
                let f = n[(i[e] + 1) % n.length];
                f !== u && (yield f);
                return;
            }
        }while (o !== r)
    }
    find(e, t, n = 0) {
        if (e = +e, e !== e || (t = +t, t !== t)) return -1;
        let i = n, l;
        for(; (l = this._step(n, e, t)) >= 0 && l !== n && l !== i;)n = l;
        return l;
    }
    _step(e, t, n) {
        let { inedges: i , hull: l , _hullIndex: s , halfedges: h , triangles: r , points: o  } = this;
        if (i[e] === -1 || !o.length) return (e + 1) % (o.length >> 1);
        let u = e, f = T8(t - o[e * 2], 2) + T8(n - o[e * 2 + 1], 2), a = i[e], c = a;
        do {
            let d = r[c], m = T8(t - o[d * 2], 2) + T8(n - o[d * 2 + 1], 2);
            if (m < f && (f = m, u = d), c = c % 3 == 2 ? c - 2 : c + 1, r[c] !== e) break;
            if (c = h[c], c === -1) {
                if (c = l[(s[e] + 1) % l.length], c !== d && T8(t - o[c * 2], 2) + T8(n - o[c * 2 + 1], 2) < f) return c;
                break;
            }
        }while (c !== a)
        return u;
    }
    render(e) {
        let t = e == null ? e = new y9 : void 0, { points: n , halfedges: i , triangles: l  } = this;
        for(let s = 0, h = i.length; s < h; ++s){
            let r = i[s];
            if (r < s) continue;
            let o = l[s] * 2, u = l[r] * 2;
            e.moveTo(n[o], n[o + 1]), e.lineTo(n[u], n[u + 1]);
        }
        return this.renderHull(e), t && t.value();
    }
    renderPoints(e, t) {
        t === void 0 && (!e || typeof e.moveTo != "function") && (t = e, e = null), t = t == null ? 2 : +t;
        let n = e == null ? e = new y9 : void 0, { points: i  } = this;
        for(let l = 0, s = i.length; l < s; l += 2){
            let h = i[l], r = i[l + 1];
            e.moveTo(h + t, r), e.arc(h, r, t, 0, X9);
        }
        return n && n.value();
    }
    renderHull(e) {
        let t = e == null ? e = new y9 : void 0, { hull: n , points: i  } = this, l = n[0] * 2, s = n.length;
        e.moveTo(i[l], i[l + 1]);
        for(let h = 1; h < s; ++h){
            let r = 2 * n[h];
            e.lineTo(i[r], i[r + 1]);
        }
        return e.closePath(), t && t.value();
    }
    hullPolygon() {
        let e = new x10;
        return this.renderHull(e), e.value();
    }
    renderTriangle(e, t) {
        let n = t == null ? t = new y9 : void 0, { points: i , triangles: l  } = this, s = l[e *= 3] * 2, h = l[e + 1] * 2, r = l[e + 2] * 2;
        return t.moveTo(i[s], i[s + 1]), t.lineTo(i[h], i[h + 1]), t.lineTo(i[r], i[r + 1]), t.closePath(), n && n.value();
    }
    *trianglePolygons() {
        let { triangles: e  } = this;
        for(let t = 0, n = e.length / 3; t < n; ++t)yield this.trianglePolygon(t);
    }
    trianglePolygon(e) {
        let t = new x10;
        return this.renderTriangle(e, t), t.value();
    }
};
function J8(g, e, t, n) {
    let i = g.length, l = new Float64Array(i * 2);
    for(let s = 0; s < i; ++s){
        let h = g[s];
        l[s * 2] = e.call(n, h, s, g), l[s * 2 + 1] = t.call(n, h, s, g);
    }
    return l;
}
function* K7(g, e, t, n) {
    let i = 0;
    for (let l of g)yield e.call(n, l, i, g), yield t.call(n, l, i, g), ++i;
}
function b8(i) {
    let t = +this._x.call(null, i), e = +this._y.call(null, i);
    return k6(this.cover(t, e), t, e, i);
}
function k6(i, t, e, n) {
    if (isNaN(t) || isNaN(e)) return i;
    var r, o = i._root, s = {
        data: n
    }, f = i._x0, h = i._y0, a = i._x1, l = i._y1, u, _, p, c, w, x, y, g;
    if (!o) return i._root = s, i;
    for(; o.length;)if ((w = t >= (u = (f + a) / 2)) ? f = u : a = u, (x = e >= (_ = (h + l) / 2)) ? h = _ : l = _, r = o, !(o = o[y = x << 1 | w])) return r[y] = s, i;
    if (p = +i._x.call(null, o.data), c = +i._y.call(null, o.data), t === p && e === c) return s.next = o, r ? r[y] = s : i._root = s, i;
    do r = r ? r[y] = new Array(4) : i._root = new Array(4), (w = t >= (u = (f + a) / 2)) ? f = u : a = u, (x = e >= (_ = (h + l) / 2)) ? h = _ : l = _;
    while ((y = x << 1 | w) == (g = (c >= _) << 1 | p >= u))
    return r[g] = o, r[y] = s, i;
}
function I10(i) {
    var t, e, n = i.length, r, o, s = new Array(n), f = new Array(n), h = 1 / 0, a = 1 / 0, l = -1 / 0, u = -1 / 0;
    for(e = 0; e < n; ++e)isNaN(r = +this._x.call(null, t = i[e])) || isNaN(o = +this._y.call(null, t)) || (s[e] = r, f[e] = o, r < h && (h = r), r > l && (l = r), o < a && (a = o), o > u && (u = o));
    if (h > l || a > u) return this;
    for(this.cover(h, a).cover(l, u), e = 0; e < n; ++e)k6(this, s[e], f[e], i[e]);
    return this;
}
function Q7(i, t) {
    if (isNaN(i = +i) || isNaN(t = +t)) return this;
    var e = this._x0, n = this._y0, r = this._x1, o = this._y1;
    if (isNaN(e)) r = (e = Math.floor(i)) + 1, o = (n = Math.floor(t)) + 1;
    else {
        for(var s = r - e || 1, f = this._root, h, a; e > i || i >= r || n > t || t >= o;)switch(a = (t < n) << 1 | i < e, h = new Array(4), h[a] = f, f = h, s *= 2, a){
            case 0:
                r = e + s, o = n + s;
                break;
            case 1:
                e = r - s, o = n + s;
                break;
            case 2:
                r = e + s, n = o - s;
                break;
            case 3:
                e = r - s, n = o - s;
                break;
        }
        this._root && this._root.length && (this._root = f);
    }
    return this._x0 = e, this._y0 = n, this._x1 = r, this._y1 = o, this;
}
function M8() {
    var i = [];
    return this.visit(function(t) {
        if (!t.length) do i.push(t.data);
        while (t = t.next)
    }), i;
}
function X10(i) {
    return arguments.length ? this.cover(+i[0][0], +i[0][1]).cover(+i[1][0], +i[1][1]) : isNaN(this._x0) ? void 0 : [
        [
            this._x0,
            this._y0
        ],
        [
            this._x1,
            this._y1
        ]
    ];
}
function d5(i, t, e, n, r) {
    this.node = i, this.x0 = t, this.y0 = e, this.x1 = n, this.y1 = r;
}
function Y8(i, t, e) {
    var n, r = this._x0, o = this._y0, s, f, h, a, l = this._x1, u = this._y1, _ = [], p = this._root, c, w;
    for(p && _.push(new d5(p, r, o, l, u)), e == null ? e = 1 / 0 : (r = i - e, o = t - e, l = i + e, u = t + e, e *= e); c = _.pop();)if (!(!(p = c.node) || (s = c.x0) > l || (f = c.y0) > u || (h = c.x1) < r || (a = c.y1) < o)) if (p.length) {
        var x = (s + h) / 2, y = (f + a) / 2;
        _.push(new d5(p[3], x, y, h, a), new d5(p[2], s, y, x, a), new d5(p[1], x, f, h, y), new d5(p[0], s, f, x, y)), (w = (t >= y) << 1 | i >= x) && (c = _[_.length - 1], _[_.length - 1] = _[_.length - 1 - w], _[_.length - 1 - w] = c);
    } else {
        var g = i - +this._x.call(null, p.data), j = t - +this._y.call(null, p.data), q = g * g + j * j;
        if (q < e) {
            var m = Math.sqrt(e = q);
            r = i - m, o = t - m, l = i + m, u = t + m, n = p.data;
        }
    }
    return n;
}
function P8(i) {
    if (isNaN(l = +this._x.call(null, i)) || isNaN(u = +this._y.call(null, i))) return this;
    var t, e = this._root, n, r, o, s = this._x0, f = this._y0, h = this._x1, a = this._y1, l, u, _, p, c, w, x, y;
    if (!e) return this;
    if (e.length) for(;;){
        if ((c = l >= (_ = (s + h) / 2)) ? s = _ : h = _, (w = u >= (p = (f + a) / 2)) ? f = p : a = p, t = e, !(e = e[x = w << 1 | c])) return this;
        if (!e.length) break;
        (t[x + 1 & 3] || t[x + 2 & 3] || t[x + 3 & 3]) && (n = t, y = x);
    }
    for(; e.data !== i;)if (r = e, !(e = e.next)) return this;
    return (o = e.next) && delete e.next, r ? (o ? r.next = o : delete r.next, this) : t ? (o ? t[x] = o : delete t[x], (e = t[0] || t[1] || t[2] || t[3]) && e === (t[3] || t[2] || t[1] || t[0]) && !e.length && (n ? n[y] = e : this._root = e), this) : (this._root = o, this);
}
function B9(i) {
    for(var t = 0, e = i.length; t < e; ++t)this.remove(i[t]);
    return this;
}
function C11() {
    return this._root;
}
function D11() {
    var i = 0;
    return this.visit(function(t) {
        if (!t.length) do ++i;
        while (t = t.next)
    }), i;
}
function E12(i) {
    var t = [], e, n = this._root, r, o, s, f, h;
    for(n && t.push(new d5(n, this._x0, this._y0, this._x1, this._y1)); e = t.pop();)if (!i(n = e.node, o = e.x0, s = e.y0, f = e.x1, h = e.y1) && n.length) {
        var a = (o + f) / 2, l = (s + h) / 2;
        (r = n[3]) && t.push(new d5(r, a, l, f, h)), (r = n[2]) && t.push(new d5(r, o, l, a, h)), (r = n[1]) && t.push(new d5(r, a, s, f, l)), (r = n[0]) && t.push(new d5(r, o, s, a, l));
    }
    return this;
}
function F11(i) {
    var t = [], e = [], n;
    for(this._root && t.push(new d5(this._root, this._x0, this._y0, this._x1, this._y1)); n = t.pop();){
        var r = n.node;
        if (r.length) {
            var o, s = n.x0, f = n.y0, h = n.x1, a = n.y1, l = (s + h) / 2, u = (f + a) / 2;
            (o = r[0]) && t.push(new d5(o, s, f, l, u)), (o = r[1]) && t.push(new d5(o, l, f, h, u)), (o = r[2]) && t.push(new d5(o, s, u, l, a)), (o = r[3]) && t.push(new d5(o, l, u, h, a));
        }
        e.push(n);
    }
    for(; n = e.pop();)i(n.node, n.x0, n.y0, n.x1, n.y1);
    return this;
}
function G11(i) {
    return i[0];
}
function H7(i) {
    return arguments.length ? (this._x = i, this) : this._x;
}
function J9(i) {
    return i[1];
}
function K8(i) {
    return arguments.length ? (this._y = i, this) : this._y;
}
function N8(i, t, e) {
    var n = new A9(t ?? G11, e ?? J9, NaN, NaN, NaN, NaN);
    return i == null ? n : n.addAll(i);
}
function A9(i, t, e, n, r, o) {
    this._x = i, this._y = t, this._x0 = e, this._y0 = n, this._x1 = r, this._y1 = o, this._root = void 0;
}
function L9(i) {
    for(var t = {
        data: i.data
    }, e = t; i = i.next;)e = e.next = {
        data: i.data
    };
    return t;
}
var v12 = N8.prototype = A9.prototype;
v12.copy = function() {
    var i = new A9(this._x, this._y, this._x0, this._y0, this._x1, this._y1), t = this._root, e, n;
    if (!t) return i;
    if (!t.length) return i._root = L9(t), i;
    for(e = [
        {
            source: t,
            target: i._root = new Array(4)
        }
    ]; t = e.pop();)for(var r = 0; r < 4; ++r)(n = t.source[r]) && (n.length ? e.push({
        source: n,
        target: t.target[r] = new Array(4)
    }) : t.target[r] = L9(n));
    return i;
};
v12.add = b8;
v12.addAll = I10;
v12.cover = Q7;
v12.data = M8;
v12.extent = X10;
v12.find = Y8;
v12.remove = P8;
v12.removeAll = B9;
v12.root = C11;
v12.size = D11;
v12.visit = E12;
v12.visitAfter = F11;
v12.x = H7;
v12.y = K8;
function Z11(t) {
    return Math.abs(t = Math.round(t)) >= 1000000000000000000000 ? t.toLocaleString("en").replace(/,/g, "") : t.toString(10);
}
function g10(t, r) {
    if ((e = (t = r ? t.toExponential(r - 1) : t.toExponential()).indexOf("e")) < 0) return null;
    var e, o = t.slice(0, e);
    return [
        o.length > 1 ? o[0] + o.slice(2) : o,
        +t.slice(e + 1)
    ];
}
function d6(t) {
    return t = g10(Math.abs(t)), t ? t[1] : NaN;
}
function q9(t, r) {
    return function(e, o) {
        for(var i = e.length, f = [], c = 0, h = t[0], b = 0; i > 0 && h > 0 && (b + h + 1 > o && (h = Math.max(1, o - b)), f.push(e.substring(i -= h, i + h)), !((b += h + 1) > o));)h = t[c = (c + 1) % t.length];
        return f.reverse().join(r);
    };
}
function B10(t) {
    return function(r) {
        return r.replace(/[0-9]/g, function(e) {
            return t[+e];
        });
    };
}
var nt4 = /^(?:(.)?([<>=^]))?([+\-( ])?([$#])?(0)?(\d+)?(,)?(\.\d+)?(~)?([a-z%])?$/i;
function j14(t) {
    if (!(r = nt4.exec(t))) throw new Error("invalid format: " + t);
    var r;
    return new E14({
        fill: r[1],
        align: r[2],
        sign: r[3],
        symbol: r[4],
        zero: r[5],
        width: r[6],
        comma: r[7],
        precision: r[8] && r[8].slice(1),
        trim: r[9],
        type: r[10]
    });
}
j14.prototype = E14.prototype;
function E14(t) {
    this.fill = t.fill === void 0 ? " " : t.fill + "", this.align = t.align === void 0 ? ">" : t.align + "", this.sign = t.sign === void 0 ? "-" : t.sign + "", this.symbol = t.symbol === void 0 ? "" : t.symbol + "", this.zero = !!t.zero, this.width = t.width === void 0 ? void 0 : +t.width, this.comma = !!t.comma, this.precision = t.precision === void 0 ? void 0 : +t.precision, this.trim = !!t.trim, this.type = t.type === void 0 ? "" : t.type + "";
}
E14.prototype.toString = function() {
    return this.fill + this.align + this.sign + this.symbol + (this.zero ? "0" : "") + (this.width === void 0 ? "" : Math.max(1, this.width | 0)) + (this.comma ? "," : "") + (this.precision === void 0 ? "" : "." + Math.max(0, this.precision | 0)) + (this.trim ? "~" : "") + this.type;
};
function H8(t) {
    t: for(var r = t.length, e = 1, o = -1, i; e < r; ++e)switch(t[e]){
        case ".":
            o = i = e;
            break;
        case "0":
            o === 0 && (o = e), i = e;
            break;
        default:
            if (!+t[e]) break t;
            o > 0 && (o = 0);
            break;
    }
    return o > 0 ? t.slice(0, o) + t.slice(i + 1) : t;
}
var N9;
function J10(t, r) {
    var e = g10(t, r);
    if (!e) return t + "";
    var o = e[0], i = e[1], f = i - (N9 = Math.max(-8, Math.min(8, Math.floor(i / 3))) * 3) + 1, c = o.length;
    return f === c ? o : f > c ? o + new Array(f - c + 1).join("0") : f > 0 ? o.slice(0, f) + "." + o.slice(f) : "0." + new Array(1 - f).join("0") + g10(t, Math.max(0, r + f - 1))[0];
}
function T9(t, r) {
    var e = g10(t, r);
    if (!e) return t + "";
    var o = e[0], i = e[1];
    return i < 0 ? "0." + new Array(-i).join("0") + o : o.length > i + 1 ? o.slice(0, i + 1) + "." + o.slice(i + 1) : o + new Array(i - o.length + 2).join("0");
}
var $7 = {
    "%": (t, r)=>(t * 100).toFixed(r)
    ,
    b: (t)=>Math.round(t).toString(2)
    ,
    c: (t)=>t + ""
    ,
    d: Z11,
    e: (t, r)=>t.toExponential(r)
    ,
    f: (t, r)=>t.toFixed(r)
    ,
    g: (t, r)=>t.toPrecision(r)
    ,
    o: (t)=>Math.round(t).toString(8)
    ,
    p: (t, r)=>T9(t * 100, r)
    ,
    r: T9,
    s: J10,
    X: (t)=>Math.round(t).toString(16).toUpperCase()
    ,
    x: (t)=>Math.round(t).toString(16)
};
function R11(t) {
    return t;
}
var K9 = Array.prototype.map, Q8 = [
    "y",
    "z",
    "a",
    "f",
    "p",
    "n",
    "\xB5",
    "m",
    "",
    "k",
    "M",
    "G",
    "T",
    "P",
    "E",
    "Z",
    "Y"
];
function C12(t) {
    var r = t.grouping === void 0 || t.thousands === void 0 ? R11 : q9(K9.call(t.grouping, Number), t.thousands + ""), e = t.currency === void 0 ? "" : t.currency[0] + "", o = t.currency === void 0 ? "" : t.currency[1] + "", i = t.decimal === void 0 ? "." : t.decimal + "", f = t.numerals === void 0 ? R11 : B10(K9.call(t.numerals, String)), c = t.percent === void 0 ? "%" : t.percent + "", h = t.minus === void 0 ? "\u2212" : t.minus + "", b = t.nan === void 0 ? "NaN" : t.nan + "";
    function I(a) {
        a = j14(a);
        var w = a.fill, S = a.align, s = a.sign, P = a.symbol, y = a.zero, k = a.width, L = a.comma, l = a.precision, X = a.trim, m = a.type;
        m === "n" ? (L = !0, m = "g") : $7[m] || (l === void 0 && (l = 12), X = !0, m = "g"), (y || w === "0" && S === "=") && (y = !0, w = "0", S = "=");
        var v = P === "$" ? e : P === "#" && /[boxX]/.test(m) ? "0" + m.toLowerCase() : "", tt = P === "$" ? o : /[%p]/.test(m) ? c : "", O = $7[m], rt = /[defgprs%]/.test(m);
        l = l === void 0 ? 6 : /[gprs]/.test(m) ? Math.max(1, Math.min(21, l)) : Math.max(0, Math.min(20, l));
        function U(n) {
            var x = v, u = tt, M, Y, A;
            if (m === "c") u = O(n) + u, n = "";
            else {
                n = +n;
                var D = n < 0 || 1 / n < 0;
                if (n = isNaN(n) ? b : O(Math.abs(n), l), X && (n = H8(n)), D && +n == 0 && s !== "+" && (D = !1), x = (D ? s === "(" ? s : h : s === "-" || s === "(" ? "" : s) + x, u = (m === "s" ? Q8[8 + N9 / 3] : "") + u + (D && s === "(" ? ")" : ""), rt) {
                    for(M = -1, Y = n.length; ++M < Y;)if (A = n.charCodeAt(M), 48 > A || A > 57) {
                        u = (A === 46 ? i + n.slice(M + 1) : n.slice(M)) + u, n = n.slice(0, M);
                        break;
                    }
                }
            }
            L && !y && (n = r(n, 1 / 0));
            var z = x.length + n.length + u.length, p = z < k ? new Array(k - z + 1).join(w) : "";
            switch(L && y && (n = r(p + n, p.length ? k - u.length : 1 / 0), p = ""), S){
                case "<":
                    n = x + n + u + p;
                    break;
                case "=":
                    n = x + p + n + u;
                    break;
                case "^":
                    n = p.slice(0, z = p.length >> 1) + x + n + u + p.slice(z);
                    break;
                default:
                    n = p + x + n + u;
                    break;
            }
            return f(n);
        }
        return U.toString = function() {
            return a + "";
        }, U;
    }
    function _(a, w) {
        var S = I((a = j14(a), a.type = "f", a)), s = Math.max(-8, Math.min(8, Math.floor(d6(w) / 3))) * 3, P = Math.pow(10, -s), y = Q8[8 + s / 3];
        return function(k) {
            return S(P * k) + y;
        };
    }
    return {
        format: I,
        formatPrefix: _
    };
}
var F12, V10, W7;
G12({
    thousands: ",",
    grouping: [
        3
    ],
    currency: [
        "$",
        ""
    ]
});
function G12(t) {
    return F12 = C12(t), V10 = F12.format, W7 = F12.formatPrefix, F12;
}
function ot2(t) {
    return Math.max(0, -d6(Math.abs(t)));
}
function et4(t, r) {
    return Math.max(0, Math.max(-8, Math.min(8, Math.floor(d6(r) / 3))) * 3 - d6(Math.abs(t)));
}
function it3(t, r) {
    return t = Math.abs(t), r = Math.abs(r) - t, Math.max(0, d6(r) - d6(t)) + 1;
}
var S9 = 0.000001, vn = 0.000000000001, A10 = Math.PI, D12 = A10 / 2, Xn = A10 / 4, k7 = A10 * 2, L10 = 180 / A10, w7 = A10 / 180, z10 = Math.abs, un = Math.atan, W8 = Math.atan2, x11 = Math.cos, xt3 = Math.exp;
var Et2 = Math.hypot, qn = Math.log, j15 = Math.sin, V11 = Math.sign || function(n) {
    return n > 0 ? 1 : n < 0 ? -1 : 0;
}, I11 = Math.sqrt, Yn = Math.tan;
function yt1(n) {
    return n > 1 ? 0 : n < -1 ? A10 : Math.acos(n);
}
function H9(n) {
    return n > 1 ? D12 : n < -1 ? -D12 : Math.asin(n);
}
function T10() {
}
function wt1(n, t) {
    n && Vr.hasOwnProperty(n.type) && Vr[n.type](n, t);
}
var Qr = {
    Feature: function(n, t) {
        wt1(n.geometry, t);
    },
    FeatureCollection: function(n, t) {
        for(var e = n.features, r = -1, i = e.length; ++r < i;)wt1(e[r].geometry, t);
    }
}, Vr = {
    Sphere: function(n, t) {
        t.sphere();
    },
    Point: function(n, t) {
        n = n.coordinates, t.point(n[0], n[1], n[2]);
    },
    MultiPoint: function(n, t) {
        for(var e = n.coordinates, r = -1, i = e.length; ++r < i;)n = e[r], t.point(n[0], n[1], n[2]);
    },
    LineString: function(n, t) {
        er1(n.coordinates, t, 0);
    },
    MultiLineString: function(n, t) {
        for(var e = n.coordinates, r = -1, i = e.length; ++r < i;)er1(e[r], t, 0);
    },
    Polygon: function(n, t) {
        $r(n.coordinates, t);
    },
    MultiPolygon: function(n, t) {
        for(var e = n.coordinates, r = -1, i = e.length; ++r < i;)$r(e[r], t);
    },
    GeometryCollection: function(n, t) {
        for(var e = n.geometries, r = -1, i = e.length; ++r < i;)wt1(e[r], t);
    }
};
function er1(n, t, e) {
    var r = -1, i = n.length - e, o;
    for(t.lineStart(); ++r < i;)o = n[r], t.point(o[0], o[1], o[2]);
    t.lineEnd();
}
function $r(n, t) {
    var e = -1, r = n.length;
    for(t.polygonStart(); ++e < r;)er1(n[e], t, 1);
    t.polygonEnd();
}
function Q9(n, t) {
    n && Qr.hasOwnProperty(n.type) ? Qr[n.type](n, t) : wt1(n, t);
}
var bn = new V4, Pt2 = new V4, _r1, br1, ir, or, ar1, ln = {
    point: T10,
    lineStart: T10,
    lineEnd: T10,
    polygonStart: function() {
        bn = new V4, ln.lineStart = ke3, ln.lineEnd = Je1;
    },
    polygonEnd: function() {
        var n = +bn;
        Pt2.add(n < 0 ? k7 + n : n), this.lineStart = this.lineEnd = this.point = T10;
    },
    sphere: function() {
        Pt2.add(k7);
    }
};
function ke3() {
    ln.point = Ke1;
}
function Je1() {
    ne7(_r1, br1);
}
function Ke1(n, t) {
    ln.point = ne7, _r1 = n, br1 = t, n *= w7, t *= w7, ir = n, or = x11(t = t / 2 + Xn), ar1 = j15(t);
}
function ne7(n, t) {
    n *= w7, t *= w7, t = t / 2 + Xn;
    var e = n - ir, r = e >= 0 ? 1 : -1, i = r * e, o = x11(t), a = j15(t), f = ar1 * a, l = or * o + f * x11(i), p = f * r * j15(i);
    bn.add(W8(p, l)), ir = n, or = o, ar1 = a;
}
function zn(n) {
    return [
        W8(n[1], n[0]),
        H9(n[2])
    ];
}
function fn(n) {
    var t = n[0], e = n[1], r = x11(e);
    return [
        r * x11(t),
        r * j15(t),
        j15(e)
    ];
}
function jn(n, t) {
    return [
        n[1] * t[2] - n[2] * t[1],
        n[2] * t[0] - n[0] * t[2],
        n[0] * t[1] - n[1] * t[0]
    ];
}
function An(n) {
    var t = I11(n[0] * n[0] + n[1] * n[1] + n[2] * n[2]);
    n[0] /= t, n[1] /= t, n[2] /= t;
}
var B11, rn, Z12, en, Nn, te6, re7, Fn, rt3, Sn, xn, En = {
    point: ur,
    lineStart: ie6,
    lineEnd: oe8,
    polygonStart: function() {
        En.point = ae6, En.lineStart = $e2, En.lineEnd = _e2, rt3 = new V4, ln.polygonStart();
    },
    polygonEnd: function() {
        ln.polygonEnd(), En.point = ur, En.lineStart = ie6, En.lineEnd = oe8, bn < 0 ? (B11 = -(Z12 = 180), rn = -(en = 90)) : rt3 > S9 ? en = 90 : rt3 < -S9 && (rn = -90), xn[0] = B11, xn[1] = Z12;
    },
    sphere: function() {
        B11 = -(Z12 = 180), rn = -(en = 90);
    }
};
function ur(n, t) {
    Sn.push(xn = [
        B11 = n,
        Z12 = n
    ]), t < rn && (rn = t), t > en && (en = t);
}
function ee7(n, t) {
    var e = fn([
        n * w7,
        t * w7
    ]);
    if (Fn) {
        var r = jn(Fn, e), i = [
            r[1],
            -r[0],
            0
        ], o = jn(i, r);
        An(o), o = zn(o);
        var a = n - Nn, f = a > 0 ? 1 : -1, l = o[0] * L10 * f, p, u = z10(a) > 180;
        u ^ (f * Nn < l && l < f * n) ? (p = o[1] * L10, p > en && (en = p)) : (l = (l + 360) % 360 - 180, u ^ (f * Nn < l && l < f * n) ? (p = -o[1] * L10, p < rn && (rn = p)) : (t < rn && (rn = t), t > en && (en = t))), u ? n < Nn ? on(B11, n) > on(B11, Z12) && (Z12 = n) : on(n, Z12) > on(B11, Z12) && (B11 = n) : Z12 >= B11 ? (n < B11 && (B11 = n), n > Z12 && (Z12 = n)) : n > Nn ? on(B11, n) > on(B11, Z12) && (Z12 = n) : on(n, Z12) > on(B11, Z12) && (B11 = n);
    } else Sn.push(xn = [
        B11 = n,
        Z12 = n
    ]);
    t < rn && (rn = t), t > en && (en = t), Fn = e, Nn = n;
}
function ie6() {
    En.point = ee7;
}
function oe8() {
    xn[0] = B11, xn[1] = Z12, En.point = ur, Fn = null;
}
function ae6(n, t) {
    if (Fn) {
        var e = n - Nn;
        rt3.add(z10(e) > 180 ? e + (e > 0 ? 360 : -360) : e);
    } else te6 = n, re7 = t;
    ln.point(n, t), ee7(n, t);
}
function $e2() {
    ln.lineStart();
}
function _e2() {
    ae6(te6, re7), ln.lineEnd(), z10(rt3) > S9 && (B11 = -(Z12 = 180)), xn[0] = B11, xn[1] = Z12, Fn = null;
}
function on(n, t) {
    return (t -= n) < 0 ? t + 360 : t;
}
var et5, qt2, zt1, At2, Nt3, Ct1, Lt1, It2, lr, cr, sr1, fe7, le5, $8, _13, b9, cn = {
    sphere: T10,
    point: pr2,
    lineStart: ce4,
    lineEnd: se6,
    polygonStart: function() {
        cn.lineStart = ei, cn.lineEnd = ii;
    },
    polygonEnd: function() {
        cn.lineStart = ce4, cn.lineEnd = se6;
    }
};
function pr2(n, t) {
    n *= w7, t *= w7;
    var e = x11(t);
    it4(e * x11(n), e * j15(n), j15(t));
}
function it4(n, t, e) {
    ++et5, zt1 += (n - zt1) / et5, At2 += (t - At2) / et5, Nt3 += (e - Nt3) / et5;
}
function ce4() {
    cn.point = ti;
}
function ti(n, t) {
    n *= w7, t *= w7;
    var e = x11(t);
    $8 = e * x11(n), _13 = e * j15(n), b9 = j15(t), cn.point = ri, it4($8, _13, b9);
}
function ri(n, t) {
    n *= w7, t *= w7;
    var e = x11(t), r = e * x11(n), i = e * j15(n), o = j15(t), a = W8(I11((a = _13 * o - b9 * i) * a + (a = b9 * r - $8 * o) * a + (a = $8 * i - _13 * r) * a), $8 * r + _13 * i + b9 * o);
    qt2 += a, Ct1 += a * ($8 + ($8 = r)), Lt1 += a * (_13 + (_13 = i)), It2 += a * (b9 + (b9 = o)), it4($8, _13, b9);
}
function se6() {
    cn.point = pr2;
}
function ei() {
    cn.point = oi;
}
function ii() {
    pe6(fe7, le5), cn.point = pr2;
}
function oi(n, t) {
    fe7 = n, le5 = t, n *= w7, t *= w7, cn.point = pe6;
    var e = x11(t);
    $8 = e * x11(n), _13 = e * j15(n), b9 = j15(t), it4($8, _13, b9);
}
function pe6(n, t) {
    n *= w7, t *= w7;
    var e = x11(t), r = e * x11(n), i = e * j15(n), o = j15(t), a = _13 * o - b9 * i, f = b9 * r - $8 * o, l = $8 * i - _13 * r, p = Et2(a, f, l), u = H9(p), s = p && -u / p;
    lr.add(s * a), cr.add(s * f), sr1.add(s * l), qt2 += u, Ct1 += u * ($8 + ($8 = r)), Lt1 += u * (_13 + (_13 = i)), It2 += u * (b9 + (b9 = o)), it4($8, _13, b9);
}
function mr(n, t) {
    return [
        z10(n) > A10 ? n + Math.round(-n / k7) * k7 : n,
        t
    ];
}
mr.invert = mr;
function dr1(n) {
    return z10(n[0]) <= A10 ? n[0] : V11(n[0]) * ((z10(n[0]) + A10) % k7 - A10);
}
function Ft2(n, t) {
    var e = dr1(t), r = t[1], i = j15(r), o = [
        j15(e),
        -x11(e),
        0
    ], a = 0, f = 0, l = new V4;
    i === 1 ? r = D12 + S9 : i === -1 && (r = -D12 - S9);
    for(var p = 0, u = n.length; p < u; ++p)if (!!(c = (s = n[p]).length)) for(var s, c, m = s[c - 1], g = dr1(m), y = m[1] / 2 + Xn, E = j15(y), R = x11(y), M = 0; M < c; ++M, g = d, E = q, R = X, m = h){
        var h = s[M], d = dr1(h), P = h[1] / 2 + Xn, q = j15(P), X = x11(P), Y = d - g, F = Y >= 0 ? 1 : -1, O = F * Y, N = O > A10, nn = E * q;
        if (l.add(W8(nn * F * j15(O), R * X + nn * x11(O))), a += N ? Y + F * k7 : Y, N ^ g >= e ^ d >= e) {
            var U = jn(fn(m), fn(h));
            An(U);
            var G = jn(o, U);
            An(G);
            var v = (N ^ Y >= 0 ? -1 : 1) * H9(G[2]);
            (r > v || r === v && (U[0] || U[1])) && (f += N ^ Y >= 0 ? 1 : -1);
        }
    }
    return (a < -S9 || a < S9 && l < -vn) ^ f & 1;
}
var jr, xr, Ht2, Ot3, Gn = {
    sphere: T10,
    point: T10,
    lineStart: ji,
    lineEnd: T10,
    polygonStart: T10,
    polygonEnd: T10
};
function ji() {
    Gn.point = Ei, Gn.lineEnd = xi;
}
function xi() {
    Gn.point = Gn.lineEnd = T10;
}
function Ei(n, t) {
    n *= w7, t *= w7, xr = n, Ht2 = j15(t), Ot3 = x11(t), Gn.point = Si;
}
function Si(n, t) {
    n *= w7, t *= w7;
    var e = j15(t), r = x11(t), i = z10(n - xr), o = x11(i), a = j15(i), f = r * a, l = Ot3 * e - Ht2 * r * o, p = Ht2 * e + Ot3 * r * o;
    jr.add(W8(I11(f * f + l * l), p)), xr = n, Ht2 = e, Ot3 = r;
}
function Er(n) {
    return jr = new V4, Q9(n, Gn), +jr;
}
var Sr = [
    null,
    null
], yi = {
    type: "LineString",
    coordinates: Sr
};
function ft1(n, t) {
    return Sr[0] = n, Sr[1] = t, Er(yi);
}
var Ee3 = {
    Sphere: function() {
        return !0;
    },
    Point: function(n, t) {
        return Se3(n.coordinates, t);
    },
    MultiPoint: function(n, t) {
        for(var e = n.coordinates, r = -1, i = e.length; ++r < i;)if (Se3(e[r], t)) return !0;
        return !1;
    },
    LineString: function(n, t) {
        return ye4(n.coordinates, t);
    },
    MultiLineString: function(n, t) {
        for(var e = n.coordinates, r = -1, i = e.length; ++r < i;)if (ye4(e[r], t)) return !0;
        return !1;
    },
    Polygon: function(n, t) {
        return we4(n.coordinates, t);
    },
    MultiPolygon: function(n, t) {
        for(var e = n.coordinates, r = -1, i = e.length; ++r < i;)if (we4(e[r], t)) return !0;
        return !1;
    },
    GeometryCollection: function(n, t) {
        for(var e = n.geometries, r = -1, i = e.length; ++r < i;)if (Bt1(e[r], t)) return !0;
        return !1;
    }
};
function Bt1(n, t) {
    return n && Ee3.hasOwnProperty(n.type) ? Ee3[n.type](n, t) : !1;
}
function Se3(n, t) {
    return ft1(n, t) === 0;
}
function ye4(n, t) {
    for(var e, r, i, o = 0, a = n.length; o < a; o++){
        if (r = ft1(n[o], t), r === 0 || o > 0 && (i = ft1(n[o], n[o - 1]), i > 0 && e <= i && r <= i && (e + r - i) * (1 - Math.pow((e - r) / i, 2)) < vn * i)) return !0;
        e = r;
    }
    return !1;
}
function we4(n, t) {
    return !!Ft2(n.map(wi), Re1(t));
}
function wi(n) {
    return n = n.map(Re1), n.pop(), n;
}
function Re1(n) {
    return [
        n[0] * w7,
        n[1] * w7
    ];
}
var wr1 = new V4, Rr = new V4, qe3, ze1, Pr, Mr3, Rn = {
    point: T10,
    lineStart: T10,
    lineEnd: T10,
    polygonStart: function() {
        Rn.lineStart = qi, Rn.lineEnd = Ai;
    },
    polygonEnd: function() {
        Rn.lineStart = Rn.lineEnd = Rn.point = T10, wr1.add(z10(Rr)), Rr = new V4;
    },
    result: function() {
        var n = wr1 / 2;
        return wr1 = new V4, n;
    }
};
function qi() {
    Rn.point = zi;
}
function zi(n, t) {
    Rn.point = Ae4, qe3 = Pr = n, ze1 = Mr3 = t;
}
function Ae4(n, t) {
    Rr.add(Mr3 * n - Pr * t), Pr = n, Mr3 = t;
}
function Ai() {
    Ae4(qe3, ze1);
}
var zr = 0, Ar = 0, ct1 = 0, Jt2 = 0, Kt2 = 0, Bn = 0, Nr1 = 0, Cr = 0, st3 = 0, Ne2, Ce3, pn, mn, sn = {
    point: Ln,
    lineStart: Le3,
    lineEnd: Ie2,
    polygonStart: function() {
        sn.lineStart = Ti, sn.lineEnd = Xi;
    },
    polygonEnd: function() {
        sn.point = Ln, sn.lineStart = Le3, sn.lineEnd = Ie2;
    },
    result: function() {
        var n = st3 ? [
            Nr1 / st3,
            Cr / st3
        ] : Bn ? [
            Jt2 / Bn,
            Kt2 / Bn
        ] : ct1 ? [
            zr / ct1,
            Ar / ct1
        ] : [
            NaN,
            NaN
        ];
        return zr = Ar = ct1 = Jt2 = Kt2 = Bn = Nr1 = Cr = st3 = 0, n;
    }
};
function Ln(n, t) {
    zr += n, Ar += t, ++ct1;
}
function Le3() {
    sn.point = Li;
}
function Li(n, t) {
    sn.point = Ii, Ln(pn = n, mn = t);
}
function Ii(n, t) {
    var e = n - pn, r = t - mn, i = I11(e * e + r * r);
    Jt2 += i * (pn + n) / 2, Kt2 += i * (mn + t) / 2, Bn += i, Ln(pn = n, mn = t);
}
function Ie2() {
    sn.point = Ln;
}
function Ti() {
    sn.point = Yi;
}
function Xi() {
    Te(Ne2, Ce3);
}
function Yi(n, t) {
    sn.point = Te, Ln(Ne2 = pn = n, Ce3 = mn = t);
}
function Te(n, t) {
    var e = n - pn, r = t - mn, i = I11(e * e + r * r);
    Jt2 += i * (pn + n) / 2, Kt2 += i * (mn + t) / 2, Bn += i, i = mn * n - pn * t, Nr1 += i * (pn + n), Cr += i * (mn + t), st3 += i * 3, Ln(pn = n, mn = t);
}
function Qt2(n) {
    this._context = n;
}
Qt2.prototype = {
    _radius: 4.5,
    pointRadius: function(n) {
        return this._radius = n, this;
    },
    polygonStart: function() {
        this._line = 0;
    },
    polygonEnd: function() {
        this._line = NaN;
    },
    lineStart: function() {
        this._point = 0;
    },
    lineEnd: function() {
        this._line === 0 && this._context.closePath(), this._point = NaN;
    },
    point: function(n, t) {
        switch(this._point){
            case 0:
                {
                    this._context.moveTo(n, t), this._point = 1;
                    break;
                }
            case 1:
                {
                    this._context.lineTo(n, t);
                    break;
                }
            default:
                {
                    this._context.moveTo(n + this._radius, t), this._context.arc(n, t, this._radius, 0, k7);
                    break;
                }
        }
    },
    result: T10
};
var Ir = new V4, Tr, Ye1, Fe1, pt2, mt3, Vt2 = {
    point: T10,
    lineStart: function() {
        Vt2.point = Fi;
    },
    lineEnd: function() {
        Tr && De2(Ye1, Fe1), Vt2.point = T10;
    },
    polygonStart: function() {
        Tr = !0;
    },
    polygonEnd: function() {
        Tr = null;
    },
    result: function() {
        var n = +Ir;
        return Ir = new V4, n;
    }
};
function Fi(n, t) {
    Vt2.point = De2, Ye1 = pt2 = n, Fe1 = mt3 = t;
}
function De2(n, t) {
    pt2 -= n, mt3 -= t, Ir.add(I11(pt2 * pt2 + mt3 * mt3)), pt2 = n, mt3 = t;
}
function $t1() {
    this._string = [];
}
$t1.prototype = {
    _radius: 4.5,
    _circle: Ge(4.5),
    pointRadius: function(n) {
        return (n = +n) !== this._radius && (this._radius = n, this._circle = null), this;
    },
    polygonStart: function() {
        this._line = 0;
    },
    polygonEnd: function() {
        this._line = NaN;
    },
    lineStart: function() {
        this._point = 0;
    },
    lineEnd: function() {
        this._line === 0 && this._string.push("Z"), this._point = NaN;
    },
    point: function(n, t) {
        switch(this._point){
            case 0:
                {
                    this._string.push("M", n, ",", t), this._point = 1;
                    break;
                }
            case 1:
                {
                    this._string.push("L", n, ",", t);
                    break;
                }
            default:
                {
                    this._circle == null && (this._circle = Ge(this._radius)), this._string.push("M", n, ",", t, this._circle);
                    break;
                }
        }
    },
    result: function() {
        if (this._string.length) {
            var n = this._string.join("");
            return this._string = [], n;
        } else return null;
    }
};
function Ge(n) {
    return "m0," + n + "a" + n + "," + n + " 0 1,1 0," + -2 * n + "a" + n + "," + n + " 0 1,1 0," + 2 * n + "z";
}
function Yr() {
}
Yr.prototype = {
    constructor: Yr,
    point: function(n, t) {
        this.stream.point(n, t);
    },
    sphere: function() {
        this.stream.sphere();
    },
    lineStart: function() {
        this.stream.lineStart();
    },
    lineEnd: function() {
        this.stream.lineEnd();
    },
    polygonStart: function() {
        this.stream.polygonStart();
    },
    polygonEnd: function() {
        this.stream.polygonEnd();
    }
};
function bt1(n) {
    return function(t, e) {
        var r = x11(t), i = x11(e), o = n(r * i);
        return o === 1 / 0 ? [
            2,
            0
        ] : [
            o * i * j15(t),
            o * j15(e)
        ];
    };
}
function gn(n) {
    return function(t, e) {
        var r = I11(t * t + e * e), i = n(r), o = j15(i), a = x11(i);
        return [
            W8(t * o, r * a),
            H9(r && e * o / r)
        ];
    };
}
var Wr = bt1(function(n) {
    return I11(2 / (1 + n));
});
Wr.invert = gn(function(n) {
    return 2 * H9(n / 2);
});
var Hr = bt1(function(n) {
    return (n = yt1(n)) && n / j15(n);
});
Hr.invert = gn(function(n) {
    return n;
});
function Qn(n, t) {
    return [
        n,
        qn(Yn((D12 + t) / 2))
    ];
}
Qn.invert = function(n, t) {
    return [
        n,
        2 * un(xt3(t)) - D12
    ];
};
function Vn(n, t) {
    return [
        n,
        t
    ];
}
Vn.invert = Vn;
var gt1 = 1.340264, ht2 = -0.081106, dt2 = 0.000893, vt1 = 0.003796, tr1 = I11(3) / 2, no = 12;
function Br(n, t) {
    var e = H9(tr1 * j15(t)), r = e * e, i = r * r * r;
    return [
        n * x11(e) / (tr1 * (gt1 + 3 * ht2 * r + i * (7 * dt2 + 9 * vt1 * r))),
        e * (gt1 + ht2 * r + i * (dt2 + vt1 * r))
    ];
}
Br.invert = function(n, t) {
    for(var e = t, r = e * e, i = r * r * r, o = 0, a, f, l; o < no && (f = e * (gt1 + ht2 * r + i * (dt2 + vt1 * r)) - t, l = gt1 + 3 * ht2 * r + i * (7 * dt2 + 9 * vt1 * r), e -= a = f / l, r = e * e, i = r * r * r, !(z10(a) < vn)); ++o);
    return [
        tr1 * n * (gt1 + 3 * ht2 * r + i * (7 * dt2 + 9 * vt1 * r)) / x11(e),
        H9(j15(e) / tr1)
    ];
};
function Zr(n, t) {
    var e = x11(t), r = x11(n) * e;
    return [
        e * j15(n) / r,
        j15(t) / r
    ];
}
Zr.invert = gn(un);
function Ur1(n, t) {
    var e = t * t, r = e * e;
    return [
        n * (0.8707 - 0.131979 * e + r * (-0.013791 + r * (0.003971 * e - 0.001529 * r))),
        t * (1.007226 + e * (0.015085 + r * (-0.044475 + 0.028874 * e - 0.005916 * r)))
    ];
}
Ur1.invert = function(n, t) {
    var e = t, r = 25, i;
    do {
        var o = e * e, a = o * o;
        e -= i = (e * (1.007226 + o * (0.015085 + a * (-0.044475 + 0.028874 * o - 0.005916 * a))) - t) / (1.007226 + o * (0.015085 * 3 + a * (-0.044475 * 7 + 0.028874 * 9 * o - 0.005916 * 11 * a)));
    }while (z10(i) > S9 && --r > 0)
    return [
        n / (0.8707 + (o = e * e) * (-0.131979 + o * (-0.013791 + o * o * o * (0.003971 - 0.001529 * o)))),
        e
    ];
};
function kr(n, t) {
    return [
        x11(t) * j15(n),
        j15(t)
    ];
}
kr.invert = gn(H9);
function Jr(n, t) {
    var e = x11(t), r = 1 + x11(n) * e;
    return [
        e * j15(n) / r,
        j15(t) / r
    ];
}
Jr.invert = gn(function(n) {
    return 2 * un(n);
});
function Kr(n, t) {
    return [
        qn(Yn((D12 + t) / 2)),
        -n
    ];
}
Kr.invert = function(n, t) {
    return [
        -t,
        2 * un(xt3(n)) - D12
    ];
};
function Re2(e) {
    var r = 0, t = e.children, n = t && t.length;
    if (!n) r = 1;
    else for(; --n >= 0;)r += t[n].value;
    e.value = r;
}
function U5() {
    return this.eachAfter(Re2);
}
function $9(e, r) {
    let t = -1;
    for (let n of this)e.call(r, n, ++t, this);
    return this;
}
function ee8(e, r) {
    for(var t = this, n = [
        t
    ], i, u, o = -1; t = n.pop();)if (e.call(r, t, ++o, this), i = t.children) for(u = i.length - 1; u >= 0; --u)n.push(i[u]);
    return this;
}
function re8(e, r) {
    for(var t = this, n = [
        t
    ], i = [], u, o, l, s = -1; t = n.pop();)if (i.push(t), u = t.children) for(o = 0, l = u.length; o < l; ++o)n.push(u[o]);
    for(; t = i.pop();)e.call(r, t, ++s, this);
    return this;
}
function te7(e, r) {
    let t = -1;
    for (let n of this)if (e.call(r, n, ++t, this)) return n;
}
function ne8(e) {
    return this.eachAfter(function(r) {
        for(var t = +e(r.data) || 0, n = r.children, i = n && n.length; --i >= 0;)t += n[i].value;
        r.value = t;
    });
}
function ie7(e) {
    return this.eachBefore(function(r) {
        r.children && r.children.sort(e);
    });
}
function ue5(e) {
    for(var r = this, t = Ee4(r, e), n = [
        r
    ]; r !== t;)r = r.parent, n.push(r);
    for(var i = n.length; e !== t;)n.splice(i, 0, e), e = e.parent;
    return n;
}
function Ee4(e, r) {
    if (e === r) return e;
    var t = e.ancestors(), n = r.ancestors(), i = null;
    for(e = t.pop(), r = n.pop(); e === r;)i = e, e = t.pop(), r = n.pop();
    return i;
}
function ae7() {
    for(var e = this, r = [
        e
    ]; e = e.parent;)r.push(e);
    return r;
}
function fe8() {
    return Array.from(this);
}
function oe9() {
    var e = [];
    return this.eachBefore(function(r) {
        r.children || e.push(r);
    }), e;
}
function le6() {
    var e = this, r = [];
    return e.each(function(t) {
        t !== e && r.push({
            source: t.parent,
            target: t
        });
    }), r;
}
function* se7() {
    var e = this, r, t = [
        e
    ], n, i, u;
    do for(r = t.reverse(), t = []; e = r.pop();)if (yield e, n = e.children) for(i = 0, u = n.length; i < u; ++i)t.push(n[i]);
    while (t.length)
}
function L11(e, r) {
    e instanceof Map ? (e = [
        void 0,
        e
    ], r === void 0 && (r = De3)) : r === void 0 && (r = Be1);
    for(var t = new M9(e), n, i = [
        t
    ], u, o, l, s; n = i.pop();)if ((o = r(n.data)) && (s = (o = Array.from(o)).length)) for(n.children = o, l = s - 1; l >= 0; --l)i.push(u = o[l] = new M9(o[l])), u.parent = n, u.depth = n.depth + 1;
    return t.eachBefore(b10);
}
function Ie3() {
    return L11(this).eachBefore(Le4);
}
function Be1(e) {
    return e.children;
}
function De3(e) {
    return Array.isArray(e) ? e[1] : null;
}
function Le4(e) {
    e.data.value !== void 0 && (e.value = e.data.value), e.data = e.data.data;
}
function b10(e) {
    var r = 0;
    do e.height = r;
    while ((e = e.parent) && e.height < ++r)
}
function M9(e) {
    this.data = e, this.depth = this.height = 0, this.parent = null;
}
M9.prototype = L11.prototype = {
    constructor: M9,
    count: U5,
    each: $9,
    eachAfter: re8,
    eachBefore: ee8,
    find: te7,
    sum: ne8,
    sort: ie7,
    path: ue5,
    ancestors: ae7,
    descendants: fe8,
    leaves: oe9,
    links: le6,
    copy: Ie3,
    [Symbol.iterator]: se7
};
function V12(e, r) {
    this._ = e, this.parent = null, this.children = null, this.A = null, this.a = this, this.z = 0, this.m = 0, this.c = 0, this.s = 0, this.t = null, this.i = r;
}
V12.prototype = Object.create(M9.prototype);
var H10 = new Date, w8 = new Date;
function u4(t, r, o, j) {
    function a(e) {
        return t(e = arguments.length === 0 ? new Date : new Date(+e)), e;
    }
    return a.floor = function(e) {
        return t(e = new Date(+e)), e;
    }, a.ceil = function(e) {
        return t(e = new Date(e - 1)), r(e, 1), t(e), e;
    }, a.round = function(e) {
        var n = a(e), s = a.ceil(e);
        return e - n < s - e ? n : s;
    }, a.offset = function(e, n) {
        return r(e = new Date(+e), n == null ? 1 : Math.floor(n)), e;
    }, a.range = function(e, n, s) {
        var x = [], f;
        if (e = a.ceil(e), s = s == null ? 1 : Math.floor(s), !(e < n) || !(s > 0)) return x;
        do x.push(f = new Date(+e)), r(e, s), t(e);
        while (f < e && e < n)
        return x;
    }, a.filter = function(e) {
        return u4(function(n) {
            if (n >= n) for(; t(n), !e(n);)n.setTime(n - 1);
        }, function(n, s) {
            if (n >= n) if (s < 0) for(; ++s <= 0;)for(; r(n, -1), !e(n););
            else for(; --s >= 0;)for(; r(n, 1), !e(n););
        });
    }, o && (a.count = function(e, n) {
        return H10.setTime(+e), w8.setTime(+n), t(H10), t(w8), Math.floor(o(H10, w8));
    }, a.every = function(e) {
        return e = Math.floor(e), !isFinite(e) || !(e > 0) ? null : e > 1 ? a.filter(j ? function(n) {
            return j(n) % e == 0;
        } : function(n) {
            return a.count(0, n) % e == 0;
        }) : a;
    }), a;
}
var F13 = u4(function() {
}, function(t, r) {
    t.setTime(+t + r);
}, function(t, r) {
    return r - t;
});
F13.every = function(t) {
    return t = Math.floor(t), !isFinite(t) || !(t > 0) ? null : t > 1 ? u4(function(r) {
        r.setTime(Math.floor(r / t) * t);
    }, function(r, o) {
        r.setTime(+r + o * t);
    }, function(r, o) {
        return (o - r) / t;
    }) : F13;
};
var c8 = 1000, i6 = c8 * 60, l8 = i6 * 60, m8 = l8 * 24, h10 = m8 * 7;
var V13 = u4((t)=>t.setHours(0, 0, 0, 0)
, (t, r)=>t.setDate(t.getDate() + r)
, (t, r)=>(r - t - (r.getTimezoneOffset() - t.getTimezoneOffset()) * i6) / m8
, (t)=>t.getDate() - 1
), z11 = V13;
function g11(t) {
    return u4(function(r) {
        r.setDate(r.getDate() - (r.getDay() + 7 - t) % 7), r.setHours(0, 0, 0, 0);
    }, function(r, o) {
        r.setDate(r.getDate() + o * 7);
    }, function(r, o) {
        return (o - r - (o.getTimezoneOffset() - r.getTimezoneOffset()) * i6) / h10;
    });
}
var D13 = g11(0), X11 = g11(1), $10 = g11(4);
var b11 = u4(function(t) {
    t.setMonth(0, 1), t.setHours(0, 0, 0, 0);
}, function(t, r) {
    t.setFullYear(t.getFullYear() + r);
}, function(t, r) {
    return r.getFullYear() - t.getFullYear();
}, function(t) {
    return t.getFullYear();
});
b11.every = function(t) {
    return !isFinite(t = Math.floor(t)) || !(t > 0) ? null : u4(function(r) {
        r.setFullYear(Math.floor(r.getFullYear() / t) * t), r.setMonth(0, 1), r.setHours(0, 0, 0, 0);
    }, function(r, o) {
        r.setFullYear(r.getFullYear() + o * t);
    });
};
var q10 = b11;
var at2 = u4(function(t) {
    t.setUTCHours(0, 0, 0, 0);
}, function(t, r) {
    t.setUTCDate(t.getUTCDate() + r);
}, function(t, r) {
    return (r - t) / m8;
}, function(t) {
    return t.getUTCDate() - 1;
}), E15 = at2;
function T11(t) {
    return u4(function(r) {
        r.setUTCDate(r.getUTCDate() - (r.getUTCDay() + 7 - t) % 7), r.setUTCHours(0, 0, 0, 0);
    }, function(r, o) {
        r.setUTCDate(r.getUTCDate() + o * 7);
    }, function(r, o) {
        return (o - r) / h10;
    });
}
var C13 = T11(0), it5 = T11(1), ft2 = T11(4);
var J11 = u4(function(t) {
    t.setUTCMonth(0, 1), t.setUTCHours(0, 0, 0, 0);
}, function(t, r) {
    t.setUTCFullYear(t.getUTCFullYear() + r);
}, function(t, r) {
    return r.getUTCFullYear() - t.getUTCFullYear();
}, function(t) {
    return t.getUTCFullYear();
});
J11.every = function(t) {
    return !isFinite(t = Math.floor(t)) || !(t > 0) ? null : u4(function(r) {
        r.setUTCFullYear(Math.floor(r.getUTCFullYear() / t) * t), r.setUTCMonth(0, 1), r.setUTCHours(0, 0, 0, 0);
    }, function(r, o) {
        r.setUTCFullYear(r.getUTCFullYear() + o * t);
    });
};
var K10 = J11;
function Z13(e) {
    if (0 <= e.y && e.y < 100) {
        var t = new Date(-1, e.m, e.d, e.H, e.M, e.S, e.L);
        return t.setFullYear(e.y), t;
    }
    return new Date(e.y, e.m, e.d, e.H, e.M, e.S, e.L);
}
function A11(e) {
    if (0 <= e.y && e.y < 100) {
        var t = new Date(Date.UTC(-1, e.m, e.d, e.H, e.M, e.S, e.L));
        return t.setUTCFullYear(e.y), t;
    }
    return new Date(Date.UTC(e.y, e.m, e.d, e.H, e.M, e.S, e.L));
}
function x12(e, t, r) {
    return {
        y: e,
        m: t,
        d: r,
        H: 0,
        M: 0,
        S: 0,
        L: 0
    };
}
function b12(e) {
    var t = e.dateTime, r = e.date, o = e.time, g = e.periods, p = e.days, F = e.shortDays, k = e.months, W = e.shortMonths, ce = w9(g), fe = L12(g), ie = w9(p), se = L12(p), le = w9(F), me = L12(F), ye = w9(k), ge = L12(k), he = w9(W), pe = L12(W), T = {
        a: we,
        A: Le,
        b: Fe,
        B: ke,
        c: null,
        d: z12,
        e: z12,
        f: ft3,
        g: Mt1,
        G: Ct2,
        H: at3,
        I: ut1,
        j: ct2,
        L: $11,
        m: it6,
        M: st4,
        p: We,
        q: Ye,
        Q: ne9,
        s: oe10,
        S: lt1,
        u: mt4,
        U: yt2,
        V: gt2,
        w: ht3,
        W: pt3,
        x: null,
        X: null,
        y: Tt2,
        Y: Ut2,
        Z: dt3,
        "%": re9
    }, M = {
        a: be,
        A: He,
        b: Ne,
        B: Oe,
        c: null,
        d: K11,
        e: K11,
        f: xt4,
        g: Ot4,
        G: Zt2,
        H: vt2,
        I: St2,
        j: Dt2,
        L: ee9,
        m: wt2,
        M: Lt2,
        p: Ie,
        q: Ze,
        Q: ne9,
        s: oe10,
        S: Ft3,
        u: kt2,
        U: Wt2,
        V: Yt2,
        w: bt2,
        W: Ht3,
        x: null,
        X: null,
        y: Nt4,
        Y: It3,
        Z: At3,
        "%": re9
    }, Te = {
        a: Ue,
        A: Ce,
        b: de,
        B: ve,
        c: Se,
        d: B12,
        e: B12,
        f: tt3,
        g: X12,
        G: J12,
        H: G13,
        I: G13,
        j: $e3,
        L: et6,
        m: ze2,
        M: Ee5,
        p: Me,
        q: Ge1,
        Q: nt5,
        s: ot3,
        S: Ke2,
        u: _e3,
        U: qe4,
        V: Je2,
        w: Ve,
        W: Xe,
        x: De,
        X: xe,
        y: X12,
        Y: J12,
        Z: Be2,
        "%": rt4
    };
    T.x = h(r, T), T.X = h(o, T), T.c = h(t, T), M.x = h(r, M), M.X = h(o, M), M.c = h(t, M);
    function h(a, u) {
        return function(c) {
            var n = [], l = -1, i = 0, m = a.length, y, U, Q;
            for(c instanceof Date || (c = new Date(+c)); ++l < m;)a.charCodeAt(l) === 37 && (n.push(a.slice(i, l)), (U = q11[y = a.charAt(++l)]) != null ? y = a.charAt(++l) : U = y === "e" ? " " : "0", (Q = u[y]) && (y = Q(c, U)), n.push(y), i = l + 1);
            return n.push(a.slice(i, l)), n.join("");
        };
    }
    function R(a, u) {
        return function(c) {
            var n = x12(1900, void 0, 1), l = Y(n, a, c += "", 0), i, m;
            if (l != c.length) return null;
            if ("Q" in n) return new Date(n.Q);
            if ("s" in n) return new Date(n.s * 1000 + ("L" in n ? n.L : 0));
            if (u && !("Z" in n) && (n.Z = 0), "p" in n && (n.H = n.H % 12 + n.p * 12), n.m === void 0 && (n.m = "q" in n ? n.q : 0), "V" in n) {
                if (n.V < 1 || n.V > 53) return null;
                "w" in n || (n.w = 1), "Z" in n ? (i = A11(x12(n.y, 0, 1)), m = i.getUTCDay(), i = m > 4 || m === 0 ? it5.ceil(i) : it5(i), i = E15.offset(i, (n.V - 1) * 7), n.y = i.getUTCFullYear(), n.m = i.getUTCMonth(), n.d = i.getUTCDate() + (n.w + 6) % 7) : (i = Z13(x12(n.y, 0, 1)), m = i.getDay(), i = m > 4 || m === 0 ? X11.ceil(i) : X11(i), i = z11.offset(i, (n.V - 1) * 7), n.y = i.getFullYear(), n.m = i.getMonth(), n.d = i.getDate() + (n.w + 6) % 7);
            } else ("W" in n || "U" in n) && ("w" in n || (n.w = "u" in n ? n.u % 7 : "W" in n ? 1 : 0), m = "Z" in n ? A11(x12(n.y, 0, 1)).getUTCDay() : Z13(x12(n.y, 0, 1)).getDay(), n.m = 0, n.d = "W" in n ? (n.w + 6) % 7 + n.W * 7 - (m + 5) % 7 : n.w + n.U * 7 - (m + 6) % 7);
            return "Z" in n ? (n.H += n.Z / 100 | 0, n.M += n.Z % 100, A11(n)) : Z13(n);
        };
    }
    function Y(a, u, c, n) {
        for(var l = 0, i = u.length, m = c.length, y, U; l < i;){
            if (n >= m) return -1;
            if (y = u.charCodeAt(l++), y === 37) {
                if (y = u.charAt(l++), U = Te[y in q11 ? u.charAt(l++) : y], !U || (n = U(a, c, n)) < 0) return -1;
            } else if (y != c.charCodeAt(n++)) return -1;
        }
        return n;
    }
    function Me(a, u, c) {
        var n = ce.exec(u.slice(c));
        return n ? (a.p = fe.get(n[0].toLowerCase()), c + n[0].length) : -1;
    }
    function Ue(a, u, c) {
        var n = le.exec(u.slice(c));
        return n ? (a.w = me.get(n[0].toLowerCase()), c + n[0].length) : -1;
    }
    function Ce(a, u, c) {
        var n = ie.exec(u.slice(c));
        return n ? (a.w = se.get(n[0].toLowerCase()), c + n[0].length) : -1;
    }
    function de(a, u, c) {
        var n = he.exec(u.slice(c));
        return n ? (a.m = pe.get(n[0].toLowerCase()), c + n[0].length) : -1;
    }
    function ve(a, u, c) {
        var n = ye.exec(u.slice(c));
        return n ? (a.m = ge.get(n[0].toLowerCase()), c + n[0].length) : -1;
    }
    function Se(a, u, c) {
        return Y(a, t, u, c);
    }
    function De(a, u, c) {
        return Y(a, r, u, c);
    }
    function xe(a, u, c) {
        return Y(a, o, u, c);
    }
    function we(a) {
        return F[a.getDay()];
    }
    function Le(a) {
        return p[a.getDay()];
    }
    function Fe(a) {
        return W[a.getMonth()];
    }
    function ke(a) {
        return k[a.getMonth()];
    }
    function We(a) {
        return g[+(a.getHours() >= 12)];
    }
    function Ye(a) {
        return 1 + ~~(a.getMonth() / 3);
    }
    function be(a) {
        return F[a.getUTCDay()];
    }
    function He(a) {
        return p[a.getUTCDay()];
    }
    function Ne(a) {
        return W[a.getUTCMonth()];
    }
    function Oe(a) {
        return k[a.getUTCMonth()];
    }
    function Ie(a) {
        return g[+(a.getUTCHours() >= 12)];
    }
    function Ze(a) {
        return 1 + ~~(a.getUTCMonth() / 3);
    }
    return {
        format: function(a) {
            var u = h(a += "", T);
            return u.toString = function() {
                return a;
            }, u;
        },
        parse: function(a) {
            var u = R(a += "", !1);
            return u.toString = function() {
                return a;
            }, u;
        },
        utcFormat: function(a) {
            var u = h(a += "", M);
            return u.toString = function() {
                return a;
            }, u;
        },
        utcParse: function(a) {
            var u = R(a += "", !0);
            return u.toString = function() {
                return a;
            }, u;
        }
    };
}
var q11 = {
    "-": "",
    _: " ",
    "0": "0"
}, s7 = /^\s*\d+/, je4 = /^%/, Re3 = /[\\^$*+?|[\]().{}]/g;
function f6(e, t, r) {
    var o = e < 0 ? "-" : "", g = (o ? -e : e) + "", p = g.length;
    return o + (p < r ? new Array(r - p + 1).join(t) + g : g);
}
function Qe(e) {
    return e.replace(Re3, "\\$&");
}
function w9(e) {
    return new RegExp("^(?:" + e.map(Qe).join("|") + ")", "i");
}
function L12(e) {
    return new Map(e.map((t, r)=>[
            t.toLowerCase(),
            r
        ]
    ));
}
function Ve(e, t, r) {
    var o = s7.exec(t.slice(r, r + 1));
    return o ? (e.w = +o[0], r + o[0].length) : -1;
}
function _e3(e, t, r) {
    var o = s7.exec(t.slice(r, r + 1));
    return o ? (e.u = +o[0], r + o[0].length) : -1;
}
function qe4(e, t, r) {
    var o = s7.exec(t.slice(r, r + 2));
    return o ? (e.U = +o[0], r + o[0].length) : -1;
}
function Je2(e, t, r) {
    var o = s7.exec(t.slice(r, r + 2));
    return o ? (e.V = +o[0], r + o[0].length) : -1;
}
function Xe(e, t, r) {
    var o = s7.exec(t.slice(r, r + 2));
    return o ? (e.W = +o[0], r + o[0].length) : -1;
}
function J12(e, t, r) {
    var o = s7.exec(t.slice(r, r + 4));
    return o ? (e.y = +o[0], r + o[0].length) : -1;
}
function X12(e, t, r) {
    var o = s7.exec(t.slice(r, r + 2));
    return o ? (e.y = +o[0] + (+o[0] > 68 ? 1900 : 2000), r + o[0].length) : -1;
}
function Be2(e, t, r) {
    var o = /^(Z)|([+-]\d\d)(?::?(\d\d))?/.exec(t.slice(r, r + 6));
    return o ? (e.Z = o[1] ? 0 : -(o[2] + (o[3] || "00")), r + o[0].length) : -1;
}
function Ge1(e, t, r) {
    var o = s7.exec(t.slice(r, r + 1));
    return o ? (e.q = o[0] * 3 - 3, r + o[0].length) : -1;
}
function ze2(e, t, r) {
    var o = s7.exec(t.slice(r, r + 2));
    return o ? (e.m = o[0] - 1, r + o[0].length) : -1;
}
function B12(e, t, r) {
    var o = s7.exec(t.slice(r, r + 2));
    return o ? (e.d = +o[0], r + o[0].length) : -1;
}
function $e3(e, t, r) {
    var o = s7.exec(t.slice(r, r + 3));
    return o ? (e.m = 0, e.d = +o[0], r + o[0].length) : -1;
}
function G13(e, t, r) {
    var o = s7.exec(t.slice(r, r + 2));
    return o ? (e.H = +o[0], r + o[0].length) : -1;
}
function Ee5(e, t, r) {
    var o = s7.exec(t.slice(r, r + 2));
    return o ? (e.M = +o[0], r + o[0].length) : -1;
}
function Ke2(e, t, r) {
    var o = s7.exec(t.slice(r, r + 2));
    return o ? (e.S = +o[0], r + o[0].length) : -1;
}
function et6(e, t, r) {
    var o = s7.exec(t.slice(r, r + 3));
    return o ? (e.L = +o[0], r + o[0].length) : -1;
}
function tt3(e, t, r) {
    var o = s7.exec(t.slice(r, r + 6));
    return o ? (e.L = Math.floor(o[0] / 1000), r + o[0].length) : -1;
}
function rt4(e, t, r) {
    var o = je4.exec(t.slice(r, r + 1));
    return o ? r + o[0].length : -1;
}
function nt5(e, t, r) {
    var o = s7.exec(t.slice(r));
    return o ? (e.Q = +o[0], r + o[0].length) : -1;
}
function ot3(e, t, r) {
    var o = s7.exec(t.slice(r));
    return o ? (e.s = +o[0], r + o[0].length) : -1;
}
function z12(e, t) {
    return f6(e.getDate(), t, 2);
}
function at3(e, t) {
    return f6(e.getHours(), t, 2);
}
function ut1(e, t) {
    return f6(e.getHours() % 12 || 12, t, 2);
}
function ct2(e, t) {
    return f6(1 + z11.count(q10(e), e), t, 3);
}
function $11(e, t) {
    return f6(e.getMilliseconds(), t, 3);
}
function ft3(e, t) {
    return $11(e, t) + "000";
}
function it6(e, t) {
    return f6(e.getMonth() + 1, t, 2);
}
function st4(e, t) {
    return f6(e.getMinutes(), t, 2);
}
function lt1(e, t) {
    return f6(e.getSeconds(), t, 2);
}
function mt4(e) {
    var t = e.getDay();
    return t === 0 ? 7 : t;
}
function yt2(e, t) {
    return f6(D13.count(q10(e) - 1, e), t, 2);
}
function E16(e) {
    var t = e.getDay();
    return t >= 4 || t === 0 ? $10(e) : $10.ceil(e);
}
function gt2(e, t) {
    return e = E16(e), f6($10.count(q10(e), e) + (q10(e).getDay() === 4), t, 2);
}
function ht3(e) {
    return e.getDay();
}
function pt3(e, t) {
    return f6(X11.count(q10(e) - 1, e), t, 2);
}
function Tt2(e, t) {
    return f6(e.getFullYear() % 100, t, 2);
}
function Mt1(e, t) {
    return e = E16(e), f6(e.getFullYear() % 100, t, 2);
}
function Ut2(e, t) {
    return f6(e.getFullYear() % 10000, t, 4);
}
function Ct2(e, t) {
    var r = e.getDay();
    return e = r >= 4 || r === 0 ? $10(e) : $10.ceil(e), f6(e.getFullYear() % 10000, t, 4);
}
function dt3(e) {
    var t = e.getTimezoneOffset();
    return (t > 0 ? "-" : (t *= -1, "+")) + f6(t / 60 | 0, "0", 2) + f6(t % 60, "0", 2);
}
function K11(e, t) {
    return f6(e.getUTCDate(), t, 2);
}
function vt2(e, t) {
    return f6(e.getUTCHours(), t, 2);
}
function St2(e, t) {
    return f6(e.getUTCHours() % 12 || 12, t, 2);
}
function Dt2(e, t) {
    return f6(1 + E15.count(K10(e), e), t, 3);
}
function ee9(e, t) {
    return f6(e.getUTCMilliseconds(), t, 3);
}
function xt4(e, t) {
    return ee9(e, t) + "000";
}
function wt2(e, t) {
    return f6(e.getUTCMonth() + 1, t, 2);
}
function Lt2(e, t) {
    return f6(e.getUTCMinutes(), t, 2);
}
function Ft3(e, t) {
    return f6(e.getUTCSeconds(), t, 2);
}
function kt2(e) {
    var t = e.getUTCDay();
    return t === 0 ? 7 : t;
}
function Wt2(e, t) {
    return f6(C13.count(K10(e) - 1, e), t, 2);
}
function te8(e) {
    var t = e.getUTCDay();
    return t >= 4 || t === 0 ? ft2(e) : ft2.ceil(e);
}
function Yt2(e, t) {
    return e = te8(e), f6(ft2.count(K10(e), e) + (K10(e).getUTCDay() === 4), t, 2);
}
function bt2(e) {
    return e.getUTCDay();
}
function Ht3(e, t) {
    return f6(it5.count(K10(e) - 1, e), t, 2);
}
function Nt4(e, t) {
    return f6(e.getUTCFullYear() % 100, t, 2);
}
function Ot4(e, t) {
    return e = te8(e), f6(e.getUTCFullYear() % 100, t, 2);
}
function It3(e, t) {
    return f6(e.getUTCFullYear() % 10000, t, 4);
}
function Zt2(e, t) {
    var r = e.getUTCDay();
    return e = r >= 4 || r === 0 ? ft2(e) : ft2.ceil(e), f6(e.getUTCFullYear() % 10000, t, 4);
}
function At3() {
    return "+0000";
}
function re9() {
    return "%";
}
function ne9(e) {
    return +e;
}
function oe10(e) {
    return Math.floor(+e / 1000);
}
var C14, ae8, ue6, H11, N10;
P10({
    dateTime: "%x, %X",
    date: "%-m/%-d/%Y",
    time: "%-I:%M:%S %p",
    periods: [
        "AM",
        "PM"
    ],
    days: [
        "Sunday",
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday"
    ],
    shortDays: [
        "Sun",
        "Mon",
        "Tue",
        "Wed",
        "Thu",
        "Fri",
        "Sat"
    ],
    months: [
        "January",
        "February",
        "March",
        "April",
        "May",
        "June",
        "July",
        "August",
        "September",
        "October",
        "November",
        "December"
    ],
    shortMonths: [
        "Jan",
        "Feb",
        "Mar",
        "Apr",
        "May",
        "Jun",
        "Jul",
        "Aug",
        "Sep",
        "Oct",
        "Nov",
        "Dec"
    ]
});
function P10(e) {
    return C14 = b12(e), ae8 = C14.format, ue6 = C14.parse, H11 = C14.utcFormat, N10 = C14.utcParse, C14;
}
var j16 = "%Y-%m-%dT%H:%M:%S.%LZ";
function Qt3(e) {
    var t = new Date(e);
    return isNaN(t) ? null : t;
}
var Vt3 = +new Date("2000-01-01T00:00:00.000Z") ? Qt3 : N10(j16);
function y10(n, r) {
    switch(arguments.length){
        case 0: break;
        case 1:
            this.range(n);
            break;
        default:
            this.range(r).domain(n);
            break;
    }
    return this;
}
var U6 = Symbol("implicit");
function I12() {
    var n = new h6, r = [], o = [], t = U6;
    function i(e) {
        let a = n.get(e);
        if (a === void 0) {
            if (t !== U6) return t;
            n.set(e, a = r.push(e) - 1);
        }
        return o[a % o.length];
    }
    return i.domain = function(e) {
        if (!arguments.length) return r.slice();
        r = [], n = new h6;
        for (let a of e)n.has(a) || n.set(a, r.push(a) - 1);
        return i;
    }, i.range = function(e) {
        return arguments.length ? (o = Array.from(e), i) : o.slice();
    }, i.unknown = function(e) {
        return arguments.length ? (t = e, i) : t;
    }, i.copy = function() {
        return I12(r, o).unknown(t);
    }, y10.apply(i, arguments), i;
}
function W9(n) {
    return function() {
        return n;
    };
}
function b13(n) {
    return +n;
}
var un1 = [
    0,
    1
];
function v13(n) {
    return n;
}
function B13(n, r) {
    return (r -= n = +n) ? function(o) {
        return (o - n) / r;
    } : W9(isNaN(r) ? NaN : 0.5);
}
function An1(n, r) {
    var o;
    return n > r && (o = n, n = r, r = o), function(t) {
        return Math.max(n, Math.min(r, t));
    };
}
function Dn(n, r, o) {
    var t = n[0], i = n[1], e = r[0], a = r[1];
    return i < t ? (t = B13(i, t), e = o(a, e)) : (t = B13(t, i), e = o(e, a)), function(s) {
        return e(t(s));
    };
}
function Fn1(n, r, o) {
    var t = Math.min(n.length, r.length) - 1, i = new Array(t), e = new Array(t), a = -1;
    for(n[t] < n[0] && (n = n.slice().reverse(), r = r.slice().reverse()); ++a < t;)i[a] = B13(n[a], n[a + 1]), e[a] = o(r[a], r[a + 1]);
    return function(s) {
        var f = X4(n, s, 1, t) - 1;
        return e[f](i[f](s));
    };
}
function q12(n, r) {
    return r.domain(n.domain()).range(n.range()).interpolate(n.interpolate()).clamp(n.clamp()).unknown(n.unknown());
}
function S10() {
    var n = un1, r = un1, o = y5, t, i, e, a = v13, s, f, u;
    function m() {
        var l = Math.min(n.length, r.length);
        return a !== v13 && (a = An1(n[0], n[l - 1])), s = l > 2 ? Fn1 : Dn, f = u = null, c;
    }
    function c(l) {
        return l == null || isNaN(l = +l) ? e : (f || (f = s(n.map(t), r, o)))(t(a(l)));
    }
    return c.invert = function(l) {
        return a(i((u || (u = s(r, n.map(t), x6)))(l)));
    }, c.domain = function(l) {
        return arguments.length ? (n = Array.from(l, b13), m()) : n.slice();
    }, c.range = function(l) {
        return arguments.length ? (r = Array.from(l), m()) : r.slice();
    }, c.rangeRound = function(l) {
        return r = Array.from(l), o = yr, m();
    }, c.clamp = function(l) {
        return arguments.length ? (a = l ? !0 : v13, m()) : a !== v13;
    }, c.interpolate = function(l) {
        return arguments.length ? (o = l, m()) : o;
    }, c.unknown = function(l) {
        return arguments.length ? (e = l, c) : e;
    }, function(l, g) {
        return t = l, i = g, m();
    };
}
function R12() {
    return S10()(v13, v13);
}
function E17(n, r, o, t) {
    var i = nt1(n, r, o), e;
    switch(t = j14(t ?? ",f"), t.type){
        case "s":
            {
                var a = Math.max(Math.abs(n), Math.abs(r));
                return t.precision == null && !isNaN(e = et4(i, a)) && (t.precision = e), W7(t, a);
            }
        case "":
        case "e":
        case "g":
        case "p":
        case "r":
            {
                t.precision == null && !isNaN(e = it3(i, Math.max(Math.abs(n), Math.abs(r)))) && (t.precision = e - (t.type === "e"));
                break;
            }
        case "f":
        case "%":
            {
                t.precision == null && !isNaN(e = ot2(i)) && (t.precision = e - (t.type === "%") * 2);
                break;
            }
    }
    return V10(t);
}
function M10(n) {
    var r = n.domain;
    return n.ticks = function(o) {
        var t = r();
        return C4(t[0], t[t.length - 1], o ?? 10);
    }, n.tickFormat = function(o, t) {
        var i = r();
        return E17(i[0], i[i.length - 1], o ?? 10, t);
    }, n.nice = function(o) {
        o == null && (o = 10);
        var t = r(), i = 0, e = t.length - 1, a = t[i], s = t[e], f, u, m = 10;
        for(s < a && (u = a, a = s, s = u, u = i, i = e, e = u); m-- > 0;){
            if (u = I5(a, s, o), u === f) return t[i] = a, t[e] = s, r(t);
            if (u > 0) a = Math.floor(a / u) * u, s = Math.ceil(s / u) * u;
            else if (u < 0) a = Math.ceil(a * u) / u, s = Math.floor(s * u) / u;
            else break;
            f = u;
        }
        return n;
    }, n;
}
function C15() {
    var n = R12();
    return n.copy = function() {
        return q12(n, C15());
    }, y10.apply(n, arguments), M10(n);
}
function f7(e) {
    for(var d = e.length / 6 | 0, b = new Array(d), r = 0; r < d;)b[r] = "#" + e.slice(r * 6, ++r * 6);
    return b;
}
var L13 = f7("1f77b4ff7f0e2ca02cd627289467bd8c564be377c27f7f7fbcbd2217becf");
function f8(t) {
    return function() {
        return t;
    };
}
var j17 = 0.000000000001;
function D14(t) {
    return typeof t == "object" && "length" in t ? t : Array.from(t);
}
function Jt3(t) {
    this._context = t;
}
Jt3.prototype = {
    areaStart: function() {
        this._line = 0;
    },
    areaEnd: function() {
        this._line = NaN;
    },
    lineStart: function() {
        this._point = 0;
    },
    lineEnd: function() {
        (this._line || this._line !== 0 && this._point === 1) && this._context.closePath(), this._line = 1 - this._line;
    },
    point: function(t, n) {
        switch(t = +t, n = +n, this._point){
            case 0:
                this._point = 1, this._line ? this._context.lineTo(t, n) : this._context.moveTo(t, n);
                break;
            case 1:
                this._point = 2;
            default:
                this._context.lineTo(t, n);
                break;
        }
    }
};
function G14(t) {
    return new Jt3(t);
}
function Q10(t) {
    return t[0];
}
function U7(t) {
    return t[1];
}
function ot4(t, n) {
    var i = f8(!0), e = null, r = G14, s = null;
    t = typeof t == "function" ? t : t === void 0 ? Q10 : f8(t), n = typeof n == "function" ? n : n === void 0 ? U7 : f8(n);
    function a(o) {
        var u, h = (o = D14(o)).length, l, _ = !1, c;
        for(e == null && (s = r(c = E10())), u = 0; u <= h; ++u)!(u < h && i(l = o[u], u, o)) === _ && ((_ = !_) ? s.lineStart() : s.lineEnd()), _ && s.point(+t(l, u, o), +n(l, u, o));
        if (c) return s = null, c + "" || null;
    }
    return a.x = function(o) {
        return arguments.length ? (t = typeof o == "function" ? o : f8(+o), a) : t;
    }, a.y = function(o) {
        return arguments.length ? (n = typeof o == "function" ? o : f8(+o), a) : n;
    }, a.defined = function(o) {
        return arguments.length ? (i = typeof o == "function" ? o : f8(!!o), a) : i;
    }, a.curve = function(o) {
        return arguments.length ? (r = o, e != null && (s = r(e)), a) : r;
    }, a.context = function(o) {
        return arguments.length ? (o == null ? e = s = null : s = r(e = o), a) : e;
    }, a;
}
function Ut3(t) {
    this._curve = t;
}
Ut3.prototype = {
    areaStart: function() {
        this._curve.areaStart();
    },
    areaEnd: function() {
        this._curve.areaEnd();
    },
    lineStart: function() {
        this._curve.lineStart();
    },
    lineEnd: function() {
        this._curve.lineEnd();
    },
    point: function(t, n) {
        this._curve.point(n * Math.sin(t), n * -Math.cos(t));
    }
};
function E18() {
}
function nt6(t, n, i) {
    t._context.bezierCurveTo((2 * t._x0 + t._x1) / 3, (2 * t._y0 + t._y1) / 3, (t._x0 + 2 * t._x1) / 3, (t._y0 + 2 * t._y1) / 3, (t._x0 + 4 * t._x1 + n) / 6, (t._y0 + 4 * t._y1 + i) / 6);
}
function rt5(t) {
    this._context = t;
}
rt5.prototype = {
    areaStart: function() {
        this._line = 0;
    },
    areaEnd: function() {
        this._line = NaN;
    },
    lineStart: function() {
        this._x0 = this._x1 = this._y0 = this._y1 = NaN, this._point = 0;
    },
    lineEnd: function() {
        switch(this._point){
            case 3:
                nt6(this, this._x1, this._y1);
            case 2:
                this._context.lineTo(this._x1, this._y1);
                break;
        }
        (this._line || this._line !== 0 && this._point === 1) && this._context.closePath(), this._line = 1 - this._line;
    },
    point: function(t, n) {
        switch(t = +t, n = +n, this._point){
            case 0:
                this._point = 1, this._line ? this._context.lineTo(t, n) : this._context.moveTo(t, n);
                break;
            case 1:
                this._point = 2;
                break;
            case 2:
                this._point = 3, this._context.lineTo((5 * this._x0 + this._x1) / 6, (5 * this._y0 + this._y1) / 6);
            default:
                nt6(this, t, n);
                break;
        }
        this._x0 = this._x1, this._x1 = t, this._y0 = this._y1, this._y1 = n;
    }
};
function en1(t) {
    this._context = t;
}
en1.prototype = {
    areaStart: E18,
    areaEnd: E18,
    lineStart: function() {
        this._x0 = this._x1 = this._x2 = this._x3 = this._x4 = this._y0 = this._y1 = this._y2 = this._y3 = this._y4 = NaN, this._point = 0;
    },
    lineEnd: function() {
        switch(this._point){
            case 1:
                {
                    this._context.moveTo(this._x2, this._y2), this._context.closePath();
                    break;
                }
            case 2:
                {
                    this._context.moveTo((this._x2 + 2 * this._x3) / 3, (this._y2 + 2 * this._y3) / 3), this._context.lineTo((this._x3 + 2 * this._x2) / 3, (this._y3 + 2 * this._y2) / 3), this._context.closePath();
                    break;
                }
            case 3:
                {
                    this.point(this._x2, this._y2), this.point(this._x3, this._y3), this.point(this._x4, this._y4);
                    break;
                }
        }
    },
    point: function(t, n) {
        switch(t = +t, n = +n, this._point){
            case 0:
                this._point = 1, this._x2 = t, this._y2 = n;
                break;
            case 1:
                this._point = 2, this._x3 = t, this._y3 = n;
                break;
            case 2:
                this._point = 3, this._x4 = t, this._y4 = n, this._context.moveTo((this._x0 + 4 * this._x1 + t) / 6, (this._y0 + 4 * this._y1 + n) / 6);
                break;
            default:
                nt6(this, t, n);
                break;
        }
        this._x0 = this._x1, this._x1 = t, this._y0 = this._y1, this._y1 = n;
    }
};
function on1(t) {
    this._context = t;
}
on1.prototype = {
    areaStart: function() {
        this._line = 0;
    },
    areaEnd: function() {
        this._line = NaN;
    },
    lineStart: function() {
        this._x0 = this._x1 = this._y0 = this._y1 = NaN, this._point = 0;
    },
    lineEnd: function() {
        (this._line || this._line !== 0 && this._point === 3) && this._context.closePath(), this._line = 1 - this._line;
    },
    point: function(t, n) {
        switch(t = +t, n = +n, this._point){
            case 0:
                this._point = 1;
                break;
            case 1:
                this._point = 2;
                break;
            case 2:
                this._point = 3;
                var i = (this._x0 + 4 * this._x1 + t) / 6, e = (this._y0 + 4 * this._y1 + n) / 6;
                this._line ? this._context.lineTo(i, e) : this._context.moveTo(i, e);
                break;
            case 3:
                this._point = 4;
            default:
                nt6(this, t, n);
                break;
        }
        this._x0 = this._x1, this._x1 = t, this._y0 = this._y1, this._y1 = n;
    }
};
var Bt2 = class {
    constructor(n4, i7){
        this._context = n4, this._x = i7;
    }
    areaStart() {
        this._line = 0;
    }
    areaEnd() {
        this._line = NaN;
    }
    lineStart() {
        this._point = 0;
    }
    lineEnd() {
        (this._line || this._line !== 0 && this._point === 1) && this._context.closePath(), this._line = 1 - this._line;
    }
    point(n, i) {
        switch(n = +n, i = +i, this._point){
            case 0:
                {
                    this._point = 1, this._line ? this._context.lineTo(n, i) : this._context.moveTo(n, i);
                    break;
                }
            case 1:
                this._point = 2;
            default:
                {
                    this._x ? this._context.bezierCurveTo(this._x0 = (this._x0 + n) / 2, this._y0, this._x0, i, n, i) : this._context.bezierCurveTo(this._x0, this._y0 = (this._y0 + i) / 2, n, this._y0, n, i);
                    break;
                }
        }
        this._x0 = n, this._y0 = i;
    }
};
function rn1(t, n) {
    this._basis = new rt5(t), this._beta = n;
}
rn1.prototype = {
    lineStart: function() {
        this._x = [], this._y = [], this._basis.lineStart();
    },
    lineEnd: function() {
        var t = this._x, n = this._y, i = t.length - 1;
        if (i > 0) for(var e = t[0], r = n[0], s = t[i] - e, a = n[i] - r, o = -1, u; ++o <= i;)u = o / i, this._basis.point(this._beta * t[o] + (1 - this._beta) * (e + u * s), this._beta * n[o] + (1 - this._beta) * (r + u * a));
        this._x = this._y = null, this._basis.lineEnd();
    },
    point: function(t, n) {
        this._x.push(+t), this._y.push(+n);
    }
};
function it7(t, n, i) {
    t._context.bezierCurveTo(t._x1 + t._k * (t._x2 - t._x0), t._y1 + t._k * (t._y2 - t._y0), t._x2 + t._k * (t._x1 - n), t._y2 + t._k * (t._y1 - i), t._x2, t._y2);
}
function mt5(t, n) {
    this._context = t, this._k = (1 - n) / 6;
}
mt5.prototype = {
    areaStart: function() {
        this._line = 0;
    },
    areaEnd: function() {
        this._line = NaN;
    },
    lineStart: function() {
        this._x0 = this._x1 = this._x2 = this._y0 = this._y1 = this._y2 = NaN, this._point = 0;
    },
    lineEnd: function() {
        switch(this._point){
            case 2:
                this._context.lineTo(this._x2, this._y2);
                break;
            case 3:
                it7(this, this._x1, this._y1);
                break;
        }
        (this._line || this._line !== 0 && this._point === 1) && this._context.closePath(), this._line = 1 - this._line;
    },
    point: function(t, n) {
        switch(t = +t, n = +n, this._point){
            case 0:
                this._point = 1, this._line ? this._context.lineTo(t, n) : this._context.moveTo(t, n);
                break;
            case 1:
                this._point = 2, this._x1 = t, this._y1 = n;
                break;
            case 2:
                this._point = 3;
            default:
                it7(this, t, n);
                break;
        }
        this._x0 = this._x1, this._x1 = this._x2, this._x2 = t, this._y0 = this._y1, this._y1 = this._y2, this._y2 = n;
    }
};
function dt4(t, n) {
    this._context = t, this._k = (1 - n) / 6;
}
dt4.prototype = {
    areaStart: E18,
    areaEnd: E18,
    lineStart: function() {
        this._x0 = this._x1 = this._x2 = this._x3 = this._x4 = this._x5 = this._y0 = this._y1 = this._y2 = this._y3 = this._y4 = this._y5 = NaN, this._point = 0;
    },
    lineEnd: function() {
        switch(this._point){
            case 1:
                {
                    this._context.moveTo(this._x3, this._y3), this._context.closePath();
                    break;
                }
            case 2:
                {
                    this._context.lineTo(this._x3, this._y3), this._context.closePath();
                    break;
                }
            case 3:
                {
                    this.point(this._x3, this._y3), this.point(this._x4, this._y4), this.point(this._x5, this._y5);
                    break;
                }
        }
    },
    point: function(t, n) {
        switch(t = +t, n = +n, this._point){
            case 0:
                this._point = 1, this._x3 = t, this._y3 = n;
                break;
            case 1:
                this._point = 2, this._context.moveTo(this._x4 = t, this._y4 = n);
                break;
            case 2:
                this._point = 3, this._x5 = t, this._y5 = n;
                break;
            default:
                it7(this, t, n);
                break;
        }
        this._x0 = this._x1, this._x1 = this._x2, this._x2 = t, this._y0 = this._y1, this._y1 = this._y2, this._y2 = n;
    }
};
function xt5(t, n) {
    this._context = t, this._k = (1 - n) / 6;
}
xt5.prototype = {
    areaStart: function() {
        this._line = 0;
    },
    areaEnd: function() {
        this._line = NaN;
    },
    lineStart: function() {
        this._x0 = this._x1 = this._x2 = this._y0 = this._y1 = this._y2 = NaN, this._point = 0;
    },
    lineEnd: function() {
        (this._line || this._line !== 0 && this._point === 3) && this._context.closePath(), this._line = 1 - this._line;
    },
    point: function(t, n) {
        switch(t = +t, n = +n, this._point){
            case 0:
                this._point = 1;
                break;
            case 1:
                this._point = 2;
                break;
            case 2:
                this._point = 3, this._line ? this._context.lineTo(this._x2, this._y2) : this._context.moveTo(this._x2, this._y2);
                break;
            case 3:
                this._point = 4;
            default:
                it7(this, t, n);
                break;
        }
        this._x0 = this._x1, this._x1 = this._x2, this._x2 = t, this._y0 = this._y1, this._y1 = this._y2, this._y2 = n;
    }
};
function st5(t, n, i) {
    var e = t._x1, r = t._y1, s = t._x2, a = t._y2;
    if (t._l01_a > j17) {
        var o = 2 * t._l01_2a + 3 * t._l01_a * t._l12_a + t._l12_2a, u = 3 * t._l01_a * (t._l01_a + t._l12_a);
        e = (e * o - t._x0 * t._l12_2a + t._x2 * t._l01_2a) / u, r = (r * o - t._y0 * t._l12_2a + t._y2 * t._l01_2a) / u;
    }
    if (t._l23_a > j17) {
        var h = 2 * t._l23_2a + 3 * t._l23_a * t._l12_a + t._l12_2a, l = 3 * t._l23_a * (t._l23_a + t._l12_a);
        s = (s * h + t._x1 * t._l23_2a - n * t._l12_2a) / l, a = (a * h + t._y1 * t._l23_2a - i * t._l12_2a) / l;
    }
    t._context.bezierCurveTo(e, r, s, a, t._x2, t._y2);
}
function sn1(t, n) {
    this._context = t, this._alpha = n;
}
sn1.prototype = {
    areaStart: function() {
        this._line = 0;
    },
    areaEnd: function() {
        this._line = NaN;
    },
    lineStart: function() {
        this._x0 = this._x1 = this._x2 = this._y0 = this._y1 = this._y2 = NaN, this._l01_a = this._l12_a = this._l23_a = this._l01_2a = this._l12_2a = this._l23_2a = this._point = 0;
    },
    lineEnd: function() {
        switch(this._point){
            case 2:
                this._context.lineTo(this._x2, this._y2);
                break;
            case 3:
                this.point(this._x2, this._y2);
                break;
        }
        (this._line || this._line !== 0 && this._point === 1) && this._context.closePath(), this._line = 1 - this._line;
    },
    point: function(t, n) {
        if (t = +t, n = +n, this._point) {
            var i = this._x2 - t, e = this._y2 - n;
            this._l23_a = Math.sqrt(this._l23_2a = Math.pow(i * i + e * e, this._alpha));
        }
        switch(this._point){
            case 0:
                this._point = 1, this._line ? this._context.lineTo(t, n) : this._context.moveTo(t, n);
                break;
            case 1:
                this._point = 2;
                break;
            case 2:
                this._point = 3;
            default:
                st5(this, t, n);
                break;
        }
        this._l01_a = this._l12_a, this._l12_a = this._l23_a, this._l01_2a = this._l12_2a, this._l12_2a = this._l23_2a, this._x0 = this._x1, this._x1 = this._x2, this._x2 = t, this._y0 = this._y1, this._y1 = this._y2, this._y2 = n;
    }
};
function an(t, n) {
    this._context = t, this._alpha = n;
}
an.prototype = {
    areaStart: E18,
    areaEnd: E18,
    lineStart: function() {
        this._x0 = this._x1 = this._x2 = this._x3 = this._x4 = this._x5 = this._y0 = this._y1 = this._y2 = this._y3 = this._y4 = this._y5 = NaN, this._l01_a = this._l12_a = this._l23_a = this._l01_2a = this._l12_2a = this._l23_2a = this._point = 0;
    },
    lineEnd: function() {
        switch(this._point){
            case 1:
                {
                    this._context.moveTo(this._x3, this._y3), this._context.closePath();
                    break;
                }
            case 2:
                {
                    this._context.lineTo(this._x3, this._y3), this._context.closePath();
                    break;
                }
            case 3:
                {
                    this.point(this._x3, this._y3), this.point(this._x4, this._y4), this.point(this._x5, this._y5);
                    break;
                }
        }
    },
    point: function(t, n) {
        if (t = +t, n = +n, this._point) {
            var i = this._x2 - t, e = this._y2 - n;
            this._l23_a = Math.sqrt(this._l23_2a = Math.pow(i * i + e * e, this._alpha));
        }
        switch(this._point){
            case 0:
                this._point = 1, this._x3 = t, this._y3 = n;
                break;
            case 1:
                this._point = 2, this._context.moveTo(this._x4 = t, this._y4 = n);
                break;
            case 2:
                this._point = 3, this._x5 = t, this._y5 = n;
                break;
            default:
                st5(this, t, n);
                break;
        }
        this._l01_a = this._l12_a, this._l12_a = this._l23_a, this._l01_2a = this._l12_2a, this._l12_2a = this._l23_2a, this._x0 = this._x1, this._x1 = this._x2, this._x2 = t, this._y0 = this._y1, this._y1 = this._y2, this._y2 = n;
    }
};
function un2(t, n) {
    this._context = t, this._alpha = n;
}
un2.prototype = {
    areaStart: function() {
        this._line = 0;
    },
    areaEnd: function() {
        this._line = NaN;
    },
    lineStart: function() {
        this._x0 = this._x1 = this._x2 = this._y0 = this._y1 = this._y2 = NaN, this._l01_a = this._l12_a = this._l23_a = this._l01_2a = this._l12_2a = this._l23_2a = this._point = 0;
    },
    lineEnd: function() {
        (this._line || this._line !== 0 && this._point === 3) && this._context.closePath(), this._line = 1 - this._line;
    },
    point: function(t, n) {
        if (t = +t, n = +n, this._point) {
            var i = this._x2 - t, e = this._y2 - n;
            this._l23_a = Math.sqrt(this._l23_2a = Math.pow(i * i + e * e, this._alpha));
        }
        switch(this._point){
            case 0:
                this._point = 1;
                break;
            case 1:
                this._point = 2;
                break;
            case 2:
                this._point = 3, this._line ? this._context.lineTo(this._x2, this._y2) : this._context.moveTo(this._x2, this._y2);
                break;
            case 3:
                this._point = 4;
            default:
                st5(this, t, n);
                break;
        }
        this._l01_a = this._l12_a, this._l12_a = this._l23_a, this._l01_2a = this._l12_2a, this._l12_2a = this._l23_2a, this._x0 = this._x1, this._x1 = this._x2, this._x2 = t, this._y0 = this._y1, this._y1 = this._y2, this._y2 = n;
    }
};
function ln1(t) {
    this._context = t;
}
ln1.prototype = {
    areaStart: E18,
    areaEnd: E18,
    lineStart: function() {
        this._point = 0;
    },
    lineEnd: function() {
        this._point && this._context.closePath();
    },
    point: function(t, n) {
        t = +t, n = +n, this._point ? this._context.lineTo(t, n) : (this._point = 1, this._context.moveTo(t, n));
    }
};
function hn(t) {
    return t < 0 ? -1 : 1;
}
function _n(t, n, i) {
    var e = t._x1 - t._x0, r = n - t._x1, s = (t._y1 - t._y0) / (e || r < 0 && -0), a = (i - t._y1) / (r || e < 0 && -0), o = (s * r + a * e) / (e + r);
    return (hn(s) + hn(a)) * Math.min(Math.abs(s), Math.abs(a), 0.5 * Math.abs(o)) || 0;
}
function fn1(t, n) {
    var i = t._x1 - t._x0;
    return i ? (3 * (t._y1 - t._y0) / i - n) / 2 : n;
}
function zt2(t, n, i) {
    var e = t._x0, r = t._y0, s = t._x1, a = t._y1, o = (s - e) / 3;
    t._context.bezierCurveTo(e + o, r + o * n, s - o, a - o * i, s, a);
}
function yt3(t) {
    this._context = t;
}
yt3.prototype = {
    areaStart: function() {
        this._line = 0;
    },
    areaEnd: function() {
        this._line = NaN;
    },
    lineStart: function() {
        this._x0 = this._x1 = this._y0 = this._y1 = this._t0 = NaN, this._point = 0;
    },
    lineEnd: function() {
        switch(this._point){
            case 2:
                this._context.lineTo(this._x1, this._y1);
                break;
            case 3:
                zt2(this, this._t0, fn1(this, this._t0));
                break;
        }
        (this._line || this._line !== 0 && this._point === 1) && this._context.closePath(), this._line = 1 - this._line;
    },
    point: function(t, n) {
        var i = NaN;
        if (t = +t, n = +n, !(t === this._x1 && n === this._y1)) {
            switch(this._point){
                case 0:
                    this._point = 1, this._line ? this._context.lineTo(t, n) : this._context.moveTo(t, n);
                    break;
                case 1:
                    this._point = 2;
                    break;
                case 2:
                    this._point = 3, zt2(this, fn1(this, i = _n(this, t, n)), i);
                    break;
                default:
                    zt2(this, this._t0, i = _n(this, t, n));
                    break;
            }
            this._x0 = this._x1, this._x1 = t, this._y0 = this._y1, this._y1 = n, this._t0 = i;
        }
    }
};
function cn1(t) {
    this._context = new pn1(t);
}
(cn1.prototype = Object.create(yt3.prototype)).point = function(t, n) {
    yt3.prototype.point.call(this, n, t);
};
function pn1(t) {
    this._context = t;
}
pn1.prototype = {
    moveTo: function(t, n) {
        this._context.moveTo(n, t);
    },
    closePath: function() {
        this._context.closePath();
    },
    lineTo: function(t, n) {
        this._context.lineTo(n, t);
    },
    bezierCurveTo: function(t, n, i, e, r, s) {
        this._context.bezierCurveTo(n, t, e, i, s, r);
    }
};
function mn1(t) {
    this._context = t;
}
mn1.prototype = {
    areaStart: function() {
        this._line = 0;
    },
    areaEnd: function() {
        this._line = NaN;
    },
    lineStart: function() {
        this._x = [], this._y = [];
    },
    lineEnd: function() {
        var t = this._x, n = this._y, i = t.length;
        if (i) if (this._line ? this._context.lineTo(t[0], n[0]) : this._context.moveTo(t[0], n[0]), i === 2) this._context.lineTo(t[1], n[1]);
        else for(var e = dn(t), r = dn(n), s = 0, a = 1; a < i; ++s, ++a)this._context.bezierCurveTo(e[0][s], r[0][s], e[1][s], r[1][s], t[a], n[a]);
        (this._line || this._line !== 0 && i === 1) && this._context.closePath(), this._line = 1 - this._line, this._x = this._y = null;
    },
    point: function(t, n) {
        this._x.push(+t), this._y.push(+n);
    }
};
function dn(t) {
    var n, i = t.length - 1, e, r = new Array(i), s = new Array(i), a = new Array(i);
    for(r[0] = 0, s[0] = 2, a[0] = t[0] + 2 * t[1], n = 1; n < i - 1; ++n)r[n] = 1, s[n] = 4, a[n] = 4 * t[n] + 2 * t[n + 1];
    for(r[i - 1] = 2, s[i - 1] = 7, a[i - 1] = 8 * t[i - 1] + t[i], n = 1; n < i; ++n)e = r[n] / s[n - 1], s[n] -= e, a[n] -= e * a[n - 1];
    for(r[i - 1] = a[i - 1] / s[i - 1], n = i - 2; n >= 0; --n)r[n] = (a[n] - r[n + 1]) / s[n];
    for(s[i - 1] = (t[i] + r[i - 1]) / 2, n = 0; n < i - 1; ++n)s[n] = 2 * t[n + 1] - r[n + 1];
    return [
        r,
        s
    ];
}
function vt3(t, n) {
    this._context = t, this._t = n;
}
vt3.prototype = {
    areaStart: function() {
        this._line = 0;
    },
    areaEnd: function() {
        this._line = NaN;
    },
    lineStart: function() {
        this._x = this._y = NaN, this._point = 0;
    },
    lineEnd: function() {
        0 < this._t && this._t < 1 && this._point === 2 && this._context.lineTo(this._x, this._y), (this._line || this._line !== 0 && this._point === 1) && this._context.closePath(), this._line >= 0 && (this._t = 1 - this._t, this._line = 1 - this._line);
    },
    point: function(t, n) {
        switch(t = +t, n = +n, this._point){
            case 0:
                this._point = 1, this._line ? this._context.lineTo(t, n) : this._context.moveTo(t, n);
                break;
            case 1:
                this._point = 2;
            default:
                {
                    if (this._t <= 0) this._context.lineTo(this._x, n), this._context.lineTo(t, n);
                    else {
                        var i = this._x * (1 - this._t) + t * this._t;
                        this._context.lineTo(i, this._y), this._context.lineTo(i, n);
                    }
                    break;
                }
        }
        this._x = t, this._y = n;
    }
};
function v14(n, f, m) {
    this.k = n, this.x = f, this.y = m;
}
v14.prototype = {
    constructor: v14,
    scale: function(n) {
        return n === 1 ? this : new v14(this.k * n, this.x, this.y);
    },
    translate: function(n, f) {
        return n === 0 & f === 0 ? this : new v14(this.k, this.x + this.k * n, this.y + this.k * f);
    },
    apply: function(n) {
        return [
            n[0] * this.k + this.x,
            n[1] * this.k + this.y
        ];
    },
    applyX: function(n) {
        return n * this.k + this.x;
    },
    applyY: function(n) {
        return n * this.k + this.y;
    },
    invert: function(n) {
        return [
            (n[0] - this.x) / this.k,
            (n[1] - this.y) / this.k
        ];
    },
    invertX: function(n) {
        return (n - this.x) / this.k;
    },
    invertY: function(n) {
        return (n - this.y) / this.k;
    },
    rescaleX: function(n) {
        return n.copy().domain(n.range().map(this.invertX, this).map(n.invert, n));
    },
    rescaleY: function(n) {
        return n.copy().domain(n.range().map(this.invertY, this).map(n.invert, n));
    },
    toString: function() {
        return "translate(" + this.x + "," + this.y + ") scale(" + this.k + ")";
    }
};
var j18 = new v14(1, 0, 0);
F14.prototype = v14.prototype;
function F14(n) {
    for(; !n.__zoom;)if (!(n = n.parentNode)) return j18;
    return n.__zoom;
}
const deduceDataMap = (data)=>{
    const columns = Object.keys(data[0]);
    const columnTypes = Object.values(data[0]).map((v)=>typeof v
    );
    const numberColumns = columns.filter((_, i)=>columnTypes[i] === "number"
    );
    const xAxis = numberColumns[0];
    const yAxis = numberColumns[1];
    const series = columns.filter((v)=>v !== xAxis && v !== yAxis
    );
    return {
        xAxis,
        yAxis,
        series
    };
};
const LineChart = ({ data  })=>{
    const svgRef = Le2(null);
    xe(()=>{
        if (!data[0]) return;
        if (!svgRef.current) return;
        const parent = svgRef.current.parentElement?.parentElement;
        if (!parent) return;
        svgRef.current.setAttribute("viewbox", `0 0 ${parent.clientWidth} ${parent.clientHeight}`);
        svgRef.current.style.width = "100%";
        svgRef.current.style.height = "100%";
        const dataMap = deduceDataMap(data);
        const svg = B4(svgRef.current);
        const xAxisValues = data.map((r)=>r[dataMap.xAxis]
        );
        const yAxisValues = data.map((r)=>r[dataMap.yAxis]
        );
        const xAxis = C15().domain([
            Math.min(...xAxisValues),
            Math.max(...xAxisValues)
        ]).range([
            10,
            parent.clientWidth - 10
        ]);
        const yAxis = C15().domain([
            Math.min(...yAxisValues),
            Math.max(...yAxisValues)
        ]).range([
            parent.clientHeight - 10,
            10
        ]);
        const color = I12(L13);
        const line = ot4().x((d)=>xAxis(d[0])
        ).y((d)=>yAxis(d[1])
        );
        const lines = Object.entries(data.reduce((lines, row)=>{
            const series = dataMap.series.map((c)=>row[c]
            ).join("-");
            if (!lines[series]) lines[series] = [];
            lines[series].push([
                row[dataMap.xAxis],
                row[dataMap.yAxis]
            ]);
            return lines;
        }, {
        }));
        svg.selectAll("path").data(lines).join((enter)=>enter.append("path").attr("fill", "none").attr("stroke", (d)=>color(d[0])
            ).attr("stroke-width", 1)
        ).attr("d", (d)=>line(d[1])
        );
    }, [
        data,
        svgRef.current
    ]);
    return export_default4.createElement("svg", {
        style: {
            width: 0,
            height: 0
        },
        ref: svgRef
    });
};
const QueryContextMenu = ({ shown , x , y , rows , handleHide  })=>{
    const options = [];
    if (rows) options.push({
        type: "option",
        label: "Copy as TSV",
        onClick: ()=>{
            navigator.clipboard.writeText([
                Object.keys(rows[0]).join("\t"),
                ...rows.map((row)=>Object.values(row).join("\t")
                ), 
            ].join("\n"));
            handleHide();
        }
    }, {
        type: "option",
        label: "Copy as markdown",
        onClick: ()=>{
            if (!rows) return;
            const columns = Object.keys(rows[0]);
            const stringRows = [
                columns
            ];
            const columnWidths = columns.map((k)=>k.length
            );
            const columnTypes = Object.values(rows[0]).map((v)=>typeof v
            );
            for(let i = 0; i < rows.length; i++){
                const row = [];
                stringRows.push(row);
                for(let n = 0; n < columns.length; n++){
                    const str = (rows[i][columns[n]] ?? "").toString();
                    row.push(str);
                    if (columnWidths[n] < str.length) columnWidths[n] = str.length;
                }
            }
            stringRows.splice(1, 0, columnWidths.map((w)=>"-".repeat(w)
            ));
            navigator.clipboard.writeText(stringRows.map((row)=>row.map((v, i)=>columnTypes[i] === "number" ? v.padStart(columnWidths[i], " ") : v.padEnd(columnWidths[i], " ")
                ).join(" | ")
            ).join("\n"));
            handleHide();
        }
    });
    return export_default4.createElement(ContextMenu, {
        shown: shown,
        left: x,
        top: y,
        options: options
    });
};
const tableCellStyle = {
    whiteSpace: "pre",
    padding: "2px 4px",
    maxWidth: 300,
    maxHeight: 200,
    overflow: "auto"
};
const ResultTable = ({ handleContextMenu , handleClick , error , rows , fields  })=>export_default4.createElement("table", {
        style: {
            borderCollapse: "collapse",
            borderStyle: "hidden",
            minHeight: "100%",
            minWidth: "100%",
            fontSize: 12,
            ...theme.table.container
        },
        onContextMenu: (e)=>{
            handleContextMenu?.({
                x: e.pageX,
                y: e.pageY
            });
            e.preventDefault();
        },
        onClick: (e)=>{
            if (handleClick?.()) {
                e.preventDefault();
            }
        }
    }, fields && export_default4.createElement("thead", {
        style: theme.table.head
    }, export_default4.createElement("tr", null, fields.map((f, i)=>export_default4.createElement("th", {
            key: `${f.name}-${i}`,
            style: {
                ...tableCellStyle,
                ...theme.table.cell
            }
        }, f.name)
    ), export_default4.createElement("th", {
        style: {
            width: "99%"
        }
    }))), export_default4.createElement("tbody", null, rows?.slice(0, 1000).map((r, i)=>export_default4.createElement("tr", {
            key: i
        }, (fields?.map((f)=>[
                f.name,
                r[f.name]
            ]
        ) ?? Object.entries(r)).map((d, i)=>export_default4.createElement("td", {
                key: i,
                style: {
                    ...tableCellStyle,
                    ...theme.table.cell,
                    textAlign: types[fields?.[i].fieldType ?? 0] === "number" && "right" || types[fields?.[i].fieldType ?? 0] === "boolean" && "center" || "inherit",
                    ...theme.table[types[fields?.[i].fieldType ?? 0]]
                }
            }, types[fields?.[i].fieldType ?? 0] === "boolean" && export_default4.createElement("input", {
                type: "checkbox",
                checked: d[1] === true,
                disabled: typeof d[1] !== "boolean"
            }) || fields?.[i].fieldType === 257 && d[1] || d[1]?.toString())
        ), export_default4.createElement("td", {
            style: {
                width: "99%"
            }
        }))
    ), error && export_default4.createElement("tr", null, export_default4.createElement("td", {
        style: {
            ...tableCellStyle,
            color: "red",
            ...theme.table.cell
        }
    }, error), export_default4.createElement("td", {
        style: {
            width: "99%"
        }
    })), export_default4.createElement("tr", null, (fields ? Object.keys(fields) : [
        "placeholder"
    ]).map((i)=>export_default4.createElement("td", {
            key: i,
            style: {
                height: "99%"
            }
        })
    ), export_default4.createElement("td", {
        style: {
            height: "99%",
            width: "99%"
        }
    }))))
;
const ResultsComponent = ({ results , handleContextMenu , handleClick  })=>{
    const [display, setDisplay] = qe("table");
    if (display === "table") return export_default4.createElement(ResultTable, {
        rows: results.rows,
        fields: results.fields,
        error: results.error,
        handleContextMenu: handleContextMenu,
        handleClick: handleClick
    });
    const rows = results.rows?.map((r)=>Object.fromEntries(Object.entries(r).map(([column, value], i)=>{
            if (types[results?.fields?.[i].fieldType ?? 0] === "date" && (typeof value === "string" || typeof value === "number")) return [
                column,
                new Date(value).getTime()
            ];
            return [
                column,
                value
            ];
        }))
    );
    if (display === "line" && rows) {
        return export_default4.createElement(LineChart, {
            data: rows
        });
    }
    return export_default4.createElement(export_default4.Fragment, null, "Other");
};
const QueryResults = ({ results  })=>{
    const [contextMenu, setContextMenu] = qe();
    return export_default4.createElement(export_default4.Fragment, null, export_default4.createElement(QueryContextMenu, {
        shown: !!contextMenu,
        x: contextMenu?.x,
        y: contextMenu?.y,
        rows: results.rows,
        handleHide: ()=>setContextMenu(undefined)
    }), export_default4.createElement(ResultsComponent, {
        results: results,
        handleContextMenu: ({ x , y  })=>{
            setContextMenu({
                x,
                y
            });
        },
        handleClick: ()=>{
            if (contextMenu) {
                setContextMenu(undefined);
                return true;
            }
            return false;
        }
    }));
};
class ErrorBoundary extends export_default4.Component {
    constructor(props){
        super(props);
        this.state = {
            error: undefined
        };
    }
    static getDerivedStateFromError(error) {
        return {
            error: error.message
        };
    }
    render() {
        if (this.state.error) {
            return export_default4.createElement("span", {
                style: {
                    color: "red"
                }
            }, this.state.error);
        }
        return this.props.children;
    }
}
const store = (key, value)=>{
    localStorage.setItem(key, JSON.stringify(value));
};
const retrieve = (key, typeguard)=>{
    const raw = localStorage.getItem(key);
    if (!raw) return;
    let json;
    try {
        json = JSON.parse(raw);
    } catch (err) {
        console.warn(err);
        return;
    }
    if (typeguard(json)) {
        return json;
    }
};
const isRecord = (v)=>!!v && typeof v === "object"
;
const isArray = (v)=>Array.isArray(v)
;
const isNumber = (v)=>typeof v === "number"
;
const hasNumber = (v, k)=>k in v && typeof v[k] === "number"
;
const hasString = (v, k)=>k in v && typeof v[k] === "string"
;
const hasMaybeString = (v, k)=>k in v ? typeof v[k] === "string" || v[k] == null : true
;
const hasMaybeNumber = (v, k)=>k in v ? typeof v[k] === "number" || v[k] == null : true
;
const isStringArray = (v)=>Array.isArray(v) && v.every((v)=>typeof v === "string"
    )
;
const initialQueryTabs = retrieve("tabs.queryTabs", isStringArray) ?? [];
if (!initialQueryTabs.length) initialQueryTabs.push("SELECT 1+1;");
const tabsSlice = Mr1({
    name: "output",
    initialState: {
        queryTabCount: initialQueryTabs.length,
        queryTabs: initialQueryTabs,
        selected: retrieve("tabs.selected", isNumber) ?? 2
    },
    reducers: {
        newTab: (state, query)=>{
            state.queryTabs.push(query.payload ?? "");
            state.queryTabCount++;
            store("tabs.queryTabs", state.queryTabs);
        },
        selectTab: (state, action)=>{
            let index = action.payload;
            if (index >= state.queryTabCount + 2) {
                index = state.queryTabCount + 2;
                state.queryTabs.push("");
                state.queryTabCount++;
                store("tabs.queryTabs", state.queryTabs);
            }
            state.selected = index;
            store("tabs.selected", index);
        },
        closeTab: (state, action)=>{
            if (action.payload < 2) return;
            state.queryTabs.splice(action.payload - 2, 1);
            state.queryTabCount--;
            store("tabs.queryTabs", state.queryTabs);
            if (action.payload < state.selected) {
                state.selected -= 1;
                store("tabs.selected", state.selected);
            }
        },
        updateTab: (state, action)=>{
            state.queryTabs[action.payload.id] = action.payload.value;
            store("tabs.queryTabs", state.queryTabs);
        }
    }
});
const QueryTab = ({ id  })=>{
    const [results, setResults] = qe();
    const query = Ur((s)=>s.tabs.queryTabs[id]
    );
    const dispatch = useAppDispatch();
    const queryFn = useQuery();
    xe(()=>{
        if (!query) return;
        queryFn(query, "force-cache").then(setResults);
    }, []);
    xe(()=>{
        const listener = async (e)=>{
            if (e.key === "Enter" && e.shiftKey) {
                e.preventDefault();
                setResults(await queryFn(query));
            }
        };
        globalThis.addEventListener("keydown", listener);
        return ()=>globalThis.removeEventListener("keydown", listener)
        ;
    }, [
        query
    ]);
    return export_default4.createElement(Panel, {
        direction: "vertical",
        style: {
            height: "100%"
        }
    }, export_default4.createElement(Panel, {
        id: "query",
        basis: "40%"
    }, export_default4.createElement("div", {
        style: {
            overflow: "hidden",
            height: "calc(100% - 1px)",
            width: "100%"
        }
    }, export_default4.createElement(ErrorBoundary, null, export_default4.createElement(Je, {
        defaultLanguage: "sql",
        value: query,
        onChange: (v)=>{
            localStorage.setItem(`query-${id}`, v);
            dispatch(tabsSlice.actions.updateTab({
                id,
                value: v
            }));
        },
        options: {
            minimap: {
                enabled: false
            }
        },
        loading: null,
        theme: theme.monaco
    })))), export_default4.createElement(Panel, {
        id: "results",
        basis: "60%",
        style: {
            overflow: "auto"
        }
    }, results && export_default4.createElement(QueryResults, {
        results: results
    })));
};
const TableDataTab = ({})=>{
    const { database , table  } = Ur((s)=>({
            database: s.connection.database,
            table: s.connection.table
        })
    );
    const [results, setResults] = qe();
    const query = useQuery();
    xe(()=>{
        if (table) query(`SELECT * FROM \`${database}\`.\`${table}\` LIMIT 1000;`).then(setResults);
    }, [
        table
    ]);
    return results ? export_default4.createElement(QueryResults, {
        results: results
    }) : null;
};
const isSqlColumnRow = (row)=>isRecord(row) && typeof row.Field === "string" && typeof row.Type === "string" && (typeof row.Default === "string" || row.Default === null)
;
const extractDataType = (str)=>{
    const value = str.match(/^\w+/)?.[0];
    if (!value) throw new Error(`Unable to extract datatype from '${str}'`);
    return value;
};
const extractDataLength = (str)=>{
    const value = str.match(/^(\w+)\((\d+)\)/)?.[2];
    if (value) return parseInt(value);
};
const extractSign = (str)=>{
    const isNumeric = !!str.match(/^(int|float|tinyint|bigint)/);
    if (!isNumeric) return;
    return !!str.match(/unsigned$/);
};
const sqlColumnTransform = (rows)=>{
    if (!rows) return [];
    const columns = [];
    for (const row of rows){
        if (!isSqlColumnRow(row)) continue;
        columns.push({
            name: row.Field,
            dataType: extractDataType(row.Type),
            dataLength: extractDataLength(row.Type),
            unsigned: extractSign(row.Type),
            nullable: row.IS_NULLABLE === "YES",
            default: row.Default ?? undefined,
            comment: row.Comment ?? undefined,
            collation: row.Collation ?? undefined,
            key: row.Key
        });
    }
    return columns;
};
const store1 = (key, value)=>{
    sessionStorage.setItem(key, JSON.stringify(value));
};
const retrieve1 = (key, typeguard)=>{
    const raw = sessionStorage.getItem(key);
    if (!raw) return;
    let json;
    try {
        json = JSON.parse(raw);
    } catch (err) {
        console.warn(err);
        return;
    }
    if (typeguard(json)) {
        return json;
    }
};
const useSessionState = (key, initial)=>{
    const state = qe(()=>retrieve1(key, (_v)=>true
        ) ?? initial
    );
    xe(()=>store1(key, state[0])
    , [
        state[0]
    ]);
    return state;
};
const Tabs = ({ children , onNewTab , onCloseTab , selectedTabState , style  })=>{
    const [selectedTab, setSelectedTab] = selectedTabState ?? qe(0);
    const childrenArr = Ae(()=>export_default4.Children.toArray(children)
    , [
        children
    ]);
    const actualSelectedTab = Math.min(selectedTab, childrenArr.length - 1);
    const tabLabelBase = {
        padding: 8,
        fontSize: 14,
        cursor: "pointer"
    };
    const labels = Ae(()=>{
        const labels = [];
        childrenArr.forEach((child, i)=>{
            if (export_default4.isValidElement(child) && child.props.label) {
                labels.push(export_default4.createElement("span", {
                    onClick: ()=>setSelectedTab(i)
                    ,
                    style: {
                        display: "inline-flex",
                        alignItems: "center",
                        ...tabLabelBase,
                        ...theme.tabs.label.base,
                        ...i === actualSelectedTab ? theme.tabs.label.selected : undefined
                    }
                }, export_default4.createElement("span", null, child.props.label), onCloseTab && child.props.canClose !== false && export_default4.createElement("span", {
                    title: "Close (⌥W)",
                    style: {
                        fontSize: 10,
                        opacity: 0.6,
                        padding: 4,
                        ...theme.tabs.label.close
                    },
                    onClick: (e)=>{
                        onCloseTab(i);
                        e.preventDefault();
                        e.stopPropagation();
                    }
                }, "✕")));
            }
        });
        return labels;
    }, [
        childrenArr,
        actualSelectedTab
    ]);
    return export_default4.createElement("div", {
        style: {
            display: "flex",
            flexGrow: 1,
            flexDirection: "column",
            maxHeight: "100%",
            ...theme.tabs.container,
            ...style
        }
    }, export_default4.createElement("div", {
        style: {
            display: "flex"
        }
    }, labels.map((l, i)=>export_default4.createElement(export_default4.Fragment, {
            key: i
        }, l)
    ), onNewTab && export_default4.createElement("span", {
        title: "New query (⌥T)",
        style: {
            ...tabLabelBase,
            ...theme.tabs.label.base,
            borderRightWidth: 0,
            fontWeight: "bold",
            backgroundColor: "transparent",
            ...theme.tabs.newTab
        },
        onClick: ()=>{
            onNewTab();
            setSelectedTab(childrenArr.length);
        }
    }, "+"), export_default4.createElement("span", {
        style: {
            flexGrow: 1,
            cursor: undefined
        }
    })), export_default4.createElement("div", {
        style: {
            flexGrow: 1,
            overflow: "auto",
            ...theme.tabs.content
        }
    }, childrenArr[actualSelectedTab]));
};
const Input = export_default4.forwardRef((props, ref)=>export_default4.createElement("input", Object.assign({
    }, props, {
        ref: ref,
        style: {
            width: "13em",
            padding: 2,
            fontSize: "80%",
            ...props.style,
            ...theme.input
        }
    }))
);
const InputRow = ({ label , children , style  })=>export_default4.createElement("div", {
        style: {
            marginLeft: "1em",
            display: "flex",
            ...style
        }
    }, export_default4.createElement("label", {
        style: {
            display: "inline-block",
            width: "8em",
            verticalAlign: "top"
        }
    }, label), children)
;
const TextArea = (props)=>export_default4.createElement("textarea", Object.assign({
    }, props, {
        style: {
            width: "13em",
            resize: "none",
            font: "inherit",
            fontSize: "80%",
            ...props.style,
            ...theme.input
        }
    }))
;
const BasicTab = ({ data , onChange  })=>export_default4.createElement("div", {
        style: {
            height: "100%",
            display: "flex",
            flexDirection: "column"
        }
    }, export_default4.createElement(InputRow, {
        label: "Name",
        style: {
            marginTop: "0.25em",
            marginBottom: "0.25em"
        }
    }, export_default4.createElement(Input, {
        style: {
            flexGrow: 1
        },
        value: data.name,
        onInput: (e)=>onChange({
                name: e.currentTarget.value
            })
    })), export_default4.createElement(InputRow, {
        label: "Comment",
        style: {
            flexGrow: 1,
            marginBottom: "0.25em"
        }
    }, export_default4.createElement(TextArea, {
        style: {
            flexGrow: 1
        },
        rows: 5,
        value: data.comment,
        onInput: (e)=>onChange({
                comment: e.currentTarget.value
            })
    })))
;
const OptionsTab = ({ data  })=>export_default4.createElement("div", {
        style: {
            height: "100%",
            display: "flex",
            flexDirection: "column"
        }
    }, export_default4.createElement(InputRow, {
        label: "Auto increment",
        style: {
            marginTop: "0.25em",
            marginBottom: "0.25em"
        }
    }, export_default4.createElement(Input, {
        style: {
            flexGrow: 1
        },
        value: data.autoIncrement,
        type: "number"
    })), export_default4.createElement(InputRow, {
        label: "Checksum",
        style: {
            marginBottom: "0.25em"
        }
    }, export_default4.createElement(Input, {
        checked: data.checksum,
        type: "checkbox",
        style: {
            width: undefined,
            padding: 0,
            margin: "3px 0"
        }
    })), export_default4.createElement(InputRow, {
        label: "Row format",
        style: {
            marginBottom: "0.25em"
        }
    }, export_default4.createElement(Input, {
        style: {
            flexGrow: 1
        },
        value: data.rowFormat
    })), export_default4.createElement(InputRow, {
        label: "Default collation",
        style: {
            marginBottom: "0.25em"
        }
    }, export_default4.createElement(Input, {
        style: {
            flexGrow: 1
        },
        value: data.defaultCollation
    })), export_default4.createElement(InputRow, {
        label: "Engine",
        style: {
            marginBottom: "0.25em"
        }
    }, export_default4.createElement(Input, {
        style: {
            flexGrow: 1
        },
        value: data.engine
    })))
;
var Vt4 = Object.create;
var ue7 = Object.defineProperty;
var Yt3 = Object.getOwnPropertyDescriptor;
var bt3 = Object.getOwnPropertyNames;
var kt3 = Object.getPrototypeOf, Xt2 = Object.prototype.hasOwnProperty;
var wt3 = (e)=>ue7(e, "__esModule", {
        value: !0
    })
;
var R13 = (e, E)=>()=>(E || e((E = {
            exports: {
            }
        }).exports, E), E.exports)
;
var Kt3 = (e, E, t)=>{
    if (E && typeof E == "object" || typeof E == "function") for (let r of bt3(E))!Xt2.call(e, r) && r !== "default" && ue7(e, r, {
        get: ()=>E[r]
        ,
        enumerable: !(t = Yt3(E, r)) || t.enumerable
    });
    return e;
}, he5 = (e)=>Kt3(wt3(ue7(e != null ? Vt4(kt3(e)) : {
    }, "default", e && e.__esModule && "default" in e ? {
        get: ()=>e.default
        ,
        enumerable: !0
    } : {
        value: e,
        enumerable: !0
    })), e)
;
var f9 = R13((P, Fe)=>{
    "use strict";
    Object.defineProperty(P, "__esModule", {
        value: !0
    });
    P.default = void 0;
    var Jt = {
        WORD: "word",
        STRING: "string",
        RESERVED: "reserved",
        RESERVED_TOP_LEVEL: "reserved-top-level",
        RESERVED_TOP_LEVEL_NO_INDENT: "reserved-top-level-no-indent",
        RESERVED_NEWLINE: "reserved-newline",
        OPERATOR: "operator",
        OPEN_PAREN: "open-paren",
        CLOSE_PAREN: "close-paren",
        LINE_COMMENT: "line-comment",
        BLOCK_COMMENT: "block-comment",
        NUMBER: "number",
        PLACEHOLDER: "placeholder"
    };
    P.default = Jt;
    Fe.exports = P.default;
});
var _14 = R13((i)=>{
    "use strict";
    Object.defineProperty(i, "__esModule", {
        value: !0
    });
    i.sortByLengthDesc = i.escapeRegExp = i.isEmpty = i.last = i.trimSpacesEnd = void 0;
    var xt = function(E) {
        return E.replace(/[\t ]+$/, "");
    };
    i.trimSpacesEnd = xt;
    var qt = function(E) {
        return E[E.length - 1];
    };
    i.last = qt;
    var Qt = function(E) {
        return !Array.isArray(E) || E.length === 0;
    };
    i.isEmpty = Qt;
    var Zt = function(E) {
        return E.replace(/[\$\(-\+\.\?\[-\^\{-\}]/g, "\\$&");
    };
    i.escapeRegExp = Zt;
    var zt = function(E) {
        return E.sort(function(t, r) {
            return r.length - t.length || t.localeCompare(r);
        });
    };
    i.sortByLengthDesc = zt;
});
var ge5 = R13((p, me)=>{
    "use strict";
    Object.defineProperty(p, "__esModule", {
        value: !0
    });
    p.default = void 0;
    var $t = _14();
    function jt(e, E) {
        if (!(e instanceof E)) throw new TypeError("Cannot call a class as a function");
    }
    function Ge(e, E) {
        for(var t = 0; t < E.length; t++){
            var r = E[t];
            r.enumerable = r.enumerable || !1, r.configurable = !0, "value" in r && (r.writable = !0), Object.defineProperty(e, r.key, r);
        }
    }
    function eE(e, E, t) {
        return E && Ge(e.prototype, E), t && Ge(e, t), e;
    }
    var Se = "top-level", tE = "block-level", EE = function() {
        function e(E) {
            jt(this, e), this.indent = E || "  ", this.indentTypes = [];
        }
        return eE(e, [
            {
                key: "getIndent",
                value: function() {
                    return this.indent.repeat(this.indentTypes.length);
                }
            },
            {
                key: "increaseTopLevel",
                value: function() {
                    this.indentTypes.push(Se);
                }
            },
            {
                key: "increaseBlockLevel",
                value: function() {
                    this.indentTypes.push(tE);
                }
            },
            {
                key: "decreaseTopLevel",
                value: function() {
                    this.indentTypes.length > 0 && (0, $t.last)(this.indentTypes) === Se && this.indentTypes.pop();
                }
            },
            {
                key: "decreaseBlockLevel",
                value: function() {
                    for(; this.indentTypes.length > 0;){
                        var t = this.indentTypes.pop();
                        if (t !== Se) break;
                    }
                }
            },
            {
                key: "resetIndentation",
                value: function() {
                    this.indentTypes = [];
                }
            }
        ]), e;
    }();
    p.default = EE;
    me.exports = p.default;
});
var We = R13((d, He)=>{
    "use strict";
    Object.defineProperty(d, "__esModule", {
        value: !0
    });
    d.default = void 0;
    var c = rE(f9());
    function rE(e) {
        return e && e.__esModule ? e : {
            default: e
        };
    }
    function nE(e, E) {
        if (!(e instanceof E)) throw new TypeError("Cannot call a class as a function");
    }
    function Be(e, E) {
        for(var t = 0; t < E.length; t++){
            var r = E[t];
            r.enumerable = r.enumerable || !1, r.configurable = !0, "value" in r && (r.writable = !0), Object.defineProperty(e, r.key, r);
        }
    }
    function TE(e, E, t) {
        return E && Be(e.prototype, E), t && Be(e, t), e;
    }
    var RE = 50, NE = function() {
        function e() {
            nE(this, e), this.level = 0;
        }
        return TE(e, [
            {
                key: "beginIfPossible",
                value: function(t, r) {
                    this.level === 0 && this.isInlineBlock(t, r) ? this.level = 1 : this.level > 0 ? this.level++ : this.level = 0;
                }
            },
            {
                key: "end",
                value: function() {
                    this.level--;
                }
            },
            {
                key: "isActive",
                value: function() {
                    return this.level > 0;
                }
            },
            {
                key: "isInlineBlock",
                value: function(t, r) {
                    for(var n = 0, T = 0, o = r; o < t.length; o++){
                        var b = t[o];
                        if (n += b.value.length, n > RE) return !1;
                        if (b.type === c.default.OPEN_PAREN) T++;
                        else if (b.type === c.default.CLOSE_PAREN && (T--, T === 0)) return !0;
                        if (this.isForbiddenToken(b)) return !1;
                    }
                    return !1;
                }
            },
            {
                key: "isForbiddenToken",
                value: function(t) {
                    var r = t.type, n = t.value;
                    return r === c.default.RESERVED_TOP_LEVEL || r === c.default.RESERVED_NEWLINE || r === c.default.COMMENT || r === c.default.BLOCK_COMMENT || n === ";";
                }
            }
        ]), e;
    }();
    d.default = NE;
    He.exports = d.default;
});
var be2 = R13((M, Ye)=>{
    "use strict";
    Object.defineProperty(M, "__esModule", {
        value: !0
    });
    M.default = void 0;
    function oE(e, E) {
        if (!(e instanceof E)) throw new TypeError("Cannot call a class as a function");
    }
    function Ve(e, E) {
        for(var t = 0; t < E.length; t++){
            var r = E[t];
            r.enumerable = r.enumerable || !1, r.configurable = !0, "value" in r && (r.writable = !0), Object.defineProperty(e, r.key, r);
        }
    }
    function IE(e, E, t) {
        return E && Ve(e.prototype, E), t && Ve(e, t), e;
    }
    var OE = function() {
        function e(E) {
            oE(this, e), this.params = E, this.index = 0;
        }
        return IE(e, [
            {
                key: "get",
                value: function(t) {
                    var r = t.key, n = t.value;
                    return this.params ? r ? this.params[r] : this.params[this.index++] : n;
                }
            }
        ]), e;
    }();
    M.default = OE;
    Ye.exports = M.default;
});
var k8 = R13((I)=>{
    "use strict";
    Object.defineProperty(I, "__esModule", {
        value: !0
    });
    I.isEnd = I.isWindow = I.isBy = I.isSet = I.isLimit = I.isBetween = I.isAnd = void 0;
    var l = AE(f9());
    function AE(e) {
        return e && e.__esModule ? e : {
            default: e
        };
    }
    var C = function(E, t) {
        return function(r) {
            return (r == null ? void 0 : r.type) === E && t.test(r == null ? void 0 : r.value);
        };
    }, iE = C(l.default.RESERVED_NEWLINE, /^AND$/i);
    I.isAnd = iE;
    var uE = C(l.default.RESERVED, /^BETWEEN$/i);
    I.isBetween = uE;
    var SE = C(l.default.RESERVED_TOP_LEVEL, /^LIMIT$/i);
    I.isLimit = SE;
    var aE = C(l.default.RESERVED_TOP_LEVEL, /^[S\u017F]ET$/i);
    I.isSet = aE;
    var LE = C(l.default.RESERVED, /^BY$/i);
    I.isBy = LE;
    var fE = C(l.default.RESERVED_TOP_LEVEL, /^WINDOW$/i);
    I.isWindow = fE;
    var lE = C(l.default.CLOSE_PAREN, /^END$/i);
    I.isEnd = lE;
});
var u5 = R13((y, Xe)=>{
    "use strict";
    Object.defineProperty(y, "__esModule", {
        value: !0
    });
    y.default = void 0;
    var N = X(f9()), CE = X(ge5()), sE = X(We()), cE = X(be2()), D = _14(), ae = k8();
    function X(e) {
        return e && e.__esModule ? e : {
            default: e
        };
    }
    function Le(e, E, t) {
        return E in e ? Object.defineProperty(e, E, {
            value: t,
            enumerable: !0,
            configurable: !0,
            writable: !0
        }) : e[E] = t, e;
    }
    function DE(e, E) {
        if (!(e instanceof E)) throw new TypeError("Cannot call a class as a function");
    }
    function ke(e, E) {
        for(var t = 0; t < E.length; t++){
            var r = E[t];
            r.enumerable = r.enumerable || !1, r.configurable = !0, "value" in r && (r.writable = !0), Object.defineProperty(e, r.key, r);
        }
    }
    function UE(e, E, t) {
        return E && ke(e.prototype, E), t && ke(e, t), e;
    }
    var PE = function() {
        function e(E) {
            DE(this, e), this.cfg = E, this.indentation = new CE.default(this.cfg.indent), this.inlineBlock = new sE.default, this.params = new cE.default(this.cfg.params), this.previousReservedToken = {
            }, this.tokens = [], this.index = 0;
        }
        return UE(e, [
            {
                key: "tokenizer",
                value: function() {
                    throw new Error("tokenizer() not implemented by subclass");
                }
            },
            {
                key: "tokenOverride",
                value: function(t) {
                    return t;
                }
            },
            {
                key: "format",
                value: function(t) {
                    this.tokens = this.tokenizer().tokenize(t);
                    var r = this.getFormattedQueryFromTokens();
                    return r.trim();
                }
            },
            {
                key: "getFormattedQueryFromTokens",
                value: function() {
                    var t = this, r = "";
                    return this.tokens.forEach(function(n, T) {
                        t.index = T, n = t.tokenOverride(n), n.type === N.default.LINE_COMMENT ? r = t.formatLineComment(n, r) : n.type === N.default.BLOCK_COMMENT ? r = t.formatBlockComment(n, r) : n.type === N.default.RESERVED_TOP_LEVEL ? (r = t.formatTopLevelReservedWord(n, r), t.previousReservedToken = n) : n.type === N.default.RESERVED_TOP_LEVEL_NO_INDENT ? (r = t.formatTopLevelReservedWordNoIndent(n, r), t.previousReservedToken = n) : n.type === N.default.RESERVED_NEWLINE ? (r = t.formatNewlineReservedWord(n, r), t.previousReservedToken = n) : n.type === N.default.RESERVED ? (r = t.formatWithSpaces(n, r), t.previousReservedToken = n) : n.type === N.default.OPEN_PAREN ? r = t.formatOpeningParentheses(n, r) : n.type === N.default.CLOSE_PAREN ? r = t.formatClosingParentheses(n, r) : n.type === N.default.PLACEHOLDER ? r = t.formatPlaceholder(n, r) : n.value === "," ? r = t.formatComma(n, r) : n.value === ":" ? r = t.formatWithSpaceAfter(n, r) : n.value === "." ? r = t.formatWithoutSpaces(n, r) : n.value === ";" ? r = t.formatQuerySeparator(n, r) : r = t.formatWithSpaces(n, r);
                    }), r;
                }
            },
            {
                key: "formatLineComment",
                value: function(t, r) {
                    return this.addNewline(r + this.show(t));
                }
            },
            {
                key: "formatBlockComment",
                value: function(t, r) {
                    return this.addNewline(this.addNewline(r) + this.indentComment(t.value));
                }
            },
            {
                key: "indentComment",
                value: function(t) {
                    return t.replace(/\n[\t ]*/g, `
` + this.indentation.getIndent() + " ");
                }
            },
            {
                key: "formatTopLevelReservedWordNoIndent",
                value: function(t, r) {
                    return this.indentation.decreaseTopLevel(), r = this.addNewline(r) + this.equalizeWhitespace(this.show(t)), this.addNewline(r);
                }
            },
            {
                key: "formatTopLevelReservedWord",
                value: function(t, r) {
                    return this.indentation.decreaseTopLevel(), r = this.addNewline(r), this.indentation.increaseTopLevel(), r += this.equalizeWhitespace(this.show(t)), this.addNewline(r);
                }
            },
            {
                key: "formatNewlineReservedWord",
                value: function(t, r) {
                    return (0, ae.isAnd)(t) && (0, ae.isBetween)(this.tokenLookBehind(2)) ? this.formatWithSpaces(t, r) : this.addNewline(r) + this.equalizeWhitespace(this.show(t)) + " ";
                }
            },
            {
                key: "equalizeWhitespace",
                value: function(t) {
                    return t.replace(/[\t-\r \xA0\u1680\u2000-\u200A\u2028\u2029\u202F\u205F\u3000\uFEFF]+/g, " ");
                }
            },
            {
                key: "formatOpeningParentheses",
                value: function(t, r) {
                    var n, T, o = (n = {
                    }, Le(n, N.default.OPEN_PAREN, !0), Le(n, N.default.LINE_COMMENT, !0), Le(n, N.default.OPERATOR, !0), n);
                    return t.whitespaceBefore.length === 0 && !o[(T = this.tokenLookBehind()) === null || T === void 0 ? void 0 : T.type] && (r = (0, D.trimSpacesEnd)(r)), r += this.show(t), this.inlineBlock.beginIfPossible(this.tokens, this.index), this.inlineBlock.isActive() || (this.indentation.increaseBlockLevel(), r = this.addNewline(r)), r;
                }
            },
            {
                key: "formatClosingParentheses",
                value: function(t, r) {
                    return this.inlineBlock.isActive() ? (this.inlineBlock.end(), this.formatWithSpaceAfter(t, r)) : (this.indentation.decreaseBlockLevel(), this.formatWithSpaces(t, this.addNewline(r)));
                }
            },
            {
                key: "formatPlaceholder",
                value: function(t, r) {
                    return r + this.params.get(t) + " ";
                }
            },
            {
                key: "formatComma",
                value: function(t, r) {
                    return r = (0, D.trimSpacesEnd)(r) + this.show(t) + " ", this.inlineBlock.isActive() || (0, ae.isLimit)(this.previousReservedToken) ? r : this.addNewline(r);
                }
            },
            {
                key: "formatWithSpaceAfter",
                value: function(t, r) {
                    return (0, D.trimSpacesEnd)(r) + this.show(t) + " ";
                }
            },
            {
                key: "formatWithoutSpaces",
                value: function(t, r) {
                    return (0, D.trimSpacesEnd)(r) + this.show(t);
                }
            },
            {
                key: "formatWithSpaces",
                value: function(t, r) {
                    return r + this.show(t) + " ";
                }
            },
            {
                key: "formatQuerySeparator",
                value: function(t, r) {
                    return this.indentation.resetIndentation(), (0, D.trimSpacesEnd)(r) + this.show(t) + `
`.repeat(this.cfg.linesBetweenQueries || 1);
                }
            },
            {
                key: "show",
                value: function(t) {
                    var r = t.type, n = t.value;
                    return this.cfg.uppercase && (r === N.default.RESERVED || r === N.default.RESERVED_TOP_LEVEL || r === N.default.RESERVED_TOP_LEVEL_NO_INDENT || r === N.default.RESERVED_NEWLINE || r === N.default.OPEN_PAREN || r === N.default.CLOSE_PAREN) ? n.toUpperCase() : n;
                }
            },
            {
                key: "addNewline",
                value: function(t) {
                    return t = (0, D.trimSpacesEnd)(t), t.endsWith(`
`) || (t += `
`), t + this.indentation.getIndent();
                }
            },
            {
                key: "tokenLookBehind",
                value: function() {
                    var t = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : 1;
                    return this.tokens[this.index - t];
                }
            },
            {
                key: "tokenLookAhead",
                value: function() {
                    var t = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : 1;
                    return this.tokens[this.index + t];
                }
            }
        ]), e;
    }();
    y.default = PE;
    Xe.exports = y.default;
});
var Ke3 = R13((a)=>{
    "use strict";
    Object.defineProperty(a, "__esModule", {
        value: !0
    });
    a.createOperatorRegex = _E;
    a.createLineCommentRegex = pE;
    a.createReservedWordRegex = dE;
    a.createWordRegex = ME;
    a.createStringRegex = yE;
    a.createStringPattern = we;
    a.createParenRegex = vE;
    a.createPlaceholderRegex = FE;
    var s = _14();
    function _E(e) {
        return new RegExp("^(".concat((0, s.sortByLengthDesc)(e).map(s.escapeRegExp).join("|"), "|.)"), "u");
    }
    function pE(e) {
        return new RegExp("^((?:".concat(e.map(function(E) {
            return (0, s.escapeRegExp)(E);
        }).join("|"), `).*?)(?:\r
|\r|
|$)`), "u");
    }
    function dE(e) {
        if (e.length === 0) return new RegExp("^\b$", "u");
        var E = (0, s.sortByLengthDesc)(e).join("|").replace(/ /g, "\\s+");
        return new RegExp("^(".concat(E, ")\\b"), "iu");
    }
    function ME() {
        var e = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : [];
        return new RegExp("^([\\p{Alphabetic}\\p{Mark}\\p{Decimal_Number}\\p{Connector_Punctuation}\\p{Join_Control}".concat(e.join(""), "]+)"), "u");
    }
    function yE(e) {
        return new RegExp("^(" + we(e) + ")", "u");
    }
    function we(e) {
        var E = {
            "``": "((`[^`]*($|`))+)",
            "{}": "((\\{[^\\}]*($|\\}))+)",
            "[]": "((\\[[^\\]]*($|\\]))(\\][^\\]]*($|\\]))*)",
            '""': '(("[^"\\\\]*(?:\\\\.[^"\\\\]*)*("|$))+)',
            "''": "(('[^'\\\\]*(?:\\\\.[^'\\\\]*)*('|$))+)",
            "N''": "((N'[^'\\\\]*(?:\\\\.[^'\\\\]*)*('|$))+)",
            "U&''": "((U&'[^'\\\\]*(?:\\\\.[^'\\\\]*)*('|$))+)",
            'U&""': '((U&"[^"\\\\]*(?:\\\\.[^"\\\\]*)*("|$))+)',
            $$: "((?<tag>\\$\\w*\\$)[\\s\\S]*?(?:\\k<tag>|$))"
        };
        return e.map(function(t) {
            return E[t];
        }).join("|");
    }
    function vE(e) {
        return new RegExp("^(" + e.map(hE).join("|") + ")", "iu");
    }
    function hE(e) {
        return e.length === 1 ? (0, s.escapeRegExp)(e) : "\\b" + e + "\\b";
    }
    function FE(e, E) {
        if ((0, s.isEmpty)(e)) return !1;
        var t = e.map(s.escapeRegExp).join("|");
        return new RegExp("^((?:".concat(t, ")(?:").concat(E, "))"), "u");
    }
});
var S11 = R13((v, Ze)=>{
    "use strict";
    function w(e) {
        return typeof Symbol == "function" && typeof Symbol.iterator == "symbol" ? w = function(t) {
            return typeof t;
        } : w = function(t) {
            return t && typeof Symbol == "function" && t.constructor === Symbol && t !== Symbol.prototype ? "symbol" : typeof t;
        }, w(e);
    }
    Object.defineProperty(v, "__esModule", {
        value: !0
    });
    v.default = void 0;
    var A = gE(f9()), O = mE(Ke3()), GE = _14();
    function Je() {
        if (typeof WeakMap != "function") return null;
        var e = new WeakMap;
        return Je = function() {
            return e;
        }, e;
    }
    function mE(e) {
        if (e && e.__esModule) return e;
        if (e === null || w(e) !== "object" && typeof e != "function") return {
            default: e
        };
        var E = Je();
        if (E && E.has(e)) return E.get(e);
        var t = {
        }, r = Object.defineProperty && Object.getOwnPropertyDescriptor;
        for(var n in e)if (Object.prototype.hasOwnProperty.call(e, n)) {
            var T = r ? Object.getOwnPropertyDescriptor(e, n) : null;
            T && (T.get || T.set) ? Object.defineProperty(t, n, T) : t[n] = e[n];
        }
        return t.default = e, E && E.set(e, t), t;
    }
    function gE(e) {
        return e && e.__esModule ? e : {
            default: e
        };
    }
    function xe(e, E) {
        var t = Object.keys(e);
        if (Object.getOwnPropertySymbols) {
            var r = Object.getOwnPropertySymbols(e);
            E && (r = r.filter(function(n) {
                return Object.getOwnPropertyDescriptor(e, n).enumerable;
            })), t.push.apply(t, r);
        }
        return t;
    }
    function qe(e) {
        for(var E = 1; E < arguments.length; E++){
            var t = arguments[E] != null ? arguments[E] : {
            };
            E % 2 ? xe(Object(t), !0).forEach(function(r) {
                BE(e, r, t[r]);
            }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : xe(Object(t)).forEach(function(r) {
                Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r));
            });
        }
        return e;
    }
    function BE(e, E, t) {
        return E in e ? Object.defineProperty(e, E, {
            value: t,
            enumerable: !0,
            configurable: !0,
            writable: !0
        }) : e[E] = t, e;
    }
    function HE(e) {
        return bE(e) || YE(e) || VE(e) || WE();
    }
    function WE() {
        throw new TypeError(`Invalid attempt to spread non-iterable instance.
In order to be iterable, non-array objects must have a [Symbol.iterator]() method.`);
    }
    function VE(e, E) {
        if (!!e) {
            if (typeof e == "string") return fe(e, E);
            var t = Object.prototype.toString.call(e).slice(8, -1);
            if (t === "Object" && e.constructor && (t = e.constructor.name), t === "Map" || t === "Set") return Array.from(e);
            if (t === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t)) return fe(e, E);
        }
    }
    function YE(e) {
        if (typeof Symbol != "undefined" && Symbol.iterator in Object(e)) return Array.from(e);
    }
    function bE(e) {
        if (Array.isArray(e)) return fe(e);
    }
    function fe(e, E) {
        (E == null || E > e.length) && (E = e.length);
        for(var t = 0, r = new Array(E); t < E; t++)r[t] = e[t];
        return r;
    }
    function kE(e, E) {
        if (!(e instanceof E)) throw new TypeError("Cannot call a class as a function");
    }
    function Qe(e, E) {
        for(var t = 0; t < E.length; t++){
            var r = E[t];
            r.enumerable = r.enumerable || !1, r.configurable = !0, "value" in r && (r.writable = !0), Object.defineProperty(e, r.key, r);
        }
    }
    function XE(e, E, t) {
        return E && Qe(e.prototype, E), t && Qe(e, t), e;
    }
    var wE = function() {
        function e(E) {
            kE(this, e), this.WHITESPACE_REGEX = /^([\t-\r \xA0\u1680\u2000-\u200A\u2028\u2029\u202F\u205F\u3000\uFEFF]+)/, this.NUMBER_REGEX = /^((\x2D[\t-\r \xA0\u1680\u2000-\u200A\u2028\u2029\u202F\u205F\u3000\uFEFF]*)?[0-9]+(\.[0-9]+)?([Ee]\x2D?[0-9]+(\.[0-9]+)?)?|0x[0-9A-Fa-f]+|0b[01]+)\b/, this.OPERATOR_REGEX = O.createOperatorRegex([
                "<>",
                "<=",
                ">="
            ].concat(HE(E.operators || []))), this.BLOCK_COMMENT_REGEX = /^(\/\*(?:(?![])[\s\S])*?(?:\*\/|$))/, this.LINE_COMMENT_REGEX = O.createLineCommentRegex(E.lineCommentTypes), this.RESERVED_TOP_LEVEL_REGEX = O.createReservedWordRegex(E.reservedTopLevelWords), this.RESERVED_TOP_LEVEL_NO_INDENT_REGEX = O.createReservedWordRegex(E.reservedTopLevelWordsNoIndent), this.RESERVED_NEWLINE_REGEX = O.createReservedWordRegex(E.reservedNewlineWords), this.RESERVED_PLAIN_REGEX = O.createReservedWordRegex(E.reservedWords), this.WORD_REGEX = O.createWordRegex(E.specialWordChars), this.STRING_REGEX = O.createStringRegex(E.stringTypes), this.OPEN_PAREN_REGEX = O.createParenRegex(E.openParens), this.CLOSE_PAREN_REGEX = O.createParenRegex(E.closeParens), this.INDEXED_PLACEHOLDER_REGEX = O.createPlaceholderRegex(E.indexedPlaceholderTypes, "[0-9]*"), this.IDENT_NAMED_PLACEHOLDER_REGEX = O.createPlaceholderRegex(E.namedPlaceholderTypes, "[a-zA-Z0-9._$]+"), this.STRING_NAMED_PLACEHOLDER_REGEX = O.createPlaceholderRegex(E.namedPlaceholderTypes, O.createStringPattern(E.stringTypes));
        }
        return XE(e, [
            {
                key: "tokenize",
                value: function(t) {
                    for(var r = [], n; t.length;){
                        var T = this.getWhitespace(t);
                        t = t.substring(T.length), t.length && (n = this.getNextToken(t, n), t = t.substring(n.value.length), r.push(qe(qe({
                        }, n), {
                        }, {
                            whitespaceBefore: T
                        })));
                    }
                    return r;
                }
            },
            {
                key: "getWhitespace",
                value: function(t) {
                    var r = t.match(this.WHITESPACE_REGEX);
                    return r ? r[1] : "";
                }
            },
            {
                key: "getNextToken",
                value: function(t, r) {
                    return this.getCommentToken(t) || this.getStringToken(t) || this.getOpenParenToken(t) || this.getCloseParenToken(t) || this.getPlaceholderToken(t) || this.getNumberToken(t) || this.getReservedWordToken(t, r) || this.getWordToken(t) || this.getOperatorToken(t);
                }
            },
            {
                key: "getCommentToken",
                value: function(t) {
                    return this.getLineCommentToken(t) || this.getBlockCommentToken(t);
                }
            },
            {
                key: "getLineCommentToken",
                value: function(t) {
                    return this.getTokenOnFirstMatch({
                        input: t,
                        type: A.default.LINE_COMMENT,
                        regex: this.LINE_COMMENT_REGEX
                    });
                }
            },
            {
                key: "getBlockCommentToken",
                value: function(t) {
                    return this.getTokenOnFirstMatch({
                        input: t,
                        type: A.default.BLOCK_COMMENT,
                        regex: this.BLOCK_COMMENT_REGEX
                    });
                }
            },
            {
                key: "getStringToken",
                value: function(t) {
                    return this.getTokenOnFirstMatch({
                        input: t,
                        type: A.default.STRING,
                        regex: this.STRING_REGEX
                    });
                }
            },
            {
                key: "getOpenParenToken",
                value: function(t) {
                    return this.getTokenOnFirstMatch({
                        input: t,
                        type: A.default.OPEN_PAREN,
                        regex: this.OPEN_PAREN_REGEX
                    });
                }
            },
            {
                key: "getCloseParenToken",
                value: function(t) {
                    return this.getTokenOnFirstMatch({
                        input: t,
                        type: A.default.CLOSE_PAREN,
                        regex: this.CLOSE_PAREN_REGEX
                    });
                }
            },
            {
                key: "getPlaceholderToken",
                value: function(t) {
                    return this.getIdentNamedPlaceholderToken(t) || this.getStringNamedPlaceholderToken(t) || this.getIndexedPlaceholderToken(t);
                }
            },
            {
                key: "getIdentNamedPlaceholderToken",
                value: function(t) {
                    return this.getPlaceholderTokenWithKey({
                        input: t,
                        regex: this.IDENT_NAMED_PLACEHOLDER_REGEX,
                        parseKey: function(n) {
                            return n.slice(1);
                        }
                    });
                }
            },
            {
                key: "getStringNamedPlaceholderToken",
                value: function(t) {
                    var r = this;
                    return this.getPlaceholderTokenWithKey({
                        input: t,
                        regex: this.STRING_NAMED_PLACEHOLDER_REGEX,
                        parseKey: function(T) {
                            return r.getEscapedPlaceholderKey({
                                key: T.slice(2, -1),
                                quoteChar: T.slice(-1)
                            });
                        }
                    });
                }
            },
            {
                key: "getIndexedPlaceholderToken",
                value: function(t) {
                    return this.getPlaceholderTokenWithKey({
                        input: t,
                        regex: this.INDEXED_PLACEHOLDER_REGEX,
                        parseKey: function(n) {
                            return n.slice(1);
                        }
                    });
                }
            },
            {
                key: "getPlaceholderTokenWithKey",
                value: function(t) {
                    var r = t.input, n = t.regex, T = t.parseKey, o = this.getTokenOnFirstMatch({
                        input: r,
                        regex: n,
                        type: A.default.PLACEHOLDER
                    });
                    return o && (o.key = T(o.value)), o;
                }
            },
            {
                key: "getEscapedPlaceholderKey",
                value: function(t) {
                    var r = t.key, n = t.quoteChar;
                    return r.replace(new RegExp((0, GE.escapeRegExp)("\\" + n), "gu"), n);
                }
            },
            {
                key: "getNumberToken",
                value: function(t) {
                    return this.getTokenOnFirstMatch({
                        input: t,
                        type: A.default.NUMBER,
                        regex: this.NUMBER_REGEX
                    });
                }
            },
            {
                key: "getOperatorToken",
                value: function(t) {
                    return this.getTokenOnFirstMatch({
                        input: t,
                        type: A.default.OPERATOR,
                        regex: this.OPERATOR_REGEX
                    });
                }
            },
            {
                key: "getReservedWordToken",
                value: function(t, r) {
                    if (!(r && r.value && r.value === ".")) return this.getTopLevelReservedToken(t) || this.getNewlineReservedToken(t) || this.getTopLevelReservedTokenNoIndent(t) || this.getPlainReservedToken(t);
                }
            },
            {
                key: "getTopLevelReservedToken",
                value: function(t) {
                    return this.getTokenOnFirstMatch({
                        input: t,
                        type: A.default.RESERVED_TOP_LEVEL,
                        regex: this.RESERVED_TOP_LEVEL_REGEX
                    });
                }
            },
            {
                key: "getNewlineReservedToken",
                value: function(t) {
                    return this.getTokenOnFirstMatch({
                        input: t,
                        type: A.default.RESERVED_NEWLINE,
                        regex: this.RESERVED_NEWLINE_REGEX
                    });
                }
            },
            {
                key: "getTopLevelReservedTokenNoIndent",
                value: function(t) {
                    return this.getTokenOnFirstMatch({
                        input: t,
                        type: A.default.RESERVED_TOP_LEVEL_NO_INDENT,
                        regex: this.RESERVED_TOP_LEVEL_NO_INDENT_REGEX
                    });
                }
            },
            {
                key: "getPlainReservedToken",
                value: function(t) {
                    return this.getTokenOnFirstMatch({
                        input: t,
                        type: A.default.RESERVED,
                        regex: this.RESERVED_PLAIN_REGEX
                    });
                }
            },
            {
                key: "getWordToken",
                value: function(t) {
                    return this.getTokenOnFirstMatch({
                        input: t,
                        type: A.default.WORD,
                        regex: this.WORD_REGEX
                    });
                }
            },
            {
                key: "getTokenOnFirstMatch",
                value: function(t) {
                    var r = t.input, n = t.type, T = t.regex, o = r.match(T);
                    return o ? {
                        type: n,
                        value: o[1]
                    } : void 0;
                }
            }
        ]), e;
    }();
    v.default = wE;
    Ze.exports = v.default;
});
var et7 = R13((h, je)=>{
    "use strict";
    function K(e) {
        return typeof Symbol == "function" && typeof Symbol.iterator == "symbol" ? K = function(t) {
            return typeof t;
        } : K = function(t) {
            return t && typeof Symbol == "function" && t.constructor === Symbol && t !== Symbol.prototype ? "symbol" : typeof t;
        }, K(e);
    }
    Object.defineProperty(h, "__esModule", {
        value: !0
    });
    h.default = void 0;
    var KE = ze(u5()), JE = ze(S11());
    function ze(e) {
        return e && e.__esModule ? e : {
            default: e
        };
    }
    function xE(e, E) {
        if (!(e instanceof E)) throw new TypeError("Cannot call a class as a function");
    }
    function $e(e, E) {
        for(var t = 0; t < E.length; t++){
            var r = E[t];
            r.enumerable = r.enumerable || !1, r.configurable = !0, "value" in r && (r.writable = !0), Object.defineProperty(e, r.key, r);
        }
    }
    function qE(e, E, t) {
        return E && $e(e.prototype, E), t && $e(e, t), e;
    }
    function QE(e, E) {
        if (typeof E != "function" && E !== null) throw new TypeError("Super expression must either be null or a function");
        e.prototype = Object.create(E && E.prototype, {
            constructor: {
                value: e,
                writable: !0,
                configurable: !0
            }
        }), E && le(e, E);
    }
    function le(e, E) {
        return le = Object.setPrototypeOf || function(r, n) {
            return r.__proto__ = n, r;
        }, le(e, E);
    }
    function ZE(e) {
        var E = jE();
        return function() {
            var r = J(e), n;
            if (E) {
                var T = J(this).constructor;
                n = Reflect.construct(r, arguments, T);
            } else n = r.apply(this, arguments);
            return zE(this, n);
        };
    }
    function zE(e, E) {
        return E && (K(E) === "object" || typeof E == "function") ? E : $E(e);
    }
    function $E(e) {
        if (e === void 0) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
        return e;
    }
    function jE() {
        if (typeof Reflect == "undefined" || !Reflect.construct || Reflect.construct.sham) return !1;
        if (typeof Proxy == "function") return !0;
        try {
            return Date.prototype.toString.call(Reflect.construct(Date, [], function() {
            })), !0;
        } catch (e) {
            return !1;
        }
    }
    function J(e) {
        return J = Object.setPrototypeOf ? Object.getPrototypeOf : function(t) {
            return t.__proto__ || Object.getPrototypeOf(t);
        }, J(e);
    }
    var er = [
        "ABS",
        "ACTIVATE",
        "ALIAS",
        "ALL",
        "ALLOCATE",
        "ALLOW",
        "ALTER",
        "ANY",
        "ARE",
        "ARRAY",
        "AS",
        "ASC",
        "ASENSITIVE",
        "ASSOCIATE",
        "ASUTIME",
        "ASYMMETRIC",
        "AT",
        "ATOMIC",
        "ATTRIBUTES",
        "AUDIT",
        "AUTHORIZATION",
        "AUX",
        "AUXILIARY",
        "AVG",
        "BEFORE",
        "BEGIN",
        "BETWEEN",
        "BIGINT",
        "BINARY",
        "BLOB",
        "BOOLEAN",
        "BOTH",
        "BUFFERPOOL",
        "BY",
        "CACHE",
        "CALL",
        "CALLED",
        "CAPTURE",
        "CARDINALITY",
        "CASCADED",
        "CASE",
        "CAST",
        "CCSID",
        "CEIL",
        "CEILING",
        "CHAR",
        "CHARACTER",
        "CHARACTER_LENGTH",
        "CHAR_LENGTH",
        "CHECK",
        "CLOB",
        "CLONE",
        "CLOSE",
        "CLUSTER",
        "COALESCE",
        "COLLATE",
        "COLLECT",
        "COLLECTION",
        "COLLID",
        "COLUMN",
        "COMMENT",
        "COMMIT",
        "CONCAT",
        "CONDITION",
        "CONNECT",
        "CONNECTION",
        "CONSTRAINT",
        "CONTAINS",
        "CONTINUE",
        "CONVERT",
        "CORR",
        "CORRESPONDING",
        "COUNT",
        "COUNT_BIG",
        "COVAR_POP",
        "COVAR_SAMP",
        "CREATE",
        "CROSS",
        "CUBE",
        "CUME_DIST",
        "CURRENT",
        "CURRENT_DATE",
        "CURRENT_DEFAULT_TRANSFORM_GROUP",
        "CURRENT_LC_CTYPE",
        "CURRENT_PATH",
        "CURRENT_ROLE",
        "CURRENT_SCHEMA",
        "CURRENT_SERVER",
        "CURRENT_TIME",
        "CURRENT_TIMESTAMP",
        "CURRENT_TIMEZONE",
        "CURRENT_TRANSFORM_GROUP_FOR_TYPE",
        "CURRENT_USER",
        "CURSOR",
        "CYCLE",
        "DATA",
        "DATABASE",
        "DATAPARTITIONNAME",
        "DATAPARTITIONNUM",
        "DATE",
        "DAY",
        "DAYS",
        "DB2GENERAL",
        "DB2GENRL",
        "DB2SQL",
        "DBINFO",
        "DBPARTITIONNAME",
        "DBPARTITIONNUM",
        "DEALLOCATE",
        "DEC",
        "DECIMAL",
        "DECLARE",
        "DEFAULT",
        "DEFAULTS",
        "DEFINITION",
        "DELETE",
        "DENSERANK",
        "DENSE_RANK",
        "DEREF",
        "DESCRIBE",
        "DESCRIPTOR",
        "DETERMINISTIC",
        "DIAGNOSTICS",
        "DISABLE",
        "DISALLOW",
        "DISCONNECT",
        "DISTINCT",
        "DO",
        "DOCUMENT",
        "DOUBLE",
        "DROP",
        "DSSIZE",
        "DYNAMIC",
        "EACH",
        "EDITPROC",
        "ELEMENT",
        "ELSE",
        "ELSEIF",
        "ENABLE",
        "ENCODING",
        "ENCRYPTION",
        "END",
        "END-EXEC",
        "ENDING",
        "ERASE",
        "ESCAPE",
        "EVERY",
        "EXCEPTION",
        "EXCLUDING",
        "EXCLUSIVE",
        "EXEC",
        "EXECUTE",
        "EXISTS",
        "EXIT",
        "EXP",
        "EXPLAIN",
        "EXTENDED",
        "EXTERNAL",
        "EXTRACT",
        "FALSE",
        "FENCED",
        "FETCH",
        "FIELDPROC",
        "FILE",
        "FILTER",
        "FINAL",
        "FIRST",
        "FLOAT",
        "FLOOR",
        "FOR",
        "FOREIGN",
        "FREE",
        "FULL",
        "FUNCTION",
        "FUSION",
        "GENERAL",
        "GENERATED",
        "GET",
        "GLOBAL",
        "GOTO",
        "GRANT",
        "GRAPHIC",
        "GROUP",
        "GROUPING",
        "HANDLER",
        "HASH",
        "HASHED_VALUE",
        "HINT",
        "HOLD",
        "HOUR",
        "HOURS",
        "IDENTITY",
        "IF",
        "IMMEDIATE",
        "IN",
        "INCLUDING",
        "INCLUSIVE",
        "INCREMENT",
        "INDEX",
        "INDICATOR",
        "INDICATORS",
        "INF",
        "INFINITY",
        "INHERIT",
        "INNER",
        "INOUT",
        "INSENSITIVE",
        "INSERT",
        "INT",
        "INTEGER",
        "INTEGRITY",
        "INTERSECTION",
        "INTERVAL",
        "INTO",
        "IS",
        "ISOBID",
        "ISOLATION",
        "ITERATE",
        "JAR",
        "JAVA",
        "KEEP",
        "KEY",
        "LABEL",
        "LANGUAGE",
        "LARGE",
        "LATERAL",
        "LC_CTYPE",
        "LEADING",
        "LEAVE",
        "LEFT",
        "LIKE",
        "LINKTYPE",
        "LN",
        "LOCAL",
        "LOCALDATE",
        "LOCALE",
        "LOCALTIME",
        "LOCALTIMESTAMP",
        "LOCATOR",
        "LOCATORS",
        "LOCK",
        "LOCKMAX",
        "LOCKSIZE",
        "LONG",
        "LOOP",
        "LOWER",
        "MAINTAINED",
        "MATCH",
        "MATERIALIZED",
        "MAX",
        "MAXVALUE",
        "MEMBER",
        "MERGE",
        "METHOD",
        "MICROSECOND",
        "MICROSECONDS",
        "MIN",
        "MINUTE",
        "MINUTES",
        "MINVALUE",
        "MOD",
        "MODE",
        "MODIFIES",
        "MODULE",
        "MONTH",
        "MONTHS",
        "MULTISET",
        "NAN",
        "NATIONAL",
        "NATURAL",
        "NCHAR",
        "NCLOB",
        "NEW",
        "NEW_TABLE",
        "NEXTVAL",
        "NO",
        "NOCACHE",
        "NOCYCLE",
        "NODENAME",
        "NODENUMBER",
        "NOMAXVALUE",
        "NOMINVALUE",
        "NONE",
        "NOORDER",
        "NORMALIZE",
        "NORMALIZED",
        "NOT",
        "NULL",
        "NULLIF",
        "NULLS",
        "NUMERIC",
        "NUMPARTS",
        "OBID",
        "OCTET_LENGTH",
        "OF",
        "OFFSET",
        "OLD",
        "OLD_TABLE",
        "ON",
        "ONLY",
        "OPEN",
        "OPTIMIZATION",
        "OPTIMIZE",
        "OPTION",
        "ORDER",
        "OUT",
        "OUTER",
        "OVER",
        "OVERLAPS",
        "OVERLAY",
        "OVERRIDING",
        "PACKAGE",
        "PADDED",
        "PAGESIZE",
        "PARAMETER",
        "PART",
        "PARTITION",
        "PARTITIONED",
        "PARTITIONING",
        "PARTITIONS",
        "PASSWORD",
        "PATH",
        "PERCENTILE_CONT",
        "PERCENTILE_DISC",
        "PERCENT_RANK",
        "PIECESIZE",
        "PLAN",
        "POSITION",
        "POWER",
        "PRECISION",
        "PREPARE",
        "PREVVAL",
        "PRIMARY",
        "PRIQTY",
        "PRIVILEGES",
        "PROCEDURE",
        "PROGRAM",
        "PSID",
        "PUBLIC",
        "QUERY",
        "QUERYNO",
        "RANGE",
        "RANK",
        "READ",
        "READS",
        "REAL",
        "RECOVERY",
        "RECURSIVE",
        "REF",
        "REFERENCES",
        "REFERENCING",
        "REFRESH",
        "REGR_AVGX",
        "REGR_AVGY",
        "REGR_COUNT",
        "REGR_INTERCEPT",
        "REGR_R2",
        "REGR_SLOPE",
        "REGR_SXX",
        "REGR_SXY",
        "REGR_SYY",
        "RELEASE",
        "RENAME",
        "REPEAT",
        "RESET",
        "RESIGNAL",
        "RESTART",
        "RESTRICT",
        "RESULT",
        "RESULT_SET_LOCATOR",
        "RETURN",
        "RETURNS",
        "REVOKE",
        "RIGHT",
        "ROLE",
        "ROLLBACK",
        "ROLLUP",
        "ROUND_CEILING",
        "ROUND_DOWN",
        "ROUND_FLOOR",
        "ROUND_HALF_DOWN",
        "ROUND_HALF_EVEN",
        "ROUND_HALF_UP",
        "ROUND_UP",
        "ROUTINE",
        "ROW",
        "ROWNUMBER",
        "ROWS",
        "ROWSET",
        "ROW_NUMBER",
        "RRN",
        "RUN",
        "SAVEPOINT",
        "SCHEMA",
        "SCOPE",
        "SCRATCHPAD",
        "SCROLL",
        "SEARCH",
        "SECOND",
        "SECONDS",
        "SECQTY",
        "SECURITY",
        "SENSITIVE",
        "SEQUENCE",
        "SESSION",
        "SESSION_USER",
        "SIGNAL",
        "SIMILAR",
        "SIMPLE",
        "SMALLINT",
        "SNAN",
        "SOME",
        "SOURCE",
        "SPECIFIC",
        "SPECIFICTYPE",
        "SQL",
        "SQLEXCEPTION",
        "SQLID",
        "SQLSTATE",
        "SQLWARNING",
        "SQRT",
        "STACKED",
        "STANDARD",
        "START",
        "STARTING",
        "STATEMENT",
        "STATIC",
        "STATMENT",
        "STAY",
        "STDDEV_POP",
        "STDDEV_SAMP",
        "STOGROUP",
        "STORES",
        "STYLE",
        "SUBMULTISET",
        "SUBSTRING",
        "SUM",
        "SUMMARY",
        "SYMMETRIC",
        "SYNONYM",
        "SYSFUN",
        "SYSIBM",
        "SYSPROC",
        "SYSTEM",
        "SYSTEM_USER",
        "TABLE",
        "TABLESAMPLE",
        "TABLESPACE",
        "THEN",
        "TIME",
        "TIMESTAMP",
        "TIMEZONE_HOUR",
        "TIMEZONE_MINUTE",
        "TO",
        "TRAILING",
        "TRANSACTION",
        "TRANSLATE",
        "TRANSLATION",
        "TREAT",
        "TRIGGER",
        "TRIM",
        "TRUE",
        "TRUNCATE",
        "TYPE",
        "UESCAPE",
        "UNDO",
        "UNIQUE",
        "UNKNOWN",
        "UNNEST",
        "UNTIL",
        "UPPER",
        "USAGE",
        "USER",
        "USING",
        "VALIDPROC",
        "VALUE",
        "VARCHAR",
        "VARIABLE",
        "VARIANT",
        "VARYING",
        "VAR_POP",
        "VAR_SAMP",
        "VCAT",
        "VERSION",
        "VIEW",
        "VOLATILE",
        "VOLUMES",
        "WHEN",
        "WHENEVER",
        "WHILE",
        "WIDTH_BUCKET",
        "WINDOW",
        "WITH",
        "WITHIN",
        "WITHOUT",
        "WLM",
        "WRITE",
        "XMLELEMENT",
        "XMLEXISTS",
        "XMLNAMESPACES",
        "YEAR",
        "YEARS"
    ], tr = [
        "ADD",
        "AFTER",
        "ALTER COLUMN",
        "ALTER TABLE",
        "DELETE FROM",
        "EXCEPT",
        "FETCH FIRST",
        "FROM",
        "GROUP BY",
        "GO",
        "HAVING",
        "INSERT INTO",
        "INTERSECT",
        "LIMIT",
        "ORDER BY",
        "SELECT",
        "SET CURRENT SCHEMA",
        "SET SCHEMA",
        "SET",
        "UPDATE",
        "VALUES",
        "WHERE"
    ], Er = [
        "INTERSECT",
        "INTERSECT ALL",
        "MINUS",
        "UNION",
        "UNION ALL"
    ], rr = [
        "AND",
        "OR",
        "JOIN",
        "INNER JOIN",
        "LEFT JOIN",
        "LEFT OUTER JOIN",
        "RIGHT JOIN",
        "RIGHT OUTER JOIN",
        "FULL JOIN",
        "FULL OUTER JOIN",
        "CROSS JOIN",
        "NATURAL JOIN"
    ], nr = function(e) {
        QE(t, e);
        var E = ZE(t);
        function t() {
            return xE(this, t), E.apply(this, arguments);
        }
        return qE(t, [
            {
                key: "tokenizer",
                value: function() {
                    return new JE.default({
                        reservedWords: er,
                        reservedTopLevelWords: tr,
                        reservedNewlineWords: rr,
                        reservedTopLevelWordsNoIndent: Er,
                        stringTypes: [
                            '""',
                            "''",
                            "``",
                            "[]"
                        ],
                        openParens: [
                            "("
                        ],
                        closeParens: [
                            ")"
                        ],
                        indexedPlaceholderTypes: [
                            "?"
                        ],
                        namedPlaceholderTypes: [
                            ":"
                        ],
                        lineCommentTypes: [
                            "--"
                        ],
                        specialWordChars: [
                            "#",
                            "@"
                        ],
                        operators: [
                            "**",
                            "!=",
                            "!>",
                            "!>",
                            "||"
                        ]
                    });
                }
            }
        ]), t;
    }(KE.default);
    h.default = nr;
    je.exports = h.default;
});
var nt7 = R13((F, rt)=>{
    "use strict";
    function x(e) {
        return typeof Symbol == "function" && typeof Symbol.iterator == "symbol" ? x = function(t) {
            return typeof t;
        } : x = function(t) {
            return t && typeof Symbol == "function" && t.constructor === Symbol && t !== Symbol.prototype ? "symbol" : typeof t;
        }, x(e);
    }
    Object.defineProperty(F, "__esModule", {
        value: !0
    });
    F.default = void 0;
    var Tr = tt(u5()), Rr = tt(S11());
    function tt(e) {
        return e && e.__esModule ? e : {
            default: e
        };
    }
    function Nr(e, E) {
        if (!(e instanceof E)) throw new TypeError("Cannot call a class as a function");
    }
    function Et(e, E) {
        for(var t = 0; t < E.length; t++){
            var r = E[t];
            r.enumerable = r.enumerable || !1, r.configurable = !0, "value" in r && (r.writable = !0), Object.defineProperty(e, r.key, r);
        }
    }
    function or(e, E, t) {
        return E && Et(e.prototype, E), t && Et(e, t), e;
    }
    function Ir(e, E) {
        if (typeof E != "function" && E !== null) throw new TypeError("Super expression must either be null or a function");
        e.prototype = Object.create(E && E.prototype, {
            constructor: {
                value: e,
                writable: !0,
                configurable: !0
            }
        }), E && Ce(e, E);
    }
    function Ce(e, E) {
        return Ce = Object.setPrototypeOf || function(r, n) {
            return r.__proto__ = n, r;
        }, Ce(e, E);
    }
    function Or(e) {
        var E = ur();
        return function() {
            var r = q(e), n;
            if (E) {
                var T = q(this).constructor;
                n = Reflect.construct(r, arguments, T);
            } else n = r.apply(this, arguments);
            return Ar(this, n);
        };
    }
    function Ar(e, E) {
        return E && (x(E) === "object" || typeof E == "function") ? E : ir(e);
    }
    function ir(e) {
        if (e === void 0) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
        return e;
    }
    function ur() {
        if (typeof Reflect == "undefined" || !Reflect.construct || Reflect.construct.sham) return !1;
        if (typeof Proxy == "function") return !0;
        try {
            return Date.prototype.toString.call(Reflect.construct(Date, [], function() {
            })), !0;
        } catch (e) {
            return !1;
        }
    }
    function q(e) {
        return q = Object.setPrototypeOf ? Object.getPrototypeOf : function(t) {
            return t.__proto__ || Object.getPrototypeOf(t);
        }, q(e);
    }
    var Sr = [
        "ACCESSIBLE",
        "ADD",
        "ALL",
        "ALTER",
        "ANALYZE",
        "AND",
        "AS",
        "ASC",
        "ASENSITIVE",
        "BEFORE",
        "BETWEEN",
        "BIGINT",
        "BINARY",
        "BLOB",
        "BOTH",
        "BY",
        "CALL",
        "CASCADE",
        "CASE",
        "CHANGE",
        "CHAR",
        "CHARACTER",
        "CHECK",
        "COLLATE",
        "COLUMN",
        "CONDITION",
        "CONSTRAINT",
        "CONTINUE",
        "CONVERT",
        "CREATE",
        "CROSS",
        "CURRENT_DATE",
        "CURRENT_ROLE",
        "CURRENT_TIME",
        "CURRENT_TIMESTAMP",
        "CURRENT_USER",
        "CURSOR",
        "DATABASE",
        "DATABASES",
        "DAY_HOUR",
        "DAY_MICROSECOND",
        "DAY_MINUTE",
        "DAY_SECOND",
        "DEC",
        "DECIMAL",
        "DECLARE",
        "DEFAULT",
        "DELAYED",
        "DELETE",
        "DESC",
        "DESCRIBE",
        "DETERMINISTIC",
        "DISTINCT",
        "DISTINCTROW",
        "DIV",
        "DO_DOMAIN_IDS",
        "DOUBLE",
        "DROP",
        "DUAL",
        "EACH",
        "ELSE",
        "ELSEIF",
        "ENCLOSED",
        "ESCAPED",
        "EXCEPT",
        "EXISTS",
        "EXIT",
        "EXPLAIN",
        "FALSE",
        "FETCH",
        "FLOAT",
        "FLOAT4",
        "FLOAT8",
        "FOR",
        "FORCE",
        "FOREIGN",
        "FROM",
        "FULLTEXT",
        "GENERAL",
        "GRANT",
        "GROUP",
        "HAVING",
        "HIGH_PRIORITY",
        "HOUR_MICROSECOND",
        "HOUR_MINUTE",
        "HOUR_SECOND",
        "IF",
        "IGNORE",
        "IGNORE_DOMAIN_IDS",
        "IGNORE_SERVER_IDS",
        "IN",
        "INDEX",
        "INFILE",
        "INNER",
        "INOUT",
        "INSENSITIVE",
        "INSERT",
        "INT",
        "INT1",
        "INT2",
        "INT3",
        "INT4",
        "INT8",
        "INTEGER",
        "INTERSECT",
        "INTERVAL",
        "INTO",
        "IS",
        "ITERATE",
        "JOIN",
        "KEY",
        "KEYS",
        "KILL",
        "LEADING",
        "LEAVE",
        "LEFT",
        "LIKE",
        "LIMIT",
        "LINEAR",
        "LINES",
        "LOAD",
        "LOCALTIME",
        "LOCALTIMESTAMP",
        "LOCK",
        "LONG",
        "LONGBLOB",
        "LONGTEXT",
        "LOOP",
        "LOW_PRIORITY",
        "MASTER_HEARTBEAT_PERIOD",
        "MASTER_SSL_VERIFY_SERVER_CERT",
        "MATCH",
        "MAXVALUE",
        "MEDIUMBLOB",
        "MEDIUMINT",
        "MEDIUMTEXT",
        "MIDDLEINT",
        "MINUTE_MICROSECOND",
        "MINUTE_SECOND",
        "MOD",
        "MODIFIES",
        "NATURAL",
        "NOT",
        "NO_WRITE_TO_BINLOG",
        "NULL",
        "NUMERIC",
        "ON",
        "OPTIMIZE",
        "OPTION",
        "OPTIONALLY",
        "OR",
        "ORDER",
        "OUT",
        "OUTER",
        "OUTFILE",
        "OVER",
        "PAGE_CHECKSUM",
        "PARSE_VCOL_EXPR",
        "PARTITION",
        "POSITION",
        "PRECISION",
        "PRIMARY",
        "PROCEDURE",
        "PURGE",
        "RANGE",
        "READ",
        "READS",
        "READ_WRITE",
        "REAL",
        "RECURSIVE",
        "REF_SYSTEM_ID",
        "REFERENCES",
        "REGEXP",
        "RELEASE",
        "RENAME",
        "REPEAT",
        "REPLACE",
        "REQUIRE",
        "RESIGNAL",
        "RESTRICT",
        "RETURN",
        "RETURNING",
        "REVOKE",
        "RIGHT",
        "RLIKE",
        "ROWS",
        "SCHEMA",
        "SCHEMAS",
        "SECOND_MICROSECOND",
        "SELECT",
        "SENSITIVE",
        "SEPARATOR",
        "SET",
        "SHOW",
        "SIGNAL",
        "SLOW",
        "SMALLINT",
        "SPATIAL",
        "SPECIFIC",
        "SQL",
        "SQLEXCEPTION",
        "SQLSTATE",
        "SQLWARNING",
        "SQL_BIG_RESULT",
        "SQL_CALC_FOUND_ROWS",
        "SQL_SMALL_RESULT",
        "SSL",
        "STARTING",
        "STATS_AUTO_RECALC",
        "STATS_PERSISTENT",
        "STATS_SAMPLE_PAGES",
        "STRAIGHT_JOIN",
        "TABLE",
        "TERMINATED",
        "THEN",
        "TINYBLOB",
        "TINYINT",
        "TINYTEXT",
        "TO",
        "TRAILING",
        "TRIGGER",
        "TRUE",
        "UNDO",
        "UNION",
        "UNIQUE",
        "UNLOCK",
        "UNSIGNED",
        "UPDATE",
        "USAGE",
        "USE",
        "USING",
        "UTC_DATE",
        "UTC_TIME",
        "UTC_TIMESTAMP",
        "VALUES",
        "VARBINARY",
        "VARCHAR",
        "VARCHARACTER",
        "VARYING",
        "WHEN",
        "WHERE",
        "WHILE",
        "WINDOW",
        "WITH",
        "WRITE",
        "XOR",
        "YEAR_MONTH",
        "ZEROFILL"
    ], ar = [
        "ADD",
        "ALTER COLUMN",
        "ALTER TABLE",
        "DELETE FROM",
        "EXCEPT",
        "FROM",
        "GROUP BY",
        "HAVING",
        "INSERT INTO",
        "INSERT",
        "LIMIT",
        "ORDER BY",
        "SELECT",
        "SET",
        "UPDATE",
        "VALUES",
        "WHERE"
    ], Lr = [
        "INTERSECT",
        "INTERSECT ALL",
        "UNION",
        "UNION ALL"
    ], fr = [
        "AND",
        "ELSE",
        "OR",
        "WHEN",
        "JOIN",
        "INNER JOIN",
        "LEFT JOIN",
        "LEFT OUTER JOIN",
        "RIGHT JOIN",
        "RIGHT OUTER JOIN",
        "CROSS JOIN",
        "NATURAL JOIN",
        "STRAIGHT_JOIN",
        "NATURAL LEFT JOIN",
        "NATURAL LEFT OUTER JOIN",
        "NATURAL RIGHT JOIN",
        "NATURAL RIGHT OUTER JOIN"
    ], lr = function(e) {
        Ir(t, e);
        var E = Or(t);
        function t() {
            return Nr(this, t), E.apply(this, arguments);
        }
        return or(t, [
            {
                key: "tokenizer",
                value: function() {
                    return new Rr.default({
                        reservedWords: Sr,
                        reservedTopLevelWords: ar,
                        reservedNewlineWords: fr,
                        reservedTopLevelWordsNoIndent: Lr,
                        stringTypes: [
                            "``",
                            "''",
                            '""'
                        ],
                        openParens: [
                            "(",
                            "CASE"
                        ],
                        closeParens: [
                            ")",
                            "END"
                        ],
                        indexedPlaceholderTypes: [
                            "?"
                        ],
                        namedPlaceholderTypes: [],
                        lineCommentTypes: [
                            "--",
                            "#"
                        ],
                        specialWordChars: [
                            "@"
                        ],
                        operators: [
                            ":=",
                            "<<",
                            ">>",
                            "!=",
                            "<>",
                            "<=>",
                            "&&",
                            "||"
                        ]
                    });
                }
            }
        ]), t;
    }(Tr.default);
    F.default = lr;
    rt.exports = F.default;
});
var ot5 = R13((G, Nt)=>{
    "use strict";
    function Q(e) {
        return typeof Symbol == "function" && typeof Symbol.iterator == "symbol" ? Q = function(t) {
            return typeof t;
        } : Q = function(t) {
            return t && typeof Symbol == "function" && t.constructor === Symbol && t !== Symbol.prototype ? "symbol" : typeof t;
        }, Q(e);
    }
    Object.defineProperty(G, "__esModule", {
        value: !0
    });
    G.default = void 0;
    var Cr = Tt(u5()), sr = Tt(S11());
    function Tt(e) {
        return e && e.__esModule ? e : {
            default: e
        };
    }
    function cr(e, E) {
        if (!(e instanceof E)) throw new TypeError("Cannot call a class as a function");
    }
    function Rt(e, E) {
        for(var t = 0; t < E.length; t++){
            var r = E[t];
            r.enumerable = r.enumerable || !1, r.configurable = !0, "value" in r && (r.writable = !0), Object.defineProperty(e, r.key, r);
        }
    }
    function Dr(e, E, t) {
        return E && Rt(e.prototype, E), t && Rt(e, t), e;
    }
    function Ur(e, E) {
        if (typeof E != "function" && E !== null) throw new TypeError("Super expression must either be null or a function");
        e.prototype = Object.create(E && E.prototype, {
            constructor: {
                value: e,
                writable: !0,
                configurable: !0
            }
        }), E && se(e, E);
    }
    function se(e, E) {
        return se = Object.setPrototypeOf || function(r, n) {
            return r.__proto__ = n, r;
        }, se(e, E);
    }
    function Pr(e) {
        var E = dr();
        return function() {
            var r = Z(e), n;
            if (E) {
                var T = Z(this).constructor;
                n = Reflect.construct(r, arguments, T);
            } else n = r.apply(this, arguments);
            return _r(this, n);
        };
    }
    function _r(e, E) {
        return E && (Q(E) === "object" || typeof E == "function") ? E : pr(e);
    }
    function pr(e) {
        if (e === void 0) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
        return e;
    }
    function dr() {
        if (typeof Reflect == "undefined" || !Reflect.construct || Reflect.construct.sham) return !1;
        if (typeof Proxy == "function") return !0;
        try {
            return Date.prototype.toString.call(Reflect.construct(Date, [], function() {
            })), !0;
        } catch (e) {
            return !1;
        }
    }
    function Z(e) {
        return Z = Object.setPrototypeOf ? Object.getPrototypeOf : function(t) {
            return t.__proto__ || Object.getPrototypeOf(t);
        }, Z(e);
    }
    var Mr = [
        "ACCESSIBLE",
        "ADD",
        "ALL",
        "ALTER",
        "ANALYZE",
        "AND",
        "AS",
        "ASC",
        "ASENSITIVE",
        "BEFORE",
        "BETWEEN",
        "BIGINT",
        "BINARY",
        "BLOB",
        "BOTH",
        "BY",
        "CALL",
        "CASCADE",
        "CASE",
        "CHANGE",
        "CHAR",
        "CHARACTER",
        "CHECK",
        "COLLATE",
        "COLUMN",
        "CONDITION",
        "CONSTRAINT",
        "CONTINUE",
        "CONVERT",
        "CREATE",
        "CROSS",
        "CUBE",
        "CUME_DIST",
        "CURRENT_DATE",
        "CURRENT_TIME",
        "CURRENT_TIMESTAMP",
        "CURRENT_USER",
        "CURSOR",
        "DATABASE",
        "DATABASES",
        "DAY_HOUR",
        "DAY_MICROSECOND",
        "DAY_MINUTE",
        "DAY_SECOND",
        "DEC",
        "DECIMAL",
        "DECLARE",
        "DEFAULT",
        "DELAYED",
        "DELETE",
        "DENSE_RANK",
        "DESC",
        "DESCRIBE",
        "DETERMINISTIC",
        "DISTINCT",
        "DISTINCTROW",
        "DIV",
        "DOUBLE",
        "DROP",
        "DUAL",
        "EACH",
        "ELSE",
        "ELSEIF",
        "EMPTY",
        "ENCLOSED",
        "ESCAPED",
        "EXCEPT",
        "EXISTS",
        "EXIT",
        "EXPLAIN",
        "FALSE",
        "FETCH",
        "FIRST_VALUE",
        "FLOAT",
        "FLOAT4",
        "FLOAT8",
        "FOR",
        "FORCE",
        "FOREIGN",
        "FROM",
        "FULLTEXT",
        "FUNCTION",
        "GENERATED",
        "GET",
        "GRANT",
        "GROUP",
        "GROUPING",
        "GROUPS",
        "HAVING",
        "HIGH_PRIORITY",
        "HOUR_MICROSECOND",
        "HOUR_MINUTE",
        "HOUR_SECOND",
        "IF",
        "IGNORE",
        "IN",
        "INDEX",
        "INFILE",
        "INNER",
        "INOUT",
        "INSENSITIVE",
        "INSERT",
        "INT",
        "INT1",
        "INT2",
        "INT3",
        "INT4",
        "INT8",
        "INTEGER",
        "INTERVAL",
        "INTO",
        "IO_AFTER_GTIDS",
        "IO_BEFORE_GTIDS",
        "IS",
        "ITERATE",
        "JOIN",
        "JSON_TABLE",
        "KEY",
        "KEYS",
        "KILL",
        "LAG",
        "LAST_VALUE",
        "LATERAL",
        "LEAD",
        "LEADING",
        "LEAVE",
        "LEFT",
        "LIKE",
        "LIMIT",
        "LINEAR",
        "LINES",
        "LOAD",
        "LOCALTIME",
        "LOCALTIMESTAMP",
        "LOCK",
        "LONG",
        "LONGBLOB",
        "LONGTEXT",
        "LOOP",
        "LOW_PRIORITY",
        "MASTER_BIND",
        "MASTER_SSL_VERIFY_SERVER_CERT",
        "MATCH",
        "MAXVALUE",
        "MEDIUMBLOB",
        "MEDIUMINT",
        "MEDIUMTEXT",
        "MIDDLEINT",
        "MINUTE_MICROSECOND",
        "MINUTE_SECOND",
        "MOD",
        "MODIFIES",
        "NATURAL",
        "NOT",
        "NO_WRITE_TO_BINLOG",
        "NTH_VALUE",
        "NTILE",
        "NULL",
        "NUMERIC",
        "OF",
        "ON",
        "OPTIMIZE",
        "OPTIMIZER_COSTS",
        "OPTION",
        "OPTIONALLY",
        "OR",
        "ORDER",
        "OUT",
        "OUTER",
        "OUTFILE",
        "OVER",
        "PARTITION",
        "PERCENT_RANK",
        "PRECISION",
        "PRIMARY",
        "PROCEDURE",
        "PURGE",
        "RANGE",
        "RANK",
        "READ",
        "READS",
        "READ_WRITE",
        "REAL",
        "RECURSIVE",
        "REFERENCES",
        "REGEXP",
        "RELEASE",
        "RENAME",
        "REPEAT",
        "REPLACE",
        "REQUIRE",
        "RESIGNAL",
        "RESTRICT",
        "RETURN",
        "REVOKE",
        "RIGHT",
        "RLIKE",
        "ROW",
        "ROWS",
        "ROW_NUMBER",
        "SCHEMA",
        "SCHEMAS",
        "SECOND_MICROSECOND",
        "SELECT",
        "SENSITIVE",
        "SEPARATOR",
        "SET",
        "SHOW",
        "SIGNAL",
        "SMALLINT",
        "SPATIAL",
        "SPECIFIC",
        "SQL",
        "SQLEXCEPTION",
        "SQLSTATE",
        "SQLWARNING",
        "SQL_BIG_RESULT",
        "SQL_CALC_FOUND_ROWS",
        "SQL_SMALL_RESULT",
        "SSL",
        "STARTING",
        "STORED",
        "STRAIGHT_JOIN",
        "SYSTEM",
        "TABLE",
        "TERMINATED",
        "THEN",
        "TINYBLOB",
        "TINYINT",
        "TINYTEXT",
        "TO",
        "TRAILING",
        "TRIGGER",
        "TRUE",
        "UNDO",
        "UNION",
        "UNIQUE",
        "UNLOCK",
        "UNSIGNED",
        "UPDATE",
        "USAGE",
        "USE",
        "USING",
        "UTC_DATE",
        "UTC_TIME",
        "UTC_TIMESTAMP",
        "VALUES",
        "VARBINARY",
        "VARCHAR",
        "VARCHARACTER",
        "VARYING",
        "VIRTUAL",
        "WHEN",
        "WHERE",
        "WHILE",
        "WINDOW",
        "WITH",
        "WRITE",
        "XOR",
        "YEAR_MONTH",
        "ZEROFILL"
    ], yr = [
        "ADD",
        "ALTER COLUMN",
        "ALTER TABLE",
        "DELETE FROM",
        "EXCEPT",
        "FROM",
        "GROUP BY",
        "HAVING",
        "INSERT INTO",
        "INSERT",
        "LIMIT",
        "ORDER BY",
        "SELECT",
        "SET",
        "UPDATE",
        "VALUES",
        "WHERE"
    ], vr = [
        "INTERSECT",
        "INTERSECT ALL",
        "UNION",
        "UNION ALL"
    ], hr = [
        "AND",
        "ELSE",
        "OR",
        "WHEN",
        "JOIN",
        "INNER JOIN",
        "LEFT JOIN",
        "LEFT OUTER JOIN",
        "RIGHT JOIN",
        "RIGHT OUTER JOIN",
        "CROSS JOIN",
        "NATURAL JOIN",
        "STRAIGHT_JOIN",
        "NATURAL LEFT JOIN",
        "NATURAL LEFT OUTER JOIN",
        "NATURAL RIGHT JOIN",
        "NATURAL RIGHT OUTER JOIN"
    ], Fr = function(e) {
        Ur(t, e);
        var E = Pr(t);
        function t() {
            return cr(this, t), E.apply(this, arguments);
        }
        return Dr(t, [
            {
                key: "tokenizer",
                value: function() {
                    return new sr.default({
                        reservedWords: Mr,
                        reservedTopLevelWords: yr,
                        reservedNewlineWords: hr,
                        reservedTopLevelWordsNoIndent: vr,
                        stringTypes: [
                            "``",
                            "''",
                            '""'
                        ],
                        openParens: [
                            "(",
                            "CASE"
                        ],
                        closeParens: [
                            ")",
                            "END"
                        ],
                        indexedPlaceholderTypes: [
                            "?"
                        ],
                        namedPlaceholderTypes: [],
                        lineCommentTypes: [
                            "--",
                            "#"
                        ],
                        specialWordChars: [
                            "@"
                        ],
                        operators: [
                            ":=",
                            "<<",
                            ">>",
                            "!=",
                            "<>",
                            "<=>",
                            "&&",
                            "||",
                            "->",
                            "->>"
                        ]
                    });
                }
            }
        ]), t;
    }(Cr.default);
    G.default = Fr;
    Nt.exports = G.default;
});
var it8 = R13((m, At)=>{
    "use strict";
    function z(e) {
        return typeof Symbol == "function" && typeof Symbol.iterator == "symbol" ? z = function(t) {
            return typeof t;
        } : z = function(t) {
            return t && typeof Symbol == "function" && t.constructor === Symbol && t !== Symbol.prototype ? "symbol" : typeof t;
        }, z(e);
    }
    Object.defineProperty(m, "__esModule", {
        value: !0
    });
    m.default = void 0;
    var Gr = It(u5()), mr = It(S11());
    function It(e) {
        return e && e.__esModule ? e : {
            default: e
        };
    }
    function gr(e, E) {
        if (!(e instanceof E)) throw new TypeError("Cannot call a class as a function");
    }
    function Ot(e, E) {
        for(var t = 0; t < E.length; t++){
            var r = E[t];
            r.enumerable = r.enumerable || !1, r.configurable = !0, "value" in r && (r.writable = !0), Object.defineProperty(e, r.key, r);
        }
    }
    function Br(e, E, t) {
        return E && Ot(e.prototype, E), t && Ot(e, t), e;
    }
    function Hr(e, E) {
        if (typeof E != "function" && E !== null) throw new TypeError("Super expression must either be null or a function");
        e.prototype = Object.create(E && E.prototype, {
            constructor: {
                value: e,
                writable: !0,
                configurable: !0
            }
        }), E && ce(e, E);
    }
    function ce(e, E) {
        return ce = Object.setPrototypeOf || function(r, n) {
            return r.__proto__ = n, r;
        }, ce(e, E);
    }
    function Wr(e) {
        var E = br();
        return function() {
            var r = $(e), n;
            if (E) {
                var T = $(this).constructor;
                n = Reflect.construct(r, arguments, T);
            } else n = r.apply(this, arguments);
            return Vr(this, n);
        };
    }
    function Vr(e, E) {
        return E && (z(E) === "object" || typeof E == "function") ? E : Yr(e);
    }
    function Yr(e) {
        if (e === void 0) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
        return e;
    }
    function br() {
        if (typeof Reflect == "undefined" || !Reflect.construct || Reflect.construct.sham) return !1;
        if (typeof Proxy == "function") return !0;
        try {
            return Date.prototype.toString.call(Reflect.construct(Date, [], function() {
            })), !0;
        } catch (e) {
            return !1;
        }
    }
    function $(e) {
        return $ = Object.setPrototypeOf ? Object.getPrototypeOf : function(t) {
            return t.__proto__ || Object.getPrototypeOf(t);
        }, $(e);
    }
    var kr = [
        "ALL",
        "ALTER",
        "ANALYZE",
        "AND",
        "ANY",
        "ARRAY",
        "AS",
        "ASC",
        "BEGIN",
        "BETWEEN",
        "BINARY",
        "BOOLEAN",
        "BREAK",
        "BUCKET",
        "BUILD",
        "BY",
        "CALL",
        "CASE",
        "CAST",
        "CLUSTER",
        "COLLATE",
        "COLLECTION",
        "COMMIT",
        "CONNECT",
        "CONTINUE",
        "CORRELATE",
        "COVER",
        "CREATE",
        "DATABASE",
        "DATASET",
        "DATASTORE",
        "DECLARE",
        "DECREMENT",
        "DELETE",
        "DERIVED",
        "DESC",
        "DESCRIBE",
        "DISTINCT",
        "DO",
        "DROP",
        "EACH",
        "ELEMENT",
        "ELSE",
        "END",
        "EVERY",
        "EXCEPT",
        "EXCLUDE",
        "EXECUTE",
        "EXISTS",
        "EXPLAIN",
        "FALSE",
        "FETCH",
        "FIRST",
        "FLATTEN",
        "FOR",
        "FORCE",
        "FROM",
        "FUNCTION",
        "GRANT",
        "GROUP",
        "GSI",
        "HAVING",
        "IF",
        "IGNORE",
        "ILIKE",
        "IN",
        "INCLUDE",
        "INCREMENT",
        "INDEX",
        "INFER",
        "INLINE",
        "INNER",
        "INSERT",
        "INTERSECT",
        "INTO",
        "IS",
        "JOIN",
        "KEY",
        "KEYS",
        "KEYSPACE",
        "KNOWN",
        "LAST",
        "LEFT",
        "LET",
        "LETTING",
        "LIKE",
        "LIMIT",
        "LSM",
        "MAP",
        "MAPPING",
        "MATCHED",
        "MATERIALIZED",
        "MERGE",
        "MISSING",
        "NAMESPACE",
        "NEST",
        "NOT",
        "NULL",
        "NUMBER",
        "OBJECT",
        "OFFSET",
        "ON",
        "OPTION",
        "OR",
        "ORDER",
        "OUTER",
        "OVER",
        "PARSE",
        "PARTITION",
        "PASSWORD",
        "PATH",
        "POOL",
        "PREPARE",
        "PRIMARY",
        "PRIVATE",
        "PRIVILEGE",
        "PROCEDURE",
        "PUBLIC",
        "RAW",
        "REALM",
        "REDUCE",
        "RENAME",
        "RETURN",
        "RETURNING",
        "REVOKE",
        "RIGHT",
        "ROLE",
        "ROLLBACK",
        "SATISFIES",
        "SCHEMA",
        "SELECT",
        "SELF",
        "SEMI",
        "SET",
        "SHOW",
        "SOME",
        "START",
        "STATISTICS",
        "STRING",
        "SYSTEM",
        "THEN",
        "TO",
        "TRANSACTION",
        "TRIGGER",
        "TRUE",
        "TRUNCATE",
        "UNDER",
        "UNION",
        "UNIQUE",
        "UNKNOWN",
        "UNNEST",
        "UNSET",
        "UPDATE",
        "UPSERT",
        "USE",
        "USER",
        "USING",
        "VALIDATE",
        "VALUE",
        "VALUED",
        "VALUES",
        "VIA",
        "VIEW",
        "WHEN",
        "WHERE",
        "WHILE",
        "WITH",
        "WITHIN",
        "WORK",
        "XOR"
    ], Xr = [
        "DELETE FROM",
        "EXCEPT ALL",
        "EXCEPT",
        "EXPLAIN DELETE FROM",
        "EXPLAIN UPDATE",
        "EXPLAIN UPSERT",
        "FROM",
        "GROUP BY",
        "HAVING",
        "INFER",
        "INSERT INTO",
        "LET",
        "LIMIT",
        "MERGE",
        "NEST",
        "ORDER BY",
        "PREPARE",
        "SELECT",
        "SET CURRENT SCHEMA",
        "SET SCHEMA",
        "SET",
        "UNNEST",
        "UPDATE",
        "UPSERT",
        "USE KEYS",
        "VALUES",
        "WHERE"
    ], wr = [
        "INTERSECT",
        "INTERSECT ALL",
        "MINUS",
        "UNION",
        "UNION ALL"
    ], Kr = [
        "AND",
        "OR",
        "XOR",
        "JOIN",
        "INNER JOIN",
        "LEFT JOIN",
        "LEFT OUTER JOIN",
        "RIGHT JOIN",
        "RIGHT OUTER JOIN"
    ], Jr = function(e) {
        Hr(t, e);
        var E = Wr(t);
        function t() {
            return gr(this, t), E.apply(this, arguments);
        }
        return Br(t, [
            {
                key: "tokenizer",
                value: function() {
                    return new mr.default({
                        reservedWords: kr,
                        reservedTopLevelWords: Xr,
                        reservedNewlineWords: Kr,
                        reservedTopLevelWordsNoIndent: wr,
                        stringTypes: [
                            '""',
                            "''",
                            "``"
                        ],
                        openParens: [
                            "(",
                            "[",
                            "{"
                        ],
                        closeParens: [
                            ")",
                            "]",
                            "}"
                        ],
                        namedPlaceholderTypes: [
                            "$"
                        ],
                        lineCommentTypes: [
                            "#",
                            "--"
                        ],
                        operators: [
                            "==",
                            "!="
                        ]
                    });
                }
            }
        ]), t;
    }(Gr.default);
    m.default = Jr;
    At.exports = m.default;
});
var Lt3 = R13((g, at)=>{
    "use strict";
    function j(e) {
        return typeof Symbol == "function" && typeof Symbol.iterator == "symbol" ? j = function(t) {
            return typeof t;
        } : j = function(t) {
            return t && typeof Symbol == "function" && t.constructor === Symbol && t !== Symbol.prototype ? "symbol" : typeof t;
        }, j(e);
    }
    Object.defineProperty(g, "__esModule", {
        value: !0
    });
    g.default = void 0;
    var xr = De(u5()), ut = k8(), qr = De(S11()), Qr = De(f9());
    function De(e) {
        return e && e.__esModule ? e : {
            default: e
        };
    }
    function Zr(e, E) {
        if (!(e instanceof E)) throw new TypeError("Cannot call a class as a function");
    }
    function St(e, E) {
        for(var t = 0; t < E.length; t++){
            var r = E[t];
            r.enumerable = r.enumerable || !1, r.configurable = !0, "value" in r && (r.writable = !0), Object.defineProperty(e, r.key, r);
        }
    }
    function zr(e, E, t) {
        return E && St(e.prototype, E), t && St(e, t), e;
    }
    function $r(e, E) {
        if (typeof E != "function" && E !== null) throw new TypeError("Super expression must either be null or a function");
        e.prototype = Object.create(E && E.prototype, {
            constructor: {
                value: e,
                writable: !0,
                configurable: !0
            }
        }), E && Ue(e, E);
    }
    function Ue(e, E) {
        return Ue = Object.setPrototypeOf || function(r, n) {
            return r.__proto__ = n, r;
        }, Ue(e, E);
    }
    function jr(e) {
        var E = En();
        return function() {
            var r = ee(e), n;
            if (E) {
                var T = ee(this).constructor;
                n = Reflect.construct(r, arguments, T);
            } else n = r.apply(this, arguments);
            return en(this, n);
        };
    }
    function en(e, E) {
        return E && (j(E) === "object" || typeof E == "function") ? E : tn(e);
    }
    function tn(e) {
        if (e === void 0) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
        return e;
    }
    function En() {
        if (typeof Reflect == "undefined" || !Reflect.construct || Reflect.construct.sham) return !1;
        if (typeof Proxy == "function") return !0;
        try {
            return Date.prototype.toString.call(Reflect.construct(Date, [], function() {
            })), !0;
        } catch (e) {
            return !1;
        }
    }
    function ee(e) {
        return ee = Object.setPrototypeOf ? Object.getPrototypeOf : function(t) {
            return t.__proto__ || Object.getPrototypeOf(t);
        }, ee(e);
    }
    var rn = [
        "A",
        "ACCESSIBLE",
        "AGENT",
        "AGGREGATE",
        "ALL",
        "ALTER",
        "ANY",
        "ARRAY",
        "AS",
        "ASC",
        "AT",
        "ATTRIBUTE",
        "AUTHID",
        "AVG",
        "BETWEEN",
        "BFILE_BASE",
        "BINARY_INTEGER",
        "BINARY",
        "BLOB_BASE",
        "BLOCK",
        "BODY",
        "BOOLEAN",
        "BOTH",
        "BOUND",
        "BREADTH",
        "BULK",
        "BY",
        "BYTE",
        "C",
        "CALL",
        "CALLING",
        "CASCADE",
        "CASE",
        "CHAR_BASE",
        "CHAR",
        "CHARACTER",
        "CHARSET",
        "CHARSETFORM",
        "CHARSETID",
        "CHECK",
        "CLOB_BASE",
        "CLONE",
        "CLOSE",
        "CLUSTER",
        "CLUSTERS",
        "COALESCE",
        "COLAUTH",
        "COLLECT",
        "COLUMNS",
        "COMMENT",
        "COMMIT",
        "COMMITTED",
        "COMPILED",
        "COMPRESS",
        "CONNECT",
        "CONSTANT",
        "CONSTRUCTOR",
        "CONTEXT",
        "CONTINUE",
        "CONVERT",
        "COUNT",
        "CRASH",
        "CREATE",
        "CREDENTIAL",
        "CURRENT",
        "CURRVAL",
        "CURSOR",
        "CUSTOMDATUM",
        "DANGLING",
        "DATA",
        "DATE_BASE",
        "DATE",
        "DAY",
        "DECIMAL",
        "DEFAULT",
        "DEFINE",
        "DELETE",
        "DEPTH",
        "DESC",
        "DETERMINISTIC",
        "DIRECTORY",
        "DISTINCT",
        "DO",
        "DOUBLE",
        "DROP",
        "DURATION",
        "ELEMENT",
        "ELSIF",
        "EMPTY",
        "END",
        "ESCAPE",
        "EXCEPTIONS",
        "EXCLUSIVE",
        "EXECUTE",
        "EXISTS",
        "EXIT",
        "EXTENDS",
        "EXTERNAL",
        "EXTRACT",
        "FALSE",
        "FETCH",
        "FINAL",
        "FIRST",
        "FIXED",
        "FLOAT",
        "FOR",
        "FORALL",
        "FORCE",
        "FROM",
        "FUNCTION",
        "GENERAL",
        "GOTO",
        "GRANT",
        "GROUP",
        "HASH",
        "HEAP",
        "HIDDEN",
        "HOUR",
        "IDENTIFIED",
        "IF",
        "IMMEDIATE",
        "IN",
        "INCLUDING",
        "INDEX",
        "INDEXES",
        "INDICATOR",
        "INDICES",
        "INFINITE",
        "INSTANTIABLE",
        "INT",
        "INTEGER",
        "INTERFACE",
        "INTERVAL",
        "INTO",
        "INVALIDATE",
        "IS",
        "ISOLATION",
        "JAVA",
        "LANGUAGE",
        "LARGE",
        "LEADING",
        "LENGTH",
        "LEVEL",
        "LIBRARY",
        "LIKE",
        "LIKE2",
        "LIKE4",
        "LIKEC",
        "LIMITED",
        "LOCAL",
        "LOCK",
        "LONG",
        "MAP",
        "MAX",
        "MAXLEN",
        "MEMBER",
        "MERGE",
        "MIN",
        "MINUTE",
        "MLSLABEL",
        "MOD",
        "MODE",
        "MONTH",
        "MULTISET",
        "NAME",
        "NAN",
        "NATIONAL",
        "NATIVE",
        "NATURAL",
        "NATURALN",
        "NCHAR",
        "NEW",
        "NEXTVAL",
        "NOCOMPRESS",
        "NOCOPY",
        "NOT",
        "NOWAIT",
        "NULL",
        "NULLIF",
        "NUMBER_BASE",
        "NUMBER",
        "OBJECT",
        "OCICOLL",
        "OCIDATE",
        "OCIDATETIME",
        "OCIDURATION",
        "OCIINTERVAL",
        "OCILOBLOCATOR",
        "OCINUMBER",
        "OCIRAW",
        "OCIREF",
        "OCIREFCURSOR",
        "OCIROWID",
        "OCISTRING",
        "OCITYPE",
        "OF",
        "OLD",
        "ON",
        "ONLY",
        "OPAQUE",
        "OPEN",
        "OPERATOR",
        "OPTION",
        "ORACLE",
        "ORADATA",
        "ORDER",
        "ORGANIZATION",
        "ORLANY",
        "ORLVARY",
        "OTHERS",
        "OUT",
        "OVERLAPS",
        "OVERRIDING",
        "PACKAGE",
        "PARALLEL_ENABLE",
        "PARAMETER",
        "PARAMETERS",
        "PARENT",
        "PARTITION",
        "PASCAL",
        "PCTFREE",
        "PIPE",
        "PIPELINED",
        "PLS_INTEGER",
        "PLUGGABLE",
        "POSITIVE",
        "POSITIVEN",
        "PRAGMA",
        "PRECISION",
        "PRIOR",
        "PRIVATE",
        "PROCEDURE",
        "PUBLIC",
        "RAISE",
        "RANGE",
        "RAW",
        "READ",
        "REAL",
        "RECORD",
        "REF",
        "REFERENCE",
        "RELEASE",
        "RELIES_ON",
        "REM",
        "REMAINDER",
        "RENAME",
        "RESOURCE",
        "RESULT_CACHE",
        "RESULT",
        "RETURN",
        "RETURNING",
        "REVERSE",
        "REVOKE",
        "ROLLBACK",
        "ROW",
        "ROWID",
        "ROWNUM",
        "ROWTYPE",
        "SAMPLE",
        "SAVE",
        "SAVEPOINT",
        "SB1",
        "SB2",
        "SB4",
        "SEARCH",
        "SECOND",
        "SEGMENT",
        "SELF",
        "SEPARATE",
        "SEQUENCE",
        "SERIALIZABLE",
        "SHARE",
        "SHORT",
        "SIZE_T",
        "SIZE",
        "SMALLINT",
        "SOME",
        "SPACE",
        "SPARSE",
        "SQL",
        "SQLCODE",
        "SQLDATA",
        "SQLERRM",
        "SQLNAME",
        "SQLSTATE",
        "STANDARD",
        "START",
        "STATIC",
        "STDDEV",
        "STORED",
        "STRING",
        "STRUCT",
        "STYLE",
        "SUBMULTISET",
        "SUBPARTITION",
        "SUBSTITUTABLE",
        "SUBTYPE",
        "SUCCESSFUL",
        "SUM",
        "SYNONYM",
        "SYSDATE",
        "TABAUTH",
        "TABLE",
        "TDO",
        "THE",
        "THEN",
        "TIME",
        "TIMESTAMP",
        "TIMEZONE_ABBR",
        "TIMEZONE_HOUR",
        "TIMEZONE_MINUTE",
        "TIMEZONE_REGION",
        "TO",
        "TRAILING",
        "TRANSACTION",
        "TRANSACTIONAL",
        "TRIGGER",
        "TRUE",
        "TRUSTED",
        "TYPE",
        "UB1",
        "UB2",
        "UB4",
        "UID",
        "UNDER",
        "UNIQUE",
        "UNPLUG",
        "UNSIGNED",
        "UNTRUSTED",
        "USE",
        "USER",
        "USING",
        "VALIDATE",
        "VALIST",
        "VALUE",
        "VARCHAR",
        "VARCHAR2",
        "VARIABLE",
        "VARIANCE",
        "VARRAY",
        "VARYING",
        "VIEW",
        "VIEWS",
        "VOID",
        "WHENEVER",
        "WHILE",
        "WITH",
        "WORK",
        "WRAPPED",
        "WRITE",
        "YEAR",
        "ZONE"
    ], nn = [
        "ADD",
        "ALTER COLUMN",
        "ALTER TABLE",
        "BEGIN",
        "CONNECT BY",
        "DECLARE",
        "DELETE FROM",
        "DELETE",
        "END",
        "EXCEPT",
        "EXCEPTION",
        "FETCH FIRST",
        "FROM",
        "GROUP BY",
        "HAVING",
        "INSERT INTO",
        "INSERT",
        "LIMIT",
        "LOOP",
        "MODIFY",
        "ORDER BY",
        "SELECT",
        "SET CURRENT SCHEMA",
        "SET SCHEMA",
        "SET",
        "START WITH",
        "UPDATE",
        "VALUES",
        "WHERE"
    ], Tn = [
        "INTERSECT",
        "INTERSECT ALL",
        "MINUS",
        "UNION",
        "UNION ALL"
    ], Rn = [
        "AND",
        "CROSS APPLY",
        "ELSE",
        "END",
        "OR",
        "OUTER APPLY",
        "WHEN",
        "XOR",
        "JOIN",
        "INNER JOIN",
        "LEFT JOIN",
        "LEFT OUTER JOIN",
        "RIGHT JOIN",
        "RIGHT OUTER JOIN",
        "FULL JOIN",
        "FULL OUTER JOIN",
        "CROSS JOIN",
        "NATURAL JOIN"
    ], Nn = function(e) {
        $r(t, e);
        var E = jr(t);
        function t() {
            return Zr(this, t), E.apply(this, arguments);
        }
        return zr(t, [
            {
                key: "tokenizer",
                value: function() {
                    return new qr.default({
                        reservedWords: rn,
                        reservedTopLevelWords: nn,
                        reservedNewlineWords: Rn,
                        reservedTopLevelWordsNoIndent: Tn,
                        stringTypes: [
                            '""',
                            "N''",
                            "''",
                            "``"
                        ],
                        openParens: [
                            "(",
                            "CASE"
                        ],
                        closeParens: [
                            ")",
                            "END"
                        ],
                        indexedPlaceholderTypes: [
                            "?"
                        ],
                        namedPlaceholderTypes: [
                            ":"
                        ],
                        lineCommentTypes: [
                            "--"
                        ],
                        specialWordChars: [
                            "_",
                            "$",
                            "#",
                            ".",
                            "@"
                        ],
                        operators: [
                            "||",
                            "**",
                            "!=",
                            ":="
                        ]
                    });
                }
            },
            {
                key: "tokenOverride",
                value: function(n) {
                    return (0, ut.isSet)(n) && (0, ut.isBy)(this.previousReservedToken) ? {
                        type: Qr.default.RESERVED,
                        value: n.value
                    } : n;
                }
            }
        ]), t;
    }(xr.default);
    g.default = Nn;
    at.exports = g.default;
});
var st6 = R13((B, Ct)=>{
    "use strict";
    function te(e) {
        return typeof Symbol == "function" && typeof Symbol.iterator == "symbol" ? te = function(t) {
            return typeof t;
        } : te = function(t) {
            return t && typeof Symbol == "function" && t.constructor === Symbol && t !== Symbol.prototype ? "symbol" : typeof t;
        }, te(e);
    }
    Object.defineProperty(B, "__esModule", {
        value: !0
    });
    B.default = void 0;
    var on = ft(u5()), In = ft(S11());
    function ft(e) {
        return e && e.__esModule ? e : {
            default: e
        };
    }
    function On(e, E) {
        if (!(e instanceof E)) throw new TypeError("Cannot call a class as a function");
    }
    function lt(e, E) {
        for(var t = 0; t < E.length; t++){
            var r = E[t];
            r.enumerable = r.enumerable || !1, r.configurable = !0, "value" in r && (r.writable = !0), Object.defineProperty(e, r.key, r);
        }
    }
    function An(e, E, t) {
        return E && lt(e.prototype, E), t && lt(e, t), e;
    }
    function un(e, E) {
        if (typeof E != "function" && E !== null) throw new TypeError("Super expression must either be null or a function");
        e.prototype = Object.create(E && E.prototype, {
            constructor: {
                value: e,
                writable: !0,
                configurable: !0
            }
        }), E && Pe(e, E);
    }
    function Pe(e, E) {
        return Pe = Object.setPrototypeOf || function(r, n) {
            return r.__proto__ = n, r;
        }, Pe(e, E);
    }
    function Sn(e) {
        var E = fn();
        return function() {
            var r = Ee(e), n;
            if (E) {
                var T = Ee(this).constructor;
                n = Reflect.construct(r, arguments, T);
            } else n = r.apply(this, arguments);
            return an(this, n);
        };
    }
    function an(e, E) {
        return E && (te(E) === "object" || typeof E == "function") ? E : Ln(e);
    }
    function Ln(e) {
        if (e === void 0) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
        return e;
    }
    function fn() {
        if (typeof Reflect == "undefined" || !Reflect.construct || Reflect.construct.sham) return !1;
        if (typeof Proxy == "function") return !0;
        try {
            return Date.prototype.toString.call(Reflect.construct(Date, [], function() {
            })), !0;
        } catch (e) {
            return !1;
        }
    }
    function Ee(e) {
        return Ee = Object.setPrototypeOf ? Object.getPrototypeOf : function(t) {
            return t.__proto__ || Object.getPrototypeOf(t);
        }, Ee(e);
    }
    var ln = [
        "ABORT",
        "ABSOLUTE",
        "ACCESS",
        "ACTION",
        "ADD",
        "ADMIN",
        "AFTER",
        "AGGREGATE",
        "ALL",
        "ALSO",
        "ALTER",
        "ALWAYS",
        "ANALYSE",
        "ANALYZE",
        "AND",
        "ANY",
        "ARRAY",
        "AS",
        "ASC",
        "ASSERTION",
        "ASSIGNMENT",
        "ASYMMETRIC",
        "AT",
        "ATTACH",
        "ATTRIBUTE",
        "AUTHORIZATION",
        "BACKWARD",
        "BEFORE",
        "BEGIN",
        "BETWEEN",
        "BIGINT",
        "BINARY",
        "BIT",
        "BOOLEAN",
        "BOTH",
        "BY",
        "CACHE",
        "CALL",
        "CALLED",
        "CASCADE",
        "CASCADED",
        "CASE",
        "CAST",
        "CATALOG",
        "CHAIN",
        "CHAR",
        "CHARACTER",
        "CHARACTERISTICS",
        "CHECK",
        "CHECKPOINT",
        "CLASS",
        "CLOSE",
        "CLUSTER",
        "COALESCE",
        "COLLATE",
        "COLLATION",
        "COLUMN",
        "COLUMNS",
        "COMMENT",
        "COMMENTS",
        "COMMIT",
        "COMMITTED",
        "CONCURRENTLY",
        "CONFIGURATION",
        "CONFLICT",
        "CONNECTION",
        "CONSTRAINT",
        "CONSTRAINTS",
        "CONTENT",
        "CONTINUE",
        "CONVERSION",
        "COPY",
        "COST",
        "CREATE",
        "CROSS",
        "CSV",
        "CUBE",
        "CURRENT",
        "CURRENT_CATALOG",
        "CURRENT_DATE",
        "CURRENT_ROLE",
        "CURRENT_SCHEMA",
        "CURRENT_TIME",
        "CURRENT_TIMESTAMP",
        "CURRENT_USER",
        "CURSOR",
        "CYCLE",
        "DATA",
        "DATABASE",
        "DAY",
        "DEALLOCATE",
        "DEC",
        "DECIMAL",
        "DECLARE",
        "DEFAULT",
        "DEFAULTS",
        "DEFERRABLE",
        "DEFERRED",
        "DEFINER",
        "DELETE",
        "DELIMITER",
        "DELIMITERS",
        "DEPENDS",
        "DESC",
        "DETACH",
        "DICTIONARY",
        "DISABLE",
        "DISCARD",
        "DISTINCT",
        "DO",
        "DOCUMENT",
        "DOMAIN",
        "DOUBLE",
        "DROP",
        "EACH",
        "ELSE",
        "ENABLE",
        "ENCODING",
        "ENCRYPTED",
        "END",
        "ENUM",
        "ESCAPE",
        "EVENT",
        "EXCEPT",
        "EXCLUDE",
        "EXCLUDING",
        "EXCLUSIVE",
        "EXECUTE",
        "EXISTS",
        "EXPLAIN",
        "EXPRESSION",
        "EXTENSION",
        "EXTERNAL",
        "EXTRACT",
        "FALSE",
        "FAMILY",
        "FETCH",
        "FILTER",
        "FIRST",
        "FLOAT",
        "FOLLOWING",
        "FOR",
        "FORCE",
        "FOREIGN",
        "FORWARD",
        "FREEZE",
        "FROM",
        "FULL",
        "FUNCTION",
        "FUNCTIONS",
        "GENERATED",
        "GLOBAL",
        "GRANT",
        "GRANTED",
        "GREATEST",
        "GROUP",
        "GROUPING",
        "GROUPS",
        "HANDLER",
        "HAVING",
        "HEADER",
        "HOLD",
        "HOUR",
        "IDENTITY",
        "IF",
        "ILIKE",
        "IMMEDIATE",
        "IMMUTABLE",
        "IMPLICIT",
        "IMPORT",
        "IN",
        "INCLUDE",
        "INCLUDING",
        "INCREMENT",
        "INDEX",
        "INDEXES",
        "INHERIT",
        "INHERITS",
        "INITIALLY",
        "INLINE",
        "INNER",
        "INOUT",
        "INPUT",
        "INSENSITIVE",
        "INSERT",
        "INSTEAD",
        "INT",
        "INTEGER",
        "INTERSECT",
        "INTERVAL",
        "INTO",
        "INVOKER",
        "IS",
        "ISNULL",
        "ISOLATION",
        "JOIN",
        "KEY",
        "LABEL",
        "LANGUAGE",
        "LARGE",
        "LAST",
        "LATERAL",
        "LEADING",
        "LEAKPROOF",
        "LEAST",
        "LEFT",
        "LEVEL",
        "LIKE",
        "LIMIT",
        "LISTEN",
        "LOAD",
        "LOCAL",
        "LOCALTIME",
        "LOCALTIMESTAMP",
        "LOCATION",
        "LOCK",
        "LOCKED",
        "LOGGED",
        "MAPPING",
        "MATCH",
        "MATERIALIZED",
        "MAXVALUE",
        "METHOD",
        "MINUTE",
        "MINVALUE",
        "MODE",
        "MONTH",
        "MOVE",
        "NAME",
        "NAMES",
        "NATIONAL",
        "NATURAL",
        "NCHAR",
        "NEW",
        "NEXT",
        "NFC",
        "NFD",
        "NFKC",
        "NFKD",
        "NO",
        "NONE",
        "NORMALIZE",
        "NORMALIZED",
        "NOT",
        "NOTHING",
        "NOTIFY",
        "NOTNULL",
        "NOWAIT",
        "NULL",
        "NULLIF",
        "NULLS",
        "NUMERIC",
        "OBJECT",
        "OF",
        "OFF",
        "OFFSET",
        "OIDS",
        "OLD",
        "ON",
        "ONLY",
        "OPERATOR",
        "OPTION",
        "OPTIONS",
        "OR",
        "ORDER",
        "ORDINALITY",
        "OTHERS",
        "OUT",
        "OUTER",
        "OVER",
        "OVERLAPS",
        "OVERLAY",
        "OVERRIDING",
        "OWNED",
        "OWNER",
        "PARALLEL",
        "PARSER",
        "PARTIAL",
        "PARTITION",
        "PASSING",
        "PASSWORD",
        "PLACING",
        "PLANS",
        "POLICY",
        "POSITION",
        "PRECEDING",
        "PRECISION",
        "PREPARE",
        "PREPARED",
        "PRESERVE",
        "PRIMARY",
        "PRIOR",
        "PRIVILEGES",
        "PROCEDURAL",
        "PROCEDURE",
        "PROCEDURES",
        "PROGRAM",
        "PUBLICATION",
        "QUOTE",
        "RANGE",
        "READ",
        "REAL",
        "REASSIGN",
        "RECHECK",
        "RECURSIVE",
        "REF",
        "REFERENCES",
        "REFERENCING",
        "REFRESH",
        "REINDEX",
        "RELATIVE",
        "RELEASE",
        "RENAME",
        "REPEATABLE",
        "REPLACE",
        "REPLICA",
        "RESET",
        "RESTART",
        "RESTRICT",
        "RETURNING",
        "RETURNS",
        "REVOKE",
        "RIGHT",
        "ROLE",
        "ROLLBACK",
        "ROLLUP",
        "ROUTINE",
        "ROUTINES",
        "ROW",
        "ROWS",
        "RULE",
        "SAVEPOINT",
        "SCHEMA",
        "SCHEMAS",
        "SCROLL",
        "SEARCH",
        "SECOND",
        "SECURITY",
        "SELECT",
        "SEQUENCE",
        "SEQUENCES",
        "SERIALIZABLE",
        "SERVER",
        "SESSION",
        "SESSION_USER",
        "SET",
        "SETOF",
        "SETS",
        "SHARE",
        "SHOW",
        "SIMILAR",
        "SIMPLE",
        "SKIP",
        "SMALLINT",
        "SNAPSHOT",
        "SOME",
        "SQL",
        "STABLE",
        "STANDALONE",
        "START",
        "STATEMENT",
        "STATISTICS",
        "STDIN",
        "STDOUT",
        "STORAGE",
        "STORED",
        "STRICT",
        "STRIP",
        "SUBSCRIPTION",
        "SUBSTRING",
        "SUPPORT",
        "SYMMETRIC",
        "SYSID",
        "SYSTEM",
        "TABLE",
        "TABLES",
        "TABLESAMPLE",
        "TABLESPACE",
        "TEMP",
        "TEMPLATE",
        "TEMPORARY",
        "TEXT",
        "THEN",
        "TIES",
        "TIME",
        "TIMESTAMP",
        "TO",
        "TRAILING",
        "TRANSACTION",
        "TRANSFORM",
        "TREAT",
        "TRIGGER",
        "TRIM",
        "TRUE",
        "TRUNCATE",
        "TRUSTED",
        "TYPE",
        "TYPES",
        "UESCAPE",
        "UNBOUNDED",
        "UNCOMMITTED",
        "UNENCRYPTED",
        "UNION",
        "UNIQUE",
        "UNKNOWN",
        "UNLISTEN",
        "UNLOGGED",
        "UNTIL",
        "UPDATE",
        "USER",
        "USING",
        "VACUUM",
        "VALID",
        "VALIDATE",
        "VALIDATOR",
        "VALUE",
        "VALUES",
        "VARCHAR",
        "VARIADIC",
        "VARYING",
        "VERBOSE",
        "VERSION",
        "VIEW",
        "VIEWS",
        "VOLATILE",
        "WHEN",
        "WHERE",
        "WHITESPACE",
        "WINDOW",
        "WITH",
        "WITHIN",
        "WITHOUT",
        "WORK",
        "WRAPPER",
        "WRITE",
        "XML",
        "XMLATTRIBUTES",
        "XMLCONCAT",
        "XMLELEMENT",
        "XMLEXISTS",
        "XMLFOREST",
        "XMLNAMESPACES",
        "XMLPARSE",
        "XMLPI",
        "XMLROOT",
        "XMLSERIALIZE",
        "XMLTABLE",
        "YEAR",
        "YES",
        "ZONE"
    ], Cn = [
        "ADD",
        "AFTER",
        "ALTER COLUMN",
        "ALTER TABLE",
        "CASE",
        "DELETE FROM",
        "END",
        "EXCEPT",
        "FETCH FIRST",
        "FROM",
        "GROUP BY",
        "HAVING",
        "INSERT INTO",
        "INSERT",
        "LIMIT",
        "ORDER BY",
        "SELECT",
        "SET CURRENT SCHEMA",
        "SET SCHEMA",
        "SET",
        "UPDATE",
        "VALUES",
        "WHERE"
    ], sn = [
        "INTERSECT",
        "INTERSECT ALL",
        "UNION",
        "UNION ALL"
    ], cn = [
        "AND",
        "ELSE",
        "OR",
        "WHEN",
        "JOIN",
        "INNER JOIN",
        "LEFT JOIN",
        "LEFT OUTER JOIN",
        "RIGHT JOIN",
        "RIGHT OUTER JOIN",
        "FULL JOIN",
        "FULL OUTER JOIN",
        "CROSS JOIN",
        "NATURAL JOIN"
    ], Dn = function(e) {
        un(t, e);
        var E = Sn(t);
        function t() {
            return On(this, t), E.apply(this, arguments);
        }
        return An(t, [
            {
                key: "tokenizer",
                value: function() {
                    return new In.default({
                        reservedWords: ln,
                        reservedTopLevelWords: Cn,
                        reservedNewlineWords: cn,
                        reservedTopLevelWordsNoIndent: sn,
                        stringTypes: [
                            '""',
                            "''",
                            "U&''",
                            'U&""',
                            "$$"
                        ],
                        openParens: [
                            "(",
                            "CASE"
                        ],
                        closeParens: [
                            ")",
                            "END"
                        ],
                        indexedPlaceholderTypes: [
                            "$"
                        ],
                        namedPlaceholderTypes: [
                            ":"
                        ],
                        lineCommentTypes: [
                            "--"
                        ],
                        operators: [
                            "!=",
                            "<<",
                            ">>",
                            "||/",
                            "|/",
                            "::",
                            "->>",
                            "->",
                            "~~*",
                            "~~",
                            "!~~*",
                            "!~~",
                            "~*",
                            "!~*",
                            "!~",
                            "!!"
                        ]
                    });
                }
            }
        ]), t;
    }(on.default);
    B.default = Dn;
    Ct.exports = B.default;
});
var Pt3 = R13((H, Ut)=>{
    "use strict";
    function re(e) {
        return typeof Symbol == "function" && typeof Symbol.iterator == "symbol" ? re = function(t) {
            return typeof t;
        } : re = function(t) {
            return t && typeof Symbol == "function" && t.constructor === Symbol && t !== Symbol.prototype ? "symbol" : typeof t;
        }, re(e);
    }
    Object.defineProperty(H, "__esModule", {
        value: !0
    });
    H.default = void 0;
    var Un = ct(u5()), Pn = ct(S11());
    function ct(e) {
        return e && e.__esModule ? e : {
            default: e
        };
    }
    function _n(e, E) {
        if (!(e instanceof E)) throw new TypeError("Cannot call a class as a function");
    }
    function Dt(e, E) {
        for(var t = 0; t < E.length; t++){
            var r = E[t];
            r.enumerable = r.enumerable || !1, r.configurable = !0, "value" in r && (r.writable = !0), Object.defineProperty(e, r.key, r);
        }
    }
    function pn(e, E, t) {
        return E && Dt(e.prototype, E), t && Dt(e, t), e;
    }
    function dn(e, E) {
        if (typeof E != "function" && E !== null) throw new TypeError("Super expression must either be null or a function");
        e.prototype = Object.create(E && E.prototype, {
            constructor: {
                value: e,
                writable: !0,
                configurable: !0
            }
        }), E && _e(e, E);
    }
    function _e(e, E) {
        return _e = Object.setPrototypeOf || function(r, n) {
            return r.__proto__ = n, r;
        }, _e(e, E);
    }
    function Mn(e) {
        var E = hn();
        return function() {
            var r = ne(e), n;
            if (E) {
                var T = ne(this).constructor;
                n = Reflect.construct(r, arguments, T);
            } else n = r.apply(this, arguments);
            return yn(this, n);
        };
    }
    function yn(e, E) {
        return E && (re(E) === "object" || typeof E == "function") ? E : vn(e);
    }
    function vn(e) {
        if (e === void 0) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
        return e;
    }
    function hn() {
        if (typeof Reflect == "undefined" || !Reflect.construct || Reflect.construct.sham) return !1;
        if (typeof Proxy == "function") return !0;
        try {
            return Date.prototype.toString.call(Reflect.construct(Date, [], function() {
            })), !0;
        } catch (e) {
            return !1;
        }
    }
    function ne(e) {
        return ne = Object.setPrototypeOf ? Object.getPrototypeOf : function(t) {
            return t.__proto__ || Object.getPrototypeOf(t);
        }, ne(e);
    }
    var Fn = [
        "AES128",
        "AES256",
        "ALLOWOVERWRITE",
        "ANALYSE",
        "ARRAY",
        "AS",
        "ASC",
        "AUTHORIZATION",
        "BACKUP",
        "BINARY",
        "BLANKSASNULL",
        "BOTH",
        "BYTEDICT",
        "BZIP2",
        "CAST",
        "CHECK",
        "COLLATE",
        "COLUMN",
        "CONSTRAINT",
        "CREATE",
        "CREDENTIALS",
        "CURRENT_DATE",
        "CURRENT_TIME",
        "CURRENT_TIMESTAMP",
        "CURRENT_USER",
        "CURRENT_USER_ID",
        "DEFAULT",
        "DEFERRABLE",
        "DEFLATE",
        "DEFRAG",
        "DELTA",
        "DELTA32K",
        "DESC",
        "DISABLE",
        "DISTINCT",
        "DO",
        "ELSE",
        "EMPTYASNULL",
        "ENABLE",
        "ENCODE",
        "ENCRYPT",
        "ENCRYPTION",
        "END",
        "EXPLICIT",
        "FALSE",
        "FOR",
        "FOREIGN",
        "FREEZE",
        "FULL",
        "GLOBALDICT256",
        "GLOBALDICT64K",
        "GRANT",
        "GZIP",
        "IDENTITY",
        "IGNORE",
        "ILIKE",
        "INITIALLY",
        "INTO",
        "LEADING",
        "LOCALTIME",
        "LOCALTIMESTAMP",
        "LUN",
        "LUNS",
        "LZO",
        "LZOP",
        "MINUS",
        "MOSTLY13",
        "MOSTLY32",
        "MOSTLY8",
        "NATURAL",
        "NEW",
        "NULLS",
        "OFF",
        "OFFLINE",
        "OFFSET",
        "OLD",
        "ON",
        "ONLY",
        "OPEN",
        "ORDER",
        "OVERLAPS",
        "PARALLEL",
        "PARTITION",
        "PERCENT",
        "PERMISSIONS",
        "PLACING",
        "PRIMARY",
        "RAW",
        "READRATIO",
        "RECOVER",
        "REFERENCES",
        "REJECTLOG",
        "RESORT",
        "RESTORE",
        "SESSION_USER",
        "SIMILAR",
        "SYSDATE",
        "SYSTEM",
        "TABLE",
        "TAG",
        "TDES",
        "TEXT255",
        "TEXT32K",
        "THEN",
        "TIMESTAMP",
        "TO",
        "TOP",
        "TRAILING",
        "TRUE",
        "TRUNCATECOLUMNS",
        "UNIQUE",
        "USER",
        "USING",
        "VERBOSE",
        "WALLET",
        "WHEN",
        "WITH",
        "WITHOUT",
        "PREDICATE",
        "COLUMNS",
        "COMPROWS",
        "COMPRESSION",
        "COPY",
        "FORMAT",
        "DELIMITER",
        "FIXEDWIDTH",
        "AVRO",
        "JSON",
        "ENCRYPTED",
        "BZIP2",
        "GZIP",
        "LZOP",
        "PARQUET",
        "ORC",
        "ACCEPTANYDATE",
        "ACCEPTINVCHARS",
        "BLANKSASNULL",
        "DATEFORMAT",
        "EMPTYASNULL",
        "ENCODING",
        "ESCAPE",
        "EXPLICIT_IDS",
        "FILLRECORD",
        "IGNOREBLANKLINES",
        "IGNOREHEADER",
        "NULL AS",
        "REMOVEQUOTES",
        "ROUNDEC",
        "TIMEFORMAT",
        "TRIMBLANKS",
        "TRUNCATECOLUMNS",
        "COMPROWS",
        "COMPUPDATE",
        "MAXERROR",
        "NOLOAD",
        "STATUPDATE",
        "MANIFEST",
        "REGION",
        "IAM_ROLE",
        "MASTER_SYMMETRIC_KEY",
        "SSH",
        "ACCEPTANYDATE",
        "ACCEPTINVCHARS",
        "ACCESS_KEY_ID",
        "SECRET_ACCESS_KEY",
        "AVRO",
        "BLANKSASNULL",
        "BZIP2",
        "COMPROWS",
        "COMPUPDATE",
        "CREDENTIALS",
        "DATEFORMAT",
        "DELIMITER",
        "EMPTYASNULL",
        "ENCODING",
        "ENCRYPTED",
        "ESCAPE",
        "EXPLICIT_IDS",
        "FILLRECORD",
        "FIXEDWIDTH",
        "FORMAT",
        "IAM_ROLE",
        "GZIP",
        "IGNOREBLANKLINES",
        "IGNOREHEADER",
        "JSON",
        "LZOP",
        "MANIFEST",
        "MASTER_SYMMETRIC_KEY",
        "MAXERROR",
        "NOLOAD",
        "NULL AS",
        "READRATIO",
        "REGION",
        "REMOVEQUOTES",
        "ROUNDEC",
        "SSH",
        "STATUPDATE",
        "TIMEFORMAT",
        "SESSION_TOKEN",
        "TRIMBLANKS",
        "TRUNCATECOLUMNS",
        "EXTERNAL",
        "DATA CATALOG",
        "HIVE METASTORE",
        "CATALOG_ROLE",
        "VACUUM",
        "COPY",
        "UNLOAD",
        "EVEN",
        "ALL"
    ], Gn = [
        "ADD",
        "AFTER",
        "ALTER COLUMN",
        "ALTER TABLE",
        "DELETE FROM",
        "EXCEPT",
        "FROM",
        "GROUP BY",
        "HAVING",
        "INSERT INTO",
        "INSERT",
        "INTERSECT",
        "TOP",
        "LIMIT",
        "MODIFY",
        "ORDER BY",
        "SELECT",
        "SET CURRENT SCHEMA",
        "SET SCHEMA",
        "SET",
        "UNION ALL",
        "UNION",
        "UPDATE",
        "VALUES",
        "WHERE",
        "VACUUM",
        "COPY",
        "UNLOAD",
        "ANALYZE",
        "ANALYSE",
        "DISTKEY",
        "SORTKEY",
        "COMPOUND",
        "INTERLEAVED",
        "FORMAT",
        "DELIMITER",
        "FIXEDWIDTH",
        "AVRO",
        "JSON",
        "ENCRYPTED",
        "BZIP2",
        "GZIP",
        "LZOP",
        "PARQUET",
        "ORC",
        "ACCEPTANYDATE",
        "ACCEPTINVCHARS",
        "BLANKSASNULL",
        "DATEFORMAT",
        "EMPTYASNULL",
        "ENCODING",
        "ESCAPE",
        "EXPLICIT_IDS",
        "FILLRECORD",
        "IGNOREBLANKLINES",
        "IGNOREHEADER",
        "NULL AS",
        "REMOVEQUOTES",
        "ROUNDEC",
        "TIMEFORMAT",
        "TRIMBLANKS",
        "TRUNCATECOLUMNS",
        "COMPROWS",
        "COMPUPDATE",
        "MAXERROR",
        "NOLOAD",
        "STATUPDATE",
        "MANIFEST",
        "REGION",
        "IAM_ROLE",
        "MASTER_SYMMETRIC_KEY",
        "SSH",
        "ACCEPTANYDATE",
        "ACCEPTINVCHARS",
        "ACCESS_KEY_ID",
        "SECRET_ACCESS_KEY",
        "AVRO",
        "BLANKSASNULL",
        "BZIP2",
        "COMPROWS",
        "COMPUPDATE",
        "CREDENTIALS",
        "DATEFORMAT",
        "DELIMITER",
        "EMPTYASNULL",
        "ENCODING",
        "ENCRYPTED",
        "ESCAPE",
        "EXPLICIT_IDS",
        "FILLRECORD",
        "FIXEDWIDTH",
        "FORMAT",
        "IAM_ROLE",
        "GZIP",
        "IGNOREBLANKLINES",
        "IGNOREHEADER",
        "JSON",
        "LZOP",
        "MANIFEST",
        "MASTER_SYMMETRIC_KEY",
        "MAXERROR",
        "NOLOAD",
        "NULL AS",
        "READRATIO",
        "REGION",
        "REMOVEQUOTES",
        "ROUNDEC",
        "SSH",
        "STATUPDATE",
        "TIMEFORMAT",
        "SESSION_TOKEN",
        "TRIMBLANKS",
        "TRUNCATECOLUMNS",
        "EXTERNAL",
        "DATA CATALOG",
        "HIVE METASTORE",
        "CATALOG_ROLE"
    ], mn = [], gn = [
        "AND",
        "ELSE",
        "OR",
        "OUTER APPLY",
        "WHEN",
        "VACUUM",
        "COPY",
        "UNLOAD",
        "ANALYZE",
        "ANALYSE",
        "DISTKEY",
        "SORTKEY",
        "COMPOUND",
        "INTERLEAVED",
        "JOIN",
        "INNER JOIN",
        "LEFT JOIN",
        "LEFT OUTER JOIN",
        "RIGHT JOIN",
        "RIGHT OUTER JOIN",
        "FULL JOIN",
        "FULL OUTER JOIN",
        "CROSS JOIN",
        "NATURAL JOIN"
    ], Bn = function(e) {
        dn(t, e);
        var E = Mn(t);
        function t() {
            return _n(this, t), E.apply(this, arguments);
        }
        return pn(t, [
            {
                key: "tokenizer",
                value: function() {
                    return new Pn.default({
                        reservedWords: Fn,
                        reservedTopLevelWords: Gn,
                        reservedNewlineWords: gn,
                        reservedTopLevelWordsNoIndent: mn,
                        stringTypes: [
                            '""',
                            "''",
                            "``"
                        ],
                        openParens: [
                            "("
                        ],
                        closeParens: [
                            ")"
                        ],
                        indexedPlaceholderTypes: [
                            "?"
                        ],
                        namedPlaceholderTypes: [
                            "@",
                            "#",
                            "$"
                        ],
                        lineCommentTypes: [
                            "--"
                        ],
                        operators: [
                            "|/",
                            "||/",
                            "<<",
                            ">>",
                            "!=",
                            "||"
                        ]
                    });
                }
            }
        ]), t;
    }(Un.default);
    H.default = Bn;
    Ut.exports = H.default;
});
var Mt2 = R13((W, dt)=>{
    "use strict";
    function Te(e) {
        return typeof Symbol == "function" && typeof Symbol.iterator == "symbol" ? Te = function(t) {
            return typeof t;
        } : Te = function(t) {
            return t && typeof Symbol == "function" && t.constructor === Symbol && t !== Symbol.prototype ? "symbol" : typeof t;
        }, Te(e);
    }
    Object.defineProperty(W, "__esModule", {
        value: !0
    });
    W.default = void 0;
    var Hn = pe(u5()), _t = k8(), Wn = pe(S11()), Re = pe(f9());
    function pe(e) {
        return e && e.__esModule ? e : {
            default: e
        };
    }
    function Vn(e, E) {
        if (!(e instanceof E)) throw new TypeError("Cannot call a class as a function");
    }
    function pt(e, E) {
        for(var t = 0; t < E.length; t++){
            var r = E[t];
            r.enumerable = r.enumerable || !1, r.configurable = !0, "value" in r && (r.writable = !0), Object.defineProperty(e, r.key, r);
        }
    }
    function Yn(e, E, t) {
        return E && pt(e.prototype, E), t && pt(e, t), e;
    }
    function bn(e, E) {
        if (typeof E != "function" && E !== null) throw new TypeError("Super expression must either be null or a function");
        e.prototype = Object.create(E && E.prototype, {
            constructor: {
                value: e,
                writable: !0,
                configurable: !0
            }
        }), E && de(e, E);
    }
    function de(e, E) {
        return de = Object.setPrototypeOf || function(r, n) {
            return r.__proto__ = n, r;
        }, de(e, E);
    }
    function kn(e) {
        var E = Kn();
        return function() {
            var r = Ne(e), n;
            if (E) {
                var T = Ne(this).constructor;
                n = Reflect.construct(r, arguments, T);
            } else n = r.apply(this, arguments);
            return Xn(this, n);
        };
    }
    function Xn(e, E) {
        return E && (Te(E) === "object" || typeof E == "function") ? E : wn(e);
    }
    function wn(e) {
        if (e === void 0) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
        return e;
    }
    function Kn() {
        if (typeof Reflect == "undefined" || !Reflect.construct || Reflect.construct.sham) return !1;
        if (typeof Proxy == "function") return !0;
        try {
            return Date.prototype.toString.call(Reflect.construct(Date, [], function() {
            })), !0;
        } catch (e) {
            return !1;
        }
    }
    function Ne(e) {
        return Ne = Object.setPrototypeOf ? Object.getPrototypeOf : function(t) {
            return t.__proto__ || Object.getPrototypeOf(t);
        }, Ne(e);
    }
    var Jn = [
        "ALL",
        "ALTER",
        "ANALYSE",
        "ANALYZE",
        "ARRAY_ZIP",
        "ARRAY",
        "AS",
        "ASC",
        "AVG",
        "BETWEEN",
        "CASCADE",
        "CASE",
        "CAST",
        "COALESCE",
        "COLLECT_LIST",
        "COLLECT_SET",
        "COLUMN",
        "COLUMNS",
        "COMMENT",
        "CONSTRAINT",
        "CONTAINS",
        "CONVERT",
        "COUNT",
        "CUME_DIST",
        "CURRENT ROW",
        "CURRENT_DATE",
        "CURRENT_TIMESTAMP",
        "DATABASE",
        "DATABASES",
        "DATE_ADD",
        "DATE_SUB",
        "DATE_TRUNC",
        "DAY_HOUR",
        "DAY_MINUTE",
        "DAY_SECOND",
        "DAY",
        "DAYS",
        "DECODE",
        "DEFAULT",
        "DELETE",
        "DENSE_RANK",
        "DESC",
        "DESCRIBE",
        "DISTINCT",
        "DISTINCTROW",
        "DIV",
        "DROP",
        "ELSE",
        "ENCODE",
        "END",
        "EXISTS",
        "EXPLAIN",
        "EXPLODE_OUTER",
        "EXPLODE",
        "FILTER",
        "FIRST_VALUE",
        "FIRST",
        "FIXED",
        "FLATTEN",
        "FOLLOWING",
        "FROM_UNIXTIME",
        "FULL",
        "GREATEST",
        "GROUP_CONCAT",
        "HOUR_MINUTE",
        "HOUR_SECOND",
        "HOUR",
        "HOURS",
        "IF",
        "IFNULL",
        "IN",
        "INSERT",
        "INTERVAL",
        "INTO",
        "IS",
        "LAG",
        "LAST_VALUE",
        "LAST",
        "LEAD",
        "LEADING",
        "LEAST",
        "LEVEL",
        "LIKE",
        "MAX",
        "MERGE",
        "MIN",
        "MINUTE_SECOND",
        "MINUTE",
        "MONTH",
        "NATURAL",
        "NOT",
        "NOW()",
        "NTILE",
        "NULL",
        "NULLIF",
        "OFFSET",
        "ON DELETE",
        "ON UPDATE",
        "ON",
        "ONLY",
        "OPTIMIZE",
        "OVER",
        "PERCENT_RANK",
        "PRECEDING",
        "RANGE",
        "RANK",
        "REGEXP",
        "RENAME",
        "RLIKE",
        "ROW",
        "ROWS",
        "SECOND",
        "SEPARATOR",
        "SEQUENCE",
        "SIZE",
        "STRING",
        "STRUCT",
        "SUM",
        "TABLE",
        "TABLES",
        "TEMPORARY",
        "THEN",
        "TO_DATE",
        "TO_JSON",
        "TO",
        "TRAILING",
        "TRANSFORM",
        "TRUE",
        "TRUNCATE",
        "TYPE",
        "TYPES",
        "UNBOUNDED",
        "UNIQUE",
        "UNIX_TIMESTAMP",
        "UNLOCK",
        "UNSIGNED",
        "USING",
        "VARIABLES",
        "VIEW",
        "WHEN",
        "WITH",
        "YEAR_MONTH"
    ], xn = [
        "ADD",
        "AFTER",
        "ALTER COLUMN",
        "ALTER DATABASE",
        "ALTER SCHEMA",
        "ALTER TABLE",
        "CLUSTER BY",
        "CLUSTERED BY",
        "DELETE FROM",
        "DISTRIBUTE BY",
        "FROM",
        "GROUP BY",
        "HAVING",
        "INSERT INTO",
        "INSERT",
        "LIMIT",
        "OPTIONS",
        "ORDER BY",
        "PARTITION BY",
        "PARTITIONED BY",
        "RANGE",
        "ROWS",
        "SELECT",
        "SET CURRENT SCHEMA",
        "SET SCHEMA",
        "SET",
        "TBLPROPERTIES",
        "UPDATE",
        "USING",
        "VALUES",
        "WHERE",
        "WINDOW"
    ], qn = [
        "EXCEPT ALL",
        "EXCEPT",
        "INTERSECT ALL",
        "INTERSECT",
        "UNION ALL",
        "UNION"
    ], Qn = [
        "AND",
        "CREATE OR",
        "CREATE",
        "ELSE",
        "LATERAL VIEW",
        "OR",
        "OUTER APPLY",
        "WHEN",
        "XOR",
        "JOIN",
        "INNER JOIN",
        "LEFT JOIN",
        "LEFT OUTER JOIN",
        "RIGHT JOIN",
        "RIGHT OUTER JOIN",
        "FULL JOIN",
        "FULL OUTER JOIN",
        "CROSS JOIN",
        "NATURAL JOIN",
        "ANTI JOIN",
        "SEMI JOIN",
        "LEFT ANTI JOIN",
        "LEFT SEMI JOIN",
        "RIGHT OUTER JOIN",
        "RIGHT SEMI JOIN",
        "NATURAL ANTI JOIN",
        "NATURAL FULL OUTER JOIN",
        "NATURAL INNER JOIN",
        "NATURAL LEFT ANTI JOIN",
        "NATURAL LEFT OUTER JOIN",
        "NATURAL LEFT SEMI JOIN",
        "NATURAL OUTER JOIN",
        "NATURAL RIGHT OUTER JOIN",
        "NATURAL RIGHT SEMI JOIN",
        "NATURAL SEMI JOIN"
    ], Zn = function(e) {
        bn(t, e);
        var E = kn(t);
        function t() {
            return Vn(this, t), E.apply(this, arguments);
        }
        return Yn(t, [
            {
                key: "tokenizer",
                value: function() {
                    return new Wn.default({
                        reservedWords: Jn,
                        reservedTopLevelWords: xn,
                        reservedNewlineWords: Qn,
                        reservedTopLevelWordsNoIndent: qn,
                        stringTypes: [
                            '""',
                            "''",
                            "``",
                            "{}"
                        ],
                        openParens: [
                            "(",
                            "CASE"
                        ],
                        closeParens: [
                            ")",
                            "END"
                        ],
                        indexedPlaceholderTypes: [
                            "?"
                        ],
                        namedPlaceholderTypes: [
                            "$"
                        ],
                        lineCommentTypes: [
                            "--"
                        ],
                        operators: [
                            "!=",
                            "<=>",
                            "&&",
                            "||",
                            "=="
                        ]
                    });
                }
            },
            {
                key: "tokenOverride",
                value: function(n) {
                    if ((0, _t.isWindow)(n)) {
                        var T = this.tokenLookAhead();
                        if (T && T.type === Re.default.OPEN_PAREN) return {
                            type: Re.default.RESERVED,
                            value: n.value
                        };
                    }
                    if ((0, _t.isEnd)(n)) {
                        var o = this.tokenLookBehind();
                        if (o && o.type === Re.default.OPERATOR && o.value === ".") return {
                            type: Re.default.WORD,
                            value: n.value
                        };
                    }
                    return n;
                }
            }
        ]), t;
    }(Hn.default);
    W.default = Zn;
    dt.exports = W.default;
});
var Ft4 = R13((V, ht)=>{
    "use strict";
    function oe(e) {
        return typeof Symbol == "function" && typeof Symbol.iterator == "symbol" ? oe = function(t) {
            return typeof t;
        } : oe = function(t) {
            return t && typeof Symbol == "function" && t.constructor === Symbol && t !== Symbol.prototype ? "symbol" : typeof t;
        }, oe(e);
    }
    Object.defineProperty(V, "__esModule", {
        value: !0
    });
    V.default = void 0;
    var zn = yt(u5()), $n = yt(S11());
    function yt(e) {
        return e && e.__esModule ? e : {
            default: e
        };
    }
    function jn(e, E) {
        if (!(e instanceof E)) throw new TypeError("Cannot call a class as a function");
    }
    function vt(e, E) {
        for(var t = 0; t < E.length; t++){
            var r = E[t];
            r.enumerable = r.enumerable || !1, r.configurable = !0, "value" in r && (r.writable = !0), Object.defineProperty(e, r.key, r);
        }
    }
    function eT(e, E, t) {
        return E && vt(e.prototype, E), t && vt(e, t), e;
    }
    function tT(e, E) {
        if (typeof E != "function" && E !== null) throw new TypeError("Super expression must either be null or a function");
        e.prototype = Object.create(E && E.prototype, {
            constructor: {
                value: e,
                writable: !0,
                configurable: !0
            }
        }), E && Me(e, E);
    }
    function Me(e, E) {
        return Me = Object.setPrototypeOf || function(r, n) {
            return r.__proto__ = n, r;
        }, Me(e, E);
    }
    function ET(e) {
        var E = TT();
        return function() {
            var r = Ie(e), n;
            if (E) {
                var T = Ie(this).constructor;
                n = Reflect.construct(r, arguments, T);
            } else n = r.apply(this, arguments);
            return rT(this, n);
        };
    }
    function rT(e, E) {
        return E && (oe(E) === "object" || typeof E == "function") ? E : nT(e);
    }
    function nT(e) {
        if (e === void 0) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
        return e;
    }
    function TT() {
        if (typeof Reflect == "undefined" || !Reflect.construct || Reflect.construct.sham) return !1;
        if (typeof Proxy == "function") return !0;
        try {
            return Date.prototype.toString.call(Reflect.construct(Date, [], function() {
            })), !0;
        } catch (e) {
            return !1;
        }
    }
    function Ie(e) {
        return Ie = Object.setPrototypeOf ? Object.getPrototypeOf : function(t) {
            return t.__proto__ || Object.getPrototypeOf(t);
        }, Ie(e);
    }
    var RT = [
        "ABS",
        "ALL",
        "ALLOCATE",
        "ALTER",
        "AND",
        "ANY",
        "ARE",
        "ARRAY",
        "AS",
        "ASENSITIVE",
        "ASYMMETRIC",
        "AT",
        "ATOMIC",
        "AUTHORIZATION",
        "AVG",
        "BEGIN",
        "BETWEEN",
        "BIGINT",
        "BINARY",
        "BLOB",
        "BOOLEAN",
        "BOTH",
        "BY",
        "CALL",
        "CALLED",
        "CARDINALITY",
        "CASCADED",
        "CASE",
        "CAST",
        "CEIL",
        "CEILING",
        "CHAR",
        "CHAR_LENGTH",
        "CHARACTER",
        "CHARACTER_LENGTH",
        "CHECK",
        "CLOB",
        "CLOSE",
        "COALESCE",
        "COLLATE",
        "COLLECT",
        "COLUMN",
        "COMMIT",
        "CONDITION",
        "CONNECT",
        "CONSTRAINT",
        "CONVERT",
        "CORR",
        "CORRESPONDING",
        "COUNT",
        "COVAR_POP",
        "COVAR_SAMP",
        "CREATE",
        "CROSS",
        "CUBE",
        "CUME_DIST",
        "CURRENT",
        "CURRENT_CATALOG",
        "CURRENT_DATE",
        "CURRENT_DEFAULT_TRANSFORM_GROUP",
        "CURRENT_PATH",
        "CURRENT_ROLE",
        "CURRENT_SCHEMA",
        "CURRENT_TIME",
        "CURRENT_TIMESTAMP",
        "CURRENT_TRANSFORM_GROUP_FOR_TYPE",
        "CURRENT_USER",
        "CURSOR",
        "CYCLE",
        "DATE",
        "DAY",
        "DEALLOCATE",
        "DEC",
        "DECIMAL",
        "DECLARE",
        "DEFAULT",
        "DELETE",
        "DENSE_RANK",
        "DEREF",
        "DESCRIBE",
        "DETERMINISTIC",
        "DISCONNECT",
        "DISTINCT",
        "DOUBLE",
        "DROP",
        "DYNAMIC",
        "EACH",
        "ELEMENT",
        "ELSE",
        "END",
        "END-EXEC",
        "ESCAPE",
        "EVERY",
        "EXCEPT",
        "EXEC",
        "EXECUTE",
        "EXISTS",
        "EXP",
        "EXTERNAL",
        "EXTRACT",
        "FALSE",
        "FETCH",
        "FILTER",
        "FLOAT",
        "FLOOR",
        "FOR",
        "FOREIGN",
        "FREE",
        "FROM",
        "FULL",
        "FUNCTION",
        "FUSION",
        "GET",
        "GLOBAL",
        "GRANT",
        "GROUP",
        "GROUPING",
        "HAVING",
        "HOLD",
        "HOUR",
        "IDENTITY",
        "IN",
        "INDICATOR",
        "INNER",
        "INOUT",
        "INSENSITIVE",
        "INSERT",
        "INT",
        "INTEGER",
        "INTERSECT",
        "INTERSECTION",
        "INTERVAL",
        "INTO",
        "IS",
        "JOIN",
        "LANGUAGE",
        "LARGE",
        "LATERAL",
        "LEADING",
        "LEFT",
        "LIKE",
        "LIKE_REGEX",
        "LN",
        "LOCAL",
        "LOCALTIME",
        "LOCALTIMESTAMP",
        "LOWER",
        "MATCH",
        "MAX",
        "MEMBER",
        "MERGE",
        "METHOD",
        "MIN",
        "MINUTE",
        "MOD",
        "MODIFIES",
        "MODULE",
        "MONTH",
        "MULTISET",
        "NATIONAL",
        "NATURAL",
        "NCHAR",
        "NCLOB",
        "NEW",
        "NO",
        "NONE",
        "NORMALIZE",
        "NOT",
        "NULL",
        "NULLIF",
        "NUMERIC",
        "OCTET_LENGTH",
        "OCCURRENCES_REGEX",
        "OF",
        "OLD",
        "ON",
        "ONLY",
        "OPEN",
        "OR",
        "ORDER",
        "OUT",
        "OUTER",
        "OVER",
        "OVERLAPS",
        "OVERLAY",
        "PARAMETER",
        "PARTITION",
        "PERCENT_RANK",
        "PERCENTILE_CONT",
        "PERCENTILE_DISC",
        "POSITION",
        "POSITION_REGEX",
        "POWER",
        "PRECISION",
        "PREPARE",
        "PRIMARY",
        "PROCEDURE",
        "RANGE",
        "RANK",
        "READS",
        "REAL",
        "RECURSIVE",
        "REF",
        "REFERENCES",
        "REFERENCING",
        "REGR_AVGX",
        "REGR_AVGY",
        "REGR_COUNT",
        "REGR_INTERCEPT",
        "REGR_R2",
        "REGR_SLOPE",
        "REGR_SXX",
        "REGR_SXY",
        "REGR_SYY",
        "RELEASE",
        "RESULT",
        "RETURN",
        "RETURNS",
        "REVOKE",
        "RIGHT",
        "ROLLBACK",
        "ROLLUP",
        "ROW",
        "ROW_NUMBER",
        "ROWS",
        "SAVEPOINT",
        "SCOPE",
        "SCROLL",
        "SEARCH",
        "SECOND",
        "SELECT",
        "SENSITIVE",
        "SESSION_USER",
        "SET",
        "SIMILAR",
        "SMALLINT",
        "SOME",
        "SPECIFIC",
        "SPECIFICTYPE",
        "SQL",
        "SQLEXCEPTION",
        "SQLSTATE",
        "SQLWARNING",
        "SQRT",
        "START",
        "STATIC",
        "STDDEV_POP",
        "STDDEV_SAMP",
        "SUBMULTISET",
        "SUBSTRING",
        "SUBSTRING_REGEX",
        "SUM",
        "SYMMETRIC",
        "SYSTEM",
        "SYSTEM_USER",
        "TABLE",
        "TABLESAMPLE",
        "THEN",
        "TIME",
        "TIMESTAMP",
        "TIMEZONE_HOUR",
        "TIMEZONE_MINUTE",
        "TO",
        "TRAILING",
        "TRANSLATE",
        "TRANSLATE_REGEX",
        "TRANSLATION",
        "TREAT",
        "TRIGGER",
        "TRIM",
        "TRUE",
        "UESCAPE",
        "UNION",
        "UNIQUE",
        "UNKNOWN",
        "UNNEST",
        "UPDATE",
        "UPPER",
        "USER",
        "USING",
        "VALUE",
        "VALUES",
        "VAR_POP",
        "VAR_SAMP",
        "VARBINARY",
        "VARCHAR",
        "VARYING",
        "WHEN",
        "WHENEVER",
        "WHERE",
        "WIDTH_BUCKET",
        "WINDOW",
        "WITH",
        "WITHIN",
        "WITHOUT",
        "YEAR"
    ], NT = [
        "ADD",
        "ALTER COLUMN",
        "ALTER TABLE",
        "CASE",
        "DELETE FROM",
        "END",
        "FETCH FIRST",
        "FETCH NEXT",
        "FETCH PRIOR",
        "FETCH LAST",
        "FETCH ABSOLUTE",
        "FETCH RELATIVE",
        "FROM",
        "GROUP BY",
        "HAVING",
        "INSERT INTO",
        "LIMIT",
        "ORDER BY",
        "SELECT",
        "SET SCHEMA",
        "SET",
        "UPDATE",
        "VALUES",
        "WHERE"
    ], oT = [
        "INTERSECT",
        "INTERSECT ALL",
        "INTERSECT DISTINCT",
        "UNION",
        "UNION ALL",
        "UNION DISTINCT",
        "EXCEPT",
        "EXCEPT ALL",
        "EXCEPT DISTINCT"
    ], IT = [
        "AND",
        "ELSE",
        "OR",
        "WHEN",
        "JOIN",
        "INNER JOIN",
        "LEFT JOIN",
        "LEFT OUTER JOIN",
        "RIGHT JOIN",
        "RIGHT OUTER JOIN",
        "FULL JOIN",
        "FULL OUTER JOIN",
        "CROSS JOIN",
        "NATURAL JOIN"
    ], OT = function(e) {
        tT(t, e);
        var E = ET(t);
        function t() {
            return jn(this, t), E.apply(this, arguments);
        }
        return eT(t, [
            {
                key: "tokenizer",
                value: function() {
                    return new $n.default({
                        reservedWords: RT,
                        reservedTopLevelWords: NT,
                        reservedNewlineWords: IT,
                        reservedTopLevelWordsNoIndent: oT,
                        stringTypes: [
                            '""',
                            "''"
                        ],
                        openParens: [
                            "(",
                            "CASE"
                        ],
                        closeParens: [
                            ")",
                            "END"
                        ],
                        indexedPlaceholderTypes: [
                            "?"
                        ],
                        namedPlaceholderTypes: [],
                        lineCommentTypes: [
                            "--"
                        ]
                    });
                }
            }
        ]), t;
    }(zn.default);
    V.default = OT;
    ht.exports = V.default;
});
var Bt3 = R13((Y, gt)=>{
    "use strict";
    function Oe(e) {
        return typeof Symbol == "function" && typeof Symbol.iterator == "symbol" ? Oe = function(t) {
            return typeof t;
        } : Oe = function(t) {
            return t && typeof Symbol == "function" && t.constructor === Symbol && t !== Symbol.prototype ? "symbol" : typeof t;
        }, Oe(e);
    }
    Object.defineProperty(Y, "__esModule", {
        value: !0
    });
    Y.default = void 0;
    var AT = Gt(u5()), iT = Gt(S11());
    function Gt(e) {
        return e && e.__esModule ? e : {
            default: e
        };
    }
    function uT(e, E) {
        if (!(e instanceof E)) throw new TypeError("Cannot call a class as a function");
    }
    function mt(e, E) {
        for(var t = 0; t < E.length; t++){
            var r = E[t];
            r.enumerable = r.enumerable || !1, r.configurable = !0, "value" in r && (r.writable = !0), Object.defineProperty(e, r.key, r);
        }
    }
    function ST(e, E, t) {
        return E && mt(e.prototype, E), t && mt(e, t), e;
    }
    function aT(e, E) {
        if (typeof E != "function" && E !== null) throw new TypeError("Super expression must either be null or a function");
        e.prototype = Object.create(E && E.prototype, {
            constructor: {
                value: e,
                writable: !0,
                configurable: !0
            }
        }), E && ye(e, E);
    }
    function ye(e, E) {
        return ye = Object.setPrototypeOf || function(r, n) {
            return r.__proto__ = n, r;
        }, ye(e, E);
    }
    function LT(e) {
        var E = CT();
        return function() {
            var r = Ae(e), n;
            if (E) {
                var T = Ae(this).constructor;
                n = Reflect.construct(r, arguments, T);
            } else n = r.apply(this, arguments);
            return fT(this, n);
        };
    }
    function fT(e, E) {
        return E && (Oe(E) === "object" || typeof E == "function") ? E : lT(e);
    }
    function lT(e) {
        if (e === void 0) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
        return e;
    }
    function CT() {
        if (typeof Reflect == "undefined" || !Reflect.construct || Reflect.construct.sham) return !1;
        if (typeof Proxy == "function") return !0;
        try {
            return Date.prototype.toString.call(Reflect.construct(Date, [], function() {
            })), !0;
        } catch (e) {
            return !1;
        }
    }
    function Ae(e) {
        return Ae = Object.setPrototypeOf ? Object.getPrototypeOf : function(t) {
            return t.__proto__ || Object.getPrototypeOf(t);
        }, Ae(e);
    }
    var sT = [
        "ADD",
        "EXTERNAL",
        "PROCEDURE",
        "ALL",
        "FETCH",
        "PUBLIC",
        "ALTER",
        "FILE",
        "RAISERROR",
        "AND",
        "FILLFACTOR",
        "READ",
        "ANY",
        "FOR",
        "READTEXT",
        "AS",
        "FOREIGN",
        "RECONFIGURE",
        "ASC",
        "FREETEXT",
        "REFERENCES",
        "AUTHORIZATION",
        "FREETEXTTABLE",
        "REPLICATION",
        "BACKUP",
        "FROM",
        "RESTORE",
        "BEGIN",
        "FULL",
        "RESTRICT",
        "BETWEEN",
        "FUNCTION",
        "RETURN",
        "BREAK",
        "GOTO",
        "REVERT",
        "BROWSE",
        "GRANT",
        "REVOKE",
        "BULK",
        "GROUP",
        "RIGHT",
        "BY",
        "HAVING",
        "ROLLBACK",
        "CASCADE",
        "HOLDLOCK",
        "ROWCOUNT",
        "CASE",
        "IDENTITY",
        "ROWGUIDCOL",
        "CHECK",
        "IDENTITY_INSERT",
        "RULE",
        "CHECKPOINT",
        "IDENTITYCOL",
        "SAVE",
        "CLOSE",
        "IF",
        "SCHEMA",
        "CLUSTERED",
        "IN",
        "SECURITYAUDIT",
        "COALESCE",
        "INDEX",
        "SELECT",
        "COLLATE",
        "INNER",
        "SEMANTICKEYPHRASETABLE",
        "COLUMN",
        "INSERT",
        "SEMANTICSIMILARITYDETAILSTABLE",
        "COMMIT",
        "INTERSECT",
        "SEMANTICSIMILARITYTABLE",
        "COMPUTE",
        "INTO",
        "SESSION_USER",
        "CONSTRAINT",
        "IS",
        "SET",
        "CONTAINS",
        "JOIN",
        "SETUSER",
        "CONTAINSTABLE",
        "KEY",
        "SHUTDOWN",
        "CONTINUE",
        "KILL",
        "SOME",
        "CONVERT",
        "LEFT",
        "STATISTICS",
        "CREATE",
        "LIKE",
        "SYSTEM_USER",
        "CROSS",
        "LINENO",
        "TABLE",
        "CURRENT",
        "LOAD",
        "TABLESAMPLE",
        "CURRENT_DATE",
        "MERGE",
        "TEXTSIZE",
        "CURRENT_TIME",
        "NATIONAL",
        "THEN",
        "CURRENT_TIMESTAMP",
        "NOCHECK",
        "TO",
        "CURRENT_USER",
        "NONCLUSTERED",
        "TOP",
        "CURSOR",
        "NOT",
        "TRAN",
        "DATABASE",
        "NULL",
        "TRANSACTION",
        "DBCC",
        "NULLIF",
        "TRIGGER",
        "DEALLOCATE",
        "OF",
        "TRUNCATE",
        "DECLARE",
        "OFF",
        "TRY_CONVERT",
        "DEFAULT",
        "OFFSETS",
        "TSEQUAL",
        "DELETE",
        "ON",
        "UNION",
        "DENY",
        "OPEN",
        "UNIQUE",
        "DESC",
        "OPENDATASOURCE",
        "UNPIVOT",
        "DISK",
        "OPENQUERY",
        "UPDATE",
        "DISTINCT",
        "OPENROWSET",
        "UPDATETEXT",
        "DISTRIBUTED",
        "OPENXML",
        "USE",
        "DOUBLE",
        "OPTION",
        "USER",
        "DROP",
        "OR",
        "VALUES",
        "DUMP",
        "ORDER",
        "VARYING",
        "ELSE",
        "OUTER",
        "VIEW",
        "END",
        "OVER",
        "WAITFOR",
        "ERRLVL",
        "PERCENT",
        "WHEN",
        "ESCAPE",
        "PIVOT",
        "WHERE",
        "EXCEPT",
        "PLAN",
        "WHILE",
        "EXEC",
        "PRECISION",
        "WITH",
        "EXECUTE",
        "PRIMARY",
        "WITHIN GROUP",
        "EXISTS",
        "PRINT",
        "WRITETEXT",
        "EXIT",
        "PROC"
    ], cT = [
        "ADD",
        "ALTER COLUMN",
        "ALTER TABLE",
        "CASE",
        "DELETE FROM",
        "END",
        "EXCEPT",
        "FROM",
        "GROUP BY",
        "HAVING",
        "INSERT INTO",
        "INSERT",
        "LIMIT",
        "ORDER BY",
        "SELECT",
        "SET CURRENT SCHEMA",
        "SET SCHEMA",
        "SET",
        "UPDATE",
        "VALUES",
        "WHERE"
    ], DT = [
        "INTERSECT",
        "INTERSECT ALL",
        "MINUS",
        "UNION",
        "UNION ALL"
    ], UT = [
        "AND",
        "ELSE",
        "OR",
        "WHEN",
        "JOIN",
        "INNER JOIN",
        "LEFT JOIN",
        "LEFT OUTER JOIN",
        "RIGHT JOIN",
        "RIGHT OUTER JOIN",
        "FULL JOIN",
        "FULL OUTER JOIN",
        "CROSS JOIN"
    ], PT = function(e) {
        aT(t, e);
        var E = LT(t);
        function t() {
            return uT(this, t), E.apply(this, arguments);
        }
        return ST(t, [
            {
                key: "tokenizer",
                value: function() {
                    return new iT.default({
                        reservedWords: sT,
                        reservedTopLevelWords: cT,
                        reservedNewlineWords: UT,
                        reservedTopLevelWordsNoIndent: DT,
                        stringTypes: [
                            '""',
                            "N''",
                            "''",
                            "[]"
                        ],
                        openParens: [
                            "(",
                            "CASE"
                        ],
                        closeParens: [
                            ")",
                            "END"
                        ],
                        indexedPlaceholderTypes: [],
                        namedPlaceholderTypes: [
                            "@"
                        ],
                        lineCommentTypes: [
                            "--"
                        ],
                        specialWordChars: [
                            "#",
                            "@"
                        ],
                        operators: [
                            ">=",
                            "<=",
                            "<>",
                            "!=",
                            "!<",
                            "!>",
                            "+=",
                            "-=",
                            "*=",
                            "/=",
                            "%=",
                            "|=",
                            "&=",
                            "^=",
                            "::"
                        ]
                    });
                }
            }
        ]), t;
    }(AT.default);
    Y.default = PT;
    gt.exports = Y.default;
});
var ve5 = R13((U)=>{
    "use strict";
    Object.defineProperty(U, "__esModule", {
        value: !0
    });
    U.supportedDialects = U.format = void 0;
    var _T = L(et7()), pT = L(nt7()), dT = L(ot5()), MT = L(it8()), yT = L(Lt3()), vT = L(st6()), hT = L(Pt3()), FT = L(Mt2()), Ht = L(Ft4()), GT = L(Bt3());
    function L(e) {
        return e && e.__esModule ? e : {
            default: e
        };
    }
    function ie(e) {
        return typeof Symbol == "function" && typeof Symbol.iterator == "symbol" ? ie = function(t) {
            return typeof t;
        } : ie = function(t) {
            return t && typeof Symbol == "function" && t.constructor === Symbol && t !== Symbol.prototype ? "symbol" : typeof t;
        }, ie(e);
    }
    var Wt = {
        db2: _T.default,
        mariadb: pT.default,
        mysql: dT.default,
        n1ql: MT.default,
        plsql: yT.default,
        postgresql: vT.default,
        redshift: hT.default,
        spark: FT.default,
        sql: Ht.default,
        tsql: GT.default
    }, mT = function(E) {
        var t = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {
        };
        if (typeof E != "string") throw new Error("Invalid query argument. Extected string, instead got " + ie(E));
        var r = Ht.default;
        if (t.language !== void 0 && (r = Wt[t.language]), r === void 0) throw Error("Unsupported SQL dialect: ".concat(t.language));
        return new r(t).format(E);
    };
    U.format = mT;
    var gT = Object.keys(Wt);
    U.supportedDialects = gT;
});
var BT = he5(ve5()), { supportedDialects: XT , format: wT  } = BT;
const CreateCodeTab = ({ table  })=>{
    const database = Ur((s)=>s.connection.database
    );
    const query = useQuery();
    const [code, setCode] = qe("");
    xe(()=>{
        query(`SHOW CREATE TABLE \`${database}\`.\`${table}\`;`).then((ret)=>{
            const firstRow = ret.rows?.[0];
            const code = firstRow?.["Create Table"] ?? firstRow?.["Create View"];
            const isView = firstRow && "Create View" in firstRow;
            if (typeof code === "string") setCode(isView ? wT(code, {
                language: "mysql"
            }) : code);
        });
    }, [
        table
    ]);
    return export_default4.createElement(TextArea, {
        value: code,
        style: {
            width: "100%",
            height: "100%"
        },
        readOnly: true
    });
};
const isIndexRow = (row)=>isRecord(row) && typeof row.Column_name === "string" && typeof row.Index_type === "string" && typeof row.Non_unique === "number" && typeof row.Key_name === "string"
;
const indexRowsToObjs = (rows)=>{
    if (!isArray(rows)) return [];
    const indexes = {
    };
    for (const row of rows){
        if (!isIndexRow(row)) continue;
        const index = indexes[row.Key_name] ?? (indexes[row.Key_name] = {
            name: row.Key_name,
            algorithm: row.Index_type,
            columns: [],
            type: row.Non_unique ? "unique" : "primary"
        });
        index.columns.push(row.Column_name);
    }
    return Object.values(indexes);
};
const IndexActions = ()=>export_default4.createElement(Panel, {
        fixed: true
    }, export_default4.createElement("div", {
        style: {
            display: "flex",
            flexDirection: "column",
            margin: 4
        }
    }, export_default4.createElement(Label, {
        icon: "plus"
    }, "Add"), export_default4.createElement(Label, {
        icon: "full_trash"
    }, "Remove"), export_default4.createElement(Label, {
        icon: "cancel"
    }, "Clear"), export_default4.createElement(Label, {
        icon: "up"
    }, "Up"), export_default4.createElement(Label, {
        icon: "down"
    }, "Down")))
;
const IndexRow = ({ index  })=>{
    const [expanded, setExpanded] = qe(false);
    return export_default4.createElement(export_default4.Fragment, null, export_default4.createElement("div", {
        style: {
            margin: "2px 2px 4px"
        }
    }, export_default4.createElement(Icon, {
        icon: expanded ? "expand" : "collapse",
        onClick: ()=>setExpanded(!expanded)
        ,
        style: {
            cursor: "pointer"
        }
    }), export_default4.createElement(Label, {
        icon: "key",
        iconStyle: {
            padding: "0 4px 0 2px",
            filter: index.type === "unique" ? "hue-rotate(45deg)" : undefined
        }
    }, index.name), expanded && index.columns.map((column)=>export_default4.createElement(Label, {
            icon: "puzzle",
            style: {
                marginLeft: 32,
                display: "flex"
            }
        }, column)
    )), export_default4.createElement("div", {
        style: {
            margin: "2px 2px 4px"
        }
    }, index.type), export_default4.createElement("div", {
        style: {
            margin: "2px 2px 4px"
        }
    }, index.algorithm));
};
const IndexTab = ({ indexes  })=>export_default4.createElement(Panel, {
        style: {
            position: "relative",
            height: "100%"
        }
    }, export_default4.createElement(IndexActions, null), export_default4.createElement(Panel, null, export_default4.createElement("div", {
        style: {
            flexGrow: 1,
            display: "grid",
            gridTemplateColumns: "3fr 1fr 1fr",
            alignContent: "start"
        }
    }, export_default4.createElement("div", {
        style: {
            margin: "2px 2px 4px"
        }
    }, "Name"), export_default4.createElement("div", {
        style: {
            margin: "2px 2px 4px"
        }
    }, "Type / Length"), export_default4.createElement("div", {
        style: {
            margin: "2px 2px 4px"
        }
    }, "Algorithm"), indexes.map((index)=>export_default4.createElement(IndexRow, {
            index: index
        })
    ))))
;
const isForeignKeyRow = (row)=>isRecord(row) && typeof row.column_name === "string" && typeof row.constraint_name === "string" && typeof row.delete_rule === "string" && typeof row.referenced_column_name === "string" && typeof row.referenced_table_name === "string" && typeof row.update_rule === "string"
;
const foreignKeyRowsToObjs = (rows)=>{
    if (!isArray(rows)) return [];
    const foreignKeys = {
    };
    for (const row of rows){
        if (!isForeignKeyRow(row)) continue;
        const foreignKey = foreignKeys[row.constraint_name] ?? (foreignKeys[row.constraint_name] = {
            columns: [],
            deleteRule: row.delete_rule,
            name: row.constraint_name,
            referencedTable: row.referenced_table_name,
            updateRule: row.update_rule
        });
        foreignKey.columns.push({
            column: row.column_name,
            referencedColumn: row.referenced_column_name
        });
    }
    return Object.values(foreignKeys);
};
const ForeignKeyActions = ()=>export_default4.createElement(Panel, {
        fixed: true
    }, export_default4.createElement("div", {
        style: {
            display: "flex",
            flexDirection: "column",
            margin: 4
        }
    }, export_default4.createElement(Label, {
        icon: "plus"
    }, "Add"), export_default4.createElement(Label, {
        icon: "full_trash"
    }, "Remove"), export_default4.createElement(Label, {
        icon: "cancel"
    }, "Clear")))
;
const ForeignKeyRow = ({ foreignKey  })=>export_default4.createElement(export_default4.Fragment, null, export_default4.createElement("div", {
        style: {
            margin: "2px 2px 4px"
        }
    }, export_default4.createElement(Label, {
        icon: "link",
        iconStyle: {
            padding: "0 4px 0 2px"
        }
    }, foreignKey.name)), export_default4.createElement("div", {
        style: {
            margin: "2px 2px 4px"
        }
    }, foreignKey.columns.map((c)=>c.column
    ).join(",")), export_default4.createElement("div", {
        style: {
            margin: "2px 2px 4px"
        }
    }, foreignKey.referencedTable), export_default4.createElement("div", {
        style: {
            margin: "2px 2px 4px"
        }
    }, foreignKey.columns.map((c)=>c.referencedColumn
    ).join(",")), export_default4.createElement("div", {
        style: {
            margin: "2px 2px 4px"
        }
    }, foreignKey.updateRule), export_default4.createElement("div", {
        style: {
            margin: "2px 2px 4px"
        }
    }, foreignKey.deleteRule))
;
const ForeignKeyTab = ({ foreignKeys  })=>export_default4.createElement(Panel, {
        style: {
            position: "relative",
            height: "100%"
        }
    }, export_default4.createElement(ForeignKeyActions, null), export_default4.createElement(Panel, null, export_default4.createElement("div", {
        style: {
            flexGrow: 1,
            display: "grid",
            gridTemplateColumns: "3fr 1fr 1fr 1fr 1fr 1fr",
            alignContent: "start"
        }
    }, export_default4.createElement("div", {
        style: {
            margin: "2px 2px 4px"
        }
    }, "Key name"), export_default4.createElement("div", {
        style: {
            margin: "2px 2px 4px"
        }
    }, "Columns"), export_default4.createElement("div", {
        style: {
            margin: "2px 2px 4px"
        }
    }, "Reference table"), export_default4.createElement("div", {
        style: {
            margin: "2px 2px 4px"
        }
    }, "Foreign columns"), export_default4.createElement("div", {
        style: {
            margin: "2px 2px 4px"
        }
    }, "On UPDATE"), export_default4.createElement("div", {
        style: {
            margin: "2px 2px 4px"
        }
    }, "On DELETE"), foreignKeys.map((foreignKey)=>export_default4.createElement(ForeignKeyRow, {
            foreignKey: foreignKey
        })
    ))))
;
const Placeholder = ({})=>export_default4.createElement("div", null, "Placeholder")
;
const fields = [
    {
        name: "#",
        fieldType: 257
    },
    {
        name: "Name",
        fieldType: 15
    },
    {
        name: "Datatype",
        fieldType: 15
    },
    {
        name: "Length/Set",
        fieldType: 2
    },
    {
        name: "Unsigned",
        fieldType: 256
    },
    {
        name: "Allow NULL",
        fieldType: 256
    },
    {
        name: "Default",
        fieldType: 15
    },
    {
        name: "Comment",
        fieldType: 15
    },
    {
        name: "Collation",
        fieldType: 15
    }, 
];
const TableTabInner = ({ database , table  })=>{
    const selectedTabState = useSessionState("tableTab", 0);
    const query = useQuery();
    const [basicData, setBasicData] = qe({
        name: table,
        comment: ""
    });
    const [optionsData, setOptionsData] = qe({
        autoIncrement: undefined,
        defaultCollation: "utf8mb4_unicode_ci",
        engine: "InnoDB",
        rowFormat: "DEFAULT",
        checksum: false
    });
    const [columns, setColumns] = qe([]);
    const [indexes, setIndexes] = qe([]);
    const [foreignKeys, setForeignKeys] = qe([]);
    xe(()=>{
        query(`SHOW FULL COLUMNS FROM \`${database}\`.\`${table}\``).then((ret)=>setColumns(sqlColumnTransform(ret.rows) ?? [])
        );
        query(`SELECT * FROM \`information_schema\`.\`TABLES\` WHERE TABLE_SCHEMA = '${database}' AND TABLE_NAME = '${table}';`).then((ret)=>{
            const row = ret.rows?.[0];
            if (row) {
                const name = row.TABLE_NAME;
                const comment = row.TABLE_COMMENT;
                setBasicData({
                    name: typeof name === "string" ? name : basicData.name,
                    comment: typeof comment === "string" ? comment : basicData.comment
                });
                const autoIncrement = row.AUTO_INCREMENT;
                const defaultCollation = row.TABLE_COLLATION;
                const engine = row.ENGINE;
                const rowFormat = row.ROW_FORMAT;
                const checksum = row.CHECKSUM;
                setOptionsData({
                    autoIncrement: typeof autoIncrement === "number" ? autoIncrement : optionsData.autoIncrement,
                    defaultCollation: typeof defaultCollation === "string" ? defaultCollation : optionsData.defaultCollation,
                    engine: typeof engine === "string" ? engine : optionsData.engine,
                    rowFormat: typeof rowFormat === "string" ? rowFormat : optionsData.rowFormat,
                    checksum: typeof checksum === "boolean" ? checksum : optionsData.checksum
                });
            }
            query(`SHOW INDEXES IN \`${database}\`.\`${table}\`;`).then((ret)=>{
                setIndexes(indexRowsToObjs(ret.rows));
            });
            query(`SELECT
    tc.constraint_name,
    kcu.column_name, kcu.referenced_table_name, kcu.referenced_column_name,
    rc.update_rule, rc.delete_rule
FROM information_schema.table_constraints tc
INNER JOIN information_schema.key_column_usage kcu ON
    tc.constraint_catalog = kcu.constraint_catalog
    AND tc.constraint_schema = kcu.constraint_schema
    AND tc.constraint_name = kcu.constraint_name
    AND tc.table_name = kcu.table_name
LEFT JOIN information_schema.referential_constraints rc ON
    tc.constraint_catalog = rc.constraint_catalog
    AND tc.constraint_schema = rc.constraint_schema
    AND tc.constraint_name = rc.constraint_name
    AND tc.table_name = rc.table_name
WHERE
    tc.constraint_type = 'FOREIGN KEY'
    AND tc.constraint_schema = '${database}'
    AND tc.table_name = '${table}';`).then((ret)=>{
                setForeignKeys(foreignKeyRowsToObjs(ret.rows));
            });
        });
    }, [
        database,
        table
    ]);
    return export_default4.createElement(Panel, {
        direction: "vertical",
        style: {
            height: "100%"
        }
    }, export_default4.createElement(Panel, {
        id: "table-metadata"
    }, export_default4.createElement(Tabs, {
        selectedTabState: selectedTabState,
        style: {
            height: "100%"
        }
    }, export_default4.createElement(BasicTab, {
        label: export_default4.createElement(Label, {
            icon: "grid"
        }, "Basic"),
        data: basicData,
        onChange: (newValue)=>setBasicData({
                ...basicData,
                ...newValue
            })
    }), export_default4.createElement(OptionsTab, {
        label: export_default4.createElement(Label, {
            icon: "support"
        }, "Options"),
        data: optionsData
    }), export_default4.createElement(IndexTab, {
        label: export_default4.createElement(Label, {
            icon: "flash_on"
        }, "Indexes"),
        indexes: indexes
    }), export_default4.createElement(ForeignKeyTab, {
        label: export_default4.createElement(Label, {
            icon: "tree_structure"
        }, "Foreign keys"),
        foreignKeys: foreignKeys
    }), export_default4.createElement(Placeholder, {
        label: export_default4.createElement(Label, {
            icon: "pie_chart"
        }, "Partitions")
    }), export_default4.createElement(CreateCodeTab, {
        label: export_default4.createElement(Label, {
            icon: "add_database"
        }, "CREATE code"),
        table: table
    }), export_default4.createElement(Placeholder, {
        label: export_default4.createElement(Label, {
            icon: "data_configuration"
        }, "ALTER code")
    }))), export_default4.createElement(Panel, {
        id: "table-columns",
        direction: "vertical"
    }, export_default4.createElement("div", null, export_default4.createElement("div", {
        style: {
            margin: "0.125em 0.25em 0.25em"
        }
    }, "Columns"), export_default4.createElement("div", {
        style: {
            ...theme.table.cell,
            borderBottom: undefined,
            borderLeft: undefined,
            borderRight: undefined
        }
    }, export_default4.createElement(ResultTable, {
        fields: fields,
        rows: columns.map((column, idx)=>({
                "#": export_default4.createElement("div", {
                    style: {
                        textAlign: "right"
                    }
                }, column.key ? export_default4.createElement(Label, {
                    icon: "key"
                }, idx + 1) : idx + 1),
                Name: column.name,
                Datatype: column.dataType,
                "Length/Set": column.dataLength,
                Unsigned: column.unsigned,
                "Allow NULL": column.nullable,
                Default: column.default,
                Comment: column.comment,
                Collation: column.collation
            })
        )
    })))));
};
const TableTab = ({})=>{
    const { database , table  } = Ur((s)=>({
            database: s.connection.database,
            table: s.connection.table
        })
    );
    if (!database || !table) return null;
    return export_default4.createElement(TableTabInner, {
        database: database,
        table: table
    });
};
const connectionSlice = Mr1({
    name: "connection",
    initialState: {
    },
    reducers: {
        selectTable: (state, action)=>{
            state.connection = action.payload.connection ?? state.connection;
            state.database = action.payload.database ?? state.database;
            state.table = action.payload.table;
        },
        selectDatabase: (state, action)=>{
            state.connection = action.payload.connection ?? state.connection;
            state.database = action.payload.database;
            if ("table" in action.payload) state.table = action.payload.table;
        },
        selectConnection: (state, action)=>{
            state.connection = action.payload.connection;
        }
    }
});
const TreeNode = ({ label , nodes , onExpand , showGuides =true , initialExpanded , onClick  })=>{
    const [expanded, setExpanded] = qe(initialExpanded ?? false);
    xe(()=>{
        if (initialExpanded) setExpanded(initialExpanded);
    }, [
        initialExpanded
    ]);
    return export_default4.createElement("div", {
        style: {
            fontSize: 13
        }
    }, export_default4.createElement("span", {
        onClick: (e)=>{
            if (onClick) {
                if (!onClick(e, expanded)) return;
            }
            e.preventDefault();
            e.stopPropagation();
            setExpanded(!expanded);
            if (!expanded) onExpand?.();
        },
        style: {
            whiteSpace: "nowrap",
            cursor: "pointer"
        }
    }, label), expanded && nodes?.map((node, i, arr)=>export_default4.createElement("div", {
            key: i
        }, showGuides && export_default4.createElement("span", {
            style: {
                borderLeft: "2px solid black",
                paddingLeft: 8,
                marginLeft: 4,
                position: "absolute",
                height: i < arr.length - 1 ? i === 0 ? 13 : 16 : 10,
                marginTop: i === 0 ? 3 : 0,
                ...theme.tree.guides.base
            }
        }), showGuides && export_default4.createElement("span", {
            style: {
                borderBottom: "2px solid black",
                paddingLeft: 8,
                marginLeft: 4,
                position: "absolute",
                height: 8,
                ...theme.tree.guides.base
            }
        }), export_default4.createElement("span", {
            style: {
                position: "relative",
                left: showGuides ? 16 : 0
            }
        }, node))
    ));
};
const formatConnection = (connection, includeProxy = false)=>`${connection.username ?? "admin"}@${connection.hostname ?? "localhost"}:${connection.port ?? 3306}${includeProxy ? ` ${connection.proxy ?? "(via http://localhost:3000)"}` : ""}`
;
const TableNode = ({ table , isSelected , onSelect  })=>export_default4.createElement(TreeNode, {
        key: table,
        label: export_default4.createElement("div", {
            style: {
                display: "flex",
                alignItems: "center"
            }
        }, export_default4.createElement(Icon, {
            icon: "data_sheet"
        }), export_default4.createElement("span", {
            style: {
                fontWeight: isSelected ? "bold" : "inherit"
            }
        }, table)),
        onClick: ()=>{
            if (!isSelected) {
                onSelect();
                return false;
            }
            return true;
        }
    })
;
const DatabaseNode = ({ database , connection  })=>{
    const { connection: selectedConnection , database: selectedDatabase , table: selectedTable ,  } = Ur((state)=>state.connection
    );
    const dispatch = useAppDispatch();
    const query = useQuery(connection);
    const [tables, setTables] = qe([]);
    const isSelected = connection === selectedConnection && database === selectedDatabase;
    const [localSelectedTable, setLocalSelectedTable] = qe();
    xe(()=>{
        if (tables.length || !isSelected) return;
        query(`SHOW TABLE STATUS FROM \`${database}\`;`).then((result)=>{
            if (result.rows) {
                setTables(result.rows.map((r)=>(r.Name ?? "").toString()
                ));
                const table = result.rows[0]?.Name;
                if (typeof table === "string") {
                    setLocalSelectedTable(table);
                    dispatch(connectionSlice.actions.selectTable({
                        connection,
                        database,
                        table
                    }));
                    if (selectedDatabase !== database) query(`USE \`${database}\`;`);
                }
            }
        });
    }, [
        isSelected,
        tables.length
    ]);
    return export_default4.createElement(TreeNode, {
        initialExpanded: isSelected,
        label: export_default4.createElement("div", {
            style: {
                display: "flex",
                alignItems: "center"
            }
        }, export_default4.createElement(Icon, {
            icon: "database"
        }), export_default4.createElement("span", {
            style: {
                fontWeight: isSelected ? "bold" : "inherit"
            }
        }, database)),
        onClick: (_, expanded)=>{
            if (!isSelected && expanded) {
                dispatch(connectionSlice.actions.selectDatabase({
                    connection,
                    database,
                    table: localSelectedTable
                }));
                query(`USE \`${database}\`;`);
                return false;
            }
            return true;
        },
        onExpand: ()=>{
            dispatch(connectionSlice.actions.selectDatabase({
                connection,
                database,
                table: localSelectedTable
            }));
            query(`USE \`${database}\`;`);
        },
        nodes: tables.map((table)=>export_default4.createElement(TableNode, {
                table: table,
                isSelected: isSelected && table === selectedTable,
                onSelect: ()=>{
                    setLocalSelectedTable(table);
                    dispatch(connectionSlice.actions.selectTable({
                        connection,
                        database,
                        table
                    }));
                    if (selectedDatabase !== database) query(`USE \`${database}\`;`);
                }
            })
        )
    });
};
const ConnectionNode = ({ connection , selected  })=>{
    const query = useQuery(connection);
    const [databases, setDatabases] = qe();
    const { database: selectedDatabase  } = Ur((state)=>state.connection
    );
    const dispatch = useAppDispatch();
    const retrieveDatabases = je(()=>{
        query("SHOW DATABASES;").then((result)=>{
            if (result.rows) {
                const newDatabases = result.rows.map((r)=>(r.Database ?? "").toString()
                );
                setDatabases(newDatabases);
                if (!selectedDatabase) {
                    dispatch(connectionSlice.actions.selectDatabase({
                        connection,
                        database: newDatabases[0]
                    }));
                    query(`USE \`${newDatabases[0]}\`;`);
                }
            }
        });
    }, []);
    xe(()=>{
        if (selected && !databases) retrieveDatabases();
    }, [
        selected,
        databases
    ]);
    return export_default4.createElement(TreeNode, {
        label: export_default4.createElement("span", {
            style: {
                fontWeight: selected ? "bold" : "inherit"
            }
        }, formatConnection(connection)),
        onClick: ()=>{
            if (!selected) {
                dispatch(connectionSlice.actions.selectConnection({
                    connection
                }));
                return false;
            }
            return true;
        },
        onExpand: retrieveDatabases,
        nodes: databases?.map((d)=>export_default4.createElement(DatabaseNode, {
                connection: connection,
                database: d
            })
        ),
        showGuides: false,
        initialExpanded: selected
    });
};
const NoConnections = ()=>{
    const command = Ur((s)=>s.commands.commandMap["connection.add"]
    );
    return export_default4.createElement("div", {
        onClick: command?.callback,
        style: {
            height: "100%",
            cursor: command?.callback ? "pointer" : undefined
        }
    }, "No connections. Add your first connection with", " ", export_default4.createElement("pre", {
        style: {
            display: "inline"
        }
    }, "⌥N"), " or", " ", export_default4.createElement("pre", {
        style: {
            display: "inline"
        }
    }, "⌘⇧P"), " and run \"Add connection\"");
};
const Nav = ()=>{
    const { connection: selected , connections  } = Ur((state)=>({
            connection: state.connection.connection,
            connections: state.connections
        })
    );
    return export_default4.createElement("nav", {
        style: {
            padding: "2px 4px",
            width: "100%",
            overflow: "auto",
            fontSize: 14,
            ...theme.nav.container
        }
    }, connections.map((c)=>export_default4.createElement(ConnectionNode, {
            key: JSON.stringify(c),
            connection: c,
            selected: c === selected
        })
    ), connections.length === 0 && export_default4.createElement(NoConnections, null));
};
const formatter = new Intl.DateTimeFormat("en-us", {
    hour: "numeric",
    minute: "numeric",
    second: "numeric",
    fractionalSecondDigits: 3,
    hour12: false
});
const Log = ({ children , time  })=>export_default4.createElement("div", {
        style: {
            display: "flex"
        }
    }, export_default4.createElement("span", {
        style: {
            color: "#999",
            marginRight: 4
        }
    }, "[", formatter.format(time), "]"), children)
;
const Output = ()=>{
    const log = Ur((state)=>state.output
    );
    return export_default4.createElement("pre", {
        style: {
            margin: 0
        }
    }, log.map(({ key , time , node  })=>export_default4.createElement(Log, {
            key: key,
            time: time
        }, node)
    ));
};
const commandsSlice = Mr1({
    name: "commands",
    initialState: {
        commands: [],
        commandMap: {
        },
        shown: false,
        input: ">",
        placeholder: "",
        options: undefined,
        callback: undefined,
        showIndex: 0,
        forceOption: true,
        usage: retrieve("commands.usage", (v)=>isRecord(v) && Object.values(v).every(isNumber)
        ) ?? {
        },
        type: "text"
    },
    reducers: {
        register: (state, action)=>{
            state.commands.push(action.payload);
            state.commandMap[action.payload.id] = action.payload;
        },
        hide: (state)=>{
            state.shown = false;
        },
        show: (state, action)=>{
            state.shown = true;
            state.input = action?.payload.input ?? "";
            state.placeholder = action?.payload.placeholder ?? "";
            state.options = action?.payload.options;
            state.callback = action?.payload.callback;
            state.showIndex++;
            state.forceOption = action?.payload.forceOption ?? !!state.options;
            state.type = action?.payload.type ?? "text";
        },
        setValue: (state, action)=>{
            state.input = action.payload;
        },
        metricUseCommand: (state, action)=>{
            state.usage[action.payload] = Date.now();
            store("commands.usage", state.usage);
        }
    }
});
const usePreviousValue = (value)=>{
    const ref = Le2(value);
    xe(()=>{
        ref.current = value;
    }, [
        value
    ]);
    return ref.current;
};
const TextSelectOption = ({ focused , onSelect , option , onFocus  })=>export_default4.createElement("div", {
        style: {
            padding: "4px 11px",
            cursor: "pointer",
            fontSize: 13,
            ...theme.textSelect?.option,
            ...focused ? theme.textSelect?.optionFocused : undefined
        },
        title: option.description,
        onClick: (e)=>{
            e.preventDefault();
            e.stopPropagation();
            onSelect();
        },
        onMouseEnter: onFocus
    }, option.name, option.hotkey?.length && export_default4.createElement("span", {
        style: {
            float: "right",
            marginTop: -1
        }
    }, option.hotkey.map((key)=>export_default4.createElement("span", {
            style: {
                borderRadius: 2,
                display: "inline-block",
                marginLeft: 3,
                padding: "1px 4px",
                width: 11,
                fontSize: 11,
                textAlign: "center",
                ...theme.textSelect?.optionHotkey,
                ...focused ? theme.textSelect?.optionHotkeyFocused : undefined
            }
        }, key.replace(/^(Key|Digit)/, "").replace("!Meta", "⌘").replace("!Shift", "⇧").replace("!Alt", "⌥"))
    )))
;
const TextSelect = export_default4.forwardRef(({ autoFocus , focusedOption , onClose , onFocusOption , onInput , onSelect , options , placeholder , type , value  }, ref)=>{
    const myRef = Le2(null);
    const myRefPrevious = usePreviousValue(myRef.current);
    const [inputFocused, setInputFocused] = qe(false);
    xe(()=>{
        if (myRef.current && !myRefPrevious && autoFocus) myRef.current.focus();
    }, [
        autoFocus,
        myRef.current,
        myRefPrevious
    ]);
    const onKeyDown = je((e)=>{
        if (e.code === "Escape") {
            onClose();
            return;
        }
        if (e.code === "ArrowDown") {
            onFocusOption(focusedOption === options.length - 1 ? 0 : focusedOption + 1);
            e.preventDefault();
            e.stopPropagation();
            return;
        }
        if (e.code === "ArrowUp") {
            onFocusOption(focusedOption === 0 ? options.length - 1 : focusedOption - 1);
            e.preventDefault();
            e.stopPropagation();
            return;
        }
        if (e.code === "Enter") {
            onSelect(focusedOption);
            return;
        }
    }, [
        focusedOption,
        onSelect
    ]);
    const onKeyDownPrev = usePreviousValue(onKeyDown);
    xe(()=>{
        if (onKeyDown !== onKeyDownPrev) {
            globalThis.removeEventListener("keydown", onKeyDownPrev);
        }
        globalThis.addEventListener("keydown", onKeyDown);
        return ()=>globalThis.removeEventListener("keydown", onKeyDown)
        ;
    }, [
        onKeyDown
    ]);
    return export_default4.createElement("div", {
        style: {
            left: "50%",
            maxWidth: "90vw",
            position: "absolute",
            top: 0,
            transform: "translateX(-50%)",
            width: 450,
            zIndex: 1,
            ...theme.textSelect?.container
        }
    }, export_default4.createElement("input", {
        onBlur: ()=>setInputFocused(false)
        ,
        onFocus: ()=>setInputFocused(true)
        ,
        onInput: (e)=>onInput(e.currentTarget.value)
        ,
        placeholder: placeholder,
        ref: (node)=>{
            myRef.current = node;
            if (typeof ref === "function") {
                ref(node);
            } else if (ref) {
                ref.current = node;
            }
        },
        style: {
            backgroundColor: "transparent",
            border: "none",
            color: "inherit",
            display: "block",
            fontFamily: "inherit",
            margin: "6px 6px 2px",
            padding: 4,
            width: "calc(100% - 22px)",
            ...theme.input
        },
        type: type,
        value: value
    }), options.map((option, index)=>export_default4.createElement(TextSelectOption, {
            focused: focusedOption === index,
            onSelect: ()=>onSelect(index)
            ,
            option: option,
            onFocus: ()=>onFocusOption(index)
        })
    ));
});
const CommandPalette = ()=>{
    const [focusIndex, setFocusIndex] = qe(0);
    const { callback , commands , forceOption , input , options: getOptions , placeholder , showIndex , shown , type ,  } = Ur((state)=>state.commands
    );
    const dispatch = useAppDispatch();
    const options = getOptions?.(input) ?? [];
    const onKeyDown = je((e)=>{
        const command = commands.find((command)=>{
            const codes = command.hotkey;
            if (!codes?.length) return false;
            if (e.metaKey === !codes.includes("!Meta")) return false;
            if (e.shiftKey === !codes.includes("!Shift")) return false;
            if (e.altKey === !codes.includes("!Alt")) return false;
            if (e.ctrlKey === !codes.includes("!Ctrl")) return false;
            const code = command.hotkey.find((v)=>v[0] !== "!"
            );
            return e.code === code;
        });
        command?.callback();
    }, []);
    xe(()=>{
        globalThis.addEventListener("keydown", onKeyDown);
        return ()=>globalThis.removeEventListener("keydown", onKeyDown)
        ;
    }, []);
    const previousShowIndex = usePreviousValue(showIndex);
    xe(()=>{
        if (!shown || previousShowIndex !== showIndex) setFocusIndex(0);
    }, [
        shown,
        showIndex
    ]);
    xe(()=>{
        if (focusIndex >= options.length && focusIndex > 0) {
            setFocusIndex(Math.max(options.length - 1, 0));
        }
    }, [
        input
    ]);
    if (!shown) return null;
    return export_default4.createElement(TextSelect, {
        autoFocus: true,
        focusedOption: focusIndex,
        onClose: ()=>dispatch(commandsSlice.actions.hide())
        ,
        onFocusOption: setFocusIndex,
        onInput: (v)=>dispatch(commandsSlice.actions.setValue(v))
        ,
        onSelect: (i)=>{
            if (!options[i] && forceOption) return;
            if (callback) return callback(i, input, options[i]);
            options[i].callback?.();
        },
        options: options,
        placeholder: placeholder,
        type: type,
        value: input
    });
};
const fuzzyRegexp = (str)=>new RegExp(str.split("").join(".*"), "i")
;
const fuzzyFilter = (query, propAccessor)=>{
    const regexp = fuzzyRegexp(query);
    return (value)=>!!regexp.exec(propAccessor(value))
    ;
};
const connectionKeys = new Set([
    "driver",
    "port",
    "username",
    "hostname",
    "password",
    "proxy", 
]);
const isConnection = (v)=>isRecord(v) && Object.keys(v).every((k)=>connectionKeys.has(k)
    ) && hasString(v, "driver") && hasMaybeNumber(v, "port") && hasMaybeString(v, "username") && hasMaybeString(v, "hostname") && hasMaybeString(v, "password") && hasMaybeString(v, "proxy")
;
const isConnections = (v)=>isArray(v) && v.every(isConnection)
;
const connectionsSlice = Mr1({
    name: "commands",
    initialState: retrieve("connections", isConnections) ?? [],
    reducers: {
        add: (state, action)=>{
            state.push(action.payload);
            store("connections", state);
        },
        remove: (state, action)=>{
            state.splice(typeof action.payload === "number" ? action.payload : state.indexOf(action.payload), 1);
            store("connections", state);
        }
    }
});
const store2 = br({
    reducer: A3({
        commands: commandsSlice.reducer,
        connection: connectionSlice.reducer,
        connections: connectionsSlice.reducer,
        output: outputSlice.reducer,
        tabs: tabsSlice.reducer
    })
});
store2.dispatch(commandsSlice.actions.register({
    id: "connections.add",
    name: "Add connection",
    description: "Adds a MySQL server to connect to",
    hotkey: [
        "!Alt",
        "KeyN"
    ],
    callback: ()=>{
        store2.dispatch(commandsSlice.actions.show({
            placeholder: "Username (default root)",
            callback: (_, username)=>{
                store2.dispatch(commandsSlice.actions.show({
                    placeholder: "Hostname (default localhost)",
                    callback: (_, hostname)=>{
                        store2.dispatch(commandsSlice.actions.show({
                            placeholder: "Port (default 3306)",
                            callback: (_, port)=>{
                                if (!port) port = "3306";
                                else if (isNaN(parseInt(port))) return;
                                store2.dispatch(commandsSlice.actions.show({
                                    placeholder: "Password",
                                    type: "password",
                                    callback: (_, password)=>{
                                        store2.dispatch(commandsSlice.actions.show({
                                            placeholder: "Proxy (default http://localhost:3000)",
                                            callback: (_, proxy)=>{
                                                store2.dispatch(commandsSlice.actions.hide());
                                                store2.dispatch(connectionsSlice.actions.add({
                                                    driver: "mysql",
                                                    username: username || "root",
                                                    hostname: hostname || "localhost",
                                                    password: password || undefined,
                                                    port: port.length ? parseInt(port) : undefined,
                                                    proxy: proxy || "http://localhost:3000"
                                                }));
                                            }
                                        }));
                                    }
                                }));
                            }
                        }));
                    }
                }));
            }
        }));
    }
}));
store2.dispatch(commandsSlice.actions.register({
    id: "connections.remove",
    name: "Remove connection",
    description: "Removes a server to connect to",
    callback: ()=>{
        store2.dispatch(commandsSlice.actions.show({
            placeholder: "Connection to remove",
            options: (query)=>{
                const fuzzy = fuzzyFilter(query, (c)=>c.name
                );
                return store2.getState().connections.map((c)=>formatConnection(c, true)
                ).map((name, id)=>({
                        name,
                        id
                    })
                ).filter(fuzzy);
            },
            callback: (_, _2, opt)=>{
                if (opt && hasNumber(opt, "id")) {
                    store2.dispatch(connectionsSlice.actions.remove(store2.getState().connections[opt.id]));
                }
                store2.dispatch(commandsSlice.actions.hide());
            }
        }));
    }
}));
store2.dispatch(commandsSlice.actions.register({
    id: "commandPalette.show",
    name: "Show command palette",
    hotkey: [
        "!Meta",
        "!Shift",
        "KeyP"
    ],
    hidden: true,
    callback: ()=>{
        store2.dispatch(commandsSlice.actions.show({
            input: ">",
            options: (query)=>{
                if (query[0] === ">") {
                    query = query.slice(1);
                    const commandsSlice = store2.getState().commands;
                    const sort = (a, b)=>(commandsSlice.usage[b.id] ?? -Infinity) - (commandsSlice.usage[a.id] ?? -Infinity)
                    ;
                    if (!query) {
                        return commandsSlice.commands.filter((c)=>!c.hidden
                        ).sort(sort);
                    }
                    const matcher = fuzzyFilter(query, (c)=>[
                            c.name,
                            c.description
                        ].filter((v)=>v
                        ).join(" ")
                    );
                    return commandsSlice.commands.filter((c)=>!c.hidden && matcher(c)
                    ).sort(sort);
                }
                return [];
            },
            callback: (_, _2, command)=>{
                store2.dispatch(commandsSlice.actions.hide());
                if (command && hasString(command, "id")) {
                    store2.dispatch(commandsSlice.actions.metricUseCommand(command.id));
                    command?.callback();
                }
            }
        }));
    }
}));
store2.dispatch(commandsSlice.actions.register({
    id: "tabs.closeTab",
    name: "Close current tab",
    hotkey: [
        "!Alt",
        "KeyW"
    ],
    callback: ()=>{
        store2.dispatch(tabsSlice.actions.closeTab(store2.getState().tabs.selected));
    }
}));
store2.dispatch(connectionSlice.actions.selectConnection({
    connection: store2.getState().connections[0]
}));
store2.dispatch(commandsSlice.actions.register({
    id: "tabs.newTab",
    name: "Open new tab",
    hotkey: [
        "!Alt",
        "KeyT"
    ],
    callback: ()=>{
        store2.dispatch(tabsSlice.actions.newTab());
        store2.dispatch(tabsSlice.actions.selectTab(store2.getState().tabs.queryTabCount + 1));
    }
}));
Array(10).fill(0).map((_, i)=>{
    const code = i === 9 ? 10 : i + 1;
    store2.dispatch(commandsSlice.actions.register({
        id: "tabs.showTab" + code,
        name: "Show tab " + code,
        hotkey: [
            "!Alt",
            "Digit" + (i === 9 ? 0 : i + 1)
        ],
        callback: ()=>{
            store2.dispatch(tabsSlice.actions.selectTab(i));
        }
    }));
});
const EmptyTab = ()=>export_default4.createElement(export_default4.Fragment, null)
;
const MainTabs = ()=>{
    const dispatch = useAppDispatch();
    const { database , table , queryTabCount , selected  } = Ur((s)=>({
            database: s.connection.database,
            table: s.connection.table,
            queryTabCount: s.tabs.queryTabCount,
            selected: s.tabs.selected
        })
    );
    return export_default4.createElement(Tabs, {
        onNewTab: ()=>{
            dispatch(tabsSlice.actions.newTab());
        },
        onCloseTab: (index)=>{
            dispatch(tabsSlice.actions.closeTab(index));
        },
        selectedTabState: [
            selected,
            (tab)=>{
                dispatch(tabsSlice.actions.selectTab(typeof tab === "number" ? tab : tab(selected)));
            }, 
        ]
    }, database && table ? export_default4.createElement(TableTab, {
        key: table,
        label: export_default4.createElement(Label, {
            icon: "data_sheet"
        }, table),
        canClose: false
    }) : export_default4.createElement(EmptyTab, null), database && table ? export_default4.createElement(TableDataTab, {
        key: table,
        label: export_default4.createElement(Label, {
            icon: "data_sheet"
        }, "Data"),
        canClose: false
    }) : export_default4.createElement(EmptyTab, null), Array(queryTabCount).fill(0).map((_, i)=>export_default4.createElement(QueryTab, {
            key: `${queryTabCount}-${i}`,
            id: i,
            label: export_default4.createElement(Label, {
                icon: "document"
            }, `Query #${i + 1}`),
            canClose: queryTabCount > 1
        })
    ));
};
const App = ()=>export_default4.createElement(Ke, {
        store: store2
    }, export_default4.createElement(Panel, {
        direction: "vertical",
        style: {
            height: "100%"
        }
    }, export_default4.createElement(Panel, {
        id: "main",
        basis: "calc(100% - 118px)"
    }, export_default4.createElement(Panel, {
        id: "nav",
        basis: 100,
        direction: "horizontal"
    }, export_default4.createElement(Nav, null)), export_default4.createElement(Panel, {
        id: "content",
        basis: 800,
        direction: "vertical"
    }, export_default4.createElement(MainTabs, null))), export_default4.createElement(Panel, {
        id: "output",
        basis: 100
    }, export_default4.createElement(Output, null))), export_default4.createElement(CommandPalette, null))
;
const root = document.getElementById("root");
if (root) {
    for (const [property, value] of Object.entries(theme.variables))if (value) root.style.setProperty(property, value);
}
jf(export_default4.createElement(App, null), root);
