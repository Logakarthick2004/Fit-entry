import { o as __toESM } from "../_runtime.mjs";
import { n as useForm, t as u } from "../_libs/@hookform/resolvers+[...].mjs";
import { t as supabase } from "./client-BmkySxaU.mjs";
import { u as require_react } from "../_libs/@floating-ui/react-dom+[...].mjs";
import { c as require_jsx_runtime } from "../_libs/@radix-ui/react-arrow+[...].mjs";
import { i as useQueryClient, n as useQuery, t as useMutation } from "../_libs/tanstack__react-query.mjs";
import { n as useActiveTenant } from "./use-tenant-L5ZosG5R.mjs";
import { n as PageBody, r as PageHeader, t as EmptyState } from "./page-header-9A-c6Jmg.mjs";
import { n as formatCurrency } from "./utils-DMmnJHxL.mjs";
import { t as Button } from "./button-BTGd3p39.mjs";
import { t as Input } from "./input-C7-F0e9p.mjs";
import { n as toast } from "../_libs/sonner.mjs";
import { o as Trash2, p as Plus } from "../_libs/lucide-react.mjs";
import { t as Label } from "./label-Cj5oJoSC.mjs";
import { a as stringType, i as objectType, t as coerce } from "../_libs/zod.mjs";
import { a as DialogTitle, i as DialogHeader, n as DialogContent, o as DialogTrigger, r as DialogFooter, t as Dialog } from "./dialog-1f98Mygr.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/memberships-CxLOexRS.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var planSchema = objectType({
	name: stringType().min(2),
	duration_days: coerce.number().int().positive(),
	price: coerce.number().nonnegative(),
	description: stringType().optional()
});
function Memberships() {
	const { active } = useActiveTenant();
	const tenantId = active?.tenant_id;
	const currency = active?.tenant.currency ?? "USD";
	const [open, setOpen] = (0, import_react.useState)(false);
	const qc = useQueryClient();
	const { register, handleSubmit, reset, formState: { errors } } = useForm({ resolver: u(planSchema) });
	const { data: plans } = useQuery({
		enabled: !!tenantId,
		queryKey: ["membership_plans", tenantId],
		queryFn: async () => {
			const { data } = await supabase.from("membership_plans").select("*").eq("tenant_id", tenantId).order("price");
			return data ?? [];
		}
	});
	const create = useMutation({
		mutationFn: async (v) => {
			if (!tenantId) throw new Error("No tenant");
			const { error } = await supabase.from("membership_plans").insert({
				...v,
				tenant_id: tenantId
			});
			if (error) throw error;
		},
		onSuccess: () => {
			toast.success("Plan created");
			reset();
			setOpen(false);
			qc.invalidateQueries({ queryKey: ["membership_plans"] });
		},
		onError: (e) => toast.error(e.message)
	});
	const del = useMutation({
		mutationFn: async (id) => {
			const { error } = await supabase.from("membership_plans").delete().eq("id", id);
			if (error) throw error;
		},
		onSuccess: () => qc.invalidateQueries({ queryKey: ["membership_plans"] })
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PageHeader, {
		title: "Memberships",
		description: "Plans and pricing",
		actions: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Dialog, {
			open,
			onOpenChange: setOpen,
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogTrigger, {
				asChild: true,
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Plus, { className: "mr-2 h-4 w-4" }), " New plan"] })
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogContent, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogHeader, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogTitle, { children: "New membership plan" }) }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
				onSubmit: handleSubmit((v) => create.mutate(v)),
				className: "space-y-3",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, { children: "Name *" }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
							...register("name"),
							placeholder: "Monthly Pass"
						}),
						errors.name && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-xs text-destructive",
							children: errors.name.message
						})
					] }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "grid grid-cols-2 gap-3",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, { children: "Duration (days) *" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
							type: "number",
							...register("duration_days"),
							placeholder: "30"
						})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, { children: "Price *" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
							type: "number",
							step: "0.01",
							...register("price")
						})] })]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, { children: "Description" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, { ...register("description") })] }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogFooter, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						type: "submit",
						disabled: create.isPending,
						children: "Save"
					}) })
				]
			})] })]
		})
	}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PageBody, { children: !plans || plans.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(EmptyState, {
		title: "No plans yet",
		hint: "Create a Daily, Monthly, or Annual plan to get started."
	}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "grid gap-4 sm:grid-cols-2 lg:grid-cols-3",
		children: plans.map((p) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "rounded-xl border border-border bg-card p-5",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-start justify-between",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
						className: "font-display text-2xl tracking-wide",
						children: p.name.toUpperCase()
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
						className: "text-xs uppercase tracking-wider text-muted-foreground",
						children: [p.duration_days, " days"]
					})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						variant: "ghost",
						size: "icon",
						onClick: () => del.mutate(p.id),
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Trash2, { className: "h-4 w-4 text-destructive" })
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "mt-4 kpi-number text-primary",
					children: formatCurrency(Number(p.price), currency)
				}),
				p.description && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-2 text-sm text-muted-foreground",
					children: p.description
				})
			]
		}, p.id))
	}) })] });
}
//#endregion
export { Memberships as component };
