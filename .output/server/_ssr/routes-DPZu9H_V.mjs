import { c as require_jsx_runtime } from "../_libs/@radix-ui/react-arrow+[...].mjs";
import { I as Activity, M as ChartColumn, c as ShieldCheck, f as QrCode, r as Users, t as Zap, v as Dumbbell, x as CreditCard } from "../_libs/lucide-react.mjs";
import { g as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { t as motion } from "../_libs/framer-motion.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/routes-DPZu9H_V.js
var import_jsx_runtime = require_jsx_runtime();
function Landing() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "min-h-screen bg-background text-foreground",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("header", {
				className: "border-b border-border",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mx-auto flex max-w-6xl items-center justify-between px-6 py-4",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
							to: "/",
							className: "flex items-center gap-2",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "grid h-9 w-9 place-items-center rounded-md bg-primary text-primary-foreground",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Dumbbell, { className: "h-5 w-5" })
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "font-display text-2xl tracking-wider",
								children: "FITFLOW"
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("nav", {
							className: "hidden gap-6 text-sm md:flex",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
								href: "#features",
								className: "text-muted-foreground hover:text-foreground",
								children: "Features"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
								href: "#pricing",
								className: "text-muted-foreground hover:text-foreground",
								children: "Pricing"
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex items-center gap-2",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
								to: "/auth",
								className: "rounded-md px-3 py-2 text-sm hover:bg-secondary",
								children: "Sign in"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
								to: "/auth",
								search: { mode: "signup" },
								className: "rounded-md bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground hover:opacity-90",
								children: "Start free"
							})]
						})
					]
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "relative overflow-hidden",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "pointer-events-none absolute inset-0 -z-10",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "absolute -left-32 top-20 h-96 w-96 rounded-full bg-primary/20 blur-3xl" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "absolute right-0 top-40 h-72 w-72 rounded-full bg-accent/20 blur-3xl" })]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mx-auto max-w-6xl px-6 py-24",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(motion.h1, {
							initial: {
								opacity: 0,
								y: 20
							},
							animate: {
								opacity: 1,
								y: 0
							},
							transition: { duration: .6 },
							className: "font-display text-6xl leading-[0.95] tracking-wide md:text-8xl",
							children: [
								"RUN YOUR GYM",
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("br", {}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "text-primary",
									children: "LIKE A CHAMPION."
								})
							]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-6 max-w-xl text-lg text-muted-foreground",
							children: "FitFlow is the modern operating system for gyms and fitness franchises. Members, attendance, billing, trainers, workouts, leads — all in one place."
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "mt-8 flex flex-wrap gap-3",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
								to: "/auth",
								search: { mode: "signup" },
								className: "rounded-md bg-primary px-6 py-3 text-sm font-bold uppercase tracking-wider text-primary-foreground hover:opacity-90",
								children: "Start your 14-day trial"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
								to: "/auth",
								className: "rounded-md border border-border px-6 py-3 text-sm font-semibold hover:bg-secondary",
								children: "Sign in"
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "mt-16 grid gap-4 md:grid-cols-4",
							children: [
								{
									k: "10K+",
									v: "Members managed"
								},
								{
									k: "120+",
									v: "Active gyms"
								},
								{
									k: "99.9%",
									v: "Uptime"
								},
								{
									k: "24/7",
									v: "Support"
								}
							].map((s) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "rounded-lg border border-border bg-card p-5",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "kpi-number text-primary",
									children: s.k
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "mt-1 text-xs uppercase tracking-wider text-muted-foreground",
									children: s.v
								})]
							}, s.v))
						})
					]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
				id: "features",
				className: "border-t border-border py-20",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mx-auto max-w-6xl px-6",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
							className: "font-display text-4xl tracking-wide md:text-5xl",
							children: "EVERYTHING YOU NEED"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-2 text-muted-foreground",
							children: "Built for single gyms, multi-branch chains and franchises."
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "mt-10 grid gap-4 md:grid-cols-3",
							children: [
								{
									i: Users,
									t: "Members & CRM",
									d: "Profiles, documents, photos, membership history, and a sales pipeline for leads."
								},
								{
									i: QrCode,
									t: "QR Attendance",
									d: "Each member gets a personal QR. Scan with any phone at the front desk."
								},
								{
									i: CreditCard,
									t: "Billing & Invoices",
									d: "Plans, renewals, receipts, outstanding dues, and tax-ready invoices."
								},
								{
									i: Dumbbell,
									t: "Trainers & Plans",
									d: "Assign trainers, build workout splits and meal plans, track progress."
								},
								{
									i: ChartColumn,
									t: "Reports",
									d: "Revenue, attendance, retention, and trainer performance dashboards."
								},
								{
									i: ShieldCheck,
									t: "Multi-tenant secure",
									d: "Row-level security on every table. Your data never crosses lanes."
								}
							].map(({ i: Icon, t, d }) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(motion.div, {
								whileHover: { y: -4 },
								className: "rounded-xl border border-border bg-card p-6",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, { className: "h-7 w-7 text-primary" }),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
										className: "mt-4 font-semibold",
										children: t
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "mt-1 text-sm text-muted-foreground",
										children: d
									})
								]
							}, t))
						})
					]
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
				id: "pricing",
				className: "border-t border-border py-20",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mx-auto max-w-6xl px-6",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						className: "font-display text-4xl tracking-wide md:text-5xl",
						children: "SIMPLE PRICING"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "mt-10 grid gap-4 md:grid-cols-3",
						children: [
							{
								n: "Starter",
								p: 29,
								f: [
									"Up to 100 members",
									"1 branch",
									"QR attendance",
									"Email support"
								]
							},
							{
								n: "Growth",
								p: 79,
								f: [
									"Up to 500 members",
									"3 branches",
									"Trainers & diets",
									"Reports"
								],
								hi: true
							},
							{
								n: "Pro",
								p: 199,
								f: [
									"Up to 5k members",
									"20 branches",
									"API access",
									"Priority support"
								]
							}
						].map((pl) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: `rounded-xl border p-6 ${pl.hi ? "border-primary bg-card shadow-lg" : "border-border bg-card"}`,
							children: [
								pl.hi && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "mb-2 inline-flex items-center gap-1 rounded-full bg-primary/10 px-2 py-0.5 text-xs font-semibold uppercase text-primary",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Zap, { className: "h-3 w-3" }), " Popular"]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "font-display text-3xl tracking-wide",
									children: pl.n.toUpperCase()
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "mt-1 text-3xl font-bold",
									children: [
										"$",
										pl.p,
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "text-sm font-normal text-muted-foreground",
											children: "/mo"
										})
									]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
									className: "mt-4 space-y-1 text-sm text-muted-foreground",
									children: pl.f.map((x) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", { children: ["• ", x] }, x))
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
									to: "/auth",
									search: { mode: "signup" },
									className: "mt-6 block rounded-md bg-primary py-2 text-center text-sm font-semibold text-primary-foreground hover:opacity-90",
									children: "Get started"
								})
							]
						}, pl.n))
					})]
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("footer", {
				className: "border-t border-border py-10",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mx-auto flex max-w-6xl items-center justify-between px-6 text-sm text-muted-foreground",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-center gap-2",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Activity, { className: "h-4 w-4 text-primary" }), " FitFlow ERP © 2026"]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "flex gap-4",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
							to: "/auth",
							children: "Sign in"
						})
					})]
				})
			})
		]
	});
}
//#endregion
export { Landing as component };
