import { t as supabase } from "./client-BmkySxaU.mjs";
import { c as require_jsx_runtime } from "../_libs/@radix-ui/react-arrow+[...].mjs";
import { n as useQuery } from "../_libs/tanstack__react-query.mjs";
import { n as useActiveTenant } from "./use-tenant-L5ZosG5R.mjs";
import { n as PageBody, r as PageHeader } from "./page-header-9A-c6Jmg.mjs";
import { n as formatCurrency, r as formatDate } from "./utils-DMmnJHxL.mjs";
import { t as Button } from "./button-BTGd3p39.mjs";
import { i as TabsTrigger, n as TabsContent, r as TabsList, t as Tabs } from "./tabs-DMbzW0DI.mjs";
import { y as Download } from "../_libs/lucide-react.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/reports-BSk-XwZ1.js
var import_jsx_runtime = require_jsx_runtime();
function toCsv(rows) {
	if (!rows.length) return "";
	const keys = Object.keys(rows[0]);
	const escape = (v) => `"${String(v ?? "").replace(/"/g, "\"\"")}"`;
	return [keys.join(","), ...rows.map((r) => keys.map((k) => escape(r[k])).join(","))].join("\n");
}
function downloadCsv(name, rows) {
	const blob = new Blob([toCsv(rows)], { type: "text/csv" });
	const url = URL.createObjectURL(blob);
	const a = document.createElement("a");
	a.href = url;
	a.download = name;
	a.click();
	URL.revokeObjectURL(url);
}
function Reports() {
	const { active } = useActiveTenant();
	const tenantId = active?.tenant_id;
	const currency = active?.tenant.currency ?? "USD";
	const { data: revenue } = useQuery({
		enabled: !!tenantId,
		queryKey: ["rep-rev", tenantId],
		queryFn: async () => (await supabase.from("payments").select("paid_at, amount, method, status, members(full_name, code)").eq("tenant_id", tenantId).order("paid_at", { ascending: false }).limit(500)).data ?? []
	});
	const { data: attendance } = useQuery({
		enabled: !!tenantId,
		queryKey: ["rep-att", tenantId],
		queryFn: async () => (await supabase.from("attendance").select("check_in, check_out, method, members(full_name, code)").eq("tenant_id", tenantId).order("check_in", { ascending: false }).limit(500)).data ?? []
	});
	const { data: memberships } = useQuery({
		enabled: !!tenantId,
		queryKey: ["rep-mem", tenantId],
		queryFn: async () => (await supabase.from("member_memberships").select("start_date, end_date, status, price, members(full_name, code), membership_plans(name)").eq("tenant_id", tenantId).order("start_date", { ascending: false }).limit(500)).data ?? []
	});
	const { data: expenses } = useQuery({
		enabled: !!tenantId,
		queryKey: ["rep-exp", tenantId],
		queryFn: async () => (await supabase.from("expenses").select("*").eq("tenant_id", tenantId).order("spent_on", { ascending: false }).limit(500)).data ?? []
	});
	const totalRevenue = (revenue ?? []).filter((r) => r.status === "paid").reduce((s, r) => s + Number(r.amount), 0);
	const totalExpense = (expenses ?? []).reduce((s, e) => s + Number(e.amount), 0);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PageHeader, {
		title: "Reports",
		description: "Export and analyze gym performance"
	}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PageBody, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Tabs, {
		defaultValue: "revenue",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(TabsList, { children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TabsTrigger, {
					value: "revenue",
					children: "Revenue"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TabsTrigger, {
					value: "attendance",
					children: "Attendance"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TabsTrigger, {
					value: "memberships",
					children: "Memberships"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TabsTrigger, {
					value: "pnl",
					children: "P & L"
				})
			] }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(TabsContent, {
				value: "revenue",
				className: "space-y-4",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-center justify-between",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
						className: "text-sm text-muted-foreground",
						children: ["Total collected: ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "font-semibold text-foreground",
							children: formatCurrency(totalRevenue, currency)
						})]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
						variant: "outline",
						size: "sm",
						onClick: () => downloadCsv("revenue.csv", (revenue ?? []).map((r) => ({
							date: r.paid_at,
							member: r.members?.full_name,
							amount: r.amount,
							method: r.method,
							status: r.status
						}))),
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Download, { className: "mr-2 h-4 w-4" }), " Export CSV"]
					})]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Table, {
					head: [
						"Date",
						"Member",
						"Amount",
						"Method",
						"Status"
					],
					rows: (revenue ?? []).map((r) => [
						formatDate(r.paid_at),
						r.members?.full_name ?? "—",
						formatCurrency(Number(r.amount), currency),
						r.method.replace("_", " "),
						r.status
					])
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(TabsContent, {
				value: "attendance",
				className: "space-y-4",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "flex justify-end",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
						variant: "outline",
						size: "sm",
						onClick: () => downloadCsv("attendance.csv", (attendance ?? []).map((a) => ({
							check_in: a.check_in,
							check_out: a.check_out,
							method: a.method,
							member: a.members?.full_name
						}))),
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Download, { className: "mr-2 h-4 w-4" }), " Export CSV"]
					})
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Table, {
					head: [
						"In",
						"Out",
						"Method",
						"Member"
					],
					rows: (attendance ?? []).map((a) => [
						formatDate(a.check_in),
						a.check_out ? formatDate(a.check_out) : "—",
						a.method,
						a.members?.full_name ?? "—"
					])
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(TabsContent, {
				value: "memberships",
				className: "space-y-4",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "flex justify-end",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
						variant: "outline",
						size: "sm",
						onClick: () => downloadCsv("memberships.csv", (memberships ?? []).map((m) => ({
							start: m.start_date,
							end: m.end_date,
							status: m.status,
							plan: m.membership_plans?.name,
							price: m.price,
							member: m.members?.full_name
						}))),
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Download, { className: "mr-2 h-4 w-4" }), " Export CSV"]
					})
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Table, {
					head: [
						"Start",
						"End",
						"Status",
						"Plan",
						"Price",
						"Member"
					],
					rows: (memberships ?? []).map((m) => [
						formatDate(m.start_date),
						formatDate(m.end_date),
						m.status,
						m.membership_plans?.name ?? "—",
						formatCurrency(Number(m.price), currency),
						m.members?.full_name ?? "—"
					])
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TabsContent, {
				value: "pnl",
				className: "space-y-4",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "grid gap-4 sm:grid-cols-3",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Stat, {
							label: "Revenue",
							v: formatCurrency(totalRevenue, currency)
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Stat, {
							label: "Expenses",
							v: formatCurrency(totalExpense, currency)
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Stat, {
							label: "Net profit",
							v: formatCurrency(totalRevenue - totalExpense, currency),
							tone: totalRevenue - totalExpense >= 0 ? "good" : "bad"
						})
					]
				})
			})
		]
	}) })] });
}
function Stat({ label, v, tone }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "rounded-xl border border-border bg-card p-5",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "text-xs uppercase tracking-wider text-muted-foreground",
			children: label
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: `mt-2 kpi-number ${tone === "good" ? "text-success" : tone === "bad" ? "text-destructive" : "text-primary"}`,
			children: v
		})]
	});
}
function Table({ head, rows }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "overflow-hidden rounded-xl border border-border bg-card",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("table", {
			className: "w-full text-sm",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("thead", {
				className: "bg-secondary/40 text-left text-xs uppercase text-muted-foreground",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("tr", { children: head.map((h) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
					className: "px-4 py-3",
					children: h
				}, h)) })
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tbody", { children: [rows.map((r, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("tr", {
				className: "border-t border-border",
				children: r.map((c, j) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
					className: "px-4 py-2",
					children: c
				}, j))
			}, i)), rows.length === 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("tr", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
				colSpan: head.length,
				className: "py-6 text-center text-muted-foreground",
				children: "No data yet"
			}) })] })]
		})
	});
}
//#endregion
export { Reports as component };
