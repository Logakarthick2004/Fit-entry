import { o as __toESM } from "../_runtime.mjs";
import { n as useForm, t as u } from "../_libs/@hookform/resolvers+[...].mjs";
import { t as supabase } from "./client-BmkySxaU.mjs";
import { u as require_react } from "../_libs/@floating-ui/react-dom+[...].mjs";
import { c as require_jsx_runtime } from "../_libs/@radix-ui/react-arrow+[...].mjs";
import { i as useQueryClient, n as useQuery, t as useMutation } from "../_libs/tanstack__react-query.mjs";
import { n as useActiveTenant } from "./use-tenant-L5ZosG5R.mjs";
import { n as PageBody, r as PageHeader } from "./page-header-9A-c6Jmg.mjs";
import { t as Button } from "./button-BTGd3p39.mjs";
import { t as Input } from "./input-C7-F0e9p.mjs";
import { n as toast } from "../_libs/sonner.mjs";
import { p as Plus } from "../_libs/lucide-react.mjs";
import { t as Label } from "./label-Cj5oJoSC.mjs";
import { a as stringType, i as objectType, r as literalType } from "../_libs/zod.mjs";
import { a as DialogTitle, i as DialogHeader, n as DialogContent, o as DialogTrigger, r as DialogFooter, t as Dialog } from "./dialog-1f98Mygr.mjs";
import { a as SelectValue, i as SelectTrigger, n as SelectContent, r as SelectItem, t as Select } from "./select-C8RpZWXk.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/leads-CzysnwkV.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var STAGES = [
	"new",
	"contacted",
	"interested",
	"trial",
	"converted",
	"lost"
];
var schema = objectType({
	name: stringType().min(2),
	phone: stringType().optional(),
	email: stringType().email().optional().or(literalType("")),
	source: stringType().optional(),
	notes: stringType().optional()
});
function Leads() {
	const { active } = useActiveTenant();
	const tenantId = active?.tenant_id;
	const [open, setOpen] = (0, import_react.useState)(false);
	const qc = useQueryClient();
	const { register, handleSubmit, reset, formState: { errors } } = useForm({ resolver: u(schema) });
	const { data } = useQuery({
		enabled: !!tenantId,
		queryKey: ["leads", tenantId],
		queryFn: async () => {
			const { data } = await supabase.from("leads").select("*").eq("tenant_id", tenantId).order("created_at", { ascending: false });
			return data ?? [];
		}
	});
	const create = useMutation({
		mutationFn: async (v) => {
			if (!tenantId) throw new Error("No tenant");
			const { error } = await supabase.from("leads").insert({
				...v,
				tenant_id: tenantId,
				email: v.email || null
			});
			if (error) throw error;
		},
		onSuccess: () => {
			toast.success("Lead added");
			reset();
			setOpen(false);
			qc.invalidateQueries({ queryKey: ["leads"] });
		},
		onError: (e) => toast.error(e.message)
	});
	const update = useMutation({
		mutationFn: async ({ id, status }) => {
			const { error } = await supabase.from("leads").update({ status }).eq("id", id);
			if (error) throw error;
		},
		onSuccess: () => qc.invalidateQueries({ queryKey: ["leads"] })
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PageHeader, {
		title: "Leads",
		description: "Sales pipeline",
		actions: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Dialog, {
			open,
			onOpenChange: setOpen,
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogTrigger, {
				asChild: true,
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Plus, { className: "mr-2 h-4 w-4" }), " Add lead"] })
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogContent, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogHeader, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogTitle, { children: "New lead" }) }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
				onSubmit: handleSubmit((v) => create.mutate(v)),
				className: "space-y-3",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, { children: "Name *" }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, { ...register("name") }),
						errors.name && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-xs text-destructive",
							children: errors.name.message
						})
					] }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "grid grid-cols-2 gap-3",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, { children: "Phone" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, { ...register("phone") })] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, { children: "Email" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
							type: "email",
							...register("email")
						})] })]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, { children: "Source" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
						...register("source"),
						placeholder: "Instagram, Walk-in…"
					})] }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, { children: "Notes" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, { ...register("notes") })] }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogFooter, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						type: "submit",
						children: "Save"
					}) })
				]
			})] })]
		})
	}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PageBody, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "grid gap-3 md:grid-cols-3 lg:grid-cols-6",
		children: STAGES.map((s) => {
			const items = (data ?? []).filter((l) => l.status === s);
			return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "rounded-xl border border-border bg-card",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "border-b border-border p-3",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h3", {
						className: "font-display text-sm uppercase tracking-wider",
						children: [
							s,
							" ",
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
								className: "ml-1 text-xs text-muted-foreground",
								children: [
									"(",
									items.length,
									")"
								]
							})
						]
					})
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "max-h-[60vh] space-y-2 overflow-auto p-2",
					children: [items.map((l) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "rounded-md border border-border bg-secondary/40 p-2 text-sm",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "font-medium",
								children: l.name
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "text-xs text-muted-foreground",
								children: l.phone || l.email || "—"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Select, {
								value: l.status,
								onValueChange: (v) => update.mutate({
									id: l.id,
									status: v
								}),
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectTrigger, {
									className: "mt-2 h-7 text-xs",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectValue, {})
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectContent, { children: STAGES.map((st) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectItem, {
									value: st,
									children: st
								}, st)) })]
							})
						]
					}, l.id)), items.length === 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "p-2 text-center text-xs text-muted-foreground",
						children: "Empty"
					})]
				})]
			}, s);
		})
	}) })] });
}
//#endregion
export { Leads as component };
