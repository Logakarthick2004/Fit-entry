globalThis.__nitro_main__ = import.meta.url;
import { a as FastResponse, n as HTTPError, r as defineLazyEventHandler, t as H3Core } from "./_libs/h3+rou3+srvx.mjs";
import { t as HookableCore } from "./_libs/hookable.mjs";
//#region #nitro-vite-setup
function lazyService(loader) {
	let promise, mod;
	return { fetch(req) {
		if (mod) return mod.fetch(req);
		if (!promise) promise = loader().then((_mod) => mod = _mod.default || _mod);
		return promise.then((mod) => mod.fetch(req));
	} };
}
var services = { ["ssr"]: lazyService(() => import("./_ssr/ssr.mjs")) };
globalThis.__nitro_vite_envs__ = services;
//#endregion
//#region #nitro/virtual/public-assets-data
var public_assets_data_default = {
	"/assets/auth-BdbQIhJI.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"221c-jax/4Q5fdYgMgRSqwuR3GSpvoJY\"",
		"mtime": "2026-06-20T06:49:50.291Z",
		"size": 8732,
		"path": "../public/assets/auth-BdbQIhJI.js"
	},
	"/assets/attendance-B6Ra69ob.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"1912-L5mNHgZDk/9eSWvO0I0cbXwWrNQ\"",
		"mtime": "2026-06-20T06:49:50.290Z",
		"size": 6418,
		"path": "../public/assets/attendance-B6Ra69ob.js"
	},
	"/assets/avatar-ruFPG2dJ.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"a74-LzaV7I0Z1nV0IWR4dMWqvTSiBM8\"",
		"mtime": "2026-06-20T06:49:50.292Z",
		"size": 2676,
		"path": "../public/assets/avatar-ruFPG2dJ.js"
	},
	"/assets/bebas-neue-latin-400-normal-Bi-ndsyu.woff": {
		"type": "font/woff",
		"etag": "\"2bac-eEj3nehPbQ71i2QuxVclm03KwLw\"",
		"mtime": "2026-06-20T06:49:50.681Z",
		"size": 11180,
		"path": "../public/assets/bebas-neue-latin-400-normal-Bi-ndsyu.woff"
	},
	"/assets/bebas-neue-latin-400-normal-9mHNbWWO.woff2": {
		"type": "font/woff2",
		"etag": "\"35c8-HwY72aPfqN/QTgccChg2mpcfg1E\"",
		"mtime": "2026-06-20T06:49:50.680Z",
		"size": 13768,
		"path": "../public/assets/bebas-neue-latin-400-normal-9mHNbWWO.woff2"
	},
	"/assets/bebas-neue-latin-ext-400-normal-DWiEslNC.woff2": {
		"type": "font/woff2",
		"etag": "\"22e0-mzPqRLuD3PyHiYXLyEc0J5G7qos\"",
		"mtime": "2026-06-20T06:49:50.683Z",
		"size": 8928,
		"path": "../public/assets/bebas-neue-latin-ext-400-normal-DWiEslNC.woff2"
	},
	"/assets/bebas-neue-latin-ext-400-normal-HFKRJXnW.woff": {
		"type": "font/woff",
		"etag": "\"1d60-ft2TUJBxdO2bxlvUsr1cy9Aohts\"",
		"mtime": "2026-06-20T06:49:50.687Z",
		"size": 7520,
		"path": "../public/assets/bebas-neue-latin-ext-400-normal-HFKRJXnW.woff"
	},
	"/assets/c._token-brz-FRzv.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"b3b-7FUqL8HVM/NE6+hf/VQDzwTnqvs\"",
		"mtime": "2026-06-20T06:49:50.294Z",
		"size": 2875,
		"path": "../public/assets/c._token-brz-FRzv.js"
	},
	"/assets/chevron-right-C3YSKPkY.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"82-1fFvzYh4Xl7BLaH8tVI9v0ZOTeI\"",
		"mtime": "2026-06-20T06:49:50.307Z",
		"size": 130,
		"path": "../public/assets/chevron-right-C3YSKPkY.js"
	},
	"/assets/chunk-Cyuzqnbw.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"33a-sLuEQdOFynE3qFgQSeNus69La7w\"",
		"mtime": "2026-06-20T06:49:50.309Z",
		"size": 826,
		"path": "../public/assets/chunk-Cyuzqnbw.js"
	},
	"/assets/createLucideIcon-WhwUpXHo.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"4cc-PVifRHhoAIOkdgXbadMybzEZD3Q\"",
		"mtime": "2026-06-20T06:49:50.311Z",
		"size": 1228,
		"path": "../public/assets/createLucideIcon-WhwUpXHo.js"
	},
	"/assets/credit-card-B7g4J_YS.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"240-dKU5MDY/aMUSMqy3jqvJCmxR6mo\"",
		"mtime": "2026-06-20T06:49:50.312Z",
		"size": 576,
		"path": "../public/assets/credit-card-B7g4J_YS.js"
	},
	"/assets/dialog-CAQtNetC.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"190b-/yVBk3Bs1qvkL9pcshMnmdHZ66o\"",
		"mtime": "2026-06-20T06:49:50.314Z",
		"size": 6411,
		"path": "../public/assets/dialog-CAQtNetC.js"
	},
	"/assets/diets-CS341azq.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"ece-a1I2xJA6HdYLsPT6CTh4NME+9HY\"",
		"mtime": "2026-06-20T06:49:50.316Z",
		"size": 3790,
		"path": "../public/assets/diets-CS341azq.js"
	},
	"/assets/dist-a2LwMvC6.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"561-eS/e0SmKZRXW+9yTJumrnH9w5+k\"",
		"mtime": "2026-06-20T06:49:50.352Z",
		"size": 1377,
		"path": "../public/assets/dist-a2LwMvC6.js"
	},
	"/assets/dist-Bkn87S0X.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"e01-kNsV3eDO0cAb3DXNw6lDbAoNEWY\"",
		"mtime": "2026-06-20T06:49:50.330Z",
		"size": 3585,
		"path": "../public/assets/dist-Bkn87S0X.js"
	},
	"/assets/dist-Ah_8bdvB.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"1212-ojmFM3yroyGbGWFD+Y7l5ULZko8\"",
		"mtime": "2026-06-20T06:49:50.326Z",
		"size": 4626,
		"path": "../public/assets/dist-Ah_8bdvB.js"
	},
	"/assets/dist-CWDwsmKR.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"1284-HM0I3jlz0PrpUUPclGZfL5yNT7c\"",
		"mtime": "2026-06-20T06:49:50.349Z",
		"size": 4740,
		"path": "../public/assets/dist-CWDwsmKR.js"
	},
	"/assets/dist-C8PdKJgG.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"69fc-drtsFR+rgMqCg8WFcQqwSHAN/e0\"",
		"mtime": "2026-06-20T06:49:50.331Z",
		"size": 27132,
		"path": "../public/assets/dist-C8PdKJgG.js"
	},
	"/assets/dumbbell-Blb_rDuE.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"230-aP04YcVvcWGfu2QDC26Gt9zx13U\"",
		"mtime": "2026-06-20T06:49:50.378Z",
		"size": 560,
		"path": "../public/assets/dumbbell-Blb_rDuE.js"
	},
	"/assets/es2015-CbEVclpZ.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"510a-yQV1jLtt3KpsGknNjaaKV9XpnFQ\"",
		"mtime": "2026-06-20T06:49:50.396Z",
		"size": 20746,
		"path": "../public/assets/es2015-CbEVclpZ.js"
	},
	"/assets/dashboard-CartNpcO.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"5ee4b-3sDgfeNo3Z4m8v1K4m1QDoFwfyg\"",
		"mtime": "2026-06-20T06:49:50.314Z",
		"size": 388683,
		"path": "../public/assets/dashboard-CartNpcO.js"
	},
	"/assets/index.esm-Ep0wBb-b.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"66c2-b7PywJWF/L0+xuJVONUbHbpSUfg\"",
		"mtime": "2026-06-20T06:49:50.402Z",
		"size": 26306,
		"path": "../public/assets/index.esm-Ep0wBb-b.js"
	},
	"/assets/esm-BHQ8Xo19.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"5a102-LpwlWJQhjs3/ghS+hpIa7+s78MQ\"",
		"mtime": "2026-06-20T06:49:50.401Z",
		"size": 368898,
		"path": "../public/assets/esm-BHQ8Xo19.js"
	},
	"/assets/index-BcoMPiVE.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"86981-NrAFx/YwYcOFmxBQPv2bT5GPmas\"",
		"mtime": "2026-06-20T06:49:50.288Z",
		"size": 551297,
		"path": "../public/assets/index-BcoMPiVE.js"
	},
	"/assets/inter-cyrillic-400-normal-HOLc17fK.woff": {
		"type": "font/woff",
		"etag": "\"2634-ivoNz55T3CYjsRGYVvI78V6Hg84\"",
		"mtime": "2026-06-20T06:49:50.691Z",
		"size": 9780,
		"path": "../public/assets/inter-cyrillic-400-normal-HOLc17fK.woff"
	},
	"/assets/input-6tAmoX2J.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"28e-xK+WxJKPqXdBMmvFxnxqyKESEs8\"",
		"mtime": "2026-06-20T06:49:50.405Z",
		"size": 654,
		"path": "../public/assets/input-6tAmoX2J.js"
	},
	"/assets/inter-cyrillic-400-normal-obahsSVq.woff2": {
		"type": "font/woff2",
		"etag": "\"1e20-2UATdNvSyhAwBTFW7JWXRnJeZyk\"",
		"mtime": "2026-06-20T06:49:50.714Z",
		"size": 7712,
		"path": "../public/assets/inter-cyrillic-400-normal-obahsSVq.woff2"
	},
	"/assets/inter-cyrillic-500-normal-BasfLYem.woff2": {
		"type": "font/woff2",
		"etag": "\"1edc-4p+L4DlZmQVqry+RH9lMmJQ+P0U\"",
		"mtime": "2026-06-20T06:49:50.723Z",
		"size": 7900,
		"path": "../public/assets/inter-cyrillic-500-normal-BasfLYem.woff2"
	},
	"/assets/inter-cyrillic-500-normal-CxZf_p3X.woff": {
		"type": "font/woff",
		"etag": "\"26d4-lAKYDJFVYDMKcLY/oR+ZyfOsllA\"",
		"mtime": "2026-06-20T06:49:50.723Z",
		"size": 9940,
		"path": "../public/assets/inter-cyrillic-500-normal-CxZf_p3X.woff"
	},
	"/assets/inter-cyrillic-600-normal-CWCymEST.woff2": {
		"type": "font/woff2",
		"etag": "\"1f24-tca4CMW+seK3RqmUMU0o0VZmyqg\"",
		"mtime": "2026-06-20T06:49:50.742Z",
		"size": 7972,
		"path": "../public/assets/inter-cyrillic-600-normal-CWCymEST.woff2"
	},
	"/assets/inter-cyrillic-600-normal-4D_pXhcN.woff": {
		"type": "font/woff",
		"etag": "\"26d0-I2CCKTFIJy7UNImTmVTFMc8WGWM\"",
		"mtime": "2026-06-20T06:49:50.724Z",
		"size": 9936,
		"path": "../public/assets/inter-cyrillic-600-normal-4D_pXhcN.woff"
	},
	"/assets/inter-cyrillic-700-normal-CjBOestx.woff2": {
		"type": "font/woff2",
		"etag": "\"1ee0-D8f9uATzhIzndMrJ0Y11iQjPdds\"",
		"mtime": "2026-06-20T06:49:50.743Z",
		"size": 7904,
		"path": "../public/assets/inter-cyrillic-700-normal-CjBOestx.woff2"
	},
	"/assets/inter-cyrillic-700-normal-DrXBdSj3.woff": {
		"type": "font/woff",
		"etag": "\"26b8-AaxySEnVJ+M+6514gHrK4csJma0\"",
		"mtime": "2026-06-20T06:49:50.744Z",
		"size": 9912,
		"path": "../public/assets/inter-cyrillic-700-normal-DrXBdSj3.woff"
	},
	"/assets/inter-cyrillic-ext-400-normal-BQZuk6qB.woff2": {
		"type": "font/woff2",
		"etag": "\"27f8-vx2gCiZcZIS7BSyHWqEe1Lm5p8Y\"",
		"mtime": "2026-06-20T06:49:50.746Z",
		"size": 10232,
		"path": "../public/assets/inter-cyrillic-ext-400-normal-BQZuk6qB.woff2"
	},
	"/assets/inter-cyrillic-ext-600-normal-Bcila6Z-.woff": {
		"type": "font/woff",
		"etag": "\"3498-zNJjP5Amk16bEdqbbZNObDtX308\"",
		"mtime": "2026-06-20T06:49:50.753Z",
		"size": 13464,
		"path": "../public/assets/inter-cyrillic-ext-600-normal-Bcila6Z-.woff"
	},
	"/assets/inter-cyrillic-ext-400-normal-DQukG94-.woff": {
		"type": "font/woff",
		"etag": "\"3418-0efK3fiFhInlHHjq0SFm+GVey2Y\"",
		"mtime": "2026-06-20T06:49:50.747Z",
		"size": 13336,
		"path": "../public/assets/inter-cyrillic-ext-400-normal-DQukG94-.woff"
	},
	"/assets/inter-cyrillic-ext-500-normal-BmqWE9Dz.woff": {
		"type": "font/woff",
		"etag": "\"348c-1TbeWRwD3bVotPqIc3c/7sVxfo0\"",
		"mtime": "2026-06-20T06:49:50.752Z",
		"size": 13452,
		"path": "../public/assets/inter-cyrillic-ext-500-normal-BmqWE9Dz.woff"
	},
	"/assets/inter-cyrillic-ext-600-normal-Dfes3d0z.woff2": {
		"type": "font/woff2",
		"etag": "\"28f4-KdWYNIoSwUf7MLulzakpM8nepFc\"",
		"mtime": "2026-06-20T06:49:50.768Z",
		"size": 10484,
		"path": "../public/assets/inter-cyrillic-ext-600-normal-Dfes3d0z.woff2"
	},
	"/assets/inter-cyrillic-ext-500-normal-B0yAr1jD.woff2": {
		"type": "font/woff2",
		"etag": "\"28c0-a4jJ9g181ZteaPVR7IOs0hVwtQg\"",
		"mtime": "2026-06-20T06:49:50.748Z",
		"size": 10432,
		"path": "../public/assets/inter-cyrillic-ext-500-normal-B0yAr1jD.woff2"
	},
	"/assets/inter-greek-400-normal-B4URO6DV.woff2": {
		"type": "font/woff2",
		"etag": "\"1e60-ha06h5lB7nxuWvNKf61Dcnc1d1I\"",
		"mtime": "2026-06-20T06:49:50.792Z",
		"size": 7776,
		"path": "../public/assets/inter-greek-400-normal-B4URO6DV.woff2"
	},
	"/assets/inter-cyrillic-ext-700-normal-LO58E6JB.woff": {
		"type": "font/woff",
		"etag": "\"3460-O0B5vyXV2ljXcmbQhvmTQJXWVuc\"",
		"mtime": "2026-06-20T06:49:50.790Z",
		"size": 13408,
		"path": "../public/assets/inter-cyrillic-ext-700-normal-LO58E6JB.woff"
	},
	"/assets/inter-cyrillic-ext-700-normal-BjwYoWNd.woff2": {
		"type": "font/woff2",
		"etag": "\"2900-0N8FIokKpqZhWi+D5DLndc4iUGY\"",
		"mtime": "2026-06-20T06:49:50.782Z",
		"size": 10496,
		"path": "../public/assets/inter-cyrillic-ext-700-normal-BjwYoWNd.woff2"
	},
	"/assets/inter-greek-400-normal-q2sYcFCs.woff": {
		"type": "font/woff",
		"etag": "\"26c4-bdX1N3nNMZxQdZJFiVUIvfgvPUk\"",
		"mtime": "2026-06-20T06:49:50.794Z",
		"size": 9924,
		"path": "../public/assets/inter-greek-400-normal-q2sYcFCs.woff"
	},
	"/assets/inter-greek-500-normal-BIZE56-Y.woff2": {
		"type": "font/woff2",
		"etag": "\"1ef0-rzB1Hth7JnUPaEXqA8yr0SpwMxk\"",
		"mtime": "2026-06-20T06:49:50.795Z",
		"size": 7920,
		"path": "../public/assets/inter-greek-500-normal-BIZE56-Y.woff2"
	},
	"/assets/inter-greek-600-normal-BZpKdvQh.woff": {
		"type": "font/woff",
		"etag": "\"2730-u0VEy1HjIfUMvAeVgiAlRXW3Gg0\"",
		"mtime": "2026-06-20T06:49:50.802Z",
		"size": 10032,
		"path": "../public/assets/inter-greek-600-normal-BZpKdvQh.woff"
	},
	"/assets/inter-greek-500-normal-Xzm54t5V.woff": {
		"type": "font/woff",
		"etag": "\"26fc-aBzOXUzctfu1t0AWou6edVMARPA\"",
		"mtime": "2026-06-20T06:49:50.796Z",
		"size": 9980,
		"path": "../public/assets/inter-greek-500-normal-Xzm54t5V.woff"
	},
	"/assets/inter-greek-600-normal-plRanbMR.woff2": {
		"type": "font/woff2",
		"etag": "\"1f08-dL8q9T10oywr5Ie+w0fBRkD/K6s\"",
		"mtime": "2026-06-20T06:49:50.810Z",
		"size": 7944,
		"path": "../public/assets/inter-greek-600-normal-plRanbMR.woff2"
	},
	"/assets/inter-greek-700-normal-BUv2fZ6O.woff": {
		"type": "font/woff",
		"etag": "\"26fc-6VHcgzrZm5Dq3Ofg/SG0LimdBHI\"",
		"mtime": "2026-06-20T06:49:50.811Z",
		"size": 9980,
		"path": "../public/assets/inter-greek-700-normal-BUv2fZ6O.woff"
	},
	"/assets/inter-greek-700-normal-C3JjAnD8.woff2": {
		"type": "font/woff2",
		"etag": "\"1ef0-LHrivJw+k04PRvScx047LwlyCQM\"",
		"mtime": "2026-06-20T06:49:50.812Z",
		"size": 7920,
		"path": "../public/assets/inter-greek-700-normal-C3JjAnD8.woff2"
	},
	"/assets/inter-greek-ext-400-normal-DGGRlc-M.woff2": {
		"type": "font/woff2",
		"etag": "\"1490-FueWPOzdNQpScjKjfRcVv5Yv1HM\"",
		"mtime": "2026-06-20T06:49:50.812Z",
		"size": 5264,
		"path": "../public/assets/inter-greek-ext-400-normal-DGGRlc-M.woff2"
	},
	"/assets/inter-greek-ext-400-normal-KugGGMne.woff": {
		"type": "font/woff",
		"etag": "\"1b98-M0BooO/fFnrQlgRJzUMnDMWQ/Qo\"",
		"mtime": "2026-06-20T06:49:50.813Z",
		"size": 7064,
		"path": "../public/assets/inter-greek-ext-400-normal-KugGGMne.woff"
	},
	"/assets/inter-greek-ext-500-normal-2j5mBUwD.woff": {
		"type": "font/woff",
		"etag": "\"1c18-qcQk7wkL8ZD2jgfjekhd8K3qWn0\"",
		"mtime": "2026-06-20T06:49:50.814Z",
		"size": 7192,
		"path": "../public/assets/inter-greek-ext-500-normal-2j5mBUwD.woff"
	},
	"/assets/inter-greek-ext-500-normal-C4iEst2y.woff2": {
		"type": "font/woff2",
		"etag": "\"1534-eUg1Jo5WjHY2xgQTOkilC7LKn3I\"",
		"mtime": "2026-06-20T06:49:50.816Z",
		"size": 5428,
		"path": "../public/assets/inter-greek-ext-500-normal-C4iEst2y.woff2"
	},
	"/assets/inter-greek-ext-600-normal-DRtmH8MT.woff2": {
		"type": "font/woff2",
		"etag": "\"1538-GoE9+rMXdldLs0MUbnyI6GfidCU\"",
		"mtime": "2026-06-20T06:49:50.817Z",
		"size": 5432,
		"path": "../public/assets/inter-greek-ext-600-normal-DRtmH8MT.woff2"
	},
	"/assets/inter-greek-ext-600-normal-B8X0CLgF.woff": {
		"type": "font/woff",
		"etag": "\"1c2c-ceWCifetUVyF5uPKYdA318gl/j8\"",
		"mtime": "2026-06-20T06:49:50.816Z",
		"size": 7212,
		"path": "../public/assets/inter-greek-ext-600-normal-B8X0CLgF.woff"
	},
	"/assets/inter-greek-ext-700-normal-BoQ6DsYi.woff": {
		"type": "font/woff",
		"etag": "\"1c30-9rBd06jWL1DufBIVe/ZeKo67yXU\"",
		"mtime": "2026-06-20T06:49:50.818Z",
		"size": 7216,
		"path": "../public/assets/inter-greek-ext-700-normal-BoQ6DsYi.woff"
	},
	"/assets/inter-greek-ext-700-normal-qfdV9bQt.woff2": {
		"type": "font/woff2",
		"etag": "\"1544-Po0VSwP0X4mCd4Bi+vzYGFAlRtE\"",
		"mtime": "2026-06-20T06:49:50.819Z",
		"size": 5444,
		"path": "../public/assets/inter-greek-ext-700-normal-qfdV9bQt.woff2"
	},
	"/assets/inter-latin-400-normal-C38fXH4l.woff2": {
		"type": "font/woff2",
		"etag": "\"5c70-aPZFxrb/EuJcVLE9TtEZ5jHcuyY\"",
		"mtime": "2026-06-20T06:49:50.820Z",
		"size": 23664,
		"path": "../public/assets/inter-latin-400-normal-C38fXH4l.woff2"
	},
	"/assets/inter-latin-400-normal-CyCys3Eg.woff": {
		"type": "font/woff",
		"etag": "\"77e8-SbvLwKxssThdk7eEO6Aafq1EDIA\"",
		"mtime": "2026-06-20T06:49:50.820Z",
		"size": 30696,
		"path": "../public/assets/inter-latin-400-normal-CyCys3Eg.woff"
	},
	"/assets/inter-latin-500-normal-BL9OpVg8.woff": {
		"type": "font/woff",
		"etag": "\"7a34-RiJoWDij89wbmUrQ9vApTdR9iMs\"",
		"mtime": "2026-06-20T06:49:50.821Z",
		"size": 31284,
		"path": "../public/assets/inter-latin-500-normal-BL9OpVg8.woff"
	},
	"/assets/inter-latin-500-normal-Cerq10X2.woff2": {
		"type": "font/woff2",
		"etag": "\"5ed0-a2bHQb+Lw84kivBLIFGmSKODkdY\"",
		"mtime": "2026-06-20T06:49:50.821Z",
		"size": 24272,
		"path": "../public/assets/inter-latin-500-normal-Cerq10X2.woff2"
	},
	"/assets/inter-latin-600-normal-CiBQ2DWP.woff": {
		"type": "font/woff",
		"etag": "\"7a1c-7yTNkhBBRpiqSdmpUeo8hP6GAv8\"",
		"mtime": "2026-06-20T06:49:50.822Z",
		"size": 31260,
		"path": "../public/assets/inter-latin-600-normal-CiBQ2DWP.woff"
	},
	"/assets/inter-latin-600-normal-LgqL8muc.woff2": {
		"type": "font/woff2",
		"etag": "\"5f84-4NYfbcUR1koHKy9NyU4VXs8btvY\"",
		"mtime": "2026-06-20T06:49:50.823Z",
		"size": 24452,
		"path": "../public/assets/inter-latin-600-normal-LgqL8muc.woff2"
	},
	"/assets/inter-latin-700-normal-BLAVimhd.woff": {
		"type": "font/woff",
		"etag": "\"7a58-cQvU1F9kXU/ZpvVIy7T98mV4J+E\"",
		"mtime": "2026-06-20T06:49:50.825Z",
		"size": 31320,
		"path": "../public/assets/inter-latin-700-normal-BLAVimhd.woff"
	},
	"/assets/inter-latin-700-normal-Yt3aPRUw.woff2": {
		"type": "font/woff2",
		"etag": "\"5f24-UZenrrIkVBEKofPvPtTJjKfvG6E\"",
		"mtime": "2026-06-20T06:49:50.825Z",
		"size": 24356,
		"path": "../public/assets/inter-latin-700-normal-Yt3aPRUw.woff2"
	},
	"/assets/inter-latin-ext-400-normal-77YHD8bZ.woff": {
		"type": "font/woff",
		"etag": "\"b9c8-Bhja6T6VCwLwb1wadgBSy3MfJBM\"",
		"mtime": "2026-06-20T06:49:50.827Z",
		"size": 47560,
		"path": "../public/assets/inter-latin-ext-400-normal-77YHD8bZ.woff"
	},
	"/assets/inter-latin-ext-400-normal-C1nco2VV.woff2": {
		"type": "font/woff2",
		"etag": "\"88b8-G/H4NxekwCldh2+r75P8W7SzF98\"",
		"mtime": "2026-06-20T06:49:50.837Z",
		"size": 35e3,
		"path": "../public/assets/inter-latin-ext-400-normal-C1nco2VV.woff2"
	},
	"/assets/inter-latin-ext-500-normal-BxGbmqWO.woff": {
		"type": "font/woff",
		"etag": "\"bd6c-QCyyMz9w4NbwgJiEMxZozI/r+Ds\"",
		"mtime": "2026-06-20T06:49:50.849Z",
		"size": 48492,
		"path": "../public/assets/inter-latin-ext-500-normal-BxGbmqWO.woff"
	},
	"/assets/inter-latin-ext-500-normal-CV4jyFjo.woff2": {
		"type": "font/woff2",
		"etag": "\"8cb8-ncqRX/i2leXjDT1PI3s6qVpmf6g\"",
		"mtime": "2026-06-20T06:49:50.851Z",
		"size": 36024,
		"path": "../public/assets/inter-latin-ext-500-normal-CV4jyFjo.woff2"
	},
	"/assets/inter-latin-ext-600-normal-CIVaiw4L.woff": {
		"type": "font/woff",
		"etag": "\"be1c-8cD1HFH6FU9hlLytWwPGGUY70n4\"",
		"mtime": "2026-06-20T06:49:50.851Z",
		"size": 48668,
		"path": "../public/assets/inter-latin-ext-600-normal-CIVaiw4L.woff"
	},
	"/assets/inter-latin-ext-600-normal-D2bJ5OIk.woff2": {
		"type": "font/woff2",
		"etag": "\"8da4-7QGAEIYrxx26VfuVX2p4gRkHOKo\"",
		"mtime": "2026-06-20T06:49:50.852Z",
		"size": 36260,
		"path": "../public/assets/inter-latin-ext-600-normal-D2bJ5OIk.woff2"
	},
	"/assets/inter-latin-ext-700-normal-Ca8adRJv.woff2": {
		"type": "font/woff2",
		"etag": "\"8d94-yNVVBni5SnCMi1iBd7oIoQ4VttA\"",
		"mtime": "2026-06-20T06:49:50.852Z",
		"size": 36244,
		"path": "../public/assets/inter-latin-ext-700-normal-Ca8adRJv.woff2"
	},
	"/assets/inter-latin-ext-700-normal-TidjK2hL.woff": {
		"type": "font/woff",
		"etag": "\"bdf8-cQlr/tU/y6KwF0S0VxtHZkfIWHg\"",
		"mtime": "2026-06-20T06:49:50.864Z",
		"size": 48632,
		"path": "../public/assets/inter-latin-ext-700-normal-TidjK2hL.woff"
	},
	"/assets/inter-vietnamese-400-normal-Bbgyi5SW.woff": {
		"type": "font/woff",
		"etag": "\"1964-Uz2qf+4P37GRYrj2tnfiNdz3cwc\"",
		"mtime": "2026-06-20T06:49:50.876Z",
		"size": 6500,
		"path": "../public/assets/inter-vietnamese-400-normal-Bbgyi5SW.woff"
	},
	"/assets/inter-vietnamese-400-normal-DMkecbls.woff2": {
		"type": "font/woff2",
		"etag": "\"136c-x5LSIOvtcMpNpAaXtHsgRr9Y068\"",
		"mtime": "2026-06-20T06:49:50.900Z",
		"size": 4972,
		"path": "../public/assets/inter-vietnamese-400-normal-DMkecbls.woff2"
	},
	"/assets/inter-vietnamese-500-normal-DOriooB6.woff2": {
		"type": "font/woff2",
		"etag": "\"13f8-CUM23jWJKM6nB7lsyh1fHy5MoZ4\"",
		"mtime": "2026-06-20T06:49:50.902Z",
		"size": 5112,
		"path": "../public/assets/inter-vietnamese-500-normal-DOriooB6.woff2"
	},
	"/assets/inter-vietnamese-500-normal-mJboJaSs.woff": {
		"type": "font/woff",
		"etag": "\"19c4-GIi0pWixVrurGnEPzcWNPRmQHPA\"",
		"mtime": "2026-06-20T06:49:50.905Z",
		"size": 6596,
		"path": "../public/assets/inter-vietnamese-500-normal-mJboJaSs.woff"
	},
	"/assets/inter-vietnamese-600-normal-BuLX-rYi.woff": {
		"type": "font/woff",
		"etag": "\"19f0-dZ/EhN2gqjVMAOO8T5PiEnOw62w\"",
		"mtime": "2026-06-20T06:49:50.907Z",
		"size": 6640,
		"path": "../public/assets/inter-vietnamese-600-normal-BuLX-rYi.woff"
	},
	"/assets/inter-vietnamese-700-normal-BZaoP0fm.woff": {
		"type": "font/woff",
		"etag": "\"19e8-bdSpfj6ZS6+Lvz7ijFjLexeYSQ4\"",
		"mtime": "2026-06-20T06:49:50.911Z",
		"size": 6632,
		"path": "../public/assets/inter-vietnamese-700-normal-BZaoP0fm.woff"
	},
	"/assets/inter-vietnamese-600-normal-Cc8MFFhd.woff2": {
		"type": "font/woff2",
		"etag": "\"13ec-+Z5aj32FhioUUaW+56MD6v89VjU\"",
		"mtime": "2026-06-20T06:49:50.910Z",
		"size": 5100,
		"path": "../public/assets/inter-vietnamese-600-normal-Cc8MFFhd.woff2"
	},
	"/assets/jsx-runtime-ByebIJFG.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"1ed0-OhmgG/ETNKFL8nPIK5LQJOgh/Ig\"",
		"mtime": "2026-06-20T06:49:50.406Z",
		"size": 7888,
		"path": "../public/assets/jsx-runtime-ByebIJFG.js"
	},
	"/assets/inter-vietnamese-700-normal-DlLaEgI2.woff2": {
		"type": "font/woff2",
		"etag": "\"13f0-2+yadyA0heA/Lel/M8LdWlzEV1U\"",
		"mtime": "2026-06-20T06:49:50.912Z",
		"size": 5104,
		"path": "../public/assets/inter-vietnamese-700-normal-DlLaEgI2.woff2"
	},
	"/assets/label-DGB_Lrxf.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"292-F0J1iWOySznvnRNb+6F7K9fPiSg\"",
		"mtime": "2026-06-20T06:49:50.407Z",
		"size": 658,
		"path": "../public/assets/label-DGB_Lrxf.js"
	},
	"/assets/link-Da74fR5z.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"58ec-6hFt9kKNlYTzEOTBKMFYgNRWbyE\"",
		"mtime": "2026-06-20T06:49:50.421Z",
		"size": 22764,
		"path": "../public/assets/link-Da74fR5z.js"
	},
	"/assets/leads-Dsc1ivSE.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"fd3-e/dUqJ3PbdlM4hEphF5XHkTkWO0\"",
		"mtime": "2026-06-20T06:49:50.410Z",
		"size": 4051,
		"path": "../public/assets/leads-Dsc1ivSE.js"
	},
	"/assets/loader-circle-DDTrDy96.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"90-hacxIZsKSCL4JjVBwDOIe8nbQTk\"",
		"mtime": "2026-06-20T06:49:50.423Z",
		"size": 144,
		"path": "../public/assets/loader-circle-DDTrDy96.js"
	},
	"/assets/log-out-Dy1cfiVK.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"e6-TO1vK3VBu8mNdIxO+zNpTPKTDn4\"",
		"mtime": "2026-06-20T06:49:50.426Z",
		"size": 230,
		"path": "../public/assets/log-out-Dy1cfiVK.js"
	},
	"/assets/members-dQ-EW5CK.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"1640-B0RXBWTiAoW3KhFM4DgkxDSzcPE\"",
		"mtime": "2026-06-20T06:49:50.431Z",
		"size": 5696,
		"path": "../public/assets/members-dQ-EW5CK.js"
	},
	"/assets/members._id-omqqH-zc.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"803c-VxeeR8TPDhkvwjri2sd1aXy/fPs\"",
		"mtime": "2026-06-20T06:49:50.432Z",
		"size": 32828,
		"path": "../public/assets/members._id-omqqH-zc.js"
	},
	"/assets/memberships-t7LIQwVt.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"ef7-9wbgronBwPV0Aok2u09LIs8tYgU\"",
		"mtime": "2026-06-20T06:49:50.433Z",
		"size": 3831,
		"path": "../public/assets/memberships-t7LIQwVt.js"
	},
	"/assets/onboarding-CGkIvl4e.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"8bf-KBvtUY8y1LVAqRuNb1E0U29kWHI\"",
		"mtime": "2026-06-20T06:49:50.435Z",
		"size": 2239,
		"path": "../public/assets/onboarding-CGkIvl4e.js"
	},
	"/assets/page-header-C1pX7wEA.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"42b-TyCyfQDPjfX9aRAz5KVRNXWqjUE\"",
		"mtime": "2026-06-20T06:49:50.442Z",
		"size": 1067,
		"path": "../public/assets/page-header-C1pX7wEA.js"
	},
	"/assets/payments-BT3BM0gC.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"8c2-escka2+efbhx3C6kAAiV4zjFhkw\"",
		"mtime": "2026-06-20T06:49:50.443Z",
		"size": 2242,
		"path": "../public/assets/payments-BT3BM0gC.js"
	},
	"/assets/proxy-B-l4Xkzf.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"1d93e-m97xT73kuih23kA/Hywq0/+L3p0\"",
		"mtime": "2026-06-20T06:49:50.461Z",
		"size": 121150,
		"path": "../public/assets/proxy-B-l4Xkzf.js"
	},
	"/assets/qr-code-DTpw0kJg.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"28a-0Puh0pPgyB2i5w9JX6maaMQKcOw\"",
		"mtime": "2026-06-20T06:49:50.466Z",
		"size": 650,
		"path": "../public/assets/qr-code-DTpw0kJg.js"
	},
	"/assets/reports-De6xpk6a.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"164b-vGPMzBFih1BfkS8BORj0XTOj9Eg\"",
		"mtime": "2026-06-20T06:49:50.494Z",
		"size": 5707,
		"path": "../public/assets/reports-De6xpk6a.js"
	},
	"/assets/react-dom-CyZ0L4Dn.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"dfb-qkPX4j+r54IMWxJ7+51yXoyIaq8\"",
		"mtime": "2026-06-20T06:49:50.470Z",
		"size": 3579,
		"path": "../public/assets/react-dom-CyZ0L4Dn.js"
	},
	"/assets/reset-password-B985hrt4.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"52d-xyvQE+vUDqlaIARi5yRd+Nq3HH8\"",
		"mtime": "2026-06-20T06:49:50.509Z",
		"size": 1325,
		"path": "../public/assets/reset-password-B985hrt4.js"
	},
	"/assets/route-DO1OHPrc.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"6eb2-X7oZPo84/Er3Mo2FEyW2eeEP8Rs\"",
		"mtime": "2026-06-20T06:49:50.514Z",
		"size": 28338,
		"path": "../public/assets/route-DO1OHPrc.js"
	},
	"/assets/routes-BQlgJIod.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"1c4a-68cROepgMH6DLX3hFKOmZVdlzos\"",
		"mtime": "2026-06-20T06:49:50.561Z",
		"size": 7242,
		"path": "../public/assets/routes-BQlgJIod.js"
	},
	"/assets/search-Dk4sSkou.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"ae-3AEW6QIP12JYqTMw3eC6qaDwlKc\"",
		"mtime": "2026-06-20T06:49:50.589Z",
		"size": 174,
		"path": "../public/assets/search-Dk4sSkou.js"
	},
	"/assets/select-C3l0RJsO.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"5710-htaSYqFwz+NpfkAJzaTTocM5VK0\"",
		"mtime": "2026-06-20T06:49:50.594Z",
		"size": 22288,
		"path": "../public/assets/select-C3l0RJsO.js"
	},
	"/assets/settings-Mh77quuo.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"111d-tDr/3Do5AteMfDqolarUacMRctI\"",
		"mtime": "2026-06-20T06:49:50.612Z",
		"size": 4381,
		"path": "../public/assets/settings-Mh77quuo.js"
	},
	"/assets/trash-2-CHCPaEuT.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"148-3ISTujaibSXXrqXZSgC+VB5l100\"",
		"mtime": "2026-06-20T06:49:50.627Z",
		"size": 328,
		"path": "../public/assets/trash-2-CHCPaEuT.js"
	},
	"/assets/trainers-CI7J4JeO.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"10d5-XGXpp/n7AlA+vJQHTclIoSuNet8\"",
		"mtime": "2026-06-20T06:49:50.626Z",
		"size": 4309,
		"path": "../public/assets/trainers-CI7J4JeO.js"
	},
	"/assets/tabs-DaDzriIm.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"d8b-htbSKkk1IhGgJZ6jSOxAYtoH6LU\"",
		"mtime": "2026-06-20T06:49:50.624Z",
		"size": 3467,
		"path": "../public/assets/tabs-DaDzriIm.js"
	},
	"/assets/use-tenant-BY3grMHZ.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"25e5-22nAXI0t8EGwugH7GAVazQSUmNE\"",
		"mtime": "2026-06-20T06:49:50.643Z",
		"size": 9701,
		"path": "../public/assets/use-tenant-BY3grMHZ.js"
	},
	"/assets/useMatch-C3l2pjpL.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"4ec-8FHX9qjJZt4mBbZhI60cnC4k0fw\"",
		"mtime": "2026-06-20T06:49:50.644Z",
		"size": 1260,
		"path": "../public/assets/useMatch-C3l2pjpL.js"
	},
	"/assets/styles-CVkV9RsG.css": {
		"type": "text/css; charset=utf-8",
		"etag": "\"1669f-LI7EgfQQc5RX5GNPhlxKRrtOyqg\"",
		"mtime": "2026-06-20T06:49:50.913Z",
		"size": 91807,
		"path": "../public/assets/styles-CVkV9RsG.css"
	},
	"/assets/useMutation-Bh0iPIGD.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"8eb-mjqMVjlYTGrrS2PmZd7LyP6UuIY\"",
		"mtime": "2026-06-20T06:49:50.645Z",
		"size": 2283,
		"path": "../public/assets/useMutation-Bh0iPIGD.js"
	},
	"/assets/types-AwvkMjxf.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"f243-XcYsakALHTqvRi9nZZ+uRKHhxwI\"",
		"mtime": "2026-06-20T06:49:50.642Z",
		"size": 62019,
		"path": "../public/assets/types-AwvkMjxf.js"
	},
	"/assets/user-cog-CCgEV3DB.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"4c1-qroM3ihTUT8eaSivCeb0dFoRVrk\"",
		"mtime": "2026-06-20T06:49:50.676Z",
		"size": 1217,
		"path": "../public/assets/user-cog-CCgEV3DB.js"
	},
	"/assets/useRouter-B_ME57iY.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"2d3-CpF51ZfK5rYy2lnLs4rsHEIkhWw\"",
		"mtime": "2026-06-20T06:49:50.649Z",
		"size": 723,
		"path": "../public/assets/useRouter-B_ME57iY.js"
	},
	"/assets/users-Bnhd-d49.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"132-gORxqbGjEP2Jom4oKs89oTThqdY\"",
		"mtime": "2026-06-20T06:49:50.678Z",
		"size": 306,
		"path": "../public/assets/users-Bnhd-d49.js"
	},
	"/assets/utils-B43YKWhC.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"6cb4-+7x8fUiRJL97wIbnsYjzQOsYTGw\"",
		"mtime": "2026-06-20T06:49:50.679Z",
		"size": 27828,
		"path": "../public/assets/utils-B43YKWhC.js"
	},
	"/assets/workouts-C2WXhtxg.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"ff1-yGputRd93Aqfj+4bXAWhaoc+jR4\"",
		"mtime": "2026-06-20T06:49:50.680Z",
		"size": 4081,
		"path": "../public/assets/workouts-C2WXhtxg.js"
	}
};
//#endregion
//#region #nitro/virtual/public-assets
var publicAssetBases = {};
function isPublicAssetURL(id = "") {
	if (public_assets_data_default[id]) return true;
	for (const base in publicAssetBases) if (id.startsWith(base)) return true;
	return false;
}
//#endregion
//#region node_modules/nitro/dist/runtime/internal/route-rules.mjs
var headers = ((m) => function headersRouteRule(event) {
	for (const [key, value] of Object.entries(m.options || {})) event.res.headers.set(key, value);
});
//#endregion
//#region #nitro/virtual/routing
var findRouteRules = /* @__PURE__ */ (() => {
	const $0 = [{
		name: "headers",
		route: "/assets/**",
		handler: headers,
		options: { "cache-control": "public, max-age=31536000, immutable" }
	}];
	return (m, p) => {
		let r = [];
		if (p.charCodeAt(p.length - 1) === 47) p = p.slice(0, -1) || "/";
		let s = p.split("/");
		if (s.length > 1) {
			if (s[1] === "assets") r.unshift({
				data: $0,
				params: { "_": s.slice(2).join("/") }
			});
		}
		return r;
	};
})();
var _lazy_Q0oQHA = defineLazyEventHandler(() => import("./_chunks/ssr-renderer.mjs"));
var findRoute = /* @__PURE__ */ (() => {
	const data = {
		route: "/**",
		handler: _lazy_Q0oQHA
	};
	return ((_m, p) => {
		return {
			data,
			params: { "_": p.slice(1) }
		};
	});
})();
[].filter(Boolean);
//#endregion
//#region node_modules/nitro/dist/runtime/internal/error/prod.mjs
var errorHandler = (error, event) => {
	const res = defaultHandler(error, event);
	return new FastResponse(typeof res.body === "string" ? res.body : JSON.stringify(res.body, null, 2), res);
};
function defaultHandler(error, event) {
	const unhandled = error.unhandled ?? !HTTPError.isError(error);
	const { status = 500, statusText = "" } = unhandled ? {} : error;
	if (status === 404) {
		const url = event.url || new URL(event.req.url);
		const baseURL = "/";
		if (/^\/[^/]/.test(baseURL) && !url.pathname.startsWith(baseURL)) return {
			status: 302,
			headers: new Headers({ location: `${baseURL}${url.pathname.slice(1)}${url.search}` })
		};
	}
	const headers = new Headers(unhandled ? {} : error.headers);
	headers.set("content-type", "application/json; charset=utf-8");
	return {
		status,
		statusText,
		headers,
		body: {
			error: true,
			...unhandled ? {
				status,
				unhandled: true
			} : typeof error.toJSON === "function" ? error.toJSON() : {
				status,
				statusText,
				message: error.message
			}
		}
	};
}
//#endregion
//#region #nitro/virtual/error-handler
var errorHandlers = [errorHandler];
async function error_handler_default(error, event) {
	for (const handler of errorHandlers) try {
		const response = await handler(error, event, { defaultHandler });
		if (response) return response;
	} catch (error) {
		console.error(error);
	}
}
//#endregion
//#region #nitro/virtual/app
function createNitroApp() {
	const captureError = (error, errorCtx) => {
		if (errorCtx?.event) {
			const errors = errorCtx.event.req.context?.nitro?.errors;
			if (errors) errors.push({
				error,
				context: errorCtx
			});
		}
	};
	const h3App = createH3App({ onError(error, event) {
		return error_handler_default(error, event);
	} });
	let appHandler = (req) => {
		req.context ||= {};
		req.context.nitro = req.context.nitro || { errors: [] };
		return h3App.fetch(req);
	};
	return {
		fetch: appHandler,
		h3: h3App,
		hooks: void 0,
		captureError
	};
}
function createH3App(config) {
	const h3App = new H3Core(config);
	h3App["~findRoute"] = (event) => findRoute(event.req.method, event.url.pathname);
	h3App["~getMiddleware"] = (event, route) => {
		const pathname = event.url.pathname;
		const method = event.req.method;
		const middleware = [];
		const routeRules = getRouteRules(method, pathname);
		event.context.routeRules = routeRules?.routeRules;
		if (routeRules?.routeRuleMiddleware.length) middleware.push(...routeRules.routeRuleMiddleware);
		if (route?.data?.middleware?.length) middleware.push(...route.data.middleware);
		return middleware;
	};
	return h3App;
}
//#endregion
//#region node_modules/nitro/dist/runtime/internal/app.mjs
var APP_ID = "default";
function useNitroApp() {
	let instance = useNitroApp._instance;
	if (instance) return instance;
	instance = useNitroApp._instance = createNitroApp();
	globalThis.__nitro__ = globalThis.__nitro__ || {};
	globalThis.__nitro__[APP_ID] = instance;
	return instance;
}
function useNitroHooks() {
	const nitroApp = useNitroApp();
	const hooks = nitroApp.hooks;
	if (hooks) return hooks;
	return nitroApp.hooks = new HookableCore();
}
function getRouteRules(method, pathname) {
	const m = findRouteRules(method, pathname);
	if (!m?.length) return { routeRuleMiddleware: [] };
	const routeRules = {};
	for (const layer of m) for (const rule of layer.data) {
		const currentRule = routeRules[rule.name];
		if (currentRule) {
			if (rule.options === false) {
				delete routeRules[rule.name];
				continue;
			}
			if (typeof currentRule.options === "object" && typeof rule.options === "object") currentRule.options = {
				...currentRule.options,
				...rule.options
			};
			else currentRule.options = rule.options;
			currentRule.route = rule.route;
			currentRule.params = {
				...currentRule.params,
				...layer.params
			};
		} else if (rule.options !== false) routeRules[rule.name] = {
			...rule,
			params: layer.params
		};
	}
	const middleware = [];
	const orderedRules = Object.values(routeRules).sort((a, b) => (a.handler?.order || 0) - (b.handler?.order || 0));
	for (const rule of orderedRules) {
		if (rule.options === false || !rule.handler) continue;
		middleware.push(rule.handler(rule));
	}
	return {
		routeRules,
		routeRuleMiddleware: middleware
	};
}
//#endregion
//#region node_modules/nitro/dist/presets/cloudflare/runtime/_module-handler.mjs
function createHandler(hooks) {
	const nitroApp = useNitroApp();
	const nitroHooks = useNitroHooks();
	return {
		async fetch(request, env, context) {
			globalThis.__env__ = env;
			augmentReq(request, {
				env,
				context
			});
			const ctxExt = {};
			const url = new URL(request.url);
			if (hooks.fetch) {
				const res = await hooks.fetch(request, env, context, url, ctxExt);
				if (res) return res;
			}
			return await nitroApp.fetch(request);
		},
		scheduled(controller, env, context) {
			globalThis.__env__ = env;
			context.waitUntil(nitroHooks.callHook("cloudflare:scheduled", {
				controller,
				env,
				context
			}) || Promise.resolve());
		},
		email(message, env, context) {
			globalThis.__env__ = env;
			context.waitUntil(nitroHooks.callHook("cloudflare:email", {
				message,
				event: message,
				env,
				context
			}) || Promise.resolve());
		},
		queue(batch, env, context) {
			globalThis.__env__ = env;
			context.waitUntil(nitroHooks.callHook("cloudflare:queue", {
				batch,
				event: batch,
				env,
				context
			}) || Promise.resolve());
		},
		tail(traces, env, context) {
			globalThis.__env__ = env;
			context.waitUntil(nitroHooks.callHook("cloudflare:tail", {
				traces,
				env,
				context
			}) || Promise.resolve());
		},
		trace(traces, env, context) {
			globalThis.__env__ = env;
			context.waitUntil(nitroHooks.callHook("cloudflare:trace", {
				traces,
				env,
				context
			}) || Promise.resolve());
		}
	};
}
function augmentReq(cfReq, ctx) {
	const req = cfReq;
	req.ip = cfReq.headers.get("cf-connecting-ip") || void 0;
	req.runtime ??= { name: "cloudflare" };
	req.runtime.cloudflare = {
		...req.runtime.cloudflare,
		...ctx
	};
	req.waitUntil = ctx.context?.waitUntil.bind(ctx.context);
}
//#endregion
//#region node_modules/nitro/dist/presets/cloudflare/runtime/cloudflare-module.mjs
var cloudflare_module_default = createHandler({ fetch(cfRequest, env, context, url) {
	if (env.ASSETS && isPublicAssetURL(url.pathname)) return env.ASSETS.fetch(cfRequest);
} });
//#endregion
export { cloudflare_module_default as default };
