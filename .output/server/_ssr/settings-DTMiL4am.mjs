import { o as __toESM } from "../_runtime.mjs";
import { n as useForm } from "../_libs/@hookform/resolvers+[...].mjs";
import { t as supabase } from "./client-BmkySxaU.mjs";
import { u as require_react } from "../_libs/@floating-ui/react-dom+[...].mjs";
import { c as require_jsx_runtime } from "../_libs/@radix-ui/react-arrow+[...].mjs";
import { i as useQueryClient, n as useQuery, t as useMutation } from "../_libs/tanstack__react-query.mjs";
import { n as useActiveTenant } from "./use-tenant-L5ZosG5R.mjs";
import { n as PageBody, r as PageHeader } from "./page-header-9A-c6Jmg.mjs";
import { t as Button } from "./button-BTGd3p39.mjs";
import { t as Input } from "./input-C7-F0e9p.mjs";
import { n as toast } from "../_libs/sonner.mjs";
import { o as Trash2, p as Plus } from "../_libs/lucide-react.mjs";
import { t as Label } from "./label-Cj5oJoSC.mjs";
import { a as DialogTitle, i as DialogHeader, n as DialogContent, o as DialogTrigger, r as DialogFooter, t as Dialog } from "./dialog-1f98Mygr.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/settings-DTMiL4am.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function Settings() {
	const { active } = useActiveTenant();
	const tenantId = active?.tenant_id;
	const qc = useQueryClient();
	const { register, handleSubmit } = useForm({ defaultValues: {
		name: active?.tenant.name,
		currency: active?.tenant.currency,
		timezone: active?.tenant.timezone,
		tax_percent: active?.tenant.tax_percent
	} });
	const saveTenant = useMutation({
		mutationFn: async (v) => {
			if (!tenantId) throw new Error("No tenant");
			const { error } = await supabase.from("tenants").update(v).eq("id", tenantId);
			if (error) throw error;
		},
		onSuccess: () => {
			toast.success("Saved");
			qc.invalidateQueries({ queryKey: ["my-tenants"] });
		},
		onError: (e) => toast.error(e.message)
	});
	const { data: branches } = useQuery({
		enabled: !!tenantId,
		queryKey: ["branches", tenantId],
		queryFn: async () => (await supabase.from("branches").select("*").eq("tenant_id", tenantId).order("created_at")).data ?? []
	});
	const [bOpen, setBOpen] = (0, import_react.useState)(false);
	const bForm = useForm({ defaultValues: {
		name: "",
		address: "",
		phone: ""
	} });
	const addBranch = useMutation({
		mutationFn: async (v) => {
			if (!tenantId) throw new Error("No tenant");
			const { error } = await supabase.from("branches").insert({
				...v,
				tenant_id: tenantId
			});
			if (error) throw error;
		},
		onSuccess: () => {
			toast.success("Branch added");
			setBOpen(false);
			bForm.reset();
			qc.invalidateQueries({ queryKey: ["branches"] });
		},
		onError: (e) => toast.error(e.message)
	});
	const delBranch = useMutation({
		mutationFn: async (id) => {
			const { error } = await supabase.from("branches").delete().eq("id", id);
			if (error) throw error;
		},
		onSuccess: () => qc.invalidateQueries({ queryKey: ["branches"] })
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PageHeader, {
		title: "Settings",
		description: "Workspace, branches, billing"
	}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PageBody, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "grid gap-6 lg:grid-cols-2",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "rounded-xl border border-border bg-card p-5",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
				className: "font-display text-xl tracking-wide",
				children: "GYM PROFILE"
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
				className: "mt-4 space-y-3",
				onSubmit: handleSubmit((v) => saveTenant.mutate(v)),
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, { children: "Name" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, { ...register("name") })] }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "grid grid-cols-2 gap-3",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, { children: "Currency" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, { ...register("currency") })] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, { children: "Timezone" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, { ...register("timezone") })] })]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, { children: "Tax %" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
						type: "number",
						step: "0.01",
						...register("tax_percent")
					})] }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						type: "submit",
						children: "Save"
					})
				]
			})]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "rounded-xl border border-border bg-card p-5",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex items-center justify-between",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
					className: "font-display text-xl tracking-wide",
					children: "BRANCHES"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Dialog, {
					open: bOpen,
					onOpenChange: setBOpen,
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogTrigger, {
						asChild: true,
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
							size: "sm",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Plus, { className: "mr-1 h-4 w-4" }), " Add"]
						})
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogContent, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogHeader, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogTitle, { children: "New branch" }) }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
						onSubmit: bForm.handleSubmit((v) => addBranch.mutate(v)),
						className: "space-y-3",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, { children: "Name" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, { ...bForm.register("name", { required: true }) })] }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, { children: "Address" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, { ...bForm.register("address") })] }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, { children: "Phone" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, { ...bForm.register("phone") })] }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogFooter, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
								type: "submit",
								children: "Save"
							}) })
						]
					})] })]
				})]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "mt-4 space-y-2",
				children: (branches ?? []).map((b) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-center justify-between rounded-md border border-border p-3 text-sm",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "font-medium",
						children: [
							b.name,
							" ",
							b.is_main && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "ml-2 rounded bg-primary/15 px-1.5 py-0.5 text-xs text-primary",
								children: "main"
							})
						]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "text-xs text-muted-foreground",
						children: [
							b.address ?? "",
							" ",
							b.phone ?? ""
						]
					})] }), !b.is_main && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						size: "icon",
						variant: "ghost",
						onClick: () => delBranch.mutate(b.id),
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Trash2, { className: "h-4 w-4 text-destructive" })
					})]
				}, b.id))
			})]
		})]
	}) })] });
}
//#endregion
export { Settings as component };
