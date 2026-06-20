import { o as __toESM } from "../_runtime.mjs";
import { n as useForm, t as u } from "../_libs/@hookform/resolvers+[...].mjs";
import { t as supabase } from "./client-BmkySxaU.mjs";
import { u as require_react } from "../_libs/@floating-ui/react-dom+[...].mjs";
import { c as require_jsx_runtime } from "../_libs/@radix-ui/react-arrow+[...].mjs";
import { t as Button } from "./button-BTGd3p39.mjs";
import { t as Input } from "./input-C7-F0e9p.mjs";
import { n as toast } from "../_libs/sonner.mjs";
import { _ as useNavigate } from "../_libs/@tanstack/react-router+[...].mjs";
import { t as Label } from "./label-Cj5oJoSC.mjs";
import { a as stringType, i as objectType } from "../_libs/zod.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/reset-password-CPnHZfEH.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var schema = objectType({ password: stringType().min(8) });
function ResetPassword() {
	const navigate = useNavigate();
	const [busy, setBusy] = (0, import_react.useState)(false);
	const { register, handleSubmit, formState: { errors } } = useForm({ resolver: u(schema) });
	const onSubmit = async (v) => {
		setBusy(true);
		const { error } = await supabase.auth.updateUser({ password: v.password });
		setBusy(false);
		if (error) return toast.error(error.message);
		toast.success("Password updated.");
		navigate({ to: "/dashboard" });
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "grid min-h-screen place-items-center bg-background px-4",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "w-full max-w-sm",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
				className: "font-display text-3xl tracking-wide",
				children: "SET NEW PASSWORD"
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
				onSubmit: handleSubmit(onSubmit),
				className: "mt-6 space-y-3",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, { children: "New password" }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
						type: "password",
						...register("password")
					}),
					errors.password && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-1 text-xs text-destructive",
						children: errors.password.message
					})
				] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
					disabled: busy,
					className: "w-full",
					children: "Update password"
				})]
			})]
		})
	});
}
//#endregion
export { ResetPassword as component };
