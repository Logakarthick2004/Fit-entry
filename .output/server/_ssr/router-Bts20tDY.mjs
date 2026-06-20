import { o as __toESM } from "../_runtime.mjs";
import { t as supabase } from "./client-BmkySxaU.mjs";
import { t as QueryClient } from "../_libs/tanstack__query-core.mjs";
import { u as require_react } from "../_libs/@floating-ui/react-dom+[...].mjs";
import { c as require_jsx_runtime } from "../_libs/@radix-ui/react-arrow+[...].mjs";
import { r as QueryClientProvider } from "../_libs/tanstack__react-query.mjs";
import { t as Toaster } from "../_libs/sonner.mjs";
import { A as redirect, c as HeadContent, d as createRouter, f as Outlet, g as Link, h as createRootRouteWithContext, m as createFileRoute, p as lazyRouteComponent, s as Scripts, v as useRouter } from "../_libs/@tanstack/react-router+[...].mjs";
import { t as Route$16 } from "./auth-DLxZRiGM.mjs";
import { t as Route$17 } from "./c._token-DLfgC-aM.mjs";
import { t as Route$18 } from "./members._id-DW9X0_be.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/router-Bts20tDY.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var styles_default = "/assets/styles-CVkV9RsG.css";
function NotFoundComponent() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "flex min-h-screen items-center justify-center bg-background px-4",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "max-w-md text-center",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
					className: "font-display text-8xl text-primary",
					children: "404"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "mt-3 text-xl font-semibold",
					children: "Off the map"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-2 text-sm text-muted-foreground",
					children: "This page is not part of your routine."
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "mt-6",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
						to: "/",
						className: "inline-flex items-center rounded-md bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground hover:opacity-90",
						children: "Back to base"
					})
				})
			]
		})
	});
}
function ErrorComponent({ error, reset }) {
	console.error(error);
	const router = useRouter();
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "flex min-h-screen items-center justify-center bg-background px-4",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "max-w-md text-center",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
					className: "font-display text-4xl",
					children: "Heavy lift failed"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-2 text-sm text-muted-foreground",
					children: "Something broke a rep. Try again."
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mt-6 flex flex-wrap justify-center gap-2",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						onClick: () => {
							router.invalidate();
							reset();
						},
						className: "rounded-md bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground hover:opacity-90",
						children: "Retry"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
						href: "/",
						className: "rounded-md border border-input bg-background px-4 py-2 text-sm font-medium hover:bg-accent hover:text-accent-foreground",
						children: "Home"
					})]
				})
			]
		})
	});
}
var Route$15 = createRootRouteWithContext()({
	head: () => ({
		meta: [
			{ charSet: "utf-8" },
			{
				name: "viewport",
				content: "width=device-width, initial-scale=1"
			},
			{ title: "FitFlow ERP — Modern gym management" },
			{
				name: "description",
				content: "Multi-tenant gym SaaS with members, attendance, billing, trainers, and reports."
			},
			{
				property: "og:title",
				content: "FitFlow ERP"
			},
			{
				property: "og:description",
				content: "Multi-tenant gym SaaS for owners, branches, trainers, and members."
			},
			{
				property: "og:type",
				content: "website"
			},
			{
				name: "twitter:card",
				content: "summary_large_image"
			}
		],
		links: [{
			rel: "stylesheet",
			href: styles_default
		}]
	}),
	shellComponent: RootShell,
	component: RootComponent,
	notFoundComponent: NotFoundComponent,
	errorComponent: ErrorComponent
});
function RootShell({ children }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("html", {
		lang: "en",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("head", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(HeadContent, {}) }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("body", { children: [children, /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Scripts, {})] })]
	});
}
function RootComponent() {
	const { queryClient } = Route$15.useRouteContext();
	const router = useRouter();
	(0, import_react.useEffect)(() => {
		const { data: sub } = supabase.auth.onAuthStateChange((event) => {
			if (event !== "SIGNED_IN" && event !== "SIGNED_OUT" && event !== "USER_UPDATED") return;
			router.invalidate();
			if (event !== "SIGNED_OUT") queryClient.invalidateQueries();
		});
		return () => sub.subscription.unsubscribe();
	}, [router, queryClient]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(QueryClientProvider, {
		client: queryClient,
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Outlet, {}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Toaster, {
			theme: "dark",
			position: "top-right",
			richColors: true
		})]
	});
}
var $$splitComponentImporter$14 = () => import("./reset-password-CPnHZfEH.mjs");
var Route$14 = createFileRoute("/reset-password")({
	head: () => ({ meta: [{ title: "Reset password — FitFlow" }] }),
	component: lazyRouteComponent($$splitComponentImporter$14, "component")
});
var $$splitComponentImporter$13 = () => import("./onboarding-Cs7PQ2Bj.mjs");
var Route$13 = createFileRoute("/onboarding")({
	head: () => ({ meta: [{ title: "Create gym — FitFlow" }] }),
	component: lazyRouteComponent($$splitComponentImporter$13, "component")
});
var $$splitComponentImporter$12 = () => import("./route-BhzCBFEI.mjs");
var Route$12 = createFileRoute("/_authenticated")({
	ssr: false,
	beforeLoad: async ({ location }) => {
		const { data } = await supabase.auth.getUser();
		if (!data.user) throw redirect({
			to: "/auth",
			search: { redirect: location.href }
		});
		return { user: data.user };
	},
	component: lazyRouteComponent($$splitComponentImporter$12, "component")
});
var $$splitComponentImporter$11 = () => import("./routes-DPZu9H_V.mjs");
var Route$11 = createFileRoute("/")({
	head: () => ({ meta: [
		{ title: "FitFlow ERP — Run your gym like a champion" },
		{
			name: "description",
			content: "All-in-one multi-tenant gym management platform: members, attendance, billing, trainers, workouts, diets, and reports."
		},
		{
			property: "og:title",
			content: "FitFlow ERP — Run your gym like a champion"
		},
		{
			property: "og:description",
			content: "All-in-one multi-tenant gym management platform."
		}
	] }),
	component: lazyRouteComponent($$splitComponentImporter$11, "component")
});
var $$splitComponentImporter$10 = () => import("./workouts-CImfFjI9.mjs");
var Route$10 = createFileRoute("/_authenticated/workouts")({
	head: () => ({ meta: [{ title: "Workouts — FitFlow" }] }),
	component: lazyRouteComponent($$splitComponentImporter$10, "component")
});
var $$splitComponentImporter$9 = () => import("./trainers-C9eAdVCY.mjs");
var Route$9 = createFileRoute("/_authenticated/trainers")({
	head: () => ({ meta: [{ title: "Trainers — FitFlow" }] }),
	component: lazyRouteComponent($$splitComponentImporter$9, "component")
});
var $$splitComponentImporter$8 = () => import("./settings-DTMiL4am.mjs");
var Route$8 = createFileRoute("/_authenticated/settings")({
	head: () => ({ meta: [{ title: "Settings — FitFlow" }] }),
	component: lazyRouteComponent($$splitComponentImporter$8, "component")
});
var $$splitComponentImporter$7 = () => import("./reports-BSk-XwZ1.mjs");
var Route$7 = createFileRoute("/_authenticated/reports")({
	head: () => ({ meta: [{ title: "Reports — FitFlow" }] }),
	component: lazyRouteComponent($$splitComponentImporter$7, "component")
});
var $$splitComponentImporter$6 = () => import("./payments-CgPOVly6.mjs");
var Route$6 = createFileRoute("/_authenticated/payments")({
	head: () => ({ meta: [{ title: "Payments — FitFlow" }] }),
	component: lazyRouteComponent($$splitComponentImporter$6, "component")
});
var $$splitComponentImporter$5 = () => import("./memberships-CxLOexRS.mjs");
var Route$5 = createFileRoute("/_authenticated/memberships")({
	head: () => ({ meta: [{ title: "Memberships — FitFlow" }] }),
	component: lazyRouteComponent($$splitComponentImporter$5, "component")
});
var $$splitComponentImporter$4 = () => import("./members-DeK_k6WF.mjs");
var Route$4 = createFileRoute("/_authenticated/members")({
	head: () => ({ meta: [{ title: "Members — FitFlow" }] }),
	component: lazyRouteComponent($$splitComponentImporter$4, "component")
});
var $$splitComponentImporter$3 = () => import("./leads-CzysnwkV.mjs");
var Route$3 = createFileRoute("/_authenticated/leads")({
	head: () => ({ meta: [{ title: "Leads — FitFlow" }] }),
	component: lazyRouteComponent($$splitComponentImporter$3, "component")
});
var $$splitComponentImporter$2 = () => import("./diets-BqFnIutV.mjs");
var Route$2 = createFileRoute("/_authenticated/diets")({
	head: () => ({ meta: [{ title: "Diets — FitFlow" }] }),
	component: lazyRouteComponent($$splitComponentImporter$2, "component")
});
var $$splitComponentImporter$1 = () => import("./dashboard-QRwsU5YH.mjs");
var Route$1 = createFileRoute("/_authenticated/dashboard")({
	head: () => ({ meta: [{ title: "Dashboard — FitFlow" }] }),
	component: lazyRouteComponent($$splitComponentImporter$1, "component")
});
var $$splitComponentImporter = () => import("./attendance-BQLz4AXb.mjs");
var Route = createFileRoute("/_authenticated/attendance")({
	head: () => ({ meta: [{ title: "Attendance — FitFlow" }] }),
	component: lazyRouteComponent($$splitComponentImporter, "component")
});
var ResetPasswordRoute = Route$14.update({
	id: "/reset-password",
	path: "/reset-password",
	getParentRoute: () => Route$15
});
var OnboardingRoute = Route$13.update({
	id: "/onboarding",
	path: "/onboarding",
	getParentRoute: () => Route$15
});
var AuthRoute = Route$16.update({
	id: "/auth",
	path: "/auth",
	getParentRoute: () => Route$15
});
var AuthenticatedRouteRoute = Route$12.update({
	id: "/_authenticated",
	getParentRoute: () => Route$15
});
var IndexRoute = Route$11.update({
	id: "/",
	path: "/",
	getParentRoute: () => Route$15
});
var CTokenRoute = Route$17.update({
	id: "/c/$token",
	path: "/c/$token",
	getParentRoute: () => Route$15
});
var AuthenticatedWorkoutsRoute = Route$10.update({
	id: "/workouts",
	path: "/workouts",
	getParentRoute: () => AuthenticatedRouteRoute
});
var AuthenticatedTrainersRoute = Route$9.update({
	id: "/trainers",
	path: "/trainers",
	getParentRoute: () => AuthenticatedRouteRoute
});
var AuthenticatedSettingsRoute = Route$8.update({
	id: "/settings",
	path: "/settings",
	getParentRoute: () => AuthenticatedRouteRoute
});
var AuthenticatedReportsRoute = Route$7.update({
	id: "/reports",
	path: "/reports",
	getParentRoute: () => AuthenticatedRouteRoute
});
var AuthenticatedPaymentsRoute = Route$6.update({
	id: "/payments",
	path: "/payments",
	getParentRoute: () => AuthenticatedRouteRoute
});
var AuthenticatedMembershipsRoute = Route$5.update({
	id: "/memberships",
	path: "/memberships",
	getParentRoute: () => AuthenticatedRouteRoute
});
var AuthenticatedMembersRoute = Route$4.update({
	id: "/members",
	path: "/members",
	getParentRoute: () => AuthenticatedRouteRoute
});
var AuthenticatedLeadsRoute = Route$3.update({
	id: "/leads",
	path: "/leads",
	getParentRoute: () => AuthenticatedRouteRoute
});
var AuthenticatedDietsRoute = Route$2.update({
	id: "/diets",
	path: "/diets",
	getParentRoute: () => AuthenticatedRouteRoute
});
var AuthenticatedDashboardRoute = Route$1.update({
	id: "/dashboard",
	path: "/dashboard",
	getParentRoute: () => AuthenticatedRouteRoute
});
var AuthenticatedAttendanceRoute = Route.update({
	id: "/attendance",
	path: "/attendance",
	getParentRoute: () => AuthenticatedRouteRoute
});
var AuthenticatedMembersRouteChildren = { AuthenticatedMembersIdRoute: Route$18.update({
	id: "/$id",
	path: "/$id",
	getParentRoute: () => AuthenticatedMembersRoute
}) };
var AuthenticatedRouteRouteChildren = {
	AuthenticatedAttendanceRoute,
	AuthenticatedDashboardRoute,
	AuthenticatedDietsRoute,
	AuthenticatedLeadsRoute,
	AuthenticatedMembersRoute: AuthenticatedMembersRoute._addFileChildren(AuthenticatedMembersRouteChildren),
	AuthenticatedMembershipsRoute,
	AuthenticatedPaymentsRoute,
	AuthenticatedReportsRoute,
	AuthenticatedSettingsRoute,
	AuthenticatedTrainersRoute,
	AuthenticatedWorkoutsRoute
};
var rootRouteChildren = {
	IndexRoute,
	AuthenticatedRouteRoute: AuthenticatedRouteRoute._addFileChildren(AuthenticatedRouteRouteChildren),
	AuthRoute,
	OnboardingRoute,
	ResetPasswordRoute,
	CTokenRoute
};
var routeTree = Route$15._addFileChildren(rootRouteChildren)._addFileTypes();
var getRouter = () => {
	return createRouter({
		routeTree,
		context: { queryClient: new QueryClient() },
		scrollRestoration: true,
		defaultPreloadStaleTime: 0
	});
};
//#endregion
export { getRouter };
