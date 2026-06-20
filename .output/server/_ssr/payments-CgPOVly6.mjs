import { t as supabase } from "./client-BmkySxaU.mjs";
import { c as require_jsx_runtime } from "../_libs/@radix-ui/react-arrow+[...].mjs";
import { n as useQuery } from "../_libs/tanstack__react-query.mjs";
import { n as useActiveTenant } from "./use-tenant-L5ZosG5R.mjs";
import { n as PageBody, r as PageHeader, t as EmptyState } from "./page-header-9A-c6Jmg.mjs";
import { i as formatDateTime, n as formatCurrency } from "./utils-DMmnJHxL.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/payments-CgPOVly6.js
var import_jsx_runtime = require_jsx_runtime();
function Payments() {
	const { active } = useActiveTenant();
	const tenantId = active?.tenant_id;
	const currency = active?.tenant.currency ?? "USD";
	const { data } = useQuery({
		enabled: !!tenantId,
		queryKey: ["payments", tenantId],
		queryFn: async () => {
			const { data } = await supabase.from("payments").select("*, members(full_name, code)").eq("tenant_id", tenantId).order("paid_at", { ascending: false }).limit(200);
			return data ?? [];
		}
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PageHeader, {
		title: "Payments",
		description: `Total collected: ${formatCurrency((data ?? []).filter((p) => p.status === "paid").reduce((s, p) => s + Number(p.amount), 0), currency)}`
	}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PageBody, { children: !data || data.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(EmptyState, {
		title: "No payments yet",
		hint: "Payments appear when you assign memberships."
	}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "overflow-hidden rounded-xl border border-border bg-card",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("table", {
			className: "w-full text-sm",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("thead", {
				className: "bg-secondary/40 text-left text-xs uppercase text-muted-foreground",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", { children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
						className: "px-4 py-3",
						children: "Date"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
						className: "px-4 py-3",
						children: "Member"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
						className: "px-4 py-3",
						children: "Amount"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
						className: "px-4 py-3 hidden sm:table-cell",
						children: "Method"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
						className: "px-4 py-3",
						children: "Status"
					})
				] })
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("tbody", { children: data.map((p) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", {
				className: "border-t border-border",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
						className: "px-4 py-3",
						children: formatDateTime(p.paid_at)
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("td", {
						className: "px-4 py-3 font-medium",
						children: [
							p.members?.full_name,
							" ",
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "ml-2 text-xs text-muted-foreground",
								children: p.members?.code
							})
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
						className: "px-4 py-3 font-semibold",
						children: formatCurrency(Number(p.amount), currency)
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
						className: "px-4 py-3 hidden sm:table-cell capitalize",
						children: p.method.replace("_", " ")
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
						className: "px-4 py-3",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: `rounded-full px-2 py-0.5 text-xs ${p.status === "paid" ? "bg-success/15 text-success" : "bg-warning/15 text-warning"}`,
							children: p.status
						})
					})
				]
			}, p.id)) })]
		})
	}) })] });
}
//#endregion
export { Payments as component };
