import { o as __toESM } from "../_runtime.mjs";
import { n as useForm, t as u } from "../_libs/@hookform/resolvers+[...].mjs";
import { t as supabase } from "./client-BmkySxaU.mjs";
import { u as require_react } from "../_libs/@floating-ui/react-dom+[...].mjs";
import { c as require_jsx_runtime } from "../_libs/@radix-ui/react-arrow+[...].mjs";
import { i as useQueryClient, n as useQuery, t as useMutation } from "../_libs/tanstack__react-query.mjs";
import { n as useActiveTenant } from "./use-tenant-L5ZosG5R.mjs";
import { n as PageBody, r as PageHeader, t as EmptyState } from "./page-header-9A-c6Jmg.mjs";
import { t as Button } from "./button-BTGd3p39.mjs";
import { t as Input } from "./input-C7-F0e9p.mjs";
import { n as toast } from "../_libs/sonner.mjs";
import { o as Trash2, p as Plus } from "../_libs/lucide-react.mjs";
import { t as Label } from "./label-Cj5oJoSC.mjs";
import { a as stringType, i as objectType, n as enumType } from "../_libs/zod.mjs";
import { a as DialogTitle, i as DialogHeader, n as DialogContent, o as DialogTrigger, r as DialogFooter, t as Dialog } from "./dialog-1f98Mygr.mjs";
import { a as SelectValue, i as SelectTrigger, n as SelectContent, r as SelectItem, t as Select } from "./select-C8RpZWXk.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/workouts-CImfFjI9.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var schema = objectType({
	name: stringType().min(2),
	level: enumType([
		"beginner",
		"intermediate",
		"advanced"
	]),
	goal: stringType().optional(),
	description: stringType().optional()
});
function Workouts() {
	const { active } = useActiveTenant();
	const tenantId = active?.tenant_id;
	const [open, setOpen] = (0, import_react.useState)(false);
	const qc = useQueryClient();
	const { register, handleSubmit, reset, setValue, watch, formState: { errors } } = useForm({
		resolver: u(schema),
		defaultValues: { level: "beginner" }
	});
	const level = watch("level");
	const { data } = useQuery({
		enabled: !!tenantId,
		queryKey: ["workout_plans", tenantId],
		queryFn: async () => {
			const { data } = await supabase.from("workout_plans").select("*, workout_exercises(id)").eq("tenant_id", tenantId).order("created_at", { ascending: false });
			return data ?? [];
		}
	});
	const create = useMutation({
		mutationFn: async (v) => {
			if (!tenantId) throw new Error("No tenant");
			const { error } = await supabase.from("workout_plans").insert({
				...v,
				tenant_id: tenantId
			});
			if (error) throw error;
		},
		onSuccess: () => {
			toast.success("Plan created");
			reset();
			setOpen(false);
			qc.invalidateQueries({ queryKey: ["workout_plans"] });
		},
		onError: (e) => toast.error(e.message)
	});
	const del = useMutation({
		mutationFn: async (id) => {
			const { error } = await supabase.from("workout_plans").delete().eq("id", id);
			if (error) throw error;
		},
		onSuccess: () => qc.invalidateQueries({ queryKey: ["workout_plans"] })
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PageHeader, {
		title: "Workouts",
		description: "Plan templates",
		actions: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Dialog, {
			open,
			onOpenChange: setOpen,
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogTrigger, {
				asChild: true,
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Plus, { className: "mr-2 h-4 w-4" }), " New plan"] })
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogContent, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogHeader, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogTitle, { children: "New workout plan" }) }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
				onSubmit: handleSubmit((v) => create.mutate(v)),
				className: "space-y-3",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, { children: "Name *" }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
							...register("name"),
							placeholder: "Push Pull Legs"
						}),
						errors.name && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-xs text-destructive",
							children: errors.name.message
						})
					] }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, { children: "Level" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Select, {
						value: level,
						onValueChange: (v) => setValue("level", v),
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectTrigger, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectValue, {}) }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(SelectContent, { children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectItem, {
								value: "beginner",
								children: "Beginner"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectItem, {
								value: "intermediate",
								children: "Intermediate"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectItem, {
								value: "advanced",
								children: "Advanced"
							})
						] })]
					})] }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, { children: "Goal" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
						...register("goal"),
						placeholder: "Muscle gain"
					})] }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, { children: "Description" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, { ...register("description") })] }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogFooter, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						type: "submit",
						disabled: create.isPending,
						children: "Save"
					}) })
				]
			})] })]
		})
	}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PageBody, { children: !data || data.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(EmptyState, {
		title: "No workout plans",
		hint: "Create a beginner, intermediate, or advanced plan."
	}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "grid gap-4 sm:grid-cols-2 lg:grid-cols-3",
		children: data.map((p) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "rounded-xl border border-border bg-card p-5",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-start justify-between",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
						className: "font-display text-xl tracking-wide",
						children: p.name.toUpperCase()
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
						className: "text-xs uppercase text-muted-foreground",
						children: [
							p.level,
							" · ",
							p.goal ?? "general"
						]
					})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						variant: "ghost",
						size: "icon",
						onClick: () => del.mutate(p.id),
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Trash2, { className: "h-4 w-4 text-destructive" })
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-3 text-sm text-muted-foreground",
					children: p.description ?? "No description"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
					className: "mt-3 text-xs text-muted-foreground",
					children: [p.workout_exercises?.length ?? 0, " exercises"]
				})
			]
		}, p.id))
	}) })] });
}
//#endregion
export { Workouts as component };
