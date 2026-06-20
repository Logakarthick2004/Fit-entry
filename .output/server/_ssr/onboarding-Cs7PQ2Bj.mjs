import { o as __toESM } from "../_runtime.mjs";
import { n as useForm, t as u } from "../_libs/@hookform/resolvers+[...].mjs";
import { t as supabase } from "./client-BmkySxaU.mjs";
import { u as require_react } from "../_libs/@floating-ui/react-dom+[...].mjs";
import { c as require_jsx_runtime } from "../_libs/@radix-ui/react-arrow+[...].mjs";
import { r as useMyTenants, t as setActiveTenantId } from "./use-tenant-L5ZosG5R.mjs";
import { t as Button } from "./button-BTGd3p39.mjs";
import { t as Input } from "./input-C7-F0e9p.mjs";
import { n as toast } from "../_libs/sonner.mjs";
import { _ as useNavigate } from "../_libs/@tanstack/react-router+[...].mjs";
import { t as Label } from "./label-Cj5oJoSC.mjs";
import { a as stringType, i as objectType } from "../_libs/zod.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/onboarding-Cs7PQ2Bj.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var schema = objectType({
	gym_name: stringType().min(2),
	currency: stringType().default("USD")
});
function Onboarding() {
	const navigate = useNavigate();
	const { data: tenants, refetch } = useMyTenants();
	const [busy, setBusy] = (0, import_react.useState)(false);
	const { register, handleSubmit, formState: { errors } } = useForm({
		resolver: u(schema),
		defaultValues: { currency: "USD" }
	});
	(0, import_react.useEffect)(() => {
		supabase.auth.getUser().then(({ data }) => {
			if (!data.user) navigate({ to: "/auth" });
		});
	}, [navigate]);
	const onSubmit = async (v) => {
		setBusy(true);
		const slug = v.gym_name.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "") + "-" + Math.random().toString(36).slice(2, 6);
		const { data, error } = await supabase.rpc("create_tenant_for_owner", {
			_name: v.gym_name,
			_slug: slug,
			_currency: v.currency,
			_timezone: Intl.DateTimeFormat().resolvedOptions().timeZone
		});
		setBusy(false);
		if (error) return toast.error(error.message);
		if (data) setActiveTenantId(data);
		await refetch();
		toast.success("Gym created!");
		navigate({ to: "/dashboard" });
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "grid min-h-screen place-items-center bg-background px-4",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "w-full max-w-md rounded-xl border border-border bg-card p-8",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
					className: "font-display text-3xl tracking-wide",
					children: "CREATE YOUR GYM"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-sm text-muted-foreground",
					children: "Set up your workspace. You can add branches later."
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
					onSubmit: handleSubmit(onSubmit),
					className: "mt-6 space-y-3",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, { children: "Gym name" }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
								placeholder: "Beast Mode Fitness",
								...register("gym_name")
							}),
							errors.gym_name && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-xs text-destructive",
								children: errors.gym_name.message
							})
						] }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, { children: "Currency" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
							placeholder: "USD",
							...register("currency")
						})] }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							disabled: busy,
							className: "w-full",
							children: "Create gym"
						})
					]
				}),
				tenants && tenants.length > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					onClick: () => navigate({ to: "/dashboard" }),
					className: "mt-4 text-sm text-muted-foreground hover:text-foreground",
					children: "← Back to dashboard"
				})
			]
		})
	});
}
//#endregion
export { Onboarding as component };
