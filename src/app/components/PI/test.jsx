!function() {
    var u, b, g, y, h, m, s, l, r, p = !1, e = navigator.userAgent;
    r = -1 == e.search(/EVE-IGB/i) ? 0 : 1;
    var k, t, w = 0, S = -1, _ = -1, c = -1, x = 0, A = 0, a = 0, T = new Image, C = "rgba(255,255,255,1)", M = "rgba(255,222,0,0.4)", Y = "rgba(255,222,0,0.4)", E = "rgba(0,221,0,0.3)", L = "rgba(0,221,221,0.3)", P = "rgba(0,100,255,0.3)", R = "rgba(255,0,0,0.3)", I = "rgba(128,0,255,0.3)", O = "rgba(0,255,255,0.3)", B = "rgba(219,219,219,0.3)", j = 136, z = 768, F = 24, f = 24, v = 24, d = 744, K = 159, G = 183, N = 24, q = 744, H = 318, J = 342, X = 96, Q = 672, V = 477, W = 477, D = 96, U = 672, Z = 612, ee = 636, ae = 120, re = 648, te = 771, ne = 771, ie = 145, oe = 624, se = 906, le = 930, ce = 192, fe = 576, pe = 1065, ve = 48, de = 135, i = new Array(83);
    for (ke = 0; ke <= 82; ke++)
        i[ke] = 0;
    var ue = new Array(83);
    for (ke = 0; ke <= 82; ke++)
        ue[ke] = 1;
    var be = new Array(8);
    for (ke = 0; ke <= 7; ke++)
        be[ke] = 1;
    var ge = new Array(8);
    (e = ge[0] = new Array(5))[0] = 68,
    e[1] = 70,
    e[2] = 71,
    e[3] = 76,
    e[4] = 78,
    (e = ge[1] = new Array(5))[0] = 68,
    e[1] = 70,
    e[2] = 75,
    e[3] = 77,
    e[4] = 81,
    (e = ge[2] = new Array(5))[0] = 68,
    e[1] = 74,
    e[2] = 76,
    e[3] = 77,
    e[4] = 80,
    (e = ge[3] = new Array(5))[0] = 70,
    e[1] = 73,
    e[2] = 74,
    e[3] = 79,
    e[4] = 82,
    (e = ge[4] = new Array(5))[0] = 68,
    e[1] = 71,
    e[2] = 72,
    e[3] = 76,
    e[4] = 80,
    (e = ge[5] = new Array(5))[0] = 70,
    e[1] = 74,
    e[2] = 78,
    e[3] = 79,
    e[4] = 82,
    (e = ge[6] = new Array(5))[0] = 68,
    e[1] = 70,
    e[2] = 75,
    e[3] = 77,
    e[4] = 82,
    (e = ge[7] = new Array(5))[0] = 68,
    e[1] = 69,
    e[2] = 71,
    e[3] = 72,
    e[4] = 76;
    var ye = new Array(83);
    ye[68] = 2268,
    ye[69] = 2305,
    ye[70] = 2267,
    ye[71] = 2288,
    ye[72] = 2287,
    ye[73] = 2307,
    ye[74] = 2272,
    ye[75] = 2309,
    ye[76] = 2073,
    ye[77] = 2310,
    ye[78] = 2270,
    ye[79] = 2306,
    ye[80] = 2286,
    ye[81] = 2311,
    ye[82] = 2308,
    ye[0] = 2393,
    ye[1] = 2396,
    ye[2] = 3779,
    ye[3] = 2401,
    ye[4] = 2390,
    ye[5] = 2397,
    ye[6] = 2392,
    ye[7] = 3683,
    ye[8] = 2389,
    ye[9] = 2399,
    ye[10] = 2395,
    ye[11] = 2398,
    ye[12] = 9828,
    ye[13] = 2400,
    ye[14] = 3645,
    ye[15] = 2329,
    ye[16] = 3828,
    ye[17] = 9836,
    ye[18] = 9832,
    ye[19] = 44,
    ye[20] = 3693,
    ye[21] = 15317,
    ye[22] = 3725,
    ye[23] = 3689,
    ye[24] = 2327,
    ye[25] = 9842,
    ye[26] = 2463,
    ye[27] = 2317,
    ye[28] = 2321,
    ye[29] = 3695,
    ye[30] = 9830,
    ye[31] = 3697,
    ye[32] = 9838,
    ye[33] = 2312,
    ye[34] = 3691,
    ye[35] = 2319,
    ye[36] = 9840,
    ye[37] = 3775,
    ye[38] = 2328,
    ye[39] = 2358,
    ye[40] = 2345,
    ye[41] = 2344,
    ye[42] = 2367,
    ye[43] = 17392,
    ye[44] = 2348,
    ye[45] = 9834,
    ye[46] = 2366,
    ye[47] = 2361,
    ye[48] = 17898,
    ye[49] = 2360,
    ye[50] = 2354,
    ye[51] = 2352,
    ye[52] = 9846,
    ye[53] = 9848,
    ye[54] = 2351,
    ye[55] = 2349,
    ye[56] = 2346,
    ye[57] = 12836,
    ye[58] = 17136,
    ye[59] = 28974,
    ye[60] = 2867,
    ye[61] = 2868,
    ye[62] = 2869,
    ye[63] = 2870,
    ye[64] = 2871,
    ye[65] = 2872,
    ye[66] = 2875,
    ye[67] = 2876;
    var he = new Array(83);
    for (ke = 0; ke < 83; ke++)
        he[ke] = 0;
    var me = new Array(83);
    for (ke = 0; ke < 83; ke++) {
        for (me[ke] = new Array(83),
        Se = 0; Se < 83; Se++)
            me[ke][Se] = 0;
        me[ke][ke] = -1
    }
    me[68][14] = 3,
    me[69][5] = 3,
    me[70][11] = 3,
    me[71][1] = 3,
    me[72][10] = 3,
    me[73][12] = 3,
    me[74][13] = 3,
    me[75][4] = 3,
    me[76][0] = 3,
    me[77][7] = 3,
    me[78][9] = 3,
    me[79][3] = 3,
    me[80][2] = 3,
    me[81][6] = 3,
    me[82][8] = 3,
    me[0][20] = 3,
    me[0][26] = 3,
    me[0][35] = 3,
    me[0][37] = 3,
    me[0][63] = 3,
    me[1][15] = 3,
    me[1][22] = 3,
    me[1][29] = 3,
    me[2][21] = 3,
    me[2][37] = 3,
    me[2][33] = 3,
    me[3][17] = 3,
    me[3][25] = 3,
    me[3][36] = 3,
    me[4][18] = 3,
    me[4][30] = 3,
    me[4][34] = 3,
    me[5][24] = 3,
    me[5][28] = 3,
    me[5][29] = 3,
    me[6][28] = 3,
    me[6][27] = 3,
    me[6][31] = 3,
    me[7][34] = 3,
    me[7][33] = 3,
    me[7][27] = 3,
    me[8][32] = 3,
    me[8][30] = 3,
    me[8][36] = 3,
    me[9][15] = 3,
    me[9][19] = 3,
    me[9][23] = 3,
    me[10][20] = 3,
    me[10][21] = 3,
    me[10][22] = 3,
    me[11][16] = 3,
    me[11][26] = 3,
    me[11][23] = 3,
    me[11][38] = 3,
    me[11][62] = 3,
    me[12][31] = 3,
    me[12][25] = 3,
    me[12][24] = 3,
    me[13][16] = 3,
    me[13][17] = 3,
    me[13][19] = 3,
    me[14][35] = 3,
    me[14][38] = 3,
    me[14][18] = 3,
    me[14][32] = 3,
    me[14][66] = 3,
    me[15][44] = 3,
    me[15][50] = 3,
    me[15][57] = 3,
    me[16][54] = 3,
    me[16][39] = 3,
    me[17][55] = 3,
    me[17][53] = 3,
    me[18][41] = 3,
    me[18][55] = 3,
    me[19][51] = 3,
    me[20][49] = 3,
    me[20][42] = 3,
    me[21][47] = 3,
    me[22][39] = 3,
    me[22][59] = 3,
    me[23][53] = 3,
    me[23][52] = 3,
    me[24][51] = 3,
    me[24][43] = 3,
    me[25][54] = 3,
    me[25][52] = 3,
    me[26][39] = 3,
    me[26][57] = 3,
    me[27][41] = 3,
    me[27][44] = 3,
    me[28][48] = 3,
    me[28][47] = 3,
    me[29][49] = 3,
    me[29][46] = 3,
    me[30][40] = 3,
    me[31][40] = 3,
    me[31][50] = 3,
    me[32][58] = 3,
    me[32][44] = 3,
    me[33][56] = 3,
    me[33][52] = 3,
    me[33][43] = 3,
    me[34][58] = 3,
    me[34][42] = 3,
    me[35][56] = 3,
    me[35][42] = 3,
    me[36][48] = 3,
    me[36][45] = 3,
    me[36][46] = 3,
    me[37][59] = 3,
    me[37][46] = 3,
    me[38][55] = 3,
    me[38][45] = 3,
    me[39][67] = 3,
    me[40][65] = 3,
    me[41][63] = 3,
    me[42][67] = 3,
    me[43][60] = 3,
    me[44][61] = 3,
    me[45][64] = 3,
    me[46][61] = 3,
    me[47][65] = 3,
    me[48][60] = 3,
    me[49][62] = 3,
    me[50][60] = 3,
    me[51][65] = 3,
    me[52][61] = 3,
    me[53][63] = 3,
    me[54][66] = 3,
    me[55][67] = 3,
    me[56][64] = 3,
    me[57][64] = 3,
    me[58][62] = 3,
    me[59][66] = 3;
    for (var o, ke = 0; ke < 68; ke++) {
        !function e(a, r) {
            var t;
            var n;
            a < 15 ? n = 0 : a < 39 ? n = 1 : a < 60 ? n = 2 : a < 68 ? n = 3 : a < 83 && (n = -1);
            var i, o;
            switch (n) {
            case 1:
                i = 0,
                o = 15;
                break;
            case 2:
                i = 15,
                o = 39;
                break;
            case 3:
                i = 39,
                o = 60;
                break;
            case 0:
                i = 68,
                o = 83
            }
            if (-1 != n)
                for (t = i; t < o; t++)
                    3 == me[t][a] && e(t, r);
            a != r && (me[r][a] += -2)
        }(ke, ke);
        for (var n, we, Se = 0; Se < 83; Se++)
            Se < 15 ? n = 1 : Se < 39 ? n = 2 : Se < 60 ? n = 3 : Se < 68 ? n = 4 : Se < 83 && (n = 0),
            ke < 15 ? we = 1 : ke < 39 ? we = 2 : ke < 60 ? we = 3 : ke < 68 ? we = 4 : ke < 83 && (we = 0),
            we <= n || (me[ke][Se] = me[ke][Se] * Math.pow(2, we - n - 1))
    }
    for (me[ke = 62][11] += -2,
    me[62][70] += -4,
    me[ke = 63][0] += -2,
    me[63][76] += -4,
    me[ke = 66][14] += -2,
    me[66][68] += -4,
    ke = 0; ke < 83; ke++)
        for (var _e = 1, Se = 0; Se < 83; Se++)
            if (3 == me[ke][Se] && (me[ke][Se] += _e,
            !(67 < ke))) {
                for (t = 0; t < 83; t++)
                    t != ke && t != Se && 3 <= me[t][Se] && me[t][Se] <= 10 && (me[ke][t] = 10 + _e);
                _e++
            }
    void 0 === o && (o = 10000002);
    for (var xe = [], ke = 0; ke < 83; ke++)
        xe.push(ye[ke]);
    function Ae() {
        var e = new XMLHttpRequest;
        e.open("GET", "https://market.fuzzwork.co.uk/aggregates/?types=" + xe.join() + (o ? "&region=" + o : ""), !0),
        e.onreadystatechange = function() {
            4 == e.readyState && 200 == e.status && (Le = JSON.parse(e.responseText),
            Fe())
        }
        ,
        e.send(),
        Le = {},
        setTimeout(function() {
            var e;
            Le[ye[0]] || ((e = new XMLHttpRequest).open("GET", "https://api.evemarketer.com/ec/marketstat/json?typeid=" + xe.join() + (o ? "&regionlimit=" + o : ""), !0),
            e.onreadystatechange = function() {
                4 == e.readyState && 200 == e.status && (Ee = JSON.parse(e.responseText),
                Fe())
            }
            ,
            e.send(),
            Ee = [],
            Fe())
        }, 5e3)
    }
    function Te(e) {
        o = e.target.value,
        Ae()
    }
    function Ce() {
        Fe();
        var e = "No legend"
          , a = $("#marketinfo").val()
          , r = p ? " (0)" : ""
          , t = p ? " (50)" : ""
          , n = p ? " (100)" : "";
        switch (a) {
        case "average_item":
        case "average_m3":
            e = 'Legend: <span class="green">Expensive' + r + '</span>, <span class="yellow">Moderate' + t + '</span>, <span class="red">Cheap' + n + "</span> average prices";
            break;
        case "sell_item":
        case "sell_m3":
            e = 'Legend: <span class="green">Cheap' + r + '</span>, <span class="yellow">Moderate' + t + '</span>, <span class="red">Expensive' + n + "</span> sell prices";
            break;
        case "buy_item":
        case "buy_m3":
            e = 'Legend: <span class="green">Expensive' + r + '</span>, <span class="yellow">Moderate' + t + '</span>, <span class="red">Cheap' + n + "</span> buy prices";
            break;
        case "split_item":
        case "split_m3":
            e = 'Legend: <span class="green">Cheap' + r + '</span>, <span class="yellow">Moderate' + t + '</span>, <span class="red">Expensive' + n + '</span> <span title="(sell + buy) / 2">split</span> prices';
            break;
        case "difference":
            e = '<span title="(sell - buy) / buy * 100%">Legend: <span class="green">Stable' + r + '</span>, <span class="yellow">Moderate' + t + '</span>, <span class="red">Speculative' + n + "</span> prices</span>";
            break;
        case "prevalence":
            e = '<span title="buy_volume / sell_volume * 100%">Legend: <span class="green">Sufficiency' + r + '</span>, <span class="yellow">Moderate' + t + '</span>, <span class="red">Deficit' + n + "</span></span>"
        }
        $("#Legend").html(e)
    }
    function Me() {
        p = $("#colorratio").prop("checked"),
        Ce()
    }
    var Ye, Ee = [], Le = {}, Pe = {};
    function Re() {
        for (e = 0; e < 83; e++)
            ue[e] = 0;
        for (e = 0; e < 8; e++)
            if (1 == be[e])
                for (Se = 0; Se < 5; Se++)
                    ue[ge[e][Se]] = 1;
        var e;
        for (Ie(ue),
        e = 0; e < 83; e++)
            0 == ue[e] && 1 == (1 == he[e] || 1.1 == he[e] || 4 == he[e] || 4.1 == he[e]) && (he[e] = 0,
            A--,
            $e());
        if (0 == be[0] && 0 == be[7])
            for (e = 60; e < 68; e++)
                ue[e] = 0
    }
    function $e() {
        for (e = 0; e < 83; e++)
            1 != he[e] && (1.1 == he[e] || 4 == he[e] || 4.1 == he[e] ? he[e] = 1 : he[e] = 0);
        var e;
        for (Ie(he),
        e = 0; e < 83; e++)
            0 == ue[e] && 1 == (1 == he[e] || 1.1 == he[e] || 4 == he[e] || 4.1 == he[e]) && (he[e] = 0,
            A--)
    }
    function Ie(e) {
        var a = 0;
        for (ke = 0; ke < 83; ke++) {
            if (0 < e[ke])
                for (Se = 0; Se < 83; Se++)
                    if (3 < me[ke][Se] && me[ke][Se] < 10) {
                        for (oldj = e[Se],
                        t = 0; t < 83; t++)
                            if (me[ke][t] - 7 == me[ke][Se] || -1 == me[ke][t]) {
                                if (!(0 < e[t])) {
                                    e[Se] = oldj,
                                    a = 0;
                                    break
                                }
                                switch (e[Se]) {
                                case 0:
                                    e[Se] = 2,
                                    a = 1;
                                    break;
                                case 1.1:
                                case 1:
                                    e[Se] = 4
                                }
                            }
                        4 != e[Se] && 2 != e[Se] && 2.1 != e[Se] || 1 != e[ke] || (e[ke] = 1.1),
                        4 != e[Se] && 4.1 != e[Se] && 2 != e[Se] && 2.1 != e[Se] || 4 != e[ke] || (e[ke] = 4.1),
                        4 != e[Se] && 2 != e[Se] || 2 != e[ke] || (e[ke] = 2.1)
                    }
            82 == ke && 1 == a && (ke = -1,
            a = 0)
        }
    }
    function Oe(e) {
        var a = 0
          , r = 0
          , t = new Array(5);
        if (1 == e)
            for (ke = 0; ke < 83; ke++)
                3 < me[ke][S] && me[ke][S] < 10 && (t[r] = ke,
                r++);
        else if (0 == e)
            for (ke = 0; ke < 83; ke++)
                3 < me[S][ke] && me[S][ke] < 10 && (t[r] = ke,
                r++);
        else
            for (ke = 0; ke < 83; ke++)
                10 < me[S][ke] && (t[r] = ke,
                r++);
        for (ke = 0; ke < r; ke++)
            cp = t[ke],
            1 != he[cp] && 1.1 != he[cp] && 4 != he[cp] && 4.1 != he[cp] && (he[cp] = 1,
            A++,
            a = 1);
        if (a)
            $e(),
            Fe();
        else {
            for (ke = 0; ke < r; ke++)
                cp = t[ke],
                he[cp] = 0,
                A--;
            $e(),
            Fe()
        }
    }
    function Be() {
        A = 0,
        he.fill(0),
        be.fill(1),
        $e(),
        Re(),
        Ke(),
        Fe()
    }
    (Ye = new XMLHttpRequest).open("GET", "https://esi.evetech.net/v1/markets/prices/", !0),
    Ye.onreadystatechange = function() {
        if (4 == Ye.readyState && 200 == Ye.status) {
            for (var e = JSON.parse(Ye.responseText), a = 0; a < e.length; a++) {
                var r = e[a];
                -1 !== xe.indexOf(r.type_id) && (Pe[r.type_id] = r)
            }
            Fe()
        }
    }
    ,
    Ye.send(),
    T.src = "images/pi780.jpg",
    T.onload = function() {
        x = 1,
        Fe()
    }
    ;
    var je = function(e) {
        if (null == e || "number" != typeof e)
            return e;
        var a = "";
        return 1e9 <= e ? (e /= 1e9,
        a += " B") : 1e6 <= e ? (e /= 1e6,
        a += " M") : 1e3 <= e && (e /= 1e3,
        a += " k"),
        (e = e < 10 ? Math.round(100 * e) / 100 : e < 100 ? Math.round(10 * e) / 10 : Math.round(e)) + a
    }
      , ze = function(e) {
        var a = Pe[ye[e]]
          , r = void 0
          , t = void 0
          , n = void 0
          , i = void 0
          , o = Le[ye[e]];
        o && (o.sell && (r = parseFloat(o.sell.percentile),
        n = parseFloat(o.sell.volume)),
        o.buy && (t = parseFloat(o.buy.percentile),
        i = parseFloat(o.buy.volume)));
        o = Ee[e];
        o && (o.sell && (r = r || o.sell.fivePercent,
        n = n || o.sell.volume),
        o.buy && (t = t || o.buy.fivePercent,
        i = i || o.buy.volume));
        var s, l = void 0, c = .5, f = $("#marketinfo").val();
        switch (f) {
        case "average_item":
        case "average_m3":
            if (a && a.average_price) {
                switch (f) {
                case "average_item":
                    l = a.average_price;
                    break;
                case "average_m3":
                    l = a.average_price / qe(e).volume
                }
                r ? s = t ? (r + t) / 2 : r : t && (s = t),
                s && (c = 1 - a.average_price / s + .5)
            }
            break;
        case "sell_item":
        case "sell_m3":
            if (r) {
                switch (f) {
                case "sell_item":
                    l = r;
                    break;
                case "sell_m3":
                    l = r / qe(e).volume
                }
                a && a.average_price && (c = 2 * (r - a.average_price) / a.average_price + .3)
            }
            break;
        case "buy_item":
        case "buy_m3":
            if (t) {
                switch (f) {
                case "buy_item":
                    l = t;
                    break;
                case "buy_m3":
                    l = t / qe(e).volume
                }
                a && a.average_price && (c = -2 * (t - a.average_price) / a.average_price + .3)
            }
            break;
        case "split_item":
        case "split_m3":
            if (r && t) {
                switch (f) {
                case "split_item":
                    l = (r + t) / 2;
                    break;
                case "split_m3":
                    l = (r + t) / 2 / qe(e).volume
                }
                a && a.average_price && (c = 2 * ((r + t) / 2 - a.average_price) / a.average_price + .3)
            }
            break;
        case "difference":
            r && t && (c = (l = (r - t) / t * 100) / 30);
            break;
        case "prevalence":
            n && i && (c = (l = i / n * 100) / 300)
        }
        return l = null == l ? "" : je(l),
        c = Math.min(1, Math.max(0, c)),
        {
            text: l = p && "nothing" !== f ? ".".repeat(Math.round(25 * c)) + " (" + Math.round(100 * c) + ") " + l : l,
            ratio: c,
            color: p ? "hsla(60 100% 80% / " + (.6 * c + .4) + ")" : "rgb(" + (.5 < c ? 255 : Math.floor(2 * c * 255)) + ", " + (c < .5 ? 255 : Math.floor(128 * (-2 * c + 2) + 127)) + ", " + (c < .5 ? 0 : Math.floor(255 * (c - .5))) + ")"
        }
    };
    function Fe() {
        if ("undefined" != typeof $) {
            var e = document.getElementById("canvas");
            if (e) {
                var a = e.getContext("2d");
                if (0 == x)
                    return a.font = "14pt Arial,font-weight:bold",
                    a.fillStyle = "rgb(0,0,0)",
                    a.textAlign = "start",
                    void a.fillText("Loading...", 15, 15);
                a.drawImage(T, 0, 0),
                resetButton.style.display = -1 !== he.findIndex(e => 0 !== e) || -1 !== be.findIndex(e => 1 !== e) ? "inline" : "none",
                (10 <= w && w <= 20 && 1 == be[_] ? Ke : A || -1 == S ? function() {
                    for (Se = 1; Se <= 7; Se++)
                        for (Ne(Se),
                        ke = g; ke < y; ke++)
                            rectY = (ke - g) * ve,
                            0 != ue[ke] ? (1 != he[ke] && 4 != he[ke] && 4.1 != he[ke] && 1.1 != he[ke] || Je(h, m + rectY),
                            1 == he[ke] || 4 == he[ke] || 2 == he[ke] ? u.fillStyle = R : 4.1 == he[ke] || 2.1 == he[ke] ? u.fillStyle = M : 1.1 == he[ke] ? u.fillStyle = E : ke == S && (u.fillStyle = B),
                            (0 < he[ke] || ke == S) && u.fillRect(h, m + rectY, de, ve),
                            ke == S && 0 < he[ke] && function(e, a) {
                                u.fillStyle = "rgba(0,200,0,0.8)",
                                u.fillRect(e + .9 * de, a + rectY, .1 * de, ve / 2),
                                u.textAlign = "center",
                                u.font = "14pt Arial,font-weight:bold",
                                u.fillStyle = C,
                                u.fillText("I", e + .9 * de + 6, a + rectY + 18),
                                u.fillStyle = "rgba(200,200,0,0.8)",
                                u.fillRect(e + .9 * de, a + rectY + ve / 2, .1 * de, ve / 2),
                                u.textAlign = "center",
                                u.font = "13pt Arial,font-weight:bold",
                                u.fillStyle = C,
                                u.fillText("O", e + .9 * de + 6, a + rectY + ve / 2 + 18),
                                u.fillStyle = "rgba(120,120,120,0.8)",
                                u.fillRect(e + .8 * de, a + rectY + ve / 4, .1 * de, ve / 2),
                                u.textAlign = "center",
                                u.font = "13pt Arial,font-weight:bold",
                                u.fillStyle = C,
                                u.fillText("P", e + .8 * de + 6, a + rectY + ve / 4 + 18)
                            }(h, m)) : He(h, m, rectY)
                }
                : function() {
                    for (Se = 1; Se <= 7; Se++)
                        for (Ne(Se),
                        ke = g; ke < y; ke++)
                            rectY = (ke - g) * ve,
                            0 != ue[ke] ? 0 != me[S][ke] && (3 < me[S][ke] ? function(e, a, r) {
                                var t;
                                switch (r) {
                                default:
                                case 4:
                                    t = P;
                                    break;
                                case 5:
                                    t = R;
                                    break;
                                case 6:
                                    t = I;
                                    break;
                                case 7:
                                    t = O;
                                    break;
                                case 8:
                                    t = B;
                                    break;
                                case 11:
                                    u.fillStyle = P;
                                    break;
                                case 12:
                                    u.fillStyle = R;
                                    break;
                                case 13:
                                    u.fillStyle = I;
                                    break;
                                case 14:
                                    u.fillStyle = O;
                                    break;
                                case 15:
                                    u.fillStyle = B
                                }
                                r < 10 && ((r = u.createLinearGradient(e, 0, e + de, 0)).addColorStop(.3, Y),
                                r.addColorStop(.7, t),
                                u.fillStyle = "rgb(0,0,0)",
                                u.fillStyle = r),
                                u.fillRect(e, a, de, ve)
                            }(h, m + rectY, me[S][ke]) : me[S][ke] < -1 ? (-2 == me[S][ke] ? u.fillStyle = E : u.fillStyle = L,
                            Quantity = me[S][ke] * b * -1,
                            Xe(h, m + rectY, Quantity)) : -1 == me[S][ke] && (function e(a, r) {
                                Ne(Ge(a));
                                u.save();
                                u.lineWidth = 2;
                                u.lineCap = "round";
                                var t = h
                                  , n = m + (a - g) * ve + ve / 2;
                                for (var i = 0; i < me[a].length; i++) {
                                    var o, s;
                                    -2 == me[a][i] && (Ne(Ge(i)),
                                    o = h + de,
                                    s = m + (i - g) * ve + ve / 2,
                                    u.save(),
                                    u.beginPath(),
                                    u.rect(t, 0, o - t, u.canvas.height),
                                    u.clip(),
                                    u.beginPath(),
                                    u.moveTo(t, n),
                                    u.lineTo(o, s),
                                    -1 != [0, 1].indexOf(r) ? ((s = u.createLinearGradient(t, n, o, s)).addColorStop(0, 1 == r ? E : M),
                                    s.addColorStop(1, 1 == r ? L : E),
                                    u.strokeStyle = s) : u.strokeStyle = L,
                                    u.stroke(),
                                    u.restore(),
                                    e(i, r + 1))
                                }
                                u.restore()
                            }(S, 0),
                            Ne(Se),
                            Je(h, m + rectY),
                            1 == k && (u.fillStyle = M,
                            u.fillRect(h, m + rectY, 48, ve)),
                            u.fillStyle = M,
                            67 < ke ? u.fillRect(h, m + rectY, de, ve) : Xe(h, m + rectY, b))) : He(h, m, rectY)
                }
                )();
                for (var r = new Array(8), t = new Array(8), n = 0; n < r.length; n++)
                    r[n] = t[n] = !1;
                if (0 <= S) {
                    for (n = 0; n < ge.length; n++) {
                        for (var i = !0, o = 68; o < 83; o++)
                            if (0 != me[S][o]) {
                                for (var s = !1, l = 0; l < ge[n].length; l++)
                                    if (ge[n][l] == o) {
                                        s = !0;
                                        break
                                    }
                                if (!s) {
                                    i = !1;
                                    break
                                }
                            }
                        i && (r[n] = !0)
                    }
                    for (o = 68; o < 83; o++)
                        if (0 != me[S][o])
                            for (n = 0; n < ge.length; n++)
                                for (l = 0; l < ge[n].length; l++)
                                    ge[n][l] == o && (t[n] = !0)
                }
                for (d = 0; d < 8; d++)
                    1 != be[d] ? a.fillStyle = "rgba(95,100,128,1)" : d == _ || r[d] ? a.fillStyle = M : t[d] ? a.fillStyle = L : a.fillStyle = "rgba(0, 0, 0, 0)",
                    a.fillRect(d * j + 24, z, j - 24, F);
                a.textAlign = "end",
                a.font = "8pt Arial, sans-serif";
                for (var c = 1; c <= 7; c++) {
                    Ne(c);
                    for (var f, p, v, d = g; d < y; d++)
                        0 != ue[d] && (f = ze(d),
                        p = h + de - 6,
                        v = m + (d - g) * ve + 40,
                        a.fillStyle = f.color,
                        a.fillText(f.text, p, v))
                }
            }
        }
    }
    function Ke() {
        for (!function() {
            for (ke = 0; ke < 83; ke++)
                i[ke] = 0;
            if (0 <= _)
                for (ke = 0; ke < 8; ke++)
                    i[ge[_][ke]] = 1;
            Ie(i)
        }(),
        u.save(),
        u.lineWidth = 2,
        u.lineCap = "round",
        Se = 1; Se <= 7; Se++)
            for (Ne(Se),
            ke = g; ke < y; ke++)
                if (rectY = (ke - g) * ve,
                0 != ue[ke]) {
                    if (0 != i[ke]) {
                        u.fillStyle = 1 == Se ? M : P,
                        u.fillRect(h, m + rectY, de, ve);
                        for (var e = 0; e < me[ke].length; e++) {
                            var a, r, t, n = me[ke][e];
                            4 <= n && n <= 8 && 0 == !i[e] && (a = h + de,
                            r = m + (ke - g) * ve + ve / 2,
                            Ne(Ge(e)),
                            t = h,
                            n = m + (e - g) * ve + ve / 2,
                            u.save(),
                            u.beginPath(),
                            u.rect(a, 0, t - a, u.canvas.height),
                            u.clip(),
                            u.beginPath(),
                            u.moveTo(a, r),
                            u.lineTo(t, n),
                            u.strokeStyle = M,
                            u.stroke(),
                            u.restore(),
                            Ne(Se))
                        }
                    }
                } else
                    He(h, m, rectY);
        u.restore()
    }
    function Ge(e) {
        return 0 <= e && e < 15 ? 2 : e < 27 ? 3 : e < 39 ? 4 : e < 50 ? 5 : e < 60 ? 6 : e < 68 ? 7 : e < 83 ? 1 : void 0
    }
    function Ne(e) {
        switch (e) {
        case 1:
            b = 1500,
            g = 68,
            y = 83,
            h = f,
            m = v;
            break;
        case 2:
            b = 20,
            g = 0,
            y = 15,
            h = G,
            m = N;
            break;
        case 3:
            b = 5,
            g = 15,
            y = 27,
            h = J,
            m = X;
            break;
        case 4:
            b = 5,
            g = 27,
            y = 39,
            h = W,
            m = D;
            break;
        case 5:
            b = 3,
            g = 39,
            y = 50,
            h = ee,
            m = ae;
            break;
        case 6:
            b = 3,
            g = 50,
            y = 60,
            h = ne,
            m = ie;
            break;
        case 7:
            b = 1,
            g = 60,
            y = 68,
            h = le,
            m = ce
        }
    }
    function qe(e) {
        var a = {};
        switch (Ge(e)) {
        case 1:
            a.level = "Resources (R0)",
            a.volume = .01,
            a.baseCost = 5;
            break;
        case 2:
            a.level = "Tier 1 Products (P1)",
            a.volume = .38,
            a.baseCost = 400;
            break;
        case 3:
        case 4:
            a.level = "Tier 2 Products (P2)",
            a.volume = 1.5,
            a.baseCost = 7200;
            break;
        case 5:
        case 6:
            a.level = "Tier 3 Products (P3)",
            a.volume = 6,
            a.baseCost = 6e4;
            break;
        case 7:
            a.level = "Tier 4 Products (P4)",
            a.volume = 100,
            a.baseCost = 12e5
        }
        return a
    }
    function He(e, a, r) {
        u.fillStyle = "rgba(95,100,128,1)",
        u.fillRect(e + 1, a + r + 1, de - 2, ve - 2)
    }
    function Je(e, a) {
        u.strokeStyle = "rgba(255,255,0,0.7)",
        u.lineWidth = 4,
        u.beginPath(),
        u.moveTo(e + 3, a + 3),
        u.lineTo(e + de - 3, a + 3),
        u.lineTo(e + de - 3, a + ve - 3),
        u.lineTo(e + 3, a + ve - 3),
        u.closePath(),
        u.stroke()
    }
    function Xe(e, a, r) {
        u.textAlign = "end",
        u.font = "8pt Arial",
        u.fillRect(e, a, de, ve),
        u.fillStyle = C,
        r < 1e3 || (r /= 1e3,
        r += "k"),
        u.fillText(r, e + de - 6, a + 29)
    }
    function Qe(e) {
        if (0 < w)
            if (w <= 19)
                1 == be[_] ? be[_] = 0 : be[_] = 1,
                Re(),
                Fe();
            else if (w <= 199) {
                switch (k) {
                case 0:
                    he[S] <= 0 || 2 == he[S] || 2.1 == he[S] ? (he[S] = 1,
                    A++) : 1 != he[S] && 1.1 != he[S] && 4 != he[S] && 4.1 != he[S] || (he[S] = 0,
                    A--),
                    $e(),
                    Fe();
                    break;
                case 1:
                    if (r)
                        CCPEVE.showMarketDetails(ye[S]);
                    else {
                        var a = "" + ye[S];
                        switch ($("#redirectsite").val()) {
                        case "fuzzwork":
                            window.open("https://market.fuzzwork.co.uk/" + (o ? "region/" + o + "/" : "") + "type/" + a + "/");
                            break;
                        case "evemarketer":
                            window.open("https://evemarketer.com/" + (o ? "regions/" + o + "/" : "") + "types/" + a);
                            break;
                        case "evemarketdata":
                            window.open("https://eve-marketdata.com/price_check.php?" + (o ? "region_id=" + o + "&" : "") + "type_id=" + a);
                            break;
                        case "evepraisal":
                            window.open("https://evepraisal.com/item/" + a);
                            break;
                        case "everef":
                            window.open("https://everef.net/type/" + a);
                            break;
                        case "chruker":
                            window.open("http://games.chruker.dk/eve_online/item.php?type_id=" + a);
                            break;
                        case "adam4eve":
                            window.open("https://www.adam4eve.eu/pi_chain.php?pi=" + a)
                        }
                    }
                }
                if (A)
                    switch (k) {
                    case 2:
                        Oe(1);
                        break;
                    case 3:
                        Oe(0);
                        break;
                    case 4:
                        Oe(2)
                    }
            }
    }
    function Ve(e) {
        if (0 < w && w <= 19) {
            var a = be.indexOf(1)
              , r = !1;
            -1 != a && a == be.lastIndexOf(1) && a == _ && (r = !0);
            for (var t = 0; t < be.length; t++)
                be[t] = r || t == _ ? 1 : 0;
            Re(),
            Fe()
        }
        if (0 === w) {
            for (t = A = 0; t < he.length; t++)
                he[t] = 0;
            $e();
            for (t = 0; t < be.length; t++)
                be[t] = 1;
            Re(),
            Fe()
        }
    }
    function We(e) {
        var a, r;
        e.altKey || (a = $("#canvas").offset().left,
        r = $("#canvas").offset().top,
        s = e.pageX - a,
        l = e.pageY - r,
        r = w,
        (w = function() {
            if (w = 0,
            768 < l && l <= 792)
                c = Math.floor(s / 136),
                w = c + 10;
            else
                for (ke = 1; ke <= 7; ke++) {
                    var e, a, r, t, n;
                    switch (ke) {
                    case 1:
                        e = 68,
                        a = f,
                        r = K,
                        n = v,
                        t = d;
                        break;
                    case 2:
                        e = 0,
                        a = G,
                        r = H,
                        n = N,
                        t = q;
                        break;
                    case 3:
                        e = 15,
                        a = J,
                        r = V,
                        n = X,
                        t = Q;
                        break;
                    case 4:
                        e = 27,
                        a = W,
                        r = Z,
                        n = D,
                        t = U;
                        break;
                    case 5:
                        e = 39,
                        a = ee,
                        r = te,
                        n = ae,
                        t = re;
                        break;
                    case 6:
                        e = 50,
                        a = ne,
                        r = se,
                        n = ie,
                        t = oe;
                        break;
                    case 7:
                        e = 60,
                        a = le,
                        r = pe,
                        n = ce,
                        t = fe
                    }
                    if (s < r && a < s && n < l && l < t) {
                        mouseTY = l - n,
                        Case = Math.floor(mouseTY / ve),
                        w = Case + e + 100,
                        s < a + ve ? w += .1 : a + .9 * de < s ? (CaseTop = Case * ve + n,
                        l < CaseTop + ve / 2 ? w += .2 : w += .3) : a + .8 * de < s && (w += .4);
                        break
                    }
                }
            S = 100 <= w ? Math.floor(w) - 100 : -1;
            k = 10 * (k = (k = w - Math.round(w)).toFixed(1)),
            ((_ = w - 10) < 0 || 7 < _) && (_ = -1);
            0 == ue[S] && (S = -1);
            var i = S;
            if (-1 === i) {
                var o = 0;
                for (ke = 0; ke < he.length; ke++)
                    0 !== he[ke] && (o++,
                    i = ke);
                1 !== o && (i = -1)
            }
            return ea(i),
            w
        }()) != r && (1 == k ? $("#canvas").css("cursor", "pointer") : $("#canvas").css("cursor", "default"),
        Fe()))
    }
    function De(e) {
        a = 0
    }
    function Ue(e) {}
    function Ze(e) {
        if ("KeyR" === e.code && Be(),
        0 <= S && 0 == a) {
            if (105 == e.charCode)
                Oe(1);
            else if (111 == e.charCode)
                Oe(0);
            else {
                if (112 != e.charCode)
                    return;
                Oe(2)
            }
            a = 1
        }
    }
    function ea(e) {
        var a, r, t, n, i = "";
        0 <= e ? (a = qe(e),
        (n = Pe[ye[e]]) && n.average_price && (i += "Average price: (<b>" + je(n.average_price / a.volume) + "</b> ISK/m&sup3;) <b>" + je(n.average_price) + "</b> ISK/item"),
        (n = Le[ye[e]]) && (n.sell && (r = parseFloat(n.sell.percentile)),
        n.buy && (t = parseFloat(n.buy.percentile))),
        (n = Ee[e]) && (n.sell && (r = r || n.sell.fivePercent),
        n.buy && (t = t || n.buy.fivePercent)),
        r && (i && (i += ", "),
        i += "Sell: <b>" + je(r) + "</b> ISK/item"),
        t && (i && (i += ", "),
        i += "Buy: <b>" + je(t) + "</b> ISK/item"),
        p && (i += "; Color ratio: <b>" + Math.round(100 * ze(e).ratio) + "</b>"),
        i += "<br/>",
        i += "Volume: <b>" + a.volume + "</b> m&sup3;/item, Level: <b>" + a.level + "</b>, Base tax cost: <b>" + je(a.baseCost) + "</b> ISK/item") : i = "Hover a commodity to show detailed information<br/>&nbsp;",
        $("#commodityInfo").html(i)
    }
    "undefined" != typeof Sentry && Sentry.init({
        dsn: "https://fd3cea71f7d84957a0eeaa0f0f9d7e0c@o889421.ingest.sentry.io/5838704",
        environment: "evehelper",
        ignoreErrors: ["ResizeObserver", "HTMLScriptElement.e.onerror"]
    }),
    window.addEventListener("load", function() {
        "undefined" != typeof $ ? function() {
            var e = document.getElementById("canvas");
            if (e) {
                if (u = e.getContext("2d"),
                $("#canvas").mousemove(We).mouseleave(We).click(Qe).dblclick(Ve),
                document.onkeypress = Ze,
                document.onkeyup = De,
                document.onkeydown = Ue,
                resetButton.addEventListener("click", Be),
                marketinfo.addEventListener("change", Ce),
                colorratio.addEventListener("change", Me),
                region.addEventListener("change", Te),
                "undefined" != typeof localStorage) {
                    try {
                        var n = JSON.parse(localStorage.getItem("evesettings"))
                    } catch (e) {}
                    n && ($.each(["marketinfo", "colorratio", "region", "redirectsite"], function(e, a) {
                        var r, t = n[a];
                        void 0 !== t && (r = $("#" + a),
                        "colorratio" === a ? r.prop("checked", t) : r.val(t))
                    }),
                    void 0 !== n.region && (o = n.region))
                }
                Ae(),
                Me(),
                ea()
            } else
                alert("canvas support required")
        }() : alert("This site requires jQuery library for correct work. But it seems your browser extension, firewall or something else blocks it.")
    }),
    window.addEventListener("beforeunload", function() {
        var t;
        "undefined" != typeof $ && "undefined" != typeof localStorage && (t = {},
        $.each(["marketinfo", "colorratio", "region", "redirectsite"], function(e, a) {
            var r = $("#" + a);
            t[a] = "colorratio" === a ? r.prop("checked") : r.val()
        }),
        localStorage.setItem("evesettings", JSON.stringify(t)))
    })
}();
