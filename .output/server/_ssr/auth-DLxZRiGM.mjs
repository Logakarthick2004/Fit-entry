import { m as createFileRoute, p as lazyRouteComponent } from "../_libs/@tanstack/react-router+[...].mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/auth-DLxZRiGM.js
var $$splitComponentImporter = () => import("./auth-D6HG_e3G.mjs");
var Route = createFileRoute("/auth")({
	validateSearch: (s) => ({
		mode: s.mode ?? void 0,
		redirect: s.redirect ?? void 0
	}),
	head: () => ({ meta: [{ title: "Sign in — FitFlow ERP" }] }),
	component: lazyRouteComponent($$splitComponentImporter, "component")
});
//#endregion
export { Route as t };
