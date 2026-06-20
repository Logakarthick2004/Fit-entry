import { o as __toESM } from "../_runtime.mjs";
import { n as useForm, t as u } from "../_libs/@hookform/resolvers+[...].mjs";
import { t as supabase } from "./client-BmkySxaU.mjs";
import { u as require_react } from "../_libs/@floating-ui/react-dom+[...].mjs";
import { c as require_jsx_runtime } from "../_libs/@radix-ui/react-arrow+[...].mjs";
import { t as Button } from "./button-BTGd3p39.mjs";
import { t as Input } from "./input-C7-F0e9p.mjs";
import { n as toast } from "../_libs/sonner.mjs";
import { g as LoaderCircle, v as Dumbbell } from "../_libs/lucide-react.mjs";
import { _ as useNavigate, g as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { t as Route } from "./auth-DLxZRiGM.mjs";
import { t as Label } from "./label-Cj5oJoSC.mjs";
import { t as motion } from "../_libs/framer-motion.mjs";
import { a as stringType, i as objectType } from "../_libs/zod.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/auth-D6HG_e3G.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var loginSchema = objectType({
	email: stringType().email(),
	password: stringType().min(6)
});
var signupSchema = objectType({
	full_name: stringType().min(2),
	gym_name: stringType().min(2),
	email: stringType().email(),
	password: stringType().min(8, "At least 8 characters")
});
var forgotSchema = objectType({ email: stringType().email() });
function AuthPage() {
	const search = Route.useSearch();
	const navigate = useNavigate();
	const [mode, setMode] = (0, import_react.useState)(search.mode ?? "login");
	const [busy, setBusy] = (0, import_react.useState)(false);
	(0, import_react.useEffect)(() => {
		supabase.auth.getUser().then(({ data }) => {
			if (data.user) navigate({ to: "/dashboard" });
		});
	}, [navigate]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "grid min-h-screen lg:grid-cols-2",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "relative hidden overflow-hidden lg:block",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "absolute inset-0 gradient-orange" }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "absolute inset-0 bg-black/40" }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "relative z-10 flex h-full flex-col justify-between p-12 text-white",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
							to: "/",
							className: "flex items-center gap-2",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "grid h-10 w-10 place-items-center rounded-md bg-white/15 backdrop-blur",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Dumbbell, { className: "h-5 w-5" })
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "font-display text-2xl tracking-wider",
								children: "FITFLOW"
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(motion.h2, {
							initial: {
								opacity: 0,
								y: 16
							},
							animate: {
								opacity: 1,
								y: 0
							},
							transition: { duration: .6 },
							className: "font-display text-5xl leading-[0.95] tracking-wide md:text-7xl",
							children: [
								"SWEAT. SCALE.",
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("br", {}),
								"SUCCEED."
							]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-4 max-w-md text-white/85",
							children: "Membership, attendance, payments, trainers — all in one operating system designed for gyms that grow."
						})] }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "text-xs uppercase tracking-wider text-white/70",
							children: "Trusted by 120+ gyms worldwide"
						})
					]
				})
			]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "flex items-center justify-center bg-background px-6 py-12",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "w-full max-w-sm",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
						to: "/",
						className: "lg:hidden mb-6 flex items-center gap-2",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Dumbbell, { className: "h-5 w-5 text-primary" }),
							" ",
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "font-display text-xl",
								children: "FITFLOW"
							})
						]
					}),
					mode === "login" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LoginForm, {
						onSwitch: setMode,
						busy,
						setBusy,
						redirect: search.redirect
					}),
					mode === "signup" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SignupForm, {
						onSwitch: setMode,
						busy,
						setBusy
					}),
					mode === "forgot" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ForgotForm, {
						onSwitch: setMode,
						busy,
						setBusy
					})
				]
			})
		})]
	});
}
function GoogleButton({ busy }) {
	const onClick = async () => {
		const { error } = await supabase.auth.signInWithOAuth({
			provider: "google",
			options: { redirectTo: window.location.origin + "/dashboard" }
		});
		if (error) toast.error(error.message ?? "Google sign-in failed");
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
		type: "button",
		variant: "outline",
		disabled: busy,
		onClick,
		className: "w-full",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("svg", {
			viewBox: "0 0 24 24",
			className: "mr-2 h-4 w-4",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
				fill: "#EA4335",
				d: "M12 10.2v3.96h5.55c-.24 1.5-1.74 4.38-5.55 4.38-3.33 0-6.06-2.76-6.06-6.18s2.73-6.18 6.06-6.18c1.92 0 3.18.81 3.9 1.5l2.64-2.55C16.83 3.45 14.64 2.4 12 2.4 6.69 2.4 2.4 6.69 2.4 12s4.29 9.6 9.6 9.6c5.55 0 9.21-3.9 9.21-9.39 0-.63-.06-1.11-.15-1.56H12z"
			})
		}), "Continue with Google"]
	});
}
function LoginForm({ onSwitch, busy, setBusy, redirect }) {
	const navigate = useNavigate();
	const { register, handleSubmit, formState: { errors } } = useForm({ resolver: u(loginSchema) });
	const onSubmit = async (v) => {
		setBusy(true);
		const { error } = await supabase.auth.signInWithPassword(v);
		setBusy(false);
		if (error) return toast.error(error.message);
		toast.success("Welcome back!");
		navigate({ to: redirect ?? "/dashboard" });
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
			className: "font-display text-3xl tracking-wide",
			children: "SIGN IN"
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "text-sm text-muted-foreground",
			children: "Welcome back. Let's get to work."
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
			onSubmit: handleSubmit(onSubmit),
			className: "mt-6 space-y-4",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, { children: "Email" }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
						type: "email",
						autoComplete: "email",
						...register("email")
					}),
					errors.email && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-1 text-xs text-destructive",
						children: errors.email.message
					})
				] }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, { children: "Password" }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
						type: "password",
						autoComplete: "current-password",
						...register("password")
					}),
					errors.password && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-1 text-xs text-destructive",
						children: errors.password.message
					})
				] }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
					disabled: busy,
					className: "w-full font-semibold",
					children: [busy && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LoaderCircle, { className: "mr-2 h-4 w-4 animate-spin" }), "Sign in"]
				})
			]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "my-4 flex items-center gap-2 text-xs text-muted-foreground",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "h-px flex-1 bg-border" }),
				" OR ",
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "h-px flex-1 bg-border" })
			]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(GoogleButton, { busy }),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mt-6 flex justify-between text-sm",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
				onClick: () => onSwitch("forgot"),
				className: "text-muted-foreground hover:text-foreground",
				children: "Forgot password?"
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
				onClick: () => onSwitch("signup"),
				className: "font-medium text-primary hover:underline",
				children: "Create account"
			})]
		})
	] });
}
function SignupForm({ onSwitch, busy, setBusy }) {
	const navigate = useNavigate();
	const { register, handleSubmit, formState: { errors } } = useForm({ resolver: u(signupSchema) });
	const onSubmit = async (v) => {
		setBusy(true);
		const { data, error } = await supabase.auth.signUp({
			email: v.email,
			password: v.password,
			options: {
				data: {
					full_name: v.full_name,
					gym_name: v.gym_name
				},
				emailRedirectTo: window.location.origin + "/dashboard"
			}
		});
		if (error) {
			setBusy(false);
			return toast.error(error.message);
		}
		if (data.session) {
			const slug = v.gym_name.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "") + "-" + Math.random().toString(36).slice(2, 6);
			const { error: rpcErr } = await supabase.rpc("create_tenant_for_owner", {
				_name: v.gym_name,
				_slug: slug,
				_currency: "USD",
				_timezone: Intl.DateTimeFormat().resolvedOptions().timeZone
			});
			setBusy(false);
			if (rpcErr) return toast.error("Account created but workspace setup failed: " + rpcErr.message);
			toast.success("Welcome to FitFlow!");
			navigate({ to: "/dashboard" });
		} else {
			setBusy(false);
			toast.success("Check your email to confirm.");
		}
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
			className: "font-display text-3xl tracking-wide",
			children: "START YOUR GYM"
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "text-sm text-muted-foreground",
			children: "14-day free trial. No credit card."
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
			onSubmit: handleSubmit(onSubmit),
			className: "mt-6 space-y-3",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, { children: "Your name" }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, { ...register("full_name") }),
					errors.full_name && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-1 text-xs text-destructive",
						children: errors.full_name.message
					})
				] }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, { children: "Gym name" }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
						placeholder: "Beast Mode Fitness",
						...register("gym_name")
					}),
					errors.gym_name && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-1 text-xs text-destructive",
						children: errors.gym_name.message
					})
				] }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, { children: "Email" }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
						type: "email",
						autoComplete: "email",
						...register("email")
					}),
					errors.email && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-1 text-xs text-destructive",
						children: errors.email.message
					})
				] }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, { children: "Password" }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
						type: "password",
						autoComplete: "new-password",
						...register("password")
					}),
					errors.password && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-1 text-xs text-destructive",
						children: errors.password.message
					})
				] }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
					disabled: busy,
					className: "w-full font-semibold",
					children: [busy && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LoaderCircle, { className: "mr-2 h-4 w-4 animate-spin" }), "Create account"]
				})
			]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mt-4 text-center text-sm",
			children: ["Already have an account? ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
				onClick: () => onSwitch("login"),
				className: "font-medium text-primary hover:underline",
				children: "Sign in"
			})]
		})
	] });
}
function ForgotForm({ onSwitch, busy, setBusy }) {
	const { register, handleSubmit, formState: { errors } } = useForm({ resolver: u(forgotSchema) });
	const onSubmit = async (v) => {
		setBusy(true);
		const { error } = await supabase.auth.resetPasswordForEmail(v.email, { redirectTo: window.location.origin + "/reset-password" });
		setBusy(false);
		if (error) return toast.error(error.message);
		toast.success("Password reset email sent.");
		onSwitch("login");
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
			className: "font-display text-3xl tracking-wide",
			children: "RESET PASSWORD"
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "text-sm text-muted-foreground",
			children: "Enter your email and we'll send a reset link."
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
			onSubmit: handleSubmit(onSubmit),
			className: "mt-6 space-y-3",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, { children: "Email" }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
					type: "email",
					...register("email")
				}),
				errors.email && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-1 text-xs text-destructive",
					children: errors.email.message
				})
			] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
				disabled: busy,
				className: "w-full",
				children: [busy && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LoaderCircle, { className: "mr-2 h-4 w-4 animate-spin" }), "Send reset link"]
			})]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
			onClick: () => onSwitch("login"),
			className: "mt-4 text-sm text-muted-foreground hover:text-foreground",
			children: "← Back to sign in"
		})
	] });
}
//#endregion
export { AuthPage as component };
